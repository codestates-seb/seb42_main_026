import styled from 'styled-components';

const RankInfo = () => {
  return (
    <MenuButtonWrapper>
      <EditDeleteContainer>
        <ul>
          <li>ㆍ잔소리 요청 : 20점</li>
          <li>ㆍ잔소리 : 10점</li>
          <li>ㆍ채택 : 30점</li>
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
  left: 10px;
  top: -8px;
  background: var(--color-white01);
  border: 1px solid var(--color-gray03);
  font-size: var(--font-size14);
  color: var(--color-gray02);
  li {
    margin-bottom: 5px;
  }
`;
