import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';
import { useEffect } from 'react';

export default function Requests() {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests Found!</h1>;

  return (
    <div className='text-center my-10'>
      <h1 className='font-bold text-2xl'>Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={request._id}
            className='flex justify-between items-center m-4 p-4  rounded-lg bg-base-300 w-2/3 mx-auto'
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
            <div>
              <button
                className='btn btn-primary mx-2'
                onClick={() => reviewRequest('rejected', request._id)}
              >
                Reject
              </button>
              <button
                className='btn btn-secondary mx-2'
                onClick={() => reviewRequest('accepted', request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
