import styled from 'styled-components';
import BoardItem from '../container/naggingboard/BoardItem';
import { Link } from 'react-router-dom';
import parseDateUtils from '../utils/paeseDateUtils';
import { useApi } from '../hooks/useApi';
import { useEffect } from 'react';

interface dataProps {
  data: {
    questionStatus: string;
    title: string;
    likeCount: number;
    nickname: string;
    createdAt: Date;
    answerCount: number;
    questionId: number;
    tag: string;
  }[];
}

const MyPostsPage = () => {
  // const data = useGetMyQuestions(`/members/questions?page=1&size=10`);
  const { data, error, makeApiRequest } = useApi<dataProps>('get', 'members/questions?page=1&size=10');

  useEffect(() => {
    makeApiRequest();
  }, []);

  const item = data?.data;
  return (
    <MyPostsBoard>
      {item?.map(({ title, nickname, likeCount, createdAt, answerCount, tag, questionId, questionStatus }, index) => (
        <Link to={`/questions/${questionId}`} key={index}>
          <BoardItem questionStatus={questionStatus} title={title} likeCount={likeCount} nickname={nickname} createdAt={parseDateUtils(createdAt)} answerCount={answerCount} tag={tag} />
        </Link>
      ))}
    </MyPostsBoard>
  );
};

export default MyPostsPage;

const MyPostsBoard = styled.div`
  padding: 0px 16px;
`;
