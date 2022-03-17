import { useContext } from "react";

import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest"
import ReactPlaceholder from "react-placeholder/lib";

import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";

import Speaker from "./Speaker";
import SpeakerAdd from "./SpeakerAdd";

function SpeakersList() {
    const {
        data: speakersData, requestStatus,
        error, updateRecord,
        insertRecord, deleteRecord
    } = useRequestRest();

    const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

    if (requestStatus === REQUEST_STATUS.FAILURE) {
        return (
            <div className="text-danger d-flex justify-content-center">
                ERROR: <strong>Loading speaker data failed {error}</strong>;
            </div>
        )
    }

    return (
        <div className="container speakers-list">
            <ReactPlaceholder
                type="media"
                rows={15}
                className="speakerslist-placeholder"
                ready={requestStatus === REQUEST_STATUS.SUCCESS}
            >
                <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
                <div className="row">
                    {speakersData
                        .filter(speaker => {
                            return (
                                speaker.first.toLowerCase().includes(searchQuery) ||
                                speaker.last.toLowerCase().includes(searchQuery)
                            );
                        })
                        .filter(speaker => {
                            return speaker.sessions.find(session => {
                                return session.eventYear === eventYear;
                                // Checks if the speaker has sessions in the current year
                            })
                        })
                        .map(speaker => {
                            return (
                                <Speaker
                                    key={speaker.id}
                                    speaker={speaker}
                                    updateRecord={updateRecord}
                                    insertRecord={insertRecord}
                                    deleteRecord={deleteRecord}
                                />
                            )
                        })}
                </div>
            </ReactPlaceholder>
        </div>
    );
}

export default SpeakersList;