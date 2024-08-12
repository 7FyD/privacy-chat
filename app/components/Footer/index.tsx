import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-black">
      <div className="container flex flex-col md:!flex-row justify-between items-center text-white p-6 text-center md:text-start gap-2">
        <Link href="https://7fyd.dev" target="_blank" rel="noopener noreferrer">
          7FyD.dev
        </Link>
        <div className="flex flex-col md:!flex-row gap-2 md:gap-6">
          <p>Security concerns</p>
          <p>Terms of Service</p>
          <p>Privacy Policy</p>
          <p>Donate</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
