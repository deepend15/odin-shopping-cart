import styles from "./ProductCard.module.css";
import { useOutletContext } from "react-router";
import { useState } from "react";

export default function ProductCard({ productObject }) {
  const [, , , , ,] = useOutletContext();
  const [productNumberValue, setProductNumberValue] = useState(0);

  const productImage = new Image();
  productImage.src = productObject.image;
  let height = null;
  let width = null;
  productImage.height > productImage.width ? (height = 150) : (width = 150);

  function handleChange(e) {
    setProductNumberValue(e.target.value);
  }

  return (
    <div className={styles.cardDiv}>
      <div className={styles.imageDiv}>
        <img
          src={productObject.image}
          alt={productObject.altText}
          height={height}
          width={width}
        />
      </div>
      <p>{productObject.altText.slice(0, productObject.altText.length - 1)}</p>
      <div className={styles.itemSelectionDiv}>
        <button>-</button>
        <input
          type="number"
          id={"product" + productObject.id + "number"}
          name={"product" + productObject.id + "number"}
          min={0}
          max={10}
          value={productNumberValue}
          onChange={handleChange}
        />
        <button>+</button>
      </div>
      <button>Add to cart</button>
    </div>
  );
}
