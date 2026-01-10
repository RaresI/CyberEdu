'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="banner sticky top-0 z-50 scanlines">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold glow-text flex items-center gap-2">
          <span className="text-accent">{'>'}</span>
          <span className="neon">CyberEdu</span>
          <span className="text-secondary">_</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/courses" className="nav-link group">
            <span className="nav-text">📚 Courses</span>
            <span className="nav-line"></span>
          </Link>
          <Link href="/challenges" className="nav-link group">
            <span className="nav-text">⚔️ Challenges</span>
            <span className="nav-line"></span>
          </Link>
          <Link href="/sandbox" className="nav-link group">
            <span className="nav-text">🛡️ Sandbox</span>
            <span className="nav-line"></span>
          </Link>
          <Link href="/leaderboard" className="nav-link group">
            <span className="nav-text">🏆 Leaderboard</span>
            <span className="nav-line"></span>
          </Link>
          <Link href="/forum" className="nav-link group">
            <span className="nav-text">💬 Forum</span>
            <span className="nav-line"></span>
          </Link>
          <Link href="/live-news" className="nav-link group">
            <span className="nav-text">📡 Live News</span>
            <span className="nav-line"></span>
          </Link>

          {user ? (
            <>
              <Link href="/cart" className="nav-link group relative">
                <span className="nav-text">🛒 Cart</span>
                <span className="nav-line"></span>
                {cartItemCount > 0 && (
                  <span className="badge badge-danger absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <Link href="/profile" className="nav-link group">
                <span className="nav-text">👤 Profile</span>
                <span className="nav-line"></span>
              </Link>
              {user.role === 'ADMIN' && (
                <Link href="/admin" className="nav-link group">
                  <span className="nav-text">⚙️ Admin</span>
                  <span className="nav-line"></span>
                </Link>
              )}
              <button
                onClick={logout}
                className="btn-primary text-sm"
              >
                [ Logout ]
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link group">
                <span className="nav-text">🔐 Login</span>
                <span className="nav-line"></span>
              </Link>
              <Link
                href="/register"
                className="btn-primary text-sm"
              >
                [ Register ]
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
