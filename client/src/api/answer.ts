import axios from 'axios';
import getCookie from '../utils/cookieUtils';
import { getUser } from '../utils/getUser';

export const answer = async (content: string, questionId: number) => {
  const memberId = getUser()?.memberId();
  const data = { memberId, questionId, content };
  const formData = new FormData();
  formData.append('answerPostDto', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  if (content.length === 0) return alert('댓글을 입력해주세요');
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/questions/${questionId}/answers`, formData, {
      headers: { Authorization: getCookie('accessToken') },
    });
    alert('작성완료!');
    window.location.href = `/seb42_main_026/questions/${questionId}`;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addComment = async (questionId: number, answerId: number, content: string) => {
  const memberId = getUser()?.memberId();
  const data = { memberId, content };

  if (content.length === 0) return alert('댓글을 입력해주세요');
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/questions/${questionId}/${answerId}`, data, {
      headers: { Authorization: getCookie('accessToken') },
    });
    alert('작성완료!');
    window.location.href = `/seb42_main_026/questions/${questionId}`;
  } catch (error) {
    console.error(error);
    return null;
  }
};
