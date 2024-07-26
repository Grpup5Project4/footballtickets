import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaypalConfig from './PaypalConfig';
import jsPDF from 'jspdf';
import './cartView.css';
import myImage from '../../assets/vsImg.png';

const CartView = () => {
    const userId = sessionStorage.getItem("userId");
    const location = useLocation();
    const { event, ticketType, price } = location.state || {};

    const [quantity, setQuantity] = useState(1);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(Math.max(newQuantity, 1));
    };

    const handleApplyCodeClick = () => {
        if (discountCode.toUpperCase() === 'DISCOUNT10') {
            setDiscount(10);
        } else if (discountCode.toUpperCase() === 'DISCOUNT50') {
            setDiscount(50);
        } else {
            alert('Invalid discount code');
        }
    };

    const totalPrice = price * quantity;
    const discountedTotal = totalPrice - (totalPrice * discount) / 100;

    const generatePDF = () => {
        if (!event) return;

        const doc = new jsPDF();
        const margin = 15;
        const pageWidth = doc.internal.pageSize.width;
        const lineHeight = 8;

        // Title Section
        doc.setFontSize(22);
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(0, 102, 204); // Blue color for title
        doc.text('Soccer Match Ticket', margin, 30);

        // Subtitle
        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(0, 0, 0); // Black color for subtitle
        doc.text('Receipt', margin, 45);

        // Stylish Horizontal Line
        doc.setDrawColor(0, 102, 204); // Blue color for line
        doc.setLineWidth(1.5);
        doc.line(margin, 50, pageWidth - margin, 50);

        // Event Details
        doc.setFontSize(12);
        doc.setFont('Helvetica', 'normal');
        doc.setTextColor(0, 0, 0); // Black color for text
        let y = 60;

        doc.text(`Event: ${event.title}`, margin, y);
        y += lineHeight;
        doc.text(`Date: ${event.date}`, margin, y);  // Assuming you have event.date
        y += lineHeight;
        doc.text(`Venue: ${event.location}`, margin, y);  // Assuming you have event.venue
        y += lineHeight + 15;

        // Ticket Details
        doc.setFontSize(14);
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(0, 102, 204); // Blue color for headers
        doc.text('Ticket Details', margin, y);
        y += lineHeight + 10;

        doc.setFontSize(12);
        doc.setFont('Helvetica', 'normal');
        doc.setTextColor(0, 0, 0); // Black color for text
        doc.text(`Type: ${ticketType}`, margin, y);
        y += lineHeight;
        doc.text(`Quantity: ${quantity}`, margin, y);
        y += lineHeight;
        doc.text(`Price per Ticket: $${price}`, margin, y);
        y += lineHeight;
        doc.text(`Discount: ${discount}%`, margin, y);
        y += lineHeight + 15;

        // Total
        doc.setFontSize(16);
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(0, 102, 204); // Blue color for total
        doc.text(`Total: $${discountedTotal.toFixed(2)}`, margin, y);

        // Footer
        y += lineHeight + 20;
        doc.setFontSize(10);
        doc.setFont('Helvetica', 'italic');
        doc.setTextColor(0, 0, 0); // Black color for footer
        doc.text('Thank you for your purchase!', margin, y);
        y += lineHeight;
        doc.text('For support, contact us at support@tickett.com', margin, y);

        doc.save('soccer_ticket_receipt.pdf');
    };


    if (!event) {
        return <div>Loading...</div>;
    }

    let matchTitle = event.title || 'Match Title';
    const teams = matchTitle.split("vs");

    return (
        <div className="flex flex-col md:flex-row justify-center items-start md:space-x-8 p-6">
            <div className="w-full md:w-3/5 mb-6 md:mb-0">
                <div className="grid grid-cols-12 grid-rows-3 bg-[url('./assets/ticketImg.png')] bg-cover h-60 text-center text-nowrap">
                    <p className='col-start-1 col-end-10 font-graduate text-4xl text-gray-900 dark:text-white mt-5'>{event.league} Match</p>
                    <div className='col-start-1 col-end-10 row-start-2 flex self-center justify-center'>
                        <p className='font-graduate text-xl text-gray-900 dark:text-white'>{teams[0]}</p>
                        <img src={myImage} alt="" className='h-5 mt-1' />
                        <p className='font-graduate text-xl text-gray-900 dark:text-white'>{teams[1]}</p>
                    </div>
                    <div className='col-start-1 col-end-10 row-start-3 flex flex-col self-center justify-center'>
                        <p className='font-graduate text-xl text-gray-900 dark:text-[#F8C809]'>{event.location}</p>
                        <p className='font-graduate text-xl text-gray-900 dark:text-white'>{event.date}</p>
                    </div>
                    <div className='flex flex-col gap-10 col-start-10 col-end-13 row-start-2 self-center mr-4'>
                        <p className="font-graduate text-3xl text-gray-500 dark:text-[#F8C809]">{ticketType}</p>
                        <p className='font-graduate text-5xl text-gray-900 dark:text-[#F8C809]'>${price}</p>
                        <div className="flex self-center">
                            <button onClick={() => handleQuantityChange(quantity - 1)} className="bg-[#F8C809] p-1 rounded-l">
                                -
                            </button>
                            <input
                                value={quantity}
                                min="1"
                                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                                className="w-10 p-1 text-center"
                            />
                            <button onClick={() => handleQuantityChange(quantity + 1)} className="bg-[#F8C809] p-1 rounded-r">
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
                <div className="flex justify-between mb-2">
                    <span>Order</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-5">
                    <span>Offers</span>
                    {!showCodeInput ? (
                        <a onClick={() => setShowCodeInput(true)} className="text-blue-500 cursor-pointer">
                            Add Code
                        </a>
                    ) : (
                        <div>
                            <input
                                type="text"
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                placeholder="Enter code"
                                className="w-25 p-1 border rounded"
                            />
                            <button
                                onClick={handleApplyCodeClick}
                                className="bg-green-500 ml-5 text-white p-1 rounded hover:bg-green-600"
                            >
                                Apply Code
                            </button>
                            <div className="flex justify-between mb-2">
                                <span>Discount</span>
                                <span>{discount}%</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Total</span>
                    <span>${discountedTotal.toFixed(2)}</span>
                </div>
                <PaypalConfig
                    event={event}
                    ticketType={ticketType}
                    quantity={quantity}
                    totalPrice={discountedTotal}
                    userId={userId}
                    downloadPDF={generatePDF}
                />
            </div>
        </div>
    );
};

export default CartView;