"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import AccountCreationPopup from "./AccountCreationPopup";
import EmailSentPopUp from "./EmailSentPopUp";
import { Camera, Eye, EyeOff } from "lucide-react";

const AddBartenderForm = ({ isOpen, onOpenChange }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal triggers
  const [emailPopup, setEmailPopup] = useState(false);
  const [accountPopup, setAccountPopup] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onOpenChange(false);
    setAccountPopup(true);
  };

  const handleSendMail = () => {
    console.log("Email sent to bartender");
    setAccountPopup(false);
    setEmailPopup(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger>
          <Button className={"border-2 h-14 text-lg"}>Add New Bartender</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={"text-3xl font-bold"}>
              Add New Bartender
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="flex gap-6 items-center">
                  <Label
                    htmlFor="profile"
                    className={"cursor-pointer flex items-center gap-7"}
                  >
                    <div
                      className="w-20 h-20 rounded-full bg-center bg-cover flex justify-center items-center bg-gray-200"
                      style={{
                        backgroundImage: profileImage
                          ? `url(${profileImage})`
                          : "none",
                      }}
                    >
                      {!profileImage && (
                        <Camera className="w-10 h-10 text-gray-500" />
                      )}
                    </div>
                    <p className="text-primary font-semibold">
                      Add Bartender Image{" "}
                      <span className="text-primary/30"> (Optional)</span>
                    </p>
                    <Input
                      id="profile"
                      type={"file"}
                      className={"hidden"}
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Label>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Label className={"text-base text-black"}>Full Name</Label>
                  <Input placeholder="Full Name" className={"h-14"} />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Label className={"text-base text-black"}>
                    Email Address
                  </Label>
                  <Input
                    placeholder="email@example.com"
                    type={"email"}
                    className={"h-14"}
                  />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Label className={"text-base text-black"}>Phone Number</Label>
                  <Input placeholder="+1 234 567 890" className={"h-14"} />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Label className={"text-base text-black"}>Password</Label>
                  <div className="relative">
                    <Input
                      placeholder="● ● ● ● ● ● ● ●"
                      type={showPassword ? "text" : "password"}
                      className={"h-14 pr-10"}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="w-full flex flex-col gap-1">
                  <Label className={"text-base text-black"}>
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="● ● ● ● ● ● ● ●"
                      type={showConfirmPassword ? "text" : "password"}
                      className={"h-14 pr-10"}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {!showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                <Button className={"w-full h-14 text-lg"}>Save</Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Account Created */}
      <AccountCreationPopup
        isOpen={accountPopup}
        onOpenChange={setAccountPopup}
        onSendMail={handleSendMail}
      />

      {/* Email Sent  */}
      <EmailSentPopUp isOpen={emailPopup} onOpenChange={setEmailPopup} />
    </>
  );
};

export default AddBartenderForm;
