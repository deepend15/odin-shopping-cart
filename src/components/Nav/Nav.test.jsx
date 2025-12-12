import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Nav from "./Nav";

describe("Nav component", () => {
  it("renders 5 links", () => {
    render(
      <MemoryRouter>
        <Nav numberOfCartItems={0} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");

    expect(links.length).toEqual(5);
  });

  it("renders the first link as a wrapper around the app logo", () => {
    render(
      <MemoryRouter>
        <Nav numberOfCartItems={0} />
      </MemoryRouter>
    );

    const link = screen.getAllByRole("link")[0];
    const img = screen.getByRole("img", { name: "ShopHouse logo." });

    expect(link).toContainElement(img);
  });

  it("renders the second link with the name 'ShopHouse'", () => {
    render(
      <MemoryRouter>
        <Nav numberOfCartItems={0} />
      </MemoryRouter>
    );

    const link = screen.getAllByRole("link")[1];

    expect(link.textContent).toMatch("ShopHouse");
  });

  it("renders the third, fourth, and fifth links with names that include 'Home', 'Shop', and 'Cart'", () => {
    render(
      <MemoryRouter>
        <Nav numberOfCartItems={0} />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");
    const homeLink = links[2];
    const shopLink = links[3];
    const cartLink = links[4];

    expect(homeLink.textContent).toMatch(/Home/);
    expect(shopLink.textContent).toMatch(/Shop/);
    expect(cartLink.textContent).toMatch(/Cart/);
  });

  it("renders the 'numberOfCartItems' prop value in the text of the Cart link", () => {
    const { rerender } = render(
      <MemoryRouter>
        <Nav numberOfCartItems={0} />
      </MemoryRouter>
    );

    const cartLink = screen.getAllByRole("link")[4];

    expect(cartLink.textContent).toMatch(/0/);

    rerender(
      <MemoryRouter>
        <Nav numberOfCartItems={5} />
      </MemoryRouter>
    );

    expect(cartLink.textContent).toMatch(/5/);
    expect(cartLink.textContent).not.toMatch(/0/);
  });
});
