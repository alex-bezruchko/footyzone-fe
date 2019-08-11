import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
class TwitterSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "epl",
    };
  }
  componentDidMount() {
    if (this.props.props.match.params.subcat_name === "uefacl") {
      this.setState({
        profile: "championsleague",
      });
    } else if (
      this.props.props.match.params.subcat_name === "laliga" ||
      this.props.props.match.params.subcat_name === "epl"
    ) {
      this.setState({
        profile: this.props.props.match.params.subcat_name,
      });
    } else {
      this.setState({
        profile: this.props.props.match.params.subcat_name,
      });
    }
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const subcat_name = this.props.props.match.params.subcat_name;

    if (subcat_name !== prevProps.props.match.params.subcat_name) {
      this.setState({
        profile: subcat_name,
      });
    }
  }
  render() {
    return (
      <div className="twitter-wrapper">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName={this.state.profile}
          options={{ height: 375 }}
          noScrollbar
        />
      </div>
    );
  }
}
export default TwitterSidebar;
