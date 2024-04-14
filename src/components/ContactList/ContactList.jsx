import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.contactList}>
      {contacts.lenght === 0 && (
        <p className={css.emptyList}>Your contacts will appear here</p>
      )}
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact contact={contact}></Contact>
        </li>
      ))}
    </ul>
  );
}
