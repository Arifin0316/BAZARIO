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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Profile Settings</h1>
        {user && <ProfileForm user={user} />}
      </div>
    </div>
  );
}