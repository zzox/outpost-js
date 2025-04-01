import { getRandom } from "../util/util"
import { Actor } from "../world/actor"

export type BattleData = {
  teamNum:number
  turnTime:number
  isDefending:boolean
}

enum StepResultType {
  Attack = 'attack',
  Self = 'self',
  Team = 'team'
}

enum OverResult {
  EnemyDead = 'enemy-dead',
  PlayerDead = 'player-dead'
}

type StepResult = {
  // move:MoveName
  overResult?:OverResult
  isPlayer:boolean
  // missed:boolean
  fromChar:Actor
  toChar:Actor
  amount:number
  dead:Actor[]
}

// clearBattleData

const playerTeam = 0
const enemyTeam = 1

// TODO: move to util
const figureDamage = (strength:number, defense:number) => {
  if (strength >= defense) {
    return Math.floor(strength + (strength * (1 - (defense / strength))))
  }

  return Math.ceil(strength - (strength * (1 - (strength / defense))))
}

export class Battle {
  playerParty:Actor[]
  enemyParty:Actor[]

  teams:Actor[][]

  result!:StepResult

  // fastest persons speed in the battle plus padding
  speedMax:number = 0

  // TODO: remove
  isOver:boolean = false;

  constructor (playerParty:Array<Actor>, enemyParty:Array<Actor>) {
    this.playerParty = playerParty
    this.enemyParty = enemyParty
    this.teams = [this.playerParty, this.enemyParty]

    this.makeBattleData()
  }

  // this method feels ugly with the separate arrays of player and enemy data
  step () {
    if (this.isOver) {
      throw 'Over'
    }

    // find next char to go by finding the lowest time to go
    let turnActor: Actor
    let nextTime = this.speedMax
    let isPlayerTeam = true
    this.playerParty.forEach(p => {
      if (!p.isDead && p.battleData!.turnTime < nextTime) {
        nextTime = p.battleData!.turnTime
        turnActor = p
      }
    })

    this.enemyParty.forEach(p => {
      if (!p.isDead && p.battleData!.turnTime < nextTime) {
        nextTime = p.battleData!.turnTime
        turnActor = p
        isPlayerTeam = false
      }
    })

    // subtract time from the other members
    this.playerParty.forEach(p => {
      if (!isPlayerTeam || p != turnActor) {
        p.battleData!.turnTime -= nextTime
      }
    })

    this.enemyParty.forEach(p => {
      if (isPlayerTeam || p != turnActor) {
        p.battleData!.turnTime -= nextTime
      }
    })

    return this.doTurn(turnActor!, isPlayerTeam)
  }

  doTurn (actor:Actor, isPlayer:boolean):StepResult {
      // move: null,
    this.result.isPlayer = isPlayer
    this.result.fromChar = actor
    this.result.amount = 0
    this.result.dead = []

    // reset everything turn-based here
    actor.battleData!.isDefending = false;

    // if (isPlayer) {
    //   var madeMove = false;
    //   if (actor.attitude == Careful) {
    //     madeMove = tryHelpTeam(char, playerParty);
    //     if (madeMove) {
    //       this.result.move = actor.moves.get(Careful);
    //     }
    //   }

    //   if (!madeMove) {
    //     const enemy = chooseEnemyToAttack(char);
    //     tryAttackOpp(char, enemy);
    //     result.toChar = enemy;
    //     result.move = actor.moves.get(Aggro);
    //   }
    // } else {
      const target = this.chooseTarget(actor)
      this.tryAttackOpp(actor, target)
      actor.battleData!.turnTime = this.speedMax - actor.skill.speed
      // result.move = actor.moves.get(Aggro);
    // }

    this.result.overResult = this.checkOver()

    return this.result
  }

  tryAttackOpp (fromActor:Actor, toActor:Actor) {
    // TODO: only on statuses
    // if (Math.random() < 0.1) {
    //     result.missed = true;
    //     return;
    // }

    // final move = moveData[fromChar.moves.get(Aggro)];

    let attackDamage = fromActor.skill.strength
    // if (move.amountMult != null) {
    //   attackDamage = Math.round(attackDamage * move.amountMult);
    // }

    let defensePts = toActor.skill.defense
    if (toActor.battleData!.isDefending) {
      defensePts = Math.round(toActor.skill.defense * 2)
    }

    const damage = figureDamage(attackDamage, defensePts)
    toActor.health -= damage;
    if (toActor.health <= 0) {
      toActor.health = 0;
      this.result.dead.push(toActor);
    }
    this.result.amount = damage;

    fromActor.battleData!.turnTime = Math.round((this.speedMax - fromActor.skill.speed))// * move.recoveryMult);
  }

  // get an actor from the other team, random for now
  chooseTarget (actor:Actor):Actor {
    return getRandom(this.teams[this.getOpp(actor.battleData!.teamNum)])
  }

  makeBattleData () {
    // make max speed
    this.playerParty.forEach(p => { this.speedMax = Math.max(this.speedMax, p.skill.speed) })
    this.enemyParty.forEach(p => { this.speedMax = Math.max(this.speedMax, p.skill.speed) })

    let speedMin = this.speedMax;
    this.playerParty.forEach(p => { speedMin = Math.min(speedMin, p.skill.speed) })
    this.enemyParty.forEach(p => { speedMin = Math.min(speedMin, p.skill.speed) })

    // ATTN: the speedMax here allows people to go a little too fast, might need a larger padding
    // maybe padding is the lowest speed?
    // speedMax += 1;
    this.speedMax += speedMin

    this.playerParty.forEach(p => {
      p.battleData = {
        teamNum: 0,
        turnTime: this.speedMax - p.skill.speed,
        isDefending: false
      }
    })

    this.enemyParty.forEach(p => {
      p.battleData = {
        teamNum: 1,
        turnTime: this.speedMax - p.skill.speed,
        isDefending: false
      }
    })
  }

  checkOver ():OverResult | undefined {
    if (this.playerParty.every((actor) => actor.isDead)) {
      this.isOver = true
      return OverResult.PlayerDead
    }

    if (this.enemyParty.every((actor) => actor.isDead)) {
      this.isOver = true
      return OverResult.EnemyDead
    }
  }

  getOpp (num:number):number {
    return (num + 1) % 2
  }
}
