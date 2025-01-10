import { auth }from '@/auth';

const dashboard = async () => {
    const session = await auth();

  return (
    <div className="max-w-screen-xl mx-auto py-6 p-4">
      <h1 className="text-2xl">dasboard page</h1>
      <h2 className='text-xl'>welcome back: <span className='font-bold'>{session?.user?.name}</span></h2>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default dashboard;
