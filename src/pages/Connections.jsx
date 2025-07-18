import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

export default function Connections() {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found!</h1>;

  return (
    <div className='text-center my-10'>
      <h1 className='font-bold text-2xl'>Conections</h1>
      {connections.data.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={connection._id}
            className='flex justify-between items-center m-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto'
          >
            <div>
              <img
                alt='photo'
                className='w-20 h-20 rounded-full'
                src={photoUrl}
              />
            </div>
            <div className='text-left mx-4 '>
              <h2 className='font-bold text-xl'>
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p>
                  {age}, {gender}
                </p>
              )}
              <p>{about}</p>
            </div>
            <Link to={`/chat/${connection._id}`}>
              <button className='btn btn-primary'>Chat</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
