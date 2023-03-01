# quadrature
Quadrature, but of Typescript type and compilation principles.

## Tokenize
Parsing quadratic expressions into token sequences

```ts
type Tokens = Tokenize<'4 * 2 - (3 * (4 + 2))'>
```
output:
```ts
[
  Token<TokenType.Number, "4">, 
  Token<TokenType.Operator, "*">,
  Token<TokenType.Number, "2">, 
  Token<TokenType.Operator, "-">,
  Token<TokenType.OpenParen, "(">,
  Token<TokenType.Number, "3">,
  Token<TokenType.Operator, "*">,
  Token<TokenType.OpenParen, "(">,
  Token<TokenType.Number, "4">,
  Token<TokenType.Operator, "+">,
  Token<TokenType.Number, "2">,
  Token<TokenType.CloseParen, ")">
  Token<TokenType.CloseParen, ")">,
]
```


## Parser
Parsing token sequences into abstract syntax trees.

```ts
type AST = Parser<Tokens>
```

output:
```ts
{
    kind: NodeType.Program,
    body: [{
      kind: NodeType.BinaryExpression,
      left: {
          kind: NodeType.BinaryExpression,
          left: NumbericLiteral<"4">,
          right: NumbericLiteral<"2">,
          operator: "*"
      }
      right: {
          kind: NodeType.BinaryExpression,
          left: NumbericLiteral<"3">,
          right: {
              kind: NodeType.BinaryExpression,
              left: NumbericLiteral<"4">,
              right: NumbericLiteral<"2">,
              operator: "+",
          }
          operator: "*",
      }
      operator: "-"
    }]
}
```

## Compiler
The abstract syntax tree is parsed to produce the result.

> Currently only additive operations are supported.

```ts
type Str = '1 + 2'
type Result = Compiler<Parser<Tokenize<'1 + 2'>>> // 3
```

## Run
Compute the result from a string of four operations.

```ts
type Result = Run<'1 + 2'> // 3
```


