import Spinner from "react-bootstrap/Spinner";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader_container flexGrid">
      <div className="flexCenter" style={{ flexDirection: "column" }}>
        <Spinner animation="border" role="status" className="mb-3"></Spinner>
        <span className="">Loading........</span>
      </div>
    </div>
  );
};

export default Loader;
