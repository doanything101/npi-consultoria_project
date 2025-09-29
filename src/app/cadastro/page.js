import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { HeaderPage } from "../components/ui/header-page";
import Link from "next/link";

export const metadata = {
  title: "Cadastro - NPi Consultoria",
  description: "Crie sua conta na NPi Consultoria e tenha acesso a imóveis exclusivos e corretores especializados.",
  robots: "index, follow",
};

export default function CadastroPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeaderPage 
        title="Cadastro"
        description="Crie sua conta para uma experiência personalizada"
      />

      <div className="container mx-auto px-4 py-12 max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Crie sua conta</h2>
            <p className="text-gray-600">
              Cadastre-se gratuitamente e tenha acesso a imóveis exclusivos
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B6F4B] focus:border-transparent"
                  placeholder="João"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Sobrenome
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B6F4B] focus:border-transparent"
                  placeholder="Silva"
                  required
                />
              </div>
            </div>

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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B6F4B] focus:border-transparent"
                placeholder="(11) 99999-9999"
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
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B6F4B] focus:border-transparent"
                placeholder="Confirme sua senha"
                required
              />
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                Interesse Principal
              </label>
              <select
                id="interests"
                name="interests"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B6F4B] focus:border-transparent"
                required
              >
                <option value="">Selecione seu interesse</option>
                <option value="comprar">Comprar imóvel</option>
                <option value="vender">Vender imóvel</option>
                <option value="alugar">Alugar imóvel</option>
                <option value="investir">Investir em imóveis</option>
                <option value="consultoria">Consultoria imobiliária</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-[#8B6F4B] focus:ring-[#8B6F4B] border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Eu concordo com os{" "}
                <Link href="/termos-de-uso" className="text-[#8B6F4B] hover:text-[#6B543B]">
                  termos de uso
                </Link>{" "}
                e{" "}
                <Link href="/politica-de-privacidade" className="text-[#8B6F4B] hover:text-[#6B543B]">
                  política de privacidade
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8B6F4B] hover:bg-[#6B543B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B6F4B] transition-colors duration-300"
            >
              Criar Conta
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link 
                href="/login"
                className="font-medium text-[#8B6F4B] hover:text-[#6B543B]"
              >
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
