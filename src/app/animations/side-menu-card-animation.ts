import { animate, animateChild, query, stagger, style, transition, trigger, group, sequence, keyframes } from "@angular/animations";

export const SIDE_CARD_ANIMATION = {
  hoverAboutMe :
  trigger('hoverCard1', [
    transition('0=>1', [
      style({
        transform: 'translate(-29px, -11px) scale(1)'
      }),
      animate('1200ms ease-in', keyframes([
        style({transform: 'translate(-33px, -15px) scale(1.1)', offset: 0.4}),
        style({transform: 'translate(-33px, -9px) scale(1.1)', offset: 0.5}),
        style({transform: 'translate(-33px, -15px) scale(1.1)', offset: 0.6}),
        style({transform: 'translate(-33px, -9px) scale(1.1)', offset: 0.7}),
        style({transform: 'translate(-33px, -15px) scale(1.1)', offset: 0.8}),
        style({transform: 'translate(-33px, -9px) scale(1.1)', offset: 0.9}),
        style({transform: 'translate(-29px, -11px) scale(1)', offset: 1}),
      ]))
    ]),
  ]),

  hoverRateMe:
  trigger('hoverCard2', [
    transition('0=>1', [
      style({transform : 'translate(-19px, -17.19px) rotateX(0)'}),
      animate('1500ms {{delay}} linear', keyframes([
        style({transform: 'translate(-19px, -3px) rotateX(50deg)', offset: 0.1}),
        style({transform: 'translate(-19px, -17.19px) rotateX(0)', offset: 0.2}),
        style({transform: 'translate(-19px, -3px) rotateX(50deg)', offset: 0.3}),
        style({transform: 'translate(-19px, -17.19px) rotateX(0)', offset: 0.4}),
        style({transform: 'translate(-19px, -3px) rotateX(50deg)', offset: 0.5}),
        style({transform: 'translate(-19px, -17.19px) rotateX(0)', offset: 0.6}),
        style({transform: 'translate(-19px, -3px) rotateX(50deg)', offset: 0.7}),
        style({transform: 'translate(-19px, -17.19px) rotateX(0)', offset: 0.8}),
        style({transform: 'translate(-19px, -3px) rotateX(50deg)', offset: 0.9}),
        style({transform: 'translate(-19px, -17.19px) rotateX(0)', offset: 1}),
      ]))
    ])
  ]),

  hoverSkillMap:
  trigger('hoverCard3', [
    transition('0=>1', [
      style({transform: 'rotate(0)'}),
      sequence([
        group([
          animate('500ms cubic-bezier( .42, 0, 0, 1.01 )', style({transform: 'rotate(420deg)'})),
          query('.mapDot', [
            style({transform: 'translate(-11px, -14px)'}),
              animate('500ms ease-out', style({transform: 'translate(-11px, -30px)'}))
            ]),
          query('.rightEye', [
            style({transform: 'translate(-11px, -14px)'}),
              animate('500ms ease-out', style({transform: 'translate(11px, -14px)'}))
            ]),
          query('.leftEye', [
            style({transform: 'translate(-11px, -14px)'}),
              animate('500ms ease-out', style({transform: 'translate(-11px, 10px)'}))
            ]),
        ]),
        animate('500ms cubic-bezier( 1, -0.01, 1, 0.99 )', style({transform: 'rotate(360deg)'})),
        group([
          query('.rightEye', [
            style({transform: 'translate(11px, -14px)'}),
              animate('500ms cubic-bezier( 0, 0, 0, 1 )', style({transform: 'translate(-25px, -24px)'}))
            ]),
          query('.leftEye', [
            style({transform: 'translate(-11px, 10px)'}),
              animate('500ms cubic-bezier( 0, 0, 0, 1 )', style({transform: 'translate(-50px, -45px)'}))
            ]),
          query('.rightMouth', [
            style({transform: 'translate(-11px, -14px) rotate(0)'}),
              animate('500ms cubic-bezier( 0, 0, 0, 1 )', style({transform: 'translate(-37px, 7px) rotate(-6deg)'}))
            ]),
          query('.leftMouth', [
            style({transform: 'translate(-11px, -14px) rotate(0)'}),
              animate('500ms ease-out', style({transform: 'translate(-48px, 40px) rotate(-34deg)'}))
            ]),
          query('.mapDot', [
            style({transform: 'translate(-11px, -30px) scale(1)'}),
              animate('500ms cubic-bezier( 0, 0, 0, 1 )', style({transform: 'translate(-11px, -60px) scale(0)'}))
            ]),
        ]),
        animate('1000ms cubic-bezier( 1, -0.01, 1, 0.99 )', style({transform: 'rotate(360deg)'})),
      ])
    ]),

    transition('1=>0', [
      group([
        animate('500ms cubic-bezier( 1, -0.01, 1, 0.99 )', style({transform: 'rotate(0deg)'})),
        query('.rightEye', [
          style({transform: 'translate(-25px, -24px)'}),
            animate('500ms cubic-bezier( 0, 0, 0, 1 )', style({transform: 'translate(-11px, -14px)'}))
          ]),
        query('.leftEye', [
          style({transform: 'translate(-50px, -45px)'}),
            animate('500ms cubic-bezier( 0, 0, 0, 1 )', style({transform: 'translate(-11px, -14px)'}))
          ]),
        query('.rightMouth', [
          style({transform: 'translate(-37px, 7px) rotate(-6deg)'}),
            animate('500ms cubic-bezier( 0, 0, 0, 1 )', style({transform: 'translate(-11px, -14px) rotate(0deg)'}))
          ]),
        query('.leftMouth', [
          style({transform: 'translate(-48px, 40px) rotate(-34deg)'}),
            animate('500ms ease-out', style({transform: 'translate(-11px, -14px) rotate(0deg)'}))
          ]),
        query('.mapDot', [
          style({transform: 'translate(-11px, -60px) scale(0)'}),
            animate('500ms cubic-bezier( 0, 0, 0, 1 )', style({transform: 'translate(-11px, -14px) scale(1)'}))
          ]),
      ]),
    ])
  ])
}
