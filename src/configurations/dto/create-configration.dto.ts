export class CreateConfigurationDto {}

export class MessagesTextDto {
  messagesArray: {
    name: string;
    describe: string;
  }[];
  messagesCategory: string;
  messagesType: string;
  quizCategory: string;
  isEnabled: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdById?: string;
  updatedById?: string;
}
export class MessagesCategoryDto {
  id: string;
  name: string;
  describe: string;
  createdBy?: string;
  updatedBy?: string;
  createdById?: string;
  updatedById?: string;
}

export class MessagesTypeDto {
  name: string;
  describe: string;
  messagesCategory: string;
  isEnabled: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdById?: string;
  updatedById?: string;
}

export class PointDto {
  quizCategory: string;
  describe: string;
  pointsCategory: string;
  value: number;
  createdBy?: string;
  updatedBy?: string;
  createdById?: string;
  updatedById?: string;
}

export class PointsCategoryDto {
  name: string;
  describe: string;
  isEnabled: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdById?: string;
  updatedById?: string;
}

export class QuizCategoryDto {
  name: string;
  describe: string;
  participationJoinMode: string;
  selectionCriteria: string;
  isEnabled: boolean;
  createdBy?: string;
  updatedBy?: string;
  createdById?: string;
  updatedById?: string;
}

export class QuizParameterDto {
  quizCategory: string;
  participationJoinMode: string;
  selectionCriteria: string;
  questionSource: string;
  numberOfQuestionsInQuiz: number;
  numberOfUsers: number;
  numberOfAttempts: number;
  createdBy?: string;
  updatedBy?: string;
  createdById?: string;
  updatedById?: string;
}

export class WinStatusDto {
  name: string;
  describe: string;
  quizCategory: string;
  participationJoinMode: string;
  selectionCriteria: string;
  rankType: string;
  rankValue: string;
  createdBy?: string;
  updatedBy?: string;
  createdById?: string;
  updatedById?: string;
}
