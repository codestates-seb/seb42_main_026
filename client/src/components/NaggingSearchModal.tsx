import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onData: (data: any) => void;
}

const NaggingSearchModal: React.FC<ModalProps> = ({ isOpen, onClose, onData }) => {
  const [input, setInput] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    if (savedHistory) {
      setSearchHistory(savedHistory);
    }
  }, []);

  const handleInputDelete = () => {
    setInput("");
  };

  if (!isOpen) {
    return null;
  }
  const handleSearchDelete = (index: number) => {
    const newHistory = [...searchHistory];
    newHistory.splice(index, 1);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };
  function handlerKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/board/questions/?page=1&size=20&searchKeyword=${input}`)
        .then((response) => {
          const data = response.data.data;
          onData(data);
          onClose();
          setInput("");
        })
        .catch((err) => {
          console.log(err);
        });
      const newHistory = [input, ...searchHistory.slice(0, 7)];
      setSearchHistory([...newHistory] as unknown as never[]);
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }
  }
  return (
    <>
      {isOpen && (
        <>
          <ModalWrapper>
            <InputWrapper>
              <SearchInput placeholder="검색어를 입력해주세요 ." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => handlerKeyDown(e)}></SearchInput>
              <InputDeleteButton onClick={handleInputDelete}>X</InputDeleteButton>
            </InputWrapper>
            <ul>
              {searchHistory.map((searchItem, index) => (
                <li key={index}>
                  {searchItem}
                  <button className="delete" onClick={() => handleSearchDelete(index)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          </ModalWrapper>
          <ModalBackground onClick={onClose}></ModalBackground>
        </>
      )}
    </>
  );
};

export default NaggingSearchModal;

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
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 10px;
  transform: translate(-50%);
  position: absolute;
  top: 70px;
  left: 50%;
  height: 135px;
  z-index: 9999;
  width: 90%;
  height: auto;
  ul {
    padding: 16px 16px;
  }
  li {
    color: var(--color-white01);
    padding-top: 10px;
    button {
      font-size: var(--font-size14);
      color: var(--color-white01);
      padding: 8px;
      border: none;
      background-color: transparent;
    }
  }
`;
const SearchInput = styled.input`
  width: 90%;
  padding: 14px 14px 14px 18px;
  font-weight: var(--font-weight400);
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
  color: var(--color-mobMain);
  font-size: var(--font-size-title);
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;

  input::placeholder {
    color: var(--color-gray01);
    font-size: var(--font-size14);
    font-weight: var(--font-weight400);
    letter-spacing: var(--font-spacing-bottom);
  }
  input:focus {
    outline: 0.1px solid var(--color-mobMain);
    color: var(--color-black01);
    background-color: var(--color-white01);
    box-shadow: 0px 0px 15px rgba(255, 96, 124, 1);
    font-weight: var(--font-weight400);
    letter-spacing: var(--font-spacing-bottom);
  }
`;
