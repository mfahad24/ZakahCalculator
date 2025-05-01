import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import Cookies from "js-cookie";

import ZakahCalculator from "./ZakahCalculator";

const header = "Zakah Calculator";
const descriptionOne =
  "Your zakah due is calculated at 2.5% of your total amount only if your total amount is equal to or above the nisab. Nisab is the price of gold per ounce x 3.";
const cashOnHand =
  "2. Cash on hand and in back accounts (savings, checking, etc)";
const loans = "3. Non-delinquent loans (money you loaned to others)";
const gold = "4. Value of gold, silver and precious items";
const stocks = "5. Value of shares and stocks";
const pension =
  "6. Net value of IRA, 401K, pension funds if liquidated as of the zakat payment date (adjusted for taxes and penalties, if applicable)";
const business = "7. Net value of business inventory and trade goods";
const realEstate = "8. Equity in investment real estate";
const totalEligibleForZakah = "Total Eligible For Zakah";
const yourZakahDue = "Your Zakah Due";

vi.mock("js-cookie", () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
  },
}));

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

test("renders header", () => {
  render(<ZakahCalculator />);

  expect(screen.getByText(header)).toBeInTheDocument();
});

test("renders description", () => {
  render(<ZakahCalculator />);

  expect(screen.getByText(descriptionOne)).toBeInTheDocument();
});

test("renders input labels", () => {
  render(<ZakahCalculator />);

  expect(screen.getByText(cashOnHand)).toBeInTheDocument();
  expect(screen.getByText(loans)).toBeInTheDocument();
  expect(screen.getByText(gold)).toBeInTheDocument();
  expect(screen.getByText(stocks)).toBeInTheDocument();
  expect(screen.getByText(pension)).toBeInTheDocument();
  expect(screen.getByText(business)).toBeInTheDocument();
  expect(screen.getByText(realEstate)).toBeInTheDocument();
});

test("renders 8 input fields", () => {
  render(<ZakahCalculator />);
  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(8);
});

test("renders total eligible and zakah due text", () => {
  render(<ZakahCalculator />);

  expect(screen.getByText(totalEligibleForZakah)).toBeInTheDocument();
  expect(screen.getByText(yourZakahDue)).toBeInTheDocument();
});

test("renders nisab loading message", () => {
  render(<ZakahCalculator />);

  const loading = screen.getByText(/Retrieving nisab value/i);
  expect(loading).toBeInTheDocument();
});

test("renders nisab text and value", () => {
  Cookies.get.mockReturnValue("1300");
  render(<ZakahCalculator />);

  const nisab = screen.getByText("Current nisab value: $1300.00*");
  expect(nisab).toBeInTheDocument();
});

test("gets value from DB if there is cookie value is null", async () => {
  Cookies.get.mockReturnValue(null);

  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      value: "1400",
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    }),
  });
  render(<ZakahCalculator />);

  await waitFor(() => {
    const nisab = screen.getByText("Current nisab value: $1400.00*");
    expect(nisab).toBeInTheDocument();
  });
});

test("gets value from DB if there is cookie value is undefined", async () => {
  Cookies.get.mockReturnValue(undefined);

  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      value: "1500",
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    }),
  });
  render(<ZakahCalculator />);

  await waitFor(() => {
    const nisab = screen.getByText("Current nisab value: $1500.00*");
    expect(nisab).toBeInTheDocument();
  });
});

test("loading message should render if DB expiresAt value is over 24 hours", async () => {
  Cookies.get.mockReturnValue(undefined);

  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      value: "1500",
      expiresAt: 1746033965080,
    }),
  });
  render(<ZakahCalculator />);

  await waitFor(() => {
    const loading = screen.getByText("Retrieving nisab value");
    expect(loading).toBeInTheDocument();
  });
});

//TODO ONCE GOLD API MONTHLY CALL IS RESET
// test("should get value from gold API if no cookies and db value is expired", async () => {
// });

test("should render error message if negative number is entered", async () => {
  Cookies.get.mockReturnValue("1300");
  render(<ZakahCalculator />);

  const input = screen.getByTestId("loans");
  await userEvent.type(input, "-1");
  await userEvent.tab();
  await waitFor(() => {
    expect(
      screen.getByText("Please enter a number greater than or equal to 0")
    ).toBeInTheDocument();
  });
});

test("should render error message if number entered is $1,000,000,000 or greater", async () => {
  Cookies.get.mockReturnValue("1300");
  render(<ZakahCalculator />);

  const input = screen.getByTestId("loans");
  await userEvent.type(input, "1000000000");
  await userEvent.tab();
  await waitFor(() => {
    expect(
      screen.getByText("Please enter a value below $1,000,000,000")
    ).toBeInTheDocument();
  });
});

//TODO "Nisab value is required" message
