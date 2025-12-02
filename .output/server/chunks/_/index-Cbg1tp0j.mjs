import { jsx, jsxs } from "react/jsx-runtime";
import { Navigate } from "@tanstack/react-router";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { u as useServerFn, a as useClientTable, D as DataTableColumnHeader, T as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, f as DataTablePagination } from "./use-client-table-B4Wc_vXV.mjs";
import React__default, { useRef, useEffect, useMemo } from "react";
import { flexRender } from "@tanstack/react-table";
import { c as cn } from "./config-CZfDNatN.mjs";
import { s as scanBarcode, b as getPreviewHaircut } from "./barcode-fn-C7viNX70.mjs";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { u as useSession, L as LoaderCircle, F as Field, a as FieldLabel, b as FieldError, B as Button } from "./router-PksdRzJZ.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-fDatpBMZ.mjs";
import { I as Input } from "./input-h-pL-VAR.mjs";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-select";
import "@libsql/client";
import "dotenv";
import "drizzle-orm/libsql";
import "@t3-oss/env-core";
import "drizzle-orm";
import "drizzle-orm/sqlite-core";
import "clsx";
import "nanoid";
import "tailwind-merge";
import "uploadthing/server";
import "./server.mjs";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "canvas";
import "qrcode";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-separator";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "better-auth/client/plugins";
import "better-auth/react";
import "next-themes";
import "better-auth";
import "better-auth/adapters/drizzle";
import "better-auth/plugins";
import "better-auth/react-start";
import "@radix-ui/react-label";
function DataTableSticky({
  table,
  onRowClick,
  renderSubComponent,
  showPagination = true,
  children,
  className,
  ...props
}) {
  const getColumnStyles = (header) => {
    return {
      width: header.getSize() !== 150 ? header.getSize() : void 0,
      position: "sticky",
      top: 0,
      zIndex: 10
    };
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full space-y-2.5", className), ...props, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "rounded-md border max-h-[300px] overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "overflow-y-auto max-h-[300px]", children: /* @__PURE__ */ jsxs("table", { className: "[&_td]:border-border [&_th]:border-border w-full table-fixed border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b", children: [
      /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { className: "bg-muted/50", children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
        TableHead,
        {
          colSpan: header.colSpan,
          className: "h-10 truncate bg-muted/95 backdrop-blur-sm first:rounded-tl-md last:rounded-tr-md",
          style: { ...getColumnStyles(header) },
          children: header.isPlaceholder ? null : flexRender(
            header.column.columnDef.header,
            header.getContext()
          )
        },
        header.id
      )) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
        /* @__PURE__ */ jsx(
          TableRow,
          {
            className: onRowClick ? "cursor-pointer" : "",
            onClick: () => onRowClick?.(row.original),
            "data-state": row.getIsSelected() && "selected",
            children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
              TableCell,
              {
                className: "truncate",
                style: {
                  width: cell.column.getSize() !== 150 ? cell.column.getSize() : void 0
                },
                children: flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )
              },
              cell.id
            ))
          }
        ),
        row.getIsExpanded() && renderSubComponent && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: row.getVisibleCells().length, children: renderSubComponent({ row }) }) })
      ] }, `fragment-${row.id}`)) : /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
        TableCell,
        {
          colSpan: table.getAllColumns().length,
          className: "h-24 text-center",
          children: "No results."
        }
      ) }) })
    ] }) }) }),
    showPagination && /* @__PURE__ */ jsx(DataTablePagination, { table })
  ] });
}
function COLUMNS_PREVIEW_HAIRCUT() {
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
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("name") })
    },
    {
      id: "position",
      accessorKey: "position",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Instansi" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("position") }),
      minSize: 250,
      maxSize: 250
    },
    {
      accessorKey: "badge",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Badge" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("badge") }),
      minSize: 250,
      maxSize: 250
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
      minSize: 200,
      maxSize: 200
    },
    {
      accessorKey: "formattedTime",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Time" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("formattedTime") })
    }
  ];
}
function PreviewDsb() {
  const getData = useServerFn(getPreviewHaircut);
  const { data: preview, isLoading } = useQuery({
    queryKey: ["preview-haircut"],
    queryFn: () => getData()
  });
  const columns = useMemo(() => {
    return COLUMNS_PREVIEW_HAIRCUT();
  }, []);
  const { table } = useClientTable({
    enableColumnPinning: false,
    enableSorting: false,
    enableColumnResizing: false,
    enableHiding: false,
    defaultColumn: {
      minSize: 160
    },
    data: preview?.data || [],
    columns,
    getRowId: (originalRow) => originalRow.id,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 9999
      }
    }
  });
  useEffect(() => {
    if (preview?.data && preview.data.length > 0) {
      table.setPageSize(preview.data.length);
    }
  }, [preview?.data, table]);
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Loading preview..." }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(DataTableSticky, { className: "py-3", table, showPagination: false }) });
}
function ScanDsb() {
  const scanBarcodeFn = useServerFn(scanBarcode);
  const queryClient = useQueryClient();
  const inputRef = useRef(null);
  const form = useForm({
    defaultValues: {
      id: ""
    },
    validators: {
      onSubmit: z.object({
        id: z.string().min(1, "Scan ID tidak boleh kosong")
      })
    },
    onSubmit: async ({ value }) => {
      toast.promise(mutateAsync({ data: value }), {
        loading: "Scanning..."
      });
    }
  });
  const { mutateAsync } = useMutation({
    mutationFn: scanBarcodeFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["haircut-history"] });
      toast.success(data.message);
      form.reset();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    },
    onError: (error) => {
      toast.error(error.message);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  });
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Scan Barcode" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          form.handleSubmit();
        },
        className: "flex gap-2 items-center w-full",
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx(form.Field, { name: "id", children: (field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return /* @__PURE__ */ jsxs(Field, { "data-invalid": isInvalid, children: [
              /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Instansi" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  ref: inputRef,
                  value: field.state.value,
                  onChange: (e) => {
                    field.handleChange(e.target.value);
                  },
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && field.state.value.trim()) {
                      e.preventDefault();
                      form.handleSubmit();
                    }
                  },
                  onBlur: () => {
                    setTimeout(() => {
                      if (document.activeElement?.tagName !== "BUTTON") {
                        inputRef.current?.focus();
                      }
                    }, 100);
                  },
                  autoFocus: true,
                  placeholder: "Scan ID Barcode..."
                }
              ),
              isInvalid && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
            ] });
          } }) }),
          /* @__PURE__ */ jsx(form.Subscribe, { selector: (state) => state.isSubmitting, children: (isSubmitting) => /* @__PURE__ */ jsx(Button, { type: "submit", disabled: isSubmitting, className: "mt-7.5", children: isSubmitting ? "Scanning..." : "Scan" }) })
        ]
      }
    ) })
  ] });
}
function App() {
  const {
    data: session,
    isPending
  } = useSession();
  if (isPending) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-screen", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "size-10 animate-spin" }) });
  }
  return !session ? /* @__PURE__ */ jsx(Navigate, { to: "/signin" }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between pe-4", children: [
    /* @__PURE__ */ jsx(ScanDsb, {}),
    /* @__PURE__ */ jsx(PreviewDsb, {})
  ] });
}
export {
  App as component
};
