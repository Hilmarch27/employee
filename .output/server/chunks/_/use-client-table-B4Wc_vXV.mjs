import * as React from "react";
import { useState } from "react";
import { useRouter, isRedirect } from "@tanstack/react-router";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { c as cn } from "./config-CZfDNatN.mjs";
import { e as createLucideIcon, X, B as Button, m as ChevronRight } from "./router-PksdRzJZ.mjs";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useReactTable, getExpandedRowModel, getFacetedUniqueValues, getFacetedRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, getCoreRowModel } from "@tanstack/react-table";
const __iconNode$7 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$7);
const __iconNode$6 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$6);
const __iconNode$5 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$5);
const __iconNode$4 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
];
const ChevronsLeft = createLucideIcon("chevrons-left", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
];
const ChevronsRight = createLucideIcon("chevrons-right", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode);
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(
    async (...args) => {
      try {
        const res = await serverFn(...args);
        if (isRedirect(res)) {
          throw res;
        }
        return res;
      } catch (err) {
        if (isRedirect(err)) {
          err.options._fromLocation = router.state.location;
          return router.navigate(router.resolveRedirect(err).options);
        }
        throw err;
      }
    },
    [router, serverFn]
  );
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    DropdownMenuPrimitive.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function DropdownMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      ),
      ...props
    }
  );
}
function DataTableColumnHeader({
  column,
  title,
  className,
  ...props
}) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return /* @__PURE__ */ jsx("div", { className: cn(className), children: title });
  }
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxs(
      DropdownMenuTrigger,
      {
        className: cn(
          "-ml-1.5 flex h-8 items-center gap-1.5 rounded-sm px-2 py-1.5 hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring data-[state=open]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
          className
        ),
        ...props,
        children: [
          title,
          column.getCanSort() && (column.getIsSorted() === "desc" ? /* @__PURE__ */ jsx(ChevronDown, {}) : column.getIsSorted() === "asc" ? /* @__PURE__ */ jsx(ChevronUp, {}) : /* @__PURE__ */ jsx(ChevronsUpDown, {}))
        ]
      }
    ),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", side: "right", className: "min-w-auto", children: [
      column.getCanSort() && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          DropdownMenuCheckboxItem,
          {
            className: "relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground",
            checked: column.getIsSorted() === "asc",
            onClick: () => column.toggleSorting(false),
            children: [
              /* @__PURE__ */ jsx(ChevronUp, {}),
              "Asc"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          DropdownMenuCheckboxItem,
          {
            className: "relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground",
            checked: column.getIsSorted() === "desc",
            onClick: () => column.toggleSorting(true),
            children: [
              /* @__PURE__ */ jsx(ChevronDown, {}),
              "Desc"
            ]
          }
        ),
        column.getIsSorted() && /* @__PURE__ */ jsxs(
          DropdownMenuItem,
          {
            className: "pl-2 [&_svg]:text-muted-foreground",
            onClick: () => column.clearSorting(),
            children: [
              /* @__PURE__ */ jsx(X, {}),
              "Reset"
            ]
          }
        )
      ] }),
      column.getCanHide() && /* @__PURE__ */ jsxs(
        DropdownMenuCheckboxItem,
        {
          className: "relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground",
          checked: !column.getIsVisible(),
          onClick: () => column.toggleVisibility(false),
          children: [
            /* @__PURE__ */ jsx(EyeOff, {}),
            "Hide"
          ]
        }
      )
    ] })
  ] });
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUp, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDown, { className: "size-4" })
    }
  );
}
function DataTablePagination({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50, 100]
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex-1 text-sm text-muted-foreground", children: [
      table.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      table.getFilteredRowModel().rows.length,
      " row(s) selected."
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: "Rows per page" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: `${table.getState().pagination.pageSize}`,
            onValueChange: (value) => {
              table.setPageSize(Number(value));
            },
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { size: "sm", className: "w-[70px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: table.getState().pagination.pageSize }) }),
              /* @__PURE__ */ jsx(SelectContent, { side: "top", className: "min-w-[70px]", children: pageSizeOptions.map((pageSize) => /* @__PURE__ */ jsx(SelectItem, { value: `${pageSize}`, children: pageSize }, pageSize)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: [
        "Page ",
        table.getState().pagination.pageIndex + 1,
        " of",
        " ",
        table.getPageCount()
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "hidden h-8 w-8 p-0 lg:flex",
            onClick: () => table.setPageIndex(0),
            disabled: !table.getCanPreviousPage(),
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Go to first page" }),
              /* @__PURE__ */ jsx(ChevronsLeft, {})
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "h-8 w-8 p-0",
            onClick: () => table.previousPage(),
            disabled: !table.getCanPreviousPage(),
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Go to previous page" }),
              /* @__PURE__ */ jsx(ChevronLeft, {})
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "h-8 w-8 p-0",
            onClick: () => table.nextPage(),
            disabled: !table.getCanNextPage(),
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Go to next page" }),
              /* @__PURE__ */ jsx(ChevronRight, {})
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "hidden h-8 w-8 p-0 lg:flex",
            onClick: () => table.setPageIndex(table.getPageCount() - 1),
            disabled: !table.getCanNextPage(),
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Go to last page" }),
              /* @__PURE__ */ jsx(ChevronsRight, {})
            ]
          }
        )
      ] })
    ] })
  ] });
}
function useClientTable(props) {
  const {
    columns,
    data,
    initialState,
    getRowCanExpand,
    rowActions,
    ...tableProps
  } = props;
  const [rowSelection, setRowSelection] = useState(
    initialState?.rowSelection ?? {}
  );
  const [columnVisibility, setColumnVisibility] = useState(
    initialState?.columnVisibility ?? {}
  );
  const [columnFilters, setColumnFilters] = useState(
    initialState?.columnFilters ?? []
  );
  const [sorting, setSorting] = useState(
    initialState?.sorting ?? []
  );
  const [expanded, setExpanded] = useState(
    initialState?.expanded ?? {}
  );
  function handleRowActions(payload) {
    if (!rowActions) throw new Error("rowActions function is required");
    rowActions(payload);
  }
  const table = useReactTable({
    ...tableProps,
    initialState,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false
    },
    columnResizeMode: "onChange",
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand,
    meta: {
      rowActions: handleRowActions
    }
  });
  return { table };
}
function normalizeStartOfDay(time) {
  const d = new Date(time);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}
