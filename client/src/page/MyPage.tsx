import styled from 'styled-components';
import ProfileCard from '../container/mypage/ProfileCard';
import RankCard from '../container/mypage/RankCard';
import LogoutModal from '../components/LogoutModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApi } from '../hooks/useApi';

interface dataProps {
  data: {
    email: string;
    nickname: string;
    score: number;
    hammerTier?: string;
    profileImageUrl: string;
  };
}

const MyPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, makeApiRequest } = useApi<dataProps>('get', 'members');

  useEffect(() => {
    makeApiRequest();
  }, []);

  return (
    <MyPageWrapper>
      {data !== null && (
        <>
          <ProfileCard imgUrl={data.data.profileImageUrl === null ? '' : data.data.profileImageUrl} mainText={data.data.nickname} subText={data.data.email} />
          <RankCard score={Number(data.data.score)} hammerTier={data.data.hammerTier} mainText="티어" subText={`${data.data.hammerTier}망치`} />
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
