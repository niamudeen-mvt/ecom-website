import React from "react";
import { Container } from "react-bootstrap";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Loader from "../../components/loader";

const User = () => {
  const { currentUser } = useLocalStorage();

  return (
    <>
      {Object.keys(currentUser).length !== 0 ? (
        <section className="common_section">
          <Container>
            <form>
              <div className="mb-3">
                <label className="mb-3">Username</label>
                <br />
                <input
                  type="text"
                  autoComplete="off"
                  className="px-2 py-3 rounded border-1"
                  disabled
                  value={currentUser?.username}
                />
              </div>
              <div className="mb-3">
                <label className="mb-3">Email</label>
                <br />
                <input
                  type="text"
                  autoComplete="off"
                  className="px-2 py-3 rounded border-1"
                  disabled
                  value={currentUser?.email}
                />
              </div>
              <div className="mb-3">
                <label className="mb-3">Phone</label>
                <br />
                <input
                  type="text"
                  autoComplete="off"
                  className="px-2 py-3 rounded border-1"
                  disabled
                  value={currentUser?.phone}
                />
              </div>
            </form>
          </Container>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default User;
