import styled from 'styled-components';
import BoardItem from '../container/naggingboard/BoardItem';
import { Link } from 'react-router-dom';
import useGetMyQuestions from '../hooks/useGetMyQuestions';
import parseDateUtils from '../utils/paeseDateUtils';

const MyPostsPage = () => {
  const data = useGetMyQuestions(`/members/questions?page=1&size=10`);

  return (
    <MyPostsBoard>
      {data.map(
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
          },
          index
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
    </MyPostsBoard>
  );
};

export default MyPostsPage;

const MyPostsBoard = styled.div`
  padding: 0px 16px;
`;
