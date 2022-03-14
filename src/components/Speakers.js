import { data } from "../../SpeakerData";

import Header from "./Header";
import SpeakersToolbar from "./SpeakersToolbar";
import SpeakersList from "./SpeakersList";

function Speakers() {
    return (
        <div className="container-fluid">
            <Header />
            <SpeakersToolbar />
            <SpeakersList data={data} />
        </div>
    );
}

export default Speakers;