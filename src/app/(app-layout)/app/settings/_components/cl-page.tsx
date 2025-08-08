"use client";

import { Check, CircleCheckBig, Clock, Eye, EyeOff, LogOut, PencilLine, Trash } from "lucide-react";
import { useState } from "react";

import { SwitchWithIcon } from "@/client/components/ui-extended/switch-icon";
import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/client/components/ui/tabs";
import { PhoneInput, type CountryData } from "@/client/components/ui-extended/phone-input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/client/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { basicInfoSchema, passwordSchema, type BasicInfoFormValues } from "@/client/schema/form-validation";

export function SettingsClientPage() {
    return (
        <section className="min-h-screen w-screen sm:w-auto">
            <header className="sticky top-0 mb-2.5 flex w-full items-center justify-between bg-white px-8 py-4 shadow-sm sm:py-8">
                <h1 className="font-semibold text-xl">Profile Settings</h1>
            </header>
            <Tabs defaultValue="basic-information" className="w-full">
                <div className="flex flex-col justify-between gap-5 bg-white px-8 py-6 lg:flex-row">
                    <div className="overflow-x-auto">
                        <TabsList className="flex gap-2 bg-[#F9F9F9] text-sm">
                            <TabsTrigger value="basic-information" className="!h-8 flex w-[130px] items-center justify-center transition-colors data-[state=active]:rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                                Basic Information
                            </TabsTrigger>
                            <TabsTrigger value="security" className="!h-8 flex w-[130px] items-center justify-center transition-colors data-[state=active]:rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                                Security
                            </TabsTrigger>
                            <TabsTrigger value="preferences" className="!h-8 flex w-[130px] items-center justify-center transition-colors data-[state=active]:rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                                Preferences
                            </TabsTrigger>
                            <TabsTrigger value="account-settings" className="!h-8 flex w-[130px] items-center justify-center transition-colors data-[state=active]:rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white">
                                Account Settings
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <BasicInformation />
                <SecuritySettings />
                <Preferences />
                <AccountSettings />
            </Tabs>
        </section>
    );
}

