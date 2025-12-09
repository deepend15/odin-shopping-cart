import styles from "./ImageCarousel.module.css";
import { useOutletContext } from "react-router";
import { useEffect, useState, useRef, useCallback } from "react";
import backArrow from "../../images/back-arrow.svg";
import forwardArrow from "../../images/forward-arrow.svg";

// arrived at much of the useEffect & useCallback code through trial and error, ChatGPT assistance (which was slightly helpful but also exacerbated some problems), and following linter error guidance. still don't fully understand it all.

export default function ImageCarousel() {
  const [, carouselProducts, setCarouselProducts] = useOutletContext();
  const positions = [1, 2, 3, 4, 5];
  const [imageDivSecondClassName, setImageDivSecondClassName] = useState(null);
  const [productInfoDivSecondClassName, setProductInfoDivSecondClassName] =
    useState(null);
  const [productInfoClassName, setProductInfoClassName] = useState(null);
  const intervalRef = useRef(null);

  const handleRightArrowClick = useCallback(() => {
    const carouselProductsCopy = carouselProducts.slice();
    carouselProductsCopy.forEach((product) => {
      if (product.position > 1) {
        product.position = product.position - 1;
      } else product.position = 5;
    });
    setCarouselProducts(carouselProductsCopy);
    // this is part of an extremely hacky solution to have each image fade in when it comes to the front of the carousel (except on initial homepage load). code related to this is sprinkled throughout this component and in ImageCarousel.module.css. Obviously not the correct solution, but it's the only way I could get it to work with my current level of knowledge.
    imageDivSecondClassName === `${styles.fadeIn1}`
      ? setImageDivSecondClassName(`${styles.fadeIn2}`)
      : setImageDivSecondClassName(`${styles.fadeIn1}`);
  }, [carouselProducts, imageDivSecondClassName, setCarouselProducts]);

  function handleLeftArrowClick() {
    const carouselProductsCopy = carouselProducts.slice();
    carouselProductsCopy.forEach((product) => {
      if (product.position < 5) {
        product.position = product.position + 1;
      } else product.position = 1;
    });
    setCarouselProducts(carouselProductsCopy);
    imageDivSecondClassName === `${styles.fadeIn1}`
      ? setImageDivSecondClassName(`${styles.fadeIn2}`)
      : setImageDivSecondClassName(`${styles.fadeIn1}`);
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
    imageDivSecondClassName === `${styles.fadeIn1}`
      ? setImageDivSecondClassName(`${styles.fadeIn2}`)
      : setImageDivSecondClassName(`${styles.fadeIn1}`);
  }

  const startAutoSlide = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(handleRightArrowClick, 5000);
  }, [handleRightArrowClick]);

  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  function onImageDivMouseEnter() {
    setProductInfoDivSecondClassName(`${styles.visible}`);
    setProductInfoClassName(`${styles.popUp}`);
    stopAutoSlide();
  }

  function onImageDivMouseLeave() {
    setProductInfoDivSecondClassName(null);
    setProductInfoClassName(null);
    startAutoSlide();
  }

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [startAutoSlide, stopAutoSlide]);

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
          let imageDivClassName = `${styles.indivImageDiv}`;
          if (imageDivSecondClassName)
            imageDivClassName = imageDivClassName.concat(
              " ",
              imageDivSecondClassName
            );
          let productInfoDivClassName = `${styles.productInfoDiv}`;
          if (productInfoDivSecondClassName)
            productInfoDivClassName = productInfoDivClassName.concat(
              " ",
              productInfoDivSecondClassName
            );
          return (
            <div
              className={imageDivClassName}
              key={currentProduct.id}
              onMouseEnter={onImageDivMouseEnter}
              onMouseLeave={onImageDivMouseLeave}
            >
              <img
                src={currentProduct.image}
                alt={`${currentProduct.altText}.`}
                height={height}
                width={width}
              />
              <div className={productInfoDivClassName}>
                <p className={productInfoClassName}>
                  {currentProduct.altText}.
                </p>
              </div>
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
          if (product.position === 1) {
            className = className.concat(" ", `${styles.selected}`);
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
