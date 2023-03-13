import styled from 'styled-components';
import ProfileCard from '../container/mypage/ProfileCard';
import RankCard from '../container/mypage/RankCard';
import MyPost from '../container/mypage/MyPost'

const MyPage = () => {
  return (
    <MyPageWrapper>
      <MyPageTitle>회원정보</MyPageTitle>
      <ProfileCard />
      <RankCard />
      <MyPost />
    </MyPageWrapper>
  );
};

export default MyPage;

const MyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 0px 20px;
`;

const MyPageTitle = styled.span`
  font-size: 22px;
  font-weight: var(--font-weight700);
  color: var(--color-mobMain);
  letter-spacing: var(--font-spacing-title);
`;
