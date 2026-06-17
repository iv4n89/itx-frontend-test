import { Outlet } from "react-router";
import { Header } from "../header/header";
import "./layout.css";

export const Layout = () => {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
