import React, { useState } from "react";
import { createShortUrl } from "../api/Short_url_api.js";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

const Url_input = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    if (!url.trim()) {
      setError("Please enter a URL.");
      setSuccess("");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      setSuccess("");

      const result = await createShortUrl(url, customSlug);

      setShortUrl(result);

      setSuccess("Your short URL has been created!");

      // Refresh user's URL list
      queryClient.invalidateQueries({
        queryKey: ["userUrls"],
      });

      setUrl("");
      setCustomSlug("");

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };
const handleCopy = async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // HTTPS or localhost
      await navigator.clipboard.writeText(shortUrl);
    } else {
      // HTTP fallback (works on your ALB)
      const textArea = document.createElement("textarea");
      textArea.value = shortUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  } catch (err) {
    setError("Unable to copy the URL.");
    console.error(err);
  }
};

  return (
    <div>

      {/* URL Input */}
      <div className="flex flex-col sm:flex-row gap-3">

        <div className="flex-1">
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="https://example.com/your-long-url"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>

              Creating...
            </>
          ) : (
            <>
              Shorten
            </>
          )}
        </button>

      </div>

      {/* Custom Slug */}
      {isAuthenticated && (
        <div className="mt-5">

          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Custom URL
            <span className="text-gray-400 font-normal ml-1">
              (Optional)
            </span>
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              /
            </span>

            <input
              type="text"
              id="customSlug"
              value={customSlug}
              onChange={(event) => {
                setCustomSlug(event.target.value);
                setError("");
              }}
              placeholder="my-custom-link"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />

          </div>

          <p className="text-xs text-gray-400 mt-2">
            Create an easy-to-remember custom ending for your URL.
          </p>

        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">

          <svg
            className="w-5 h-5 mt-0.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p className="text-sm">{error}</p>

        </div>
      )}

      {/* Success */}
      {success && (
        <div className="mt-4 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">

          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>

          <p className="text-sm font-medium">
            {success}
          </p>

        </div>
      )}

      {/* Generated URL */}
      {shortUrl && (
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4">

          <p className="text-sm font-medium text-gray-700 mb-3">
            Your shortened URL
          </p>

          <div className="flex flex-col sm:flex-row gap-3">

            <div className="flex-1 relative">

              <input
                type="text"
                value={shortUrl}
                readOnly
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-xl outline-none text-blue-600 font-medium"
              />

            </div>

            <button
              onClick={handleCopy}
              className={`px-5 py-3 text-white rounded-xl font-medium transition ${
                copied
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-800 hover:bg-gray-900"
              }`}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Url_input;