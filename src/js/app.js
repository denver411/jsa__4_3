const setUpAttacks = (items, shield = true) => {
  const result = [];

  items.forEach((item) => {
    const element = item;
    const countHealth = (damage) => {
      if (!element.health) return;
      // если нет "щита"
      if (!shield) {
        const healthAfterDamage = element.health - damage;
        element.health = healthAfterDamage > 0 ? healthAfterDamage : 0;
        return;
      }
      // если есть "щит"
      // определяем количество живых героев
      const liveHeroes = items.filter(hero => hero.health > 0).length;
      // считаем урон каждому живому герою и остаток урона
      const heroDamage = Math.floor(damage / liveHeroes);
      // считаем нераспределенный урон
      const damageRest = damage % liveHeroes;
      // раздаем урон героям
      items.forEach((elem) => {
        const hero = elem;
        const healthRest = hero.health - heroDamage;
        hero.health = healthRest > 0 ? healthRest : 0;
      });
      // раздаем нераспределенный урон
      if (damageRest) element.health -= damageRest;
      element.health = element.health > 0 ? element.health : 0;
    };
    // создаем массив функций
    result.push(countHealth);
  });

  return result;
};

export default setUpAttacks;
