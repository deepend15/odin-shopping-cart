import { Link } from "react-router";

export default function ErrorPage() {
  return (
    <div>
      <p>This page doesn't exist!</p>
      <Link to="/">Return home</Link>
    </div>
  );
}
