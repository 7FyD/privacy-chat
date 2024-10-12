import Link from "next/link";
import { Separator } from "../ui/separator";
import { Afacad } from "next/font/google";

const afacad = Afacad({ subsets: ["latin"] });

const Header = () => {
  return (
    <div className="w-full border-b-[1.5px] mb-8">
      <div className="container hidden sm:flex justify-between py-6">
        <div className="flex justify-start gap-16 items-center">
          <Link
            className={`font-medium hover:[text-shadow:_0_1px_0_rgb(0_0_0_/_20%)] transition-all text-2xl ${afacad.className}`}
            href="/"
          >
            Privacy Chat
          </Link>
          <Link href="/chat" className="text-primary font-semibold">
            Create new chat!
          </Link>
        </div>
        <div className="flex justify-start gap-12 items-center">
          <Link href="/about">About Privacy Chat</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
