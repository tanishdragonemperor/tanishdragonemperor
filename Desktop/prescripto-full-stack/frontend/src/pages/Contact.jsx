import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../assets/assets';
import { toast } from "react-toastify";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const x= await axios.post('http://localhost:4000/api/contact/send-email', formData);
      console.log(x)
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setShowForm(false); 
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message.');
    }
  };

  return (
    <div>
      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>
          CONTACT <span className='text-gray-700 font-semibold'>US</span>
        </p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img
          className='w-full md:max-w-[360px]'
          src={assets.contact_image}
          alt=''
        />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>CONTACT INFO</p>
          <p className='text-gray-500'>
            Mailing Address:
            <br />
            2030 Ridge Moor Dr
            <br />
            Plainfield IL 60586-5706
          </p>
          <p className='text-gray-500'>
            Telephone Number:
            <br />
            (815) 613-6960
          </p>
          <p className='font-semibold text-lg text-gray-600'>
            MEMBERSHIP INFORMATION
          </p>
          <p className='text-gray-500'>
            Learn more about joining our chapter
          </p>
          <button
            className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'
            onClick={() => setShowForm(true)}
          >
            Email Us
          </button>
        </div>
      </div>

      {showForm && (
        <div className='flex flex-col justify-center items-center'>
          <h2 className='text-lg font-bold mb-4'>Send Us a Message</h2>
          <form
            className='flex flex-col gap-4 w-full max-w-md'
            onSubmit={handleSubmit}
          >
            <label>
              Name:
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='border border-gray-300 rounded-md px-4 py-2 w-full'
              />
            </label>
            <label>
              Email:
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='border border-gray-300 rounded-md px-4 py-2 w-full'
              />
            </label>
            <label>
              Message:
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                className='border border-gray-300 rounded-md px-4 py-2 w-full'
              />
            </label>
            <div className='flex gap-4'>
              <button
                type='submit'
                className='border border-black px-8 py-2 text-sm hover:bg-black hover:text-white transition-all duration-500'

              >
                Submit
              </button>
              <button
                type='button'
                className='border border-gray-500 px-8 py-2 text-sm hover:bg-gray-500 hover:text-white transition-all duration-500'
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Contact;
