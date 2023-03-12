import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ImageBox from '../../components/ImageBox';
import getCookie from '../../utils/cookieUtils';
import { getUser } from '../../utils/getUser';
import ICON_PROFILE_IMG from '../../assets/ic_profile.svg';
import { useState } from 'react';

interface profileProps {
  imgUrl?: string;
  mainText?: string;
  subText?: string;
  lang: string;
}

const ProfileCard = ({ imgUrl, mainText, subText, lang }: profileProps) => {
  const memberId = getUser()?.memberId();
  const handleProfileImg = () => {
    const headers = {
      Authorization: getCookie('accessToken'),
    };

    const formData = new FormData();
    // formData.append('profileImage', file);

    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/members/change-profile/${memberId}`, formData, { headers })
      .then((response) => {
        alert('프로필이미지 변경 완료!');
      })
      .catch((err) => {
        console.log(err);
        alert('프로필이미지 변경에 실패하였습니다.');
      });
  };
  return (
    <ProfileCardWrapper>
      <ImageBox imgUrl={imgUrl} mainText={mainText} subText={subText} lang={lang}></ImageBox>

      <EditWrapper>
        <Link to="/useredit">수정</Link>
      </EditWrapper>

      <form onSubmit={handleProfileImg}>
        <ImgWrapper>
          <img src={ICON_PROFILE_IMG} alt="myProfileImg" />
        </ImgWrapper>
      </form>
    </ProfileCardWrapper>
  );
};

export default ProfileCard;

const ProfileCardWrapper = styled.div`
  position: relative;
  padding: 0 0 0 20px;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color-gray03);
  border-radius: 5px;
  img {
    padding-right: 5px;
  }
`;

const EditWrapper = styled.div`
  position: relative;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    color: #ff607c;
    font-weight: 500;
    text-align: center;
    font-size: var(--font-size14);
    letter-spacing: var(--font-spacing-title);
    color: var(--color-mobMain);
  }
`;

const ImgWrapper = styled.button`
  position: absolute;
  left: 46px;
  top: 35px;
  display: flex;
  border: none;
  background-color: transparent;
`;
