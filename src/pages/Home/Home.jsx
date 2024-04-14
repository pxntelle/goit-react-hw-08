import css from "./Home.module.css";
import { Link } from "react-router-dom";

import PageTitle from "../../components/PageTitle/PageTitle";
import { BiSolidContact } from "react-icons/bi";

export default function Home() {
  return (
    <div className={css.homeContainer}>
      <PageTitle>
        <p>Welcome to your very own digital Phonebook!</p>
      </PageTitle>
      <div className={css.homeIconContainer}>
        <Link to="/login" className={css.iconLink}>
          <BiSolidContact className={css.homeIcon} />
        </Link>
      </div>
    </div>
  );
}
