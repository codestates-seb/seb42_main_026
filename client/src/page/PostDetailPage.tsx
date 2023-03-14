import PostDetail from "../components/PostDetail";
import styled from "styled-components";
import CountsBar from "../components/CountsBar";
import Answer from "../components/Answer";
import SubAnswer from "../components/SubAnswer";

const PostDetailPage = () => {
  return (
    <PostDetailWrapper>
      <PostDetail></PostDetail>
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
