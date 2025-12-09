import styles from "./Popup.module.css";
import { useState, useEffect } from "react";

export default function Popup({ duration, onClose, item }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    const unmountTimer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, duration + 1500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(unmountTimer);
    };
  }, [duration, onClose]);

  let className = `${styles.popup}`;
  isVisible
    ? (className = className + ` ${styles.visible}`)
    : (className = className + ` ${styles.hidden}`);

  return (
    <div className={className}>
      Added to cart: ({item[1]}) {item[0]}
    </div>
  );
}
