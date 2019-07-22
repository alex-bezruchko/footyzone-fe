import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
class TwitterSidebar extends React.Component {
  render() {
    return (
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="skyfootball"
        options={{ height: 400 }}
        noScrollbar
      />
    );
  }
}
export default TwitterSidebar;
