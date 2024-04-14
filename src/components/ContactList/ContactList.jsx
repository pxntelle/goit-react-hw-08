import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectVisibleContacts } from "../../redux/contactsSlice";

export default function ContactList() {
  const contacts = useSelector(selectVisibleContacts);

  return (
    <ul className={css.contactList}>
      {/* {contacts.length === 0 && (
        <p className={css.emptyList}>Your contacts will appear here</p>
      )}
      {visibleContacts.map((contact) => (
        <li key={contact.id}> */}
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact contact={contact}></Contact>
        </li>
      ))}
    </ul>
  );
}
