import React from "react";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const User = () => {
  const { currentUser } = useLocalStorage();
  return (
    <section className="common_section">
      <Container>
        {currentUser === undefined ? (
          <div>No User Found</div>
        ) : (
          <div className="user_details">
            <h1>Name: {currentUser?.username}</h1>
            <h1>Email: {currentUser?.email}</h1>
            <h1>Phone: {currentUser?.phone}</h1>
          </div>
        )}
      </Container>
    </section>
  );
};

export default User;
