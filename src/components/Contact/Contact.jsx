import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

export default function Contact({ contact: { id, name, number } }) {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));
  return (
    <div className={css.card}>
      <div>
        <p>
          <FaUser className={css.icon} /> {name}
        </p>
        <p>
          <FaPhoneAlt className={css.icon} /> {number}
        </p>
      </div>
      <button className={css.deleteButton} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
