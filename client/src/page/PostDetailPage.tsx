import PostDetail from "../components/PostDetail";
import styled from "styled-components";

const PostDetailPage = () => {
  return (
    <PostDetailWrapper>
      <PostDetail></PostDetail>
    </PostDetailWrapper>
  );
};

export default PostDetailPage;

const PostDetailWrapper = styled.div`
  padding: 0 16px;
`;
