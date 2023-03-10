import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContactAction } from 'redux/slice';
import InputMask from 'react-input-mask';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(store => store.contacts);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    if (
      contacts.find(
        contact => contact.name.toUpperCase() === form.name.value.toUpperCase()
      )
    ) {
      alert(`${form.name.value} is already in contacts.`);
      return true;
    }
    const inputValue = {
      id: nanoid(),
      name: form.name.value,
      number: form.number.value,
    };
    dispatch(
      addContactAction(inputValue.id, inputValue.name, inputValue.number)
    );
    form.reset();
  };

  return (
    <div>
      <form className={css.contactsForm} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className={css.input}
          type="text"
          name="name"
          value={contacts.name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Jan Kowalski"
        />
        <label htmlFor="name">Landline number</label>
        <InputMask
          className={css.input}
          type="tel"
          name="number"
          value={contacts.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          mask="+48 (99) 999-99-99"
          placeholder="+48 (99) 999-99-99"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.contactsbutton} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};
