import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import App from "./App";
import { getTwoRawQuestions } from "./__test__/utils/fakeData";

jest.mock("axios", () => ({
  get: jest.fn(),
  isAxiosError: jest.fn(() => false),
}));
const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;

afterEach(() => {
  mockAxiosGet.mockReset();
});

it("when loaded, then data is fetched", () => {
  givenTwoQuestionsFetched();

  render(<App />);

  expect(mockAxiosGet).toBeCalledTimes(1);
  expect(mockAxiosGet).toBeCalledWith("data.json");
});

it("when data is fetched, then first question is displayed", async () => {
  givenTwoQuestionsFetched();

  renderApp();

  await screen.findByText("q1");
  await screen.findByText("a11");
  await screen.findByText("a12");
});

it("when first question is answered, then second question is displayed", async () => {
  givenTwoQuestionsFetched();
  renderApp();
  const answer = await screen.findByText("a11");

  userEvent.click(answer);

  await screen.findByText("q2");
  await screen.findByText("a21");
  await screen.findByText("a22");
});

it("when second question is answered, then result is displayed", async () => {
  givenTwoQuestionsFetched();
  renderApp();
  //   const answer1 = await screen.findByText("a11");
  //   userEvent.click(answer1);
  //   const answer2 = await screen.findByText("a21");
  //   userEvent.click(answer2);

  //   await screen.findByText("Hai risposto");
});

function renderApp() {
  render(
    // <RootContext.Provider value={newRootStore()}>
    <App />
    // </RootContext.Provider>
  );
}

function givenTwoQuestionsFetched() {
  mockAxiosGet.mockResolvedValueOnce({ data: getTwoRawQuestions() });
}
