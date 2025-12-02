import "../styles/App.css";
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
