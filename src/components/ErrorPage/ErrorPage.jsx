import { Link } from "react-router";
import Nav from "../Nav/Nav";

export default function ErrorPage() {
  return (
    <>
      <Nav />
      <div>
        <p>This page doesn't exist!</p>
        <Link to="/">Return home</Link>
      </div>
    </>
  );
}
