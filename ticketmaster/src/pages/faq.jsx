import React, { useState, useEffect } from 'react';

const Faq = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  const faqs = [
    {
      question: "How can I purchase tickets for a match?",
      answer: "You can purchase tickets by visiting our website and selecting the match you want to attend. Follow the prompts to complete your purchase."
    },
    {
      question: "Can I get a refund if I can't attend the match?",
      answer: "Refund policies vary depending on the event and organizer. Please refer to the 'Refund Policy' section on our website for detailed information."
    },
    {
      question: "How do I check the status of my ticket order?",
      answer: "You can check the status of your ticket order by logging into your account on our website and navigating to the 'My Orders' section."
    },
    {
      question: "Are there any discounts available for group bookings?",
      answer: "Yes, we offer discounts for group bookings. Please contact our support team for more details on group booking discounts."
    },
    {
      question: "Where can I find my purchased tickets?",
      answer: "After purchase, your tickets will be available in the 'My Tickets' section of your account. You will also receive a confirmation email with your ticket details."
    }
  ];

  useEffect(() => {
    setFilteredFaqs(faqs);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredFaqs(
        faqs.filter(faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredFaqs(faqs);
    }
  }, [searchQuery]);

  return (
    <div className="lg:container lg:mx-auto lg:py-16 md:py-12 md:px-6 py-12 px-4">
      <h1 className="text-center lg:text-4xl text-3xl lg:leading-9 leading-7 text-black font-semibold">FAQ's</h1>

      <div className="lg:mt-12 bg-gray-100 md:mt-10 mt-8 lg:py-7 lg:px-6 md:p-6 py-6 px-4 lg:w-10/12 w-full mx-auto">
        <div className="flex justify-between md:flex-row flex-col">
          <div className="md:mb-0 mb-8 md:text-left text-center">
            <h2 className="font-medium text-xl leading-5 text-black lg:mb-2 mb-4">Questions</h2>
            <p className="font-normal text-sm leading-5 text-black md:w-8/12 md:ml-0 w-11/12 mx-auto">
              If you don’t find your answer, please contact us or leave a message, we’ll be more than happy to assist you.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex bg-white md:justify-center justify-between items-center px-4 py-3 w-full">
              <input
                className="focus:outline-none bg-white"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg1.svg" alt="search" />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-8/12 w-full mx-auto">
        {filteredFaqs.map((faq, index) => (
          <div key={index}>
            <hr className="w-full lg:mt-10 my-8" />
            <div className="w-full md:px-6">
              <div id="mainHeading" className="flex justify-between items-center w-full">
                <div>
                  <p className="flex justify-center items-center font-medium text-base leading-6 lg:leading-4 text-black">
                    <span className="lg:mr-6 mr-4 lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold text-black">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </p>
                </div>
                <button aria-label="toggler" className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" data-menu>
                  <img className="transform" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2.svg" alt="toggler" />
                </button>
              </div>
              <div id="menu" className="hidden mt-6 w-full">
                <p className="text-base leading-6 text-black font-normal">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
