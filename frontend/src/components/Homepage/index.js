import React, { useEffect } from "react";
import "./Homepage.css";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import section2 from "../../assets/section-2.svg";
import section3 from "../../assets/section-3.svg";
import section4 from "../../assets/section-4.svg";
import section5 from "../../assets/section-5.svg";
import sparkles from "../../assets/sparkles.svg";
import usaFlag from "../../assets/usa-flag.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PersonIcon from "@mui/icons-material/Person";
import Aos from "aos";
import "aos/dist/aos.css";

const Homepage = () => {
  const sessionUser = useSelector((store) => store.session.user);
  const history = useHistory();

  useEffect(() => {
    Aos.init({ duration: 400 });
  }, []);

  return (
    <div className="homepage-main">
      <div className="section1">
        <div className="homepage-nav">
          <div className="nav-left">
            <img src={logo} alt="logo" height="55px" />
            <p>Resonance</p>
          </div>
          <div className="nav-middle">
            <a
              href="https://github.com/T1LT/Resonance"
              target="_blank"
              className="homepage-link"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/nishantracherla/"
              target="_blank"
              className="homepage-link"
            >
              Linkedin
            </a>
            <a
              href="https://nishantracherla.com/"
              target="_blank"
              className="homepage-link"
            >
              Portfolio
            </a>
          </div>
          <div className="nav-right">
            <button
              className="homepage-button top-button"
              onClick={() => history.push("/me")}
            >
              {sessionUser ? "Open Resonance" : "Login"}
            </button>
          </div>
        </div>
        <div className="homepage-below-nav">
          <h1 className="homepage-main-heading">IMAGINE A PLACE...</h1>
          <p>
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>
          <button
            className="homepage-button black-button"
            onClick={() => history.push("/me")}
          >
            Open Resonance in your browser
          </button>
        </div>
      </div>

      <div className="section-hero">
        <div data-aos="fade-up" className="section-container">
          <div className="image-container">
            <img
              src={section2}
              alt="invite users image"
              className="img-media-scale"
            />
          </div>
          <div className="section-content">
            <h1 className="section-header">
              Create an invite- only place where you belong
            </h1>
            <p className="section-text">
              Resonance servers are organized into topic-based channels where
              you can collaborate, share, and just talk about your day without
              clogging up a group chat.
            </p>
          </div>
        </div>
      </div>

      <div className="section-hero section-alt">
        <div data-aos="fade-up" className="section-container">
          <div className="section-content">
            <h1 className="section-header">Where hanging out is easy</h1>
            <p className="section-text">
              Grab a seat in a text channel when you're free. Friends in your
              server can see you're around and instantly pop in to chat.
            </p>
          </div>
          <div className="image-container">
            <img
              src={section3}
              alt="text channels"
              className="img-media-scale"
            />
          </div>
        </div>
      </div>

      <div className="section-hero">
        <div data-aos="fade-up" className="section-container">
          <div className="image-container">
            <img src={section4} alt="moderation" className="img-media-scale" />
          </div>
          <div className="section-content">
            <h1 className="section-header">From few to a fandom</h1>
            <p className="section-text">
              Get any community running with powerful moderation tools. Setup
              text servers, channels and more with ease.
            </p>
          </div>
        </div>
      </div>

      <div className="section5 section-alt">
        <div
          data-aos="fade-up"
          data-aos-offset="-30"
          className="section-container-bottom"
        >
          <div className="section-content-bottom">
            <h1 className="section-header-bottom">
              RELIABLE TECH FOR STAYING CLOSE
            </h1>
            <p className="section-text section-text-bottom">
              Low-latency texting feels like you're in the same room. Gather up
              and chat with your friends in real-time.
            </p>
            <img src={section5} alt="reliable tech" className="section5-img" />
          </div>
        </div>
      </div>

      <div className="section6 section-alt">
        <div className="section6-content">
          <img src={sparkles} alt="sparkles" className="sparkles" />
          <h1>Ready to start your journey?</h1>
          <button
            className="homepage-button blue-button big-button"
            onClick={() => history.push("/me")}
          >
            Open Resonance
          </button>
        </div>
      </div>

      <div className="section7">
        <div className="section7-content">
          <div className="section7-content-top">
            <div className="content-left">
              <div className="left1">
                <h1>IMAGINE A PLACE</h1>
              </div>
              <div className="left2">
                <img src={usaFlag} alt="USA Flag" className="flag-emoji" />
                English, USA
              </div>
              <div className="left3">
                <a href="https://www.twitter.com/discord" target="_blank">
                  <TwitterIcon sx={{ color: "white" }} />
                </a>
                <a href="https://www.instagram.com/discord" target="_blank">
                  <InstagramIcon sx={{ color: "white", ml: "24px" }} />
                </a>
                <a href="https://www.facebook.com/discord" target="_blank">
                  <FacebookIcon sx={{ color: "white", ml: "24px" }} />
                </a>
                <a href="https://www.youtube.com/discord" target="_blank">
                  <YouTubeIcon
                    sx={{ color: "white", ml: "24px", fontSize: "28px" }}
                  />
                </a>
              </div>
            </div>
            <div className="content-right">
              <div className="icon-link-wrapper">
                <GitHubIcon sx={{ color: "#5865f2", mr: "8px" }} />
                <a
                  href="https://github.com/T1LT/Resonance"
                  target="_blank"
                  className="footer-link"
                >
                  Github
                </a>
              </div>
              <div className="icon-link-wrapper">
                <LinkedInIcon sx={{ color: "#5865f2", mr: "8px" }} />
                <a
                  href="https://www.linkedin.com/in/nishant-racherla-a51370167/"
                  target="_blank"
                  className="footer-link"
                >
                  Linkedin
                </a>
              </div>
              <div className="icon-link-wrapper">
                <PersonIcon sx={{ color: "#5865f2", mr: "8px" }} />
                <a href="#" className="footer-link">
                  Portfolio
                </a>
              </div>
            </div>
          </div>
          <div className="section7-content-bottom">
            <div className="section7-divider"></div>
            <div className="below-divider">
              <div className="nav-left">
                <img src={logo} alt="logo" height="55px" />
                <p>Resonance</p>
              </div>
              <div className="nav-right">
                <button
                  className="homepage-button top-button blue-button"
                  onClick={() => history.push("/me")}
                >
                  {sessionUser ? "Open Resonance" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
