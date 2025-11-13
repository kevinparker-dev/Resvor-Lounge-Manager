import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Button } from "../ui/button";
import NotificationPopup from "./NotificationPopup";
import ProfileMenu from "./ProfileMenu";

const Topbar = () => {
  return (
    <div className="rounded-3xl w-full bg-white p-4 flex justify-end">
      <div className="flex items-center gap-5">
        <NotificationPopup />

        <ProfileMenu />
      </div>
    </div>
  );
};

export default Topbar;
