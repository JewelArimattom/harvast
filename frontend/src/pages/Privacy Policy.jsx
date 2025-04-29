import React from 'react';

const PolicyPage = () => {
  return (
    <div className="bg-black py-16 px-4 sm:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
          Website Policies
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Please review our policies carefully. By using our services, you agree to these terms.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Privacy Policy */}
        <section className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 shadow-lg hover:shadow-red-900/30 transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-900/30 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-400">Privacy Policy</h2>
          </div>
          
          <div className="space-y-5">
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Information We Collect
              </h3>
              <p className="text-gray-300 pl-4">
                Personal details like name, email, phone number, and payment information when you make purchases or create an account.
              </p>
            </div>
            
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Data Usage
              </h3>
              <p className="text-gray-300 pl-4">
                We use your information to process transactions, improve services and communicate with you.
              </p>
            </div>
            
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Security Measures
              </h3>
              <p className="text-gray-300 pl-4">
                We implement robust security protocols, though no internet transmission is 100% secure.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Policy */}
        <section className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 shadow-lg hover:shadow-red-900/30 transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-900/30 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-400">Shipping Policy</h2>
          </div>
          
          <div className="space-y-5">
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Processing Time
              </h3>
              <p className="text-gray-300 pl-4">
                1-3 business days (may extend during peak seasons).
              </p>
            </div>
            
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Delivery Estimates
              </h3>
              <p className="text-gray-300 pl-4">
                Domestic: 3-7 days | International: 7-21 days (varies by destination).
              </p>
            </div>
            
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Tracking & Costs
              </h3>
              <p className="text-gray-300 pl-4">
                Tracking provided via email. Costs calculated by weight, size, and destination.
              </p>
            </div>
          </div>
        </section>

        {/* Terms and Conditions */}
        <section className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 shadow-lg hover:shadow-red-900/30 transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-900/30 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-400">Terms & Conditions</h2>
          </div>
          
          <div className="space-y-5">
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Acceptance of Terms
              </h3>
              <p className="text-gray-300 pl-4">
                By using our website, you agree to be bound by these terms and all applicable laws.
              </p>
            </div>
            
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Intellectual Property
              </h3>
              <p className="text-gray-300 pl-4">
                All content is protected by copyright and trademark laws.
              </p>
            </div>
            
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                User Conduct
              </h3>
              <p className="text-gray-300 pl-4">
                You agree not to use our services for any unlawful activities.
              </p>
            </div>
          </div>
        </section>

        {/* Cancellations and Refunds */}
        <section className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 shadow-lg hover:shadow-red-900/30 transition-shadow duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-900/30 flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-400">Cancellations & Refunds</h2>
          </div>
          
          <div className="space-y-5">
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Cancellation Window
              </h3>
              <p className="text-gray-300 pl-4">
                24 hours from order placement (before shipping begins).
              </p>
            </div>
            
            <div className="group">
              <h3 className="text-lg font-semibold text-red-300 mb-1 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 group-hover:animate-pulse"></span>
                Refund Eligibility
              </h3>
              <p className="text-gray-300 pl-4">
                Defective/damaged items within 30 days. Original payment method refunded.
              </p>
            </div>
            

          </div>
        </section>
      </div>

      <div className="text-center mt-16">
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-700 to-red-900 rounded-full shadow-lg hover:shadow-red-700/50 transition-all duration-300 group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="font-medium"><a href="mailto:harvastfoodproducts@gmail.com">Contact Us for Questions</a></span>   

        </div>
        <p className="text-gray-400 mt-4 text-sm">
        </p>
      </div>
    </div>
  );
};

export default PolicyPage;