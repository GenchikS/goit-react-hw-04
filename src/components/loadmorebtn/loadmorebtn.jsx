import Loader from "../loader/loader";
import css from "./loadmorebtn.module.css";

export default function LoadMoreBtn({ isEmpty, onLoadMoreBtn }) {
  return (
    <>
      {isEmpty && <Loader />}
      <button type="click" onClick={onLoadMoreBtn} className={css.button}>
        Load more
      </button>
    </>
  );
}
