import { Outlet } from "react-router";
import { Header } from "@/ui/common/components/header/header";
import "./layout.css";

export function Layout() {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
