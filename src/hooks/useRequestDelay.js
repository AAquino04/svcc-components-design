import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}

function useRequestDelay(delayTime = 1000, initialData = []) {
    const [data, setData] = useState(initialData);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    const delay = (delayTime) => new Promise((resolve) => setTimeout(resolve, delayTime));

    useEffect(async () => {
        try {
            await delay(delayTime); // Simulates response delay
            setRequestStatus(REQUEST_STATUS.SUCCESS);
            setData(data);
        } catch (error) {
            setRequestStatus(REQUEST_STATUS.FAILURE);
            setError(error);
        }
    }, []); // Calls only on first render

    function updateRecord(recordUpdated, doneCallback) {
        const newRecords = data.map(rec => {
            return rec.id === recordUpdated.id ? recordUpdated : rec;
        });

        async function delayFunction() {
            try {
                await delay(delayTime);
                if (doneCallback) {
                    doneCallback();
                }
                setData(newRecords);
            } catch (error) {
                console.log("ERROR thrown inside delay function", error);
            }
        }

        delayFunction();
    }

    return {
        data, requestStatus,
        error, updateRecord
    }
}


export default useRequestDelay;