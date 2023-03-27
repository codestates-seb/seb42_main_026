import styled from 'styled-components';
import axios from 'axios';
import SubApp from '../container/home/SubApp';
import BoardItem from '../container/naggingboard/BoardItem';
import { useEffect, useState } from 'react';
import parseDateUtils from '../utils/paeseDateUtils';
import { Link } from 'react-router-dom';

export interface IQuestion {
  title: string;
  nickname: string;
  likeCount: number;
  createdAt: Date;
  answerCount: number;
  tag: string;
  questionId: number;
  questionStatus: string;
}

export default function HomePage() {
  const [list, setList] = useState([]);

  async function homequestions() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/home/questions`
      );
      if (response?.data.data.length) {
        setList(response?.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    homequestions();
  }, []);

  return (
    <HomePageWrapper>
      <SubApp />
      <PopulerBoardTitle>인기 잔소리</PopulerBoardTitle>
      <PopulerBoard>
        {list.map(
          (
            {
              title,
              nickname,
              likeCount,
              createdAt,
              answerCount,
              tag,
              questionId,
              questionStatus,
            }: IQuestion,
            index: number
          ) => (
            <Link to={`/questions/${questionId}`} key={index}>
              <BoardItem
                questionStatus={questionStatus}
                title={title}
                likeCount={likeCount}
                nickname={nickname}
                createdAt={parseDateUtils(createdAt)}
                answerCount={answerCount}
                tag={tag}
              />
            </Link>
          )
        )}
      </PopulerBoard>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div``;
const PopulerBoard = styled.div`
  padding: 14px 16px;
`;
const PopulerBoardTitle = styled.div`
  padding: 20px 0 0px 16px;
  font-size: var(--font-size18);
  font-weight: var(--font-weight700);
  letter-spacing: var(--font-spacing-title);
  border-top: solid 1px #f6f6f6;
`;
