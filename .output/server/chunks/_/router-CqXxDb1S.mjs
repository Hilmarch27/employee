import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { createRouter, createRootRouteWithContext, createFileRoute, lazyRouteComponent, HeadContent, Scripts, useLocation, Link } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { d as db, e as employees, g as generateBadgeNumber, a as uploadRouter, c as cn, u as utapi } from "./config-CZfDNatN.mjs";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";
import { forwardRef, createElement, useMemo } from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { useTheme } from "next-themes";
import { Toaster as Toaster$1 } from "sonner";
import z from "zod";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { j as json, c as createServerFn, g as getResponseHeaders, s as setResponseHeaders } from "./server.mjs";
import { createRouteHandler } from "uploadthing/server";
import { sql, desc, count, eq } from "drizzle-orm";
import { c as createSsrRpc, g as genQRCode, a as getHaircutHistory, u as utils, w as writeSync } from "./barcode-fn-B1yNXQ6U.mjs";
import * as LabelPrimitive from "@radix-ui/react-label";
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef(
    ({ className, ...props }, ref) => createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$b = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$b);
const __iconNode$a = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$a);
const __iconNode$9 = [
  [
    "path",
    { d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3", key: "11bfej" }
  ]
];
const Command = createLucideIcon("command", __iconNode$9);
const __iconNode$8 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$8);
const __iconNode$7 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$7);
const __iconNode$6 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$6);
const __iconNode$5 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  [
    "path",
    {
      d: "M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z",
      key: "2d38gg"
    }
  ],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const OctagonX = createLucideIcon("octagon-x", __iconNode$4);
