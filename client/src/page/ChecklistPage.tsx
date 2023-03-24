import { useState } from 'react';
import styled from 'styled-components';
import { checklistdata } from '../container/checklist/checklistdata';

interface disProps {
  disabled?: boolean;
}
const Checklist = () => {
  const { tasks, livingcosts } = checklistdata();
  const [taskList, setTaskList] = useState(tasks);
  const [homeTipBtn, setHomeTipBtn] = useState<boolean>(true);
  const [livingTipBtn, setLivingTipBtn] = useState<boolean>(false);
  const handleToggleComplete = (id: number) => {
    setTaskList((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <ChecklistWrapper>
      <TitleWrapper>
        {homeTipBtn ? (
          <>
            <button
              disabled
              className="titleClicked"
              onClick={() => {
                setTaskList(tasks);
              }}
            >
              집 구하기 전 꿀팁!
            </button>
            <button
              className="titleClicked title"
              onClick={() => {
                setTaskList(livingcosts);
                setHomeTipBtn(!homeTipBtn);
              }}
            >
              생활비 관리 꿀팁!
            </button>
          </>
        ) : (
          <>
            <button
              className="titleClicked title"
              onClick={() => {
                setTaskList(tasks);
                setHomeTipBtn(!homeTipBtn);
              }}
            >
              집 구하기 전 꿀팁!
            </button>
            <button
              disabled
              className="titleClicked"
              onClick={() => {
                setTaskList(livingcosts);
              }}
            >
              생활비 관리 꿀팁!
            </button>
          </>
        )}
      </TitleWrapper>
      <ul>
        {taskList.map((task, index) => (
          <li key={task.id}>
            <div className="listWrapper">
              <input type="checkbox" id={`c${index}`} checked={task.completed} onChange={() => handleToggleComplete(task.id)} />
              <label htmlFor={`c${index}`}>
                <span></span>
              </label>
              <div>{task.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </ChecklistWrapper>
  );
};

export default Checklist;

const ChecklistWrapper = styled.div`
  padding: 12px 16px;
  button {
    border: none;
    background: none;
    cursor: pointer;
  }
  ul {
    display: block;
    border: solid 0.5px #ffb9c4;
    padding: 20px 10px;
    gap: 20px;
  }
  li {
    display: block;
    box-sizing: border-box;
    padding: 14px 10px 12px 10px;
    border: none;
    height: min-content;
    width: 100%;
    border-bottom: solid 0.5px var(--color-gray03);
    font-size: var(--font-size14);
    .listWrapper {
      display: flex;
      flex-direction: row;

      div {
        position: relative;
        top: -3px;
        left: 10px;
        width: 100%;
      }
    }
  }
  li:last-child {
    border: none;
  }
  input[type='checkbox'] {
    display: none;
    margin: 0;
  }
  input[type='checkbox'] + label span {
    display: inline-block;
    width: 19px;
    height: 19px;
    vertical-align: middle;
    background: url(https://main26-resource-bucket.s3.ap-northeast-2.amazonaws.com/check_radio_sheet.png) left top no-repeat;
    cursor: pointer;
  }
  label {
    display: flex;
    position: relative;
    width: min-content;
    height: 100%;
  }
  input[type='checkbox']:checked + label span {
    background: url(https://main26-resource-bucket.s3.ap-northeast-2.amazonaws.com/check_radio_sheet.png) -19px top no-repeat;
  }
`;
const TitleWrapper = styled.div<disProps>`
  display: flex;
  flex-direction: row;
  gap: 3px;
  .titleClicked {
    display: flex;
    align-items: center;
    width: max-content;
    padding: 16px 14px;
    height: 22px;
    font-size: var(--font-size14);
    color: var(--color-white01);
    background-color: #ff607c;
    border: none;
    border-radius: 5px 5px 0 0;
  }
  .title {
    background-color: #ffb9c4;
  }
`;
