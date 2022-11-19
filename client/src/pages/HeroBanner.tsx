import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/images/hero.png";

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="top-bar">
        <div className="logo">
          <p>Kanban app</p>
        </div>
        <Link to="/signin">
          <button>Sign in</button>
        </Link>
      </div>
      <main>
        <div className="hero-img">
          <img src={hero} alt="" />
        </div>
        <div className="description">
          <p className="quote">
            "A goal without a plan is just w wish ~ Antonio de Saint-Exupery"
          </p>
          <p className="txt">
            If you agree with this quote, the Kanban method is just for you.
            Start planning your actions and turn your dreams into goals. You
            will get rid of chaos at work and increase your productivity.
          </p>
          <Link to="/signup">
            <button>Sign up</button>
          </Link>
        </div>
      </main>
    </section>
  );
};

export default HeroBanner;
