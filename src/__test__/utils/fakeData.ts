import { RawRecipeQuestion } from "../../api/apiClient";
import { RecipeQuestion } from "../../domain/definitions";

export function getTwoQuestions(): RecipeQuestion[] {
  return [
    {
      answers: [
        { answer: "a11", id: 0 },
        { answer: "a12", id: 1 },
      ],
      correctAnswerId: 0,
      question: "q1",
    },
    {
      answers: [
        { answer: "a21", id: 0 },
        { answer: "a22", id: 1 },
      ],
      correctAnswerId: 1,
      question: "q2",
    },
  ];
}

export function getTwoRawQuestionsJSON(): string {
  return JSON.stringify(getTwoRawQuestions());
}

export function getTwoRawQuestions(): RawRecipeQuestion[] {
  return [
    {
      question: "q1",
      answers: ["a11", "a12"],
      correct: 0,
    },
    {
      question: "q2",
      answers: ["a21", "a22"],
      correct: 1,
    },
  ];
}
