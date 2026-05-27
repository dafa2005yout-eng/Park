// 10 locations × 3 photos each (card + 2 vertical) = 30
// + 2 homepage photos (pond hero, quest cta) = 32 total.
import elephantCard from "@/assets/park/elephant-gates-card.jpg";
import elephantV1 from "@/assets/park/elephant-gates-v1.jpg";
import elephantV2 from "@/assets/park/elephant-gates-v2.jpg";

import chapelleCard from "@/assets/park/chapelle-card.jpg";
import chapelleV1 from "@/assets/park/chapelle-v1.jpg";
import chapelleV2 from "@/assets/park/chapelle-v2.jpg";

import grottoCard from "@/assets/park/grotto-card.jpg";
import grottoV1 from "@/assets/park/grotto-v1.jpg";
import grottoV2 from "@/assets/park/grotto-v2.jpg";

import stablesCard from "@/assets/park/pensioner-stables-card.jpg";
import stablesV1 from "@/assets/park/pensioner-stables-v1.jpg";
import stablesV2 from "@/assets/park/pensioner-stables-v2.jpg";

import chineseCard from "@/assets/park/chinese-theatre-card.jpg";
import chineseV1 from "@/assets/park/chinese-theatre-v1.jpg";
import chineseV2 from "@/assets/park/chinese-theatre-v2.jpg";

import bunkerCard from "@/assets/park/spanish-bunker-card.jpg";
import bunkerV1 from "@/assets/park/spanish-bunker-v1.jpg";
import bunkerV2 from "@/assets/park/spanish-bunker-v2.jpg";

import musicCard from "@/assets/park/music-pavilion-card.jpg";
import musicV1 from "@/assets/park/music-pavilion-v1.jpg";
import musicV2 from "@/assets/park/music-pavilion-v2.jpg";

import pondCard from "@/assets/park/great-pond-card.jpg";
import pondV1 from "@/assets/park/great-pond-v1.jpg";
import pondV2 from "@/assets/park/great-pond-v2.jpg";

import sculptureCard from "@/assets/park/sculpture-route-card.jpg";
import sculptureV1 from "@/assets/park/sculpture-route-v1.jpg";
import sculptureV2 from "@/assets/park/sculpture-route-v2.jpg";

import lionCard from "@/assets/park/lion-bridge-card.jpg";
import lionV1 from "@/assets/park/lion-bridge-v1.jpg";
import lionV2 from "@/assets/park/lion-bridge-v2.jpg";

// Homepage-only assets
import homePondImg from "@/assets/park/home-pond.jpg";
import homeQuestImg from "@/assets/park/home-quest.jpg";

export const homePond = homePondImg;
export const homeQuest = homeQuestImg;

export type Location = {
  id: string;
  num: string;
  tag: string;
  title: string;
  meta: string;
  /** main horizontal image — used as card preview on home and as the hero on the detail page */
  image: string;
  /** vertical photos shown in the detail page scroller */
  verticals: [string, string];
  description: string;
};

