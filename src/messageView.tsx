import * as React from "react";

import { PrimaryButton } from "@fluentui/react";

export interface MessageViewProps {
  message: string;
  messageColor: string;
  buttonLabel: string;
  onButtonClick: () => void;
}

export const MessageView: React.FunctionComponent<MessageViewProps> = ({
  message,
  messageColor,
  buttonLabel,
  onButtonClick
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "1.5em",
          color: messageColor
        }}
      >
        {message}
      </h2>
      <PrimaryButton style={{ margin: 20 }} onClick={onButtonClick}>
        {buttonLabel}
      </PrimaryButton>
    </div>
  );
};
