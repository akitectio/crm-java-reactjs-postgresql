import { getAllPermissions } from "@app/services/permissions";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Permission {
  label: string;
  value: number;
  extra: number | null;
}

interface PermissionWithChildren extends Permission {
  children: PermissionWithChildren[];
  checked: boolean;
}

const buildTree = (permissions: Permission[]) => {
  const map = new Map<number, PermissionWithChildren>();

  permissions.forEach((permission) => {
    map.set(permission.value, { ...permission, children: [], checked: false });
  });

  const tree: PermissionWithChildren[] = [];

  permissions.forEach((permission) => {
    if (permission.extra === null) {
      tree.push(map.get(permission.value)!);
    } else {
      const parent = map.get(permission.extra);
      if (parent) {
        parent.children.push(map.get(permission.value)!);
      }
    }
  });

  return tree;
};

// Recursive function to update checked state of parent and children
const updateCheckedState = (
  permissions: PermissionWithChildren[],
  value: number,
  checked: boolean
) => {
  return permissions.map((permission) => {
    if (permission.value === value) {
      return {
        ...permission,
        checked,
        children: permission.children.map(
          (child) => updateCheckedState([child], child.value, checked)[0]
        ),
      };
    }
    return {
      ...permission,
      children: updateCheckedState(permission.children, value, checked),
    };
  });
};

