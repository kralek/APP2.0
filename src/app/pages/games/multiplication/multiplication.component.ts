import { ConfingService } from './../../../services/get-config/get-config.service';
import { GameConfig, StatsAfterGame } from './../../../services/get-config/get-config.d';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'multiplication',
    templateUrl: './multiplication.component.html',
    styleUrls: ['multiplication.component.scss'],
})
export class Multiplication implements OnInit {

  public first = 0;
  public second = 0;
  public answer = '';
  public time = 0;
  public points = 0;
  public timer: any = null;
  public roundTime = 5;
  public isStarted = false;
  public wosStarted = false;
  public configData: null | GameConfig = null;
  public info = false;
  public badAnswers = 0;
  public goodAsnwers = 0;
  public configDataSubject = this.config.getConfigObservable();
  public subscribe: Subscription | null = null;
  public currentTime = 0;

    constructor(private config: ConfingService) {}
    ngOnInit() {
        this.subscribe = this.configDataSubject.subscribe(data => {
            this.currentTime = data.currentPoint;
        });
    }

    startGame() {
        this.configData = this.config.getConfig();
        const { maxPoint, currentPoint } = this.configData!;

        if (maxPoint === currentPoint) {
            this.info = true;
            return;
        }

        this.answer = '';
        this.points = 0;
        this.isStarted = true;
        this.wosStarted = true;

        this.timerGenerator();
    }

    endGame() {
        this.isStarted = false;
        const stats: StatsAfterGame = {
            currentPoint: this.points,
            stats: {
                answers: {
                    bad: this.badAnswers,
                    good: this.goodAsnwers,
                    time: new Date()
                },
            },
        };
        this.config.setConfig(stats);
        clearInterval(this.timer);
    }

    timerGenerator() {
        this.time = this.roundTime;
        this.setNumbers();

        clearInterval(this.timer);

        this.timer = setInterval(() => {
            if (this.time !== 0) {
                this.time--;
            } else {
                this.time = this.roundTime;
                this.points = this.points > 0 ? this.points - 1 : 0;
                this.setNumbers();
            }
        }, 1000);
    }

    check(event: KeyboardEvent) {
        const { first, second, answer } = this;
        const isCorrectAnswer = first * second === parseInt(answer, 10);
        if (isCorrectAnswer) {
            this.goodAsnwers++;
            this.points++;
            const { currentPoint, maxPoint } = this.configData!;
            if (currentPoint + this.points === maxPoint) {
                this.info = true;
                this.endGame();
                return;
            }
        } else {
            this.badAnswers++;
            this.points = this.points > 0 ? this.points - 1 : 0;
        }
        this.answer = '';
        this.timerGenerator();
    }

    setNumbers() {
        this.first = Math.ceil(Math.random() * 10);
        this.second = Math.ceil(Math.random() * 10);
    }
}
