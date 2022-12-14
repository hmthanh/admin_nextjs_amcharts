import { PropsWithChildren } from "react";

export default function Card({ children }: PropsWithChildren<{}>) {
  return (
    <div className="justify-center items-center ">
      <div className="h-auto ring-1 ring-gray-900/5 border-black/12.5 border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 break-words rounded-2xl border-0 border-solid  bg-clip-border">
        <div className="divide-y divide-gray-300/50">
          <div className="mx-auto text-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
