import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import GetMyCourtWidget from '@/components/GetMyCourtWidget';
import GetMyTeeTimeWidget from '@/components/GetMyTeeTimeWidget';
import DashboardBotSections from '@/components/DashboardBotSections';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login?callbackUrl=/dashboard');

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Dashboard</h1>
      <DashboardBotSections teeTimeWidget={<GetMyTeeTimeWidget />} courtWidget={<GetMyCourtWidget />} />
    </div>
  );
}
