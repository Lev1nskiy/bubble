import { Link } from "react-router-dom";
import "./notFound.css";

export const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <span>
        что-то поломалось... может, <br /> стоит вернуться?
      </span>
      <Link to="/">да, стоит вернуться обратно</Link>
    </div>
  );
};
