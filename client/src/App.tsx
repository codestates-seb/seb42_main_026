import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { RootState } from './store/store';
import HomePage from './page/HomePage';
import AlarmsPage from './page/AlarmsPage';
import ChecklistPage from './page/ChecklistPage';
import ContentWritePage from './page/ContentWritePage';
import ContentEditPage from './page/ContentEditPage';
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
import OAuthPage from './page/OAuthPage';
import { BarLoader } from './components/BarLoader';
import MenuButton from './components/MenuButton';
import { useSelector } from 'react-redux';

export default function App() {
  const { menu, isOpen } = useSelector((state: RootState) => state.isOpen);

  return (
    <>
      <BarLoader />
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          {isOpen && <MenuButton menu={menu} />}
          <TopNav />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rank" element={<RankPage />} />
              <Route
                path="/mypage"
                element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/alarms"
                element={
                  <PrivateRoute>
                    <AlarmsPage />
                  </PrivateRoute>
                }
              />
              <Route path="/checklist" element={<ChecklistPage />} />
              <Route
                path="/edit/:questionId"
                element={
                  <PrivateRoute>
                    <ContentEditPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/write"
                element={
                  <PrivateRoute>
                    <ContentWritePage />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/myposts"
                element={
                  <PrivateRoute>
                    <MyPostsPage />
                  </PrivateRoute>
                }
              />
              <Route path="/naggingboard" element={<NaggingBoardPage />} />
              <Route path="/questions/:questionId" element={<PostDetailPage />} />
              <Route
                path="/removeaccount"
                element={
                  <PrivateRoute>
                    <RemoveAccountPage />
                  </PrivateRoute>
                }
              />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login/callback" element={<OAuthPage />} />
              <Route
                path="/useredit"
                element={
                  <PrivateRoute>
                    <UserEditPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <BottomNav />
        </BrowserRouter>
      </div>
    </>
  );
}
