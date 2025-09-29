import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { HeaderPage } from "../components/ui/header-page";

export const metadata = {
  title: "Termos de Uso - NPi Consultoria",
  description: "Conheça os termos e condições de uso da nossa plataforma imobiliária.",
  robots: "index, follow",
};

export default function TermosUso() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeaderPage 
        title="Termos de Uso"
        description="Termos e condições para uso da plataforma NPi Consultoria"
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-700 mb-4">
              Ao acessar e utilizar a plataforma NPi Consultoria, você concorda em cumprir e estar sujeito aos seguintes termos e condições de uso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição do Serviço</h2>
            <p className="text-gray-700 mb-4">
              A NPi Consultoria é um hub de imobiliárias boutique de alto padrão que conecta clientes com corretores especializados em imóveis de luxo. Nossos serviços incluem:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Plataforma de busca de imóveis</li>
              <li>Conexão com corretores especializados</li>
              <li>Informações sobre condomínios e empreendimentos</li>
              <li>Serviços de consultoria imobiliária</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Uso da Plataforma</h2>
            <p className="text-gray-700 mb-4">
              Você se compromete a:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Fornecer informações verdadeiras e atualizadas</li>
              <li>Usar a plataforma apenas para fins legítimos</li>
              <li>Não interferir no funcionamento da plataforma</li>
              <li>Respeitar os direitos de propriedade intelectual</li>
              <li>Não usar a plataforma para atividades ilegais</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Propriedade Intelectual</h2>
            <p className="text-gray-700 mb-4">
              Todo o conteúdo da plataforma, incluindo textos, imagens, logotipos, design e software, é propriedade da NPi Consultoria ou de seus licenciadores e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitação de Responsabilidade</h2>
            <p className="text-gray-700 mb-4">
              A NPi Consultoria atua como intermediária entre clientes e corretores. Não somos responsáveis por:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Negociações entre clientes e corretores</li>
              <li>Veracidade das informações dos imóveis</li>
              <li>Disponibilidade de imóveis anunciados</li>
              <li>Condições físicas dos imóveis</li>
              <li>Questões legais relacionadas às transações</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Disponibilidade do Serviço</h2>
            <p className="text-gray-700 mb-4">
              Nos esforçamos para manter a plataforma disponível 24/7, mas não garantimos que ela estará sempre acessível. Podemos interromper o serviço para manutenção ou atualizações.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modificações dos Termos</h2>
            <p className="text-gray-700 mb-4">
              Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação na plataforma.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Lei Aplicável</h2>
            <p className="text-gray-700 mb-4">
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida nos tribunais competentes de São Paulo, SP.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contato</h2>
            <p className="text-gray-700 mb-4">
              Para questões sobre estes termos de uso, entre em contato conosco:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> contato@npiconsultoria.com.br</p>
              <p className="text-gray-700"><strong>Telefone:</strong> (11) 99999-9999</p>
              <p className="text-gray-700"><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
            </div>
          </section>

          <section className="mb-8">
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
