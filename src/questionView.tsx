import * as React from "react";

import { Clock } from "./clock";
import {
  PrimaryButton,
  ChoiceGroup,
  IChoiceGroupOption
} from "@fluentui/react";
import { Question } from "./quiz";

export interface QuestionViewProps {
  question: Question;
  selectedOption?: number;
  onSelectOption: (option: number) => void;
  onCheckAnswer: () => void;
}

export const QuestionView: React.FunctionComponent<QuestionViewProps> = ({
  question,
  selectedOption,
  onSelectOption,
  onCheckAnswer
}) => {
  const options: IChoiceGroupOption[] = question.choices.map((choice, i) => ({
    key: i,
    text: choice
  }));

  const onChoiceChanged = (option: IChoiceGroupOption) =>
    onSelectOption(option.key);

  return (
    <>
      <h2>{question.instruction}</h2>
      <div
        style={{
          display: "flex",
          alignSelf: "stretch",
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        {question.answers.map((answer, index) => (
          <div
            style={{
              textAlign: "center",
              flexShrink: 1,
              margin: 10,
              width: "150px"
            }}
          >
            <Clock {...answer} />
            {answer.label && <p className="clockLabel">{answer.label}</p>}
          </div>
        ))}
      </div>
      <h2>{question.question}</h2>
      <ChoiceGroup
        selectedKey={selectedOption}
        options={options}
        onChanged={onChoiceChanged}
      />
      <PrimaryButton
        style={{ margin: 20 }}
        disabled={selectedOption === undefined}
        onClick={onCheckAnswer}
      >
        Check answer
      </PrimaryButton>
    </>
  );
};
