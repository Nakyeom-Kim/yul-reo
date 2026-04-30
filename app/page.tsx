import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfcfa] font-sans text-[#171717]">
      <header className="flex justify-between items-center px-8 md:px-12 py-8 w-full">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-widest uppercase">
          RUL-REO
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link
            href="/brand"
            className="hover:opacity-50 transition-opacity"
          >
            Brand
          </Link>
          <Link
            href="/sound"
            className="hover:opacity-50 transition-opacity"
          >
            Sound
          </Link>
          <Link
            href="/profile"
            className="hover:opacity-50 transition-opacity"
          >
            Profile
          </Link>
          {/* Menu Icon Placeholder - "메뉴 바" */}
          <button className="flex flex-col gap-[5px] p-2 hover:opacity-50 transition-opacity ml-4">
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
          </button>
        </nav>
      </header>
      
      {/* Main Content Space */}
      <main className="flex flex-col flex-1 px-8 md:px-12 mt-16 md:mt-32">
        {/* Placeholder for future content to match the reference image's vibe */}
      </main>
    </div>
  );
}
