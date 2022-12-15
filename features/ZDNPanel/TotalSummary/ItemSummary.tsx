import Card from "../../../components/Card/Card";
import "./ItemSummary.module.css";

export interface ItemSummmaryType {
  name: string;
  value: number;
  icon:any;
}

export default function ItemSummary({ name, value, icon }: ItemSummmaryType) {
  return (
    <div className="flex-auto  break-words shadow-xl shadow-dark-xl rounded-2xl bg-gradient-to-b from-[#111c44] to-[rgba(54,162,235,0.3)]">
      <div className="relative bg-slate-850 flex flex-col min-w-0  bg-clip-border">
        <div className="flex-auto p-4">
          <div className="flex flex-row -mx-3">
            <div className="grow max-w-full px-3">
              <div>
                <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase dark:text-white dark:opacity-80">
                  {name}
                </p>
                <h5 className="mb-2 font-bold text-xl item-value dark:text-white">{value}</h5>
              </div>
            </div>
            <div className="px-3 text-right basis-[48px]">
              <div className="icon-wrapper inline-block w-12 h-12 text-center rounded-circle bg-gradient-to-tl from-blue-500 to-violet-500">
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
