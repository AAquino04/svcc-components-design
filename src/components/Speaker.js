import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";

function Session({ title, roomName }) {
    return (
        <span className="session w-100">
            {title} <strong>Room: {roomName}</strong>
        </span>
    );
}

function Sessions({ sessions }) {
    const { theme } = useContext(ThemeContext);

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

function SpeakerImage({ id, first, last }) {
    return (
        <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
            <img
                className="contain-fit"
                src={`/images/speaker-${id}.jpg`}
                width="300"
                alt={`${first} ${last}`}
            />
        </div>
    );
}

function SpeakerFavorite({ favorite, onFavoriteToggle }) {
    const [inTransition, setInTransition] = useState(false);

    function doneCallback() {
        setInTransition(false);
    }

    return (
        <div className="action padB1">
            <span
                onClick={() => {
                    setInTransition(true);
                    return onFavoriteToggle(doneCallback);
                }}
            >
                <i className={
                    favorite === true
                        ? "fa fa-star orange"
                        : "fa fa-star-o orange"
                } />{" "}
                Favorite{" "}
                {inTransition ? (
                    <span className="fas fa-circle-notch fa-spin"></span>
                ) : null}
            </span>
        </div>
    );
}

function SpeakerDemographics({
    first,
    last,
    bio,
    company,
    twitterHandle,
    favorite,
    onFavoriteToggle
}) {
    return (
        <div className="speaker-info">
            <div className="d-flex justify-content-between mb-3">
                <h3 className="text-truncate w-200">{first} {last}</h3>
            </div>

            <SpeakerFavorite favorite={favorite} onFavoriteToggle={onFavoriteToggle} />

            <div>
                <p className="card-description">
                    {bio}
                </p>

                <div className="social d-flex flex-row mt-4">
                    <div className="company">
                        <h5>Company</h5>
                        <h6>{company}</h6>
                    </div>

                    <div className="twitter">
                        <h5>Twitter</h5>
                        <h6>{twitterHandle}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Speaker({ speaker, onFavoriteToggle }) {
    const { id, first, last, sessions } = speaker;
    const { theme } = useContext(ThemeContext);
    const { showSessions } = useContext(SpeakerFilterContext);

    return (
        <div
            className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12"
        >
            <div className={
                theme === "light"
                    ? "card card-height p-4 mt-4"
                    : "card card-height p-4 mt-4 dark-theme-card"
            }>
                <SpeakerImage id={id} first={first} last={last} />

                <SpeakerDemographics {...speaker} onFavoriteToggle={onFavoriteToggle} />
            </div>

            {showSessions === true
                ? <Sessions sessions={sessions} />
                : null
            }
        </div>
    );
}

export default Speaker;