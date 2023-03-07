import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

type Pizza = {
  id: number,
  imageUrl: string,
  title: string,
  price: number,
  types: number[],
  sizes: number[],
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
interface PizzasSliceState {
  pizzas: Pizza[],
  status: Status,
}

const initialState: PizzasSliceState = {
  pizzas: [],
  status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { order, category, search, sort, pageAction } = params;
    const { data } = await axios.get(
      `https://63f255ebf28929a9df58a99e.mockapi.io/dataPizzas?page=${pageAction}&limit=4&${search}${category}&sortBy=${sort}&order=${order}`
    );
    return data;
  }
)

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.pizzas = action.payload;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  }
})

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions

export default pizzasSlice.reducer
