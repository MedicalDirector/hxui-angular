import { latinMap } from './latin-map';

export function latinize(str: string): string {
  if (!str) {
    return '';
  }
  return str.replace(/[^A-Za-z0-9[\] ]/g, function (a: string): string {
    return latinMap[a] || a;
  });
}

export function escapeRegexp(queryToEscape: string): string {
  // Regex: capture the whole query string and replace it with the string
  // that will be used to match the results, for example if the capture is
  // 'a' the result will be \a
  return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}

/* eslint-disable */
export function tokenize(
  str: string,
  wordRegexDelimiters = ' ',
  phraseRegexDelimiters = ''
): Array<string> {
  /* eslint-enable */
  const regexStr: string =
    '(?:[' +
    phraseRegexDelimiters +
    '])([^' +
    phraseRegexDelimiters +
    ']+)(?:[' +
    phraseRegexDelimiters +
    '])|([^' +
    wordRegexDelimiters +
    ']+)';
  const preTokenized: string[] = str.split(new RegExp(regexStr, 'g'));
  const result: string[] = [];
  const preTokenizedLength: number = preTokenized.length;
  let token: string;
  const replacePhraseDelimiters = new RegExp(
    '[' + phraseRegexDelimiters + ']+',
    'g'
  );

  for (let i = 0; i < preTokenizedLength; i += 1) {
    token = preTokenized[i];
    if (token && token.length && token !== wordRegexDelimiters) {
      result.push(token.replace(replacePhraseDelimiters, ''));
    }
  }

  return result;
}

export function getValueFromObject(object: any, option: string): string {
  if (!option || typeof object !== 'object') {
    return object.toString();
  }

  if (option.endsWith('()')) {
    const functionName = option.slice(0, option.length - 2);
    return object[functionName]().toString();
  }

  const properties: string = option
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '');
  const propertiesArray: string[] = properties.split('.');

  for (const property of propertiesArray) {
    if (property in object) {
      object = object[property];
    }
  }
  return object.toString();
}
