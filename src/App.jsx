import {BrowserRouter, Routes, Route} from 'react-router-dom'


import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import MovieDetails from './components/MovieDetails'
import Account from './components/Account'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'

const App = () => {
  // Remove old login session whenever the app starts
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Home Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Header />
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Protected Popular Route */}
        <Route
          path="/popular"
          element={
            <ProtectedRoute>
              <Header />
              <Popular />
            </ProtectedRoute>
          }
        />

        {/* Protected Search Route */}
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Header />
              <Search />
            </ProtectedRoute>
          }
        />

        {/* Protected Movie Details Route */}
        <Route
          path="/movies/:id"
          element={
            <ProtectedRoute>
              <Header />
              <MovieDetails />
            </ProtectedRoute>
          }
        />

        {/* Protected Account Route */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Header />
              <Account />
            </ProtectedRoute>
          }
        />

        {/* Not Found Route */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}


export default App