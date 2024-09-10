import { SiAirbnb } from "react-icons/si";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';


import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const loggedIn = sessionUser? 'end-align modal-item' : 'invisible'

  return (
    <>
        <ul className="nav">
            <li>
                <NavLink to="/"><h3><SiAirbnb/><span className="expendable">airBRB</span></h3></NavLink>
            </li>
            <li className={loggedIn}>
                <NavLink to="/spots/new">Create a New Spot</NavLink>
            </li>
            {isLoaded && (<li className="end-align">
                <ProfileButton user={sessionUser} />
            </li>)}
        </ul>
    </>
  );
}

export default Navigation;
