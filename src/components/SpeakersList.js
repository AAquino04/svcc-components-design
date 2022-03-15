import { useState, useEffect } from "react";
import { data } from "../../SpeakerData";

import Speaker from "./Speaker";

function SpeakersList({ theme, showSessions }) {
    const [speakersData, setSpeakersData] = useState([]);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(async () => {
        await delay(2000);
        setSpeakersData(data);
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

    return (
        <div className="container speakers-list">
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
        </div>
    );
}

export default SpeakersList;