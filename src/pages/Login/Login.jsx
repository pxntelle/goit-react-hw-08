import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Login() {
  return (
    <div>
      <PageTitle>Please log in</PageTitle>
      <LoginForm />
      <p style={{ textAlign: "center" }}>
        or
        <Link to="/register"> register </Link>
      </p>
    </div>
  );
}
