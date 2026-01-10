'use client';

import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Please login to view your cart</h1>
        <a href="/login" className="btn-primary inline-block mt-4">
          Login
        </a>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);
    try {
      const orderItems = cart.map(item => ({
        courseId: item.courseId,
        quantity: item.quantity
      }));

      await api.post('/orders', {
        userId: user.id,
        items: orderItems
      });

      clearCart();
      alert('Order placed successfully!');
      router.push('/profile');
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400 mb-4">Your cart is empty</p>
          <a href="/courses" className="btn-primary inline-block">
            Browse Courses
          </a>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.courseId} className="card flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">${item.price} each</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.courseId, item.quantity - 1)}
                      className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.courseId, item.quantity + 1)}
                      className="bg-gray-700 hover:bg-gray-600 w-8 h-8 rounded"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-xl font-bold w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.courseId)}
                    className="text-red-500 hover:text-red-400 ml-4"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="card h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax:</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded font-semibold disabled:bg-gray-700 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
