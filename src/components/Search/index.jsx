import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import './index.css'

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const getSearchResults = async () => {
    if (searchText.trim() === '') {
      return
    }

    setIsLoading(true)
    setHasError(false)
    setHasSearched(true)

    const jwtToken = Cookies.get('jwt_token')

    try {
      const response = await fetch(
        `https://apis.ccbp.in/movies-app/movies-search?search=${encodeURIComponent(
          searchText,
        )}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error('Search API failed')
      }

      const data = await response.json()
      setMovies(data.results)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitSearch = event => {
    event.preventDefault()
    getSearchResults()
  }

  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <div className="search-loader" data-testid="loader">
          Loading...
        </div>
      )
    }

    if (hasError) {
      return (
        <div className="search-failure">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-view.png"
            alt="failure view"
            className="failure-image"
          />
          <p>Something went wrong. Please try again</p>
          <button type="button" onClick={getSearchResults}>
            Try Again
          </button>
        </div>
      )
    }

    if (hasSearched && movies.length === 0) {
      return (
        <div className="no-results">
          <p>No movies found</p>
        </div>
      )
    }

    if (!hasSearched) {
      return null
    }

    return (
      <ul className="search-movies-list">
        {movies.map(movie => (
          <li className="search-movie-item" key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="search-movie-poster"
              />
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <main className="search-container">
      <form className="search-form" onSubmit={onSubmitSearch}>
        <input
          type="search"
          placeholder="Search Movies"
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          className="search-input"
        />

        <button
          type="submit"
          className="search-submit-button"
          data-testid="searchSubmitButton"
        >
          Search
        </button>
      </form>

      {renderSearchResults()}
    </main>
  )
}

export default Search