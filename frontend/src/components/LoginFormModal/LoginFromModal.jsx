import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

const LoginFormModal = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async res => {
            const data = await res.json();
            if (data?.errors) setErrors(data.errors);
          }
        );
    };

    const loginDemo = (e) => {
      e.preventDefault
      return dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
      .then(closeModal)
    }

    const disabled = (password.length < 6 || credential.length < 4)? 'disabled' : ''

    return (
        <>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={credential}
              placeholder='Username or Email'
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
           <p className='error'>{errors.credential}</p>
          <button type="submit" className={`btn ${disabled}`} disabled={disabled}>Log In</button>
          <p id='demo-login' onClick={loginDemo}>Demo User</p>
        </form>
      </>
    )
  };
  
  export default LoginFormModal;
  