import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SharedProvider } from "./SharedProvider";
import { MemoryRouter } from "react-router";
import App from "./App";

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
