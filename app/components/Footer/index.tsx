import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-black mt-24">
      <div className="container flex flex-col md:!flex-row justify-between items-center text-white p-6 text-center md:text-start gap-2">
        <Link href="https://7fyd.dev" target="_blank" rel="noopener noreferrer">
          7FyD.dev
        </Link>
        <div className="flex flex-col md:!flex-row gap-2 md:gap-6">
          <Link href="/faq">F.A.Q.</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/donate">Donate</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
