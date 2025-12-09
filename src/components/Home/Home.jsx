import styles from "./Home.module.css";
import Loading from "../Loading/Loading";
import { Link, useOutletContext } from "react-router";
import ImageCarousel from "./ImageCarousel";

export default function Home() {
  const [, , , error, loading, ...rest] = useOutletContext();
  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.h2}>Shop 'til you drop!</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>An unexpected error occurred.</p>
      ) : (
        <>
          <ImageCarousel />
          <Link to="shop">{"Start shopping now \uD83E\uDCA1"}</Link>
        </>
      )}
    </div>
  );
}
