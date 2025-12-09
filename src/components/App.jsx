import "./App.css";
import "./app-colors.css";
import { useContext } from "react";
import useProductData from "./useProductData";
import Nav from "./Nav/Nav";
import { Outlet } from "react-router";
import { SharedContext } from "./SharedContext";

function App() {
  const { productData, carouselProducts, setCarouselProducts, error, loading } =
    useProductData();
  const {
    cart,
    setCart,
    numberOfCartItems,
    setNumberOfCartItems,
    getNumberOfCartItems,
  } = useContext(SharedContext);

  return (
    <>
      <Nav numberOfCartItems={numberOfCartItems} />
      <Outlet
        context={[
          productData,
          carouselProducts,
          setCarouselProducts,
          error,
          loading,
          cart,
          setCart,
          numberOfCartItems,
          setNumberOfCartItems,
          getNumberOfCartItems,
        ]}
      />
    </>
  );
}

export default App;
