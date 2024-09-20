import { getAllPermissions } from "@app/services/permissions";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import React, { useEffect, useState } from "react"; // Giả sử đây là nơi chứa API service

interface Permission {
  label: string;
  value: number;
  extra: number | null;
}

interface PermissionWithChildren extends Permission {
  children: PermissionWithChildren[];
}

const buildTree = (permissions: Permission[]) => {
  const map = new Map<number, PermissionWithChildren>();

  permissions.forEach((permission) => {
    map.set(permission.value, { ...permission, children: [] });
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

// Component hiển thị các mục con (bao gồm con của con)
const PermissionChildren: React.FC<{ children: PermissionWithChildren[] }> = ({
  children,
}) => {
  return (
    <ul>
      {children.map((child) => (
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
        </li>
      ))}
    </ul>
  );
};

// Component hiển thị Card
const PermissionCard: React.FC<{ node: PermissionWithChildren }> = ({
  node,
}) => {
  return (
    <div className="card mb-3">
      {/* Hiển thị mục cha ở Header */}
      <div className="card-header" style={{ backgroundColor: "#F2F5F7" }}> 
        <input
          type="checkbox"
          id={`permission-${node.value}`}
          style={{
            height: "20px",
            width: "20px",
          }}
        />
        <label
          htmlFor={`permission-${node.value}`}
          style={{
            border: "1px solid #EAF7EC",
            borderRadius: "2px",
            backgroundColor: "#EAF7EC",
            color: "#41B344",
          }}
          className="badge mt-2"
        >
          {node.label}
        </label>
      </div>
      {/* Hiển thị các mục con ở Body */}
      {node.children.length > 0 && (
        <div
          className="card-body d-flex"
          style={{
            backgroundColor: "#F6F8FB",
            justifyContent: "space-between",
            paddingLeft: "10px",
          }}
        >
          <PermissionChildren children={node.children} />
        </div>
      )}
    </div>
  );
};

const PermissionList = ({onValueChange}) => {
  const [permissions, setPermissions] = useState<PermissionWithChildren[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const data = await getAllPermissions();
        const permissionTree = buildTree(data);
        setPermissions(permissionTree);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching permissions:", error);
        setLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container">
      {permissions.map((permission) => (
            <PermissionCard key={permission.value} node={permission} />
      ))}
    </div>
  );
};

export default PermissionList;
