import { useContext, useState, memo } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import { SpeakerProvider, SpeakerContext } from "../contexts/SpeakerContext";

import SpeakerDelete from "./SpeakerDelete";

function Session({ title, room }) {
    return (
        <span className="session w-100">
            {title} <strong>Room: {room.name}</strong>
        </span>
    );
}

function Sessions() {
    const { theme } = useContext(ThemeContext);
    const { eventYear } = useContext(SpeakerFilterContext);
    const { speaker } = useContext(SpeakerContext);

    return (
        <div className={
            theme === "light"
                ? "sessionBox card h-250"
                : "sessionBox card h-250 dark-theme-card"
        }>
            {speaker.sessions
                .filter(session => {
                    return session.eventYear === eventYear;
                })
                .map(session => {
                    return (
                        <div className="session w-100" key={session.id}>
                            <Session {...session} />
                        </div>
                    );
                })
            }
        </div>
    );
}

function ImageWithFallback({ src, ...props }) {
    const [error, setError] = useState(false);
    const [imgScr, setImgScr] = useState(src);

    function onError() {
        if (!error) {
            setImgScr("/images/speaker-99999.jpg");
            setError(true);
        }
    }

    return <img src={imgScr} {...props} onError={onError} />
}

function SpeakerImage() {
    const { speaker: { id, first, last } } = useContext(SpeakerContext);

    return (
        <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
            <ImageWithFallback
                className="contain-fit"
                src={`/images/speaker-${id}.jpg`}
                width="300"
                alt={`${first} ${last}`}
            />
        </div>
    );
}

function SpeakerFavorite() {
    const { speaker, updateRecord } = useContext(SpeakerContext);
    const [inTransition, setInTransition] = useState(false);

    function doneCallback() {
        setInTransition(false);
    }

    return (
        <div className="action padB1">
            <span
                onClick={() => {
                    setInTransition(true);
                    updateRecord(
                        {
                            ...speaker, favorite: !speaker.favorite
                        },
                        doneCallback
                    )
                }}
            >
                <i className={
                    speaker.favorite === true
                        ? "fa fa-star orange"
                        : "fa fa-star-o orange"
                } />
                {" "}Favorite{" "}

                {inTransition ? (
                    <span className="fas fa-circle-notch fa-spin"></span>
                ) : null}
            </span>
        </div>
    );
}

function SpeakerDemographics() {
    const { speaker } = useContext(SpeakerContext);
    const {
        first, last,
        bio, company,
        twitterHandle } = speaker;

    return (
        <div className="speaker-info">
            <div className="d-flex justify-content-between mb-3">
                <h3 className="text-truncate w-200">{first} {last}</h3>
            </div>

            <SpeakerFavorite />

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

const Speaker = memo(function Speaker({ speaker, updateRecord, insertRecord, deleteRecord }) {
    const { theme } = useContext(ThemeContext);
    const { showSessions } = useContext(SpeakerFilterContext);

    return (
        <SpeakerProvider
            speaker={speaker}
            updateRecord={updateRecord}
            insertRecord={insertRecord}
            deleteRecord={deleteRecord}
        >
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
                <div className={
                    theme === "light"
                        ? "card card-height p-4 mt-4"
                        : "card card-height p-4 mt-4 dark-theme-card"
                }>
                    <SpeakerImage />
                    <SpeakerDemographics />
                </div>

                {showSessions === true
                    ? <Sessions />
                    : null
                }

                <SpeakerDelete />
            </div>
        </SpeakerProvider>
    );
}, areEqualSpeaker);

function areEqualSpeaker(prevProps, nextProps) {
    return (prevProps.speaker.favorite === nextProps.speaker.favorite);
}

export default Speaker;