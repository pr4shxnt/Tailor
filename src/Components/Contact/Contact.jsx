import React, { useState } from 'react';
import { Scissors, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha'; // Import ReCAPTCHA component

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [captchaVerified, setCaptchaVerified] = useState(false); // Track captcha verification

  // Callback to handle captcha success
  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true); // Set to true when CAPTCHA is successfully verified
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert('Please complete the CAPTCHA.');
      return;
    }

    // Handle form submission logic
    console.log('Form submitted with:', formData);
  };

  return (
    <div className="min-h-screen pt-16 bg-white">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Scissors className="w-10 h-10" />
              Contact Us
            </h1>
            <p className="text-xl">We're Here to Help You Look Your Best</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Visit Our Shop</h3>
                  <p className="text-gray-600">123 Fashion Street</p>
                  <p className="text-gray-600">Textile District</p>
                  <p className="text-gray-600">City, State 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 10:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 5:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                  <p className="text-gray-600">(555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">info@shantatailors.com</p>
                  <p className="text-gray-600">appointments@shantatailors.com</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1!2d-73.98!3d40.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwMC4wIk4gNzPCsDU4JzQ4LjAiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="">Select a subject</option>
                  <option value="appointment">Book an Appointment</option>
                  <option value="quote">Request a Quote</option>
                  <option value="alteration">Alteration Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              {/* CAPTCHA */}
              <div className="mt-4">
                <ReCAPTCHA
                  sitekey="6LcApsgqAAAAAMKHcvt22BtZTBAuV6XRNz3VwhvN" // Replace with your site key
                  onChange={handleCaptchaChange}
                />
              </div>

              <button
                type="submit"
                disabled={!captchaVerified} // Disable button if CAPTCHA is not verified
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
