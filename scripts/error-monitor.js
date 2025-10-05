#!/usr/bin/env node

/**
 * 🔍 ERROR MONITOR - NPi Consultoria
 * 
 * Script para monitorar e detectar erros comuns no projeto:
 * - Video "isn't on a watch page" errors
 * - Console errors em componentes
 * - SEO issues
 * - Performance issues
 */

const fs = require('fs');
const path = require('path');

class ErrorMonitor {
  constructor() {
    this.errors = {
      videoErrors: [],
      consoleErrors: [],
      seoErrors: [],
      performanceErrors: []
    };
    
    this.srcDir = path.join(__dirname, '..', 'src');
  }

  // 🎬 Verificar erros relacionados a vídeos
  checkVideoErrors() {
    console.log('🎬 Verificando erros de vídeo...');
    
    const videoComponents = [
      'src/app/(site)/[slug]/componentes/VideoCondominio.js',
      'src/app/imovel/[id]/[slug]/componentes/VideoCondominio.js',
      'src/app/sobre/npi-imoveis/sections/VideoNpi.js'
    ];
    
    videoComponents.forEach(filePath => {
      const fullPath = path.join(__dirname, '..', filePath);
      
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Verificar se tem tratamento adequado de erro
        if (!content.includes('Video unavailable')) {
          this.errors.videoErrors.push({
            file: filePath,
            issue: 'Falta tratamento para "Video unavailable"',
            severity: 'medium'
          });
        }
        
        if (!content.includes('AbortController')) {
          this.errors.videoErrors.push({
            file: filePath,
            issue: 'Falta timeout para requests de vídeo',
            severity: 'high'
          });
        }
        
        if (content.includes('no-cors') && !content.includes('Image()')) {
          this.errors.videoErrors.push({
            file: filePath,
            issue: 'Uso de no-cors pode causar problemas de validação',
            severity: 'medium'
          });
        }
        
        // Verificar IDs problemáticos
        const problematicIds = ['4Aq7szgycT4', 'UC3TnMJs2iCksc46bTQyd-fw'];
        problematicIds.forEach(id => {
          if (content.includes(id)) {
            this.errors.videoErrors.push({
              file: filePath,
              issue: `ID problemático encontrado: ${id}`,
              severity: 'high'
            });
          }
        });
      }
    });
  }

  // 🖥️ Verificar console errors
  checkConsoleErrors() {
    console.log('🖥️ Verificando console errors...');
    
    this.scanDirectory(this.srcDir, (filePath, content) => {
      // Verificar console.log em produção
      if (content.includes('console.log') && !content.includes('process.env.NODE_ENV')) {
        this.errors.consoleErrors.push({
          file: filePath,
          issue: 'Console.log sem verificação de ambiente',
          severity: 'low'
        });
      }
      
      // Verificar console.error sem tratamento
      if (content.includes('console.error') && !content.includes('try')) {
        this.errors.consoleErrors.push({
          file: filePath,
          issue: 'Console.error sem try/catch',
          severity: 'medium'
        });
      }
      
      // Verificar variáveis undefined
      if (content.includes('undefined') && !content.includes('typeof')) {
        this.errors.consoleErrors.push({
          file: filePath,
          issue: 'Possível acesso a variável undefined',
          severity: 'high'
        });
      }
    });
  }

  // 🔍 Verificar SEO issues
  checkSeoErrors() {
    console.log('🔍 Verificando SEO issues...');
    
    // Verificar metadata em páginas
    const pages = [
      'src/app/page.js',
      'src/app/busca/page.js',
      'src/app/sobre/page.js'
    ];
    
    pages.forEach(pagePath => {
      const fullPath = path.join(__dirname, '..', pagePath);
      
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        if (!content.includes('generateMetadata')) {
          this.errors.seoErrors.push({
            file: pagePath,
            issue: 'Falta metadata para SEO',
            severity: 'high'
          });
        }
        
        if (!content.includes('canonical')) {
          this.errors.seoErrors.push({
            file: pagePath,
            issue: 'Falta canonical URL',
            severity: 'medium'
          });
        }
      }
    });
  }

  // ⚡ Verificar performance issues
  checkPerformanceErrors() {
    console.log('⚡ Verificando performance issues...');
    
    this.scanDirectory(this.srcDir, (filePath, content) => {
      // Verificar imports desnecessários
      if (content.includes('import * as') && !filePath.includes('types')) {
        this.errors.performanceErrors.push({
          file: filePath,
          issue: 'Import * pode impactar performance',
          severity: 'medium'
        });
      }
      
      // Verificar useEffect sem dependencies
      if (content.includes('useEffect(() => {') && !content.includes('}, [')) {
        this.errors.performanceErrors.push({
          file: filePath,
          issue: 'useEffect sem array de dependências',
          severity: 'high'
        });
      }
      
      // Verificar fetch sem timeout
      if (content.includes('fetch(') && !content.includes('AbortController')) {
        this.errors.performanceErrors.push({
          file: filePath,
          issue: 'Fetch sem timeout pode causar travamento',
          severity: 'medium'
        });
      }
    });
  }

  // 📁 Scanner recursivo de diretórios
  scanDirectory(dir, callback) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        this.scanDirectory(filePath, callback);
      } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(path.join(__dirname, '..'), filePath);
        callback(relativePath, content);
      }
    });
  }

  // 📊 Gerar relatório
  generateReport() {
    console.log('\n📊 RELATÓRIO DE ERROS - NPi Consultoria');
    console.log('==========================================');
    
    const totalErrors = Object.values(this.errors).reduce((sum, arr) => sum + arr.length, 0);
    console.log(`Total de problemas encontrados: ${totalErrors}\n`);
    
    Object.entries(this.errors).forEach(([category, errors]) => {
      if (errors.length > 0) {
        console.log(`\n${category.toUpperCase().replace('ERRORS', ' ERRORS')}:`);
        console.log('-'.repeat(50));
        
        errors.forEach(error => {
          const severity = error.severity === 'high' ? '🔴' : 
                          error.severity === 'medium' ? '🟡' : '🟢';
          console.log(`${severity} [${error.severity.toUpperCase()}] ${error.file}`);
          console.log(`   ${error.issue}\n`);
        });
      }
    });
    
    // Salvar relatório em arquivo
    const reportPath = path.join(__dirname, 'error-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(this.errors, null, 2));
    console.log(`\n📄 Relatório detalhado salvo em: ${reportPath}`);
  }

  // 🚀 Executar todas as verificações
  async run() {
    console.log('🚀 Iniciando monitoramento de erros...\n');
    
    this.checkVideoErrors();
    this.checkConsoleErrors();
    this.checkSeoErrors();
    this.checkPerformanceErrors();
    
    this.generateReport();
    
    const totalErrors = Object.values(this.errors).reduce((sum, arr) => sum + arr.length, 0);
    
    if (totalErrors === 0) {
      console.log('\n✅ Nenhum erro crítico encontrado!');
      process.exit(0);
    } else {
      console.log(`\n⚠️ ${totalErrors} problemas encontrados. Verifique o relatório acima.`);
      process.exit(1);
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const monitor = new ErrorMonitor();
  monitor.run().catch(console.error);
}

module.exports = ErrorMonitor;
