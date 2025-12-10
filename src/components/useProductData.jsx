import { useState, useEffect } from "react";

const useProductData = () => {
  const [productData, setProductData] = useState(null);
  const [carouselProducts, setCarouselProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  function setAltText(id, obj) {
    id === 1
      ? (obj.altText = "Fjallraven - Foldsack No. 1 backpack")
      : id === 2
      ? (obj.altText = "Men's casual slim fit t-shirt")
      : id === 3
      ? (obj.altText = "Men's tan zip-up cotton jacket")
      : id === 4
      ? (obj.altText = "Men's casual slim fit long sleeve t-shirt")
      : id === 5
      ? (obj.altText =
          "John Hardy women's gold & silver dragon chain bracelet")
      : id === 6
      ? (obj.altText = "Micro pavé diamond ring")
      : id === 7
      ? (obj.altText = "White gold plated princess diamond ring")
      : id === 8
      ? (obj.altText = "Rose gold plated double flared tunnel plug earrings")
      : id === 9
      ? (obj.altText =
          "2TB USB 3.0 and USB 2.0 compatible external hard drive")
      : id === 10
      ? (obj.altText = "SanDisk SSD PLUS 1TB Internal SSD")
      : id === 11
      ? (obj.altText = "Silicon Power 256GB SSD")
      : id === 12
      ? (obj.altText = "WD 4TB Playstation 4 portable external hard drive")
      : id === 13
      ? (obj.altText = "Acer 21.5 inch full HD ultra-thin monitor")
      : id === 14
      ? (obj.altText = "Samsung 49-Inch Curved Gaming Monitor")
      : id === 15
      ? (obj.altText = "Women's purple 3-in-1 snowboard jacket")
      : id === 16
      ? (obj.altText = "Women's removable hooded faux leather biker jacket")
      : id === 17
      ? (obj.altText = "Women's navy zip-up lightweight rain jacket")
      : id === 18
      ? (obj.altText = "Women's short sleeve boat neck top")
      : id === 19
      ? (obj.altText = "Women's moisture-wicking v-neck t-shirt")
      : (obj.altText = "Women's casual cotton v-neck t-shirt");
  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching product data.");
        }
        return response.json();
      })
      .then((response) => {
        response.forEach((productObject) => {
          setAltText(productObject.id, productObject);
        });
        setProductData(response);
        const carouselProductIds = [3, 17, 6, 10, 14];
        const carouselProductArray = [];
        carouselProductIds.forEach((id, index) => {
          const targetedProductArray = response.filter(
            (productObject) => productObject.id === id
          );
          const targetedProduct = targetedProductArray[0];
          const carouselProduct = {
            ...targetedProduct,
            position: index + 1,
          };
          carouselProductArray.push(carouselProduct);
        });
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
