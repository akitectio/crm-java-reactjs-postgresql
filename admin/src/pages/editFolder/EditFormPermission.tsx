import {
  GetAllPermissionsResponse,
  getAllPermissionsWithKey,
  getPermissionsById,
  updatePermission,
} from "@app/services/permissions";
import { Button } from "@app/styles/common";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
const EditFormPermission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState<GetAllPermissionsResponse[]>(
    []
  );

  const [initialValues, setInitialValues] = useState({
    name: "",
    key: "",
    parentId: "",
  });

  useEffect(() => {
    const loadPermissionData = async () => {
      try {
        const response = await getPermissionsById(id);
        const displayResponse = await getAllPermissionsWithKey();
        setPermissions(displayResponse);
        const formatNameKey = response.name + " (" + response.key + ")";
        displayResponse.map((item) => {
          if (formatNameKey === item.label) {
            setInitialValues({
              name: response.name,
              key: response.key,
              parentId: item.extra,
            });
          }
        });
      } catch (error) {
        toast.error("Failed to load permission data");
      }
    };
    loadPermissionData();
  }, [id]);

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const { name, parentId } = values;

      const permissionRequest = {
        name,
        parentId,
      };

      try {
        setIsLoading(true);
        const respone = await updatePermission(id, permissionRequest);
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

  const handleDashboard = () => {
    navigate("/");
  };

  const handleP = () => {
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
            <a href="#" onClick={handleP}>
              PERMISSIONS
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
                        id="parentId"
                        name="parentId"
                        onChange={handleChange}
                        value={values.parentId}
                      >
                        <option value="" disabled>
                          Select a permission
                        </option>
                        {permissions.map((permission) => (
                          <option
                            key={permission.value}
                            value={permission.value}
                          >
                            {permission.label}
                          </option>
                        ))}
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

export default EditFormPermission;
