import PaginationCustom from "@app/helpers/pagination/PaginationCustom";
import {
  removeNullFields,
  useDebounce,
} from "@app/helpers/pagination/PaginationInfo";
import {
  paginatedWithConditions,
  PermissionResponse,
} from "@app/services/permissions";
import { deleteUser } from "@app/services/usersService";
import {
  faEdit,
  faPlus,
  faSearch,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./common.css";
import DeleteConfirm from "./deleteFolder/DeleteConfirm";

const Permissions = () => {
  const [objectSearch, setObjectSearch] = useState<any>({
    page: 0,
    items_per_page: 10,
  });
  const [objectFilter, setObjectFilter] = useState<any>(objectSearch);
  const [totalRecords, setTotalRecords] = useState(0);
  const [permissions, setPermissions] = useState<PermissionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const navigator = useNavigate();

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

  const getAllPermissions = async () => {
    const objectTemp = {
      ...objectFilter,
      page: objectFilter?.page / objectFilter?.items_per_page,
      items_per_page: objectFilter?.items_per_page,
    };
    const filteredObject = removeNullFields(objectTemp);
    const objString = new URLSearchParams(filteredObject).toString();
    setLoading(true);
    try {
      const response = await paginatedWithConditions(objString);
      setPermissions(response?.results);
      setTotalRecords(response?.total);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (objectFilter) {
      getAllPermissions();
    }
  }, [debouncedSearchNo]);

  // Bulk
  const optionsBulk = [
    { value: "Bulk Actions", label: "Bulk Actions" },
    { value: "Bulk changes", label: "Bulk changes" },
    { value: "Delete", label: "Delete" },
  ];

  // Delete
  const handleDelete = async (id: number) => {
    await deleteUser(id);
    getAllPermissions();
  };

  const handleButtonCreate = () => {
    navigator("/permission/create");
  };

  const handleButtonEdit = (id_permissions: number) => {
    navigator(`/permission/edit/${id_permissions}`);
  };

  const handleDashboard = () => {
    navigator("/");
  };

  // Hàm xử lý khi nhấn chọn tất cả
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Chọn tất cả user IDs
      const allPermissionsIds = permissions.map((permission) => permission.id);
      setSelectedPermissions(allPermissionsIds);
    } else {
      // Bỏ chọn tất cả
      setSelectedPermissions([]);
    }
  };

  // Hàm xử lý khi chọn từng hàng
  const handleSelectRow = (id: number) => {
    if (selectedPermissions.includes(id)) {
      // Nếu hàng đã được chọn, bỏ chọn hàng đó
      setSelectedPermissions(
        selectedPermissions.filter((permissionId) => permissionId !== id)
      );
    } else {
      // Nếu hàng chưa được chọn, thêm hàng đó vào danh sách
      setSelectedPermissions([...selectedPermissions, id]);
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
            PERMISSIONS
          </li>
        </ol>
      </nav>
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
            <div></div>
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
                          permissions.length > 0 &&
                          selectedPermissions.length === permissions.length
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
                  <th className="text-start">KEY</th>
                  <th className="text-start">CREATED AT</th>
                  <th className="text-center">OPERATIONS</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((permission) => (
                  <tr
                    key={permission.id}
                    className={
                      selectedPermissions.includes(permission.id)
                        ? "table-active"
                        : ""
                    }
                  >
                    <td className="odd" style={{ paddingLeft: "19px" }}>
                      <div className="form-check" style={{ width: "22px" }}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedPermissions.includes(permission.id)}
                          onChange={() => handleSelectRow(permission.id)}
                          style={{ height: "20px", width: "20px" }}
                        />
                      </div>
                    </td>
                    <td className="text-start">
                      <span>{permission.id}</span>
                    </td>
                    <td className="text-start">
                      <a href="#">{permission.name}</a>
                    </td>
                    <td className="text-start">
                      <span>{permission.key}</span>
                    </td>
                    <td className="text-start">{permission.createdAt}</td>
                    <td className="text-center text-nowrap">
                      <div className="table-actions">
                        <button
                          className="btn btn-sm btn-icon btn-primary mr-1 position-relative"
                          onClick={() => handleButtonEdit(permission.id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                          <span className="title-edit">Edit</span>
                        </button>
                        <DeleteConfirm
                          onDelete={() => handleDelete(permission.id)}
                          id={permission.id}
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
          dataTable={permissions}
          onPageChange={onPageChange}
          onRowsChange={onRowsChange}
        />
      </div>
    </div>
  );
};

export default Permissions;

// table-vcenter table-striped table-hover no-footer dtr-inline
