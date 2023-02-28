import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sortType: { name: 'Популярності ↓', forFetch: 'rating' },
  pageAction: 1,
  activeIndex: 0,
  searchPizza: ''
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortChecked(state, action) {
      state.sortType = action.payload;
    },
    setPageAction(state, action) {
      state.pageAction = action.payload;
    },
    setFilters(state, action) {
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

export const selectFilter = (state) => state.filter;

export const { setCategoryId, setSortChecked, setPageAction, setFilters, setActiveIndex, setSearchPizza } = filterSlice.actions

export default filterSlice.reducer
