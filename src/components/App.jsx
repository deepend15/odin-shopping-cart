import "./App.css";
import "./app-colors.css";
import useProductData from "./useProductData";
import Nav from "./Nav/Nav";
import { Outlet } from "react-router";

function App() {
  const { productData, carouselProducts, error, loading } = useProductData();

  return (
    <>
      <Nav />
      <Outlet context={[productData, carouselProducts, error, loading]} />
    </>
  );
}

export default App;
