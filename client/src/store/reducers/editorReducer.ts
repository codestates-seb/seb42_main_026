import { EDITOR_STATE } from '../constants';

export interface editorPage {
  title: string;
  content: string;
  tag: string;
  imgFile: File[];
  imgSrc?: string;
}

const initialState: editorPage = {
  title: '',
  content: '',
  tag: 'ETC',
  imgFile: [],
  imgSrc: '',
};

const pageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case EDITOR_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default pageReducer;
