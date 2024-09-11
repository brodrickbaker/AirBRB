import { createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import ShowSpot from './components/ShowSpot';
import CreateSpot from './components/CreateSpot';
import UserSpots from './components/UserSpots';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: 
    [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/spots/:spotId',
        element: <ShowSpot />
      },
      {
        path: '/spots/new',
        element: <CreateSpot />
      },
      {
        path: '/spots/current',
        element: <UserSpots />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
