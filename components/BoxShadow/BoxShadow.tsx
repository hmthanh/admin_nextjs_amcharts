import React from "react";

export default function BoxShadow({ children }: any) {
  return (
    <div
      className="p-6 box-left-containter bg-[#111c44]
border-black/12.5 dark:bg-slate-850 dark:shadow-dark-xl shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid  bg-clip-border"
    >
      {children}
    </div>
  );
}
