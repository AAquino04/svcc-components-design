import Speaker from "./Speaker";

function SpeakersList({ data, theme, showSessions }) {
    return (
        <div className="container speakers-list">
            <div className="row">
                {data.map(speaker => {
                    return (
                        <Speaker
                            key={speaker.id}
                            speaker={speaker}
                            theme={theme}
                            showSessions={showSessions}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default SpeakersList;