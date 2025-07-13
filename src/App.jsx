import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  LoginPage,
  SignupPage,
  HomePage,
  ProfilePage,
  FeedPage,
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
            <Route path='signup' element={<SignupPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
