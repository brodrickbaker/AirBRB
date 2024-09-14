import { useState, useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { CgProfile, CgLogOut, CgMenu } from "react-icons/cg";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal";
import { NavLink, useNavigate } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();  

  const toggleMenu = (e) => {
    e.stopPropagation(); 
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        closeMenu();
        navigate('/')
    };

    const ulClassName =  showMenu ? 'profile-dropdown' : ' hidden'
    const loggedIn = user ? 'user' : ''

    return (
    <>
      <button className='btn' onClick={toggleMenu}>
        <CgMenu /><CgProfile />
      </button>
      <ul className={`${ulClassName} ${loggedIn}`} ref={ulRef}>
        {user ? (
          <>
            <li>Hello,&nbsp;&nbsp;{user.firstName}</li>
            <li>{user.email}</li>
            <li onClick={closeMenu} id='user-spots'><NavLink to='spots/current'>Manage Spots</NavLink></li>
            <li>
              <button onClick={logout} className='btn'><CgLogOut/></button>
            </li>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
  
