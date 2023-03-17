import dynamic from "next/dynamic";
import { ReactNode } from "react";

const NoSSRComponent = (props: { children: ReactNode }) => (
  <>{props.children}</>
);

export const NoSSR = dynamic(() => Promise.resolve(NoSSRComponent), {
  ssr: false,
});
