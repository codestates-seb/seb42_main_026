import styled from 'styled-components';
import ProfileCard from '../container/mypage/ProfileCard';
import RankCard from '../container/mypage/RankCard';
import LogoutModal from '../components/LogoutModal';
import React, { useState, useEffect } from 'react';
import getCookie from '../utils/cookieUtils';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setNickname } from '../store/actions';

interface dataProps {
  email: string;
  nickname: string;
  score: number;
  hammerTier?: string;
  profileImageUrl: string;
}

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<dataProps | null>(null);
  const [token, setToken] = useState<string>(getCookie('accessToken'));

  useEffect(() => {
      const fetchData = async () => {
        const headers = {
          Authorization: token,
        };
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/members`, { headers });
          setData({ ...response.data.data });
          dispatch(setNickname(response.data.data.nickname));
        } catch (error) {
          setToken('');
          console.log(error);
        }
      };
    
    fetchData();
  }, [dispatch, token]);

  if (token === '') return null;

  return (
    <MyPageWrapper>
      {data && (
        <>
          <ProfileCard imgUrl={data.profileImageUrl === null ? '' : data.profileImageUrl} mainText={data.nickname} subText={data.email} />
          <RankCard score={Number(data.score)} hammerTier={data.hammerTier} mainText="티어" subText={`${data.hammerTier}망치`} />
          <MyPostWrapper>
            <MyPostButton onClick={() => navigate(`/myposts`)}>내가 쓴 글 조회 </MyPostButton>
          </MyPostWrapper>
          <LogoutButton onClick={() => setIsModalOpen(true)}>로그아웃</LogoutButton>
          <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}></LogoutModal>
        </>
      )}
    </MyPageWrapper>
  );
};

export default MyPage;

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  padding: 16px;
`;

const LogoutButton = styled.button`
  position: relative;
  left: calc(50% - 48px);
  width: 100px;
  height: 50px;
  border: none;
  background: none;
  color: var(--color-gray02);
  letter-spacing: var(--font-spacing-title);
  font-weight: 100;
  margin-top: 20px;
`;
const MyPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid var(--color-gray03);
  border-radius: 5px;
  padding: 35px 0px;
`;

const MyPostButton = styled.button`
  border: none;
  background: none;
  position: relative;
  left: 30px;
  font-size: var(--font-size16);
  color: var(--color-black01);
  cursor: pointer;
`;
