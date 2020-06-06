import { existsSync, readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import * as ts from 'typescript';

const getTsConfig = (content: any, path: string): ts.ParsedCommandLine => {
  // todo maybe optimize it
  const parseConfigHost: ts.ParseConfigHost = {
    fileExists: existsSync,
    readDirectory: ts.sys.readDirectory,
    readFile: file => readFileSync(file, 'utf8'),
    useCaseSensitiveFileNames: true
  };

  return ts.parseJsonConfigFileContent(
    content,
    parseConfigHost,
    resolve(dirname(path)),
    {
      noEmit: true
    }
  );
};

export const getProgram = (
  tsConfigContent: string,
  path: string
): ts.Program => {
  const config = getTsConfig(tsConfigContent, path);
  const host = ts.createCompilerHost(config.options, true);
  return ts.createProgram(config.fileNames, config.options, host);
};
