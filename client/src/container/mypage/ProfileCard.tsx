import { Link } from "react-router-dom";
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
        <Link to="/UserEdit">수정</Link>
      </EditWrapper>
    </ProfileCardWrapper>
  );
};

export default ProfileCard;

const ProfileCardWrapper = styled.div`
  padding: 0 0 0 20px;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color-gray03);
  border-radius: 5px;
`;

const EditWrapper = styled.div`
  position: relative;
  right: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    color: #ff607c;
    font-weight: 500;
    text-align: center;
    font-size: var(--font-size14);
    letter-spacing: var(--font-spacing-title);
    color: var(--color-mobMain);
  }
`;
