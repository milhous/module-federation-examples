import React from "react";

const CompanyPage = React.lazy(() => import("./CompanyPage"));

const routes = [
    {
        path: "/",
        component: CompanyPage,
        exact: true,
    },
];

export default routes;