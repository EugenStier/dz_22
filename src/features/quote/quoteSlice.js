import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронное действие для получения случайной цитаты
export const fetchRandomQuote = createAsyncThunk(
  "quote/fetchRandomQuote",
  async () => {
    const response = await axios.get("https://api.quotable.io/random");
    return response.data; // Возвращаем данные цитаты
  }
);

// Начальное состояние
const initialState = {
  content: "",
  author: "",
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.content = action.payload.content;
        state.author = action.payload.author;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = "failed";

        // Обработка ошибок в зависимости от типа проблемы
        if (action.error.response) {
          // Сервер ответил с ошибкой (например, 404 или 500)
          state.error = `Ошибка: ${action.error.response.data}`;
        } else if (action.error.request) {
          // Запрос был отправлен, но ответа не получено
          state.error = "Ошибка: Сервер не ответил";
        } else {
          // Произошла ошибка при настройке запроса
          state.error = `Ошибка: ${action.error.message}`;
        }
      });
  },
});

export default quoteSlice.reducer;
