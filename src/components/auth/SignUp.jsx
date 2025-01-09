// components/auth/SignUp.jsx
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    if (!username.trim()) {
      setError('Username is required.');
      setIsLoading(false);
      return;
    }
  
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (res.ok) {
        const data = await res.json();
        // Store JWT token in localStorage (or cookies)
        localStorage.setItem('token', data.token);
  
        // Optionally, auto-login the user by redirecting or calling the signIn function
        const signInRes = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });
  
        if (signInRes?.error) {
          setError(signInRes.error);
        } else {
          router.push('/'); // Redirect to the home page
        }
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="bg-[url(/authbg.svg)] h-[800px] text-black md:h-[900px] w-full flex justify-center items-center">
      <div className="w-[300px] lg:w-5/12 mx-auto px-4 items-center h-[700px] md:h-[850px] bg-[#fdfeff8e] lg:bg-[#FDFEFF] flex justify-center flex-col relative">
        <Link href="/" className="absolute top-8 right-8">
          <Image src="/xicon.svg" width={10} height={10} alt="x-icon" />
        </Link>

        <div className="w-8/12 lg:mt-14">
          <h2 className="text-2xl font-bold mb-4 mx-auto text-center ">
            Join Post<span className="text-[#0086B0]">it</span>.
          </h2>
          <p className="text-center mb-6">
            Enter your details to create an account on Post
            <span className="text-[#0086B0]">it</span>.
          </p>
          <form onSubmit={handleSignUp} className="mt-8 lg:mt-12 my-auto">
            <div className="flex flex-col justify-center gap-3 lg:gap-4">
              <label className="block mb-2 mx-auto">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            {error && <div className="text-red-500 mt-4 text-center">{error}</div>}

            <button
              type="submit"
              className="w-full font-semibold p-2 mt-8 lg:mt-10 bg-[#0086B0] text-white rounded-md"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Continue'}
            </button>
          </form>
        </div>

        <div className="flex gap-2 justify-center items-center mt-8 lg:mt-12 font-semibold">
          <p>Already have an account?</p>
          <Link href="/login" className="text-[#0086B0]">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
