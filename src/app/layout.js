import "./globals.scss";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import { Themeprovider } from "@/context/ThemContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import { queryClient } from "@/utils/QueryClient";
export const metadata = {
  title: "Home Page",
};
const manrope = Manrope({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Themeprovider>
          <AuthProvider>
            <QueryClientProvider client={queryClient}>
              <Navbar />
              {children}
              <ToastContainer></ToastContainer>
            </QueryClientProvider>
          </AuthProvider>
        </Themeprovider>
      </body>
    </html>
  );
}
