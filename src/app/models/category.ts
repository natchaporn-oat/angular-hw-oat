export interface QuestionCategory {
  questionCategoryId: string;
  title: string;
  totalQuestion: number;
  timeLimitOfMinuteUnit: number;
  questionInfo: QuestionInfo[];
}

export interface Quiz {
  questionAnswerId: string;
  sequence: number;
  answer: string;
}

export interface QuestionInfo {
  questionId: string;
  sequence: number;
  title: string;
  questionAnswerInfo: Quiz[];
}


