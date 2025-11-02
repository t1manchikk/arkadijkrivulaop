// Клас Pokemon: інкапсулює логіку персонажа
export default class Pokemon {
  constructor({ name='Безіменний', hp=100, type='neutral', selector=null } = {}) {
    this.name = name;
    this.type = type;
    this.maxHP = Number(hp);
    this.currentHP = Number(hp);
    this.selector = selector;
    this.renderHP();
  }

  // Статичний метод — створює пару: героя та противника
  // Виклик: const { player, enemy } = Pokemon.createPair(playerOptions, enemyOptions);
  static createPair(playerOptions = {}, enemyOptions = {}) {
    const player = new Pokemon(playerOptions);
    const enemy = new Pokemon(enemyOptions);
    return { player, enemy };
  }

  takeDamage(damage = 0) {
    damage = Math.max(0, Number(damage));
    this.currentHP -= damage;
    if (this.currentHP < 0) this.currentHP = 0;
    this.renderHP();
    return {
      name: this.name,
      damage,
      currentHP: this.currentHP,
      maxHP: this.maxHP,
      isDead: this.currentHP === 0
    };
  }

  resetHP() {
    this.currentHP = this.maxHP;
    this.renderHP();
  }

  hpPercent() {
    if (!this.maxHP) return 0;
    return Math.round((this.currentHP / this.maxHP) * 100);
  }

  renderHP() {
    if (!this.selector) return;
    const el = document.getElementById(this.selector);
    if (!el) return;
    el.textContent = `${this.name} — HP: ${this.currentHP}/${this.maxHP} (${this.hpPercent()}%)`;
  }
}
