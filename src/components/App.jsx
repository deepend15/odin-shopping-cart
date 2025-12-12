import "./App.css";
import "./app-colors.css";
import { useContext, useState } from "react";
import useProductData from "./useProductData";
import Nav from "./Nav/Nav";
import DeleteConfirmation from "./DeleteConfirmation/DeleteConfirmation";
import { Outlet } from "react-router";
import { SharedContext } from "./SharedContext";

function App() {
  const { productData, carouselProducts, setCarouselProducts, error, loading } =
    useProductData();
  const { numberOfCartItems, setNumberOfCartItems, cart, setCart } =
    useContext(SharedContext);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [cartObjectToRemove, setCartObjectToRemove] = useState(null);

  function getNumberOfCartItems(cart) {
    const cartItemObjectsArray = Object.values(cart);
    if (cartItemObjectsArray.length === 0) return 0;
    return cartItemObjectsArray.reduce((total, currentItem) => {
      return total + currentItem.number;
    }, 0);
  }

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
          setShowDeleteConfirmation,
          setCartObjectToRemove,
        ]}
      />
      {showDeleteConfirmation && (
        <DeleteConfirmation
          cartObjectToRemove={cartObjectToRemove}
          setCartObjectToRemove={setCartObjectToRemove}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          cart={cart}
          setCart={setCart}
          setNumberOfCartItems={setNumberOfCartItems}
          getNumberOfCartItems={getNumberOfCartItems}
        />
      )}
    </>
  );
}

export default App;
