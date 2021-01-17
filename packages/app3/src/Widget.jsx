import React from "react";
import moment from "moment";
import { SharedContextConsumer } from "../../shared-library/src";

export default function Widget(props) {
  React.useEffect(() => {
    console.log('app3', props);
  });

  return (
    <SharedContextConsumer>
      {(context) => <div
        style={{
          borderRadius: "4px",
          padding: "2em",
          backgroundColor: "purple",
          color: "white",
        }}
      >
        <h2>App 3 Widget</h2>
        <p>
          Using <strong>momentjs</strong> for format the date
        </p>
        <p>{location.href}</p>
        <p>Context, {context}</p>
        <p>Props: {JSON.stringify(props)}</p>
        <p>{moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
      </div>}
    </SharedContextConsumer>
  );
}
