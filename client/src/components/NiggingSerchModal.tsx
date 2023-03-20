import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onData: (data: any) => void;
}

const NiggingSerchModal: React.FC<ModalProps> = ({ isOpen, onClose, onData }) => {
  const [input, setinput] = useState("");
  const handleInputDelete = () => {
    setinput("");
  };

  if (!isOpen) {
    return null;
  }

  function hanblerKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/board/questions/?page=1&size=20&searchKeyowrd=${input}`)
        .then((response) => {
          const data = response.data.data;
          onData(data);
          onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <>
      {isOpen && (
        <>
          <ModalWrapper>
            <InputWrapper>
              <SerchInput placeholder="검색어를 입력해주세요 ." value={input} onChange={(e) => setinput(e.target.value)} onKeyDown={(e) => hanblerKeyDown(e)}></SerchInput>
              <InputDeleteButton onClick={handleInputDelete}>X</InputDeleteButton>
            </InputWrapper>
          </ModalWrapper>
          <ModalBackground onClick={onClose}></ModalBackground>
        </>
      )}
    </>
  );
};

export default NiggingSerchModal;

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
  border-radius: 10px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 70px;
  left: 50%;
  height: 135px;
  z-index: 9999;
  width: 90%;
  height: 100px;
  gap: 30px;
`;

const CloseButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  border-radius: 50px;
  color: var(--color-white01);
  background-color: var(--color-mobMain);
  padding: 17px 0;
  border: none;
`;

const SerchInput = styled.input`
  width: 90%;
  padding: 14px 14px 14px 18px;
  font-weight: var(--font-weight600);
  letter-spacing: var(--font-spacing-title);
  border-radius: 50px;
  border: none;
`;

const InputDeleteButton = styled.button`
  position: absolute;
  width: 35px;
  height: 35px;
  margin-right: 10px;
  z-index: 10000;
  right: 16px;
  background: inherit;
  border: none;
  color: var(--color-gray01);
  font-size: var(--font-size-title);
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  input::placeholder {
    letter-spacing: -0.05em;
    color: var(--color-gray01);
    font-size: var(--font-size14);
  }
  input:focus {
    outline: 0.1px solid var(--color-mobMain);
    color: var(--color-black01);
    background-color: var(--color-white01);
    box-shadow: 0px 0.5px 1px rgba(255, 96, 124, 1);
  }
`;
