import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <p className={styles.loading}>
      Loading
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </p>
  );
}
