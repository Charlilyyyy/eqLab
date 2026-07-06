export default function DashboardPage() {
  return (
    <section className="home-wrapper flex">
      <div className="w-full space-y-4">
        <h1 className="text-3xl font-bold text-gray-100">Market dashboard</h1>
        <p className="max-w-2xl text-gray-500">
          Overview widgets and live market data will load here after integrations
          are wired in upcoming commits.
        </p>
        <div className="home-section grid gap-4 pt-4">
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-6">
            <h2 className="mb-2 font-semibold text-gray-300">Indices</h2>
            <p className="text-sm text-gray-500">TradingView embed placeholder</p>
          </div>
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-6">
            <h2 className="mb-2 font-semibold text-gray-300">Market heatmap</h2>
            <p className="text-sm text-gray-500">TradingView embed placeholder</p>
          </div>
          <div className="rounded-lg border border-gray-600 bg-gray-800 p-6">
            <h2 className="mb-2 font-semibold text-gray-300">Top stories</h2>
            <p className="text-sm text-gray-500">Market news placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
