import { useParams } from 'react-router-dom';
import PostDetail from '../container/postdetail/PostDetail';
import styled from 'styled-components';
import CountsBar from '../components/CountsBar';
import Answer from '../components/Answer';
import SubAnswer from '../components/SubAnswer';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Post = {
  content: string;
  createdAt: Date;
  nickname: string;
  tag: string;
  title: string;
};

const PostDetailPage = () => {
  const { questionId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  const postData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/questions/${questionId}`);
      const { data } = response.data;
      console.log(data);
      setPost(data); // 서버에서 발급한 토큰 등의 정보가 담긴 객체
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    postData();
  }, []);

  return (
    <PostDetailWrapper>
      {post !== null && <PostDetail {...post} />}
      <CountsBar></CountsBar>
      <AnswerWrapper>
        <Answer></Answer>
        <SubAnswer></SubAnswer>
      </AnswerWrapper>
    </PostDetailWrapper>
  );
};

export default PostDetailPage;

const PostDetailWrapper = styled.div`
  /* padding: 0 16px; */
`;

const AnswerWrapper = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
