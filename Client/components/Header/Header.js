import React, { useState } from "react";
import Modal from "../UI/Modal";
import Login from "../Auth/login";
import { useGlobalAuthContext } from "/context/AuthContext";
import PrimaryButton from "../UI/Button/PrimaryButton";
import { RiUser3Fill } from "react-icons/ri";
import { HiMenuAlt4 } from "react-icons/hi";
import ProfileDropdown from "./ProfileDropdown";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
const Header = () => {
  const {
    user,
    showLoginModal,
    setShowLoginModal,
    showProfileDropdown,
    setShowProfileDropdown,
  } = useGlobalAuthContext();
  // const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="absolute top-0 left-0 right-0 flex items-center justify-center w-full">
      <div className="w-full relative max-w-[1400px] flex items-center h-[120px] justify-between px-8 z-40">
        <Link href="/" className="text-2xl font-black">
          PODMODE
        </Link>

        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="flex text-4xl tablet:hidden"
        >
          {!showMobileMenu ? <HiMenuAlt4 /> : <IoCloseSharp />}
        </button>

        {showMobileMenu && (
          <ul className="absolute top-[100px] left-0 right-0 bg-black shadow-md rounded-b-xl py-6 flex flex-col items-center justify-center gap-8 ">
            <Link href="/">Home </Link>
            <Link href="/all">All Podcasts</Link>
            <Link href="/search">Search</Link>
            <Link href="/aboutus">About Us</Link>
            <PrimaryButton
              handleClick={() => router.push("/create/dashboard")}
              size="small"
            >
              Start Creating
            </PrimaryButton>
            {user ? (
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-end justify-center w-10 h-10 text-3xl rounded-full text-white/90 bg-white/10"
              >
                <RiUser3Fill className="rounded-full" />
              </button>
            ) : (
              <PrimaryButton
                size="small"
                handleClick={() => setShowLoginModal(true)}
              >
                Login
              </PrimaryButton>
            )}
          </ul>
        )}

        <ul className="items-center justify-center hidden gap-8 tablet:flex ">
          <Link href="/">Home </Link>
          <Link href="/all">All Podcasts</Link>
          <Link href="/search">Search</Link>
          <Link href="/aboutus">About Us</Link>
          <PrimaryButton
            handleClick={() => {
              user ? router.push("/create/dashboard") : setShowLoginModal(true);
            }}
            size="small"
          >
            Start Creating
          </PrimaryButton>
          {user ? (
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-end justify-center w-10 h-10 text-3xl rounded-full text-white/90 bg-white/10"
            >
              <RiUser3Fill className="rounded-full" />
            </button>
          ) : (
            <PrimaryButton
              size="small"
              handleClick={() => setShowLoginModal(true)}
            >
              Login
            </PrimaryButton>
          )}
        </ul>
      </div>
      <Modal
        isVisible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      >
        <Login />
      </Modal>
      <Modal
        isVisible={showProfileDropdown}
        onClose={() => setShowProfileDropdown(false)}
      >
        <ProfileDropdown />
      </Modal>
    </div>
  );
};

export default Header;
