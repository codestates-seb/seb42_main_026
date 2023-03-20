import styled from "styled-components";
import Tags from "../components/Tags";
import BoardItem from "../container/naggingboard/BoardItem";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import NaggingSearchModal from "../components/NaggingSearchModal";

interface ItemProps {
  title: string;
  createdAt: Date;
  likeCount: number;
  answerCount: number;
  nickname: string;
  tag?: string;
  questionId?: number;
}

export default function NaggingBoardPage() {
  const [list, setList] = useState<ItemProps[]>([]);
  const [tag, setTag] = useState("");
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const page = useRef<number>(1);

  const lastElementRef = useRef<HTMLDivElement>(null);

  const parseDate = (props: Date) => {
    const now = new Date(props);
    const MM =
      Number(now.getMonth() + 1) < 10
        ? `0${now.getMonth() + 1}`
        : now.getMonth() + 1;
    const dd = Number(now.getDate()) < 10 ? `0${now.getDate()}` : now.getDate();
    return `${MM}/${dd}`;
  };

  const naggingBoard = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/board/questions/?page=${
          page.current
        }&size=20${tag === "" || tag === "전체" ? "" : "&tag=" + tag}`
      );
      if (response.data.pageInfo.page === 1) {
        setList(response.data.data);
      } else {
        setList((prevList) => [...prevList, ...response.data.data]);
        console.log(response.data.data);
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
      <button onClick={() => setIsModalOpen(true)}>search</button>
      <NaggingSearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onData={handleData}></NaggingSearchModal>
      <TagSelector>
        <Tags
          title={"전체"}
          size="big"
          tagClickHandler={() => setTag("전체")}
          disabled={tag === "전체" || tag === ""}
        />
        <Tags
          title={"운동"}
          size="big"
          tagClickHandler={() => setTag("EXERCISE")}
          disabled={tag === "EXERCISE"}
        />
        <Tags
          title={"공부"}
          size="big"
          tagClickHandler={() => setTag("STUDY")}
          disabled={tag === "STUDY"}
        />
        <Tags
          title={"기상"}
          size="big"
          tagClickHandler={() => setTag("WAKE_UP")}
          disabled={tag === "WAKE_UP"}
        />
        <Tags
          title={"기타"}
          size="big"
          tagClickHandler={() => setTag("ETC")}
          disabled={tag === "ETC"}
        />
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
          },
          index
        ) => (
          <Link to={`/questions/${questionId}`} key={index}>
            <BoardItem
              title={title}
              likeCount={likeCount}
              nickname={nickname}
              createdAt={parseDate(createdAt)}
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
  gap: 6px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-gray03);
`;
