import styled from 'styled-components';
import ProfileCard from '../container/mypage/ProfileCard';
import RankCard from '../container/mypage/RankCard';
import LogoutModal from '../components/LogoutModal';
import React, { useState, useEffect, memo } from 'react';
import { getUser } from '../utils/getUser';
import getCookie from '../utils/cookieUtils';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface dataProps {
  email?: string;
  nickname?: string;
  [score: number]: any;
  [hammerTier: string]: any;
  profileImageUrl?: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const memberId = getUser()?.memberId();
  if (memberId === undefined) window.location.replace('/login');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<dataProps>({});

  useEffect(() => {
    const headers = {
      Authorization: getCookie('accessToken'),
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/members`, { headers })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log('마이페이지 랜더링');
  return (
    <MyPageWrapper>
      <ProfileCard imgUrl={data.profileImageUrl === null ? '' : data.profileImageUrl} mainText={data.nickname} subText={data.email} />
      <RankCard score={data.score} hammerTier={data.hammerTier} mainText="티어" subText={`${data.hammerTier}망치`} />
      <MyPostWrapper>
        <MyPostButton onClick={() => navigate(`/myposts`)}>내가 쓴 글 조회 </MyPostButton>
      </MyPostWrapper>
      <LogoutButton onClick={() => setIsModalOpen(true)}>로그아웃</LogoutButton>
      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}></LogoutModal>
    </MyPageWrapper>
  );
};

export default memo(MyPage);

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
