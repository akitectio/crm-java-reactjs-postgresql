import { createPermissions } from "@app/services/permissions";
import { Button } from "@app/styles/common";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const CreateFormPermissions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      name: "",
      parentId: "Select category",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      parentId: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      // debugger;
      const { name, parentId  } = values;

      const permissionsRequest = {
        name: name,
        parentId: parentId,
      };

      try {
        setIsLoading(true);
        const response = await createPermissions(permissionsRequest);
        console.log(response);
        toast.success("Permissions created successfully!");
        navigate("/permission");
      } catch (error) {
        toast.error("Failed to create Permissions");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleDashboard = () => {
    navigate("/");
  };

  const handleRandP = () => {
    navigate("/permission");
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
            <a href="#" onClick={handleRandP}>
              PERMISSIONS
            </a>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{ fontSize: "13px" }}
          >
            CREATE NEW PERMISSION
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
                    <label htmlFor="">Category</label>
                    <InputGroup>
                  <Form.Control
                    as="select"
                    id="permission"
                    name="permission"
                    onChange={handleChange}
                    value={values.parentId}
                  >
                    <option value="Select role">Select category</option>
                    <option value="Admin">Admin</option>
                  </Form.Control>
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
        </div>
      </div>
    </div>
  );
};

export default CreateFormPermissions;
