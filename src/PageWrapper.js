import React from "react";
import { Container } from "react-bootstrap";
import bgImage from "./bg.jpg";

export default function PageWrapper({ children }) {
  return (
    <div style={{ background: `url(${bgImage})` }}>
      <Container
        className="d-flex flex-column"
        style={{
          minHeight: "100vh",
        }}
      >
        {children}
      </Container>
    </div>
  );
}
