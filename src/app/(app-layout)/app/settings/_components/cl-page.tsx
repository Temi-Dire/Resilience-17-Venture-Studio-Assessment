"use client";

import { Camera, Check, Clock, Eye, EyeOff, LogOut, PencilLine, Trash, Upload } from "lucide-react";
import { useState } from "react";

import { SwitchWithIcon } from "@/client/components/ui-extended/switch-icon";
import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { TabsContent } from "@/client/components/ui/tabs";
import Image from "next/image";
import { PhoneInput, type CountryData } from "@/client/components/ui-extended/phone-input";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/client/components/ui-extended/file-dropzone";

export function SettingsClientPage() {
    return (
        <>
            <BasicInformation />
            <SecuritySettings />
            <Preferences />
            <AccountSettings />
        </>
    );
}

const BasicInformation = () => {
    const [countryData, setCountryData] = useState<CountryData | undefined>();

    const [files, setFiles] = useState<File[] | undefined>();
    const handleDrop = (files: File[]) => {
        console.log(files);
        setFiles(files);
    };

    return (
        <TabsContent value="basic-information" className="gap-7.5 bg-white p-0">
            <div className="flex flex-col justify-center gap-2 border-b border-b-neutral-200 px-4 pt-8 pb-3">
                <h1 className="font-medium text-xl">Basic Information</h1>
            </div>
            <div className="flex flex-col gap-16 px-4 py-6">
                <div className="relative items-center justify-center">
                    <Dropzone accept={{ "image/*": [] }} maxFiles={10} maxSize={1024 * 1024 * 10} minSize={1024} onDrop={handleDrop} onError={console.error} src={files} className="rounded-xl border-none p-0">
                        <DropzoneEmptyState
                            children={
                                <div className="flex h-48 w-full flex-col items-center justify-center rounded-xl border border-dashed py-8">
                                    <Upload size={40} className="mb-3 text-primary" />
                                    <p className="mb-2 text-neutral-500 text-xs">Upload your cover image here 1200 x 600px recommended</p>
                                </div>
                            }
                        />
                        <DropzoneContent />
                    </Dropzone>
                    <div className="-bottom-12 absolute left-8">
                        <button className="relative" type="button">
                            <Image className="rounded-full" src={"/assets/images/profile-picture.svg"} alt="Profile picture" width={150} height={150} />
                            <div className="absolute right-0 bottom-1 w-fit rounded-lg bg-white p-3 shadow-md">
                                <Camera className="text-primary" size={16} />
                            </div>
                        </button>
                    </div>
                </div>
                <form className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <p className="text-neutral-500">You can change your personal information settings here</p>
                        <Button>
                            <PencilLine size={16} /> Edit
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-9 rounded-2xl border border-neutral-200 p-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="first-name">First Name</label>
                            <Input className="h-10 rounded-xl border-neutral-200 font-medium text-sm shadow-none placeholder:text-neutral-400 md:h-14" value="John" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="first-name">Last Name</label>
                            <Input className="h-10 rounded-xl border-neutral-200 font-medium text-sm shadow-none placeholder:text-neutral-400 md:h-14" value="Doe" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="first-name">Email</label>
                            <Input className="h-10 rounded-xl border-neutral-200 font-medium text-sm shadow-none placeholder:text-neutral-400 md:h-14" value="johndoe123@gmail.com" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="first-name">Phone Number</label>
                            <PhoneInput countryData={countryData} setCountryData={setCountryData} className="h-10 shadow-none md:h-14" />
                        </div>
                    </div>
                </form>
            </div>
        </TabsContent>
    );
};

const SecuritySettings = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>();
    const [showNewPassword, setShowNewPassword] = useState<boolean>();
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState<boolean>();

    return (
        <TabsContent value="security" className="gap-7.5 bg-white p-0">
            <div className="flex flex-col justify-center gap-2 border-b border-b-neutral-200 px-4 pt-8 pb-3">
                <h1 className="font-medium text-xl">Security</h1>
            </div>
            <div className="flex flex-col gap-6 px-9 py-6">
                <form className="flex flex-col gap-5 rounded-2xl border border-neutral-200 p-6">
                    <h2 className="font-medium text-lg">Change Your Password</h2>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">Current Password</Label>
                            <div className="relative">
                                <Input className="h-10 rounded-xl border-neutral-200 font-medium text-sm shadow-none placeholder:text-neutral-400 md:h-14" placeholder="cicmediatv" type={showCurrentPassword ? "text" : "password"} />
                                <button className="-translate-y-1/2 absolute top-1/2 right-3 text-neutral-400" type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                    {showCurrentPassword ? <Eye className="!w-4 md:!w-6 !h-4 md:!h-6" /> : <EyeOff className="!w-4 md:!w-6 !h-4 md:!h-6 -scale-x-100 transform" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">New Password</Label>
                            <div className="relative">
                                <Input className="h-10 rounded-xl border-neutral-200 font-medium text-sm shadow-none placeholder:text-neutral-400 md:h-14" placeholder="cicmediatv" type={showNewPassword ? "text" : "password"} />
                                <button className="-translate-y-1/2 absolute top-1/2 right-3 text-neutral-400" type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <Eye className="!w-4 md:!w-6 !h-4 md:!h-6" /> : <EyeOff className="!w-4 md:!w-6 !h-4 md:!h-6 -scale-x-100 transform" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">Confirm New Password</Label>
                            <div className="relative">
                                <Input className="h-10 rounded-xl border-neutral-200 font-medium text-sm shadow-none placeholder:text-neutral-400 md:h-14" placeholder="cicmediatv" type={showConfirmNewPassword ? "text" : "password"} />
                                <button className="-translate-y-1/2 absolute top-1/2 right-3 text-neutral-400" type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                                    {showConfirmNewPassword ? <Eye className="!w-4 md:!w-6 !h-4 md:!h-6" /> : <EyeOff className="!w-4 md:!w-6 !h-4 md:!h-6 -scale-x-100 transform" />}
                                </button>
                            </div>
                        </div>

                        <Button className="h-10 w-35 gap-1 rounded-full font-semibold text-sm">
                            <p>Save Password</p>
                        </Button>
                    </div>
                </form>
                <form className="flex flex-col gap-6 rounded-2xl border border-neutral-200 p-6">
                    <div className="flex flex-col gap-2.5">
                        <h2 className="font-medium text-lg">Login Information</h2>
                        <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-100/80 px-2.5 py-3">
                            <Clock className="size-4 text-neutral-400" />
                            <div>
                                <p className="font-medium text-black text-sm">Last Login</p>
                                <p className="text-black text-xs">December 15, 2024 at 2:24PM · (Winnipeg, CA)</p>
                            </div>
                        </div>
                    </div>

                    <Button className="h-10 w-35 gap-1.5 rounded-full font-semibold text-sm" variant="destructive">
                        <LogOut className="text-white" />
                        <p>Log Out</p>
                    </Button>
                </form>
            </div>
        </TabsContent>
    );
};

