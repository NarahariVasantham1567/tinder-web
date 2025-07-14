import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

export default function EditProfile({ user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res?.data));
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className='flex justify-center items-center gap-9'>
      <div className='flex justify-center items-center my-10'>
        <div className='card card-border bg-base-300 w-96'>
          <div className='card-body'>
            <h2 className='card-title justify-center'>Edit Profile</h2>
            <div className=''>
              <fieldset className='fieldset my-2'>
                <legend className='fieldset-legend'>First Name:</legend>
                <input
                  type='text'
                  className='input'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset my-2'>
                <legend className='fieldset-legend'>Last Name:</legend>
                <input
                  type='text'
                  className='input'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset my-2'>
                <legend className='fieldset-legend'>Photo Url:</legend>
                <input
                  type='text'
                  className='input'
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset my-2'>
                <legend className='fieldset-legend'>Age:</legend>
                <input
                  type='number'
                  className='input'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset my-2'>
                <legend className='fieldset-legend'>Gender:</legend>
                <input
                  type='text'
                  className='input'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset my-2'>
                <legend className='fieldset-legend'>About:</legend>
                <input
                  type='text'
                  className='input'
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <div className='card-actions justify-center my-2'>
              <button className='btn btn-primary' onClick={handleSaveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
    </div>
  );
}
