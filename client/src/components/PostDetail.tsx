import StatusChips from "./StatusChips ";
import Tags from "./Tags";
import styled from "styled-components";
import ImageBox from "./ImageBox";

const PostDetail = () => {
  return (
    <PostDetailWrapper>
      <TagWrapper>
        <StatusChips />
        <Tags title="운동" />
      </TagWrapper>
      <UserInfoWrapper>
        <ImageBox
          imgUrl=""
          mainText="코드 두 줄 치는 사람"
          subText="03/07"
          lang="KR"
        ></ImageBox>
      </UserInfoWrapper>
      <ContentsWrapper>
        <TitleWrapper>잔소리 오지게 해줄 사람</TitleWrapper>
        <PostWrapper>
          혹시 내가 너무 게을러서 그러는데 잔소리해줄사람 ..나 진짜 미라클
          모닝하고싶어 ㅜㅜ답없는 내 인생좀 갱생시켜주실분
        </PostWrapper>
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
  padding: 0 0 53px 0;
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
