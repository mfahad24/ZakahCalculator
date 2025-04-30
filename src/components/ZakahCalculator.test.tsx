import { render, screen } from "@testing-library/react";
import ZakahCalculator from "./ZakahCalculator";

test("renders something", () => {
  render(<ZakahCalculator />);
  expect(screen.getByText(/Zakah Calculator/i)).toBeInTheDocument();
});
