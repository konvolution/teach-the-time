import * as React from "react";

import { MessageView } from "./messageView";

export interface CheckAnswerViewProps {
  isCorrectAnswer: boolean;
  onButtonClick: () => void;
}

export const CheckAnswerView: React.FunctionComponent<CheckAnswerViewProps> = ({
  isCorrectAnswer,
  onButtonClick
}) => {
  const message = isCorrectAnswer ? "Well done!" : "Sorry, wrong answer :(";
  const messageColor = isCorrectAnswer ? "green" : "red";
  const buttonLabel = isCorrectAnswer ? "Next question" : "Try again";

  return (
    <MessageView
      message={message}
      messageColor={messageColor}
      buttonLabel={buttonLabel}
      onButtonClick={onButtonClick}
    />
  );
};
