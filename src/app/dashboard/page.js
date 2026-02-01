import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Image from 'next/image';
import GetMyCourtWidget from '@/components/GetMyCourtWidget';
import SignOutButton from '@/components/SignOutButton';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        {session?.user && (
          <div className="flex items-center gap-3">
            <Image
              src={session.user.image}
              alt=""
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {session.user.email}
            </span>
            <SignOutButton />
          </div>
        )}
      </div>
      <div className="space-y-4">
        <GetMyCourtWidget />
      </div>
    </div>
  );
}
