import styles from "../VideogameCard/VideogameCard.module.css";
import { Link } from "react-router-dom";
function VideogameCard({
  id,
  name,
  image,
  launchDate,
  genres,
  platforms,
  description,
}) {
  let genresToString = "";

  if (genres && genres.length > 0) {
    if (typeof genres[0] === "string") {
      genresToString = genres.join(", ");
    } else if (typeof genres[0] === "object") {
      genresToString = genres.map((genre) => genre.name).join(", ");
    }
  }

  return (
    <Link to={`/videogames/${id}`}>
      <div className={styles.card}>
        {/* <h1 className={styles.name}>{name}</h1> */}

        <img src={image} alt={name} className={styles.image} />
        <p className={styles.genre}>{genresToString}</p>
      </div>
    </Link>
  );
}
export default VideogameCard;
