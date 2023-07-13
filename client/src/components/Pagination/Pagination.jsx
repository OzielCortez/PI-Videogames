import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "../Pagination/Pagination.module.css";
import { setPage } from "../../redux/actions";

export default function Pagination({ totalPages }) {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const [input, setInput] = useState(currentPage);

  useEffect(() => {
    setInput(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    dispatch(setPage(currentPage + 1));
    setInput(currentPage + 1);
  };

  const previousPage = () => {
    dispatch(setPage(currentPage - 1));
    setInput(currentPage - 1);
  };

  const handleChange = (event) => {
    event.preventDefault();
    setInput(parseInt(event.target.value));
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      if (
        parseInt(event.target.value) < 1 ||
        parseInt(event.target.value) > totalPages ||
        isNaN(parseInt(event.target.value))
      ) {
        dispatch(setPage(1));
        setInput(1);
      } else {
        dispatch(setPage(parseInt(event.target.value)));
        setInput(parseInt(event.target.value));
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <button disabled={input === 1 || input < 1} onClick={previousPage}>
        Previous
      </button>
      <input
        onChange={handleChange}
        value={input}
        onKeyDown={onKeyDown}
        autoComplete="off"
      />
      <button
        disabled={input === totalPages || input > totalPages}
        onClick={nextPage}
      >
        Next
      </button>
      <p>{`${currentPage} of ${totalPages}`}</p>
    </div>
  );
}
