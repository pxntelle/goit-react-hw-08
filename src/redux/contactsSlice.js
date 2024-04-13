import { createSlice, nanoid } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(contactInfo) {
        return {
          payload: {
            id: nanoid(),
            ...contactInfo,
          },
        };
      },
    },
    deleteContact(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { addContact, deleteContact, clearError } = slice.actions;

export const selectContacts = (state) => state.contacts.items;

export default slice.reducer;
