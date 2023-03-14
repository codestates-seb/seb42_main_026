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

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
            <TopNav />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Alarms" element={<AlarmsPage />} />
                <Route path="/Checklist" element={<ChecklistPage />} />
                <Route path="/Rank" element={<RankPage />} />
                <Route path="/Editor" element={<EditorPage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/MyPage" element={<MyPage />} />
                <Route path="/MyPosts" element={<MyPostsPage />} />
                <Route path="/NaggingBoard" element={<NaggingBoardPage />} />
                <Route path="/PostDetail" element={<PostDetailPage />} />
                <Route path="/RemoveAccount" element={<RemoveAccountPage />} />
                <Route path="/Signup" element={<SignupPage />} />
                <Route path="/UserEdit" element={<UserEditPage />} />
              </Routes>
            </main>
            <BottomNav />
        </BrowserRouter>
      </div>
    </Provider>
  );
}
