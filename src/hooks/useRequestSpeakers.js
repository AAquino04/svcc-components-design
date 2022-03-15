import { useState, useEffect } from "react";

import { data } from "../../SpeakerData";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}

function useRequestSpeakers(delayTime) {
    const [speakersData, setSpeakersData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    const delay = (delayTime) => new Promise((resolve) => setTimeout(resolve, delayTime));

    useEffect(async () => {
        try {
            await delay(2000); // Simulates response delay
            setRequestStatus(REQUEST_STATUS.SUCCESS);
            setSpeakersData(data);
        } catch (error) {
            setRequestStatus(REQUEST_STATUS.FAILURE);
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
        speakersData, requestStatus,
        error, onFavoriteToggle
    }
}


export default useRequestSpeakers;