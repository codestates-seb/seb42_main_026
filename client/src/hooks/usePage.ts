import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setEditor, setPostDetail } from '../store/actions';
import getCookie from '../utils/cookieUtils';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { getUser } from '../utils/getUser';
import imageCompression from 'browser-image-compression';



export function usePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEditorHandler = useSelector((state: RootState) => state.page);
  const getPostDetailHandler = useSelector((state: RootState) => state.post);

  const setPostDetailHandler = (memberId: number, questionId: number) => dispatch(setPostDetail(memberId, questionId));
  const setEditorHandler = (title: string, content: string, tag: string, imgFile: File) => dispatch(setEditor(title, content, tag, imgFile));

  const actionImgCompress = async (imgFile: any) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      return await imageCompression(imgFile, options);
    } catch (error) {
      console.log(error);
    }
  };


  const pushPostHandler = async () => {
    const { title, content, tag, imgFile } = getEditorHandler;
    const data = { title, content, tag };
    const formData = new FormData();
    formData.append('questionPostDto', new Blob([JSON.stringify(data)], { type: 'application/json' }));
    if (imgFile !== undefined){
      const compressedImage = await actionImgCompress(imgFile) as string | Blob
      formData.append('questionImage', compressedImage);
    } 
    const memberId = getUser()?.memberId();
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/questions/${memberId}`, formData, {
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
