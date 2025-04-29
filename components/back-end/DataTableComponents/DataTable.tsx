// "use client";

// import * as React from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   flexRender,
//   getCoreRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useState } from "react";
// import SearchBar from "./SearchBar";
// import DateRangeFilter from "./DateRangeFilter";
// import DateFilters from "./DateFilters";
// import { DataTableViewOptions } from "./DataTableViewOptions";
// import { DataTablePagination } from "./DataTablePagination";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   model?: string;
//   searchPlaceholder?: string;
// }
// export default function DataTable<TData, TValue>({
//   columns,
//   data,
//   model = "",
//   searchPlaceholder = "",
// }: DataTableProps<TData, TValue>) {
//   const [rowSelection, setRowSelection] = useState({});
//   const [columnVisibility, setColumnVisibility] = useState({});
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [searchResults, setSearchResults] = useState(data);
//   const [filteredData, setFilteredData] = useState(data);
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [isSearch, setIsSearch] = useState(true);
//   // console.log(isSearch);
//   const table = useReactTable({
//     data: isSearch ? searchResults : filteredData,
//     columns,
//     state: {
//       sorting,
//       columnVisibility,
//       rowSelection,
//       columnFilters,
//     },
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//   });
//   // console.log(searchResults);
//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center gap-8">
//         <div className="flex-1 w-full">
//           <SearchBar
//             data={data}
//             onSearch={setSearchResults}
//             setIsSearch={setIsSearch}
//           />
//         </div>
//         <div className="flex items-center gap-2 ">
//           <DateRangeFilter
//             className="hidden md:block"
//             data={data}
//             onFilter={setFilteredData}
//             setIsSearch={setIsSearch}
//           />
//           <DateFilters
//             data={data}
//             onFilter={setFilteredData}
//             setIsSearch={setIsSearch}
//           />

//           <DataTableViewOptions table={table} />
//         </div>
//       </div>

//       <div className="rounded-md border overflow-x-scroll">
//         <Table className="overflow-x-scroll">
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id} colSpan={header.colSpan}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <DataTablePagination table={table} />
//     </div>
//   );
// }

"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import SearchBar from "./SearchBar";
import DateRangeFilter from "./DateRangeFilter";
import DateFilters from "./DateFilters";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  model?: string;
  searchPlaceholder?: string;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  model = "",
  searchPlaceholder = "",
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [searchResults, setSearchResults] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isSearch, setIsSearch] = useState(true);

  const table = useReactTable({
    data: isSearch ? searchResults : filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="space-y-4">
      {/* Responsive controls section */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center sm:gap-4">
        <div className="w-full sm:flex-1">
          <SearchBar
            data={data}
            onSearch={setSearchResults}
            setIsSearch={setIsSearch}
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 justify-between sm:justify-end">
          <DateRangeFilter
            className="hidden md:block"
            data={data}
            onFilter={setFilteredData}
            setIsSearch={setIsSearch}
          />
          <DateFilters
            data={data}
            onFilter={setFilteredData}
            setIsSearch={setIsSearch}
          />
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Responsive table container */}
      <div className="rounded-md border overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className="whitespace-nowrap"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="max-w-[200px] sm:max-w-[300px] overflow-hidden text-ellipsis"
                      >
                        <div className="truncate">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Responsive pagination */}
      <div className="w-full overflow-x-auto">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
