#!/usr/bin/env node

/**
 * GSC Error Monitoring Script for NPi Consultoria
 * Monitors specific GSC errors: 404, 403, Canonical Duplicates
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://npiconsultoria.com.br';

// Test URLs based on common GSC error patterns
const TEST_URLS = [
  // Property URLs that might cause 404s
  '/imovel-123456/invalid-slug',
  '/imovel-undefined/test',
  '/imovel-null/test',
  '/imovel-abc123/test',
  
  // Search URLs that might cause canonical issues
  '/busca?cidade=São Paulo&finalidade=Comprar&categoria=Apartamento',
  '/busca?cidade=São Paulo&finalidade=Comprar&categoria=Apartamento&utm_source=google',
  '/busca?cidade=São Paulo&finalidade=Comprar&categoria=Apartamento&_rsc=123',
  
  // Condominium URLs
  '/condominio-teste-inexistente',
  '/edificio-teste-inexistente',
  
  // API URLs that might cause 403s
  '/api/imoveis/123456',
  '/api/condominios/slug?slug=teste-inexistente',
  
  // Admin URLs that should return 403
  '/admin/dashboard',
  '/admin/imoveis',
];

class GSCErrorMonitor {
  constructor() {
    this.results = {
      '404_errors': [],
      '403_errors': [],
      'canonical_duplicates': [],
      'other_errors': []
    };
  }

  async testUrl(url) {
    return new Promise((resolve) => {
      const fullUrl = `${BASE_URL}${url}`;
      console.log(`🔍 Testing: ${fullUrl}`);
      
      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; GSC-Error-Monitor/1.0)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
      };

      const req = https.get(fullUrl, options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          const result = {
            url: fullUrl,
            statusCode: res.statusCode,
            headers: res.headers,
            content: data,
            issues: []
          };
          
          this.analyzeResponse(result);
          resolve(result);
        });
      });
      
      req.on('error', (error) => {
        resolve({
          url: fullUrl,
          statusCode: 0,
          error: error.message,
          issues: ['NETWORK_ERROR']
        });
      });
      
      req.setTimeout(10000, () => {
        req.destroy();
        resolve({
          url: fullUrl,
          statusCode: 0,
          error: 'Request timeout',
          issues: ['TIMEOUT']
        });
      });
    });
  }

  analyzeResponse(result) {
    const { url, statusCode, content, issues } = result;
    
    // Check for 404 errors
    if (statusCode === 404) {
      this.results['404_errors'].push({
        url,
        statusCode,
        issue: '404 Not Found',
        severity: 'HIGH'
      });
    }
    
    // Check for 403 errors
    if (statusCode === 403) {
      this.results['403_errors'].push({
        url,
        statusCode,
        issue: '403 Forbidden',
        severity: 'HIGH'
      });
    }
    
    // Check for canonical duplicates
    if (statusCode === 200 && content) {
      const canonicalMatches = content.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi);
      if (canonicalMatches && canonicalMatches.length > 1) {
        this.results['canonical_duplicates'].push({
          url,
          statusCode,
          issue: `Multiple canonical tags found: ${canonicalMatches.length}`,
          severity: 'MEDIUM',
          canonicals: canonicalMatches
        });
      }
      
      // Check for noindex directives
      if (content.includes('noindex') || content.includes('nofollow')) {
        this.results['other_errors'].push({
          url,
          statusCode,
          issue: 'Page has noindex/nofollow directive',
          severity: 'HIGH'
        });
      }
      
      // Check for redirect chains (multiple redirects)
      if (content.includes('redirecting') || content.includes('Redirecionando')) {
        this.results['other_errors'].push({
          url,
          statusCode,
          issue: 'Potential redirect chain detected',
          severity: 'MEDIUM'
        });
      }
    }
    
    // Check for server errors
    if (statusCode >= 500) {
      this.results['other_errors'].push({
        url,
        statusCode,
        issue: `Server error: ${statusCode}`,
        severity: 'HIGH'
      });
    }
  }

  async run() {
    console.log('🚀 Starting GSC Error Monitoring...\n');
    
    for (const url of TEST_URLS) {
      const result = await this.testUrl(url);
      
      if (result.issues && result.issues.length > 0) {
        console.log(`❌ Issues found: ${url}`);
        result.issues.forEach(issue => {
          console.log(`  - ${issue}`);
        });
      } else {
        console.log(`✅ ${url} - No issues detected`);
      }
      
      console.log(''); // Empty line for readability
    }
    
    this.generateReport();
  }

  generateReport() {
    const totalIssues = Object.values(this.results).reduce((sum, arr) => sum + arr.length, 0);
    
    console.log('\n📊 GSC ERROR MONITORING REPORT');
    console.log('================================');
    console.log(`Total URLs tested: ${TEST_URLS.length}`);
    console.log(`Total issues found: ${totalIssues}`);
    console.log(`404 errors: ${this.results['404_errors'].length}`);
    console.log(`403 errors: ${this.results['403_errors'].length}`);
    console.log(`Canonical duplicates: ${this.results['canonical_duplicates'].length}`);
    console.log(`Other errors: ${this.results['other_errors'].length}`);
    
    if (totalIssues > 0) {
      console.log('\n🔍 DETAILED ISSUES:');
      
      Object.entries(this.results).forEach(([category, issues]) => {
        if (issues.length > 0) {
          console.log(`\n${category.toUpperCase()}:`);
          issues.forEach(issue => {
            console.log(`  [${issue.severity}] ${issue.url}: ${issue.issue}`);
          });
        }
      });
    }
    
    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      baseUrl: BASE_URL,
      totalUrls: TEST_URLS.length,
      totalIssues,
      results: this.results,
      recommendations: this.generateRecommendations()
    };
    
    const reportPath = path.join(__dirname, '..', 'gsc-error-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.results['404_errors'].length > 0) {
      recommendations.push({
        issue: '404 Errors',
        count: this.results['404_errors'].length,
        action: 'Review middleware redirect logic and ensure proper 404 handling',
        priority: 'HIGH'
      });
    }
    
    if (this.results['403_errors'].length > 0) {
      recommendations.push({
        issue: '403 Errors',
        count: this.results['403_errors'].length,
        action: 'Add CORS headers and review API authentication',
        priority: 'HIGH'
      });
    }
    
    if (this.results['canonical_duplicates'].length > 0) {
      recommendations.push({
        issue: 'Canonical Duplicates',
        count: this.results['canonical_duplicates'].length,
        action: 'Implement single canonical URL generation and remove duplicates',
        priority: 'MEDIUM'
      });
    }
    
    return recommendations;
  }
}

// Run the monitor
if (require.main === module) {
  const monitor = new GSCErrorMonitor();
  monitor.run().catch(console.error);
}

module.exports = GSCErrorMonitor;
