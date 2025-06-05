import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar";
import {Navbar} from "./components/Navbar";
import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your App",
  description: "Now with Clerk auth",
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
// <ClerkProvider>  
  <html>
      <body className="bg-black text-white">
        <SidebarProvider>
          <AppSidebar />
          <main>
            <Navbar />
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
// </ClerkProvider>
  );
}
