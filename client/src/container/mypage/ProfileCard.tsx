import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ImageBox from '../../components/ImageBox';
import { ReactComponent as ICON_PROFILE_IMG } from '../../assets/ic_profile.svg';
import { useRef, useState } from 'react';
import ProfilePreviewModal from '../../components/ProfilePreviewModal';

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
      <ImageBox imgUrl={imgUrl} mainText={mainText} subText={subText} lang={lang}></ImageBox>

      <ImgWrapper onClick={() => inputRef.current?.click()}>
        <ICON_PROFILE_IMG />
      </ImgWrapper>

      <EditWrapper>
        <Link to="/useredit">수정</Link>
      </EditWrapper>
      <CustomInput ref={inputRef} type="file" accept="image/*" onChange={previewImage} />
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
  padding: 0 0 0 10px;
  height: 75px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border: 1px solid var(--color-gray03);
  border-radius: 5px;
  img {
    padding-right: 5px;
  }
`;

const EditWrapper = styled.div`
  position: relative;
  padding: 0 30px 0 0;
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
  left: 60px;
  top: 35px;
  display: flex;
  border: none;
  background-color: transparent;
`;
