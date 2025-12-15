import styles from "./ProductCard.module.css";
import { useOutletContext } from "react-router";
import { useState, useEffect, useRef } from "react";

export default function ProductCard({ productObject, handleShowPopup }) {
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
  const [productNumberValue, setProductNumberValue] = useState(0);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const productImage = new Image();
    productImage.src = productObject.image;
    productImage.onload = () => {
      productImage.height > productImage.width ? setHeight(150) : setWidth(150);
    };
  }, [productObject.image]);

  function handleProductNumberFocus() {
    inputRef.current.select();
  }

  function handleProductNumberChange(e) {
    const inputtedNumber = Number(e.target.value);
    if (inputtedNumber <= 10) setProductNumberValue(inputtedNumber);
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

  function idInCart() {
    const cartItemObjectsArray = Object.values(cart);
    if (cartItemObjectsArray.length !== 0) {
      const matchingObjectArray = cartItemObjectsArray.filter(
        (item) => item.id === productObject.id
      );
      if (matchingObjectArray.length !== 0) return true;
    }
    return false;
  }

  function handleAddToCart() {
    if (productNumberValue === 0) return;

    const propertyName = "product" + productObject.id;
    let newCart;

    if (idInCart()) {
      newCart = {
        ...cart,
        [propertyName]: {
          ...cart[propertyName],
          number: cart[propertyName].number + productNumberValue,
        },
      };
    } else {
      newCart = {
        ...cart,
        [propertyName]: {
          id: productObject.id,
          number: productNumberValue,
        },
      };
    }

    setCart(newCart);
    const newCartItemNumber = getNumberOfCartItems(newCart);
    setNumberOfCartItems(newCartItemNumber);
    setProductNumberValue(0);
    handleShowPopup(productObject.altText, productNumberValue);
  }

  return (
    <div className={styles.cardDiv}>
      <div className={styles.imageDiv}>
        {(height || width) && (
          <img
            src={productObject.image}
            alt={`${productObject.altText}.`}
            height={height}
            width={width}
          />
        )}
      </div>
      <div className={styles.middleDiv}>
        <p className={styles.title}>{productObject.altText}</p>
        <p className={styles.price}>${productObject.price.toFixed(2)}</p>
      </div>
      <div className={styles.bottomDiv}>
        <div className={styles.itemSelectionDiv}>
          <button onClick={handleDecrementItem}>-</button>
          <input
            type="number"
            id={"product" + productObject.id + "number"}
            name={"product" + productObject.id + "number"}
            ref={inputRef}
            onFocus={handleProductNumberFocus}
            value={productNumberValue}
            onChange={handleProductNumberChange}
          />
          <button onClick={handleIncrementItem}>+</button>
        </div>
        <button onClick={handleAddToCart} className={styles.addToCartButton}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
