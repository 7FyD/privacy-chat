import Link from "next/link";
import { Separator } from "../ui/separator";

const Header = () => {
  return (
    <div className="w-full border-b-[1.5px] mb-8">
      <div className="container hidden sm:flex justify-between py-6">
        <div className="flex justify-start gap-16 items-center">
          <Link href="/">LOGO(home)</Link>
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
