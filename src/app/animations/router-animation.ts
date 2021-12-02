import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence, animation, useAnimation } from "@angular/animations";

const toTechMap = animation([
  query(':leave',[
    style({
      position: 'relative',
      top: 0,
      left: 0
    }),
  ], {optional : true}),
  query(':enter',[
    style({
      position: 'absolute',
      top: '{{positionValue}}%',
      left: '-50%',
      transform: 'translate(-50%, -{{positionValue}}%)',
      width: '100%',
      height: '100%'
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
        left: '50%',
        top: '{{positionValue}}%',
        transform: 'translate(-50%, -{{positionValue}}%)'
      })),
    ]),
  ]),
])

export const ROUTER_ANIMATION = {
  fromTechMap:

  trigger('routerAnimations', [

    transition('techMap => *',[

      query(':leave',[
        style({
          position: 'absolute',
          top: '{{positionValue}}%',
          left:'50%',
          transform: 'translate(-50%, -{{positionValue}}%)',
          width: '100%',
          height: '100%',
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

/*     transition('techMap => rateMe', [
      query(':leave', [
        style({opacity : 1, position: 'absolute', height: '100%', width: '100%'})
      ]),
      query(':enter', [
        style({opacity: 0, position: 'absolute', height: '100%', width: '100%'})
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
 */
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
