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
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Purchase Ticket', 20, 20);
        doc.setFontSize(12);
        doc.text(`Event: ${event.title}`, 20, 40);
        doc.text(`Ticket Type: ${ticketType}`, 20, 50);
        doc.text(`Quantity: ${quantity}`, 20, 60);
        doc.text(`Price: $${price}`, 20, 70);
        doc.text(`Discount: ${discount}%`, 20, 80);
        doc.text(`Total: $${discountedTotal.toFixed(2)}`, 20, 90);
        doc.save('purchase_ticket.pdf');
    };

    let matchTitle = event.title;
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
                                className="w-10 p-1 text-center  "
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
                                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
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
