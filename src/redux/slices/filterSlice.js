import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sortType: { name: 'Популярності ↓', forFetch: 'rating' },
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
    }
  }
})

export const { setCategoryId, setSortChecked } = filterSlice.actions

export default filterSlice.reducer
