import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { existsSync, readFileSync } from 'fs';
import { dirname, resolve } from 'path';

const getTsConfig = (content: any): ts.ParsedCommandLine => {
  const parseConfigHost: ts.ParseConfigHost = {
    fileExists: existsSync,
    readDirectory: ts.sys.readDirectory,
    readFile: file => readFileSync(file, 'utf8'),
    useCaseSensitiveFileNames: true
  };

  return ts.parseJsonConfigFileContent(
    content,
    parseConfigHost,
    resolve(dirname('tsconfig.json')),
    {
      noEmit: true
    }
  );
};

const getProgram = (tsConfigContent: string): ts.Program => {
  const config = getTsConfig(tsConfigContent);
  const host = ts.createCompilerHost(config.options, true);
  return ts.createProgram(config.fileNames, config.options, host);
};

export function parse(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const config = tree.get('./tsconfig.json');
    if (!config) {
      throw new Error("tsconfig didn't find");
    }

    const content = config.content.toString();
    const program = getProgram(JSON.parse(content));
    const files = program.getSourceFiles();
    console.log(files);

    return tree;
  };
}
