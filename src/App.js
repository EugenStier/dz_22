import React from "react";
import Quote from "./components/Quote";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <h1>Случайные Цитаты</h1>
      <Quote />
    </div>
  );
}

export default App;
