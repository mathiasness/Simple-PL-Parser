// YOU ARE NOT SUPPOSED TO MODIFY THIS FILE.






















// An interface that represents what a token (lexeme) is.
// Examples of tokens: keyword `let`, opening parenthesis, closing parenthesis, number, identifier, etc.
export interface Token {
  kind: TokenKind;
  value: string;
}

// A type that represents possible kinds of tokens.
export type TokenKind =
  | "OpMulDiv"
  | "OpAddSub"
  | "Equals"
  | "OpeningBracket"
  | "ClosingBracket"
  | "Separator"
  | "Number"
  | "Identifier"
  | "PhysicalUnit"
  | "KeywordLet";

const units = [
  "g",
  "kg",
  "m",
  "km",
  "min",
  "s",
  "h",
  "km/h",
  "km/s",
  "km/min",
  "m/h",
  "m/s",
  "m/min",
];

export class Tokenizer {
  private tokens: Token[] = [];
  private current = -1; // Have to start at -1 because first iteration advances

  //
  constructor(private source: string) {}

  //
  tokenize(): Token[] {
    while (this.current < this.source.length - 1) {
      this.scanToken();
    }
    return this.tokens;
  }

  //
  private scanToken() {
    const char = this.advance();

    switch (char) {
      case "+":
      case "-":
        this.consumeToken("OpAddSub", char);
        break;
      case "/":
      case "*":
        this.consumeToken("OpMulDiv", char);
        break;
      case "=":
        this.consumeToken("Equals", char);
        break;
      case "[":
        this.consumeUnit();
        break;
      case "(":
        this.consumeToken("OpeningBracket", char);
        break;
      case ")":
        this.consumeToken("ClosingBracket", char);
      case " ":
      case "\n":
        break;
      case ";":
        this.consumeToken("Separator", ";");
        break;
      default:
        if (this.isAlpha(char)) {
          this.consumeAlpha();
        } else if (this.isNumerical(char)) {
          this.consumeNumber();
        } else {
          throw new Error("Invalid token");
        }
        break;
    }
  }

  //
  private consumeNumber() {
    let numberWord = "";

    while (true) {
      numberWord += this.getCurrent();
      if (!this.isNumerical(this.peek(1))) {
        break;
      }
      this.current += 1;
    }

    this.consumeToken("Number", numberWord);
  }

  //
  private consumeAlpha() {
    let word = "";

    while (true) {
      word += this.getCurrent();

      if (!this.isAlpha(this.peek(1))) {
        break;
      }

      this.current += 1;
    }
    if (word === "let") {
      this.consumeToken("KeywordLet", word);
    } else {
      this.consumeToken("Identifier", word);
    }
  }

  //
  private consumeUnit() {
    this.current += 1;
    let unit = "";
    while (this.isAlpha(this.getCurrent()) || this.getCurrent() === "/") {
      unit += this.getCurrent();
      this.current += 1;
    }
    this.consumeToken("PhysicalUnit", unit);
  }

  //
  private getCurrent() {
    return this.source[this.current];
  }

  //
  private peek(x: number) {
    return this.source[this.current + x];
  }

  // 
  private consumeToken(tokenType: TokenKind, token: string) {
    this.tokens.push({ kind: tokenType, value: token });
  }

  //
  private advance(): string {
    this.current += 1;
    return this.source[this.current];
  }

  //
  private isAlpha(val: string): boolean {
    let alphabet = new Set(
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_".split("")
    );
    return alphabet.has(val);
  }

  //
  private isNumerical(char: string): boolean {
    let numbers = new Set("1234567890".split(""));
    return numbers.has(char);
  }
}
