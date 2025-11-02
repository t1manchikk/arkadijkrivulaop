import Pokemon from './pokemon.js';
import { randomInt } from './utils.js';
import { addLog, clearLog } from './log.js';

// Використовуємо статичний метод createPair для створення героя й ворога — так, як проситься в завданні
const { player, enemy } = Pokemon.createPair(
  { name: 'Пікачу', hp: 120, type: 'electric', selector: 'player' },
  { name: 'Чармандер', hp: 110, type: 'fire', selector: 'enemy' }
);

const attackBtn = document.getElementById('attack');
const resetBtn = document.getElementById('reset');

function performRound() {
  const dmgToEnemy = randomInt(25);
  const resE = enemy.takeDamage(dmgToEnemy);
  addLog(`${player.name} завдав ${dmgToEnemy} шкоди ${enemy.name} — залишилось ${resE.currentHP} HP.`);

  if (resE.isDead) {
    addLog(`${enemy.name} переможено!`);
    attackBtn.disabled = true;
    return;
  }

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

addLog('Гра завантажена. Натисни "Атакувати", щоб почати.');
