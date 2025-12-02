import { jsx, jsxs } from "react/jsx-runtime";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import { c as authClient, d as FieldGroup, F as Field, a as FieldLabel, b as FieldError, B as Button } from "./router-PksdRzJZ.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardDescription, c as CardContent, e as CardFooter } from "./card-fDatpBMZ.mjs";
import { I as Input } from "./input-h-pL-VAR.mjs";
import { c as cn } from "./config-CZfDNatN.mjs";
import "@tanstack/react-router-ssr-query";
import "@tanstack/react-query";
import "@radix-ui/react-separator";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "react";
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
import "uploadthing/server";
import "drizzle-orm";
import "./barcode-fn-C7viNX70.mjs";
import "canvas";
import "qrcode";
import "@radix-ui/react-label";
import "@libsql/client";
import "dotenv";
import "drizzle-orm/libsql";
import "@t3-oss/env-core";
import "drizzle-orm/sqlite-core";
import "clsx";
import "nanoid";
import "tailwind-merge";
function RouteComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center h-screen", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-md", children: /* @__PURE__ */ jsx(LoginForm, {}) }) });
}
const LoginSc = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});
function LoginForm({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      username: "",
      password: ""
    },
    validators: {
      onSubmit: LoginSc
    },
    onSubmit: async ({
      value
    }) => {
      const {
        data,
        error
      } = await authClient.signIn.username({
        username: value.username,
        password: value.password
      });
      if (error) {
        toast.error(error.message);
      }
      if (data) {
        toast.success("Login successful");
        navigate({
          to: "/"
        });
        form.reset();
      }
    }
  });
  return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-6", className), ...props, children: /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Login to your account" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Enter your account below to login to your account" })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("form", { id: `login-form`, onSubmit: (e) => {
      e.preventDefault();
      form.handleSubmit();
    }, children: /* @__PURE__ */ jsxs(FieldGroup, { children: [
      /* @__PURE__ */ jsx(form.Field, { name: "username", children: (field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
        return /* @__PURE__ */ jsxs(Field, { "data-invalid": isInvalid, children: [
          /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Username" }),
          /* @__PURE__ */ jsx(Input, { id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), "aria-invalid": isInvalid, placeholder: "Enter username", autoComplete: "off", autoFocus: true }),
          isInvalid && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
        ] });
      } }),
      /* @__PURE__ */ jsx(form.Field, { name: "password", children: (field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
        return /* @__PURE__ */ jsxs(Field, { "data-invalid": isInvalid, children: [
          /* @__PURE__ */ jsx(FieldLabel, { htmlFor: field.name, children: "Password" }),
          /* @__PURE__ */ jsx(Input, { id: field.name, name: field.name, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), "aria-invalid": isInvalid, placeholder: "Enter password", autoComplete: "off", type: "password" }),
          isInvalid && /* @__PURE__ */ jsx(FieldError, { errors: field.state.meta.errors })
        ] });
      } })
    ] }) }) }),
    /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(form.Subscribe, { selector: (state) => state.isSubmitting, children: (isSubmitting) => /* @__PURE__ */ jsx(Button, { type: "submit", form: `login-form`, disabled: isSubmitting, children: isSubmitting ? "Logging in..." : "Login" }) }) })
  ] }) });
}
export {
  LoginForm,
  RouteComponent as component
};
