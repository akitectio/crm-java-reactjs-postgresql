import { getAllRoles, GetAllRolesResponse } from "@app/services/roles";
import { createUser } from "@app/services/usersService";
import { Button } from "@app/styles/common";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const CreateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [roles, setRoles] = useState<GetAllRolesResponse[]>([]);

  const getNameRoles = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRoles();
      setRoles(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getNameRoles();
  }, []);

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      reTypePassword: "",
      firstName: "",
      lastName: "",
      username: "",
      roleId: roles,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      reTypePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      // debugger;
      const { email, password, firstName, lastName, username, roleId } = values;

      const userRequest = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        username: username,
        roleId: roleId,
        avatarId: 0,
        superUser: true,
        manageSupers: true,
      };

      try {
        setIsLoading(true);
        const response = await createUser(userRequest);
        console.log(response);
        toast.success("User created successfully!");
        navigate("/users");
      } catch (error) {
        toast.error("Failed to create user");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleDashboard = () => {
    navigate("/");
  };

  const handleUsers = () => {
    navigate("/users");
  };

  return (
    <div className="container-x1 pt-4 pr-4 pl-4" style={{ paddingTop: "24px" }}>
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
            CREATE
          </li>
        </ol>
      </nav>
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="gap-3 col-md-9">
          <div className="card mb-3 mt-2">
            <div className="card-body">
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
                  </div>

                  <div className="mb-3 col-lg-12">
                    <label htmlFor="">Password</label>
                    <InputGroup>
                      <Form.Control
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={values.password}
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.password && !!errors.password}
                      />
                      {touched.password && errors.password ? (
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      ) : null}
                    </InputGroup>
                  </div>

                  <div className="mb-3 col-lg-12">
                    <label htmlFor="">Re-type Password</label>
                    <InputGroup>
                      <Form.Control
                        id="reTypePassword"
                        name="reTypePassword"
                        type="password"
                        placeholder="Re-type Password"
                        onChange={handleChange}
                        value={values.reTypePassword}
                        isValid={
                          touched.reTypePassword && !errors.reTypePassword
                        }
                        isInvalid={
                          touched.reTypePassword && !!errors.reTypePassword
                        }
                      />
                      {touched.reTypePassword && errors.reTypePassword ? (
                        <Form.Control.Feedback type="invalid">
                          {errors.reTypePassword}
                        </Form.Control.Feedback>
                      ) : null}
                    </InputGroup>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3 gap-3 d-flex flex-column-reverse flex-md-column mb-md-0 mb-5">
          <div className="card mt-2 ml-2">
            <div className="card-header">
              <h4 className="card-title">Publish</h4>
            </div>
            <div className="card-body">
              <Button loading={isLoading} onClick={handleSubmit as any}>
                <FontAwesomeIcon icon={faSignOutAlt} className="pr-2" />
                Save & Exit
              </Button>
            </div>
          </div>

          {/* Card-Bottom */}
          <div className="card meta-boxes mt-4 ml-2">
            <div className="card-header">
              <h4 className="card-title">
                <label className="form-label">Role</label>
              </h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <InputGroup>
                  <Form.Control
                    as="select"
                    id="roleId"
                    name="roleId"
                    onChange={handleChange}
                    value={values.roleId}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </Form.Control>
                </InputGroup>
              </div>
              {/* Hiển thị giá trị role đã chọn */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
