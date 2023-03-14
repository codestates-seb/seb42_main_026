import styled from "styled-components";
import RankItem from "../container/rank/RankItem";

const RankPage = () => {
  const dummyData = [
    // 동점이면 날짜순으로 하는 코드 작성해야함 백엔드와 상의
    { url: "", nickName: "황금올리브닭다리", score: 220 },
    { url: "", nickName: "고양킹", score: 100 },
    { url: "", nickName: "강아지는귀여워", score: 660 },
    { url: "", nickName: "자르반 4세", score: 603 },
    { url: "", nickName: "피그마로 밥먹는 사람", score: 610 },
    { url: "", nickName: "백엔드의 황제", score: 500 },
    { url: "", nickName: "당신누구요", score: 620 },
    { url: "", nickName: "연진아너X됐어", score: 699 },
    { url: "", nickName: "리액트가뭔가요", score: 601 },
    { url: "", nickName: "코드로 밥먹기", score: 654 },
  ];

  const sortedData = dummyData.sort((a: any, b: any) => b.score - a.score); //score 기준으로 내림차순 정렬

  return (
    <RankingWrapper>
      {sortedData.map(({ url, nickName, score }, index) => (
        <RankItem key={index} index={index + 1} url={url} nickName={nickName} subText={`${score}`} />
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
