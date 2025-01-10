import Link from 'next/link';
import { useState } from 'react';
import { SignUpCredential } from '@/lib/action';

const FormRegister = () => {
  const [state, setState] = useState<{ errors?: Record<string, string>; message?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    const result = await SignUpCredential(state, formData);
    if (result?.errors) {
      setState({ errors: result.errors, message: undefined });
    } else if (result?.message) {
      setState({ errors: undefined, message: result.message });
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
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          Name
        </label>
        <input id="name" name="name" type="text" placeholder="Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        <span className="text-sm text-red-500 mt-2">{state.errors?.name || ''}</span>
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <input id="email" name="email" type="email" placeholder="example@gmail.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        <span className="text-sm text-red-500 mt-2">{state.errors?.email || ''}</span>
      </div>

      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
          Password
        </label>
        <input id="password" name="password" type="password" placeholder="*******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        <span className="text-sm text-red-500 mt-2">{state.errors?.password || ''}</span>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">
          Confirm Password
        </label>
        <input id="confirmPassword" name="confirmPassword" type="password" placeholder="*******" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        <span className="text-sm text-red-500 mt-2">{state.errors?.confirmPassword || ''}</span>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`relative flex justify-center items-center w-full py-2 px-4 rounded-lg uppercase bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading && <span className="loader mr-4 w-4 h-4"></span>}
        <span>{loading ? 'Loading...' : 'Register'}</span>
      </button>

      <div className="text-sm font-light text-gray-500 mt-4">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-800 transition-all">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default FormRegister;
