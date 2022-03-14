import Session from "./Session";

function Sessions({ sessions, theme }) {
    return (
        <div className={
            theme === "light"
                ? "sessionBox card h-250"
                : "sessionBox card h-250 dark-theme-card"
        }>
            <Session
                title={sessions[0].title}
                roomName={sessions[0].room.name}
            />
        </div>
    );
}

export default Sessions;