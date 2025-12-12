import styles from "./CartProduct.module.css";
import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";
import trashIcon from "../../images/trash-can.svg";

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
    setShowDeleteConfirmation,
    setCartObjectToRemove,
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

  function handleRemoveItem() {
    setShowDeleteConfirmation(true);
    setCartObjectToRemove(cartObject);
  }

  function handleDecrementItem() {
    if (cartObject.number > 1) {
      const propertyName = "product" + cartObject.id;
      const newCart = {
        ...cart,
        [propertyName]: {
          ...cart[propertyName],
          number: cart[propertyName].number - 1,
        },
      };
      setCart(newCart);
      const numberOfCartItems = getNumberOfCartItems(newCart);
      setNumberOfCartItems(numberOfCartItems);
    } else {
      handleRemoveItem();
    }
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
              {cartObject.number === 1 ? (
                <div className={styles.iconDiv}>
                  <img src={trashIcon} alt="Delete icon." />
                </div>
              ) : (
                "-"
              )}
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
