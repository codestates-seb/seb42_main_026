import styled from "styled-components";
import ButtonStyled from "../components/ButtonStyled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // children: React.ReactNode;
}

const DeleteModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <>
          <ModalWrapper>
            <AskWrapper>댓글을 삭제하시겠습니까?</AskWrapper>
            <ButtonWrapper>
              <ButtonStyled
                buttonClickHandler={onClose}
                color="normal"
                title="취소"
                width="161px"
                height="55px"
              ></ButtonStyled>
              <ButtonStyled
                buttonClickHandler={onClose}
                color="pink"
                title="삭제하기"
                width="161px"
                height="55px"
              ></ButtonStyled>
            </ButtonWrapper>
          </ModalWrapper>

          <ModalBackground onClick={onClose}></ModalBackground>
        </>
      )}
    </>
  );
};

export default DeleteModal;

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 500;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  height: 135px;
  z-index: 9999;
  width: 390px;
  height: 175px;
  gap: 30px;
`;

const AskWrapper = styled.div`
  color: var(--color-mobMain);
  /* width: 350px; */
  font-weight: var(--font-weight600);
  letter-spacing: var(--font-spacing-title);
  align-items: center;
  padding: 10px 0 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
