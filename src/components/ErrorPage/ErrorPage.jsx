import styles from "./ErrorPage.module.css";
import { Link } from "react-router";
import Nav from "../Nav/Nav";
import { useContext } from "react";
import { SharedContext } from "../SharedContext";

export default function ErrorPage() {
  const { cartItemCount } = useContext(SharedContext);

  return (
    <>
      <Nav cartItemCount={cartItemCount} />
      <div className={styles.mainDiv}>
        <p>{"\uD83E\uDDD0\u00A0 Uh-oh, looks like this page doesn't exist!"}</p>
        <Link to="/">{"\u2BA9 Return home"}</Link>
      </div>
    </>
  );
}
