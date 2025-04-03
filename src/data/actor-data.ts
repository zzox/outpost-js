import { getWeightedRandom, intClamp, randomInt, seedShuffle } from '../util/util'
import { Actor } from '../world/actor'
import { EncounterType } from './encounter-data'
import { Inventory, itemData, ItemType } from './items'
import { Random } from '../util/random'
import { DAY_LENGTH, HiLow, scale, Scale } from './globals'

let id = 401 // its 401 since we are 0

export enum ActorType {
  Knight = 'Knight',
  Witch = 'Witch',
  Healer = 'Healer',
}

export type GenerationData = {
  frequency:number
  nextTime:number
  type:EncounterType
  item?:ItemType
  amount?:number
  price?:number
  day:HiLow
  // level:HiLow
}

export const generateActor = ():Actor => {
  const actorLevel = 3 + randomInt(5);

  const actor = new Actor(
    id++,
    actorLevel,
    randomInt(100 * actorLevel),
    intClamp(10 - randomInt(20), 0, 10) + intClamp(90 - randomInt(270), 0, 90),
    intClamp(10 - randomInt(20), 0, 10) + intClamp(100 - randomInt(500), 0, 100),
    intClamp(100 - randomInt(200), 0, 100)
  )

  // if (Math.random() < 0.9) {
  actor.targetType = EncounterType.Buy
  actor.target = generateActorTarget(actor.level)
  // } else {
  //   actor.targetType = EncounterType.Sell
  //   actor.target = generateActorTarget(actor.level)
  // }

  return actor
}

const generateActorTarget = (level:number):ItemType => {
  const weights = []
  for (let item of itemData.entries()) {
    weights.push({ item: item[0], weight: item[1].common })
  }

  return getWeightedRandom(weights)
}

export const getName = (id:number): string | undefined => {
  return shuffledNames[id]
}

const types = [
  ActorType.Knight,
  ActorType.Witch,
  ActorType.Healer
]

export const getActorType = (id:number): ActorType => types[id % 3]

const mainActorData = [
  { level: 5, money: 1000, cheapness: 0, leeway: 0, zealous: 0, frequency: DAY_LENGTH, type: EncounterType.Distribute, item: ItemType.Potion, amount: 10, price: 150, day: { low: 0, hi: -1 } },
  { level: 5, money: 1000, cheapness: 0, leeway: 0, zealous: 0, frequency: DAY_LENGTH * 5, type: EncounterType.Distribute, item: ItemType.Wood, amount: 1000, price: 1200, day: { low: 0, hi: -1 } },
  { level: 5, money: 1000, cheapness: 0, leeway: 0, zealous: 0, frequency: DAY_LENGTH * 3, type: EncounterType.Distribute, item: ItemType.Rope, amount: 200, price: 1000, day: { low: 0, hi: -1 } },
  { level: 5, money: 1000, cheapness: 0, leeway: 0, zealous: 0, frequency: DAY_LENGTH * 3, type: EncounterType.Distribute, item: ItemType.RiseLeaf, amount: 5, price: 900, day: { low: 0, hi: -1 } },
  { level: 5, money: 1000, cheapness: 0, leeway: 0, zealous: 0, frequency: DAY_LENGTH * 10, type: EncounterType.Distribute, item: ItemType.RiseLeaf, amount: 10, price: 1500, day: { low: 0, hi: -1 } },
]

export const generateMainActors = ():Actor[] => {
  const rand = new Random('weeeteeee')
  console.log(rand.get())
  console.log(rand.get())
  console.log(rand.get())

  seedShuffle(shuffledNames, rand.get)
  // shuffledNames.unshift('You')

  let actorId = 0

  return mainActorData.map((data) => {
    const actor = new Actor(
      actorId++,
      data.level,
      data.money,
      data.cheapness,
      data.leeway,
      data.zealous
    )
    actor.genData = {
      frequency: data.frequency,
      nextTime: 0,
      type: data.type,
      item: data.item,
      amount: data.amount,
      price: data.price,
      day: data.day
      // level: { low: 5, hi: },
    }
    actor.genData.nextTime = randomInt(actor.genData.frequency)

    return actor
  })
}

