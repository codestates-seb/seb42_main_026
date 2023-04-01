import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { ReactComponent as ICON_ANSWER } from '../../assets/ic_boardItem_answer.svg';
import { ReactComponent as ICON_LIKE } from '../../assets/ic_boardItem_like.svg';
import getCookie from '../../utils/cookieUtils';

const CountsBar = ({ answer, likeCount, answerHandler, isTextarea, questionId, likeCheck }: { answer: number; likeCount: number; answerHandler: Dispatch<SetStateAction<boolean>>; isTextarea: boolean; questionId: number; likeCheck: boolean }) => {
  const likeButton = async () => {
    const data = {
      questionId,
    };
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/questions/${questionId}/likes`, data, { headers: { Authorization: getCookie('accessToken') } });
      window.location.replace(`/questions/${questionId}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <CountsBarWrapper>
      <AnswerWrapper onClick={() => answerHandler(!isTextarea)}>
        <ICON_ANSWER />
        <AnswerContainer>
          <AnswerKey>댓글</AnswerKey>
          <AnswerValue>{answer}</AnswerValue>
        </AnswerContainer>
      </AnswerWrapper>
      <LikeWrapper onClick={() => likeButton()}>
        {likeCheck ? <ICON_LIKE stroke="#FF607C" fill="#FF607C" /> : <ICON_LIKE stroke="#ABAEB4" fill="none" />}
        <LikeContainer>
          <LikeKey>좋아요</LikeKey>
          <LikeValue>{likeCount}</LikeValue>
        </LikeContainer>
      </LikeWrapper>
    </CountsBarWrapper>
  );
};

export default CountsBar;

const CountsBarWrapper = styled.div`
  border-top: solid 0.5px var(--color-gray03);
  border-bottom: solid 0.5px var(--color-gray03);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 42px;
  margin-bottom: 12px;
`;
const AnswerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white01);
  cursor: pointer;
  padding: 0 0 0 24px;
  gap: 4px;
`;

const AnswerKey = styled.span`
  color: var(--color-gray01);
  font-size: var(--font-size12);
`;
const AnswerValue = styled.span`
  font-family: 'Roboto';
  color: var(--color-gray01);
  font-size: var(--font-size12);
`;

const LikeWrapper = styled.div`
  background-color: var(--color-white01);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const LikeKey = styled.span`
  color: var(--color-gray01);
  font-size: var(--font-size12);
`;
const LikeValue = styled.span`
  font-family: 'Roboto';
  color: var(--color-gray01);
  font-size: var(--font-size12);
`;

const AnswerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 4px;
`;
const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 4px;
`;
