import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import './index.css'

const Popular = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getPopularMovies = async () => {
    setIsLoading(true)
    setHasError(false)

    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        'https://apis.ccbp.in/movies-app/popular-movies',
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Popular API failed')
      }

      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPopularMovies()
  }, [])

  if (isLoading) {
    return (
      <main className="popular-container">
        <div data-testid="loader" className="popular-loader">
          Loading...
        </div>
      </main>
    )
  }

  if (hasError) {
    return (
      <main className="popular-container">
        <div className="popular-failure">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-view.png"
            alt="failure view"
            className="failure-image"
          />

          <p>Something went wrong. Please try again</p>

          <button type="button" onClick={getPopularMovies}>
            Try Again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="popular-container">
      <section className="popular-section">
        <h1>Popular</h1>

        <ul className="popular-movies-list">
          {movies.map(movie => (
            <li className="popular-movie-item" key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="popular-movie-poster"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Popular