import React, { useEffect, useState } from 'react';

const ViewCart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const response = await fetch(`http://localhost:5000/cart/getcart/${user._id}`);
            const data = await response.json();

            if (response.ok) {
                setCartItems(data.data);
            } else {
                console.log(data.message);
            }
        };

        fetchCart();
    }, []);

    return (
        <div>
            <h2>My Cart</h2>
            {cartItems.map(item => (
                <div key={item._id}>
                    <h4>{item.Drone_id?.name}</h4>
                    <p>From: {new Date(item.Start_date).toDateString()}</p>
                    <p>To: {new Date(item.End_date).toDateString()}</p>
                    <p>Total Price: ${item.Total_price}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewCart;
