type StockDetailPageProps = {
  params: Promise<{ symbol: string }>;
};

export default async function StockDetailPage({ params }: StockDetailPageProps) {
  const { symbol } = await params;

  return (
    <section className="stock-details-container grid">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold uppercase text-gray-100">{symbol}</h1>
        <p className="text-gray-500">
          Live quote, chart, and company profile will render here.
        </p>
        <div className="rounded-lg border border-gray-600 bg-gray-800 p-8 text-center text-sm text-gray-500">
          Chart widget placeholder
        </div>
      </div>
    </section>
  );
}
