import MacAndCheese from "../image/mac-and-cheese.jpg";
import MargaritaPizza from "../image/margherita-pizza.jpg";
import CaesarSalad from "../image/caesar-salad.jpg";
import SphaghettiCarbonara from "../image/spaghetti-carbonara.jpg";
import VeggieBurger from "../image/veggie-burger.jpg";
import GrilledChickenSandwich from "../image/grilled-chicken-sandwich.jpg";
import SteakFrites from "../image/steak-frites.jpg";
import SushiRollPlatter from "../image/sushi-roll-platter.jpg";
import ChickenCurry from "../image/chicken-curry.jpg";
import VeganBuddhaBowl from "../image/vegan-buddha-bowl.jpg";
import SeaFoodPaella from "../image/seafood-paella.jpg";
import PancakeStack from "../image/pancake-stack.jpg";
import MisoRamen from "../image/miso-ramen.jpg";
import BeefTacos from "../image/beef-tacos.jpg";
import ChocolateBrownie from "../image/chocolate-brownie.jpg";
import LobsterBisque from "../image/lobster-bisque.jpg";
import MushroomRisotto from "../image/mushroom-risotto.jpg";
import EggplantParmesan from "../image/eggplant-parmesan.jpg";
import LemonCheesecake from "../image/lemon-cheesecake.jpg";
import FalafelWrap from "../image/falafel-wrap.jpg";

const meals = [
  {
    id: "m1",
    name: "Mac & Cheese",
    price: "8.99",
    description:
      "Djathë cheddar kremoz i përzier me makarona të gatuara perfekt, i mbuluar me thërrime buke krokante.",
    image: MacAndCheese,
  },
  {
    id: "m2",
    name: "Margherita Pizza",
    price: "12.99",
    description:
      "Një picë klasike me mozzarella të freskët, domate dhe borzilok mbi një bazë të hollë dhe krokante.",
    image: MargaritaPizza,
  },
  {
    id: "m3",
    name: "Caesar Salad",
    price: "7.99",
    description:
      "Sallatë romaine e përzier me salcë Caesar, e shoqëruar me krutona dhe copa djathi parmesan.",
    image: CaesarSalad,
  },
  {
    id: "m4",
    name: "Spaghetti Carbonara",
    price: "10.99",
    description:
      "Spageti të gatuara al dente me një salcë kremoze të bërë nga e verdha e vezës, djathë pecorino, panceta dhe piper.",
    image: SphaghettiCarbonara,
  },
  {
    id: "m5",
    name: "Veggie Burger",
    price: "9.99",
    description:
      "Burger me perime të lëngshme i servirur në bukë integrale me sallatë jeshile, domate dhe një salcë të shijshme.",
    image: VeggieBurger,
  },
  {
    id: "m6",
    name: "Grilled Chicken Sandwich",
    price: "10.99",
    description:
      "Fileto pule e pjekur në skarë me avokado, proshutë, sallatë jeshile dhe salcë mustardë me mjaltë në bukë të thekur.",
    image: GrilledChickenSandwich,
  },
  {
    id: "m7",
    name: "Steak Frites",
    price: "17.99",
    description:
      "Biftek i lëngshëm i gatuar sipas preferencës suaj, i shoqëruar me patate të skuqura krokante dhe gjalpë me erëza.",
    image: SteakFrites,
  },
  {
    id: "m8",
    name: "Sushi Roll Platter",
    price: "15.99",
    description:
      "Një përzgjedhje sushi të freskët që përfshin California Roll, Spicy Tuna dhe Eel Avocado.",
    image: SushiRollPlatter,
  },
  {
    id: "m9",
    name: "Chicken Curry",
    price: "13.99",
    description:
      "Copëza pule të buta të gatuara në një salcë curry të pasur dhe aromatike, të shoqëruara me oriz basmati.",
    image: ChickenCurry,
  },
  {
    id: "m10",
    name: "Vegan Buddha Bowl",
    price: "11.99",
    description:
      "Një tas i pasur me quinoa, perime të pjekura, avokado dhe salcë tahini.",
    image: VeganBuddhaBowl,
  },
  {
    id: "m11",
    name: "Seafood Paella",
    price: "19.99",
    description:
      "Një specialitet spanjoll me oriz të aromatizuar me shafran, karkaleca, midhje dhe chorizo.",
    image: SeaFoodPaella,
  },
  {
    id: "m12",
    name: "Pancake Stack",
    price: "8.99",
    description:
      "Pancakes të buta të vendosura njëra mbi tjetrën, me shurup panje dhe manaferra të freskëta.",
    image: PancakeStack,
  },
  {
    id: "m13",
    name: "Miso Ramen",
    price: "12.99",
    description:
      "Një tas ramen i ngrohtë me lëng miso, mish derri të butë, vezë të zier dhe qepë të njoma.",
    image: MisoRamen,
  },
  {
    id: "m14",
    name: "Beef Tacos",
    price: "9.99",
    description:
      "Tre tortilla të buta të mbushura me mish viçi të aromatizuar, salsa të freskët, djathë dhe krem kosi.",
    image: BeefTacos,
  },
  {
    id: "m15",
    name: "Chocolate Brownie",
    price: "5.99",
    description:
      "Brownie çokollate e pasur dhe e butë, e shërbyer me një top akullore vanilje dhe salcë çokollate.",
    image: ChocolateBrownie,
  },
  {
    id: "m16",
    name: "Lobster Bisque",
    price: "14.99",
    description:
      "Supë kremoze e bërë nga lëngu i karavidhes, perime aromatike dhe një prekje brandy.",
    image: LobsterBisque,
  },
  {
    id: "m17",
    name: "Mushroom Risotto",
    price: "13.99",
    description:
      "Oriz Arborio kremoz i gatuar me një përzierje kërpudhash të egra dhe i përfunduar me djathë parmesan.",
    image: MushroomRisotto,
  },
  {
    id: "m18",
    name: "Eggplant Parmesan",
    price: "11.99",
    description:
      "Shtresa patëllxhani të skuqur me salcë domateje dhe djathë mozzarella dhe parmesan të shkrirë.",
    image: EggplantParmesan,
  },
  {
    id: "m19",
    name: "Lemon Cheesecake",
    price: "6.99",
    description:
      "Cheesecake kremoz me shije limoni, i shërbyer mbi një bazë biskote të thërrmuar.",
    image: LemonCheesecake,
  },
  {
    id: "m20",
    name: "Falafel Wrap",
    price: "8.99",
    description:
      "Falafel krokant i mbështjellë në pita të ngrohtë me sallatë jeshile, domate dhe salcë tahini.",
    image: FalafelWrap,
  },
];

export default meals;
