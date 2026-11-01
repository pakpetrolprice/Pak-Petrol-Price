'use client';

import React, { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // If bot-field is filled, silently discard or return
    if (formData.get('bot-field')) {
      setStatus('success');
      return;
    }

    try {
      const urlEncoded = new URLSearchParams();
      formData.forEach((value, key) => {
        urlEncoded.append(key, value.toString());
      });

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlEncoded.toString(),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        throw new Error(`Submission failed with status: ${response.status}`);
      }
    } catch (err: unknown) {
      console.error('Contact form submission error:', err);
      // Even if network fails locally on dev, Netlify production catches this.
      // But let's show user-friendly error with retry.
      setStatus('error');
      setErrorMessage(
        'Unable to send message right now. Please check your internet connection or email us directly at pakpetrolprice@gmail.com.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs text-center space-y-4 transition-colors">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 mx-auto flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Message Sent Successfully!
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Thank you for reaching out to Pak Petrol Price. Your inquiry has been received and our team will get back to you promptly.
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="px-6 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm transition"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-5 transition-colors"
    >
      {/* Required hidden input for Netlify form identification */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot field for anti-spam (hidden from users) */}
      <p className="hidden" aria-hidden="true">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="font-bold">Transmission Error</p>
            <p className="text-xs mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          Your Full Name <span className="text-rose-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={status === 'submitting'}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition disabled:opacity-50"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          Email Address <span className="text-rose-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={status === 'submitting'}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition disabled:opacity-50"
          placeholder="name@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          Inquiry Topic
        </label>
        <select
          id="subject"
          name="subject"
          disabled={status === 'submitting'}
          defaultValue="General Inquiry / Question"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition disabled:opacity-50"
        >
          <option value="General Inquiry / Question" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">General Inquiry / Question</option>
          <option value="Feature Suggestion & Feedback" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Feature Suggestion &amp; Feedback</option>
          <option value="Business / Advertising Inquiry" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Business / Advertising Inquiry</option>
          <option value="Press & Media Relations" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Press &amp; Media Relations</option>
          <option value="Data Verification Notice" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">Data Verification Notice</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
          Your Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={status === 'submitting'}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition disabled:opacity-50 resize-y"
          placeholder="How can we help you today? Please share your question, comments, or advertising inquiry..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-sm sm:text-base shadow-sm hover:shadow-md transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending Message...
          </>
        ) : (
          <>
            <span>Send Message</span>
            <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
