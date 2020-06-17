export interface GameConfig {
    maxPoint: number;
    currentPoint: number;
    stats: Stat[];
}

export interface StatsAfterGame{
    currentPoint: number;
    stats: Stat;
}

export interface Stat {
    answers: Answer;
}

export interface Answer {
    good: number;
    bad: number;
    time: Date;
}
