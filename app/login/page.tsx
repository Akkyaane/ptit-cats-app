import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CatLogo,
} from "@/components/ui";
import { LoginForm } from "@/components/auth";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-orange-950 p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-200/40 via-transparent to-transparent dark:from-orange-900/20" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-200/40 via-transparent to-transparent dark:from-pink-900/20" />
      </div>

      {/* Floating paw prints */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10 dark:opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-md">
        {/* Animated blobs */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob dark:opacity-20" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000 dark:opacity-20" />
        <div className="absolute -bottom-24 left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000 dark:opacity-20" />

        <Card variant="elevated" className="relative backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-white/20 dark:border-zinc-800/50 shadow-2xl">
          <CardHeader className="text-center pb-2">
            {/* Cat Logo */}
            <div className="mx-auto mb-4 w-24 h-24 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl rotate-6 opacity-20" />
              <div className="relative bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/50 dark:to-pink-900/50 rounded-3xl p-3 shadow-inner">
                <CatLogo animated />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Bienvenue sur Ptit Cats
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-2">
              Connectez-vous pour retrouver vos félins préférés
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <LoginForm />
          </CardContent>

          <CardFooter className="text-center flex flex-col gap-4 pt-2">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Vous n&apos;avez pas de compte ?{" "}
              <Link
                href="/register"
                className="font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent hover:from-orange-500 hover:to-pink-500 transition-all"
              >
                Créer un compte
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            En vous connectant, vous acceptez nos{" "}
            <a href="#" className="underline hover:text-orange-500 transition-colors">
              Conditions d&apos;utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="underline hover:text-orange-500 transition-colors">
              Politique de confidentialité
            </a>
          </p>

          {/* Language selector */}
          <div className="flex items-center justify-center gap-2">
            <button className="px-3 py-1.5 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              FR
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              EN
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              ES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
