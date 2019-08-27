import React from "react";
import WelcomeOldschool from "../blog/WelcomeOldschool";
import WelcomeBlog from "./../blog/WelcomeBlog";
import WelcomeCarousel from "./../parts/WelcomeCarousel";


class Welcome extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }


  render() {

    return (
      <div className="welcome-container container-row">

        <WelcomeCarousel />
        <WelcomeBlog />
        <WelcomeOldschool />

      </div>
    );
  }
}

export default Welcome;
