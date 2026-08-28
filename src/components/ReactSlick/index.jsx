import {Link} from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const ReactSlick = ({apiStatus, moviesList, retryFn}) => {
  if (apiStatus === apiStatusConstants.inProgress) {
    return (
      <div className="loader-container" data-testid="loader">
        <ClipLoader size={50} />
      </div>
    )
  }

  if (apiStatus === apiStatusConstants.failure) {
    return (
      <div className="failure-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/movies-app/failure-view.png"
          alt="failure view"
          className="failure-view-img"
        />

        <p className="failure-view-heading">
          Something went wrong. Please try again
        </p>

        <button type="button" className="retry-button" onClick={retryFn}>
          Try Again
        </button>
      </div>
    )
  }

  if (apiStatus !== apiStatusConstants.success) {
    return null
  }

  const filteredMoviesData = moviesList.filter(
    eachMovie => eachMovie.poster_path !== null,
  )

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {filteredMoviesData.map(eachMovie => (
          <div key={eachMovie.id} className="react-slick-item">
            <Link to={`/movies/${eachMovie.id}`} className="link-item">
              <img
                className="poster"
                src={eachMovie.poster_path}
                alt={eachMovie.title}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export {apiStatusConstants}

export default ReactSlick