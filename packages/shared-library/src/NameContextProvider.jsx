import React, { createContext, useContext, useMemo } from "react";

export const SharedContext = createContext();

const random = Math.random();

export const SharedContextProvider = (props) => {
    const { children, value } = props;

    return (
        <SharedContext.Provider value={value}>
            {children}
        </SharedContext.Provider>
    );
};

export const SharedContextConsumer = ({ children }) => {
    console.log('SharedContextConsumer', random, SharedContext);

    return (
        <SharedContext.Consumer>
            {children}
        </SharedContext.Consumer>
    );
};
