// Клас Pokemon — відповідає за логіку створення й управління персонажем
export default class Pokemon {
  /**
   * options: { name, hp, type, selector }
   * selector — id DOM-елемента, куди рендерити стан (тільки логіка рендеру тут)
   */
  constructor(options = {}) {
    const { name = 'Безіменний', hp = 100, type = 'neutral', selector = null } = options;
    this.name = name;
    this.type = type;
    this.maxHP = Number(hp);
    this.currentHP = Number(hp);
    this.selector = selector; // рядок id, наприклад 'player' або 'enemy'

    // Початковий рендер стану (якщо вказано селектор)
    this.renderHP();
  }

  // Зменшити HP на damage (позитивне число). Повертає об'єкт з новим станом.
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

  // Відновити HP до максимуму
  resetHP() {
    this.currentHP = this.maxHP;
    this.renderHP();
  }

  // Повертає відсоток HP (0..100)
  hpPercent() {
    if (!this.maxHP) return 0;
    return Math.round((this.currentHP / this.maxHP) * 100);
  }

  // Простий рендер стану в DOM: показує ім'я та HP
  renderHP() {
    if (!this.selector) return;
    const el = document.getElementById(this.selector);
    if (!el) return;
    el.textContent = `${this.name} — HP: ${this.currentHP}/${this.maxHP} (${this.hpPercent()}%)`;
  }
}
