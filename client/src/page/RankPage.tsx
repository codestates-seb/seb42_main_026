import styled from "styled-components";
import RankItem from "../container/rank/RankItem";
import useGetReq from "../hooks/useGetReq";

interface dataProps {
  createdAt: string;
  nickname: string;
  score: number;
  modifiedAt: string;
}

const RankPage = () => {
  const data: dataProps[] = useGetReq("/home/rank");
  const sortedData = data.sort((a: any, b: any) => b.score - a.score); //score 기준으로 내림차순 정렬
  return (
    <RankingWrapper>
      {sortedData.map(({ createdAt, nickname, score }: dataProps, index: number) => (
        <RankItem key={index} index={index + 1} url={createdAt} nickName={nickname} subText={`${score}`} />
      ))}
    </RankingWrapper>
  );
};

export default RankPage;

const RankingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  user-select: none;
  padding: 0 16px;
`;
