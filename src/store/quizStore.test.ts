import { reaction } from "mobx";
import { QuizResult, RecipeQuestion } from "../domain/definitions";
import { newQuizResult } from "../utils/quizUtils";
import { getTwoQuestions } from "../__test__/utils/fakeData";
import { IQuizStore, newQuizStore, UIQuestion } from "./quizStore";
import { IRecipeStore } from "./recipeStore";

jest.mock("../utils/quizUtils");
const mockNewQuizResult = newQuizResult as jest.MockedFunction<
  typeof newQuizResult
>;

test("when some questions, then first step should be first question", () => {
  const questions = getTwoQuestions();
  const quizStore = createQuizStore(questions);

  expect(quizStore.quizResult).toBeNull();
  ensureQuestionsMatch(quizStore.currentQuestion, questions[0]);
});

test("when completing first step, then current step become the second one", () => {
  const questions = getTwoQuestions();
  const quizStore = createQuizStore(questions);

  quizStore.currentQuestion!.setAnswer(0);

  ensureQuestionsMatch(quizStore.currentQuestion, questions[1]);
});

test("when completing last step, then current step become the quiz result", () => {
  const fakeResult = {} as unknown as QuizResult;
  mockNewQuizResult.mockReturnValueOnce(fakeResult);
  const questions = getTwoQuestions();
  const quizStore = createQuizStore(questions);

  quizStore.currentQuestion!.setAnswer(0);
  quizStore.currentQuestion!.setAnswer(0);

  expect(quizStore.currentQuestion).toBeNull();
  expect(quizStore.quizResult).toBe(fakeResult);
});

test("when no questions, then current step is null", () => {
  const quizStore = createQuizStore([]);

  expect(quizStore.currentQuestion).toBeNull();
  expect(quizStore.quizResult).toBeNull();
});

describe("reactivity", () => {
  test("when step changes, then currentQuestion is recomputed", () => {
    const quizStore = createQuizStore(getTwoQuestions());
    let reactionTriggered = false;
    reaction(
      () => quizStore.currentQuestion,
      () => {
        reactionTriggered = true;
      }
    );

    quizStore.currentQuestion!.setAnswer(0);

    expect(reactionTriggered).toBe(true);
  });

  test("when all questions answered, then quizResult is recomputed", () => {
    const quizStore = createQuizStore(getTwoQuestions());
    let reactionTriggered = false;
    reaction(
      () => quizStore.quizResult,
      () => {
        reactionTriggered = true;
      }
    );

    quizStore.currentQuestion!.setAnswer(0);
    quizStore.currentQuestion!.setAnswer(0);

    expect(reactionTriggered).toBe(true);
  });
});

function createQuizStore(questions: RecipeQuestion[]): IQuizStore {
  const recipeStore = { questions } as unknown as IRecipeStore;
  return newQuizStore(recipeStore);
}

function ensureQuestionsMatch(
  uiQuestion: UIQuestion | null,
  domainQuestion: RecipeQuestion
): void {
  expect(uiQuestion).not.toBeNull();
  expect(uiQuestion!.question).toBe(domainQuestion.question);
  expect(uiQuestion!.answers).toStrictEqual(domainQuestion.answers);
}
