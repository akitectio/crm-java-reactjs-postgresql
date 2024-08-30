import {
  faCheckCircle,
  faLock,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import AvatarEditor from "./AvatarUploader";
import "./editCss.css";

const EditForm = () => {
  // State để lưu tab hiện tại
  const [activeTab, setActiveTab] = useState("profile");

  // Hàm xử lý sự kiện khi chọn tab
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container-x1 pt-4 pr-4 pl-4">
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
                        <label className="form-label required">
                          Current Password
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div className="mb-3 col">
                      <label className="form-label required">
                        New Password
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-required="true"
                      />
                    </div>
                    <div className="mb-3 col">
                      <label className="form-label required">
                        Confirm New Password
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        aria-required="true"
                      />
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
