import { useState, useEffect } from "react";

const useProductData = () => {
  const [productData, setProductData] = useState(null);
  const [carouselProducts, setCarouselProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching product data.");
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setProductData(response);
        const carouselProductIds = [3, 17, 6, 10, 14];
        const carouselProductArray = [];
        carouselProductIds.forEach((id, index) => {
          const targetedProductArray = response.filter(
            (productObject) => productObject.id === id
          );
          const targetedProduct = targetedProductArray[0];
          targetedProduct.position = index + 1;
          let altText;
          id === 3
            ? (altText = "Men's tan zip-up cotton jacket.")
            : id === 17
            ? (altText = "Women's navy zip-up lightweight rain jacket.")
            : id === 6
            ? (altText = "Micro pavé diamond ring.")
            : id === 10
            ? (altText = "SanDisk SSD PLUS 1TB Internal SSD.")
            : (altText = "Samsung 49-Inch Curved Gaming Monitor.");
          targetedProduct.altText = altText;
          carouselProductArray.push(targetedProduct);
        });
        console.log(carouselProductArray);
        setCarouselProducts(carouselProductArray);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { productData, carouselProducts, setCarouselProducts, error, loading };
};

export default useProductData;
