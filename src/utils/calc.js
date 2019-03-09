/* eslint-disable */
/**
 * @ 符号代替负号, 区别于减号
 */
import { numberFormat } from './figures';

const BASE = '@?\\d+(\\.\\d+)?(e[\\+\\-]\\d+)?';

const REGEXP = {
  mulDivAll: new RegExp(`${BASE}((\\/|\\*)${BASE})+`, 'g'),
  mulDiv: new RegExp(`(${BASE})|(\\/)|(\\*)`, 'g'),
  addSub: new RegExp(`(${BASE})|(\\+)|(-)`, 'g'),
  number: new RegExp(BASE, 'g'),
  whitespace: /\s/g,
  bracket: /\(|\)/g,
  bracketExp: /\([\d\.\+\-\*\/@]*\)/g,
  negative: /([\+\-\*\/\(]|^)(-)/g,
};

const FLAG = '@.@';
const SIGN = '@';

function execExpression(str, flag) {
  const matchs = str.match(flag === FLAG ? REGEXP.addSub : REGEXP.mulDiv);
  if (matchs.length <= 1) {
    return str;
  }
  return recursion(matchs, 0).replace(REGEXP.negative, `$1${SIGN}`);
}

function recursion(arr, result) {
  if (arr.length === 1) return String(result);
  const [numA, operator, numB] = arr;
  const max = findMaxPrecision(`${numA}InOrderToGetMaxPrecision${numB}`);
  const p = 10 ** max;
  const [calcA, calcB] = [numA, numB].map(num => num.toString().replace(SIGN, '-') * p);
  switch (operator) {
    case '+':
      result = (calcA + calcB) / p;
      break;
    case '-':
      result = (calcA - calcB) / p;
      break;
    case '*':
      result = (calcA * calcB) / p ** 2;
      break;
    case '/':
      result = calcA / calcB;
      break;
    default:
      break;
  }
  const newArr = [result, ...arr.slice(3)];
  return recursion(newArr, result);
}

function findMaxPrecision(str) {
  const precisions = str.match(REGEXP.number).map(o => {
    // 判断是否为科学计数法
    if (o.indexOf('e-') >= 0) {
      const [, precision] = o.split('e-');
      return precision;
    } else {
      const [, precision] = o.split('.');
      return precision ? precision.length : 0;
    }
  });
  return Math.max.apply(null, precisions);
}

export default class Calc {
  constructor(v) {
    this.hasErr = false;
    this.finalResult = null;
    this.value = this.validNumber(v, '');
  }

  add(v) {
    this.value += this.validNumber(v, '+');
    return this;
  }

  sub(v) {
    this.value += this.validNumber(v, '-');
    return this;
  }

  mul(v) {
    this.value += this.validNumber(v, '*');
    return this;
  }

  div(v) {
    this.value += this.validNumber(v, '/');
    return this;
  }

  startBracket(v) {
    this.value += `(${this.validNumber(v, '')}`;
    return this;
  }

  endBracket() {
    this.value += ')';
    return this;
  }

  expression(s) {
    this.value = s ? s.toString().replace(REGEXP.negative, `$1${SIGN}`) : '';
    return this;
  }

  exec() {
    if (this.hasErr) {
      console.error('计算表达式有误:' + this.value.replace(SIGN, '-'));
      return;
    }
    const haveBracketResult = this.value.replace(REGEXP.whitespace, '');
    // 计算小括号内的表达式
    const noBracketResult = haveBracketResult.replace(REGEXP.bracketExp, bracketResult =>
      this.calc(bracketResult),
    );
    // 计算不带小括号的表达式
    this.finalResult = this.calc(noBracketResult).replace(SIGN, '-');
  }

  format(precision = 4, needZero = false) {
    this.exec();
    return numberFormat(this.finalResult, precision, 'round', needZero);
  }

  calc(match) {
    const str = match.replace(REGEXP.bracket, '').replace(REGEXP.mulDivAll, execExpression);
    return execExpression(str, FLAG);
  }

  validNumber(v, o) {
    if (v === null || v === undefined) {
      return o;
    }
    const isValid =
      new RegExp(BASE).test(v) || (typeof v === 'number' && !isNaN(v) && Number.isFinite(v));
    if (isValid) {
      if (v === 0 && o === '/') {
        this.hasErr = true;
      }
    } else {
      this.hasErr = true;
    }
    return v >= 0 ? o + v : o + SIGN + Math.abs(v);
  }
}
