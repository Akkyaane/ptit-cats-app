import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CatLogo,
} from "@/components/ui";
import { ForgotPasswordForm } from "@/components/auth";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950 p-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/40 via-transparent to-transparent dark:from-blue-900/20" />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-10 dark:opacity-5"
            style={{
              left: `${20 + i * 15}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-md">
        {/* Animated blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob dark:opacity-15" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000 dark:opacity-15" />

        <Card variant="elevated" className="relative backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-white/20 dark:border-zinc-800/50 shadow-2xl">
          <CardHeader className="text-center pb-2">
            {/* Icon */}
            <div className="mx-auto mb-4 w-20 h-20 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-3xl rotate-6 opacity-20" />
              <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-3xl p-4 shadow-inner flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-blue-600 dark:text-blue-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                  />
                </svg>
              </div>
            </div>

            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mot de passe oublié ?
            </CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-2">
              Pas de panique, on va vous aider à récupérer l&apos;accès à votre compte
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <ForgotPasswordForm />
          </CardContent>
        </Card>

        {/* Cat logo in corner */}
        <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-20 dark:opacity-10">
          <CatLogo animated={false} />
        </div>
      </div>
    </div>
  );
}
