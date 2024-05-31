import { Component } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  quizCategories: any;
  constructor(private questionService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.questionService.getQuizCategories().subscribe(
      (res) => {
        this.quizCategories = res.data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  quizDetail(id: string): void {
    this.router.navigate(['/quiz', id]);
  }
}
