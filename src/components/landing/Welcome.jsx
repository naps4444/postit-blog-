import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

const Welcome = () => {
    const { data: session } = useSession();

    return (
      <>
      <div className='w-full px-5 md:px-12 lg:px-4 py-8 mx-auto'>
      <div className='grid container xl:px-6 md:grid-cols-2 mx-auto'>

      
      
      <div className='flex flex-col justify-center gap-9'>
        <h1 className="text-4xl font-bold">Welcome, {session.user.username}!</h1>
        <p className='lg:w-8/12'>Lorem ipsum dolor sit ameetur adipiscing elit. Coctetur
egestas massa velit aliquam. Molestim bibendum 
hnt ipsum orci, platea aliquam id ut. </p>

<div className='flex  justify-between md:justify-start md:gap-5 lg:gap-8'>
  <Link href="/createedit" className='px-8 md:px-10 lg:px-14 py-2 bg-[#0086B0] hover:border-[#0086B0] hover:border hover:bg-white hover:text-black text-white rounded-sm box-border'>My Stories</Link>
  
  

  <Link href="/myblog" className='px-8 md:px-10 lg:px-14 py-2 border border-[#0086B0] hover:bg-[#0086B0] hover:text-white rounded-sm box-border'>
  Go to Feed
  </Link>
</div>
      </div>


      <div>
        <Image src="/welcome.svg" alt='welcome-img' width={800} height={800} />
      </div>


      </div>
      </div>

      </>
    );
  };
  
  export default Welcome;
  