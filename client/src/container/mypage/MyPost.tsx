import styled from 'styled-components';

const MyPost = () => {
  return (
    <MyPostWrapper>
      <MyPostButton>내가 쓴 글 조회 </MyPostButton>
    </MyPostWrapper>
  );
};

export default MyPost;

const MyPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid var(--color-gray03);
  border-radius: 5px;
  padding: 35px 0px;
`;

const MyPostButton = styled.span`
  position: relative;
  left: 20px;
  font-size: var(--font-size16);
  color: var(--color-black01);
`;
