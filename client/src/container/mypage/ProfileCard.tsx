import styled from "styled-components";
import ImageBox from "../../components/ImageBox";

const ProfileCard = () => {
  return (
    <ProfileCardWrapper>
      <ImageBox
        imgUrl=""
        mainText="abc@gmain.com"
        subText="별명"
        lang="EN"
      ></ImageBox>
      <EditWrapper>
        <EditButton>수정</EditButton>
      </EditWrapper>
    </ProfileCardWrapper>
  );
};

export default ProfileCard;

const ProfileCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: solid var(--color-gray03);
  border-radius: 5px;
  width: calc(100% -40px);
  padding: 20px;
`;

const EditWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  /* padding-right: 24px; */
  align-items: center;
  padding-right: 20px;
`;

const EditButton = styled.div`
  width: 38px;
  text-align: center;
  font-size: var(--font-size14);
  letter-spacing: var(--font-spacing-title);
  color: var(--color-mobMain);
`;
