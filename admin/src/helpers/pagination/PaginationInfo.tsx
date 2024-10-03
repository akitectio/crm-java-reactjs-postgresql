import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export function updatePaginationInfo(
  page: number,
  perPage: number,
  totalRecords: number,
  listData: any
) {
  const startRecord = page * perPage + 1;
  const endRecord = (page + 1) * perPage;
  return listData?.length > 0 ? (
    <>
      <FontAwesomeIcon
        icon={faCircle}
        style={{ color: "black", fontSize: 8, paddingRight: 5 }}
      />
      <span>
        {`Hiển thị ${startRecord}-${
          totalRecords < endRecord ? totalRecords : endRecord
        } trên tổng số ${totalRecords} bản ghi`}{" "}
      </span>
    </>
  ) : (
    <></>
  );
}

export function useDebounce(value: string | undefined, delay: number) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export function removeNullFields(obj: any) {
  const filteredObj: any = {};
  for (const key in obj) {
    if (
      obj[key] !== null &&
      obj[key] !== "null" &&
      obj[key] !== "" &&
      obj[key] !== "all" &&
      obj[key] !== undefined
    ) {
      filteredObj[key] = obj[key];
    }
  }
  return filteredObj;
}
