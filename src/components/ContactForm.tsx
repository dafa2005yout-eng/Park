import { useRef, useState } from "react";
import type { FormEvent } from "react";

const config = {
  service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const fieldClass =
  "mt-2 w-full rounded-2xl border border-ink/20 bg-white px-4 py-3 text-base text-ink outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 disabled:opacity-60";

export default function ContactForm() {
  const sending = useRef(false);
  const lastAttempt = useRef(0);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (!name || name.length > 100) nextErrors.name = "Введите имя (до 100 символов).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      nextErrors.email = "Введите корректный адрес электронной почты.";
    if (!message || message.length > 5000)
      nextErrors.message = "Введите сообщение (до 5000 символов).";
    setErrors(nextErrors);
    setNotice("");
    setStatus("idle");
    if (Object.keys(nextErrors).length) {
      (form.elements.namedItem(Object.keys(nextErrors)[0]) as HTMLElement)?.focus();
      return;
    }
    if (!config.service_id || !config.template_id || !config.user_id) {
      setStatus("error");
      setNotice("Отправка временно недоступна. Пожалуйста, попробуйте позже.");
      return;
    }
    if (Date.now() - lastAttempt.current < 5000) {
      setStatus("error");
      setNotice("Подождите несколько секунд перед повторной отправкой.");
      return;
    }
    sending.current = true;
    lastAttempt.current = Date.now();
    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          ...config,
          template_params: {
            name,
            email,
            message,
            time:
              new Intl.DateTimeFormat("ru-RU", {
                dateStyle: "long",
                timeStyle: "medium",
                timeZone: "Europe/Moscow",
              }).format(new Date()) + " (МСК)",
            site_name: "Александровский парк",
          },
        }),
      });
      if (!response.ok) {
        setStatus("error");
        setNotice(
          response.status === 429
            ? "Слишком много отправок. Пожалуйста, повторите попытку через минуту."
            : "Не удалось отправить сообщение. Ваш текст сохранён в форме — попробуйте позже.",
        );
        return;
      }
      form.reset();
      setStatus("success");
      setNotice("Спасибо! Ваше сообщение отправлено.");
    } catch {
      setStatus("error");
      setNotice(
        "Не удалось подтвердить отправку. Проверьте интернет-соединение и подождите минуту перед повторной попыткой. Ваш текст сохранён в форме.",
      );
    } finally {
      window.clearTimeout(timeout);
      sending.current = false;
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-20 bg-neutral-soft py-24 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-5">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-ink/60">
            — Обратная связь
          </div>
          <h2
            id="contact-title"
            className="font-display text-4xl font-700 leading-tight md:text-5xl"
          >
            Парк начинается
            <br />
            <span className="font-400 italic text-forest-deep">с диалога.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-ink/70">
            Есть вопрос или идея? Напишите нам — поделитесь впечатлениями и предложениями об
            Александровском парке.
          </p>
        </div>
        <form
          noValidate
          onSubmit={submit}
          aria-busy={status === "sending"}
          className="min-w-0 rounded-[28px] border border-ink/5 bg-white p-6 md:p-8 lg:col-span-7"
        >
          <fieldset disabled={status === "sending"} className="min-w-0 space-y-5">
            <legend className="sr-only">Отправить сообщение</legend>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium">
                  Имя <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className={fieldClass}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-2 text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm font-medium">
                  Электронная почта <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  className={fieldClass}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-2 text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="text-sm font-medium">
                Сообщение <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                maxLength={5000}
                rows={5}
                className={`${fieldClass} resize-y`}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-2 text-sm text-destructive">
                  {errors.message}
                </p>
              )}
            </div>
            <p className="text-xs leading-relaxed text-ink/60">
              Все поля обязательны. Сообщение и ваши контактные данные будут отправлены владельцу
              сайта через EmailJS.
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-14 w-full items-center justify-between gap-6 rounded-full bg-forest-deep px-7 text-base font-medium text-white transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Отправляем…" : "Отправить"}
              <span aria-hidden="true">↗</span>
            </button>
          </fieldset>
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={`mt-4 text-sm ${status === "error" ? "text-destructive" : "text-forest-deep"}`}
          >
            {notice}
          </div>
        </form>
      </div>
    </section>
  );
}