export const locations: Location[] = [
  {
    id: "elephant-gates",
    num: "01",
    tag: "Архитектура",
    title: "Слоновьи ворота",
    meta: "Декоративное сооружение с необычной историей",
    image: elephantCard,
    verticals: [elephantV1, elephantV2],
    description:
      "Слоновьи ворота — декоративное архитектурное сооружение, служившее входом на территорию парка. Название связано с историей содержания экзотических животных при императорском дворе. Объект выделяется своей необычной формой и историческим контекстом, оставаясь одной из менее очевидных, но атмосферных точек маршрута.",
  },
  {
    id: "chapelle",
    num: "02",
    tag: "Архитектура",
    title: "Башня Шапель",
    meta: "Неоготическая руина среди деревьев",
    image: chapelleCard,
    verticals: [chapelleV1, chapelleV2],
    description:
      "Башня Шапель — одно из самых выразительных сооружений Александровского парка, выполненное в неоготическом стиле. Постройка создавалась как декоративная руина, формирующая романтический образ старинных развалин. Локация обладает сильной визуальной атмосферой и становится акцентной точкой прогулочного маршрута.",
  },
  {
    id: "grotto",
    num: "03",
    tag: "Природа",
    title: "Грот-родник",
    meta: "Скрытая природная локация с источником воды",
    image: grottoCard,
    verticals: [grottoV1, grottoV2],
    description:
      "Грот-родник — небольшая архитектурно-природная форма, сочетающая элементы ландшафтного дизайна и естественного источника воды. Локация отличается камерностью и ощущением уединения, органично вписываясь в природную среду парка и создавая атмосферу скрытого места.",
  },
  {
    id: "pensioner-stables",
    num: "04",
    tag: "Архитектура",
    title: "Пенсионерские конюшни",
    meta: "Исторический хозяйственный комплекс парка",
    image: stablesCard,
    verticals: [stablesV1, stablesV2],
    description:
      "Пенсионерские конюшни — исторический хозяйственный объект, связанный с содержанием лошадей при императорском дворе. Архитектура комплекса сочетает функциональность и эстетику, характерную для ансамбля Александровского парка. Сегодня локация раскрывает менее заметную сторону жизни парка и его инфраструктуры.",
  },
  {
    id: "chinese-theatre",
    num: "05",
    tag: "Архитектура",
    title: "Китайский театр",
    meta: "Руинированный театр в стиле шинуазри",
    image: chineseCard,
    verticals: [chineseV1, chineseV2],
    description:
      "Китайский театр — один из самых необычных архитектурных объектов Александровского парка, выполненный в стиле шинуазри. Сегодня сооружение находится в руинированном состоянии, что создаёт особую атмосферу времени и утраченной истории. Локация выделяется своей эстетикой и эмоциональным восприятием пространства.",
  },
  {
    id: "spanish-bunker",
    num: "06",
    tag: "История XX века",
    title: "Испанский ДОТ",
    meta: "Контрастный объект военной истории",
    image: bunkerCard,
    verticals: [bunkerV1, bunkerV2],
    description:
      "Испанский ДОТ — оборонительное сооружение, относящееся к более позднему историческому периоду. Объект резко контрастирует с классической архитектурой парка и раскрывает его многослойную историю. Благодаря своей неожиданности локация воспринимается как скрытый и необычный элемент маршрута.",
  },
  {
    id: "music-pavilion",
    num: "07",
    tag: "Архитектура",
    title: "Ламский павильон",
    meta: "Уединённый павильон с восточными мотивами",
    image: musicCard,
    verticals: [musicV1, musicV2],
    description:
      "Ламский павильон — архитектурный объект в восточном стиле, связанный с историей содержания лам при императорском дворе. Павильон расположен в более тихой части парка и сохраняет атмосферу спокойствия и уединения. Локация подчёркивает интерес эпохи к экзотическим культурам и необычным архитектурным решениям.",
  },
  {
    id: "great-pond",
    num: "08",
    tag: "Природа",
    title: "Александровская плотина",
    meta: "Инженерный элемент паркового ландшафта",
    image: pondCard,
    verticals: [pondV1, pondV2],
    description:
      "Александровская плотина — инженерное сооружение, регулирующее уровень воды в водоёмах парка. Помимо функциональной роли, плотина влияет на визуальное восприятие пространства, формируя линии воды, отражения и перспективы. Это одна из менее заметных, но важных частей паркового ансамбля.",
  },
  {
    id: "sculpture-route",
    num: "09",
    tag: "Природа",
    title: "Грот",
    meta: "Атмосферное пространство внутри ландшафта",
    image: sculptureCard,
    verticals: [sculptureV1, sculptureV2],
    description:
      "Природный грот — элемент ландшафтной архитектуры, имитирующий естественное углубление или пещеру. Такие объекты создавались для усиления ощущения живой природы внутри паркового пространства. Локация отличается атмосферностью, тишиной и ощущением самостоятельного открытия.",
  },
  {
    id: "lion-bridge",
    num: "10",
    tag: "История",
    title: "Детский домик",
    meta: "Камерное пространство императорской семьи",
    image: lionCard,
    verticals: [lionV1, lionV2],
    description:
      "Детский домик — небольшое сооружение, созданное для игр и воспитания детей императорской семьи. Локация отличается уютным масштабом и раскрывает более личную сторону жизни парка. Именно такие детали помогают увидеть Александровский парк не только как прогулочное пространство, но и как часть повседневной истории.",
  },
];

export type QuestStage = {
  num: number;
  title: string;
  hint: string;
  question: string;
  placeholder: string;
  answer: string; // lowercase, trimmed for compare
};

export const questStages: QuestStage[] = [
  {
    num: 1,
    title: "Испанский ДОТ",
    hint: "Найдите старый бетонный ДОТ, спрятанный среди деревьев Александровского парка. Осмотрите надписи на стенах.",
    question: "Какое слово чаще всего повторяется на надписи?",
    placeholder: "Введи слово",
    answer: "победа",
  },
  {
    num: 2,
    title: "Плотина",
    hint: "Двигайтесь к плотине — здесь шум воды слышен ещё издалека. Внимательно осмотрите конструкцию.",
    question: "Сколько потоков воды выходит из плотины?",
    placeholder: "Числом",
    answer: "2",
  },
  {
    num: 3,
    title: "Пенсионерские конюшни",
    hint: "Рядом с конюшнями найдите старую могилу вороной кобылы Фенаморы.",
    question: "Введите год смерти Фенаморы.",
    placeholder: "Год",
    answer: "1877",
  },
  {
    num: 4,
    title: "Грот-родник",
    hint: "Найдите каменный грот среди деревьев и внимательно посмотрите на арочный свод.",
    question: "Сколько камней в арке грота?",
    placeholder: "Числом",
    answer: "11",
  },
  {
    num: 5,
    title: "Слоновьи ворота",
    hint: "Найдите знаменитые ворота парка с двумя симметричными башнями.",
    question: "Сколько башен у ворот?",
    placeholder: "Числом",
    answer: "2",
  },
  {
    num: 6,
    title: "Башня Шапель",
    hint: "Подойдите к высокой готической башне — одной из самых заметных точек парка.",
    question: "Сколько шпилей у башни?",
    placeholder: "Числом",
    answer: "9",
  },
  {
    num: 7,
    title: "Китайский театр",
    hint: "Найдите руины старинного театра среди открытой поляны в восточной части парка.",
    question: "В каком стиле построен театр?",
    placeholder: "Одно слово",
    answer: "шинуазри",
  },
  {
    num: 8,
    title: "Детский домик",
    hint: "Финальная точка маршрута находится на острове посреди воды.",
    question: "С помощью чего можно добраться до домика?",
    placeholder: "Одно слово",
    answer: "лодка",
  },
];
