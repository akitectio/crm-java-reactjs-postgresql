import { getAllPermissions } from "@app/services/permissions";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef, useState } from "react";

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
  valueDetails?: any;
  onCheckboxChange: (value: number, checked: boolean) => void;
}> = ({ children, onCheckboxChange, valueDetails }) => {
  return (
    <ul style={{ paddingLeft: "25px" }}>
      {children.map((child) => (
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
        </li>
      ))}
    </ul>
  );
};

const PermissionCard: React.FC<{
  node: PermissionWithChildren;
  onCheckboxChange: (value: number, checked: boolean) => void;
  valueDetails?: any;
}> = ({ node, onCheckboxChange, valueDetails }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    onCheckboxChange(node.value, checked);
  };
  const [tree, setTree] = useState<any>([]);
  const ignoreEffectRef = useRef(false); // Đánh dấu khi onChange được gọi

  useEffect(() => {
    // Chỉ chạy nếu không đến từ onChange
    if (!ignoreEffectRef.current) {
      if (
        !node.children ||
        !Array.isArray(node.children) ||
        !valueDetails?.permissions
      ) {
        setTree(node.children);
      }
      const updateCheckedStatus = (tree, permissions) => {
        return tree.map((node) => {
          const matchedPermission = permissions.find(
            (perm) => perm.id === node.value
          );

          if (matchedPermission) {
            node.checked = matchedPermission.checked;
          }

          if (node.children && node.children.length > 0) {
            node.children = updateCheckedStatus(node.children, permissions);
          }

          return node;
        });
      };

      if (
        Array.isArray(valueDetails?.permissions) &&
        valueDetails.permissions.length > 0
      ) {
        const updatedTree = updateCheckedStatus(
          node.children,
          valueDetails.permissions
        );
        setTree(updatedTree);
      }
    } else {
      ignoreEffectRef.current = false; // Reset lại flag sau khi onChange
    }
  }, [node.children, valueDetails?.permissions]);

  const updateSingleCheckbox = (
    tree: any[],
    value: any,
    isChecked: boolean
  ): any[] => {
    return tree.map((item: any) => {
      // Nếu item có giá trị value bằng với value truyền vào, cập nhật checked của nó
      if (item.value === value) {
        return { ...item, checked: isChecked };
      }

      // Nếu item có children, tiếp tục kiểm tra trong children
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: updateSingleCheckbox(item.children, value, isChecked),
        };
      }

      // Nếu không thay đổi gì, trả về item ban đầu
      return item;
    });
  };

  // Sử dụng hàm này trong onChange
  const handleCheckboxChangeChildren = (value: any, isChecked: boolean) => {
    ignoreEffectRef.current = true; // Đánh dấu để bỏ qua effect khi onChange
    const updatedTree = updateSingleCheckbox(tree, value, isChecked);
    console.log(updatedTree, "dffdfd");
    setTree(updatedTree);
  };

  useEffect(() => {
    console.log(tree, "treetreetree");
  }, [tree]);
  return (
    <div className="card mb-3">
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
        />
        <label
          htmlFor={`permission-${node.value}`}
          style={{
            marginLeft: "9px",
            color: "#41B344", // Màu xanh lá
            fontSize: "14px",
            marginTop: "8px",
            border: "1px solid #EAF7EC",
            borderRadius: "3px",
            backgroundColor: "#EAF7EC",
            padding: "0px 2px",
          }}
        >
          {node.label}
        </label>
      </div>
      {node.children.length > 0 && (
        <div
          className="card-body"
          style={{ backgroundColor: "#F6F8FB", padding: "15px 20px" }}
        >
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // 3 quyền con trên mỗi hàng
              gap: "10px", // Khoảng cách giữa các quyền con
            }}
          >
            {Array.isArray(tree) &&
              tree?.length > 0 &&
              tree?.map((child: any, index: any) => (
                <li
                  key={child.value}
                  style={{ listStyle: "none", marginBottom: "8px" }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="checkbox"
                      id={`permission-${child.value}`}
                      checked={child.checked}
                      onChange={(e) => {
                        handleCheckboxChangeChildren(
                          child.value,
                          e.target.checked
                        );
                        onCheckboxChange(child.value, e.target.checked);
                      }}
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
                      valueDetails={valueDetails}
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

interface PermissionListProps {
  onPermissionSelectedEvent: (permId: number, value: boolean) => void;
  valueDetails?: any;
}

const PermissionList: React.FC<PermissionListProps> = ({
  onPermissionSelectedEvent,
  valueDetails,
}) => {
  useEffect(() => {
    // console.log(valueDetails, "valueDetails");
  }, [valueDetails]);

  const [permissions, setPermissions] = useState<PermissionWithChildren[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const data = await getAllPermissions();
        const permissionTree = buildTree(data);
        // console.log(permissionTree, "permission tree");
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
        <PermissionCard
          key={permission.value}
          node={permission}
          onCheckboxChange={handleCheckboxChange}
          valueDetails={valueDetails}
        />
      ))}
    </div>
  );
};

export default PermissionList;
