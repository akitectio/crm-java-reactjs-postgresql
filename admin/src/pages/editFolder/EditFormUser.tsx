import {
  changePassword,
  getUserById,
  updateUser,
} from "@app/services/usersService";
import { Button } from "@app/styles/common";
import {
  faCheckCircle,
  faLock,
  faSignOutAlt,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AvatarEditor from "./AvatarUploader";
import "./editCss.css";

const EditForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reTypePassword, setReTypePassword] = useState("");

  const [errs, setErrs] = useState({
    oldPassword: "",
    newPassword: "",
    reTypePassword: "",
  });

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errs };

    if (oldPassword) {
      errorsCopy.oldPassword = "";
    } else {
      errorsCopy.oldPassword = "Current Password is required";
      valid = false;
    }

    if (newPassword) {
      errorsCopy.newPassword = "";
    } else {
      errorsCopy.newPassword = "New Password is required";
      valid = false;
    }
    if (!reTypePassword) {
      errorsCopy.reTypePassword = "Confirm New Password is required";
      valid = false;
    } else if (reTypePassword !== newPassword) {
      console.log("Test confirm", reTypePassword, newPassword);
      errorsCopy.reTypePassword = "Passwords must match";
      valid = false;
    } else {
      errorsCopy.reTypePassword = "";
    }

    setErrs(errorsCopy);

    return valid;
  }

  function handleChangePassword(e) {
    e.preventDefault();

    if (validateForm()) {
      const objectPassword = { oldPassword, newPassword };
      changePassword(id, objectPassword)
        .then((response) => {
          console.log(response);
          toast.success("Password updated successfully");
          navigate("/users");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to update password");
        });
    }
  }

  const [initialValues, setInitialValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
  });
  const { id } = useParams(); // Get the user ID from the route params

  // Load user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await getUserById(id);
        setInitialValues({
          email: response.email,
          firstName: response.firstName,
          lastName: response.lastName,
          username: response.username,
        });
      } catch (error) {
        toast.error("Failed to load user data");
      }
    };
    loadUserData();
  }, [id]);

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const { email, firstName, lastName, username } = values;

      const userRequest = {
        email,
        firstName,
        lastName,
        username,
        avatarId: 0,
        superUser: true,
        manageSupers: true,
      };

      try {
        setIsLoading(true);
        const respone = await updateUser(id, userRequest);
        console.log(respone);
        toast.success("User updated successfully");
        navigate("/users"); // Redirect to home or another page
      } catch (error) {
        toast.error("Failed to update user");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // State để lưu tab hiện tại
  const [activeTab, setActiveTab] = useState("profile");

  // Hàm xử lý sự kiện khi chọn tab
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleDashboard = () => {
    navigate("/");
  };

  const handleUsers = () => {
    navigate("/users");
  };

  return (
    <div className="container-x1 pt-4 pr-4 pl-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" style={{ fontSize: "13px" }}>
            <a href="#" onClick={handleDashboard}>
              DASHBOARD
            </a>
          </li>
          <li className="breadcrumb-item" style={{ fontSize: "13px" }}>
            <a href="#" onClick={handleUsers}>
              USERS
            </a>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{ fontSize: "13px" }}
          >
            UPDATE
          </li>
        </ol>
      </nav>
      <div className="user-profile">
        <div className="card position-relative" style={{ height: "350px" }}>
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  href="#profile"
                  className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                  onClick={() => handleTabClick("profile")}
                  role="tab"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  User profile
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  href="#avatar"
                  className={`nav-link ${activeTab === "avatar" ? "active" : ""}`}
                  onClick={() => handleTabClick("avatar")}
                  role="tab"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                  Avatar
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  href="#change-password"
                  className={`nav-link ${activeTab === "change-password" ? "active" : ""}`}
                  onClick={() => handleTabClick("change-password")}
                  role="tab"
                >
                  <FontAwesomeIcon icon={faLock} className="mr-2" />
                  Change password
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content">
              <div
                className={`tab-pane ${activeTab === "profile" ? "active show" : "d-none"}`}
                id="profile"
                role="tabpanel"
              >
                <form onSubmit={handleSubmit}>
                  <div className="row row-cols-lg-2">
                    <div className="mb-3 col">
                      <label htmlFor="">First Name</label>
                      <InputGroup>
                        <Form.Control
                          id="firstName"
                          name="firstName"
                          type="text"
                          placeholder="First Name"
                          onChange={handleChange}
                          value={values.firstName}
                          isValid={touched.firstName && !errors.firstName}
                          isInvalid={touched.firstName && !!errors.firstName}
                        />
                        {touched.firstName && errors.firstName ? (
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3 col">
                      <label htmlFor="">Last Name</label>
                      <InputGroup>
                        <Form.Control
                          id="lastName"
                          name="lastName"
                          type="text"
                          placeholder="Last Name"
                          onChange={handleChange}
                          value={values.lastName}
                          isValid={touched.lastName && !errors.lastName}
                          isInvalid={touched.lastName && !!errors.lastName}
                        />
                        {touched.lastName && errors.lastName ? (
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3 col">
                      <label htmlFor="">Username</label>
                      <InputGroup>
                        <Form.Control
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Username"
                          onChange={handleChange}
                          value={values.username}
                          isValid={touched.username && !errors.username}
                          isInvalid={touched.username && !!errors.username}
                          disabled
                        />
                        {touched.username && errors.username ? (
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        ) : null}
                      </InputGroup>
                    </div>

                    <div className="mb-3 col">
                      <label htmlFor="">Email</label>
                      <InputGroup>
                        <Form.Control
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          onChange={handleChange}
                          value={values.email}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && !!errors.email}
                        />
                        {touched.email && errors.email ? (
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        ) : null}
                      </InputGroup>
                      <Button
                        loading={isLoading}
                        onClick={handleSubmit as any}
                        style={{
                          width: "20%",
                          position: "absolute",
                          right: "19px",
                          bottom: "-100px",
                        }}
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="pr-2" />
                        Update
                      </Button>
                    </div>
                  </div>
                </form>
              </div>

              <div
                className={`tab-pane ${activeTab === "avatar" ? "active show" : "d-none"}`}
                id="avatar"
                role="tabpanel"
              >
                {/* Nội dung cho tab Avatar */}
                <div className="crop-image-container">
                  <div className="mb-3">
                    <label className="form-label">
                      <h4>Avatar</h4>
                    </label>
                    <div>
                      <AvatarEditor />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`tab-pane ${activeTab === "change-password" ? "active show" : "d-none"}`}
                id="change-password"
                role="tabpanel"
              >
                {/* Nội dung cho tab Change Password */}
                <form
                  action="POST"
                  acceptCharset="UTF-8"
                  id="profile-form"
                  className="js-base-form dirty-check"
                  noValidate={false}
                  style={{
                    borderBottom: "1px solid #d1d5db",
                  }}
                >
                  <div className="row row-cols-lg-2">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <label className="form-label">Current Password</label>
                        <input
                          type="password"
                          placeholder="Current Password"
                          name="oldPassword"
                          value={oldPassword}
                          className={`form-control ${errs.oldPassword ? "is-invalid" : ""}`}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                        {errs.oldPassword && (
                          <div className="invalid-feedback">
                            {" "}
                            {errs.oldPassword}{" "}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3 col">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        placeholder="New Password"
                        name="newPassword"
                        value={newPassword}
                        className={`form-control ${errs.newPassword ? "is-invalid" : ""}`}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      {errs.newPassword && (
                        <div className="invalid-feedback">
                          {" "}
                          {errs.newPassword}{" "}
                        </div>
                      )}
                    </div>
                    <div className="mb-3 col">
                      <label className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        name="reTypePassword"
                        value={reTypePassword}
                        className={`form-control ${errs.reTypePassword ? "is-invalid" : ""}`}
                        onChange={(e) => setReTypePassword(e.target.value)}
                      />
                      {errs.reTypePassword && (
                        <div className="invalid-feedback">
                          {" "}
                          {errs.reTypePassword}{" "}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="card-footer bg-transparent mt-3 p-0 pt-3">
                    <div className="btn-list justify-content-end">
                      <button
                        className="btn btn-primary position-absolute"
                        type="submit"
                        style={{
                          right: "19px",
                          bottom: "12px",
                        }}
                        onClick={handleChangePassword}
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="mr-2"
                        />
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
