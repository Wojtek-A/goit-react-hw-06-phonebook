import { createSlice } from '@reduxjs/toolkit';

// Zgodnie z pracą domową.

// const initialContactsState = () => {
//   try {
//     const localContacts = JSON.parse(localStorage.getItem('localContacts'));
//     const contacts = [];
//     if (localContacts !== null) {
//       return localContacts;
//     } else {
//       return contacts;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// Ale chciałem dodać kontakty

const initialContactsState = () => {
  try {
    const localContacts = JSON.parse(localStorage.getItem('localContacts'));
    const contacts = [
      { id: 'id-1', name: 'Rosie Simpson', number: '+48 (42) 459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '+48 (42) 443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '+48 (42) 645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '+48 (42) 227-91-26' },
    ];
    if (localContacts == null) {
      return contacts;
    } else {
      return localContacts;
    }
  } catch (error) {
    console.log(error);
  }
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    addContactAction: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(id, name, number) {
        return {
          payload: {
            id,
            name,
            number,
          },
        };
      },
    },
    deleteContactAction(state, action) {
      const id = action.payload;
      return state.filter(contact => contact.id !== id);
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    findContactAction(state, action) {
      return action.payload;
    },
  },
});

export const { addContactAction, deleteContactAction } = contactsSlice.actions;
export const { findContactAction } = filterSlice.actions;
export const contactsReducer = contactsSlice.reducer;
export const filterReducer = filterSlice.reducer;
