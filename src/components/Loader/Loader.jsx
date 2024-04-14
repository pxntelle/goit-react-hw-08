import css from "./Loader.module.css";
import { RotatingTriangles } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className={css.loader}>
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rotating-triangles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      ;
    </div>
  );
}
