import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "../../configs/routes.config";

export const AppContent = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        {AppRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            Component={route.component}
          ></Route>
        ))}
      </Routes>
    </Suspense>
  );
};
