import styles from "./Shop.module.css";
import Loading from "../Loading/Loading";
import ProductCard from "./ProductCard";
import Popup from "./Popup";
import { useOutletContext } from "react-router";
import { useState } from "react";

export default function Shop() {
  const [productData, , , error, loading] = useOutletContext();
  const [showPopup, setShowPopup] = useState(false);
  const [item, setItem] = useState([]);

  function handleShowPopup(item, number) {
    setItem([item, number]);
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
    setItem([]);
  }

  return (
    <div className={styles.mainDiv}>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>An unexpected error occurred.</p>
      ) : (
        <>
          {productData.map((productObject) => (
            <ProductCard
              key={productObject.id}
              productObject={productObject}
              handleShowPopup={handleShowPopup}
            />
          ))}
          {showPopup && (
            <Popup duration={1500} onClose={handleClosePopup} item={item} />
          )}
        </>
      )}
    </div>
  );
}
