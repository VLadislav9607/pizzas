import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type SortType = {
  name: string,
  forFetch: string
}

interface FilterSliceState {
  categoryId: number,
  sortType: SortType,
  pageAction: number,
  activeIndex: number,
  searchPizza: string,
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sortType: { name: 'Популярності ↓', forFetch: 'rating' },
  pageAction: 1,
  activeIndex: 0,
  searchPizza: '',
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortChecked(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setPageAction(state, action: PayloadAction<number>) {
      state.pageAction = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sortType = action.payload.sortType;
      state.categoryId = Number(action.payload.categoryId);
      state.pageAction = Number(action.payload.pageAction);
      state.activeIndex = Number(action.payload.activeIndex);
    },
    setActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
    setSearchPizza(state, action) {
      state.searchPizza = action.payload;
    }
  }
});

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSortChecked, setPageAction, setFilters, setActiveIndex, setSearchPizza } = filterSlice.actions

export default filterSlice.reducer
