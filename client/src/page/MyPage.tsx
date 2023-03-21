import styled from 'styled-components';
import ProfileCard from '../container/mypage/ProfileCard';
import RankCard from '../container/mypage/RankCard';
import MyPost from '../container/mypage/MyPost';
import LogoutModal from '../components/LogoutModal';
import React, { useState, useEffect } from 'react';
// import useGetMembers from '../hooks/useGetMembers';
import { getUser } from '../utils/getUser';
import getCookie from '../utils/cookieUtils';
import axios from 'axios';

interface dataProps {
  email?: string;
  nickname?: string;
  [score: number]: any;
  [hammerTier: string]: any;
  profileImageUrl?: string;
}

const MyPage: React.FC = () => {
  const memberId = getUser()?.memberId();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const data: dataProps = useGetMembers(`/members/${memberId}`);
  const [data, setData] = useState<dataProps>({});

  useEffect(() => {
    const headers = {
      Authorization: getCookie('accessToken'),
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/members/${memberId}`, { headers })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MyPageWrapper>
      <ProfileCard imgUrl={data.profileImageUrl === null ? '' : data.profileImageUrl} mainText={data.nickname} subText={data.email} lang="EN" />
      <RankCard score={data.score} hammerTier={data.hammerTier} mainText="티어" subText={`${data.hammerTier}망치`} lang="KR" />
      <MyPost />
      <LogoutButton onClick={() => setIsModalOpen(true)}>로그아웃</LogoutButton>
      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}></LogoutModal>
    </MyPageWrapper>
  );
};

export default MyPage;

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
`;

const LogoutButton = styled.button`
  position: relative;
  left: calc(50% - 48px);
  width: 96px;
  border: none;
  background: none;
  color: var(--color-gray02);
  letter-spacing: var(--font-spacing-title);
  font-weight: 100;
`;
