import { BinaryExpression, Expression, NumbericLiteral, Program } from "./parser"
import { NumstrToArray } from "./utils"

type CompileNode<Node extends Expression> = 
  Node extends BinaryExpression<Expression, Expression, string> 
    ? Node['left'] extends BinaryExpression<Expression, Expression, string>
      ? Node['right'] extends BinaryExpression<Expression, Expression, string>
        ? Operator<CompileNode<Node['left']>, CompileNode<Node['right']>, Node['operator']>
        : Node['right'] extends NumbericLiteral<string>
          ? Operator<CompileNode<Node['left']>, Node['right']['value'], Node['operator']>
          : string
      : Node['left'] extends NumbericLiteral<string>
        ? Node['right'] extends BinaryExpression<Expression, Expression, string>
          ? Operator<Node['left']['value'], CompileNode<Node['right']>, Node['operator']>
          : Node['right'] extends NumbericLiteral<string>
            ? Operator<Node['left']['value'], Node['right']['value'], Node['operator']>
            : string
        : string
    : Node extends NumbericLiteral<string>
      ? Node['value']
      : never


type Operator<Left extends string, Right extends string, Op extends string> = 
  Op extends '+' ? Add<Left, Right> :
  Op extends '-' ? Subtract<Left, Right> :
  Op extends '*' ? Multiply<Left, Right> :
  Op extends '/' ? Divide<Left, Right> :
  Op extends '%' ? Modulo<Left, Right> :
  never

type Add<Left extends string, Right extends string> = [...NumstrToArray<Left>, ...NumstrToArray<Right>]['length']

type Subtract<Left extends string, Right extends string> = Left

type Multiply<Left extends string, Right extends string> = Left

type Divide<Left extends string, Right extends string> = Left

type Modulo<Left extends string, Right extends string> = Left


export type Compile<P extends Program<Expression[]>, Node extends Expression = P['body'][0]> = CompileNode<Node>
