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
              <Route path="/rank" element={<RankPage />}/>
              <Route path="/mypage" element={<PrivateRoute><MyPage /></PrivateRoute>} />
              <Route path="/alarms" element={<PrivateRoute><AlarmsPage /></PrivateRoute>} />
              <Route path="/checklist" element={<PrivateRoute><ChecklistPage /></PrivateRoute>} />
              <Route path="/editor" element={<PrivateRoute><EditorPage /></PrivateRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/myposts" element={<PrivateRoute><MyPostsPage /></PrivateRoute>} />
              <Route path="/naggingboard" element={<NaggingBoardPage />} />
              <Route path="/postdetail" element={<PostDetailPage />} />
              <Route path="/removeaccount" element={<PrivateRoute><RemoveAccountPage /></PrivateRoute>} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/useredit" element={<PrivateRoute><UserEditPage /></PrivateRoute>} />
            </Routes>
          </main>
          <BottomNav />
        </BrowserRouter>
      </div>
    </Provider>
  );
}
