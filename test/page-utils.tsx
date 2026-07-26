import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import { ThemeContextProvider } from "@/context/ThemeContext";

const AllProviders = ({ children }: { children: ReactNode }) => {
    return (
        <MemoryRouter>
            <ThemeContextProvider>{children}</ThemeContextProvider>
        </MemoryRouter>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
    render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
