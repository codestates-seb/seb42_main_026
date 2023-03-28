import styled from 'styled-components';
import ButtonStyled from '../components/ButtonStyled';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { getUser } from '../utils/getUser';
import getCookie from '../utils/cookieUtils';

const RemoveAccountPage = () => {
  const navigate = useNavigate();
  const { logoutHandler } = useAuth();
  const nickname = getUser()?.nickname();

  function handleMemberDelete() {
    const headers = {
      Authorization: getCookie('accessToken'),
    };

    if (window.confirm('정말 탈퇴 하시겠습니까?')) {
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/members`, { headers })
        .then((response) => {
          console.log(response);
          logoutHandler();
          alert('탈퇴가 완료되었습니다');
        })
        .catch((err) => {
          console.log(err);
          alert('탈퇴가 처리가 되지않았습니다');
        });
    }
  }

  return (
    <RemoveWrapper>
      <TitleWrapper>탈퇴 안내</TitleWrapper>
      <TextTitleWrapper>
        <div>{nickname} 님과 이별인가요?</div> <div>너무 아쉬워요..😭</div>
      </TextTitleWrapper>
      <TextWrapper style={{ whiteSpace: 'pre-wrap' }}>
        <div className="check">
          <span>☑</span>
          <div>회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요!</div>
        </div>
        <div className="check">
          <span>☑</span>
          <div>
            탈퇴 후 회원정보 및 티어, 랭킹 등 이용기록은 모두 삭제됩니다.
          </div>
        </div>
        <div className="check">
          <span>☑</span>
          <div>
            탈퇴 후에도 게시판형 서비스에 등록한 게시물은 그대로 남아 있습니다.
          </div>
        </div>
        <div className="check">
          <span>☑</span>
          <div>
            탈퇴한 아이디는 본인과 타인 모두 재사용 및 복구가 불가하오니
            신중하게 선택하시기 바랍니다.
          </div>
        </div>
      </TextWrapper>
      <div className="delete">정말 탈퇴하시겠습니까?</div>
      <ButtonWrapper>
        <DeleteButton onClick={handleMemberDelete}>네, 탈퇴할래요</DeleteButton>
        <ButtonStyled
          color="pink"
          title="아니요, 더 사용해볼래요"
          width="161px"
          buttonClickHandler={() => navigate(`/mypage`)}
        ></ButtonStyled>
      </ButtonWrapper>
    </RemoveWrapper>
  );
};

export default RemoveAccountPage;

const RemoveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 16px 0 16px;
  width: calc(100% - 32px);
  .delete {
    margin-top: 30px;
    height: auto;
    text-align: center;
    letter-spacing: var(--font-spacing-title);
    color: var(--color-mobMain);
    font-weight: var(--font-weight700);
    font-size: var(--font-size18);
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: var(--color-gray01);
  font-size: var(--font-size14);
  letter-spacing: var(--font-spacing-title);
  padding: 10px 0;
`;
const TextTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  div {
    font-size: var(--font-size16);
    color: var(--color-black01);
    :first-child {
      color: var(--color-mobMain);
      font-weight: var(--font-weight700);
      font-size: 20px;
    }
  }
`;
const TextWrapper = styled.div`
  text-align: start;
  font-size: var(--font-size14);
  color: var(--color-black01);
  letter-spacing: -5%;
  line-height: 1.5rem;
  font-weight: 300;
  letter-spacing: var(--font-spacing-title);
  padding: 10px 15px;
  div {
    padding: 6px;
  }
  .check {
    display: flex;
    flex-direction: row;
    color: var(--color-mobMain);
    div {
      padding: 0 0 0 5px;
      color: var(--color-black01);
    }
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 20px 0;
`;

const DeleteButton = styled.button`
  width: 161px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: var(--color-gray01);
  border: solid 1px var(--color-gray03);
  background-color: var(--color-white01);
`;
