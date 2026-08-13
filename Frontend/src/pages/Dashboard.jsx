import React from 'react'
import Url_input from '../components/Url_input'
import User_urls from '../components/User_urls'

const Dashboard = () => {
  return (
       <div>
          <div className="min-h-screen  bg-gray-100 flex items-center justify-center px-4">

      <div className= "  w-full -mt-20 max-w-2xl bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            URL Shortener
          </h1>

          <p className="text-gray-500 mt-2">
            Make your long URLs short and easy to share.
          </p>
        </div>

    <Url_input/>
    <User_urls/>
       
      </div>

    </div>
      
    </div>
  )
}

export default Dashboard
