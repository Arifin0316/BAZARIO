import Link from 'next/link';
import { useState } from 'react';
import { SignInCredentials } from "@/lib/action";
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/inputLogin';
import { Button } from '@/components/ui/button';

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

      <Button
        type="submit"
        loading={loading}
        loadingText="Authenticating..."
        fullWidth
      >
        Sign In
      </Button>

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