export const generateYou = ():Actor => {
  return new Actor(
    -2, // lol bad
    5,
    500, // just simulated for now
    0,
    0,
    0
  )
}

// const generateInventory = (level:number) => {
//   const inventory:Inventory = new Map<ItemType, Int>();

//   var maxItems = 1 + randomInt(4);
//   for (item in itemData.keys()) {
//     if (maxItems <= 0) {
//       break;
//     }

//     // // NOTE: reverse engineering inventory from what the character is looking for
//     // if (targetItems.get(target).contains(item)) {
//     //   continue;
//     // }
//     // dont get data from the actors

//     final num = randomInt(getInvItems(item, level));
//     if (num > 0) {
//       inventory.set(item, num);
//       maxItems--;
//     }
//   }
//   return inventory;
// }

const names = [
  // m
  'John',
  'William',
  'James',
  'George',
  'Charles',
  'Frank',
  'Joseph',
  'Henry',
  'Robert',
  'Thomas',
  'Edward',
  'Harry',
  'Walter',
  'Arthur',
  'Fred',
  'Albert',
  'Samuel',
  'Clarence',
  'Louis',
  'David',
  'Joe',
  'Charlie',
  'Richard',
  'Ernest',
  'Roy',
  'Will',
  'Andrew',
  'Jesse',
  'Oscar',
  'Willie',
  'Daniel',
  'Benjamin',
  'Carl',
  'Sam',
  'Alfred',
  'Earl',
  'Peter',
  'Elmer',
  'Frederick',
  'Howard',
  'Lewis',
  'Ralph',
  'Herbert',
  'Paul',
  'Lee',
  'Tom',
  'Herman',
  'Martin',
  'Jacob',
  'Michael',
  'Jim',
  'Claude',
  'Ben',
  'Eugene',
  'Francis',
  'Grover',
  'Raymond',
  'Harvey',
  'Clyde',
  'Edwin',
  'Edgar',
  'Ed',
  'Lawrence',
  'Bert',
  'Chester',
  'Jack',
  'Otto',
  'Luther',
  'Charley',
  'Guy',
  'Floyd',
  'Ira',
  'Ray',
  'Hugh',
  'Isaac',
  'Oliver',
  'Patrick',
  'Homer',
  'Theodore',
  'Leonard',
  'Leo',
  'Alexander',
  'August',
  'Harold',
  'Allen',
  'Jessie',
  'Archie',
  'Philip',
  'Stephen',
  'Horace',
  'Marion',
  'Bernard',
  'Anthony',
  'Julius',
  'Warren',
  'Leroy',
  'Clifford',
  'Eddie',
  'Sidney',
  'Milton',
  'Leon',
  'Alex',
  'Lester',
  'Emil',
  'Dan',
  'Willis',
  'Everett',
  'Dave',
  'Leslie',
  'Rufus',
  'Alvin',
  'Perry',
  'Lloyd',
  'Victor',
  'Calvin',
  'Harrison',
  'Norman',
  'Wesley',
  'Jess',
  'Percy',
  'Amos',
  'Dennis',
  'Jerry',
  'Nathan',
  'Franklin',
  'Alonzo',
  'Matthew',
  'Mack',
  'Earnest',
  'Gus',
  'Russell',
  'Adam',
  'Jay',
  'Wallace',
  'Otis',
  'Stanley',
  'Adolph',
  'Jake',
  'Roscoe',
  'Maurice',
  'Melvin',
  'Gilbert',
  'Ross',
  'Willard',
  'Mark',
  'Levi',
  'Wilbur',
  'Cornelius',
  'Aaron',
  'Jose',
  'Elbert',
  'Emmett',
  'Phillip',
  'Morris',
  'Noah',
  'Claud',
  'Clinton',
  'Felix',
  'Moses',
  'Elijah',
  'Nelson',
  'Simon',
  'Lonnie',
  'Virgil',
  'Hiram',
  'Jasper',
  'Marshall',
  'Manuel',
  'Sylvester',
  'Fredrick',
  'Mike',
  'Abraham',
  'Silas',
  'Irvin',
  'Max',
  'Owen',
  'Christopher',
  'Reuben',
  'Glenn',
  'Nicholas',
  'Ellis',
  'Marvin',
  'Wiley',
  'Eli',
  'Edmund',
  'Ollie',
  'Cecil',
  'Cleveland',
  'Curtis',
  'Timothy',
  'Harley',
  'Jeff',
  'Anton',
  'Alva',
  'Wilson',
  'Irving',
  'Clayton',
  'Rudolph',
  'Vernon',
  'Hubert',
  // f
  'Mary',
  'Anna',
  'Emma',
  'Elizabeth',
  'Margaret',
  'Minnie',
  'Ida',
  'Bertha',
  'Clara',
  'Alice',
  'Annie',
  'Florence',
  'Bessie',
  'Grace',
  'Ethel',
  'Sarah',
  'Ella',
  'Martha',
  'Nellie',
  'Mabel',
  'Laura',
  'Carrie',
  'Cora',
  'Helen',
  'Maude',
  'Lillian',
  'Gertrude',
  'Rose',
  'Edna',
  'Pearl',
  'Edith',
  'Jennie',
  'Hattie',
  'Mattie',
  'Eva',
  'Julia',
  'Myrtle',
  'Louise',
  'Lillie',
  'Jessie',
  'Frances',
  'Catherine',
  'Lula',
  'Lena',
  'Marie',
  'Ada',
  'Josephine',
  'Fannie',
  'Lucy',
  'Dora',
  'Agnes',
  'Maggie',
  'Blanche',
  'Katherine',
  'Elsie',
  'Nora',
  'Mamie',
  'Rosa',
  'Stella',
  'Daisy',
  'May',
  'Effie',
  'Mae',
  'Ellen',
  'Nettie',
  'Ruth',
  'Alma',
  'Della',
  'Lizzie',
  'Sadie',
  'Sallie',
  'Nancy',
  'Susie',
  'Maud',
  'Flora',
  'Irene',
  'Etta',
  'Katie',
  'Lydia',
  'Lottie',
  'Viola',
  'Caroline',
  'Addie',
  'Hazel',
  'Georgia',
  'Esther',
  'Mollie',
  'Olive',
  'Willie',
  'Harriet',
  'Emily',
  'Charlotte',
  'Amanda',
  'Kathryn',
  'Lulu',
  'Susan',
  'Kate',
  'Nannie',
  'Jane',
  'Amelia',
  'Virginia',
  'Mildred',
  'Beulah',
  'Eliza',
  'Rebecca',
  'Ollie',
  'Belle',
  'Ruby',
  'Pauline',
  'Matilda',
  'Theresa',
  'Hannah',
  'Henrietta',
  'Ora',
  'Estella',
  'Leona',
  'Augusta',
  'Eleanor',
  'Rachel',
  'Amy',
  'Sara',
  'Anne',
  'Marion',
  'Iva',
  'Ann',
  'Nina',
  'Dorothy',
  'Lola',
  'Lela',
  'Beatrice',
  'Josie',
  'Sophia',
  'Estelle',
  'Mayme',
  'Barbara',
  'Evelyn',
  'Maria',
  'Inez',
  'Allie',
  'Essie',
  'Delia',
  'Mable',
  'Millie',
  'Alta',
  'Betty',
  'Callie',
  'Janie',
  'Rosie',
  'Victoria',
  'Ola',
  'Gladys',
  'Louisa',
  'Ina',
  'Eula',
  'Luella',
  'Vera',
  'Lou',
  'Celia',
  'Nell',
  'Goldie',
  'Winifred',
  'Bettie',
  'Hilda',
  'Sophie',
  'Christine',
  'Marguerite',
  'Tillie',
  'Birdie',
  'Rena',
  'Eunice',
  'Bertie',
  'Olga',
  'Sylvia',
  'Lucille',
  'Bess',
  'Isabelle',
  'Genevieve',
  'Leila',
  'Mathilda',
  'Dollie',
  'Isabel',
  'Verna',
  'Bernice',
  'Loretta',
  'Rhoda',
  'Cornelia',
  'Sally',
  'Jean',
  'Alberta',
  'Winnie',
  'Lelia',
  'Lois',
  'Myra',
  'Harriett',
  'Roxie',
  'Adeline',
  'Abbie',
  'Flossie',
  'Sue',
  'Christina'
]

let shuffledNames:string[] = names.slice()
