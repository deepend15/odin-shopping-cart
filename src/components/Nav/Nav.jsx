import styles from "./Nav.module.css";
import { Link } from "react-router";
import logo from "../../images/shophouse-logo-240px.png";

export default function Nav() {
  return (
    <nav>
      <div className={styles.logoDiv}>
        <Link to="/">
          <img src={logo} alt="ShopHouse logo." />
        </Link>
        {/* <p>ShopHouse</p> */}
      </div>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="shop">Shop!</Link>
        <Link to="cart">Cart</Link>
      </div>
    </nav>
  );
}
