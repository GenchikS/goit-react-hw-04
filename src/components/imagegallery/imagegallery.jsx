import ImageCard from "./imagecard/imagecard";
import css from "./imagegallery.module.css"

export default function ImageGallery({ images, openModal }) {
  // console.log("images", images);
  return (
    <ul className={css.container}>
      {images.map((image) => (
        <li className={css.list} key={image.id}>
          <ImageCard
            urls={image.urls.small}
            regular={image.urls.regular}
            description={image.alt_description}
            openModal={openModal}
          />
          {/* {console.log("image.urls.regular", image.urls.regular)} */}
          {/* {console.log("description", image.alt_description)} */}
        </li>
      ))}
    </ul>
  );
}

