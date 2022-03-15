import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay"

import ReactPlaceholder from "react-placeholder/lib";
import { data } from "../../SpeakerData";

import Speaker from "./Speaker";

function SpeakersList({ showSessions }) {
    const {
        data: speakersData, requestStatus,
        error, updateRecord
    } = useRequestDelay(2000, data);


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
                <div className="row">
                    {speakersData.map(speaker => {
                        return (
                            <Speaker
                                key={speaker.id}
                                speaker={speaker}
                                showSessions={showSessions}
                                onFavoriteToggle={(doneCallback) => {
                                    updateRecord({ ...speaker, favorite: !speaker.favorite }, doneCallback);
                                }}
                            />
                        )
                    })}
                </div>
            </ReactPlaceholder>
        </div>
    );
}

export default SpeakersList;