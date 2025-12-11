import styles from "./CartProduct.module.css";
import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";

export default function CartProduct({ cartObject, productDataObject }) {
  const [
    ,
    ,
    ,
    ,
    ,
    cart,
    setCart,
    ,
    setNumberOfCartItems,
    getNumberOfCartItems,
  ] = useOutletContext();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    const productImage = new Image();
    productImage.src = productDataObject.image;
    productImage.onload = () => {
      productImage.height > productImage.width ? setHeight(115) : setWidth(115);
    };
  }, [productDataObject.image]);

  function handleIncrementItem() {
    if (cartObject.number === 10) return;

    const propertyName = "product" + cartObject.id;
    const newCart = {
      ...cart,
      [propertyName]: {
        ...cart[propertyName],
        number: cart[propertyName].number + 1,
      },
    };
    setCart(newCart);
    const numberOfCartItems = getNumberOfCartItems(newCart);
    setNumberOfCartItems(numberOfCartItems);
  }

  function handleDecrementItem() {
    const propertyName = "product" + cartObject.id;
    const newCart = { ...cart };
    if (cartObject.number > 1) {
      newCart[propertyName] = {
        ...cart[propertyName],
        number: cart[propertyName].number - 1,
      };
    } else {
      delete newCart[propertyName];
    }
    setCart(newCart);
    const numberOfCartItems = getNumberOfCartItems(newCart);
    setNumberOfCartItems(numberOfCartItems);
  }

  function handleRemoveItem() {
    const propertyName = "product" + cartObject.id;
    const newCart = { ...cart };
    delete newCart[propertyName];
    setCart(newCart);
    const numberOfCartItems = getNumberOfCartItems(newCart);
    setNumberOfCartItems(numberOfCartItems);
  }

  return (
    <div key={cartObject.id} className={styles.itemDiv}>
      <div className={styles.imageDiv}>
        {(height || width) && (
          <img
            height={height}
            width={width}
            alt={productDataObject.altText}
            src={productDataObject.image}
          />
        )}
      </div>
      <div className={styles.itemDivRight}>
        <div className={styles.itemInfoDiv}>
          <div className={styles.itemInfoLeft}>
            <p className={styles.itemTitle}>{productDataObject.altText}</p>
            <p className={styles.itemPrice}>
              ${(productDataObject.price * cartObject.number).toFixed(2)}
            </p>
          </div>
          <div className={styles.itemInfoRight}>
            <button className={styles.decrease} onClick={handleDecrementItem}>
              -
            </button>
            <span>{cartObject.number}</span>
            <button className={styles.increase} onClick={handleIncrementItem}>
              +
            </button>
          </div>
        </div>
        <button className={styles.removeItemButton} onClick={handleRemoveItem}>
          Remove item
        </button>
      </div>
    </div>
  );
}
