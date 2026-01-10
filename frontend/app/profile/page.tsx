'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  orderDate: string;
  items: any[];
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadOrders();
  }, [user, router]);

  const loadOrders = async () => {
    if (!user) return;
    
    try {
      const response = await api.get(`/orders/user/${user.id}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="card mb-8">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Username</label>
              <p className="text-xl">{user.username}</p>
            </div>
            
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="text-xl">{user.email}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">Role</label>
              <p className="text-xl">
                <span className="px-3 py-1 bg-primary rounded text-white">
                  {user.role || 'LEARNER'}
                </span>
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Purchase History</h2>
          
          {loading ? (
            <p className="text-gray-400">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No purchases yet</p>
              <a href="/courses" className="btn-primary inline-block">
                Browse Courses
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-gray-900 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-xl font-bold text-primary">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                  
                  {order.items && order.items.length > 0 && (
                    <div className="mt-2 text-sm text-gray-400">
                      {order.items.length} item(s)
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
