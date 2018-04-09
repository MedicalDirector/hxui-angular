import { Renderer } from '@angular/core';
import { Trigger } from './trigger.class';
export declare function parseTriggers(triggers: string, aliases?: any): Trigger[];
export declare function listenToTriggers(renderer: Renderer, target: any, triggers: any, showFn: Function, hideFn: Function, toggleFn: Function): Function;
