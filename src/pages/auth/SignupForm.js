import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { checkIfobjEmpty, validateForm } from "../../utils/helper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import { registerUser } from "../../services/api/user";

const SignupForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
      let res = await registerUser(user);

      if (res?.status === 201) {
        sendNotification("success", res?.data?.message);
        navigate("/login");
      } else {
        sendNotification("warning", res?.response?.data?.message);
      }
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formErrors = validateForm(user);
  //   setErrors(formErrors);

  //   let updatedUserList = [];
  //   let existUser = false;

  //   let dataList = userList ? userList : [];
  //   updatedUserList = [
  //     ...dataList,
  //     {
  //       ...user,
  //       id: new Date().getTime(),
  //     },
  //   ];

  //   let noErrors = checkIfobjEmpty(formErrors);

  //   if (existUser) {
  //     console.log("1111111");
  //     sendNotification("warning", "User Already Existed");
  //   } else if (noErrors) {
  //     localStorage.setItem("users", JSON.stringify(updatedUserList));
  //     console.log("222222");
  //     sendNotification("success", "User Created Successfully");
  //     navigate("/login");
  //   }
  // };

  return (
    <section className="common_section">
      <Container>
        <div className="flexCenter">
          <form className=" p-5 soft_theme">
            <h1 className="mb-4 text-center">Signup Form</h1>
            <div className="mb-3">
              <input
                type="text"
                autoComplete="off"
                className="px-2"
                value={user.username}
                name="username"
                onChange={handleChange}
                placeholder="Username ........."
              />
            </div>
            <p className="text-danger">
              {errors?.username ? errors.username : ""}
            </p>
            <div className="mb-3">
              <input
                type="text"
                autoComplete="off"
                className="px-2"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder=" Email .........."
              />
            </div>
            <p className="text-danger">{errors?.email ? errors.email : ""}</p>
            <div className="mb-3">
              <input
                type="text"
                autoComplete="off"
                className="px-2"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder=" Mobile Number .........."
              />
            </div>
            <p className="text-danger">{errors?.phone ? errors.phone : ""}</p>

            <div className="mb-3">
              <input
                type="password"
                autoComplete="off"
                className="px-2"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder=" Password .........."
              />
            </div>
            <p className="text-danger">
              {errors?.password ? errors.password : ""}
            </p>
            <button className="btn btn-dark w-100 mb-3" onClick={handleSubmit}>
              SUBMIT
            </button>
            <Link to="/login">
              <button className="btn btn-outline-dark w-100">LOGIN</button>
            </Link>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default SignupForm;
