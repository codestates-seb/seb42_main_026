import React from 'react';
// import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import HomePage from './page/HomePage';
import AlarmsPage from './page/AlarmsPage';
import ChecklistPage from './page/ChecklistPage';
import EditorPage from './page/EditorPage';
import LoginPage from './page/LoginPage';
import MyPage from './page/MyPage';
import MyPostsPage from './page/MyPostsPage';
import NaggingBoardPage from './page/NaggingBoardPage';
import PostDetailPage from './page/PostDetailPage';
import RemoveAccountPage from './page/RemoveAccountPage';
import SignupPage from './page/SignupPage';
import UserEditPage from './page/UserEditPage';
import BottomNav from './components/BottomNav';
import TopNav from './components/TopNav';
import RankPage from './page/RankPage';
import PrivateRoute from './hooks/PrivateRoute';
export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <TopNav />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/*" element={<HomePage />} />
              <Route path="/Rank" element={<PrivateRoute><RankPage /></PrivateRoute>} />
              <Route path="/MyPage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
              <Route path="/Alarms" element={<PrivateRoute><AlarmsPage /></PrivateRoute>} />
              <Route path="/Checklist" element={<PrivateRoute><ChecklistPage /></PrivateRoute>} />
              <Route path="/Editor" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/MyPosts" element={<PrivateRoute><MyPostsPage /></PrivateRoute>} />
              <Route path="/NaggingBoard" element={<NaggingBoardPage />} />
              <Route path="/PostDetail" element={<PostDetailPage />} />
              <Route path="/RemoveAccount" element={<PrivateRoute><RemoveAccountPage /></PrivateRoute>} />
              <Route path="/Signup" element={<SignupPage />} />
              <Route path="/UserEdit" element={<PrivateRoute><UserEditPage /></PrivateRoute>} />
            </Routes>
          </main>
          <BottomNav />
        </BrowserRouter>
      </div>
    </Provider>
  );
}
