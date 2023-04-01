import styled from 'styled-components';
import Tags from '../components/Tags';
import BoardItem from '../container/naggingboard/BoardItem';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import NaggingSearchModal from '../components/NaggingSearchModal';
import ICON_SEARCH from '../assets/ic_search.svg';
import parseDateUtils from '../utils/paeseDateUtils';
import { useApi } from '../hooks/useApi';

interface Question {
  questionId: number;
  title: string;
  nickname: string;
  likeCount: number;
  answerCount: number;
  tag: string;
  questionStatus: string;
  createdAt: string;
}

interface BoardResponse {
  data: Question[];
  pageInfo: {
    page: number;
    totalPages: number;
  };
}

interface ItemProps {
  questionId: number;
  title: string;
  nickname: string;
  likeCount: number;
  answerCount: number;
  tag: string;
  questionStatus: string;
  createdAt: Date;
}

export default function NaggingBoardPage() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [tag, setTag] = useState('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);

  let { data, error, makeApiRequest } = useApi<BoardResponse>('get', `board/questions/?page=${page}&size=20${tag === '' || tag === '전체' ? '' : '&tag=' + tag}`);

  useEffect(() => {
    if (data) {
      const { data: questions, pageInfo } = data;
      const convertedQuestions = questions.map(({ questionId, title, nickname, likeCount, answerCount, tag, questionStatus, createdAt }) => ({
        questionId,
        title,
        nickname,
        likeCount,
        answerCount,
        tag,
        questionStatus,
        createdAt: new Date(createdAt),
      })) as ItemProps[];
      if (pageInfo.page === 1) {
        setList(convertedQuestions);
      } else {
        setList((prevList) => [...prevList, ...convertedQuestions]);
      }
      setHasNextPage(pageInfo.page < pageInfo.totalPages);
    }
  }, [data]);

  useEffect(() => {
    if (!lastElementRef.current || !hasNextPage) return;

    ioRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (hasNextPage) {
          setPage((page) => page + 1);
          makeApiRequest();
        }
      }
    });

    ioRef.current.observe(lastElementRef.current);

    return () => {
      if (ioRef.current) {
        ioRef.current.disconnect();
        ioRef.current = null;
      }
    };
  }, [lastElementRef, hasNextPage]);

  useEffect(() => {
    if (page !== 1) {
      makeApiRequest();
    }
  }, [page]);

  const handleData = (data: ItemProps[]) => {
    setList(data);
  };

  useEffect(() => {
    setList([]);
    makeApiRequest();
  }, [tag]);

  const handleTag = (tag: string) => {
    setTag(tag);
    setPage(1);
  };

  return (
    <NaggingBoardWrapper>
      <NaggingSearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onData={handleData}></NaggingSearchModal>
      <TagSelector>
        <div className="tagContainer">
          <Tags title={'전체'} size="big" tagClickHandler={() => handleTag('전체')} disabled={tag === '전체' || tag === ''} />
          <Tags title={'운동'} size="big" tagClickHandler={() => handleTag('EXERCISE')} disabled={tag === 'EXERCISE'} />
          <Tags title={'공부'} size="big" tagClickHandler={() => handleTag('STUDY')} disabled={tag === 'STUDY'} />
          <Tags title={'기상'} size="big" tagClickHandler={() => handleTag('WAKE_UP')} disabled={tag === 'WAKE_UP'} />
          <Tags title={'기타'} size="big" tagClickHandler={() => handleTag('ETC')} disabled={tag === 'ETC'} />
        </div>
        <div className="search" onClick={() => setIsModalOpen(true)}>
          <img src={ICON_SEARCH} alt="search icon" />
        </div>
      </TagSelector>
      {list.map(({ title, nickname, likeCount, createdAt, answerCount, tag, questionId, questionStatus }, index) => (
        <Link to={`/questions/${questionId}`} key={index}>
          <BoardItem questionStatus={questionStatus} title={title} likeCount={likeCount} nickname={nickname} createdAt={parseDateUtils(createdAt)} answerCount={answerCount} tag={tag}></BoardItem>
        </Link>
      ))}

      {hasNextPage && <div ref={lastElementRef} />}
      {!hasNextPage && <LastPost>마지막 게시글 입니다.</LastPost>}
    </NaggingBoardWrapper>
  );
}

const NaggingBoardWrapper = styled.div`
  padding: 0 16px;
`;

const LastPost = styled.span`
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
  width: 100%;
  text-align: center;
  font-size: var(--font-size14);
  color: var(--color-gray02);
  letter-spacing: var(--font-spacing-title);
`;

const TagSelector = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;

  .tagContainer {
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
`;