const __iconNode$3 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }]
];
const PanelLeft = createLucideIcon("panel-left", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function getContext() {
  const queryClient = new QueryClient();
  return {
    queryClient
  };
}
function Provider({
  children,
  queryClient
}) {
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children });
}
const customTitles = {
  users: "Manage Users",
  user: "User"
};
function Breadcrumbs() {
  const pathname = useLocation({
    select: (location) => location.pathname
  });
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const title = customTitles[segment] || formatTitle(segment);
    return { href, title, segment };
  });
  function formatTitle(segment) {
    return segment.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  return /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Dashboard" }),
    breadcrumbs.map((crumb, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" }),
      index === breadcrumbs.length - 1 ? /* @__PURE__ */ jsx("span", { className: "text-foreground font-medium", children: crumb.title }) : /* @__PURE__ */ jsx(
        Link,
        {
          to: crumb.href,
          className: "hover:text-foreground transition-colors",
          children: crumb.title
        }
      )
    ] }, crumb.href))
  ] });
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    TooltipPrimitive.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
    TooltipPrimitive.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(TooltipPrimitive.Arrow, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = React.createContext(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("size-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx(PanelLeft, {}),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function Navbar() {
  return /* @__PURE__ */ jsx("header", { className: "flex h-16 shrink-0 items-center justify-between gap-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-4", children: [
    /* @__PURE__ */ jsx(SidebarTrigger, { className: "-ml-1" }),
    /* @__PURE__ */ jsx(
      Separator,
      {
        orientation: "vertical",
        className: "mr-2 data-[orientation=vertical]:h-4 bg-foreground"
      }
    ),
    /* @__PURE__ */ jsx(Breadcrumbs, {})
  ] }) });
}
const authClient = createAuthClient({
  plugins: [usernameClient()]
});
const useSession = authClient.useSession;
const DATA_SIDEBAR = {
  navMain: [
    {
      name: "Dashboard",
      url: "/",
      icon: House
    },
    {
      name: "Employee",
      url: "/employee",
      icon: Users
    }
  ],
  navSecondary: [
    {
      title: "Logout",
      url: "#",
      icon: LogOut
    }
  ]
};
function MainNav({ items }) {
  const pathname = useLocation({
    select: (location) => location.pathname
  });
  return /* @__PURE__ */ jsxs(SidebarGroup, { className: "group-data-[collapsible=icon]:hidden", children: [
    /* @__PURE__ */ jsx(SidebarGroupLabel, { children: "General Admin" }),
    /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { asChild: true, isActive: pathname === item.url, children: /* @__PURE__ */ jsxs("a", { href: item.url, children: [
      /* @__PURE__ */ jsx(item.icon, {}),
      /* @__PURE__ */ jsx("span", { children: item.name })
    ] }) }) }, item.name)) })
  ] });
}
function SecondaryNav({
  items,
  ...props
}) {
  return /* @__PURE__ */ jsx(SidebarGroup, { ...props, children: /* @__PURE__ */ jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(
    SidebarMenuButton,
    {
      asChild: true,
      size: "sm",
      onClick: async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
            }
          }
        });
      },
      children: /* @__PURE__ */ jsxs("a", { href: item.url, children: [
        /* @__PURE__ */ jsx(item.icon, {}),
        /* @__PURE__ */ jsx("span", { children: item.title })
      ] })
    }
  ) }, item.title)) }) }) });
}
function AppSidebar({ ...props }) {
  return /* @__PURE__ */ jsxs(Sidebar, { variant: "inset", ...props, children: [
    /* @__PURE__ */ jsx(SidebarHeader, { children: /* @__PURE__ */ jsx(SidebarMenu, { children: /* @__PURE__ */ jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsx(SidebarMenuButton, { size: "lg", asChild: true, children: /* @__PURE__ */ jsxs("a", { href: "/", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg", children: /* @__PURE__ */ jsx(Command, { className: "size-4" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid flex-1 text-left text-sm leading-tight", children: [
        /* @__PURE__ */ jsx("span", { className: "truncate font-medium", children: "USER MANAGEMENT" }),
        /* @__PURE__ */ jsx("span", { className: "truncate text-xs", children: "ADMIN" })
      ] })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsxs(SidebarContent, { children: [
      /* @__PURE__ */ jsx(MainNav, { items: DATA_SIDEBAR.navMain }),
      /* @__PURE__ */ jsx(SecondaryNav, { items: DATA_SIDEBAR.navSecondary, className: "mt-auto" })
    ] })
  ] });
}
function LayoutSidebar({ children }) {
  const pathname = useLocation({
    select: (location) => location.pathname
  });
  const isSignin = pathname === "/signin";
  if (isSignin) {
    return /* @__PURE__ */ jsx(Fragment, { children });
  }
  return /* @__PURE__ */ jsxs(SidebarProvider, { defaultOpen: true, children: [
    /* @__PURE__ */ jsx(AppSidebar, {}),
    /* @__PURE__ */ jsxs(SidebarInset, { className: "border-2 flex h-[calc(100dvh-1rem)] overflow-hidden pb-3", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsx("div", { className: "container max-w-full h-full mx-0 ps-2 md:ps-4.5", children }) })
    ] })
  ] });
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsx(CircleCheck, { className: "size-4" }),
        info: /* @__PURE__ */ jsx(Info, { className: "size-4" }),
        warning: /* @__PURE__ */ jsx(TriangleAlert, { className: "size-4" }),
        error: /* @__PURE__ */ jsx(OctagonX, { className: "size-4" }),
        loading: /* @__PURE__ */ jsx(LoaderCircle, { className: "size-4 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-DGo2wKJb.css";
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "User Management"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Toaster, {}),
      /* @__PURE__ */ jsx(LayoutSidebar, { children }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$2 = () => import("./index-x3s7X4bH.mjs");
const Route$6 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite"
  }),
  emailAndPassword: {
    enabled: true
  },
  plugins: [username(), reactStartCookies()]
});
const createUserSc = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.email().min(1),
  name: z.string().min(1)
});
const Route$5 = createFileRoute("/api/users")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const data = createUserSc.parse(body);
          const newUser = await auth.api.signUpEmail({
            body: {
              email: data.email,
              name: data.name,
              password: data.password,
              username: data.username
            }
          });
          return json(newUser);
        } catch (error) {
          console.error(error);
          throw new Error("Internal Server Error");
        }
      }
    }
  }
});
const handler = createRouteHandler({ router: uploadRouter });
const Route$4 = createFileRoute("/api/uploadthing")({
  server: {
    handlers: {
      GET: handler,
      POST: handler
    }
  }
});
const CreateEmployeeSc = z.object({
  name: z.string().min(1),
  position: z.string().min(1)
});
const UpdateEmployeeSc = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  position: z.string().min(1).optional()
});
const DeleteEmployeeSc = z.object({
  id: z.string().min(1)
});
const createEmployee_createServerFn_handler = createSsrRpc("be412f3b3e6ca295950e4fdcee9704a5fe5550e74a70796c87282f6a2167eadb");
const createEmployee = createServerFn({
  method: "POST"
}).inputValidator(CreateEmployeeSc).handler(createEmployee_createServerFn_handler, async ({
  data
}) => {
  const [result] = await db.select({
    count: count()
  }).from(employees).where(eq(employees.position, data.position));
  const total = result?.count ?? 0;
  const sequence = total > 0 ? total + 1 : 1;
  const badge = generateBadgeNumber(data.position, sequence);
  const [employee] = await db.insert(employees).values({
    ...data,
    badge
  }).returning();
  if (!employee) {
    throw new Error("Failed to create employee");
  }
  const qrCode = await genQRCode({
    name: employee.name,
    id: employee.id
  });
  const file = new File([new Uint8Array(qrCode)], `${employee.id}.png`, {
    type: "image/png"
  });
  const res = await utapi.uploadFiles(file);
  if (!res.data) {
    throw new Error("Failed to upload Barcode");
  }
  const [updatedEmployee] = await db.update(employees).set({
    barcodeUrl: res.data.ufsUrl
  }).where(eq(employees.id, employee.id)).returning();
  return {
    message: "Employee created successfully",
    result: updatedEmployee ? [updatedEmployee] : [employee]
  };
});
const getEmployees_createServerFn_handler = createSsrRpc("d995f78514bca95f9b64006a76df31a80a116f32dc69ce9fdb5fdd431a92895c");
const getEmployees = createServerFn({
  method: "GET"
}).handler(getEmployees_createServerFn_handler, async () => {
  const employee = await db.select().from(employees).orderBy(desc(employees.createdAt));
  return employee;
});
const updateEmployee_createServerFn_handler = createSsrRpc("637bb0a711805f0e7b67fb66570698f4bfb37a01015b4ab8bc533387f5072a9b");
const updateEmployee = createServerFn({
  method: "POST"
}).inputValidator(UpdateEmployeeSc).handler(updateEmployee_createServerFn_handler, async ({
  data
}) => {
  const existingEmployee = await db.query.employees.findFirst({
    where: eq(employees.id, data.id ?? "")
  });
  if (!existingEmployee) {
    throw new Error("Employee not found");
  }
  const [updatedEmployee] = await db.update(employees).set({
    name: data.name,
    position: data.position
  }).where(eq(employees.id, data.id ?? "")).returning();
  if (!updatedEmployee) {
    throw new Error("Failed to update employee");
  }
  return {
    message: "Employee updated successfully",
    result: updatedEmployee
  };
});
const deleteEmployee_createServerFn_handler = createSsrRpc("7e957ad82373e00ed81c4c7232f158d4e11705028f4c1df1cf2e844c8fe8ef9c");
const deleteEmployee = createServerFn({
  method: "POST"
}).inputValidator(DeleteEmployeeSc).handler(deleteEmployee_createServerFn_handler, async ({
  data
}) => {
  const existingEmployee = await db.query.employees.findFirst({
    where: eq(employees.id, data.id)
  });
  if (!existingEmployee) {
    throw new Error("Employee not found");
  }
  await db.delete(employees).where(eq(employees.id, data.id));
  return {
    message: "Employee deleted successfully"
  };
});
const getPositions_createServerFn_handler = createSsrRpc("a9bd7b20fa2edafd59d5d28102189a72aff3c1be54e7e3223f98f733cf4e902a");
const getPositions = createServerFn({
  method: "GET"
}).handler(getPositions_createServerFn_handler, async () => {
  try {
    const result = await db.select({
      position: employees.position
    }).from(employees).groupBy(employees.position).orderBy(desc(employees.position));
    const positions = result.map((row) => row.position);
    return positions.map((position) => ({
      value: position,
      label: position
    }));
  } catch (error) {
    console.error("Error getting unique instansi:", error);
    throw new Error("Failed to get instansi");
  }
});
const exportHaircutHistoryExcel_createServerFn_handler = createSsrRpc("b0898779ff6e8daecf444f00c8ecf351ec699c70ebd58b0d8ce0af0f14fe9c1c");
const exportHaircutHistoryExcel = createServerFn({
  method: "GET"
}).inputValidator(z.object({
  range: z.array(z.number()).min(2)
}).optional()).handler(exportHaircutHistoryExcel_createServerFn_handler, async ({
  data
}) => {
  try {
    const history = await getHaircutHistory({
      data
    });
    if (!history.data || history.data.length === 0) {
      throw new Error("");
    }
    const dates = history.data.map((item) => new Date(item.haircutDate));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
    const monthYearTitle = minDate.getMonth() === maxDate.getMonth() && minDate.getFullYear() === maxDate.getFullYear() ? minDate.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric"
    }) : `${minDate.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric"
    })} - ${maxDate.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric"
    })}`;
    const groupedByPosition = history.data.reduce((acc, item) => {
      const position = item.position || "Unknown";
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(item);
      return acc;
    }, {});
    const wsData = [];
    wsData.push([`Haircut History - ${monthYearTitle}`]);
    wsData.push([]);
    const positions = Object.keys(groupedByPosition).sort();
    positions.forEach((position, posIndex) => {
      const items = groupedByPosition[position];
      wsData.push([`Instansi: ${position}`]);
      wsData.push([]);
      wsData.push(["No", "Name", "Instansi", "Badge", "Date", "Time", "Month & Year"]);
      items.forEach((item, index) => {
        const haircutDate = new Date(item.haircutDate);
        const formattedDate = haircutDate instanceof Date && !Number.isNaN(haircutDate.getTime()) ? haircutDate.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }) : "-";
        wsData.push([index + 1, item.name, item.position, item.badge, formattedDate, item.formattedTime, item.monthYear]);
      });
      if (posIndex < positions.length - 1) {
        wsData.push([]);
        wsData.push([]);
      }
    });
    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(wsData);
    ws["!cols"] = [
      {
        wch: 5
      },
      // No
      {
        wch: 25
      },
      // Name
      {
        wch: 20
      },
      // Position
      {
        wch: 15
      },
      // Badge
      {
        wch: 30
      },
      // Date
      {
        wch: 12
      },
      // Time
      {
        wch: 20
      }
      // Month & Year
    ];
    if (ws.A1) {
      ws.A1.s = {
        font: {
          bold: true,
          sz: 14
        },
        alignment: {
          horizontal: "center"
        }
      };
    }
    ws["!merges"] = [{
      s: {
        r: 0,
        c: 0
      },
      e: {
        r: 0,
        c: 6
      }
    }];
    utils.book_append_sheet(wb, ws, "Haircut History");
    const excelBuffer = writeSync(wb, {
      type: "buffer",
      bookType: "xlsx"
    });
    const headers = getResponseHeaders();
    headers.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.set("Content-Disposition", `attachment; filename="Haircut_History_${monthYearTitle.replace(/\s/g, "_")}.xlsx"`);
    setResponseHeaders(headers);
    return new Response(excelBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Haircut_History_${monthYearTitle.replace(/\s/g, "_")}.xlsx"`
      }
    });
  } catch (error) {
    console.error("Error exporting haircut history:", error);
    throw new Error("Gagal mengekspor data ke Excel");
  }
});
const CreateManyEmployeesSc = z.array(CreateEmployeeSc);
const Route$3 = createFileRoute("/api/employee")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const data = CreateManyEmployeesSc.parse(body);
          return await db.transaction(async (tx) => {
            const results = [];
            const positionsNeeded = [
              ...new Set(
                data.map(
                  (emp) => emp.position.toUpperCase().replace(/\s+/g, "")
                )
              )
            ];
            const maxSequences = /* @__PURE__ */ new Map();
            for (const positionKey of positionsNeeded) {
              const result = await tx.select({ badge: employees.badge }).from(employees).where(sql`${employees.badge} LIKE ${`${positionKey}-%`}`);
              let maxSequence = 0;
              result.forEach((emp) => {
                const badgeParts = emp.badge.split("-");
                if (badgeParts.length === 2) {
                  const sequence = parseInt(badgeParts[1], 10);
                  if (!Number.isNaN(sequence) && sequence > maxSequence) {
                    maxSequence = sequence;
                  }
                }
              });
              maxSequences.set(positionKey, maxSequence);
            }
            const positionGroups = {};
            data.forEach((emp) => {
              const positionKey = emp.position.toUpperCase().replace(/\s+/g, "");
              if (!positionGroups[positionKey]) {
                positionGroups[positionKey] = [];
              }
              positionGroups[positionKey].push(emp);
            });
            for (const [positionKey, employeesInGroup] of Object.entries(
              positionGroups
            )) {
              let nextSequence = (maxSequences.get(positionKey) || 0) + 1;
              for (const empData of employeesInGroup) {
                const badge = generateBadgeNumber(
                  empData.position,
                  nextSequence
                );
                const newEmployee = await tx.insert(employees).values({
                  name: empData.name,
                  position: empData.position,
                  badge
                }).returning();
                results.push(newEmployee[0]);
                nextSequence++;
              }
            }
            return json(results);
          });
        } catch (error) {
          console.error(error);
          throw new Error("Internal Server Error");
        }
      }
    }
  }
});
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "field-group",
      className: cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      ),
      ...props
    }
  );
}
const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ]
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function Field({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": orientation,
      className: cn(fieldVariants({ orientation }), className),
      ...props
    }
  );
}
function FieldLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Label,
    {
      "data-slot": "field-label",
      className: cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        className
      ),
      ...props
    }
  );
}
function FieldError({
  className,
  children,
  errors,
  ...props
}) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }
    if (!errors?.length) {
      return null;
    }
    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values()
    ];
    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }
    return /* @__PURE__ */ jsx("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: uniqueErrors.map(
      (error, index) => error?.message && /* @__PURE__ */ jsx("li", { children: error.message }, index)
    ) });
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: cn("text-destructive text-sm font-normal", className),
      ...props,
      children: content
    }
  );
}
const $$splitComponentImporter$1 = () => import("./signin-DPqaCPnK.mjs");
const Route$2 = createFileRoute("/(app)/signin")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});
const $$splitComponentImporter = () => import("./employee-BaHGyf3m.mjs");
const Route$1 = createFileRoute("/(app)/employee")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => {
        return auth.handler(request);
      },
      POST: ({ request }) => {
        return auth.handler(request);
      }
    }
  }
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const ApiUsersRoute = Route$5.update({
  id: "/api/users",
  path: "/api/users",
  getParentRoute: () => Route$7
});
const ApiUploadthingRoute = Route$4.update({
  id: "/api/uploadthing",
  path: "/api/uploadthing",
  getParentRoute: () => Route$7
});
const ApiEmployeeRoute = Route$3.update({
  id: "/api/employee",
  path: "/api/employee",
  getParentRoute: () => Route$7
});
const appSigninRoute = Route$2.update({
  id: "/(app)/signin",
  path: "/signin",
  getParentRoute: () => Route$7
});
const appEmployeeRoute = Route$1.update({
  id: "/(app)/employee",
  path: "/employee",
  getParentRoute: () => Route$7
});
const ApiAuthSplatRoute = Route.update({
  id: "/api/auth/$",
  path: "/api/auth/$",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  appEmployeeRoute,
  appSigninRoute,
  ApiEmployeeRoute,
  ApiUploadthingRoute,
  ApiUsersRoute,
  ApiAuthSplatRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const rqContext = getContext();
  const router2 = createRouter({
    routeTree,
    context: { ...rqContext },
    defaultPreload: "intent",
    Wrap: (props) => {
      return /* @__PURE__ */ jsx(Provider, { ...rqContext, children: props.children });
    }
  });
  setupRouterSsrQueryIntegration({ router: router2, queryClient: rqContext.queryClient });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
const routerCqXxDb1S = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  B: Button,
  C: CreateEmployeeSc,
  F: Field,
  S: Separator,
  U: UpdateEmployeeSc,
  a: FieldLabel,
  b: FieldError,
  c: authClient,
  d: FieldGroup,
  e: exportHaircutHistoryExcel,
  f: buttonVariants,
  g: createEmployee,
  h: deleteEmployee,
  i: updateEmployee,
  j: getEmployees,
  k: getPositions,
  r: router,
  u: useSession
});
export {
  Button as B,
  CreateEmployeeSc as C,
  Field as F,
  LoaderCircle as L,
  Separator as S,
  UpdateEmployeeSc as U,
  X,
  FieldLabel as a,
  FieldError as b,
  createLucideIcon as c,
  authClient as d,
  exportHaircutHistoryExcel as e,
  FieldGroup as f,
  getEmployees as g,
  createEmployee as h,
  deleteEmployee as i,
  updateEmployee as j,
  buttonVariants as k,
  ChevronRight as l,
  getPositions as m,
  routerCqXxDb1S as r,
  useSession as u
};
