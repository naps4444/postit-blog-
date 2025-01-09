import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = () => setIsDropdownOpen((prev) => !prev);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen((prev) => !prev);

  const isValidImage = (url) => url?.startsWith('http') || url?.startsWith('/');

  useEffect(() => {
    console.log('Session Data:', session);
  }, [session]);

  return (
    <div className="w-full container mx-auto">
      <nav className="bg-[#FDFEFF] text-white px-6 py-4">
        <div className="flex justify-between items-center mx-auto">
          <Link href="/" className="text-xl font-bold text-black">
            Post<span className="text-[#0086B0]">it</span>.
          </Link>

          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden text-black focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>

          <ul className="hidden md:flex space-x-8">
            <li>
              <Link href="/blog" className="hover:underline text-black">
                Stories
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline text-black">
                Contact
              </Link>
            </li>
            {!session ? (
              <>
                <li>
                  <Link href="/login" className="hover:underline text-black">
                    Sign In
                  </Link>
                </li>
                <li className="px-3 rounded-lg py-1 text-white bg-[#0086B0]">
                  <Link href="/signup" className="hover:underline">
                    Get Started
                  </Link>
                </li>
              </>
            ) : (
              <li className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex items-center space-x-2 hover:underline"
                >
                  {isValidImage(session.user.image) ? (
                    <Image
                      src={session.user.image}
                      alt="Profile Picture"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  ) : (
                    <Image
                      src="/default-profile.png"
                      alt="Default Profile Picture"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  )}
                  <span>{session.user.name || 'User'}</span>
                </button>
                {isDropdownOpen && (
                  <ul className="absolute bg-white text-black right-0 mt-2 p-2 rounded shadow-lg z-50">
                    <li>
                      <Link href="/profile" className="block px-4 py-2">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="block px-4 py-2 text-red-500"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
