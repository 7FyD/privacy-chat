import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Slider from "../Slider";
import { testimonials } from "@/app/data";

const Home = () => {
  return (
    <div className="container flex flex-col items-center space-y-10">
      <div className="space-y-4">
        <h2 className="text-center text-2xl md:text-4xl">
          Looking to have a private, quick conversation?
        </h2>
        <h4 className="text-center text-2xl md:text-4xl font-light">
          We've got you!
        </h4>
      </div>
      <Button asChild className="p-6 md:text-lg">
        <Link href="/chat">Click to create your own private chat!</Link>
      </Button>
      <Separator className="max-w-5xl" />
      <p className="md:text-xl font-light !mt-4 max-w-4xl text-center">
        Create a secure and private chat, share it with friends or business
        partner via a link, and enjoy safe conversations in a temporary, fully
        privacy-based environment.
      </p>
      <div className="flex flex-col gap-24 mt-24 border-2 rounded-xl shadow-md">
        <Image
          src="/hero_desktop.webp"
          alt="Desktop room creation image"
          width={1913}
          height={783}
          className="w-full h-auto hidden md:block"
          priority={true}
        />
        <Image
          src="/hero_mobile.webp"
          alt="Mobile room creation image"
          width={280}
          height={836}
          className="w-full h-auto block md:hidden"
          priority={true}
        />
      </div>
      <Separator className="max-w-5xl" />
      <Slider testimonials={testimonials} />
      <Separator className="max-w-5xl" />
      <h4 className="text-center text-xl md:text-3xl">
        Have any questions or concerns?
      </h4>
      <p className="md:text-xl font-light !mt-4 max-w-4xl text-center">
        Read our{" "}
        <Link href="/faq" className="text-blue-400 hover:underline">
          FAQ
        </Link>{" "}
        to learn more about our service, and check out the{" "}
        <Link href="/privacy-policy" className="text-blue-400 hover:underline">
          Privacy Policy
        </Link>{" "}
        to see how we protect your data and identity!
      </p>
      <p className="md:text-xl font-light !mt-4 max-w-4xl text-center">
        This is a fully free service, so if this has helped you and you feel
        generous, you can always{" "}
        <Link href="/donate" className="text-blue-400 hover:underline">
          support us
        </Link>{" "}
        to help us keep the service running and continue improving it.
      </p>
    </div>
  );
};

export default Home;
