import { useEffect } from 'react';
import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactAction } from 'redux/slice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts);
  const filter = useSelector(store => store.filter);

  const deleteContact = id => {
    dispatch(deleteContactAction(id));
  };

  const contactsList = contacts.filter(contact =>
    contact.name.toUpperCase().includes(filter.toUpperCase())
  );

  useEffect(() => {
    localStorage.setItem('localContacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <ul>
        {contactsList.map(contact => {
          return (
            <li key={contact.id} className={css.contactsList}>
              {contact.name}: {contact.number}
              <button
                onClick={() => {
                  deleteContact(contact.id);
                }}
                className={css.button}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
