import "./App.css";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import ContactForm from "../ContactForm/ContactForm";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { Toaster } from "react-hot-toast";
import { BiSolidContact } from "react-icons/bi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contactsOps";
import { selectError, selectLoading } from "../../redux/contactsSlice";

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <div className="headerContainer">
        <BiSolidContact
          // style={{ width: "44px", height: "44px" }}
          className="headerIcon"
        />
        <h1>Phonebook</h1>
      </div>

      <ContactForm />
      <SearchBox />
      {error && <Error>Something went wrong! Reload the page.</Error>}
      {loading && <Loader />}
      <ContactList />
      <Toaster />
    </div>
  );
}
