import React from "react";
import moment from "moment";
import { NameContextProvider } from "../../shared-library/src";

export default function Widget() {
  const name = React.useContext(NameContextProvider);

  React.useEffect(() => {
    console.log("hooks");
  }, []);
  return (
    <div
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
      <p>Welcome, {name}</p>
      <p>{moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
    </div>
  );
}
