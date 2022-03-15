import { useState, useEffect } from "react";

import { data } from "../../SpeakerData";
import ReactPlaceholder from "react-placeholder/lib";

import Speaker from "./Speaker";

function SpeakersList({ theme, showSessions }) {
    const [speakersData, setSpeakersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasErrored, setHasErrored] = useState(false);
    const [error, setError] = useState("");

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(async () => {
        try {
            await delay(2000); // Simulates response delay
            setIsLoading(false);
            setSpeakersData(data);
        } catch (error) {
            setIsLoading(false);
            setHasErrored(true);
            setError(error);
        }
    }, []); // Calls only on first render

    function onFavoriteToggle(id) {
        const speakersRecPrevious = speakersData.find(rec => {
            return rec.id === id;
        });

        const speakerRecUpdated = {
            ...speakersRecPrevious,
            favorite: !speakersRecPrevious.favorite
        };

        const speakersNewData = speakersData.map(rec => {
            return rec.id === id ? speakerRecUpdated : rec;
        });

        setSpeakersData(speakersNewData);
    }

    if (hasErrored) {
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
                ready={isLoading === false}
            >
                <div className="row">
                    {speakersData.map(speaker => {
                        return (
                            <Speaker
                                key={speaker.id}
                                speaker={speaker}
                                theme={theme}
                                showSessions={showSessions}
                                onFavoriteToggle={() => {
                                    onFavoriteToggle(speaker.id);
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