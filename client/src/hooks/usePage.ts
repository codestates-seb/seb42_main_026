import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setEditor } from '../store/actions';
import getCookie from '../utils/cookieUtils';
import axios from 'axios';

export function usePage() {
  const dispatch = useDispatch();
  const getEditorHandler = useSelector((state: RootState) => state.page);

  const setEditorHandler = (title: string, content: string, tag: string) => {
    dispatch(setEditor(title, content, tag));
  };

  const pushPostHandler = async () => {
    const data = {
      title: getEditorHandler.title,
      content: getEditorHandler.content,
      tag: getEditorHandler.tag,
    };

    let formData = new FormData();
    formData.append('questionPostDto', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/questions/${localStorage.getItem('memberId')}`, formData, {
        headers: {
          Authorization: getCookie('accessToken'),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { getEditorHandler, setEditorHandler, pushPostHandler };
}
