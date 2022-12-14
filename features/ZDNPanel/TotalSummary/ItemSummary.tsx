import Card from "../../../components/Card/Card";

export default function ItemSummary() {
  return (
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4 h-full">
      <Card>
        <div className="relative bg-slate-850 flex flex-col min-w-0 break-words shadow-xl shadow-dark-xl rounded-2xl bg-clip-border">
          <div className="flex-auto p-4">
            <div className="flex flex-row -mx-3">
              <div className="flex-none w-2/3 max-w-full px-3">
                <div>
                  <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-60">
                    New Clients
                  </p>
                  <h5 className="mb-2 font-bold dark:text-white">3462</h5>
                </div>
              </div>
              <div className="px-3 text-right basis-1/3">
                <div className="inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-emerald-500 to-teal-400">
                  <i className="ni leading-none ni-paper-diploma text-lg relative top-3.5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
