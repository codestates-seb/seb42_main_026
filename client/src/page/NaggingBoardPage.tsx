import styled from 'styled-components';
import Tags from '../components/Tags';
import BoardItem from '../container/naggingboard/BoardItem';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function NaggingBoardPage() {
  const [list, setList] = useState([]);

  const [tag, setTag] = useState('');

  const parseDate = (props: Date) => {
    const now = new Date(props);
    const MM = Number(now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
    const dd = Number(now.getDate()) < 10 ? `0${now.getDate()}` : now.getDate();
    return `${MM}/${dd}`;
  };

  const naggingBoard = useCallback(
    async function () {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/board/questions/?page=1&size=20${tag === '' ? '' : '&tag=' + tag}`);
        console.log(response?.data);
        if (response?.data.data.length) {
          setList(response?.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [tag]
  );

  useEffect(() => {
    console.log(list);
    naggingBoard();
  }, [tag, naggingBoard]);

  return (
    <NaggingBoardWrapper>
      <TagSelector>
        <Tags title={'운동'} size="big" tagClickHandler={() => setTag('EXERCISE')} />
        <Tags title={'공부'} size="big" tagClickHandler={() => setTag('STUDY')} />
        <Tags title={'기상'} size="big" tagClickHandler={() => setTag('WAKE_UP')} />
        <Tags title={'기타'} size="big" tagClickHandler={() => setTag('ETC')} />
      </TagSelector>
      {list.map(({ title, nickname, likeCount, createdAt, answerCount, tag, questionId }, index) => (
        <Link to={`/questions/${questionId}`}>
          <BoardItem key={index} title={title} likeCount={likeCount} nickname={nickname} createdAt={parseDate(createdAt)} answerCount={answerCount} tag={tag} />
        </Link>
      ))}
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
