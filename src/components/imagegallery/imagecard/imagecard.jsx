import css from "./imagecard.module.css"

export default function ImageCard({ urls, regular, description, openModal }) {
  // console.log("openModal", openModal);
  return (
    <div className={css.container}>
      <img
        src={urls}
        alt={regular}
        onClick={() => openModal(regular, description)}
      />
    </div>
  );
}


