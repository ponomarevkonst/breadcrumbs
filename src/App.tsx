import { Breadcrumbs } from "./shared/ui/breadcrumbs";
import { FC } from "react";

const breadcrumbItemList = [
  { title: "Каталог товаров и услуг", url: "/catalog" },
  { title: "Бытовая техника", url: "/catalog/onlineproduct1" },
  { title: "Стиральная машина", url: "/catalog/onlineproduct1/washmachine" },
  {
    title: "Мини Стиральная машина",
    url: "/catalog/onlineproduct1/washmachine/mini",
  },
];

export const App: FC = () => {
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbItemList} />
    </div>
  );
};
