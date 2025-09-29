import Link from "next/link";

export function Top() {
  return (
    <div className="fixed inset-x-0 bottom-0 p-4">
      <div className="rounded-lg bg-[#8B6F4B] px-4 py-3 text-white shadow-lg">
        <p className="text-center text-sm font-medium">
          Encontrou o imóvel dos seus sonhos?
          <Link href="/contato" className="inline-block underline hover:text-gray-200">
            {" "}
            Fale com nossos especialistas!{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
