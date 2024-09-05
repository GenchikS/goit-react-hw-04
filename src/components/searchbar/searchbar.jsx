import css from "./searchbar.module.css"
import { useState } from "react";

//  Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setsearchQuery] = useState("");

  const handleChange = (evn) => {
    setsearchQuery(evn.target.value);
    // onSubmit(evn.target.value);
  };
  
  const handleSubmit = (evn) => {
  
    evn.preventDefault();
    if (!searchQuery.trim()) {
          
      return iziToast.show({
        message: "Sorry, input field cannot be empty. Please try again!",
        messageColor: `rgb(0,0,0)`,
        messageSize: 18,
        position: `topCenter`,
        progressBarColor: `rgb(255,0,0)`,
      });
    }
    onSubmit(searchQuery); //  виклик ф-ції onHandeleSubmit переданої пропсом
    setsearchQuery("");
  }
  // перевірка введеного значення
  // console.log("query", query);

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          value={searchQuery}
          type="text"
          placeholder="Search images and photos"
          onChange={handleChange}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
        
      </form>
    </header>
  );
}