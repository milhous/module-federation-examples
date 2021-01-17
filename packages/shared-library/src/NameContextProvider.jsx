import React, { createContext, useContext, useMemo } from "react";

export const SharedContext = createContext();

export const SharedContextProvider = (props) => {
    const { children, value } = props;

    console.log('SharedContextProvider', props);

    /* We cache the provided components */
    const providedValue = useMemo(
        () => value,
        [value],
    );

    return (
        <SharedContext.Provider value={value}>
        {children}
        </SharedContext.Provider>
    );
};

export const SharedContextConsumer = ({ children }) => {
    console.log('SharedContextConsumer', SharedContext);

    return (
        <SharedContext.Consumer>
        {children}
        </SharedContext.Consumer>
    );
};
  