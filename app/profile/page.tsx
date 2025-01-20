import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/profile/ProfileForm';
import { getUserProfile } from '@/lib/data';

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  if (!session.user?.id) {
    redirect('/login');
  }

  const { data: user } = await getUserProfile(session.user.id as string) || {};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl p-6">
          <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Profile Settings</h1>
          {user && <ProfileForm user={user} />}
        </div>
      </div>
    </div>
  );
}