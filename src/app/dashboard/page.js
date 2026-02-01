import GetMyCourtWidget from '@/components/GetMyCourtWidget';

export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">
        Dashboard
      </h1>
      <div className="space-y-4">
        <GetMyCourtWidget />
      </div>
    </div>
  );
}
