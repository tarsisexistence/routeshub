import * as ts from 'typescript';

export const findClassDeclaration = (
  className: string,
  sourceFile: ts.SourceFile
): ts.ClassDeclaration | null => {
  let classDeclaration: ts.ClassDeclaration | null = null;

  function visitor(node: ts.Node): void {
    if (classDeclaration) {
      return;
    }

    if (ts.isIdentifier(node) && node.text === className) {
      const { parent } = node;
      if (ts.isClassDeclaration(parent)) {
        classDeclaration = parent;
      }
    } else {
      node.forEachChild(visitor);
    }
  }

  sourceFile.forEachChild(visitor);
  return classDeclaration;
};
