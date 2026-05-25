import LoginAdoptantForm from "@/components/adoptant/LoginAdoptantForm";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-tertiary">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
        </div>
      </header>
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold ">Se connecter</h1>
              <div className="w-12 h-1 bg-tertiary rounded-full"></div>
            </div>
            <LoginAdoptantForm />
          </div>
        </div>
      </main>
    </div>
  );
}
