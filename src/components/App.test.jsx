import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App";
import { SharedProvider } from "./SharedProvider";

describe("App component", () => {
  it("renders nav", () => {
    render(
      <SharedProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </SharedProvider>
    );

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });
});
