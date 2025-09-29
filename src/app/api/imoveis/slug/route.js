import { connectToDatabase } from "@/app/lib/mongodb";
import Imovel from "@/app/models/Imovel";

import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;

    await connectToDatabase();

    // Buscar Slug e Codigo de todos os imóveis
    const imoveis = await Imovel.find({}, { Slug: 1, Codigo: 1, _id: 0 });

    // Filtro mais rigoroso para remover slugs inválidos
    const slugsInvalidos = [
      "facebook.com",
      "instagram.com", 
      "twitter.com",
      "youtube.com",
      "linkedin.com",
      "tiktok.com",
      "wa.me",
      "whatsapp.com",
      "mailto:",
      "http://",
      "https://",
      "www.",
      "indexdata",
      "index.swf",
      "npi_imoveis",
      "npiimoveis",
      "undefined",
      "null",
      "true",
      "false"
    ];

    const imoveisFiltrados = imoveis.filter((item) => {
      // Verificar se tem código e slug válidos
      if (!item.Codigo || !item.Slug || typeof item.Slug !== "string") return false;
      
      const slug = item.Slug.toString().trim();
      
      // Verificar se slug não está vazio ou muito curto
      if (slug.length < 3) return false;
      
      // Verificar se slug não contém caracteres problemáticos
      const slugLower = slug.toLowerCase();
      if (slugsInvalidos.some((invalido) => slugLower.includes(invalido))) return false;
      
      // Verificar se slug não contém apenas números ou caracteres especiais
      if (/^[\d\s\-_]+$/.test(slug)) return false;
      
      // Verificar se slug não contém caracteres não-ASCII problemáticos
      if (/[<>:"'|?*]/.test(slug)) return false;
      
      return true;
    });

    return NextResponse.json({
      status: 200,
      data: imoveisFiltrados.map((item) => ({ Codigo: item.Codigo, Slug: item.Slug })),
    });
  } catch (error) {
    console.error("Erro ao buscar dados de imóveis:", error);
    return NextResponse.json(
      {
        message: "Erro ao buscar dados de imóveis",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}
