import styles from "./Home.module.css";
import { Link, useOutletContext } from "react-router";
import ImageCarousel from "./ImageCarousel";

export default function Home() {
  const [, , error, loading] = useOutletContext();
  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.h2}>Shop 'til you drop!</h2>
      <ImageCarousel />
      {!loading && !error && (
        <Link to="shop">{"Start shopping now \uD83E\uDCA1"}</Link>
      )}
    </div>
  );
}
