import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import GetMyCourtWidget from '@/components/GetMyCourtWidget';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login?callbackUrl=/dashboard');

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="space-y-4">
        <GetMyCourtWidget />
      </div>
    </div>
  );
}