const Preferences = () => {
    return (
        <TabsContent value="preferences" className="gap-7.5 bg-white p-0">
            <div className="flex flex-col justify-center gap-2 border-b border-b-neutral-200 px-4 pt-8 pb-3">
                <h1 className="font-medium text-xl">Preferences</h1>
            </div>
            <div className="flex flex-col gap-6 px-9 py-6">
                <form className="flex flex-col gap-6 rounded-2xl border border-neutral-200 p-6">
                    <div className="flex flex-col gap-2.5">
                        <h2 className="font-medium text-lg">Notification</h2>
                        <ul className="flex flex-col gap-5">
                            <li className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-100/80 px-2.5 py-3">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-black text-sm">Event Inspiration & Tips</p>
                                    <p className="text-black text-xs">Get monthly emails with fresh ideas and planning advice.</p>
                                </div>
                                <SwitchWithIcon checkedIcon={<Check className="h-8 w-8 text-green-900" />} uncheckedIcon={null} />
                            </li>
                            <li className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-100/80 px-2.5 py-3">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-black text-sm">Product Updates</p>
                                    <p className="text-black text-xs">Stay informed about new features and improvements on FinTrack.</p>
                                </div>
                                <SwitchWithIcon checkedIcon={<Check className="h-8 w-8 text-green-900" />} uncheckedIcon={null} />
                            </li>
                            <li className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-100/80 px-2.5 py-3">
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-black text-sm">Special Offers</p>
                                    <p className="text-black text-xs">Get monthly emails with fresh ideas and planning advice.</p>
                                </div>
                                <SwitchWithIcon checkedIcon={<Check className="h-8 w-8 text-green-900" />} uncheckedIcon={null} />
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </TabsContent>
    );
};

const AccountSettings = () => {
    return (
        <TabsContent value="account-settings" className="gap-7.5 bg-white p-0">
            <div className="flex flex-col justify-center gap-2 border-b border-b-neutral-200 px-4 pt-8 pb-3">
                <h1 className="font-medium text-xl">Account Settings</h1>
            </div>
            <div className="flex flex-col gap-6 px-9 py-6">
                <div className="flex flex-col gap-2.5 rounded-2xl border border-neutral-200 p-6">
                    <h2 className="font-medium text-lg">Account Type</h2>

                    <div className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-100/80 px-2.5 py-3">
                        <div className="flex flex-col gap-2">
                            <p className="font-medium text-black text-sm">
                                You're currently using FinTrack as a: <span className="font-semibold text-destructive">USER</span>
                            </p>
                            <p className="text-black text-xs">Book and manage events with ease</p>
                        </div>
                        <Button className="rounded-full text-sm">Switch to Admin Account</Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2.5 rounded-2xl border border-neutral-200 p-6">
                    <h2 className="font-medium text-lg">Account Management</h2>

                    <ul className="flex flex-col gap-5">
                        <li className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-100/80 px-2.5 py-3">
                            <div className="flex flex-col gap-2">
                                <p className="font-medium text-black text-sm">
                                    You're currently using FinTrack as a: <span className="font-semibold text-destructive">USER</span>
                                </p>
                                <p className="text-black text-xs">Book and manage events with ease</p>
                            </div>
                            <Button className="rounded-full text-sm">
                                <LogOut className="text-white" />
                                <p>Sign Out</p>
                            </Button>
                        </li>
                        <li className="flex items-center justify-between gap-2 rounded-xl border border-destructive bg-destructive/10 px-2.5 py-3">
                            <div className="flex flex-col gap-2">
                                <p className="font-medium text-black text-sm">
                                    You're currently using FinTrack as a: <span className="font-semibold text-destructive">USER</span>
                                </p>
                                <p className="text-black text-xs">Book and manage events with ease</p>
                            </div>
                            <Button className="rounded-full text-sm" variant="destructive">
                                <Trash className="text-white" />
                                <p>Delete Account</p>
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </TabsContent>
    );
};
