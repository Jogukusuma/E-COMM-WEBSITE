
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, ChevronDown, Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="relative h-screen flex flex-col justify-center items-center text-center text-slate-800">
        <Image
          src="https://storage.googleapis.com/project-spark-347416-cms-public/cms/6a77d5a528654c6b8c34a2e8c89b71e0.png"
          alt="Misty mountains and clouds"
          fill
          className="object-cover -z-10"
          data-ai-hint="mountains clouds"
          priority
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10" />
        
        <div className="container mx-auto px-4 flex flex-col items-center flex-grow justify-center">
          <h1 className="mb-2 text-5xl md:text-6xl font-serif text-slate-900 drop-shadow-sm">
            Find the best <Plane className="inline-block h-12 w-12 -mt-2" /> flights faster
          </h1>
          <p className="mb-12 text-3xl md:text-4xl text-slate-700 font-calligraphy">
            Travel smarter
          </p>

          <div className="w-full max-w-4xl p-6 rounded-xl bg-white/70 shadow-xl backdrop-blur-md">
            <div className="flex items-center space-x-4 mb-4">
              <Select defaultValue="round-trip">
                <SelectTrigger className="w-auto bg-transparent border-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="round-trip">Round trip</SelectItem>
                  <SelectItem value="one-way">One-way</SelectItem>
                </SelectContent>
              </Select>
               <Select defaultValue="1">
                <SelectTrigger className="w-auto bg-transparent border-none focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Passenger</SelectItem>
                  <SelectItem value="2">2 Passengers</SelectItem>
                  <SelectItem value="3">3 Passengers</SelectItem>
                  <SelectItem value="4">4+ Passengers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="md:col-span-2 relative">
                <label className="absolute -top-2 left-3 bg-white/0 px-1 text-xs text-slate-500">From</label>
                <Input defaultValue="Warsaw, Poland" className="w-full h-12 text-base"/>
              </div>
              <Button variant="ghost" size="icon" className="w-10 h-10 mx-auto bg-white/80 rounded-full border">
                <ArrowRightLeft className="h-5 w-5 text-slate-600" />
              </Button>
              <div className="md:col-span-2 relative">
                <label className="absolute -top-2 left-3 bg-white/0 px-1 text-xs text-slate-500">To</label>
                <Input defaultValue="Bangkok, Thailand" className="w-full h-12 text-base" />
              </div>
              <Button className="w-full h-12 text-lg bg-slate-900 hover:bg-slate-800 text-white md:col-start-5">
                Search
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full py-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center gap-8 md:gap-12 opacity-60">
              <span className="font-bold text-slate-700">Lufthansa</span>
              <span className="font-bold text-slate-700 text-2xl">LOT</span>
              <div className="flex items-center gap-2 font-semibold text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L1 21h22L12 0z"/></svg>
                DELTA
              </div>
               <span className="font-bold text-slate-700">KLM</span>
               <span className="font-semibold text-slate-700">UNITED</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
