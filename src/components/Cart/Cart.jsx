import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideCart, removeFromCart, updateQuantity, clearCart } from './CartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, total, visible } = useSelector((state) => state.cart);

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

    return (
        <div className="drawer-side z-50">
            <label htmlFor="my-drawer-cart" className="drawer-overlay" onClick={() => dispatch(hideCart())}></label>
            <div className="menu p-4 w-80 min-h-full bg-black glass text-white">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Carrello</h2>
                    <button 
                        onClick={() => dispatch(hideCart())}
                        className="btn btn-circle btn-sm"
                    >
                        ✕
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto">
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
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button 
                                                        className="btn btn-xs btn-circle"
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
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
                    <div className="border-t border-base-300 pt-4 mt-4 space-y-4">
                        {/* Total */}
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">Totale:</span>
                            <span className="text-lg text-warning">€{total.toFixed(2)}</span>
                        </div>

                        {/* Actions */}
                        <div className="space-y-2">
                            <button 
                                className="btn btn-primary w-full"
                                onClick={handleCheckout}
                            >
                                Procedi al Checkout
                            </button>
                            <button 
                                className="btn btn-outline btn-error w-full"
                                onClick={() => dispatch(clearCart())}
                            >
                                Svuota Carrello
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart; 