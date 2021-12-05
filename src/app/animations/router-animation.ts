import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence, animation, useAnimation } from "@angular/animations";

const toTechMap = animation([
  style({minHeight: '200vh'}),
  query(':leave',[
    style({
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
    }),
  ], {optional : true}),
  query(':enter',[
    style({
      position: 'absolute',
      top: '0',
      left: '-100%',
      width: '100%',
    }),
  ]),
  group([
    query(':leave', [
        animate('500ms ease', style({
          left: '100%'
        })),
    ], {optional : true}),
    query(':enter', [
      animate('500ms ease', style({
        left: '0',
      })),
    ]),
  ]),
])

export const ROUTER_ANIMATION = {
  fromTechMap:

  trigger('routerAnimations', [
    transition('techMap => *',[
    style({minHeight: '200vh'}),

      query(':leave',[
        style({
          position: 'absolute',
          top: '0',
          left:'0',
          width: '100%'
        }),
      ]),
      query(':enter',[
        style({
          position: 'absolute',
          top: '0',
          left: '100%',
          width: '100%',
        }),
      ]),
      group([
        query(':leave', [
            animate('500ms ease', style({
              left: '-100%',
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

    transition('selectedTech => techMap',[
      useAnimation(toTechMap)
    ]),
    transition('rateMe => techMap',[
      useAnimation(toTechMap)
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
