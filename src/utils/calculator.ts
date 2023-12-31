export type Item = 'SkillBook' | 'WeaponMaterial';

export type Grade =
  | 'BRONZE'
  | 'BLACK'
  | 'SILVER'
  | 'GOLD';

export type Quantity = Record<Grade, number>;

export type TransmutationOpt =
  | undefined
  | 'twice'
  | 'payback';

type CalculatorParams = {
  itemType: Item;
  targetQuantity: Quantity;
  currentQuantity: Quantity;
  transmutationOpt: TransmutationOpt;
};

export class Calculator {
  private itemType: Item;
  private targetQuantity: Quantity;
  private currentQuantity: Quantity;
  private transmutationOpt?: TransmutationOpt;
  constructor({
    itemType,
    targetQuantity,
    currentQuantity,
    transmutationOpt = undefined
  }: CalculatorParams) {
    this.itemType = itemType;
    this.targetQuantity = targetQuantity;
    this.currentQuantity = currentQuantity;
    this.transmutationOpt = transmutationOpt;
  }

  transMutate(inputs: number) {
    if (this.transmutationOpt === undefined)
      return inputs / 3;

    switch (this.transmutationOpt) {
      case 'twice':
        return (inputs / 3) * 1.1;
      case 'payback':
        return (inputs / 3) * 1.091;
      default:
        return inputs / 3;
    }
  }

  runSkillDungeon(zeroStart = false) {
    let count = 0;
    const bronzeValue = 2.2;
    const silverValue = 1.97;
    const goldValue = 0.23;

    let currentBronze = zeroStart
      ? 0
      : this.currentQuantity.BRONZE;
    let currentSilver = zeroStart
      ? 0
      : this.currentQuantity.SILVER;
    let currentGold = zeroStart
      ? 0
      : this.currentQuantity.GOLD;

    while (
      this.targetQuantity.BRONZE >
        currentBronze ||
      this.targetQuantity.SILVER >
        currentSilver ||
      this.targetQuantity.GOLD > currentGold
    ) {
      count++;

      if (
        this.targetQuantity.BRONZE < currentBronze
      ) {
        currentSilver +=
          this.transMutate(bronzeValue);
      } else {
        currentBronze += bronzeValue;
      }

      if (
        this.targetQuantity.SILVER < currentSilver
      ) {
        currentGold +=
          this.transMutate(silverValue);
      } else {
        currentSilver += silverValue;
      }

      currentGold += goldValue;
    }

    return count;
  }

  runWeaponDungeon(zeroStart = false) {
    let count = 0;
    const bronzeValue = 2.2;
    const blackValue = 2.4;
    const silverValue = 0.64;
    const goldValue = 0.07;

    let currentBronze = zeroStart
      ? 0
      : this.currentQuantity.BRONZE;
    let currentBlack = zeroStart
      ? 0
      : this.currentQuantity.BLACK;
    let currentSilver = zeroStart
      ? 0
      : this.currentQuantity.SILVER;
    let currentGold = zeroStart
      ? 0
      : this.currentQuantity.GOLD;

    while (
      this.targetQuantity.BRONZE >
        currentBronze ||
      this.targetQuantity.BLACK > currentBlack ||
      this.targetQuantity.SILVER >
        currentSilver ||
      this.targetQuantity.GOLD > currentGold
    ) {
      count++;

      if (
        this.targetQuantity.BRONZE < currentBronze
      ) {
        currentBlack +=
          this.transMutate(bronzeValue);
      } else {
        currentBronze += bronzeValue;
      }

      if (
        this.targetQuantity.BLACK < currentBlack
      ) {
        currentSilver +=
          this.transMutate(blackValue);
      } else {
        currentBlack += blackValue;
      }

      if (
        this.targetQuantity.SILVER < currentSilver
      ) {
        currentGold +=
          this.transMutate(silverValue);
      } else {
        currentSilver += silverValue;
      }

      currentGold += goldValue;
    }

    return count;
  }

  requireResin() {
    if (this.itemType === 'SkillBook') {
      const count = this.runSkillDungeon();

      return count * 20;
    } else {
      const count = this.runWeaponDungeon();

      return count * 20;
    }
  }

  processPercentage() {
    if (this.itemType === 'SkillBook') {
      const count = this.runSkillDungeon();
      const zeroStartCount =
        this.runSkillDungeon(true);

      return (
        Number(
          (zeroStartCount - count) /
            zeroStartCount
        ) * 100
      );
    } else {
      const count = this.runWeaponDungeon();
      const zeroStartCount =
        this.runWeaponDungeon(true);

      return (
        Number(
          (zeroStartCount - count) /
            zeroStartCount
        ) * 100
      );
    }
  }
}
