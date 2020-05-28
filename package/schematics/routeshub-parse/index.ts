import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

export function routeshubParse(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    console.log(_context, _options);
    return tree;
  };
}
