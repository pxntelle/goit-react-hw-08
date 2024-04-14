import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactForm from "../../components/ContactForm/ContactForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectLoading } from "../../redux/contacts/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <ContactForm />
      <SearchBox />
      <PageTitle>My contacts</PageTitle>
      <div>{isLoading && <Loader />}</div>
      <ContactList />
    </>
  );
}
