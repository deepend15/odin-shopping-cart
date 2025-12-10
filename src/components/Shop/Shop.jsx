import styles from "./Shop.module.css";
import Loading from "../Loading/Loading";
import FetchError from "../FetchError/FetchError";
import ProductCard from "./ProductCard";
import Popup from "./Popup";
import { useOutletContext } from "react-router";
import { useEffect, useState } from "react";

export default function Shop() {
  const [productData, , , error, loading] = useOutletContext();
  const [showPopup, setShowPopup] = useState(false);
  const [itemInfo, setItemInfo] = useState([]);

  function handleShowPopup(item, number) {
    setItemInfo([item, number]);
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
    setItemInfo([]);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.mainDiv}>
      {loading ? (
        <Loading />
      ) : error ? (
        <FetchError />
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
            <Popup
              duration={1500}
              onClose={handleClosePopup}
              itemInfo={itemInfo}
              showPopup={showPopup}
            />
          )}
        </>
      )}
    </div>
  );
}
