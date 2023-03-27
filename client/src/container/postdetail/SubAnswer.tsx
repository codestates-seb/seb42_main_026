import styled from 'styled-components';
import ICON_PROFILE from '../../assets/ic_mypage_profile.svg';
import { ReactComponent as ICON_MENU } from '../../assets/ic_answer_menubutton.svg';
import MenuButton from '../../components/MenuButton';
import { getUser } from '../../utils/getUser';
import { useState } from 'react';
import getCookie from '../../utils/cookieUtils';
import axios from 'axios';
import parseDateUtils from '../../utils/paeseDateUtils';

//필수 타입 ? 제거하기
interface AnswerCardProps {
  profileImageUrl: string;
  nickname: string;
  createdAt: string;
  content: string;
  memberId: number;
  questionId: number;
  answerId: number;
  commentId: number;
}

//임의로 넣어놓은 데이터값도 제거하기
const SubAnswer = ({
  profileImageUrl,
  nickname,
  createdAt,
  content,
  memberId,
  questionId,
  answerId,
  commentId,
}: AnswerCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const comentDelete = async () => {
    if (memberId === Number(getUser()?.memberId())) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/questions/${questionId}/answers/${answerId}/comments/${commentId}`,
          { headers: { Authorization: getCookie('accessToken') } }
        );
        alert('삭제되었습니다.');
        return window.location.replace(`/questions/${questionId}`);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  };

  return (
    <SubAnswerWrapper>
      <AnswerWrapper>
        <ImageWrapper>
          <img
            src={profileImageUrl === null ? ICON_PROFILE : profileImageUrl}
            alt="profile_image"
          />
        </ImageWrapper>
        <TextWrapper>
          <TopWrapper>
            <InfoWrapper>
              <NameWrapper>{nickname}</NameWrapper>
              <TimeWrapper>{parseDateUtils(new Date(createdAt))}</TimeWrapper>
            </InfoWrapper>
            <TopRightWrapper>
              <MenuButtonWrapper>
                {memberId === getUser()?.memberId() && (
                  <>
                    <ICON_MENU onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    {isMenuOpen === true ? (
                      <MenuButton
                        menu={[
                          {
                            title: '수정',
                            button: function () {
                              console.log('수정');
                            },
                          },
                          {
                            title: '삭제',
                            button: function () {
                              if (window.confirm('정말 삭제 하시겠습니까?')) {
                                setIsMenuOpen(false);
                                return comentDelete();
                              }
                            },
                          },
                        ]}
                      />
                    ) : null}
                  </>
                )}
              </MenuButtonWrapper>
            </TopRightWrapper>
          </TopWrapper>
          <MiddleWrapper>{content}</MiddleWrapper>
          <BottomWrapper>
            <BottomLeftWrapper>
              {/* <LikeWrapper>
                <img src={ICON_LIKE} alt="좋아요"></img>
                <LikeNumber>2</LikeNumber>
              </LikeWrapper> */}
            </BottomLeftWrapper>
          </BottomWrapper>
        </TextWrapper>
      </AnswerWrapper>
    </SubAnswerWrapper>
  );
};

export default SubAnswer;

const SubAnswerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100% - 36px);
  padding-left: 36px;
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  img {
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 50%;
    background-color: var(--color-gray04);
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 8px;
  margin-left: 5px;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const NameWrapper = styled.div`
  color: var(--color-black01);
  font-weight: var(--font-weight700);
  font-size: var(--font-size12);
`;

const TimeWrapper = styled.div`
  color: var(--color-gray02);
  font-weight: var(--font-weight300);
  font-size: var(--font-size12);
`;

const MenuButtonWrapper = styled.div``;

const TopRightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 0.625rem;
`;

const MiddleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  line-height: 22.4px;
  font-weight: var(--font-weight300);
`;
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

// const LikeWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   gap: 2px;
//   align-items: center;
// `;

// const LikeNumber = styled.div`
//   font-weight: var(--font-weight700);
//   font-size: var(--font-size12);
//   color: var(--color-gray02);
// `;

const BottomLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;
