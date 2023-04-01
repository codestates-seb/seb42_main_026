import { useParams } from 'react-router-dom';
import PostDetail from '../container/postdetail/PostDetail';
import styled from 'styled-components';
import CountsBar from '../container/postdetail/CountsBar';
import Answer from '../container/postdetail/Answer';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { usePage } from '../hooks/usePage';
import CommentForm from '../container/postdetail/CommentForm';
import { useApi } from '../hooks/useApi';

type Post = {
  content: string;
  createdAt: Date;
  nickname: string;
  tag: string;
  title: string;
  answers: any;
  likeCount: number;
  questionId: number;
  questionImageUrl: string;
  profileImageUrl: string;
  questionStatus: string;
  memberId: number;
  likeCheck: boolean;
};

const PostDetailPage = () => {
  const { questionId } = useParams();
  const [isTextarea, setTextarea] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const { data, error, makeApiRequest } = useApi<{ data: Post }>('get', `questions/${questionId}`);
  const { setPostDetailHandler } = usePage();

  useEffect(() => {
    makeApiRequest();
  }, []);

  useEffect(() => {
    if (data !== null) {
      console.log(data.data)
      setPost(data.data);
      setPostDetailHandler(data.data.memberId, data.data.questionId);
    }
  }, [data]);

  return (
    <PostDetailWrapper>
      {post !== null && <PostDetail {...post} />}
      {post?.questionImageUrl && <PostDetailImg src={post?.questionImageUrl} alt="postImage" />}
      {post !== null && <CountsBar questionId={post.questionId} isTextarea={isTextarea} answerHandler={setTextarea} answer={post.answers.length} likeCount={post.likeCount} likeCheck={post.likeCheck} />}
      <AnswerWrapper>
        {post !== null && isTextarea && <CommentForm questionId={post.questionId} />}
        {post?.answers.length === 0 && <NoAnswer>댓글이 없습니다.</NoAnswer>}
        {post?.answers.map((el: { likeCount: number; answerStatus: string; content: string; createdAt: string; nickname: string; comments: []; memberId: number; answerId: number; profileImageUrl: string }, index: number) => {
          return <Answer key={index} likeCheck={post.answers[index].likeCheck} postMemberId={post?.memberId} questionId={post?.questionId} {...el} />;
        })}
      </AnswerWrapper>
    </PostDetailWrapper>
  );
};

export default PostDetailPage;

const PostDetailWrapper = styled.div`
  /* padding: 0 16px; */
`;
const NoAnswer = styled.span`
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  width: 100%;
  text-align: center;
  font-size: var(--font-size14);
  color: var(--color-gray02);
  letter-spacing: var(--font-spacing-title);
`;

const PostDetailImg = styled.img`
  width: 30%;
  height: 30%;
  padding: 16px;
`;
const AnswerWrapper = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 25px;
`;
