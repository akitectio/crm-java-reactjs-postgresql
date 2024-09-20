import ToggleSwitch from "@app/helpers/toggleSwitch/ToggleSwitch";
import { createRoles } from "@app/services/roles";
import { Button } from "@app/styles/common";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PermissionList from "./TreePermissions";

const CreateFormRoles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      name: "",
      description: "",
      permissionIds: [1],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      // debugger;
      const { name, description, permissionIds } = values;

      const rolesRequest = {
        name: name,
        description: description,
        permissionIds: permissionIds,
      };

      try {
        setIsLoading(true);
        const response = await createRoles(rolesRequest);
        console.log(response);
        toast.success("Roles and permissions created successfully!");
        navigate("/role");
      } catch (error) {
        toast.error("Failed to create roles and permissions");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleDashboard = () => {
    navigate("/");
  };

  const handleRandR = () => {
    navigate("/role");
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
            <a href="#" onClick={handleRandR}>
              ROLES
            </a>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{ fontSize: "13px" }}
          >
            CREATE NEW ROLE
          </li>
        </ol>
      </nav>
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="gap-3 col-md-9">
          <div className="card mb-3 mt-2">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row row-cols-lg-2">
                  <div className="mb-3 col-lg-12">
                    <label htmlFor="">Name</label>
                    <InputGroup>
                      <Form.Control
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        onChange={handleChange}
                        value={values.name}
                        isValid={touched.name && !errors.name}
                        isInvalid={touched.name && !!errors.name}
                      />
                      {touched.name && errors.name ? (
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      ) : null}
                    </InputGroup>
                  </div>

                  <div className="mb-3 col-lg-12">
                    <label htmlFor="">Description</label>
                    <InputGroup>
                      <Form.Control
                        id="description"
                        name="description"
                        as="textarea"
                        aria-label="with textarea"
                        placeholder="Short description"
                        onChange={handleChange}
                        value={values.description}
                        isValid={touched.description && !errors.description}
                        isInvalid={touched.description && !!errors.description}
                        style={{ height: "100px" }}
                      />
                      {touched.description && errors.description ? (
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      ) : null}
                    </InputGroup>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <ToggleSwitch />
                  <span style={{ paddingLeft: "5px" }}>Is default?</span>
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
        </div>
      </div>

      {/* Permission Flags */}
      <div className="row">
        <div className="gap-3 col-md-9">
          <div className="card mb-3 mt-2">
            <div
              className="card-header d-flex position-relative"
              style={{ justifyContent: "space-between" }}
            >
              <h4 className="card-title">
                <label style={{ marginBottom: "0px" }}>Permission Flags</label>
              </h4>
              <div
                className="d-flex position-absolute"
                style={{ right: "20px" }}
              >
                <div className="form-check" style={{ width: "22px" }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    // checked={selectedUsers.includes(user.id)}
                    // onChange={() => handleSelectRow(user.id)}
                    style={{ height: "20px", width: "20px", marginTop: "2px" }}
                  />
                </div>
                <span
                  className="badge"
                  style={{
                    border: "1px solid #E9F0F9",
                    borderRadius: "3px",
                    backgroundColor: "#E9F0F9",
                    marginLeft: "9px",
                    color: "#206BCE",
                    padding: "5px",
                  }}
                >
                  All Permissions
                </span>
              </div>
            </div>
            <div className="card-body">
              <PermissionList onValueChange={() => {
                
              }} />
            </div>
          </div>
        </div>
      </div>
      {/* //////////////// */}
    </div>
  );
};

export default CreateFormRoles;
