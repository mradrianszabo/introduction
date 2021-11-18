import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence } from "@angular/animations";

export const MENU_ITEM_ANIMATION = {

  expand:
  trigger('expand', [
    transition(':enter', [
      query('.item', [
        style({
          transform : 'scale(0,0)',
          position: 'absolute',
          marginLeft: '130px',
          marginTop: '60px'
        }),
        group([
          animate('300ms ease', style({
            marginLeft: 0,
            marginTop: 0
          })),
          stagger(40, [
            animate('300ms ease',
            style({transform : 'scale(1,1)'}))
          ])
        ]),
      ], {optional : true}),
    ]),
    transition(':leave', [
      style({
        transform : 'scale(1,1)',
        position: 'absolute',
        marginLeft: 0,
        marginTop: 0
      }),
      group([
        animate('300ms ease', style({
          transform : 'scale(0,0)',
          marginLeft: '130px',
          marginTop: '60px'
        }))
      ])
    ])
  ]),

  highlightLine:
  trigger('highlightLine', [
    transition(':enter', [
      style({
        strokeDashoffset : 200,
      }),
      animate('300ms {{depthLevel}}ms ease', style({
        strokeDashoffset : 0
      }))
    ])
  ]),

  highlightItem:
  trigger('highlightItem', [
    transition('0=>1',[
      style({
        'box-shadow' : '0 0 5px -1px rgb(0, 221, 255)'
      }),
      sequence([

        animate('100ms {{depthLevel}}ms ease', style({
          'box-shadow' : '0 0 20px 3px rgb(0, 221, 255)'
        })),
        animate('2000ms {{depthLevel}}ms ease', style({
          'box-shadow' : '0 0 5px -1px rgb(0, 221, 255)'
        }))
      ])
    ]),

  ])

}
