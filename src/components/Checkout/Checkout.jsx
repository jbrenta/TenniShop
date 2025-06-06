import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeCart } from '../Cart/CartSlice';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items } = useSelector((state) => state.cart);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        cap: '',
        phone: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVC: '',
        saveInfo: false,
        notes: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^[0-9]{10}$/;
        return re.test(phone.replace(/\s/g, ''));
    };

    const validateCAP = (cap) => {
        const re = /^[0-9]{5}$/;
        return re.test(cap);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let finalValue = type === 'checkbox' ? checked : value;

        // Formattazione specifica per il telefono
        if (name === 'phone') {
            finalValue = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3').trim();
        }

        // Formattazione specifica per il CAP
        if (name === 'cap') {
            finalValue = value.replace(/\D/g, '').slice(0, 5);
        }

        setFormData(prev => ({
            ...prev,
            [name]: finalValue
        }));

        // Validazione in tempo reale
        validateField(name, finalValue);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case 'email':
                if (!validateEmail(value)) {
                    newErrors.email = 'Inserisci un indirizzo email valido';
                } else {
                    delete newErrors.email;
                }
                break;
            case 'phone':
                if (!validatePhone(value)) {
                    newErrors.phone = 'Inserisci un numero di telefono valido (10 cifre)';
                } else {
                    delete newErrors.phone;
                }
                break;
            case 'cap':
                if (!validateCAP(value)) {
                    newErrors.cap = 'Inserisci un CAP valido (5 cifre)';
                } else {
                    delete newErrors.cap;
                }
                break;
            case 'firstName':
            case 'lastName':
                if (value.length < 2) {
                    newErrors[name] = 'Questo campo deve contenere almeno 2 caratteri';
                } else {
                    delete newErrors[name];
                }
                break;
            case 'address':
                if (value.length < 5) {
                    newErrors.address = 'Inserisci un indirizzo valido';
                } else {
                    delete newErrors.address;
                }
                break;
            case 'city':
                if (value.length < 2) {
                    newErrors.city = 'Inserisci una città valida';
                } else {
                    delete newErrors.city;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const validateForm = () => {
        const requiredFields = ['email', 'phone', 'firstName', 'lastName', 'address', 'city', 'cap'];
        let newErrors = {};
        let isValid = true;

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'Questo campo è obbligatorio';
                isValid = false;
            } else {
                validateField(field, formData[field]);
            }
        });

        setErrors(prev => ({ ...prev, ...newErrors }));
        return isValid && Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate successful payment
        setStep(3);
        setLoading(false);
        dispatch(closeCart());
    };

    const formatCardNumber = (value) => {
        return value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900 rounded-lg shadow-2xl w-full max-w-4xl border border-zinc-700/50">
                    {/* Header */}
                    <div className="border-b border-zinc-700/50 p-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-bold text-white">Checkout</h2>
                            <button 
                                onClick={() => navigate(-1)}
                                className="btn btn-circle btn-sm bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Progress Steps */}
                        <div className="w-full flex justify-center mt-6">
                            <ul className="steps steps-horizontal w-full max-w-xs">
                                <li className={`step ${step >= 1 ? 'step-warning' : ''}`}>Dati</li>
                                <li className={`step ${step >= 2 ? 'step-warning' : ''}`}>Pagamento</li>
                                <li className={`step ${step >= 3 ? 'step-warning' : ''}`}>Conferma</li>
                            </ul>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {step === 1 && (
                            <form onSubmit={(e) => { 
                                e.preventDefault(); 
                                if (validateForm()) {
                                    setStep(2);
                                }
                            }} className="max-w-2xl mx-auto">
                                {/* Dati Personali */}
                                <div className="bg-zinc-800/50 rounded-lg p-6 mb-6 border border-zinc-700/50">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Dati Personali
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className={`input input-bordered bg-zinc-800/50 border-zinc-700 text-white ${errors.firstName ? 'input-error' : ''}`}
                                                placeholder="Nome *"
                                            />
                                            {errors.firstName && <span className="text-error text-sm mt-1">{errors.firstName}</span>}
                                        </div>
                                        <div className="form-control">
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className={`input input-bordered bg-zinc-800/50 border-zinc-700 text-white ${errors.lastName ? 'input-error' : ''}`}
                                                placeholder="Cognome *"
                                            />
                                            {errors.lastName && <span className="text-error text-sm mt-1">{errors.lastName}</span>}
                                        </div>
                                        <div className="form-control md:col-span-2">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className={`input input-bordered bg-zinc-800/50 border-zinc-700 text-white ${errors.email ? 'input-error' : ''}`}
                                                placeholder="Email *"
                                            />
                                            {errors.email && <span className="text-error text-sm mt-1">{errors.email}</span>}
                                        </div>
                                        <div className="form-control md:col-span-2">
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className={`input input-bordered bg-zinc-800/50 border-zinc-700 text-white ${errors.phone ? 'input-error' : ''}`}
                                                placeholder="Telefono *"
                                            />
                                            {errors.phone && <span className="text-error text-sm mt-1">{errors.phone}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Indirizzo di Spedizione */}
                                <div className="bg-zinc-800/50 rounded-lg p-6 mb-6 border border-zinc-700/50">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Indirizzo di Spedizione
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="form-control">
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                className={`input input-bordered bg-zinc-800/50 border-zinc-700 text-white ${errors.address ? 'input-error' : ''}`}
                                                placeholder="Indirizzo (Via/Piazza, Numero civico) *"
                                            />
                                            {errors.address && <span className="text-error text-sm mt-1">{errors.address}</span>}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="form-control">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={`input input-bordered bg-zinc-800/50 border-zinc-700 text-white ${errors.city ? 'input-error' : ''}`}
                                                    placeholder="Città *"
                                                />
                                                {errors.city && <span className="text-error text-sm mt-1">{errors.city}</span>}
                                            </div>
                                            <div className="form-control">
                                                <input
                                                    type="text"
                                                    name="cap"
                                                    value={formData.cap}
                                                    onChange={handleInputChange}
                                                    required
                                                    className={`input input-bordered bg-zinc-800/50 border-zinc-700 text-white ${errors.cap ? 'input-error' : ''}`}
                                                    placeholder="CAP *"
                                                    maxLength="5"
                                                />
                                                {errors.cap && <span className="text-error text-sm mt-1">{errors.cap}</span>}
                                            </div>
                                        </div>
                                        <div className="form-control">
                                            <textarea
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                className="textarea textarea-bordered bg-zinc-800/50 border-zinc-700 text-white h-20"
                                                placeholder="Note per la consegna (opzionale)"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Checkbox per salvare i dati */}
                                <div className="bg-zinc-800/50 rounded-lg p-6 border border-zinc-700/50">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="saveInfo"
                                            checked={formData.saveInfo}
                                            onChange={handleInputChange}
                                            className="checkbox checkbox-warning"
                                        />
                                        <span className="text-zinc-300">Salva queste informazioni per il prossimo acquisto</span>
                                    </label>
                                </div>

                                {/* Pulsanti di navigazione */}
                                <div className="flex justify-between items-center mt-6 gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="btn btn-ghost hover:bg-zinc-800/50"
                                    >
                                        Torna al carrello
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn bg-yellow-500 hover:bg-yellow-600 text-black border-none"
                                    >
                                        Continua al pagamento
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-zinc-300">Numero carta</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formatCardNumber(formData.cardNumber)}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                                                setFormData(prev => ({ ...prev, cardNumber: value }));
                                            }}
                                            required
                                            className="input input-bordered bg-zinc-800/50 border-zinc-700 text-white"
                                            placeholder="1234 5678 9012 3456"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-zinc-300">Scadenza</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={(e) => {
                                                    let value = e.target.value.replace(/\D/g, '');
                                                    if (value.length > 2) {
                                                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                                    }
                                                    setFormData(prev => ({ ...prev, cardExpiry: value }));
                                                }}
                                                required
                                                className="input input-bordered bg-zinc-800/50 border-zinc-700 text-white"
                                                placeholder="MM/YY"
                                                maxLength="5"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-zinc-300">CVC</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="cardCVC"
                                                value={formData.cardCVC}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                                                    setFormData(prev => ({ ...prev, cardCVC: value }));
                                                }}
                                                required
                                                className="input input-bordered bg-zinc-800/50 border-zinc-700 text-white"
                                                placeholder="123"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                                        <h3 className="text-lg font-semibold text-white mb-4">Riepilogo ordine</h3>
                                        <div className="space-y-2">
                                            {items.map((item) => (
                                                <div key={item.id} className="flex justify-between text-zinc-300">
                                                    <span>{item.name} x{item.quantity}</span>
                                                    <span>€{(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                            <div className="border-t border-zinc-700/50 pt-2 mt-4">
                                                <div className="flex justify-between text-white font-semibold">
                                                    <span>Totale</span>
                                                    <span>€{calculateTotal().toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <button 
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="btn btn-ghost hover:bg-zinc-800/50"
                                    >
                                        Torna indietro
                                    </button>
                                    <button 
                                        type="submit"
                                        className={`btn bg-yellow-500 hover:bg-yellow-600 text-black border-none ${loading ? 'loading' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Elaborazione...' : 'Conferma pagamento'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {step === 3 && (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Ordine confermato!</h3>
                                <p className="text-zinc-400 mb-6">Grazie per il tuo acquisto. Riceverai una email di conferma a breve.</p>
                                <button 
                                    onClick={() => navigate('/')} 
                                    className="btn bg-yellow-500 hover:bg-yellow-600 text-black border-none"
                                >
                                    Torna alla home
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout; 