const BasicInformation = () => {
    const [countryData, setCountryData] = useState<CountryData | undefined>();
    const [isEditing, setIsEditing] = useState(false);

    const [formValues, setFormValues] = useState<BasicInfoFormValues>({
        firstName: "Temidire",
        lastName: "Owoeye",
        email: "temidireowoeye@gmail.com",
        phone: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof BasicInfoFormValues, string>>>({});

    const handleChange = (field: keyof BasicInfoFormValues, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleToggleEdit = () => {
        if (isEditing) {
            const result = basicInfoSchema.safeParse(formValues);
            if (!result.success) {
                const fieldErrors: any = {};
                result.error.issues.forEach((err) => {
                    fieldErrors[err.path[0] as string] = err.message;
                });
                setErrors(fieldErrors);
                toast.error("Please fix all errors before saving.");
                return;
            }

            toast.success("Data saved successfully!");
        }
        setIsEditing((prev) => !prev);
    };

    return (
        <TabsContent value="basic-information" className="gap-7.5 bg-white p-0">
            <div className="flex flex-col gap-16 px-8 py-6">
                <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex items-center gap-2 justify-between">
                        <p className="text-neutral-500 text-xs sm:text-base">You can change your personal information settings here</p>
                        <Button type="button" onClick={handleToggleEdit}>
                            {isEditing ? <CircleCheckBig size={16} /> : <PencilLine size={16} />}
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 rounded-2xl border border-neutral-200 p-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="first_name">First Name</label>
                            <Input id="first_name" disabled={!isEditing} value={formValues.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
                            {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="last_name">Last Name</label>
                            <Input id="last_name" disabled={!isEditing} value={formValues.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
                            {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <Input id="email" disabled={!isEditing} value={formValues.email} onChange={(e) => handleChange("email", e.target.value)} />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="phone">Phone Number</label>
                            <PhoneInput id="phone" disabled={!isEditing} countryData={countryData} setCountryData={setCountryData} value={formValues.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
                        </div>
                    </div>
                </form>
            </div>
        </TabsContent>
    );
};

export const SecuritySettings = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const [formValues, setFormValues] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<{
        currentPassword?: string;
        newPassword?: string;
        confirmPassword?: string;
    }>({});

    const router = useRouter();

    const handleChange = (field: keyof typeof formValues, value: string) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validation = passwordSchema.safeParse(formValues);

        if (!validation.success) {
            const formatted = validation.error.format();
            setErrors({
                currentPassword: formatted.currentPassword?._errors[0],
                newPassword: formatted.newPassword?._errors[0],
                confirmPassword: formatted.confirmPassword?._errors[0],
            });
            return;
        }

        setErrors({});
        toast.success("Password changed successfully!");
        setFormValues({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    return (
        <TabsContent value="security" className="gap-7.5 bg-white p-0">
            <div className="flex flex-col gap-6 px-9 py-6">
                <form className="flex flex-col gap-5 rounded-2xl border border-neutral-200 p-6" onSubmit={handleSubmit}>
                    <h2 className="font-medium text-base sm:text-lg">Change Your Password</h2>
                    <div className="flex flex-col gap-6 text-sm sm:text-base">
                        {/* Current Password */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">Current Password</Label>
                            <div className="relative">
                                <Input
                                    className="h-10 rounded-xl border-neutral-200 font-medium text-sm shadow-none placeholder:text-neutral-400 md:h-14"
                                    placeholder="test1234"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={formValues.currentPassword}
                                    onChange={(e) => handleChange("currentPassword", e.target.value)}
                                />
                                <button className="-translate-y-1/2 absolute top-1/2 right-3 text-neutral-400" type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                    {showCurrentPassword ? <Eye className="!w-4 md:!w-6 !h-4 md:!h-6" /> : <EyeOff className="!w-4 md:!w-6 !h-4 md:!h-6 -scale-x-100 transform" />}
                                </button>
                            </div>
                            {errors.currentPassword && <p className="text-red-500 text-xs">{errors.currentPassword}</p>}
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">New Password</Label>
                            <div className="relative">
                                <Input
                                    className="h-10 rounded-xl border-neutral-200 font-medium text-sm shadow-none placeholder:text-neutral-400 md:h-14"
                                    placeholder="Enter new password"
                                    type={showNewPassword ? "text" : "password"}
                                    value={formValues.newPassword}
                                    onChange={(e) => handleChange("newPassword", e.target.value)}
                                />
                                <button className="-translate-y-1/2 absolute top-1/2 right-3 text-neutral-400" type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {showNewPassword ? <Eye className="!w-4 md:!w-6 !h-4 md:!h-6" /> : <EyeOff className="!w-4 md:!w-6 !h-4 md:!h-6 -scale-x-100 transform" />}
                                </button>
                            </div>
                            {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-2">
                            <Label className="text-black">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    className="h-10 rounded-xl border-neutral-200 font-medium text-sm shadow-none placeholder:text-neutral-400 md:h-14"
                                    placeholder="Confirm new password"
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    value={formValues.confirmPassword}
                                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                />
                                <button className="-translate-y-1/2 absolute top-1/2 right-3 text-neutral-400" type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                                    {showConfirmNewPassword ? <Eye className="!w-4 md:!w-6 !h-4 md:!h-6" /> : <EyeOff className="!w-4 md:!w-6 !h-4 md:!h-6 -scale-x-100 transform" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                        </div>

                        <Button type="submit" className="h-10 w-35 gap-1 rounded-full font-semibold text-sm">
                            <p>Save Password</p>
                        </Button>
                    </div>
                </form>

                {/* Login Info */}
                <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200 p-6">
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

                    {/* Logout Dialog */}
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button variant={"destructive"} className="flex justify-start">
                                Logout
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Log out of your account?</AlertDialogTitle>
                                <AlertDialogDescription>You’ll need to sign in again to access your account. Any unsaved changes may be lost.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => router.push("/app")}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </TabsContent>
    );
};

const Preferences = () => {
    return (
        <TabsContent value="preferences" className="gap-7.5 bg-white p-0">
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
            <div className="flex flex-col gap-6 px-9 py-6">
                <div className="flex flex-col gap-2.5 rounded-2xl border border-neutral-200 p-6">
                    <h2 className="font-medium text-lg">Account Type</h2>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-100/80 px-2.5 py-3">
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
                        <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-neutral-200 bg-neutral-100/80 px-2.5 py-3">
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
                        <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-destructive bg-destructive/10 px-2.5 py-3">
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
