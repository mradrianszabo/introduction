import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence, keyframes } from "@angular/animations";

export const GENERAL_ANIMATION = {
  fade:
  trigger('fade', [
    transition(':enter', [
      style({opacity: 0}),
      animate('500ms ease', style({opacity: 1}))
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('500ms ease', style({opacity: 0}))
    ])
  ]),



  moveyeah:
  trigger('moveyeah', [

    transition('0=>1', [
      style({position: 'relative', left: 0, top: '0' , transform : 'scale(1)', borderRadius : '10px', boxShadow : 'none', backgroundColor: 'rgb(18, 26, 40)' }),
      animate('500ms ease', style({left: '116px', top: 'calc(26px - {{verticalModifier}}px)' , transform : 'scale(2)', borderRadius : '5px', boxShadow : '0 0 8px 0 rgb(110, 202, 255)', backgroundColor: 'rgb(110, 202, 255)' }))
    ])
  ]),

  hellyeah:
  trigger('hellyeah', [
    transition('1=>0', [
          style({position: 'relative', left: '0px', top: '0px' , transform : 'scale(1)', borderRadius : '10px', boxShadow : '0 0 8px 0 rgb(110, 202, 255)', backgroundColor: 'rgb(110, 202, 255)' }),
          animate('500ms ease', style({left: '-116px', top: 'calc(-26px + {{verticalModifier}}px)' , transform: 'scale(0.5)', borderRadius: '20px', boxShadow : 'none', backgroundColor: 'rgb(18, 26, 40)' })),
    ]),

  ]),

/*
  background-color: rgb(110, 202, 255);
  box-shadow: 0 0 8px 0px rgb(110, 202, 255); */


  raiseIndicatorBar:
   trigger('raise', [
     transition(':enter', [
     style({height: 0, top: '20px', boxShadow: 'none'}),
     sequence([
      animate('500ms ease', style({height: '20px', top: 0})),
      animate('500ms ease', style({boxShadow: '0 0 8px 0px rgb(246, 26, 151)'}))
      ])
    ])
   ])




}
