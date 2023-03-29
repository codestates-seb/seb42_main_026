import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setEditor, setPostDetail } from '../store/actions';
import getCookie from '../utils/cookieUtils';
import axios from 'axios';
import { useNavigate } from 'react-router';
import imageCompression from 'browser-image-compression';

export function usePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEditorHandler = useSelector((state: RootState) => state.page);
  const getPostDetailHandler = useSelector((state: RootState) => state.post);

  const setPostDetailHandler = (memberId: number, questionId: number) => dispatch(setPostDetail(memberId, questionId));
  const setEditorHandler = (title: string, content: string, tag: string, imgFile: File, imgSrc?: string) => dispatch(setEditor(title, content, tag, imgFile, imgSrc));

  const actionImgCompress = async (imgFile: File) => {
    console.log('압축되고잇슴');
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
    if (imgFile !== undefined) {
      if (imgFile.type === 'image/gif') {
        formData.append('questionImage', imgFile);
      } else {
        const compressedImage = (await actionImgCompress(imgFile)) as string | Blob;
        formData.append('questionImage', compressedImage);
      }
    }
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/questions`, formData, {
        headers: { Authorization: getCookie('accessToken') },
      });
      alert('작성완료!');
      return navigate('/naggingboard');
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const patchPostHandler = async ({ id }: { id: number }) => {
    const { title, content, tag, imgFile } = getEditorHandler;
    const data = { title, content, tag };
    const formData = new FormData();
    if (imgFile !== undefined) {
      if (imgFile.type === 'image/gif') {
        formData.append('questionImage', imgFile);
      } else {
        const compressedImage = (await actionImgCompress(imgFile)) as string | Blob;
        formData.append('questionImage', compressedImage);
      }
    }

    if (imgFile !== undefined) {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/questions/${id}/questionImage`, formData, {
        headers: { Authorization: getCookie('accessToken') },
      });
    }

    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/questions/${id}`, data, {
        headers: { Authorization: getCookie('accessToken') },
      });
      alert('수정완료!');
      return navigate(`/questions/${id}`);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return { getEditorHandler, setEditorHandler, pushPostHandler, getPostDetailHandler, setPostDetailHandler, patchPostHandler };
}
