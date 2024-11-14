import { interpret } from "./src/interpreter";

function main() {
  let sample = `
  let a = 10[kg] + 100[g];
  let b = 25[m] + 5[km] + (10[m] + 2[km]);
  let c = 3[km];
  let d = b + c;
  let e = b + 3[m];
  let f = 2[h] + 15[min] + 5[s] - 2[s] - 1[h];
  let g = 2[m/s] + 10[km/min] + 42[m/h];
  let blabla = b / f + g + 1[km/s];
  let a = a + 10[kg];
  `;

  let resultingEnv = interpret(sample);
  // The final Env for Evaluation
  for (let [varName, result] of resultingEnv.env.entries()) {
    console.log(varName, result.value, result.unit.value);
  }
}
main();
