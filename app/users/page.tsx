// import React, { useState } from 'react';
// import { Package, Truck, User, ShoppingBag } from 'lucide-react';

// const UserProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     address: '',
//   });

//   const [orders, setOrders] = useState([
//     {
//       id: '1',
//       createdAt: '2024-01-16',
//       status: 'DELIVERED',
//       totalAmount: 250000,
//       trackingNumber: 'JNE123456789',
//       orderItems: [
//         { id: '1', prodak: { name: 'Product 1' }, quantity: 2, price: 125000 }
//       ]
//     }
//   ]);

//   const handleProfileUpdate = (e) => {
//     e.preventDefault();
//     console.log('Profile updated:', user);
//   };

//   const getStatusColor = (status) => {
//     const colors = {
//       PENDING: 'bg-yellow-100 text-yellow-800',
//       PROCESSING: 'bg-blue-100 text-blue-800',
//       SHIPPED: 'bg-purple-100 text-purple-800',
//       DELIVERED: 'bg-green-100 text-green-800',
//       CANCELLED: 'bg-red-100 text-red-800'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Tabs */}
//       <div className="border-b border-gray-200 mb-8">
//         <div className="flex space-x-8">
//           <button
//             onClick={() => setActiveTab('profile')}
//             className={`flex items-center pb-4 border-b-2 ${
//               activeTab === 'profile'
//                 ? 'border-black text-black'
//                 : 'border-transparent text-gray-500'
//             } hover:text-black`}
//           >
//             <User className="w-5 h-5 mr-2" />
//             Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('orders')}
//             className={`flex items-center pb-4 border-b-2 ${
//               activeTab === 'orders'
//                 ? 'border-black text-black'
//                 : 'border-transparent text-gray-500'
//             } hover:text-black`}
//           >
//             <ShoppingBag className="w-5 h-5 mr-2" />
//             Order History
//           </button>
//         </div>
//       </div>

//       {/* Profile Tab Content */}
//       {activeTab === 'profile' && (
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
//           <form onSubmit={handleProfileUpdate}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={user.name}
//                   onChange={(e) => setUser({ ...user, name: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                   placeholder="Your name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={user.email}
//                   onChange={(e) => setUser({ ...user, email: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                   placeholder="your.email@example.com"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   value={user.phoneNumber}
//                   onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                   placeholder="Phone number"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   value={user.address}
//                   onChange={(e) => setUser({ ...user, address: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
//                   placeholder="Your address"
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
//             >
//               Update Profile
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Orders Tab Content */}
//       {activeTab === 'orders' && (
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-6">Order History</h2>
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div
//                 key={order.id}
//                 className="border border-gray-200 rounded-lg p-6"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <p className="font-medium">Order #{order.id}</p>
//                     <p className="text-sm text-gray-500">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                       order.status
//                     )}`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>

//                 {order.orderItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex justify-between items-center py-4 border-t border-gray-100"
//                   >
//                     <div className="flex items-center space-x-4">
//                       <Package className="w-10 h-10 text-gray-400" />
//                       <div>
//                         <p className="font-medium">{item.prodak.name}</p>
//                         <p className="text-sm text-gray-500">
//                           Quantity: {item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="font-medium">
//                       Rp {item.price.toLocaleString()}
//                     </p>
//                   </div>
//                 ))}

//                 <div className="border-t border-gray-100 pt-4 mt-4">
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center space-x-2 text-gray-500">
//                       <Truck className="w-4 h-4" />
//                       <span className="text-sm">Tracking Number:</span>
//                     </div>
//                     <span className="text-sm font-medium">
//                       {order.trackingNumber}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center mt-2">
//                     <span className="font-medium">Total Amount:</span>
//                     <span className="font-medium">
//                       Rp {order.totalAmount.toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfilePage;