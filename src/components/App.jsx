import "./App.css";
import "./app-colors.css";
import Nav from "./Nav/Nav";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;
