import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <Link
          href="https://github.com/tripplen23/bio-generator"
          target="_blank"
          className="mb-4"
        >
          <AnimatedShinyText className="px-6 py-2">
            Hello beautiful people
          </AnimatedShinyText>
        </Link>
      </div>
    </main>
  );
}
