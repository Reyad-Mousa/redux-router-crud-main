import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
            <button
              onClick={() => {
                navigate("/", { replace: true });
              }}
            >Back</button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
