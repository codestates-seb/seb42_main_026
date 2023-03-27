import styled from 'styled-components';
import Tags from '../components/Tags';
import BoardItem from '../container/naggingboard/BoardItem';
import axios from 'axios';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import NaggingSearchModal from '../components/NaggingSearchModal';
import ICON_SEARCH from '../assets/ic_search.svg';
import parseDateUtils from '../utils/paeseDateUtils';

interface ItemProps {
  title: string;
  createdAt: Date;
  likeCount: number;
  answerCount: number;
  nickname: string;
  tag?: string;
  questionId?: number;
  questionStatus: string;
}

export default function NaggingBoardPage() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [tag, setTag] = useState('');
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const page = useRef<number>(1);

  const lastElementRef = useRef<HTMLDivElement>(null);

  const naggingBoard = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/board/questions/?page=${
          page.current
        }&size=20${tag === '' || tag === '전체' ? '' : '&tag=' + tag}`
      );
      if (response.data.pageInfo.page === 1) {
        setList(response.data.data);
      } else {
        setList((prevList) => [...prevList, ...response.data.data]);
        // console.log(response.data.data);
      }
      setHasNextPage(
        response.data.pageInfo.page < response.data.pageInfo.totalPages
      );
      if (response.data.data.length) {
        page.current += 1;
      }
    } catch (error) {
      console.log(error);
    }
  }, [tag]);

  useEffect(() => {
    if (tag) {
      page.current = 1;
      naggingBoard();
    }
  }, [tag]);

  useEffect(() => {
    if (!lastElementRef.current || !hasNextPage) return;

    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        naggingBoard();
      }
    });

    io.observe(lastElementRef.current);

    return () => {
      io.disconnect();
    };
  }, [naggingBoard, hasNextPage]);

  const handleData = (data: ItemProps[]) => {
    setList(data);
  };

  return (
    <NaggingBoardWrapper>
      <NaggingSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onData={handleData}
      ></NaggingSearchModal>
      <TagSelector>
        <div className="tagContainer">
          <Tags
            title={'전체'}
            size="big"
            tagClickHandler={() => setTag('전체')}
            disabled={tag === '전체' || tag === ''}
          />
          <Tags
            title={'운동'}
            size="big"
            tagClickHandler={() => setTag('EXERCISE')}
            disabled={tag === 'EXERCISE'}
          />
          <Tags
            title={'공부'}
            size="big"
            tagClickHandler={() => setTag('STUDY')}
            disabled={tag === 'STUDY'}
          />
          <Tags
            title={'기상'}
            size="big"
            tagClickHandler={() => setTag('WAKE_UP')}
            disabled={tag === 'WAKE_UP'}
          />
          <Tags
            title={'기타'}
            size="big"
            tagClickHandler={() => setTag('ETC')}
            disabled={tag === 'ETC'}
          />
        </div>
        <div className="search" onClick={() => setIsModalOpen(true)}>
          <img src={ICON_SEARCH} alt="search icon" />
        </div>
      </TagSelector>
      {list.map(
        (
          {
            title,
            nickname,
            likeCount,
            createdAt,
            answerCount,
            tag,
            questionId,
            questionStatus,
          },
          index
        ) => (
          <Link to={`/questions/${questionId}`} key={index}>
            <BoardItem
              questionStatus={questionStatus}
              title={title}
              likeCount={likeCount}
              nickname={nickname}
              createdAt={parseDateUtils(createdAt)}
              answerCount={answerCount}
              tag={tag}
            ></BoardItem>
          </Link>
        )
      )}

      {<div ref={lastElementRef} />}
    </NaggingBoardWrapper>
  );
}

const NaggingBoardWrapper = styled.div`
  padding: 0 16px;
`;
const TagSelector = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-gray03);
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
