import { createContext } from "react";

const SpeakerContext = createContext();

function SpeakerProvider({ children, speaker, updateRecord }) {
    return (
        <SpeakerContext.Provider value={{
            speaker,
            updateRecord,
            insertRecord,
            deleteRecord
        }}>
            {children}
        </SpeakerContext.Provider>
    );
}

export { SpeakerContext, SpeakerProvider };