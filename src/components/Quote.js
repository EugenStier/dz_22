import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomQuote } from "../features/quote/quoteSlice";
import styles from "./Quote.module.css";

const Quote = () => {
  const dispatch = useDispatch();
  const { content, author, status, error } = useSelector(
    (state) => state.quote
  );

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  const handleNewQuote = () => {
    dispatch(fetchRandomQuote());
  };

  let contentDisplay;

  if (status === "loading") {
    contentDisplay = <p>Загрузка...</p>;
  } else if (status === "succeeded") {
    contentDisplay = (
      <blockquote className={styles.quote}>
        <p>"{content}"</p>
        <footer>— {author}</footer>
      </blockquote>
    );
  } else if (status === "failed") {
    contentDisplay = <p className={styles.error}>Ошибка: {error}</p>;
  }

  return (
    <div className={styles.container}>
      {contentDisplay}
      <button className={styles.button} onClick={handleNewQuote}>
        Загрузить новую цитату
      </button>
    </div>
  );
};

export default Quote;
