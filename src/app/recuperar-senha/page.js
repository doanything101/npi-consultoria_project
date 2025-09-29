import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { HeaderPage } from "../components/ui/header-page";
import Link from "next/link";

export const metadata = {
  title: "Recuperar Senha - NPi Consultoria",
  description: "Recupere o acesso à sua conta na NPi Consultoria.",
  robots: "index, follow",
};

export default function RecuperarSenhaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeaderPage 
        title="Recuperar Senha"
        description="Digite seu e-mail para receber as instruções de recuperação"
      />

      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Esqueceu sua senha?</h2>
            <p className="text-gray-600">
              Não se preocupe! Digite seu e-mail e enviaremos as instruções para criar uma nova senha.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                E-mail cadastrado
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

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8B6F4B] hover:bg-[#6B543B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6F4B] transition-colors duration-300"
            >
              Enviar Instruções
            </button>
          </form>

          <div className="mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Verifique sua caixa de entrada
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Se o e-mail estiver cadastrado em nosso sistema, você receberá as instruções em alguns minutos. 
                      Verifique também a pasta de spam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Lembrou da senha?{" "}
              <Link 
                href="/login"
                className="font-medium text-[#8B6F4B] hover:text-[#6B543B]"
              >
                Voltar ao login
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
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
        </div>
      </div>

      <Footer />
    </div>
  );
}
