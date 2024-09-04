import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import Image from "next/image";
import Link from "next/link";
import { Coffee, ChevronRight } from "lucide-react";
import UserInput from "@/components/home/UserInput";
import Output from "@/components/home/Output";

export default function Home() {
  return (
    <main className="relative grid  grid-cols-1 slg:grid-cols-2 gap-12  px-4 py-12 sm:py-16 sm:px-8 md:px-10 slg:p-16 lg:p-24">
      <div className="col-span-full group w-full flx flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 text-center">
        <Link
          href="https://github.com/tripplen23/bio-generator"
          target="_blank"
          className=""
        >
          <AnimatedGradientText className="px-6 py-2 rounded-full">
            <Coffee className="w-6 h-6 fill-orange-700" />
            <hr className="mx-2 h-4 w-[1px] bg-gray-300" />
            Buy me a coffee
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
        <h1 className="font-extrabold text-7xl text-center w-full lg:w-[90%] uppercase mx-auto pt-4">
          YOUR IMPRESSIVE BIO MAKER
        </h1>
        <p className="text-lg text-orange-500 inline-block p-2">
          Share your essence, I will craft your story.
        </p>
      </div>

      <UserInput />
      <Output />
    </main>
  );
}
