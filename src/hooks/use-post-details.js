import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPost } from "../state/postSlice";
import { useParams } from "react-router-dom";

const usePostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, error, record } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);
  return { loading, error, record };
};

export default usePostDetails;
