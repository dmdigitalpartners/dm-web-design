"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contactSchema, type ContactInput } from "@/lib/validation/contact-schema";
import { contactPage } from "@/lib/data/contact";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    statusRef.current?.focus();
  }, [status]);

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (json.ok) {
        setStatus("success");
        reset();
      } else {
        setServerError(json.error ?? contactPage.form.error);
        setStatus("error");
      }
    } catch {
      setServerError(contactPage.form.error);
      setStatus("error");
    }
  };

  const f = contactPage.form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="contact-name">{f.fields.name.label}</Label>
        <Input
          id="contact-name"
          autoComplete="name"
          placeholder={f.fields.name.placeholder}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name ? (
          <p id="contact-name-error" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">{f.fields.email.label}</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder={f.fields.email.placeholder}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email ? (
          <p id="contact-email-error" className="text-sm text-destructive">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">{f.fields.message.label}</Label>
        <Textarea
          id="contact-message"
          rows={6}
          placeholder={f.fields.message.placeholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-sm text-destructive">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot, hidden from real users, tabbed over by screen readers too */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Компания</label>
        <input
          id="contact-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <Button type="submit" size="lg" className="h-11 px-8" disabled={status === "sending"}>
        {status === "sending" ? f.sending : f.submit}
      </Button>

      <p
        ref={statusRef}
        aria-live="polite"
        role="status"
        tabIndex={-1}
        className="scroll-mt-28 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {status === "success" ? (
          <span className="text-sage">{f.success}</span>
        ) : null}
        {status === "error" ? (
          <span className="text-destructive">
            {serverError}{" "}
            <a
              className="rounded-sm underline outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
          </span>
        ) : null}
      </p>
    </form>
  );
}
