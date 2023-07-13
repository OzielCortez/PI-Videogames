import style from "../VideogameCard/VideogameCard.module.css";
import { Link } from "react-router-dom";
function VideogameCard({ id, name, image, launchDate, genres }) {
  let genresToString = "";

  if (genres && genres.length > 0) {
    if (typeof genres[0] === "string") {
      genresToString = genres.join(", ");
    } else if (typeof genres[0] === "object") {
      genresToString = genres.map((genre) => genre.name).join(", ");
    }
  }

  return (
    <div className={style.card}>
      <Link to={`/videogames/${id}`}>
        <p>{name}</p>
      </Link>
      <p>{genresToString}</p>
      <img src={image} alt={name} className={style.image} />
    </div>
  );
}
export default VideogameCard;
