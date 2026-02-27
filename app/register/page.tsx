import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CatLogo,
} from "@/components/ui";
import { RegisterForm } from "@/components/auth";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-orange-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-pink-950 p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200/40 via-transparent to-transparent dark:from-pink-900/20" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-200/40 via-transparent to-transparent dark:from-orange-900/20" />
      </div>

      {/* Floating paw prints */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10 dark:opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-md">
        {/* Animated blobs */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob dark:opacity-20" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000 dark:opacity-20" />
        <div className="absolute -bottom-24 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000 dark:opacity-20" />

        <Card variant="elevated" className="relative backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-white/20 dark:border-zinc-800/50 shadow-2xl">
          <CardHeader className="text-center pb-2">
            {/* Cat Logo */}
            <div className="mx-auto mb-4 w-20 h-20 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-orange-400 rounded-3xl rotate-6 opacity-20" />
              <div className="relative bg-gradient-to-br from-pink-100 to-orange-100 dark:from-pink-900/50 dark:to-orange-900/50 rounded-3xl p-2.5 shadow-inner">
                <CatLogo animated />
              </div>
            </div>

            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Rejoignez Ptit Cats
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-2">
              Créez votre compte et découvrez l&apos;univers des félins
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <RegisterForm />
          </CardContent>

          <CardFooter className="text-center flex flex-col gap-4 pt-2">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Vous avez déjà un compte ?{" "}
              <Link
                href="/login"
                className="font-semibold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent hover:from-pink-500 hover:to-orange-500 transition-all"
              >
                Se connecter
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            En créant un compte, vous acceptez nos{" "}
            <a href="#" className="underline hover:text-pink-500 transition-colors">
              Conditions
            </a>{" "}
            et{" "}
            <a href="#" className="underline hover:text-pink-500 transition-colors">
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
