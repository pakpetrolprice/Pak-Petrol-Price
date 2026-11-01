'use client';

import React, { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition';
const labelClass =
  'block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5';
const optionClass = 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('submitting');

    try {
      const formData = new FormData(form);
      const body = new URLSearchParams(
        Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
      ).toString();

      // POST to the static skeleton file so the request reaches Netlify Forms
      // instead of the Next.js server handler.
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-emerald-300 dark:border-emerald-800 shadow-xs space-y-3 text-center transition-colors"
      >
        <p className="text-2xl">✅</p>
        <h2 className="text-xl font-black text-slate-950 dark:text-white">Thank you for reaching out!</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Your message has been sent. Our team will get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 transition-colors"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="subject" value="New contact message from %{siteName}" />
      <p className="hidden" aria-hidden="true">
        <label>
          Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="name" className={labelClass}>
          Your Full Name
        </label>
        <input id="name" name="name" type="text" required className={inputClass} placeholder="Enter your name" />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={inputClass}
          placeholder="your.email@gmail.com"
        />
      </div>

      <div>
        <label htmlFor="topic" className={labelClass}>
          Inquiry Topic
        </label>
        <select id="topic" name="topic" className={inputClass}>
          <option className={optionClass}>General Inquiry / Question</option>
          <option className={optionClass}>Feature Suggestion &amp; Feedback</option>
          <option className={optionClass}>Business / Advertising Inquiry</option>
          <option className={optionClass}>Press &amp; Media Relations</option>
          <option className={optionClass}>Data Verification Notice</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={inputClass}
          placeholder="How can we help you today? Please share your question or comments..."
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm font-semibold text-red-600 dark:text-red-400">
          Sorry, something went wrong while sending your message. Please try again in a moment.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-sm sm:text-base shadow-sm hover:shadow-md transition"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
