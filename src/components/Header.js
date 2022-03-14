function Header(props) {
    return (
        <div className="padT4 padB4">
            <div className="container mobile-container">
                <div className="d-flex justify-content-between">
                    <div>
                        <img
                            alt="SVCC Home Page"
                            src="/images/SVCCLogo.png"
                        />
                    </div>

                    <div className="light">
                        <h4 className="header-title">
                            Silicon Valley Code Camp
                        </h4>
                    </div>

                    <div className="text-dark">
                        Hello Mr. Smith &nbps;&nbps;
                        <span>
                            <a href="#">sign-out</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;