export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 grid-bg">
      {/* Hero Section with Cyberpunk Flair */}
      <section className="text-center py-20 relative">
        <div className="circuit-line top-10 left-0 right-0"></div>
        <div className="circuit-line top-20 left-0 right-0" style={{ animationDelay: '1s' }}></div>
        
        <h1 className="text-6xl font-bold mb-6 animate-slide-in">
          <span className="text-accent">{'>'}</span>{' '}
          <span className="glow-text">WELCOME TO CYBEREDU</span>
          <span className="text-secondary pulse">_</span>
        </h1>
        
        <p className="text-xl text-secondary mb-4 max-w-3xl mx-auto terminal">
          INITIATING CYBERSECURITY TRAINING PROTOCOL...
        </p>
        
        <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
          Master cybersecurity through <span className="text-primary">interactive challenges</span>, 
          <span className="text-secondary"> comprehensive courses</span>, 
          and a <span className="text-accent">vibrant learning community</span>. 
          Stay ahead of evolving digital threats.
        </p>
        
        <div className="flex gap-6 justify-center mt-8">
          <a href="/courses" className="btn-primary">
            [ Browse Courses ]
          </a>
          <a 
            href="/challenges" 
            className="btn-primary"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(255, 0, 255, 0.2) 100%)',
              borderColor: 'var(--secondary)'
            }}
          >
            [ Try Challenges ]
          </a>
        </div>
      </section>

      {/* Features Grid with Cyber Cards */}
      <section className="grid md:grid-cols-3 gap-8 py-16">
        <div className="card text-center neon-box">
          <div className="text-5xl mb-4">🎓</div>
          <h3 className="text-2xl font-bold mb-3 text-primary">
            {'>'} EXPERT-LED COURSES
          </h3>
          <p className="text-gray-400">
            Learn from industry professionals with hands-on, practical courses covering all aspects of cybersecurity.
          </p>
          <div className="badge mt-4">CERTIFIED</div>
        </div>

        <div className="card text-center neon-box">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-3 text-secondary">
            {'>'} INTERACTIVE CHALLENGES
          </h3>
          <p className="text-gray-400">
            Test your skills with real-world scenarios and climb the leaderboard as you solve challenges.
          </p>
          <div className="badge badge-secondary mt-4">RANKED</div>
        </div>

        <div className="card text-center neon-box">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-2xl font-bold mb-3 text-accent">
            {'>'} COMMUNITY FORUM
          </h3>
          <p className="text-gray-400">
            Connect with fellow learners, share knowledge, and get help from experienced professionals.
          </p>
          <div className="badge mt-4" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            ACTIVE
          </div>
        </div>
      </section>

      {/* Why Choose Section with Terminal Style */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-12 glow-text">
          <span className="text-accent">{'>'}</span> WHY CHOOSE CYBEREDU?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card flex items-start gap-4 animate-slide-in">
            <span className="text-primary text-3xl neon">✓</span>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-primary">
                {'>'} COMPREHENSIVE CURRICULUM
              </h4>
              <p className="text-gray-400">
                From beginner to advanced, covering all cybersecurity domains with industry-standard tools
              </p>
            </div>
          </div>
          
          <div className="card flex items-start gap-4 animate-slide-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-secondary text-3xl neon">✓</span>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-secondary">
                {'>'} HANDS-ON LEARNING
              </h4>
              <p className="text-gray-400">
                Practice in safe, simulated environments with real attack vectors and defense mechanisms
              </p>
            </div>
          </div>
          
          <div className="card flex items-start gap-4 animate-slide-in" style={{ animationDelay: '0.2s' }}>
            <span className="text-accent text-3xl neon">✓</span>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-accent">
                {'>'} INDUSTRY RECOGNITION
              </h4>
              <p className="text-gray-400">
                Certificates valued by employers worldwide, backed by hands-on skill validation
              </p>
            </div>
          </div>
          
          <div className="card flex items-start gap-4 animate-slide-in" style={{ animationDelay: '0.3s' }}>
            <span className="text-primary text-3xl neon">✓</span>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-primary">
                {'>'} CONTINUOUS UPDATES
              </h4>
              <p className="text-gray-400">
                Stay current with the latest threats and defense techniques through live feeds and expert analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 text-center">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="card">
            <div className="text-4xl font-bold text-primary neon mb-2">1000+</div>
            <div className="text-gray-400 uppercase text-sm tracking-widest">Students</div>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-secondary neon mb-2">500+</div>
            <div className="text-gray-400 uppercase text-sm tracking-widest">Challenges</div>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-accent neon mb-2">100+</div>
            <div className="text-gray-400 uppercase text-sm tracking-widest">Courses</div>
          </div>
          <div className="card">
            <div className="text-4xl font-bold text-primary neon mb-2">24/7</div>
            <div className="text-gray-400 uppercase text-sm tracking-widest">Support</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="card neon-box max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 glow-text">
            READY TO START YOUR JOURNEY?
          </h2>
          <p className="text-gray-400 mb-6">
            Join thousands of cybersecurity professionals and enthusiasts mastering the art of digital defense
          </p>
          <a href="/register" className="btn-primary text-lg">
            [ INITIALIZE TRAINING ]
          </a>
        </div>
      </section>
    </div>
  );
}
