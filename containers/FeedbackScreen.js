// Tools
import React, { useState, useEffect } from "react";

// Components
import FormFeedback from "../components/FormFeedback";
import FeedbackSent from "../components/FeedbackSent";

const FeedbackScreen = () => {
  const [feedbackSent, setFeedbackSent] = useState(false);

  return !feedbackSent ? (
    <FormFeedback setFeedbackSent={setFeedbackSent} />
  ) : (
    <FeedbackSent setFeedbackSent={setFeedbackSent} />
  );
};

export default FeedbackScreen;
