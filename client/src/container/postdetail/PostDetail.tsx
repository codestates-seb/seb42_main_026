import StatusChips from '../../components/StatusChips ';
import Tags from '../../components/Tags';
import styled from 'styled-components';
import ImageBox from '../../components/ImageBox';

type PostDetailProps = {
  content: string;
  createdAt: Date;
  nickname: string;
  tag: string;
  title: string;
  profileImageUrl: string;
};

const PostDetail = ({ content, createdAt, nickname, tag, title, profileImageUrl }: PostDetailProps) => {
  const parseDate = (props: Date) => {
    const now = new Date(props);
    const MM = Number(now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const dd = Number(now.getDate()) < 10 ? `0${now.getDate()}` : now.getDate();
    return `${MM}/${dd}`;
  };

  return (
    <PostDetailWrapper>
      <TagWrapper>
        <StatusChips />
        <Tags title={tag} />
      </TagWrapper>
      <UserInfoWrapper>
        <ImageBox imgUrl={profileImageUrl} mainText={nickname} subText={parseDate(createdAt)} lang="KR"></ImageBox>
      </UserInfoWrapper>
      <ContentsWrapper>
        <TitleWrapper>{title}</TitleWrapper>
        <PostWrapper>{content}</PostWrapper>
      </ContentsWrapper>
    </PostDetailWrapper>
  );
};

export default PostDetail;

const PostDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  padding: 0 16px 53px 16px;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* gap: 0.25rem; */
  font-weight: var(--font-weight700);
  letter-spacing: var(--font-spacing-title);
`;

const PostWrapper = styled.div`
  /* text-align: left;
  vertical-align: top; */
  font-family: Noto Sans;
  letter-spacing: var(--font-spacing-title);
  line-height: 26.4px;
`;
