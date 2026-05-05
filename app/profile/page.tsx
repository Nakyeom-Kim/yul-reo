import Header from "@/components/Header";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#fbfcfa] font-sans text-[#171717] flex flex-col relative overflow-hidden">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center pt-32 px-8">
        <h1 className="text-4xl font-light tracking-widest uppercase mb-6">Profile</h1>
        <p className="text-lg text-gray-400">Profile page content coming soon.</p>
      </main>
    </div>
  );
}
