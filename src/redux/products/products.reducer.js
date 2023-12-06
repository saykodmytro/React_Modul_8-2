import { productsData } from 'Data/data';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: JSON.parse(localStorage.getItem('products')) ?? productsData, // [{}, {}, ...]
  isLoading: false,
  error: null,
  filterTerm: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    setFilterTerm(state, { payload }) {
      state.filterTerm = payload;
    },
    addProduct(state, { payload }) {
      state.products.push(payload);
    },
    deleteProduct(state, { payload }) {
      state.products = state.products.filter(product => product.id !== payload);
    },
  },
});

// Генератори екшенів
export const { addProduct, deleteProduct, setFilterTerm } =
  productsSlice.actions;
// Редюсер слайсу
export const productsReducer = productsSlice.reducer;
