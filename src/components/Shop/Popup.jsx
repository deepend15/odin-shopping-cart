import styles from "./Popup.module.css";
import { useState, useEffect, useRef, useCallback } from "react";

export default function Popup({ duration, onClose, itemInfo, showPopup }) {
  const [isVisible, setIsVisible] = useState(true);
  const fadeoutRef = useRef(null);
  const unmountRef = useRef(null);

  const startFadeoutTimer = useCallback(() => {
    if (fadeoutRef.current !== null) return;
    fadeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, duration);
  }, [duration]);

  const clearFadeoutTimer = useCallback(() => {
    if (fadeoutRef.current !== null) {
      clearTimeout(fadeoutRef.current);
      fadeoutRef.current = null;
    }
  }, []);

  const startUnmountTimer = useCallback(() => {
    if (unmountRef.current !== null) return;
    unmountRef.current = setTimeout(() => {
      if (onClose) {
        onClose()
      }
    }, duration + 1500);
  }, [duration, onClose]);

  const clearUnmountTimer = useCallback(() => {
    if (unmountRef.current !== null) {
      clearTimeout(unmountRef.current);
      unmountRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (showPopup) {
      clearFadeoutTimer();
      clearUnmountTimer();
      setIsVisible(true);
      startFadeoutTimer();
      startUnmountTimer();
    } else {
      startFadeoutTimer();
      startUnmountTimer();
    }


    // const fadeOutTimer = setTimeout(() => {
    //   setIsVisible(false);
    // }, duration);

    // const unmountTimer = setTimeout(() => {
    //   if (onClose) {
    //     onClose();
    //   }
    // }, duration + 1500);

    return () => {
      clearFadeoutTimer();
      clearUnmountTimer();
      // clearTimeout(fadeOutTimer);
      // clearTimeout(unmountTimer);
    };
  }, [startFadeoutTimer, clearFadeoutTimer, startUnmountTimer, clearUnmountTimer, showPopup]);

  let className = `${styles.popup}`;
  isVisible
    ? (className = className + ` ${styles.visible}`)
    : (className = className + ` ${styles.hidden}`);

  return (
    <div className={className}>
      Added to cart: ({itemInfo[1]}) {itemInfo[0]}
    </div>
  );
}
