/**
 * 🔧 LOGGER UTILITY - NPi Consultoria
 * 
 * Utility para logging seguro em produção
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export const logger = {
  // Log apenas em desenvolvimento
  dev: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  // Log de debug (sempre em desenvolvimento, condicional em produção)
  debug: (...args) => {
    if (isDevelopment || process.env.NEXT_PUBLIC_DEBUG === 'true') {
      console.log('[DEBUG]', ...args);
    }
  },
  
  // Log de erro (sempre)
  error: (...args) => {
    console.error('[ERROR]', ...args);
  },
  
  // Log de warning (sempre)
  warn: (...args) => {
    console.warn('[WARN]', ...args);
  },
  
  // Log de info (desenvolvimento ou se especificado)
  info: (...args) => {
    if (isDevelopment || process.env.NEXT_PUBLIC_LOG_LEVEL === 'info') {
      console.info('[INFO]', ...args);
    }
  },
  
  // Log de performance (apenas em desenvolvimento)
  perf: (label, fn) => {
    if (isDevelopment) {
      console.time(label);
      const result = fn();
      console.timeEnd(label);
      return result;
    }
    return fn();
  }
};

// Para uso em server-side
export const serverLogger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log('[SERVER]', ...args);
    }
  },
  
  error: (...args) => {
    console.error('[SERVER ERROR]', ...args);
  },
  
  warn: (...args) => {
    console.warn('[SERVER WARN]', ...args);
  }
};

export default logger;
