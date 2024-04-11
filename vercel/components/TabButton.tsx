"use client"

import { useRouter, usePathname } from 'next/navigation';

export default function TabButton({ tabName, route }: { tabName: string; route: string}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === route; // Need this so we can have the current tab have white text

  const handleRedirect = () => {
    router.push(route); // Does the redirect
  };

  return (
    <button
      onClick={handleRedirect}
      className={`px-4 py-2 font-semibold rounded-md focus:outline-none transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-gray-500 hover:text-white'
      }`}
    >
      {tabName}
    </button>
  );
}
