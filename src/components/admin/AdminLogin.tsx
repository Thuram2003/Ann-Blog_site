import { useState } from 'react';
import { Lock, User, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => Promise<boolean>;
  onBack?: () => void;
}

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await onLogin(email, password);
      if (!success) {
        toast.error('Invalid email or password');
      } else {
        toast.success('Login successful!');
      }
    } catch (err) {
      toast.error('An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00a7b3] to-[#008891] flex items-center justify-center p-4 relative">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </button>
      )}

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-4">
          <img 
            src="/images/ann-logo-main.png" 
            alt="ANN Logo" 
            className="h-30 mx-auto mb-[-10px]"
          />
          <h1 className="text-2xl font-extrabold tracking-tight text-[#333]">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to manage your content
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all font-medium"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#00a7b3] focus:ring-4 focus:ring-[#00a7b3]/10 transition-all font-mono tracking-wider"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password (from blog_ann) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#00a7b3] focus:ring-[#00a7b3] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link href="#" className="font-medium text-[#00a7b3] hover:text-[#008891]">
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00a7b3] text-white font-extrabold uppercase tracking-wide py-3 rounded-lg hover:bg-[#008891] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Hint */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-medium">Demo credentials</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-900 mb-1">Use these to access the dashboard:</p>
            <p>Email: <span className="font-mono bg-white px-2 py-0.5 border border-gray-200 rounded text-[#00a7b3]">admin@annblog.com</span></p>
            <p className="mt-1">Password: <span className="font-mono bg-white px-2 py-0.5 border border-gray-200 rounded text-[#00a7b3]">admin123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
