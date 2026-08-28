import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import './index.css'

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])
  const [trendingLoading, setTrendingLoading] = useState(true)
  const [originalLoading, setOriginalLoading] = useState(true)
  const [trendingError, setTrendingError] = useState(false)
  const [originalError, setOriginalError] = useState(false)
  const [bannerMovie, setBannerMovie] = useState(null)

  const getTrendingMovies = async () => {
    setTrendingLoading(true)
    setTrendingError(false)

    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        'https://apis.ccbp.in/movies-app/trending-movies',
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Trending API failed')
      }

      const data = await response.json()
      setTrendingMovies(data.results)
    } catch (error) {
      setTrendingError(true)
    } finally {
      setTrendingLoading(false)
    }
  }

  const getOriginalMovies = async () => {
    setOriginalLoading(true)
    setOriginalError(false)

    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        'https://apis.ccbp.in/movies-app/originals',
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Originals API failed')
      }

      const data = await response.json()
      setOriginalMovies(data.results)

      if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length)
        setBannerMovie(data.results[randomIndex])
      }
    } catch (error) {
      setOriginalError(true)
    } finally {
      setOriginalLoading(false)
    }
  }

  useEffect(() => {
    getTrendingMovies()
    getOriginalMovies()
  }, [])

  const renderTrendingMovies = () => {
    if (trendingLoading) {
      return <div data-testid="loader">Loading...</div>
    }

    if (trendingError) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-view.png"
            alt="failure view"
            className="failure-image"
          />
          <p>Something went wrong. Please try again</p>
          <button type="button" onClick={getTrendingMovies}>
            Try Again
          </button>
        </div>
      )
    }

    return (
      <div className="movie-list">
        {trendingMovies.map(movie => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="movie-poster"
            />
          </Link>
        ))}
      </div>
    )
  }

  const renderOriginalMovies = () => {
    if (originalLoading) {
      return <div data-testid="loader">Loading...</div>
    }

    if (originalError) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-view.png"
            alt="failure view"
            className="failure-image"
          />
          <p>Something went wrong. Please try again</p>
          <button type="button" onClick={getOriginalMovies}>
            Try Again
          </button>
        </div>
      )
    }

    return (
      <div className="movie-list">
        {originalMovies.map(movie => (
          <Link to={`/movies/${movie.id}`} key={movie.id}>
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="movie-poster"
            />
          </Link>
        ))}
      </div>
    )
  }

  return (
    <main className="home-container">
      {bannerMovie && (
        <section
          className="hero-section"
          style={{
            backgroundImage: `linear-gradient(
              to right,
              rgba(0, 0, 0, 0.9),
              rgba(0, 0, 0, 0.3)
            ), url(${bannerMovie.backdrop_path})`,
          }}
        >
          <div className="hero-content">
            <h1>{bannerMovie.title}</h1>
            <p>{bannerMovie.overview}</p>

            <Link to={`/movies/${bannerMovie.id}`}>
              <button type="button">Play</button>
            </Link>
          </div>
        </section>
      )}

      <section className="movie-section">
        <h2>Trending Now</h2>
        {renderTrendingMovies()}
      </section>

      <section className="movie-section">
        <h2>Originals</h2>
        {renderOriginalMovies()}
      </section>
    </main>
  )
}

export default Home