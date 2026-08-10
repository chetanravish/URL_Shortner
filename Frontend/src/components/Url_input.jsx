import React from 'react'
import { useState } from 'react'
import { createShortUrl } from '../api/Short_url_api.js'


const Url_input = () => {

    const [url, setUrl] = useState("")
    const [shortUrl, setShortUrl] = useState("")

    const handleSubmit = async () => {
        if (!url.trim()) {
            alert("Please enter a URL");
            return;
        }
        const shortUrl = await createShortUrl(url);
        setShortUrl(shortUrl)
    }

    return (
        <div>
            <div className="flex gap-3">

                <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your long URL..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition"
                > Shorten
                </button>

                {/* Error */}
                {/* {error && (
          <p className="text-red-500 text-sm mt-3">
            {error}
          </p>
        )} */}



            </div>
            {/* Result */}
            {shortUrl && (
                <div className="mt-6">

                    <p className="text-sm text-gray-500 mb-2">
                        Your shortened URL
                    </p>

                    <div className="flex gap-3">

                        <input
                            type="text"
                            value={shortUrl}
                            readOnly
                            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none"
                        />

                        <button
                            onClick={(e) => {
                                navigator.clipboard.writeText(shortUrl);

                                const button = e.currentTarget;

                                button.textContent = "Copied ✓";
                                button.classList.remove("bg-gray-800", "hover:bg-gray-900");
                                button.classList.add("bg-green-400");

                                setTimeout(() => {
                                    button.textContent = "Copy";
                                    button.classList.remove("bg-green-400");
                                    button.classList.add("bg-gray-800", "hover:bg-gray-900");
                                }, 2500);
                            }}
                            className="px-5 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                        >
                            Copy
                        </button>

                    </div>

                </div>
            )}
        </div>
    )
}

export default Url_input
