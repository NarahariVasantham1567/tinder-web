import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  LoginPage,
  HomePage,
  ProfilePage,
  FeedPage,
  Connections,
  Requests,
  PremiumPage,
  Chat,
} from './pages';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}>
            <Route index element={<FeedPage />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='connections' element={<Connections />} />
            <Route path='requests' element={<Requests />} />
            <Route path='premium' element={<PremiumPage />} />
            <Route path='chat/:targetUserId' element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
