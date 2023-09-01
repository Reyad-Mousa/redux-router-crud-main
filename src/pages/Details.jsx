import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";

const Details = () => {
  const { loading, error, record } = usePostDetails();

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
