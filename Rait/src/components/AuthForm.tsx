import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import logo from '../logo.png.jpg';
import { translations } from '../data/translations';
import { useLanguage } from '../hooks/useLanguage';

const AuthForm: React.FC = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let userCredential;
      if (isSignUp) {
        userCredential = await createUserWithEmailAndPassword(auth, name, mobileNumber);
        setSuccess('Sign up successful!');
      } else {
        userCredential = await signInWithEmailAndPassword(auth, name, mobileNumber);
        setSuccess('Sign in successful!');
      }
      console.log('Auth success:', userCredential);
    } catch (err: any) {
      setError(err.code ? `${err.code}: ${err.message}` : err.message);
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FBECC2' }}>
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mx-4 border-2" style={{ borderColor: '#B05A1E' }}>
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Logo and Tagline */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-center" style={{ backgroundColor: '#8B4513' }}>
            <div className="text-center flex flex-col items-center justify-center h-full">
              <div className="flex justify-center items-center mb-6">
                <img
                  src={logo}
                  alt="Rait Logo"
                  className="w-24 h-24 rounded-full shadow-lg object-cover"
                  style={{ display: 'block', margin: '0 auto' }}
                />
              </div>
              <h1 className="text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'serif' }}>
                Rait
              </h1>
              <p className="text-xl font-medium text-orange-200">
                Know More Grow More
              </p>
              <div className="mt-8 text-center">
                <p className="text-sm text-orange-100">
                  {language === 'hi'
                    ? 'भारत सरकार की एक पहल'
                    : 'A Government of India Initiative'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:w-1/2 p-8 lg:p-12" style={{ backgroundColor: '#FDF5E6' }}>
            <div className="max-w-sm mx-auto">
              <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: '#8B4513' }}>
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </h2>
              <p className="text-center mb-8" style={{ color: '#A0522D' }}>
                {isSignUp
                  ? 'Create your account to get started'
                  : 'Welcome back! Please sign in to continue'
                }
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#8B4513' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                    style={{
                      borderColor: '#D2691E',
                      backgroundColor: '#FFF8DC',
                      color: '#8B4513',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#B05A1E';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#D2691E';
                    }}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#8B4513' }}>
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={e => setMobileNumber(e.target.value)}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                    style={{
                      borderColor: '#D2691E',
                      backgroundColor: '#FFF8DC',
                      color: '#8B4513',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#B05A1E';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#D2691E';
                    }}
                    placeholder="Enter your mobile number"
                  />
                </div>

                {error && (
                  <div className="px-4 py-3 rounded-lg border" style={{ backgroundColor: '#FFE4E1', borderColor: '#CD5C5C', color: '#8B0000' }}>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="px-4 py-3 rounded-lg border" style={{ backgroundColor: '#F0FFF0', borderColor: '#90EE90', color: '#006400' }}>
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#B05A1E',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      const target = e.target as HTMLButtonElement;
                      target.style.backgroundColor = '#8B4513';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      const target = e.target as HTMLButtonElement;
                      target.style.backgroundColor = '#B05A1E';
                    }
                  }}
                >
                  {loading ? 'Please wait...' : isSignUp ? 'Sign Up' : 'Sign In'}
                </button>
              </form>

              <div className="text-center mt-6">
                <button
                  onClick={() => setIsSignUp(s => !s)}
                  className="font-medium transition-colors"
                  style={{ color: '#B05A1E' }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.color = '#8B4513';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.color = '#B05A1E';
                  }}
                >
                  {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;