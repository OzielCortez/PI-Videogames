import React, { useEffect } from "react";
import styles from "../VideogameDetail/VideogameDetail.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../redux/actions";
import { Link } from "react-router-dom";

function VideogameDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const videogame = useSelector((state) => state.videogameDetail);

  /* console.log(videogame.genres); */
  useEffect(() => {
    dispatch(getById(id));
  }, [id]);

  return (
    <div>
      <p>Detail</p>
      <p>{`Name: ${videogame?.name}`}</p>
      <p>{`Description: ${videogame.description?.replace(/<[^>]*>/g, "")}`}</p>
      <p>{`Platforms: ${
        videogame.platforms &&
        Array.isArray(videogame.platforms) &&
        !videogame.source
          ? videogame.platforms.join(", ")
          : videogame.platforms?.map((platform) => platform.name).join(", ")
      }`}</p>
      <p>{`Launch date: ${videogame.release_date || videogame.launchDate}`}</p>
      <p>{`Rating: ${videogame.rating}`}</p>
      <p>{`Genres: ${
        videogame.genres && Array.isArray(videogame.genres) && !videogame.source
          ? videogame.genres.join(", ")
          : videogame.genres?.map((genre) => genre.name).join(", ")
      }`}</p>
      <img
        src={videogame.image}
        alt={videogame.name}
        className={styles.image}
      />
      <hr />
      <Link to={"/home"}>
        <button>Go home</button>
      </Link>
    </div>
  );
}
export default VideogameDetail;
