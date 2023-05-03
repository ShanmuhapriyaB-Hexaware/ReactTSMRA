import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Tabs, { Tab } from ".";

describe("tabs tests", () => {

  test("renders the Tab component", async () => {
    render(<Tabs label="Basic Tab">
      <Tab label="Item One" />
      <Tab label="Item Two" />
      <Tab label="Item Three" />
    </Tabs>
    );
    expect(await screen.getByRole('tablist')).toBeInTheDocument();
    expect(await screen.getAllByRole('tab')[0]).toHaveTextContent('Item One');
    expect(await screen.getAllByRole('tab')[1]).toHaveTextContent('Item Two');
  });
});
