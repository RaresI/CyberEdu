export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">CyberEdu</h3>
            <p className="text-gray-400">
              Your trusted platform for cybersecurity education and training.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/courses" className="hover:text-primary transition">Courses</a></li>
              <li><a href="/challenges" className="hover:text-primary transition">Challenges</a></li>
              <li><a href="/forum" className="hover:text-primary transition">Forum</a></li>
              <li><a href="/news" className="hover:text-primary transition">News</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-primary transition">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
              <li><a href="/faq" className="hover:text-primary transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-primary transition">🐦</a>
              <a href="#" className="text-2xl hover:text-primary transition">💼</a>
              <a href="#" className="text-2xl hover:text-primary transition">📘</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} CyberEdu Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
