import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import React, { useEffect, useState } from "react";
import { updatePaginationInfo } from "./PaginationInfo";

interface PropsPagination {
  page: number;
  items_per_page: number;
  totalRecords: number;
  dataTable: any;
  onRowsChange?: any;
  onPageChange?: any;
  setPage?: any;
}

function PaginationCustom(props: PropsPagination) {
  const [goToPage, setGoToPage] = useState<any>(
    props?.page / props.items_per_page + 1
  );

  useEffect(() => {
    setGoToPage(props?.page / props.items_per_page + 1);
  }, [props?.page]);

  const dropdownOptions = [
    { label: 10, value: 10 },
    { label: 25, value: 25 },
    { label: 50, value: 50 },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        width: "100%",
      }}
    >
      <div>
        {" "}
        {/* <select value={props?.items_per_page} onChange={props?.onRowsChange}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select> */}
        <Dropdown
          value={props?.items_per_page}
          options={dropdownOptions}
          onChange={props?.onRowsChange}
        />
        <span style={{ paddingRight: 5 }}> bản ghi/trang </span>
        {updatePaginationInfo(
          props?.page / props?.items_per_page,
          props?.items_per_page,
          props?.totalRecords,
          props?.dataTable
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Paginator
          first={props?.page}
          rows={props?.items_per_page}
          totalRecords={props?.totalRecords}
          onPageChange={(e) => {
            props?.onPageChange(e);
          }}
        />
        <div>
          <span style={{ paddingRight: 10 }}>|</span>
          <span style={{ paddingRight: 10 }}>Đi tới trang</span>
          <InputText
            size={2}
            className="ml-1"
            value={goToPage}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === "Enter") {
                if (Number(event.currentTarget.value) === 0) {
                  return null;
                } else {
                  props?.setPage(
                    Number(event.currentTarget.value) * props?.items_per_page -
                      props?.items_per_page
                  );
                }
              }
            }}
            onKeyPress={(e) => {
              if (
                e.key === "-" ||
                e.key === "−" ||
                e.key === "." ||
                e.key === ","
              ) {
                e.preventDefault();
              }
            }}
            onChange={(event: any) => {
              console.log(event, "gôtpage");
              setGoToPage(event?.target.value);
            }}
          />
          {/* <input
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                if (Number(event.currentTarget.value) === 0) {
                  return null
                } else {
                  props?.setPage(
                    Number(event.currentTarget.value) * props?.items_per_page -
                      props?.items_per_page
                  )
                }
              }
            }}
            style={{width: 50}}
            type='number'
            min='1'
            onKeyPress={(e) => {
              if (e.key === '-' || e.key === '−' || e.key === '.' || e.key === ',') {
                e.preventDefault()
              }
            }}
            onChange={(event: any) => {
              setGoToPage(event?.target.value)
            }}
            value={goToPage}
          ></input> */}
        </div>
      </div>
    </div>
  );
}

export default PaginationCustom;
