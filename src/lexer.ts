import { TString, TArray } from '@cckim/types'

export enum TokenType {
  Number,
  Operator,
  OpenParen,
  CloseParen,
}

type GetTokenType<T extends string> = 
  T extends '+' | '-' | '*' | '/' | '%' ? TokenType.Operator :
  T extends '(' ? TokenType.OpenParen :
  T extends ')' ? TokenType.CloseParen :
  TokenType.Number


export type Token<T extends TokenType, V extends string> = {
  type: T,
  value: V
}

type IsSkippable<T extends string> = T extends '' | ' ' | '\n' | '\t' ? true : false

type SrcEach<Src extends string[], Tokens extends Token<TokenType, string>[] = []> =
  Src['length'] extends 0
    ? Tokens
    : IsSkippable<TArray.TupleFirst<Src>> extends true
      ? SrcEach<TArray.Tail<Src>, Tokens>
      : SrcEach<TArray.Tail<Src>, [...Tokens, Token<GetTokenType<TArray.TupleFirst<Src>>, TArray.TupleFirst<Src>>]>


export type Tokenize<SourceCode extends string, Src extends string[] = TString.Split<SourceCode, "">> = SrcEach<Src>
