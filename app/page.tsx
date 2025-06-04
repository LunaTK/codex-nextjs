import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-6 text-center font-[family-name:var(--font-geist-sans)]">
      <Image
        src="/next.svg"
        alt="Site logo"
        width={120}
        height={120}
        priority
        className="dark:invert"
      />
      <h1 className="text-4xl font-bold">Hello, User!</h1>
      <nav className="mt-4">
        <Link href="/stocks" className="text-blue-600 underline text-xl">
          Stock search page
        </Link>
      </nav>
    </main>
  );
}
