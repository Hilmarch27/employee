import { jsxs, jsx } from "react/jsx-runtime";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { u as useServerFn, F as Field, a as FieldLabel, I as Input, b as FieldError, c as useClientTable, D as DataTable, d as DataTableToolbar, i as includesTrimmed, T as TextAlignStart, e as dateRange, C as Calendar, f as DataTableColumnHeader } from "./use-client-table-BQI0SkUq.mjs";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import { c as createLucideIcon, B as Button, e as exportHaircutHistoryExcel } from "./router-DBSpapjr.mjs";
import { c as cn } from "./config-CJ6AisJq.mjs";
import { a as getHaircutHistory, s as scanBarcode } from "./barcode-fn-DrcdRNF3.mjs";
import { useMemo } from "react";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@tanstack/react-table";
import "@radix-ui/react-select";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "cmdk";
import "@radix-ui/react-popover";
import "react-day-picker";
import "@radix-ui/react-dropdown-menu";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-separator";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "next-themes";
import "uploadthing/server";
import "drizzle-orm";
import "./server.mjs";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "@libsql/client";
import "dotenv";
import "drizzle-orm/libsql";
import "@t3-oss/env-core";
import "drizzle-orm/sqlite-core";
import "clsx";
import "nanoid";
import "tailwind-merge";
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
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function ScanDsb() {
  const scanBarcodeFn = useServerFn(scanBarcode);
  const queryClient = useQueryClient();
  const form = useForm({
    defaultValues: {
      id: ""
    },
    validators: {
      onSubmit: z.object({
        id: z.string().min(1)
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
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
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
                  value: field.state.value,
                  onChange: (e) => {
                    field.handleChange(e.target.value);
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
function DataTableHaircut({ data }) {
  const exportExcelFn = useServerFn(exportHaircutHistoryExcel);
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const response = await exportExcelFn({});
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
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(DataTable, { className: "py-3 mt-10", table, children: /* @__PURE__ */ jsx(DataTableToolbar, { table, children: /* @__PURE__ */ jsxs(
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
function App() {
  const getData = useServerFn(getHaircutHistory);
  const {
    data: history,
    isLoading
  } = useQuery({
    queryKey: ["haircut-history"],
    queryFn: () => getData()
  });
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between pe-5", children: [
    /* @__PURE__ */ jsx(ScanDsb, {}),
    isLoading ? /* @__PURE__ */ jsx("div", { children: "Loading..." }) : /* @__PURE__ */ jsx(DataTableHaircut, { data: history?.data || [] })
  ] });
}
export {
  App as component
};
