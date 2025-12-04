import styles from "./ErrorPage.module.css";
import { Link } from "react-router";
import Nav from "../Nav/Nav";

export default function ErrorPage() {
  return (
    <>
      <Nav />
      <div className={styles.mainDiv}>
        <p>{"\uD83E\uDDD0\u00A0 Uh-oh, looks like this page doesn't exist!"}</p>
        <Link to="/">{"\u2BA9 Return home"}</Link>
      </div>
    </>
  );
}
