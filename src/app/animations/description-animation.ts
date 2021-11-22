import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence, keyframes } from "@angular/animations";

export const DESCRIPTION_ANIMATION = {
percentageChange :
  trigger('percentageChange', [
    transition('*=>*', [
      style({ position : 'absolute', width: 0}),
      animate('500ms  cubic-bezier(.03,.56,.26,.87)', style({width: "{{percentage}}px"}))
    ])
  ]),

  setNewSelected:
  trigger('setNewSelected', [
    transition('0=>1', [
      style({position: 'relative', left: 0, top: '0' , transform : 'scale(1)', borderRadius : '10px', boxShadow : 'none', backgroundColor: 'rgb(18, 26, 40)' }),
      animate('500ms ease', style({left: '116px', top: 'calc(26px - {{verticalModifier}}px)' , transform : 'scale(2)', borderRadius : '5px', boxShadow : '0 0 8px 0 rgb(110, 202, 255)', backgroundColor: 'rgb(110, 202, 255)' }))
    ])
  ]),

  removeSelected:
  trigger('removeSelected', [
    transition('1=>0', [
          style({position: 'relative', left: '0px', top: '0px' , transform : 'scale(1)', borderRadius : '10px', boxShadow : '0 0 8px 0 rgb(110, 202, 255)', backgroundColor: 'rgb(110, 202, 255)' }),
          animate('500ms ease', style({left: '-116px', top: 'calc(-26px + {{verticalModifier}}px)' , transform: 'scale(0.5)', borderRadius: '20px', boxShadow : 'none', backgroundColor: 'rgb(18, 26, 40)' })),
    ]),

  ]),
}
