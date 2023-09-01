import { Table } from "react-bootstrap";
import PostListItem from "./PostListItem";
import Loading from "./Loading";
import { memo } from "react";
const PostList = ({ data, loading, error, deleteRecord }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "70%" }}>Title</th>
          <th style={{ width: "10%" }}></th>
        </tr>
      </thead>
      <tbody>
        <Loading loading={loading} error={error}>
          <PostListItem data={data} deleteRecord={deleteRecord} />
        </Loading>
      </tbody>
    </Table>
  );
};

export default memo(PostList);
