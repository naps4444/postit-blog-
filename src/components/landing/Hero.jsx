import React from 'react';

const Hero = () => {
  return (
    <>
      <div className="bg-[url(/herobg.svg)] bg-cover bg-center py-8 w-full mx-auto">
        <div className="w-full mx-auto py-4 px-6 flex flex-col gap-10 container">
          <h1 className="text-black text-[50px] font-bold mt-[150px] md:text-[70px] md:font-semibold">
            Stay Curious.
          </h1>

          <p className="text-black w-[250px] md:w-[420px] text-[20px]">
            Lorem ipsum dolor sit ameetur adipiscing elit. Coctetur egestas massa velit aliquam. Molestim bibendum hnt ipsum orci, platea aliquam id ut.
          </p>

          <button className="bg-[#0086B0] rounded-lg text-white py-2 md:w-[150px]">Get Started</button>
        </div>


      </div>

      <div className='w-11/12 px-1 xl:px-5 py-14 mx-auto'>
          <div className='bg-[url(/homesub.svg)] bg-cover bg-center flex flex-col justify-center items-center py-8'>

          <div className='text-center px-4'>
            <h1 className='font-bold'>Try Post<span className="text-[#0086B0]">it</span>.</h1>

            <p className='mt-5 text-[#414141]'>Do you want to write or discover stories from writers on any topic?</p>
          </div>

          <div className='md:w-6/12 lg:w-4/12 px-2 mt-10'>
          <input type='text' className='w-7/12 lg:w-8/12 py-2 px-2 rounded-s-lg' placeholder='Enter Email address'/>
          <button className='bg-[#0086B0] text-white w-5/12 lg:w-4/12 p-2 rounded-e-lg'>Get Started</button>
          </div>

          </div>
          
        </div>
    </>
  );
};

export default Hero;
