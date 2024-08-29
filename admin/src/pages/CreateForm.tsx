import { faSave, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
const CreateForm = () => {
  const optionsRole = [
    { value: "Select role", label: "Select role" },
    { value: "Admin", label: "Admin" },
  ];
  return (
    <div className="container-x1">
      <div className="row" style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="gap-3 col-md-9">
          <div className="card mb-3 mt-4 ml-3">
            <div className="card-body">
              <div className="form-body">
                <div className="row row-cols-lg-2">
                  <div className="mb-3 col">
                    <label className="form-label required">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-3 col">
                    <label className="form-label required">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-3 col">
                    <label className="form-label required">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-required="true"
                    />
                  </div>
                  <div className="mb-3 col">
                    <label className="form-label required">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-required="true"
                      placeholder="e.g: example@domain.com"
                    />
                    <small
                      className="charcounter"
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: ".5rem",
                      }}
                    >
                      (0/60)
                    </small>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label required">Password</label>
                      <input
                        type="text"
                        className="form-control"
                        aria-required="true"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label required">
                        Re-type password
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-required="true"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card-Right */}
        <div className="col-md-3 gap-3 d-flex flex-column-reverse flex-md-column mb-md-0 mb-5">
          <div className="card mt-4 mr-3">
            <div className="card-header">
              <h4 className="card-title">Publish</h4>
            </div>
            <div className="card-body">
              <div className="btn-list ">
                <button className="btn btn-primary mr-3" type="submit">
                  <FontAwesomeIcon icon={faSave} className="pr-2" />
                  Save
                </button>
                <button
                  className="btn"
                  type="submit"
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "5px",
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="pr-2" />
                  Save & Exit
                </button>
              </div>
            </div>
          </div>

          {/* Card-Bottom */}
          <div className="card meta-boxes mt-4 mr-3">
            <div className="card-header">
              <h4 className="card-title">
                <label className="form-label">Role</label>
              </h4>
            </div>
            <div className="card-body">
              <Select
                isClearable
                options={optionsRole}
                defaultValue={optionsRole[0]}
                menuPosition="fixed"
                menuPlacement="auto"
                styles={{
                  menu: (base) => ({
                    ...base,
                    zIndex: 9999,
                    top: 5,
                  }),
                  control: (base) => ({
                    ...base,
                    width: "100%",
                  }),
                }}
                menuPortalTarget={
                  document.getElementById("dataTableUserTable") as HTMLElement
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
