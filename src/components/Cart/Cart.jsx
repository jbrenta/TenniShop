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
            {/* Overlay with blur effect */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => dispatch(closeCart())}
            />
            
            {/* Cart Panel */}
            <div className="fixed right-0 top-0 h-full w-[90%] max-w-md bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 text-white z-50 shadow-2xl transform transition-all duration-300 ease-out border-l border-zinc-700/50">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-zinc-700/50 bg-zinc-900/50 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <h2 className="text-3xl font-bold text-white">Il tuo carrello</h2>
                        </div>
                        <button 
                            onClick={() => dispatch(closeCart())}
                            className="btn btn-circle btn-sm bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4 text-zinc-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <p className="text-lg font-medium">Il tuo carrello è vuoto</p>
                                <button 
                                    onClick={() => dispatch(closeCart())}
                                    className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-black border-none transition-all duration-200"
                                >
                                    Continua lo shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 overflow-hidden hover:border-zinc-600/50 transition-colors duration-200">
                                        <div className="p-4">
                                            <div className="flex gap-4">
                                                {/* Product Image */}
                                                <div className="relative w-24 h-24 bg-zinc-900/50 rounded-lg overflow-hidden">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                </div>
                                                
                                                {/* Product Details */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-bold text-white truncate">{item.name}</h3>
                                                            <p className="text-sm text-zinc-400">{item.brand}</p>
                                                        </div>
                                                        <button 
                                                            className="btn btn-ghost btn-xs btn-circle hover:bg-zinc-700/50"
                                                            onClick={() => handleRemoveItem(item.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="flex justify-between items-end mt-2">
                                                        <div className="flex items-center gap-2 bg-zinc-900/50 rounded-lg p-1">
                                                            <button 
                                                                className="btn btn-xs btn-circle bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
                                                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                            <button 
                                                                className="btn btn-xs btn-circle bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
                                                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                                disabled={item.quantity >= 9}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <p className="text-yellow-500 font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-zinc-700/50 bg-zinc-900/50 backdrop-blur-md p-6 space-y-4">
                            {/* Subtotal */}
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Subtotale</span>
                                <span className="text-lg font-semibold">€{calculateTotal().toFixed(2)}</span>
                            </div>
                            
                            {/* Shipping */}
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400">Spedizione</span>
                                <span className="text-sm text-zinc-400">Calcolata al checkout</span>
                            </div>
                            
                            {/* Total */}
                            <div className="flex justify-between items-center pt-4 border-t border-zinc-700/50">
                                <span className="text-lg font-bold">Totale</span>
                                <span className="text-xl font-bold text-yellow-500">€{calculateTotal().toFixed(2)}</span>
                            </div>

                            {/* Checkout Button */}
                            <button 
                                className="btn w-full bg-yellow-500 hover:bg-yellow-600 text-black border-none transition-all duration-200 font-semibold"
                                onClick={handleCheckout}
                            >
                                Procedi al Checkout
                            </button>
                            
                            {/* Continue Shopping */}
                            <button 
                                className="btn btn-ghost w-full hover:bg-zinc-800/50"
                                onClick={() => dispatch(closeCart())}
                            >
                                Continua lo shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart; 