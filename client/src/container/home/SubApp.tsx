import styled from 'styled-components';
import { ReactComponent as ICON_POPULAR } from '../../assets/ic_home_sub_popular.svg';
import { ReactComponent as ICON_CHECKLIST } from '../../assets/ic_home_sub_checklist.svg';
import { ReactComponent as ICON_PRE } from '../../assets/ic_home_sub_pre.svg';
import { Link } from 'react-router-dom';

const SubApp = () => {
  return (
    <SubAppWrapper>
      <SubAppContainer>
        <Link to="/">
          <ICON_POPULAR width={28} height={28} />
        </Link>
        <SubAppText>인기게시글</SubAppText>
      </SubAppContainer>
      <Link to="/checklist">
        <SubAppContainer>
          <ICON_CHECKLIST width={28} height={28} />
          <SubAppText>자취필수체크</SubAppText>
        </SubAppContainer>
      </Link>
      <SubAppContainer>
        <ICON_PRE width={32} height={32} />
        <SubAppText color="gray">준비중</SubAppText>
      </SubAppContainer>
      <SubAppContainer>
        <ICON_PRE width={32} height={32} />
        <SubAppText color="gray">준비중</SubAppText>
      </SubAppContainer>
    </SubAppWrapper>
  );
};

export default SubApp;

const SubAppWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px 20px 40px;
  gap: 18px;
  user-select: none;
`;

const SubAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 62px;
  height: 62px;
  gap: 9px;
  cursor: pointer; ;
`;

const SubAppText = styled.span`
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  font-size: var(--font-size12);
  color: ${(props) => (props.color === 'gray' ? `var(--color-gray01)` : `var(--color-black01)`)};
`;
