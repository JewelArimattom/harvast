import React from 'react';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-12 border-t border-gray-200">
        <div className="text-center">
          <Title text1={"Contact"} text2={"Us"} />
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out with any questions or inquiries.
          </p>
        </div>

        <div className="mt-12 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <img 
              className="w-full h-auto rounded-lg shadow-md" 
              src="https://i.pinimg.com/736x/a4/18/c2/a418c2fba3a5080f1554bab58ad88f3b.jpg" 
              alt="Our location" 
              loading="lazy"
            />
          </div>
          
          <div className="w-full md:w-1/2 lg:w-2/5 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Location</h3>
              <p className="text-gray-600">India, Kerala, Kottyam</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Contact Information</h3>
              <address className="not-italic text-gray-600">
                <p className="mb-1">Phone: <a href="tel:+91 9061336064" className="hover:text-blue-600 transition">+91 9061336064</a></p>
                <p>Email: <a href="mailto:harvastfoodproducts@gmail.com" className="hover:text-blue-600 transition">harvastfoodproducts@gmail.com</a></p>
              </address>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;