function Of(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const o in r)
        if (o !== "default" && !(o in e)) {
          const i = Object.getOwnPropertyDescriptor(r, o);
          i &&
            Object.defineProperty(
              e,
              o,
              i.get ? i : { enumerable: !0, get: () => r[o] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const l of i.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && r(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(o) {
    const i = {};
    return (
      o.integrity && (i.integrity = o.integrity),
      o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : o.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(o) {
    if (o.ep) return;
    o.ep = !0;
    const i = n(o);
    fetch(o.href, i);
  }
})();
function Df(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Iu = { exports: {} },
  $o = {},
  Ou = { exports: {} },
  D = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var kr = Symbol.for("react.element"),
  jf = Symbol.for("react.portal"),
  Lf = Symbol.for("react.fragment"),
  Af = Symbol.for("react.strict_mode"),
  zf = Symbol.for("react.profiler"),
  Uf = Symbol.for("react.provider"),
  Mf = Symbol.for("react.context"),
  Bf = Symbol.for("react.forward_ref"),
  Ff = Symbol.for("react.suspense"),
  $f = Symbol.for("react.memo"),
  Hf = Symbol.for("react.lazy"),
  Ks = Symbol.iterator;
function bf(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ks && e[Ks]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Du = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  ju = Object.assign,
  Lu = {};
function Pn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Lu),
    (this.updater = n || Du);
}
Pn.prototype.isReactComponent = {};
Pn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Pn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Au() {}
Au.prototype = Pn.prototype;
function Vl(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Lu),
    (this.updater = n || Du);
}
var Wl = (Vl.prototype = new Au());
Wl.constructor = Vl;
ju(Wl, Pn.prototype);
Wl.isPureReactComponent = !0;
var Gs = Array.isArray,
  zu = Object.prototype.hasOwnProperty,
  Ql = { current: null },
  Uu = { key: !0, ref: !0, __self: !0, __source: !0 };
function Mu(e, t, n) {
  var r,
    o = {},
    i = null,
    l = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (l = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      zu.call(t, r) && !Uu.hasOwnProperty(r) && (o[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) o.children = n;
  else if (1 < s) {
    for (var a = Array(s), u = 0; u < s; u++) a[u] = arguments[u + 2];
    o.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) o[r] === void 0 && (o[r] = s[r]);
  return {
    $$typeof: kr,
    type: e,
    key: i,
    ref: l,
    props: o,
    _owner: Ql.current,
  };
}
function Vf(e, t) {
  return {
    $$typeof: kr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Kl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === kr;
}
function Wf(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Xs = /\/+/g;
function ui(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Wf("" + e.key)
    : t.toString(36);
}
function Jr(e, t, n, r, o) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var l = !1;
  if (e === null) l = !0;
  else
    switch (i) {
      case "string":
      case "number":
        l = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case kr:
          case jf:
            l = !0;
        }
    }
  if (l)
    return (
      (l = e),
      (o = o(l)),
      (e = r === "" ? "." + ui(l, 0) : r),
      Gs(o)
        ? ((n = ""),
          e != null && (n = e.replace(Xs, "$&/") + "/"),
          Jr(o, t, n, "", function (u) {
            return u;
          }))
        : o != null &&
          (Kl(o) &&
            (o = Vf(
              o,
              n +
                (!o.key || (l && l.key === o.key)
                  ? ""
                  : ("" + o.key).replace(Xs, "$&/") + "/") +
                e
            )),
          t.push(o)),
      1
    );
  if (((l = 0), (r = r === "" ? "." : r + ":"), Gs(e)))
    for (var s = 0; s < e.length; s++) {
      i = e[s];
      var a = r + ui(i, s);
      l += Jr(i, t, n, a, o);
    }
  else if (((a = bf(e)), typeof a == "function"))
    for (e = a.call(e), s = 0; !(i = e.next()).done; )
      (i = i.value), (a = r + ui(i, s++)), (l += Jr(i, t, n, a, o));
  else if (i === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return l;
}
function Dr(e, t, n) {
  if (e == null) return e;
  var r = [],
    o = 0;
  return (
    Jr(e, r, "", "", function (i) {
      return t.call(n, i, o++);
    }),
    r
  );
}
function Qf(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var pe = { current: null },
  Zr = { transition: null },
  Kf = {
    ReactCurrentDispatcher: pe,
    ReactCurrentBatchConfig: Zr,
    ReactCurrentOwner: Ql,
  };
function Bu() {
  throw Error("act(...) is not supported in production builds of React.");
}
D.Children = {
  map: Dr,
  forEach: function (e, t, n) {
    Dr(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Dr(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Dr(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Kl(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
D.Component = Pn;
D.Fragment = Lf;
D.Profiler = zf;
D.PureComponent = Vl;
D.StrictMode = Af;
D.Suspense = Ff;
D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kf;
D.act = Bu;
D.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = ju({}, e.props),
    o = e.key,
    i = e.ref,
    l = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (l = Ql.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (a in t)
      zu.call(t, a) &&
        !Uu.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var u = 0; u < a; u++) s[u] = arguments[u + 2];
    r.children = s;
  }
  return { $$typeof: kr, type: e.type, key: o, ref: i, props: r, _owner: l };
};
D.createContext = function (e) {
  return (
    (e = {
      $$typeof: Mf,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Uf, _context: e }),
    (e.Consumer = e)
  );
};
D.createElement = Mu;
D.createFactory = function (e) {
  var t = Mu.bind(null, e);
  return (t.type = e), t;
};
D.createRef = function () {
  return { current: null };
};
D.forwardRef = function (e) {
  return { $$typeof: Bf, render: e };
};
D.isValidElement = Kl;
D.lazy = function (e) {
  return { $$typeof: Hf, _payload: { _status: -1, _result: e }, _init: Qf };
};
D.memo = function (e, t) {
  return { $$typeof: $f, type: e, compare: t === void 0 ? null : t };
};
D.startTransition = function (e) {
  var t = Zr.transition;
  Zr.transition = {};
  try {
    e();
  } finally {
    Zr.transition = t;
  }
};
D.unstable_act = Bu;
D.useCallback = function (e, t) {
  return pe.current.useCallback(e, t);
};
D.useContext = function (e) {
  return pe.current.useContext(e);
};
D.useDebugValue = function () {};
D.useDeferredValue = function (e) {
  return pe.current.useDeferredValue(e);
};
D.useEffect = function (e, t) {
  return pe.current.useEffect(e, t);
};
D.useId = function () {
  return pe.current.useId();
};
D.useImperativeHandle = function (e, t, n) {
  return pe.current.useImperativeHandle(e, t, n);
};
D.useInsertionEffect = function (e, t) {
  return pe.current.useInsertionEffect(e, t);
};
D.useLayoutEffect = function (e, t) {
  return pe.current.useLayoutEffect(e, t);
};
D.useMemo = function (e, t) {
  return pe.current.useMemo(e, t);
};
D.useReducer = function (e, t, n) {
  return pe.current.useReducer(e, t, n);
};
D.useRef = function (e) {
  return pe.current.useRef(e);
};
D.useState = function (e) {
  return pe.current.useState(e);
};
D.useSyncExternalStore = function (e, t, n) {
  return pe.current.useSyncExternalStore(e, t, n);
};
D.useTransition = function () {
  return pe.current.useTransition();
};
D.version = "18.3.1";
Ou.exports = D;
var k = Ou.exports;
const ht = Df(k),
  Gf = Of({ __proto__: null, default: ht }, [k]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xf = k,
  Yf = Symbol.for("react.element"),
  Jf = Symbol.for("react.fragment"),
  Zf = Object.prototype.hasOwnProperty,
  qf = Xf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  ep = { key: !0, ref: !0, __self: !0, __source: !0 };
function Fu(e, t, n) {
  var r,
    o = {},
    i = null,
    l = null;
  n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (l = t.ref);
  for (r in t) Zf.call(t, r) && !ep.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: Yf,
    type: e,
    key: i,
    ref: l,
    props: o,
    _owner: qf.current,
  };
}
$o.Fragment = Jf;
$o.jsx = Fu;
$o.jsxs = Fu;
Iu.exports = $o;
var g = Iu.exports,
  $u = { exports: {} },
  Ce = {},
  Hu = { exports: {} },
  bu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(N, I) {
    var O = N.length;
    N.push(I);
    e: for (; 0 < O; ) {
      var G = (O - 1) >>> 1,
        ee = N[G];
      if (0 < o(ee, I)) (N[G] = I), (N[O] = ee), (O = G);
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var I = N[0],
      O = N.pop();
    if (O !== I) {
      N[0] = O;
      e: for (var G = 0, ee = N.length, Ir = ee >>> 1; G < Ir; ) {
        var Dt = 2 * (G + 1) - 1,
          ai = N[Dt],
          jt = Dt + 1,
          Or = N[jt];
        if (0 > o(ai, O))
          jt < ee && 0 > o(Or, ai)
            ? ((N[G] = Or), (N[jt] = O), (G = jt))
            : ((N[G] = ai), (N[Dt] = O), (G = Dt));
        else if (jt < ee && 0 > o(Or, O)) (N[G] = Or), (N[jt] = O), (G = jt);
        else break e;
      }
    }
    return I;
  }
  function o(N, I) {
    var O = N.sortIndex - I.sortIndex;
    return O !== 0 ? O : N.id - I.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var l = Date,
      s = l.now();
    e.unstable_now = function () {
      return l.now() - s;
    };
  }
  var a = [],
    u = [],
    h = 1,
    f = null,
    m = 3,
    y = !1,
    w = !1,
    _ = !1,
    S = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(N) {
    for (var I = n(u); I !== null; ) {
      if (I.callback === null) r(u);
      else if (I.startTime <= N)
        r(u), (I.sortIndex = I.expirationTime), t(a, I);
      else break;
      I = n(u);
    }
  }
  function v(N) {
    if (((_ = !1), p(N), !w))
      if (n(a) !== null) (w = !0), li(E);
      else {
        var I = n(u);
        I !== null && si(v, I.startTime - N);
      }
  }
  function E(N, I) {
    (w = !1), _ && ((_ = !1), d(T), (T = -1)), (y = !0);
    var O = m;
    try {
      for (
        p(I), f = n(a);
        f !== null && (!(f.expirationTime > I) || (N && !je()));

      ) {
        var G = f.callback;
        if (typeof G == "function") {
          (f.callback = null), (m = f.priorityLevel);
          var ee = G(f.expirationTime <= I);
          (I = e.unstable_now()),
            typeof ee == "function" ? (f.callback = ee) : f === n(a) && r(a),
            p(I);
        } else r(a);
        f = n(a);
      }
      if (f !== null) var Ir = !0;
      else {
        var Dt = n(u);
        Dt !== null && si(v, Dt.startTime - I), (Ir = !1);
      }
      return Ir;
    } finally {
      (f = null), (m = O), (y = !1);
    }
  }
  var P = !1,
    R = null,
    T = -1,
    $ = 5,
    j = -1;
  function je() {
    return !(e.unstable_now() - j < $);
  }
  function Dn() {
    if (R !== null) {
      var N = e.unstable_now();
      j = N;
      var I = !0;
      try {
        I = R(!0, N);
      } finally {
        I ? jn() : ((P = !1), (R = null));
      }
    } else P = !1;
  }
  var jn;
  if (typeof c == "function")
    jn = function () {
      c(Dn);
    };
  else if (typeof MessageChannel < "u") {
    var Qs = new MessageChannel(),
      If = Qs.port2;
    (Qs.port1.onmessage = Dn),
      (jn = function () {
        If.postMessage(null);
      });
  } else
    jn = function () {
      S(Dn, 0);
    };
  function li(N) {
    (R = N), P || ((P = !0), jn());
  }
  function si(N, I) {
    T = S(function () {
      N(e.unstable_now());
    }, I);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      w || y || ((w = !0), li(E));
    }),
    (e.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : ($ = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (N) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var I = 3;
          break;
        default:
          I = m;
      }
      var O = m;
      m = I;
      try {
        return N();
      } finally {
        m = O;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (N, I) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var O = m;
      m = N;
      try {
        return I();
      } finally {
        m = O;
      }
    }),
    (e.unstable_scheduleCallback = function (N, I, O) {
      var G = e.unstable_now();
      switch (
        (typeof O == "object" && O !== null
          ? ((O = O.delay), (O = typeof O == "number" && 0 < O ? G + O : G))
          : (O = G),
        N)
      ) {
        case 1:
          var ee = -1;
          break;
        case 2:
          ee = 250;
          break;
        case 5:
          ee = 1073741823;
          break;
        case 4:
          ee = 1e4;
          break;
        default:
          ee = 5e3;
      }
      return (
        (ee = O + ee),
        (N = {
          id: h++,
          callback: I,
          priorityLevel: N,
          startTime: O,
          expirationTime: ee,
          sortIndex: -1,
        }),
        O > G
          ? ((N.sortIndex = O),
            t(u, N),
            n(a) === null &&
              N === n(u) &&
              (_ ? (d(T), (T = -1)) : (_ = !0), si(v, O - G)))
          : ((N.sortIndex = ee), t(a, N), w || y || ((w = !0), li(E))),
        N
      );
    }),
    (e.unstable_shouldYield = je),
    (e.unstable_wrapCallback = function (N) {
      var I = m;
      return function () {
        var O = m;
        m = I;
        try {
          return N.apply(this, arguments);
        } finally {
          m = O;
        }
      };
    });
})(bu);
Hu.exports = bu;
var tp = Hu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var np = k,
  ke = tp;
function x(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Vu = new Set(),
  rr = {};
function Xt(e, t) {
  _n(e, t), _n(e + "Capture", t);
}
function _n(e, t) {
  for (rr[e] = t, e = 0; e < t.length; e++) Vu.add(t[e]);
}
var qe = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Hi = Object.prototype.hasOwnProperty,
  rp =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Ys = {},
  Js = {};
function op(e) {
  return Hi.call(Js, e)
    ? !0
    : Hi.call(Ys, e)
    ? !1
    : rp.test(e)
    ? (Js[e] = !0)
    : ((Ys[e] = !0), !1);
}
function ip(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function lp(e, t, n, r) {
  if (t === null || typeof t > "u" || ip(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function he(e, t, n, r, o, i, l) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = l);
}
var ie = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ie[e] = new he(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ie[t] = new he(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ie[e] = new he(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ie[e] = new he(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ie[e] = new he(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ie[e] = new he(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ie[e] = new he(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ie[e] = new he(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ie[e] = new he(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Gl = /[\-:]([a-z])/g;
function Xl(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Gl, Xl);
    ie[t] = new he(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Gl, Xl);
    ie[t] = new he(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Gl, Xl);
  ie[t] = new he(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ie[e] = new he(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ie.xlinkHref = new he(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ie[e] = new he(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Yl(e, t, n, r) {
  var o = ie.hasOwnProperty(t) ? ie[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (lp(t, n, o, r) && (n = null),
    r || o === null
      ? op(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : o.mustUseProperty
      ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
      : ((t = o.attributeName),
        (r = o.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((o = o.type),
            (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ot = np.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  jr = Symbol.for("react.element"),
  en = Symbol.for("react.portal"),
  tn = Symbol.for("react.fragment"),
  Jl = Symbol.for("react.strict_mode"),
  bi = Symbol.for("react.profiler"),
  Wu = Symbol.for("react.provider"),
  Qu = Symbol.for("react.context"),
  Zl = Symbol.for("react.forward_ref"),
  Vi = Symbol.for("react.suspense"),
  Wi = Symbol.for("react.suspense_list"),
  ql = Symbol.for("react.memo"),
  lt = Symbol.for("react.lazy"),
  Ku = Symbol.for("react.offscreen"),
  Zs = Symbol.iterator;
function Ln(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Zs && e[Zs]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var V = Object.assign,
  ci;
function bn(e) {
  if (ci === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      ci = (t && t[1]) || "";
    }
  return (
    `
` +
    ci +
    e
  );
}
var di = !1;
function fi(e, t) {
  if (!e || di) return "";
  di = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var o = u.stack.split(`
`),
          i = r.stack.split(`
`),
          l = o.length - 1,
          s = i.length - 1;
        1 <= l && 0 <= s && o[l] !== i[s];

      )
        s--;
      for (; 1 <= l && 0 <= s; l--, s--)
        if (o[l] !== i[s]) {
          if (l !== 1 || s !== 1)
            do
              if ((l--, s--, 0 > s || o[l] !== i[s])) {
                var a =
                  `
` + o[l].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= l && 0 <= s);
          break;
        }
    }
  } finally {
    (di = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? bn(e) : "";
}
function sp(e) {
  switch (e.tag) {
    case 5:
      return bn(e.type);
    case 16:
      return bn("Lazy");
    case 13:
      return bn("Suspense");
    case 19:
      return bn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = fi(e.type, !1)), e;
    case 11:
      return (e = fi(e.type.render, !1)), e;
    case 1:
      return (e = fi(e.type, !0)), e;
    default:
      return "";
  }
}
function Qi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case tn:
      return "Fragment";
    case en:
      return "Portal";
    case bi:
      return "Profiler";
    case Jl:
      return "StrictMode";
    case Vi:
      return "Suspense";
    case Wi:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Qu:
        return (e.displayName || "Context") + ".Consumer";
      case Wu:
        return (e._context.displayName || "Context") + ".Provider";
      case Zl:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ql:
        return (
          (t = e.displayName || null), t !== null ? t : Qi(e.type) || "Memo"
        );
      case lt:
        (t = e._payload), (e = e._init);
        try {
          return Qi(e(t));
        } catch {}
    }
  return null;
}
function ap(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qi(t);
    case 8:
      return t === Jl ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Pt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Gu(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function up(e) {
  var t = Gu(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (l) {
          (r = "" + l), i.call(this, l);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (l) {
          r = "" + l;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Lr(e) {
  e._valueTracker || (e._valueTracker = up(e));
}
function Xu(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Gu(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function uo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Ki(e, t) {
  var n = t.checked;
  return V({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function qs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = Pt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Yu(e, t) {
  (t = t.checked), t != null && Yl(e, "checked", t, !1);
}
function Gi(e, t) {
  Yu(e, t);
  var n = Pt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Xi(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Xi(e, t.type, Pt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function ea(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Xi(e, t, n) {
  (t !== "number" || uo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Vn = Array.isArray;
function pn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      (o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Pt(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        (e[o].selected = !0), r && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Yi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(x(91));
  return V({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function ta(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(x(92));
      if (Vn(n)) {
        if (1 < n.length) throw Error(x(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: Pt(n) };
}
function Ju(e, t) {
  var n = Pt(t.value),
    r = Pt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function na(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Zu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ji(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Zu(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Ar,
  qu = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Ar = Ar || document.createElement("div"),
          Ar.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ar.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function or(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Kn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  cp = ["Webkit", "ms", "Moz", "O"];
Object.keys(Kn).forEach(function (e) {
  cp.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Kn[t] = Kn[e]);
  });
});
function ec(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Kn.hasOwnProperty(e) && Kn[e])
    ? ("" + t).trim()
    : t + "px";
}
function tc(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = ec(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
    }
}
var dp = V(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Zi(e, t) {
  if (t) {
    if (dp[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(x(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(x(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(x(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(x(62));
  }
}
function qi(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var el = null;
function es(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var tl = null,
  hn = null,
  mn = null;
function ra(e) {
  if ((e = Pr(e))) {
    if (typeof tl != "function") throw Error(x(280));
    var t = e.stateNode;
    t && ((t = Qo(t)), tl(e.stateNode, e.type, t));
  }
}
function nc(e) {
  hn ? (mn ? mn.push(e) : (mn = [e])) : (hn = e);
}
function rc() {
  if (hn) {
    var e = hn,
      t = mn;
    if (((mn = hn = null), ra(e), t)) for (e = 0; e < t.length; e++) ra(t[e]);
  }
}
function oc(e, t) {
  return e(t);
}
function ic() {}
var pi = !1;
function lc(e, t, n) {
  if (pi) return e(t, n);
  pi = !0;
  try {
    return oc(e, t, n);
  } finally {
    (pi = !1), (hn !== null || mn !== null) && (ic(), rc());
  }
}
function ir(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Qo(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(x(231, t, typeof n));
  return n;
}
var nl = !1;
if (qe)
  try {
    var An = {};
    Object.defineProperty(An, "passive", {
      get: function () {
        nl = !0;
      },
    }),
      window.addEventListener("test", An, An),
      window.removeEventListener("test", An, An);
  } catch {
    nl = !1;
  }
function fp(e, t, n, r, o, i, l, s, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (h) {
    this.onError(h);
  }
}
var Gn = !1,
  co = null,
  fo = !1,
  rl = null,
  pp = {
    onError: function (e) {
      (Gn = !0), (co = e);
    },
  };
function hp(e, t, n, r, o, i, l, s, a) {
  (Gn = !1), (co = null), fp.apply(pp, arguments);
}
function mp(e, t, n, r, o, i, l, s, a) {
  if ((hp.apply(this, arguments), Gn)) {
    if (Gn) {
      var u = co;
      (Gn = !1), (co = null);
    } else throw Error(x(198));
    fo || ((fo = !0), (rl = u));
  }
}
function Yt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function sc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function oa(e) {
  if (Yt(e) !== e) throw Error(x(188));
}
function gp(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = Yt(e)), t === null)) throw Error(x(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return oa(o), e;
        if (i === r) return oa(o), t;
        i = i.sibling;
      }
      throw Error(x(188));
    }
    if (n.return !== r.return) (n = o), (r = i);
    else {
      for (var l = !1, s = o.child; s; ) {
        if (s === n) {
          (l = !0), (n = o), (r = i);
          break;
        }
        if (s === r) {
          (l = !0), (r = o), (n = i);
          break;
        }
        s = s.sibling;
      }
      if (!l) {
        for (s = i.child; s; ) {
          if (s === n) {
            (l = !0), (n = i), (r = o);
            break;
          }
          if (s === r) {
            (l = !0), (r = i), (n = o);
            break;
          }
          s = s.sibling;
        }
        if (!l) throw Error(x(189));
      }
    }
    if (n.alternate !== r) throw Error(x(190));
  }
  if (n.tag !== 3) throw Error(x(188));
  return n.stateNode.current === n ? e : t;
}
function ac(e) {
  return (e = gp(e)), e !== null ? uc(e) : null;
}
function uc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = uc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var cc = ke.unstable_scheduleCallback,
  ia = ke.unstable_cancelCallback,
  vp = ke.unstable_shouldYield,
  yp = ke.unstable_requestPaint,
  X = ke.unstable_now,
  wp = ke.unstable_getCurrentPriorityLevel,
  ts = ke.unstable_ImmediatePriority,
  dc = ke.unstable_UserBlockingPriority,
  po = ke.unstable_NormalPriority,
  _p = ke.unstable_LowPriority,
  fc = ke.unstable_IdlePriority,
  Ho = null,
  We = null;
function xp(e) {
  if (We && typeof We.onCommitFiberRoot == "function")
    try {
      We.onCommitFiberRoot(Ho, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Me = Math.clz32 ? Math.clz32 : kp,
  Sp = Math.log,
  Ep = Math.LN2;
function kp(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Sp(e) / Ep) | 0)) | 0;
}
var zr = 64,
  Ur = 4194304;
function Wn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ho(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    l = n & 268435455;
  if (l !== 0) {
    var s = l & ~o;
    s !== 0 ? (r = Wn(s)) : ((i &= l), i !== 0 && (r = Wn(i)));
  } else (l = n & ~o), l !== 0 ? (r = Wn(l)) : i !== 0 && (r = Wn(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Me(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
  return r;
}
function Cp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Np(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var l = 31 - Me(i),
      s = 1 << l,
      a = o[l];
    a === -1
      ? (!(s & n) || s & r) && (o[l] = Cp(s, t))
      : a <= t && (e.expiredLanes |= s),
      (i &= ~s);
  }
}
function ol(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function pc() {
  var e = zr;
  return (zr <<= 1), !(zr & 4194240) && (zr = 64), e;
}
function hi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Cr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Me(t)),
    (e[t] = n);
}
function Pp(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - Me(n),
      i = 1 << o;
    (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
  }
}
function ns(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Me(n),
      o = 1 << r;
    (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
  }
}
var A = 0;
function hc(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var mc,
  rs,
  gc,
  vc,
  yc,
  il = !1,
  Mr = [],
  mt = null,
  gt = null,
  vt = null,
  lr = new Map(),
  sr = new Map(),
  at = [],
  Rp =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function la(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      mt = null;
      break;
    case "dragenter":
    case "dragleave":
      gt = null;
      break;
    case "mouseover":
    case "mouseout":
      vt = null;
      break;
    case "pointerover":
    case "pointerout":
      lr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      sr.delete(t.pointerId);
  }
}
function zn(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = Pr(t)), t !== null && rs(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function Tp(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return (mt = zn(mt, e, t, n, r, o)), !0;
    case "dragenter":
      return (gt = zn(gt, e, t, n, r, o)), !0;
    case "mouseover":
      return (vt = zn(vt, e, t, n, r, o)), !0;
    case "pointerover":
      var i = o.pointerId;
      return lr.set(i, zn(lr.get(i) || null, e, t, n, r, o)), !0;
    case "gotpointercapture":
      return (
        (i = o.pointerId), sr.set(i, zn(sr.get(i) || null, e, t, n, r, o)), !0
      );
  }
  return !1;
}
function wc(e) {
  var t = Ut(e.target);
  if (t !== null) {
    var n = Yt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = sc(n)), t !== null)) {
          (e.blockedOn = t),
            yc(e.priority, function () {
              gc(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function qr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ll(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (el = r), n.target.dispatchEvent(r), (el = null);
    } else return (t = Pr(n)), t !== null && rs(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function sa(e, t, n) {
  qr(e) && n.delete(t);
}
function Ip() {
  (il = !1),
    mt !== null && qr(mt) && (mt = null),
    gt !== null && qr(gt) && (gt = null),
    vt !== null && qr(vt) && (vt = null),
    lr.forEach(sa),
    sr.forEach(sa);
}
function Un(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    il ||
      ((il = !0),
      ke.unstable_scheduleCallback(ke.unstable_NormalPriority, Ip)));
}
function ar(e) {
  function t(o) {
    return Un(o, e);
  }
  if (0 < Mr.length) {
    Un(Mr[0], e);
    for (var n = 1; n < Mr.length; n++) {
      var r = Mr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    mt !== null && Un(mt, e),
      gt !== null && Un(gt, e),
      vt !== null && Un(vt, e),
      lr.forEach(t),
      sr.forEach(t),
      n = 0;
    n < at.length;
    n++
  )
    (r = at[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < at.length && ((n = at[0]), n.blockedOn === null); )
    wc(n), n.blockedOn === null && at.shift();
}
var gn = ot.ReactCurrentBatchConfig,
  mo = !0;
function Op(e, t, n, r) {
  var o = A,
    i = gn.transition;
  gn.transition = null;
  try {
    (A = 1), os(e, t, n, r);
  } finally {
    (A = o), (gn.transition = i);
  }
}
function Dp(e, t, n, r) {
  var o = A,
    i = gn.transition;
  gn.transition = null;
  try {
    (A = 4), os(e, t, n, r);
  } finally {
    (A = o), (gn.transition = i);
  }
}
function os(e, t, n, r) {
  if (mo) {
    var o = ll(e, t, n, r);
    if (o === null) ki(e, t, r, go, n), la(e, r);
    else if (Tp(o, e, t, n, r)) r.stopPropagation();
    else if ((la(e, r), t & 4 && -1 < Rp.indexOf(e))) {
      for (; o !== null; ) {
        var i = Pr(o);
        if (
          (i !== null && mc(i),
          (i = ll(e, t, n, r)),
          i === null && ki(e, t, r, go, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else ki(e, t, r, null, n);
  }
}
var go = null;
function ll(e, t, n, r) {
  if (((go = null), (e = es(r)), (e = Ut(e)), e !== null))
    if (((t = Yt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = sc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (go = e), null;
}
function _c(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (wp()) {
        case ts:
          return 1;
        case dc:
          return 4;
        case po:
        case _p:
          return 16;
        case fc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var dt = null,
  is = null,
  eo = null;
function xc() {
  if (eo) return eo;
  var e,
    t = is,
    n = t.length,
    r,
    o = "value" in dt ? dt.value : dt.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var l = n - e;
  for (r = 1; r <= l && t[n - r] === o[i - r]; r++);
  return (eo = o.slice(e, 1 < r ? 1 - r : void 0));
}
function to(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Br() {
  return !0;
}
function aa() {
  return !1;
}
function Ne(e) {
  function t(n, r, o, i, l) {
    (this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = l),
      (this.currentTarget = null);
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(i) : i[s]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? Br
        : aa),
      (this.isPropagationStopped = aa),
      this
    );
  }
  return (
    V(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Br));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Br));
      },
      persist: function () {},
      isPersistent: Br,
    }),
    t
  );
}
var Rn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  ls = Ne(Rn),
  Nr = V({}, Rn, { view: 0, detail: 0 }),
  jp = Ne(Nr),
  mi,
  gi,
  Mn,
  bo = V({}, Nr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: ss,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Mn &&
            (Mn && e.type === "mousemove"
              ? ((mi = e.screenX - Mn.screenX), (gi = e.screenY - Mn.screenY))
              : (gi = mi = 0),
            (Mn = e)),
          mi);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : gi;
    },
  }),
  ua = Ne(bo),
  Lp = V({}, bo, { dataTransfer: 0 }),
  Ap = Ne(Lp),
  zp = V({}, Nr, { relatedTarget: 0 }),
  vi = Ne(zp),
  Up = V({}, Rn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Mp = Ne(Up),
  Bp = V({}, Rn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Fp = Ne(Bp),
  $p = V({}, Rn, { data: 0 }),
  ca = Ne($p),
  Hp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  bp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Vp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Wp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Vp[e]) ? !!t[e] : !1;
}
function ss() {
  return Wp;
}
var Qp = V({}, Nr, {
    key: function (e) {
      if (e.key) {
        var t = Hp[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = to(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? bp[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: ss,
    charCode: function (e) {
      return e.type === "keypress" ? to(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? to(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Kp = Ne(Qp),
  Gp = V({}, bo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  da = Ne(Gp),
  Xp = V({}, Nr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: ss,
  }),
  Yp = Ne(Xp),
  Jp = V({}, Rn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Zp = Ne(Jp),
  qp = V({}, bo, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  eh = Ne(qp),
  th = [9, 13, 27, 32],
  as = qe && "CompositionEvent" in window,
  Xn = null;
qe && "documentMode" in document && (Xn = document.documentMode);
var nh = qe && "TextEvent" in window && !Xn,
  Sc = qe && (!as || (Xn && 8 < Xn && 11 >= Xn)),
  fa = " ",
  pa = !1;
function Ec(e, t) {
  switch (e) {
    case "keyup":
      return th.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function kc(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var nn = !1;
function rh(e, t) {
  switch (e) {
    case "compositionend":
      return kc(t);
    case "keypress":
      return t.which !== 32 ? null : ((pa = !0), fa);
    case "textInput":
      return (e = t.data), e === fa && pa ? null : e;
    default:
      return null;
  }
}
function oh(e, t) {
  if (nn)
    return e === "compositionend" || (!as && Ec(e, t))
      ? ((e = xc()), (eo = is = dt = null), (nn = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Sc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var ih = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function ha(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!ih[e.type] : t === "textarea";
}
function Cc(e, t, n, r) {
  nc(r),
    (t = vo(t, "onChange")),
    0 < t.length &&
      ((n = new ls("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Yn = null,
  ur = null;
function lh(e) {
  zc(e, 0);
}
function Vo(e) {
  var t = ln(e);
  if (Xu(t)) return e;
}
function sh(e, t) {
  if (e === "change") return t;
}
var Nc = !1;
if (qe) {
  var yi;
  if (qe) {
    var wi = "oninput" in document;
    if (!wi) {
      var ma = document.createElement("div");
      ma.setAttribute("oninput", "return;"),
        (wi = typeof ma.oninput == "function");
    }
    yi = wi;
  } else yi = !1;
  Nc = yi && (!document.documentMode || 9 < document.documentMode);
}
function ga() {
  Yn && (Yn.detachEvent("onpropertychange", Pc), (ur = Yn = null));
}
function Pc(e) {
  if (e.propertyName === "value" && Vo(ur)) {
    var t = [];
    Cc(t, ur, e, es(e)), lc(lh, t);
  }
}
function ah(e, t, n) {
  e === "focusin"
    ? (ga(), (Yn = t), (ur = n), Yn.attachEvent("onpropertychange", Pc))
    : e === "focusout" && ga();
}
function uh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return Vo(ur);
}
function ch(e, t) {
  if (e === "click") return Vo(t);
}
function dh(e, t) {
  if (e === "input" || e === "change") return Vo(t);
}
function fh(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Fe = typeof Object.is == "function" ? Object.is : fh;
function cr(e, t) {
  if (Fe(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!Hi.call(t, o) || !Fe(e[o], t[o])) return !1;
  }
  return !0;
}
function va(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ya(e, t) {
  var n = va(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = va(n);
  }
}
function Rc(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? Rc(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function Tc() {
  for (var e = window, t = uo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = uo(e.document);
  }
  return t;
}
function us(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function ph(e) {
  var t = Tc(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    Rc(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && us(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        (r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = ya(n, i));
        var l = ya(n, r);
        o &&
          l &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== l.node ||
            e.focusOffset !== l.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(l.node, l.offset))
            : (t.setEnd(l.node, l.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var hh = qe && "documentMode" in document && 11 >= document.documentMode,
  rn = null,
  sl = null,
  Jn = null,
  al = !1;
function wa(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  al ||
    rn == null ||
    rn !== uo(r) ||
    ((r = rn),
    "selectionStart" in r && us(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Jn && cr(Jn, r)) ||
      ((Jn = r),
      (r = vo(sl, "onSelect")),
      0 < r.length &&
        ((t = new ls("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = rn))));
}
function Fr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var on = {
    animationend: Fr("Animation", "AnimationEnd"),
    animationiteration: Fr("Animation", "AnimationIteration"),
    animationstart: Fr("Animation", "AnimationStart"),
    transitionend: Fr("Transition", "TransitionEnd"),
  },
  _i = {},
  Ic = {};
qe &&
  ((Ic = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete on.animationend.animation,
    delete on.animationiteration.animation,
    delete on.animationstart.animation),
  "TransitionEvent" in window || delete on.transitionend.transition);
function Wo(e) {
  if (_i[e]) return _i[e];
  if (!on[e]) return e;
  var t = on[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in Ic) return (_i[e] = t[n]);
  return e;
}
var Oc = Wo("animationend"),
  Dc = Wo("animationiteration"),
  jc = Wo("animationstart"),
  Lc = Wo("transitionend"),
  Ac = new Map(),
  _a =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Tt(e, t) {
  Ac.set(e, t), Xt(t, [e]);
}
for (var xi = 0; xi < _a.length; xi++) {
  var Si = _a[xi],
    mh = Si.toLowerCase(),
    gh = Si[0].toUpperCase() + Si.slice(1);
  Tt(mh, "on" + gh);
}
Tt(Oc, "onAnimationEnd");
Tt(Dc, "onAnimationIteration");
Tt(jc, "onAnimationStart");
Tt("dblclick", "onDoubleClick");
Tt("focusin", "onFocus");
Tt("focusout", "onBlur");
Tt(Lc, "onTransitionEnd");
_n("onMouseEnter", ["mouseout", "mouseover"]);
_n("onMouseLeave", ["mouseout", "mouseover"]);
_n("onPointerEnter", ["pointerout", "pointerover"]);
_n("onPointerLeave", ["pointerout", "pointerover"]);
Xt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Xt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Xt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Xt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Xt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Xt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Qn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  vh = new Set("cancel close invalid load scroll toggle".split(" ").concat(Qn));
function xa(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), mp(r, t, void 0, e), (e.currentTarget = null);
}
function zc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var l = r.length - 1; 0 <= l; l--) {
          var s = r[l],
            a = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), a !== i && o.isPropagationStopped())) break e;
          xa(o, s, u), (i = a);
        }
      else
        for (l = 0; l < r.length; l++) {
          if (
            ((s = r[l]),
            (a = s.instance),
            (u = s.currentTarget),
            (s = s.listener),
            a !== i && o.isPropagationStopped())
          )
            break e;
          xa(o, s, u), (i = a);
        }
    }
  }
  if (fo) throw ((e = rl), (fo = !1), (rl = null), e);
}
function U(e, t) {
  var n = t[pl];
  n === void 0 && (n = t[pl] = new Set());
  var r = e + "__bubble";
  n.has(r) || (Uc(t, e, 2, !1), n.add(r));
}
function Ei(e, t, n) {
  var r = 0;
  t && (r |= 4), Uc(n, e, r, t);
}
var $r = "_reactListening" + Math.random().toString(36).slice(2);
function dr(e) {
  if (!e[$r]) {
    (e[$r] = !0),
      Vu.forEach(function (n) {
        n !== "selectionchange" && (vh.has(n) || Ei(n, !1, e), Ei(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[$r] || ((t[$r] = !0), Ei("selectionchange", !1, t));
  }
}
function Uc(e, t, n, r) {
  switch (_c(t)) {
    case 1:
      var o = Op;
      break;
    case 4:
      o = Dp;
      break;
    default:
      o = os;
  }
  (n = o.bind(null, t, n, e)),
    (o = void 0),
    !nl ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
      ? e.addEventListener(t, n, { passive: o })
      : e.addEventListener(t, n, !1);
}
function ki(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var l = r.tag;
      if (l === 3 || l === 4) {
        var s = r.stateNode.containerInfo;
        if (s === o || (s.nodeType === 8 && s.parentNode === o)) break;
        if (l === 4)
          for (l = r.return; l !== null; ) {
            var a = l.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = l.stateNode.containerInfo),
              a === o || (a.nodeType === 8 && a.parentNode === o))
            )
              return;
            l = l.return;
          }
        for (; s !== null; ) {
          if (((l = Ut(s)), l === null)) return;
          if (((a = l.tag), a === 5 || a === 6)) {
            r = i = l;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  lc(function () {
    var u = i,
      h = es(n),
      f = [];
    e: {
      var m = Ac.get(e);
      if (m !== void 0) {
        var y = ls,
          w = e;
        switch (e) {
          case "keypress":
            if (to(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = Kp;
            break;
          case "focusin":
            (w = "focus"), (y = vi);
            break;
          case "focusout":
            (w = "blur"), (y = vi);
            break;
          case "beforeblur":
          case "afterblur":
            y = vi;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = ua;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Ap;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = Yp;
            break;
          case Oc:
          case Dc:
          case jc:
            y = Mp;
            break;
          case Lc:
            y = Zp;
            break;
          case "scroll":
            y = jp;
            break;
          case "wheel":
            y = eh;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = Fp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = da;
        }
        var _ = (t & 4) !== 0,
          S = !_ && e === "scroll",
          d = _ ? (m !== null ? m + "Capture" : null) : m;
        _ = [];
        for (var c = u, p; c !== null; ) {
          p = c;
          var v = p.stateNode;
          if (
            (p.tag === 5 &&
              v !== null &&
              ((p = v),
              d !== null && ((v = ir(c, d)), v != null && _.push(fr(c, v, p)))),
            S)
          )
            break;
          c = c.return;
        }
        0 < _.length &&
          ((m = new y(m, w, null, n, h)), f.push({ event: m, listeners: _ }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (y = e === "mouseout" || e === "pointerout"),
          m &&
            n !== el &&
            (w = n.relatedTarget || n.fromElement) &&
            (Ut(w) || w[et]))
        )
          break e;
        if (
          (y || m) &&
          ((m =
            h.window === h
              ? h
              : (m = h.ownerDocument)
              ? m.defaultView || m.parentWindow
              : window),
          y
            ? ((w = n.relatedTarget || n.toElement),
              (y = u),
              (w = w ? Ut(w) : null),
              w !== null &&
                ((S = Yt(w)), w !== S || (w.tag !== 5 && w.tag !== 6)) &&
                (w = null))
            : ((y = null), (w = u)),
          y !== w)
        ) {
          if (
            ((_ = ua),
            (v = "onMouseLeave"),
            (d = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((_ = da),
              (v = "onPointerLeave"),
              (d = "onPointerEnter"),
              (c = "pointer")),
            (S = y == null ? m : ln(y)),
            (p = w == null ? m : ln(w)),
            (m = new _(v, c + "leave", y, n, h)),
            (m.target = S),
            (m.relatedTarget = p),
            (v = null),
            Ut(h) === u &&
              ((_ = new _(d, c + "enter", w, n, h)),
              (_.target = p),
              (_.relatedTarget = S),
              (v = _)),
            (S = v),
            y && w)
          )
            t: {
              for (_ = y, d = w, c = 0, p = _; p; p = qt(p)) c++;
              for (p = 0, v = d; v; v = qt(v)) p++;
              for (; 0 < c - p; ) (_ = qt(_)), c--;
              for (; 0 < p - c; ) (d = qt(d)), p--;
              for (; c--; ) {
                if (_ === d || (d !== null && _ === d.alternate)) break t;
                (_ = qt(_)), (d = qt(d));
              }
              _ = null;
            }
          else _ = null;
          y !== null && Sa(f, m, y, _, !1),
            w !== null && S !== null && Sa(f, S, w, _, !0);
        }
      }
      e: {
        if (
          ((m = u ? ln(u) : window),
          (y = m.nodeName && m.nodeName.toLowerCase()),
          y === "select" || (y === "input" && m.type === "file"))
        )
          var E = sh;
        else if (ha(m))
          if (Nc) E = dh;
          else {
            E = uh;
            var P = ah;
          }
        else
          (y = m.nodeName) &&
            y.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (E = ch);
        if (E && (E = E(e, u))) {
          Cc(f, E, n, h);
          break e;
        }
        P && P(e, m, u),
          e === "focusout" &&
            (P = m._wrapperState) &&
            P.controlled &&
            m.type === "number" &&
            Xi(m, "number", m.value);
      }
      switch (((P = u ? ln(u) : window), e)) {
        case "focusin":
          (ha(P) || P.contentEditable === "true") &&
            ((rn = P), (sl = u), (Jn = null));
          break;
        case "focusout":
          Jn = sl = rn = null;
          break;
        case "mousedown":
          al = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (al = !1), wa(f, n, h);
          break;
        case "selectionchange":
          if (hh) break;
        case "keydown":
        case "keyup":
          wa(f, n, h);
      }
      var R;
      if (as)
        e: {
          switch (e) {
            case "compositionstart":
              var T = "onCompositionStart";
              break e;
            case "compositionend":
              T = "onCompositionEnd";
              break e;
            case "compositionupdate":
              T = "onCompositionUpdate";
              break e;
          }
          T = void 0;
        }
      else
        nn
          ? Ec(e, n) && (T = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (T = "onCompositionStart");
      T &&
        (Sc &&
          n.locale !== "ko" &&
          (nn || T !== "onCompositionStart"
            ? T === "onCompositionEnd" && nn && (R = xc())
            : ((dt = h),
              (is = "value" in dt ? dt.value : dt.textContent),
              (nn = !0))),
        (P = vo(u, T)),
        0 < P.length &&
          ((T = new ca(T, e, null, n, h)),
          f.push({ event: T, listeners: P }),
          R ? (T.data = R) : ((R = kc(n)), R !== null && (T.data = R)))),
        (R = nh ? rh(e, n) : oh(e, n)) &&
          ((u = vo(u, "onBeforeInput")),
          0 < u.length &&
            ((h = new ca("onBeforeInput", "beforeinput", null, n, h)),
            f.push({ event: h, listeners: u }),
            (h.data = R)));
    }
    zc(f, t);
  });
}
function fr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function vo(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = ir(e, n)),
      i != null && r.unshift(fr(e, i, o)),
      (i = ir(e, t)),
      i != null && r.push(fr(e, i, o))),
      (e = e.return);
  }
  return r;
}
function qt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Sa(e, t, n, r, o) {
  for (var i = t._reactName, l = []; n !== null && n !== r; ) {
    var s = n,
      a = s.alternate,
      u = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 &&
      u !== null &&
      ((s = u),
      o
        ? ((a = ir(n, i)), a != null && l.unshift(fr(n, a, s)))
        : o || ((a = ir(n, i)), a != null && l.push(fr(n, a, s)))),
      (n = n.return);
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var yh = /\r\n?/g,
  wh = /\u0000|\uFFFD/g;
function Ea(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      yh,
      `
`
    )
    .replace(wh, "");
}
function Hr(e, t, n) {
  if (((t = Ea(t)), Ea(e) !== t && n)) throw Error(x(425));
}
function yo() {}
var ul = null,
  cl = null;
function dl(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var fl = typeof setTimeout == "function" ? setTimeout : void 0,
  _h = typeof clearTimeout == "function" ? clearTimeout : void 0,
  ka = typeof Promise == "function" ? Promise : void 0,
  xh =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof ka < "u"
      ? function (e) {
          return ka.resolve(null).then(e).catch(Sh);
        }
      : fl;
function Sh(e) {
  setTimeout(function () {
    throw e;
  });
}
function Ci(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(o), ar(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  ar(t);
}
function yt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Ca(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Tn = Math.random().toString(36).slice(2),
  be = "__reactFiber$" + Tn,
  pr = "__reactProps$" + Tn,
  et = "__reactContainer$" + Tn,
  pl = "__reactEvents$" + Tn,
  Eh = "__reactListeners$" + Tn,
  kh = "__reactHandles$" + Tn;
function Ut(e) {
  var t = e[be];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[et] || n[be])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Ca(e); e !== null; ) {
          if ((n = e[be])) return n;
          e = Ca(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Pr(e) {
  return (
    (e = e[be] || e[et]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function ln(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(x(33));
}
function Qo(e) {
  return e[pr] || null;
}
var hl = [],
  sn = -1;
function It(e) {
  return { current: e };
}
function B(e) {
  0 > sn || ((e.current = hl[sn]), (hl[sn] = null), sn--);
}
function z(e, t) {
  sn++, (hl[sn] = e.current), (e.current = t);
}
var Rt = {},
  ue = It(Rt),
  ve = It(!1),
  bt = Rt;
function xn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Rt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function ye(e) {
  return (e = e.childContextTypes), e != null;
}
function wo() {
  B(ve), B(ue);
}
function Na(e, t, n) {
  if (ue.current !== Rt) throw Error(x(168));
  z(ue, t), z(ve, n);
}
function Mc(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(x(108, ap(e) || "Unknown", o));
  return V({}, n, r);
}
function _o(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Rt),
    (bt = ue.current),
    z(ue, e),
    z(ve, ve.current),
    !0
  );
}
function Pa(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(x(169));
  n
    ? ((e = Mc(e, t, bt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      B(ve),
      B(ue),
      z(ue, e))
    : B(ve),
    z(ve, n);
}
var Xe = null,
  Ko = !1,
  Ni = !1;
function Bc(e) {
  Xe === null ? (Xe = [e]) : Xe.push(e);
}
function Ch(e) {
  (Ko = !0), Bc(e);
}
function Ot() {
  if (!Ni && Xe !== null) {
    Ni = !0;
    var e = 0,
      t = A;
    try {
      var n = Xe;
      for (A = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Xe = null), (Ko = !1);
    } catch (o) {
      throw (Xe !== null && (Xe = Xe.slice(e + 1)), cc(ts, Ot), o);
    } finally {
      (A = t), (Ni = !1);
    }
  }
  return null;
}
var an = [],
  un = 0,
  xo = null,
  So = 0,
  Pe = [],
  Re = 0,
  Vt = null,
  Ye = 1,
  Je = "";
function Lt(e, t) {
  (an[un++] = So), (an[un++] = xo), (xo = e), (So = t);
}
function Fc(e, t, n) {
  (Pe[Re++] = Ye), (Pe[Re++] = Je), (Pe[Re++] = Vt), (Vt = e);
  var r = Ye;
  e = Je;
  var o = 32 - Me(r) - 1;
  (r &= ~(1 << o)), (n += 1);
  var i = 32 - Me(t) + o;
  if (30 < i) {
    var l = o - (o % 5);
    (i = (r & ((1 << l) - 1)).toString(32)),
      (r >>= l),
      (o -= l),
      (Ye = (1 << (32 - Me(t) + o)) | (n << o) | r),
      (Je = i + e);
  } else (Ye = (1 << i) | (n << o) | r), (Je = e);
}
function cs(e) {
  e.return !== null && (Lt(e, 1), Fc(e, 1, 0));
}
function ds(e) {
  for (; e === xo; )
    (xo = an[--un]), (an[un] = null), (So = an[--un]), (an[un] = null);
  for (; e === Vt; )
    (Vt = Pe[--Re]),
      (Pe[Re] = null),
      (Je = Pe[--Re]),
      (Pe[Re] = null),
      (Ye = Pe[--Re]),
      (Pe[Re] = null);
}
var Ee = null,
  xe = null,
  F = !1,
  Ue = null;
function $c(e, t) {
  var n = Te(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Ra(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Ee = e), (xe = yt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Ee = e), (xe = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Vt !== null ? { id: Ye, overflow: Je } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Te(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Ee = e),
            (xe = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function ml(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function gl(e) {
  if (F) {
    var t = xe;
    if (t) {
      var n = t;
      if (!Ra(e, t)) {
        if (ml(e)) throw Error(x(418));
        t = yt(n.nextSibling);
        var r = Ee;
        t && Ra(e, t)
          ? $c(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (F = !1), (Ee = e));
      }
    } else {
      if (ml(e)) throw Error(x(418));
      (e.flags = (e.flags & -4097) | 2), (F = !1), (Ee = e);
    }
  }
}
function Ta(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Ee = e;
}
function br(e) {
  if (e !== Ee) return !1;
  if (!F) return Ta(e), (F = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !dl(e.type, e.memoizedProps))),
    t && (t = xe))
  ) {
    if (ml(e)) throw (Hc(), Error(x(418)));
    for (; t; ) $c(e, t), (t = yt(t.nextSibling));
  }
  if ((Ta(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(x(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              xe = yt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      xe = null;
    }
  } else xe = Ee ? yt(e.stateNode.nextSibling) : null;
  return !0;
}
function Hc() {
  for (var e = xe; e; ) e = yt(e.nextSibling);
}
function Sn() {
  (xe = Ee = null), (F = !1);
}
function fs(e) {
  Ue === null ? (Ue = [e]) : Ue.push(e);
}
var Nh = ot.ReactCurrentBatchConfig;
function Bn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(x(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(x(147, e));
      var o = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (l) {
            var s = o.refs;
            l === null ? delete s[i] : (s[i] = l);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(x(284));
    if (!n._owner) throw Error(x(290, e));
  }
  return e;
}
function Vr(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      x(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Ia(e) {
  var t = e._init;
  return t(e._payload);
}
function bc(e) {
  function t(d, c) {
    if (e) {
      var p = d.deletions;
      p === null ? ((d.deletions = [c]), (d.flags |= 16)) : p.push(c);
    }
  }
  function n(d, c) {
    if (!e) return null;
    for (; c !== null; ) t(d, c), (c = c.sibling);
    return null;
  }
  function r(d, c) {
    for (d = new Map(); c !== null; )
      c.key !== null ? d.set(c.key, c) : d.set(c.index, c), (c = c.sibling);
    return d;
  }
  function o(d, c) {
    return (d = St(d, c)), (d.index = 0), (d.sibling = null), d;
  }
  function i(d, c, p) {
    return (
      (d.index = p),
      e
        ? ((p = d.alternate),
          p !== null
            ? ((p = p.index), p < c ? ((d.flags |= 2), c) : p)
            : ((d.flags |= 2), c))
        : ((d.flags |= 1048576), c)
    );
  }
  function l(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function s(d, c, p, v) {
    return c === null || c.tag !== 6
      ? ((c = ji(p, d.mode, v)), (c.return = d), c)
      : ((c = o(c, p)), (c.return = d), c);
  }
  function a(d, c, p, v) {
    var E = p.type;
    return E === tn
      ? h(d, c, p.props.children, v, p.key)
      : c !== null &&
        (c.elementType === E ||
          (typeof E == "object" &&
            E !== null &&
            E.$$typeof === lt &&
            Ia(E) === c.type))
      ? ((v = o(c, p.props)), (v.ref = Bn(d, c, p)), (v.return = d), v)
      : ((v = ao(p.type, p.key, p.props, null, d.mode, v)),
        (v.ref = Bn(d, c, p)),
        (v.return = d),
        v);
  }
  function u(d, c, p, v) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== p.containerInfo ||
      c.stateNode.implementation !== p.implementation
      ? ((c = Li(p, d.mode, v)), (c.return = d), c)
      : ((c = o(c, p.children || [])), (c.return = d), c);
  }
  function h(d, c, p, v, E) {
    return c === null || c.tag !== 7
      ? ((c = $t(p, d.mode, v, E)), (c.return = d), c)
      : ((c = o(c, p)), (c.return = d), c);
  }
  function f(d, c, p) {
    if ((typeof c == "string" && c !== "") || typeof c == "number")
      return (c = ji("" + c, d.mode, p)), (c.return = d), c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case jr:
          return (
            (p = ao(c.type, c.key, c.props, null, d.mode, p)),
            (p.ref = Bn(d, null, c)),
            (p.return = d),
            p
          );
        case en:
          return (c = Li(c, d.mode, p)), (c.return = d), c;
        case lt:
          var v = c._init;
          return f(d, v(c._payload), p);
      }
      if (Vn(c) || Ln(c))
        return (c = $t(c, d.mode, p, null)), (c.return = d), c;
      Vr(d, c);
    }
    return null;
  }
  function m(d, c, p, v) {
    var E = c !== null ? c.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return E !== null ? null : s(d, c, "" + p, v);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case jr:
          return p.key === E ? a(d, c, p, v) : null;
        case en:
          return p.key === E ? u(d, c, p, v) : null;
        case lt:
          return (E = p._init), m(d, c, E(p._payload), v);
      }
      if (Vn(p) || Ln(p)) return E !== null ? null : h(d, c, p, v, null);
      Vr(d, p);
    }
    return null;
  }
  function y(d, c, p, v, E) {
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return (d = d.get(p) || null), s(c, d, "" + v, E);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case jr:
          return (d = d.get(v.key === null ? p : v.key) || null), a(c, d, v, E);
        case en:
          return (d = d.get(v.key === null ? p : v.key) || null), u(c, d, v, E);
        case lt:
          var P = v._init;
          return y(d, c, p, P(v._payload), E);
      }
      if (Vn(v) || Ln(v)) return (d = d.get(p) || null), h(c, d, v, E, null);
      Vr(c, v);
    }
    return null;
  }
  function w(d, c, p, v) {
    for (
      var E = null, P = null, R = c, T = (c = 0), $ = null;
      R !== null && T < p.length;
      T++
    ) {
      R.index > T ? (($ = R), (R = null)) : ($ = R.sibling);
      var j = m(d, R, p[T], v);
      if (j === null) {
        R === null && (R = $);
        break;
      }
      e && R && j.alternate === null && t(d, R),
        (c = i(j, c, T)),
        P === null ? (E = j) : (P.sibling = j),
        (P = j),
        (R = $);
    }
    if (T === p.length) return n(d, R), F && Lt(d, T), E;
    if (R === null) {
      for (; T < p.length; T++)
        (R = f(d, p[T], v)),
          R !== null &&
            ((c = i(R, c, T)), P === null ? (E = R) : (P.sibling = R), (P = R));
      return F && Lt(d, T), E;
    }
    for (R = r(d, R); T < p.length; T++)
      ($ = y(R, d, T, p[T], v)),
        $ !== null &&
          (e && $.alternate !== null && R.delete($.key === null ? T : $.key),
          (c = i($, c, T)),
          P === null ? (E = $) : (P.sibling = $),
          (P = $));
    return (
      e &&
        R.forEach(function (je) {
          return t(d, je);
        }),
      F && Lt(d, T),
      E
    );
  }
  function _(d, c, p, v) {
    var E = Ln(p);
    if (typeof E != "function") throw Error(x(150));
    if (((p = E.call(p)), p == null)) throw Error(x(151));
    for (
      var P = (E = null), R = c, T = (c = 0), $ = null, j = p.next();
      R !== null && !j.done;
      T++, j = p.next()
    ) {
      R.index > T ? (($ = R), (R = null)) : ($ = R.sibling);
      var je = m(d, R, j.value, v);
      if (je === null) {
        R === null && (R = $);
        break;
      }
      e && R && je.alternate === null && t(d, R),
        (c = i(je, c, T)),
        P === null ? (E = je) : (P.sibling = je),
        (P = je),
        (R = $);
    }
    if (j.done) return n(d, R), F && Lt(d, T), E;
    if (R === null) {
      for (; !j.done; T++, j = p.next())
        (j = f(d, j.value, v)),
          j !== null &&
            ((c = i(j, c, T)), P === null ? (E = j) : (P.sibling = j), (P = j));
      return F && Lt(d, T), E;
    }
    for (R = r(d, R); !j.done; T++, j = p.next())
      (j = y(R, d, T, j.value, v)),
        j !== null &&
          (e && j.alternate !== null && R.delete(j.key === null ? T : j.key),
          (c = i(j, c, T)),
          P === null ? (E = j) : (P.sibling = j),
          (P = j));
    return (
      e &&
        R.forEach(function (Dn) {
          return t(d, Dn);
        }),
      F && Lt(d, T),
      E
    );
  }
  function S(d, c, p, v) {
    if (
      (typeof p == "object" &&
        p !== null &&
        p.type === tn &&
        p.key === null &&
        (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case jr:
          e: {
            for (var E = p.key, P = c; P !== null; ) {
              if (P.key === E) {
                if (((E = p.type), E === tn)) {
                  if (P.tag === 7) {
                    n(d, P.sibling),
                      (c = o(P, p.props.children)),
                      (c.return = d),
                      (d = c);
                    break e;
                  }
                } else if (
                  P.elementType === E ||
                  (typeof E == "object" &&
                    E !== null &&
                    E.$$typeof === lt &&
                    Ia(E) === P.type)
                ) {
                  n(d, P.sibling),
                    (c = o(P, p.props)),
                    (c.ref = Bn(d, P, p)),
                    (c.return = d),
                    (d = c);
                  break e;
                }
                n(d, P);
                break;
              } else t(d, P);
              P = P.sibling;
            }
            p.type === tn
              ? ((c = $t(p.props.children, d.mode, v, p.key)),
                (c.return = d),
                (d = c))
              : ((v = ao(p.type, p.key, p.props, null, d.mode, v)),
                (v.ref = Bn(d, c, p)),
                (v.return = d),
                (d = v));
          }
          return l(d);
        case en:
          e: {
            for (P = p.key; c !== null; ) {
              if (c.key === P)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === p.containerInfo &&
                  c.stateNode.implementation === p.implementation
                ) {
                  n(d, c.sibling),
                    (c = o(c, p.children || [])),
                    (c.return = d),
                    (d = c);
                  break e;
                } else {
                  n(d, c);
                  break;
                }
              else t(d, c);
              c = c.sibling;
            }
            (c = Li(p, d.mode, v)), (c.return = d), (d = c);
          }
          return l(d);
        case lt:
          return (P = p._init), S(d, c, P(p._payload), v);
      }
      if (Vn(p)) return w(d, c, p, v);
      if (Ln(p)) return _(d, c, p, v);
      Vr(d, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        c !== null && c.tag === 6
          ? (n(d, c.sibling), (c = o(c, p)), (c.return = d), (d = c))
          : (n(d, c), (c = ji(p, d.mode, v)), (c.return = d), (d = c)),
        l(d))
      : n(d, c);
  }
  return S;
}
var En = bc(!0),
  Vc = bc(!1),
  Eo = It(null),
  ko = null,
  cn = null,
  ps = null;
function hs() {
  ps = cn = ko = null;
}
function ms(e) {
  var t = Eo.current;
  B(Eo), (e._currentValue = t);
}
function vl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function vn(e, t) {
  (ko = e),
    (ps = cn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (ge = !0), (e.firstContext = null));
}
function Oe(e) {
  var t = e._currentValue;
  if (ps !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), cn === null)) {
      if (ko === null) throw Error(x(308));
      (cn = e), (ko.dependencies = { lanes: 0, firstContext: e });
    } else cn = cn.next = e;
  return t;
}
var Mt = null;
function gs(e) {
  Mt === null ? (Mt = [e]) : Mt.push(e);
}
function Wc(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), gs(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    tt(e, r)
  );
}
function tt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var st = !1;
function vs(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Qc(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Ze(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function wt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), L & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      tt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), gs(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    tt(e, n)
  );
}
function no(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ns(e, n);
  }
}
function Oa(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var l = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (o = i = l) : (i = i.next = l), (n = n.next);
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Co(e, t, n, r) {
  var o = e.updateQueue;
  st = !1;
  var i = o.firstBaseUpdate,
    l = o.lastBaseUpdate,
    s = o.shared.pending;
  if (s !== null) {
    o.shared.pending = null;
    var a = s,
      u = a.next;
    (a.next = null), l === null ? (i = u) : (l.next = u), (l = a);
    var h = e.alternate;
    h !== null &&
      ((h = h.updateQueue),
      (s = h.lastBaseUpdate),
      s !== l &&
        (s === null ? (h.firstBaseUpdate = u) : (s.next = u),
        (h.lastBaseUpdate = a)));
  }
  if (i !== null) {
    var f = o.baseState;
    (l = 0), (h = u = a = null), (s = i);
    do {
      var m = s.lane,
        y = s.eventTime;
      if ((r & m) === m) {
        h !== null &&
          (h = h.next =
            {
              eventTime: y,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var w = e,
            _ = s;
          switch (((m = t), (y = n), _.tag)) {
            case 1:
              if (((w = _.payload), typeof w == "function")) {
                f = w.call(y, f, m);
                break e;
              }
              f = w;
              break e;
            case 3:
              w.flags = (w.flags & -65537) | 128;
            case 0:
              if (
                ((w = _.payload),
                (m = typeof w == "function" ? w.call(y, f, m) : w),
                m == null)
              )
                break e;
              f = V({}, f, m);
              break e;
            case 2:
              st = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (m = o.effects),
          m === null ? (o.effects = [s]) : m.push(s));
      } else
        (y = {
          eventTime: y,
          lane: m,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          h === null ? ((u = h = y), (a = f)) : (h = h.next = y),
          (l |= m);
      if (((s = s.next), s === null)) {
        if (((s = o.shared.pending), s === null)) break;
        (m = s),
          (s = m.next),
          (m.next = null),
          (o.lastBaseUpdate = m),
          (o.shared.pending = null);
      }
    } while (!0);
    if (
      (h === null && (a = f),
      (o.baseState = a),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = h),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (l |= o.lane), (o = o.next);
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    (Qt |= l), (e.lanes = l), (e.memoizedState = f);
  }
}
function Da(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(x(191, o));
        o.call(r);
      }
    }
}
var Rr = {},
  Qe = It(Rr),
  hr = It(Rr),
  mr = It(Rr);
function Bt(e) {
  if (e === Rr) throw Error(x(174));
  return e;
}
function ys(e, t) {
  switch ((z(mr, t), z(hr, e), z(Qe, Rr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ji(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ji(t, e));
  }
  B(Qe), z(Qe, t);
}
function kn() {
  B(Qe), B(hr), B(mr);
}
function Kc(e) {
  Bt(mr.current);
  var t = Bt(Qe.current),
    n = Ji(t, e.type);
  t !== n && (z(hr, e), z(Qe, n));
}
function ws(e) {
  hr.current === e && (B(Qe), B(hr));
}
var H = It(0);
function No(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Pi = [];
function _s() {
  for (var e = 0; e < Pi.length; e++)
    Pi[e]._workInProgressVersionPrimary = null;
  Pi.length = 0;
}
var ro = ot.ReactCurrentDispatcher,
  Ri = ot.ReactCurrentBatchConfig,
  Wt = 0,
  b = null,
  Z = null,
  te = null,
  Po = !1,
  Zn = !1,
  gr = 0,
  Ph = 0;
function le() {
  throw Error(x(321));
}
function xs(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Fe(e[n], t[n])) return !1;
  return !0;
}
function Ss(e, t, n, r, o, i) {
  if (
    ((Wt = i),
    (b = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (ro.current = e === null || e.memoizedState === null ? Oh : Dh),
    (e = n(r, o)),
    Zn)
  ) {
    i = 0;
    do {
      if (((Zn = !1), (gr = 0), 25 <= i)) throw Error(x(301));
      (i += 1),
        (te = Z = null),
        (t.updateQueue = null),
        (ro.current = jh),
        (e = n(r, o));
    } while (Zn);
  }
  if (
    ((ro.current = Ro),
    (t = Z !== null && Z.next !== null),
    (Wt = 0),
    (te = Z = b = null),
    (Po = !1),
    t)
  )
    throw Error(x(300));
  return e;
}
function Es() {
  var e = gr !== 0;
  return (gr = 0), e;
}
function He() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return te === null ? (b.memoizedState = te = e) : (te = te.next = e), te;
}
function De() {
  if (Z === null) {
    var e = b.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Z.next;
  var t = te === null ? b.memoizedState : te.next;
  if (t !== null) (te = t), (Z = e);
  else {
    if (e === null) throw Error(x(310));
    (Z = e),
      (e = {
        memoizedState: Z.memoizedState,
        baseState: Z.baseState,
        baseQueue: Z.baseQueue,
        queue: Z.queue,
        next: null,
      }),
      te === null ? (b.memoizedState = te = e) : (te = te.next = e);
  }
  return te;
}
function vr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ti(e) {
  var t = De(),
    n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = Z,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var l = o.next;
      (o.next = i.next), (i.next = l);
    }
    (r.baseQueue = o = i), (n.pending = null);
  }
  if (o !== null) {
    (i = o.next), (r = r.baseState);
    var s = (l = null),
      a = null,
      u = i;
    do {
      var h = u.lane;
      if ((Wt & h) === h)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var f = {
          lane: h,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((s = a = f), (l = r)) : (a = a.next = f),
          (b.lanes |= h),
          (Qt |= h);
      }
      u = u.next;
    } while (u !== null && u !== i);
    a === null ? (l = r) : (a.next = s),
      Fe(r, t.memoizedState) || (ge = !0),
      (t.memoizedState = r),
      (t.baseState = l),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do (i = o.lane), (b.lanes |= i), (Qt |= i), (o = o.next);
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Ii(e) {
  var t = De(),
    n = t.queue;
  if (n === null) throw Error(x(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var l = (o = o.next);
    do (i = e(i, l.action)), (l = l.next);
    while (l !== o);
    Fe(i, t.memoizedState) || (ge = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function Gc() {}
function Xc(e, t) {
  var n = b,
    r = De(),
    o = t(),
    i = !Fe(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (ge = !0)),
    (r = r.queue),
    ks(Zc.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (te !== null && te.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      yr(9, Jc.bind(null, n, r, o, t), void 0, null),
      ne === null)
    )
      throw Error(x(349));
    Wt & 30 || Yc(n, t, o);
  }
  return o;
}
function Yc(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = b.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (b.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Jc(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), qc(t) && ed(e);
}
function Zc(e, t, n) {
  return n(function () {
    qc(t) && ed(e);
  });
}
function qc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Fe(e, n);
  } catch {
    return !0;
  }
}
function ed(e) {
  var t = tt(e, 1);
  t !== null && Be(t, e, 1, -1);
}
function ja(e) {
  var t = He();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: vr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Ih.bind(null, b, e)),
    [t.memoizedState, e]
  );
}
function yr(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = b.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (b.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function td() {
  return De().memoizedState;
}
function oo(e, t, n, r) {
  var o = He();
  (b.flags |= e),
    (o.memoizedState = yr(1 | t, n, void 0, r === void 0 ? null : r));
}
function Go(e, t, n, r) {
  var o = De();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Z !== null) {
    var l = Z.memoizedState;
    if (((i = l.destroy), r !== null && xs(r, l.deps))) {
      o.memoizedState = yr(t, n, i, r);
      return;
    }
  }
  (b.flags |= e), (o.memoizedState = yr(1 | t, n, i, r));
}
function La(e, t) {
  return oo(8390656, 8, e, t);
}
function ks(e, t) {
  return Go(2048, 8, e, t);
}
function nd(e, t) {
  return Go(4, 2, e, t);
}
function rd(e, t) {
  return Go(4, 4, e, t);
}
function od(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function id(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Go(4, 4, od.bind(null, t, e), n)
  );
}
function Cs() {}
function ld(e, t) {
  var n = De();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && xs(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function sd(e, t) {
  var n = De();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && xs(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function ad(e, t, n) {
  return Wt & 21
    ? (Fe(n, t) || ((n = pc()), (b.lanes |= n), (Qt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (ge = !0)), (e.memoizedState = n));
}
function Rh(e, t) {
  var n = A;
  (A = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Ri.transition;
  Ri.transition = {};
  try {
    e(!1), t();
  } finally {
    (A = n), (Ri.transition = r);
  }
}
function ud() {
  return De().memoizedState;
}
function Th(e, t, n) {
  var r = xt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    cd(e))
  )
    dd(t, n);
  else if (((n = Wc(e, t, n, r)), n !== null)) {
    var o = fe();
    Be(n, e, r, o), fd(n, t, r);
  }
}
function Ih(e, t, n) {
  var r = xt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (cd(e)) dd(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var l = t.lastRenderedState,
          s = i(l, n);
        if (((o.hasEagerState = !0), (o.eagerState = s), Fe(s, l))) {
          var a = t.interleaved;
          a === null
            ? ((o.next = o), gs(t))
            : ((o.next = a.next), (a.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (n = Wc(e, t, o, r)),
      n !== null && ((o = fe()), Be(n, e, r, o), fd(n, t, r));
  }
}
function cd(e) {
  var t = e.alternate;
  return e === b || (t !== null && t === b);
}
function dd(e, t) {
  Zn = Po = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function fd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), ns(e, n);
  }
}
var Ro = {
    readContext: Oe,
    useCallback: le,
    useContext: le,
    useEffect: le,
    useImperativeHandle: le,
    useInsertionEffect: le,
    useLayoutEffect: le,
    useMemo: le,
    useReducer: le,
    useRef: le,
    useState: le,
    useDebugValue: le,
    useDeferredValue: le,
    useTransition: le,
    useMutableSource: le,
    useSyncExternalStore: le,
    useId: le,
    unstable_isNewReconciler: !1,
  },
  Oh = {
    readContext: Oe,
    useCallback: function (e, t) {
      return (He().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Oe,
    useEffect: La,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        oo(4194308, 4, od.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return oo(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return oo(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = He();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = He();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Th.bind(null, b, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = He();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: ja,
    useDebugValue: Cs,
    useDeferredValue: function (e) {
      return (He().memoizedState = e);
    },
    useTransition: function () {
      var e = ja(!1),
        t = e[0];
      return (e = Rh.bind(null, e[1])), (He().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = b,
        o = He();
      if (F) {
        if (n === void 0) throw Error(x(407));
        n = n();
      } else {
        if (((n = t()), ne === null)) throw Error(x(349));
        Wt & 30 || Yc(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        La(Zc.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        yr(9, Jc.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = He(),
        t = ne.identifierPrefix;
      if (F) {
        var n = Je,
          r = Ye;
        (n = (r & ~(1 << (32 - Me(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = gr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Ph++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Dh = {
    readContext: Oe,
    useCallback: ld,
    useContext: Oe,
    useEffect: ks,
    useImperativeHandle: id,
    useInsertionEffect: nd,
    useLayoutEffect: rd,
    useMemo: sd,
    useReducer: Ti,
    useRef: td,
    useState: function () {
      return Ti(vr);
    },
    useDebugValue: Cs,
    useDeferredValue: function (e) {
      var t = De();
      return ad(t, Z.memoizedState, e);
    },
    useTransition: function () {
      var e = Ti(vr)[0],
        t = De().memoizedState;
      return [e, t];
    },
    useMutableSource: Gc,
    useSyncExternalStore: Xc,
    useId: ud,
    unstable_isNewReconciler: !1,
  },
  jh = {
    readContext: Oe,
    useCallback: ld,
    useContext: Oe,
    useEffect: ks,
    useImperativeHandle: id,
    useInsertionEffect: nd,
    useLayoutEffect: rd,
    useMemo: sd,
    useReducer: Ii,
    useRef: td,
    useState: function () {
      return Ii(vr);
    },
    useDebugValue: Cs,
    useDeferredValue: function (e) {
      var t = De();
      return Z === null ? (t.memoizedState = e) : ad(t, Z.memoizedState, e);
    },
    useTransition: function () {
      var e = Ii(vr)[0],
        t = De().memoizedState;
      return [e, t];
    },
    useMutableSource: Gc,
    useSyncExternalStore: Xc,
    useId: ud,
    unstable_isNewReconciler: !1,
  };
function Ae(e, t) {
  if (e && e.defaultProps) {
    (t = V({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function yl(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : V({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Xo = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? Yt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = fe(),
      o = xt(e),
      i = Ze(r, o);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = wt(e, i, o)),
      t !== null && (Be(t, e, o, r), no(t, e, o));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = fe(),
      o = xt(e),
      i = Ze(r, o);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = wt(e, i, o)),
      t !== null && (Be(t, e, o, r), no(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = fe(),
      r = xt(e),
      o = Ze(n, r);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = wt(e, o, r)),
      t !== null && (Be(t, e, r, n), no(t, e, r));
  },
};
function Aa(e, t, n, r, o, i, l) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, l)
      : t.prototype && t.prototype.isPureReactComponent
      ? !cr(n, r) || !cr(o, i)
      : !0
  );
}
function pd(e, t, n) {
  var r = !1,
    o = Rt,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = Oe(i))
      : ((o = ye(t) ? bt : ue.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? xn(e, o) : Rt)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Xo),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function za(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Xo.enqueueReplaceState(t, t.state, null);
}
function wl(e, t, n, r) {
  var o = e.stateNode;
  (o.props = n), (o.state = e.memoizedState), (o.refs = {}), vs(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (o.context = Oe(i))
    : ((i = ye(t) ? bt : ue.current), (o.context = xn(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (yl(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Xo.enqueueReplaceState(o, o.state, null),
      Co(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function Cn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += sp(r)), (r = r.return);
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function Oi(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function _l(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Lh = typeof WeakMap == "function" ? WeakMap : Map;
function hd(e, t, n) {
  (n = Ze(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Io || ((Io = !0), (Il = r)), _l(e, t);
    }),
    n
  );
}
function md(e, t, n) {
  (n = Ze(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    (n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        _l(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        _l(e, t),
          typeof r != "function" &&
            (_t === null ? (_t = new Set([this])) : _t.add(this));
        var l = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: l !== null ? l : "",
        });
      }),
    n
  );
}
function Ua(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Lh();
    var o = new Set();
    r.set(t, o);
  } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
  o.has(n) || (o.add(n), (e = Gh.bind(null, e, t, n)), t.then(e, e));
}
function Ma(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ba(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Ze(-1, 1)), (t.tag = 2), wt(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Ah = ot.ReactCurrentOwner,
  ge = !1;
function de(e, t, n, r) {
  t.child = e === null ? Vc(t, null, n, r) : En(t, e.child, n, r);
}
function Fa(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    vn(t, o),
    (r = Ss(e, t, n, r, i, o)),
    (n = Es()),
    e !== null && !ge
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        nt(e, t, o))
      : (F && n && cs(t), (t.flags |= 1), de(e, t, r, o), t.child)
  );
}
function $a(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !js(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), gd(e, t, i, r, o))
      : ((e = ao(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var l = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : cr), n(l, r) && e.ref === t.ref)
    )
      return nt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = St(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function gd(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (cr(i, r) && e.ref === t.ref)
      if (((ge = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (ge = !0);
      else return (t.lanes = e.lanes), nt(e, t, o);
  }
  return xl(e, t, n, r, o);
}
function vd(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        z(fn, _e),
        (_e |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          z(fn, _e),
          (_e |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        z(fn, _e),
        (_e |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      z(fn, _e),
      (_e |= r);
  return de(e, t, o, n), t.child;
}
function yd(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function xl(e, t, n, r, o) {
  var i = ye(n) ? bt : ue.current;
  return (
    (i = xn(t, i)),
    vn(t, o),
    (n = Ss(e, t, n, r, i, o)),
    (r = Es()),
    e !== null && !ge
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        nt(e, t, o))
      : (F && r && cs(t), (t.flags |= 1), de(e, t, n, o), t.child)
  );
}
function Ha(e, t, n, r, o) {
  if (ye(n)) {
    var i = !0;
    _o(t);
  } else i = !1;
  if ((vn(t, o), t.stateNode === null))
    io(e, t), pd(t, n, r), wl(t, n, r, o), (r = !0);
  else if (e === null) {
    var l = t.stateNode,
      s = t.memoizedProps;
    l.props = s;
    var a = l.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = Oe(u))
      : ((u = ye(n) ? bt : ue.current), (u = xn(t, u)));
    var h = n.getDerivedStateFromProps,
      f =
        typeof h == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((s !== r || a !== u) && za(t, l, r, u)),
      (st = !1);
    var m = t.memoizedState;
    (l.state = m),
      Co(t, r, l, o),
      (a = t.memoizedState),
      s !== r || m !== a || ve.current || st
        ? (typeof h == "function" && (yl(t, n, h, r), (a = t.memoizedState)),
          (s = st || Aa(t, n, s, r, m, a, u))
            ? (f ||
                (typeof l.UNSAFE_componentWillMount != "function" &&
                  typeof l.componentWillMount != "function") ||
                (typeof l.componentWillMount == "function" &&
                  l.componentWillMount(),
                typeof l.UNSAFE_componentWillMount == "function" &&
                  l.UNSAFE_componentWillMount()),
              typeof l.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (l.props = r),
          (l.state = a),
          (l.context = u),
          (r = s))
        : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (l = t.stateNode),
      Qc(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : Ae(t.type, s)),
      (l.props = u),
      (f = t.pendingProps),
      (m = l.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Oe(a))
        : ((a = ye(n) ? bt : ue.current), (a = xn(t, a)));
    var y = n.getDerivedStateFromProps;
    (h =
      typeof y == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function") ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((s !== f || m !== a) && za(t, l, r, a)),
      (st = !1),
      (m = t.memoizedState),
      (l.state = m),
      Co(t, r, l, o);
    var w = t.memoizedState;
    s !== f || m !== w || ve.current || st
      ? (typeof y == "function" && (yl(t, n, y, r), (w = t.memoizedState)),
        (u = st || Aa(t, n, u, r, m, w, a) || !1)
          ? (h ||
              (typeof l.UNSAFE_componentWillUpdate != "function" &&
                typeof l.componentWillUpdate != "function") ||
              (typeof l.componentWillUpdate == "function" &&
                l.componentWillUpdate(r, w, a),
              typeof l.UNSAFE_componentWillUpdate == "function" &&
                l.UNSAFE_componentWillUpdate(r, w, a)),
            typeof l.componentDidUpdate == "function" && (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof l.componentDidUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = w)),
        (l.props = r),
        (l.state = w),
        (l.context = a),
        (r = u))
      : (typeof l.componentDidUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof l.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Sl(e, t, n, r, i, o);
}
function Sl(e, t, n, r, o, i) {
  yd(e, t);
  var l = (t.flags & 128) !== 0;
  if (!r && !l) return o && Pa(t, n, !1), nt(e, t, i);
  (r = t.stateNode), (Ah.current = t);
  var s =
    l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && l
      ? ((t.child = En(t, e.child, null, i)), (t.child = En(t, null, s, i)))
      : de(e, t, s, i),
    (t.memoizedState = r.state),
    o && Pa(t, n, !0),
    t.child
  );
}
function wd(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Na(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Na(e, t.context, !1),
    ys(e, t.containerInfo);
}
function ba(e, t, n, r, o) {
  return Sn(), fs(o), (t.flags |= 256), de(e, t, n, r), t.child;
}
var El = { dehydrated: null, treeContext: null, retryLane: 0 };
function kl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function _d(e, t, n) {
  var r = t.pendingProps,
    o = H.current,
    i = !1,
    l = (t.flags & 128) !== 0,
    s;
  if (
    ((s = l) ||
      (s = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    s
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    z(H, o & 1),
    e === null)
  )
    return (
      gl(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((l = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (l = { mode: "hidden", children: l }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = l))
                : (i = Zo(l, r, 0, null)),
              (e = $t(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = kl(n)),
              (t.memoizedState = El),
              e)
            : Ns(t, l))
    );
  if (((o = e.memoizedState), o !== null && ((s = o.dehydrated), s !== null)))
    return zh(e, t, l, r, s, o, n);
  if (i) {
    (i = r.fallback), (l = t.mode), (o = e.child), (s = o.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(l & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = St(o, a)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      s !== null ? (i = St(s, i)) : ((i = $t(i, l, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (l = e.child.memoizedState),
      (l =
        l === null
          ? kl(n)
          : {
              baseLanes: l.baseLanes | n,
              cachePool: null,
              transitions: l.transitions,
            }),
      (i.memoizedState = l),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = El),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = St(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function Ns(e, t) {
  return (
    (t = Zo({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Wr(e, t, n, r) {
  return (
    r !== null && fs(r),
    En(t, e.child, null, n),
    (e = Ns(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function zh(e, t, n, r, o, i, l) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Oi(Error(x(422)))), Wr(e, t, l, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((i = r.fallback),
        (o = t.mode),
        (r = Zo({ mode: "visible", children: r.children }, o, 0, null)),
        (i = $t(i, o, l, null)),
        (i.flags |= 2),
        (r.return = t),
        (i.return = t),
        (r.sibling = i),
        (t.child = r),
        t.mode & 1 && En(t, e.child, null, l),
        (t.child.memoizedState = kl(l)),
        (t.memoizedState = El),
        i);
  if (!(t.mode & 1)) return Wr(e, t, l, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var s = r.dgst;
    return (r = s), (i = Error(x(419))), (r = Oi(i, r, void 0)), Wr(e, t, l, r);
  }
  if (((s = (l & e.childLanes) !== 0), ge || s)) {
    if (((r = ne), r !== null)) {
      switch (l & -l) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      (o = o & (r.suspendedLanes | l) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), tt(e, o), Be(r, e, o, -1));
    }
    return Ds(), (r = Oi(Error(x(421)))), Wr(e, t, l, r);
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Xh.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (xe = yt(o.nextSibling)),
      (Ee = t),
      (F = !0),
      (Ue = null),
      e !== null &&
        ((Pe[Re++] = Ye),
        (Pe[Re++] = Je),
        (Pe[Re++] = Vt),
        (Ye = e.id),
        (Je = e.overflow),
        (Vt = t)),
      (t = Ns(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Va(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), vl(e.return, t, n);
}
function Di(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function xd(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((de(e, t, r.children, n), (r = H.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Va(e, n, t);
        else if (e.tag === 19) Va(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((z(H, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          (e = n.alternate),
            e !== null && No(e) === null && (o = n),
            (n = n.sibling);
        (n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          Di(t, !1, o, n, i);
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && No(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = n), (n = o), (o = e);
        }
        Di(t, !0, n, null, i);
        break;
      case "together":
        Di(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function io(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function nt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Qt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(x(153));
  if (t.child !== null) {
    for (
      e = t.child, n = St(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = St(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Uh(e, t, n) {
  switch (t.tag) {
    case 3:
      wd(t), Sn();
      break;
    case 5:
      Kc(t);
      break;
    case 1:
      ye(t.type) && _o(t);
      break;
    case 4:
      ys(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      z(Eo, r._currentValue), (r._currentValue = o);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (z(H, H.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? _d(e, t, n)
          : (z(H, H.current & 1),
            (e = nt(e, t, n)),
            e !== null ? e.sibling : null);
      z(H, H.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return xd(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        z(H, H.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), vd(e, t, n);
  }
  return nt(e, t, n);
}
var Sd, Cl, Ed, kd;
Sd = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Cl = function () {};
Ed = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    (e = t.stateNode), Bt(Qe.current);
    var i = null;
    switch (n) {
      case "input":
        (o = Ki(e, o)), (r = Ki(e, r)), (i = []);
        break;
      case "select":
        (o = V({}, o, { value: void 0 })),
          (r = V({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (o = Yi(e, o)), (r = Yi(e, r)), (i = []);
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = yo);
    }
    Zi(n, r);
    var l;
    n = null;
    for (u in o)
      if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === "style") {
          var s = o[u];
          for (l in s) s.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (rr.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((s = o != null ? o[u] : void 0),
        r.hasOwnProperty(u) && a !== s && (a != null || s != null))
      )
        if (u === "style")
          if (s) {
            for (l in s)
              !s.hasOwnProperty(l) ||
                (a && a.hasOwnProperty(l)) ||
                (n || (n = {}), (n[l] = ""));
            for (l in a)
              a.hasOwnProperty(l) &&
                s[l] !== a[l] &&
                (n || (n = {}), (n[l] = a[l]));
          } else n || (i || (i = []), i.push(u, n)), (n = a);
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (s = s ? s.__html : void 0),
              a != null && s !== a && (i = i || []).push(u, a))
            : u === "children"
            ? (typeof a != "string" && typeof a != "number") ||
              (i = i || []).push(u, "" + a)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              (rr.hasOwnProperty(u)
                ? (a != null && u === "onScroll" && U("scroll", e),
                  i || s === a || (i = []))
                : (i = i || []).push(u, a));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
kd = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Fn(e, t) {
  if (!F)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function se(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Mh(e, t, n) {
  var r = t.pendingProps;
  switch ((ds(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return se(t), null;
    case 1:
      return ye(t.type) && wo(), se(t), null;
    case 3:
      return (
        (r = t.stateNode),
        kn(),
        B(ve),
        B(ue),
        _s(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (br(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ue !== null && (jl(Ue), (Ue = null)))),
        Cl(e, t),
        se(t),
        null
      );
    case 5:
      ws(t);
      var o = Bt(mr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Ed(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(x(166));
          return se(t), null;
        }
        if (((e = Bt(Qe.current)), br(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[be] = t), (r[pr] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              U("cancel", r), U("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              U("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Qn.length; o++) U(Qn[o], r);
              break;
            case "source":
              U("error", r);
              break;
            case "img":
            case "image":
            case "link":
              U("error", r), U("load", r);
              break;
            case "details":
              U("toggle", r);
              break;
            case "input":
              qs(r, i), U("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                U("invalid", r);
              break;
            case "textarea":
              ta(r, i), U("invalid", r);
          }
          Zi(n, i), (o = null);
          for (var l in i)
            if (i.hasOwnProperty(l)) {
              var s = i[l];
              l === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (i.suppressHydrationWarning !== !0 &&
                      Hr(r.textContent, s, e),
                    (o = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (i.suppressHydrationWarning !== !0 &&
                      Hr(r.textContent, s, e),
                    (o = ["children", "" + s]))
                : rr.hasOwnProperty(l) &&
                  s != null &&
                  l === "onScroll" &&
                  U("scroll", r);
            }
          switch (n) {
            case "input":
              Lr(r), ea(r, i, !0);
              break;
            case "textarea":
              Lr(r), na(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = yo);
          }
          (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (l = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Zu(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = l.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = l.createElement(n, { is: r.is }))
                : ((e = l.createElement(n)),
                  n === "select" &&
                    ((l = e),
                    r.multiple
                      ? (l.multiple = !0)
                      : r.size && (l.size = r.size)))
              : (e = l.createElementNS(e, n)),
            (e[be] = t),
            (e[pr] = r),
            Sd(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((l = qi(n, r)), n)) {
              case "dialog":
                U("cancel", e), U("close", e), (o = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                U("load", e), (o = r);
                break;
              case "video":
              case "audio":
                for (o = 0; o < Qn.length; o++) U(Qn[o], e);
                o = r;
                break;
              case "source":
                U("error", e), (o = r);
                break;
              case "img":
              case "image":
              case "link":
                U("error", e), U("load", e), (o = r);
                break;
              case "details":
                U("toggle", e), (o = r);
                break;
              case "input":
                qs(e, r), (o = Ki(e, r)), U("invalid", e);
                break;
              case "option":
                o = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = V({}, r, { value: void 0 })),
                  U("invalid", e);
                break;
              case "textarea":
                ta(e, r), (o = Yi(e, r)), U("invalid", e);
                break;
              default:
                o = r;
            }
            Zi(n, o), (s = o);
            for (i in s)
              if (s.hasOwnProperty(i)) {
                var a = s[i];
                i === "style"
                  ? tc(e, a)
                  : i === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && qu(e, a))
                  : i === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && or(e, a)
                    : typeof a == "number" && or(e, "" + a)
                  : i !== "suppressContentEditableWarning" &&
                    i !== "suppressHydrationWarning" &&
                    i !== "autoFocus" &&
                    (rr.hasOwnProperty(i)
                      ? a != null && i === "onScroll" && U("scroll", e)
                      : a != null && Yl(e, i, a, l));
              }
            switch (n) {
              case "input":
                Lr(e), ea(e, r, !1);
                break;
              case "textarea":
                Lr(e), na(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Pt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? pn(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      pn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = yo);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return se(t), null;
    case 6:
      if (e && t.stateNode != null) kd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(x(166));
        if (((n = Bt(mr.current)), Bt(Qe.current), br(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[be] = t),
            (i = r.nodeValue !== n) && ((e = Ee), e !== null))
          )
            switch (e.tag) {
              case 3:
                Hr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Hr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[be] = t),
            (t.stateNode = r);
      }
      return se(t), null;
    case 13:
      if (
        (B(H),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (F && xe !== null && t.mode & 1 && !(t.flags & 128))
          Hc(), Sn(), (t.flags |= 98560), (i = !1);
        else if (((i = br(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(x(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(x(317));
            i[be] = t;
          } else
            Sn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          se(t), (i = !1);
        } else Ue !== null && (jl(Ue), (Ue = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || H.current & 1 ? q === 0 && (q = 3) : Ds())),
          t.updateQueue !== null && (t.flags |= 4),
          se(t),
          null);
    case 4:
      return (
        kn(), Cl(e, t), e === null && dr(t.stateNode.containerInfo), se(t), null
      );
    case 10:
      return ms(t.type._context), se(t), null;
    case 17:
      return ye(t.type) && wo(), se(t), null;
    case 19:
      if ((B(H), (i = t.memoizedState), i === null)) return se(t), null;
      if (((r = (t.flags & 128) !== 0), (l = i.rendering), l === null))
        if (r) Fn(i, !1);
        else {
          if (q !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((l = No(e)), l !== null)) {
                for (
                  t.flags |= 128,
                    Fn(i, !1),
                    r = l.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (l = i.alternate),
                    l === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = l.childLanes),
                        (i.lanes = l.lanes),
                        (i.child = l.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = l.memoizedProps),
                        (i.memoizedState = l.memoizedState),
                        (i.updateQueue = l.updateQueue),
                        (i.type = l.type),
                        (e = l.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return z(H, (H.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            X() > Nn &&
            ((t.flags |= 128), (r = !0), Fn(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = No(l)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Fn(i, !0),
              i.tail === null && i.tailMode === "hidden" && !l.alternate && !F)
            )
              return se(t), null;
          } else
            2 * X() - i.renderingStartTime > Nn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Fn(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((l.sibling = t.child), (t.child = l))
          : ((n = i.last),
            n !== null ? (n.sibling = l) : (t.child = l),
            (i.last = l));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = X()),
          (t.sibling = null),
          (n = H.current),
          z(H, r ? (n & 1) | 2 : n & 1),
          t)
        : (se(t), null);
    case 22:
    case 23:
      return (
        Os(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? _e & 1073741824 && (se(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : se(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(x(156, t.tag));
}
function Bh(e, t) {
  switch ((ds(t), t.tag)) {
    case 1:
      return (
        ye(t.type) && wo(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        kn(),
        B(ve),
        B(ue),
        _s(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return ws(t), null;
    case 13:
      if ((B(H), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(x(340));
        Sn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return B(H), null;
    case 4:
      return kn(), null;
    case 10:
      return ms(t.type._context), null;
    case 22:
    case 23:
      return Os(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Qr = !1,
  ae = !1,
  Fh = typeof WeakSet == "function" ? WeakSet : Set,
  C = null;
function dn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        W(e, t, r);
      }
    else n.current = null;
}
function Nl(e, t, n) {
  try {
    n();
  } catch (r) {
    W(e, t, r);
  }
}
var Wa = !1;
function $h(e, t) {
  if (((ul = mo), (e = Tc()), us(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var l = 0,
            s = -1,
            a = -1,
            u = 0,
            h = 0,
            f = e,
            m = null;
          t: for (;;) {
            for (
              var y;
              f !== n || (o !== 0 && f.nodeType !== 3) || (s = l + o),
                f !== i || (r !== 0 && f.nodeType !== 3) || (a = l + r),
                f.nodeType === 3 && (l += f.nodeValue.length),
                (y = f.firstChild) !== null;

            )
              (m = f), (f = y);
            for (;;) {
              if (f === e) break t;
              if (
                (m === n && ++u === o && (s = l),
                m === i && ++h === r && (a = l),
                (y = f.nextSibling) !== null)
              )
                break;
              (f = m), (m = f.parentNode);
            }
            f = y;
          }
          n = s === -1 || a === -1 ? null : { start: s, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (cl = { focusedElem: e, selectionRange: n }, mo = !1, C = t; C !== null; )
    if (((t = C), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (C = e);
    else
      for (; C !== null; ) {
        t = C;
        try {
          var w = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (w !== null) {
                  var _ = w.memoizedProps,
                    S = w.memoizedState,
                    d = t.stateNode,
                    c = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? _ : Ae(t.type, _),
                      S
                    );
                  d.__reactInternalSnapshotBeforeUpdate = c;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(x(163));
            }
        } catch (v) {
          W(t, t.return, v);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (C = e);
          break;
        }
        C = t.return;
      }
  return (w = Wa), (Wa = !1), w;
}
function qn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        (o.destroy = void 0), i !== void 0 && Nl(t, n, i);
      }
      o = o.next;
    } while (o !== r);
  }
}
function Yo(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Pl(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Cd(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Cd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[be], delete t[pr], delete t[pl], delete t[Eh], delete t[kh])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Nd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Qa(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Nd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Rl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = yo));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Rl(e, t, n), e = e.sibling; e !== null; ) Rl(e, t, n), (e = e.sibling);
}
function Tl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Tl(e, t, n), e = e.sibling; e !== null; ) Tl(e, t, n), (e = e.sibling);
}
var re = null,
  ze = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; ) Pd(e, t, n), (n = n.sibling);
}
function Pd(e, t, n) {
  if (We && typeof We.onCommitFiberUnmount == "function")
    try {
      We.onCommitFiberUnmount(Ho, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ae || dn(n, t);
    case 6:
      var r = re,
        o = ze;
      (re = null),
        it(e, t, n),
        (re = r),
        (ze = o),
        re !== null &&
          (ze
            ? ((e = re),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null &&
        (ze
          ? ((e = re),
            (n = n.stateNode),
            e.nodeType === 8
              ? Ci(e.parentNode, n)
              : e.nodeType === 1 && Ci(e, n),
            ar(e))
          : Ci(re, n.stateNode));
      break;
    case 4:
      (r = re),
        (o = ze),
        (re = n.stateNode.containerInfo),
        (ze = !0),
        it(e, t, n),
        (re = r),
        (ze = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ae &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            l = i.destroy;
          (i = i.tag),
            l !== void 0 && (i & 2 || i & 4) && Nl(n, t, l),
            (o = o.next);
        } while (o !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (
        !ae &&
        (dn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (s) {
          W(n, t, s);
        }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ae = (r = ae) || n.memoizedState !== null), it(e, t, n), (ae = r))
        : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function Ka(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Fh()),
      t.forEach(function (r) {
        var o = Yh.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      });
  }
}
function Le(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          l = t,
          s = l;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              (re = s.stateNode), (ze = !1);
              break e;
            case 3:
              (re = s.stateNode.containerInfo), (ze = !0);
              break e;
            case 4:
              (re = s.stateNode.containerInfo), (ze = !0);
              break e;
          }
          s = s.return;
        }
        if (re === null) throw Error(x(160));
        Pd(i, l, o), (re = null), (ze = !1);
        var a = o.alternate;
        a !== null && (a.return = null), (o.return = null);
      } catch (u) {
        W(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) Rd(t, e), (t = t.sibling);
}
function Rd(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Le(t, e), $e(e), r & 4)) {
        try {
          qn(3, e, e.return), Yo(3, e);
        } catch (_) {
          W(e, e.return, _);
        }
        try {
          qn(5, e, e.return);
        } catch (_) {
          W(e, e.return, _);
        }
      }
      break;
    case 1:
      Le(t, e), $e(e), r & 512 && n !== null && dn(n, n.return);
      break;
    case 5:
      if (
        (Le(t, e),
        $e(e),
        r & 512 && n !== null && dn(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          or(o, "");
        } catch (_) {
          W(e, e.return, _);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          l = n !== null ? n.memoizedProps : i,
          s = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            s === "input" && i.type === "radio" && i.name != null && Yu(o, i),
              qi(s, l);
            var u = qi(s, i);
            for (l = 0; l < a.length; l += 2) {
              var h = a[l],
                f = a[l + 1];
              h === "style"
                ? tc(o, f)
                : h === "dangerouslySetInnerHTML"
                ? qu(o, f)
                : h === "children"
                ? or(o, f)
                : Yl(o, h, f, u);
            }
            switch (s) {
              case "input":
                Gi(o, i);
                break;
              case "textarea":
                Ju(o, i);
                break;
              case "select":
                var m = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var y = i.value;
                y != null
                  ? pn(o, !!i.multiple, y, !1)
                  : m !== !!i.multiple &&
                    (i.defaultValue != null
                      ? pn(o, !!i.multiple, i.defaultValue, !0)
                      : pn(o, !!i.multiple, i.multiple ? [] : "", !1));
            }
            o[pr] = i;
          } catch (_) {
            W(e, e.return, _);
          }
      }
      break;
    case 6:
      if ((Le(t, e), $e(e), r & 4)) {
        if (e.stateNode === null) throw Error(x(162));
        (o = e.stateNode), (i = e.memoizedProps);
        try {
          o.nodeValue = i;
        } catch (_) {
          W(e, e.return, _);
        }
      }
      break;
    case 3:
      if (
        (Le(t, e), $e(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          ar(t.containerInfo);
        } catch (_) {
          W(e, e.return, _);
        }
      break;
    case 4:
      Le(t, e), $e(e);
      break;
    case 13:
      Le(t, e),
        $e(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (Ts = X())),
        r & 4 && Ka(e);
      break;
    case 22:
      if (
        ((h = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ae = (u = ae) || h), Le(t, e), (ae = u)) : Le(t, e),
        $e(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !h && e.mode & 1)
        )
          for (C = e, h = e.child; h !== null; ) {
            for (f = C = h; C !== null; ) {
              switch (((m = C), (y = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  qn(4, m, m.return);
                  break;
                case 1:
                  dn(m, m.return);
                  var w = m.stateNode;
                  if (typeof w.componentWillUnmount == "function") {
                    (r = m), (n = m.return);
                    try {
                      (t = r),
                        (w.props = t.memoizedProps),
                        (w.state = t.memoizedState),
                        w.componentWillUnmount();
                    } catch (_) {
                      W(r, n, _);
                    }
                  }
                  break;
                case 5:
                  dn(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    Xa(f);
                    continue;
                  }
              }
              y !== null ? ((y.return = m), (C = y)) : Xa(f);
            }
            h = h.sibling;
          }
        e: for (h = null, f = e; ; ) {
          if (f.tag === 5) {
            if (h === null) {
              h = f;
              try {
                (o = f.stateNode),
                  u
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((s = f.stateNode),
                      (a = f.memoizedProps.style),
                      (l =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (s.style.display = ec("display", l)));
              } catch (_) {
                W(e, e.return, _);
              }
            }
          } else if (f.tag === 6) {
            if (h === null)
              try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (_) {
                W(e, e.return, _);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            h === f && (h = null), (f = f.return);
          }
          h === f && (h = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      Le(t, e), $e(e), r & 4 && Ka(e);
      break;
    case 21:
      break;
    default:
      Le(t, e), $e(e);
  }
}
function $e(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Nd(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(x(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (or(o, ""), (r.flags &= -33));
          var i = Qa(e);
          Tl(e, i, o);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo,
            s = Qa(e);
          Rl(e, s, l);
          break;
        default:
          throw Error(x(161));
      }
    } catch (a) {
      W(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Hh(e, t, n) {
  (C = e), Td(e);
}
function Td(e, t, n) {
  for (var r = (e.mode & 1) !== 0; C !== null; ) {
    var o = C,
      i = o.child;
    if (o.tag === 22 && r) {
      var l = o.memoizedState !== null || Qr;
      if (!l) {
        var s = o.alternate,
          a = (s !== null && s.memoizedState !== null) || ae;
        s = Qr;
        var u = ae;
        if (((Qr = l), (ae = a) && !u))
          for (C = o; C !== null; )
            (l = C),
              (a = l.child),
              l.tag === 22 && l.memoizedState !== null
                ? Ya(o)
                : a !== null
                ? ((a.return = l), (C = a))
                : Ya(o);
        for (; i !== null; ) (C = i), Td(i), (i = i.sibling);
        (C = o), (Qr = s), (ae = u);
      }
      Ga(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (C = i)) : Ga(e);
  }
}
function Ga(e) {
  for (; C !== null; ) {
    var t = C;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ae || Yo(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ae)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Ae(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && Da(t, i, r);
              break;
            case 3:
              var l = t.updateQueue;
              if (l !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Da(t, l, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var h = u.memoizedState;
                  if (h !== null) {
                    var f = h.dehydrated;
                    f !== null && ar(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(x(163));
          }
        ae || (t.flags & 512 && Pl(t));
      } catch (m) {
        W(t, t.return, m);
      }
    }
    if (t === e) {
      C = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (C = n);
      break;
    }
    C = t.return;
  }
}
function Xa(e) {
  for (; C !== null; ) {
    var t = C;
    if (t === e) {
      C = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (C = n);
      break;
    }
    C = t.return;
  }
}
function Ya(e) {
  for (; C !== null; ) {
    var t = C;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Yo(4, t);
          } catch (a) {
            W(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              W(t, o, a);
            }
          }
          var i = t.return;
          try {
            Pl(t);
          } catch (a) {
            W(t, i, a);
          }
          break;
        case 5:
          var l = t.return;
          try {
            Pl(t);
          } catch (a) {
            W(t, l, a);
          }
      }
    } catch (a) {
      W(t, t.return, a);
    }
    if (t === e) {
      C = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      (s.return = t.return), (C = s);
      break;
    }
    C = t.return;
  }
}
var bh = Math.ceil,
  To = ot.ReactCurrentDispatcher,
  Ps = ot.ReactCurrentOwner,
  Ie = ot.ReactCurrentBatchConfig,
  L = 0,
  ne = null,
  Y = null,
  oe = 0,
  _e = 0,
  fn = It(0),
  q = 0,
  wr = null,
  Qt = 0,
  Jo = 0,
  Rs = 0,
  er = null,
  me = null,
  Ts = 0,
  Nn = 1 / 0,
  Ge = null,
  Io = !1,
  Il = null,
  _t = null,
  Kr = !1,
  ft = null,
  Oo = 0,
  tr = 0,
  Ol = null,
  lo = -1,
  so = 0;
function fe() {
  return L & 6 ? X() : lo !== -1 ? lo : (lo = X());
}
function xt(e) {
  return e.mode & 1
    ? L & 2 && oe !== 0
      ? oe & -oe
      : Nh.transition !== null
      ? (so === 0 && (so = pc()), so)
      : ((e = A),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : _c(e.type))),
        e)
    : 1;
}
function Be(e, t, n, r) {
  if (50 < tr) throw ((tr = 0), (Ol = null), Error(x(185)));
  Cr(e, n, r),
    (!(L & 2) || e !== ne) &&
      (e === ne && (!(L & 2) && (Jo |= n), q === 4 && ut(e, oe)),
      we(e, r),
      n === 1 && L === 0 && !(t.mode & 1) && ((Nn = X() + 500), Ko && Ot()));
}
function we(e, t) {
  var n = e.callbackNode;
  Np(e, t);
  var r = ho(e, e === ne ? oe : 0);
  if (r === 0)
    n !== null && ia(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && ia(n), t === 1))
      e.tag === 0 ? Ch(Ja.bind(null, e)) : Bc(Ja.bind(null, e)),
        xh(function () {
          !(L & 6) && Ot();
        }),
        (n = null);
    else {
      switch (hc(r)) {
        case 1:
          n = ts;
          break;
        case 4:
          n = dc;
          break;
        case 16:
          n = po;
          break;
        case 536870912:
          n = fc;
          break;
        default:
          n = po;
      }
      n = Ud(n, Id.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function Id(e, t) {
  if (((lo = -1), (so = 0), L & 6)) throw Error(x(327));
  var n = e.callbackNode;
  if (yn() && e.callbackNode !== n) return null;
  var r = ho(e, e === ne ? oe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Do(e, r);
  else {
    t = r;
    var o = L;
    L |= 2;
    var i = Dd();
    (ne !== e || oe !== t) && ((Ge = null), (Nn = X() + 500), Ft(e, t));
    do
      try {
        Qh();
        break;
      } catch (s) {
        Od(e, s);
      }
    while (!0);
    hs(),
      (To.current = i),
      (L = o),
      Y !== null ? (t = 0) : ((ne = null), (oe = 0), (t = q));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = ol(e)), o !== 0 && ((r = o), (t = Dl(e, o)))), t === 1)
    )
      throw ((n = wr), Ft(e, 0), ut(e, r), we(e, X()), n);
    if (t === 6) ut(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !Vh(o) &&
          ((t = Do(e, r)),
          t === 2 && ((i = ol(e)), i !== 0 && ((r = i), (t = Dl(e, i)))),
          t === 1))
      )
        throw ((n = wr), Ft(e, 0), ut(e, r), we(e, X()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(x(345));
        case 2:
          At(e, me, Ge);
          break;
        case 3:
          if (
            (ut(e, r), (r & 130023424) === r && ((t = Ts + 500 - X()), 10 < t))
          ) {
            if (ho(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              fe(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = fl(At.bind(null, e, me, Ge), t);
            break;
          }
          At(e, me, Ge);
          break;
        case 4:
          if ((ut(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var l = 31 - Me(r);
            (i = 1 << l), (l = t[l]), l > o && (o = l), (r &= ~i);
          }
          if (
            ((r = o),
            (r = X() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * bh(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = fl(At.bind(null, e, me, Ge), r);
            break;
          }
          At(e, me, Ge);
          break;
        case 5:
          At(e, me, Ge);
          break;
        default:
          throw Error(x(329));
      }
    }
  }
  return we(e, X()), e.callbackNode === n ? Id.bind(null, e) : null;
}
function Dl(e, t) {
  var n = er;
  return (
    e.current.memoizedState.isDehydrated && (Ft(e, t).flags |= 256),
    (e = Do(e, t)),
    e !== 2 && ((t = me), (me = n), t !== null && jl(t)),
    e
  );
}
function jl(e) {
  me === null ? (me = e) : me.push.apply(me, e);
}
function Vh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!Fe(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function ut(e, t) {
  for (
    t &= ~Rs,
      t &= ~Jo,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Me(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Ja(e) {
  if (L & 6) throw Error(x(327));
  yn();
  var t = ho(e, 0);
  if (!(t & 1)) return we(e, X()), null;
  var n = Do(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ol(e);
    r !== 0 && ((t = r), (n = Dl(e, r)));
  }
  if (n === 1) throw ((n = wr), Ft(e, 0), ut(e, t), we(e, X()), n);
  if (n === 6) throw Error(x(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    At(e, me, Ge),
    we(e, X()),
    null
  );
}
function Is(e, t) {
  var n = L;
  L |= 1;
  try {
    return e(t);
  } finally {
    (L = n), L === 0 && ((Nn = X() + 500), Ko && Ot());
  }
}
function Kt(e) {
  ft !== null && ft.tag === 0 && !(L & 6) && yn();
  var t = L;
  L |= 1;
  var n = Ie.transition,
    r = A;
  try {
    if (((Ie.transition = null), (A = 1), e)) return e();
  } finally {
    (A = r), (Ie.transition = n), (L = t), !(L & 6) && Ot();
  }
}
function Os() {
  (_e = fn.current), B(fn);
}
function Ft(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), _h(n)), Y !== null))
    for (n = Y.return; n !== null; ) {
      var r = n;
      switch ((ds(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && wo();
          break;
        case 3:
          kn(), B(ve), B(ue), _s();
          break;
        case 5:
          ws(r);
          break;
        case 4:
          kn();
          break;
        case 13:
          B(H);
          break;
        case 19:
          B(H);
          break;
        case 10:
          ms(r.type._context);
          break;
        case 22:
        case 23:
          Os();
      }
      n = n.return;
    }
  if (
    ((ne = e),
    (Y = e = St(e.current, null)),
    (oe = _e = t),
    (q = 0),
    (wr = null),
    (Rs = Jo = Qt = 0),
    (me = er = null),
    Mt !== null)
  ) {
    for (t = 0; t < Mt.length; t++)
      if (((n = Mt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var l = i.next;
          (i.next = o), (r.next = l);
        }
        n.pending = r;
      }
    Mt = null;
  }
  return e;
}
function Od(e, t) {
  do {
    var n = Y;
    try {
      if ((hs(), (ro.current = Ro), Po)) {
        for (var r = b.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), (r = r.next);
        }
        Po = !1;
      }
      if (
        ((Wt = 0),
        (te = Z = b = null),
        (Zn = !1),
        (gr = 0),
        (Ps.current = null),
        n === null || n.return === null)
      ) {
        (q = 1), (wr = t), (Y = null);
        break;
      }
      e: {
        var i = e,
          l = n.return,
          s = n,
          a = t;
        if (
          ((t = oe),
          (s.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            h = s,
            f = h.tag;
          if (!(h.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var m = h.alternate;
            m
              ? ((h.updateQueue = m.updateQueue),
                (h.memoizedState = m.memoizedState),
                (h.lanes = m.lanes))
              : ((h.updateQueue = null), (h.memoizedState = null));
          }
          var y = Ma(l);
          if (y !== null) {
            (y.flags &= -257),
              Ba(y, l, s, i, t),
              y.mode & 1 && Ua(i, u, t),
              (t = y),
              (a = u);
            var w = t.updateQueue;
            if (w === null) {
              var _ = new Set();
              _.add(a), (t.updateQueue = _);
            } else w.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Ua(i, u, t), Ds();
              break e;
            }
            a = Error(x(426));
          }
        } else if (F && s.mode & 1) {
          var S = Ma(l);
          if (S !== null) {
            !(S.flags & 65536) && (S.flags |= 256),
              Ba(S, l, s, i, t),
              fs(Cn(a, s));
            break e;
          }
        }
        (i = a = Cn(a, s)),
          q !== 4 && (q = 2),
          er === null ? (er = [i]) : er.push(i),
          (i = l);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var d = hd(i, a, t);
              Oa(i, d);
              break e;
            case 1:
              s = a;
              var c = i.type,
                p = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (_t === null || !_t.has(p))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var v = md(i, s, t);
                Oa(i, v);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Ld(n);
    } catch (E) {
      (t = E), Y === n && n !== null && (Y = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Dd() {
  var e = To.current;
  return (To.current = Ro), e === null ? Ro : e;
}
function Ds() {
  (q === 0 || q === 3 || q === 2) && (q = 4),
    ne === null || (!(Qt & 268435455) && !(Jo & 268435455)) || ut(ne, oe);
}
function Do(e, t) {
  var n = L;
  L |= 2;
  var r = Dd();
  (ne !== e || oe !== t) && ((Ge = null), Ft(e, t));
  do
    try {
      Wh();
      break;
    } catch (o) {
      Od(e, o);
    }
  while (!0);
  if ((hs(), (L = n), (To.current = r), Y !== null)) throw Error(x(261));
  return (ne = null), (oe = 0), q;
}
function Wh() {
  for (; Y !== null; ) jd(Y);
}
function Qh() {
  for (; Y !== null && !vp(); ) jd(Y);
}
function jd(e) {
  var t = zd(e.alternate, e, _e);
  (e.memoizedProps = e.pendingProps),
    t === null ? Ld(e) : (Y = t),
    (Ps.current = null);
}
function Ld(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Bh(n, t)), n !== null)) {
        (n.flags &= 32767), (Y = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (q = 6), (Y = null);
        return;
      }
    } else if (((n = Mh(n, t, _e)), n !== null)) {
      Y = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      Y = t;
      return;
    }
    Y = t = e;
  } while (t !== null);
  q === 0 && (q = 5);
}
function At(e, t, n) {
  var r = A,
    o = Ie.transition;
  try {
    (Ie.transition = null), (A = 1), Kh(e, t, n, r);
  } finally {
    (Ie.transition = o), (A = r);
  }
  return null;
}
function Kh(e, t, n, r) {
  do yn();
  while (ft !== null);
  if (L & 6) throw Error(x(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(x(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (Pp(e, i),
    e === ne && ((Y = ne = null), (oe = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Kr ||
      ((Kr = !0),
      Ud(po, function () {
        return yn(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = Ie.transition), (Ie.transition = null);
    var l = A;
    A = 1;
    var s = L;
    (L |= 4),
      (Ps.current = null),
      $h(e, n),
      Rd(n, e),
      ph(cl),
      (mo = !!ul),
      (cl = ul = null),
      (e.current = n),
      Hh(n),
      yp(),
      (L = s),
      (A = l),
      (Ie.transition = i);
  } else e.current = n;
  if (
    (Kr && ((Kr = !1), (ft = e), (Oo = o)),
    (i = e.pendingLanes),
    i === 0 && (_t = null),
    xp(n.stateNode),
    we(e, X()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
  if (Io) throw ((Io = !1), (e = Il), (Il = null), e);
  return (
    Oo & 1 && e.tag !== 0 && yn(),
    (i = e.pendingLanes),
    i & 1 ? (e === Ol ? tr++ : ((tr = 0), (Ol = e))) : (tr = 0),
    Ot(),
    null
  );
}
function yn() {
  if (ft !== null) {
    var e = hc(Oo),
      t = Ie.transition,
      n = A;
    try {
      if (((Ie.transition = null), (A = 16 > e ? 16 : e), ft === null))
        var r = !1;
      else {
        if (((e = ft), (ft = null), (Oo = 0), L & 6)) throw Error(x(331));
        var o = L;
        for (L |= 4, C = e.current; C !== null; ) {
          var i = C,
            l = i.child;
          if (C.flags & 16) {
            var s = i.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var u = s[a];
                for (C = u; C !== null; ) {
                  var h = C;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      qn(8, h, i);
                  }
                  var f = h.child;
                  if (f !== null) (f.return = h), (C = f);
                  else
                    for (; C !== null; ) {
                      h = C;
                      var m = h.sibling,
                        y = h.return;
                      if ((Cd(h), h === u)) {
                        C = null;
                        break;
                      }
                      if (m !== null) {
                        (m.return = y), (C = m);
                        break;
                      }
                      C = y;
                    }
                }
              }
              var w = i.alternate;
              if (w !== null) {
                var _ = w.child;
                if (_ !== null) {
                  w.child = null;
                  do {
                    var S = _.sibling;
                    (_.sibling = null), (_ = S);
                  } while (_ !== null);
                }
              }
              C = i;
            }
          }
          if (i.subtreeFlags & 2064 && l !== null) (l.return = i), (C = l);
          else
            e: for (; C !== null; ) {
              if (((i = C), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    qn(9, i, i.return);
                }
              var d = i.sibling;
              if (d !== null) {
                (d.return = i.return), (C = d);
                break e;
              }
              C = i.return;
            }
        }
        var c = e.current;
        for (C = c; C !== null; ) {
          l = C;
          var p = l.child;
          if (l.subtreeFlags & 2064 && p !== null) (p.return = l), (C = p);
          else
            e: for (l = c; C !== null; ) {
              if (((s = C), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Yo(9, s);
                  }
                } catch (E) {
                  W(s, s.return, E);
                }
              if (s === l) {
                C = null;
                break e;
              }
              var v = s.sibling;
              if (v !== null) {
                (v.return = s.return), (C = v);
                break e;
              }
              C = s.return;
            }
        }
        if (
          ((L = o), Ot(), We && typeof We.onPostCommitFiberRoot == "function")
        )
          try {
            We.onPostCommitFiberRoot(Ho, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (A = n), (Ie.transition = t);
    }
  }
  return !1;
}
function Za(e, t, n) {
  (t = Cn(n, t)),
    (t = hd(e, t, 1)),
    (e = wt(e, t, 1)),
    (t = fe()),
    e !== null && (Cr(e, 1, t), we(e, t));
}
function W(e, t, n) {
  if (e.tag === 3) Za(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Za(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (_t === null || !_t.has(r)))
        ) {
          (e = Cn(n, e)),
            (e = md(t, e, 1)),
            (t = wt(t, e, 1)),
            (e = fe()),
            t !== null && (Cr(t, 1, e), we(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Gh(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = fe()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ne === e &&
      (oe & n) === n &&
      (q === 4 || (q === 3 && (oe & 130023424) === oe && 500 > X() - Ts)
        ? Ft(e, 0)
        : (Rs |= n)),
    we(e, t);
}
function Ad(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Ur), (Ur <<= 1), !(Ur & 130023424) && (Ur = 4194304))
      : (t = 1));
  var n = fe();
  (e = tt(e, t)), e !== null && (Cr(e, t, n), we(e, n));
}
function Xh(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Ad(e, n);
}
function Yh(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(x(314));
  }
  r !== null && r.delete(t), Ad(e, n);
}
var zd;
zd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || ve.current) ge = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (ge = !1), Uh(e, t, n);
      ge = !!(e.flags & 131072);
    }
  else (ge = !1), F && t.flags & 1048576 && Fc(t, So, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      io(e, t), (e = t.pendingProps);
      var o = xn(t, ue.current);
      vn(t, n), (o = Ss(null, t, r, e, o, n));
      var i = Es();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ye(r) ? ((i = !0), _o(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            vs(t),
            (o.updater = Xo),
            (t.stateNode = o),
            (o._reactInternals = t),
            wl(t, r, e, n),
            (t = Sl(null, t, r, !0, i, n)))
          : ((t.tag = 0), F && i && cs(t), de(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (io(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = Zh(r)),
          (e = Ae(r, e)),
          o)
        ) {
          case 0:
            t = xl(null, t, r, e, n);
            break e;
          case 1:
            t = Ha(null, t, r, e, n);
            break e;
          case 11:
            t = Fa(null, t, r, e, n);
            break e;
          case 14:
            t = $a(null, t, r, Ae(r.type, e), n);
            break e;
        }
        throw Error(x(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Ae(r, o)),
        xl(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Ae(r, o)),
        Ha(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((wd(t), e === null)) throw Error(x(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          Qc(e, t),
          Co(t, r, null, n);
        var l = t.memoizedState;
        if (((r = l.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: l.cache,
              pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
              transitions: l.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (o = Cn(Error(x(423)), t)), (t = ba(e, t, r, n, o));
            break e;
          } else if (r !== o) {
            (o = Cn(Error(x(424)), t)), (t = ba(e, t, r, n, o));
            break e;
          } else
            for (
              xe = yt(t.stateNode.containerInfo.firstChild),
                Ee = t,
                F = !0,
                Ue = null,
                n = Vc(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Sn(), r === o)) {
            t = nt(e, t, n);
            break e;
          }
          de(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Kc(t),
        e === null && gl(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (l = o.children),
        dl(r, o) ? (l = null) : i !== null && dl(r, i) && (t.flags |= 32),
        yd(e, t),
        de(e, t, l, n),
        t.child
      );
    case 6:
      return e === null && gl(t), null;
    case 13:
      return _d(e, t, n);
    case 4:
      return (
        ys(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = En(t, null, r, n)) : de(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Ae(r, o)),
        Fa(e, t, r, o, n)
      );
    case 7:
      return de(e, t, t.pendingProps, n), t.child;
    case 8:
      return de(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return de(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (l = o.value),
          z(Eo, r._currentValue),
          (r._currentValue = l),
          i !== null)
        )
          if (Fe(i.value, l)) {
            if (i.children === o.children && !ve.current) {
              t = nt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var s = i.dependencies;
              if (s !== null) {
                l = i.child;
                for (var a = s.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (i.tag === 1) {
                      (a = Ze(-1, n & -n)), (a.tag = 2);
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var h = u.pending;
                        h === null
                          ? (a.next = a)
                          : ((a.next = h.next), (h.next = a)),
                          (u.pending = a);
                      }
                    }
                    (i.lanes |= n),
                      (a = i.alternate),
                      a !== null && (a.lanes |= n),
                      vl(i.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (i.tag === 10) l = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((l = i.return), l === null)) throw Error(x(341));
                (l.lanes |= n),
                  (s = l.alternate),
                  s !== null && (s.lanes |= n),
                  vl(l, n, t),
                  (l = i.sibling);
              } else l = i.child;
              if (l !== null) l.return = i;
              else
                for (l = i; l !== null; ) {
                  if (l === t) {
                    l = null;
                    break;
                  }
                  if (((i = l.sibling), i !== null)) {
                    (i.return = l.return), (l = i);
                    break;
                  }
                  l = l.return;
                }
              i = l;
            }
        de(e, t, o.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        vn(t, n),
        (o = Oe(o)),
        (r = r(o)),
        (t.flags |= 1),
        de(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = Ae(r, t.pendingProps)),
        (o = Ae(r.type, o)),
        $a(e, t, r, o, n)
      );
    case 15:
      return gd(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : Ae(r, o)),
        io(e, t),
        (t.tag = 1),
        ye(r) ? ((e = !0), _o(t)) : (e = !1),
        vn(t, n),
        pd(t, r, o),
        wl(t, r, o, n),
        Sl(null, t, r, !0, e, n)
      );
    case 19:
      return xd(e, t, n);
    case 22:
      return vd(e, t, n);
  }
  throw Error(x(156, t.tag));
};
function Ud(e, t) {
  return cc(e, t);
}
function Jh(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Te(e, t, n, r) {
  return new Jh(e, t, n, r);
}
function js(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Zh(e) {
  if (typeof e == "function") return js(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Zl)) return 11;
    if (e === ql) return 14;
  }
  return 2;
}
function St(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Te(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function ao(e, t, n, r, o, i) {
  var l = 2;
  if (((r = e), typeof e == "function")) js(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else
    e: switch (e) {
      case tn:
        return $t(n.children, o, i, t);
      case Jl:
        (l = 8), (o |= 8);
        break;
      case bi:
        return (
          (e = Te(12, n, t, o | 2)), (e.elementType = bi), (e.lanes = i), e
        );
      case Vi:
        return (e = Te(13, n, t, o)), (e.elementType = Vi), (e.lanes = i), e;
      case Wi:
        return (e = Te(19, n, t, o)), (e.elementType = Wi), (e.lanes = i), e;
      case Ku:
        return Zo(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Wu:
              l = 10;
              break e;
            case Qu:
              l = 9;
              break e;
            case Zl:
              l = 11;
              break e;
            case ql:
              l = 14;
              break e;
            case lt:
              (l = 16), (r = null);
              break e;
          }
        throw Error(x(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Te(l, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function $t(e, t, n, r) {
  return (e = Te(7, e, r, t)), (e.lanes = n), e;
}
function Zo(e, t, n, r) {
  return (
    (e = Te(22, e, r, t)),
    (e.elementType = Ku),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ji(e, t, n) {
  return (e = Te(6, e, null, t)), (e.lanes = n), e;
}
function Li(e, t, n) {
  return (
    (t = Te(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function qh(e, t, n, r, o) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = hi(0)),
    (this.expirationTimes = hi(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = hi(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function Ls(e, t, n, r, o, i, l, s, a) {
  return (
    (e = new qh(e, t, n, s, a)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Te(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    vs(i),
    e
  );
}
function em(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: en,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function Md(e) {
  if (!e) return Rt;
  e = e._reactInternals;
  e: {
    if (Yt(e) !== e || e.tag !== 1) throw Error(x(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ye(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(x(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ye(n)) return Mc(e, n, t);
  }
  return t;
}
function Bd(e, t, n, r, o, i, l, s, a) {
  return (
    (e = Ls(n, r, !0, e, o, i, l, s, a)),
    (e.context = Md(null)),
    (n = e.current),
    (r = fe()),
    (o = xt(n)),
    (i = Ze(r, o)),
    (i.callback = t ?? null),
    wt(n, i, o),
    (e.current.lanes = o),
    Cr(e, o, r),
    we(e, r),
    e
  );
}
function qo(e, t, n, r) {
  var o = t.current,
    i = fe(),
    l = xt(o);
  return (
    (n = Md(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Ze(i, l)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = wt(o, t, l)),
    e !== null && (Be(e, o, l, i), no(e, o, l)),
    l
  );
}
function jo(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function qa(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function As(e, t) {
  qa(e, t), (e = e.alternate) && qa(e, t);
}
function tm() {
  return null;
}
var Fd =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function zs(e) {
  this._internalRoot = e;
}
ei.prototype.render = zs.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(x(409));
  qo(e, t, null, null);
};
ei.prototype.unmount = zs.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Kt(function () {
      qo(null, e, null, null);
    }),
      (t[et] = null);
  }
};
function ei(e) {
  this._internalRoot = e;
}
ei.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = vc();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < at.length && t !== 0 && t < at[n].priority; n++);
    at.splice(n, 0, e), n === 0 && wc(e);
  }
};
function Us(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ti(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function eu() {}
function nm(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var u = jo(l);
        i.call(u);
      };
    }
    var l = Bd(t, r, e, 0, null, !1, !1, "", eu);
    return (
      (e._reactRootContainer = l),
      (e[et] = l.current),
      dr(e.nodeType === 8 ? e.parentNode : e),
      Kt(),
      l
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var u = jo(a);
      s.call(u);
    };
  }
  var a = Ls(e, 0, !1, null, null, !1, !1, "", eu);
  return (
    (e._reactRootContainer = a),
    (e[et] = a.current),
    dr(e.nodeType === 8 ? e.parentNode : e),
    Kt(function () {
      qo(t, a, n, r);
    }),
    a
  );
}
function ni(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var l = i;
    if (typeof o == "function") {
      var s = o;
      o = function () {
        var a = jo(l);
        s.call(a);
      };
    }
    qo(t, l, e, o);
  } else l = nm(n, t, e, o, r);
  return jo(l);
}
mc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Wn(t.pendingLanes);
        n !== 0 &&
          (ns(t, n | 1), we(t, X()), !(L & 6) && ((Nn = X() + 500), Ot()));
      }
      break;
    case 13:
      Kt(function () {
        var r = tt(e, 1);
        if (r !== null) {
          var o = fe();
          Be(r, e, 1, o);
        }
      }),
        As(e, 1);
  }
};
rs = function (e) {
  if (e.tag === 13) {
    var t = tt(e, 134217728);
    if (t !== null) {
      var n = fe();
      Be(t, e, 134217728, n);
    }
    As(e, 134217728);
  }
};
gc = function (e) {
  if (e.tag === 13) {
    var t = xt(e),
      n = tt(e, t);
    if (n !== null) {
      var r = fe();
      Be(n, e, t, r);
    }
    As(e, t);
  }
};
vc = function () {
  return A;
};
yc = function (e, t) {
  var n = A;
  try {
    return (A = e), t();
  } finally {
    A = n;
  }
};
tl = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Gi(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = Qo(r);
            if (!o) throw Error(x(90));
            Xu(r), Gi(r, o);
          }
        }
      }
      break;
    case "textarea":
      Ju(e, n);
      break;
    case "select":
      (t = n.value), t != null && pn(e, !!n.multiple, t, !1);
  }
};
oc = Is;
ic = Kt;
var rm = { usingClientEntryPoint: !1, Events: [Pr, ln, Qo, nc, rc, Is] },
  $n = {
    findFiberByHostInstance: Ut,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  om = {
    bundleType: $n.bundleType,
    version: $n.version,
    rendererPackageName: $n.rendererPackageName,
    rendererConfig: $n.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ot.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = ac(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: $n.findFiberByHostInstance || tm,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Gr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Gr.isDisabled && Gr.supportsFiber)
    try {
      (Ho = Gr.inject(om)), (We = Gr);
    } catch {}
}
Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rm;
Ce.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Us(t)) throw Error(x(200));
  return em(e, t, null, n);
};
Ce.createRoot = function (e, t) {
  if (!Us(e)) throw Error(x(299));
  var n = !1,
    r = "",
    o = Fd;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = Ls(e, 1, !1, null, null, n, !1, r, o)),
    (e[et] = t.current),
    dr(e.nodeType === 8 ? e.parentNode : e),
    new zs(t)
  );
};
Ce.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(x(188))
      : ((e = Object.keys(e).join(",")), Error(x(268, e)));
  return (e = ac(t)), (e = e === null ? null : e.stateNode), e;
};
Ce.flushSync = function (e) {
  return Kt(e);
};
Ce.hydrate = function (e, t, n) {
  if (!ti(t)) throw Error(x(200));
  return ni(null, e, t, !0, n);
};
Ce.hydrateRoot = function (e, t, n) {
  if (!Us(e)) throw Error(x(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    l = Fd;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (l = n.onRecoverableError)),
    (t = Bd(t, null, e, 1, n ?? null, o, !1, i, l)),
    (e[et] = t.current),
    dr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o);
  return new ei(t);
};
Ce.render = function (e, t, n) {
  if (!ti(t)) throw Error(x(200));
  return ni(null, e, t, !1, n);
};
Ce.unmountComponentAtNode = function (e) {
  if (!ti(e)) throw Error(x(40));
  return e._reactRootContainer
    ? (Kt(function () {
        ni(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[et] = null);
        });
      }),
      !0)
    : !1;
};
Ce.unstable_batchedUpdates = Is;
Ce.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ti(n)) throw Error(x(200));
  if (e == null || e._reactInternals === void 0) throw Error(x(38));
  return ni(e, t, n, !1, r);
};
Ce.version = "18.3.1-next-f1338f8080-20240426";
function $d() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($d);
    } catch (e) {
      console.error(e);
    }
}
$d(), ($u.exports = Ce);
var im = $u.exports,
  Hd,
  tu = im;
(Hd = tu.createRoot), tu.hydrateRoot;
/**
 * @remix-run/router v1.19.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function _r() {
  return (
    (_r = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    _r.apply(this, arguments)
  );
}
var pt;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(pt || (pt = {}));
const nu = "popstate";
function lm(e) {
  e === void 0 && (e = {});
  function t(r, o) {
    let { pathname: i, search: l, hash: s } = r.location;
    return Ll(
      "",
      { pathname: i, search: l, hash: s },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default"
    );
  }
  function n(r, o) {
    return typeof o == "string" ? o : Lo(o);
  }
  return am(t, n, null, e);
}
function J(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function bd(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function sm() {
  return Math.random().toString(36).substr(2, 8);
}
function ru(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Ll(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    _r(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? In(t) : t,
      { state: n, key: (t && t.key) || r || sm() }
    )
  );
}
function Lo(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function In(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function am(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: o = document.defaultView, v5Compat: i = !1 } = r,
    l = o.history,
    s = pt.Pop,
    a = null,
    u = h();
  u == null && ((u = 0), l.replaceState(_r({}, l.state, { idx: u }), ""));
  function h() {
    return (l.state || { idx: null }).idx;
  }
  function f() {
    s = pt.Pop;
    let S = h(),
      d = S == null ? null : S - u;
    (u = S), a && a({ action: s, location: _.location, delta: d });
  }
  function m(S, d) {
    s = pt.Push;
    let c = Ll(_.location, S, d);
    u = h() + 1;
    let p = ru(c, u),
      v = _.createHref(c);
    try {
      l.pushState(p, "", v);
    } catch (E) {
      if (E instanceof DOMException && E.name === "DataCloneError") throw E;
      o.location.assign(v);
    }
    i && a && a({ action: s, location: _.location, delta: 1 });
  }
  function y(S, d) {
    s = pt.Replace;
    let c = Ll(_.location, S, d);
    u = h();
    let p = ru(c, u),
      v = _.createHref(c);
    l.replaceState(p, "", v),
      i && a && a({ action: s, location: _.location, delta: 0 });
  }
  function w(S) {
    let d = o.location.origin !== "null" ? o.location.origin : o.location.href,
      c = typeof S == "string" ? S : Lo(S);
    return (
      (c = c.replace(/ $/, "%20")),
      J(
        d,
        "No window.location.(origin|href) available to create URL for href: " +
          c
      ),
      new URL(c, d)
    );
  }
  let _ = {
    get action() {
      return s;
    },
    get location() {
      return e(o, l);
    },
    listen(S) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(nu, f),
        (a = S),
        () => {
          o.removeEventListener(nu, f), (a = null);
        }
      );
    },
    createHref(S) {
      return t(o, S);
    },
    createURL: w,
    encodeLocation(S) {
      let d = w(S);
      return { pathname: d.pathname, search: d.search, hash: d.hash };
    },
    push: m,
    replace: y,
    go(S) {
      return l.go(S);
    },
  };
  return _;
}
var ou;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(ou || (ou = {}));
function um(e, t, n) {
  return n === void 0 && (n = "/"), cm(e, t, n, !1);
}
function cm(e, t, n, r) {
  let o = typeof t == "string" ? In(t) : t,
    i = Ms(o.pathname || "/", n);
  if (i == null) return null;
  let l = Vd(e);
  dm(l);
  let s = null;
  for (let a = 0; s == null && a < l.length; ++a) {
    let u = Sm(i);
    s = _m(l[a], u, r);
  }
  return s;
}
function Vd(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let o = (i, l, s) => {
    let a = {
      relativePath: s === void 0 ? i.path || "" : s,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: l,
      route: i,
    };
    a.relativePath.startsWith("/") &&
      (J(
        a.relativePath.startsWith(r),
        'Absolute route path "' +
          a.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let u = Et([r, a.relativePath]),
      h = n.concat(a);
    i.children &&
      i.children.length > 0 &&
      (J(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + u + '".')
      ),
      Vd(i.children, t, h, u)),
      !(i.path == null && !i.index) &&
        t.push({ path: u, score: ym(u, i.index), routesMeta: h });
  };
  return (
    e.forEach((i, l) => {
      var s;
      if (i.path === "" || !((s = i.path) != null && s.includes("?"))) o(i, l);
      else for (let a of Wd(i.path)) o(i, l, a);
    }),
    t
  );
}
function Wd(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    o = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return o ? [i, ""] : [i];
  let l = Wd(r.join("/")),
    s = [];
  return (
    s.push(...l.map((a) => (a === "" ? i : [i, a].join("/")))),
    o && s.push(...l),
    s.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function dm(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : wm(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const fm = /^:[\w-]+$/,
  pm = 3,
  hm = 2,
  mm = 1,
  gm = 10,
  vm = -2,
  iu = (e) => e === "*";
function ym(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(iu) && (r += vm),
    t && (r += hm),
    n
      .filter((o) => !iu(o))
      .reduce((o, i) => o + (fm.test(i) ? pm : i === "" ? mm : gm), r)
  );
}
function wm(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function _m(e, t, n) {
  let { routesMeta: r } = e,
    o = {},
    i = "/",
    l = [];
  for (let s = 0; s < r.length; ++s) {
    let a = r[s],
      u = s === r.length - 1,
      h = i === "/" ? t : t.slice(i.length) || "/",
      f = lu(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: u },
        h
      ),
      m = a.route;
    if (
      (!f &&
        u &&
        n &&
        !r[r.length - 1].route.index &&
        (f = lu(
          { path: a.relativePath, caseSensitive: a.caseSensitive, end: !1 },
          h
        )),
      !f)
    )
      return null;
    Object.assign(o, f.params),
      l.push({
        params: o,
        pathname: Et([i, f.pathname]),
        pathnameBase: Nm(Et([i, f.pathnameBase])),
        route: m,
      }),
      f.pathnameBase !== "/" && (i = Et([i, f.pathnameBase]));
  }
  return l;
}
function lu(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = xm(e.path, e.caseSensitive, e.end),
    o = t.match(n);
  if (!o) return null;
  let i = o[0],
    l = i.replace(/(.)\/+$/, "$1"),
    s = o.slice(1);
  return {
    params: r.reduce((u, h, f) => {
      let { paramName: m, isOptional: y } = h;
      if (m === "*") {
        let _ = s[f] || "";
        l = i.slice(0, i.length - _.length).replace(/(.)\/+$/, "$1");
      }
      const w = s[f];
      return (
        y && !w ? (u[m] = void 0) : (u[m] = (w || "").replace(/%2F/g, "/")), u
      );
    }, {}),
    pathname: i,
    pathnameBase: l,
    pattern: e,
  };
}
function xm(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    bd(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    o =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (l, s, a) => (
            r.push({ paramName: s, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (o += "\\/*$")
      : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, t ? void 0 : "i"), r]
  );
}
function Sm(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      bd(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Ms(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Em(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: o = "",
  } = typeof e == "string" ? In(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : km(n, t)) : t,
    search: Pm(r),
    hash: Rm(o),
  };
}
function km(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((o) => {
      o === ".." ? n.length > 1 && n.pop() : o !== "." && n.push(o);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function Ai(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Cm(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function Qd(e, t) {
  let n = Cm(e);
  return t
    ? n.map((r, o) => (o === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function Kd(e, t, n, r) {
  r === void 0 && (r = !1);
  let o;
  typeof e == "string"
    ? (o = In(e))
    : ((o = _r({}, e)),
      J(
        !o.pathname || !o.pathname.includes("?"),
        Ai("?", "pathname", "search", o)
      ),
      J(
        !o.pathname || !o.pathname.includes("#"),
        Ai("#", "pathname", "hash", o)
      ),
      J(!o.search || !o.search.includes("#"), Ai("#", "search", "hash", o)));
  let i = e === "" || o.pathname === "",
    l = i ? "/" : o.pathname,
    s;
  if (l == null) s = n;
  else {
    let f = t.length - 1;
    if (!r && l.startsWith("..")) {
      let m = l.split("/");
      for (; m[0] === ".."; ) m.shift(), (f -= 1);
      o.pathname = m.join("/");
    }
    s = f >= 0 ? t[f] : "/";
  }
  let a = Em(o, s),
    u = l && l !== "/" && l.endsWith("/"),
    h = (i || l === ".") && n.endsWith("/");
  return !a.pathname.endsWith("/") && (u || h) && (a.pathname += "/"), a;
}
const Et = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Nm = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Pm = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Rm = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Tm(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const Gd = ["post", "put", "patch", "delete"];
new Set(Gd);
const Im = ["get", ...Gd];
new Set(Im);
/**
 * React Router v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function xr() {
  return (
    (xr = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    xr.apply(this, arguments)
  );
}
const Bs = k.createContext(null),
  Om = k.createContext(null),
  Jt = k.createContext(null),
  ri = k.createContext(null),
  Zt = k.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Xd = k.createContext(null);
function Dm(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  Tr() || J(!1);
  let { basename: r, navigator: o } = k.useContext(Jt),
    { hash: i, pathname: l, search: s } = Jd(e, { relative: n }),
    a = l;
  return (
    r !== "/" && (a = l === "/" ? r : Et([r, l])),
    o.createHref({ pathname: a, search: s, hash: i })
  );
}
function Tr() {
  return k.useContext(ri) != null;
}
function oi() {
  return Tr() || J(!1), k.useContext(ri).location;
}
function Yd(e) {
  k.useContext(Jt).static || k.useLayoutEffect(e);
}
function jm() {
  let { isDataRoute: e } = k.useContext(Zt);
  return e ? Qm() : Lm();
}
function Lm() {
  Tr() || J(!1);
  let e = k.useContext(Bs),
    { basename: t, future: n, navigator: r } = k.useContext(Jt),
    { matches: o } = k.useContext(Zt),
    { pathname: i } = oi(),
    l = JSON.stringify(Qd(o, n.v7_relativeSplatPath)),
    s = k.useRef(!1);
  return (
    Yd(() => {
      s.current = !0;
    }),
    k.useCallback(
      function (u, h) {
        if ((h === void 0 && (h = {}), !s.current)) return;
        if (typeof u == "number") {
          r.go(u);
          return;
        }
        let f = Kd(u, JSON.parse(l), i, h.relative === "path");
        e == null &&
          t !== "/" &&
          (f.pathname = f.pathname === "/" ? t : Et([t, f.pathname])),
          (h.replace ? r.replace : r.push)(f, h.state, h);
      },
      [t, r, l, i, e]
    )
  );
}
function Jd(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { future: r } = k.useContext(Jt),
    { matches: o } = k.useContext(Zt),
    { pathname: i } = oi(),
    l = JSON.stringify(Qd(o, r.v7_relativeSplatPath));
  return k.useMemo(() => Kd(e, JSON.parse(l), i, n === "path"), [e, l, i, n]);
}
function Am(e, t) {
  return zm(e, t);
}
function zm(e, t, n, r) {
  Tr() || J(!1);
  let { navigator: o } = k.useContext(Jt),
    { matches: i } = k.useContext(Zt),
    l = i[i.length - 1],
    s = l ? l.params : {};
  l && l.pathname;
  let a = l ? l.pathnameBase : "/";
  l && l.route;
  let u = oi(),
    h;
  if (t) {
    var f;
    let S = typeof t == "string" ? In(t) : t;
    a === "/" || ((f = S.pathname) != null && f.startsWith(a)) || J(!1),
      (h = S);
  } else h = u;
  let m = h.pathname || "/",
    y = m;
  if (a !== "/") {
    let S = a.replace(/^\//, "").split("/");
    y = "/" + m.replace(/^\//, "").split("/").slice(S.length).join("/");
  }
  let w = um(e, { pathname: y }),
    _ = $m(
      w &&
        w.map((S) =>
          Object.assign({}, S, {
            params: Object.assign({}, s, S.params),
            pathname: Et([
              a,
              o.encodeLocation
                ? o.encodeLocation(S.pathname).pathname
                : S.pathname,
            ]),
            pathnameBase:
              S.pathnameBase === "/"
                ? a
                : Et([
                    a,
                    o.encodeLocation
                      ? o.encodeLocation(S.pathnameBase).pathname
                      : S.pathnameBase,
                  ]),
          })
        ),
      i,
      n,
      r
    );
  return t && _
    ? k.createElement(
        ri.Provider,
        {
          value: {
            location: xr(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              h
            ),
            navigationType: pt.Pop,
          },
        },
        _
      )
    : _;
}
function Um() {
  let e = Wm(),
    t = Tm(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    o = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return k.createElement(
    k.Fragment,
    null,
    k.createElement("h2", null, "Unexpected Application Error!"),
    k.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? k.createElement("pre", { style: o }, n) : null,
    null
  );
}
const Mm = k.createElement(Um, null);
class Bm extends k.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? k.createElement(
          Zt.Provider,
          { value: this.props.routeContext },
          k.createElement(Xd.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function Fm(e) {
  let { routeContext: t, match: n, children: r } = e,
    o = k.useContext(Bs);
  return (
    o &&
      o.static &&
      o.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (o.staticContext._deepestRenderedBoundaryId = n.route.id),
    k.createElement(Zt.Provider, { value: t }, r)
  );
}
function $m(e, t, n, r) {
  var o;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (i = r) != null &&
      i.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let l = e,
    s = (o = n) == null ? void 0 : o.errors;
  if (s != null) {
    let h = l.findIndex(
      (f) => f.route.id && (s == null ? void 0 : s[f.route.id]) !== void 0
    );
    h >= 0 || J(!1), (l = l.slice(0, Math.min(l.length, h + 1)));
  }
  let a = !1,
    u = -1;
  if (n && r && r.v7_partialHydration)
    for (let h = 0; h < l.length; h++) {
      let f = l[h];
      if (
        ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (u = h),
        f.route.id)
      ) {
        let { loaderData: m, errors: y } = n,
          w =
            f.route.loader &&
            m[f.route.id] === void 0 &&
            (!y || y[f.route.id] === void 0);
        if (f.route.lazy || w) {
          (a = !0), u >= 0 ? (l = l.slice(0, u + 1)) : (l = [l[0]]);
          break;
        }
      }
    }
  return l.reduceRight((h, f, m) => {
    let y,
      w = !1,
      _ = null,
      S = null;
    n &&
      ((y = s && f.route.id ? s[f.route.id] : void 0),
      (_ = f.route.errorElement || Mm),
      a &&
        (u < 0 && m === 0
          ? ((w = !0), (S = null))
          : u === m &&
            ((w = !0), (S = f.route.hydrateFallbackElement || null))));
    let d = t.concat(l.slice(0, m + 1)),
      c = () => {
        let p;
        return (
          y
            ? (p = _)
            : w
            ? (p = S)
            : f.route.Component
            ? (p = k.createElement(f.route.Component, null))
            : f.route.element
            ? (p = f.route.element)
            : (p = h),
          k.createElement(Fm, {
            match: f,
            routeContext: { outlet: h, matches: d, isDataRoute: n != null },
            children: p,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || m === 0)
      ? k.createElement(Bm, {
          location: n.location,
          revalidation: n.revalidation,
          component: _,
          error: y,
          children: c(),
          routeContext: { outlet: null, matches: d, isDataRoute: !0 },
        })
      : c();
  }, null);
}
var Zd = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Zd || {}),
  Ao = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Ao || {});
function Hm(e) {
  let t = k.useContext(Bs);
  return t || J(!1), t;
}
function bm(e) {
  let t = k.useContext(Om);
  return t || J(!1), t;
}
function Vm(e) {
  let t = k.useContext(Zt);
  return t || J(!1), t;
}
function qd(e) {
  let t = Vm(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || J(!1), n.route.id;
}
function Wm() {
  var e;
  let t = k.useContext(Xd),
    n = bm(Ao.UseRouteError),
    r = qd(Ao.UseRouteError);
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function Qm() {
  let { router: e } = Hm(Zd.UseNavigateStable),
    t = qd(Ao.UseNavigateStable),
    n = k.useRef(!1);
  return (
    Yd(() => {
      n.current = !0;
    }),
    k.useCallback(
      function (o, i) {
        i === void 0 && (i = {}),
          n.current &&
            (typeof o == "number"
              ? e.navigate(o)
              : e.navigate(o, xr({ fromRouteId: t }, i)));
      },
      [e, t]
    )
  );
}
function Ke(e) {
  J(!1);
}
function Km(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: o = pt.Pop,
    navigator: i,
    static: l = !1,
    future: s,
  } = e;
  Tr() && J(!1);
  let a = t.replace(/^\/*/, "/"),
    u = k.useMemo(
      () => ({
        basename: a,
        navigator: i,
        static: l,
        future: xr({ v7_relativeSplatPath: !1 }, s),
      }),
      [a, s, i, l]
    );
  typeof r == "string" && (r = In(r));
  let {
      pathname: h = "/",
      search: f = "",
      hash: m = "",
      state: y = null,
      key: w = "default",
    } = r,
    _ = k.useMemo(() => {
      let S = Ms(h, a);
      return S == null
        ? null
        : {
            location: { pathname: S, search: f, hash: m, state: y, key: w },
            navigationType: o,
          };
    }, [a, h, f, m, y, w, o]);
  return _ == null
    ? null
    : k.createElement(
        Jt.Provider,
        { value: u },
        k.createElement(ri.Provider, { children: n, value: _ })
      );
}
function Gm(e) {
  let { children: t, location: n } = e;
  return Am(Al(t), n);
}
new Promise(() => {});
function Al(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    k.Children.forEach(e, (r, o) => {
      if (!k.isValidElement(r)) return;
      let i = [...t, o];
      if (r.type === k.Fragment) {
        n.push.apply(n, Al(r.props.children, i));
        return;
      }
      r.type !== Ke && J(!1), !r.props.index || !r.props.children || J(!1);
      let l = {
        id: r.props.id || i.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (l.children = Al(r.props.children, i)), n.push(l);
    }),
    n
  );
}
/**
 * React Router DOM v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function zl() {
  return (
    (zl = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    zl.apply(this, arguments)
  );
}
function Xm(e, t) {
  if (e == null) return {};
  var n = {},
    r = Object.keys(e),
    o,
    i;
  for (i = 0; i < r.length; i++)
    (o = r[i]), !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Ym(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Jm(e, t) {
  return e.button === 0 && (!t || t === "_self") && !Ym(e);
}
const Zm = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "unstable_viewTransition",
  ],
  qm = "6";
try {
  window.__reactRouterVersion = qm;
} catch {}
const eg = "startTransition",
  su = Gf[eg];
function tg(e) {
  let { basename: t, children: n, future: r, window: o } = e,
    i = k.useRef();
  i.current == null && (i.current = lm({ window: o, v5Compat: !0 }));
  let l = i.current,
    [s, a] = k.useState({ action: l.action, location: l.location }),
    { v7_startTransition: u } = r || {},
    h = k.useCallback(
      (f) => {
        u && su ? su(() => a(f)) : a(f);
      },
      [a, u]
    );
  return (
    k.useLayoutEffect(() => l.listen(h), [l, h]),
    k.createElement(Km, {
      basename: t,
      children: n,
      location: s.location,
      navigationType: s.action,
      navigator: l,
      future: r,
    })
  );
}
const ng =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  rg = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  kt = k.forwardRef(function (t, n) {
    let {
        onClick: r,
        relative: o,
        reloadDocument: i,
        replace: l,
        state: s,
        target: a,
        to: u,
        preventScrollReset: h,
        unstable_viewTransition: f,
      } = t,
      m = Xm(t, Zm),
      { basename: y } = k.useContext(Jt),
      w,
      _ = !1;
    if (typeof u == "string" && rg.test(u) && ((w = u), ng))
      try {
        let p = new URL(window.location.href),
          v = u.startsWith("//") ? new URL(p.protocol + u) : new URL(u),
          E = Ms(v.pathname, y);
        v.origin === p.origin && E != null
          ? (u = E + v.search + v.hash)
          : (_ = !0);
      } catch {}
    let S = Dm(u, { relative: o }),
      d = og(u, {
        replace: l,
        state: s,
        target: a,
        preventScrollReset: h,
        relative: o,
        unstable_viewTransition: f,
      });
    function c(p) {
      r && r(p), p.defaultPrevented || d(p);
    }
    return k.createElement(
      "a",
      zl({}, m, { href: w || S, onClick: _ || i ? r : c, ref: n, target: a })
    );
  });
var au;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(au || (au = {}));
var uu;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(uu || (uu = {}));
function og(e, t) {
  let {
      target: n,
      replace: r,
      state: o,
      preventScrollReset: i,
      relative: l,
      unstable_viewTransition: s,
    } = t === void 0 ? {} : t,
    a = jm(),
    u = oi(),
    h = Jd(e, { relative: l });
  return k.useCallback(
    (f) => {
      if (Jm(f, n)) {
        f.preventDefault();
        let m = r !== void 0 ? r : Lo(u) === Lo(h);
        a(e, {
          replace: m,
          state: o,
          preventScrollReset: i,
          relative: l,
          unstable_viewTransition: s,
        });
      }
    },
    [u, a, h, r, o, n, e, i, l, s]
  );
}
const ig = () => {
    const [e, t] = k.useState({ email: "", password: "" }),
      n = (o) => {
        t({ ...e, [o.target.name]: o.target.value });
      },
      r = async (o) => {
        o.preventDefault();
        const i = await fetch("/api/users/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Credentials": !0,
            },
            body: JSON.stringify(e),
          }),
          l = await i.json();
        i.ok
          ? (localStorage.setItem("token", l.token),
            (window.location.href = "/dashboard"))
          : alert(l.message);
      };
    return g.jsx("div", {
      className: "text-white max-w-6xl justify-between mx-auto",
      children: g.jsxs("div", {
        className: "flex flex-col md:flex-row mt-5",
        children: [
          g.jsxs("div", {
            className: "md:block md:w-[600px] px-4",
            children: [
              g.jsxs("p", {
                className: "md:text-6xl text-4xl justify-center mb-2 mt-2",
                children: [
                  "Welcome Back to ",
                  g.jsx("span", {
                    className: "text-[#b9283b]",
                    children: "Gammaridge!",
                  }),
                ],
              }),
              g.jsx("p", {
                className: "mb-2 md:text-xl text-lg",
                children:
                  "We’re glad to see you again. Log in to access your dashboard, manage your loans, and stay on top of your financial journey.",
              }),
            ],
          }),
          g.jsxs("div", {
            className: "flex flex-col p-6 w-full lg:w-[600px]",
            children: [
              g.jsxs("form", {
                onSubmit: r,
                className: "flex flex-col gap-3",
                children: [
                  g.jsx("input", {
                    name: "email",
                    value: e.email,
                    onChange: n,
                    placeholder: "Email",
                    required: !0,
                    className:
                      "bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]",
                  }),
                  g.jsx("input", {
                    name: "password",
                    type: "password",
                    value: e.password,
                    onChange: n,
                    placeholder: "Password",
                    required: !0,
                    className:
                      "bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b]",
                  }),
                  g.jsx("button", {
                    type: "submit",
                    className: "bg-[#b9283b] rounded-md text-white py-2 px-4",
                    children: "Login",
                  }),
                ],
              }),
              g.jsx("div", {
                className: "",
                children: g.jsxs("p", {
                  className: "mt-4",
                  children: [
                    "Don't have an account?",
                    g.jsx(kt, {
                      to: "/register",
                      children: g.jsx("span", {
                        className: "text-[#b9283b]",
                        children: " register",
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    });
  },
  lg = () => {
    const [e, t] = k.useState([]),
      [n, r] = k.useState({ amount: "", duration: "" });
    k.useEffect(() => {
      (async () => {
        const a = await (
          await fetch("/api/users/loans", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        ).json();
        t(a);
      })();
    }, []);
    const o = (l) => {
        r({ ...n, [l.target.name]: l.target.value });
      },
      i = async (l) => {
        l.preventDefault();
        const a = await (
          await fetch("/api/users/loan", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(n),
          })
        ).json();
        t([...e, a]), r({ amount: "" });
      };
    return g.jsxs("div", {
      className: "container mx-auto p-3 text-white",
      children: [
        g.jsx("h1", {
          className: "text-2xl font-bold",
          children: "User Dashboard",
        }),
        g.jsxs("div", {
          className: "flex flex-col gap-4",
          children: [
            g.jsx("h2", {
              className: "text-xl",
              children: "Apply for a new loan",
            }),
            g.jsxs("form", {
              onSubmit: i,
              className: "max-w-md gap-3 flex",
              children: [
                g.jsx("input", {
                  name: "amount",
                  value: n.amount,
                  onChange: o,
                  placeholder: "Amount",
                  required: !0,
                  className: "border p-2 w-full bg-gray-600 text-white",
                }),
                g.jsx("button", {
                  type: "submit",
                  className: "bg-[#b9283b] text-white py-2 px-4 w-full",
                  children: "Apply",
                }),
              ],
            }),
          ],
        }),
        g.jsx("h2", { className: "text-xl mt-8", children: "My Loans" }),
        e.length === 0
          ? g.jsx("p", { children: "You have no running loans" })
          : g.jsx("ul", {
              className: "flex p-4 flex-col",
              children: e.map((l) =>
                g.jsxs(
                  "li",
                  {
                    className: "mb-2",
                    children: [
                      "Amount: ",
                      g.jsx("span", {
                        className: "font-semibold",
                        children: "Ksh",
                      }),
                      " ",
                      l.amount,
                      " - Interest: ",
                      g.jsx("span", {
                        className: "font-semibold",
                        children: "Ksh",
                      }),
                      l.interest,
                      " - Total Amount:",
                      g.jsx("span", {
                        className: "font-semibold",
                        children: " Ksh",
                      }),
                      " ",
                      l.totalLoan,
                      " - Status: ",
                      l.status,
                    ],
                  },
                  l._id
                )
              ),
            }),
      ],
    });
  },
  sg = () => {
    const [e, t] = k.useState([]);
    k.useEffect(() => {
      (async () => {
        const i = await (
          await fetch("/api/admin/loans", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        ).json();
        t(i);
      })();
    }, []);
    const n = async (r, o) => {
      await fetch(`/api/admin/loan/${r}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: o }),
      }),
        t(e.map((i) => (i._id === r ? { ...i, status: o } : i)));
    };
    return g.jsxs("section", {
      className: "max-w-6xl mx-auto text-white",
      children: [
        g.jsx("div", {
          children: g.jsx("span", {
            className: "text-3xl",
            children: "Admin Dashboard",
          }),
        }),
        g.jsxs("div", {
          children: [
            g.jsx("span", {
              className: "text-3xl font-semibold",
              children: "Normal Loans",
            }),
            g.jsx("div", {
              children: g.jsx("div", {
                children:
                  e.length === 0
                    ? g.jsx("p", { children: "No loans found" })
                    : g.jsx("div", {
                        className: "flex gap-4 flex-col",
                        children: e.map((r) =>
                          g.jsxs(
                            "div",
                            {
                              children: [
                                g.jsxs("div", {
                                  className: "flex flex-row gap-3",
                                  children: [
                                    g.jsx(kt, {
                                      to: r.user.photoURLFront,
                                      target: "_blank",
                                      children: g.jsx("img", {
                                        src: r.user.photoURLFront,
                                        alt: "id front image",
                                        className: "w-[200px]",
                                      }),
                                    }),
                                    g.jsx(kt, {
                                      to: r.user.photoURLBack,
                                      target: "_blank",
                                      children: g.jsx("img", {
                                        src: r.user.photoURLBack,
                                        alt: "id front image",
                                        className: "w-[200px]",
                                      }),
                                    }),
                                  ],
                                }),
                                g.jsxs("div", {
                                  className: "flex flex-col gap-2",
                                  children: [
                                    g.jsxs("span", {
                                      children: ["User: ", r.user.name],
                                    }),
                                    g.jsxs("span", {
                                      children: ["Amount: ", r.amount],
                                    }),
                                    g.jsxs("span", {
                                      children: [
                                        "Duration: ",
                                        r.duration,
                                        " months",
                                      ],
                                    }),
                                    g.jsxs("span", {
                                      children: ["Status: ", r.status],
                                    }),
                                    g.jsxs("div", {
                                      className: "flex flex-row gap-3",
                                      children: [
                                        g.jsx("button", {
                                          onClick: () => n(r._id, "approved"),
                                          className:
                                            "bg-green-500 text-white ml-4 p-2",
                                          children: "Approve",
                                        }),
                                        g.jsx("button", {
                                          onClick: () => n(r._id, "rejected"),
                                          className:
                                            "bg-red-500 text-white ml-2 p-2",
                                          children: "Reject",
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            r._id
                          )
                        ),
                      }),
              }),
            }),
          ],
        }),
      ],
    });
  },
  ag = "/assets/money-img-Bs-sXKa7.jpg";
function ug() {
  return g.jsxs("div", {
    className:
      "flex p-3 max-w-6xl mx-auto text-white items-center flex-col md:flex-row",
    children: [
      g.jsxs("div", {
        className: "flex  flex-col p-3 max-w-1/2",
        children: [
          g.jsx("h1", {
            className: "text-5xl mb-4",
            children: "Welcome to Gammaridge Financial Solutions!",
          }),
          g.jsxs("p", {
            className: "text-2xl mb-4",
            children: [
              "Your ",
              g.jsx("span", {
                className: "text-[#b9283b]",
                children: "Trusted Partner",
              }),
              " for Short-Term Loans",
            ],
          }),
          g.jsx("div", {
            className: "mt-4",
            children: g.jsx(kt, {
              to: "/login",
              children: g.jsx("button", {
                className: "bg-[#8f202e] rounded-3xl px-6 py-2 text-white",
                children: "Get Started",
              }),
            }),
          }),
        ],
      }),
      g.jsx("div", {
        className: "max-w-xl",
        children: g.jsx("img", { src: ag, alt: "hand recieving money" }),
      }),
    ],
  });
}
var ef = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  cu = ht.createContext && ht.createContext(ef),
  cg = ["attr", "size", "title"];
function dg(e, t) {
  if (e == null) return {};
  var n = fg(e, t),
    r,
    o;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    for (o = 0; o < i.length; o++)
      (r = i[o]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function fg(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function zo() {
  return (
    (zo = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    zo.apply(this, arguments)
  );
}
function du(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Uo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? du(Object(n), !0).forEach(function (r) {
          pg(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : du(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function pg(e, t, n) {
  return (
    (t = hg(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function hg(e) {
  var t = mg(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function mg(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function tf(e) {
  return (
    e &&
    e.map((t, n) =>
      ht.createElement(t.tag, Uo({ key: n }, t.attr), tf(t.child))
    )
  );
}
function gg(e) {
  return (t) =>
    ht.createElement(vg, zo({ attr: Uo({}, e.attr) }, t), tf(e.child));
}
function vg(e) {
  var t = (n) => {
    var { attr: r, size: o, title: i } = e,
      l = dg(e, cg),
      s = o || n.size || "1em",
      a;
    return (
      n.className && (a = n.className),
      e.className && (a = (a ? a + " " : "") + e.className),
      ht.createElement(
        "svg",
        zo(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          l,
          {
            className: a,
            style: Uo(Uo({ color: e.color || n.color }, n.style), e.style),
            height: s,
            width: s,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        i && ht.createElement("title", null, i),
        e.children
      )
    );
  };
  return cu !== void 0
    ? ht.createElement(cu.Consumer, null, (n) => t(n))
    : t(ef);
}
function yg(e) {
  return gg({
    tag: "svg",
    attr: { viewBox: "0 0 24 24" },
    child: [
      { tag: "path", attr: { fill: "none", d: "M0 0h24v24H0V0z" }, child: [] },
      {
        tag: "path",
        attr: {
          d: "M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z",
        },
        child: [],
      },
    ],
  })(e);
}
function wg() {
  return g.jsx("div", {
    className: "shadow-lg",
    children: g.jsxs("div", {
      className: "flex items-center justify-between p-3 max-w-6xl mx-auto",
      children: [
        g.jsx("div", {
          className: "text-xl",
          children: g.jsxs(kt, {
            to: "/",
            children: [
              g.jsx("span", {
                className: "text-[#eeeeee] font-bold",
                children: "Gamma",
              }),
              g.jsx("span", {
                className: "text-[#b9283b] font-bold",
                children: "ridge",
              }),
            ],
          }),
        }),
        g.jsxs("div", {
          className: "flex flex-row gap-3 items-center",
          children: [
            g.jsx(yg, {
              className: "text-3xl text-white hover:text-[#b9283b] md:hidden",
            }),
            g.jsx(kt, {
              to: "/services",
              children: g.jsx("span", {
                className:
                  "hover:underline font-semibold hidden md:flex text-white",
                children: "What we do",
              }),
            }),
            g.jsx(kt, {
              to: "/contact",
              children: g.jsx("span", {
                className:
                  "hover:underline font-semibold hidden md:flex text-white",
                children: "Contact",
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
const _g = () => {
  const [e, t] = k.useState({ email: "", password: "" }),
    n = (o) => {
      t({ ...e, [o.target.name]: o.target.value });
    },
    r = async (o) => {
      o.preventDefault();
      const i = await fetch("/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(e),
        }),
        l = await i.json();
      i.ok
        ? (localStorage.setItem("token", l.token),
          (window.location.href = "/admin"))
        : alert(l.message);
    };
  return g.jsxs("div", {
    className: "container mx-auto flex flex-col items-center",
    children: [
      g.jsxs("div", {
        className: "text-white items-center",
        children: [
          g.jsx("p", {
            className: "text-3xl mb-4",
            children: "This is a restricted page. Do not share the link",
          }),
          g.jsx("p", {
            className: "mb-4",
            children: "Enter your credentials to access the admin dashboard",
          }),
        ],
      }),
      g.jsxs("form", {
        onSubmit: r,
        className: "max-w-md mx-auto space-y-4",
        children: [
          g.jsx("input", {
            name: "email",
            value: e.email,
            onChange: n,
            placeholder: "Email",
            required: !0,
            className: "border p-2 w-full",
          }),
          g.jsx("input", {
            name: "password",
            type: "password",
            value: e.password,
            onChange: n,
            placeholder: "Password",
            required: !0,
            className: "border p-2 w-full",
          }),
          g.jsx("button", {
            type: "submit",
            className: "bg-blue-500 text-white py-2 px-4 w-full",
            children: "Login",
          }),
        ],
      }),
    ],
  });
};
var fu = {};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const nf = function (e) {
    const t = [];
    let n = 0;
    for (let r = 0; r < e.length; r++) {
      let o = e.charCodeAt(r);
      o < 128
        ? (t[n++] = o)
        : o < 2048
        ? ((t[n++] = (o >> 6) | 192), (t[n++] = (o & 63) | 128))
        : (o & 64512) === 55296 &&
          r + 1 < e.length &&
          (e.charCodeAt(r + 1) & 64512) === 56320
        ? ((o = 65536 + ((o & 1023) << 10) + (e.charCodeAt(++r) & 1023)),
          (t[n++] = (o >> 18) | 240),
          (t[n++] = ((o >> 12) & 63) | 128),
          (t[n++] = ((o >> 6) & 63) | 128),
          (t[n++] = (o & 63) | 128))
        : ((t[n++] = (o >> 12) | 224),
          (t[n++] = ((o >> 6) & 63) | 128),
          (t[n++] = (o & 63) | 128));
    }
    return t;
  },
  xg = function (e) {
    const t = [];
    let n = 0,
      r = 0;
    for (; n < e.length; ) {
      const o = e[n++];
      if (o < 128) t[r++] = String.fromCharCode(o);
      else if (o > 191 && o < 224) {
        const i = e[n++];
        t[r++] = String.fromCharCode(((o & 31) << 6) | (i & 63));
      } else if (o > 239 && o < 365) {
        const i = e[n++],
          l = e[n++],
          s = e[n++],
          a =
            (((o & 7) << 18) | ((i & 63) << 12) | ((l & 63) << 6) | (s & 63)) -
            65536;
        (t[r++] = String.fromCharCode(55296 + (a >> 10))),
          (t[r++] = String.fromCharCode(56320 + (a & 1023)));
      } else {
        const i = e[n++],
          l = e[n++];
        t[r++] = String.fromCharCode(
          ((o & 15) << 12) | ((i & 63) << 6) | (l & 63)
        );
      }
    }
    return t.join("");
  },
  rf = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(e, t) {
      if (!Array.isArray(e))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const n = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = [];
      for (let o = 0; o < e.length; o += 3) {
        const i = e[o],
          l = o + 1 < e.length,
          s = l ? e[o + 1] : 0,
          a = o + 2 < e.length,
          u = a ? e[o + 2] : 0,
          h = i >> 2,
          f = ((i & 3) << 4) | (s >> 4);
        let m = ((s & 15) << 2) | (u >> 6),
          y = u & 63;
        a || ((y = 64), l || (m = 64)), r.push(n[h], n[f], n[m], n[y]);
      }
      return r.join("");
    },
    encodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? btoa(e)
        : this.encodeByteArray(nf(e), t);
    },
    decodeString(e, t) {
      return this.HAS_NATIVE_SUPPORT && !t
        ? atob(e)
        : xg(this.decodeStringToByteArray(e, t));
    },
    decodeStringToByteArray(e, t) {
      this.init_();
      const n = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let o = 0; o < e.length; ) {
        const i = n[e.charAt(o++)],
          s = o < e.length ? n[e.charAt(o)] : 0;
        ++o;
        const u = o < e.length ? n[e.charAt(o)] : 64;
        ++o;
        const f = o < e.length ? n[e.charAt(o)] : 64;
        if ((++o, i == null || s == null || u == null || f == null))
          throw new Sg();
        const m = (i << 2) | (s >> 4);
        if ((r.push(m), u !== 64)) {
          const y = ((s << 4) & 240) | (u >> 2);
          if ((r.push(y), f !== 64)) {
            const w = ((u << 6) & 192) | f;
            r.push(w);
          }
        }
      }
      return r;
    },
    init_() {
      if (!this.byteToCharMap_) {
        (this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {});
        for (let e = 0; e < this.ENCODED_VALS.length; e++)
          (this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
            (this.charToByteMap_[this.byteToCharMap_[e]] = e),
            (this.byteToCharMapWebSafe_[e] =
              this.ENCODED_VALS_WEBSAFE.charAt(e)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
            e >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] = e),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] = e));
      }
    },
  };
class Sg extends Error {
  constructor() {
    super(...arguments), (this.name = "DecodeBase64StringError");
  }
}
const Eg = function (e) {
    const t = nf(e);
    return rf.encodeByteArray(t, !0);
  },
  Mo = function (e) {
    return Eg(e).replace(/\./g, "");
  },
  kg = function (e) {
    try {
      return rf.decodeString(e, !0);
    } catch (t) {
      console.error("base64Decode failed: ", t);
    }
    return null;
  };
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Cg() {
  if (typeof self < "u") return self;
  if (typeof window < "u") return window;
  if (typeof global < "u") return global;
  throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ng = () => Cg().__FIREBASE_DEFAULTS__,
  Pg = () => {
    if (typeof process > "u" || typeof fu > "u") return;
    const e = fu.__FIREBASE_DEFAULTS__;
    if (e) return JSON.parse(e);
  },
  Rg = () => {
    if (typeof document > "u") return;
    let e;
    try {
      e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
    } catch {
      return;
    }
    const t = e && kg(e[1]);
    return t && JSON.parse(t);
  },
  of = () => {
    try {
      return Ng() || Pg() || Rg();
    } catch (e) {
      console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
      return;
    }
  },
  Tg = (e) => {
    var t, n;
    return (n =
      (t = of()) === null || t === void 0 ? void 0 : t.emulatorHosts) ===
      null || n === void 0
      ? void 0
      : n[e];
  },
  Ig = (e) => {
    const t = Tg(e);
    if (!t) return;
    const n = t.lastIndexOf(":");
    if (n <= 0 || n + 1 === t.length)
      throw new Error(`Invalid host ${t} with no separate hostname and port!`);
    const r = parseInt(t.substring(n + 1), 10);
    return t[0] === "[" ? [t.substring(1, n - 1), r] : [t.substring(0, n), r];
  },
  lf = () => {
    var e;
    return (e = of()) === null || e === void 0 ? void 0 : e.config;
  };
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Og {
  constructor() {
    (this.reject = () => {}),
      (this.resolve = () => {}),
      (this.promise = new Promise((t, n) => {
        (this.resolve = t), (this.reject = n);
      }));
  }
  wrapCallback(t) {
    return (n, r) => {
      n ? this.reject(n) : this.resolve(r),
        typeof t == "function" &&
          (this.promise.catch(() => {}), t.length === 1 ? t(n) : t(n, r));
    };
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Dg(e, t) {
  if (e.uid)
    throw new Error(
      'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.'
    );
  const n = { alg: "none", type: "JWT" },
    r = t || "demo-project",
    o = e.iat || 0,
    i = e.sub || e.user_id;
  if (!i)
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  const l = Object.assign(
    {
      iss: `https://securetoken.google.com/${r}`,
      aud: r,
      iat: o,
      exp: o + 3600,
      auth_time: o,
      sub: i,
      user_id: i,
      firebase: { sign_in_provider: "custom", identities: {} },
    },
    e
  );
  return [Mo(JSON.stringify(n)), Mo(JSON.stringify(l)), ""].join(".");
}
function jg() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function Lg() {
  return new Promise((e, t) => {
    try {
      let n = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module",
        o = self.indexedDB.open(r);
      (o.onsuccess = () => {
        o.result.close(), n || self.indexedDB.deleteDatabase(r), e(!0);
      }),
        (o.onupgradeneeded = () => {
          n = !1;
        }),
        (o.onerror = () => {
          var i;
          t(
            ((i = o.error) === null || i === void 0 ? void 0 : i.message) || ""
          );
        });
    } catch (n) {
      t(n);
    }
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ag = "FirebaseError";
class On extends Error {
  constructor(t, n, r) {
    super(n),
      (this.code = t),
      (this.customData = r),
      (this.name = Ag),
      Object.setPrototypeOf(this, On.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, sf.prototype.create);
  }
}
class sf {
  constructor(t, n, r) {
    (this.service = t), (this.serviceName = n), (this.errors = r);
  }
  create(t, ...n) {
    const r = n[0] || {},
      o = `${this.service}/${t}`,
      i = this.errors[t],
      l = i ? zg(i, r) : "Error",
      s = `${this.serviceName}: ${l} (${o}).`;
    return new On(o, s, r);
  }
}
function zg(e, t) {
  return e.replace(Ug, (n, r) => {
    const o = t[r];
    return o != null ? String(o) : `<${r}?>`;
  });
}
const Ug = /\{\$([^}]+)}/g;
function Ul(e, t) {
  if (e === t) return !0;
  const n = Object.keys(e),
    r = Object.keys(t);
  for (const o of n) {
    if (!r.includes(o)) return !1;
    const i = e[o],
      l = t[o];
    if (pu(i) && pu(l)) {
      if (!Ul(i, l)) return !1;
    } else if (i !== l) return !1;
  }
  for (const o of r) if (!n.includes(o)) return !1;
  return !0;
}
function pu(e) {
  return e !== null && typeof e == "object";
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ii(e) {
  return e && e._delegate ? e._delegate : e;
}
class Sr {
  constructor(t, n, r) {
    (this.name = t),
      (this.instanceFactory = n),
      (this.type = r),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null);
  }
  setInstantiationMode(t) {
    return (this.instantiationMode = t), this;
  }
  setMultipleInstances(t) {
    return (this.multipleInstances = t), this;
  }
  setServiceProps(t) {
    return (this.serviceProps = t), this;
  }
  setInstanceCreatedCallback(t) {
    return (this.onInstanceCreated = t), this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const zt = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Mg {
  constructor(t, n) {
    (this.name = t),
      (this.container = n),
      (this.component = null),
      (this.instances = new Map()),
      (this.instancesDeferred = new Map()),
      (this.instancesOptions = new Map()),
      (this.onInitCallbacks = new Map());
  }
  get(t) {
    const n = this.normalizeInstanceIdentifier(t);
    if (!this.instancesDeferred.has(n)) {
      const r = new Og();
      if (
        (this.instancesDeferred.set(n, r),
        this.isInitialized(n) || this.shouldAutoInitialize())
      )
        try {
          const o = this.getOrInitializeService({ instanceIdentifier: n });
          o && r.resolve(o);
        } catch {}
    }
    return this.instancesDeferred.get(n).promise;
  }
  getImmediate(t) {
    var n;
    const r = this.normalizeInstanceIdentifier(
        t == null ? void 0 : t.identifier
      ),
      o =
        (n = t == null ? void 0 : t.optional) !== null && n !== void 0 ? n : !1;
    if (this.isInitialized(r) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({ instanceIdentifier: r });
      } catch (i) {
        if (o) return null;
        throw i;
      }
    else {
      if (o) return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(t) {
    if (t.name !== this.name)
      throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (((this.component = t), !!this.shouldAutoInitialize())) {
      if (Fg(t))
        try {
          this.getOrInitializeService({ instanceIdentifier: zt });
        } catch {}
      for (const [n, r] of this.instancesDeferred.entries()) {
        const o = this.normalizeInstanceIdentifier(n);
        try {
          const i = this.getOrInitializeService({ instanceIdentifier: o });
          r.resolve(i);
        } catch {}
      }
    }
  }
  clearInstance(t = zt) {
    this.instancesDeferred.delete(t),
      this.instancesOptions.delete(t),
      this.instances.delete(t);
  }
  async delete() {
    const t = Array.from(this.instances.values());
    await Promise.all([
      ...t.filter((n) => "INTERNAL" in n).map((n) => n.INTERNAL.delete()),
      ...t.filter((n) => "_delete" in n).map((n) => n._delete()),
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(t = zt) {
    return this.instances.has(t);
  }
  getOptions(t = zt) {
    return this.instancesOptions.get(t) || {};
  }
  initialize(t = {}) {
    const { options: n = {} } = t,
      r = this.normalizeInstanceIdentifier(t.instanceIdentifier);
    if (this.isInitialized(r))
      throw Error(`${this.name}(${r}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const o = this.getOrInitializeService({
      instanceIdentifier: r,
      options: n,
    });
    for (const [i, l] of this.instancesDeferred.entries()) {
      const s = this.normalizeInstanceIdentifier(i);
      r === s && l.resolve(o);
    }
    return o;
  }
  onInit(t, n) {
    var r;
    const o = this.normalizeInstanceIdentifier(n),
      i =
        (r = this.onInitCallbacks.get(o)) !== null && r !== void 0
          ? r
          : new Set();
    i.add(t), this.onInitCallbacks.set(o, i);
    const l = this.instances.get(o);
    return (
      l && t(l, o),
      () => {
        i.delete(t);
      }
    );
  }
  invokeOnInitCallbacks(t, n) {
    const r = this.onInitCallbacks.get(n);
    if (r)
      for (const o of r)
        try {
          o(t, n);
        } catch {}
  }
  getOrInitializeService({ instanceIdentifier: t, options: n = {} }) {
    let r = this.instances.get(t);
    if (
      !r &&
      this.component &&
      ((r = this.component.instanceFactory(this.container, {
        instanceIdentifier: Bg(t),
        options: n,
      })),
      this.instances.set(t, r),
      this.instancesOptions.set(t, n),
      this.invokeOnInitCallbacks(r, t),
      this.component.onInstanceCreated)
    )
      try {
        this.component.onInstanceCreated(this.container, t, r);
      } catch {}
    return r || null;
  }
  normalizeInstanceIdentifier(t = zt) {
    return this.component ? (this.component.multipleInstances ? t : zt) : t;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function Bg(e) {
  return e === zt ? void 0 : e;
}
function Fg(e) {
  return e.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class $g {
  constructor(t) {
    (this.name = t), (this.providers = new Map());
  }
  addComponent(t) {
    const n = this.getProvider(t.name);
    if (n.isComponentSet())
      throw new Error(
        `Component ${t.name} has already been registered with ${this.name}`
      );
    n.setComponent(t);
  }
  addOrOverwriteComponent(t) {
    this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name),
      this.addComponent(t);
  }
  getProvider(t) {
    if (this.providers.has(t)) return this.providers.get(t);
    const n = new Mg(t, this);
    return this.providers.set(t, n), n;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var M;
(function (e) {
  (e[(e.DEBUG = 0)] = "DEBUG"),
    (e[(e.VERBOSE = 1)] = "VERBOSE"),
    (e[(e.INFO = 2)] = "INFO"),
    (e[(e.WARN = 3)] = "WARN"),
    (e[(e.ERROR = 4)] = "ERROR"),
    (e[(e.SILENT = 5)] = "SILENT");
})(M || (M = {}));
const Hg = {
    debug: M.DEBUG,
    verbose: M.VERBOSE,
    info: M.INFO,
    warn: M.WARN,
    error: M.ERROR,
    silent: M.SILENT,
  },
  bg = M.INFO,
  Vg = {
    [M.DEBUG]: "log",
    [M.VERBOSE]: "log",
    [M.INFO]: "info",
    [M.WARN]: "warn",
    [M.ERROR]: "error",
  },
  Wg = (e, t, ...n) => {
    if (t < e.logLevel) return;
    const r = new Date().toISOString(),
      o = Vg[t];
    if (o) console[o](`[${r}]  ${e.name}:`, ...n);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${t})`
      );
  };
class Qg {
  constructor(t) {
    (this.name = t),
      (this._logLevel = bg),
      (this._logHandler = Wg),
      (this._userLogHandler = null);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(t) {
    if (!(t in M))
      throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
    this._logLevel = t;
  }
  setLogLevel(t) {
    this._logLevel = typeof t == "string" ? Hg[t] : t;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(t) {
    if (typeof t != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = t;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(t) {
    this._userLogHandler = t;
  }
  debug(...t) {
    this._userLogHandler && this._userLogHandler(this, M.DEBUG, ...t),
      this._logHandler(this, M.DEBUG, ...t);
  }
  log(...t) {
    this._userLogHandler && this._userLogHandler(this, M.VERBOSE, ...t),
      this._logHandler(this, M.VERBOSE, ...t);
  }
  info(...t) {
    this._userLogHandler && this._userLogHandler(this, M.INFO, ...t),
      this._logHandler(this, M.INFO, ...t);
  }
  warn(...t) {
    this._userLogHandler && this._userLogHandler(this, M.WARN, ...t),
      this._logHandler(this, M.WARN, ...t);
  }
  error(...t) {
    this._userLogHandler && this._userLogHandler(this, M.ERROR, ...t),
      this._logHandler(this, M.ERROR, ...t);
  }
}
const Kg = (e, t) => t.some((n) => e instanceof n);
let hu, mu;
function Gg() {
  return (
    hu ||
    (hu = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function Xg() {
  return (
    mu ||
    (mu = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const af = new WeakMap(),
  Ml = new WeakMap(),
  uf = new WeakMap(),
  zi = new WeakMap(),
  Fs = new WeakMap();
function Yg(e) {
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener("success", i), e.removeEventListener("error", l);
      },
      i = () => {
        n(Ct(e.result)), o();
      },
      l = () => {
        r(e.error), o();
      };
    e.addEventListener("success", i), e.addEventListener("error", l);
  });
  return (
    t
      .then((n) => {
        n instanceof IDBCursor && af.set(n, e);
      })
      .catch(() => {}),
    Fs.set(t, e),
    t
  );
}
function Jg(e) {
  if (Ml.has(e)) return;
  const t = new Promise((n, r) => {
    const o = () => {
        e.removeEventListener("complete", i),
          e.removeEventListener("error", l),
          e.removeEventListener("abort", l);
      },
      i = () => {
        n(), o();
      },
      l = () => {
        r(e.error || new DOMException("AbortError", "AbortError")), o();
      };
    e.addEventListener("complete", i),
      e.addEventListener("error", l),
      e.addEventListener("abort", l);
  });
  Ml.set(e, t);
}
let Bl = {
  get(e, t, n) {
    if (e instanceof IDBTransaction) {
      if (t === "done") return Ml.get(e);
      if (t === "objectStoreNames") return e.objectStoreNames || uf.get(e);
      if (t === "store")
        return n.objectStoreNames[1]
          ? void 0
          : n.objectStore(n.objectStoreNames[0]);
    }
    return Ct(e[t]);
  },
  set(e, t, n) {
    return (e[t] = n), !0;
  },
  has(e, t) {
    return e instanceof IDBTransaction && (t === "done" || t === "store")
      ? !0
      : t in e;
  },
};
function Zg(e) {
  Bl = e(Bl);
}
function qg(e) {
  return e === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (t, ...n) {
        const r = e.call(Ui(this), t, ...n);
        return uf.set(r, t.sort ? t.sort() : [t]), Ct(r);
      }
    : Xg().includes(e)
    ? function (...t) {
        return e.apply(Ui(this), t), Ct(af.get(this));
      }
    : function (...t) {
        return Ct(e.apply(Ui(this), t));
      };
}
function ev(e) {
  return typeof e == "function"
    ? qg(e)
    : (e instanceof IDBTransaction && Jg(e),
      Kg(e, Gg()) ? new Proxy(e, Bl) : e);
}
function Ct(e) {
  if (e instanceof IDBRequest) return Yg(e);
  if (zi.has(e)) return zi.get(e);
  const t = ev(e);
  return t !== e && (zi.set(e, t), Fs.set(t, e)), t;
}
const Ui = (e) => Fs.get(e);
function tv(e, t, { blocked: n, upgrade: r, blocking: o, terminated: i } = {}) {
  const l = indexedDB.open(e, t),
    s = Ct(l);
  return (
    r &&
      l.addEventListener("upgradeneeded", (a) => {
        r(Ct(l.result), a.oldVersion, a.newVersion, Ct(l.transaction), a);
      }),
    n && l.addEventListener("blocked", (a) => n(a.oldVersion, a.newVersion, a)),
    s
      .then((a) => {
        i && a.addEventListener("close", () => i()),
          o &&
            a.addEventListener("versionchange", (u) =>
              o(u.oldVersion, u.newVersion, u)
            );
      })
      .catch(() => {}),
    s
  );
}
const nv = ["get", "getKey", "getAll", "getAllKeys", "count"],
  rv = ["put", "add", "delete", "clear"],
  Mi = new Map();
function gu(e, t) {
  if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string")) return;
  if (Mi.get(t)) return Mi.get(t);
  const n = t.replace(/FromIndex$/, ""),
    r = t !== n,
    o = rv.includes(n);
  if (
    !(n in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(o || nv.includes(n))
  )
    return;
  const i = async function (l, ...s) {
    const a = this.transaction(l, o ? "readwrite" : "readonly");
    let u = a.store;
    return (
      r && (u = u.index(s.shift())),
      (await Promise.all([u[n](...s), o && a.done]))[0]
    );
  };
  return Mi.set(t, i), i;
}
Zg((e) => ({
  ...e,
  get: (t, n, r) => gu(t, n) || e.get(t, n, r),
  has: (t, n) => !!gu(t, n) || e.has(t, n),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ov {
  constructor(t) {
    this.container = t;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((n) => {
        if (iv(n)) {
          const r = n.getImmediate();
          return `${r.library}/${r.version}`;
        } else return null;
      })
      .filter((n) => n)
      .join(" ");
  }
}
function iv(e) {
  const t = e.getComponent();
  return (t == null ? void 0 : t.type) === "VERSION";
}
const Fl = "@firebase/app",
  vu = "0.10.12";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const rt = new Qg("@firebase/app"),
  lv = "@firebase/app-compat",
  sv = "@firebase/analytics-compat",
  av = "@firebase/analytics",
  uv = "@firebase/app-check-compat",
  cv = "@firebase/app-check",
  dv = "@firebase/auth",
  fv = "@firebase/auth-compat",
  pv = "@firebase/database",
  hv = "@firebase/data-connect",
  mv = "@firebase/database-compat",
  gv = "@firebase/functions",
  vv = "@firebase/functions-compat",
  yv = "@firebase/installations",
  wv = "@firebase/installations-compat",
  _v = "@firebase/messaging",
  xv = "@firebase/messaging-compat",
  Sv = "@firebase/performance",
  Ev = "@firebase/performance-compat",
  kv = "@firebase/remote-config",
  Cv = "@firebase/remote-config-compat",
  Nv = "@firebase/storage",
  Pv = "@firebase/storage-compat",
  Rv = "@firebase/firestore",
  Tv = "@firebase/vertexai-preview",
  Iv = "@firebase/firestore-compat",
  Ov = "firebase",
  Dv = "10.14.0";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const $l = "[DEFAULT]",
  jv = {
    [Fl]: "fire-core",
    [lv]: "fire-core-compat",
    [av]: "fire-analytics",
    [sv]: "fire-analytics-compat",
    [cv]: "fire-app-check",
    [uv]: "fire-app-check-compat",
    [dv]: "fire-auth",
    [fv]: "fire-auth-compat",
    [pv]: "fire-rtdb",
    [hv]: "fire-data-connect",
    [mv]: "fire-rtdb-compat",
    [gv]: "fire-fn",
    [vv]: "fire-fn-compat",
    [yv]: "fire-iid",
    [wv]: "fire-iid-compat",
    [_v]: "fire-fcm",
    [xv]: "fire-fcm-compat",
    [Sv]: "fire-perf",
    [Ev]: "fire-perf-compat",
    [kv]: "fire-rc",
    [Cv]: "fire-rc-compat",
    [Nv]: "fire-gcs",
    [Pv]: "fire-gcs-compat",
    [Rv]: "fire-fst",
    [Iv]: "fire-fst-compat",
    [Tv]: "fire-vertex",
    "fire-js": "fire-js",
    [Ov]: "fire-js-all",
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Bo = new Map(),
  Lv = new Map(),
  Hl = new Map();
function yu(e, t) {
  try {
    e.container.addComponent(t);
  } catch (n) {
    rt.debug(
      `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
      n
    );
  }
}
function Fo(e) {
  const t = e.name;
  if (Hl.has(t))
    return (
      rt.debug(`There were multiple attempts to register component ${t}.`), !1
    );
  Hl.set(t, e);
  for (const n of Bo.values()) yu(n, e);
  for (const n of Lv.values()) yu(n, e);
  return !0;
}
function Av(e, t) {
  const n = e.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return n && n.triggerHeartbeat(), e.container.getProvider(t);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const zv = {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported":
      "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment":
      "FirebaseServerApp is not for use in browser environments.",
  },
  Nt = new sf("app", "Firebase", zv);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Uv {
  constructor(t, n, r) {
    (this._isDeleted = !1),
      (this._options = Object.assign({}, t)),
      (this._config = Object.assign({}, n)),
      (this._name = n.name),
      (this._automaticDataCollectionEnabled = n.automaticDataCollectionEnabled),
      (this._container = r),
      this.container.addComponent(new Sr("app", () => this, "PUBLIC"));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(t) {
    this.checkDestroyed(), (this._automaticDataCollectionEnabled = t);
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(t) {
    this._isDeleted = t;
  }
  checkDestroyed() {
    if (this.isDeleted) throw Nt.create("app-deleted", { appName: this._name });
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Mv = Dv;
function cf(e, t = {}) {
  let n = e;
  typeof t != "object" && (t = { name: t });
  const r = Object.assign({ name: $l, automaticDataCollectionEnabled: !1 }, t),
    o = r.name;
  if (typeof o != "string" || !o)
    throw Nt.create("bad-app-name", { appName: String(o) });
  if ((n || (n = lf()), !n)) throw Nt.create("no-options");
  const i = Bo.get(o);
  if (i) {
    if (Ul(n, i.options) && Ul(r, i.config)) return i;
    throw Nt.create("duplicate-app", { appName: o });
  }
  const l = new $g(o);
  for (const a of Hl.values()) l.addComponent(a);
  const s = new Uv(n, r, l);
  return Bo.set(o, s), s;
}
function Bv(e = $l) {
  const t = Bo.get(e);
  if (!t && e === $l && lf()) return cf();
  if (!t) throw Nt.create("no-app", { appName: e });
  return t;
}
function wn(e, t, n) {
  var r;
  let o = (r = jv[e]) !== null && r !== void 0 ? r : e;
  n && (o += `-${n}`);
  const i = o.match(/\s|\//),
    l = t.match(/\s|\//);
  if (i || l) {
    const s = [`Unable to register library "${o}" with version "${t}":`];
    i &&
      s.push(
        `library name "${o}" contains illegal characters (whitespace or "/")`
      ),
      i && l && s.push("and"),
      l &&
        s.push(
          `version name "${t}" contains illegal characters (whitespace or "/")`
        ),
      rt.warn(s.join(" "));
    return;
  }
  Fo(new Sr(`${o}-version`, () => ({ library: o, version: t }), "VERSION"));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Fv = "firebase-heartbeat-database",
  $v = 1,
  Er = "firebase-heartbeat-store";
let Bi = null;
function df() {
  return (
    Bi ||
      (Bi = tv(Fv, $v, {
        upgrade: (e, t) => {
          switch (t) {
            case 0:
              try {
                e.createObjectStore(Er);
              } catch (n) {
                console.warn(n);
              }
          }
        },
      }).catch((e) => {
        throw Nt.create("idb-open", { originalErrorMessage: e.message });
      })),
    Bi
  );
}
async function Hv(e) {
  try {
    const n = (await df()).transaction(Er),
      r = await n.objectStore(Er).get(ff(e));
    return await n.done, r;
  } catch (t) {
    if (t instanceof On) rt.warn(t.message);
    else {
      const n = Nt.create("idb-get", {
        originalErrorMessage: t == null ? void 0 : t.message,
      });
      rt.warn(n.message);
    }
  }
}
async function wu(e, t) {
  try {
    const r = (await df()).transaction(Er, "readwrite");
    await r.objectStore(Er).put(t, ff(e)), await r.done;
  } catch (n) {
    if (n instanceof On) rt.warn(n.message);
    else {
      const r = Nt.create("idb-set", {
        originalErrorMessage: n == null ? void 0 : n.message,
      });
      rt.warn(r.message);
    }
  }
}
function ff(e) {
  return `${e.name}!${e.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const bv = 1024,
  Vv = 30 * 24 * 60 * 60 * 1e3;
class Wv {
  constructor(t) {
    (this.container = t), (this._heartbeatsCache = null);
    const n = this.container.getProvider("app").getImmediate();
    (this._storage = new Kv(n)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((r) => ((this._heartbeatsCache = r), r)));
  }
  async triggerHeartbeat() {
    var t, n;
    try {
      const o = this.container
          .getProvider("platform-logger")
          .getImmediate()
          .getPlatformInfoString(),
        i = _u();
      return (((t = this._heartbeatsCache) === null || t === void 0
        ? void 0
        : t.heartbeats) == null &&
        ((this._heartbeatsCache = await this._heartbeatsCachePromise),
        ((n = this._heartbeatsCache) === null || n === void 0
          ? void 0
          : n.heartbeats) == null)) ||
        this._heartbeatsCache.lastSentHeartbeatDate === i ||
        this._heartbeatsCache.heartbeats.some((l) => l.date === i)
        ? void 0
        : (this._heartbeatsCache.heartbeats.push({ date: i, agent: o }),
          (this._heartbeatsCache.heartbeats =
            this._heartbeatsCache.heartbeats.filter((l) => {
              const s = new Date(l.date).valueOf();
              return Date.now() - s <= Vv;
            })),
          this._storage.overwrite(this._heartbeatsCache));
    } catch (r) {
      rt.warn(r);
    }
  }
  async getHeartbeatsHeader() {
    var t;
    try {
      if (
        (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
        ((t = this._heartbeatsCache) === null || t === void 0
          ? void 0
          : t.heartbeats) == null ||
          this._heartbeatsCache.heartbeats.length === 0)
      )
        return "";
      const n = _u(),
        { heartbeatsToSend: r, unsentEntries: o } = Qv(
          this._heartbeatsCache.heartbeats
        ),
        i = Mo(JSON.stringify({ version: 2, heartbeats: r }));
      return (
        (this._heartbeatsCache.lastSentHeartbeatDate = n),
        o.length > 0
          ? ((this._heartbeatsCache.heartbeats = o),
            await this._storage.overwrite(this._heartbeatsCache))
          : ((this._heartbeatsCache.heartbeats = []),
            this._storage.overwrite(this._heartbeatsCache)),
        i
      );
    } catch (n) {
      return rt.warn(n), "";
    }
  }
}
function _u() {
  return new Date().toISOString().substring(0, 10);
}
function Qv(e, t = bv) {
  const n = [];
  let r = e.slice();
  for (const o of e) {
    const i = n.find((l) => l.agent === o.agent);
    if (i) {
      if ((i.dates.push(o.date), xu(n) > t)) {
        i.dates.pop();
        break;
      }
    } else if ((n.push({ agent: o.agent, dates: [o.date] }), xu(n) > t)) {
      n.pop();
      break;
    }
    r = r.slice(1);
  }
  return { heartbeatsToSend: n, unsentEntries: r };
}
class Kv {
  constructor(t) {
    (this.app = t),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
  }
  async runIndexedDBEnvironmentCheck() {
    return jg()
      ? Lg()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const n = await Hv(this.app);
      return n != null && n.heartbeats ? n : { heartbeats: [] };
    } else return { heartbeats: [] };
  }
  async overwrite(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const o = await this.read();
      return wu(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0
            ? n
            : o.lastSentHeartbeatDate,
        heartbeats: t.heartbeats,
      });
    } else return;
  }
  async add(t) {
    var n;
    if (await this._canUseIndexedDBPromise) {
      const o = await this.read();
      return wu(this.app, {
        lastSentHeartbeatDate:
          (n = t.lastSentHeartbeatDate) !== null && n !== void 0
            ? n
            : o.lastSentHeartbeatDate,
        heartbeats: [...o.heartbeats, ...t.heartbeats],
      });
    } else return;
  }
}
function xu(e) {
  return Mo(JSON.stringify({ version: 2, heartbeats: e })).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Gv(e) {
  Fo(new Sr("platform-logger", (t) => new ov(t), "PRIVATE")),
    Fo(new Sr("heartbeat", (t) => new Wv(t), "PRIVATE")),
    wn(Fl, vu, e),
    wn(Fl, vu, "esm2017"),
    wn("fire-js", "");
}
Gv("");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const pf = "firebasestorage.googleapis.com",
  hf = "storageBucket",
  Xv = 2 * 60 * 1e3,
  Yv = 10 * 60 * 1e3;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class K extends On {
  constructor(t, n, r = 0) {
    super(Fi(t), `Firebase Storage: ${n} (${Fi(t)})`),
      (this.status_ = r),
      (this.customData = { serverResponse: null }),
      (this._baseMessage = this.message),
      Object.setPrototypeOf(this, K.prototype);
  }
  get status() {
    return this.status_;
  }
  set status(t) {
    this.status_ = t;
  }
  _codeEquals(t) {
    return Fi(t) === this.code;
  }
  get serverResponse() {
    return this.customData.serverResponse;
  }
  set serverResponse(t) {
    (this.customData.serverResponse = t),
      this.customData.serverResponse
        ? (this.message = `${this._baseMessage}
${this.customData.serverResponse}`)
        : (this.message = this._baseMessage);
  }
}
var Q;
(function (e) {
  (e.UNKNOWN = "unknown"),
    (e.OBJECT_NOT_FOUND = "object-not-found"),
    (e.BUCKET_NOT_FOUND = "bucket-not-found"),
    (e.PROJECT_NOT_FOUND = "project-not-found"),
    (e.QUOTA_EXCEEDED = "quota-exceeded"),
    (e.UNAUTHENTICATED = "unauthenticated"),
    (e.UNAUTHORIZED = "unauthorized"),
    (e.UNAUTHORIZED_APP = "unauthorized-app"),
    (e.RETRY_LIMIT_EXCEEDED = "retry-limit-exceeded"),
    (e.INVALID_CHECKSUM = "invalid-checksum"),
    (e.CANCELED = "canceled"),
    (e.INVALID_EVENT_NAME = "invalid-event-name"),
    (e.INVALID_URL = "invalid-url"),
    (e.INVALID_DEFAULT_BUCKET = "invalid-default-bucket"),
    (e.NO_DEFAULT_BUCKET = "no-default-bucket"),
    (e.CANNOT_SLICE_BLOB = "cannot-slice-blob"),
    (e.SERVER_FILE_WRONG_SIZE = "server-file-wrong-size"),
    (e.NO_DOWNLOAD_URL = "no-download-url"),
    (e.INVALID_ARGUMENT = "invalid-argument"),
    (e.INVALID_ARGUMENT_COUNT = "invalid-argument-count"),
    (e.APP_DELETED = "app-deleted"),
    (e.INVALID_ROOT_OPERATION = "invalid-root-operation"),
    (e.INVALID_FORMAT = "invalid-format"),
    (e.INTERNAL_ERROR = "internal-error"),
    (e.UNSUPPORTED_ENVIRONMENT = "unsupported-environment");
})(Q || (Q = {}));
function Fi(e) {
  return "storage/" + e;
}
function $s() {
  const e =
    "An unknown error occurred, please check the error payload for server response.";
  return new K(Q.UNKNOWN, e);
}
function Jv(e) {
  return new K(Q.OBJECT_NOT_FOUND, "Object '" + e + "' does not exist.");
}
function Zv(e) {
  return new K(
    Q.QUOTA_EXCEEDED,
    "Quota for bucket '" +
      e +
      "' exceeded, please view quota on https://firebase.google.com/pricing/."
  );
}
function qv() {
  const e =
    "User is not authenticated, please authenticate using Firebase Authentication and try again.";
  return new K(Q.UNAUTHENTICATED, e);
}
function ey() {
  return new K(
    Q.UNAUTHORIZED_APP,
    "This app does not have permission to access Firebase Storage on this project."
  );
}
function ty(e) {
  return new K(
    Q.UNAUTHORIZED,
    "User does not have permission to access '" + e + "'."
  );
}
function ny() {
  return new K(
    Q.RETRY_LIMIT_EXCEEDED,
    "Max retry time for operation exceeded, please try again."
  );
}
function ry() {
  return new K(Q.CANCELED, "User canceled the upload/download.");
}
function oy(e) {
  return new K(Q.INVALID_URL, "Invalid URL '" + e + "'.");
}
function iy(e) {
  return new K(Q.INVALID_DEFAULT_BUCKET, "Invalid default bucket '" + e + "'.");
}
function ly() {
  return new K(
    Q.NO_DEFAULT_BUCKET,
    "No default bucket found. Did you set the '" +
      hf +
      "' property when initializing the app?"
  );
}
function sy() {
  return new K(
    Q.CANNOT_SLICE_BLOB,
    "Cannot slice blob for upload. Please retry the upload."
  );
}
function ay() {
  return new K(
    Q.NO_DOWNLOAD_URL,
    "The given file does not have any download URLs."
  );
}
function uy(e) {
  return new K(
    Q.UNSUPPORTED_ENVIRONMENT,
    `${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`
  );
}
function bl(e) {
  return new K(Q.INVALID_ARGUMENT, e);
}
function mf() {
  return new K(Q.APP_DELETED, "The Firebase app was deleted.");
}
function cy(e) {
  return new K(
    Q.INVALID_ROOT_OPERATION,
    "The operation '" +
      e +
      "' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png')."
  );
}
function nr(e, t) {
  return new K(
    Q.INVALID_FORMAT,
    "String does not match format '" + e + "': " + t
  );
}
function Hn(e) {
  throw new K(Q.INTERNAL_ERROR, "Internal error: " + e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Se {
  constructor(t, n) {
    (this.bucket = t), (this.path_ = n);
  }
  get path() {
    return this.path_;
  }
  get isRoot() {
    return this.path.length === 0;
  }
  fullServerUrl() {
    const t = encodeURIComponent;
    return "/b/" + t(this.bucket) + "/o/" + t(this.path);
  }
  bucketOnlyServerUrl() {
    return "/b/" + encodeURIComponent(this.bucket) + "/o";
  }
  static makeFromBucketSpec(t, n) {
    let r;
    try {
      r = Se.makeFromUrl(t, n);
    } catch {
      return new Se(t, "");
    }
    if (r.path === "") return r;
    throw iy(t);
  }
  static makeFromUrl(t, n) {
    let r = null;
    const o = "([A-Za-z0-9.\\-_]+)";
    function i(v) {
      v.path.charAt(v.path.length - 1) === "/" &&
        (v.path_ = v.path_.slice(0, -1));
    }
    const l = "(/(.*))?$",
      s = new RegExp("^gs://" + o + l, "i"),
      a = { bucket: 1, path: 3 };
    function u(v) {
      v.path_ = decodeURIComponent(v.path);
    }
    const h = "v[A-Za-z0-9_]+",
      f = n.replace(/[.]/g, "\\."),
      m = "(/([^?#]*).*)?$",
      y = new RegExp(`^https?://${f}/${h}/b/${o}/o${m}`, "i"),
      w = { bucket: 1, path: 3 },
      _ = n === pf ? "(?:storage.googleapis.com|storage.cloud.google.com)" : n,
      S = "([^?#]*)",
      d = new RegExp(`^https?://${_}/${o}/${S}`, "i"),
      p = [
        { regex: s, indices: a, postModify: i },
        { regex: y, indices: w, postModify: u },
        { regex: d, indices: { bucket: 1, path: 2 }, postModify: u },
      ];
    for (let v = 0; v < p.length; v++) {
      const E = p[v],
        P = E.regex.exec(t);
      if (P) {
        const R = P[E.indices.bucket];
        let T = P[E.indices.path];
        T || (T = ""), (r = new Se(R, T)), E.postModify(r);
        break;
      }
    }
    if (r == null) throw oy(t);
    return r;
  }
}
class dy {
  constructor(t) {
    this.promise_ = Promise.reject(t);
  }
  getPromise() {
    return this.promise_;
  }
  cancel(t = !1) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function fy(e, t, n) {
  let r = 1,
    o = null,
    i = null,
    l = !1,
    s = 0;
  function a() {
    return s === 2;
  }
  let u = !1;
  function h(...S) {
    u || ((u = !0), t.apply(null, S));
  }
  function f(S) {
    o = setTimeout(() => {
      (o = null), e(y, a());
    }, S);
  }
  function m() {
    i && clearTimeout(i);
  }
  function y(S, ...d) {
    if (u) {
      m();
      return;
    }
    if (S) {
      m(), h.call(null, S, ...d);
      return;
    }
    if (a() || l) {
      m(), h.call(null, S, ...d);
      return;
    }
    r < 64 && (r *= 2);
    let p;
    s === 1 ? ((s = 2), (p = 0)) : (p = (r + Math.random()) * 1e3), f(p);
  }
  let w = !1;
  function _(S) {
    w ||
      ((w = !0),
      m(),
      !u &&
        (o !== null ? (S || (s = 2), clearTimeout(o), f(0)) : S || (s = 1)));
  }
  return (
    f(0),
    (i = setTimeout(() => {
      (l = !0), _(!0);
    }, n)),
    _
  );
}
function py(e) {
  e(!1);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function hy(e) {
  return e !== void 0;
}
function my(e) {
  return typeof e == "object" && !Array.isArray(e);
}
function Hs(e) {
  return typeof e == "string" || e instanceof String;
}
function Su(e) {
  return bs() && e instanceof Blob;
}
function bs() {
  return typeof Blob < "u";
}
function Eu(e, t, n, r) {
  if (r < t) throw bl(`Invalid value for '${e}'. Expected ${t} or greater.`);
  if (r > n) throw bl(`Invalid value for '${e}'. Expected ${n} or less.`);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Vs(e, t, n) {
  let r = t;
  return n == null && (r = `https://${t}`), `${n}://${r}/v0${e}`;
}
function gf(e) {
  const t = encodeURIComponent;
  let n = "?";
  for (const r in e)
    if (e.hasOwnProperty(r)) {
      const o = t(r) + "=" + t(e[r]);
      n = n + o + "&";
    }
  return (n = n.slice(0, -1)), n;
}
var Ht;
(function (e) {
  (e[(e.NO_ERROR = 0)] = "NO_ERROR"),
    (e[(e.NETWORK_ERROR = 1)] = "NETWORK_ERROR"),
    (e[(e.ABORT = 2)] = "ABORT");
})(Ht || (Ht = {}));
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function gy(e, t) {
  const n = e >= 500 && e < 600,
    o = [408, 429].indexOf(e) !== -1,
    i = t.indexOf(e) !== -1;
  return n || o || i;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vy {
  constructor(t, n, r, o, i, l, s, a, u, h, f, m = !0) {
    (this.url_ = t),
      (this.method_ = n),
      (this.headers_ = r),
      (this.body_ = o),
      (this.successCodes_ = i),
      (this.additionalRetryCodes_ = l),
      (this.callback_ = s),
      (this.errorCallback_ = a),
      (this.timeout_ = u),
      (this.progressCallback_ = h),
      (this.connectionFactory_ = f),
      (this.retry = m),
      (this.pendingConnection_ = null),
      (this.backoffId_ = null),
      (this.canceled_ = !1),
      (this.appDelete_ = !1),
      (this.promise_ = new Promise((y, w) => {
        (this.resolve_ = y), (this.reject_ = w), this.start_();
      }));
  }
  start_() {
    const t = (r, o) => {
        if (o) {
          r(!1, new Xr(!1, null, !0));
          return;
        }
        const i = this.connectionFactory_();
        this.pendingConnection_ = i;
        const l = (s) => {
          const a = s.loaded,
            u = s.lengthComputable ? s.total : -1;
          this.progressCallback_ !== null && this.progressCallback_(a, u);
        };
        this.progressCallback_ !== null && i.addUploadProgressListener(l),
          i
            .send(this.url_, this.method_, this.body_, this.headers_)
            .then(() => {
              this.progressCallback_ !== null &&
                i.removeUploadProgressListener(l),
                (this.pendingConnection_ = null);
              const s = i.getErrorCode() === Ht.NO_ERROR,
                a = i.getStatus();
              if (!s || (gy(a, this.additionalRetryCodes_) && this.retry)) {
                const h = i.getErrorCode() === Ht.ABORT;
                r(!1, new Xr(!1, null, h));
                return;
              }
              const u = this.successCodes_.indexOf(a) !== -1;
              r(!0, new Xr(u, i));
            });
      },
      n = (r, o) => {
        const i = this.resolve_,
          l = this.reject_,
          s = o.connection;
        if (o.wasSuccessCode)
          try {
            const a = this.callback_(s, s.getResponse());
            hy(a) ? i(a) : i();
          } catch (a) {
            l(a);
          }
        else if (s !== null) {
          const a = $s();
          (a.serverResponse = s.getErrorText()),
            this.errorCallback_ ? l(this.errorCallback_(s, a)) : l(a);
        } else if (o.canceled) {
          const a = this.appDelete_ ? mf() : ry();
          l(a);
        } else {
          const a = ny();
          l(a);
        }
      };
    this.canceled_
      ? n(!1, new Xr(!1, null, !0))
      : (this.backoffId_ = fy(t, n, this.timeout_));
  }
  getPromise() {
    return this.promise_;
  }
  cancel(t) {
    (this.canceled_ = !0),
      (this.appDelete_ = t || !1),
      this.backoffId_ !== null && py(this.backoffId_),
      this.pendingConnection_ !== null && this.pendingConnection_.abort();
  }
}
class Xr {
  constructor(t, n, r) {
    (this.wasSuccessCode = t), (this.connection = n), (this.canceled = !!r);
  }
}
function yy(e, t) {
  t !== null && t.length > 0 && (e.Authorization = "Firebase " + t);
}
function wy(e, t) {
  e["X-Firebase-Storage-Version"] = "webjs/" + (t ?? "AppManager");
}
function _y(e, t) {
  t && (e["X-Firebase-GMPID"] = t);
}
function xy(e, t) {
  t !== null && (e["X-Firebase-AppCheck"] = t);
}
function Sy(e, t, n, r, o, i, l = !0) {
  const s = gf(e.urlParams),
    a = e.url + s,
    u = Object.assign({}, e.headers);
  return (
    _y(u, t),
    yy(u, n),
    wy(u, i),
    xy(u, r),
    new vy(
      a,
      e.method,
      u,
      e.body,
      e.successCodes,
      e.additionalRetryCodes,
      e.handler,
      e.errorHandler,
      e.timeout,
      e.progressCallback,
      o,
      l
    )
  );
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ey() {
  return typeof BlobBuilder < "u"
    ? BlobBuilder
    : typeof WebKitBlobBuilder < "u"
    ? WebKitBlobBuilder
    : void 0;
}
function ky(...e) {
  const t = Ey();
  if (t !== void 0) {
    const n = new t();
    for (let r = 0; r < e.length; r++) n.append(e[r]);
    return n.getBlob();
  } else {
    if (bs()) return new Blob(e);
    throw new K(
      Q.UNSUPPORTED_ENVIRONMENT,
      "This browser doesn't seem to support creating Blobs"
    );
  }
}
function Cy(e, t, n) {
  return e.webkitSlice
    ? e.webkitSlice(t, n)
    : e.mozSlice
    ? e.mozSlice(t, n)
    : e.slice
    ? e.slice(t, n)
    : null;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ny(e) {
  if (typeof atob > "u") throw uy("base-64");
  return atob(e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Ve = {
  RAW: "raw",
  BASE64: "base64",
  BASE64URL: "base64url",
  DATA_URL: "data_url",
};
class $i {
  constructor(t, n) {
    (this.data = t), (this.contentType = n || null);
  }
}
function Py(e, t) {
  switch (e) {
    case Ve.RAW:
      return new $i(vf(t));
    case Ve.BASE64:
    case Ve.BASE64URL:
      return new $i(yf(e, t));
    case Ve.DATA_URL:
      return new $i(Ty(t), Iy(t));
  }
  throw $s();
}
function vf(e) {
  const t = [];
  for (let n = 0; n < e.length; n++) {
    let r = e.charCodeAt(n);
    if (r <= 127) t.push(r);
    else if (r <= 2047) t.push(192 | (r >> 6), 128 | (r & 63));
    else if ((r & 64512) === 55296)
      if (!(n < e.length - 1 && (e.charCodeAt(n + 1) & 64512) === 56320))
        t.push(239, 191, 189);
      else {
        const i = r,
          l = e.charCodeAt(++n);
        (r = 65536 | ((i & 1023) << 10) | (l & 1023)),
          t.push(
            240 | (r >> 18),
            128 | ((r >> 12) & 63),
            128 | ((r >> 6) & 63),
            128 | (r & 63)
          );
      }
    else
      (r & 64512) === 56320
        ? t.push(239, 191, 189)
        : t.push(224 | (r >> 12), 128 | ((r >> 6) & 63), 128 | (r & 63));
  }
  return new Uint8Array(t);
}
function Ry(e) {
  let t;
  try {
    t = decodeURIComponent(e);
  } catch {
    throw nr(Ve.DATA_URL, "Malformed data URL.");
  }
  return vf(t);
}
function yf(e, t) {
  switch (e) {
    case Ve.BASE64: {
      const o = t.indexOf("-") !== -1,
        i = t.indexOf("_") !== -1;
      if (o || i)
        throw nr(
          e,
          "Invalid character '" +
            (o ? "-" : "_") +
            "' found: is it base64url encoded?"
        );
      break;
    }
    case Ve.BASE64URL: {
      const o = t.indexOf("+") !== -1,
        i = t.indexOf("/") !== -1;
      if (o || i)
        throw nr(
          e,
          "Invalid character '" +
            (o ? "+" : "/") +
            "' found: is it base64 encoded?"
        );
      t = t.replace(/-/g, "+").replace(/_/g, "/");
      break;
    }
  }
  let n;
  try {
    n = Ny(t);
  } catch (o) {
    throw o.message.includes("polyfill") ? o : nr(e, "Invalid character found");
  }
  const r = new Uint8Array(n.length);
  for (let o = 0; o < n.length; o++) r[o] = n.charCodeAt(o);
  return r;
}
class wf {
  constructor(t) {
    (this.base64 = !1), (this.contentType = null);
    const n = t.match(/^data:([^,]+)?,/);
    if (n === null)
      throw nr(
        Ve.DATA_URL,
        "Must be formatted 'data:[<mediatype>][;base64],<data>"
      );
    const r = n[1] || null;
    r != null &&
      ((this.base64 = Oy(r, ";base64")),
      (this.contentType = this.base64 ? r.substring(0, r.length - 7) : r)),
      (this.rest = t.substring(t.indexOf(",") + 1));
  }
}
function Ty(e) {
  const t = new wf(e);
  return t.base64 ? yf(Ve.BASE64, t.rest) : Ry(t.rest);
}
function Iy(e) {
  return new wf(e).contentType;
}
function Oy(e, t) {
  return e.length >= t.length ? e.substring(e.length - t.length) === t : !1;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ct {
  constructor(t, n) {
    let r = 0,
      o = "";
    Su(t)
      ? ((this.data_ = t), (r = t.size), (o = t.type))
      : t instanceof ArrayBuffer
      ? (n
          ? (this.data_ = new Uint8Array(t))
          : ((this.data_ = new Uint8Array(t.byteLength)),
            this.data_.set(new Uint8Array(t))),
        (r = this.data_.length))
      : t instanceof Uint8Array &&
        (n
          ? (this.data_ = t)
          : ((this.data_ = new Uint8Array(t.length)), this.data_.set(t)),
        (r = t.length)),
      (this.size_ = r),
      (this.type_ = o);
  }
  size() {
    return this.size_;
  }
  type() {
    return this.type_;
  }
  slice(t, n) {
    if (Su(this.data_)) {
      const r = this.data_,
        o = Cy(r, t, n);
      return o === null ? null : new ct(o);
    } else {
      const r = new Uint8Array(this.data_.buffer, t, n - t);
      return new ct(r, !0);
    }
  }
  static getBlob(...t) {
    if (bs()) {
      const n = t.map((r) => (r instanceof ct ? r.data_ : r));
      return new ct(ky.apply(null, n));
    } else {
      const n = t.map((l) => (Hs(l) ? Py(Ve.RAW, l).data : l.data_));
      let r = 0;
      n.forEach((l) => {
        r += l.byteLength;
      });
      const o = new Uint8Array(r);
      let i = 0;
      return (
        n.forEach((l) => {
          for (let s = 0; s < l.length; s++) o[i++] = l[s];
        }),
        new ct(o, !0)
      );
    }
  }
  uploadData() {
    return this.data_;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function _f(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch {
    return null;
  }
  return my(t) ? t : null;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Dy(e) {
  if (e.length === 0) return null;
  const t = e.lastIndexOf("/");
  return t === -1 ? "" : e.slice(0, t);
}
function jy(e, t) {
  const n = t
    .split("/")
    .filter((r) => r.length > 0)
    .join("/");
  return e.length === 0 ? n : e + "/" + n;
}
function xf(e) {
  const t = e.lastIndexOf("/", e.length - 2);
  return t === -1 ? e : e.slice(t + 1);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ly(e, t) {
  return t;
}
class ce {
  constructor(t, n, r, o) {
    (this.server = t),
      (this.local = n || t),
      (this.writable = !!r),
      (this.xform = o || Ly);
  }
}
let Yr = null;
function Ay(e) {
  return !Hs(e) || e.length < 2 ? e : xf(e);
}
function Sf() {
  if (Yr) return Yr;
  const e = [];
  e.push(new ce("bucket")),
    e.push(new ce("generation")),
    e.push(new ce("metageneration")),
    e.push(new ce("name", "fullPath", !0));
  function t(i, l) {
    return Ay(l);
  }
  const n = new ce("name");
  (n.xform = t), e.push(n);
  function r(i, l) {
    return l !== void 0 ? Number(l) : l;
  }
  const o = new ce("size");
  return (
    (o.xform = r),
    e.push(o),
    e.push(new ce("timeCreated")),
    e.push(new ce("updated")),
    e.push(new ce("md5Hash", null, !0)),
    e.push(new ce("cacheControl", null, !0)),
    e.push(new ce("contentDisposition", null, !0)),
    e.push(new ce("contentEncoding", null, !0)),
    e.push(new ce("contentLanguage", null, !0)),
    e.push(new ce("contentType", null, !0)),
    e.push(new ce("metadata", "customMetadata", !0)),
    (Yr = e),
    Yr
  );
}
function zy(e, t) {
  function n() {
    const r = e.bucket,
      o = e.fullPath,
      i = new Se(r, o);
    return t._makeStorageReference(i);
  }
  Object.defineProperty(e, "ref", { get: n });
}
function Uy(e, t, n) {
  const r = {};
  r.type = "file";
  const o = n.length;
  for (let i = 0; i < o; i++) {
    const l = n[i];
    r[l.local] = l.xform(r, t[l.server]);
  }
  return zy(r, e), r;
}
function Ef(e, t, n) {
  const r = _f(t);
  return r === null ? null : Uy(e, r, n);
}
function My(e, t, n, r) {
  const o = _f(t);
  if (o === null || !Hs(o.downloadTokens)) return null;
  const i = o.downloadTokens;
  if (i.length === 0) return null;
  const l = encodeURIComponent;
  return i.split(",").map((u) => {
    const h = e.bucket,
      f = e.fullPath,
      m = "/b/" + l(h) + "/o/" + l(f),
      y = Vs(m, n, r),
      w = gf({ alt: "media", token: u });
    return y + w;
  })[0];
}
function By(e, t) {
  const n = {},
    r = t.length;
  for (let o = 0; o < r; o++) {
    const i = t[o];
    i.writable && (n[i.server] = e[i.local]);
  }
  return JSON.stringify(n);
}
class kf {
  constructor(t, n, r, o) {
    (this.url = t),
      (this.method = n),
      (this.handler = r),
      (this.timeout = o),
      (this.urlParams = {}),
      (this.headers = {}),
      (this.body = null),
      (this.errorHandler = null),
      (this.progressCallback = null),
      (this.successCodes = [200]),
      (this.additionalRetryCodes = []);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Cf(e) {
  if (!e) throw $s();
}
function Fy(e, t) {
  function n(r, o) {
    const i = Ef(e, o, t);
    return Cf(i !== null), i;
  }
  return n;
}
function $y(e, t) {
  function n(r, o) {
    const i = Ef(e, o, t);
    return Cf(i !== null), My(i, o, e.host, e._protocol);
  }
  return n;
}
function Nf(e) {
  function t(n, r) {
    let o;
    return (
      n.getStatus() === 401
        ? n.getErrorText().includes("Firebase App Check token is invalid")
          ? (o = ey())
          : (o = qv())
        : n.getStatus() === 402
        ? (o = Zv(e.bucket))
        : n.getStatus() === 403
        ? (o = ty(e.path))
        : (o = r),
      (o.status = n.getStatus()),
      (o.serverResponse = r.serverResponse),
      o
    );
  }
  return t;
}
function Hy(e) {
  const t = Nf(e);
  function n(r, o) {
    let i = t(r, o);
    return (
      r.getStatus() === 404 && (i = Jv(e.path)),
      (i.serverResponse = o.serverResponse),
      i
    );
  }
  return n;
}
function by(e, t, n) {
  const r = t.fullServerUrl(),
    o = Vs(r, e.host, e._protocol),
    i = "GET",
    l = e.maxOperationRetryTime,
    s = new kf(o, i, $y(e, n), l);
  return (s.errorHandler = Hy(t)), s;
}
function Vy(e, t) {
  return (e && e.contentType) || (t && t.type()) || "application/octet-stream";
}
function Wy(e, t, n) {
  const r = Object.assign({}, n);
  return (
    (r.fullPath = e.path),
    (r.size = t.size()),
    r.contentType || (r.contentType = Vy(null, t)),
    r
  );
}
function Qy(e, t, n, r, o) {
  const i = t.bucketOnlyServerUrl(),
    l = { "X-Goog-Upload-Protocol": "multipart" };
  function s() {
    let p = "";
    for (let v = 0; v < 2; v++) p = p + Math.random().toString().slice(2);
    return p;
  }
  const a = s();
  l["Content-Type"] = "multipart/related; boundary=" + a;
  const u = Wy(t, r, o),
    h = By(u, n),
    f =
      "--" +
      a +
      `\r
Content-Type: application/json; charset=utf-8\r
\r
` +
      h +
      `\r
--` +
      a +
      `\r
Content-Type: ` +
      u.contentType +
      `\r
\r
`,
    m =
      `\r
--` +
      a +
      "--",
    y = ct.getBlob(f, r, m);
  if (y === null) throw sy();
  const w = { name: u.fullPath },
    _ = Vs(i, e.host, e._protocol),
    S = "POST",
    d = e.maxUploadRetryTime,
    c = new kf(_, S, Fy(e, n), d);
  return (
    (c.urlParams = w),
    (c.headers = l),
    (c.body = y.uploadData()),
    (c.errorHandler = Nf(t)),
    c
  );
}
class Ky {
  constructor() {
    (this.sent_ = !1),
      (this.xhr_ = new XMLHttpRequest()),
      this.initXhr(),
      (this.errorCode_ = Ht.NO_ERROR),
      (this.sendPromise_ = new Promise((t) => {
        this.xhr_.addEventListener("abort", () => {
          (this.errorCode_ = Ht.ABORT), t();
        }),
          this.xhr_.addEventListener("error", () => {
            (this.errorCode_ = Ht.NETWORK_ERROR), t();
          }),
          this.xhr_.addEventListener("load", () => {
            t();
          });
      }));
  }
  send(t, n, r, o) {
    if (this.sent_) throw Hn("cannot .send() more than once");
    if (((this.sent_ = !0), this.xhr_.open(n, t, !0), o !== void 0))
      for (const i in o)
        o.hasOwnProperty(i) && this.xhr_.setRequestHeader(i, o[i].toString());
    return (
      r !== void 0 ? this.xhr_.send(r) : this.xhr_.send(), this.sendPromise_
    );
  }
  getErrorCode() {
    if (!this.sent_) throw Hn("cannot .getErrorCode() before sending");
    return this.errorCode_;
  }
  getStatus() {
    if (!this.sent_) throw Hn("cannot .getStatus() before sending");
    try {
      return this.xhr_.status;
    } catch {
      return -1;
    }
  }
  getResponse() {
    if (!this.sent_) throw Hn("cannot .getResponse() before sending");
    return this.xhr_.response;
  }
  getErrorText() {
    if (!this.sent_) throw Hn("cannot .getErrorText() before sending");
    return this.xhr_.statusText;
  }
  abort() {
    this.xhr_.abort();
  }
  getResponseHeader(t) {
    return this.xhr_.getResponseHeader(t);
  }
  addUploadProgressListener(t) {
    this.xhr_.upload != null &&
      this.xhr_.upload.addEventListener("progress", t);
  }
  removeUploadProgressListener(t) {
    this.xhr_.upload != null &&
      this.xhr_.upload.removeEventListener("progress", t);
  }
}
class Gy extends Ky {
  initXhr() {
    this.xhr_.responseType = "text";
  }
}
function Pf() {
  return new Gy();
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Gt {
  constructor(t, n) {
    (this._service = t),
      n instanceof Se
        ? (this._location = n)
        : (this._location = Se.makeFromUrl(n, t.host));
  }
  toString() {
    return "gs://" + this._location.bucket + "/" + this._location.path;
  }
  _newRef(t, n) {
    return new Gt(t, n);
  }
  get root() {
    const t = new Se(this._location.bucket, "");
    return this._newRef(this._service, t);
  }
  get bucket() {
    return this._location.bucket;
  }
  get fullPath() {
    return this._location.path;
  }
  get name() {
    return xf(this._location.path);
  }
  get storage() {
    return this._service;
  }
  get parent() {
    const t = Dy(this._location.path);
    if (t === null) return null;
    const n = new Se(this._location.bucket, t);
    return new Gt(this._service, n);
  }
  _throwIfRoot(t) {
    if (this._location.path === "") throw cy(t);
  }
}
function Xy(e, t, n) {
  e._throwIfRoot("uploadBytes");
  const r = Qy(e.storage, e._location, Sf(), new ct(t, !0), n);
  return e.storage
    .makeRequestWithTokens(r, Pf)
    .then((o) => ({ metadata: o, ref: e }));
}
function Yy(e) {
  e._throwIfRoot("getDownloadURL");
  const t = by(e.storage, e._location, Sf());
  return e.storage.makeRequestWithTokens(t, Pf).then((n) => {
    if (n === null) throw ay();
    return n;
  });
}
function Jy(e, t) {
  const n = jy(e._location.path, t),
    r = new Se(e._location.bucket, n);
  return new Gt(e.storage, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Zy(e) {
  return /^[A-Za-z]+:\/\//.test(e);
}
function qy(e, t) {
  return new Gt(e, t);
}
function Rf(e, t) {
  if (e instanceof Ws) {
    const n = e;
    if (n._bucket == null) throw ly();
    const r = new Gt(n, n._bucket);
    return t != null ? Rf(r, t) : r;
  } else return t !== void 0 ? Jy(e, t) : e;
}
function e0(e, t) {
  if (t && Zy(t)) {
    if (e instanceof Ws) return qy(e, t);
    throw bl(
      "To use ref(service, url), the first argument must be a Storage instance."
    );
  } else return Rf(e, t);
}
function ku(e, t) {
  const n = t == null ? void 0 : t[hf];
  return n == null ? null : Se.makeFromBucketSpec(n, e);
}
function t0(e, t, n, r = {}) {
  (e.host = `${t}:${n}`), (e._protocol = "http");
  const { mockUserToken: o } = r;
  o &&
    (e._overrideAuthToken =
      typeof o == "string" ? o : Dg(o, e.app.options.projectId));
}
class Ws {
  constructor(t, n, r, o, i) {
    (this.app = t),
      (this._authProvider = n),
      (this._appCheckProvider = r),
      (this._url = o),
      (this._firebaseVersion = i),
      (this._bucket = null),
      (this._host = pf),
      (this._protocol = "https"),
      (this._appId = null),
      (this._deleted = !1),
      (this._maxOperationRetryTime = Xv),
      (this._maxUploadRetryTime = Yv),
      (this._requests = new Set()),
      o != null
        ? (this._bucket = Se.makeFromBucketSpec(o, this._host))
        : (this._bucket = ku(this._host, this.app.options));
  }
  get host() {
    return this._host;
  }
  set host(t) {
    (this._host = t),
      this._url != null
        ? (this._bucket = Se.makeFromBucketSpec(this._url, t))
        : (this._bucket = ku(t, this.app.options));
  }
  get maxUploadRetryTime() {
    return this._maxUploadRetryTime;
  }
  set maxUploadRetryTime(t) {
    Eu("time", 0, Number.POSITIVE_INFINITY, t), (this._maxUploadRetryTime = t);
  }
  get maxOperationRetryTime() {
    return this._maxOperationRetryTime;
  }
  set maxOperationRetryTime(t) {
    Eu("time", 0, Number.POSITIVE_INFINITY, t),
      (this._maxOperationRetryTime = t);
  }
  async _getAuthToken() {
    if (this._overrideAuthToken) return this._overrideAuthToken;
    const t = this._authProvider.getImmediate({ optional: !0 });
    if (t) {
      const n = await t.getToken();
      if (n !== null) return n.accessToken;
    }
    return null;
  }
  async _getAppCheckToken() {
    const t = this._appCheckProvider.getImmediate({ optional: !0 });
    return t ? (await t.getToken()).token : null;
  }
  _delete() {
    return (
      this._deleted ||
        ((this._deleted = !0),
        this._requests.forEach((t) => t.cancel()),
        this._requests.clear()),
      Promise.resolve()
    );
  }
  _makeStorageReference(t) {
    return new Gt(this, t);
  }
  _makeRequest(t, n, r, o, i = !0) {
    if (this._deleted) return new dy(mf());
    {
      const l = Sy(t, this._appId, r, o, n, this._firebaseVersion, i);
      return (
        this._requests.add(l),
        l.getPromise().then(
          () => this._requests.delete(l),
          () => this._requests.delete(l)
        ),
        l
      );
    }
  }
  async makeRequestWithTokens(t, n) {
    const [r, o] = await Promise.all([
      this._getAuthToken(),
      this._getAppCheckToken(),
    ]);
    return this._makeRequest(t, n, r, o).getPromise();
  }
}
const Cu = "@firebase/storage",
  Nu = "0.13.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Tf = "storage";
function Pu(e, t, n) {
  return (e = ii(e)), Xy(e, t, n);
}
function Ru(e) {
  return (e = ii(e)), Yy(e);
}
function Tu(e, t) {
  return (e = ii(e)), e0(e, t);
}
function n0(e = Bv(), t) {
  e = ii(e);
  const r = Av(e, Tf).getImmediate({ identifier: t }),
    o = Ig("storage");
  return o && r0(r, ...o), r;
}
function r0(e, t, n, r = {}) {
  t0(e, t, n, r);
}
function o0(e, { instanceIdentifier: t }) {
  const n = e.getProvider("app").getImmediate(),
    r = e.getProvider("auth-internal"),
    o = e.getProvider("app-check-internal");
  return new Ws(n, r, o, t, Mv);
}
function i0() {
  Fo(new Sr(Tf, o0, "PUBLIC").setMultipleInstances(!0)),
    wn(Cu, Nu, ""),
    wn(Cu, Nu, "esm2017");
}
i0();
var l0 = "firebase",
  s0 = "10.14.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ wn(l0, s0, "app");
const a0 = {
    apiKey: "AIzaSyAHD5Fnznwgspw_6fNi95_ytiaHswa-Sjk",
    authDomain: "m-finance-fed5d.firebaseapp.com",
    projectId: "m-finance-fed5d",
    storageBucket: "m-finance-fed5d.appspot.com",
    messagingSenderId: "1058147132548",
    appId: "1:1058147132548:web:96662487050fe85a368ed1",
  },
  u0 = cf(a0),
  c0 = () => {
    const [e, t] = k.useState(null),
      [n, r] = k.useState(null),
      o = (l) => {
        l.target.name === "idPhoto"
          ? t(l.target.files[0])
          : l.target.name === "passportPhoto" && r(l.target.files[0]);
      },
      i = async (l) => {
        if ((l.preventDefault(), !e || !n)) {
          alert("Please upload both ID and passport photos.");
          return;
        }
      };
    return g.jsxs("div", {
      className: "flex flex-col md:flex-row p-3 md:max-w-6xl md:mx-auto gap-5",
      children: [
        g.jsxs("div", {
          children: [
            g.jsxs("h1", {
              className: "text-3xl",
              children: [
                "Help us assist you",
                " ",
                g.jsx("span", {
                  className: "text-[#6D1321] font-semibold",
                  children: "better",
                }),
              ],
            }),
            g.jsx("p", {
              children:
                "Upload clear passport photo and your id (front and back)",
            }),
          ],
        }),
        g.jsx("div", {
          className: "flex flex-col gap-4",
          children: g.jsxs("form", {
            onSubmit: i,
            className: "registration-form flex flex-col gap-3",
            children: [
              g.jsx("label", { htmlFor: "id-image", children: "Id images:" }),
              g.jsx("input", {
                type: "file",
                name: "idPhoto",
                onChange: o,
                accept: "image/*",
                required: !0,
              }),
              g.jsx("label", {
                htmlFor: "id-image",
                children: "passport image:",
              }),
              g.jsx("input", {
                type: "file",
                name: "passportPhoto",
                onChange: o,
                accept: "image/*",
                required: !0,
              }),
              g.jsx("button", {
                type: "submit",
                className: "bg-[#6D1321] text-white p-2 rounded",
                children: "Add Files",
              }),
            ],
          }),
        }),
      ],
    });
  };
function d0() {
  return g.jsx("div", { children: "TermsAndConditions" });
}
const f0 = () => {
    const e = n0(u0),
      [t, n] = k.useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        alternatemobile: "",
        photoFront: null,
        photoBack: null,
        terms: !1,
      }),
      [r, o] = k.useState(!1),
      i = (u) => {
        const { name: h, value: f, type: m, checked: y } = u.target;
        n({ ...t, [h]: m === "checkbox" ? y : f });
      },
      l = (u) => {
        n({ ...t, photoFront: u.target.files[0] });
      },
      s = (u) => {
        n({ ...t, photoBack: u.target.files[0] });
      },
      a = async (u) => {
        u.preventDefault();
        const {
          name: h,
          email: f,
          password: m,
          mobile: y,
          alternatemobile: w,
          photoFront: _,
          photoBack: S,
          terms: d,
        } = t;
        if (!h || !f || !m || !y || !w || !_ || !S || d == !1) {
          alert("All fields are required.");
          return;
        }
        if (y === w) {
          alert("Mobile numbers cannot be the same.");
          return;
        }
        o(!0);
        try {
          const c = Tu(e, `users/${Date.now()}-${_.name}`),
            p = await Pu(c, _),
            v = await Ru(p.ref),
            E = Tu(e, `users/${Date.now()}-${S.name}`),
            P = await Pu(E, S),
            R = await Ru(P.ref),
            $ = await (
              await fetch("/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: h,
                  email: f,
                  password: m,
                  mobile: y,
                  alternatemobile: w,
                  photoURLFront: v,
                  photoURLBack: R,
                  terms: d,
                }),
              })
            ).json();
          (window.location.href = "/login"), console.log($.message);
        } catch (c) {
          console.error(c), alert("Something went wrong."), o(!1);
          return;
        }
      };
    return g.jsx("div", {
      className: "max-w-6xl mx-auto p-4 text-white",
      children: g.jsxs("div", {
        className: "flex flex-col md:flex-row",
        children: [
          g.jsxs("div", {
            className: "md:w-[600px] md:block md:p-4 p-4",
            children: [
              g.jsxs("h1", {
                className: "text-6xl justify-center mb-5 mt-2",
                children: [
                  "Welcome to ",
                  g.jsx("span", {
                    className: "text-[#b9283b]",
                    children: "Gammaridge!",
                  }),
                ],
              }),
              g.jsx("p", {
                className: "mb-5 text-xl",
                children:
                  "We’re excited to have you here. Join our community to access quick, reliable loans tailored to your needs. By registering, you’ll unlock an easy-to-use dashboard where you can manage your loan applications, track your loan status, and enjoy personalized financial services.",
              }),
              g.jsx("p", {
                className: "mb-5 text-xl",
                children:
                  "Sign up now and take the first step toward securing your financial future with us!",
              }),
            ],
          }),
          g.jsxs("form", {
            onSubmit: a,
            className: "md:w-[600px] p-3 w-full",
            children: [
              g.jsxs("div", {
                className: "mb-2",
                children: [
                  g.jsx("label", { className: "block", children: "Name" }),
                  g.jsx("input", {
                    type: "text",
                    name: "name",
                    value: t.name,
                    onChange: i,
                    className:
                      "bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full",
                  }),
                ],
              }),
              g.jsxs("div", {
                className: "mb-2",
                children: [
                  g.jsx("label", { className: "block", children: "Email" }),
                  g.jsx("input", {
                    type: "email",
                    name: "email",
                    value: t.email,
                    onChange: i,
                    className:
                      "bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full",
                  }),
                ],
              }),
              g.jsxs("div", {
                className: "mb-2",
                children: [
                  g.jsx("label", { className: "block", children: "Password" }),
                  g.jsx("input", {
                    type: "password",
                    name: "password",
                    value: t.password,
                    onChange: i,
                    className:
                      "bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full",
                  }),
                ],
              }),
              g.jsxs("div", {
                className: "mb-2",
                children: [
                  g.jsx("label", { className: "block", children: "Mobile" }),
                  g.jsx("input", {
                    type: "text",
                    name: "mobile",
                    value: t.mobile,
                    onChange: i,
                    className:
                      "bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full",
                  }),
                ],
              }),
              g.jsxs("div", {
                className: "mb-2",
                children: [
                  g.jsx("label", {
                    className: "block",
                    children: "Alternate Mobile",
                  }),
                  g.jsx("input", {
                    type: "text",
                    name: "alternatemobile",
                    value: t.alternatemobile,
                    onChange: i,
                    className:
                      "bg-gray-600 text-white px-3 py-2 rounded-md border focus:outline-none focus:ring-0 focus:border-[#b9283b] w-full",
                  }),
                ],
              }),
              g.jsxs("div", {
                className: "mb-2",
                children: [
                  g.jsx("label", {
                    className: "block",
                    children: "Front ID photo",
                  }),
                  g.jsx("input", {
                    type: "file",
                    name: "photoFront",
                    onChange: l,
                    className: "border p-2 w-full text-white",
                  }),
                ],
              }),
              g.jsxs("div", {
                className: "mb-2",
                children: [
                  g.jsx("label", {
                    className: "block",
                    children: "Back ID photo",
                  }),
                  g.jsx("input", {
                    type: "file",
                    name: "photoBack",
                    onChange: s,
                    className: "border p-2 w-full text-white",
                  }),
                ],
              }),
              g.jsx("div", {
                className: "mb-2",
                children: g.jsxs("label", {
                  className: "inline-flex items-center",
                  children: [
                    g.jsx("input", {
                      type: "checkbox",
                      name: "terms",
                      checked: t.terms,
                      onChange: i,
                    }),
                    g.jsx("span", {
                      className: "ml-2",
                      children: "I agree to the terms and conditions",
                    }),
                  ],
                }),
              }),
              g.jsx("button", {
                type: "submit",
                className: "bg-[#b9283b] w-full text-white p-2 rounded",
                disabled: r,
                children: r ? "Registering..." : "Register",
              }),
              g.jsxs("div", {
                className: "mt-3",
                children: [
                  "Already have an account?",
                  " ",
                  g.jsx(kt, {
                    to: "/login",
                    children: g.jsx("span", {
                      className: "text-[#b9283b]",
                      children: "Login",
                    }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    });
  },
  p0 = () =>
    g.jsxs(tg, {
      children: [
        g.jsx(wg, {}),
        g.jsxs(Gm, {
          children: [
            g.jsx(Ke, { path: "/", element: g.jsx(ug, {}) }),
            g.jsx(Ke, { path: "/register", element: g.jsx(f0, {}) }),
            g.jsx(Ke, { path: "/login", element: g.jsx(ig, {}) }),
            g.jsx(Ke, { path: "/adminogin", element: g.jsx(_g, {}) }),
            g.jsx(Ke, { path: "/docs", element: g.jsx(c0, {}) }),
            g.jsx(Ke, { path: "/dashboard", element: g.jsx(lg, {}) }),
            g.jsx(Ke, { path: "/admin", element: g.jsx(sg, {}) }),
            g.jsx(Ke, { path: "/terms", element: g.jsx(d0, {}) }),
          ],
        }),
      ],
    });
Hd(document.getElementById("root")).render(
  g.jsx(k.StrictMode, { children: g.jsx(p0, {}) })
);
