import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeCart, removeFromCart, updateQuantity } from './CartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, isOpen } = useSelector((state) => state.cart);

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleQuantityChange = (id, newQuantity) => {
        dispatch(updateQuantity({ id, quantity: parseInt(newQuantity) }));
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        // TODO: Implementare il checkout
        console.log('Procedere al checkout');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => dispatch(closeCart())}
            />
            
            {/* Cart Panel */}
            <div className="fixed right-0 top-0 h-full w-80 bg-black glass text-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-xl font-bold">Carrello</h2>
                        <button 
                            onClick={() => dispatch(closeCart())}
                            className="btn btn-circle btn-sm"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {items.length === 0 ? (
                            <div className="text-center py-4">
                                Il carrello è vuoto
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="card bg-base-100 shadow-xl glass">
                                        <div className="card-body p-4">
                                            <div className="flex items-center gap-4">
                                                {/* Product Image */}
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                
                                                {/* Product Details */}
                                                <div className="flex-1">
                                                    <h3 className="font-bold">{item.name}</h3>
                                                    <p className="text-sm opacity-70">{item.brand}</p>
                                                    <p className="text-warning">€{item.price.toFixed(2)}</p>
                                                    
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <button 
                                                            className="btn btn-xs btn-circle"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button 
                                                            className="btn btn-xs btn-circle"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= 9}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button 
                                                    className="btn btn-circle btn-sm"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-700 p-4 bg-black bg-opacity-50">
                            {/* Total */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-bold">Totale:</span>
                                <span className="text-lg text-warning">€{calculateTotal().toFixed(2)}</span>
                            </div>

                            {/* Actions */}
                            <button 
                                className="btn btn-primary w-full"
                                onClick={handleCheckout}
                            >
                                Procedi al Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart; 