const PermissionChildren: React.FC<{
  children: PermissionWithChildren[];
  onCheckboxChange: (value: number, checked: boolean) => void;
}> = ({ children, onCheckboxChange }) => {
  return (
    <ul style={{ paddingLeft: "25px" }}>
      {children.map((child) => (
<<<<<<< HEAD
        <li
          key={child.value}
          style={{ listStyle: "none", marginBottom: "8px" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              id={`permission-${child.value}`}
              checked={child.checked}
              onChange={(e) => onCheckboxChange(child.value, e.target.checked)}
              style={{ height: "20px", width: "20px" }}
            />
            <label
              htmlFor={`permission-${child.value}`}
              style={{
                marginLeft: "9px",
                color: "#FF9F43", // Màu cam cho các quyền con con
                fontSize: "13px",
                marginTop: "8px",
                border: "1px solid #FEF5E6",
                borderRadius: "3px",
                backgroundColor: "#FEF5E6",
                padding: "0px 2px",
              }}
            >
              {child.label}
            </label>
          </div>
          {child.children.length > 0 && (
            <PermissionChildren
              children={child.children}
              onCheckboxChange={onCheckboxChange}
            />
          )}
=======
        <li key={child.value} style={{listStyleType:"none"}}>
            <input className="mt-2" type="checkbox" id={`permission-${child.value}`} style={{
                height: "20px",
                width: "20px"
                }} 
            />

            <label
            htmlFor={`permission-${child.label}`}
            style={{
                border: "1px solid #EAF7EC",
                borderRadius: "2px",
            }}
            className="badge"
            >
            {child.label}
            </label>
            {/* Nếu còn có children thì tiếp tục đệ quy */}
            {child.children.length > 0 && (
                <PermissionChildren children={child.children} />
            )}
>>>>>>> 5589d261262e08b7f46182b35bdc109a3a85e245
        </li>
      ))}
    </ul>
  );
};

const PermissionCard: React.FC<{
  node: PermissionWithChildren;
  onCheckboxChange: (value: number, checked: boolean) => void;
}> = ({ node, onCheckboxChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onCheckboxChange(node.value, checked);
  };

  return (
    <div className="card mb-3">
<<<<<<< HEAD
      <div
        className="card-header"
        style={{
          backgroundColor: "#F2F5F7", // Màu xanh lá cho quyền cha
          height: "40px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="checkbox"
          id={`permission-${node.value}`}
          checked={node.checked}
          onChange={handleCheckboxChange}
          style={{ height: "20px", width: "20px" }}
=======
      {/* Hiển thị mục cha ở Header */}
      <div className="card-header" style={{ backgroundColor: "#F2F5F7" }}> 
        <input
          type="checkbox"
          id={`permission-${node.value}`}
          style={{
            height: "20px",
            width: "20px",
          }}
>>>>>>> 5589d261262e08b7f46182b35bdc109a3a85e245
        />
        <label
          htmlFor={`permission-${node.value}`}
          style={{
<<<<<<< HEAD
            marginLeft: "9px",
            color: "#41B344", // Màu xanh lá
            fontSize: "14px",
            marginTop: "8px",
            border: "1px solid #EAF7EC",
            borderRadius: "3px",
            backgroundColor: "#EAF7EC",
            padding: "0px 2px",
          }}
=======
            border: "1px solid #EAF7EC",
            borderRadius: "2px",
            backgroundColor: "#EAF7EC",
            color: "#41B344",
          }}
          className="badge mt-2"
>>>>>>> 5589d261262e08b7f46182b35bdc109a3a85e245
        >
          {node.label}
        </label>
      </div>
      {node.children.length > 0 && (
        <div
<<<<<<< HEAD
          className="card-body"
          style={{ backgroundColor: "#F6F8FB", padding: "15px 20px" }}
=======
          className="card-body d-flex"
          style={{
            backgroundColor: "#F6F8FB",
            justifyContent: "space-between",
            paddingLeft: "10px",
          }}
>>>>>>> 5589d261262e08b7f46182b35bdc109a3a85e245
        >
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // 3 quyền con trên mỗi hàng
              gap: "10px", // Khoảng cách giữa các quyền con
            }}
          >
            {node.children.map((child) => (
              <li
                key={child.value}
                style={{ listStyle: "none", marginBottom: "8px" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="checkbox"
                    id={`permission-${child.value}`}
                    checked={child.checked}
                    onChange={(e) =>
                      onCheckboxChange(child.value, e.target.checked)
                    }
                    style={{ height: "20px", width: "20px" }}
                  />
                  <label
                    htmlFor={`permission-${child.value}`}
                    style={{
                      marginLeft: "9px",
                      color: "#206BCE", // Màu xanh nước cho quyền con
                      fontSize: "13px",
                      marginTop: "8px",
                      border: "1px solid #E9F0F9",
                      borderRadius: "3px",
                      backgroundColor: "#E9F0F9",
                      padding: "0px 2px",
                    }}
                  >
                    {child.label}
                  </label>
                </div>
                {child.children.length > 0 && (
                  <PermissionChildren
                    children={child.children}
                    onCheckboxChange={onCheckboxChange}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

<<<<<<< HEAD
interface PermissionListProps {
  onPermissionSelectedEvent: (permId: number, value: boolean) => void;
  valueDetails: any;
}

const PermissionList: React.FC<PermissionListProps> = ({
  onPermissionSelectedEvent,
  valueDetails,
}) => {
  useEffect(() => {
    console.log(valueDetails, "valueDetails");
  }, [valueDetails]);

=======
const PermissionList = ({onValueChange}) => {
>>>>>>> 5589d261262e08b7f46182b35bdc109a3a85e245
  const [permissions, setPermissions] = useState<PermissionWithChildren[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const data = await getAllPermissions();
        const permissionTree = buildTree(data);
        console.log(permissionTree, "permission tree");
        setPermissions(permissionTree);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching permissions:", error);
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  const handleCheckboxChange = (value: number, checked: boolean) => {
    const updatedPermissions = updateCheckedState(permissions, value, checked);
    setPermissions(updatedPermissions);
    onPermissionSelectedEvent(value, checked);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container">
      {permissions.map((permission) => (
<<<<<<< HEAD
        <PermissionCard
          key={permission.value}
          node={permission}
          onCheckboxChange={handleCheckboxChange}
        />
=======
            <PermissionCard key={permission.value} node={permission} />
>>>>>>> 5589d261262e08b7f46182b35bdc109a3a85e245
      ))}
    </div>
  );
};

export default PermissionList;
