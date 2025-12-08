import styles from "./Shop.module.css";
import Loading from "../Loading/Loading";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router";

export default function Shop() {
  const [productData, , , error, loading] = useOutletContext();

  return (
    <div className={styles.mainDiv}>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>An unexpected error occurred.</p>
      ) : (
        productData.map((productObject) => (
          <ProductCard key={productObject.id} productObject={productObject} />
        ))
      )}
    </div>
  );
}
