import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaypalConfig from './PaypalConfig';
import jsPDF from 'jspdf';
import './cartView.css';
import myImage from '../../assets/vsImg.png';


const CartView = () => {
    const userId = sessionStorage.getItem("userId");
    const location = useLocation();
    const { event, ticketType, price } = location.state || {};

    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: event.title,
            price: price,
            quantity: 1,
            ticketType: ticketType
        }
    ]);

    const [showCodeInput, setShowCodeInput] = useState(false);
    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const handleQuantityChange = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Number(quantity) } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const discountedTotal = totalPrice - (totalPrice * discount) / 100;

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Purchase Ticket', 20, 20);
        doc.setFontSize(12);
        doc.text(`Event: ${event.title}`, 20, 40);
        doc.text(`Ticket Type: ${ticketType}`, 20, 50);
        doc.text(`Quantity: ${cartItems[0].quantity}`, 20, 60);
        doc.text(`Price: $${price}`, 20, 70);
        doc.text(`Discount: ${discount}%`, 20, 80);
        doc.text(`Total: $${discountedTotal.toFixed(2)}`, 20, 90);
        doc.save('purchase_ticket.pdf');
    };
    let matchTitle = event.title;
    const teams = matchTitle.split("vs")



    return (
        <div className="flex flex-col md:flex-row justify-center items-start md:space-x-8 p-6">
            <div className="w-full md:w-3/5 mb-6 md:mb-0 ">
           
                
                <div className="bg-[url('./assets/ticketImg.png')] bg-cover h-60 flex flex-col">
                    <p className='font-graduate text-4xl text-gray-900 dark:text-white ml-12 mt-5'>{event.league} Match</p>
                    <div className='flex flex-row ml-10 mt-12'>
                        <p className='font-graduate text-xl text-gray-900 dark:text-white'>{teams[0]} </p>
                        <img src={myImage} alt="" className='h-5 mt-1' />
                        <p className='font-graduate text-xl text-gray-900 dark:text-white'>{teams[1]} </p>
                    </div>




                    
                    


                </div>
                <table className="min-w-full bg-white">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="w-1/5 py-3 px-4 text-left">Event</th>
                            <th className="w-1/5 py-3 px-4 text-center">Price</th>
                            <th className="w-1/5 py-3 px-4 text-center">Quantity</th>
                            <th className="w-1/5 py-3 px-4 text-center">Subtotal</th>
                            <th className="w-1/5 py-3 px-4 text-center">Ticket Type</th>
                            <th className="w-1/5 py-3 px-4 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id} className="border-b px-10">
                                <td className="py-3 text-left">
                                    <div className="flex items-center">
                                        <span className="ml-4">{item.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-center">${item.price}</td>
                                <td className="py-3 px-4 text-center">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="w-16 p-1 border rounded"
                                    />
                                </td>
                                <td className="py-3 px-4 text-center">${(item.price * item.quantity).toFixed(2)}</td>
                                <td className="py-3 px-4 text-center">{item.ticketType}</td>
                                <td className="py-3 px-4 text-center">
                                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                        <a onClick={() => setShowCodeInput(true)} className="text-blue-500">
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
                    quantity={1}
                    totalPrice={discountedTotal}
                    userId={userId}
                    downloadPDF={generatePDF}
                />
            </div>
        </div>
    );
};

export default CartView;
