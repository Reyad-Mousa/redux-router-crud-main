import React from "react";

const Loading = ({ loading, error, children }) => {
  return (
    <>
      {loading ? <p>Loading...</p> : error ? <p>Error in server</p> : children}
    </>
  );
};

export default Loading;
