import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { HeaderPage } from "../components/ui/header-page";
import Link from "next/link";

export const metadata = {
  title: "Login - NPi Consultoria",
  description: "Acesse sua conta na NPi Consultoria para gerenciar seus imóveis favoritos e receber notificações personalizadas.",
  robots: "index, follow",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeaderPage 
        title="Login"
        description="Acesse sua conta para uma experiência personalizada"
      />

      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Entre na sua conta</h2>
            <p className="text-gray-600">
              Acesse sua conta para salvar imóveis favoritos e receber notificações personalizadas
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B6F4B] focus:border-transparent"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B6F4B] focus:border-transparent"
                placeholder="Sua senha"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#8B6F4B] focus:ring-[#8B6F4B] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Lembrar de mim
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  href="/recuperar-senha"
                  className="font-medium text-[#8B6F4B] hover:text-[#6B543B]"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8B6F4B] hover:bg-[#6B543B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6F4B] transition-colors duration-300"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Entrar com Google</span>
                Google
              </button>

              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Entrar com Facebook</span>
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link 
                href="/cadastro"
                className="font-medium text-[#8B6F4B] hover:text-[#6B543B]"
              >
                Cadastre-se aqui
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link 
              href="/admin/login"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Área administrativa
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
