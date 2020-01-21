/// <reference types="pixi.js" />
declare namespace PIXI.extras {
  class Bump {
    public renderer: string;
    constructor();
    addCollisionProperties(sprite: PIXI.DisplayObject): void;
    hitTestPoint(
      point: { x: number; y: number },
      sprite: PIXI.DisplayObject,
    ): boolean;
    hitTestCircle(c1: PIXI.Circle, c2: PIXI.Circle, global: boolean): boolean;
    circleCollision(
      c1: PIXI.Circle,
      c2: PIXI.Circle,
      bounce: boolean,
      global: boolean,
    ): boolean;
    movingCircleCollision(
      c1: PIXI.Circle,
      c2: PIXI.Circle,
      global: boolean,
    ): boolean;
    multipleCircleCollision(circles: PIXI.Circle[], global: boolean): boolean;
    multipleCollision(sprites: PIXI.DisplayObject[], global: boolean): boolean;
    rectangleCollision(
      r1: PIXI.Rectangle,
      r2,
      bounce: boolean,
      global: boolean,
    ): boolean;
    hitTestRectangle(r1: PIXI.Rectangle, r2, global: boolean): boolean;
    hitTestCircleRectangle(
      c1: PIXI.Circle,
      r1: PIXI.Rectangle,
      global: boolean,
    ): boolean;
    hitTestCirclePoint(
      c1: PIXI.Circle,
      point: { x: number; y: number },
      global: boolean,
    ): boolean;
    circleRectangleCollision(
      c1: PIXI.Circle,
      r1: PIXI.Rectangle,
      bounce: boolean,
      global: boolean,
    ): boolean;
    circlePointCollision(
      c1: PIXI.Circle,
      point: { x: number; y: number },
      bounce: boolean,
      global: boolean,
    ): boolean;
    bounceOffSurface(o, s): boolean;
    contain(
      sprite: PIXI.DisplayObject,
      container: PIXI.Container,
      bounce: boolean,
      extra: Function,
    ): boolean;
    outsideBounds(sprite: PIXI.DisplayObject, bounds, extra: Function): boolean;
    hit(
      sprite: PIXI.DisplayObject,
      sprites: PIXI.DisplayObject[],
      react: boolean,
      bounce: boolean,
      global: boolean,
      extra: Function,
    ): boolean;
    hitTest(
      sprite: PIXI.DisplayObject,
      sprites: PIXI.DisplayObject[],
    ): { top: boolean; right: boolean; bottom: boolean; left: boolean };
    hitTestDirections(
      sprite: PIXI.DisplayObject,
      sprites: PIXI.DisplayObject[],
      directions: string[],
    ): { top: boolean; right: boolean; bottom: boolean; left: boolean };
    hitTestLeft(
      sprite: PIXI.DisplayObject,
      sprites: PIXI.DisplayObject[],
    ): boolean;
    hitTestRight(
      sprite: PIXI.DisplayObject,
      sprites: PIXI.DisplayObject[],
    ): boolean;
    hitTestTop(
      sprite: PIXI.DisplayObject,
      sprites: PIXI.DisplayObject[],
    ): boolean;
    hitTestBottom(
      sprite: PIXI.DisplayObject,
      sprites: PIXI.DisplayObject[],
    ): boolean;
  }
}

declare module "pixi-plugin-bump" {
  export = PIXI.extras.Bump;
}
