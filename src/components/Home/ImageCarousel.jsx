import styles from "./ImageCarousel.module.css";
import { useOutletContext } from "react-router";
import backArrow from "../../images/back-arrow.svg";
import forwardArrow from "../../images/forward-arrow.svg";

export default function ImageCarousel() {
  const [, carouselProducts, setCarouselProducts, error, loading] =
    useOutletContext();
  const positions = [1, 2, 3, 4, 5];

  function handleRightArrowClick() {
    const carouselProductsCopy = carouselProducts.slice();
    carouselProductsCopy.forEach((product) => {
      let newPosition;
      if (product.position > 1) {
        newPosition = product.position - 1;
      } else newPosition = 5;
      product.position = newPosition;
    });
    setCarouselProducts(carouselProductsCopy);
  }

  function handleLeftArrowClick() {
    const carouselProductsCopy = carouselProducts.slice();
    carouselProductsCopy.forEach((product) => {
      let newPosition;
      if (product.position < 5) {
        newPosition = product.position + 1;
      } else newPosition = 1;
      product.position = newPosition;
    });
    setCarouselProducts(carouselProductsCopy);
  }

  function handleProductCircleButtonClick(e) {
    const targetedProductIndex = carouselProducts.findIndex(
      (product) => product.id === Number(e.currentTarget.dataset.associatedId)
    );
    if (carouselProducts[targetedProductIndex].position === 1) return;
    const carouselProductsCopy = carouselProducts.slice();
    carouselProductsCopy[targetedProductIndex].position = 1;
    const leftSide = carouselProductsCopy.slice(0, targetedProductIndex);
    const rightSide = carouselProductsCopy.slice(targetedProductIndex + 1);
    if (leftSide.length !== 0) {
      let count = 5;
      for (let i = targetedProductIndex - 1; i >= 0; i--) {
        carouselProductsCopy[i].position = count;
        count--;
      }
    }
    if (rightSide.length !== 0) {
      let count = 2;
      for (
        let i = targetedProductIndex + 1;
        i < carouselProductsCopy.length;
        i++
      ) {
        carouselProductsCopy[i].position = count;
        count++;
      }
    }
    setCarouselProducts(carouselProductsCopy);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An unexpected error occurred.</p>;
  return (
    <div className={styles.carouselDiv}>
      <button className={styles.leftArrowBtn} onClick={handleLeftArrowClick}>
        <img src={backArrow} alt="" />
      </button>
      <div className={styles.imagesDiv}>
        {positions.map((position) => {
          let height = null;
          let width = null;
          const currentProductArray = carouselProducts.filter(
            (product) => product.position === position
          );
          const currentProduct = currentProductArray[0];
          if (currentProduct.id === 3 || currentProduct.id === 17) height = 350;
          else width = 350;
          return (
            <div className={styles.indivImageDiv} key={currentProduct.id}>
              <img
                src={currentProduct.image}
                alt={currentProduct.altText}
                height={height}
                width={width}
              />
            </div>
          );
        })}
      </div>
      <button className={styles.rightArrowBtn} onClick={handleRightArrowClick}>
        <img src={forwardArrow} alt="" />
      </button>
      <div className={styles.circlesDiv}>
        {carouselProducts.map((product) => {
          let className = `${styles.circleDiv}`;
          let additionalClassName;
          if (product.position === 1) {
            additionalClassName = `${styles.selected}`;
            className = className.concat(" ", additionalClassName);
          }
          return (
            <button
              className={className}
              key={product.id}
              data-associated-id={product.id}
              onClick={handleProductCircleButtonClick}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
