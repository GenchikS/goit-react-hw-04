import { useEffect, useState } from "react";
import axios from "axios";

//  Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

import "./App.css";
import SearchBar from "./components/searchbar/searchbar";
import ImageGallery from "./components/imagegallery/imagegallery";
import LoadMoreBtn from "./components/loadmorebtn/loadmorebtn"
import Loader from "./components/loader/loader";
import ErrorMessage from "./components/errormessage/errormessage";
import ImageModal from "./components/imagemodal/imagemodal";

const API_KEY = `CVdGHViUjePVxY5WWEoJ2QbhXKrVcfNTeV82j8c-cPU`;

function App() {
  //  параметри пошуку
  const [query, setQuery] = useState("");
  //  пагинація
  const [page, setPage] = useState();
  //  об'єкти пошуку
  const [images, setImages] = useState([]);
  //  повідомлення про загрузку
  const [isloading, setIsloading] = useState(false);
  //  повідомлення про помилку
  const [error, setError] = useState(null);

  const [isEmpty, setIsEmpty] = useState(false);
  //  активація кнопки load more
  const [isWisible, setIsWisible] = useState(false);

  //  стани модалки
  const [modalIsOpen, setIsOpen] = useState(false);
  const [urlModal, setUrlModal] = useState("");
  const [altModal, setAltModal] = useState("");

  useEffect(() => {
    if (!query) {
      return;
    }
    const dataFeach = async () => {
      try {
        !isEmpty && setIsloading(true);
        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${query}&page=${page}&per_page=12&orientation=landscape`
        );
        setImages(() => [...images, ...data.results]);
        setIsEmpty(false);
        // console.log("data", data.results.length);
        if (!data.results.length > 0) {
          return iziToast.show({
            message: "Nothing found matching your request!",
            messageColor: `rgb(0,0,0)`,
            messageSize: 18,
            position: `topCenter`,
            progressBarColor: `rgb(255,0,0)`,
          });
        }
        // console.log("data", data.total_pages);
        //  приховування кнопки load, при закінченні сторінок
        if (data.total_pages > page) {
          setIsWisible(true);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsloading(false);
      }
    };
    dataFeach();
  }, [page, query]);

  //  ф-ція повернення значення form
  const onHandeleSubmit = (searchQuery) => {
    setQuery("");
    setPage(1);
    setQuery(searchQuery);
    setImages([]);
    setError(null);
    setIsWisible(false);
    setIsEmpty(false);
    //  перевірка значення яке повертає form
    // console.log("searchQuery", searchQuery);
  };

  //  ф-ція дадавання page при сліку loadmore
  const onLoadMoreBtn = () => {
    setIsEmpty(true);
    setPage(page + 1);
  };

  // модальне вікно
  function openModal(regular, description) {
    setIsOpen(true);
    setUrlModal(regular);
    setAltModal(description);
  }

  function closeModal() {
    setIsOpen(false);
    setUrlModal("");
    setAltModal("");
  }

  return (
    <div>
      {/* передача посилання ф-цію} */}
      <SearchBar onSubmit={onHandeleSubmit} />
      {isloading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isWisible && (
        <LoadMoreBtn onLoadMoreBtn={onLoadMoreBtn} isEmpty={isEmpty} />
      )}
      {error && <ErrorMessage />}
      {
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          urlModal={urlModal}
          altModal={altModal}
        />
      }
    </div>
  );
}

export default App;
