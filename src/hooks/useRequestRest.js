import { useState, useEffect } from "react";
import axios from "axios";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
}

const url = "api/speakers";

function useRequestRest() {
    const [data, setData] = useState(initialData);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    const delay = (delayTime) => new Promise((resolve) => setTimeout(resolve, delayTime));

    useEffect(async () => {
        try {
            const result = await axios.get(url);
            setRequestStatus(REQUEST_STATUS.SUCCESS);
            setData(result.data);
        } catch (error) {
            setRequestStatus(REQUEST_STATUS.FAILURE);
            setError(error);
        }
    }, []);

    function updateRecord(record, doneCallback) {
        const originalRecords = [...data];
        const newRecords = data.map(rec => {
            return rec.id === record.id ? record : rec;
        });

        async function delayFunction() {
            try {
                setData(newRecords);
                await axios.put(`${url}/${record.id}`, record);
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
                await axios.delete(`${url}/99999`, record);
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
                await axios.delete(`${url}/${record.id}`, record);
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


export default useRequestRest;