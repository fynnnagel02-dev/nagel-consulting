export default function MarketingHomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center gap-6 px-6 py-20">
      <div className="inline-flex w-fit rounded-full border border-stone-300 bg-white px-3 py-1 text-sm font-medium text-stone-600">
        Nagel Consulting
      </div>
      <div className="space-y-4">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          Production-ready backend foundation for the company website and future
          business platform.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-stone-600">
          The backend architecture, SQL schema, RLS model, server actions, and
          admin access scaffolding are now set up in the codebase.
        </p>
      </div>
    </main>
  );
}
