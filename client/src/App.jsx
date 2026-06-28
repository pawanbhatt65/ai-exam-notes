import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { getCurrentUser } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import Notes from "./pages/Notes";
import History from "./pages/History";
import Pricing from "./pages/Pricing";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);
  // console.log("userData is: ", userData.user)

  return (
    <Fragment>
      <Routes>
        <Route
          path="/auth"
          exact
          element={userData ? <Navigate to={"/"} replace /> : <Auth />}
        />
        <Route
          path="/"
          exact
          element={userData ? <Home /> : <Navigate to={"/auth"} replace />}
        />
        <Route
          path="/notes"
          exact
          element={userData ? <Notes /> : <Navigate to={"/auth"} replace />}
        />
        <Route
          path="/history"
          exact
          element={userData ? <History /> : <Navigate to={"/auth"} replace />}
        />
        <Route
          path="/pricing"
          exact
          element={userData ? <Pricing /> : <Navigate to={"/auth"} replace />}
        />
      </Routes>
    </Fragment>
  );
};

export default App;
