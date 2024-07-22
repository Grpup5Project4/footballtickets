
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navBar';
import Footer from '../components/footer';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Firebase Realtime Database URL
    const firebaseURL = 'https://sportstest-cce07-default-rtdb.firebaseio.com/contactmsg.json';

    // Data to be sent to Firebase
    const data = {
      name: name,
      email: email,
      message: message,
      timestamp: new Date().toISOString()
    };

    // Using Axios to send POST request to Firebase
    axios.post(firebaseURL, data)
      .then(response => {
        setSubmitting(false);
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch(error => {
        console.error('Error adding message to Firebase Database:', error);
        setSubmitting(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Football</h1>
        <p className="mb-4">
          Football is your premier destination for buying tickets to football matches around the world.
          Whether you're a die-hard fan or a casual enthusiast, we provide a seamless experience to
          purchase tickets to your favorite teams' games.
        </p>
        <p className="mb-4">
          At Football, we are passionate about bringing fans closer to the action. Our platform
          ensures that you have access to the latest schedules, ticket availability, and secure
          transactions so you can focus on enjoying the game.
        </p>
        <p className="mb-4">
          Founded with a love for football and a commitment to customer satisfaction, Football strives
          to be your trusted partner in experiencing the thrill of live matches. Join us and be a part
          of the excitement!
        </p>
        <p className="mb-4">
          For any inquiries or assistance, please feel free to <a href="/contact">contact us</a>. We're here to help!
        </p>

        <hr className="my-8" />

        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        {submitted ? (
          <p className="text-green-600">Message submitted successfully!</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-green-600 text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 p-2 w-full border-gray-300 rounded-md text-black" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-green-600 text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 p-2 w-full border-gray-300 rounded-md text-black" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-green-600 text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows="4" required className="mt-1 p-2 w-full border-gray-300 rounded-md text-black"></textarea>
            </div>
            <button type="submit" disabled={submitting} className="bg-green-600 text-white py-2 px-4 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed">
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
