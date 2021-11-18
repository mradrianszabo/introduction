import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence, keyframes } from "@angular/animations";


export const RATING_ANIMATION = {
  raiseIndicatorBar:
  trigger('raise', [
    transition(':enter', [
    style({height: 0, top: '20px', boxShadow: 'none'}),
    sequence([
     animate('500ms cubic-bezier(.03,.56,.26,.87)', style({height: '20px', top: 0})),
     animate('500ms ease', style({boxShadow: '0 0 8px 0px rgb(246, 26, 151)'}))
     ])
   ])
  ]),

  fade:
  trigger('fade', [
    transition(':enter', [
      style({opacity: 0}),
      animate('2000ms ease', style({opacity: 1}))
    ]),
  ]),

  raiseCheckbox:
  trigger('raise', [
    transition(':enter', [
    style({height: 0, boxShadow: 'none'}),
    sequence([
     animate('1000ms cubic-bezier(.03,.56,.26,.87)', style({height: '30px'})),
     animate('500ms ease', style({boxShadow: '0 0 8px 0px rgb(110, 202, 255)'}))
     ])
   ]),
   transition(':leave', [
    style({height: '30px', boxShadow: '0 0 8px 0px rgb(110, 202, 255)'}),
    sequence([
      animate('500ms ease', style({boxShadow: 'none'})),
      animate('500ms cubic-bezier(.03,.56,.26,.87)', style({height: '0px'})),
     ])
   ])
  ]),
}
