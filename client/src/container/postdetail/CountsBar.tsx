import styled from 'styled-components';
import ANSWER_ICON from '../../assets/ic_boardItem_answer.svg';
import LIKE_ICON from '../../assets/ic_boardItem_like.svg';

const CountsBar = ({ answer, likeCount }: { answer: number; likeCount: number }) => {
  return (
    <CountsBarWrapper>
      <AnswerWrapper>
        <img src={ANSWER_ICON} alt="답글아이콘"></img>
        <AnswerKey>댓글</AnswerKey>
        <AnswerValue>{answer}</AnswerValue>
      </AnswerWrapper>
      <LikeWrapper>
        <img src={LIKE_ICON} alt="좋아요아이콘"></img>
        <LikeKey>좋아요</LikeKey>
        <LikeValue>{likeCount}</LikeValue>
      </LikeWrapper>
    </CountsBarWrapper>
  );
};

export default CountsBar;

const CountsBarWrapper = styled.div`
  border-top: solid 0.5px var(--color-gray03);
  border-bottom: solid 0.5px var(--color-gray03);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  /* flex-direction: row; */
  gap: 160px;
  margin-bottom: 12px;
`;
const AnswerWrapper = styled.div`
  display: flex;
  padding: 0 0 0 24px;
  gap: 5.5px;
`;

const AnswerKey = styled.div`
  color: var(--color-gray01);
  font-size: var(--font-size14);
`;
const AnswerValue = styled.div`
  color: var(--color-gray01);
  font-size: var(--font-size12);
`;

const LikeWrapper = styled.div`
  display: flex;
  gap: 5.5px;
`;

const LikeKey = styled.div`
  color: var(--color-gray01);
  font-size: var(--font-size14);
`;
const LikeValue = styled.div`
  color: var(--color-gray01);
  font-size: var(--font-size12);
`;
