import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { setPage } from "../store/actions";

export function usePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPages = useSelector((state: RootState) => state.page.currentPage);

  const setPageHandler = () => {
    dispatch(setPage("home"));
    navigate("/");
  };

  return { setPageHandler, isPages };
}
