<script lang="ts">
  import {
    Calculator,
    type Item,
    type Quantity,
    type TransmutationOpt
  } from '../utils/calculator';

  const charactorSkillToMax: Quantity = {
    BRONZE: 9,
    BLACK: 0,
    SILVER: 63,
    GOLD: 114
  };

  const weaponSkillToMax: Quantity = {
    BRONZE: 5,
    BLACK: 14,
    SILVER: 14,
    GOLD: 6
  };

  let selectCalcType: Item = 'SkillBook';
  let targetQuantity: Quantity =
    charactorSkillToMax;
  let currentQuantity: Quantity = {
    BRONZE: 0,
    SILVER: 0,
    BLACK: 0,
    GOLD: 0
  };
  let transmutationOpt: TransmutationOpt;
  let calculator = new Calculator({
    itemType: selectCalcType,
    targetQuantity,
    currentQuantity,
    transmutationOpt
  });

  $: targetQuantity =
    selectCalcType === 'SkillBook'
      ? charactorSkillToMax
      : weaponSkillToMax;
  $: calculator = new Calculator({
    itemType: selectCalcType,
    targetQuantity,
    currentQuantity,
    transmutationOpt
  });
</script>

<main>
  <h1>레진 파밍 계산기</h1>

  <div style="padding-bottom: 1rem;">
    <button
      on:click={() =>
        (selectCalcType = 'SkillBook')}
      >스킬</button
    >
    <button
      on:click={() =>
        (selectCalcType = 'WeaponMaterial')}
      >무기소재</button
    >
  </div>

  <div>
    <h4>합성 옵션</h4>
    <form
      style="display: flex; flex-wrap:wrap; gap: 0.5rem;"
    >
      <label>
        <input
          type="radio"
          bind:group={transmutationOpt}
          value={undefined}
        />
        없음
      </label>
      <label>
        <input
          type="radio"
          bind:group={transmutationOpt}
          value={'twice'}
        />
        10% 확률로 2배
      </label>
      <label>
        <input
          type="radio"
          bind:group={transmutationOpt}
          value={'payback'}
        />
        25% 확률로 페이백
      </label>
    </form>
  </div>

  <div>
    {#if selectCalcType === 'SkillBook'}
      <p>스킬북</p>
    {:else}
      <p>무기소재</p>
    {/if}

    <h4>
      목표 보유량 (기본값: {selectCalcType ===
      'SkillBook'
        ? '10/10/10 까지'
        : '90레벨 까지'})
    </h4>

    <form
      style="display: flex; flex-wrap:wrap; gap: 1rem;"
    >
      <label for="BRONZE">
        BRONZE
        <input
          type="number"
          min="0"
          name="BRONZE"
          bind:value={targetQuantity.BRONZE}
        />
      </label>
      {#if selectCalcType === 'WeaponMaterial'}
        <label for="BLACK"
          >BLACK
          <input
            type="number"
            min="0"
            name="BLACK"
            bind:value={targetQuantity.BLACK}
          />
        </label>
      {/if}
      <label for="SILVER"
        >SILVER
        <input
          type="number"
          min="0"
          name="SILVER"
          bind:value={targetQuantity.SILVER}
        /></label
      >
      <label for="GOLD"
        >GOLD
        <input
          type="number"
          min="0"
          name="GOLD"
          bind:value={targetQuantity.GOLD}
        /></label
      >
    </form>

    <h4>현재 보유량</h4>

    <form
      style="display: flex; flex-wrap:wrap; gap: 1rem;"
    >
      <label for="BRONZE"
        >BRONZE
        <input
          type="number"
          min="0"
          name="BRONZE"
          bind:value={currentQuantity.BRONZE}
        />
      </label>
      {#if selectCalcType === 'WeaponMaterial'}
        <label for="BLACK"
          >BLACK
          <input
            type="number"
            min="0"
            name="BLACK"
            bind:value={currentQuantity.BLACK}
          />
        </label>
      {/if}
      <label for="SILVER"
        >SILVER
        <input
          type="number"
          min="0"
          name="SILVER"
          bind:value={currentQuantity.SILVER}
        />
      </label>
      <label for="GOLD"
        >GOLD
        <input
          type="number"
          min="0"
          name="GOLD"
          bind:value={currentQuantity.GOLD}
        />
      </label>
    </form>
  </div>

  <div>
    <p>계산 결과</p>

    <h4>
      필요 레진 추정치: {calculator.requireResin()}
    </h4>

    <label
      for="progress"
      style="font-weight: bold;">달성도</label
    >
    <progress
      class="progress"
      max="100"
      value={calculator.processPercentage()}
    />
    <span style="font-weight: bold;"
      >{calculator
        .processPercentage()
        .toFixed(2)}%</span
    >
  </div>
</main>

<style>
  p {
    color: goldenrod;
    font-family: 'Comic Sans MS', cursive;
    font-size: 2em;
  }
</style>
