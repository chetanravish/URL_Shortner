import React from "react";
import Url_input from "../components/Url_input";
import User_urls from "../components/User_urls";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      <div className="w-full max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl shadow-md mb-4">
            <svg
              className="w-7 h-7 text-white"
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

          <h1 className="text-4xl font-bold text-gray-900">
            URL Shortener
          </h1>

          <p className="text-gray-500 mt-2">
            Turn long URLs into short, simple links.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">

          {/* URL Generator */}
          <div>
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Create a short URL
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Paste your long URL below and we'll create a short link for you.
              </p>
            </div>

            <Url_input />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-8" />

          {/* User URLs */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Your URLs
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Manage and track your shortened URLs.
              </p>
            </div>

            <User_urls />
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Keep your links short and easy to share.
        </p>

      </div>
    </div>
  );
};

export default Dashboard;