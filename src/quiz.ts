import { ClockProps, sanitizeTime } from "./clock";

export interface Answer extends ClockProps {
  label?: string;
}

export interface Question {
  instruction: string;
  question: string;
  answers: Answer[];
  choices: string[];
  correctAnswer: number;
}

export type QuestionGenerator = () => Question;

// Shuffle choices and return index of item that was originally first
function shuffleChoices<T>(choices: T[]): number {
  let firstItemPosition = 0;
  for (let i = 0; i < choices.length - 1; ++i) {
    const selectIndex = (Math.random() * (choices.length - i) + i) | 0;

    if (i === selectIndex) {
      continue;
    }

    // Check if original first item moved
    if (firstItemPosition === i) {
      firstItemPosition = selectIndex;
    } else if (firstItemPosition === selectIndex) {
      firstItemPosition = i;
    }

    // Swap items
    const item = choices[i];
    choices[i] = choices[selectIndex];
    choices[selectIndex] = item;
  }

  return firstItemPosition;
}

function simpleHourQuestion(): Question {
  // Generate random time
  const answer: Answer = { hour: (Math.random() * 12 + 1) | 0 };

  // Generate 3 answers
  const choices = [
    `${answer.hour} o'clock`,
    `${sanitizeTime({ hour: answer.hour - 1 }).hour} o'clock`,
    `${sanitizeTime({ hour: answer.hour + 1 }).hour} o'clock`
  ];

  const correctAnswer = shuffleChoices(choices);

  return {
    instruction: "Look at this clock",
    question: "What time does it show?",
    answers: [answer],
    choices,
    correctAnswer
  };
}

function reverseHourMinuteQuestion(): Question {
  // Generate random time
  const answer: Answer = { hour: (Math.random() * 12 + 1) | 0 };

  const trickyWrongAnswer: Answer = sanitizeTime({
    hour: 12,
    minute: answer.hour === 12 ? 30 : answer.hour * 5
  });

  // Generate 3 answers
  const choices = ["A", "B"];

  const answers = [answer, trickyWrongAnswer];

  const correctAnswer = shuffleChoices(answers);

  answers[0].label = "A";
  answers[1].label = "B";

  return {
    instruction: "Look at these clocks",
    question: `Which clock shows ${answer.hour} o'clock?`,
    answers,
    choices,
    correctAnswer
  };
}

export interface QuestionCategory {
  questionGenerator: QuestionGenerator;
  numberOfQuestions: number;
}

export const quiz: QuestionCategory[] = [
  {
    questionGenerator: simpleHourQuestion,
    numberOfQuestions: 10
  },
  {
    questionGenerator: reverseHourMinuteQuestion,
    numberOfQuestions: 5
  }
];
