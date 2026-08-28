import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Header />
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/popular"
        element={
          <ProtectedRoute>
            <Header />
            <Popular />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Header />
            <Search />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movies/:id"
        element={
          <ProtectedRoute>
            <Header />
            <MovieDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Header />
            <Account />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  </BrowserRouter>
)

export default App