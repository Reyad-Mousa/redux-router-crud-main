import React from "react";

const Loading = ({ loading, error, children }) => {
  return (
    <>
      {loading ? (
        <p>
          Loading...
        </p>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
