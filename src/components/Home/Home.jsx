import { Link } from "react-router";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.mainDiv}>
      <h1>ShopHouse</h1>
      <div className={styles.carouselDiv}>image carousel</div>
      <Link to="shop">{"Start shopping now \uD83E\uDCA1"}</Link>
    </div>
  );
}
