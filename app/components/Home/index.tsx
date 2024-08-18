import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

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
      <div className="grid grid-cols-1 md:grid-cols-2 text-center gap-24 !mt-24">
        <p>Image</p>
        <p>Image</p>
        <p>Image</p>
        <p>Image</p>
      </div>
      <Separator className="max-w-5xl" />
    </div>
  );
};

export default Home;
