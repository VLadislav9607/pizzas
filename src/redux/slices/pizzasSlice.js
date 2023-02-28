import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({ order, category, search, sort, pageAction }) => {
    const { data } = await axios.get(
      `https://63f255ebf28929a9df58a99e.mockapi.io/dataPizzas?page=${pageAction}&limit=4&${search}${category}&sortBy=${sort}&order=${order}`
    );
    return data;
  }
)

const initialState = {
  pizzas: [],
  status: 'loading',
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.pizzas = action.payload;
      state.status = 'success'
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.pizzas = [];
    }
  }
})

export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer
