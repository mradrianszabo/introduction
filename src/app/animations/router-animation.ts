import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence } from "@angular/animations";

export const ROUTER_ANIMATION = {
  fromTechMap:
  trigger('routerAnimations', [
    transition('techMap => selectedTech',[

      query(':leave',[
        style({
          position: 'absolute',
          top: '50%',
          left:'50%',
          transform: 'translate(-50%, -50%)',
        }),
      ]),
      query(':enter',[
        style({
          position: 'absolute',
          top: 0,
          left: '100%',
          width: '100%',
          height: '100%',

        }),
      ]),
      group([
        query(':leave', [
            animate('500ms ease', style({
              left: '-50%',
            }))
        ]),
        query(':enter', [
          sequence([
            animate('500ms ease', style({
              left: '0',
            })),
          ])
        ]),
      ]),
    ]),

    transition('techMap => rateMe', [
      query(':leave', [
        style({opacity : 1, position: 'absolute'})
      ]),
      query(':enter', [
        style({opacity: 0, position: 'absolute'})
      ]),
      sequence([
        query(':leave',[
          animate('500ms ease', style({opacity: 0}))
        ]),
        query(':enter', [
          animate('500ms ease', style({opacity: 1}))
        ])
      ])
    ]),

    transition('selectedTech => techMap',[

      query(':leave',[
        style({
          position: 'relative',
          top: 0,
          left: 0
        }),
      ]),
      query(':enter',[
        style({
          position: 'absolute',
          top: '50%',
          left: '-50%',
          transform: 'translate(-50%, -50%)'
        }),
      ]),
      group([
        query(':leave', [
            animate('500ms ease', style({
              left: '100%'
            })),
        ]),
        query(':enter', [
          animate('500ms ease', style({
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          })),
        ]),
      ]),
    ]),

  ])
}


/*

 trigger('routerAnimations', [
    transition('techMap => selectedTech',[
      query(':enter, :leave',[
        style({
          opacity: 1
        })
      ]),
      query(':enter', [
        style({transform : opacity: 0})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('5000ms ease', style({transform : opacity: 0}))
        ]),
        query(':leave', [
          animate('5000ms ease', style({opacity : 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

  ])

*/
