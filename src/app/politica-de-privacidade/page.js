import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { HeaderPage } from "../components/ui/header-page";

export const metadata = {
  title: "Política de Privacidade - NPi Consultoria",
  description: "Conheça nossa política de privacidade e como protegemos seus dados pessoais.",
  robots: "index, follow",
};

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeaderPage 
        title="Política de Privacidade"
        description="Como coletamos, usamos e protegemos suas informações pessoais"
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informações que Coletamos</h2>
            <p className="text-gray-700 mb-4">
              Coletamos informações que você nos fornece diretamente, como quando você:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Preenche formulários de contato ou cadastro</li>
              <li>Busca imóveis em nossa plataforma</li>
              <li>Entra em contato conosco por telefone, email ou WhatsApp</li>
              <li>Interage com nossos corretores</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Como Usamos suas Informações</h2>
            <p className="text-gray-700 mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Fornecer nossos serviços imobiliários</li>
              <li>Conectar você com os melhores corretores</li>
              <li>Enviar informações sobre imóveis de seu interesse</li>
              <li>Melhorar nossos serviços e experiência do usuário</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Compartilhamento de Informações</h2>
            <p className="text-gray-700 mb-4">
              Não vendemos suas informações pessoais. Podemos compartilhar suas informações apenas com:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Corretores parceiros para atender suas necessidades imobiliárias</li>
              <li>Prestadores de serviços que nos auxiliam na operação do negócio</li>
              <li>Autoridades competentes quando exigido por lei</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Segurança dos Dados</h2>
            <p className="text-gray-700 mb-4">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Seus Direitos</h2>
            <p className="text-gray-700 mb-4">
              Você tem o direito de:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir dados incorretos ou incompletos</li>
              <li>Solicitar a exclusão de suas informações</li>
              <li>Retirar seu consentimento a qualquer momento</li>
              <li>Portabilidade dos dados</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contato</h2>
            <p className="text-gray-700 mb-4">
              Para questões sobre esta política de privacidade, entre em contato conosco:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> privacidade@npiconsultoria.com.br</p>
              <p className="text-gray-700"><strong>Telefone:</strong> (11) 99999-9999</p>
              <p className="text-gray-700"><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Alterações nesta Política</h2>
            <p className="text-gray-700 mb-4">
              Esta política pode ser atualizada periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre como protegemos suas informações.
            </p>
            <p className="text-sm text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
