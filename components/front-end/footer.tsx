import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#0e8388] text-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <p className=" text-white text-center dark:text-gray-400">
          Copyright &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
