export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {year} thephillymojo
        </p>
      </div>
    </footer>
  );
}
