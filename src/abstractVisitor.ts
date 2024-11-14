// YOU ARE NOT SUPPOSED TO MODIFY THIS FILE.




















import { AstNode } from "./types";

export abstract class AbstractVisitor {
  abstract visit(node: AstNode): void;
}
