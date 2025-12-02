import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import { u as useServerFn, a as useClientTable, i as includesTrimmed, g as dateRange, D as DataTableColumnHeader, C as Check, h as DropdownMenu, j as DropdownMenuTrigger, k as DropdownMenuContent, l as DropdownMenuItem, m as DropdownMenuSeparator, n as DropdownMenuShortcut } from "./use-client-table-B4Wc_vXV.mjs";
import { useForm } from "@tanstack/react-form";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { D as DataTable, a as DataTableToolbar, T as TextAlignStart, C as Calendar, E as Ellipsis } from "./data-table-toolbar-BeuYfs9O.mjs";
import { e as createLucideIcon, u as useSession, L as LoaderCircle, g as getEmployees, h as createEmployee, i as deleteEmployee, j as updateEmployee, U as UpdateEmployeeSc, C as CreateEmployeeSc, B as Button, d as FieldGroup, F as Field, a as FieldLabel, b as FieldError, X, k as buttonVariants } from "./router-PksdRzJZ.mjs";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { c as cn, f as formatDateTime } from "./config-CZfDNatN.mjs";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { I as Input } from "./input-h-pL-VAR.mjs";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-select";
import "@tanstack/react-table";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "cmdk";
import "@radix-ui/react-popover";
import "./barcode-fn-C7viNX70.mjs";
import "./server.mjs";
import "node:async_hooks";
import "@tanstack/react-router/ssr/server";
import "canvas";
import "drizzle-orm";
import "qrcode";
import "zod";
import "react-day-picker";
import "@tanstack/react-router-ssr-query";
import "@radix-ui/react-separator";
import "@radix-ui/react-tooltip";
import "better-auth/client/plugins";
import "better-auth/react";
import "next-themes";
import "better-auth";
import "better-auth/adapters/drizzle";
import "better-auth/plugins";
import "better-auth/react-start";
import "uploadthing/server";
import "@radix-ui/react-label";
import "@libsql/client";
import "dotenv";
import "drizzle-orm/libsql";
import "@t3-oss/env-core";
import "drizzle-orm/sqlite-core";
import "clsx";
import "nanoid";
import "tailwind-merge";
const __iconNode = [
  ["path", { d: "M2 21a8 8 0 0 1 13.292-6", key: "bjp14o" }],
  ["circle", { cx: "10", cy: "8", r: "5", key: "o932ke" }],
  ["path", { d: "M19 16v6", key: "tddt3s" }],
  ["path", { d: "M22 19h-6", key: "vcuq98" }]
];
const UserRoundPlus = createLucideIcon("user-round-plus", __iconNode);
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            SheetPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(X, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DataTableRowActions({
  row,
  table
}) {
  const tableMeta = table.options.meta;
  function rowActions({ action }) {
    if (!tableMeta?.rowActions)
      throw new Error("rowActions function is required");
    if (action === "delete") {
      tableMeta.rowActions({ row, variant: "delete" });
    }
    if (action === "edit") {
      tableMeta.rowActions({ row, variant: "edit" });
    }
  }
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "data-[state=open]:bg-muted size-8",
        children: [
          /* @__PURE__ */ jsx(Ellipsis, {}),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open menu" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-[160px]", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: () => rowActions({ action: "edit" }), children: "Edit" }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          variant: "destructive",
          onClick: () => rowActions({ action: "delete" }),
          children: [
            "Delete",
            /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⌘⌫" })
          ]
        }
      )
    ] })
  ] });
}
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx(
      AlertDialogPrimitive.Content,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ jsx(Check, { className: "size-3.5" })
        }
      )
    }
  );
}
function COLUMNS_EMPLOYEES(username) {
  const baseColumns = [
    {
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
      accessorKey: "position",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Instansi" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("position") })
    },
    {
      accessorKey: "badge",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Badge" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: row.getValue("badge") })
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Created At" }),
      cell: ({ row }) => /* @__PURE__ */ jsx("div", { children: formatDateTime(row.getValue("createdAt")) }),
      meta: {
        label: "Created At",
        placeholder: "Search Created At...",
        variant: "dateRange",
        icon: Calendar
      },
      filterFn: dateRange,
      enableColumnFilter: true
    }
  ];
  if (username === "admin") {
    baseColumns.unshift({
      id: "select",
      header: ({ table }) => {
        return /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && "indeterminate",
            onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
            "aria-label": "Select all",
            className: "translate-y-[2px] mb-2"
          }
        );
      },
      cell: ({ row }) => {
        return /* @__PURE__ */ jsx(
          Checkbox,
          {
            checked: row.getIsSelected(),
            onCheckedChange: (value) => row.toggleSelected(!!value),
            "aria-label": "Select row",
            className: "translate-y-[2px] mb-2"
          }
        );
      },
      minSize: 30,
      maxSize: 30,
      enableResizing: false,
      enablePinning: false,
      enableSorting: false,
      enableHiding: false
    });
    baseColumns.push(
      {
        id: "barcodeUrl",
        accessorKey: "barcodeUrl",
        header: ({ column }) => /* @__PURE__ */ jsx(DataTableColumnHeader, { column, title: "Barcode" }),
        cell: ({ row }) => {
          const barcodeUrl = row.getValue("barcodeUrl");
          if (!barcodeUrl) return null;
          const fullUrl = `${barcodeUrl}`;
          const handleDownload = () => {
            const link = document.createElement("a");
            link.href = fullUrl;
            const fileName = typeof barcodeUrl === "string" && barcodeUrl.split ? barcodeUrl.split("/").pop() || "barcode.png" : "barcode.png";
            link.download = fileName;
            link.click();
          };
          const handlePrint = () => {
            const printWindow = window.open("", "_blank");
            if (!printWindow) return;
            printWindow.document.write(`
					<html>
						<head><title>Print Barcode</title></head>
						<body style="text-align:center;">
						<img src="${fullUrl}" style="width:600px;height:700px;" />
						<script>window.print(); window.close();<\/script>
						</body>
					</html>`);
            printWindow.document.close();
          };
          return /* @__PURE__ */ jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsx(
              AlertDialogTrigger,
              {
                asChild: true,
                className: "flex items-center justify-center cursor-pointer",
                title: "Click to view barcode",
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: `${barcodeUrl}`,
                    alt: "Barcode",
                    width: 100,
                    height: 100,
                    className: "w-10 h-10 object-cover"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs(AlertDialogContent, { className: "w-fit h-fit", children: [
              /* @__PURE__ */ jsx(AlertDialogHeader, { children: /* @__PURE__ */ jsx(AlertDialogTitle, { children: "Print Barcode" }) }),
              /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: fullUrl,
                  alt: "Barcode",
                  width: 200,
                  height: 200,
                  className: "w-[200px] h-[200px]r"
                }
              ) }),
              /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsx(AlertDialogAction, { onClick: handleDownload, children: "Download" }),
                /* @__PURE__ */ jsx(AlertDialogAction, { onClick: handlePrint, children: "Print" }),
                /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancel" })
              ] })
            ] })
          ] });
        },
        minSize: 100,
        maxSize: 100
      },
      {
        id: "actions",
        cell: ({ row, table }) => /* @__PURE__ */ jsx(DataTableRowActions, { table, row }),
        minSize: 50,
        maxSize: 50,
        enableResizing: false,
        enableHiding: false
      }
    );
  }
  return baseColumns;
}
function DataTableEmployee({
  data,
  username
}) {
  const [open, setOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const postEmployee = useServerFn(createEmployee);
  const deleteEmployeeFn = useServerFn(deleteEmployee);
  const updateEmployeeFn = useServerFn(updateEmployee);
  const queryClient = useQueryClient();
  const { mutateAsync: updateEmployeeAsync } = useMutation({
    mutationFn: updateEmployeeFn,
    onSuccess: () => {
      toast.success("Employee updated successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      toast.error("Failed to update employee");
    }
  });
  const { mutateAsync: deleteEmployeeAsync } = useMutation({
    mutationFn: deleteEmployeeFn,
    onSuccess: () => {
      toast.success("Employee deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      toast.error("Failed to delete employee");
    }
  });
  const { mutateAsync } = useMutation({
    mutationFn: postEmployee,
    onSuccess: () => {
      toast.success("Employee created successfully");
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: () => {
      toast.error("Failed to create employee");
    }
  });
  const form = useForm({
    defaultValues: {
      name: editEmployee?.name || "",
      position: editEmployee?.position || ""
    },
    validators: {
      onSubmit: editEmployee ? UpdateEmployeeSc.omit({ id: true }) : CreateEmployeeSc
    },
    onSubmit: async ({ value }) => {
      if (editEmployee) {
        toast.promise(
          updateEmployeeAsync({ data: { ...value, id: editEmployee.id } }),
          {
            loading: "Updating employee...",
            error: "Failed to update employee"
          }
        );
      } else {
        toast.promise(mutateAsync({ data: value }), {
          loading: "Creating employee...",
          error: "Failed to create employee"
        });
      }
      setOpen(false);
      setEditEmployee(null);
      form.reset();
    }
  });
  const columns = useMemo(() => {
    return COLUMNS_EMPLOYEES(username);
  }, [username]);
  const { table } = useClientTable({
    initialState: {
      columnPinning: {
        right: username === "admin" ? ["barcodeUrl", "actions"] : ["barcodeUrl"]
      }
    },
    defaultColumn: {
      minSize: 160
    },
    data,
    columns,
    getRowId: (originalRow) => originalRow.id,
    enableRowSelection: (row) => !row.original.barcodeUrl,
    rowActions(payload) {
      if (payload.variant === "edit") {
        setEditEmployee(payload.row.original);
        setOpen(true);
      } else if (payload.variant === "delete") {
        deleteEmployeeAsync({ data: payload.row.original });
      }
    }
  });
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx(DataTable, { className: "min-h-[570px] py-3", table, children: /* @__PURE__ */ jsx(DataTableToolbar, { table, children: username === "admin" && /* @__PURE__ */ jsxs(
      Button,
      {
        onClick: () => setOpen(true),
        variant: "outline",
        size: "sm",
        className: "h-8",
        children: [
          "Create New",
          /* @__PURE__ */ jsx(UserRoundPlus, { className: "ml-2 h-4 w-4" })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: editEmployee ? "Edit Employee" : "Create New Employee" }) }),
      /* @__PURE__ */ jsx(
        "form",
        {
          id: `employee-form-${editEmployee?.id || "new"}`,
          onSubmit: (e) => {
            e.preventDefault();
            form.handleSubmit();
          },
          children: /* @__PURE__ */ jsxs(FieldGroup, { children: [
            /* @__PURE__ */ jsx(form.Field, { name: "name", children: (field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return /* @__PURE__ */ jsxs(Field, { "data-invalid": isInvalid, children: [
                /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Name" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: field.name,
                    name: field.name,
                    value: field.state.value,
                    onBlur: field.handleBlur,
                    onChange: (e) => field.handleChange(e.target.value),
                    "aria-invalid": isInvalid,
                    placeholder: "Enter name",
                    autoComplete: "off"
                  }
                ),
                isInvalid && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
              ] });
            } }),
            /* @__PURE__ */ jsx(form.Field, { name: "position", children: (field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return /* @__PURE__ */ jsxs(Field, { "data-invalid": isInvalid, children: [
                /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Instansi" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: field.name,
                    name: field.name,
                    value: field.state.value,
                    onBlur: field.handleBlur,
                    onChange: (e) => field.handleChange(e.target.value),
                    "aria-invalid": isInvalid,
                    placeholder: "Enter position",
                    autoComplete: "off"
                  }
                ),
                isInvalid && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
              ] });
            } })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", onClick: () => setOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(form.Subscribe, { selector: (state) => state.isSubmitting, children: (isSubmitting) => /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            form: `employee-form-${editEmployee?.id || "new"}`,
            disabled: isSubmitting,
            children: isSubmitting ? "Saving..." : "Save"
          }
        ) })
      ] })
    ] }) })
  ] });
}
function RouteComponent() {
  const getData = useServerFn(getEmployees);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getData()
  });
  const {
    data: session,
    isPending
  } = useSession();
  if (isPending) {
    return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-screen", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "size-10 animate-spin" }) });
  }
  return !session ? /* @__PURE__ */ jsx(Navigate, { to: "/signin" }) : isLoading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-screen", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "size-10 animate-spin" }) }) : /* @__PURE__ */ jsx(DataTableEmployee, { username: session?.user.username || "", data: data ?? [] });
}
export {
  RouteComponent as component
};
