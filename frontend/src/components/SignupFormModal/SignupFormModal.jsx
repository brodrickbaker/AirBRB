import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      ).then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };
  
  const disabled = (password.length < 6 || username.length < 4 || !email || !firstName || !lastName)? 'disabled' : ''

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <p className='error'>{errors.email}</p>
        <label>
          <input
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <p className='error'>{errors.username}</p>
        <label>
          <input
            type="text"
            value={firstName}
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <p className='error'>{errors.firstName}</p>
        <label>
          <input
            type="text"
            value={lastName}
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <p className='error'>{errors.lastName}</p>
        <label>
          <input
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
         <p className='class'>{errors.password}</p>
        <label>
          <input
            type="password"
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
         <p className='error'>{errors.confirmPassword}</p>
        <button type="submit" className={`btn ${disabled}`}  disabled={disabled}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
