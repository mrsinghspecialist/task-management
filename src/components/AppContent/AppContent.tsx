import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoutes } from "../../configs/routes.config";
import { SecureRoute } from "../../features/SecureRoute/SecureRoute";

export const AppContent = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        {AppRoutes.map((route, index) =>
          route.secure ? (
            <Route
              key={index}
              path={route.path}
              Component={route.component}
            ></Route>
          ) : (
            <SecureRoute key={index} {...route}></SecureRoute>
          )
        )}
      </Routes>
    </Suspense>
  );
};
