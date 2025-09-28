"use client";

export default function AdminFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando sistema administrativo...</p>
      </div>
    </div>
  );
}
