import React from 'react';

function OurPolicy() {
  return (
    <div className="bg-black py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          OUR <span className="text-red-600">COMMITMENTS</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Exchange Policy */}
          <div className="bg-gray-900 p-8 rounded-lg hover:shadow-lg hover:shadow-red-600/20 transition-all duration-300 border border-gray-800 group">
            <div className="bg-red-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
              <img 
                src="https://img.icons8.com/ios-filled/100/ffffff/exchange.png" 
                className="w-8 h-8" 
                alt="Exchange" 
              />
            </div>
            <h3 className="font-bold text-lg text-white mb-4 text-center">Easy Exchange Policy</h3>
            <p className="text-gray-400 text-base text-center leading-relaxed">
              If you receive the wrong item, you can exchange it within 7 days of delivery or get a refund of the full amount of the product.
            </p>
          </div>

          {/* Customer Support */}
          <div className="bg-gray-900 p-8 rounded-lg hover:shadow-lg hover:shadow-red-600/20 transition-all duration-300 border border-gray-800 group">
            <div className="bg-red-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
              <img 
                src="https://img.icons8.com/ios-filled/100/ffffff/customer-support.png" 
                className="w-8 h-8" 
                alt="Support" 
              />
            </div>
            <h3 className="font-bold text-lg text-white mb-4 text-center">Customer Support</h3>
            <p className="text-gray-400 text-base text-center leading-relaxed">
              Responsive and reliable, our customer support provides swift solutions and tailored care to ensure your satisfaction.
            </p>
          </div>

          {/* Best Quality */}
          <div className="bg-gray-900 p-8 rounded-lg hover:shadow-lg hover:shadow-red-600/20 transition-all duration-300 border border-gray-800 group">
            <div className="bg-red-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
              <img 
                src="https://img.icons8.com/ios-filled/100/ffffff/medal2.png" 
                className="w-8 h-8" 
                alt="Quality" 
              />
            </div>
            <h3 className="font-bold text-lg text-white mb-4 text-center">Premium Quality</h3>
            <p className="text-gray-400 text-base text-center leading-relaxed">
              We deliver the best quality, combining excellence, precision, and reliability in every product and service. Your satisfaction is our top priority.
            </p>
          </div>
        </div>

        {/* Decorative Spice Elements */}
        <div className="hidden md:flex justify-center mt-16 space-x-8">
          {['Organic Spices', 'Indian Spices', 'Premium Quality Spices',].map((spice, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
              <span className="text-sm text-gray-400 font-medium">{spice}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;