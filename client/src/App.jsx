import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { getCurrentUser } from "./services/api";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const {userData} = useSelector((state)=> state.user)
  // console.log("userData is: ", userData.user)

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to={'/auth'} replace />} />
        <Route path="/auth" element={userData ? <Navigate to={'/'} replace /> : <Auth />} />
      </Routes>
    </Fragment>
  );
};

export default App;
