import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import { u as useServerFn, a as useClientTable, i as includesTrimmed, g as dateRange, D as DataTableColumnHeader } from "./use-client-table-B4Wc_vXV.mjs";
import { useMemo } from "react";
import { toast } from "sonner";
import { D as DataTable, a as DataTableToolbar, T as TextAlignStart, C as Calendar } from "./data-table-toolbar-BeuYfs9O.mjs";
import { e as createLucideIcon, u as useSession, L as LoaderCircle, f as exportHaircutHistoryExcel, B as Button } from "./router-PksdRzJZ.mjs";
import { a as getHaircutHistory } from "./barcode-fn-C7viNX70.mjs";
import "@radix-ui/react-dropdown-menu";
import "./config-CZfDNatN.mjs";
import "@libsql/client";
import "dotenv";
import "drizzle-orm/libsql";
import "@t3-oss/env-core";
import "zod";
import "drizzle-orm";
import "drizzle-orm/sqlite-core";
import "clsx";
import "nanoid";
import "tailwind-merge";
import "uploadthing/server";
import "@radix-ui/react-select";
import "@tanstack/react-table";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "cmdk";
import "@radix-ui/react-popover";
import "./input-h-pL-VAR.mjs";
import "react-day-picker";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-separator";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "better-auth/client/plugins";
import "better-auth/react";
import "next-themes";
import "better-auth";
import "better-auth/adapters/drizzle";
import "better-auth/plugins";
import "better-auth/react-start";
import "./server.mjs";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "@radix-ui/react-label";
import "canvas";
import "qrcode";
const __iconNode$1 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M8 13h2", key: "yr2amv" }],
  ["path", { d: "M14 13h2", key: "un5t4a" }],
  ["path", { d: "M8 17h2", key: "2yhykz" }],
  ["path", { d: "M14 17h2", key: "10kma7" }]
];
const FileSpreadsheet = createLucideIcon("file-spreadsheet", __iconNode);
function COLUMNS_HAIRCUT_HISTORY() {
  return [
    {
      id: "no",
      accessorKey: "no",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "No" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.index + 1 }),
      minSize: 40,
      maxSize: 40,
      enableSorting: false,
      enablePinning: false,
      enableHiding: false
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Name" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("name") }),
      meta: {
        label: "Name",
        placeholder: "Search Name...",
        variant: "text",
        icon: TextAlignStart
      },
      filterFn: includesTrimmed,
      enableColumnFilter: true
    },
    {
      id: "position",
      accessorKey: "position",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Instansi" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("position") }),
      meta: {
        label: "Instansi",
        placeholder: "Search instansi...",
        variant: "combobox",
        icon: Briefcase
      },
      enableColumnFilter: true
    },
    {
      accessorKey: "badge",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Badge" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("badge") })
    },
    {
      id: "haircutDate",
      accessorKey: "haircutDate",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Date" }),
      cell: ({ row }) => {
        const haircutDate = row.getValue("haircutDate");
        if (haircutDate instanceof Date && !Number.isNaN(haircutDate.getTime())) {
          return /* @__PURE__ */ jsx("div", { children: haircutDate.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          }) });
        }
        return /* @__PURE__ */ jsx("div", { children: "-" });
      },
      meta: {
        label: "Haircut Date",
        placeholder: "Search Haircut Date...",
        variant: "dateRange",
        icon: Calendar
      },
      filterFn: dateRange,
      enableColumnFilter: true,
      minSize: 200,
      maxSize: 200
    },
    {
      accessorKey: "formattedTime",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Time" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("formattedTime") })
    },
    {
      accessorKey: "monthYear",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Month & Year" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("monthYear") })
    }
  ];
}
function DataTableHaircut({
  data,
  username
}) {
  const exportExcelFn = useServerFn(exportHaircutHistoryExcel);
  const columns = useMemo(() => {
    return COLUMNS_HAIRCUT_HISTORY();
  }, []);
  const { table } = useClientTable({
    defaultColumn: {
      minSize: 160
    },
    data,
    columns,
    getRowId: (originalRow) => originalRow.id
  });
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const columnFilters = table.getState().columnFilters;
      const dateFilter = columnFilters.find(
        (filter) => filter.id === "haircutDate"
      );
      let range;
      if (dateFilter?.value && Array.isArray(dateFilter.value)) {
        const [from, to] = dateFilter.value;
        if (from && to) {
          range = [from, to];
        }
      }
      const response = await exportExcelFn({
        data: range ? { range } : void 0
      });
      const blob = await response.blob();
      return blob;
    },
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `haircut-history-${(/* @__PURE__ */ new Date()).toISOString()}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  });
  const handleExportExcel = () => {
    toast.promise(mutateAsync(), {
      loading: "Exporting Excel...",
      success: "Excel exported successfully",
      error: "Failed to export Excel"
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(DataTable, { className: "py-3", table, children: /* @__PURE__ */ jsx(DataTableToolbar, { table, children: username === "admin" && /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "outline",
      size: "sm",
      className: "h-8",
      onClick: handleExportExcel,
      children: [
        "Export Excel",
        /* @__PURE__ */ jsx(FileSpreadsheet, { className: "ml-2 h-4 w-4" })
      ]
    }
  ) }) }) });
}
function RouteComponent() {
  const getData = useServerFn(getHaircutHistory);
  const {
    data: history,
    isLoading
  } = useQuery({
    queryKey: ["haircut-history"],
    queryFn: () => getData()
  });
  const {
    data: session,
    isPending
  } = useSession();
  if (isPending) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-screen", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "size-10 animate-spin" }) });
  }
  return !session ? /* @__PURE__ */ jsx(Navigate, { to: "/signin" }) : isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-screen", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "size-10 animate-spin" }) }) : /* @__PURE__ */ jsx(DataTableHaircut, { username: session?.user.username || "", data: history?.data || [] });
}
export {
  RouteComponent as component
};
