import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: { name: "" },
  reducers: {
    changeNameFilter: (state, action) => {
      state.name = action.payload; // зміна значення фільтра на передане значення
    },
  },
});

export default filtersSlice.reducer;

export const { changeNameFilter } = filtersSlice.actions;

// Створення селектора для вибору значення фільтра за іменем зі стану
export const selectNameFilter = (state) => state.filters.name;
