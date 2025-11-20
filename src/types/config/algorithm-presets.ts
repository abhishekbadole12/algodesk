import { Algorithm } from "../enum/algorithm.enum";

export interface AlgorithmPreset {
  code: Algorithm;
  label: string;
  target: number;
  stoploss: number;
  active: boolean;
}

export const ALGORITHM_PRESETS: AlgorithmPreset[] = [
  {
    code: Algorithm.TARGET_1_STOPLOSS_1,
    label: "Target ₹1 / SL ₹1",
    target: 1,
    stoploss: 1,
    active: true,
  },
  {
    code: Algorithm.TARGET_2_STOPLOSS_1,
    label: "Target ₹2 / SL ₹1",
    target: 2,
    stoploss: 1,
    active: true,
  },
  {
    code: Algorithm.TARGET_3_STOPLOSS_1_5,
    label: "Target ₹3 / SL ₹1.5",
    target: 3,
    stoploss: 1.5,
    active: true,
  },
  {
    code: Algorithm.SCALP_MODE,
    label: "Target ₹0.5 / SL ₹0.25",
    target: 0.5,
    stoploss: 0.25,
    active: true,
  },
  {
    code: Algorithm.CUSTOM,
    label: "Manually set target & SL",
    target: 0,
    stoploss: 0,
    active: true,
  },
  {
    code: Algorithm.SWING_MODE,
    label: "Target ₹5 / SL ₹2",
    target: 5,
    stoploss: 2,
    active: true,
  },
];
