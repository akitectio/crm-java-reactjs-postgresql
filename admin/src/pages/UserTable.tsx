import PaginationCustom from "@app/helpers/pagination/PaginationCustom";
import {
  removeNullFields,
  useDebounce,
} from "@app/helpers/pagination/PaginationInfo";
import {
  deleteUser,
  paginateWithFilters,
  removeSuper,
  UserResponse,
} from "@app/services/usersService";
import {
  faEdit,
  faPlus,
  faSearch,
  faSync,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./common.css";
import DeleteConfirm from "./deleteFolder/DeleteConfirm";

const UserTable = () => {
  const optionsField = [
    { value: "username", label: "Username" },
    { value: "email", label: "Email" },
    { value: "Status", label: "Status" },
    { value: "createdAt", label: "Created At" },
  ];

  const optionsOperation = [
    { value: "ILIKE", label: "Contains" },
    { value: "EQUAL", label: "Is equal to" },
    { value: "MORE_THAN", label: "Greater than" },
    { value: "LESS_THAN", label: "Less than" },
  ];

  const optionsStatus = [
    { value: "Activated", label: "Activated" },
    { value: "Deactivated", label: "Deactivated" },
  ];

  const optionsBulk = [
    { value: "Bulk Actions", label: "Bulk Actions" },
    { value: "Bulk changes", label: "Bulk changes" },
    { value: "Delete", label: "Delete" },
  ];

  const [filters, setFilters] = useState<any>([
    { field: optionsField[0], operation: optionsOperation[1], value: "" },
  ]);

  const [objectSearch, setObjectSearch] = useState<any>({
    page: 0,
    items_per_page: 10,
  });
  const [objectFilter, setObjectFilter] = useState<any>(objectSearch);
  const [totalRecords, setTotalRecords] = useState(0);
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const debouncedSearchNo = useDebounce(objectFilter, 300);

  const onPageChange = (event: any) => {
    setObjectFilter({
      ...objectFilter,
      page: event.first,
      items_per_page: event.rows,
    });
  };
  const onRowsChange = (event: any) => {
    setObjectFilter({
      ...objectFilter,
      page: 0,
      items_per_page: event.target?.value,
    });
  };
  const navigator = useNavigate();

  const getAllUsers = async () => {
    const objectTemp = {
      ...objectFilter,
      page: objectFilter?.page / objectFilter?.items_per_page,
      items_per_page: objectFilter?.items_per_page,
    };

    const filteredObject = removeNullFields(objectTemp);
    const objString = new URLSearchParams(filteredObject).toString();

    const dataPayload: any =
      Array.isArray(templFilters) &&
      templFilters?.map((item: any) => ({
        key: item?.field?.value,
        operator: item?.operation?.value,
        value: item?.value,
      }));

    let payloadFilters;

    if (dataPayload?.length > 0 && Array.isArray(dataPayload)) {
      payloadFilters = dataPayload;
    }

    setLoading(true);
    try {
      const response = await paginateWithFilters(objString, payloadFilters);
      setUsers(response?.results);
      setTotalRecords(response?.total);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const [templFilters, setTemplFilters] = useState<any>("");

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

  const CustomDatePicker = ({ value, onClick }) => (
    <div onClick={onClick} className="custom-datepicker">
      {value || "Select Date"}
    </div>
  );

  // Delete
  const handleDelete = async (id: number) => {
    await deleteUser(id);
    getAllUsers();
  };

  // Remove Super
  const handleRemoveSuper = async (id: number) => {
    await removeSuper(id);
    console.log(await removeSuper(id), "Remoce super");
    getAllUsers();
  };

  const [showFilterCard, setShowFilterCard] = useState(false);

  const handleButtonFilters = () => {
    setShowFilterCard(!showFilterCard);
  };

  const handleButtonCreate = () => {
    navigator("/users/create");
  };

  const handleButtonEdit = (id_user: number) => {
    navigator(`/users/edit/${id_user}`);
  };

  const handleDashboard = () => {
    navigator("/");
  };

  // Hàm xử lý khi nhấn chọn tất cả
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Chọn tất cả user IDs
      const allUserIds = users.map((user) => user.id);
      setSelectedUsers(allUserIds);
    } else {
      // Bỏ chọn tất cả
      setSelectedUsers([]);
    }
  };

  // Hàm xử lý khi chọn từng hàng
  const handleSelectRow = (id: number) => {
    if (selectedUsers.includes(id)) {
      // Nếu hàng đã được chọn, bỏ chọn hàng đó
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      // Nếu hàng chưa được chọn, thêm hàng đó vào danh sách
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  useEffect(() => {
    if (objectFilter || templFilters?.length > 0) {
      getAllUsers();
    }
  }, [debouncedSearchNo, templFilters]);

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
            USERS
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
                    placeholder="Select field"
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
                      filter.field.value === "username" ||
                      filter.field.value === "email") && (
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
                  {filter.field && filter.field.value === "Status" && (
                    <Select
                      isClearable
                      options={optionsStatus}
                      placeholder="Select option"
                      value={filter.value}
                      onChange={(selected) =>
                        handleValueChange(index, selected ? selected.value : "")
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
                  )}
                  {filter.field && filter.field.value === "createdAt" && (
                    <DatePicker
                      dateFormat="yyyy/MM/dd"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      calendarClassName="custom-style"
                      placeholderText={"Y-m-d"}
                      selected={filter.value ? new Date(filter.value) : null}
                      onChange={(date) =>
                        handleValueChange(
                          index,
                          date ? date.toISOString().split("T")[0] : ""
                        )
                      }
                      customInput={<CustomDatePicker />}
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
                  onClick={() => {
                    setTemplFilters(filters);
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
                          users.length > 0 &&
                          selectedUsers.length === users.length
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
                  <th className="text-start">USERNAME</th>
                  <th className="text-start">EMAIL</th>
                  <th className="text-start">ROLE</th>
                  <th className="text-start">CREATED AT</th>
                  <th className="text-start">STATUS</th>
                  <th className="text-start">IS SUPPER?</th>
                  <th className="text-center">OPERATIONS</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={
                      selectedUsers.includes(user.id) ? "table-active" : ""
                    }
                  >
                    <td className="odd" style={{ paddingLeft: "19px" }}>
                      <div className="form-check" style={{ width: "22px" }}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => handleSelectRow(user.id)}
                          style={{ height: "20px", width: "20px" }}
                        />
                      </div>
                    </td>
                    <td className="text-start">
                      <a href="#" onClick={() => handleButtonEdit(user.id)}>
                        {user.username}
                      </a>
                    </td>
                    <td className="text-start">
                      <a href="#">{user.email}</a>
                    </td>
                    <td className="text-start">
                      <a
                        href="#"
                        style={{
                          textDecoration: "none",
                          borderBottom: "dashed 1px #0088cc",
                        }}
                      >
                        {user.roleName}
                      </a>
                    </td>
                    <td className="text-start">{user.createdAt}</td>
                    <td className="text-start">
                      <span className="badge bg-info p-2">
                        {user.active ? "Activated" : "Deactivated"}
                      </span>
                    </td>
                    <td className="text-start">
                      <span className="badge bg-success pl-3 pr-3 pt-2 pb-2">
                        {user.superUser ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="text-center text-nowrap">
                      <div className="table-actions">
                        <button
                          className="btn btn-sm btn-warning mr-1"
                          style={{ backgroundColor: "orange" }}
                          onClick={() => handleRemoveSuper(user.id)}
                        >
                          <span style={{ color: "white" }}>Remove super</span>
                        </button>
                        <button
                          className="btn btn-sm btn-icon btn-primary mr-1 position-relative"
                          onClick={() => handleButtonEdit(user.id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                          <span className="title-edit">Edit</span>
                        </button>
                        <DeleteConfirm
                          onDelete={() => handleDelete(user.id)}
                          id={user.id}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <PaginationCustom
          setPage={(e: any) =>
            setObjectFilter({
              ...objectFilter,
              page: e,
            })
          }
          page={objectFilter?.page}
          items_per_page={objectFilter?.items_per_page}
          totalRecords={totalRecords}
          dataTable={users}
          onPageChange={onPageChange}
          onRowsChange={onRowsChange}
        />
      </div>
    </div>
  );
};

export default UserTable;

// table-vcenter table-striped table-hover no-footer dtr-inline
