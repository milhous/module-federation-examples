import React from "react";
import moment from "moment";
import { NameContextProvider } from "../../shared-library/src";

export default function Widget(props) {
  React.useEffect(() => {
    console.log('app3', NameContextProvider, props);
  });

  return (
    <NameContextProvider.Consumer>
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
        <p>Welcome, {context}</p>
        <p>{moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
      </div>}
  </NameContextProvider.Consumer>
  );
}
