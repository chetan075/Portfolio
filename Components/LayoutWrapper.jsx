"use client";
import ErrorBoundary from "@/Components/ErrorBoundary";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

export default function LayoutWrapper({ children }) {
  return (
    <ErrorBoundary>
      <Navbar />
      {children}
      <Footer />
    </ErrorBoundary>
  );
}
