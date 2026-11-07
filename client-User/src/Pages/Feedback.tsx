import { Form } from "radix-ui";
import { useState } from "react";
import { useSearchParams } from "react-router";
import { ToolBar } from "../components/ToolBar";

// ?from=calculus-book lets the calculus mini-site link here and tag the feedback.
const SOURCE_LABELS: Record<string, string> = {
  blog: "the blog",
  "calculus-book": "Calculus 2 From Zero",
};

const inputClass =
  "bg-blackA2 shadow-blackA6 selection:bg-blackA6 box-border w-full appearance-none rounded px-2.5 py-2 text-[15px] text-black shadow-[0_0_0_1px] outline-none dark:text-white dark:hover:shadow-[0_0_0_1px_white] dark:focus:shadow-[0_0_0_2px_white]";
const labelClass =
  "text-[15px] leading-[35px] font-medium text-green-700 dark:text-green-500";
const messageClass = "text-[13px] text-black opacity-80 dark:text-white";

export function Feedback() {
  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get("from") ?? "blog";
  const source = fromParam in SOURCE_LABELS ? fromParam : "blog";

  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (submitting || !form.checkValidity()) return;

    const data = Object.fromEntries(new FormData(form));
    setSubmitting(true);
    setStatus("");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      if (response.ok) {
        setStatus("Thanks! Your feedback is on its way to my inbox <3");
        form.reset();
      } else if (response.status === 429) {
        setStatus("You've sent a lot already. Try again in a bit.");
      } else {
        setStatus("Couldn't send that right now. Please try again later.");
      }
    } catch {
      setStatus("Couldn't send that right now. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex w-full justify-center">
        <ToolBar def={"Feedback"} />
      </div>

      <section className="prose prose-headings:text-green-700 dark:prose-invert mx-auto flex w-4/5 max-w-full flex-col bg-gray-200 p-4 max-sm:w-full sm:p-6 dark:bg-gray-900 dark:text-white">
        <h1>Send me feedback</h1>
        <p>
          Typos, confusing bits, ideas, or just a hello about{" "}
          <strong>{SOURCE_LABELS[source]}</strong>. Leave your email if you'd
          like a reply; it's optional.
        </p>

        <Form.Root onSubmit={handleSubmit} className="not-prose grid gap-3">
          <Form.Field name="name" className="grid">
            <Form.Label className={labelClass}>Name (optional)</Form.Label>
            <Form.Control asChild>
              <input className={inputClass} type="text" maxLength={100} />
            </Form.Control>
          </Form.Field>

          <Form.Field name="email" className="grid">
            <Form.Label className={labelClass}>Email (optional)</Form.Label>
            <Form.Control asChild>
              <input
                className={inputClass}
                type="email"
                placeholder="email@example.com"
              />
            </Form.Control>
            <Form.Message className={messageClass} match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </Form.Field>

          <Form.Field name="message" className="grid">
            <Form.Label className={labelClass}>Message</Form.Label>
            <Form.Control asChild>
              <textarea
                className={`${inputClass} min-h-40 resize-y`}
                required
                minLength={5}
                maxLength={5000}
              />
            </Form.Control>
            <Form.Message className={messageClass} match="valueMissing">
              Please write a message
            </Form.Message>
            <Form.Message className={messageClass} match="tooShort">
              A little longer, please
            </Form.Message>
          </Form.Field>

          {/* Honeypot: hidden from people, bots fill it in and get ignored. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <Form.Submit asChild>
            <button
              disabled={submitting}
              className="hover:bg-mauve3 box-border inline-flex h-9 w-full cursor-pointer items-center justify-center rounded bg-gray-300 px-4 font-medium shadow-[0_2px_3px] transition-all duration-100 focus:outline-none focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-green-600 active:translate-y-px active:shadow-none disabled:cursor-wait disabled:opacity-60 dark:bg-gray-500"
            >
              {submitting ? "Sending..." : "Send feedback"}
            </button>
          </Form.Submit>

          <div
            role="status"
            className="flex min-h-6 justify-center text-[14px] text-black dark:text-white"
          >
            {status}
          </div>
        </Form.Root>
      </section>
    </div>
  );
}
