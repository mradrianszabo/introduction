import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence, keyframes } from "@angular/animations";

export const DESCRIPTION_ANIMATION = {
percentageChange :
  trigger('percentageChange', [
    transition('*=>*', [
      style({ position : 'absolute', width: 0}),
      animate('500ms  cubic-bezier(.03,.56,.26,.87)', style({width: "{{percentage}}px"}))
    ])
  ])
}
