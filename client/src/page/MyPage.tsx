import styled from "styled-components";
import ProfileCard from "../container/mypage/ProfileCard";
import RankCard from "../container/mypage/RankCard";
import MyPost from "../container/mypage/MyPost";
import LogoutModal from "../components/LogoutModal";
import React, { useState } from "react";
import useGetMembers from "../hooks/useGetMembers";

interface dataProps {
  email?: string;
  nickname?: string;
  [score: number]: any;
  [hammerTier: string]: any;
  profileImageUrl?: string;
}

const MyPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //로컬스토리지에서 memberId 갖고오기
  const memberId = localStorage.getItem("memberId");
  const data: dataProps = useGetMembers(`/members/${memberId}`);

  return (
    <MyPageWrapper>
      {/* <MyPageTitle>회원정보</MyPageTitle> */}
      <ProfileCard
        imgUrl={data.profileImageUrl}
        mainText={data.nickname}
        subText={data.email}
        lang="EN"
      />
      <RankCard
        score={data.score}
        hammerTier={data.hammerTier}
        mainText="티어"
        subText={`${data.hammerTier}망치`}
        lang="KR"
      />
      <MyPost />
      <LogoutButton onClick={() => setIsModalOpen(true)}>로그아웃</LogoutButton>
      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></LogoutModal>
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
  /* font-size: var(--font-size16); */
  color: var(--color-gray02);
  letter-spacing: var(--font-spacing-title);
  font-weight: 100;
`;
