import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence } from "@angular/animations";

export const MENU_ANIMATION ={
  expand:
  trigger('expand',[
    transition('0=>1', [
      style({
        overflow: 'visible',
        height: '400px',
      }),
      group([
        query(':enter', animateChild(), {optional : true}),
        sequence([
          animate('500ms ease', style({
            height: '550px',
          })),
          animate('1ms ease', style({
            overflow: 'hidden',
          }))
        ]),
        query(':leave', animateChild(), {optional : true}),
      ]),
    ]),
    transition('1=>0', [
      style({
        overflow: 'hidden',
        height: '550px',
      }),
      group([
        query(':leave', animateChild(), {optional : true}),
        sequence([
          animate('1ms ease', style({
            overflow: 'visible',
          })),
          animate('500ms ease', style({
            height: '400px',
          })),
        ]),
        query(':enter', animateChild(), {optional : true}),
      ]),
    ]),
  ]),


}
