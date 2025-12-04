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
        carouselProductIds.forEach((id) => {
          const targetedProductArray = response.filter(
            (productObject) => productObject.id === id
          );
          const targetedProduct = targetedProductArray[0];
          carouselProductArray.push(targetedProduct);
        });
        setCarouselProducts(carouselProductArray);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { productData, carouselProducts, error, loading };
};

export default useProductData;

// export async function getProducts() {
//   try {
//     const response = await fetch("https://fakestoreapi.com/products");

//     if (!response.ok) {
//       throw new Error("Error fetching product data.");
//     }

//     const json = await response.json();
//     console.log(json);
//     return json;
//   } catch (error) {
//     console.error(error);
//   }
// }
