export interface JsonWidgetTree {
  group : string,
  type : string,
  rect : number[],
  style? : any,
  passProps? : any,
  children? : Array<JsonWidgetTree>
}
