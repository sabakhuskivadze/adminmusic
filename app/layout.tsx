"use client"
import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from 'next/navigation';
import { FloatButton } from 'antd';
import Icon from "./Components/Icon/Icon";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { RecoilRoot } from "recoil";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  console.log("Current Path:", pathname);

  const showExitButton = pathname !== '/Login' && pathname !== '/SignUp';

  const handleLogout = () => {
    Cookies.remove('userToken');
    router.replace("/Login");
  };

  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <RecoilRoot>
          {children}
          {showExitButton && 
            <FloatButton
              shape="circle"
              onClick={handleLogout}
              style={{ insetInlineEnd: 94 }}
              icon={<Icon name="exit" />}
            />
          }
        </RecoilRoot>
      </body>
    </html>
  );
}
