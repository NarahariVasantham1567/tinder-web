import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });
    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        text: msg?.text,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit('joinChat', {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on('messageReceived', ({ firstName, text }) => {
      setMessages((prev) => [...prev, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit('sendMessage', {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage('');
  };

  return (
    <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
      <h1 className='p-5 border-b border-gray-600'>Chat</h1>
      <div className='flex-1 overflow-scroll p-5'>
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                'chat ' +
                (user.firstName === msg.firstName ? 'chat-end' : 'chat-start')
              }
            >
              <div className='chat-header'>
                {msg.firstName}
                <time className='text-xs opacity-50'>2 hours ago</time>
              </div>
              <div className='chat-bubble'>{msg.text}</div>
              <div className='chat-footer opacity-50'>Seen</div>
            </div>
          );
        })}
      </div>
      <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
        <input
          className='flex-1 border border-gray-500 text-white rounded p-2 bg-black'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className='btn btn-secondary' onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
