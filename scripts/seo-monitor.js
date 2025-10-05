#!/usr/bin/env node

/**
 * SEO Monitoring Script for NPi Consultoria
 * Monitors critical SEO metrics and reports issues
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://npiconsultoria.com.br';
const CRITICAL_PAGES = [
  '/',
  '/busca',
  '/sobre/hub-imobiliarias',
  '/sobre/npi-imoveis',
  '/venda-seu-imovel',
  '/sobre',
  '/contato'
];

class SEOMonitor {
  constructor() {
    this.issues = [];
    this.results = [];
  }

  async checkPage(url) {
    return new Promise((resolve, reject) => {
      const fullUrl = `${BASE_URL}${url}`;
      console.log(`🔍 Checking: ${fullUrl}`);
      
      const options = {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Monitor/1.0)',
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
          
          // Check for SEO issues
          this.checkSEOIssues(result);
          resolve(result);
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
      
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  checkSEOIssues(result) {
    const { url, statusCode, headers, content } = result;
    
    // Check status code
    if (statusCode !== 200) {
      result.issues.push({
        type: 'HTTP_STATUS',
        severity: 'HIGH',
        message: `Non-200 status code: ${statusCode}`,
        url
      });
    }
    
    // Check for canonical tag
    const canonicalMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
    if (!canonicalMatch) {
      result.issues.push({
        type: 'MISSING_CANONICAL',
        severity: 'HIGH',
        message: 'Missing canonical tag',
        url
      });
    } else {
      const canonicalUrl = canonicalMatch[1];
      if (!canonicalUrl.includes(BASE_URL)) {
        result.issues.push({
          type: 'INVALID_CANONICAL',
          severity: 'MEDIUM',
          message: `Canonical URL doesn't match base URL: ${canonicalUrl}`,
          url
        });
      }
    }
    
    // Check for noindex
    if (content.includes('noindex') || content.includes('nofollow')) {
      result.issues.push({
        type: 'NOINDEX_DETECTED',
        severity: 'HIGH',
        message: 'Page has noindex or nofollow directive',
        url
      });
    }
    
    // Check for title tag
    const titleMatch = content.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (!titleMatch) {
      result.issues.push({
        type: 'MISSING_TITLE',
        severity: 'HIGH',
        message: 'Missing title tag',
        url
      });
    }
    
    // Check for meta description
    const descriptionMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    if (!descriptionMatch) {
      result.issues.push({
        type: 'MISSING_DESCRIPTION',
        severity: 'MEDIUM',
        message: 'Missing meta description',
        url
      });
    }
    
    // Check for robots meta tag
    const robotsMatch = content.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    if (robotsMatch) {
      const robotsContent = robotsMatch[1].toLowerCase();
      if (robotsContent.includes('noindex')) {
        result.issues.push({
          type: 'ROBOTS_NOINDEX',
          severity: 'HIGH',
          message: `Robots meta tag contains noindex: ${robotsContent}`,
          url
        });
      }
    }
    
    // Check for redirect chains (multiple redirects)
    if (statusCode >= 300 && statusCode < 400) {
      const location = headers.location;
      if (location && location.includes(BASE_URL)) {
        result.issues.push({
          type: 'POTENTIAL_REDIRECT_CHAIN',
          severity: 'MEDIUM',
          message: `Redirect detected: ${statusCode} to ${location}`,
          url
        });
      }
    }
  }

  async run() {
    console.log('🚀 Starting SEO monitoring...\n');
    
    for (const page of CRITICAL_PAGES) {
      try {
        const result = await this.checkPage(page);
        this.results.push(result);
        
        if (result.issues.length > 0) {
          console.log(`❌ Issues found on ${page}:`);
          result.issues.forEach(issue => {
            console.log(`  - ${issue.severity}: ${issue.message}`);
          });
          console.log('');
        } else {
          console.log(`✅ ${page} - No issues found\n`);
        }
      } catch (error) {
        console.error(`❌ Error checking ${page}:`, error.message);
        this.issues.push({
          type: 'CHECK_ERROR',
          severity: 'HIGH',
          message: `Failed to check page: ${error.message}`,
          url: `${BASE_URL}${page}`
        });
      }
    }
    
    this.generateReport();
  }

  generateReport() {
    const totalIssues = this.results.reduce((sum, result) => sum + result.issues.length, 0) + this.issues.length;
    const highSeverityIssues = this.results.reduce((sum, result) => 
      sum + result.issues.filter(issue => issue.severity === 'HIGH').length, 0
    ) + this.issues.filter(issue => issue.severity === 'HIGH').length;
    
    console.log('\n📊 SEO MONITORING REPORT');
    console.log('========================');
    console.log(`Total pages checked: ${this.results.length}`);
    console.log(`Total issues found: ${totalIssues}`);
    console.log(`High severity issues: ${highSeverityIssues}`);
    
    if (totalIssues > 0) {
      console.log('\n🔍 DETAILED ISSUES:');
      this.results.forEach(result => {
        if (result.issues.length > 0) {
          console.log(`\n${result.url}:`);
          result.issues.forEach(issue => {
            console.log(`  [${issue.severity}] ${issue.type}: ${issue.message}`);
          });
        }
      });
      
      if (this.issues.length > 0) {
        console.log('\nSystem Issues:');
        this.issues.forEach(issue => {
          console.log(`  [${issue.severity}] ${issue.type}: ${issue.message}`);
        });
      }
    }
    
    // Save report to file
    const report = {
      timestamp: new Date().toISOString(),
      baseUrl: BASE_URL,
      totalPages: this.results.length,
      totalIssues,
      highSeverityIssues,
      results: this.results,
      systemIssues: this.issues
    };
    
    const reportPath = path.join(__dirname, '..', 'seo-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Report saved to: ${reportPath}`);
  }
}

// Run the monitor
if (require.main === module) {
  const monitor = new SEOMonitor();
  monitor.run().catch(console.error);
}

module.exports = SEOMonitor;
