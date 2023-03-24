import React from "react";
import { render } from "@testing-library/react";
import { Breadcrumbs } from "./ui";
import "@testing-library/jest-dom/extend-expect";

const breadcrumbs = [
  { title: "Home", url: "/" },
  { title: "Products", url: "/products" },
  { title: "Product Detail", url: "/products/1" },
];

describe("Breadcrumbs", () => {
  it("renders a list of breadcrumbs", () => {
    const { getAllByRole } = render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    const items = getAllByRole("listitem");
    expect(items).toHaveLength(breadcrumbs.length);
    expect(items[0]).toHaveTextContent(breadcrumbs[0].title);
    expect(items[1]).toHaveTextContent(breadcrumbs[1].title);
    expect(items[2]).toHaveTextContent(breadcrumbs[2].title);
  });

  it("truncates breadcrumbs if they exceed available width", () => {
    const longBreadcrumbs = [
      { title: "Home", url: "/" },
      { title: "Category A", url: "/category-a" },
      { title: "Category B", url: "/category-b" },
      { title: "Category C", url: "/category-c" },
      { title: "Category D", url: "/category-d" },
      { title: "Product Detail", url: "/category-d/1" },
    ];

    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: 600,
    });

    const { getAllByRole } = render(
      <Breadcrumbs breadcrumbs={longBreadcrumbs} />
    );
    const items = getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(items[0]).toHaveTextContent(longBreadcrumbs[0].title);
    expect(items[1]).toHaveTextContent("...");
    expect(items[3]).toHaveTextContent(longBreadcrumbs[5].title);

    // Reset the property after the test is done
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      value: global.innerWidth,
    });
  });
});
