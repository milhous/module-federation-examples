import React from "react";
import moment from "moment";
import { NameContextProvider } from "../../shared-library/src";

export default function Widget(props) {  
    React.useEffect(() => {
        console.log('app2', NameContextProvider, props);
    }, []);

    return (
        <NameContextProvider.Consumer>
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
                <p>Welcome, {context}</p>
                <p>App2 Moment Dep: {moment().format("MMMM Do YYYY, h:mm:ss a")}</p>
            </div>}
        </NameContextProvider.Consumer>
    );
}
