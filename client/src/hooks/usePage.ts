import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { setPage } from '../store/actions';

export function usePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getPageHandler = useSelector((state: RootState) => state.page.currentPage);

  const setPageHandler = (isLoggedIn: boolean, id: string, link: string, security: boolean) => {
    console.log(id);
    dispatch(isLoggedIn ? setPage(id) : setPage('login'));
    navigate(isLoggedIn ? link : security ? '/Login' : link); //추후 navigate 수정 page 이동시마다 login 검증 필요
  };

  return { setPageHandler, getPageHandler };
}
