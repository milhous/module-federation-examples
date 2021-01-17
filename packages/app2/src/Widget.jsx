import React from "react";
import moment from "moment";
import { SharedContextConsumer } from "../../shared-library/src";

export default function Widget(props) {
  React.useEffect(() => {
    console.log('app2', props);
  }, []);

  return (
    <SharedContextConsumer>
      {(context) => <div
        style={{
          borderRadius: "4px",
          padding: "2em",
          backgroundColor: "red",
          color: "white",
        }}
      >
        <h2>App2 Widget</h2>
        <p>{location.href}</p>
        <p>Context, {context}</p>
        <p>Props: {JSON.stringify(props)}</p>
        <p>App2 Moment Dep: {moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
      </div>}
    </SharedContextConsumer>
  );
}
