import "./App.css";
import "./app-colors.css";
import { useContext } from "react";
import useProductData from "./useProductData";
import Nav from "./Nav/Nav";
import { Outlet } from "react-router";
import { SharedContext } from "./SharedContext";

function App() {
  const { cartItemCount, setCartItemCount } = useContext(SharedContext);
  const { productData, carouselProducts, setCarouselProducts, error, loading } =
    useProductData();

  return (
    <>
      <Nav cartItemCount={cartItemCount} />
      <Outlet
        context={[
          productData,
          carouselProducts,
          setCarouselProducts,
          error,
          loading,
          cartItemCount,
          setCartItemCount,
        ]}
      />
    </>
  );
}

export default App;
