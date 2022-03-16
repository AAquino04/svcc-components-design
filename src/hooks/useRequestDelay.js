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
        const originalRecords = [...data];
        const newRecords = data.map(rec => {
            return rec.id === recordUpdated.id ? recordUpdated : rec;
        });

        async function delayFunction() {
            try {
                setData(newRecords);
                await delay(delayTime);
                if (doneCallback) {
                    doneCallback();
                }
            } catch (error) {
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalRecords); // Rollback data in case of error
            }
        }

        delayFunction();
    }

    function insertRecord(record, doneCallback) {
        const originalRecords = [...data];
        const newRecords = [record, ...data];

        async function delayFunction() {
            try {
                setData(newRecords);
                await delay(delayTime);
                if (doneCallback) {
                    doneCallback();
                }
            } catch (error) {
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalRecords); // Rollback data in case of error
            }
        }

        delayFunction();
    }

    function deleteRecord(record, doneCallback) {
        const originalRecords = [...data];
        const newRecords = data.filter(rec => {
            return rec.id !== record.id;
        });

        async function delayFunction() {
            try {
                setData(newRecords);
                await delay(delayTime);
                if (doneCallback) {
                    doneCallback();
                }
            } catch (error) {
                if (doneCallback) {
                    doneCallback();
                }
                setData(originalRecords); // Rollback data in case of error
            }
        }

        delayFunction();
    }

    return {
        data, requestStatus,
        error, updateRecord,
        insertRecord, deleteRecord
    }
}


export default useRequestDelay;