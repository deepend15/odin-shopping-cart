import styles from "./ImageCarousel.module.css";
import { useOutletContext } from "react-router";

export default function ImageCarousel() {
  const [, carouselProducts, error, loading] = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An unexpected error occurred.</p>;
  return (
    <div className={styles.carouselDiv}>
      <p>Image carousel, length = {carouselProducts.length}.</p>
      <p>First item: {carouselProducts[0].title}.</p>
      <p>Second item: {carouselProducts[1].title}.</p>
      <p>Third item: {carouselProducts[2].title}.</p>
      <p>Fourth item: {carouselProducts[3].title}.</p>
      <p>Fifth item: {carouselProducts[4].title}.</p>
    </div>
  );
}
