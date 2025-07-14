import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';

export default function FeedPage() {
  const [error, setError] = useState('');

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0) return <h1>No new users found!</h1>;

  return (
    feed && (
      <div className='flex justify-center my-10'>
        <UserCard user={feed[0]} />
      </div>
    )
  );
}
