import css from "./Login.module.css";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Login() {
  return (
    <div className={css.loginContainer}>
      <PageTitle>Please log in</PageTitle>
      <LoginForm />
      <p>
        or
        <Link to="/register"> create new Phonebook</Link>
      </p>
    </div>
  );
}
