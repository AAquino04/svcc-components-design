function Session({ title, roomName }) {
    return (
        <span className="session w-100">
            {title} <strong>Room: {roomName}</strong>
        </span>
    );
}

export default Session;