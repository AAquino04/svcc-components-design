import useRequestSpeakers from "../hooks/useRequestSpeakers"

import ReactPlaceholder from "react-placeholder/lib";

import Speaker from "./Speaker";

function SpeakersList({ theme, showSessions }) {
    const {
        speakersData, isLoading,
        hasErrored, error,
        onFavoriteToggle
    } = useRequestSpeakers(2000);


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