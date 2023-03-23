import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ImageBox from '../../components/ImageBox';
import { ReactComponent as ICON_PROFILE_IMG } from '../../assets/ic_profile.svg';
import { useRef, useState } from 'react';
import ProfilePreviewModal from '../../components/ProfilePreviewModal';
import ICON_PROFILE from '../../assets/ic_mypage_profile.svg';

interface profileProps {
  imgUrl?: string;
  mainText?: string;
  subText?: string;
  lang: string;
}

const ProfileCard = ({ imgUrl, mainText, subText, lang }: profileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgFile, setImgFile] = useState<File | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImgFile(file);
      setIsModalOpen(!isModalOpen);
    }
  };

  return (
    <ProfileCardWrapper>
      <ImageBoxWrapper>
        <img src={imgUrl === '' ? ICON_PROFILE : imgUrl} alt="profile_image" lang="EN" />
        <InfoBoxWrapper>
          <MainText>{mainText}</MainText>
          <SubText>{subText}</SubText>
        </InfoBoxWrapper>
      </ImageBoxWrapper>

      <ImgWrapper onClick={() => inputRef.current?.click()}>
        <ICON_PROFILE_IMG />
      </ImgWrapper>

      <EditWrapper>
        <Link to="/useredit">수정</Link>
      </EditWrapper>
      <CustomInput ref={inputRef} type="file" accept="image/gif ,image/jpeg, image/png" onChange={previewImage} />
      {isModalOpen === true ? <ProfilePreviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imgFile={imgFile} /> : null}
    </ProfileCardWrapper>
  );
};

export default ProfileCard;

const CustomInput = styled.input`
  display: none;
`;
const ProfileCardWrapper = styled.div`
  position: relative;
  padding: 0 0 0 13px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border: 1px solid var(--color-gray03);
  border-radius: 5px;
`;

const EditWrapper = styled.div`
  position: relative;
  padding: 0 40px 0 0;
  a {
    color: #ff607c;
    font-weight: 500;
    text-align: center;
    font-size: var(--font-size16);
    letter-spacing: var(--font-spacing-title);
    color: var(--color-mobMain);
  }
`;

const ImgWrapper = styled.button`
  position: absolute;
  left: 54px;
  top: 48px;
  display: flex;
  border: none;
  background-color: transparent;
`;
const ImageBoxWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 36px;
  left: 13px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const InfoBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const MainText = styled.div`
  text-align: left;
  font-family: ${(props) => (props.lang === 'EN' ? 'Roboto' : 'Noto Sans KR')};
  color: var(--color-black01);
  font-size: var(--font-size18);
`;
const SubText = styled.div`
  text-align: left;
  font-size: var(--font-size12);
  font-family: ${(props) => (props.lang === 'EN' ? 'Roboto' : 'Noto Sans KR')};
  letter-spacing: -0.05em;
  color: var(--color-gray02);
`;
