import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";

function SpeakersToolbar() {
    const { theme, setTheme } = useContext(ThemeContext);
    const {
        showSessions, setShowSessions,
        eventYear, setEventYear,
        searchQuery, setSearchQuery,
        EVENT_YEARS
    } = useContext(SpeakerFilterContext);

    return (
        <section className="toolbar dark-theme-header">
            <div className="container">
                <div className="justify-content-between">

                    <ul className="toolrow d-flex flex-column flex-lg-row flex-sm-row">
                        <li className="d-flex flex-column flex-md-row flex-sm-row">
                            <strong className="d-flex align-items-center">Show Sessions&nbsp;&nbsp;</strong>
                            <label className="fav">
                                <input
                                    type="checkbox"
                                    checked={showSessions}
                                    onChange={event => {
                                        setShowSessions(event.target.checked);
                                    }}
                                />
                                <span className="switch"></span>
                            </label>
                        </li>

                        <li className="d-flex flex-column flex-md-row flex-sm-row ml-sm-0 ml-0">
                            <strong className="d-flex align-items-center">Theme</strong>
                            <label className="dropdown">
                                <select
                                    className="form-control theme"
                                    value={theme}
                                    onChange={event => {
                                        setTheme(event.target.value);
                                    }}
                                >
                                    <option value="light">Light</option>
                                    <option value="dark">Dark</option>
                                </select>
                            </label>
                        </li>

                        <li className="d-flex flex-column flex-md-row flex-sm-row ml-sm-0 ml-0">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    onChange={event => {
                                        setSearchQuery(event.target.value);
                                    }}
                                />
                            </div>

                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="button">
                                    <i className="fa fa-search"></i>
                                </button>
                            </div>
                        </li>

                        <li className="d-flex flex-column flex-md-row flex-sm-row ml-sm-0 ml-0">
                            <strong>eventYear</strong>
                            <label className="dropmenu">
                                <select
                                    className="form-control"
                                    value={eventYear}
                                    onChange={({ currentTarget }) => {
                                        setEventYear(currentTarget.value)
                                    }}
                                >
                                    {EVENT_YEARS.map(year => {
                                        return (
                                            <option key={year} value={year}>{year}</option>
                                        );
                                    })}
                                </select>
                            </label>
                        </li>
                    </ul>

                </div>
            </div>
        </section>
    )
}

export default SpeakersToolbar;