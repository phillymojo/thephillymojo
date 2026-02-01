export default function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-6">
        Dashboard
      </h1>
      <div className="space-y-4">
        <div className="border border-gray-200 dark:border-gray-800 rounded p-4">
          <h2 className="font-medium mb-1">Apps & Bots</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No apps configured yet.
          </p>
        </div>
      </div>
    </div>
  );
}
