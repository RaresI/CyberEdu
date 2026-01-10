'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(c => c.category === filter);

  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cybersecurity Courses</h1>

      <div className="flex gap-4 mb-8 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded capitalize ${
              filter === cat 
                ? 'bg-primary text-white' 
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="card">
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-gray-400 mb-4">{course.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-primary">${course.price}</span>
              <span className="text-sm text-gray-500">
                {course.quantity > 0 ? `${course.quantity} available` : 'Out of stock'}
              </span>
            </div>
            <button
              onClick={() => addToCart(course)}
              disabled={!user || course.quantity === 0}
              className={`w-full py-2 rounded font-semibold ${
                !user || course.quantity === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary-dark text-white'
              }`}
            >
              {!user ? 'Login to purchase' : course.quantity === 0 ? 'Out of stock' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-gray-400">No courses found in this category.</p>
        </div>
      )}
    </div>
  );
}
