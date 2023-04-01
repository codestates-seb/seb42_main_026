import { useEffect } from 'react';
import styled from 'styled-components';
import RankItem from '../container/rank/RankItem';
import { useApi } from '../hooks/useApi';

interface dataProps {
  data: {
    profileImageUrl: string;
    nickname: string;
    score: number;
    modifiedAt: string;
  }[];
}

const RankPage = () => {
  const { data, error, makeApiRequest } = useApi<dataProps>('get', 'home/rank');

  useEffect(() => {
    makeApiRequest();
  }, []);

  const sortedData = data?.data.sort((a, b) => b.score - a.score);
  return (
    <RankingWrapper>
      {sortedData?.map(({ profileImageUrl, nickname, score }: { profileImageUrl: string; nickname: string; score: number }, index: number) => (
        <RankItem key={index} index={index + 1} imgUrl={profileImageUrl === null ? '' : profileImageUrl} nickName={nickname} subText={`${score}`} />
      ))}
      {data && <RankingDescription>시즌1 2023-03-29 ~</RankingDescription>}
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

const RankingDescription = styled.span`
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  width: 100%;
  text-align: center;
  font-size: var(--font-size14);
  color: var(--color-gray02);
  letter-spacing: var(--font-spacing-title);
`;
