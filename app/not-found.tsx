import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList.get("host");
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-4xl font-bold mb-8">404</h1>
      <h3 className="mb-1">
        Sorry, we couldn't find the page you were looking for.
      </h3>
      <Link
        className="text-blue-400 hover:text-blue-600 transition-colors"
        href="/"
      >
        Go back home.
      </Link>
    </div>
  );
}
