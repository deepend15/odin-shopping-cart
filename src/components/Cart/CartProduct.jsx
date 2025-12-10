import styles from "./CartProduct.module.css";
import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";

export default function CartProduct({ cartObject }) {
  const [
    productData,
    ,
    ,
    ,
    ,
    ,
    setCart,
    ,
    setNumberOfCartItems,
    getNumberOfCartItems,
  ] = useOutletContext();
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  const currentProductArray = productData.filter(
    (productObject) => productObject.id === cartObject.id
  );
  const currentProduct = currentProductArray[0];

  useEffect(() => {
    const productImage = new Image();
    productImage.src = currentProduct.image;
    productImage.onload = () => {
      productImage.height > productImage.width ? setHeight(115) : setWidth(115);
    };
  }, [currentProduct.image]);

  return (
    <div key={cartObject.id} className={styles.itemDiv}>
      <div className={styles.imageDiv}>
        {(height || width) && (
          <img
            height={height}
            width={width}
            alt={currentProduct.altText}
            src={currentProduct.image}
          />
        )}
      </div>
      <div className={styles.itemDivRight}>
        <div className={styles.itemInfoDiv}>
          <div className={styles.itemInfoLeft}>
            <p className={styles.itemTitle}>{currentProduct.altText}</p>
            <p className={styles.itemPrice}>
              ${(currentProduct.price * cartObject.number).toFixed(2)}
            </p>
          </div>
          <div className={styles.itemInfoRight}>
            <button className={styles.decrease}>-</button>
            <span>{cartObject.number}</span>
            <button className={styles.increase}>+</button>
          </div>
        </div>
        <button className={styles.removeItemButton}>Remove item</button>
      </div>
    </div>
  );
}
