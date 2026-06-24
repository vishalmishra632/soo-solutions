import { RouteLoader } from "@/components/loader/route-loader";

export default function LegalLoading() {
  return (
    <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-3xl flex-1 px-6">
      <RouteLoader />
    </main>
  );
}
