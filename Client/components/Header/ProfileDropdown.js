import React from "react";
import { useGlobalAuthContext } from "/context/AuthContext";
import PrimaryButton from "../UI/Button/PrimaryButton";

const ProfileDropdown = () => {
  const { user, logout, showProfileDropdown, setShowProfileDropdown } =
    useGlobalAuthContext();
  return (
    <div className="absolute gap-2 right-4 top-[80px] bg-white text-Black rounded-standard/2 flex flex-col items-start justify-start p-3 w-full max-w-[250px]">
      <div>
        <p>Hello,</p>
        <p className="text-lg font-semibold opacity-90">{user?.name}</p>
        {user?.creator && (
          <p>
            #<span className="italic font-medium">creator</span>
          </p>
        )}
      </div>
      <div className="w-full h-[1px] bg-gray-200"></div>
      <p>View Profile</p>
      <p>Account Settings</p>
      <div className="w-full h-[1px] bg-gray-200"></div>
      <div>
        <p>Blog</p>
        <p>Feedback</p>
        <p>Privacy</p>
      </div>
      <div className="w-full h-[1px] bg-gray-200"></div>
      <div className="w-full">
        <PrimaryButton
          handleClick={() => {
            logout();
            setShowProfileDropdown(false);
          }}
          fullWidth
          size="small"
          color="black"
        >
          Logout
        </PrimaryButton>
      </div>
    </div>
  );
};

export default ProfileDropdown;
