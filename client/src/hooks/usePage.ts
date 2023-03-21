import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setEditor, setPostDetail } from '../store/actions';
import getCookie from '../utils/cookieUtils';
import axios from 'axios';
import { useNavigate } from 'react-router';

export function usePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEditorHandler = useSelector((state: RootState) => state.page);
  const getPostDetailHandler = useSelector((state: RootState) => state.post);

  const setPostDetailHandler = (memberId: number, questionId: number) => dispatch(setPostDetail(memberId, questionId));
  const setEditorHandler = (title: string, content: string, tag: string) => dispatch(setEditor(title, content, tag));

  const pushPostHandler = async () => {
    const { title, content, tag } = getEditorHandler;
    const data = { title, content, tag };
    const formData = new FormData();
    formData.append('questionPostDto', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    console.log(localStorage.getItem('memberId'))
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/questions/${localStorage.getItem('memberId')}`, formData, {
        headers: { Authorization: getCookie('accessToken') },
      });
      alert('작성완료!');
      return navigate('/naggingboard');
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { getEditorHandler, setEditorHandler, pushPostHandler, getPostDetailHandler, setPostDetailHandler };
}
