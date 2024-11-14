// YOU ARE NOT SUPPOSED TO MODIFY THIS FILE.




















export type AstNode = Statement | Expr;

export type Expr = Additive | Multiplicative | PrimitiveExpr;

export type PrimitiveExpr = Identifier | MeasuredNumber | GroupExpr;

export type Statement = Assignment;

export type Operator = OpMulDiv | OpAddSub;

type NodeType =
  | "Multiplicative"
  | "Additive"
  | "PhysicalUnit"
  | "OpAddSub"
  | "OpMulDiv"
  | "MeasuredNumber"
  | "Identifier"
  | "GroupExpr"
  | "AssignmentStatement";

export interface NodeBase {
  nodeType: NodeType;
}

export interface OpMulDiv extends NodeBase {
  nodeType: "OpMulDiv";
  value: "*" | "/";
}

export interface OpAddSub extends NodeBase {
  value: "+" | "-";
}

export interface GroupExpr extends NodeBase {
  subExpr: Expr;
}

export interface MeasuredNumber extends NodeBase {
  numericalValue: number;
  unit: PhysicalUnit;
}

export interface Assignment extends NodeBase {
  assignee: Identifier;
  expr: Expr;
}

export interface Identifier extends NodeBase {
  name: string;
}

export interface Additive extends NodeBase {
  left: PrimitiveExpr | Multiplicative | Additive;
  op: Operator;
  right: PrimitiveExpr | Multiplicative;
}

export interface Multiplicative extends NodeBase {
  left: PrimitiveExpr | Multiplicative;
  op: Operator;
  right: PrimitiveExpr;
}

export interface PhysicalUnit extends NodeBase {
  kind: PhysicalUnitEnum;
  value: PhysicalUnitValues;
}

export type PhysicalUnitValues = Time | Mass | Distance | Velocity;

export enum PhysicalUnitEnum {
  Time,
  Mass,
  Distance,
  Velocity,
}

export type Time = "min" | "s" | "h";

export type Mass = "g" | "kg";

export type Distance = "m" | "km";

export type Velocity = "km/h" | "km/s" | "km/min" | "m/h" | "m/s" | "m/min";
