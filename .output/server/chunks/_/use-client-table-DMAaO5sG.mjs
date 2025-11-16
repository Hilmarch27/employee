import { c as createLucideIcon, B as Button, X, l as ChevronRight, m as getPositions, S as Separator, k as buttonVariants } from "./router-CqXxDb1S.mjs";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useReactTable, getExpandedRowModel, getFacetedUniqueValues, getFacetedRowModel, getSortedRowModel, getPaginationRowModel, getFilteredRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import * as React from "react";
import React__default, { useState } from "react";
import { c as cn, b as formatDate } from "./config-CZfDNatN.mjs";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, isRedirect } from "@tanstack/react-router";
import { toast } from "sonner";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Command as Command$1 } from "cmdk";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { I as Input } from "./input-h-pL-VAR.mjs";
import { b as createBarcode } from "./barcode-fn-B1yNXQ6U.mjs";
import { getDefaultClassNames, DayPicker } from "react-day-picker";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
const __iconNode$h = [
  ["path", { d: "M3 19V5", key: "rwsyhb" }],
  ["path", { d: "m13 6-6 6 6 6", key: "1yhaz7" }],
  ["path", { d: "M7 12h14", key: "uoisry" }]
];
const ArrowLeftToLine = createLucideIcon("arrow-left-to-line", __iconNode$h);
const __iconNode$g = [
  ["path", { d: "M17 12H3", key: "8awo09" }],
  ["path", { d: "m11 18 6-6-6-6", key: "8c2y43" }],
  ["path", { d: "M21 5v14", key: "nzette" }]
];
const ArrowRightToLine = createLucideIcon("arrow-right-to-line", __iconNode$g);
const __iconNode$f = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar$1 = createLucideIcon("calendar", __iconNode$f);
const __iconNode$e = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$e);
const __iconNode$d = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$d);
const __iconNode$c = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$c);
const __iconNode$b = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$b);
const __iconNode$a = [
  ["path", { d: "m11 17-5-5 5-5", key: "13zhaf" }],
  ["path", { d: "m18 17-5-5 5-5", key: "h8a8et" }]
];
const ChevronsLeft = createLucideIcon("chevrons-left", __iconNode$a);
const __iconNode$9 = [
  ["path", { d: "m6 17 5-5-5-5", key: "xnjwq" }],
  ["path", { d: "m13 17 5-5-5-5", key: "17xmmf" }]
];
const ChevronsRight = createLucideIcon("chevrons-right", __iconNode$9);
const __iconNode$8 = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode$8);
const __iconNode$7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$7);
const __iconNode$6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$6);
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
];
const Ellipsis = createLucideIcon("ellipsis", __iconNode$5);
const __iconNode$4 = [
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
const EyeOff = createLucideIcon("eye-off", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  ["path", { d: "M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89", key: "znwnzq" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11",
      key: "c9qhm2"
    }
  ]
];
const PinOff = createLucideIcon("pin-off", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["path", { d: "M19 7h-9", key: "6i9tg" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode$1);
const __iconNode = [
  ["path", { d: "M21 5H3", key: "1fi0y6" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M17 19H3", key: "z6ezky" }]
];
const TextAlignStart = createLucideIcon("text-align-start", __iconNode);
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
function DataTable({
  table,
  onRowClick,
  renderSubComponent,
  showPagination = true,
  children,
  className,
  ...props
}) {
  const getPinningStyles = (column, header) => {
    const isPinned = column.getIsPinned();
    return {
      left: isPinned === "left" ? `${column.getStart("left")}px` : void 0,
      right: isPinned === "right" ? `${column.getAfter("right")}px` : void 0,
      position: isPinned ? "sticky" : "relative",
      width: header?.getSize() !== 150 ? header?.getSize() : void 0,
      zIndex: isPinned ? 1 : 0
    };
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("w-full space-y-2.5 overflow-auto", className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx("div", { className: "rounded-md border", children: /* @__PURE__ */ jsxs(Table, { className: "[&_td]:border-border [&_th]:border-border table-fixed border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b", children: [
          /* @__PURE__ */ jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx(TableRow, { className: "bg-muted/50", children: headerGroup.headers.map((header) => {
            const { column } = header;
            const isPinned = column.getIsPinned();
            const isLastLeftPinned = isPinned === "left" && column.getIsLastColumn("left");
            const isFirstRightPinned = isPinned === "right" && column.getIsFirstColumn("right");
            return /* @__PURE__ */ jsx(
              TableHead,
              {
                colSpan: header.colSpan,
                className: "[&[data-pinned][data-last-col]]:border-border data-pinned:bg-muted/90 relative h-10 truncate  data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right][data-last-col=right]]:border-l first:rounded-tl-md last:rounded-tr-md",
                style: { ...getPinningStyles(column, header) },
                "data-pinned": isPinned || void 0,
                "data-last-col": isLastLeftPinned ? "left" : isFirstRightPinned ? "right" : void 0,
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsx("span", { children: header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  ) }),
                  !header.isPlaceholder && header.column.getCanPin() && (header.column.getIsPinned() ? /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "icon",
                      variant: "ghost",
                      className: "-mr-1 size-7 shadow-none",
                      onClick: () => header.column.pin(false),
                      "aria-label": `Unpin ${header.column.id} column`,
                      title: `Unpin ${header.column.id} column`,
                      children: /* @__PURE__ */ jsx(
                        PinOff,
                        {
                          className: "opacity-60",
                          size: 16,
                          "aria-hidden": "true"
                        }
                      )
                    }
                  ) : /* @__PURE__ */ jsxs(DropdownMenu, { children: [
                    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                      Button,
                      {
                        size: "icon",
                        variant: "ghost",
                        className: "-mr-1 size-7 shadow-none",
                        "aria-label": `Pin options for ${header.column.id} column`,
                        title: `Pin options for ${header.column.id} column`,
                        children: /* @__PURE__ */ jsx(
                          Ellipsis,
                          {
                            className: "opacity-60",
                            size: 16,
                            "aria-hidden": "true"
                          }
                        )
                      }
                    ) }),
                    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
                      /* @__PURE__ */ jsxs(
                        DropdownMenuItem,
                        {
                          onClick: () => header.column.pin("left"),
                          children: [
                            /* @__PURE__ */ jsx(
                              ArrowLeftToLine,
                              {
                                size: 16,
                                className: "opacity-60",
                                "aria-hidden": "true"
                              }
                            ),
                            "Stick to left"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        DropdownMenuItem,
                        {
                          onClick: () => header.column.pin("right"),
                          children: [
                            /* @__PURE__ */ jsx(
                              ArrowRightToLine,
                              {
                                size: 16,
                                className: "opacity-60",
                                "aria-hidden": "true"
                              }
                            ),
                            "Stick to right"
                          ]
                        }
                      )
                    ] })
                  ] })),
                  header.column.getCanResize() && /* @__PURE__ */ jsx(
                    "div",
                    {
                      ...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: "absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px"
                      }
                    }
                  )
                ] })
              },
              header.id
            );
          }) }, headerGroup.id)) }),
          /* @__PURE__ */ jsx(TableBody, { children: table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
            /* @__PURE__ */ jsx(
              TableRow,
              {
                className: onRowClick ? "cursor-pointer" : "",
                onClick: () => onRowClick?.(row.original),
                "data-state": row.getIsSelected() && "selected",
                children: row.getVisibleCells().map((cell) => {
                  const { column } = cell;
                  const isPinned = column.getIsPinned();
                  const isLastLeftPinned = isPinned === "left" && column.getIsLastColumn("left");
                  const isFirstRightPinned = isPinned === "right" && column.getIsFirstColumn("right");
                  return /* @__PURE__ */ jsx(
                    TableCell,
                    {
                      className: "[&[data-pinned][data-last-col]]:border-border data-pinned:bg-background/90 truncate data-pinned:backdrop-blur-xs [&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l",
                      style: { ...getPinningStyles(column) },
                      "data-pinned": isPinned || void 0,
                      "data-last-col": isLastLeftPinned ? "left" : isFirstRightPinned ? "right" : void 0,
                      children: flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )
                    },
                    cell.id
                  );
                })
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
        ] }) }),
        showPagination && /* @__PURE__ */ jsx(DataTablePagination, { table })
      ]
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
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function Command({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1,
    {
      "data-slot": "command",
      className: cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      ),
      ...props
    }
  );
}
function CommandInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ jsx(Search, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ jsx(
          Command$1.Input,
          {
            "data-slot": "command-input",
            className: cn(
              "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              className
            ),
            ...props
          }
        )
      ]
    }
  );
}
function CommandList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.List,
    {
      "data-slot": "command-list",
      className: cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      ),
      ...props
    }
  );
}
function CommandEmpty({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...props
    }
  );
}
function CommandGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Group,
    {
      "data-slot": "command-group",
      className: cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      ),
      ...props
    }
  );
}
function CommandSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Separator,
    {
      "data-slot": "command-separator",
      className: cn("bg-border -mx-1 h-px", className),
      ...props
    }
  );
}
function CommandItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Item,
    {
      "data-slot": "command-item",
      className: cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
function DataTableFacetedFilter({
  column,
  title,
  options,
  multiple
}) {
  const [open, setOpen] = React.useState(false);
  const columnFilterValue = column?.getFilterValue();
  const selectedValues = new Set(
    Array.isArray(columnFilterValue) ? columnFilterValue : []
  );
  const onItemSelect = React.useCallback(
    (option, isSelected) => {
      if (!column) return;
      if (multiple) {
        const newSelectedValues = new Set(selectedValues);
        if (isSelected) {
          newSelectedValues.delete(option.value);
        } else {
          newSelectedValues.add(option.value);
        }
        const filterValues = Array.from(newSelectedValues);
        column.setFilterValue(filterValues.length ? filterValues : void 0);
      } else {
        column.setFilterValue(isSelected ? void 0 : [option.value]);
        setOpen(false);
      }
    },
    [column, multiple, selectedValues]
  );
  const onReset = React.useCallback(
    (event) => {
      event?.stopPropagation();
      column?.setFilterValue(void 0);
    },
    [column]
  );
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "border-dashed", children: [
      selectedValues.size > 0 ? /* @__PURE__ */ jsx(
        "div",
        {
          role: "button",
          "aria-label": `Clear ${title} filter`,
          tabIndex: 0,
          onClick: onReset,
          className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          children: /* @__PURE__ */ jsx(CircleX, {})
        }
      ) : /* @__PURE__ */ jsx(CirclePlus, {}),
      title,
      selectedValues.size > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Separator,
          {
            orientation: "vertical",
            className: "mx-0.5 data-[orientation=vertical]:h-4"
          }
        ),
        /* @__PURE__ */ jsx(
          Badge,
          {
            variant: "secondary",
            className: "rounded-sm px-1 font-normal lg:hidden",
            children: selectedValues.size
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "hidden items-center gap-1 lg:flex", children: selectedValues.size > 2 ? /* @__PURE__ */ jsxs(
          Badge,
          {
            variant: "secondary",
            className: "rounded-sm px-1 font-normal",
            children: [
              selectedValues.size,
              " selected"
            ]
          }
        ) : options.filter((option) => selectedValues.has(option.value)).map((option) => /* @__PURE__ */ jsx(
          Badge,
          {
            variant: "secondary",
            className: "rounded-sm px-1 font-normal",
            children: option.label
          },
          option.value
        )) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-[12.5rem] p-0", align: "start", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsx(CommandInput, { placeholder: title }),
      /* @__PURE__ */ jsxs(CommandList, { className: "max-h-full", children: [
        /* @__PURE__ */ jsx(CommandEmpty, { children: "No results found." }),
        /* @__PURE__ */ jsx(CommandGroup, { className: "max-h-[18.75rem] overflow-y-auto overflow-x-hidden", children: options.map((option) => {
          const isSelected = selectedValues.has(option.value);
          return /* @__PURE__ */ jsxs(
            CommandItem,
            {
              onSelect: () => onItemSelect(option, isSelected),
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: cn(
                      "flex size-4 items-center justify-center rounded-sm border border-primary",
                      isSelected ? "bg-primary" : "opacity-50 [&_svg]:invisible"
                    ),
                    children: /* @__PURE__ */ jsx(Check, {})
                  }
                ),
                option.icon && /* @__PURE__ */ jsx(option.icon, {}),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: option.label }),
                option.count && /* @__PURE__ */ jsx("span", { className: "ml-auto font-mono text-xs", children: option.count })
              ]
            },
            option.value
          );
        }) }),
        selectedValues.size > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(CommandSeparator, {}),
          /* @__PURE__ */ jsx(CommandGroup, { children: /* @__PURE__ */ jsx(
            CommandItem,
            {
              onSelect: () => onReset(),
              className: "justify-center text-center",
              children: "Clear filters"
            }
          ) })
        ] })
      ] })
    ] }) })
  ] });
}
function Combobox({
  items,
  value,
  onValueChange,
  placeholder = "Select item...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  className,
  disabled = false
}) {
  const [open, setOpen] = React.useState(false);
  const selectedItem = items.find((item) => item.value === value);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        disabled,
        className: cn("w-full justify-between", className),
        children: [
          /* @__PURE__ */ jsx("span", { className: "truncate", children: selectedItem ? selectedItem.label : placeholder }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "ml-2 h-4 w-4 shrink-0 opacity-50",
              children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        className: "w-[--radix-popover-trigger-width] p-0",
        side: "bottom",
        children: /* @__PURE__ */ jsxs(Command, { className: "h-52", children: [
          /* @__PURE__ */ jsx(CommandInput, { placeholder: searchPlaceholder }),
          /* @__PURE__ */ jsxs(CommandList, { children: [
            /* @__PURE__ */ jsx(CommandEmpty, { children: emptyText }),
            /* @__PURE__ */ jsx(CommandGroup, { children: items.map((item) => /* @__PURE__ */ jsx(
              CommandItem,
              {
                value: item.value,
                keywords: [item.label, item.value],
                onSelect: (currentValue) => {
                  onValueChange?.(currentValue === value ? "" : currentValue);
                  setOpen(false);
                },
                children: item.label
              },
              item.value
            )) })
          ] })
        ] })
      }
    )
  ] });
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...props2
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsx(ChevronLeft, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsx(
              ChevronRight,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          return /* @__PURE__ */ jsx(ChevronDown, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsx("td", { ...props2, children: /* @__PURE__ */ jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
function getIsDateRange(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}
function parseAsDate(timestamp) {
  if (!timestamp) return void 0;
  const numericTimestamp = typeof timestamp === "string" ? Number(timestamp) : timestamp;
  const date = new Date(numericTimestamp);
  return !Number.isNaN(date.getTime()) ? date : void 0;
}
function parseColumnFilterValue(value) {
  if (value === null || value === void 0) {
    return [];
  }
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === "number" || typeof item === "string") {
        return item;
      }
      return void 0;
    });
  }
  if (typeof value === "string" || typeof value === "number") {
    return [value];
  }
  return [];
}
function DataTableDateFilter({
  column,
  title,
  multiple
}) {
  const columnFilterValue = column.getFilterValue();
  const selectedDates = React.useMemo(() => {
    if (!columnFilterValue) {
      return multiple ? { from: void 0, to: void 0 } : [];
    }
    if (multiple) {
      const timestamps2 = parseColumnFilterValue(columnFilterValue);
      return {
        from: parseAsDate(timestamps2[0]),
        to: parseAsDate(timestamps2[1])
      };
    }
    const timestamps = parseColumnFilterValue(columnFilterValue);
    const date = parseAsDate(timestamps[0]);
    return date ? [date] : [];
  }, [columnFilterValue, multiple]);
  const onSelect = React.useCallback(
    (date) => {
      if (!date) {
        column.setFilterValue(void 0);
        return;
      }
      if (multiple && !("getTime" in date)) {
        const from = date.from?.getTime();
        const to = date.to?.getTime();
        column.setFilterValue(from || to ? [from, to] : void 0);
      } else if (!multiple && "getTime" in date) {
        column.setFilterValue(date.getTime());
      }
    },
    [column, multiple]
  );
  const onReset = React.useCallback(
    (event) => {
      event.stopPropagation();
      column.setFilterValue(void 0);
    },
    [column]
  );
  const hasValue = React.useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return false;
      return selectedDates.from || selectedDates.to;
    }
    if (!Array.isArray(selectedDates)) return false;
    return selectedDates.length > 0;
  }, [multiple, selectedDates]);
  const formatDateRange = React.useCallback((range) => {
    if (!range.from && !range.to) return "";
    if (range.from && range.to) {
      return `${formatDate(range.from)} - ${formatDate(range.to)}`;
    }
    return formatDate(range.from ?? range.to);
  }, []);
  const label = React.useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return null;
      const hasSelectedDates = selectedDates.from || selectedDates.to;
      const dateText2 = hasSelectedDates ? formatDateRange(selectedDates) : "Select date range";
      return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { children: title }),
        hasSelectedDates && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Separator,
            {
              orientation: "vertical",
              className: "mx-0.5 data-[orientation=vertical]:h-4"
            }
          ),
          /* @__PURE__ */ jsx("span", { children: dateText2 })
        ] })
      ] });
    }
    if (getIsDateRange(selectedDates)) return null;
    const hasSelectedDate = selectedDates.length > 0;
    const dateText = hasSelectedDate ? formatDate(selectedDates[0]) : "Select date";
    return /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { children: title }),
      hasSelectedDate && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Separator,
          {
            orientation: "vertical",
            className: "mx-0.5 data-[orientation=vertical]:h-4"
          }
        ),
        /* @__PURE__ */ jsx("span", { children: dateText })
      ] })
    ] });
  }, [selectedDates, multiple, formatDateRange, title]);
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "border-dashed", children: [
      hasValue ? /* @__PURE__ */ jsx(
        "div",
        {
          role: "button",
          "aria-label": `Clear ${title} filter`,
          tabIndex: 0,
          onClick: onReset,
          className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          children: /* @__PURE__ */ jsx(CircleX, {})
        }
      ) : /* @__PURE__ */ jsx(Calendar$1, {}),
      label
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: multiple ? /* @__PURE__ */ jsx(
      Calendar,
      {
        autoFocus: true,
        mode: "range",
        selected: getIsDateRange(selectedDates) ? selectedDates : { from: void 0, to: void 0 },
        onSelect
      }
    ) : /* @__PURE__ */ jsx(
      Calendar,
      {
        autoFocus: true,
        mode: "single",
        selected: !getIsDateRange(selectedDates) ? selectedDates[0] : void 0,
        onSelect
      }
    ) })
  ] });
}
function DataTableViewOptions({
  table
}) {
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "ml-auto hidden h-8 lg:flex",
        children: [
          /* @__PURE__ */ jsx(Settings2, {}),
          "View"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "w-[150px]", children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Toggle columns" }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      table.getAllColumns().filter(
        (column) => typeof column.accessorFn !== "undefined" && column.getCanHide()
      ).map((column) => {
        return /* @__PURE__ */ jsx(
          DropdownMenuCheckboxItem,
          {
            className: "capitalize",
            checked: column.getIsVisible(),
            onCheckedChange: (value) => column.toggleVisibility(!!value),
            children: column.id
          },
          column.id
        );
      })
    ] })
  ] });
}
function DataTableToolbar({ table, children, className, ...props }) {
  const postBarcode = useServerFn(createBarcode);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: postBarcode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Barcode created successfully");
      table.resetRowSelection();
    },
    onError: () => {
      toast.error("Failed to create barcode");
    }
  });
  const isFiltered = table.getState().columnFilters.length > 0;
  const selectedRows = table.getSelectedRowModel().rows;
  const columns = React__default.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );
  const onReset = React__default.useCallback(() => {
    table.resetColumnFilters();
  }, [table]);
  const handleCreateBarcode = () => {
    if (selectedRows.length === 0) {
      toast.error("Please select at least one employee");
      return;
    }
    const items = selectedRows.map((row) => ({
      id: row.original.id,
      name: row.original.name
    }));
    toast.promise(mutateAsync({ data: { items } }), {
      loading: `Creating ${items.length} barcode(s)...`,
      success: (data) => `${data.count} barcode(s) created!`,
      error: "Failed to create barcodes"
    });
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex w-full items-center justify-between gap-2 overflow-auto p-1 ",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center space-x-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: [
            columns.map((column) => /* @__PURE__ */ jsx(DataTableToolbarFilter, { column }, column.id)),
            isFiltered && /* @__PURE__ */ jsxs(
              Button,
              {
                "aria-label": "Reset filters",
                variant: "outline",
                size: "sm",
                className: "border-dashed",
                onClick: onReset,
                children: [
                  /* @__PURE__ */ jsx(X, {}),
                  "Reset"
                ]
              }
            )
          ] }),
          selectedRows.length > 0 && /* @__PURE__ */ jsx(Button, { size: "sm", onClick: handleCreateBarcode, children: `Create Barcode ${selectedRows.length} Selected` })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          children,
          /* @__PURE__ */ jsx(DataTableViewOptions, { table })
        ] })
      ]
    }
  );
}
function DataTableToolbarFilter({
  column
}) {
  const getData = useServerFn(getPositions);
  const { data: positions } = useQuery({
    queryKey: ["positions"],
    queryFn: () => getData(),
    staleTime: 5 * 60 * 1e3
  });
  {
    const columnMeta = column.columnDef.meta;
    const onFilterRender = React__default.useCallback(() => {
      if (!columnMeta?.variant) return null;
      switch (columnMeta.variant) {
        case "text":
          return /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: columnMeta.placeholder ?? columnMeta.label,
              value: column.getFilterValue() || "",
              onChange: (event) => column.setFilterValue(event.target.value),
              className: "h-8 w-40 lg:w-56"
            }
          );
        case "combobox":
          return /* @__PURE__ */ jsx(
            Combobox,
            {
              items: positions || [],
              value: column.getFilterValue() || "",
              onValueChange: (value) => column.setFilterValue(value),
              placeholder: columnMeta.placeholder ?? columnMeta.label,
              className: "h-8 w-40 lg:w-56"
            }
          );
        case "date":
        case "dateRange":
          return /* @__PURE__ */ jsx(
            DataTableDateFilter,
            {
              column,
              title: columnMeta.label ?? column.id,
              multiple: columnMeta.variant === "dateRange"
            }
          );
        case "select":
        case "multiSelect":
          return /* @__PURE__ */ jsx(
            DataTableFacetedFilter,
            {
              column,
              title: columnMeta.label ?? column.id,
              options: columnMeta.options ?? [],
              multiple: columnMeta.variant === "multiSelect"
            }
          );
        default:
          return null;
      }
    }, [column, columnMeta, positions]);
    return onFilterRender();
  }
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
  Calendar$1 as C,
  DataTable as D,
  Ellipsis as E,
  TextAlignStart as T,
  useClientTable as a,
  DataTableToolbar as b,
  DataTableColumnHeader as c,
  dateRange as d,
  DropdownMenu as e,
  DropdownMenuTrigger as f,
  DropdownMenuContent as g,
  DropdownMenuItem as h,
  includesTrimmed as i,
  DropdownMenuSeparator as j,
  DropdownMenuShortcut as k,
  Check as l,
  useServerFn as u
};
