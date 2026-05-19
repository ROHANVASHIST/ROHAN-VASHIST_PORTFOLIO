import { useState, FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="max-w-lg mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Let's Connect</h1>
      {submitted ? (
        <div className="bg-green-50 text-green-700 p-6 rounded-lg text-center">
          <p className="font-semibold">Message sent successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Your Name" required className="w-full px-4 py-2 border rounded-lg" />
          <input type="email" placeholder="Your Email" required className="w-full px-4 py-2 border rounded-lg" />
          <textarea placeholder="Your Message" required rows={5} className="w-full px-4 py-2 border rounded-lg"></textarea>
          <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 font-semibold">
            Send Message
          </button>
        </form>
      )}
    </main>
  );
}
