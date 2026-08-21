import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUserUrls, deleteUserUrl } from "../api/user_api.js";

const User_urls = () => {

  const queryClient = useQueryClient();

  const {
    data: urls,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getAllUserUrls,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const [copiedId, setCopiedId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleCopy = async (url, id) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // HTTPS or localhost
      await navigator.clipboard.writeText(url);
    } else {
      // HTTP fallback for ALB
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      document.execCommand("copy");
      document.body.removeChild(textArea);
    }

    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);

  } catch (err) {
    console.error("Copy failed:", err);
  }
};
const handleDelete = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this shortened URL?"
    );

    if (!confirmed) return;

    try {
        await deleteUserUrl(id);

        queryClient.invalidateQueries({
            queryKey: ["userUrls"]
        });

    } catch (err) {
        console.error(err);
    }
};


  /* ---------------- Loading ---------------- */

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">

        <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

        <p className="text-sm text-gray-500 mt-3">
          Loading your URLs...
        </p>

      </div>
    );
  }



  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5">

        <div className="flex items-start gap-3">

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

          <div>
            <p className="font-medium">
              Unable to load your URLs
            </p>

            <p className="text-sm mt-1">
              {error?.message || "Something went wrong."}
            </p>
          </div>

        </div>

      </div>
    );
  }


  const userUrls = urls?.urls || [];


  /* ---------------- Empty State ---------------- */

  if (userUrls.length === 0) {
    return (
      <div className="text-center py-12 px-5 bg-gray-50 border border-gray-200 rounded-2xl">

        <div className="w-14 h-14 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">

          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 10.172a4 4 0 015.656 0l1.172 1.172a4 4 0 010 5.656l-2.828 2.828a4 4 0 01-5.656 0l-1.172-1.172m-1.172-4.656a4 4 0 00-5.656 0l-1.172 1.172a4 4 0 000 5.656l2.828 2.828a4 4 0 005.656 0l1.172-1.172"
            />
          </svg>

        </div>

        <h3 className="text-lg font-semibold text-gray-900 mt-4">
          No shortened URLs yet
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Create your first short URL above and it will appear here.
        </p>

      </div>
    );
  }


  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">

      {/* Table Header */}
      <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">

        <div>
          <h3 className="font-semibold text-gray-900">
            Your Links
          </h3>

          <p className="text-xs text-gray-500 mt-1">
            {userUrls.length}{" "}
            {userUrls.length === 1 ? "URL" : "URLs"} created
          </p>
        </div>

        <div className="text-xs text-gray-500">
          Auto-refresh: 30s
        </div>

      </div>


      {/* Table */}
      <div className="overflow-x-auto max-h-96">

        <table className="min-w-full">

          <thead className="bg-white sticky top-0 z-10 border-b border-gray-200">

            <tr>

              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Original URL
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Short URL
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Clicks
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-gray-100">

            {[...userUrls].reverse().map((url) => {

              const BASE_URL = import.meta.env.VITE_API_URL;
              const shortLink = `${import.meta.env.VITE_API_URL}/${url.short_url}`;
              const isDeleting =
                deletingId === url._id;

              return (
                <tr
                  key={url._id}
                  className="hover:bg-gray-50 transition"
                >

                  {/* Original URL */}
                  <td className="px-5 py-4">

                    <div
                      className="text-sm text-gray-800 max-w-xs truncate"
                      title={url.full_url}
                    >
                      {url.full_url}
                    </div>

                  </td>


                  {/* Short URL */}
                  <td className="px-5 py-4">

                    <a
                      href={shortLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap"
                    >
                      {shortLink}
                    </a>

                  </td>


                  {/* Clicks */}
                  <td className="px-5 py-4">

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">

                      {url.clicks}

                      {url.clicks === 1
                        ? " click"
                        : " clicks"}

                    </span>

                  </td>


                  {/* Actions */}
                  <td className="px-5 py-4">

                    <div className="flex items-center justify-end gap-2">

                      {/* Copy */}
                      <button
                        onClick={() =>
                          handleCopy(
                            shortLink,
                            url._id
                          )
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                          copiedId === url._id
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >

                        {copiedId === url._id ? (
                          <>
                            <svg
                              className="w-4 h-4"
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

                            Copied
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 12h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z"
                              />
                            </svg>

                            Copy
                          </>
                        )}

                      </button>


                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDelete(url._id)
                        }
                        disabled={isDeleting}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium transition"
                      >

                        {isDeleting ? (
                          <>
                            <svg
                              className="w-4 h-4 animate-spin"
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

                            Deleting
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>

                            Delete
                          </>
                        )}

                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default User_urls;