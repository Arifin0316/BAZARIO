import Link from 'next/link';
import { useState } from 'react';
import { SignInCredentials } from "@/lib/action"
import { useRouter } from 'next/navigation';

const FormLogin = () => {
    const router = useRouter();
    const [state, setState] = useState<{ errors?: Record<string, string>; message?: string }>({});
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      const formData = new FormData(event.currentTarget);
  
      const result = await SignInCredentials(state, formData);
      if (result?.errors) {
        setState({ errors: result.errors, message: undefined });
      } else if (result?.message) {
        setState({ errors: undefined, message: result.message });
      } else if (result?.success) {
        // Handle successful login
        router.push('/dashboard');
      }
      setLoading(false);
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {state.message && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
          <span className="font-medium">{state.message}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          placeholder="example@gmail.com" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
        />
        <span id="email-error" className="text-sm text-red-500 mt-2">{state.errors?.email || ''}</span>
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Password
        </label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          required
          aria-invalid={!!state.errors?.password}
          aria-describedby={state.errors?.password ? "password-error" : undefined}
          placeholder="*******" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
        />
        <span id="password-error" className="text-sm text-red-500 mt-2">{state.errors?.password || ''}</span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`relative flex justify-center items-center w-full py-2 px-4 rounded-lg uppercase bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading && <span className="loader mr-4 w-4 h-4"></span>}
        <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
      </button>

      <div className="text-sm font-light text-gray-500 mt-4">
        Don&apos;t have an account yet?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-800 transition-all">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default FormLogin;