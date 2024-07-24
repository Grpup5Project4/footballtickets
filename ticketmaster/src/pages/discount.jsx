import React from 'react';
import { Link } from 'react-router-dom';

const DiscountCode = () => {
    return (
        <div className="bg-green-600 text-white py-2 px-4 mx-auto text-center rounded-md shadow-md border border-green-700">
            <h2 className="text-lg font-semibold">
                <Link to="/signup" className="font-bold underline">Sign up now</Link> and use the code <span className="font-bold underline">'DISCOUNT 10'</span> at checkout for a 10% discount on your tickets!
            </h2>
        </div>
    );
};

export default DiscountCode;
