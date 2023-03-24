import styled from 'styled-components';

const RankInfo = () => {
  return (
    <MenuButtonWrapper>
      <EditDeleteContainer>
        <ul>
          <li>ㆍ잔소리 요청 : 20점</li>
          <li>ㆍ잔소리 : 10점</li>
          <li>ㆍ채택 : 30점</li>
          <li>ㆍ게시글 삭제 시 활동점수가 차감됩니다</li>
        </ul>
      </EditDeleteContainer>
    </MenuButtonWrapper>
  );
};
export default RankInfo;

const MenuButtonWrapper = styled.div`
  position: relative;
`;

const EditDeleteContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap;
  padding: 10px 18px 10px 8px;
  left: -135px;
  top: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--color-gray03);
  font-size: var(--font-size14);
  color: var(--color-gray02);
  z-index: 100;
  li {
    margin-bottom: 5px;
  }
`;
