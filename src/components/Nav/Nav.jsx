import styles from "./Nav.module.css";
import { Link } from "react-router";
import logo from "../../images/shophouse-logo-240px.png";
import cartIcon from "../../images/cart.svg";

export default function Nav({ cartItemCount }) {
  return (
    <nav>
      <div className={styles.logoDiv}>
        <Link to="/">
          <img src={logo} alt="ShopHouse logo." />
        </Link>
        <Link to="/" className={styles.logoDivName}>
          ShopHouse
        </Link>
      </div>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="shop">Shop!</Link>
        <Link to="cart" className={styles.cartLink}>
          <img src={cartIcon} alt="Shopping cart icon." />
          <span>Cart ({cartItemCount})</span>
        </Link>
      </div>
    </nav>
  );
}
