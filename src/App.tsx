import * as React from "react";

import "./styles.css";
import { QuestionView } from "./questionView";
import { CheckAnswerView } from "./checkAnswerView";

import { Question, quiz } from "./quiz";

interface AppState {
  questionCategory: number;
  questionNumber: number;
  question: Question;
  choice: number | undefined;
  answerSubmitted: boolean;
}

interface SimpleAction {
  type: "reset" | "checkAnswer" | "nextQuestion" | "tryAgain";
}

interface SelectOptionAction {
  type: "selectOption";
  option: number;
}

type Action = SimpleAction | SelectOptionAction;

function initialState(): AppState {
  return {
    questionCategory: 0,
    questionNumber: 0,
    question: quiz[0].questionGenerator(),
    choice: undefined,
    answerSubmitted: false
  };
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "reset":
      return initialState();

    case "nextQuestion": {
      let nextCategory = state.questionCategory;
      let nextQuestionNumber = state.questionNumber + 1;

      // If end of category
      if (nextQuestionNumber === quiz[nextCategory].numberOfQuestions) {
        nextQuestionNumber = 0;
        nextCategory = (nextCategory + 1) % quiz.length;
      }

      return {
        questionCategory: nextCategory,
        questionNumber: nextQuestionNumber,
        question: quiz[nextCategory].questionGenerator(),
        choice: undefined,
        answerSubmitted: false
      };
    }

    case "checkAnswer":
      return {
        ...state,
        answerSubmitted: true
      };

    case "tryAgain":
      return {
        ...state,
        answerSubmitted: false
      };

    case "selectOption":
      return {
        ...state,
        choice: action.option
      };
  }

  return state;
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, undefined, initialState);

  const { question, choice, answerSubmitted } = state;

  const onSelectOption = (option: number) =>
    dispatch({ type: "selectOption", option });

  const onCheckAnswer = () => dispatch({ type: "checkAnswer" });

  const onButtonClick = () => {
    dispatch({
      type: choice === question.correctAnswer ? "nextQuestion" : "tryAgain"
    });
  };

  return (
    <div className="App">
      {answerSubmitted ? (
        <CheckAnswerView
          isCorrectAnswer={choice === question.correctAnswer}
          onButtonClick={onButtonClick}
        />
      ) : (
        <QuestionView
          question={question}
          selectedOption={choice}
          onSelectOption={onSelectOption}
          onCheckAnswer={onCheckAnswer}
        />
      )}
    </div>
  );
}
