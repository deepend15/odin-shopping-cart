import styles from "./DeleteConfirmation.module.css";
import { useEffect, useRef } from "react";

export default function DeleteConfirmation({
  cartObjectToRemove,
  setCartObjectToRemove,
  setShowDeleteConfirmation,
  cart,
  setCart,
  setNumberOfCartItems,
  getNumberOfCartItems,
}) {
  const dialogRef = useRef(null);

  function handleNoClick() {
    setShowDeleteConfirmation(false);
    setCartObjectToRemove(null);
  }

  function handleYesClick() {
    const propertyName = "product" + cartObjectToRemove.id;
    const newCart = { ...cart };
    delete newCart[propertyName];
    setCart(newCart);
    const numberOfCartItems = getNumberOfCartItems(newCart);
    setNumberOfCartItems(numberOfCartItems);
    setShowDeleteConfirmation(false);
    setCartObjectToRemove(null);
  }

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  return (
    <dialog className={styles.deleteConfirmationDialog} ref={dialogRef}>
      <p>Are you sure you want to remove this item?</p>
      <div className={styles.buttonDiv}>
        <button className={styles.no} onClick={handleNoClick}>
          No
        </button>
        <button className={styles.yes} onClick={handleYesClick}>
          Yes
        </button>
      </div>
    </dialog>
  );
}
