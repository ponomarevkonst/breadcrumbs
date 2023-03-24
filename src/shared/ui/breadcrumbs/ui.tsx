import { Breadcrumb } from "./model";
import React, { useEffect, useRef, useState } from "react";
import { truncateBreadcrumbs } from "./model";
import { useWindowSize } from "../../lib/use-window-size";
import { FONT_SIZE, RIGHT_OFFSET_WIDTH, SEPARATOR_WIDTH } from "./constants";

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  const [itemList, setItemList] = useState(breadcrumbs);
  const size = useWindowSize();
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (!size.width) {
      return;
    }

    setItemList(truncateBreadcrumbs(breadcrumbs, screenWidth));
  }, [size, breadcrumbs]);

  const items = itemList?.map(({ title, url }) => (
    <li key={url} className="flex">
      <div className="flex items-center">
        <svg
          className="flex-shrink-0 w-6 h-full text-gray-200"
          viewBox="0 0 24 44"
          preserveAspectRatio="none"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
        </svg>
        <a
          href={url}
          className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          {title}
        </a>
      </div>
    </li>
  ));

  return (
    <nav
      className="bg-white border-b border-gray-200 flex"
      aria-label="Breadcrumb"
    >
      <div className="" ref={itemsRef}>
        {items.length >= 2 && (
          <ol role="list" className="w-full mx-auto flex space-x-4">
            {items}
          </ol>
        )}
      </div>
    </nav>
  );
};
