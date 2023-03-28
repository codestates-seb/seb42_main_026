import axios from 'axios';
import useFFmpeg from '../hooks/useFFmeng';
import getCookie from '../utils/cookieUtils';

export const answer = async (content: string, questionId: number, audio?: Blob) => {
  const data = { questionId, content };
  const formData = new FormData();
  formData.append('answerPostDto', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  if (audio !== undefined) {
    // formData.append('voiceFile', new File([audio], 'recording.webm', { type: 'audio/webm' }));
    formData.append('voiceFile', audio);
  }
  if (content.length === 0) return alert('댓글을 입력해주세요');
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/questions/${questionId}/answers`, formData, {
      headers: { Authorization: getCookie('accessToken') },
    });
    alert('작성완료!');
    window.location.replace(`/questions/${questionId}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const addComment = async (questionId: number, answerId: number, content: string) => {
  const data = { content };

  if (content.length === 0) return alert('댓글을 입력해주세요');
  try {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/questions/${questionId}/answers/${answerId}`, data, {
      headers: { Authorization: getCookie('accessToken') },
    });
    alert('작성완료!');
    window.location.replace(`/questions/${questionId}`);
  } catch (error) {
    console.error(error);
    return null;
  }
};
