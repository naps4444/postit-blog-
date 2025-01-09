// components/auth/Login.jsx
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      // Redirect to the home page or user dashboard after successful login
      router.push('/');
    }
  };

  return (
    <div className="bg-[url(/authbg.svg)] text-black h-screen w-full flex justify-center items-center">
      <div className="w-[300px] lg:w-5/12 mx-auto px-4 items-center h-[600px] md:h-screen bg-[#fdfeff8e] lg:bg-[#FDFEFF] flex justify-center flex-col relative">
        <Link href="/" className="absolute top-8 right-8">
          <Image src="/xicon.svg" width={10} height={10} alt="x-icon" />
        </Link>
        <div className="w-8/12 lg:mt-14">
          <h2 className="text-2xl font-bold mb-4 mx-auto text-center">Welcome Back</h2>
          <form onSubmit={handleLogin} className="mt-8 lg:mt-12 my-auto">
            <div className="flex flex-col justify-center gap-3 lg:gap-4">
              <label className="block mb-2 mx-auto">Your Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 outline-none border-b-2 border-black bg-[#fdfeff03] text-center"
                required
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitBoxShadow: '0 0 0px 1000px transparent inset',
                  WebkitTextFillColor: 'inherit',
                }}
              />
            </div>
            <div className="flex flex-col justify-center gap-3 lg:gap-4 mt-8 lg:mt-10">
              <label className="block mb-2 mx-auto">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 outline-none border-b-2 border-black bg-[#fdfeff03] text-center"
                required
                style={{
                  WebkitBackgroundClip: 'text',
                  WebkitBoxShadow: '0 0 0px 1000px transparent inset',
                  WebkitTextFillColor: 'inherit',
                }}
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className="w-full font-semibold p-2 mt-8 lg:mt-16 bg-[#0086B0] text-white rounded-md"
            >
              Continue
            </button>
          </form>
        </div>
        <div className="flex gap-2 justify-center items-center mt-8 lg:mt-16 font-semibold">
          <p>No account?</p>
          <Link href="/signup" className="text-[#0086B0]">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
