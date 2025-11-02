import Pokemon from './pokemon.js';
import { randomInt } from './utils.js';
import { addLog, clearLog } from './log.js';

// Створюємо гравця і ворога
const player = new Pokemon({ name: 'Пікачу', hp: 120, type: 'electric', selector: 'player' });
const enemy  = new Pokemon({ name: 'Чармандер', hp: 110, type: 'fire', selector: 'enemy' });

// Додаємо події
const attackBtn = document.getElementById('attack');
const resetBtn = document.getElementById('reset');

function performRound() {
  // Гравець атакує ворога
  const dmgToEnemy = randomInt(25);
  const resE = enemy.takeDamage(dmgToEnemy);
  addLog(`${player.name} завдав ${dmgToEnemy} шкоди ${enemy.name} — залишилось ${resE.currentHP} HP.`);

  if (resE.isDead) {
    addLog(`${enemy.name} переможено!`);
    attackBtn.disabled = true;
    return;
  }

  // Ворог атакує гравця
  const dmgToPlayer = randomInt(20);
  const resP = player.takeDamage(dmgToPlayer);
  addLog(`${enemy.name} завдав ${dmgToPlayer} шкоди ${player.name} — залишилось ${resP.currentHP} HP.`);

  if (resP.isDead) {
    addLog(`${player.name} вибув з бою!`);
    attackBtn.disabled = true;
    return;
  }
}

attackBtn.addEventListener('click', performRound);

resetBtn.addEventListener('click', () => {
  player.resetHP();
  enemy.resetHP();
  clearLog();
  addLog('Бій скинуто. Початкові стани відновлено.');
  attackBtn.disabled = false;
});

// Початкова підказка
addLog('Гра завантажена. Натисни "Атакувати", щоб почати.');
