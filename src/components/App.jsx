import "./App.css";
import "./app-colors.css";
import { useState } from "react";
import useProductData from "./useProductData";
import Nav from "./Nav/Nav";
import { Outlet } from "react-router";

function App() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const { productData, carouselProducts, error, loading } = useProductData();

  return (
    <>
      <Nav cartItemCount={cartItemCount} />
      <Outlet context={[productData, carouselProducts, error, loading]} />
    </>
  );
}

export default App;
