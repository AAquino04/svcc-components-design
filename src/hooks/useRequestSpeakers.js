import { useState, useEffect } from "react";

import { data } from "../../SpeakerData";

function useRequestSpeakers(delayTime) {
    const [speakersData, setSpeakersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasErrored, setHasErrored] = useState(false);
    const [error, setError] = useState("");

    const delay = (delayTime) => new Promise((resolve) => setTimeout(resolve, delayTime));

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

    return {
        speakersData, isLoading,
        hasErrored, error, onFavoriteToggle
    }
}


export default useRequestSpeakers;