function normalizeEndOfDay(time) {
  const d = new Date(time);
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}
function dateRange(row, columnId, value) {
  const rowTime = new Date(row.getValue(columnId)).getTime();
  const [startRaw, endRaw] = Array.isArray(value) ? value : [void 0, void 0];
  const startTime = typeof startRaw === "number" ? normalizeStartOfDay(startRaw) : void 0;
  const endTime = typeof endRaw === "number" ? normalizeEndOfDay(endRaw) : void 0;
  if ((startTime || endTime) && rowTime === void 0) return false;
  if (startTime !== void 0 && endTime === void 0) {
    return rowTime >= startTime;
  }
  if (startTime === void 0 && endTime !== void 0) {
    return rowTime <= endTime;
  }
  if (startTime !== void 0 && endTime !== void 0) {
    return rowTime >= startTime && rowTime <= endTime;
  }
  return true;
}
function includesTrimmed(row, columnId, filterValue) {
  const cellValue = String(row.getValue(columnId) ?? "").trim().toLowerCase();
  const inputValue = filterValue.trim().toLowerCase();
  return cellValue.includes(inputValue);
}
export {
  Check as C,
  DataTableColumnHeader as D,
  TableHeader as T,
  useClientTable as a,
  TableRow as b,
  TableHead as c,
  TableBody as d,
  TableCell as e,
  DataTablePagination as f,
  dateRange as g,
  DropdownMenu as h,
  includesTrimmed as i,
  DropdownMenuTrigger as j,
  DropdownMenuContent as k,
  DropdownMenuItem as l,
  DropdownMenuSeparator as m,
  DropdownMenuShortcut as n,
  Table as o,
  DropdownMenuLabel as p,
  DropdownMenuCheckboxItem as q,
  ChevronLeft as r,
  ChevronDown as s,
  useServerFn as u
};
