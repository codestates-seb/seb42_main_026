import axios from 'axios';
import styled from 'styled-components';
import getCookie from '../utils/cookieUtils';
import imageCompression from 'browser-image-compression';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imgFile: File | undefined;
}

const ProfilePreviewModal: React.FC<ModalProps> = ({ isOpen, onClose, imgFile }) => {
  if (!isOpen) {
    return null;
  }

  const actionImgCompress = async (imgFile: any) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      console.log('dkq');
      return await imageCompression(imgFile, options);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePatch = async () => {
    const headers = {
      Authorization: getCookie('accessToken'),
    };
    const formData = new FormData();
    if (imgFile !== undefined) {
      const compressedImage = (await actionImgCompress(imgFile)) as string | Blob;
      formData.append('profileImage', compressedImage);
    }

    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/members/profileImage`, formData, { headers })
      .then((response) => {
        alert('프로필이미지 변경 완료!');
        onClose();
        window.location.replace(`/mypage`);
      })
      .catch((err) => {
        console.log(err);
        alert('프로필이미지 변경에 실패하였습니다.');
        onClose();
      });
  };

  return (
    <>
      {isOpen && (
        <>
          <ModalWrapper>
            {imgFile && <img src={URL.createObjectURL(imgFile)} alt="preview" />}
            <SendButton onClick={handlePatch}>수정하기</SendButton>
          </ModalWrapper>
          <ModalBackground onClick={onClose}></ModalBackground>
        </>
      )}
    </>
  );
};

export default ProfilePreviewModal;

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
`;

const ModalWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  transform: translate(-50%);
  top: 70%;
  left: 50%;
  z-index: 9999;
  width: 390px;
  height: auto;
  gap: 20px;
  padding: 30px 0;
  img {
    width: 70%;
    height: 70%;
    object-fit: cover;
  }
`;

const SendButton = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  color: var(--color-white01);
  background-color: var(--color-mobMain);
`;
