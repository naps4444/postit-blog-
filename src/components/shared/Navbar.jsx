import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isValidImage = (url) => url?.startsWith("http") || url?.startsWith("/");

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#FDFEFF]">
      <div className="w-11/12 container mx-auto">
        <nav className="bg-[#FDFEFF] text-white md:px-4 py-4">
          <div className="flex justify-between items-center mx-auto">
            <Link href="/" className="text-3xl font-bold text-black font-harmattan">
              Post<span className="text-[#0086B0]">it</span>.
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            <ul className="hidden md:flex md:items-center text-[18px] space-x-8 font-harmattan">
              <li>
                <Link href="/blog" className="hover:underline text-black">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline text-black">
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
                <li className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
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
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute bg-white text-black right-0 mt-2 p-2 w-[120px] rounded shadow-lg z-50">
                      <li>
                        <Link href="/profile" className="block px-4 text-center py-2 w-full hover:underline">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="block px-4 w-full py-2 text-red-500 hover:underline"
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

          {isMobileMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-50"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-4 text-black font-bold text-xl focus:outline-none"
              >
                ✕
              </button>

              <div className="flex flex-col items-center justify-center h-full space-y-6 bg-[#FDFEFF] p-8 font-harmattan">
                <Link href="/blog" className="text-xl text-black hover:underline" onClick={() => setIsMobileMenuOpen(false)}>
                  Stories
                </Link>
                <Link href="/contact" className="text-xl text-black hover:underline" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </Link>
                {!session ? (
                  <>
                    <Link href="/login" className="text-xl text-black hover:underline" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                    <Link href="/signup" className="px-4 py-2 text-white bg-[#0086B0] rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/profile" className="text-xl text-black hover:underline" onClick={() => setIsMobileMenuOpen(false)}>
                      Profile
                    </Link>
                    <button onClick={() => signOut({ callbackUrl: "/" })} className="text-xl text-red-500 hover:underline">
                      Sign out
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
