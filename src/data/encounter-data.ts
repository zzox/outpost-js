export enum EncounterType {
  Buy = 'Buy',
  Sell = 'Sell',
  // Service;
  // Robbery;
  // Stickup;
}

export type EncounterData = {
  type:EncounterType
  // actor:Actor
  // item:ItemType
  amount?:number
  price?:number
}
