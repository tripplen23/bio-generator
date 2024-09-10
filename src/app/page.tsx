import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import Image from "next/image";
import Link from "next/link";
import { Coffee, ChevronRight } from "lucide-react";
import UserInput from "@/components/home/UserInput";
import Output from "@/components/home/Output";
import { BioProvider } from "@/context/BioContext";
import SparklesText from "@/components/magicui/sparkles-text";
import Meteors from "@/components/magicui/meteors";
import TypingAnimation from "@/components/magicui/typing-animation";

export default function Home() {
  return (
    <main className="relative grid grid-cols-1 slg:grid-cols-2 gap-12  px-4 py-12 sm:py-16 sm:px-8 md:px-10 slg:p-16 lg:p-24">
      <div className="col-span-full group w-full flx flex-col items-center justify-center space-y-2 sm:space-y-4 mb-4 text-center">
        <Meteors number={30} />
        <Link
          href="https://www.linkedin.com/in/binh-duc-nguyen-3b4839168/"
          target="_blank"
          className="relative z-10 inline-block" // Ensures link stays on top
        >
          <AnimatedGradientText className="px-6 py-2 rounded-full relative">
            <Coffee className="w-6 h-6 fill-orange-700" />
            <hr className="mx-2 h-4 w-[1px] bg-gray-300" />
            {/* Ensure the link is clickable */}
            Coffee talk, why not?
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>

        <SparklesText
          className="font-extrabold text-4xl md:text-5xl slg:text-6xl lg:text-7xl text-center w-full lg:w-[90%] uppercase mx-auto pt-4"
          text="YOUR IMPRESSIVE BIO MAKER"
        />
        <TypingAnimation
          className="text-sm sm:text-base  md:text-lg text-orange-500 inline-block p-2"
          text="Share your essence, I will craft your story."
          duration={100}
        />
      </div>

      <BioProvider>
        <UserInput />
        <Output />
      </BioProvider>
    </main>
  );
}
