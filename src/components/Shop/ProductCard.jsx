import styles from "./ProductCard.module.css";
import showPriceString from "../showPriceString";
import { useOutletContext } from "react-router";
import { useState, useEffect } from "react";

export default function ProductCard({ productObject }) {
  const [, , , , ,] = useOutletContext();
  const [productNumberValue, setProductNumberValue] = useState(0);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  useEffect(() => {
    const productImage = new Image();
    productImage.src = productObject.image;
    productImage.onload = () => {
      productImage.height > productImage.width ? setHeight(150) : setWidth(150);
    };
  }, [productObject.image]);

  function handleChange(e) {
    setProductNumberValue(e.target.value);
  }

  function handleIncrementItem() {
    if (productNumberValue < 10)
      setProductNumberValue(
        (previousProductNumberValue) => previousProductNumberValue + 1
      );
  }

  function handleDecrementItem() {
    if (productNumberValue > 0) {
      setProductNumberValue(
        (previousProductNumberValue) => previousProductNumberValue - 1
      );
    }
  }

  return (
    <div className={styles.cardDiv}>
      <div className={styles.imageDiv}>
        {(height || width) && (
          <img
            src={productObject.image}
            alt={productObject.altText}
            height={height}
            width={width}
          />
        )}
      </div>
      <div className={styles.middleDiv}>
        <p className={styles.title}>
          {productObject.altText.slice(0, productObject.altText.length - 1)}
        </p>
        <p className={styles.price}>{showPriceString(productObject.price)}</p>
        <div className={styles.itemSelectionDiv}>
          <button onClick={handleDecrementItem}>-</button>
          <input
            type="number"
            id={"product" + productObject.id + "number"}
            name={"product" + productObject.id + "number"}
            min={0}
            max={10}
            value={productNumberValue}
            onChange={handleChange}
          />
          <button onClick={handleIncrementItem}>+</button>
        </div>
      </div>
      <button>Add to cart</button>
    </div>
  );
}
