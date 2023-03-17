import { NextPage } from "next";

export enum LayoutStyles {
  default = "default",
}

type NextPageWithDataProps = {};

export type NextPageWithData<P = NextPageWithDataProps, IP = P> = {
  metadata: {
    layout: LayoutStyles;
    pageTitle: string;
  };
} & NextPage<P, IP>;
