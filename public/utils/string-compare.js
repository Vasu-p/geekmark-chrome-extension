const r = class {
  sortMatch(e, t) {
    return (
      r.checkThanosType(e),
      r.checkAvengersType(t),
      t
        .map((c, s) => ({ member: c, index: s, rating: this.similarity(e, c) }))
        .sort((c, s) => c.rating - s.rating)
    );
  }
  static checkThanosType(e) {
    if (typeof e != 'string')
      throw new Error('first argument should be a string');
  }
  static checkRivalType(e) {
    if (typeof e != 'string')
      throw new Error('second argument should be a string');
  }
  static checkAvengersType(e) {
    if (!Array.isArray(e))
      throw new Error('second argument should be an array of strings');
    if (e.find((t) => typeof t != 'string'))
      throw new Error('second argument should be an array of strings');
  }
  static initParams(e, t) {
    return [
      e.replace(/\s+/g, '').toLowerCase(),
      t.replace(/\s+/g, '').toLowerCase(),
    ];
  }
};
const u = class extends r {
  constructor() {
    super();
  }
  similarity(e, t) {
    if (
      (r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]),
      !e.length && !t.length)
    )
      return 1;
    if (!e.length || !t.length) return 0;
    if (e === t) return 1;
    let c = Array.from(new Set(e.split('').concat(t.split('')))),
      s = u.stringVectorization(e.split(''), c),
      n = u.stringVectorization(t.split(''), c),
      [m, i, l] = [0, 0, 0];
    for (let p = 0; p < s.length; ++p)
      (m += s[p] * n[p]), (i += s[p] * s[p]), (l += n[p] * n[p]);
    return (i = Math.sqrt(i)), (l = Math.sqrt(l)), (1 * m) / (i * l);
  }
  distance(e, t) {
    return 1 - this.similarity(e, t);
  }
  static stringVectorization(e, t) {
    return t.map((c) => (e.includes(c) ? 1 : 0));
  }
};
const y = class extends r {
  constructor() {
    super();
  }
  similarity(e, t) {
    r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]);
    let [c, s] = [e.length, t.length];
    if ((!e.length && !t.length) || e === t) return 1;
    if (c < 2 || s < 2) return 0;
    let n = new Map();
    for (let i = 0; i < c - 1; i++) {
      let l = e.substr(i, 2),
        p = n.has(l) ? n.get(l) + 1 : 1;
      n.set(l, p);
    }
    let m = 0;
    for (let i = 0; i < s - 1; i++) {
      let l = t.substr(i, 2),
        p = n.has(l) ? n.get(l) : 0;
      p > 0 && (n.set(l, p - 1), ++m);
    }
    return (2 * m) / (c + s - 2);
  }
  distance(e, t) {
    return 1 - this.similarity(e, t);
  }
};
const h = class extends r {
  constructor() {
    super();
  }
  similarity(e, t) {
    if (
      (r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]),
      (!e.length && !t.length) || e === t)
    )
      return 1;
    let c = new Set(e.split('').concat(t.split(''))),
      s = new Set(e.split('').filter((n) => new Set(t).has(n)));
    return (1 * s.size) / c.size;
  }
  distance(e, t) {
    return 1 - this.similarity(e, t);
  }
};

const v = class extends r {
  constructor() {
    super();
  }
  similarity(e, t) {
    if (
      (r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]),
      (!e.length && !t.length) || e === t)
    )
      return 1;
    let s = new Set(e.split('').filter((n) => new Set(t).has(n)));

    return (1 * s.size) / Math.min(e.split('').length, t.split('').length);
  }
  distance(e, t) {
    return 1 - this.similarity(e, t);
  }
};

