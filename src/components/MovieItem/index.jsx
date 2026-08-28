import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {movie} = props
  const {id, poster_path, title} = movie

  return (
    <li className="movie-item">
      <Link to={`/movies/${id}`} className="movie-link">
        <img src={poster_path} alt={title} className="movie-poster" />
      </Link>
    </li>
  )
}

export default MovieItem