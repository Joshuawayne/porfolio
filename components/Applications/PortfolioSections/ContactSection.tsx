import React from 'react';

const ContactSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Beep Boop! Your message has been 'sent' . For a real connection, please use the email below. Thanks!");
    // Reset form if needed
  };

  return (
    <div className="p-4 space-y-6 text-sm overflow-y-auto h-full">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Get In Touch!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="y2k-raised bg-gray-50 p-4 space-y-3">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">Send a Message :</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-xs font-medium mb-0.5"> Name:</label>
              <input type="text" id="name" name="name" required className="w-full p-1.5 y2k-sunken text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-medium mb-0.5"> Email:</label>
              <input type="email" id="email" name="email" required className="w-full p-1.5 y2k-sunken text-sm" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-xs font-medium mb-0.5">Subject:</label>
              <input type="text" id="subject" name="subject" className="w-full p-1.5 y2k-sunken text-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-medium mb-0.5">Your Message:</label>
              <textarea id="message" name="message" rows={4} required className="w-full p-1.5 y2k-sunken text-sm resize-none"></textarea>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="captcha" className="y2k-button" defaultChecked/>
              <label htmlFor="captcha" className="text-xs">I promise I'm not a spam-bot from 1998.</label>
            </div>
            <button type="submit" className="y2k-button bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 text-base">
              SEND &gt;&gt;
            </button>
          </form>
        </section>

        <section className="y2k-raised bg-gray-50 p-4 space-y-3">
          <h3 className="text-lg font-semibold text-purple-600 mb-2"> Contact Info:</h3>
          <div className="space-y-2">
            <p>
              <strong>Email:</strong> <a href="mailto:mercyjoshu0@gmail.com" className="text-blue-600 underline hover:text-orange-500">mercyjoshu0@gmail.com</a>
            </p>
             <p>
              <strong>Twitter / X:</strong> <a href="https://x.com/yasukedebtera" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-orange-500">@yasukedebtera</a>
            </p>
            <p className="mt-3 text-gray-500 text-xs">--- BeepBoop ---</p>
            <p>
              <strong>ICQ UIN:</strong> 1234567 (If you still remember this!)
            </p>
            <p>
              <strong>AIM ScreenName:</strong> Joshua Mercy (BRB!)
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactSection;
