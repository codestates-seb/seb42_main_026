import React, { useState } from 'react';
import styled from 'styled-components';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

const tasks: Task[] = [
  { id: 1, description: '이사하는 집 대장의 사본 확인', completed: false },
  {
    id: 2,
    description: '이사 전 집의 모든 구석을 사진으로 찍어 (이사가 끝날 때 책임 이전을 방지하기 위해)',
    completed: false,
  },
  { id: 3, description: '이사 신고', completed: false },
  {
    id: 4,
    description: '전기, 가스, 수도 청구서 등의 주소 변경',
    completed: false,
  },
  {
    id: 5,
    description: '배달 쇼핑몰 (ex. 배달의 민족, 네이버 페이, 요기요, 쿠팡, 티머니 택시)의 주소 변경',
    completed: false,
  },
  {
    id: 6,
    description: '계약 전 하자 점검: 수압, 일조량, 낮에 방문, 곤충 여부 확인, 기본 옵션 확인',
    completed: false,
  },
  { id: 7, description: '월세 자동 이체 설정 (해당하는 경우)', completed: false },
  {
    id: 8,
    description: '성범죄자 알림 확인 및 문의',
    completed: false,
  },
  { id: 9, description: '비상약 및 비축 용품 구매', completed: false },
];

const Checklist = () => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const handleToggleComplete = (id: number) => {
    setTaskList((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <ChecklistWrapper>
      <h2>이사 전 체크리스트</h2>
      <ul>
        {taskList.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task.id)} />
              {task.description}
            </label>
          </li>
        ))}
      </ul>
    </ChecklistWrapper>
  );
};

export default Checklist;

const ChecklistWrapper = styled.div`
  h2 {
    font-size: var(--font-size18);
    color: var(--color-mobMain);
    margin-bottom: 20px;
  }
  li {
    padding: 8px;
  }
  label {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-start;
    gap: 4px;
  }
  input {
    position: relative;
    top: 3px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  input:checked {
    background-color: pink;
  }
  padding: 20px 16px;
`;
