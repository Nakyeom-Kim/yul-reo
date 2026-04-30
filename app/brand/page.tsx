import Link from "next/link";

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-[#fbfcfa] font-sans text-[#171717] flex flex-col relative overflow-hidden">
      <header className="flex justify-between items-center px-8 md:px-12 py-8 w-full z-10 absolute top-0 pointer-events-auto">
        <Link href="/" className="text-2xl font-bold tracking-widest uppercase hover:opacity-50 transition-opacity">
          RUL-REO
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link href="/brand" className="hover:opacity-50 transition-opacity">
            Brand
          </Link>
          <Link href="/sound" className="hover:opacity-50 transition-opacity">
            Sound
          </Link>
          <Link href="/profile" className="hover:opacity-50 transition-opacity">
            Profile
          </Link>
          <button className="flex flex-col gap-[5px] p-2 hover:opacity-50 transition-opacity ml-4">
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
          </button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center pt-32 px-8">
        <h1 className="text-4xl font-light tracking-widest uppercase mb-6">Brand</h1>
        <p className="text-lg text-gray-400">Brand page content coming soon.</p>
      </main>
    </div>
  );
}
