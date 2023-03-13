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
        <ModalBackground>
          <ModalWrapper>
            <AskWrapper>댓글을 삭제하시겠습니까?</AskWrapper>
            <ButtonWrapper>
              <ButtonStyled
                color="normal"
                title="취소"
                onClick={() => onClose}
              ></ButtonStyled>
              <ButtonStyled color="pink" title="삭제하기"></ButtonStyled>
            </ButtonWrapper>
          </ModalWrapper>
          <ModalClose onClick={onClose}>X</ModalClose>
        </ModalBackground>
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
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  position: fixed;
  top: 50%;
  left: 50%;
  height: 135px;
`;

const AskWrapper = styled.div`
  font-size: var(--font-size16);
  width: 350px;
  padding-bottom: 20px;
`;

const ModalClose = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 161px;
  height: 55px;
  gap: 10px;
`;
