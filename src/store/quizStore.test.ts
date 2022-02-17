import { reaction } from "mobx";
import {
  newQuizResult,
  QuizResult,
  RecipeQuestion,
} from "../domain/definitions";
import { IQuizStore, newQuizStore, UIQuestion } from "./quizStore";
import { IRecipeStore } from "./recipeStore";

jest.mock("../domain/definitions");
const mockNewQuizResult = newQuizResult as jest.MockedFunction<
  typeof newQuizResult
>;

test("when some questions, then first step should be first question", () => {
  const questions = givenTwoQuestions();
  const quizStore = createQuizStore(questions);

  expect(quizStore.isQuestionStep).toBeTruthy();
  expect(quizStore.quizResult).toBeNull();
  ensureQuestionsMatch(quizStore.currentQuestion, questions[0]);
});

test("when completing first step, then current step become the second one", () => {
  const questions = givenTwoQuestions();
  const quizStore = createQuizStore(questions);

  quizStore.currentQuestion!.setAnswer(0);

  ensureQuestionsMatch(quizStore.currentQuestion, questions[1]);
});

test("when completing last step, then current step become the quiz result", () => {
  const fakeResult = {
    domainId: "result",
  } as unknown as QuizResult;
  mockNewQuizResult.mockReturnValueOnce(fakeResult);
  const questions = givenTwoQuestions();
  const quizStore = createQuizStore(questions);

  quizStore.currentQuestion!.setAnswer(0);
  quizStore.currentQuestion!.setAnswer(0);

  expect(quizStore.isQuestionStep).toBeFalsy();
  expect(quizStore.currentQuestion).toBeNull();
  expect(quizStore.quizResult).toBe(fakeResult);
});

test("when no questions, then current step is null", () => {
  const quizStore = createQuizStore([]);

  expect(quizStore.currentQuestion).toBeNull();
  expect(quizStore.quizResult).toBeNull();
  expect(quizStore.isQuestionStep).toBeFalsy();
});

describe("reactivity", () => {
  test("when step changes, then currentQuestion is recomputed", () => {
    const quizStore = createQuizStore(givenTwoQuestions());
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
    const quizStore = createQuizStore(givenTwoQuestions());
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

  test("when all questions answered, then isQuestionStep is recomputed", () => {
    const quizStore = createQuizStore(givenTwoQuestions());
    let reactionTriggered = false;
    reaction(
      () => quizStore.isQuestionStep,
      () => {
        reactionTriggered = true;
      }
    );

    quizStore.currentQuestion!.setAnswer(0);
    quizStore.currentQuestion!.setAnswer(0);

    expect(reactionTriggered).toBe(true);
  });
});

function givenTwoQuestions(): RecipeQuestion[] {
  return [
    {
      domainId: "question",
      answers: ["a11", "a12"],
      correctAnswerId: 0,
      question: "q1",
    },
    {
      domainId: "question",
      answers: ["a21", "a22"],
      correctAnswerId: 1,
      question: "q2",
    },
  ];
}

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
