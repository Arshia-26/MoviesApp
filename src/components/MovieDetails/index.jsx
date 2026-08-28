import {useEffect, useState} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const MovieDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [movieDetails, setMovieDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getMovieDetails = async () => {
    setIsLoading(true)
    setHasError(false)

    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        `https://apis.ccbp.in/movies-app/movies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Movie details API failed')
      }

      const data = await response.json()
      setMovieDetails(data.movie_details)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMovieDetails()
  }, [id])

  if (isLoading) {
    return (
      <main className="movie-details-container">
        <div data-testid="loader" className="movie-details-loader">
          Loading...
        </div>
      </main>
    )
  }

  if (hasError) {
    return (
      <main className="movie-details-container">
        <div className="movie-details-failure">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-view.png"
            alt="failure view"
            className="failure-image"
          />

          <p>Something went wrong. Please try again</p>

          <button type="button" onClick={getMovieDetails}>
            Try Again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="movie-details-container">
      <section
        className="movie-details-hero"
        style={{
          backgroundImage: `linear-gradient(
            to right,
            rgba(0, 0, 0, 0.95),
            rgba(0, 0, 0, 0.35)
          ), url(${movieDetails.backdrop_path})`,
        }}
      >
        <div className="movie-details-content">
          <h1>{movieDetails.title}</h1>

          <div className="movie-meta">
            <span>{movieDetails.release_date}</span>
            <span>{movieDetails.runtime} min</span>
            <span>
              ⭐ {movieDetails.vote_average}
            </span>
          </div>

          <p className="movie-overview">{movieDetails.overview}</p>

          <div className="movie-info">
            <div>
              <h3>Genres</h3>
              <p>
                {movieDetails.genres
                  .map(genre => genre.name)
                  .join(', ')}
              </p>
            </div>

            <div>
              <h3>Languages</h3>
              <p>
                {movieDetails.spoken_languages
                  .map(language => language.english_name)
                  .join(', ')}
              </p>
            </div>

            <div>
              <h3>Budget</h3>
              <p>{movieDetails.budget}</p>
            </div>
          </div>

          <button
            type="button"
            className="back-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </section>

      <section className="similar-movies-section">
        <h2>More Like This</h2>

        <ul className="similar-movies-list">
          {movieDetails.similar_movies.map(movie => (
            <li className="similar-movie-item" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="similar-movie-poster"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default MovieDetails