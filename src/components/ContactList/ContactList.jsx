import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { selectNameFilter } from "../../redux/filtersSlice";

const getVisibleContacts = (contacts, nameFilter) => {
  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(nameFilter.toLowerCase())
  );
};
export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const nameFilter = useSelector(selectNameFilter);
  const visibleContacts = getVisibleContacts(contacts, nameFilter);
  return (
    <ul className={css.contactList}>
      {contacts.length === 0 && (
        <p className={css.emptyList}>Your contacts will appear here</p>
      )}
      {visibleContacts.map((contact) => (
        <li key={contact.id}>
          <Contact contact={contact}></Contact>
        </li>
      ))}
    </ul>
  );
}
