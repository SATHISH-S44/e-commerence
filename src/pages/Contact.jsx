import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Have questions? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-2xl sm:text-3xl">📍</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Address</h3>
                    <p className="text-gray-600 text-sm sm:text-base">123 E-Shop Street, Commerce City, CC 12345</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-2xl sm:text-3xl">📞</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Phone</h3>
                    <p className="text-gray-600 text-sm sm:text-base">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-2xl sm:text-3xl">📧</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Email</h3>
                    <p className="text-gray-600 text-sm sm:text-base">support@eshop.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-2xl sm:text-3xl">🕐</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Business Hours</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 text-sm sm:text-base">Sat - Sun: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 order-1 md:order-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Send us a Message</h2>
              
              {submitted && (
                <div className="bg-green-100 text-green-700 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 text-sm sm:text-base">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 sm:py-3 rounded-lg hover:bg-purple-700 active:scale-95 transition-all duration-200 font-medium text-sm sm:text-base"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
