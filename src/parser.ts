import { TArray } from '@cckim/types'
import { Token, Tokenize, TokenType } from './lexer'

export enum NodeType {
  Program,
  BinaryExpression,
  NumbericLiteral
}

export interface Statement {
  kind: NodeType
}

export interface Expression extends Statement {}

export type Program<Body extends Statement[]> = {
  kind: NodeType.Program,
  body: Body
}

export type BinaryExpression<Left extends Expression, Right extends Expression, Operator extends string> = {
  kind: NodeType.BinaryExpression,
  left: Left,
  right: Right,
  operator: Operator
}

export type NumbericLiteral<Value extends string> = {
  kind: NodeType.NumbericLiteral,
  value: Value
}

type ParseExpression<Tokens extends Token<TokenType, string>[]> = ParseAdditiveExpression<Tokens>

type AdditiveOperator = '+' | '-'
type ParseAdditiveExpression<
  Tokens extends Token<TokenType, string>[],
  Left extends Expression = ParseMultiplictaveExpression<Tokens>,
  EatTokens extends Token<TokenType, string>[] = TArray.Tail<Tokens>,
  SecondToken extends Token<TokenType, string> = TArray.TupleFirst<EatTokens>,
  Eat2Tokens extends Token<TokenType, string>[] = TArray.Tail<EatTokens>
> =  EatTokens['length'] extends 0
      ? Left
      : SecondToken['value'] extends AdditiveOperator
        ? ParseAdditiveExpression<Eat2Tokens, BinaryExpression<
            Left,
            ParseMultiplictaveExpression<Eat2Tokens>,
            SecondToken['value']
          >>
        : Left

type MultiplictaveOperator = '*' | '/' | '%'
type ParseMultiplictaveExpression<
  Tokens extends Token<TokenType, string>[], 
  Left extends Expression = ParsePrimaryExpression<Tokens>,
  EatTokens extends Token<TokenType, string>[] = TArray.Tail<Tokens>,
  SecondToken extends Token<TokenType, string> = TArray.TupleFirst<EatTokens>,
  Eat2Tokens extends Token<TokenType, string>[] = TArray.Tail<EatTokens>
> = EatTokens['length'] extends 0
      ? Left
      : SecondToken['value'] extends MultiplictaveOperator
        ? ParseAdditiveExpression<Eat2Tokens,  BinaryExpression<
            Left,
            ParsePrimaryExpression<Eat2Tokens>,
            SecondToken['value']
          >>
        : Left
      
type ParsePrimaryExpression<
  Tokens extends Token<TokenType, string>[], 
  FirstToken extends Token<TokenType, string> = TArray.TupleFirst<Tokens>
  > = 
  FirstToken['type'] extends TokenType.Number ? NumbericLiteral<FirstToken['value']> :
  FirstToken['type'] extends TokenType.OpenParen ? ParseExpression<TArray.Tail<Tokens>> :
  FirstToken['type'] extends TokenType.CloseParen ? ParseExpression<TArray.Tail<Tokens>>
  : never

export type Parser<Tokens extends Token<TokenType, string>[]> = Program<[ParseExpression<Tokens>]>
