import { lazy } from "react";

export const AboutPageAsync = lazy(
  // имитируем загрузку тяжелого контента для демонстрации suspense
  () =>
    new Promise((resolve: any) => {
      setTimeout(() => resolve(import("./AboutPage")), 1500);
    })
);
