import styled from 'styled-components';
import BoardItem from '../container/naggingboard/BoardItem';
import { Link } from 'react-router-dom';
import useGetMyQuestions from '../hooks/useGetMyQuestions';

const MyPostsPage = () => {
  const data = useGetMyQuestions(`/members/questions?page=1&size=10`);
  const parseDate = (props: Date) => {
    const now = new Date(props);
    const MM = Number(now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const dd = Number(now.getDate()) < 10 ? `0${now.getDate()}` : now.getDate();
    return `${MM}/${dd}`;
  };

  return (
    <MyPostsBoard>
      {data.map(({ title, nickname, likeCount, createdAt, answerCount, tag, questionId, questionStatus }, index) => (
        <Link to={`/questions/${questionId}`} key={index}>
          <BoardItem questionStatus={questionStatus} title={title} likeCount={likeCount} nickname={nickname} createdAt={parseDate(createdAt)} answerCount={answerCount} tag={tag} />
        </Link>
      ))}
    </MyPostsBoard>
  );
};

export default MyPostsPage;

const MyPostsBoard = styled.div`
  padding: 0px 16px;
`;
