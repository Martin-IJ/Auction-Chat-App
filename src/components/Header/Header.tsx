import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { navItems, mainNavItems } from "@/db/navItem";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    if (navbarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navbarOpen]);

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const openNavbar = () => {
    setNavbarOpen(true);
  };
  return (
    <>
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex flex-1 justify-start">
            <Link to="/" className="text-xl font-bold text-red-800">
              Art<span className="text-black">Place</span>
            </Link>
          </div>

          <button
            onClick={openNavbar}
            className="md:hidden p-3"
            aria-expanded={navbarOpen}
            aria-controls="mobile-menu"
          >
            <GiHamburgerMenu />
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <li key={index} className="text-sm hover:text-red-800">
                  <Link to={item.href} aria-label={item.label}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex flex-1 justify-end">
            <Link to="/all-artwork">
              <Button
                size="sm"
                className="text-sm bg-black text-white hover:bg-gray-800 rounded-full px-5"
              >
                View All Art
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          {navbarOpen && (
            <div
              id="mobile-menu"
              className="absolute z-50 md:hidden w-full h-screen top-0 right-0 isolate flex justify-end"
            >
              <div className="max-w-[350px] w-full h-full bg-white shadow-xl">
                {/* Mobile Close Btn */}
                <button
                  onClick={closeNavbar}
                  className="py-7 w-full px-7 text-2xl shadow-lg shadow-slate-100"
                  aria-label="Close Menu"
                >
                  <IoMdClose />
                </button>

                {/* Dark Background */}
                <div
                  onClick={closeNavbar}
                  className="absolute inset-0 bg-black/70 -z-10"
                />

                {/* Mobile Ul */}
                <ul>
                  {navItems.map((item, index) => (
                    <Link key={index} to={item.href} aria-label={item.label}>
                      <li
                        onClick={closeNavbar}
                        className="p-7 hover:bg-slate-100 hover:text-primary hover:border-l-4 border-primary duration-500 transition-all"
                      >
                        {item.label}
                      </li>
                    </Link>
                  ))}

                  <Link to="/all-artwork" className="flex flex-col px-5">
                    <Button
                      size="sm"
                      className="text-sm py-5 bg-black text-white hover:bg-gray-800 rounded-full px-5"
                    >
                      View All Art
                    </Button>
                  </Link>
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="border-b border-gray-200 overflow-x-auto">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-6 py-3 text-sm whitespace-nowrap overflow-x-auto md:overflow-visible">
            {mainNavItems.map((item, index) => (
              <li key={index} className="hover:text-red-800">
                <Link to={item.href} aria-label={item.label}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
