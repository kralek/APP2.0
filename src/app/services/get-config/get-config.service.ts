import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CONFIG } from './../../data/config';
import { GameConfig, Stat, StatsAfterGame } from './get-config';

@Injectable()
export class ConfingService {
    constructor() {
        this.config = CONFIG;
    }
    subject = new Subject<GameConfig>();

    config: GameConfig;

    getConfig = () => {
        return this.config;
    };

    getConfigObservable = () => {
        return this.subject.asObservable();
    };

    setConfig = (stats: StatsAfterGame) => {
        this.config.currentPoint += stats.currentPoint;
        this.config.stats.push(stats.stats);
        this.subject.next(this.config);
    };
}
