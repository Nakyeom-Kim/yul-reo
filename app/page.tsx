import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfcfa] font-sans text-[#171717] flex flex-col relative overflow-hidden">
      <Header />

      {/* Main Content Space */}
      <main className="flex flex-col flex-1 px-8 md:px-12 mt-16 md:mt-32">
        {/* Placeholder for future content to match the reference image's vibe */}
      </main>
    </div>
  );
}
