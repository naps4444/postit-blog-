import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#292929] w-full text-white py-2 mx-auto font-openSans">
      <div className="mx-auto w-11/12 container md:px-4">
        <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-3 border-b-[1px] border-white py-10">
          <div className="">
            <h1 className="font-bold">
              About Post<span className="text-[#0086B0]">it</span>.
            </h1>
            <p className="mt-2 text-[14px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Tincidunt id sem vel quis in turpis sit eget pellentesque. Nunc
              etiicies in rhoncus, rhoncus in arcu. Tincidunt neque fusce
              vitaenisi aliquet. que maeae tortoere necsem commodo ac.
            </p>
          </div>
          <div className="lg:w-10/12 lg:mx-auto">
            <h1 className="font-bold">Quick Menu</h1>
            <div className="grid mt-2 grid-cols-2 text-[14px]">
              <div className="flex gap-3">
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link
                      href="/"
                      className="hover:underline transition duration-200"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/stories"
                      className="hover:underline transition duration-200"
                    >
                      Stories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/trending-stories"
                      className="hover:underline transition duration-200"
                    >
                      Trending Stories
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/popular-stories"
                      className="hover:underline transition duration-200"
                    >
                      Popular Stories
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="flex flex-col gap-3">
                  <li>
                    <Link
                      href="/signup"
                      className="hover:underline transition duration-200"
                    >
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="hover:underline transition duration-200"
                    >
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="hover:underline transition duration-200"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col mx-auto">
              <h1 className="font-bold">Subscribe to our newsletter</h1>
              <div className="bg-white md:w-6/12 lg:w-full mt-3 flex justify-between p-1 md:p-2 rounded-sm">
                <input
                  type="text"
                  placeholder="Email address"
                  className="px-2 lg:w-10/12 outline-0 text-black text-[14px]"
                />
                <div className="flex gap-1 md:gap-2 py-1 px-2 md:w-28 lg:w-36 items-center bg-[#0086B0] hover:bg-[#006d8e]">
                  <Link
                    href="/"
                    className="text-sm md:text-base lg:text-[14px] hover:underline"
                  >
                    Subscribe
                  </Link>
                  <Image
                    src="/arr.svg"
                    width={20}
                    height={20}
                    alt="arrow"
                    className="hover:opacity-75 transition duration-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-8 justify-end py-6">
            <div>
              <a href="#" className="font-semibold hover:underline">
                Terms and Policy
              </a>
            </div>
            <div className="flex gap-3 items-center">
              <Image
                src="/twitter.svg"
                width={20}
                height={20}
                alt="icon"
                className="hover:opacity-75 transition duration-200"
              />
              <Image
                src="/facebook.svg"
                width={10}
                height={20}
                alt="icon"
                className="hover:opacity-75 transition duration-200"
              />
              <Image
                src="/insta.svg"
                width={20}
                height={20}
                alt="icon"
                className="hover:opacity-75 transition duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
