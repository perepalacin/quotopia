import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp path="/sign-up" 
    appearance={
      {
        elements: {
          card: "bg-white dark:bg-neutral-900 rounded-b-none rounded-t-xl",
          headerTitle: "dark:text-neutral-200",
          headerSubtitle: "dark:text-neutral-400",
          dividerText: "dark:text-neutral-400",
          socialButtonsBlockButton: "dark:bg-neutral-700 dark:text-neutral-200",
          formFieldLabel: "dark:text-neutral-200",
          formFieldInputShowPasswordButton: "dark:text-neutral-400",
          formFieldInput: "dark:bg-neutral-700 dark:text-neutral-200 hover:ring-1 ring-blue-500",
          formButtonPrimary: "bg-indigo-700 dark:bg-indigo-600 bg-gradient-to-t from-indigo-700 to-indigo-700 dark:from-indigo-700 dark:to-indigo-700",
          footer: "bg-white dark:bg-neutral-900",
          formResendCodeLink: "dark:text-neutral-200",
          otpCodeFieldInput: "dark:bg-neutral-800 border-2 border-indigo-500 dark:text-white"
        }
      }
  }/>;
}