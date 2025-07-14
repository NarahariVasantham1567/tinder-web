import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

import { BASE_URL } from '../utils/constants';

export default function LoginPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);

  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate('/');
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate('/profile');
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className='flex justify-center items-center my-10'>
      <div className='card card-border bg-base-300 w-96'>
        <div className='card-body'>
          <h2 className='card-title justify-center'>
            {isLoginForm ? 'Login' : 'SignUp'}
          </h2>
          <div className=''>
            {!isLoginForm && (
              <>
                <fieldset className='fieldset my-2'>
                  <legend className='fieldset-legend'>First Name</legend>
                  <input
                    type='text'
                    className='input'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className='fieldset my-2'>
                  <legend className='fieldset-legend'>Last Name</legend>
                  <input
                    type='text'
                    className='input'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className='fieldset my-2'>
              <legend className='fieldset-legend'>Email ID</legend>
              <input
                type='text'
                className='input'
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className='fieldset my-2'>
              <legend className='fieldset-legend'>Password</legend>
              <input
                type='text'
                className='input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          {error && <p className='text-red-500'>{error}</p>}
          <div className='card-actions justify-center my-2'>
            <button
              className='btn btn-primary'
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? 'Login' : 'Sign Up'}
            </button>
          </div>
          <p
            className='text-center cursor-pointer py-2'
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? 'New User ? Signup here'
              : 'Existing user ? Login here'}
          </p>
        </div>
      </div>
    </div>
  );
}
