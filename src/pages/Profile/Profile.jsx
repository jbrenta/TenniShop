import React from 'react';
import Footer from '../../components/Footer/Footer';

const Profile = () => {
    // Esempio di dati utente (in un'app reale questi dati verrebbero da un backend)
    const user = {
        name: "Mario Rossi",
        email: "mario.rossi@example.com",
        joinDate: "Gennaio 2024",
        avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        orders: [
            { id: "ORD001", date: "2024-01-15", status: "Consegnato", total: 159.99 },
            { id: "ORD002", date: "2024-02-01", status: "In transito", total: 89.99 },
        ]
    };

    return (
        <>
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-900">
            <div className="container mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="avatar">
                            <div className="w-24 h-24 rounded-full ring-2 ring-yellow-500/50">
                                <img src={user.avatar} alt={user.name} />
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl font-bold text-white mb-2">{user.name}</h1>
                            <p className="text-zinc-400">{user.email}</p>
                            <p className="text-sm text-zinc-500">Membro da {user.joinDate}</p>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="stat bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50">
                        <div className="stat-figure text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <div className="stat-title text-zinc-400">Ordini Totali</div>
                        <div className="stat-value text-white">{user.orders.length}</div>
                    </div>
                    <div className="stat bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50">
                        <div className="stat-figure text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div className="stat-title text-zinc-400">Lista Desideri</div>
                        <div className="stat-value text-white">3</div>
                    </div>
                    <div className="stat bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50">
                        <div className="stat-figure text-yellow-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="stat-title text-zinc-400">Punti Fedeltà</div>
                        <div className="stat-value text-white">150</div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Ordini Recenti</h2>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-zinc-400 border-b border-zinc-700/50">
                                    <th>Ordine ID</th>
                                    <th>Data</th>
                                    <th>Stato</th>
                                    <th>Totale</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.orders.map(order => (
                                    <tr key={order.id} className="hover:bg-zinc-700/30 border-b border-zinc-700/50">
                                        <td className="text-white">{order.id}</td>
                                        <td className="text-zinc-400">{order.date}</td>
                                        <td>
                                            <span className={`badge ${
                                                order.status === "Consegnato" 
                                                    ? "bg-green-500/20 text-green-300 border-green-500/30" 
                                                    : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                            } border`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="text-yellow-500">€{order.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
          <Footer></Footer>
          </>
    );
};

export default Profile; 