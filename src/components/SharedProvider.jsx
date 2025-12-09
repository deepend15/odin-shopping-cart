// had to look this up in order to share props between 'errorElement' and other components (so that the cartItemCount shows in the nav on the error page). affected components (other than this one):
// -new component SharedContext.jsx (imported here)
// -main.jsx: had to wrap <RouterProvider> in <SharedProvider>
// -in order to use cartItemCount and setCartItemCount in other places, import useContext from react and { SharedContext } from SharedContext.jsx, then destructure using useContext (i.e. 'const { cartItemCount, setCartItemCount } = useContext(SharedContext)')

import { useState } from "react";
import { SharedContext } from "./SharedContext";

export function SharedProvider({ children }) {
  const [cart, setCart] = useState({});
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  function getNumberOfCartItems(cart) {
    const cartItemObjectsArray = Object.values(cart);
    if (cartItemObjectsArray.length === 0) return 0;
    return cartItemObjectsArray.reduce((total, currentItem) => {
      return total + currentItem.number;
    }, 0);
  }

  return (
    <SharedContext.Provider
      value={{
        cart,
        setCart,
        numberOfCartItems,
        setNumberOfCartItems,
        getNumberOfCartItems,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
}
