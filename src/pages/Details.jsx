import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearPosts } from "../store/postSlice";

const Details = () => {
  const dispatch = useDispatch();

  const { loading, error, record } = usePostDetails();
  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: "post/cleanCode" });
  //   };
  // }, [dispatch]); or >>>>>
  useEffect(() => {
    dispatch(clearPosts());
  }, [dispatch]);

  return (
    <div>
      <Loading loading={loading} error={error}>
        <h1>Details</h1>
        <h6>ID : {record?.id}</h6>
        <p>Title : {record?.title}</p>
        <p>Description : {record?.description}</p>
      </Loading>
    </div>
  );
};

export default Details;
// >>> ? <<< يضافة لان العنصر ريكورد لم ينشىء
