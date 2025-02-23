import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Login from "../Pages/Login";
import { AuthContext } from "../Provider/AuthProvider";

export default function Main() {
  const { user } = useContext(AuthContext);

  return <div>{user ? <Outlet /> : <Login />}</div>;
}