const d = class extends r {
  constructor() {
    super();
  }
  similarity(e, t) {
    return (
      r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]),
      !e.length && !t.length
        ? 1
        : 1 - (1 * this.distance(e, t)) / Math.max(e.length, t.length)
    );
  }
  distance(e, t) {
    if (
      (r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]),
      e === t)
    )
      return 0;
    let [c, s] = [e.length, t.length];
    if (!c) return s;
    if (!s) return c;
    let n = [...Array(c + 1)].map(() => Array(s + 1).fill(0));
    for (let i = 0; i <= c; ++i) n[i][0] = i;
    for (let i = 0; i <= s; ++i) n[0][i] = i;
    let m;
    for (let i = 1; i <= c; ++i)
      for (let l = 1; l <= s; ++l)
        (m = e[i - 1] === t[l - 1] ? 0 : 1),
          (n[i][l] = Math.min(
            n[i - 1][l] + 1,
            n[i][l - 1] + 1,
            n[i - 1][l - 1] + m
          ));
    return n[c][s];
  }
};
const f = class extends r {
  constructor() {
    super();
  }
  similarity(e, t) {
    return (
      r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]),
      (!e.length && !t.length) || e === t
        ? 1
        : (2 * f.lcsLength(e, t)) / (e.length + t.length)
    );
  }
  distance(e, t) {
    return e.length + t.length - 2 * f.lcsLength(e, t);
  }
  static lcsLength(e, t) {
    r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]);
    let [c, s] = [e.length, t.length],
      n = [...Array(c + 1)].map(() => Array(s + 1).fill(0));
    for (let m = 1; m <= c; ++m)
      for (let i = 1; i <= s; ++i)
        n[m][i] =
          e[m - 1] === t[i - 1]
            ? n[m - 1][i - 1] + 1
            : Math.max(n[m][i - 1], n[m - 1][i]);
    return n[c][s];
  }
};
const a = class extends r {
  constructor() {
    super();
  }
  similarity(e, t) {
    return (
      r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]),
      (!e.length && !t.length) || e === t
        ? 1
        : (1 * a.lcsLength(e, t)) / Math.min(e.length, t.length)
    );
  }
  distance(e, t) {
    return (
      r.checkThanosType(e),
      r.checkRivalType(t),
      e === t ? 0 : 1 - this.similarity(e, t)
    );
  }
  static lcsLength(e, t) {
    r.checkThanosType(e),
      r.checkRivalType(t),
      (e = r.initParams(e, t)[0]),
      (t = r.initParams(e, t)[1]);
    let [c, s] = [e.length, t.length],
      n = [...Array(c + 1)].map(() => Array(s + 1).fill(0));
    for (let m = 1; m <= c; ++m)
      for (let i = 1; i <= s; ++i)
        n[m][i] =
          e[m - 1] === t[i - 1]
            ? n[m - 1][i - 1] + 1
            : Math.max(n[m][i - 1], n[m - 1][i]);
    return n[c][s];
  }
};

const compose = class extends r {
  constructor(sim1, sim2) {
    super();
    this.sim1 = sim1;
    this.sim2 = sim2;
  }
  similarity(e, t) {
    return this.sim1.similarity(e, t) * this.sim2.similarity(e, t);
  }
  distance(e, t) {
    return 1 - this.similarity(e, t);
  }
};

// needle.length * haystack.length
// needle.length + haystack.length
// TODO improve by checking haystack from behind 1 char at time and finding first char that matches it in needle going right to left

const isPartOf = function (needle, haystack) {
  let [l_n, l_h] = [needle.length, haystack.length],
    dp = [...Array(l_h + 1)].map(() => Array(l_n + 1).fill(false));
  // needle = clba haystack = claims-backend
  // needle = kmsi haystack = claims-backend
  // dp[i][j] = does haystack[i:end] include needle[j:end]
  for (let i = 0; i < l_n; i++) {
    dp[l_h][i] = false;
  }
  for (let i = 0; i < l_h; i++) {
    dp[i][l_n] = true;
  }
  for (let i = l_h - 1; i >= 0; i--) {
    dp[i][l_n - 1] = dp[i + 1][l_n - 1] || haystack[i] === needle[l_n - 1];
  }
  for (let j = l_n - 2; j >= 0; j--) {
    for (let i = l_h - 1; i >= 0; i--) {
      dp[i][j] =
        (haystack[i] === needle[j] && dp[i + 1][j + 1]) || dp[i + 1][j];
    }
  }

  return dp[0][0];
};

const J = new u(),
  F = new y(),
  G = new h(),
  H = new d(),
  K = new f(),
  N = new a(),
  O = new v();

export {
  J as cosine,
  F as diceCoefficient,
  G as jaccardIndex,
  K as lcs,
  H as levenshtein,
  N as mlcs,
  O as overlap,
  isPartOf,
  compose,
};
