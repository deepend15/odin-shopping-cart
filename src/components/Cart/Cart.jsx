import styles from "./Cart.module.css";
import Loading from "../Loading/Loading";
import FetchError from "../FetchError/FetchError";
import CartProduct from "./CartProduct";
import { useOutletContext } from "react-router";
import { Link } from "react-router";
import { useEffect } from "react";

export default function Cart() {
  const [productData, , , error, loading, cart] = useOutletContext();

  const cartObjects = Object.values(cart);

  function getSubtotal() {
    if (cartObjects.length === 0) return 0;

    const costArray = [];

    cartObjects.forEach((cartObject) => {
      const targetedProductArray = productData.filter(
        (productObject) => productObject.id === cartObject.id
      );
      const targetedProduct = targetedProductArray[0];
      costArray.push(targetedProduct.price * cartObject.number);
    });

    return costArray
      .reduce((total, currentNumber) => {
        return total + currentNumber;
      })
      .toFixed(2);
  }

  const subtotal = getSubtotal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.mainDiv}>
      {loading ? (
        <Loading />
      ) : error ? (
        <FetchError />
      ) : subtotal === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/shop">{"Shop for items now! \uD83E\uDCA1"}</Link>
        </>
      ) : (
        <>
          <div className={styles.cartDiv}>
            {cartObjects.map((cartObject) => {
              return (
                <CartProduct key={cartObject.id} cartObject={cartObject} />
              );
            })}
          </div>
          <div className={styles.rightSide}>
            <p className={styles.subtotalLine}>Subtotal: ${subtotal}</p>
            <Link to="/shop">{"Add more items \uD83E\uDCA1"}</Link>
            <button disabled>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
