import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { checkIfobjEmpty, validateForm } from "../../utils/helper";
import { sendNotification } from "../../utils/notifications";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { loginUser } from "../../services/api/user";

const LoginForm = () => {
  const navigate = useNavigate();
  const { userList } = useLocalStorage();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors(validateForm(user));
    }
  }, [user]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(user);
    setErrors(formErrors);

    let noErrors = checkIfobjEmpty(formErrors);

    if (noErrors) {
      let res = await loginUser(user);
      if (res?.status === 200) {
        localStorage.setItem("userId", res?.data?.userId);
        sendNotification("success", res?.data?.message);
        navigate("/");
      } else {
        sendNotification("warning", res?.response?.data?.message);
      }
    }
  };

  return (
    <section className="common_section">
      <Container>
        <div className=" flexCenter">
          <form className="p-5 soft_theme">
            <h1 className="mb-4 text-center">Login Form</h1>
            <div className="mb-3">
              <input
                type="text"
                className="px-2"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder=" Email .........."
                autoComplete="off"
              />
            </div>
            <p className="text-danger">{errors?.email ? errors.email : ""}</p>

            <div className="mb-3">
              <input
                type="password"
                className="px-2"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder=" Password .........."
                autoComplete="off"
              />
            </div>
            <p className="text-danger">
              {errors?.password ? errors.password : ""}
            </p>
            <button className="btn btn-dark w-100 mb-3" onClick={handleSubmit}>
              SUBMIT
            </button>
            <Link to="/signup">
              <button className="btn btn-outline-dark w-100">SIGNUP</button>
            </Link>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default LoginForm;
