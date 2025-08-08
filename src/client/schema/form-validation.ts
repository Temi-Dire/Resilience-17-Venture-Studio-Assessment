import { z } from "zod";

export const basicInfoSchema = z.object({
    firstName: z
        .string()
        .nonempty("First name is required")
        .regex(/^[^\d]+$/, "First name cannot contain numbers"),
    lastName: z
        .string()
        .nonempty("Last name is required")
        .regex(/^[^\d]+$/, "Last name cannot contain numbers"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    phone: z.string().min(7, "Phone number is too short"),
});

export const passwordSchema = z
    .object({
        currentPassword: z
            .string()
            .min(1, "Current password is required")
            .refine((val) => val === "test1234", {
                message: "Current password is incorrect",
            }),
        newPassword: z.string().min(8, "New password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
