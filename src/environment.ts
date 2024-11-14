export interface Environment<T> {
  lookup(x: string, env: Environment<T>): T | undefined;
  isDefined(x: string, env: Environment<T>): boolean;
  declare(x: string, v: T, env: Environment<T>): void;
  newEnv: <T>() => Environment<T>;

  env: Map<string, T>;
}

function lookup<T>(x: string, env: Environment<T>): T | undefined {
  // 1. Return the value of the variable specified in parameter `x` in the environment specified in the parameter `env`.
  return env.env.get(x);
}

function isDefined<T>(x: string, env: Environment<T>): boolean {
  // 1. Return a Boolean value that represents whether an environment specified in parameter `x` has a variable specified in the parameter `x`.
  // TODO: YOUR CODE HERE // Hint: You can find which methods to use at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  //self implemented
  return env.env.has(x);
}

function declare<T>(x: string, v: T, env: Environment<T>): void {
  // 1. Add a variable represented by the parameter `x` into the environment represented by the parameters `env`.
  // TODO: YOUR CODE HERE // Hint: You can find which methods to use at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
  //self implemented
  env.env.set(x, v);
}

export function newEnv<T>(): Environment<T> {
  return {
    lookup,
    isDefined,
    declare,
    newEnv,
    env: new Map(),
  };
}
