import { Component } from '@angular/core';
import { QuestionCategory as QuizCategory } from '../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent {
  countdown: number = 1000;
  countdownSubscription!: Subscription;
  category: QuizCategory = this.initializeCategory();
  currentIndex: number = 0;
  totalQuiz: number = 0;
  checkboxStates: { [key: string]: boolean }[] = [];
  result: any = this.initializeResult();

  constructor(
    private route: ActivatedRoute,
    private questionService: QuizService,
    private router: Router
  ) {}

  private initializeCategory(): QuizCategory {
    return {
      questionCategoryId: '',
      title: '',
      totalQuestion: 0,
      timeLimitOfMinuteUnit: 0,
      questionInfo: [],
    };
  }

  private initializeResult(): any {
    return {
      questionCategoryId: '',
      questions: [],
    };
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  private loadCategory(): void {
    const categoryId = this.route.snapshot.paramMap.get('id') ?? '';
    this.questionService.getQuizById(categoryId).subscribe(
      (res) => {
        this.category = res.data;
        this.initQuiz();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private initQuiz(): void {
    this.totalQuiz = this.category?.questionInfo?.length ?? 0;
    this.countdown = this.category.timeLimitOfMinuteUnit * 60;
    this.initializeCheckboxStates();
    this.startCountdown();
  }

  private initializeCheckboxStates(): void {
    for (let i = 0; i < this.totalQuiz; i++) {
      const checkboxState: { [key: string]: boolean } = {};
      for (const answer of this.category.questionInfo[i].questionAnswerInfo) {
        checkboxState[answer.questionAnswerId] = false;
      }
      this.checkboxStates.push(checkboxState);
    }
  }

  startCountdown(): void {
    this.countdownSubscription = interval(1000).subscribe(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.countdownSubscription.unsubscribe();
        this.submit();
      }
    });
  }

  submit(): void {
    this.result.questionCategoryId = this.category.questionCategoryId;
    this.result.questions = this.category.questionInfo.map(
      (question, index) => ({
        questionId: question.questionId,
        answers: question.questionAnswerInfo
          .filter(
            (answer) => this.checkboxStates[index][answer.questionAnswerId]
          )
          .map((answer) => ({ questionAnswerId: answer.questionAnswerId })),
      })
    );

    this.questionService.submitQuiz(this.result).subscribe(
      (response) => {
        alert('score : ' + response.data.score + '/' + response.data.fullScore);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  backQuiz(): void {
    if (this.currentIndex > 0) this.currentIndex--;
  }

  nextQuiz(): void {
    if (this.currentIndex < this.totalQuiz - 1) this.currentIndex++;
  }

  updateCheckboxState(answerId: string): void {
    this.checkboxStates[this.currentIndex][answerId] =
      !this.checkboxStates[this.currentIndex][answerId];
  }

  isCheckboxChecked(answerId: string): boolean {
    return this.checkboxStates[this.currentIndex][answerId];
  }

  formatTime(seconds: number): string {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
  }
}
