import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { ReactComponent as SortAscIcon } from "../../assets/icons/sortArrowAsc.svg";
import { ReactComponent as SortDescIcon } from "../../assets/icons/sortArrowDesc.svg";

export interface TableColumn<T> {
  title: string;
  titleRender?: () => React.ReactNode;
  field: keyof T;
  width?: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

export interface TableFilter<T> {
  filterColumn: keyof T | "";
  filterValue: string;
}

export interface TableProps<T> {
  data?: T[];
  columns: TableColumn<T>[];
  filters?: TableFilter<T>[];
  sortDataBy?: keyof T;
  sortDirectionTo?: "asc" | "desc";
  backgroundColorBy?: keyof T;
  alternateText?: string;
}

const DataTable = <T extends object>({
  data,
  columns,
  filters,
  sortDataBy,
  sortDirectionTo,
  backgroundColorBy,
  alternateText,
}: TableProps<T>) => {
  const [filteredData, setFilteredData] = useState(data);

  //Sets First Column as Default Sort unless specified
  const [sortBy, setSortBy] = useState<keyof T>(
    sortDataBy ? sortDataBy : columns[0].field
  );
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  //Sets Default Sort Direction as Descending unless specified
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    sortDirectionTo ? sortDirectionTo : "desc"
  );

  //Sets Sort column on table header cell click
  const handleSort = (key: keyof T) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDirection("desc");
    }
  };

  //Applies data filters based on values passed in filters object
  useEffect(() => {
    if (!filters) {
      setFilteredData(data);
      return;
    }
    setFilteredData(
      data && filters
        ? data.filter((row) => {
            return filters.every((filter) => {
              //applies filter for "All"
              if (filter.filterColumn === "") {
                return columns.some((col) => {
                  return String(row[col.field])
                    .toLowerCase()
                    .includes(filter.filterValue.toLowerCase());
                });
              }
              //applies filter for selected field
              return String(row[filter.filterColumn])
                .toLowerCase()
                .includes(filter.filterValue.toLowerCase());
            });
          })
        : data
    );
  }, [data, filters]);

  //Applies data sorting based on values of sortBy and sortDirection
  const sortedData = filteredData?.sort((a, b) => {
    if (sortBy && a[sortBy] < b[sortBy]) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (sortBy && a[sortBy] > b[sortBy]) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });
  return (
    <>
      {/* Render a table */}
      <Box sx={{ width: "100%", overflowY: "auto", maxHeight: "860px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ backgroundColor: "#EEEEEE" }}
                  key={column.field as string}
                  width={column.width}
                  onClick={() => column.sortable && handleSort(column.field)}
                >
                  <Box display="flex" flexDirection="row">
                    {column.titleRender ? (
                      column.titleRender()
                    ) : (
                      <Typography
                        id={column.title}
                        fontSize="14px"
                        fontWeight="bold"
                      >
                        {column.title}
                      </Typography>
                    )}
                    {column.sortable &&
                      (sortBy === column.field ? (
                        sortDirection === "asc" ? (
                          <SortAscIcon id="AscendingIcon" />
                        ) : (
                          <SortDescIcon id="DescendingIcon" />
                        )
                      ) : (
                        <Box width="24px" height="24px" />
                      ))}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            id={
              alternateText || (sortedData && sortedData.length === 0)
                ? "NoData"
                : "TableData"
            }
          >
            {alternateText ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  style={{
                    height: "200px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {alternateText}
                </TableCell>
              </TableRow>
            ) : sortedData ? (
              sortedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    style={{
                      height: "200px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Sorry, there is no matching data to display.
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: backgroundColorBy
                        ? row[backgroundColorBy]
                          ? "transparent"
                          : "#FFF7E0 !important"
                        : null,
                    }}
                  >
                    {columns.map((column) => {
                      if (column.render) {
                        return (
                          <TableCell
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "20px",
                            }}
                            key={column.field as string}
                          >
                            {column.render(row)}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell
                          style={{ paddingTop: "20px", paddingBottom: "20px" }}
                          key={column.field as string}
                        >
                          <Typography fontSize="14px" fontWeight="400">
                            {String(row[column.field])}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )
            ) : (
              <>
                {[1, 2, 3].map((_, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell colSpan={columns.length}>
                        <Skeleton />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default DataTable;
