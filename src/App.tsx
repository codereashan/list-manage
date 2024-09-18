import './App.css';
import Login from './pages/Login';
import Listing from './pages/Listing';
import PageNotFound from './pages/PageNotFound';
import { Navigate, BrowserRouter as Router, useRoutes } from 'react-router-dom';

function AppRoutes() {
  const routes = [
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <Login /> },
    { path: '/listing', element: <Listing /> },
    { path: '*', element: <PageNotFound /> }
  ];

  return useRoutes(routes);
}

function App() {

  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  )
}

export default App;
