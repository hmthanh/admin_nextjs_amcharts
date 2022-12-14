import { PropsWithChildren } from "react";

export default function PaddingBox({ children }: PropsWithChildren<{}>) {
  return <div className="px-3 w-full h-full">{children}</div>;
}
