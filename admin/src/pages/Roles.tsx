import {
  deleteRole,
  paginatedWithConditions,
  PaginateRoleResponse,
} from "@app/services/roles";
import {
  faEdit,
  faPlus,
  faSearch,
  faShareFromSquare,
  faSync,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./common.css";
import DeleteConfirm from "./deleteFolder/DeleteConfirm";

const Roles = () => {
  const [roles, setRoles] = useState<PaginateRoleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const navigator = useNavigate();

  const getAllRoles = async () => {
    setLoading(true);
    try {
      const response = await paginatedWithConditions();
      setRoles(response?.results);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const optionsField = [
    { value: "Select field", label: "Select field" },
    { value: "Name", label: "Name" },
  ];

  const optionsOperation = [
    { value: "Contains", label: "Contains" },
    { value: "Is equal to", label: "Is equal to" },
    { value: "Greater than", label: "Greater than" },
    { value: "Less than", label: "Less than" },
  ];

  // Bulk
  const optionsBulk = [
    { value: "Bulk Actions", label: "Bulk Actions" },
    { value: "Bulk changes", label: "Bulk changes" },
    { value: "Delete", label: "Delete" },
  ];

  const [filters, setFilters] = useState([
    { field: optionsField[0], operation: optionsOperation[1], value: "" },
  ]);

  const addFilter = () => {
    setFilters([
      ...filters,
      { field: optionsField[0], operation: optionsOperation[1], value: "" },
    ]);
  };

  const removeFilter = (index: number) => {
    if (index > 0) {
      // Only allow removal of filters after the first one
      setFilters(filters.filter((_, i) => i !== index));
    }
  };

  const handleFieldChange = (index: number, field: any) => {
    const newFilters = [...filters];
    newFilters[index].field = field;
    setFilters(newFilters);
  };

  const handleOperationChange = (index: number, operation: any) => {
    const newFilters = [...filters];
    newFilters[index].operation = operation;
    setFilters(newFilters);
  };

  const handleValueChange = (index: number, value: string) => {
    const newFilters = [...filters];
    newFilters[index].value = value;
    setFilters(newFilters);
  };

  // Delete
  const handleDelete = async (id: number) => {
    await deleteRole(id);
    getAllRoles();
  };

  const [showFilterCard, setShowFilterCard] = useState(false);

  const handleButtonFilters = () => {
    setShowFilterCard(!showFilterCard);
  };

  const handleButtonCreate = () => {
    navigator("/role/create");
  };

  const handleButtonEdit = (id_role: number) => {
    navigator(`/role/edit/${id_role}`);
  };

  const handleDashboard = () => {
    navigator("/");
  };

  // Hàm xử lý khi nhấn chọn tất cả
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Chọn tất cả user IDs
      const allRolesIds = roles.map((role) => role.id);
      setSelectedRoles(allRolesIds);
    } else {
      // Bỏ chọn tất cả
      setSelectedRoles([]);
    }
  };

  // Hàm xử lý khi chọn từng hàng
  const handleSelectRow = (id: number) => {
    if (selectedRoles.includes(id)) {
      // Nếu hàng đã được chọn, bỏ chọn hàng đó
      setSelectedRoles(selectedRoles.filter((roleId) => roleId !== id));
    } else {
      // Nếu hàng chưa được chọn, thêm hàng đó vào danh sách
      setSelectedRoles([...selectedRoles, id]);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "24px" }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item" style={{ fontSize: "13px" }}>
            <a href="#" onClick={handleDashboard}>
              DASHBOARD
            </a>
          </li>
          <li
            className="breadcrumb-item active"
            aria-current="page"
            style={{ fontSize: "13px" }}
          >
            ROLES
          </li>
        </ol>
      </nav>
      {showFilterCard && (
        <div
          className="card"
          style={{
            maxWidth: "1286px",
            height: "auto",
            margin: "0px auto",
          }}
        >
          <div className="card-body">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p>Filters</p>
              <div
                style={{
                  display: "inline-flex",
                  border: "2px solid #d1d5db", // Màu border ban đầu
                  borderRadius: "50%",
                  padding: "10px 12px",
                  transition: "border-color 0.3s, color 0.3s",
                  cursor: "pointer",
                  fontSize: "10px",
                  marginTop: "-10px",
                }}
                onClick={handleButtonFilters}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#b0b5b8"; // Màu border khi hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db"; // Màu border ban đầu
                  e.currentTarget.style.color = "#4b5563"; // Màu icon ban đầu
                }}
              >
                <FontAwesomeIcon icon={faTimes} style={{ color: "#4b5563" }} />
              </div>
            </div>
            {filters.map((filter, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: 5,
                  marginLeft: "-7px",
                  alignItems: "center",
                  paddingBottom: "19px",
                }}
              >
                <div className="col-3">
                  <Select
                    isClearable
                    options={optionsField}
                    value={filter.field}
                    onChange={(selected) => handleFieldChange(index, selected)}
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
                        padding: "3px",
                      }),
                    }}
                    menuPortalTarget={
                      document.getElementById(
                        "dataTableUserTable"
                      ) as HTMLElement
                    }
                  />
                </div>
                <div className="col-3">
                  <Select
                    isClearable
                    options={optionsOperation}
                    value={filter.operation}
                    onChange={(selected) =>
                      handleOperationChange(index, selected)
                    }
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
                        padding: "3px",
                      }),
                    }}
                    menuPortalTarget={
                      document.getElementById(
                        "dataTableUserTable"
                      ) as HTMLElement
                    }
                  />
                </div>
                <div className="col-3">
                  {filter.field &&
                    (filter.field.value === "Select field" ||
                      filter.field.value === "Name") && (
                      <input
                        type="text"
                        value={filter.value}
                        onChange={(e) =>
                          handleValueChange(index, e.target.value)
                        }
                        placeholder="Value"
                        className="form-control"
                        style={{
                          padding: "21px 12px",
                        }}
                      />
                    )}
                </div>
                {index > 0 && ( // Show delete button only for filters other than the first one
                  <button
                    onClick={() => removeFilter(index)}
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      marginLeft: "10px",
                      border: "1px solid #d1d5db",
                      padding: "8px 7px",
                      borderRadius: "5px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ color: "#f00", fontSize: "16px" }}
                    />
                  </button>
                )}
              </div>
            ))}
            <div
              className="col-6"
              style={{
                gap: 5,
                alignContent: "center",
                marginTop: "12px",
                marginLeft: "-7px",
              }}
            >
              <div style={{ display: "flex ", gap: 5 }}>
                <button
                  className="btn btn-sm btn-secondary col-4"
                  style={{
                    padding: "10px",
                    backgroundColor: "white",
                    color: "black",
                    marginRight: "10px",
                    border: "1px solid #d1d5db",
                    marginTop: "-10px",
                  }}
                  onClick={addFilter}
                >
                  <b>Add additional filters</b>
                </button>
                <button
                  className="btn btn-sm btn-primary col-2"
                  style={{
                    marginTop: "-10px",
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="table-wrapper mt-4">
        <div className="card">
          <div className="card-header d-flex mt-2">
            <div>
              <Select
                isClearable
                className="mr-1"
                options={optionsBulk}
                defaultValue={optionsBulk[0]}
                menuPosition="fixed"
                menuPlacement="auto"
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: "3px",
                    fontWeight: "bold",
                  }),
                }}
                menuPortalTarget={
                  document.getElementById("dataTableUserTable") as HTMLElement
                }
              />
            </div>
            <div>
              <button
                className="btn btn-sm btn-secondary mr-1"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                  padding: "10.9px 15px",
                  paddingBottom: "11px",
                }}
                onClick={handleButtonFilters}
              >
                <b>Filters</b>
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type="search"
                placeholder="Search"
                style={{
                  border: "1px solid #d1d5db",
                  padding: "9px 12px",
                  width: "250px",
                  borderRadius: "5px",
                }}
              ></input>
              <FontAwesomeIcon
                icon={faSearch}
                color="grey"
                style={{
                  position: "absolute",
                  top: "38%",
                  right: "13px",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: 5,
                alignItems: "center",
                right: "20px",
                position: "absolute",
              }}
            >
              <button
                className="btn btn-sm btn-primary"
                style={{
                  color: "white",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  padding: "10px 25px",
                }}
                onClick={handleButtonCreate}
              >
                {/* <span style={{ paddingRight: "10px" }}>+</span> */}
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ paddingRight: "10px" }}
                />
                <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Create
                </span>
              </button>
              <button
                className="btn btn-sm btn-secondary"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  padding: "10px 25px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "grey"; // Màu border khi hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#d1d5db"; // Màu border ban đầu
                }}
              >
                <FontAwesomeIcon
                  icon={faSync}
                  style={{ paddingRight: "10px" }}
                />
                <span style={{ fontWeight: "bold" }}>Reload</span>
              </button>
            </div>
          </div>
          <div className="card-table">
            <table className="table card-table mb-0">
              <thead>
                <tr style={{ cursor: "pointer" }}>
                  <th
                    className="text-start position-relative"
                    style={{ verticalAlign: "top", paddingLeft: "19px" }}
                  >
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input position-absolute"
                        onChange={handleSelectAll}
                        checked={
                          roles.length > 0 &&
                          selectedRoles.length === roles.length
                        }
                        style={{
                          height: "20px",
                          width: "20px",
                          bottom: "-20px",
                        }}
                      />
                      {/* 1111 */}
                    </div>
                  </th>
                  <th className="text-start">ID</th>
                  <th className="text-start">NAME</th>
                  <th className="text-start">DESCRIPTION</th>
                  <th className="text-start">CREATED AT</th>
                  <th className="text-start">CREATED BY</th>
                  <th className="text-start">DELETED AT</th>
                  <th className="text-center">OPERATIONS</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr
                    key={role.id}
                    className={
                      selectedRoles.includes(role.id) ? "table-active" : ""
                    }
                  >
                    <td className="odd" style={{ paddingLeft: "19px" }}>
                      <div className="form-check" style={{ width: "22px" }}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedRoles.includes(role.id)}
                          onChange={() => handleSelectRow(role.id)}
                          style={{ height: "20px", width: "20px" }}
                        />
                      </div>
                    </td>
                    <td className="text-start">
                      <span>{role.id}</span>
                    </td>
                    <td className="text-start">
                      <a href="#">{role.name}</a>
                    </td>
                    <td className="text-start">
                      <span>{role.description}</span>
                    </td>
                    <td className="text-start">{role.createdAt}</td>
                    <td className="text-start">
                      <a href="#">
                        {/* {permission.createdBy} */}
                        <span>{role.createdByName}</span>
                        <FontAwesomeIcon
                          icon={faShareFromSquare}
                          style={{ paddingLeft: "5px", color: "#206BC4" }}
                        />
                      </a>
                    </td>
                    <td className="text-start">
                      <span className="badge bg-info p-2">
                        {role.deletedAt == null ? "Activated" : "Deactivated"}
                      </span>
                    </td>
                    <td className="text-center text-nowrap">
                      <div className="table-actions">
                        <button
                          className="btn btn-sm btn-icon btn-primary mr-1 position-relative"
                          onClick={() => handleButtonEdit(role.id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                          <span className="title-edit">Edit</span>
                        </button>
                        <DeleteConfirm
                          onDelete={() => handleDelete(role.id)}
                          id={role.id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;

// table-vcenter table-striped table-hover no-footer dtr-inline
