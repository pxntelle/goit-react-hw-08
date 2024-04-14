import css from "./Registration.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function Registration() {
  return (
    <div className={css.registrationContainer}>
      <PageTitle>Register to create your Phonebook</PageTitle>
      <RegistrationForm />
    </div>
  );
}
