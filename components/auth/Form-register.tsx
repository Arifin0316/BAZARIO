import Link from 'next/link';
import { useState } from 'react';
import { SignUpCredential } from '@/lib/action';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

      <Input
        id="name"
        name="name"
        type="text"
        label="Name"
        required
        placeholder="Name"
        error={state.errors?.name}
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        required
        placeholder="example@gmail.com"
        error={state.errors?.email}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Password"
        required
        placeholder="*******"
        error={state.errors?.password}
      />

      <Input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        required
        placeholder="*******"
        error={state.errors?.confirmPassword}
      />

      <Button
        type="submit"
        loading={loading}
        loadingText="Loading..."
        fullWidth
      >
        Register
      </Button>

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