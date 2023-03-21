import styled from 'styled-components';
import ICON_PROFILE from '../../assets/ic_mypage_profile.svg';
import ButtonStyled from '../../components/ButtonStyled';
import ICON_MENUBUTTON from '../../assets/ic_answer_menubutton.svg';
import ICON_LIKE from '../../assets/ic_boardItem_like.svg';
import { ReactComponent as ICON_MENU } from '../../assets/ic_answer_menubutton.svg';
import SubAnswer from './SubAnswer';
import CommentForm from './CommentForm';
import { getUser } from '../../utils/getUser';
import MenuButton from '../../components/MenuButton';
import { useState } from 'react';

//필수 타입 ? 제거하기
interface AnswerCardProps {
  imgUrl?: string;
  nickname: string;
  createdAt: string;
  likeCount: number;
  answerStatus: string;
  content: string;
  comments?: [];
  memberId: number;
}

//임의로 넣어놓은 데이터값도 제거하기
const Answer = ({ likeCount, imgUrl = '', nickname, createdAt, answerStatus, content, comments, memberId }: AnswerCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <AnswerWrapper>
        <ImageWrapper>
          <img src={imgUrl === '' ? ICON_PROFILE : imgUrl} alt="profile_image" />
        </ImageWrapper>
        <TextWrapper>
          <TopWrapper>
            <InfoWrapper>
              <NameWrapper>{nickname}</NameWrapper>
              <TimeWrapper>{createdAt}</TimeWrapper>
            </InfoWrapper>
            <TopRightWrapper>
              <ButtonStyled color="pink" title={answerStatus} width="55px" height="22px"></ButtonStyled>
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
                              return console.log('삭제');
                            }
                          },
                        },
                      ]}
                    />
                  ) : null}
                </>
              )}
            </TopRightWrapper>
          </TopWrapper>
          <MiddleWrapper>{content}</MiddleWrapper>
          <BottomWrapper>
            <BottomLeftWrapper>
              <LikeWrapper>
                <img src={ICON_LIKE} alt="좋아요"></img>
                <LikeNumber>{likeCount}</LikeNumber>
              </LikeWrapper>
              <SubAnswerButton>답글쓰기</SubAnswerButton>
            </BottomLeftWrapper>
          </BottomWrapper>
        </TextWrapper>
      </AnswerWrapper>
      {/* <CommentForm onSubmit={function (comment: string): void {
          throw new Error('Function not implemented.');
        } }></CommentForm> */}
      {comments?.length !== 0 &&
        comments?.map((el: any) => {
          return <SubAnswer {...el} />;
        })}
    </>
  );
};

export default Answer;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 8px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 8px;
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

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2px;
  align-items: center;
`;

const LikeNumber = styled.div`
  font-weight: var(--font-weight700);
  font-size: var(--font-size12);
  color: var(--color-gray02);
`;

const SubAnswerButton = styled.div`
  font-weight: var(--font-weight700);
  font-size: var(--font-size12);
  color: var(--color-gray02);
`;

const BottomLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`;
