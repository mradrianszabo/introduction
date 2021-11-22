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

  cardContainer:
  trigger('cardContainer', [
    transition(':enter', [
      query('.card', [

        style({
          position: 'relative',
          width: 0,
          overflow: 'hidden',
          transform: 'translateX(-50px)'
        }),
          sequence([

            animate('500ms ease', style({
              width: '100px',
              transform: 'translateX(0)'
            })),
            animate('1ms', style({overflow: 'visible'}))
          ]),
          ], {optional: true})
        ]),

    transition(':leave', [

        style({
          position: 'relative',
          opacity: 1
        }),
        sequence([

          animate('200ms ease', style({
            opacity: 0
          })),
        ]),

    ])

  ])
}
