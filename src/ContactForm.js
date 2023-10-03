import React, { useState } from 'react';
import { db, collection, addDoc } from './firebase';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(''); // State to track submission status

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (!name || !email || !mobile || !message) {
      alert("All fields are required.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'contacts'), {
        name: name,
        email: email,
        mobile: mobile,
        message: message,
        timestamp: new Date(),
      });

      console.log('Document written with ID: ', docRef.id);

      // Clear form fields
      setName('');
      setEmail('');
      setMobile('');
      setMessage('');

      // Set success message in the state
      alert("Sent Successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message. Please check the console for more details.");
    }
  };

  return (
    <div>
      <h1>Contact me</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required // Adding the "required" attribute to make it a required field
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>

      {/* Display success or error message */}
      {submitStatus === 'Success' && <p>Message sent successfully!</p>}
      {submitStatus === 'Error' && <p>Message sending failed. Please try again later.</p>}
    </div>
  );
}

export default ContactForm;
