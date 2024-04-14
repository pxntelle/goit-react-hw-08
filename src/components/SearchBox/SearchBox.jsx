import css from "./SearchBox.module.css";
import { useId } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeNameFilter, selectNameFilter } from "../../redux/filtersSlice";

export default function SearchBox() {
  const elementId = useId();
  const value = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeNameFilter(e.target.value));
  };

  return (
    <div className={css.searchBox}>
      <label htmlFor={elementId}>Find contacts by name</label>
      <div className={css.inputContainer}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          id={elementId}
          placeholder="Search"
        />
      </div>
    </div>
  );
}
