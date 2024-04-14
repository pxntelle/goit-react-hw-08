import { createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [], // масив контактів
    loading: false, // показник завантаження
    error: null, // об'єкт, що містить інформацію про помилку
  },
  // Обробники для усіх трьох станів (fulfilled, rejected, pending) операцій fetchContacts, deleteContact та addContact
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.error = false;
        state.loading = true; // завантаження в процесі
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false; // завантаження завершено
        state.items = action.payload; // оновлення масиву контактів з отриманими даними
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false; // завантаження завершено
        state.error = true; // помилка під час завантаження
      })
      .addCase(deleteContact.pending, (state) => {
        state.error = false;
        state.loading = true; // завантаження в процесі
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false; // завантаження завершено
        // Видалення контакту з масиву контактів за його ідентифікатором
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, (state) => {
        state.loading = false; // завантаження завершено
        state.error = true; // виникла помилка під час завантаження
      })
      .addCase(addContact.pending, (state) => {
        state.error = false;
        state.loading = true; // завантаження
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false; // завантаження завершено
        state.items.push(action.payload); // додавання нового контакту до масиву контактів
      })
      .addCase(addContact.rejected, (state) => {
        state.loading = false; // завантаження завершено
        state.error = true; // помилка під час завантаження
      }),
});

// Селектори
export const selectContacts = (state) => state.contacts.items; // всі контакти

export const selectLoading = (state) => state.contacts.loading; // статус завантаження

export const selectError = (state) => state.contacts.error; // статус помилки

// Вибірка видимих контактів з урахуванням фільтрації за ім'ям
export const selectVisibleContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    // Фільтрація контактів за іменем
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }
);

export default slice.reducer;
