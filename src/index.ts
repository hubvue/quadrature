import { Compile } from "./compiler";
import { Parser } from "./parser";
import { Tokenize } from './lexer'

type Run<SourceCode extends string> = Compile<Parser<Tokenize<SourceCode>>>

export {
  Run,
  Tokenize,
  Parser,
  Compile
}
