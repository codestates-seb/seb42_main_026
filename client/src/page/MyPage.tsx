import styled from "styled-components";
import ProfileCard from "../container/mypage/ProfileCard";
import RankCard from "../container/mypage/RankCard";
import MyPost from "../container/mypage/MyPost";
import LogoutModal from "../components/LogoutModal";
import React, { useState } from "react";
import useGetMembers from "../hooks/useGetMembers";

const MyPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //로컬스토리지에서 memberId 갖고오기
  const memberId = localStorage.getItem("memberId");

  // interface dataProps {
  //   email: string;
  //   memberId: number;
  //   nickname: string;
  // }

  const data: any = useGetMembers(`/members/${memberId}`);
  console.log(data.email);

  return (
    <MyPageWrapper>
      {/* <MyPageTitle>회원정보</MyPageTitle> */}
      <ProfileCard />
      <RankCard />
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
  /* font-size: var(--font-size16); */
  color: var(--color-gray02);
  letter-spacing: var(--font-spacing-title);
  font-weight: 100;
`;
