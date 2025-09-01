var fO = Object.defineProperty;
var UC = (T) => {
  throw TypeError(T);
};
var dO = (T, m, E) => m in T ? fO(T, m, { enumerable: !0, configurable: !0, writable: !0, value: E }) : T[m] = E;
var vc = (T, m, E) => dO(T, typeof m != "symbol" ? m + "" : m, E), HS = (T, m, E) => m.has(T) || UC("Cannot " + E);
var _n = (T, m, E) => (HS(T, m, "read from private field"), E ? E.call(T) : m.get(T)), Vi = (T, m, E) => m.has(T) ? UC("Cannot add the same private member more than once") : m instanceof WeakSet ? m.add(T) : m.set(T, E), py = (T, m, E, M) => (HS(T, m, "write to private field"), M ? M.call(T, E) : m.set(T, E), E), xr = (T, m, E) => (HS(T, m, "access private method"), E);
function pO(T) {
  return T && T.__esModule && Object.prototype.hasOwnProperty.call(T, "default") ? T.default : T;
}
var $S = { exports: {} }, hv = {}, WS = { exports: {} }, St = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var PC;
function vO() {
  if (PC) return St;
  PC = 1;
  var T = Symbol.for("react.element"), m = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), M = Symbol.for("react.strict_mode"), $ = Symbol.for("react.profiler"), A = Symbol.for("react.provider"), g = Symbol.for("react.context"), ee = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), K = Symbol.for("react.memo"), B = Symbol.for("react.lazy"), F = Symbol.iterator;
  function W(k) {
    return k === null || typeof k != "object" ? null : (k = F && k[F] || k["@@iterator"], typeof k == "function" ? k : null);
  }
  var N = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, X = Object.assign, fe = {};
  function he(k, Z, Ke) {
    this.props = k, this.context = Z, this.refs = fe, this.updater = Ke || N;
  }
  he.prototype.isReactComponent = {}, he.prototype.setState = function(k, Z) {
    if (typeof k != "object" && typeof k != "function" && k != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, k, Z, "setState");
  }, he.prototype.forceUpdate = function(k) {
    this.updater.enqueueForceUpdate(this, k, "forceUpdate");
  };
  function Me() {
  }
  Me.prototype = he.prototype;
  function De(k, Z, Ke) {
    this.props = k, this.context = Z, this.refs = fe, this.updater = Ke || N;
  }
  var Le = De.prototype = new Me();
  Le.constructor = De, X(Le, he.prototype), Le.isPureReactComponent = !0;
  var Ye = Array.isArray, Oe = Object.prototype.hasOwnProperty, Je = { current: null }, je = { key: !0, ref: !0, __self: !0, __source: !0 };
  function wt(k, Z, Ke) {
    var Qe, pt = {}, st = null, lt = null;
    if (Z != null) for (Qe in Z.ref !== void 0 && (lt = Z.ref), Z.key !== void 0 && (st = "" + Z.key), Z) Oe.call(Z, Qe) && !je.hasOwnProperty(Qe) && (pt[Qe] = Z[Qe]);
    var ct = arguments.length - 2;
    if (ct === 1) pt.children = Ke;
    else if (1 < ct) {
      for (var vt = Array(ct), Wt = 0; Wt < ct; Wt++) vt[Wt] = arguments[Wt + 2];
      pt.children = vt;
    }
    if (k && k.defaultProps) for (Qe in ct = k.defaultProps, ct) pt[Qe] === void 0 && (pt[Qe] = ct[Qe]);
    return { $$typeof: T, type: k, key: st, ref: lt, props: pt, _owner: Je.current };
  }
  function xt(k, Z) {
    return { $$typeof: T, type: k.type, key: Z, ref: k.ref, props: k.props, _owner: k._owner };
  }
  function kt(k) {
    return typeof k == "object" && k !== null && k.$$typeof === T;
  }
  function Mt(k) {
    var Z = { "=": "=0", ":": "=2" };
    return "$" + k.replace(/[=:]/g, function(Ke) {
      return Z[Ke];
    });
  }
  var _t = /\/+/g;
  function Fe(k, Z) {
    return typeof k == "object" && k !== null && k.key != null ? Mt("" + k.key) : Z.toString(36);
  }
  function Vt(k, Z, Ke, Qe, pt) {
    var st = typeof k;
    (st === "undefined" || st === "boolean") && (k = null);
    var lt = !1;
    if (k === null) lt = !0;
    else switch (st) {
      case "string":
      case "number":
        lt = !0;
        break;
      case "object":
        switch (k.$$typeof) {
          case T:
          case m:
            lt = !0;
        }
    }
    if (lt) return lt = k, pt = pt(lt), k = Qe === "" ? "." + Fe(lt, 0) : Qe, Ye(pt) ? (Ke = "", k != null && (Ke = k.replace(_t, "$&/") + "/"), Vt(pt, Z, Ke, "", function(Wt) {
      return Wt;
    })) : pt != null && (kt(pt) && (pt = xt(pt, Ke + (!pt.key || lt && lt.key === pt.key ? "" : ("" + pt.key).replace(_t, "$&/") + "/") + k)), Z.push(pt)), 1;
    if (lt = 0, Qe = Qe === "" ? "." : Qe + ":", Ye(k)) for (var ct = 0; ct < k.length; ct++) {
      st = k[ct];
      var vt = Qe + Fe(st, ct);
      lt += Vt(st, Z, Ke, vt, pt);
    }
    else if (vt = W(k), typeof vt == "function") for (k = vt.call(k), ct = 0; !(st = k.next()).done; ) st = st.value, vt = Qe + Fe(st, ct++), lt += Vt(st, Z, Ke, vt, pt);
    else if (st === "object") throw Z = String(k), Error("Objects are not valid as a React child (found: " + (Z === "[object Object]" ? "object with keys {" + Object.keys(k).join(", ") + "}" : Z) + "). If you meant to render a collection of children, use an array instead.");
    return lt;
  }
  function Nt(k, Z, Ke) {
    if (k == null) return k;
    var Qe = [], pt = 0;
    return Vt(k, Qe, "", "", function(st) {
      return Z.call(Ke, st, pt++);
    }), Qe;
  }
  function At(k) {
    if (k._status === -1) {
      var Z = k._result;
      Z = Z(), Z.then(function(Ke) {
        (k._status === 0 || k._status === -1) && (k._status = 1, k._result = Ke);
      }, function(Ke) {
        (k._status === 0 || k._status === -1) && (k._status = 2, k._result = Ke);
      }), k._status === -1 && (k._status = 0, k._result = Z);
    }
    if (k._status === 1) return k._result.default;
    throw k._result;
  }
  var Ne = { current: null }, se = { transition: null }, Ae = { ReactCurrentDispatcher: Ne, ReactCurrentBatchConfig: se, ReactCurrentOwner: Je };
  function pe() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return St.Children = { map: Nt, forEach: function(k, Z, Ke) {
    Nt(k, function() {
      Z.apply(this, arguments);
    }, Ke);
  }, count: function(k) {
    var Z = 0;
    return Nt(k, function() {
      Z++;
    }), Z;
  }, toArray: function(k) {
    return Nt(k, function(Z) {
      return Z;
    }) || [];
  }, only: function(k) {
    if (!kt(k)) throw Error("React.Children.only expected to receive a single React element child.");
    return k;
  } }, St.Component = he, St.Fragment = E, St.Profiler = $, St.PureComponent = De, St.StrictMode = M, St.Suspense = P, St.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ae, St.act = pe, St.cloneElement = function(k, Z, Ke) {
    if (k == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + k + ".");
    var Qe = X({}, k.props), pt = k.key, st = k.ref, lt = k._owner;
    if (Z != null) {
      if (Z.ref !== void 0 && (st = Z.ref, lt = Je.current), Z.key !== void 0 && (pt = "" + Z.key), k.type && k.type.defaultProps) var ct = k.type.defaultProps;
      for (vt in Z) Oe.call(Z, vt) && !je.hasOwnProperty(vt) && (Qe[vt] = Z[vt] === void 0 && ct !== void 0 ? ct[vt] : Z[vt]);
    }
    var vt = arguments.length - 2;
    if (vt === 1) Qe.children = Ke;
    else if (1 < vt) {
      ct = Array(vt);
      for (var Wt = 0; Wt < vt; Wt++) ct[Wt] = arguments[Wt + 2];
      Qe.children = ct;
    }
    return { $$typeof: T, type: k.type, key: pt, ref: st, props: Qe, _owner: lt };
  }, St.createContext = function(k) {
    return k = { $$typeof: g, _currentValue: k, _currentValue2: k, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, k.Provider = { $$typeof: A, _context: k }, k.Consumer = k;
  }, St.createElement = wt, St.createFactory = function(k) {
    var Z = wt.bind(null, k);
    return Z.type = k, Z;
  }, St.createRef = function() {
    return { current: null };
  }, St.forwardRef = function(k) {
    return { $$typeof: ee, render: k };
  }, St.isValidElement = kt, St.lazy = function(k) {
    return { $$typeof: B, _payload: { _status: -1, _result: k }, _init: At };
  }, St.memo = function(k, Z) {
    return { $$typeof: K, type: k, compare: Z === void 0 ? null : Z };
  }, St.startTransition = function(k) {
    var Z = se.transition;
    se.transition = {};
    try {
      k();
    } finally {
      se.transition = Z;
    }
  }, St.unstable_act = pe, St.useCallback = function(k, Z) {
    return Ne.current.useCallback(k, Z);
  }, St.useContext = function(k) {
    return Ne.current.useContext(k);
  }, St.useDebugValue = function() {
  }, St.useDeferredValue = function(k) {
    return Ne.current.useDeferredValue(k);
  }, St.useEffect = function(k, Z) {
    return Ne.current.useEffect(k, Z);
  }, St.useId = function() {
    return Ne.current.useId();
  }, St.useImperativeHandle = function(k, Z, Ke) {
    return Ne.current.useImperativeHandle(k, Z, Ke);
  }, St.useInsertionEffect = function(k, Z) {
    return Ne.current.useInsertionEffect(k, Z);
  }, St.useLayoutEffect = function(k, Z) {
    return Ne.current.useLayoutEffect(k, Z);
  }, St.useMemo = function(k, Z) {
    return Ne.current.useMemo(k, Z);
  }, St.useReducer = function(k, Z, Ke) {
    return Ne.current.useReducer(k, Z, Ke);
  }, St.useRef = function(k) {
    return Ne.current.useRef(k);
  }, St.useState = function(k) {
    return Ne.current.useState(k);
  }, St.useSyncExternalStore = function(k, Z, Ke) {
    return Ne.current.useSyncExternalStore(k, Z, Ke);
  }, St.useTransition = function() {
    return Ne.current.useTransition();
  }, St.version = "18.3.1", St;
}
var gv = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
gv.exports;
var jC;
function hO() {
  return jC || (jC = 1, function(T, m) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var E = "18.3.1", M = Symbol.for("react.element"), $ = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), K = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), W = Symbol.for("react.suspense_list"), N = Symbol.for("react.memo"), X = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), he = Symbol.iterator, Me = "@@iterator";
      function De(h) {
        if (h === null || typeof h != "object")
          return null;
        var C = he && h[he] || h[Me];
        return typeof C == "function" ? C : null;
      }
      var Le = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ye = {
        transition: null
      }, Oe = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Je = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, je = {}, wt = null;
      function xt(h) {
        wt = h;
      }
      je.setExtraStackFrame = function(h) {
        wt = h;
      }, je.getCurrentStack = null, je.getStackAddendum = function() {
        var h = "";
        wt && (h += wt);
        var C = je.getCurrentStack;
        return C && (h += C() || ""), h;
      };
      var kt = !1, Mt = !1, _t = !1, Fe = !1, Vt = !1, Nt = {
        ReactCurrentDispatcher: Le,
        ReactCurrentBatchConfig: Ye,
        ReactCurrentOwner: Je
      };
      Nt.ReactDebugCurrentFrame = je, Nt.ReactCurrentActQueue = Oe;
      function At(h) {
        {
          for (var C = arguments.length, I = new Array(C > 1 ? C - 1 : 0), G = 1; G < C; G++)
            I[G - 1] = arguments[G];
          se("warn", h, I);
        }
      }
      function Ne(h) {
        {
          for (var C = arguments.length, I = new Array(C > 1 ? C - 1 : 0), G = 1; G < C; G++)
            I[G - 1] = arguments[G];
          se("error", h, I);
        }
      }
      function se(h, C, I) {
        {
          var G = Nt.ReactDebugCurrentFrame, ue = G.getStackAddendum();
          ue !== "" && (C += "%s", I = I.concat([ue]));
          var Ve = I.map(function(ve) {
            return String(ve);
          });
          Ve.unshift("Warning: " + C), Function.prototype.apply.call(console[h], console, Ve);
        }
      }
      var Ae = {};
      function pe(h, C) {
        {
          var I = h.constructor, G = I && (I.displayName || I.name) || "ReactClass", ue = G + "." + C;
          if (Ae[ue])
            return;
          Ne("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", C, G), Ae[ue] = !0;
        }
      }
      var k = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, C, I) {
          pe(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, C, I, G) {
          pe(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, C, I, G) {
          pe(h, "setState");
        }
      }, Z = Object.assign, Ke = {};
      Object.freeze(Ke);
      function Qe(h, C, I) {
        this.props = h, this.context = C, this.refs = Ke, this.updater = I || k;
      }
      Qe.prototype.isReactComponent = {}, Qe.prototype.setState = function(h, C) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, C, "setState");
      }, Qe.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var pt = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, st = function(h, C) {
          Object.defineProperty(Qe.prototype, h, {
            get: function() {
              At("%s(...) is deprecated in plain JavaScript React classes. %s", C[0], C[1]);
            }
          });
        };
        for (var lt in pt)
          pt.hasOwnProperty(lt) && st(lt, pt[lt]);
      }
      function ct() {
      }
      ct.prototype = Qe.prototype;
      function vt(h, C, I) {
        this.props = h, this.context = C, this.refs = Ke, this.updater = I || k;
      }
      var Wt = vt.prototype = new ct();
      Wt.constructor = vt, Z(Wt, Qe.prototype), Wt.isPureReactComponent = !0;
      function Nn() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var Dr = Array.isArray;
      function Rn(h) {
        return Dr(h);
      }
      function ar(h) {
        {
          var C = typeof Symbol == "function" && Symbol.toStringTag, I = C && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return I;
        }
      }
      function Bn(h) {
        try {
          return Yn(h), !1;
        } catch {
          return !0;
        }
      }
      function Yn(h) {
        return "" + h;
      }
      function Gr(h) {
        if (Bn(h))
          return Ne("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ar(h)), Yn(h);
      }
      function pi(h, C, I) {
        var G = h.displayName;
        if (G)
          return G;
        var ue = C.displayName || C.name || "";
        return ue !== "" ? I + "(" + ue + ")" : I;
      }
      function fa(h) {
        return h.displayName || "Context";
      }
      function Xn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && Ne("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case A:
            return "Fragment";
          case $:
            return "Portal";
          case ee:
            return "Profiler";
          case g:
            return "StrictMode";
          case F:
            return "Suspense";
          case W:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case K:
              var C = h;
              return fa(C) + ".Consumer";
            case P:
              var I = h;
              return fa(I._context) + ".Provider";
            case B:
              return pi(h, h.render, "ForwardRef");
            case N:
              var G = h.displayName || null;
              return G !== null ? G : Xn(h.type) || "Memo";
            case X: {
              var ue = h, Ve = ue._payload, ve = ue._init;
              try {
                return Xn(ve(Ve));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Cn = Object.prototype.hasOwnProperty, $n = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Sr, Qa, Ln;
      Ln = {};
      function _r(h) {
        if (Cn.call(h, "ref")) {
          var C = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function da(h) {
        if (Cn.call(h, "key")) {
          var C = Object.getOwnPropertyDescriptor(h, "key").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function qa(h, C) {
        var I = function() {
          Sr || (Sr = !0, Ne("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        I.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: I,
          configurable: !0
        });
      }
      function vi(h, C) {
        var I = function() {
          Qa || (Qa = !0, Ne("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        I.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: I,
          configurable: !0
        });
      }
      function ce(h) {
        if (typeof h.ref == "string" && Je.current && h.__self && Je.current.stateNode !== h.__self) {
          var C = Xn(Je.current.type);
          Ln[C] || (Ne('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C, h.ref), Ln[C] = !0);
        }
      }
      var ze = function(h, C, I, G, ue, Ve, ve) {
        var We = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: M,
          // Built-in properties that belong on the element
          type: h,
          key: C,
          ref: I,
          props: ve,
          // Record the component responsible for creating this element.
          _owner: Ve
        };
        return We._store = {}, Object.defineProperty(We._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(We, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: G
        }), Object.defineProperty(We, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: ue
        }), Object.freeze && (Object.freeze(We.props), Object.freeze(We)), We;
      };
      function ft(h, C, I) {
        var G, ue = {}, Ve = null, ve = null, We = null, gt = null;
        if (C != null) {
          _r(C) && (ve = C.ref, ce(C)), da(C) && (Gr(C.key), Ve = "" + C.key), We = C.__self === void 0 ? null : C.__self, gt = C.__source === void 0 ? null : C.__source;
          for (G in C)
            Cn.call(C, G) && !$n.hasOwnProperty(G) && (ue[G] = C[G]);
        }
        var Ot = arguments.length - 2;
        if (Ot === 1)
          ue.children = I;
        else if (Ot > 1) {
          for (var ln = Array(Ot), Xt = 0; Xt < Ot; Xt++)
            ln[Xt] = arguments[Xt + 2];
          Object.freeze && Object.freeze(ln), ue.children = ln;
        }
        if (h && h.defaultProps) {
          var dt = h.defaultProps;
          for (G in dt)
            ue[G] === void 0 && (ue[G] = dt[G]);
        }
        if (Ve || ve) {
          var Zt = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Ve && qa(ue, Zt), ve && vi(ue, Zt);
        }
        return ze(h, Ve, ve, We, gt, Je.current, ue);
      }
      function Bt(h, C) {
        var I = ze(h.type, C, h.ref, h._self, h._source, h._owner, h.props);
        return I;
      }
      function rn(h, C, I) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var G, ue = Z({}, h.props), Ve = h.key, ve = h.ref, We = h._self, gt = h._source, Ot = h._owner;
        if (C != null) {
          _r(C) && (ve = C.ref, Ot = Je.current), da(C) && (Gr(C.key), Ve = "" + C.key);
          var ln;
          h.type && h.type.defaultProps && (ln = h.type.defaultProps);
          for (G in C)
            Cn.call(C, G) && !$n.hasOwnProperty(G) && (C[G] === void 0 && ln !== void 0 ? ue[G] = ln[G] : ue[G] = C[G]);
        }
        var Xt = arguments.length - 2;
        if (Xt === 1)
          ue.children = I;
        else if (Xt > 1) {
          for (var dt = Array(Xt), Zt = 0; Zt < Xt; Zt++)
            dt[Zt] = arguments[Zt + 2];
          ue.children = dt;
        }
        return ze(h.type, Ve, ve, We, gt, Ot, ue);
      }
      function hn(h) {
        return typeof h == "object" && h !== null && h.$$typeof === M;
      }
      var sn = ".", Zn = ":";
      function an(h) {
        var C = /[=:]/g, I = {
          "=": "=0",
          ":": "=2"
        }, G = h.replace(C, function(ue) {
          return I[ue];
        });
        return "$" + G;
      }
      var Qt = !1, qt = /\/+/g;
      function pa(h) {
        return h.replace(qt, "$&/");
      }
      function Tr(h, C) {
        return typeof h == "object" && h !== null && h.key != null ? (Gr(h.key), an("" + h.key)) : C.toString(36);
      }
      function wa(h, C, I, G, ue) {
        var Ve = typeof h;
        (Ve === "undefined" || Ve === "boolean") && (h = null);
        var ve = !1;
        if (h === null)
          ve = !0;
        else
          switch (Ve) {
            case "string":
            case "number":
              ve = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case M:
                case $:
                  ve = !0;
              }
          }
        if (ve) {
          var We = h, gt = ue(We), Ot = G === "" ? sn + Tr(We, 0) : G;
          if (Rn(gt)) {
            var ln = "";
            Ot != null && (ln = pa(Ot) + "/"), wa(gt, C, ln, "", function(pd) {
              return pd;
            });
          } else gt != null && (hn(gt) && (gt.key && (!We || We.key !== gt.key) && Gr(gt.key), gt = Bt(
            gt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            I + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (gt.key && (!We || We.key !== gt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              pa("" + gt.key) + "/"
            ) : "") + Ot
          )), C.push(gt));
          return 1;
        }
        var Xt, dt, Zt = 0, mn = G === "" ? sn : G + Zn;
        if (Rn(h))
          for (var Do = 0; Do < h.length; Do++)
            Xt = h[Do], dt = mn + Tr(Xt, Do), Zt += wa(Xt, C, I, dt, ue);
        else {
          var rs = De(h);
          if (typeof rs == "function") {
            var Gi = h;
            rs === Gi.entries && (Qt || At("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Qt = !0);
            for (var as = rs.call(Gi), vl, dd = 0; !(vl = as.next()).done; )
              Xt = vl.value, dt = mn + Tr(Xt, dd++), Zt += wa(Xt, C, I, dt, ue);
          } else if (Ve === "object") {
            var _c = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (_c === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : _c) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Zt;
      }
      function Yi(h, C, I) {
        if (h == null)
          return h;
        var G = [], ue = 0;
        return wa(h, G, "", "", function(Ve) {
          return C.call(I, Ve, ue++);
        }), G;
      }
      function il(h) {
        var C = 0;
        return Yi(h, function() {
          C++;
        }), C;
      }
      function ol(h, C, I) {
        Yi(h, function() {
          C.apply(this, arguments);
        }, I);
      }
      function Eo(h) {
        return Yi(h, function(C) {
          return C;
        }) || [];
      }
      function So(h) {
        if (!hn(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function ll(h) {
        var C = {
          $$typeof: K,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        C.Provider = {
          $$typeof: P,
          _context: C
        };
        var I = !1, G = !1, ue = !1;
        {
          var Ve = {
            $$typeof: K,
            _context: C
          };
          Object.defineProperties(Ve, {
            Provider: {
              get: function() {
                return G || (G = !0, Ne("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), C.Provider;
              },
              set: function(ve) {
                C.Provider = ve;
              }
            },
            _currentValue: {
              get: function() {
                return C._currentValue;
              },
              set: function(ve) {
                C._currentValue = ve;
              }
            },
            _currentValue2: {
              get: function() {
                return C._currentValue2;
              },
              set: function(ve) {
                C._currentValue2 = ve;
              }
            },
            _threadCount: {
              get: function() {
                return C._threadCount;
              },
              set: function(ve) {
                C._threadCount = ve;
              }
            },
            Consumer: {
              get: function() {
                return I || (I = !0, Ne("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), C.Consumer;
              }
            },
            displayName: {
              get: function() {
                return C.displayName;
              },
              set: function(ve) {
                ue || (At("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ve), ue = !0);
              }
            }
          }), C.Consumer = Ve;
        }
        return C._currentRenderer = null, C._currentRenderer2 = null, C;
      }
      var Or = -1, kr = 0, ir = 1, hi = 2;
      function Ka(h) {
        if (h._status === Or) {
          var C = h._result, I = C();
          if (I.then(function(Ve) {
            if (h._status === kr || h._status === Or) {
              var ve = h;
              ve._status = ir, ve._result = Ve;
            }
          }, function(Ve) {
            if (h._status === kr || h._status === Or) {
              var ve = h;
              ve._status = hi, ve._result = Ve;
            }
          }), h._status === Or) {
            var G = h;
            G._status = kr, G._result = I;
          }
        }
        if (h._status === ir) {
          var ue = h._result;
          return ue === void 0 && Ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ue), "default" in ue || Ne(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ue), ue.default;
        } else
          throw h._result;
      }
      function mi(h) {
        var C = {
          // We use these fields to store the result.
          _status: Or,
          _result: h
        }, I = {
          $$typeof: X,
          _payload: C,
          _init: Ka
        };
        {
          var G, ue;
          Object.defineProperties(I, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return G;
              },
              set: function(Ve) {
                Ne("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), G = Ve, Object.defineProperty(I, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return ue;
              },
              set: function(Ve) {
                Ne("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ue = Ve, Object.defineProperty(I, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return I;
      }
      function yi(h) {
        h != null && h.$$typeof === N ? Ne("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? Ne("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && Ne("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && Ne("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var C = {
          $$typeof: B,
          render: h
        };
        {
          var I;
          Object.defineProperty(C, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return I;
            },
            set: function(G) {
              I = G, !h.name && !h.displayName && (h.displayName = G);
            }
          });
        }
        return C;
      }
      var b;
      b = Symbol.for("react.module.reference");
      function te(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === A || h === ee || Vt || h === g || h === F || h === W || Fe || h === fe || kt || Mt || _t || typeof h == "object" && h !== null && (h.$$typeof === X || h.$$typeof === N || h.$$typeof === P || h.$$typeof === K || h.$$typeof === B || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === b || h.getModuleId !== void 0));
      }
      function me(h, C) {
        te(h) || Ne("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var I = {
          $$typeof: N,
          type: h,
          compare: C === void 0 ? null : C
        };
        {
          var G;
          Object.defineProperty(I, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return G;
            },
            set: function(ue) {
              G = ue, !h.name && !h.displayName && (h.displayName = ue);
            }
          });
        }
        return I;
      }
      function Ce() {
        var h = Le.current;
        return h === null && Ne(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function at(h) {
        var C = Ce();
        if (h._context !== void 0) {
          var I = h._context;
          I.Consumer === h ? Ne("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : I.Provider === h && Ne("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return C.useContext(h);
      }
      function tt(h) {
        var C = Ce();
        return C.useState(h);
      }
      function yt(h, C, I) {
        var G = Ce();
        return G.useReducer(h, C, I);
      }
      function ht(h) {
        var C = Ce();
        return C.useRef(h);
      }
      function bn(h, C) {
        var I = Ce();
        return I.useEffect(h, C);
      }
      function on(h, C) {
        var I = Ce();
        return I.useInsertionEffect(h, C);
      }
      function cn(h, C) {
        var I = Ce();
        return I.useLayoutEffect(h, C);
      }
      function or(h, C) {
        var I = Ce();
        return I.useCallback(h, C);
      }
      function Xa(h, C) {
        var I = Ce();
        return I.useMemo(h, C);
      }
      function Za(h, C, I) {
        var G = Ce();
        return G.useImperativeHandle(h, C, I);
      }
      function it(h, C) {
        {
          var I = Ce();
          return I.useDebugValue(h, C);
        }
      }
      function ut() {
        var h = Ce();
        return h.useTransition();
      }
      function Ja(h) {
        var C = Ce();
        return C.useDeferredValue(h);
      }
      function ul() {
        var h = Ce();
        return h.useId();
      }
      function sl(h, C, I) {
        var G = Ce();
        return G.useSyncExternalStore(h, C, I);
      }
      var _o = 0, eu, To, Qr, Ju, Mr, Ec, Sc;
      function tu() {
      }
      tu.__reactDisabledLog = !0;
      function Ro() {
        {
          if (_o === 0) {
            eu = console.log, To = console.info, Qr = console.warn, Ju = console.error, Mr = console.group, Ec = console.groupCollapsed, Sc = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: tu,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          _o++;
        }
      }
      function va() {
        {
          if (_o--, _o === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: Z({}, h, {
                value: eu
              }),
              info: Z({}, h, {
                value: To
              }),
              warn: Z({}, h, {
                value: Qr
              }),
              error: Z({}, h, {
                value: Ju
              }),
              group: Z({}, h, {
                value: Mr
              }),
              groupCollapsed: Z({}, h, {
                value: Ec
              }),
              groupEnd: Z({}, h, {
                value: Sc
              })
            });
          }
          _o < 0 && Ne("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var ei = Nt.ReactCurrentDispatcher, ti;
      function nu(h, C, I) {
        {
          if (ti === void 0)
            try {
              throw Error();
            } catch (ue) {
              var G = ue.stack.trim().match(/\n( *(at )?)/);
              ti = G && G[1] || "";
            }
          return `
` + ti + h;
        }
      }
      var cl = !1, Co;
      {
        var ru = typeof WeakMap == "function" ? WeakMap : Map;
        Co = new ru();
      }
      function au(h, C) {
        if (!h || cl)
          return "";
        {
          var I = Co.get(h);
          if (I !== void 0)
            return I;
        }
        var G;
        cl = !0;
        var ue = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Ve;
        Ve = ei.current, ei.current = null, Ro();
        try {
          if (C) {
            var ve = function() {
              throw Error();
            };
            if (Object.defineProperty(ve.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(ve, []);
              } catch (mn) {
                G = mn;
              }
              Reflect.construct(h, [], ve);
            } else {
              try {
                ve.call();
              } catch (mn) {
                G = mn;
              }
              h.call(ve.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (mn) {
              G = mn;
            }
            h();
          }
        } catch (mn) {
          if (mn && G && typeof mn.stack == "string") {
            for (var We = mn.stack.split(`
`), gt = G.stack.split(`
`), Ot = We.length - 1, ln = gt.length - 1; Ot >= 1 && ln >= 0 && We[Ot] !== gt[ln]; )
              ln--;
            for (; Ot >= 1 && ln >= 0; Ot--, ln--)
              if (We[Ot] !== gt[ln]) {
                if (Ot !== 1 || ln !== 1)
                  do
                    if (Ot--, ln--, ln < 0 || We[Ot] !== gt[ln]) {
                      var Xt = `
` + We[Ot].replace(" at new ", " at ");
                      return h.displayName && Xt.includes("<anonymous>") && (Xt = Xt.replace("<anonymous>", h.displayName)), typeof h == "function" && Co.set(h, Xt), Xt;
                    }
                  while (Ot >= 1 && ln >= 0);
                break;
              }
          }
        } finally {
          cl = !1, ei.current = Ve, va(), Error.prepareStackTrace = ue;
        }
        var dt = h ? h.displayName || h.name : "", Zt = dt ? nu(dt) : "";
        return typeof h == "function" && Co.set(h, Zt), Zt;
      }
      function $i(h, C, I) {
        return au(h, !1);
      }
      function cd(h) {
        var C = h.prototype;
        return !!(C && C.isReactComponent);
      }
      function Wi(h, C, I) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return au(h, cd(h));
        if (typeof h == "string")
          return nu(h);
        switch (h) {
          case F:
            return nu("Suspense");
          case W:
            return nu("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case B:
              return $i(h.render);
            case N:
              return Wi(h.type, C, I);
            case X: {
              var G = h, ue = G._payload, Ve = G._init;
              try {
                return Wi(Ve(ue), C, I);
              } catch {
              }
            }
          }
        return "";
      }
      var zt = {}, iu = Nt.ReactDebugCurrentFrame;
      function Dt(h) {
        if (h) {
          var C = h._owner, I = Wi(h.type, h._source, C ? C.type : null);
          iu.setExtraStackFrame(I);
        } else
          iu.setExtraStackFrame(null);
      }
      function es(h, C, I, G, ue) {
        {
          var Ve = Function.call.bind(Cn);
          for (var ve in h)
            if (Ve(h, ve)) {
              var We = void 0;
              try {
                if (typeof h[ve] != "function") {
                  var gt = Error((G || "React class") + ": " + I + " type `" + ve + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[ve] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw gt.name = "Invariant Violation", gt;
                }
                We = h[ve](C, ve, G, I, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Ot) {
                We = Ot;
              }
              We && !(We instanceof Error) && (Dt(ue), Ne("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", G || "React class", I, ve, typeof We), Dt(null)), We instanceof Error && !(We.message in zt) && (zt[We.message] = !0, Dt(ue), Ne("Failed %s type: %s", I, We.message), Dt(null));
            }
        }
      }
      function gi(h) {
        if (h) {
          var C = h._owner, I = Wi(h.type, h._source, C ? C.type : null);
          xt(I);
        } else
          xt(null);
      }
      var et;
      et = !1;
      function ou() {
        if (Je.current) {
          var h = Xn(Je.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function lr(h) {
        if (h !== void 0) {
          var C = h.fileName.replace(/^.*[\\\/]/, ""), I = h.lineNumber;
          return `

Check your code at ` + C + ":" + I + ".";
        }
        return "";
      }
      function Ei(h) {
        return h != null ? lr(h.__source) : "";
      }
      var Nr = {};
      function Si(h) {
        var C = ou();
        if (!C) {
          var I = typeof h == "string" ? h : h.displayName || h.name;
          I && (C = `

Check the top-level render call using <` + I + ">.");
        }
        return C;
      }
      function fn(h, C) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var I = Si(C);
          if (!Nr[I]) {
            Nr[I] = !0;
            var G = "";
            h && h._owner && h._owner !== Je.current && (G = " It was passed a child from " + Xn(h._owner.type) + "."), gi(h), Ne('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', I, G), gi(null);
          }
        }
      }
      function Kt(h, C) {
        if (typeof h == "object") {
          if (Rn(h))
            for (var I = 0; I < h.length; I++) {
              var G = h[I];
              hn(G) && fn(G, C);
            }
          else if (hn(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var ue = De(h);
            if (typeof ue == "function" && ue !== h.entries)
              for (var Ve = ue.call(h), ve; !(ve = Ve.next()).done; )
                hn(ve.value) && fn(ve.value, C);
          }
        }
      }
      function bo(h) {
        {
          var C = h.type;
          if (C == null || typeof C == "string")
            return;
          var I;
          if (typeof C == "function")
            I = C.propTypes;
          else if (typeof C == "object" && (C.$$typeof === B || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          C.$$typeof === N))
            I = C.propTypes;
          else
            return;
          if (I) {
            var G = Xn(C);
            es(I, h.props, "prop", G, h);
          } else if (C.PropTypes !== void 0 && !et) {
            et = !0;
            var ue = Xn(C);
            Ne("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ue || "Unknown");
          }
          typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && Ne("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Wn(h) {
        {
          for (var C = Object.keys(h.props), I = 0; I < C.length; I++) {
            var G = C[I];
            if (G !== "children" && G !== "key") {
              gi(h), Ne("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", G), gi(null);
              break;
            }
          }
          h.ref !== null && (gi(h), Ne("Invalid attribute `ref` supplied to `React.Fragment`."), gi(null));
        }
      }
      function Lr(h, C, I) {
        var G = te(h);
        if (!G) {
          var ue = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (ue += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ve = Ei(C);
          Ve ? ue += Ve : ue += ou();
          var ve;
          h === null ? ve = "null" : Rn(h) ? ve = "array" : h !== void 0 && h.$$typeof === M ? (ve = "<" + (Xn(h.type) || "Unknown") + " />", ue = " Did you accidentally export a JSX literal instead of a component?") : ve = typeof h, Ne("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ve, ue);
        }
        var We = ft.apply(this, arguments);
        if (We == null)
          return We;
        if (G)
          for (var gt = 2; gt < arguments.length; gt++)
            Kt(arguments[gt], h);
        return h === A ? Wn(We) : bo(We), We;
      }
      var xa = !1;
      function fl(h) {
        var C = Lr.bind(null, h);
        return C.type = h, xa || (xa = !0, At("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(C, "type", {
          enumerable: !1,
          get: function() {
            return At("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), C;
      }
      function ts(h, C, I) {
        for (var G = rn.apply(this, arguments), ue = 2; ue < arguments.length; ue++)
          Kt(arguments[ue], G.type);
        return bo(G), G;
      }
      function ns(h, C) {
        var I = Ye.transition;
        Ye.transition = {};
        var G = Ye.transition;
        Ye.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (Ye.transition = I, I === null && G._updatedFibers) {
            var ue = G._updatedFibers.size;
            ue > 10 && At("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), G._updatedFibers.clear();
          }
        }
      }
      var wo = !1, dl = null;
      function fd(h) {
        if (dl === null)
          try {
            var C = ("require" + Math.random()).slice(0, 7), I = T && T[C];
            dl = I.call(T, "timers").setImmediate;
          } catch {
            dl = function(ue) {
              wo === !1 && (wo = !0, typeof MessageChannel > "u" && Ne("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Ve = new MessageChannel();
              Ve.port1.onmessage = ue, Ve.port2.postMessage(void 0);
            };
          }
        return dl(h);
      }
      var Da = 0, ni = !1;
      function _i(h) {
        {
          var C = Da;
          Da++, Oe.current === null && (Oe.current = []);
          var I = Oe.isBatchingLegacy, G;
          try {
            if (Oe.isBatchingLegacy = !0, G = h(), !I && Oe.didScheduleLegacyUpdate) {
              var ue = Oe.current;
              ue !== null && (Oe.didScheduleLegacyUpdate = !1, xo(ue));
            }
          } catch (dt) {
            throw Oa(C), dt;
          } finally {
            Oe.isBatchingLegacy = I;
          }
          if (G !== null && typeof G == "object" && typeof G.then == "function") {
            var Ve = G, ve = !1, We = {
              then: function(dt, Zt) {
                ve = !0, Ve.then(function(mn) {
                  Oa(C), Da === 0 ? lu(mn, dt, Zt) : dt(mn);
                }, function(mn) {
                  Oa(C), Zt(mn);
                });
              }
            };
            return !ni && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              ve || (ni = !0, Ne("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), We;
          } else {
            var gt = G;
            if (Oa(C), Da === 0) {
              var Ot = Oe.current;
              Ot !== null && (xo(Ot), Oe.current = null);
              var ln = {
                then: function(dt, Zt) {
                  Oe.current === null ? (Oe.current = [], lu(gt, dt, Zt)) : dt(gt);
                }
              };
              return ln;
            } else {
              var Xt = {
                then: function(dt, Zt) {
                  dt(gt);
                }
              };
              return Xt;
            }
          }
        }
      }
      function Oa(h) {
        h !== Da - 1 && Ne("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Da = h;
      }
      function lu(h, C, I) {
        {
          var G = Oe.current;
          if (G !== null)
            try {
              xo(G), fd(function() {
                G.length === 0 ? (Oe.current = null, C(h)) : lu(h, C, I);
              });
            } catch (ue) {
              I(ue);
            }
          else
            C(h);
        }
      }
      var uu = !1;
      function xo(h) {
        if (!uu) {
          uu = !0;
          var C = 0;
          try {
            for (; C < h.length; C++) {
              var I = h[C];
              do
                I = I(!0);
              while (I !== null);
            }
            h.length = 0;
          } catch (G) {
            throw h = h.slice(C + 1), G;
          } finally {
            uu = !1;
          }
        }
      }
      var pl = Lr, su = ts, cu = fl, ri = {
        map: Yi,
        forEach: ol,
        count: il,
        toArray: Eo,
        only: So
      };
      m.Children = ri, m.Component = Qe, m.Fragment = A, m.Profiler = ee, m.PureComponent = vt, m.StrictMode = g, m.Suspense = F, m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Nt, m.act = _i, m.cloneElement = su, m.createContext = ll, m.createElement = pl, m.createFactory = cu, m.createRef = Nn, m.forwardRef = yi, m.isValidElement = hn, m.lazy = mi, m.memo = me, m.startTransition = ns, m.unstable_act = _i, m.useCallback = or, m.useContext = at, m.useDebugValue = it, m.useDeferredValue = Ja, m.useEffect = bn, m.useId = ul, m.useImperativeHandle = Za, m.useInsertionEffect = on, m.useLayoutEffect = cn, m.useMemo = Xa, m.useReducer = yt, m.useRef = ht, m.useState = tt, m.useSyncExternalStore = sl, m.useTransition = ut, m.version = E, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(gv, gv.exports)), gv.exports;
}
process.env.NODE_ENV === "production" ? WS.exports = vO() : WS.exports = hO();
var Gt = WS.exports;
const sd = /* @__PURE__ */ pO(Gt);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var FC;
function mO() {
  if (FC) return hv;
  FC = 1;
  var T = Gt, m = Symbol.for("react.element"), E = Symbol.for("react.fragment"), M = Object.prototype.hasOwnProperty, $ = T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, A = { key: !0, ref: !0, __self: !0, __source: !0 };
  function g(ee, P, K) {
    var B, F = {}, W = null, N = null;
    K !== void 0 && (W = "" + K), P.key !== void 0 && (W = "" + P.key), P.ref !== void 0 && (N = P.ref);
    for (B in P) M.call(P, B) && !A.hasOwnProperty(B) && (F[B] = P[B]);
    if (ee && ee.defaultProps) for (B in P = ee.defaultProps, P) F[B] === void 0 && (F[B] = P[B]);
    return { $$typeof: m, type: ee, key: W, ref: N, props: F, _owner: $.current };
  }
  return hv.Fragment = E, hv.jsx = g, hv.jsxs = g, hv;
}
var mv = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var HC;
function yO() {
  return HC || (HC = 1, process.env.NODE_ENV !== "production" && function() {
    var T = Gt, m = Symbol.for("react.element"), E = Symbol.for("react.portal"), M = Symbol.for("react.fragment"), $ = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), ee = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), N = Symbol.for("react.offscreen"), X = Symbol.iterator, fe = "@@iterator";
    function he(b) {
      if (b === null || typeof b != "object")
        return null;
      var te = X && b[X] || b[fe];
      return typeof te == "function" ? te : null;
    }
    var Me = T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function De(b) {
      {
        for (var te = arguments.length, me = new Array(te > 1 ? te - 1 : 0), Ce = 1; Ce < te; Ce++)
          me[Ce - 1] = arguments[Ce];
        Le("error", b, me);
      }
    }
    function Le(b, te, me) {
      {
        var Ce = Me.ReactDebugCurrentFrame, at = Ce.getStackAddendum();
        at !== "" && (te += "%s", me = me.concat([at]));
        var tt = me.map(function(yt) {
          return String(yt);
        });
        tt.unshift("Warning: " + te), Function.prototype.apply.call(console[b], console, tt);
      }
    }
    var Ye = !1, Oe = !1, Je = !1, je = !1, wt = !1, xt;
    xt = Symbol.for("react.module.reference");
    function kt(b) {
      return !!(typeof b == "string" || typeof b == "function" || b === M || b === A || wt || b === $ || b === K || b === B || je || b === N || Ye || Oe || Je || typeof b == "object" && b !== null && (b.$$typeof === W || b.$$typeof === F || b.$$typeof === g || b.$$typeof === ee || b.$$typeof === P || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      b.$$typeof === xt || b.getModuleId !== void 0));
    }
    function Mt(b, te, me) {
      var Ce = b.displayName;
      if (Ce)
        return Ce;
      var at = te.displayName || te.name || "";
      return at !== "" ? me + "(" + at + ")" : me;
    }
    function _t(b) {
      return b.displayName || "Context";
    }
    function Fe(b) {
      if (b == null)
        return null;
      if (typeof b.tag == "number" && De("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof b == "function")
        return b.displayName || b.name || null;
      if (typeof b == "string")
        return b;
      switch (b) {
        case M:
          return "Fragment";
        case E:
          return "Portal";
        case A:
          return "Profiler";
        case $:
          return "StrictMode";
        case K:
          return "Suspense";
        case B:
          return "SuspenseList";
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case ee:
            var te = b;
            return _t(te) + ".Consumer";
          case g:
            var me = b;
            return _t(me._context) + ".Provider";
          case P:
            return Mt(b, b.render, "ForwardRef");
          case F:
            var Ce = b.displayName || null;
            return Ce !== null ? Ce : Fe(b.type) || "Memo";
          case W: {
            var at = b, tt = at._payload, yt = at._init;
            try {
              return Fe(yt(tt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Vt = Object.assign, Nt = 0, At, Ne, se, Ae, pe, k, Z;
    function Ke() {
    }
    Ke.__reactDisabledLog = !0;
    function Qe() {
      {
        if (Nt === 0) {
          At = console.log, Ne = console.info, se = console.warn, Ae = console.error, pe = console.group, k = console.groupCollapsed, Z = console.groupEnd;
          var b = {
            configurable: !0,
            enumerable: !0,
            value: Ke,
            writable: !0
          };
          Object.defineProperties(console, {
            info: b,
            log: b,
            warn: b,
            error: b,
            group: b,
            groupCollapsed: b,
            groupEnd: b
          });
        }
        Nt++;
      }
    }
    function pt() {
      {
        if (Nt--, Nt === 0) {
          var b = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Vt({}, b, {
              value: At
            }),
            info: Vt({}, b, {
              value: Ne
            }),
            warn: Vt({}, b, {
              value: se
            }),
            error: Vt({}, b, {
              value: Ae
            }),
            group: Vt({}, b, {
              value: pe
            }),
            groupCollapsed: Vt({}, b, {
              value: k
            }),
            groupEnd: Vt({}, b, {
              value: Z
            })
          });
        }
        Nt < 0 && De("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var st = Me.ReactCurrentDispatcher, lt;
    function ct(b, te, me) {
      {
        if (lt === void 0)
          try {
            throw Error();
          } catch (at) {
            var Ce = at.stack.trim().match(/\n( *(at )?)/);
            lt = Ce && Ce[1] || "";
          }
        return `
` + lt + b;
      }
    }
    var vt = !1, Wt;
    {
      var Nn = typeof WeakMap == "function" ? WeakMap : Map;
      Wt = new Nn();
    }
    function Dr(b, te) {
      if (!b || vt)
        return "";
      {
        var me = Wt.get(b);
        if (me !== void 0)
          return me;
      }
      var Ce;
      vt = !0;
      var at = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var tt;
      tt = st.current, st.current = null, Qe();
      try {
        if (te) {
          var yt = function() {
            throw Error();
          };
          if (Object.defineProperty(yt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(yt, []);
            } catch (it) {
              Ce = it;
            }
            Reflect.construct(b, [], yt);
          } else {
            try {
              yt.call();
            } catch (it) {
              Ce = it;
            }
            b.call(yt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (it) {
            Ce = it;
          }
          b();
        }
      } catch (it) {
        if (it && Ce && typeof it.stack == "string") {
          for (var ht = it.stack.split(`
`), bn = Ce.stack.split(`
`), on = ht.length - 1, cn = bn.length - 1; on >= 1 && cn >= 0 && ht[on] !== bn[cn]; )
            cn--;
          for (; on >= 1 && cn >= 0; on--, cn--)
            if (ht[on] !== bn[cn]) {
              if (on !== 1 || cn !== 1)
                do
                  if (on--, cn--, cn < 0 || ht[on] !== bn[cn]) {
                    var or = `
` + ht[on].replace(" at new ", " at ");
                    return b.displayName && or.includes("<anonymous>") && (or = or.replace("<anonymous>", b.displayName)), typeof b == "function" && Wt.set(b, or), or;
                  }
                while (on >= 1 && cn >= 0);
              break;
            }
        }
      } finally {
        vt = !1, st.current = tt, pt(), Error.prepareStackTrace = at;
      }
      var Xa = b ? b.displayName || b.name : "", Za = Xa ? ct(Xa) : "";
      return typeof b == "function" && Wt.set(b, Za), Za;
    }
    function Rn(b, te, me) {
      return Dr(b, !1);
    }
    function ar(b) {
      var te = b.prototype;
      return !!(te && te.isReactComponent);
    }
    function Bn(b, te, me) {
      if (b == null)
        return "";
      if (typeof b == "function")
        return Dr(b, ar(b));
      if (typeof b == "string")
        return ct(b);
      switch (b) {
        case K:
          return ct("Suspense");
        case B:
          return ct("SuspenseList");
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case P:
            return Rn(b.render);
          case F:
            return Bn(b.type, te, me);
          case W: {
            var Ce = b, at = Ce._payload, tt = Ce._init;
            try {
              return Bn(tt(at), te, me);
            } catch {
            }
          }
        }
      return "";
    }
    var Yn = Object.prototype.hasOwnProperty, Gr = {}, pi = Me.ReactDebugCurrentFrame;
    function fa(b) {
      if (b) {
        var te = b._owner, me = Bn(b.type, b._source, te ? te.type : null);
        pi.setExtraStackFrame(me);
      } else
        pi.setExtraStackFrame(null);
    }
    function Xn(b, te, me, Ce, at) {
      {
        var tt = Function.call.bind(Yn);
        for (var yt in b)
          if (tt(b, yt)) {
            var ht = void 0;
            try {
              if (typeof b[yt] != "function") {
                var bn = Error((Ce || "React class") + ": " + me + " type `" + yt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof b[yt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw bn.name = "Invariant Violation", bn;
              }
              ht = b[yt](te, yt, Ce, me, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (on) {
              ht = on;
            }
            ht && !(ht instanceof Error) && (fa(at), De("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ce || "React class", me, yt, typeof ht), fa(null)), ht instanceof Error && !(ht.message in Gr) && (Gr[ht.message] = !0, fa(at), De("Failed %s type: %s", me, ht.message), fa(null));
          }
      }
    }
    var Cn = Array.isArray;
    function $n(b) {
      return Cn(b);
    }
    function Sr(b) {
      {
        var te = typeof Symbol == "function" && Symbol.toStringTag, me = te && b[Symbol.toStringTag] || b.constructor.name || "Object";
        return me;
      }
    }
    function Qa(b) {
      try {
        return Ln(b), !1;
      } catch {
        return !0;
      }
    }
    function Ln(b) {
      return "" + b;
    }
    function _r(b) {
      if (Qa(b))
        return De("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Sr(b)), Ln(b);
    }
    var da = Me.ReactCurrentOwner, qa = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, vi, ce;
    function ze(b) {
      if (Yn.call(b, "ref")) {
        var te = Object.getOwnPropertyDescriptor(b, "ref").get;
        if (te && te.isReactWarning)
          return !1;
      }
      return b.ref !== void 0;
    }
    function ft(b) {
      if (Yn.call(b, "key")) {
        var te = Object.getOwnPropertyDescriptor(b, "key").get;
        if (te && te.isReactWarning)
          return !1;
      }
      return b.key !== void 0;
    }
    function Bt(b, te) {
      typeof b.ref == "string" && da.current;
    }
    function rn(b, te) {
      {
        var me = function() {
          vi || (vi = !0, De("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", te));
        };
        me.isReactWarning = !0, Object.defineProperty(b, "key", {
          get: me,
          configurable: !0
        });
      }
    }
    function hn(b, te) {
      {
        var me = function() {
          ce || (ce = !0, De("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", te));
        };
        me.isReactWarning = !0, Object.defineProperty(b, "ref", {
          get: me,
          configurable: !0
        });
      }
    }
    var sn = function(b, te, me, Ce, at, tt, yt) {
      var ht = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: m,
        // Built-in properties that belong on the element
        type: b,
        key: te,
        ref: me,
        props: yt,
        // Record the component responsible for creating this element.
        _owner: tt
      };
      return ht._store = {}, Object.defineProperty(ht._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ht, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ce
      }), Object.defineProperty(ht, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: at
      }), Object.freeze && (Object.freeze(ht.props), Object.freeze(ht)), ht;
    };
    function Zn(b, te, me, Ce, at) {
      {
        var tt, yt = {}, ht = null, bn = null;
        me !== void 0 && (_r(me), ht = "" + me), ft(te) && (_r(te.key), ht = "" + te.key), ze(te) && (bn = te.ref, Bt(te, at));
        for (tt in te)
          Yn.call(te, tt) && !qa.hasOwnProperty(tt) && (yt[tt] = te[tt]);
        if (b && b.defaultProps) {
          var on = b.defaultProps;
          for (tt in on)
            yt[tt] === void 0 && (yt[tt] = on[tt]);
        }
        if (ht || bn) {
          var cn = typeof b == "function" ? b.displayName || b.name || "Unknown" : b;
          ht && rn(yt, cn), bn && hn(yt, cn);
        }
        return sn(b, ht, bn, at, Ce, da.current, yt);
      }
    }
    var an = Me.ReactCurrentOwner, Qt = Me.ReactDebugCurrentFrame;
    function qt(b) {
      if (b) {
        var te = b._owner, me = Bn(b.type, b._source, te ? te.type : null);
        Qt.setExtraStackFrame(me);
      } else
        Qt.setExtraStackFrame(null);
    }
    var pa;
    pa = !1;
    function Tr(b) {
      return typeof b == "object" && b !== null && b.$$typeof === m;
    }
    function wa() {
      {
        if (an.current) {
          var b = Fe(an.current.type);
          if (b)
            return `

Check the render method of \`` + b + "`.";
        }
        return "";
      }
    }
    function Yi(b) {
      return "";
    }
    var il = {};
    function ol(b) {
      {
        var te = wa();
        if (!te) {
          var me = typeof b == "string" ? b : b.displayName || b.name;
          me && (te = `

Check the top-level render call using <` + me + ">.");
        }
        return te;
      }
    }
    function Eo(b, te) {
      {
        if (!b._store || b._store.validated || b.key != null)
          return;
        b._store.validated = !0;
        var me = ol(te);
        if (il[me])
          return;
        il[me] = !0;
        var Ce = "";
        b && b._owner && b._owner !== an.current && (Ce = " It was passed a child from " + Fe(b._owner.type) + "."), qt(b), De('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', me, Ce), qt(null);
      }
    }
    function So(b, te) {
      {
        if (typeof b != "object")
          return;
        if ($n(b))
          for (var me = 0; me < b.length; me++) {
            var Ce = b[me];
            Tr(Ce) && Eo(Ce, te);
          }
        else if (Tr(b))
          b._store && (b._store.validated = !0);
        else if (b) {
          var at = he(b);
          if (typeof at == "function" && at !== b.entries)
            for (var tt = at.call(b), yt; !(yt = tt.next()).done; )
              Tr(yt.value) && Eo(yt.value, te);
        }
      }
    }
    function ll(b) {
      {
        var te = b.type;
        if (te == null || typeof te == "string")
          return;
        var me;
        if (typeof te == "function")
          me = te.propTypes;
        else if (typeof te == "object" && (te.$$typeof === P || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        te.$$typeof === F))
          me = te.propTypes;
        else
          return;
        if (me) {
          var Ce = Fe(te);
          Xn(me, b.props, "prop", Ce, b);
        } else if (te.PropTypes !== void 0 && !pa) {
          pa = !0;
          var at = Fe(te);
          De("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", at || "Unknown");
        }
        typeof te.getDefaultProps == "function" && !te.getDefaultProps.isReactClassApproved && De("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Or(b) {
      {
        for (var te = Object.keys(b.props), me = 0; me < te.length; me++) {
          var Ce = te[me];
          if (Ce !== "children" && Ce !== "key") {
            qt(b), De("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ce), qt(null);
            break;
          }
        }
        b.ref !== null && (qt(b), De("Invalid attribute `ref` supplied to `React.Fragment`."), qt(null));
      }
    }
    var kr = {};
    function ir(b, te, me, Ce, at, tt) {
      {
        var yt = kt(b);
        if (!yt) {
          var ht = "";
          (b === void 0 || typeof b == "object" && b !== null && Object.keys(b).length === 0) && (ht += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var bn = Yi();
          bn ? ht += bn : ht += wa();
          var on;
          b === null ? on = "null" : $n(b) ? on = "array" : b !== void 0 && b.$$typeof === m ? (on = "<" + (Fe(b.type) || "Unknown") + " />", ht = " Did you accidentally export a JSX literal instead of a component?") : on = typeof b, De("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", on, ht);
        }
        var cn = Zn(b, te, me, at, tt);
        if (cn == null)
          return cn;
        if (yt) {
          var or = te.children;
          if (or !== void 0)
            if (Ce)
              if ($n(or)) {
                for (var Xa = 0; Xa < or.length; Xa++)
                  So(or[Xa], b);
                Object.freeze && Object.freeze(or);
              } else
                De("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              So(or, b);
        }
        if (Yn.call(te, "key")) {
          var Za = Fe(b), it = Object.keys(te).filter(function(ul) {
            return ul !== "key";
          }), ut = it.length > 0 ? "{key: someKey, " + it.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!kr[Za + ut]) {
            var Ja = it.length > 0 ? "{" + it.join(": ..., ") + ": ...}" : "{}";
            De(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ut, Za, Ja, Za), kr[Za + ut] = !0;
          }
        }
        return b === M ? Or(cn) : ll(cn), cn;
      }
    }
    function hi(b, te, me) {
      return ir(b, te, me, !0);
    }
    function Ka(b, te, me) {
      return ir(b, te, me, !1);
    }
    var mi = Ka, yi = hi;
    mv.Fragment = M, mv.jsx = mi, mv.jsxs = yi;
  }()), mv;
}
process.env.NODE_ENV === "production" ? $S.exports = mO() : $S.exports = yO();
var It = $S.exports, GS = { exports: {} }, $a = {}, vy = { exports: {} }, IS = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var IC;
function gO() {
  return IC || (IC = 1, function(T) {
    function m(se, Ae) {
      var pe = se.length;
      se.push(Ae);
      e: for (; 0 < pe; ) {
        var k = pe - 1 >>> 1, Z = se[k];
        if (0 < $(Z, Ae)) se[k] = Ae, se[pe] = Z, pe = k;
        else break e;
      }
    }
    function E(se) {
      return se.length === 0 ? null : se[0];
    }
    function M(se) {
      if (se.length === 0) return null;
      var Ae = se[0], pe = se.pop();
      if (pe !== Ae) {
        se[0] = pe;
        e: for (var k = 0, Z = se.length, Ke = Z >>> 1; k < Ke; ) {
          var Qe = 2 * (k + 1) - 1, pt = se[Qe], st = Qe + 1, lt = se[st];
          if (0 > $(pt, pe)) st < Z && 0 > $(lt, pt) ? (se[k] = lt, se[st] = pe, k = st) : (se[k] = pt, se[Qe] = pe, k = Qe);
          else if (st < Z && 0 > $(lt, pe)) se[k] = lt, se[st] = pe, k = st;
          else break e;
        }
      }
      return Ae;
    }
    function $(se, Ae) {
      var pe = se.sortIndex - Ae.sortIndex;
      return pe !== 0 ? pe : se.id - Ae.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var A = performance;
      T.unstable_now = function() {
        return A.now();
      };
    } else {
      var g = Date, ee = g.now();
      T.unstable_now = function() {
        return g.now() - ee;
      };
    }
    var P = [], K = [], B = 1, F = null, W = 3, N = !1, X = !1, fe = !1, he = typeof setTimeout == "function" ? setTimeout : null, Me = typeof clearTimeout == "function" ? clearTimeout : null, De = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Le(se) {
      for (var Ae = E(K); Ae !== null; ) {
        if (Ae.callback === null) M(K);
        else if (Ae.startTime <= se) M(K), Ae.sortIndex = Ae.expirationTime, m(P, Ae);
        else break;
        Ae = E(K);
      }
    }
    function Ye(se) {
      if (fe = !1, Le(se), !X) if (E(P) !== null) X = !0, At(Oe);
      else {
        var Ae = E(K);
        Ae !== null && Ne(Ye, Ae.startTime - se);
      }
    }
    function Oe(se, Ae) {
      X = !1, fe && (fe = !1, Me(wt), wt = -1), N = !0;
      var pe = W;
      try {
        for (Le(Ae), F = E(P); F !== null && (!(F.expirationTime > Ae) || se && !Mt()); ) {
          var k = F.callback;
          if (typeof k == "function") {
            F.callback = null, W = F.priorityLevel;
            var Z = k(F.expirationTime <= Ae);
            Ae = T.unstable_now(), typeof Z == "function" ? F.callback = Z : F === E(P) && M(P), Le(Ae);
          } else M(P);
          F = E(P);
        }
        if (F !== null) var Ke = !0;
        else {
          var Qe = E(K);
          Qe !== null && Ne(Ye, Qe.startTime - Ae), Ke = !1;
        }
        return Ke;
      } finally {
        F = null, W = pe, N = !1;
      }
    }
    var Je = !1, je = null, wt = -1, xt = 5, kt = -1;
    function Mt() {
      return !(T.unstable_now() - kt < xt);
    }
    function _t() {
      if (je !== null) {
        var se = T.unstable_now();
        kt = se;
        var Ae = !0;
        try {
          Ae = je(!0, se);
        } finally {
          Ae ? Fe() : (Je = !1, je = null);
        }
      } else Je = !1;
    }
    var Fe;
    if (typeof De == "function") Fe = function() {
      De(_t);
    };
    else if (typeof MessageChannel < "u") {
      var Vt = new MessageChannel(), Nt = Vt.port2;
      Vt.port1.onmessage = _t, Fe = function() {
        Nt.postMessage(null);
      };
    } else Fe = function() {
      he(_t, 0);
    };
    function At(se) {
      je = se, Je || (Je = !0, Fe());
    }
    function Ne(se, Ae) {
      wt = he(function() {
        se(T.unstable_now());
      }, Ae);
    }
    T.unstable_IdlePriority = 5, T.unstable_ImmediatePriority = 1, T.unstable_LowPriority = 4, T.unstable_NormalPriority = 3, T.unstable_Profiling = null, T.unstable_UserBlockingPriority = 2, T.unstable_cancelCallback = function(se) {
      se.callback = null;
    }, T.unstable_continueExecution = function() {
      X || N || (X = !0, At(Oe));
    }, T.unstable_forceFrameRate = function(se) {
      0 > se || 125 < se ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : xt = 0 < se ? Math.floor(1e3 / se) : 5;
    }, T.unstable_getCurrentPriorityLevel = function() {
      return W;
    }, T.unstable_getFirstCallbackNode = function() {
      return E(P);
    }, T.unstable_next = function(se) {
      switch (W) {
        case 1:
        case 2:
        case 3:
          var Ae = 3;
          break;
        default:
          Ae = W;
      }
      var pe = W;
      W = Ae;
      try {
        return se();
      } finally {
        W = pe;
      }
    }, T.unstable_pauseExecution = function() {
    }, T.unstable_requestPaint = function() {
    }, T.unstable_runWithPriority = function(se, Ae) {
      switch (se) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          se = 3;
      }
      var pe = W;
      W = se;
      try {
        return Ae();
      } finally {
        W = pe;
      }
    }, T.unstable_scheduleCallback = function(se, Ae, pe) {
      var k = T.unstable_now();
      switch (typeof pe == "object" && pe !== null ? (pe = pe.delay, pe = typeof pe == "number" && 0 < pe ? k + pe : k) : pe = k, se) {
        case 1:
          var Z = -1;
          break;
        case 2:
          Z = 250;
          break;
        case 5:
          Z = 1073741823;
          break;
        case 4:
          Z = 1e4;
          break;
        default:
          Z = 5e3;
      }
      return Z = pe + Z, se = { id: B++, callback: Ae, priorityLevel: se, startTime: pe, expirationTime: Z, sortIndex: -1 }, pe > k ? (se.sortIndex = pe, m(K, se), E(P) === null && se === E(K) && (fe ? (Me(wt), wt = -1) : fe = !0, Ne(Ye, pe - k))) : (se.sortIndex = Z, m(P, se), X || N || (X = !0, At(Oe))), se;
    }, T.unstable_shouldYield = Mt, T.unstable_wrapCallback = function(se) {
      var Ae = W;
      return function() {
        var pe = W;
        W = Ae;
        try {
          return se.apply(this, arguments);
        } finally {
          W = pe;
        }
      };
    };
  }(IS)), IS;
}
var VS = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var VC;
function EO() {
  return VC || (VC = 1, function(T) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var m = !1, E = 5;
      function M(ce, ze) {
        var ft = ce.length;
        ce.push(ze), g(ce, ze, ft);
      }
      function $(ce) {
        return ce.length === 0 ? null : ce[0];
      }
      function A(ce) {
        if (ce.length === 0)
          return null;
        var ze = ce[0], ft = ce.pop();
        return ft !== ze && (ce[0] = ft, ee(ce, ft, 0)), ze;
      }
      function g(ce, ze, ft) {
        for (var Bt = ft; Bt > 0; ) {
          var rn = Bt - 1 >>> 1, hn = ce[rn];
          if (P(hn, ze) > 0)
            ce[rn] = ze, ce[Bt] = hn, Bt = rn;
          else
            return;
        }
      }
      function ee(ce, ze, ft) {
        for (var Bt = ft, rn = ce.length, hn = rn >>> 1; Bt < hn; ) {
          var sn = (Bt + 1) * 2 - 1, Zn = ce[sn], an = sn + 1, Qt = ce[an];
          if (P(Zn, ze) < 0)
            an < rn && P(Qt, Zn) < 0 ? (ce[Bt] = Qt, ce[an] = ze, Bt = an) : (ce[Bt] = Zn, ce[sn] = ze, Bt = sn);
          else if (an < rn && P(Qt, ze) < 0)
            ce[Bt] = Qt, ce[an] = ze, Bt = an;
          else
            return;
        }
      }
      function P(ce, ze) {
        var ft = ce.sortIndex - ze.sortIndex;
        return ft !== 0 ? ft : ce.id - ze.id;
      }
      var K = 1, B = 2, F = 3, W = 4, N = 5;
      function X(ce, ze) {
      }
      var fe = typeof performance == "object" && typeof performance.now == "function";
      if (fe) {
        var he = performance;
        T.unstable_now = function() {
          return he.now();
        };
      } else {
        var Me = Date, De = Me.now();
        T.unstable_now = function() {
          return Me.now() - De;
        };
      }
      var Le = 1073741823, Ye = -1, Oe = 250, Je = 5e3, je = 1e4, wt = Le, xt = [], kt = [], Mt = 1, _t = null, Fe = F, Vt = !1, Nt = !1, At = !1, Ne = typeof setTimeout == "function" ? setTimeout : null, se = typeof clearTimeout == "function" ? clearTimeout : null, Ae = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function pe(ce) {
        for (var ze = $(kt); ze !== null; ) {
          if (ze.callback === null)
            A(kt);
          else if (ze.startTime <= ce)
            A(kt), ze.sortIndex = ze.expirationTime, M(xt, ze);
          else
            return;
          ze = $(kt);
        }
      }
      function k(ce) {
        if (At = !1, pe(ce), !Nt)
          if ($(xt) !== null)
            Nt = !0, Ln(Z);
          else {
            var ze = $(kt);
            ze !== null && _r(k, ze.startTime - ce);
          }
      }
      function Z(ce, ze) {
        Nt = !1, At && (At = !1, da()), Vt = !0;
        var ft = Fe;
        try {
          var Bt;
          if (!m) return Ke(ce, ze);
        } finally {
          _t = null, Fe = ft, Vt = !1;
        }
      }
      function Ke(ce, ze) {
        var ft = ze;
        for (pe(ft), _t = $(xt); _t !== null && !(_t.expirationTime > ft && (!ce || pi())); ) {
          var Bt = _t.callback;
          if (typeof Bt == "function") {
            _t.callback = null, Fe = _t.priorityLevel;
            var rn = _t.expirationTime <= ft, hn = Bt(rn);
            ft = T.unstable_now(), typeof hn == "function" ? _t.callback = hn : _t === $(xt) && A(xt), pe(ft);
          } else
            A(xt);
          _t = $(xt);
        }
        if (_t !== null)
          return !0;
        var sn = $(kt);
        return sn !== null && _r(k, sn.startTime - ft), !1;
      }
      function Qe(ce, ze) {
        switch (ce) {
          case K:
          case B:
          case F:
          case W:
          case N:
            break;
          default:
            ce = F;
        }
        var ft = Fe;
        Fe = ce;
        try {
          return ze();
        } finally {
          Fe = ft;
        }
      }
      function pt(ce) {
        var ze;
        switch (Fe) {
          case K:
          case B:
          case F:
            ze = F;
            break;
          default:
            ze = Fe;
            break;
        }
        var ft = Fe;
        Fe = ze;
        try {
          return ce();
        } finally {
          Fe = ft;
        }
      }
      function st(ce) {
        var ze = Fe;
        return function() {
          var ft = Fe;
          Fe = ze;
          try {
            return ce.apply(this, arguments);
          } finally {
            Fe = ft;
          }
        };
      }
      function lt(ce, ze, ft) {
        var Bt = T.unstable_now(), rn;
        if (typeof ft == "object" && ft !== null) {
          var hn = ft.delay;
          typeof hn == "number" && hn > 0 ? rn = Bt + hn : rn = Bt;
        } else
          rn = Bt;
        var sn;
        switch (ce) {
          case K:
            sn = Ye;
            break;
          case B:
            sn = Oe;
            break;
          case N:
            sn = wt;
            break;
          case W:
            sn = je;
            break;
          case F:
          default:
            sn = Je;
            break;
        }
        var Zn = rn + sn, an = {
          id: Mt++,
          callback: ze,
          priorityLevel: ce,
          startTime: rn,
          expirationTime: Zn,
          sortIndex: -1
        };
        return rn > Bt ? (an.sortIndex = rn, M(kt, an), $(xt) === null && an === $(kt) && (At ? da() : At = !0, _r(k, rn - Bt))) : (an.sortIndex = Zn, M(xt, an), !Nt && !Vt && (Nt = !0, Ln(Z))), an;
      }
      function ct() {
      }
      function vt() {
        !Nt && !Vt && (Nt = !0, Ln(Z));
      }
      function Wt() {
        return $(xt);
      }
      function Nn(ce) {
        ce.callback = null;
      }
      function Dr() {
        return Fe;
      }
      var Rn = !1, ar = null, Bn = -1, Yn = E, Gr = -1;
      function pi() {
        var ce = T.unstable_now() - Gr;
        return !(ce < Yn);
      }
      function fa() {
      }
      function Xn(ce) {
        if (ce < 0 || ce > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        ce > 0 ? Yn = Math.floor(1e3 / ce) : Yn = E;
      }
      var Cn = function() {
        if (ar !== null) {
          var ce = T.unstable_now();
          Gr = ce;
          var ze = !0, ft = !0;
          try {
            ft = ar(ze, ce);
          } finally {
            ft ? $n() : (Rn = !1, ar = null);
          }
        } else
          Rn = !1;
      }, $n;
      if (typeof Ae == "function")
        $n = function() {
          Ae(Cn);
        };
      else if (typeof MessageChannel < "u") {
        var Sr = new MessageChannel(), Qa = Sr.port2;
        Sr.port1.onmessage = Cn, $n = function() {
          Qa.postMessage(null);
        };
      } else
        $n = function() {
          Ne(Cn, 0);
        };
      function Ln(ce) {
        ar = ce, Rn || (Rn = !0, $n());
      }
      function _r(ce, ze) {
        Bn = Ne(function() {
          ce(T.unstable_now());
        }, ze);
      }
      function da() {
        se(Bn), Bn = -1;
      }
      var qa = fa, vi = null;
      T.unstable_IdlePriority = N, T.unstable_ImmediatePriority = K, T.unstable_LowPriority = W, T.unstable_NormalPriority = F, T.unstable_Profiling = vi, T.unstable_UserBlockingPriority = B, T.unstable_cancelCallback = Nn, T.unstable_continueExecution = vt, T.unstable_forceFrameRate = Xn, T.unstable_getCurrentPriorityLevel = Dr, T.unstable_getFirstCallbackNode = Wt, T.unstable_next = pt, T.unstable_pauseExecution = ct, T.unstable_requestPaint = qa, T.unstable_runWithPriority = Qe, T.unstable_scheduleCallback = lt, T.unstable_shouldYield = pi, T.unstable_wrapCallback = st, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(VS)), VS;
}
var BC;
function ob() {
  return BC || (BC = 1, process.env.NODE_ENV === "production" ? vy.exports = gO() : vy.exports = EO()), vy.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var YC;
function SO() {
  if (YC) return $a;
  YC = 1;
  var T = Gt, m = ob();
  function E(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, o = 1; o < arguments.length; o++) r += "&args[]=" + encodeURIComponent(arguments[o]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var M = /* @__PURE__ */ new Set(), $ = {};
  function A(n, r) {
    g(n, r), g(n + "Capture", r);
  }
  function g(n, r) {
    for ($[n] = r, n = 0; n < r.length; n++) M.add(r[n]);
  }
  var ee = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), P = Object.prototype.hasOwnProperty, K = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, B = {}, F = {};
  function W(n) {
    return P.call(F, n) ? !0 : P.call(B, n) ? !1 : K.test(n) ? F[n] = !0 : (B[n] = !0, !1);
  }
  function N(n, r, o, u) {
    if (o !== null && o.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return u ? !1 : o !== null ? !o.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function X(n, r, o, u) {
    if (r === null || typeof r > "u" || N(n, r, o, u)) return !0;
    if (u) return !1;
    if (o !== null) switch (o.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function fe(n, r, o, u, c, d, y) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = u, this.attributeNamespace = c, this.mustUseProperty = o, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = y;
  }
  var he = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    he[n] = new fe(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    he[r] = new fe(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    he[n] = new fe(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    he[n] = new fe(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    he[n] = new fe(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    he[n] = new fe(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    he[n] = new fe(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    he[n] = new fe(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    he[n] = new fe(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var Me = /[\-:]([a-z])/g;
  function De(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      Me,
      De
    );
    he[r] = new fe(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(Me, De);
    he[r] = new fe(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(Me, De);
    he[r] = new fe(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    he[n] = new fe(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), he.xlinkHref = new fe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    he[n] = new fe(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Le(n, r, o, u) {
    var c = he.hasOwnProperty(r) ? he[r] : null;
    (c !== null ? c.type !== 0 : u || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (X(r, o, c, u) && (o = null), u || c === null ? W(r) && (o === null ? n.removeAttribute(r) : n.setAttribute(r, "" + o)) : c.mustUseProperty ? n[c.propertyName] = o === null ? c.type === 3 ? !1 : "" : o : (r = c.attributeName, u = c.attributeNamespace, o === null ? n.removeAttribute(r) : (c = c.type, o = c === 3 || c === 4 && o === !0 ? "" : "" + o, u ? n.setAttributeNS(u, r, o) : n.setAttribute(r, o))));
  }
  var Ye = T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Oe = Symbol.for("react.element"), Je = Symbol.for("react.portal"), je = Symbol.for("react.fragment"), wt = Symbol.for("react.strict_mode"), xt = Symbol.for("react.profiler"), kt = Symbol.for("react.provider"), Mt = Symbol.for("react.context"), _t = Symbol.for("react.forward_ref"), Fe = Symbol.for("react.suspense"), Vt = Symbol.for("react.suspense_list"), Nt = Symbol.for("react.memo"), At = Symbol.for("react.lazy"), Ne = Symbol.for("react.offscreen"), se = Symbol.iterator;
  function Ae(n) {
    return n === null || typeof n != "object" ? null : (n = se && n[se] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var pe = Object.assign, k;
  function Z(n) {
    if (k === void 0) try {
      throw Error();
    } catch (o) {
      var r = o.stack.trim().match(/\n( *(at )?)/);
      k = r && r[1] || "";
    }
    return `
` + k + n;
  }
  var Ke = !1;
  function Qe(n, r) {
    if (!n || Ke) return "";
    Ke = !0;
    var o = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (V) {
          var u = V;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (V) {
          u = V;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (V) {
          u = V;
        }
        n();
      }
    } catch (V) {
      if (V && u && typeof V.stack == "string") {
        for (var c = V.stack.split(`
`), d = u.stack.split(`
`), y = c.length - 1, R = d.length - 1; 1 <= y && 0 <= R && c[y] !== d[R]; ) R--;
        for (; 1 <= y && 0 <= R; y--, R--) if (c[y] !== d[R]) {
          if (y !== 1 || R !== 1)
            do
              if (y--, R--, 0 > R || c[y] !== d[R]) {
                var w = `
` + c[y].replace(" at new ", " at ");
                return n.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", n.displayName)), w;
              }
            while (1 <= y && 0 <= R);
          break;
        }
      }
    } finally {
      Ke = !1, Error.prepareStackTrace = o;
    }
    return (n = n ? n.displayName || n.name : "") ? Z(n) : "";
  }
  function pt(n) {
    switch (n.tag) {
      case 5:
        return Z(n.type);
      case 16:
        return Z("Lazy");
      case 13:
        return Z("Suspense");
      case 19:
        return Z("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Qe(n.type, !1), n;
      case 11:
        return n = Qe(n.type.render, !1), n;
      case 1:
        return n = Qe(n.type, !0), n;
      default:
        return "";
    }
  }
  function st(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case je:
        return "Fragment";
      case Je:
        return "Portal";
      case xt:
        return "Profiler";
      case wt:
        return "StrictMode";
      case Fe:
        return "Suspense";
      case Vt:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case Mt:
        return (n.displayName || "Context") + ".Consumer";
      case kt:
        return (n._context.displayName || "Context") + ".Provider";
      case _t:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case Nt:
        return r = n.displayName || null, r !== null ? r : st(n.type) || "Memo";
      case At:
        r = n._payload, n = n._init;
        try {
          return st(n(r));
        } catch {
        }
    }
    return null;
  }
  function lt(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return st(r);
      case 8:
        return r === wt ? "StrictMode" : "Mode";
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
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function ct(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function vt(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Wt(n) {
    var r = vt(n) ? "checked" : "value", o = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), u = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
      var c = o.get, d = o.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(y) {
        u = "" + y, d.call(this, y);
      } }), Object.defineProperty(n, r, { enumerable: o.enumerable }), { getValue: function() {
        return u;
      }, setValue: function(y) {
        u = "" + y;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Nn(n) {
    n._valueTracker || (n._valueTracker = Wt(n));
  }
  function Dr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var o = r.getValue(), u = "";
    return n && (u = vt(n) ? n.checked ? "true" : "false" : n.value), n = u, n !== o ? (r.setValue(n), !0) : !1;
  }
  function Rn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function ar(n, r) {
    var o = r.checked;
    return pe({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: o ?? n._wrapperState.initialChecked });
  }
  function Bn(n, r) {
    var o = r.defaultValue == null ? "" : r.defaultValue, u = r.checked != null ? r.checked : r.defaultChecked;
    o = ct(r.value != null ? r.value : o), n._wrapperState = { initialChecked: u, initialValue: o, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Yn(n, r) {
    r = r.checked, r != null && Le(n, "checked", r, !1);
  }
  function Gr(n, r) {
    Yn(n, r);
    var o = ct(r.value), u = r.type;
    if (o != null) u === "number" ? (o === 0 && n.value === "" || n.value != o) && (n.value = "" + o) : n.value !== "" + o && (n.value = "" + o);
    else if (u === "submit" || u === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? fa(n, r.type, o) : r.hasOwnProperty("defaultValue") && fa(n, r.type, ct(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function pi(n, r, o) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var u = r.type;
      if (!(u !== "submit" && u !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, o || r === n.value || (n.value = r), n.defaultValue = r;
    }
    o = n.name, o !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, o !== "" && (n.name = o);
  }
  function fa(n, r, o) {
    (r !== "number" || Rn(n.ownerDocument) !== n) && (o == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + o && (n.defaultValue = "" + o));
  }
  var Xn = Array.isArray;
  function Cn(n, r, o, u) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < o.length; c++) r["$" + o[c]] = !0;
      for (o = 0; o < n.length; o++) c = r.hasOwnProperty("$" + n[o].value), n[o].selected !== c && (n[o].selected = c), c && u && (n[o].defaultSelected = !0);
    } else {
      for (o = "" + ct(o), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === o) {
          n[c].selected = !0, u && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function $n(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(E(91));
    return pe({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function Sr(n, r) {
    var o = r.value;
    if (o == null) {
      if (o = r.children, r = r.defaultValue, o != null) {
        if (r != null) throw Error(E(92));
        if (Xn(o)) {
          if (1 < o.length) throw Error(E(93));
          o = o[0];
        }
        r = o;
      }
      r == null && (r = ""), o = r;
    }
    n._wrapperState = { initialValue: ct(o) };
  }
  function Qa(n, r) {
    var o = ct(r.value), u = ct(r.defaultValue);
    o != null && (o = "" + o, o !== n.value && (n.value = o), r.defaultValue == null && n.defaultValue !== o && (n.defaultValue = o)), u != null && (n.defaultValue = "" + u);
  }
  function Ln(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function _r(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function da(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? _r(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var qa, vi = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, o, u, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, o, u, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (qa = qa || document.createElement("div"), qa.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = qa.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function ce(n, r) {
    if (r) {
      var o = n.firstChild;
      if (o && o === n.lastChild && o.nodeType === 3) {
        o.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var ze = {
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
    strokeWidth: !0
  }, ft = ["Webkit", "ms", "Moz", "O"];
  Object.keys(ze).forEach(function(n) {
    ft.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), ze[r] = ze[n];
    });
  });
  function Bt(n, r, o) {
    return r == null || typeof r == "boolean" || r === "" ? "" : o || typeof r != "number" || r === 0 || ze.hasOwnProperty(n) && ze[n] ? ("" + r).trim() : r + "px";
  }
  function rn(n, r) {
    n = n.style;
    for (var o in r) if (r.hasOwnProperty(o)) {
      var u = o.indexOf("--") === 0, c = Bt(o, r[o], u);
      o === "float" && (o = "cssFloat"), u ? n.setProperty(o, c) : n[o] = c;
    }
  }
  var hn = pe({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function sn(n, r) {
    if (r) {
      if (hn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(E(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(E(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(E(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(E(62));
    }
  }
  function Zn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
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
  var an = null;
  function Qt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var qt = null, pa = null, Tr = null;
  function wa(n) {
    if (n = He(n)) {
      if (typeof qt != "function") throw Error(E(280));
      var r = n.stateNode;
      r && (r = yn(r), qt(n.stateNode, n.type, r));
    }
  }
  function Yi(n) {
    pa ? Tr ? Tr.push(n) : Tr = [n] : pa = n;
  }
  function il() {
    if (pa) {
      var n = pa, r = Tr;
      if (Tr = pa = null, wa(n), r) for (n = 0; n < r.length; n++) wa(r[n]);
    }
  }
  function ol(n, r) {
    return n(r);
  }
  function Eo() {
  }
  var So = !1;
  function ll(n, r, o) {
    if (So) return n(r, o);
    So = !0;
    try {
      return ol(n, r, o);
    } finally {
      So = !1, (pa !== null || Tr !== null) && (Eo(), il());
    }
  }
  function Or(n, r) {
    var o = n.stateNode;
    if (o === null) return null;
    var u = yn(o);
    if (u === null) return null;
    o = u[r];
    e: switch (r) {
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
        (u = !u.disabled) || (n = n.type, u = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !u;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (o && typeof o != "function") throw Error(E(231, r, typeof o));
    return o;
  }
  var kr = !1;
  if (ee) try {
    var ir = {};
    Object.defineProperty(ir, "passive", { get: function() {
      kr = !0;
    } }), window.addEventListener("test", ir, ir), window.removeEventListener("test", ir, ir);
  } catch {
    kr = !1;
  }
  function hi(n, r, o, u, c, d, y, R, w) {
    var V = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(o, V);
    } catch (ae) {
      this.onError(ae);
    }
  }
  var Ka = !1, mi = null, yi = !1, b = null, te = { onError: function(n) {
    Ka = !0, mi = n;
  } };
  function me(n, r, o, u, c, d, y, R, w) {
    Ka = !1, mi = null, hi.apply(te, arguments);
  }
  function Ce(n, r, o, u, c, d, y, R, w) {
    if (me.apply(this, arguments), Ka) {
      if (Ka) {
        var V = mi;
        Ka = !1, mi = null;
      } else throw Error(E(198));
      yi || (yi = !0, b = V);
    }
  }
  function at(n) {
    var r = n, o = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (o = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? o : null;
  }
  function tt(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function yt(n) {
    if (at(n) !== n) throw Error(E(188));
  }
  function ht(n) {
    var r = n.alternate;
    if (!r) {
      if (r = at(n), r === null) throw Error(E(188));
      return r !== n ? null : n;
    }
    for (var o = n, u = r; ; ) {
      var c = o.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (u = c.return, u !== null) {
          o = u;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === o) return yt(c), n;
          if (d === u) return yt(c), r;
          d = d.sibling;
        }
        throw Error(E(188));
      }
      if (o.return !== u.return) o = c, u = d;
      else {
        for (var y = !1, R = c.child; R; ) {
          if (R === o) {
            y = !0, o = c, u = d;
            break;
          }
          if (R === u) {
            y = !0, u = c, o = d;
            break;
          }
          R = R.sibling;
        }
        if (!y) {
          for (R = d.child; R; ) {
            if (R === o) {
              y = !0, o = d, u = c;
              break;
            }
            if (R === u) {
              y = !0, u = d, o = c;
              break;
            }
            R = R.sibling;
          }
          if (!y) throw Error(E(189));
        }
      }
      if (o.alternate !== u) throw Error(E(190));
    }
    if (o.tag !== 3) throw Error(E(188));
    return o.stateNode.current === o ? n : r;
  }
  function bn(n) {
    return n = ht(n), n !== null ? on(n) : null;
  }
  function on(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = on(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var cn = m.unstable_scheduleCallback, or = m.unstable_cancelCallback, Xa = m.unstable_shouldYield, Za = m.unstable_requestPaint, it = m.unstable_now, ut = m.unstable_getCurrentPriorityLevel, Ja = m.unstable_ImmediatePriority, ul = m.unstable_UserBlockingPriority, sl = m.unstable_NormalPriority, _o = m.unstable_LowPriority, eu = m.unstable_IdlePriority, To = null, Qr = null;
  function Ju(n) {
    if (Qr && typeof Qr.onCommitFiberRoot == "function") try {
      Qr.onCommitFiberRoot(To, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Mr = Math.clz32 ? Math.clz32 : tu, Ec = Math.log, Sc = Math.LN2;
  function tu(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Ec(n) / Sc | 0) | 0;
  }
  var Ro = 64, va = 4194304;
  function ei(n) {
    switch (n & -n) {
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
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function ti(n, r) {
    var o = n.pendingLanes;
    if (o === 0) return 0;
    var u = 0, c = n.suspendedLanes, d = n.pingedLanes, y = o & 268435455;
    if (y !== 0) {
      var R = y & ~c;
      R !== 0 ? u = ei(R) : (d &= y, d !== 0 && (u = ei(d)));
    } else y = o & ~c, y !== 0 ? u = ei(y) : d !== 0 && (u = ei(d));
    if (u === 0) return 0;
    if (r !== 0 && r !== u && !(r & c) && (c = u & -u, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (u & 4 && (u |= o & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= u; 0 < r; ) o = 31 - Mr(r), c = 1 << o, u |= n[o], r &= ~c;
    return u;
  }
  function nu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
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
        return r + 5e3;
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
  function cl(n, r) {
    for (var o = n.suspendedLanes, u = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var y = 31 - Mr(d), R = 1 << y, w = c[y];
      w === -1 ? (!(R & o) || R & u) && (c[y] = nu(R, r)) : w <= r && (n.expiredLanes |= R), d &= ~R;
    }
  }
  function Co(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function ru() {
    var n = Ro;
    return Ro <<= 1, !(Ro & 4194240) && (Ro = 64), n;
  }
  function au(n) {
    for (var r = [], o = 0; 31 > o; o++) r.push(n);
    return r;
  }
  function $i(n, r, o) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Mr(r), n[r] = o;
  }
  function cd(n, r) {
    var o = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var u = n.eventTimes;
    for (n = n.expirationTimes; 0 < o; ) {
      var c = 31 - Mr(o), d = 1 << c;
      r[c] = 0, u[c] = -1, n[c] = -1, o &= ~d;
    }
  }
  function Wi(n, r) {
    var o = n.entangledLanes |= r;
    for (n = n.entanglements; o; ) {
      var u = 31 - Mr(o), c = 1 << u;
      c & r | n[u] & r && (n[u] |= r), o &= ~c;
    }
  }
  var zt = 0;
  function iu(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Dt, es, gi, et, ou, lr = !1, Ei = [], Nr = null, Si = null, fn = null, Kt = /* @__PURE__ */ new Map(), bo = /* @__PURE__ */ new Map(), Wn = [], Lr = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function xa(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Nr = null;
        break;
      case "dragenter":
      case "dragleave":
        Si = null;
        break;
      case "mouseover":
      case "mouseout":
        fn = null;
        break;
      case "pointerover":
      case "pointerout":
        Kt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        bo.delete(r.pointerId);
    }
  }
  function fl(n, r, o, u, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: o, eventSystemFlags: u, nativeEvent: d, targetContainers: [c] }, r !== null && (r = He(r), r !== null && es(r)), n) : (n.eventSystemFlags |= u, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function ts(n, r, o, u, c) {
    switch (r) {
      case "focusin":
        return Nr = fl(Nr, n, r, o, u, c), !0;
      case "dragenter":
        return Si = fl(Si, n, r, o, u, c), !0;
      case "mouseover":
        return fn = fl(fn, n, r, o, u, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return Kt.set(d, fl(Kt.get(d) || null, n, r, o, u, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, bo.set(d, fl(bo.get(d) || null, n, r, o, u, c)), !0;
    }
    return !1;
  }
  function ns(n) {
    var r = Sl(n.target);
    if (r !== null) {
      var o = at(r);
      if (o !== null) {
        if (r = o.tag, r === 13) {
          if (r = tt(o), r !== null) {
            n.blockedOn = r, ou(n.priority, function() {
              gi(o);
            });
            return;
          }
        } else if (r === 3 && o.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function wo(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var o = su(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (o === null) {
        o = n.nativeEvent;
        var u = new o.constructor(o.type, o);
        an = u, o.target.dispatchEvent(u), an = null;
      } else return r = He(o), r !== null && es(r), n.blockedOn = o, !1;
      r.shift();
    }
    return !0;
  }
  function dl(n, r, o) {
    wo(n) && o.delete(r);
  }
  function fd() {
    lr = !1, Nr !== null && wo(Nr) && (Nr = null), Si !== null && wo(Si) && (Si = null), fn !== null && wo(fn) && (fn = null), Kt.forEach(dl), bo.forEach(dl);
  }
  function Da(n, r) {
    n.blockedOn === r && (n.blockedOn = null, lr || (lr = !0, m.unstable_scheduleCallback(m.unstable_NormalPriority, fd)));
  }
  function ni(n) {
    function r(c) {
      return Da(c, n);
    }
    if (0 < Ei.length) {
      Da(Ei[0], n);
      for (var o = 1; o < Ei.length; o++) {
        var u = Ei[o];
        u.blockedOn === n && (u.blockedOn = null);
      }
    }
    for (Nr !== null && Da(Nr, n), Si !== null && Da(Si, n), fn !== null && Da(fn, n), Kt.forEach(r), bo.forEach(r), o = 0; o < Wn.length; o++) u = Wn[o], u.blockedOn === n && (u.blockedOn = null);
    for (; 0 < Wn.length && (o = Wn[0], o.blockedOn === null); ) ns(o), o.blockedOn === null && Wn.shift();
  }
  var _i = Ye.ReactCurrentBatchConfig, Oa = !0;
  function lu(n, r, o, u) {
    var c = zt, d = _i.transition;
    _i.transition = null;
    try {
      zt = 1, xo(n, r, o, u);
    } finally {
      zt = c, _i.transition = d;
    }
  }
  function uu(n, r, o, u) {
    var c = zt, d = _i.transition;
    _i.transition = null;
    try {
      zt = 4, xo(n, r, o, u);
    } finally {
      zt = c, _i.transition = d;
    }
  }
  function xo(n, r, o, u) {
    if (Oa) {
      var c = su(n, r, o, u);
      if (c === null) Nc(n, r, u, pl, o), xa(n, u);
      else if (ts(c, n, r, o, u)) u.stopPropagation();
      else if (xa(n, u), r & 4 && -1 < Lr.indexOf(n)) {
        for (; c !== null; ) {
          var d = He(c);
          if (d !== null && Dt(d), d = su(n, r, o, u), d === null && Nc(n, r, u, pl, o), d === c) break;
          c = d;
        }
        c !== null && u.stopPropagation();
      } else Nc(n, r, u, null, o);
    }
  }
  var pl = null;
  function su(n, r, o, u) {
    if (pl = null, n = Qt(u), n = Sl(n), n !== null) if (r = at(n), r === null) n = null;
    else if (o = r.tag, o === 13) {
      if (n = tt(r), n !== null) return n;
      n = null;
    } else if (o === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return pl = n, null;
  }
  function cu(n) {
    switch (n) {
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
        switch (ut()) {
          case Ja:
            return 1;
          case ul:
            return 4;
          case sl:
          case _o:
            return 16;
          case eu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ri = null, h = null, C = null;
  function I() {
    if (C) return C;
    var n, r = h, o = r.length, u, c = "value" in ri ? ri.value : ri.textContent, d = c.length;
    for (n = 0; n < o && r[n] === c[n]; n++) ;
    var y = o - n;
    for (u = 1; u <= y && r[o - u] === c[d - u]; u++) ;
    return C = c.slice(n, 1 < u ? 1 - u : void 0);
  }
  function G(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function ue() {
    return !0;
  }
  function Ve() {
    return !1;
  }
  function ve(n) {
    function r(o, u, c, d, y) {
      this._reactName = o, this._targetInst = c, this.type = u, this.nativeEvent = d, this.target = y, this.currentTarget = null;
      for (var R in n) n.hasOwnProperty(R) && (o = n[R], this[R] = o ? o(d) : d[R]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? ue : Ve, this.isPropagationStopped = Ve, this;
    }
    return pe(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var o = this.nativeEvent;
      o && (o.preventDefault ? o.preventDefault() : typeof o.returnValue != "unknown" && (o.returnValue = !1), this.isDefaultPrevented = ue);
    }, stopPropagation: function() {
      var o = this.nativeEvent;
      o && (o.stopPropagation ? o.stopPropagation() : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0), this.isPropagationStopped = ue);
    }, persist: function() {
    }, isPersistent: ue }), r;
  }
  var We = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, gt = ve(We), Ot = pe({}, We, { view: 0, detail: 0 }), ln = ve(Ot), Xt, dt, Zt, mn = pe({}, Ot, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: md, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Zt && (Zt && n.type === "mousemove" ? (Xt = n.screenX - Zt.screenX, dt = n.screenY - Zt.screenY) : dt = Xt = 0, Zt = n), Xt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : dt;
  } }), Do = ve(mn), rs = pe({}, mn, { dataTransfer: 0 }), Gi = ve(rs), as = pe({}, Ot, { relatedTarget: 0 }), vl = ve(as), dd = pe({}, We, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), _c = ve(dd), pd = pe({}, We, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Tv = ve(pd), vd = pe({}, We, { data: 0 }), hd = ve(vd), Rv = {
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
    MozPrintableKey: "Unidentified"
  }, Cv = {
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
    224: "Meta"
  }, Cy = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Qi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Cy[n]) ? !!r[n] : !1;
  }
  function md() {
    return Qi;
  }
  var yd = pe({}, Ot, { key: function(n) {
    if (n.key) {
      var r = Rv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = G(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Cv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: md, charCode: function(n) {
    return n.type === "keypress" ? G(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? G(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), gd = ve(yd), Ed = pe({}, mn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), bv = ve(Ed), Tc = pe({}, Ot, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: md }), wv = ve(Tc), qr = pe({}, We, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), qi = ve(qr), An = pe({}, mn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ki = ve(An), Sd = [9, 13, 27, 32], fu = ee && "CompositionEvent" in window, is = null;
  ee && "documentMode" in document && (is = document.documentMode);
  var os = ee && "TextEvent" in window && !is, xv = ee && (!fu || is && 8 < is && 11 >= is), Dv = " ", Rc = !1;
  function Ov(n, r) {
    switch (n) {
      case "keyup":
        return Sd.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function kv(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var du = !1;
  function Mv(n, r) {
    switch (n) {
      case "compositionend":
        return kv(r);
      case "keypress":
        return r.which !== 32 ? null : (Rc = !0, Dv);
      case "textInput":
        return n = r.data, n === Dv && Rc ? null : n;
      default:
        return null;
    }
  }
  function by(n, r) {
    if (du) return n === "compositionend" || !fu && Ov(n, r) ? (n = I(), C = h = ri = null, du = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return xv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var wy = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Nv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!wy[n.type] : r === "textarea";
  }
  function _d(n, r, o, u) {
    Yi(u), r = ds(r, "onChange"), 0 < r.length && (o = new gt("onChange", "change", null, o, u), n.push({ event: o, listeners: r }));
  }
  var Ti = null, hl = null;
  function Lv(n) {
    gl(n, 0);
  }
  function ls(n) {
    var r = ii(n);
    if (Dr(r)) return n;
  }
  function xy(n, r) {
    if (n === "change") return r;
  }
  var Av = !1;
  if (ee) {
    var Td;
    if (ee) {
      var Rd = "oninput" in document;
      if (!Rd) {
        var zv = document.createElement("div");
        zv.setAttribute("oninput", "return;"), Rd = typeof zv.oninput == "function";
      }
      Td = Rd;
    } else Td = !1;
    Av = Td && (!document.documentMode || 9 < document.documentMode);
  }
  function Uv() {
    Ti && (Ti.detachEvent("onpropertychange", Pv), hl = Ti = null);
  }
  function Pv(n) {
    if (n.propertyName === "value" && ls(hl)) {
      var r = [];
      _d(r, hl, n, Qt(n)), ll(Lv, r);
    }
  }
  function Dy(n, r, o) {
    n === "focusin" ? (Uv(), Ti = r, hl = o, Ti.attachEvent("onpropertychange", Pv)) : n === "focusout" && Uv();
  }
  function jv(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return ls(hl);
  }
  function Oy(n, r) {
    if (n === "click") return ls(r);
  }
  function Fv(n, r) {
    if (n === "input" || n === "change") return ls(r);
  }
  function ky(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var ai = typeof Object.is == "function" ? Object.is : ky;
  function us(n, r) {
    if (ai(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var o = Object.keys(n), u = Object.keys(r);
    if (o.length !== u.length) return !1;
    for (u = 0; u < o.length; u++) {
      var c = o[u];
      if (!P.call(r, c) || !ai(n[c], r[c])) return !1;
    }
    return !0;
  }
  function Hv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function Cc(n, r) {
    var o = Hv(n);
    n = 0;
    for (var u; o; ) {
      if (o.nodeType === 3) {
        if (u = n + o.textContent.length, n <= r && u >= r) return { node: o, offset: r - n };
        n = u;
      }
      e: {
        for (; o; ) {
          if (o.nextSibling) {
            o = o.nextSibling;
            break e;
          }
          o = o.parentNode;
        }
        o = void 0;
      }
      o = Hv(o);
    }
  }
  function Oo(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Oo(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function ss() {
    for (var n = window, r = Rn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var o = typeof r.contentWindow.location.href == "string";
      } catch {
        o = !1;
      }
      if (o) n = r.contentWindow;
      else break;
      r = Rn(n.document);
    }
    return r;
  }
  function bc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function pu(n) {
    var r = ss(), o = n.focusedElem, u = n.selectionRange;
    if (r !== o && o && o.ownerDocument && Oo(o.ownerDocument.documentElement, o)) {
      if (u !== null && bc(o)) {
        if (r = u.start, n = u.end, n === void 0 && (n = r), "selectionStart" in o) o.selectionStart = r, o.selectionEnd = Math.min(n, o.value.length);
        else if (n = (r = o.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = o.textContent.length, d = Math.min(u.start, c);
          u = u.end === void 0 ? d : Math.min(u.end, c), !n.extend && d > u && (c = u, u = d, d = c), c = Cc(o, d);
          var y = Cc(
            o,
            u
          );
          c && y && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== y.node || n.focusOffset !== y.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > u ? (n.addRange(r), n.extend(y.node, y.offset)) : (r.setEnd(y.node, y.offset), n.addRange(r)));
        }
      }
      for (r = [], n = o; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof o.focus == "function" && o.focus(), o = 0; o < r.length; o++) n = r[o], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var My = ee && "documentMode" in document && 11 >= document.documentMode, vu = null, Cd = null, cs = null, bd = !1;
  function wd(n, r, o) {
    var u = o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
    bd || vu == null || vu !== Rn(u) || (u = vu, "selectionStart" in u && bc(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = { anchorNode: u.anchorNode, anchorOffset: u.anchorOffset, focusNode: u.focusNode, focusOffset: u.focusOffset }), cs && us(cs, u) || (cs = u, u = ds(Cd, "onSelect"), 0 < u.length && (r = new gt("onSelect", "select", null, r, o), n.push({ event: r, listeners: u }), r.target = vu)));
  }
  function wc(n, r) {
    var o = {};
    return o[n.toLowerCase()] = r.toLowerCase(), o["Webkit" + n] = "webkit" + r, o["Moz" + n] = "moz" + r, o;
  }
  var ml = { animationend: wc("Animation", "AnimationEnd"), animationiteration: wc("Animation", "AnimationIteration"), animationstart: wc("Animation", "AnimationStart"), transitionend: wc("Transition", "TransitionEnd") }, ur = {}, xd = {};
  ee && (xd = document.createElement("div").style, "AnimationEvent" in window || (delete ml.animationend.animation, delete ml.animationiteration.animation, delete ml.animationstart.animation), "TransitionEvent" in window || delete ml.transitionend.transition);
  function xc(n) {
    if (ur[n]) return ur[n];
    if (!ml[n]) return n;
    var r = ml[n], o;
    for (o in r) if (r.hasOwnProperty(o) && o in xd) return ur[n] = r[o];
    return n;
  }
  var Iv = xc("animationend"), Vv = xc("animationiteration"), Bv = xc("animationstart"), Yv = xc("transitionend"), Dd = /* @__PURE__ */ new Map(), Dc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function ka(n, r) {
    Dd.set(n, r), A(r, [n]);
  }
  for (var Od = 0; Od < Dc.length; Od++) {
    var yl = Dc[Od], Ny = yl.toLowerCase(), Ly = yl[0].toUpperCase() + yl.slice(1);
    ka(Ny, "on" + Ly);
  }
  ka(Iv, "onAnimationEnd"), ka(Vv, "onAnimationIteration"), ka(Bv, "onAnimationStart"), ka("dblclick", "onDoubleClick"), ka("focusin", "onFocus"), ka("focusout", "onBlur"), ka(Yv, "onTransitionEnd"), g("onMouseEnter", ["mouseout", "mouseover"]), g("onMouseLeave", ["mouseout", "mouseover"]), g("onPointerEnter", ["pointerout", "pointerover"]), g("onPointerLeave", ["pointerout", "pointerover"]), A("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), A("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), A("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), A("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), A("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), A("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var fs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), kd = new Set("cancel close invalid load scroll toggle".split(" ").concat(fs));
  function Oc(n, r, o) {
    var u = n.type || "unknown-event";
    n.currentTarget = o, Ce(u, r, void 0, n), n.currentTarget = null;
  }
  function gl(n, r) {
    r = (r & 4) !== 0;
    for (var o = 0; o < n.length; o++) {
      var u = n[o], c = u.event;
      u = u.listeners;
      e: {
        var d = void 0;
        if (r) for (var y = u.length - 1; 0 <= y; y--) {
          var R = u[y], w = R.instance, V = R.currentTarget;
          if (R = R.listener, w !== d && c.isPropagationStopped()) break e;
          Oc(c, R, V), d = w;
        }
        else for (y = 0; y < u.length; y++) {
          if (R = u[y], w = R.instance, V = R.currentTarget, R = R.listener, w !== d && c.isPropagationStopped()) break e;
          Oc(c, R, V), d = w;
        }
      }
    }
    if (yi) throw n = b, yi = !1, b = null, n;
  }
  function Yt(n, r) {
    var o = r[hs];
    o === void 0 && (o = r[hs] = /* @__PURE__ */ new Set());
    var u = n + "__bubble";
    o.has(u) || ($v(r, n, 2, !1), o.add(u));
  }
  function kc(n, r, o) {
    var u = 0;
    r && (u |= 4), $v(o, n, u, r);
  }
  var Mc = "_reactListening" + Math.random().toString(36).slice(2);
  function hu(n) {
    if (!n[Mc]) {
      n[Mc] = !0, M.forEach(function(o) {
        o !== "selectionchange" && (kd.has(o) || kc(o, !1, n), kc(o, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[Mc] || (r[Mc] = !0, kc("selectionchange", !1, r));
    }
  }
  function $v(n, r, o, u) {
    switch (cu(r)) {
      case 1:
        var c = lu;
        break;
      case 4:
        c = uu;
        break;
      default:
        c = xo;
    }
    o = c.bind(null, r, o, n), c = void 0, !kr || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), u ? c !== void 0 ? n.addEventListener(r, o, { capture: !0, passive: c }) : n.addEventListener(r, o, !0) : c !== void 0 ? n.addEventListener(r, o, { passive: c }) : n.addEventListener(r, o, !1);
  }
  function Nc(n, r, o, u, c) {
    var d = u;
    if (!(r & 1) && !(r & 2) && u !== null) e: for (; ; ) {
      if (u === null) return;
      var y = u.tag;
      if (y === 3 || y === 4) {
        var R = u.stateNode.containerInfo;
        if (R === c || R.nodeType === 8 && R.parentNode === c) break;
        if (y === 4) for (y = u.return; y !== null; ) {
          var w = y.tag;
          if ((w === 3 || w === 4) && (w = y.stateNode.containerInfo, w === c || w.nodeType === 8 && w.parentNode === c)) return;
          y = y.return;
        }
        for (; R !== null; ) {
          if (y = Sl(R), y === null) return;
          if (w = y.tag, w === 5 || w === 6) {
            u = d = y;
            continue e;
          }
          R = R.parentNode;
        }
      }
      u = u.return;
    }
    ll(function() {
      var V = d, ae = Qt(o), oe = [];
      e: {
        var re = Dd.get(n);
        if (re !== void 0) {
          var Se = gt, be = n;
          switch (n) {
            case "keypress":
              if (G(o) === 0) break e;
            case "keydown":
            case "keyup":
              Se = gd;
              break;
            case "focusin":
              be = "focus", Se = vl;
              break;
            case "focusout":
              be = "blur", Se = vl;
              break;
            case "beforeblur":
            case "afterblur":
              Se = vl;
              break;
            case "click":
              if (o.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              Se = Do;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Se = Gi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Se = wv;
              break;
            case Iv:
            case Vv:
            case Bv:
              Se = _c;
              break;
            case Yv:
              Se = qi;
              break;
            case "scroll":
              Se = ln;
              break;
            case "wheel":
              Se = Ki;
              break;
            case "copy":
            case "cut":
            case "paste":
              Se = Tv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Se = bv;
          }
          var ke = (r & 4) !== 0, kn = !ke && n === "scroll", L = ke ? re !== null ? re + "Capture" : null : re;
          ke = [];
          for (var D = V, j; D !== null; ) {
            j = D;
            var ie = j.stateNode;
            if (j.tag === 5 && ie !== null && (j = ie, L !== null && (ie = Or(D, L), ie != null && ke.push(mu(D, ie, j)))), kn) break;
            D = D.return;
          }
          0 < ke.length && (re = new Se(re, be, null, o, ae), oe.push({ event: re, listeners: ke }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (re = n === "mouseover" || n === "pointerover", Se = n === "mouseout" || n === "pointerout", re && o !== an && (be = o.relatedTarget || o.fromElement) && (Sl(be) || be[Xi])) break e;
          if ((Se || re) && (re = ae.window === ae ? ae : (re = ae.ownerDocument) ? re.defaultView || re.parentWindow : window, Se ? (be = o.relatedTarget || o.toElement, Se = V, be = be ? Sl(be) : null, be !== null && (kn = at(be), be !== kn || be.tag !== 5 && be.tag !== 6) && (be = null)) : (Se = null, be = V), Se !== be)) {
            if (ke = Do, ie = "onMouseLeave", L = "onMouseEnter", D = "mouse", (n === "pointerout" || n === "pointerover") && (ke = bv, ie = "onPointerLeave", L = "onPointerEnter", D = "pointer"), kn = Se == null ? re : ii(Se), j = be == null ? re : ii(be), re = new ke(ie, D + "leave", Se, o, ae), re.target = kn, re.relatedTarget = j, ie = null, Sl(ae) === V && (ke = new ke(L, D + "enter", be, o, ae), ke.target = j, ke.relatedTarget = kn, ie = ke), kn = ie, Se && be) t: {
              for (ke = Se, L = be, D = 0, j = ke; j; j = ko(j)) D++;
              for (j = 0, ie = L; ie; ie = ko(ie)) j++;
              for (; 0 < D - j; ) ke = ko(ke), D--;
              for (; 0 < j - D; ) L = ko(L), j--;
              for (; D--; ) {
                if (ke === L || L !== null && ke === L.alternate) break t;
                ke = ko(ke), L = ko(L);
              }
              ke = null;
            }
            else ke = null;
            Se !== null && Wv(oe, re, Se, ke, !1), be !== null && kn !== null && Wv(oe, kn, be, ke, !0);
          }
        }
        e: {
          if (re = V ? ii(V) : window, Se = re.nodeName && re.nodeName.toLowerCase(), Se === "select" || Se === "input" && re.type === "file") var we = xy;
          else if (Nv(re)) if (Av) we = Fv;
          else {
            we = jv;
            var $e = Dy;
          }
          else (Se = re.nodeName) && Se.toLowerCase() === "input" && (re.type === "checkbox" || re.type === "radio") && (we = Oy);
          if (we && (we = we(n, V))) {
            _d(oe, we, o, ae);
            break e;
          }
          $e && $e(n, re, V), n === "focusout" && ($e = re._wrapperState) && $e.controlled && re.type === "number" && fa(re, "number", re.value);
        }
        switch ($e = V ? ii(V) : window, n) {
          case "focusin":
            (Nv($e) || $e.contentEditable === "true") && (vu = $e, Cd = V, cs = null);
            break;
          case "focusout":
            cs = Cd = vu = null;
            break;
          case "mousedown":
            bd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            bd = !1, wd(oe, o, ae);
            break;
          case "selectionchange":
            if (My) break;
          case "keydown":
          case "keyup":
            wd(oe, o, ae);
        }
        var Ge;
        if (fu) e: {
          switch (n) {
            case "compositionstart":
              var Ze = "onCompositionStart";
              break e;
            case "compositionend":
              Ze = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Ze = "onCompositionUpdate";
              break e;
          }
          Ze = void 0;
        }
        else du ? Ov(n, o) && (Ze = "onCompositionEnd") : n === "keydown" && o.keyCode === 229 && (Ze = "onCompositionStart");
        Ze && (xv && o.locale !== "ko" && (du || Ze !== "onCompositionStart" ? Ze === "onCompositionEnd" && du && (Ge = I()) : (ri = ae, h = "value" in ri ? ri.value : ri.textContent, du = !0)), $e = ds(V, Ze), 0 < $e.length && (Ze = new hd(Ze, n, null, o, ae), oe.push({ event: Ze, listeners: $e }), Ge ? Ze.data = Ge : (Ge = kv(o), Ge !== null && (Ze.data = Ge)))), (Ge = os ? Mv(n, o) : by(n, o)) && (V = ds(V, "onBeforeInput"), 0 < V.length && (ae = new hd("onBeforeInput", "beforeinput", null, o, ae), oe.push({ event: ae, listeners: V }), ae.data = Ge));
      }
      gl(oe, r);
    });
  }
  function mu(n, r, o) {
    return { instance: n, listener: r, currentTarget: o };
  }
  function ds(n, r) {
    for (var o = r + "Capture", u = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = Or(n, o), d != null && u.unshift(mu(n, d, c)), d = Or(n, r), d != null && u.push(mu(n, d, c))), n = n.return;
    }
    return u;
  }
  function ko(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Wv(n, r, o, u, c) {
    for (var d = r._reactName, y = []; o !== null && o !== u; ) {
      var R = o, w = R.alternate, V = R.stateNode;
      if (w !== null && w === u) break;
      R.tag === 5 && V !== null && (R = V, c ? (w = Or(o, d), w != null && y.unshift(mu(o, w, R))) : c || (w = Or(o, d), w != null && y.push(mu(o, w, R)))), o = o.return;
    }
    y.length !== 0 && n.push({ event: r, listeners: y });
  }
  var Gv = /\r\n?/g, Ay = /\u0000|\uFFFD/g;
  function Qv(n) {
    return (typeof n == "string" ? n : "" + n).replace(Gv, `
`).replace(Ay, "");
  }
  function Lc(n, r, o) {
    if (r = Qv(r), Qv(n) !== r && o) throw Error(E(425));
  }
  function Mo() {
  }
  var ps = null, El = null;
  function Ac(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var zc = typeof setTimeout == "function" ? setTimeout : void 0, Md = typeof clearTimeout == "function" ? clearTimeout : void 0, qv = typeof Promise == "function" ? Promise : void 0, yu = typeof queueMicrotask == "function" ? queueMicrotask : typeof qv < "u" ? function(n) {
    return qv.resolve(null).then(n).catch(Uc);
  } : zc;
  function Uc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function gu(n, r) {
    var o = r, u = 0;
    do {
      var c = o.nextSibling;
      if (n.removeChild(o), c && c.nodeType === 8) if (o = c.data, o === "/$") {
        if (u === 0) {
          n.removeChild(c), ni(r);
          return;
        }
        u--;
      } else o !== "$" && o !== "$?" && o !== "$!" || u++;
      o = c;
    } while (o);
    ni(r);
  }
  function Ri(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function Kv(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var o = n.data;
        if (o === "$" || o === "$!" || o === "$?") {
          if (r === 0) return n;
          r--;
        } else o === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var No = Math.random().toString(36).slice(2), Ci = "__reactFiber$" + No, vs = "__reactProps$" + No, Xi = "__reactContainer$" + No, hs = "__reactEvents$" + No, Eu = "__reactListeners$" + No, zy = "__reactHandles$" + No;
  function Sl(n) {
    var r = n[Ci];
    if (r) return r;
    for (var o = n.parentNode; o; ) {
      if (r = o[Xi] || o[Ci]) {
        if (o = r.alternate, r.child !== null || o !== null && o.child !== null) for (n = Kv(n); n !== null; ) {
          if (o = n[Ci]) return o;
          n = Kv(n);
        }
        return r;
      }
      n = o, o = n.parentNode;
    }
    return null;
  }
  function He(n) {
    return n = n[Ci] || n[Xi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ii(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(E(33));
  }
  function yn(n) {
    return n[vs] || null;
  }
  var Tt = [], Ma = -1;
  function Na(n) {
    return { current: n };
  }
  function un(n) {
    0 > Ma || (n.current = Tt[Ma], Tt[Ma] = null, Ma--);
  }
  function Pe(n, r) {
    Ma++, Tt[Ma] = n.current, n.current = r;
  }
  var Rr = {}, Tn = Na(Rr), Gn = Na(!1), Kr = Rr;
  function Xr(n, r) {
    var o = n.type.contextTypes;
    if (!o) return Rr;
    var u = n.stateNode;
    if (u && u.__reactInternalMemoizedUnmaskedChildContext === r) return u.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in o) c[d] = r[d];
    return u && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function zn(n) {
    return n = n.childContextTypes, n != null;
  }
  function Su() {
    un(Gn), un(Tn);
  }
  function Xv(n, r, o) {
    if (Tn.current !== Rr) throw Error(E(168));
    Pe(Tn, r), Pe(Gn, o);
  }
  function ms(n, r, o) {
    var u = n.stateNode;
    if (r = r.childContextTypes, typeof u.getChildContext != "function") return o;
    u = u.getChildContext();
    for (var c in u) if (!(c in r)) throw Error(E(108, lt(n) || "Unknown", c));
    return pe({}, o, u);
  }
  function Jn(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Rr, Kr = Tn.current, Pe(Tn, n), Pe(Gn, Gn.current), !0;
  }
  function Pc(n, r, o) {
    var u = n.stateNode;
    if (!u) throw Error(E(169));
    o ? (n = ms(n, r, Kr), u.__reactInternalMemoizedMergedChildContext = n, un(Gn), un(Tn), Pe(Tn, n)) : un(Gn), Pe(Gn, o);
  }
  var bi = null, _u = !1, Zi = !1;
  function jc(n) {
    bi === null ? bi = [n] : bi.push(n);
  }
  function Lo(n) {
    _u = !0, jc(n);
  }
  function wi() {
    if (!Zi && bi !== null) {
      Zi = !0;
      var n = 0, r = zt;
      try {
        var o = bi;
        for (zt = 1; n < o.length; n++) {
          var u = o[n];
          do
            u = u(!0);
          while (u !== null);
        }
        bi = null, _u = !1;
      } catch (c) {
        throw bi !== null && (bi = bi.slice(n + 1)), cn(Ja, wi), c;
      } finally {
        zt = r, Zi = !1;
      }
    }
    return null;
  }
  var Ao = [], zo = 0, Uo = null, Ji = 0, Un = [], La = 0, ha = null, xi = 1, Di = "";
  function _l(n, r) {
    Ao[zo++] = Ji, Ao[zo++] = Uo, Uo = n, Ji = r;
  }
  function Zv(n, r, o) {
    Un[La++] = xi, Un[La++] = Di, Un[La++] = ha, ha = n;
    var u = xi;
    n = Di;
    var c = 32 - Mr(u) - 1;
    u &= ~(1 << c), o += 1;
    var d = 32 - Mr(r) + c;
    if (30 < d) {
      var y = c - c % 5;
      d = (u & (1 << y) - 1).toString(32), u >>= y, c -= y, xi = 1 << 32 - Mr(r) + c | o << c | u, Di = d + n;
    } else xi = 1 << d | o << c | u, Di = n;
  }
  function Fc(n) {
    n.return !== null && (_l(n, 1), Zv(n, 1, 0));
  }
  function Hc(n) {
    for (; n === Uo; ) Uo = Ao[--zo], Ao[zo] = null, Ji = Ao[--zo], Ao[zo] = null;
    for (; n === ha; ) ha = Un[--La], Un[La] = null, Di = Un[--La], Un[La] = null, xi = Un[--La], Un[La] = null;
  }
  var Zr = null, Jr = null, pn = !1, Aa = null;
  function Nd(n, r) {
    var o = Fa(5, null, null, 0);
    o.elementType = "DELETED", o.stateNode = r, o.return = n, r = n.deletions, r === null ? (n.deletions = [o], n.flags |= 16) : r.push(o);
  }
  function Jv(n, r) {
    switch (n.tag) {
      case 5:
        var o = n.type;
        return r = r.nodeType !== 1 || o.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Zr = n, Jr = Ri(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Zr = n, Jr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (o = ha !== null ? { id: xi, overflow: Di } : null, n.memoizedState = { dehydrated: r, treeContext: o, retryLane: 1073741824 }, o = Fa(18, null, null, 0), o.stateNode = r, o.return = n, n.child = o, Zr = n, Jr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Ld(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Ad(n) {
    if (pn) {
      var r = Jr;
      if (r) {
        var o = r;
        if (!Jv(n, r)) {
          if (Ld(n)) throw Error(E(418));
          r = Ri(o.nextSibling);
          var u = Zr;
          r && Jv(n, r) ? Nd(u, o) : (n.flags = n.flags & -4097 | 2, pn = !1, Zr = n);
        }
      } else {
        if (Ld(n)) throw Error(E(418));
        n.flags = n.flags & -4097 | 2, pn = !1, Zr = n;
      }
    }
  }
  function Qn(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Zr = n;
  }
  function Ic(n) {
    if (n !== Zr) return !1;
    if (!pn) return Qn(n), pn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Ac(n.type, n.memoizedProps)), r && (r = Jr)) {
      if (Ld(n)) throw ys(), Error(E(418));
      for (; r; ) Nd(n, r), r = Ri(r.nextSibling);
    }
    if (Qn(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(E(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var o = n.data;
            if (o === "/$") {
              if (r === 0) {
                Jr = Ri(n.nextSibling);
                break e;
              }
              r--;
            } else o !== "$" && o !== "$!" && o !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        Jr = null;
      }
    } else Jr = Zr ? Ri(n.stateNode.nextSibling) : null;
    return !0;
  }
  function ys() {
    for (var n = Jr; n; ) n = Ri(n.nextSibling);
  }
  function Po() {
    Jr = Zr = null, pn = !1;
  }
  function eo(n) {
    Aa === null ? Aa = [n] : Aa.push(n);
  }
  var Uy = Ye.ReactCurrentBatchConfig;
  function Tl(n, r, o) {
    if (n = o.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (o._owner) {
        if (o = o._owner, o) {
          if (o.tag !== 1) throw Error(E(309));
          var u = o.stateNode;
        }
        if (!u) throw Error(E(147, n));
        var c = u, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(y) {
          var R = c.refs;
          y === null ? delete R[d] : R[d] = y;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(E(284));
      if (!o._owner) throw Error(E(290, n));
    }
    return n;
  }
  function Vc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(E(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function eh(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Rl(n) {
    function r(L, D) {
      if (n) {
        var j = L.deletions;
        j === null ? (L.deletions = [D], L.flags |= 16) : j.push(D);
      }
    }
    function o(L, D) {
      if (!n) return null;
      for (; D !== null; ) r(L, D), D = D.sibling;
      return null;
    }
    function u(L, D) {
      for (L = /* @__PURE__ */ new Map(); D !== null; ) D.key !== null ? L.set(D.key, D) : L.set(D.index, D), D = D.sibling;
      return L;
    }
    function c(L, D) {
      return L = $o(L, D), L.index = 0, L.sibling = null, L;
    }
    function d(L, D, j) {
      return L.index = j, n ? (j = L.alternate, j !== null ? (j = j.index, j < D ? (L.flags |= 2, D) : j) : (L.flags |= 2, D)) : (L.flags |= 1048576, D);
    }
    function y(L) {
      return n && L.alternate === null && (L.flags |= 2), L;
    }
    function R(L, D, j, ie) {
      return D === null || D.tag !== 6 ? (D = fp(j, L.mode, ie), D.return = L, D) : (D = c(D, j), D.return = L, D);
    }
    function w(L, D, j, ie) {
      var we = j.type;
      return we === je ? ae(L, D, j.props.children, ie, j.key) : D !== null && (D.elementType === we || typeof we == "object" && we !== null && we.$$typeof === At && eh(we) === D.type) ? (ie = c(D, j.props), ie.ref = Tl(L, D, j), ie.return = L, ie) : (ie = Gs(j.type, j.key, j.props, null, L.mode, ie), ie.ref = Tl(L, D, j), ie.return = L, ie);
    }
    function V(L, D, j, ie) {
      return D === null || D.tag !== 4 || D.stateNode.containerInfo !== j.containerInfo || D.stateNode.implementation !== j.implementation ? (D = Tf(j, L.mode, ie), D.return = L, D) : (D = c(D, j.children || []), D.return = L, D);
    }
    function ae(L, D, j, ie, we) {
      return D === null || D.tag !== 7 ? (D = oo(j, L.mode, ie, we), D.return = L, D) : (D = c(D, j), D.return = L, D);
    }
    function oe(L, D, j) {
      if (typeof D == "string" && D !== "" || typeof D == "number") return D = fp("" + D, L.mode, j), D.return = L, D;
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Oe:
            return j = Gs(D.type, D.key, D.props, null, L.mode, j), j.ref = Tl(L, null, D), j.return = L, j;
          case Je:
            return D = Tf(D, L.mode, j), D.return = L, D;
          case At:
            var ie = D._init;
            return oe(L, ie(D._payload), j);
        }
        if (Xn(D) || Ae(D)) return D = oo(D, L.mode, j, null), D.return = L, D;
        Vc(L, D);
      }
      return null;
    }
    function re(L, D, j, ie) {
      var we = D !== null ? D.key : null;
      if (typeof j == "string" && j !== "" || typeof j == "number") return we !== null ? null : R(L, D, "" + j, ie);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case Oe:
            return j.key === we ? w(L, D, j, ie) : null;
          case Je:
            return j.key === we ? V(L, D, j, ie) : null;
          case At:
            return we = j._init, re(
              L,
              D,
              we(j._payload),
              ie
            );
        }
        if (Xn(j) || Ae(j)) return we !== null ? null : ae(L, D, j, ie, null);
        Vc(L, j);
      }
      return null;
    }
    function Se(L, D, j, ie, we) {
      if (typeof ie == "string" && ie !== "" || typeof ie == "number") return L = L.get(j) || null, R(D, L, "" + ie, we);
      if (typeof ie == "object" && ie !== null) {
        switch (ie.$$typeof) {
          case Oe:
            return L = L.get(ie.key === null ? j : ie.key) || null, w(D, L, ie, we);
          case Je:
            return L = L.get(ie.key === null ? j : ie.key) || null, V(D, L, ie, we);
          case At:
            var $e = ie._init;
            return Se(L, D, j, $e(ie._payload), we);
        }
        if (Xn(ie) || Ae(ie)) return L = L.get(j) || null, ae(D, L, ie, we, null);
        Vc(D, ie);
      }
      return null;
    }
    function be(L, D, j, ie) {
      for (var we = null, $e = null, Ge = D, Ze = D = 0, nr = null; Ge !== null && Ze < j.length; Ze++) {
        Ge.index > Ze ? (nr = Ge, Ge = null) : nr = Ge.sibling;
        var jt = re(L, Ge, j[Ze], ie);
        if (jt === null) {
          Ge === null && (Ge = nr);
          break;
        }
        n && Ge && jt.alternate === null && r(L, Ge), D = d(jt, D, Ze), $e === null ? we = jt : $e.sibling = jt, $e = jt, Ge = nr;
      }
      if (Ze === j.length) return o(L, Ge), pn && _l(L, Ze), we;
      if (Ge === null) {
        for (; Ze < j.length; Ze++) Ge = oe(L, j[Ze], ie), Ge !== null && (D = d(Ge, D, Ze), $e === null ? we = Ge : $e.sibling = Ge, $e = Ge);
        return pn && _l(L, Ze), we;
      }
      for (Ge = u(L, Ge); Ze < j.length; Ze++) nr = Se(Ge, L, Ze, j[Ze], ie), nr !== null && (n && nr.alternate !== null && Ge.delete(nr.key === null ? Ze : nr.key), D = d(nr, D, Ze), $e === null ? we = nr : $e.sibling = nr, $e = nr);
      return n && Ge.forEach(function(Qo) {
        return r(L, Qo);
      }), pn && _l(L, Ze), we;
    }
    function ke(L, D, j, ie) {
      var we = Ae(j);
      if (typeof we != "function") throw Error(E(150));
      if (j = we.call(j), j == null) throw Error(E(151));
      for (var $e = we = null, Ge = D, Ze = D = 0, nr = null, jt = j.next(); Ge !== null && !jt.done; Ze++, jt = j.next()) {
        Ge.index > Ze ? (nr = Ge, Ge = null) : nr = Ge.sibling;
        var Qo = re(L, Ge, jt.value, ie);
        if (Qo === null) {
          Ge === null && (Ge = nr);
          break;
        }
        n && Ge && Qo.alternate === null && r(L, Ge), D = d(Qo, D, Ze), $e === null ? we = Qo : $e.sibling = Qo, $e = Qo, Ge = nr;
      }
      if (jt.done) return o(
        L,
        Ge
      ), pn && _l(L, Ze), we;
      if (Ge === null) {
        for (; !jt.done; Ze++, jt = j.next()) jt = oe(L, jt.value, ie), jt !== null && (D = d(jt, D, Ze), $e === null ? we = jt : $e.sibling = jt, $e = jt);
        return pn && _l(L, Ze), we;
      }
      for (Ge = u(L, Ge); !jt.done; Ze++, jt = j.next()) jt = Se(Ge, L, Ze, jt.value, ie), jt !== null && (n && jt.alternate !== null && Ge.delete(jt.key === null ? Ze : jt.key), D = d(jt, D, Ze), $e === null ? we = jt : $e.sibling = jt, $e = jt);
      return n && Ge.forEach(function(Uh) {
        return r(L, Uh);
      }), pn && _l(L, Ze), we;
    }
    function kn(L, D, j, ie) {
      if (typeof j == "object" && j !== null && j.type === je && j.key === null && (j = j.props.children), typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case Oe:
            e: {
              for (var we = j.key, $e = D; $e !== null; ) {
                if ($e.key === we) {
                  if (we = j.type, we === je) {
                    if ($e.tag === 7) {
                      o(L, $e.sibling), D = c($e, j.props.children), D.return = L, L = D;
                      break e;
                    }
                  } else if ($e.elementType === we || typeof we == "object" && we !== null && we.$$typeof === At && eh(we) === $e.type) {
                    o(L, $e.sibling), D = c($e, j.props), D.ref = Tl(L, $e, j), D.return = L, L = D;
                    break e;
                  }
                  o(L, $e);
                  break;
                } else r(L, $e);
                $e = $e.sibling;
              }
              j.type === je ? (D = oo(j.props.children, L.mode, ie, j.key), D.return = L, L = D) : (ie = Gs(j.type, j.key, j.props, null, L.mode, ie), ie.ref = Tl(L, D, j), ie.return = L, L = ie);
            }
            return y(L);
          case Je:
            e: {
              for ($e = j.key; D !== null; ) {
                if (D.key === $e) if (D.tag === 4 && D.stateNode.containerInfo === j.containerInfo && D.stateNode.implementation === j.implementation) {
                  o(L, D.sibling), D = c(D, j.children || []), D.return = L, L = D;
                  break e;
                } else {
                  o(L, D);
                  break;
                }
                else r(L, D);
                D = D.sibling;
              }
              D = Tf(j, L.mode, ie), D.return = L, L = D;
            }
            return y(L);
          case At:
            return $e = j._init, kn(L, D, $e(j._payload), ie);
        }
        if (Xn(j)) return be(L, D, j, ie);
        if (Ae(j)) return ke(L, D, j, ie);
        Vc(L, j);
      }
      return typeof j == "string" && j !== "" || typeof j == "number" ? (j = "" + j, D !== null && D.tag === 6 ? (o(L, D.sibling), D = c(D, j), D.return = L, L = D) : (o(L, D), D = fp(j, L.mode, ie), D.return = L, L = D), y(L)) : o(L, D);
    }
    return kn;
  }
  var wn = Rl(!0), ye = Rl(!1), ma = Na(null), ea = null, Tu = null, zd = null;
  function Ud() {
    zd = Tu = ea = null;
  }
  function Pd(n) {
    var r = ma.current;
    un(ma), n._currentValue = r;
  }
  function jd(n, r, o) {
    for (; n !== null; ) {
      var u = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, u !== null && (u.childLanes |= r)) : u !== null && (u.childLanes & r) !== r && (u.childLanes |= r), n === o) break;
      n = n.return;
    }
  }
  function gn(n, r) {
    ea = n, zd = Tu = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (jn = !0), n.firstContext = null);
  }
  function za(n) {
    var r = n._currentValue;
    if (zd !== n) if (n = { context: n, memoizedValue: r, next: null }, Tu === null) {
      if (ea === null) throw Error(E(308));
      Tu = n, ea.dependencies = { lanes: 0, firstContext: n };
    } else Tu = Tu.next = n;
    return r;
  }
  var Cl = null;
  function Fd(n) {
    Cl === null ? Cl = [n] : Cl.push(n);
  }
  function Hd(n, r, o, u) {
    var c = r.interleaved;
    return c === null ? (o.next = o, Fd(r)) : (o.next = c.next, c.next = o), r.interleaved = o, ya(n, u);
  }
  function ya(n, r) {
    n.lanes |= r;
    var o = n.alternate;
    for (o !== null && (o.lanes |= r), o = n, n = n.return; n !== null; ) n.childLanes |= r, o = n.alternate, o !== null && (o.childLanes |= r), o = n, n = n.return;
    return o.tag === 3 ? o.stateNode : null;
  }
  var ga = !1;
  function Id(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function th(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function to(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function jo(n, r, o) {
    var u = n.updateQueue;
    if (u === null) return null;
    if (u = u.shared, Rt & 2) {
      var c = u.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), u.pending = r, ya(n, o);
    }
    return c = u.interleaved, c === null ? (r.next = r, Fd(u)) : (r.next = c.next, c.next = r), u.interleaved = r, ya(n, o);
  }
  function Bc(n, r, o) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (o & 4194240) !== 0)) {
      var u = r.lanes;
      u &= n.pendingLanes, o |= u, r.lanes = o, Wi(n, o);
    }
  }
  function nh(n, r) {
    var o = n.updateQueue, u = n.alternate;
    if (u !== null && (u = u.updateQueue, o === u)) {
      var c = null, d = null;
      if (o = o.firstBaseUpdate, o !== null) {
        do {
          var y = { eventTime: o.eventTime, lane: o.lane, tag: o.tag, payload: o.payload, callback: o.callback, next: null };
          d === null ? c = d = y : d = d.next = y, o = o.next;
        } while (o !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      o = { baseState: u.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: u.shared, effects: u.effects }, n.updateQueue = o;
      return;
    }
    n = o.lastBaseUpdate, n === null ? o.firstBaseUpdate = r : n.next = r, o.lastBaseUpdate = r;
  }
  function gs(n, r, o, u) {
    var c = n.updateQueue;
    ga = !1;
    var d = c.firstBaseUpdate, y = c.lastBaseUpdate, R = c.shared.pending;
    if (R !== null) {
      c.shared.pending = null;
      var w = R, V = w.next;
      w.next = null, y === null ? d = V : y.next = V, y = w;
      var ae = n.alternate;
      ae !== null && (ae = ae.updateQueue, R = ae.lastBaseUpdate, R !== y && (R === null ? ae.firstBaseUpdate = V : R.next = V, ae.lastBaseUpdate = w));
    }
    if (d !== null) {
      var oe = c.baseState;
      y = 0, ae = V = w = null, R = d;
      do {
        var re = R.lane, Se = R.eventTime;
        if ((u & re) === re) {
          ae !== null && (ae = ae.next = {
            eventTime: Se,
            lane: 0,
            tag: R.tag,
            payload: R.payload,
            callback: R.callback,
            next: null
          });
          e: {
            var be = n, ke = R;
            switch (re = r, Se = o, ke.tag) {
              case 1:
                if (be = ke.payload, typeof be == "function") {
                  oe = be.call(Se, oe, re);
                  break e;
                }
                oe = be;
                break e;
              case 3:
                be.flags = be.flags & -65537 | 128;
              case 0:
                if (be = ke.payload, re = typeof be == "function" ? be.call(Se, oe, re) : be, re == null) break e;
                oe = pe({}, oe, re);
                break e;
              case 2:
                ga = !0;
            }
          }
          R.callback !== null && R.lane !== 0 && (n.flags |= 64, re = c.effects, re === null ? c.effects = [R] : re.push(R));
        } else Se = { eventTime: Se, lane: re, tag: R.tag, payload: R.payload, callback: R.callback, next: null }, ae === null ? (V = ae = Se, w = oe) : ae = ae.next = Se, y |= re;
        if (R = R.next, R === null) {
          if (R = c.shared.pending, R === null) break;
          re = R, R = re.next, re.next = null, c.lastBaseUpdate = re, c.shared.pending = null;
        }
      } while (!0);
      if (ae === null && (w = oe), c.baseState = w, c.firstBaseUpdate = V, c.lastBaseUpdate = ae, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          y |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      Li |= y, n.lanes = y, n.memoizedState = oe;
    }
  }
  function Vd(n, r, o) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var u = n[r], c = u.callback;
      if (c !== null) {
        if (u.callback = null, u = o, typeof c != "function") throw Error(E(191, c));
        c.call(u);
      }
    }
  }
  var Es = {}, Oi = Na(Es), Ss = Na(Es), _s = Na(Es);
  function bl(n) {
    if (n === Es) throw Error(E(174));
    return n;
  }
  function Bd(n, r) {
    switch (Pe(_s, r), Pe(Ss, n), Pe(Oi, Es), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : da(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = da(r, n);
    }
    un(Oi), Pe(Oi, r);
  }
  function wl() {
    un(Oi), un(Ss), un(_s);
  }
  function rh(n) {
    bl(_s.current);
    var r = bl(Oi.current), o = da(r, n.type);
    r !== o && (Pe(Ss, n), Pe(Oi, o));
  }
  function Yc(n) {
    Ss.current === n && (un(Oi), un(Ss));
  }
  var En = Na(0);
  function $c(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var o = r.memoizedState;
        if (o !== null && (o = o.dehydrated, o === null || o.data === "$?" || o.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var Ts = [];
  function Ie() {
    for (var n = 0; n < Ts.length; n++) Ts[n]._workInProgressVersionPrimary = null;
    Ts.length = 0;
  }
  var mt = Ye.ReactCurrentDispatcher, Ut = Ye.ReactCurrentBatchConfig, Jt = 0, Pt = null, Pn = null, er = null, Wc = !1, Rs = !1, xl = 0, ne = 0;
  function Lt() {
    throw Error(E(321));
  }
  function qe(n, r) {
    if (r === null) return !1;
    for (var o = 0; o < r.length && o < n.length; o++) if (!ai(n[o], r[o])) return !1;
    return !0;
  }
  function Fo(n, r, o, u, c, d) {
    if (Jt = d, Pt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, mt.current = n === null || n.memoizedState === null ? uf : Os, n = o(u, c), Rs) {
      d = 0;
      do {
        if (Rs = !1, xl = 0, 25 <= d) throw Error(E(301));
        d += 1, er = Pn = null, r.updateQueue = null, mt.current = sf, n = o(u, c);
      } while (Rs);
    }
    if (mt.current = Nl, r = Pn !== null && Pn.next !== null, Jt = 0, er = Pn = Pt = null, Wc = !1, r) throw Error(E(300));
    return n;
  }
  function oi() {
    var n = xl !== 0;
    return xl = 0, n;
  }
  function Cr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return er === null ? Pt.memoizedState = er = n : er = er.next = n, er;
  }
  function xn() {
    if (Pn === null) {
      var n = Pt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = Pn.next;
    var r = er === null ? Pt.memoizedState : er.next;
    if (r !== null) er = r, Pn = n;
    else {
      if (n === null) throw Error(E(310));
      Pn = n, n = { memoizedState: Pn.memoizedState, baseState: Pn.baseState, baseQueue: Pn.baseQueue, queue: Pn.queue, next: null }, er === null ? Pt.memoizedState = er = n : er = er.next = n;
    }
    return er;
  }
  function no(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Ho(n) {
    var r = xn(), o = r.queue;
    if (o === null) throw Error(E(311));
    o.lastRenderedReducer = n;
    var u = Pn, c = u.baseQueue, d = o.pending;
    if (d !== null) {
      if (c !== null) {
        var y = c.next;
        c.next = d.next, d.next = y;
      }
      u.baseQueue = c = d, o.pending = null;
    }
    if (c !== null) {
      d = c.next, u = u.baseState;
      var R = y = null, w = null, V = d;
      do {
        var ae = V.lane;
        if ((Jt & ae) === ae) w !== null && (w = w.next = { lane: 0, action: V.action, hasEagerState: V.hasEagerState, eagerState: V.eagerState, next: null }), u = V.hasEagerState ? V.eagerState : n(u, V.action);
        else {
          var oe = {
            lane: ae,
            action: V.action,
            hasEagerState: V.hasEagerState,
            eagerState: V.eagerState,
            next: null
          };
          w === null ? (R = w = oe, y = u) : w = w.next = oe, Pt.lanes |= ae, Li |= ae;
        }
        V = V.next;
      } while (V !== null && V !== d);
      w === null ? y = u : w.next = R, ai(u, r.memoizedState) || (jn = !0), r.memoizedState = u, r.baseState = y, r.baseQueue = w, o.lastRenderedState = u;
    }
    if (n = o.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Pt.lanes |= d, Li |= d, c = c.next;
      while (c !== n);
    } else c === null && (o.lanes = 0);
    return [r.memoizedState, o.dispatch];
  }
  function Dl(n) {
    var r = xn(), o = r.queue;
    if (o === null) throw Error(E(311));
    o.lastRenderedReducer = n;
    var u = o.dispatch, c = o.pending, d = r.memoizedState;
    if (c !== null) {
      o.pending = null;
      var y = c = c.next;
      do
        d = n(d, y.action), y = y.next;
      while (y !== c);
      ai(d, r.memoizedState) || (jn = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), o.lastRenderedState = d;
    }
    return [d, u];
  }
  function Gc() {
  }
  function Qc(n, r) {
    var o = Pt, u = xn(), c = r(), d = !ai(u.memoizedState, c);
    if (d && (u.memoizedState = c, jn = !0), u = u.queue, Cs(Xc.bind(null, o, u, n), [n]), u.getSnapshot !== r || d || er !== null && er.memoizedState.tag & 1) {
      if (o.flags |= 2048, Ol(9, Kc.bind(null, o, u, c, r), void 0, null), qn === null) throw Error(E(349));
      Jt & 30 || qc(o, r, c);
    }
    return c;
  }
  function qc(n, r, o) {
    n.flags |= 16384, n = { getSnapshot: r, value: o }, r = Pt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Pt.updateQueue = r, r.stores = [n]) : (o = r.stores, o === null ? r.stores = [n] : o.push(n));
  }
  function Kc(n, r, o, u) {
    r.value = o, r.getSnapshot = u, Zc(r) && Jc(n);
  }
  function Xc(n, r, o) {
    return o(function() {
      Zc(r) && Jc(n);
    });
  }
  function Zc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var o = r();
      return !ai(n, o);
    } catch {
      return !0;
    }
  }
  function Jc(n) {
    var r = ya(n, 1);
    r !== null && Pr(r, n, 1, -1);
  }
  function ef(n) {
    var r = Cr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: no, lastRenderedState: n }, r.queue = n, n = n.dispatch = Ml.bind(null, Pt, n), [r.memoizedState, n];
  }
  function Ol(n, r, o, u) {
    return n = { tag: n, create: r, destroy: o, deps: u, next: null }, r = Pt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Pt.updateQueue = r, r.lastEffect = n.next = n) : (o = r.lastEffect, o === null ? r.lastEffect = n.next = n : (u = o.next, o.next = n, n.next = u, r.lastEffect = n)), n;
  }
  function tf() {
    return xn().memoizedState;
  }
  function Ru(n, r, o, u) {
    var c = Cr();
    Pt.flags |= n, c.memoizedState = Ol(1 | r, o, void 0, u === void 0 ? null : u);
  }
  function Cu(n, r, o, u) {
    var c = xn();
    u = u === void 0 ? null : u;
    var d = void 0;
    if (Pn !== null) {
      var y = Pn.memoizedState;
      if (d = y.destroy, u !== null && qe(u, y.deps)) {
        c.memoizedState = Ol(r, o, d, u);
        return;
      }
    }
    Pt.flags |= n, c.memoizedState = Ol(1 | r, o, d, u);
  }
  function nf(n, r) {
    return Ru(8390656, 8, n, r);
  }
  function Cs(n, r) {
    return Cu(2048, 8, n, r);
  }
  function rf(n, r) {
    return Cu(4, 2, n, r);
  }
  function bs(n, r) {
    return Cu(4, 4, n, r);
  }
  function kl(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function af(n, r, o) {
    return o = o != null ? o.concat([n]) : null, Cu(4, 4, kl.bind(null, r, n), o);
  }
  function ws() {
  }
  function of(n, r) {
    var o = xn();
    r = r === void 0 ? null : r;
    var u = o.memoizedState;
    return u !== null && r !== null && qe(r, u[1]) ? u[0] : (o.memoizedState = [n, r], n);
  }
  function lf(n, r) {
    var o = xn();
    r = r === void 0 ? null : r;
    var u = o.memoizedState;
    return u !== null && r !== null && qe(r, u[1]) ? u[0] : (n = n(), o.memoizedState = [n, r], n);
  }
  function Yd(n, r, o) {
    return Jt & 21 ? (ai(o, r) || (o = ru(), Pt.lanes |= o, Li |= o, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, jn = !0), n.memoizedState = o);
  }
  function xs(n, r) {
    var o = zt;
    zt = o !== 0 && 4 > o ? o : 4, n(!0);
    var u = Ut.transition;
    Ut.transition = {};
    try {
      n(!1), r();
    } finally {
      zt = o, Ut.transition = u;
    }
  }
  function $d() {
    return xn().memoizedState;
  }
  function Ds(n, r, o) {
    var u = Ai(n);
    if (o = { lane: u, action: o, hasEagerState: !1, eagerState: null, next: null }, ta(n)) ah(r, o);
    else if (o = Hd(n, r, o, u), o !== null) {
      var c = In();
      Pr(o, n, u, c), nn(o, r, u);
    }
  }
  function Ml(n, r, o) {
    var u = Ai(n), c = { lane: u, action: o, hasEagerState: !1, eagerState: null, next: null };
    if (ta(n)) ah(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var y = r.lastRenderedState, R = d(y, o);
        if (c.hasEagerState = !0, c.eagerState = R, ai(R, y)) {
          var w = r.interleaved;
          w === null ? (c.next = c, Fd(r)) : (c.next = w.next, w.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      o = Hd(n, r, c, u), o !== null && (c = In(), Pr(o, n, u, c), nn(o, r, u));
    }
  }
  function ta(n) {
    var r = n.alternate;
    return n === Pt || r !== null && r === Pt;
  }
  function ah(n, r) {
    Rs = Wc = !0;
    var o = n.pending;
    o === null ? r.next = r : (r.next = o.next, o.next = r), n.pending = r;
  }
  function nn(n, r, o) {
    if (o & 4194240) {
      var u = r.lanes;
      u &= n.pendingLanes, o |= u, r.lanes = o, Wi(n, o);
    }
  }
  var Nl = { readContext: za, useCallback: Lt, useContext: Lt, useEffect: Lt, useImperativeHandle: Lt, useInsertionEffect: Lt, useLayoutEffect: Lt, useMemo: Lt, useReducer: Lt, useRef: Lt, useState: Lt, useDebugValue: Lt, useDeferredValue: Lt, useTransition: Lt, useMutableSource: Lt, useSyncExternalStore: Lt, useId: Lt, unstable_isNewReconciler: !1 }, uf = { readContext: za, useCallback: function(n, r) {
    return Cr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: za, useEffect: nf, useImperativeHandle: function(n, r, o) {
    return o = o != null ? o.concat([n]) : null, Ru(
      4194308,
      4,
      kl.bind(null, r, n),
      o
    );
  }, useLayoutEffect: function(n, r) {
    return Ru(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Ru(4, 2, n, r);
  }, useMemo: function(n, r) {
    var o = Cr();
    return r = r === void 0 ? null : r, n = n(), o.memoizedState = [n, r], n;
  }, useReducer: function(n, r, o) {
    var u = Cr();
    return r = o !== void 0 ? o(r) : r, u.memoizedState = u.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, u.queue = n, n = n.dispatch = Ds.bind(null, Pt, n), [u.memoizedState, n];
  }, useRef: function(n) {
    var r = Cr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: ef, useDebugValue: ws, useDeferredValue: function(n) {
    return Cr().memoizedState = n;
  }, useTransition: function() {
    var n = ef(!1), r = n[0];
    return n = xs.bind(null, n[1]), Cr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, o) {
    var u = Pt, c = Cr();
    if (pn) {
      if (o === void 0) throw Error(E(407));
      o = o();
    } else {
      if (o = r(), qn === null) throw Error(E(349));
      Jt & 30 || qc(u, r, o);
    }
    c.memoizedState = o;
    var d = { value: o, getSnapshot: r };
    return c.queue = d, nf(Xc.bind(
      null,
      u,
      d,
      n
    ), [n]), u.flags |= 2048, Ol(9, Kc.bind(null, u, d, o, r), void 0, null), o;
  }, useId: function() {
    var n = Cr(), r = qn.identifierPrefix;
    if (pn) {
      var o = Di, u = xi;
      o = (u & ~(1 << 32 - Mr(u) - 1)).toString(32) + o, r = ":" + r + "R" + o, o = xl++, 0 < o && (r += "H" + o.toString(32)), r += ":";
    } else o = ne++, r = ":" + r + "r" + o.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Os = {
    readContext: za,
    useCallback: of,
    useContext: za,
    useEffect: Cs,
    useImperativeHandle: af,
    useInsertionEffect: rf,
    useLayoutEffect: bs,
    useMemo: lf,
    useReducer: Ho,
    useRef: tf,
    useState: function() {
      return Ho(no);
    },
    useDebugValue: ws,
    useDeferredValue: function(n) {
      var r = xn();
      return Yd(r, Pn.memoizedState, n);
    },
    useTransition: function() {
      var n = Ho(no)[0], r = xn().memoizedState;
      return [n, r];
    },
    useMutableSource: Gc,
    useSyncExternalStore: Qc,
    useId: $d,
    unstable_isNewReconciler: !1
  }, sf = { readContext: za, useCallback: of, useContext: za, useEffect: Cs, useImperativeHandle: af, useInsertionEffect: rf, useLayoutEffect: bs, useMemo: lf, useReducer: Dl, useRef: tf, useState: function() {
    return Dl(no);
  }, useDebugValue: ws, useDeferredValue: function(n) {
    var r = xn();
    return Pn === null ? r.memoizedState = n : Yd(r, Pn.memoizedState, n);
  }, useTransition: function() {
    var n = Dl(no)[0], r = xn().memoizedState;
    return [n, r];
  }, useMutableSource: Gc, useSyncExternalStore: Qc, useId: $d, unstable_isNewReconciler: !1 };
  function li(n, r) {
    if (n && n.defaultProps) {
      r = pe({}, r), n = n.defaultProps;
      for (var o in n) r[o] === void 0 && (r[o] = n[o]);
      return r;
    }
    return r;
  }
  function Wd(n, r, o, u) {
    r = n.memoizedState, o = o(u, r), o = o == null ? r : pe({}, r, o), n.memoizedState = o, n.lanes === 0 && (n.updateQueue.baseState = o);
  }
  var cf = { isMounted: function(n) {
    return (n = n._reactInternals) ? at(n) === n : !1;
  }, enqueueSetState: function(n, r, o) {
    n = n._reactInternals;
    var u = In(), c = Ai(n), d = to(u, c);
    d.payload = r, o != null && (d.callback = o), r = jo(n, d, c), r !== null && (Pr(r, n, c, u), Bc(r, n, c));
  }, enqueueReplaceState: function(n, r, o) {
    n = n._reactInternals;
    var u = In(), c = Ai(n), d = to(u, c);
    d.tag = 1, d.payload = r, o != null && (d.callback = o), r = jo(n, d, c), r !== null && (Pr(r, n, c, u), Bc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var o = In(), u = Ai(n), c = to(o, u);
    c.tag = 2, r != null && (c.callback = r), r = jo(n, c, u), r !== null && (Pr(r, n, u, o), Bc(r, n, u));
  } };
  function ih(n, r, o, u, c, d, y) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(u, d, y) : r.prototype && r.prototype.isPureReactComponent ? !us(o, u) || !us(c, d) : !0;
  }
  function ff(n, r, o) {
    var u = !1, c = Rr, d = r.contextType;
    return typeof d == "object" && d !== null ? d = za(d) : (c = zn(r) ? Kr : Tn.current, u = r.contextTypes, d = (u = u != null) ? Xr(n, c) : Rr), r = new r(o, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = cf, n.stateNode = r, r._reactInternals = n, u && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function oh(n, r, o, u) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(o, u), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(o, u), r.state !== n && cf.enqueueReplaceState(r, r.state, null);
  }
  function ks(n, r, o, u) {
    var c = n.stateNode;
    c.props = o, c.state = n.memoizedState, c.refs = {}, Id(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = za(d) : (d = zn(r) ? Kr : Tn.current, c.context = Xr(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (Wd(n, r, d, o), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && cf.enqueueReplaceState(c, c.state, null), gs(n, o, c, u), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Ll(n, r) {
    try {
      var o = "", u = r;
      do
        o += pt(u), u = u.return;
      while (u);
      var c = o;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Gd(n, r, o) {
    return { value: n, source: null, stack: o ?? null, digest: r ?? null };
  }
  function Qd(n, r) {
    try {
      console.error(r.value);
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  var df = typeof WeakMap == "function" ? WeakMap : Map;
  function lh(n, r, o) {
    o = to(-1, o), o.tag = 3, o.payload = { element: null };
    var u = r.value;
    return o.callback = function() {
      ku || (ku = !0, Ul = u), Qd(n, r);
    }, o;
  }
  function qd(n, r, o) {
    o = to(-1, o), o.tag = 3;
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var c = r.value;
      o.payload = function() {
        return u(c);
      }, o.callback = function() {
        Qd(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (o.callback = function() {
      Qd(n, r), typeof u != "function" && (Bo === null ? Bo = /* @__PURE__ */ new Set([this]) : Bo.add(this));
      var y = r.stack;
      this.componentDidCatch(r.value, { componentStack: y !== null ? y : "" });
    }), o;
  }
  function Kd(n, r, o) {
    var u = n.pingCache;
    if (u === null) {
      u = n.pingCache = new df();
      var c = /* @__PURE__ */ new Set();
      u.set(r, c);
    } else c = u.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), u.set(r, c));
    c.has(o) || (c.add(o), n = By.bind(null, n, r, o), r.then(n, n));
  }
  function uh(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Io(n, r, o, u, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, o.flags |= 131072, o.flags &= -52805, o.tag === 1 && (o.alternate === null ? o.tag = 17 : (r = to(-1, 1), r.tag = 2, jo(o, r, 1))), o.lanes |= 1), n);
  }
  var Ms = Ye.ReactCurrentOwner, jn = !1;
  function sr(n, r, o, u) {
    r.child = n === null ? ye(r, null, o, u) : wn(r, n.child, o, u);
  }
  function na(n, r, o, u, c) {
    o = o.render;
    var d = r.ref;
    return gn(r, c), u = Fo(n, r, o, u, d, c), o = oi(), n !== null && !jn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Pa(n, r, c)) : (pn && o && Fc(r), r.flags |= 1, sr(n, r, u, c), r.child);
  }
  function Al(n, r, o, u, c) {
    if (n === null) {
      var d = o.type;
      return typeof d == "function" && !cp(d) && d.defaultProps === void 0 && o.compare === null && o.defaultProps === void 0 ? (r.tag = 15, r.type = d, ot(n, r, d, u, c)) : (n = Gs(o.type, null, u, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var y = d.memoizedProps;
      if (o = o.compare, o = o !== null ? o : us, o(y, u) && n.ref === r.ref) return Pa(n, r, c);
    }
    return r.flags |= 1, n = $o(d, u), n.ref = r.ref, n.return = r, r.child = n;
  }
  function ot(n, r, o, u, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (us(d, u) && n.ref === r.ref) if (jn = !1, r.pendingProps = u = d, (n.lanes & c) !== 0) n.flags & 131072 && (jn = !0);
      else return r.lanes = n.lanes, Pa(n, r, c);
    }
    return sh(n, r, o, u, c);
  }
  function Ns(n, r, o) {
    var u = r.pendingProps, c = u.children, d = n !== null ? n.memoizedState : null;
    if (u.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Pe(xu, Ea), Ea |= o;
    else {
      if (!(o & 1073741824)) return n = d !== null ? d.baseLanes | o : o, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Pe(xu, Ea), Ea |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, u = d !== null ? d.baseLanes : o, Pe(xu, Ea), Ea |= u;
    }
    else d !== null ? (u = d.baseLanes | o, r.memoizedState = null) : u = o, Pe(xu, Ea), Ea |= u;
    return sr(n, r, c, o), r.child;
  }
  function Xd(n, r) {
    var o = r.ref;
    (n === null && o !== null || n !== null && n.ref !== o) && (r.flags |= 512, r.flags |= 2097152);
  }
  function sh(n, r, o, u, c) {
    var d = zn(o) ? Kr : Tn.current;
    return d = Xr(r, d), gn(r, c), o = Fo(n, r, o, u, d, c), u = oi(), n !== null && !jn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Pa(n, r, c)) : (pn && u && Fc(r), r.flags |= 1, sr(n, r, o, c), r.child);
  }
  function ch(n, r, o, u, c) {
    if (zn(o)) {
      var d = !0;
      Jn(r);
    } else d = !1;
    if (gn(r, c), r.stateNode === null) Ua(n, r), ff(r, o, u), ks(r, o, u, c), u = !0;
    else if (n === null) {
      var y = r.stateNode, R = r.memoizedProps;
      y.props = R;
      var w = y.context, V = o.contextType;
      typeof V == "object" && V !== null ? V = za(V) : (V = zn(o) ? Kr : Tn.current, V = Xr(r, V));
      var ae = o.getDerivedStateFromProps, oe = typeof ae == "function" || typeof y.getSnapshotBeforeUpdate == "function";
      oe || typeof y.UNSAFE_componentWillReceiveProps != "function" && typeof y.componentWillReceiveProps != "function" || (R !== u || w !== V) && oh(r, y, u, V), ga = !1;
      var re = r.memoizedState;
      y.state = re, gs(r, u, y, c), w = r.memoizedState, R !== u || re !== w || Gn.current || ga ? (typeof ae == "function" && (Wd(r, o, ae, u), w = r.memoizedState), (R = ga || ih(r, o, R, u, re, w, V)) ? (oe || typeof y.UNSAFE_componentWillMount != "function" && typeof y.componentWillMount != "function" || (typeof y.componentWillMount == "function" && y.componentWillMount(), typeof y.UNSAFE_componentWillMount == "function" && y.UNSAFE_componentWillMount()), typeof y.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof y.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = u, r.memoizedState = w), y.props = u, y.state = w, y.context = V, u = R) : (typeof y.componentDidMount == "function" && (r.flags |= 4194308), u = !1);
    } else {
      y = r.stateNode, th(n, r), R = r.memoizedProps, V = r.type === r.elementType ? R : li(r.type, R), y.props = V, oe = r.pendingProps, re = y.context, w = o.contextType, typeof w == "object" && w !== null ? w = za(w) : (w = zn(o) ? Kr : Tn.current, w = Xr(r, w));
      var Se = o.getDerivedStateFromProps;
      (ae = typeof Se == "function" || typeof y.getSnapshotBeforeUpdate == "function") || typeof y.UNSAFE_componentWillReceiveProps != "function" && typeof y.componentWillReceiveProps != "function" || (R !== oe || re !== w) && oh(r, y, u, w), ga = !1, re = r.memoizedState, y.state = re, gs(r, u, y, c);
      var be = r.memoizedState;
      R !== oe || re !== be || Gn.current || ga ? (typeof Se == "function" && (Wd(r, o, Se, u), be = r.memoizedState), (V = ga || ih(r, o, V, u, re, be, w) || !1) ? (ae || typeof y.UNSAFE_componentWillUpdate != "function" && typeof y.componentWillUpdate != "function" || (typeof y.componentWillUpdate == "function" && y.componentWillUpdate(u, be, w), typeof y.UNSAFE_componentWillUpdate == "function" && y.UNSAFE_componentWillUpdate(u, be, w)), typeof y.componentDidUpdate == "function" && (r.flags |= 4), typeof y.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof y.componentDidUpdate != "function" || R === n.memoizedProps && re === n.memoizedState || (r.flags |= 4), typeof y.getSnapshotBeforeUpdate != "function" || R === n.memoizedProps && re === n.memoizedState || (r.flags |= 1024), r.memoizedProps = u, r.memoizedState = be), y.props = u, y.state = be, y.context = w, u = V) : (typeof y.componentDidUpdate != "function" || R === n.memoizedProps && re === n.memoizedState || (r.flags |= 4), typeof y.getSnapshotBeforeUpdate != "function" || R === n.memoizedProps && re === n.memoizedState || (r.flags |= 1024), u = !1);
    }
    return Ls(n, r, o, u, d, c);
  }
  function Ls(n, r, o, u, c, d) {
    Xd(n, r);
    var y = (r.flags & 128) !== 0;
    if (!u && !y) return c && Pc(r, o, !1), Pa(n, r, d);
    u = r.stateNode, Ms.current = r;
    var R = y && typeof o.getDerivedStateFromError != "function" ? null : u.render();
    return r.flags |= 1, n !== null && y ? (r.child = wn(r, n.child, null, d), r.child = wn(r, null, R, d)) : sr(n, r, R, d), r.memoizedState = u.state, c && Pc(r, o, !0), r.child;
  }
  function bu(n) {
    var r = n.stateNode;
    r.pendingContext ? Xv(n, r.pendingContext, r.pendingContext !== r.context) : r.context && Xv(n, r.context, !1), Bd(n, r.containerInfo);
  }
  function fh(n, r, o, u, c) {
    return Po(), eo(c), r.flags |= 256, sr(n, r, o, u), r.child;
  }
  var pf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Zd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function vf(n, r, o) {
    var u = r.pendingProps, c = En.current, d = !1, y = (r.flags & 128) !== 0, R;
    if ((R = y) || (R = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), R ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), Pe(En, c & 1), n === null)
      return Ad(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (y = u.children, n = u.fallback, d ? (u = r.mode, d = r.child, y = { mode: "hidden", children: y }, !(u & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = y) : d = Wo(y, u, 0, null), n = oo(n, u, o, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = Zd(o), r.memoizedState = pf, n) : Jd(r, y));
    if (c = n.memoizedState, c !== null && (R = c.dehydrated, R !== null)) return dh(n, r, y, u, R, c, o);
    if (d) {
      d = u.fallback, y = r.mode, c = n.child, R = c.sibling;
      var w = { mode: "hidden", children: u.children };
      return !(y & 1) && r.child !== c ? (u = r.child, u.childLanes = 0, u.pendingProps = w, r.deletions = null) : (u = $o(c, w), u.subtreeFlags = c.subtreeFlags & 14680064), R !== null ? d = $o(R, d) : (d = oo(d, y, o, null), d.flags |= 2), d.return = r, u.return = r, u.sibling = d, r.child = u, u = d, d = r.child, y = n.child.memoizedState, y = y === null ? Zd(o) : { baseLanes: y.baseLanes | o, cachePool: null, transitions: y.transitions }, d.memoizedState = y, d.childLanes = n.childLanes & ~o, r.memoizedState = pf, u;
    }
    return d = n.child, n = d.sibling, u = $o(d, { mode: "visible", children: u.children }), !(r.mode & 1) && (u.lanes = o), u.return = r, u.sibling = null, n !== null && (o = r.deletions, o === null ? (r.deletions = [n], r.flags |= 16) : o.push(n)), r.child = u, r.memoizedState = null, u;
  }
  function Jd(n, r) {
    return r = Wo({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function As(n, r, o, u) {
    return u !== null && eo(u), wn(r, n.child, null, o), n = Jd(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function dh(n, r, o, u, c, d, y) {
    if (o)
      return r.flags & 256 ? (r.flags &= -257, u = Gd(Error(E(422))), As(n, r, y, u)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = u.fallback, c = r.mode, u = Wo({ mode: "visible", children: u.children }, c, 0, null), d = oo(d, c, y, null), d.flags |= 2, u.return = r, d.return = r, u.sibling = d, r.child = u, r.mode & 1 && wn(r, n.child, null, y), r.child.memoizedState = Zd(y), r.memoizedState = pf, d);
    if (!(r.mode & 1)) return As(n, r, y, null);
    if (c.data === "$!") {
      if (u = c.nextSibling && c.nextSibling.dataset, u) var R = u.dgst;
      return u = R, d = Error(E(419)), u = Gd(d, u, void 0), As(n, r, y, u);
    }
    if (R = (y & n.childLanes) !== 0, jn || R) {
      if (u = qn, u !== null) {
        switch (y & -y) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
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
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (u.suspendedLanes | y) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, ya(n, c), Pr(u, n, c, -1));
      }
      return sp(), u = Gd(Error(E(421))), As(n, r, y, u);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Yy.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, Jr = Ri(c.nextSibling), Zr = r, pn = !0, Aa = null, n !== null && (Un[La++] = xi, Un[La++] = Di, Un[La++] = ha, xi = n.id, Di = n.overflow, ha = r), r = Jd(r, u.children), r.flags |= 4096, r);
  }
  function ep(n, r, o) {
    n.lanes |= r;
    var u = n.alternate;
    u !== null && (u.lanes |= r), jd(n.return, r, o);
  }
  function Ar(n, r, o, u, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: u, tail: o, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = u, d.tail = o, d.tailMode = c);
  }
  function ki(n, r, o) {
    var u = r.pendingProps, c = u.revealOrder, d = u.tail;
    if (sr(n, r, u.children, o), u = En.current, u & 2) u = u & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && ep(n, o, r);
        else if (n.tag === 19) ep(n, o, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      u &= 1;
    }
    if (Pe(En, u), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (o = r.child, c = null; o !== null; ) n = o.alternate, n !== null && $c(n) === null && (c = o), o = o.sibling;
        o = c, o === null ? (c = r.child, r.child = null) : (c = o.sibling, o.sibling = null), Ar(r, !1, c, o, d);
        break;
      case "backwards":
        for (o = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && $c(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = o, o = c, c = n;
        }
        Ar(r, !0, o, null, d);
        break;
      case "together":
        Ar(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Ua(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Pa(n, r, o) {
    if (n !== null && (r.dependencies = n.dependencies), Li |= r.lanes, !(o & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(E(153));
    if (r.child !== null) {
      for (n = r.child, o = $o(n, n.pendingProps), r.child = o, o.return = r; n.sibling !== null; ) n = n.sibling, o = o.sibling = $o(n, n.pendingProps), o.return = r;
      o.sibling = null;
    }
    return r.child;
  }
  function zs(n, r, o) {
    switch (r.tag) {
      case 3:
        bu(r), Po();
        break;
      case 5:
        rh(r);
        break;
      case 1:
        zn(r.type) && Jn(r);
        break;
      case 4:
        Bd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var u = r.type._context, c = r.memoizedProps.value;
        Pe(ma, u._currentValue), u._currentValue = c;
        break;
      case 13:
        if (u = r.memoizedState, u !== null)
          return u.dehydrated !== null ? (Pe(En, En.current & 1), r.flags |= 128, null) : o & r.child.childLanes ? vf(n, r, o) : (Pe(En, En.current & 1), n = Pa(n, r, o), n !== null ? n.sibling : null);
        Pe(En, En.current & 1);
        break;
      case 19:
        if (u = (o & r.childLanes) !== 0, n.flags & 128) {
          if (u) return ki(n, r, o);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Pe(En, En.current), u) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Ns(n, r, o);
    }
    return Pa(n, r, o);
  }
  var ja, Fn, ph, vh;
  ja = function(n, r) {
    for (var o = r.child; o !== null; ) {
      if (o.tag === 5 || o.tag === 6) n.appendChild(o.stateNode);
      else if (o.tag !== 4 && o.child !== null) {
        o.child.return = o, o = o.child;
        continue;
      }
      if (o === r) break;
      for (; o.sibling === null; ) {
        if (o.return === null || o.return === r) return;
        o = o.return;
      }
      o.sibling.return = o.return, o = o.sibling;
    }
  }, Fn = function() {
  }, ph = function(n, r, o, u) {
    var c = n.memoizedProps;
    if (c !== u) {
      n = r.stateNode, bl(Oi.current);
      var d = null;
      switch (o) {
        case "input":
          c = ar(n, c), u = ar(n, u), d = [];
          break;
        case "select":
          c = pe({}, c, { value: void 0 }), u = pe({}, u, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = $n(n, c), u = $n(n, u), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof u.onClick == "function" && (n.onclick = Mo);
      }
      sn(o, u);
      var y;
      o = null;
      for (V in c) if (!u.hasOwnProperty(V) && c.hasOwnProperty(V) && c[V] != null) if (V === "style") {
        var R = c[V];
        for (y in R) R.hasOwnProperty(y) && (o || (o = {}), o[y] = "");
      } else V !== "dangerouslySetInnerHTML" && V !== "children" && V !== "suppressContentEditableWarning" && V !== "suppressHydrationWarning" && V !== "autoFocus" && ($.hasOwnProperty(V) ? d || (d = []) : (d = d || []).push(V, null));
      for (V in u) {
        var w = u[V];
        if (R = c != null ? c[V] : void 0, u.hasOwnProperty(V) && w !== R && (w != null || R != null)) if (V === "style") if (R) {
          for (y in R) !R.hasOwnProperty(y) || w && w.hasOwnProperty(y) || (o || (o = {}), o[y] = "");
          for (y in w) w.hasOwnProperty(y) && R[y] !== w[y] && (o || (o = {}), o[y] = w[y]);
        } else o || (d || (d = []), d.push(
          V,
          o
        )), o = w;
        else V === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, R = R ? R.__html : void 0, w != null && R !== w && (d = d || []).push(V, w)) : V === "children" ? typeof w != "string" && typeof w != "number" || (d = d || []).push(V, "" + w) : V !== "suppressContentEditableWarning" && V !== "suppressHydrationWarning" && ($.hasOwnProperty(V) ? (w != null && V === "onScroll" && Yt("scroll", n), d || R === w || (d = [])) : (d = d || []).push(V, w));
      }
      o && (d = d || []).push("style", o);
      var V = d;
      (r.updateQueue = V) && (r.flags |= 4);
    }
  }, vh = function(n, r, o, u) {
    o !== u && (r.flags |= 4);
  };
  function Us(n, r) {
    if (!pn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var o = null; r !== null; ) r.alternate !== null && (o = r), r = r.sibling;
        o === null ? n.tail = null : o.sibling = null;
        break;
      case "collapsed":
        o = n.tail;
        for (var u = null; o !== null; ) o.alternate !== null && (u = o), o = o.sibling;
        u === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : u.sibling = null;
    }
  }
  function tr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, o = 0, u = 0;
    if (r) for (var c = n.child; c !== null; ) o |= c.lanes | c.childLanes, u |= c.subtreeFlags & 14680064, u |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) o |= c.lanes | c.childLanes, u |= c.subtreeFlags, u |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= u, n.childLanes = o, r;
  }
  function hh(n, r, o) {
    var u = r.pendingProps;
    switch (Hc(r), r.tag) {
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
        return tr(r), null;
      case 1:
        return zn(r.type) && Su(), tr(r), null;
      case 3:
        return u = r.stateNode, wl(), un(Gn), un(Tn), Ie(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (n === null || n.child === null) && (Ic(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Aa !== null && (Pl(Aa), Aa = null))), Fn(n, r), tr(r), null;
      case 5:
        Yc(r);
        var c = bl(_s.current);
        if (o = r.type, n !== null && r.stateNode != null) ph(n, r, o, u, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!u) {
            if (r.stateNode === null) throw Error(E(166));
            return tr(r), null;
          }
          if (n = bl(Oi.current), Ic(r)) {
            u = r.stateNode, o = r.type;
            var d = r.memoizedProps;
            switch (u[Ci] = r, u[vs] = d, n = (r.mode & 1) !== 0, o) {
              case "dialog":
                Yt("cancel", u), Yt("close", u);
                break;
              case "iframe":
              case "object":
              case "embed":
                Yt("load", u);
                break;
              case "video":
              case "audio":
                for (c = 0; c < fs.length; c++) Yt(fs[c], u);
                break;
              case "source":
                Yt("error", u);
                break;
              case "img":
              case "image":
              case "link":
                Yt(
                  "error",
                  u
                ), Yt("load", u);
                break;
              case "details":
                Yt("toggle", u);
                break;
              case "input":
                Bn(u, d), Yt("invalid", u);
                break;
              case "select":
                u._wrapperState = { wasMultiple: !!d.multiple }, Yt("invalid", u);
                break;
              case "textarea":
                Sr(u, d), Yt("invalid", u);
            }
            sn(o, d), c = null;
            for (var y in d) if (d.hasOwnProperty(y)) {
              var R = d[y];
              y === "children" ? typeof R == "string" ? u.textContent !== R && (d.suppressHydrationWarning !== !0 && Lc(u.textContent, R, n), c = ["children", R]) : typeof R == "number" && u.textContent !== "" + R && (d.suppressHydrationWarning !== !0 && Lc(
                u.textContent,
                R,
                n
              ), c = ["children", "" + R]) : $.hasOwnProperty(y) && R != null && y === "onScroll" && Yt("scroll", u);
            }
            switch (o) {
              case "input":
                Nn(u), pi(u, d, !0);
                break;
              case "textarea":
                Nn(u), Ln(u);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (u.onclick = Mo);
            }
            u = c, r.updateQueue = u, u !== null && (r.flags |= 4);
          } else {
            y = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = _r(o)), n === "http://www.w3.org/1999/xhtml" ? o === "script" ? (n = y.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof u.is == "string" ? n = y.createElement(o, { is: u.is }) : (n = y.createElement(o), o === "select" && (y = n, u.multiple ? y.multiple = !0 : u.size && (y.size = u.size))) : n = y.createElementNS(n, o), n[Ci] = r, n[vs] = u, ja(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (y = Zn(o, u), o) {
                case "dialog":
                  Yt("cancel", n), Yt("close", n), c = u;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Yt("load", n), c = u;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < fs.length; c++) Yt(fs[c], n);
                  c = u;
                  break;
                case "source":
                  Yt("error", n), c = u;
                  break;
                case "img":
                case "image":
                case "link":
                  Yt(
                    "error",
                    n
                  ), Yt("load", n), c = u;
                  break;
                case "details":
                  Yt("toggle", n), c = u;
                  break;
                case "input":
                  Bn(n, u), c = ar(n, u), Yt("invalid", n);
                  break;
                case "option":
                  c = u;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!u.multiple }, c = pe({}, u, { value: void 0 }), Yt("invalid", n);
                  break;
                case "textarea":
                  Sr(n, u), c = $n(n, u), Yt("invalid", n);
                  break;
                default:
                  c = u;
              }
              sn(o, c), R = c;
              for (d in R) if (R.hasOwnProperty(d)) {
                var w = R[d];
                d === "style" ? rn(n, w) : d === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, w != null && vi(n, w)) : d === "children" ? typeof w == "string" ? (o !== "textarea" || w !== "") && ce(n, w) : typeof w == "number" && ce(n, "" + w) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && ($.hasOwnProperty(d) ? w != null && d === "onScroll" && Yt("scroll", n) : w != null && Le(n, d, w, y));
              }
              switch (o) {
                case "input":
                  Nn(n), pi(n, u, !1);
                  break;
                case "textarea":
                  Nn(n), Ln(n);
                  break;
                case "option":
                  u.value != null && n.setAttribute("value", "" + ct(u.value));
                  break;
                case "select":
                  n.multiple = !!u.multiple, d = u.value, d != null ? Cn(n, !!u.multiple, d, !1) : u.defaultValue != null && Cn(
                    n,
                    !!u.multiple,
                    u.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = Mo);
              }
              switch (o) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u = !!u.autoFocus;
                  break e;
                case "img":
                  u = !0;
                  break e;
                default:
                  u = !1;
              }
            }
            u && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return tr(r), null;
      case 6:
        if (n && r.stateNode != null) vh(n, r, n.memoizedProps, u);
        else {
          if (typeof u != "string" && r.stateNode === null) throw Error(E(166));
          if (o = bl(_s.current), bl(Oi.current), Ic(r)) {
            if (u = r.stateNode, o = r.memoizedProps, u[Ci] = r, (d = u.nodeValue !== o) && (n = Zr, n !== null)) switch (n.tag) {
              case 3:
                Lc(u.nodeValue, o, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Lc(u.nodeValue, o, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else u = (o.nodeType === 9 ? o : o.ownerDocument).createTextNode(u), u[Ci] = r, r.stateNode = u;
        }
        return tr(r), null;
      case 13:
        if (un(En), u = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (pn && Jr !== null && r.mode & 1 && !(r.flags & 128)) ys(), Po(), r.flags |= 98560, d = !1;
          else if (d = Ic(r), u !== null && u.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(E(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(E(317));
              d[Ci] = r;
            } else Po(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            tr(r), d = !1;
          } else Aa !== null && (Pl(Aa), Aa = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = o, r) : (u = u !== null, u !== (n !== null && n.memoizedState !== null) && u && (r.child.flags |= 8192, r.mode & 1 && (n === null || En.current & 1 ? On === 0 && (On = 3) : sp())), r.updateQueue !== null && (r.flags |= 4), tr(r), null);
      case 4:
        return wl(), Fn(n, r), n === null && hu(r.stateNode.containerInfo), tr(r), null;
      case 10:
        return Pd(r.type._context), tr(r), null;
      case 17:
        return zn(r.type) && Su(), tr(r), null;
      case 19:
        if (un(En), d = r.memoizedState, d === null) return tr(r), null;
        if (u = (r.flags & 128) !== 0, y = d.rendering, y === null) if (u) Us(d, !1);
        else {
          if (On !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (y = $c(n), y !== null) {
              for (r.flags |= 128, Us(d, !1), u = y.updateQueue, u !== null && (r.updateQueue = u, r.flags |= 4), r.subtreeFlags = 0, u = o, o = r.child; o !== null; ) d = o, n = u, d.flags &= 14680066, y = d.alternate, y === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = y.childLanes, d.lanes = y.lanes, d.child = y.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = y.memoizedProps, d.memoizedState = y.memoizedState, d.updateQueue = y.updateQueue, d.type = y.type, n = y.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), o = o.sibling;
              return Pe(En, En.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && it() > Ou && (r.flags |= 128, u = !0, Us(d, !1), r.lanes = 4194304);
        }
        else {
          if (!u) if (n = $c(y), n !== null) {
            if (r.flags |= 128, u = !0, o = n.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), Us(d, !0), d.tail === null && d.tailMode === "hidden" && !y.alternate && !pn) return tr(r), null;
          } else 2 * it() - d.renderingStartTime > Ou && o !== 1073741824 && (r.flags |= 128, u = !0, Us(d, !1), r.lanes = 4194304);
          d.isBackwards ? (y.sibling = r.child, r.child = y) : (o = d.last, o !== null ? o.sibling = y : r.child = y, d.last = y);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = it(), r.sibling = null, o = En.current, Pe(En, u ? o & 1 | 2 : o & 1), r) : (tr(r), null);
      case 22:
      case 23:
        return up(), u = r.memoizedState !== null, n !== null && n.memoizedState !== null !== u && (r.flags |= 8192), u && r.mode & 1 ? Ea & 1073741824 && (tr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : tr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(E(156, r.tag));
  }
  function hf(n, r) {
    switch (Hc(r), r.tag) {
      case 1:
        return zn(r.type) && Su(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return wl(), un(Gn), un(Tn), Ie(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Yc(r), null;
      case 13:
        if (un(En), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(E(340));
          Po();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return un(En), null;
      case 4:
        return wl(), null;
      case 10:
        return Pd(r.type._context), null;
      case 22:
      case 23:
        return up(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ps = !1, br = !1, Py = typeof WeakSet == "function" ? WeakSet : Set, Re = null;
  function wu(n, r) {
    var o = n.ref;
    if (o !== null) if (typeof o == "function") try {
      o(null);
    } catch (u) {
      vn(n, r, u);
    }
    else o.current = null;
  }
  function mf(n, r, o) {
    try {
      o();
    } catch (u) {
      vn(n, r, u);
    }
  }
  var mh = !1;
  function yh(n, r) {
    if (ps = Oa, n = ss(), bc(n)) {
      if ("selectionStart" in n) var o = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        o = (o = n.ownerDocument) && o.defaultView || window;
        var u = o.getSelection && o.getSelection();
        if (u && u.rangeCount !== 0) {
          o = u.anchorNode;
          var c = u.anchorOffset, d = u.focusNode;
          u = u.focusOffset;
          try {
            o.nodeType, d.nodeType;
          } catch {
            o = null;
            break e;
          }
          var y = 0, R = -1, w = -1, V = 0, ae = 0, oe = n, re = null;
          t: for (; ; ) {
            for (var Se; oe !== o || c !== 0 && oe.nodeType !== 3 || (R = y + c), oe !== d || u !== 0 && oe.nodeType !== 3 || (w = y + u), oe.nodeType === 3 && (y += oe.nodeValue.length), (Se = oe.firstChild) !== null; )
              re = oe, oe = Se;
            for (; ; ) {
              if (oe === n) break t;
              if (re === o && ++V === c && (R = y), re === d && ++ae === u && (w = y), (Se = oe.nextSibling) !== null) break;
              oe = re, re = oe.parentNode;
            }
            oe = Se;
          }
          o = R === -1 || w === -1 ? null : { start: R, end: w };
        } else o = null;
      }
      o = o || { start: 0, end: 0 };
    } else o = null;
    for (El = { focusedElem: n, selectionRange: o }, Oa = !1, Re = r; Re !== null; ) if (r = Re, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, Re = n;
    else for (; Re !== null; ) {
      r = Re;
      try {
        var be = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (be !== null) {
              var ke = be.memoizedProps, kn = be.memoizedState, L = r.stateNode, D = L.getSnapshotBeforeUpdate(r.elementType === r.type ? ke : li(r.type, ke), kn);
              L.__reactInternalSnapshotBeforeUpdate = D;
            }
            break;
          case 3:
            var j = r.stateNode.containerInfo;
            j.nodeType === 1 ? j.textContent = "" : j.nodeType === 9 && j.documentElement && j.removeChild(j.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(E(163));
        }
      } catch (ie) {
        vn(r, r.return, ie);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, Re = n;
        break;
      }
      Re = r.return;
    }
    return be = mh, mh = !1, be;
  }
  function js(n, r, o) {
    var u = r.updateQueue;
    if (u = u !== null ? u.lastEffect : null, u !== null) {
      var c = u = u.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && mf(r, o, d);
        }
        c = c.next;
      } while (c !== u);
    }
  }
  function Fs(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var o = r = r.next;
      do {
        if ((o.tag & n) === n) {
          var u = o.create;
          o.destroy = u();
        }
        o = o.next;
      } while (o !== r);
    }
  }
  function tp(n) {
    var r = n.ref;
    if (r !== null) {
      var o = n.stateNode;
      switch (n.tag) {
        case 5:
          n = o;
          break;
        default:
          n = o;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function yf(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, yf(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ci], delete r[vs], delete r[hs], delete r[Eu], delete r[zy])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Hs(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function ro(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Hs(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Mi(n, r, o) {
    var u = n.tag;
    if (u === 5 || u === 6) n = n.stateNode, r ? o.nodeType === 8 ? o.parentNode.insertBefore(n, r) : o.insertBefore(n, r) : (o.nodeType === 8 ? (r = o.parentNode, r.insertBefore(n, o)) : (r = o, r.appendChild(n)), o = o._reactRootContainer, o != null || r.onclick !== null || (r.onclick = Mo));
    else if (u !== 4 && (n = n.child, n !== null)) for (Mi(n, r, o), n = n.sibling; n !== null; ) Mi(n, r, o), n = n.sibling;
  }
  function Ni(n, r, o) {
    var u = n.tag;
    if (u === 5 || u === 6) n = n.stateNode, r ? o.insertBefore(n, r) : o.appendChild(n);
    else if (u !== 4 && (n = n.child, n !== null)) for (Ni(n, r, o), n = n.sibling; n !== null; ) Ni(n, r, o), n = n.sibling;
  }
  var Dn = null, zr = !1;
  function Ur(n, r, o) {
    for (o = o.child; o !== null; ) gh(n, r, o), o = o.sibling;
  }
  function gh(n, r, o) {
    if (Qr && typeof Qr.onCommitFiberUnmount == "function") try {
      Qr.onCommitFiberUnmount(To, o);
    } catch {
    }
    switch (o.tag) {
      case 5:
        br || wu(o, r);
      case 6:
        var u = Dn, c = zr;
        Dn = null, Ur(n, r, o), Dn = u, zr = c, Dn !== null && (zr ? (n = Dn, o = o.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(o) : n.removeChild(o)) : Dn.removeChild(o.stateNode));
        break;
      case 18:
        Dn !== null && (zr ? (n = Dn, o = o.stateNode, n.nodeType === 8 ? gu(n.parentNode, o) : n.nodeType === 1 && gu(n, o), ni(n)) : gu(Dn, o.stateNode));
        break;
      case 4:
        u = Dn, c = zr, Dn = o.stateNode.containerInfo, zr = !0, Ur(n, r, o), Dn = u, zr = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!br && (u = o.updateQueue, u !== null && (u = u.lastEffect, u !== null))) {
          c = u = u.next;
          do {
            var d = c, y = d.destroy;
            d = d.tag, y !== void 0 && (d & 2 || d & 4) && mf(o, r, y), c = c.next;
          } while (c !== u);
        }
        Ur(n, r, o);
        break;
      case 1:
        if (!br && (wu(o, r), u = o.stateNode, typeof u.componentWillUnmount == "function")) try {
          u.props = o.memoizedProps, u.state = o.memoizedState, u.componentWillUnmount();
        } catch (R) {
          vn(o, r, R);
        }
        Ur(n, r, o);
        break;
      case 21:
        Ur(n, r, o);
        break;
      case 22:
        o.mode & 1 ? (br = (u = br) || o.memoizedState !== null, Ur(n, r, o), br = u) : Ur(n, r, o);
        break;
      default:
        Ur(n, r, o);
    }
  }
  function Eh(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var o = n.stateNode;
      o === null && (o = n.stateNode = new Py()), r.forEach(function(u) {
        var c = Dh.bind(null, n, u);
        o.has(u) || (o.add(u), u.then(c, c));
      });
    }
  }
  function ui(n, r) {
    var o = r.deletions;
    if (o !== null) for (var u = 0; u < o.length; u++) {
      var c = o[u];
      try {
        var d = n, y = r, R = y;
        e: for (; R !== null; ) {
          switch (R.tag) {
            case 5:
              Dn = R.stateNode, zr = !1;
              break e;
            case 3:
              Dn = R.stateNode.containerInfo, zr = !0;
              break e;
            case 4:
              Dn = R.stateNode.containerInfo, zr = !0;
              break e;
          }
          R = R.return;
        }
        if (Dn === null) throw Error(E(160));
        gh(d, y, c), Dn = null, zr = !1;
        var w = c.alternate;
        w !== null && (w.return = null), c.return = null;
      } catch (V) {
        vn(c, r, V);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) np(r, n), r = r.sibling;
  }
  function np(n, r) {
    var o = n.alternate, u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ui(r, n), ra(n), u & 4) {
          try {
            js(3, n, n.return), Fs(3, n);
          } catch (ke) {
            vn(n, n.return, ke);
          }
          try {
            js(5, n, n.return);
          } catch (ke) {
            vn(n, n.return, ke);
          }
        }
        break;
      case 1:
        ui(r, n), ra(n), u & 512 && o !== null && wu(o, o.return);
        break;
      case 5:
        if (ui(r, n), ra(n), u & 512 && o !== null && wu(o, o.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            ce(c, "");
          } catch (ke) {
            vn(n, n.return, ke);
          }
        }
        if (u & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, y = o !== null ? o.memoizedProps : d, R = n.type, w = n.updateQueue;
          if (n.updateQueue = null, w !== null) try {
            R === "input" && d.type === "radio" && d.name != null && Yn(c, d), Zn(R, y);
            var V = Zn(R, d);
            for (y = 0; y < w.length; y += 2) {
              var ae = w[y], oe = w[y + 1];
              ae === "style" ? rn(c, oe) : ae === "dangerouslySetInnerHTML" ? vi(c, oe) : ae === "children" ? ce(c, oe) : Le(c, ae, oe, V);
            }
            switch (R) {
              case "input":
                Gr(c, d);
                break;
              case "textarea":
                Qa(c, d);
                break;
              case "select":
                var re = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var Se = d.value;
                Se != null ? Cn(c, !!d.multiple, Se, !1) : re !== !!d.multiple && (d.defaultValue != null ? Cn(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Cn(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[vs] = d;
          } catch (ke) {
            vn(n, n.return, ke);
          }
        }
        break;
      case 6:
        if (ui(r, n), ra(n), u & 4) {
          if (n.stateNode === null) throw Error(E(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (ke) {
            vn(n, n.return, ke);
          }
        }
        break;
      case 3:
        if (ui(r, n), ra(n), u & 4 && o !== null && o.memoizedState.isDehydrated) try {
          ni(r.containerInfo);
        } catch (ke) {
          vn(n, n.return, ke);
        }
        break;
      case 4:
        ui(r, n), ra(n);
        break;
      case 13:
        ui(r, n), ra(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (ip = it())), u & 4 && Eh(n);
        break;
      case 22:
        if (ae = o !== null && o.memoizedState !== null, n.mode & 1 ? (br = (V = br) || ae, ui(r, n), br = V) : ui(r, n), ra(n), u & 8192) {
          if (V = n.memoizedState !== null, (n.stateNode.isHidden = V) && !ae && n.mode & 1) for (Re = n, ae = n.child; ae !== null; ) {
            for (oe = Re = ae; Re !== null; ) {
              switch (re = Re, Se = re.child, re.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  js(4, re, re.return);
                  break;
                case 1:
                  wu(re, re.return);
                  var be = re.stateNode;
                  if (typeof be.componentWillUnmount == "function") {
                    u = re, o = re.return;
                    try {
                      r = u, be.props = r.memoizedProps, be.state = r.memoizedState, be.componentWillUnmount();
                    } catch (ke) {
                      vn(u, o, ke);
                    }
                  }
                  break;
                case 5:
                  wu(re, re.return);
                  break;
                case 22:
                  if (re.memoizedState !== null) {
                    Is(oe);
                    continue;
                  }
              }
              Se !== null ? (Se.return = re, Re = Se) : Is(oe);
            }
            ae = ae.sibling;
          }
          e: for (ae = null, oe = n; ; ) {
            if (oe.tag === 5) {
              if (ae === null) {
                ae = oe;
                try {
                  c = oe.stateNode, V ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (R = oe.stateNode, w = oe.memoizedProps.style, y = w != null && w.hasOwnProperty("display") ? w.display : null, R.style.display = Bt("display", y));
                } catch (ke) {
                  vn(n, n.return, ke);
                }
              }
            } else if (oe.tag === 6) {
              if (ae === null) try {
                oe.stateNode.nodeValue = V ? "" : oe.memoizedProps;
              } catch (ke) {
                vn(n, n.return, ke);
              }
            } else if ((oe.tag !== 22 && oe.tag !== 23 || oe.memoizedState === null || oe === n) && oe.child !== null) {
              oe.child.return = oe, oe = oe.child;
              continue;
            }
            if (oe === n) break e;
            for (; oe.sibling === null; ) {
              if (oe.return === null || oe.return === n) break e;
              ae === oe && (ae = null), oe = oe.return;
            }
            ae === oe && (ae = null), oe.sibling.return = oe.return, oe = oe.sibling;
          }
        }
        break;
      case 19:
        ui(r, n), ra(n), u & 4 && Eh(n);
        break;
      case 21:
        break;
      default:
        ui(
          r,
          n
        ), ra(n);
    }
  }
  function ra(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var o = n.return; o !== null; ) {
            if (Hs(o)) {
              var u = o;
              break e;
            }
            o = o.return;
          }
          throw Error(E(160));
        }
        switch (u.tag) {
          case 5:
            var c = u.stateNode;
            u.flags & 32 && (ce(c, ""), u.flags &= -33);
            var d = ro(n);
            Ni(n, d, c);
            break;
          case 3:
          case 4:
            var y = u.stateNode.containerInfo, R = ro(n);
            Mi(n, R, y);
            break;
          default:
            throw Error(E(161));
        }
      } catch (w) {
        vn(n, n.return, w);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function jy(n, r, o) {
    Re = n, rp(n);
  }
  function rp(n, r, o) {
    for (var u = (n.mode & 1) !== 0; Re !== null; ) {
      var c = Re, d = c.child;
      if (c.tag === 22 && u) {
        var y = c.memoizedState !== null || Ps;
        if (!y) {
          var R = c.alternate, w = R !== null && R.memoizedState !== null || br;
          R = Ps;
          var V = br;
          if (Ps = y, (br = w) && !V) for (Re = c; Re !== null; ) y = Re, w = y.child, y.tag === 22 && y.memoizedState !== null ? ap(c) : w !== null ? (w.return = y, Re = w) : ap(c);
          for (; d !== null; ) Re = d, rp(d), d = d.sibling;
          Re = c, Ps = R, br = V;
        }
        Sh(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, Re = d) : Sh(n);
    }
  }
  function Sh(n) {
    for (; Re !== null; ) {
      var r = Re;
      if (r.flags & 8772) {
        var o = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              br || Fs(5, r);
              break;
            case 1:
              var u = r.stateNode;
              if (r.flags & 4 && !br) if (o === null) u.componentDidMount();
              else {
                var c = r.elementType === r.type ? o.memoizedProps : li(r.type, o.memoizedProps);
                u.componentDidUpdate(c, o.memoizedState, u.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && Vd(r, d, u);
              break;
            case 3:
              var y = r.updateQueue;
              if (y !== null) {
                if (o = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    o = r.child.stateNode;
                    break;
                  case 1:
                    o = r.child.stateNode;
                }
                Vd(r, y, o);
              }
              break;
            case 5:
              var R = r.stateNode;
              if (o === null && r.flags & 4) {
                o = R;
                var w = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    w.autoFocus && o.focus();
                    break;
                  case "img":
                    w.src && (o.src = w.src);
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
              if (r.memoizedState === null) {
                var V = r.alternate;
                if (V !== null) {
                  var ae = V.memoizedState;
                  if (ae !== null) {
                    var oe = ae.dehydrated;
                    oe !== null && ni(oe);
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
              throw Error(E(163));
          }
          br || r.flags & 512 && tp(r);
        } catch (re) {
          vn(r, r.return, re);
        }
      }
      if (r === n) {
        Re = null;
        break;
      }
      if (o = r.sibling, o !== null) {
        o.return = r.return, Re = o;
        break;
      }
      Re = r.return;
    }
  }
  function Is(n) {
    for (; Re !== null; ) {
      var r = Re;
      if (r === n) {
        Re = null;
        break;
      }
      var o = r.sibling;
      if (o !== null) {
        o.return = r.return, Re = o;
        break;
      }
      Re = r.return;
    }
  }
  function ap(n) {
    for (; Re !== null; ) {
      var r = Re;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var o = r.return;
            try {
              Fs(4, r);
            } catch (w) {
              vn(r, o, w);
            }
            break;
          case 1:
            var u = r.stateNode;
            if (typeof u.componentDidMount == "function") {
              var c = r.return;
              try {
                u.componentDidMount();
              } catch (w) {
                vn(r, c, w);
              }
            }
            var d = r.return;
            try {
              tp(r);
            } catch (w) {
              vn(r, d, w);
            }
            break;
          case 5:
            var y = r.return;
            try {
              tp(r);
            } catch (w) {
              vn(r, y, w);
            }
        }
      } catch (w) {
        vn(r, r.return, w);
      }
      if (r === n) {
        Re = null;
        break;
      }
      var R = r.sibling;
      if (R !== null) {
        R.return = r.return, Re = R;
        break;
      }
      Re = r.return;
    }
  }
  var Fy = Math.ceil, Vo = Ye.ReactCurrentDispatcher, zl = Ye.ReactCurrentOwner, cr = Ye.ReactCurrentBatchConfig, Rt = 0, qn = null, Hn = null, fr = 0, Ea = 0, xu = Na(0), On = 0, Vs = null, Li = 0, Du = 0, gf = 0, Bs = null, aa = null, ip = 0, Ou = 1 / 0, Sa = null, ku = !1, Ul = null, Bo = null, Ef = !1, ao = null, Ys = 0, Yo = 0, Mu = null, $s = -1, wr = 0;
  function In() {
    return Rt & 6 ? it() : $s !== -1 ? $s : $s = it();
  }
  function Ai(n) {
    return n.mode & 1 ? Rt & 2 && fr !== 0 ? fr & -fr : Uy.transition !== null ? (wr === 0 && (wr = ru()), wr) : (n = zt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : cu(n.type)), n) : 1;
  }
  function Pr(n, r, o, u) {
    if (50 < Yo) throw Yo = 0, Mu = null, Error(E(185));
    $i(n, o, u), (!(Rt & 2) || n !== qn) && (n === qn && (!(Rt & 2) && (Du |= o), On === 4 && si(n, fr)), ia(n, u), o === 1 && Rt === 0 && !(r.mode & 1) && (Ou = it() + 500, _u && wi()));
  }
  function ia(n, r) {
    var o = n.callbackNode;
    cl(n, r);
    var u = ti(n, n === qn ? fr : 0);
    if (u === 0) o !== null && or(o), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = u & -u, n.callbackPriority !== r) {
      if (o != null && or(o), r === 1) n.tag === 0 ? Lo(op.bind(null, n)) : jc(op.bind(null, n)), yu(function() {
        !(Rt & 6) && wi();
      }), o = null;
      else {
        switch (iu(u)) {
          case 1:
            o = Ja;
            break;
          case 4:
            o = ul;
            break;
          case 16:
            o = sl;
            break;
          case 536870912:
            o = eu;
            break;
          default:
            o = sl;
        }
        o = kh(o, Sf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = o;
    }
  }
  function Sf(n, r) {
    if ($s = -1, wr = 0, Rt & 6) throw Error(E(327));
    var o = n.callbackNode;
    if (Nu() && n.callbackNode !== o) return null;
    var u = ti(n, n === qn ? fr : 0);
    if (u === 0) return null;
    if (u & 30 || u & n.expiredLanes || r) r = _f(n, u);
    else {
      r = u;
      var c = Rt;
      Rt |= 2;
      var d = Th();
      (qn !== n || fr !== r) && (Sa = null, Ou = it() + 500, io(n, r));
      do
        try {
          Rh();
          break;
        } catch (R) {
          _h(n, R);
        }
      while (!0);
      Ud(), Vo.current = d, Rt = c, Hn !== null ? r = 0 : (qn = null, fr = 0, r = On);
    }
    if (r !== 0) {
      if (r === 2 && (c = Co(n), c !== 0 && (u = c, r = Ws(n, c))), r === 1) throw o = Vs, io(n, 0), si(n, u), ia(n, it()), o;
      if (r === 6) si(n, u);
      else {
        if (c = n.current.alternate, !(u & 30) && !Hy(c) && (r = _f(n, u), r === 2 && (d = Co(n), d !== 0 && (u = d, r = Ws(n, d))), r === 1)) throw o = Vs, io(n, 0), si(n, u), ia(n, it()), o;
        switch (n.finishedWork = c, n.finishedLanes = u, r) {
          case 0:
          case 1:
            throw Error(E(345));
          case 2:
            Fl(n, aa, Sa);
            break;
          case 3:
            if (si(n, u), (u & 130023424) === u && (r = ip + 500 - it(), 10 < r)) {
              if (ti(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & u) !== u) {
                In(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = zc(Fl.bind(null, n, aa, Sa), r);
              break;
            }
            Fl(n, aa, Sa);
            break;
          case 4:
            if (si(n, u), (u & 4194240) === u) break;
            for (r = n.eventTimes, c = -1; 0 < u; ) {
              var y = 31 - Mr(u);
              d = 1 << y, y = r[y], y > c && (c = y), u &= ~d;
            }
            if (u = c, u = it() - u, u = (120 > u ? 120 : 480 > u ? 480 : 1080 > u ? 1080 : 1920 > u ? 1920 : 3e3 > u ? 3e3 : 4320 > u ? 4320 : 1960 * Fy(u / 1960)) - u, 10 < u) {
              n.timeoutHandle = zc(Fl.bind(null, n, aa, Sa), u);
              break;
            }
            Fl(n, aa, Sa);
            break;
          case 5:
            Fl(n, aa, Sa);
            break;
          default:
            throw Error(E(329));
        }
      }
    }
    return ia(n, it()), n.callbackNode === o ? Sf.bind(null, n) : null;
  }
  function Ws(n, r) {
    var o = Bs;
    return n.current.memoizedState.isDehydrated && (io(n, r).flags |= 256), n = _f(n, r), n !== 2 && (r = aa, aa = o, r !== null && Pl(r)), n;
  }
  function Pl(n) {
    aa === null ? aa = n : aa.push.apply(aa, n);
  }
  function Hy(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var o = r.updateQueue;
        if (o !== null && (o = o.stores, o !== null)) for (var u = 0; u < o.length; u++) {
          var c = o[u], d = c.getSnapshot;
          c = c.value;
          try {
            if (!ai(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (o = r.child, r.subtreeFlags & 16384 && o !== null) o.return = r, r = o;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function si(n, r) {
    for (r &= ~gf, r &= ~Du, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var o = 31 - Mr(r), u = 1 << o;
      n[o] = -1, r &= ~u;
    }
  }
  function op(n) {
    if (Rt & 6) throw Error(E(327));
    Nu();
    var r = ti(n, 0);
    if (!(r & 1)) return ia(n, it()), null;
    var o = _f(n, r);
    if (n.tag !== 0 && o === 2) {
      var u = Co(n);
      u !== 0 && (r = u, o = Ws(n, u));
    }
    if (o === 1) throw o = Vs, io(n, 0), si(n, r), ia(n, it()), o;
    if (o === 6) throw Error(E(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Fl(n, aa, Sa), ia(n, it()), null;
  }
  function lp(n, r) {
    var o = Rt;
    Rt |= 1;
    try {
      return n(r);
    } finally {
      Rt = o, Rt === 0 && (Ou = it() + 500, _u && wi());
    }
  }
  function jl(n) {
    ao !== null && ao.tag === 0 && !(Rt & 6) && Nu();
    var r = Rt;
    Rt |= 1;
    var o = cr.transition, u = zt;
    try {
      if (cr.transition = null, zt = 1, n) return n();
    } finally {
      zt = u, cr.transition = o, Rt = r, !(Rt & 6) && wi();
    }
  }
  function up() {
    Ea = xu.current, un(xu);
  }
  function io(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var o = n.timeoutHandle;
    if (o !== -1 && (n.timeoutHandle = -1, Md(o)), Hn !== null) for (o = Hn.return; o !== null; ) {
      var u = o;
      switch (Hc(u), u.tag) {
        case 1:
          u = u.type.childContextTypes, u != null && Su();
          break;
        case 3:
          wl(), un(Gn), un(Tn), Ie();
          break;
        case 5:
          Yc(u);
          break;
        case 4:
          wl();
          break;
        case 13:
          un(En);
          break;
        case 19:
          un(En);
          break;
        case 10:
          Pd(u.type._context);
          break;
        case 22:
        case 23:
          up();
      }
      o = o.return;
    }
    if (qn = n, Hn = n = $o(n.current, null), fr = Ea = r, On = 0, Vs = null, gf = Du = Li = 0, aa = Bs = null, Cl !== null) {
      for (r = 0; r < Cl.length; r++) if (o = Cl[r], u = o.interleaved, u !== null) {
        o.interleaved = null;
        var c = u.next, d = o.pending;
        if (d !== null) {
          var y = d.next;
          d.next = c, u.next = y;
        }
        o.pending = u;
      }
      Cl = null;
    }
    return n;
  }
  function _h(n, r) {
    do {
      var o = Hn;
      try {
        if (Ud(), mt.current = Nl, Wc) {
          for (var u = Pt.memoizedState; u !== null; ) {
            var c = u.queue;
            c !== null && (c.pending = null), u = u.next;
          }
          Wc = !1;
        }
        if (Jt = 0, er = Pn = Pt = null, Rs = !1, xl = 0, zl.current = null, o === null || o.return === null) {
          On = 1, Vs = r, Hn = null;
          break;
        }
        e: {
          var d = n, y = o.return, R = o, w = r;
          if (r = fr, R.flags |= 32768, w !== null && typeof w == "object" && typeof w.then == "function") {
            var V = w, ae = R, oe = ae.tag;
            if (!(ae.mode & 1) && (oe === 0 || oe === 11 || oe === 15)) {
              var re = ae.alternate;
              re ? (ae.updateQueue = re.updateQueue, ae.memoizedState = re.memoizedState, ae.lanes = re.lanes) : (ae.updateQueue = null, ae.memoizedState = null);
            }
            var Se = uh(y);
            if (Se !== null) {
              Se.flags &= -257, Io(Se, y, R, d, r), Se.mode & 1 && Kd(d, V, r), r = Se, w = V;
              var be = r.updateQueue;
              if (be === null) {
                var ke = /* @__PURE__ */ new Set();
                ke.add(w), r.updateQueue = ke;
              } else be.add(w);
              break e;
            } else {
              if (!(r & 1)) {
                Kd(d, V, r), sp();
                break e;
              }
              w = Error(E(426));
            }
          } else if (pn && R.mode & 1) {
            var kn = uh(y);
            if (kn !== null) {
              !(kn.flags & 65536) && (kn.flags |= 256), Io(kn, y, R, d, r), eo(Ll(w, R));
              break e;
            }
          }
          d = w = Ll(w, R), On !== 4 && (On = 2), Bs === null ? Bs = [d] : Bs.push(d), d = y;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var L = lh(d, w, r);
                nh(d, L);
                break e;
              case 1:
                R = w;
                var D = d.type, j = d.stateNode;
                if (!(d.flags & 128) && (typeof D.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && (Bo === null || !Bo.has(j)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var ie = qd(d, R, r);
                  nh(d, ie);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        bh(o);
      } catch (we) {
        r = we, Hn === o && o !== null && (Hn = o = o.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Th() {
    var n = Vo.current;
    return Vo.current = Nl, n === null ? Nl : n;
  }
  function sp() {
    (On === 0 || On === 3 || On === 2) && (On = 4), qn === null || !(Li & 268435455) && !(Du & 268435455) || si(qn, fr);
  }
  function _f(n, r) {
    var o = Rt;
    Rt |= 2;
    var u = Th();
    (qn !== n || fr !== r) && (Sa = null, io(n, r));
    do
      try {
        Iy();
        break;
      } catch (c) {
        _h(n, c);
      }
    while (!0);
    if (Ud(), Rt = o, Vo.current = u, Hn !== null) throw Error(E(261));
    return qn = null, fr = 0, On;
  }
  function Iy() {
    for (; Hn !== null; ) Ch(Hn);
  }
  function Rh() {
    for (; Hn !== null && !Xa(); ) Ch(Hn);
  }
  function Ch(n) {
    var r = Oh(n.alternate, n, Ea);
    n.memoizedProps = n.pendingProps, r === null ? bh(n) : Hn = r, zl.current = null;
  }
  function bh(n) {
    var r = n;
    do {
      var o = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (o = hf(o, r), o !== null) {
          o.flags &= 32767, Hn = o;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          On = 6, Hn = null;
          return;
        }
      } else if (o = hh(o, r, Ea), o !== null) {
        Hn = o;
        return;
      }
      if (r = r.sibling, r !== null) {
        Hn = r;
        return;
      }
      Hn = r = n;
    } while (r !== null);
    On === 0 && (On = 5);
  }
  function Fl(n, r, o) {
    var u = zt, c = cr.transition;
    try {
      cr.transition = null, zt = 1, Vy(n, r, o, u);
    } finally {
      cr.transition = c, zt = u;
    }
    return null;
  }
  function Vy(n, r, o, u) {
    do
      Nu();
    while (ao !== null);
    if (Rt & 6) throw Error(E(327));
    o = n.finishedWork;
    var c = n.finishedLanes;
    if (o === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, o === n.current) throw Error(E(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = o.lanes | o.childLanes;
    if (cd(n, d), n === qn && (Hn = qn = null, fr = 0), !(o.subtreeFlags & 2064) && !(o.flags & 2064) || Ef || (Ef = !0, kh(sl, function() {
      return Nu(), null;
    })), d = (o.flags & 15990) !== 0, o.subtreeFlags & 15990 || d) {
      d = cr.transition, cr.transition = null;
      var y = zt;
      zt = 1;
      var R = Rt;
      Rt |= 4, zl.current = null, yh(n, o), np(o, n), pu(El), Oa = !!ps, El = ps = null, n.current = o, jy(o), Za(), Rt = R, zt = y, cr.transition = d;
    } else n.current = o;
    if (Ef && (Ef = !1, ao = n, Ys = c), d = n.pendingLanes, d === 0 && (Bo = null), Ju(o.stateNode), ia(n, it()), r !== null) for (u = n.onRecoverableError, o = 0; o < r.length; o++) c = r[o], u(c.value, { componentStack: c.stack, digest: c.digest });
    if (ku) throw ku = !1, n = Ul, Ul = null, n;
    return Ys & 1 && n.tag !== 0 && Nu(), d = n.pendingLanes, d & 1 ? n === Mu ? Yo++ : (Yo = 0, Mu = n) : Yo = 0, wi(), null;
  }
  function Nu() {
    if (ao !== null) {
      var n = iu(Ys), r = cr.transition, o = zt;
      try {
        if (cr.transition = null, zt = 16 > n ? 16 : n, ao === null) var u = !1;
        else {
          if (n = ao, ao = null, Ys = 0, Rt & 6) throw Error(E(331));
          var c = Rt;
          for (Rt |= 4, Re = n.current; Re !== null; ) {
            var d = Re, y = d.child;
            if (Re.flags & 16) {
              var R = d.deletions;
              if (R !== null) {
                for (var w = 0; w < R.length; w++) {
                  var V = R[w];
                  for (Re = V; Re !== null; ) {
                    var ae = Re;
                    switch (ae.tag) {
                      case 0:
                      case 11:
                      case 15:
                        js(8, ae, d);
                    }
                    var oe = ae.child;
                    if (oe !== null) oe.return = ae, Re = oe;
                    else for (; Re !== null; ) {
                      ae = Re;
                      var re = ae.sibling, Se = ae.return;
                      if (yf(ae), ae === V) {
                        Re = null;
                        break;
                      }
                      if (re !== null) {
                        re.return = Se, Re = re;
                        break;
                      }
                      Re = Se;
                    }
                  }
                }
                var be = d.alternate;
                if (be !== null) {
                  var ke = be.child;
                  if (ke !== null) {
                    be.child = null;
                    do {
                      var kn = ke.sibling;
                      ke.sibling = null, ke = kn;
                    } while (ke !== null);
                  }
                }
                Re = d;
              }
            }
            if (d.subtreeFlags & 2064 && y !== null) y.return = d, Re = y;
            else e: for (; Re !== null; ) {
              if (d = Re, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  js(9, d, d.return);
              }
              var L = d.sibling;
              if (L !== null) {
                L.return = d.return, Re = L;
                break e;
              }
              Re = d.return;
            }
          }
          var D = n.current;
          for (Re = D; Re !== null; ) {
            y = Re;
            var j = y.child;
            if (y.subtreeFlags & 2064 && j !== null) j.return = y, Re = j;
            else e: for (y = D; Re !== null; ) {
              if (R = Re, R.flags & 2048) try {
                switch (R.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Fs(9, R);
                }
              } catch (we) {
                vn(R, R.return, we);
              }
              if (R === y) {
                Re = null;
                break e;
              }
              var ie = R.sibling;
              if (ie !== null) {
                ie.return = R.return, Re = ie;
                break e;
              }
              Re = R.return;
            }
          }
          if (Rt = c, wi(), Qr && typeof Qr.onPostCommitFiberRoot == "function") try {
            Qr.onPostCommitFiberRoot(To, n);
          } catch {
          }
          u = !0;
        }
        return u;
      } finally {
        zt = o, cr.transition = r;
      }
    }
    return !1;
  }
  function wh(n, r, o) {
    r = Ll(o, r), r = lh(n, r, 1), n = jo(n, r, 1), r = In(), n !== null && ($i(n, 1, r), ia(n, r));
  }
  function vn(n, r, o) {
    if (n.tag === 3) wh(n, n, o);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        wh(r, n, o);
        break;
      } else if (r.tag === 1) {
        var u = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (Bo === null || !Bo.has(u))) {
          n = Ll(o, n), n = qd(r, n, 1), r = jo(r, n, 1), n = In(), r !== null && ($i(r, 1, n), ia(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function By(n, r, o) {
    var u = n.pingCache;
    u !== null && u.delete(r), r = In(), n.pingedLanes |= n.suspendedLanes & o, qn === n && (fr & o) === o && (On === 4 || On === 3 && (fr & 130023424) === fr && 500 > it() - ip ? io(n, 0) : gf |= o), ia(n, r);
  }
  function xh(n, r) {
    r === 0 && (n.mode & 1 ? (r = va, va <<= 1, !(va & 130023424) && (va = 4194304)) : r = 1);
    var o = In();
    n = ya(n, r), n !== null && ($i(n, r, o), ia(n, o));
  }
  function Yy(n) {
    var r = n.memoizedState, o = 0;
    r !== null && (o = r.retryLane), xh(n, o);
  }
  function Dh(n, r) {
    var o = 0;
    switch (n.tag) {
      case 13:
        var u = n.stateNode, c = n.memoizedState;
        c !== null && (o = c.retryLane);
        break;
      case 19:
        u = n.stateNode;
        break;
      default:
        throw Error(E(314));
    }
    u !== null && u.delete(r), xh(n, o);
  }
  var Oh;
  Oh = function(n, r, o) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Gn.current) jn = !0;
    else {
      if (!(n.lanes & o) && !(r.flags & 128)) return jn = !1, zs(n, r, o);
      jn = !!(n.flags & 131072);
    }
    else jn = !1, pn && r.flags & 1048576 && Zv(r, Ji, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var u = r.type;
        Ua(n, r), n = r.pendingProps;
        var c = Xr(r, Tn.current);
        gn(r, o), c = Fo(null, r, u, n, c, o);
        var d = oi();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, zn(u) ? (d = !0, Jn(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Id(r), c.updater = cf, r.stateNode = c, c._reactInternals = r, ks(r, u, n, o), r = Ls(null, r, u, !0, d, o)) : (r.tag = 0, pn && d && Fc(r), sr(null, r, c, o), r = r.child), r;
      case 16:
        u = r.elementType;
        e: {
          switch (Ua(n, r), n = r.pendingProps, c = u._init, u = c(u._payload), r.type = u, c = r.tag = Wy(u), n = li(u, n), c) {
            case 0:
              r = sh(null, r, u, n, o);
              break e;
            case 1:
              r = ch(null, r, u, n, o);
              break e;
            case 11:
              r = na(null, r, u, n, o);
              break e;
            case 14:
              r = Al(null, r, u, li(u.type, n), o);
              break e;
          }
          throw Error(E(
            306,
            u,
            ""
          ));
        }
        return r;
      case 0:
        return u = r.type, c = r.pendingProps, c = r.elementType === u ? c : li(u, c), sh(n, r, u, c, o);
      case 1:
        return u = r.type, c = r.pendingProps, c = r.elementType === u ? c : li(u, c), ch(n, r, u, c, o);
      case 3:
        e: {
          if (bu(r), n === null) throw Error(E(387));
          u = r.pendingProps, d = r.memoizedState, c = d.element, th(n, r), gs(r, u, null, o);
          var y = r.memoizedState;
          if (u = y.element, d.isDehydrated) if (d = { element: u, isDehydrated: !1, cache: y.cache, pendingSuspenseBoundaries: y.pendingSuspenseBoundaries, transitions: y.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = Ll(Error(E(423)), r), r = fh(n, r, u, o, c);
            break e;
          } else if (u !== c) {
            c = Ll(Error(E(424)), r), r = fh(n, r, u, o, c);
            break e;
          } else for (Jr = Ri(r.stateNode.containerInfo.firstChild), Zr = r, pn = !0, Aa = null, o = ye(r, null, u, o), r.child = o; o; ) o.flags = o.flags & -3 | 4096, o = o.sibling;
          else {
            if (Po(), u === c) {
              r = Pa(n, r, o);
              break e;
            }
            sr(n, r, u, o);
          }
          r = r.child;
        }
        return r;
      case 5:
        return rh(r), n === null && Ad(r), u = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, y = c.children, Ac(u, c) ? y = null : d !== null && Ac(u, d) && (r.flags |= 32), Xd(n, r), sr(n, r, y, o), r.child;
      case 6:
        return n === null && Ad(r), null;
      case 13:
        return vf(n, r, o);
      case 4:
        return Bd(r, r.stateNode.containerInfo), u = r.pendingProps, n === null ? r.child = wn(r, null, u, o) : sr(n, r, u, o), r.child;
      case 11:
        return u = r.type, c = r.pendingProps, c = r.elementType === u ? c : li(u, c), na(n, r, u, c, o);
      case 7:
        return sr(n, r, r.pendingProps, o), r.child;
      case 8:
        return sr(n, r, r.pendingProps.children, o), r.child;
      case 12:
        return sr(n, r, r.pendingProps.children, o), r.child;
      case 10:
        e: {
          if (u = r.type._context, c = r.pendingProps, d = r.memoizedProps, y = c.value, Pe(ma, u._currentValue), u._currentValue = y, d !== null) if (ai(d.value, y)) {
            if (d.children === c.children && !Gn.current) {
              r = Pa(n, r, o);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var R = d.dependencies;
            if (R !== null) {
              y = d.child;
              for (var w = R.firstContext; w !== null; ) {
                if (w.context === u) {
                  if (d.tag === 1) {
                    w = to(-1, o & -o), w.tag = 2;
                    var V = d.updateQueue;
                    if (V !== null) {
                      V = V.shared;
                      var ae = V.pending;
                      ae === null ? w.next = w : (w.next = ae.next, ae.next = w), V.pending = w;
                    }
                  }
                  d.lanes |= o, w = d.alternate, w !== null && (w.lanes |= o), jd(
                    d.return,
                    o,
                    r
                  ), R.lanes |= o;
                  break;
                }
                w = w.next;
              }
            } else if (d.tag === 10) y = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (y = d.return, y === null) throw Error(E(341));
              y.lanes |= o, R = y.alternate, R !== null && (R.lanes |= o), jd(y, o, r), y = d.sibling;
            } else y = d.child;
            if (y !== null) y.return = d;
            else for (y = d; y !== null; ) {
              if (y === r) {
                y = null;
                break;
              }
              if (d = y.sibling, d !== null) {
                d.return = y.return, y = d;
                break;
              }
              y = y.return;
            }
            d = y;
          }
          sr(n, r, c.children, o), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, u = r.pendingProps.children, gn(r, o), c = za(c), u = u(c), r.flags |= 1, sr(n, r, u, o), r.child;
      case 14:
        return u = r.type, c = li(u, r.pendingProps), c = li(u.type, c), Al(n, r, u, c, o);
      case 15:
        return ot(n, r, r.type, r.pendingProps, o);
      case 17:
        return u = r.type, c = r.pendingProps, c = r.elementType === u ? c : li(u, c), Ua(n, r), r.tag = 1, zn(u) ? (n = !0, Jn(r)) : n = !1, gn(r, o), ff(r, u, c), ks(r, u, c, o), Ls(null, r, u, !0, n, o);
      case 19:
        return ki(n, r, o);
      case 22:
        return Ns(n, r, o);
    }
    throw Error(E(156, r.tag));
  };
  function kh(n, r) {
    return cn(n, r);
  }
  function $y(n, r, o, u) {
    this.tag = n, this.key = o, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Fa(n, r, o, u) {
    return new $y(n, r, o, u);
  }
  function cp(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function Wy(n) {
    if (typeof n == "function") return cp(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === _t) return 11;
      if (n === Nt) return 14;
    }
    return 2;
  }
  function $o(n, r) {
    var o = n.alternate;
    return o === null ? (o = Fa(n.tag, r, n.key, n.mode), o.elementType = n.elementType, o.type = n.type, o.stateNode = n.stateNode, o.alternate = n, n.alternate = o) : (o.pendingProps = r, o.type = n.type, o.flags = 0, o.subtreeFlags = 0, o.deletions = null), o.flags = n.flags & 14680064, o.childLanes = n.childLanes, o.lanes = n.lanes, o.child = n.child, o.memoizedProps = n.memoizedProps, o.memoizedState = n.memoizedState, o.updateQueue = n.updateQueue, r = n.dependencies, o.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, o.sibling = n.sibling, o.index = n.index, o.ref = n.ref, o;
  }
  function Gs(n, r, o, u, c, d) {
    var y = 2;
    if (u = n, typeof n == "function") cp(n) && (y = 1);
    else if (typeof n == "string") y = 5;
    else e: switch (n) {
      case je:
        return oo(o.children, c, d, r);
      case wt:
        y = 8, c |= 8;
        break;
      case xt:
        return n = Fa(12, o, r, c | 2), n.elementType = xt, n.lanes = d, n;
      case Fe:
        return n = Fa(13, o, r, c), n.elementType = Fe, n.lanes = d, n;
      case Vt:
        return n = Fa(19, o, r, c), n.elementType = Vt, n.lanes = d, n;
      case Ne:
        return Wo(o, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case kt:
            y = 10;
            break e;
          case Mt:
            y = 9;
            break e;
          case _t:
            y = 11;
            break e;
          case Nt:
            y = 14;
            break e;
          case At:
            y = 16, u = null;
            break e;
        }
        throw Error(E(130, n == null ? n : typeof n, ""));
    }
    return r = Fa(y, o, r, c), r.elementType = n, r.type = u, r.lanes = d, r;
  }
  function oo(n, r, o, u) {
    return n = Fa(7, n, u, r), n.lanes = o, n;
  }
  function Wo(n, r, o, u) {
    return n = Fa(22, n, u, r), n.elementType = Ne, n.lanes = o, n.stateNode = { isHidden: !1 }, n;
  }
  function fp(n, r, o) {
    return n = Fa(6, n, null, r), n.lanes = o, n;
  }
  function Tf(n, r, o) {
    return r = Fa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = o, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Mh(n, r, o, u, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = au(0), this.expirationTimes = au(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = au(0), this.identifierPrefix = u, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function Rf(n, r, o, u, c, d, y, R, w) {
    return n = new Mh(n, r, o, R, w), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Fa(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: u, isDehydrated: o, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Id(d), n;
  }
  function Gy(n, r, o) {
    var u = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Je, key: u == null ? null : "" + u, children: n, containerInfo: r, implementation: o };
  }
  function dp(n) {
    if (!n) return Rr;
    n = n._reactInternals;
    e: {
      if (at(n) !== n || n.tag !== 1) throw Error(E(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (zn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(E(171));
    }
    if (n.tag === 1) {
      var o = n.type;
      if (zn(o)) return ms(n, o, r);
    }
    return r;
  }
  function Nh(n, r, o, u, c, d, y, R, w) {
    return n = Rf(o, u, !0, n, c, d, y, R, w), n.context = dp(null), o = n.current, u = In(), c = Ai(o), d = to(u, c), d.callback = r ?? null, jo(o, d, c), n.current.lanes = c, $i(n, c, u), ia(n, u), n;
  }
  function Cf(n, r, o, u) {
    var c = r.current, d = In(), y = Ai(c);
    return o = dp(o), r.context === null ? r.context = o : r.pendingContext = o, r = to(d, y), r.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (r.callback = u), n = jo(c, r, y), n !== null && (Pr(n, c, y, d), Bc(n, c, y)), y;
  }
  function bf(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function pp(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var o = n.retryLane;
      n.retryLane = o !== 0 && o < r ? o : r;
    }
  }
  function wf(n, r) {
    pp(n, r), (n = n.alternate) && pp(n, r);
  }
  function Lh() {
    return null;
  }
  var Hl = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function vp(n) {
    this._internalRoot = n;
  }
  xf.prototype.render = vp.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(E(409));
    Cf(n, r, null, null);
  }, xf.prototype.unmount = vp.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      jl(function() {
        Cf(null, n, null, null);
      }), r[Xi] = null;
    }
  };
  function xf(n) {
    this._internalRoot = n;
  }
  xf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = et();
      n = { blockedOn: null, target: n, priority: r };
      for (var o = 0; o < Wn.length && r !== 0 && r < Wn[o].priority; o++) ;
      Wn.splice(o, 0, n), o === 0 && ns(n);
    }
  };
  function hp(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Df(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Ah() {
  }
  function Qy(n, r, o, u, c) {
    if (c) {
      if (typeof u == "function") {
        var d = u;
        u = function() {
          var V = bf(y);
          d.call(V);
        };
      }
      var y = Nh(r, u, n, 0, null, !1, !1, "", Ah);
      return n._reactRootContainer = y, n[Xi] = y.current, hu(n.nodeType === 8 ? n.parentNode : n), jl(), y;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof u == "function") {
      var R = u;
      u = function() {
        var V = bf(w);
        R.call(V);
      };
    }
    var w = Rf(n, 0, !1, null, null, !1, !1, "", Ah);
    return n._reactRootContainer = w, n[Xi] = w.current, hu(n.nodeType === 8 ? n.parentNode : n), jl(function() {
      Cf(r, w, o, u);
    }), w;
  }
  function Qs(n, r, o, u, c) {
    var d = o._reactRootContainer;
    if (d) {
      var y = d;
      if (typeof c == "function") {
        var R = c;
        c = function() {
          var w = bf(y);
          R.call(w);
        };
      }
      Cf(r, y, n, c);
    } else y = Qy(o, r, n, c, u);
    return bf(y);
  }
  Dt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var o = ei(r.pendingLanes);
          o !== 0 && (Wi(r, o | 1), ia(r, it()), !(Rt & 6) && (Ou = it() + 500, wi()));
        }
        break;
      case 13:
        jl(function() {
          var u = ya(n, 1);
          if (u !== null) {
            var c = In();
            Pr(u, n, 1, c);
          }
        }), wf(n, 1);
    }
  }, es = function(n) {
    if (n.tag === 13) {
      var r = ya(n, 134217728);
      if (r !== null) {
        var o = In();
        Pr(r, n, 134217728, o);
      }
      wf(n, 134217728);
    }
  }, gi = function(n) {
    if (n.tag === 13) {
      var r = Ai(n), o = ya(n, r);
      if (o !== null) {
        var u = In();
        Pr(o, n, r, u);
      }
      wf(n, r);
    }
  }, et = function() {
    return zt;
  }, ou = function(n, r) {
    var o = zt;
    try {
      return zt = n, r();
    } finally {
      zt = o;
    }
  }, qt = function(n, r, o) {
    switch (r) {
      case "input":
        if (Gr(n, o), r = o.name, o.type === "radio" && r != null) {
          for (o = n; o.parentNode; ) o = o.parentNode;
          for (o = o.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < o.length; r++) {
            var u = o[r];
            if (u !== n && u.form === n.form) {
              var c = yn(u);
              if (!c) throw Error(E(90));
              Dr(u), Gr(u, c);
            }
          }
        }
        break;
      case "textarea":
        Qa(n, o);
        break;
      case "select":
        r = o.value, r != null && Cn(n, !!o.multiple, r, !1);
    }
  }, ol = lp, Eo = jl;
  var qy = { usingClientEntryPoint: !1, Events: [He, ii, yn, Yi, il, lp] }, qs = { findFiberByHostInstance: Sl, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, zh = { bundleType: qs.bundleType, version: qs.version, rendererPackageName: qs.rendererPackageName, rendererConfig: qs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Ye.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = bn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: qs.findFiberByHostInstance || Lh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Go = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Go.isDisabled && Go.supportsFiber) try {
      To = Go.inject(zh), Qr = Go;
    } catch {
    }
  }
  return $a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = qy, $a.createPortal = function(n, r) {
    var o = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!hp(r)) throw Error(E(200));
    return Gy(n, r, null, o);
  }, $a.createRoot = function(n, r) {
    if (!hp(n)) throw Error(E(299));
    var o = !1, u = "", c = Hl;
    return r != null && (r.unstable_strictMode === !0 && (o = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = Rf(n, 1, !1, null, null, o, !1, u, c), n[Xi] = r.current, hu(n.nodeType === 8 ? n.parentNode : n), new vp(r);
  }, $a.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(E(188)) : (n = Object.keys(n).join(","), Error(E(268, n)));
    return n = bn(r), n = n === null ? null : n.stateNode, n;
  }, $a.flushSync = function(n) {
    return jl(n);
  }, $a.hydrate = function(n, r, o) {
    if (!Df(r)) throw Error(E(200));
    return Qs(null, n, r, !0, o);
  }, $a.hydrateRoot = function(n, r, o) {
    if (!hp(n)) throw Error(E(405));
    var u = o != null && o.hydratedSources || null, c = !1, d = "", y = Hl;
    if (o != null && (o.unstable_strictMode === !0 && (c = !0), o.identifierPrefix !== void 0 && (d = o.identifierPrefix), o.onRecoverableError !== void 0 && (y = o.onRecoverableError)), r = Nh(r, null, n, 1, o ?? null, c, !1, d, y), n[Xi] = r.current, hu(n), u) for (n = 0; n < u.length; n++) o = u[n], c = o._getVersion, c = c(o._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [o, c] : r.mutableSourceEagerHydrationData.push(
      o,
      c
    );
    return new xf(r);
  }, $a.render = function(n, r, o) {
    if (!Df(r)) throw Error(E(200));
    return Qs(null, n, r, !1, o);
  }, $a.unmountComponentAtNode = function(n) {
    if (!Df(n)) throw Error(E(40));
    return n._reactRootContainer ? (jl(function() {
      Qs(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Xi] = null;
      });
    }), !0) : !1;
  }, $a.unstable_batchedUpdates = lp, $a.unstable_renderSubtreeIntoContainer = function(n, r, o, u) {
    if (!Df(o)) throw Error(E(200));
    if (n == null || n._reactInternals === void 0) throw Error(E(38));
    return Qs(n, r, o, !1, u);
  }, $a.version = "18.3.1-next-f1338f8080-20240426", $a;
}
var Wa = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $C;
function _O() {
  return $C || ($C = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var T = Gt, m = ob(), E = T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, M = !1;
    function $(e) {
      M = e;
    }
    function A(e) {
      if (!M) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        ee("warn", e, a);
      }
    }
    function g(e) {
      if (!M) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        ee("error", e, a);
      }
    }
    function ee(e, t, a) {
      {
        var i = E.ReactDebugCurrentFrame, l = i.getStackAddendum();
        l !== "" && (t += "%s", a = a.concat([l]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var P = 0, K = 1, B = 2, F = 3, W = 4, N = 5, X = 6, fe = 7, he = 8, Me = 9, De = 10, Le = 11, Ye = 12, Oe = 13, Je = 14, je = 15, wt = 16, xt = 17, kt = 18, Mt = 19, _t = 21, Fe = 22, Vt = 23, Nt = 24, At = 25, Ne = !0, se = !1, Ae = !1, pe = !1, k = !1, Z = !0, Ke = !0, Qe = !0, pt = !0, st = /* @__PURE__ */ new Set(), lt = {}, ct = {};
    function vt(e, t) {
      Wt(e, t), Wt(e + "Capture", t);
    }
    function Wt(e, t) {
      lt[e] && g("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), lt[e] = t;
      {
        var a = e.toLowerCase();
        ct[a] = e, e === "onDoubleClick" && (ct.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        st.add(t[i]);
    }
    var Nn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Dr = Object.prototype.hasOwnProperty;
    function Rn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function ar(e) {
      try {
        return Bn(e), !1;
      } catch {
        return !0;
      }
    }
    function Bn(e) {
      return "" + e;
    }
    function Yn(e, t) {
      if (ar(e))
        return g("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Rn(e)), Bn(e);
    }
    function Gr(e) {
      if (ar(e))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Rn(e)), Bn(e);
    }
    function pi(e, t) {
      if (ar(e))
        return g("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Rn(e)), Bn(e);
    }
    function fa(e, t) {
      if (ar(e))
        return g("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Rn(e)), Bn(e);
    }
    function Xn(e) {
      if (ar(e))
        return g("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Rn(e)), Bn(e);
    }
    function Cn(e) {
      if (ar(e))
        return g("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Rn(e)), Bn(e);
    }
    var $n = 0, Sr = 1, Qa = 2, Ln = 3, _r = 4, da = 5, qa = 6, vi = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ce = vi + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", ze = new RegExp("^[" + vi + "][" + ce + "]*$"), ft = {}, Bt = {};
    function rn(e) {
      return Dr.call(Bt, e) ? !0 : Dr.call(ft, e) ? !1 : ze.test(e) ? (Bt[e] = !0, !0) : (ft[e] = !0, g("Invalid attribute name: `%s`", e), !1);
    }
    function hn(e, t, a) {
      return t !== null ? t.type === $n : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function sn(e, t, a, i) {
      if (a !== null && a.type === $n)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var l = e.toLowerCase().slice(0, 5);
          return l !== "data-" && l !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Zn(e, t, a, i) {
      if (t === null || typeof t > "u" || sn(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Ln:
            return !t;
          case _r:
            return t === !1;
          case da:
            return isNaN(t);
          case qa:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function an(e) {
      return qt.hasOwnProperty(e) ? qt[e] : null;
    }
    function Qt(e, t, a, i, l, s, f) {
      this.acceptsBooleans = t === Qa || t === Ln || t === _r, this.attributeName = i, this.attributeNamespace = l, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var qt = {}, pa = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    pa.forEach(function(e) {
      qt[e] = new Qt(
        e,
        $n,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      qt[t] = new Qt(
        t,
        Sr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      qt[e] = new Qt(
        e,
        Qa,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      qt[e] = new Qt(
        e,
        Qa,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      qt[e] = new Qt(
        e,
        Ln,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      qt[e] = new Qt(
        e,
        Ln,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      qt[e] = new Qt(
        e,
        _r,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      qt[e] = new Qt(
        e,
        qa,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      qt[e] = new Qt(
        e,
        da,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Tr = /[\-\:]([a-z])/g, wa = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Tr, wa);
      qt[t] = new Qt(
        t,
        Sr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Tr, wa);
      qt[t] = new Qt(
        t,
        Sr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Tr, wa);
      qt[t] = new Qt(
        t,
        Sr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      qt[e] = new Qt(
        e,
        Sr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Yi = "xlinkHref";
    qt[Yi] = new Qt(
      "xlinkHref",
      Sr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      qt[e] = new Qt(
        e,
        Sr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var il = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, ol = !1;
    function Eo(e) {
      !ol && il.test(e) && (ol = !0, g("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function So(e, t, a, i) {
      if (i.mustUseProperty) {
        var l = i.propertyName;
        return e[l];
      } else {
        Yn(a, t), i.sanitizeURL && Eo("" + a);
        var s = i.attributeName, f = null;
        if (i.type === _r) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : Zn(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (Zn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === Ln)
            return a;
          f = e.getAttribute(s);
        }
        return Zn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function ll(e, t, a, i) {
      {
        if (!rn(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var l = e.getAttribute(t);
        return Yn(a, t), l === "" + a ? a : l;
      }
    }
    function Or(e, t, a, i) {
      var l = an(t);
      if (!hn(t, l, i)) {
        if (Zn(t, a, l, i) && (a = null), i || l === null) {
          if (rn(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Yn(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = l.mustUseProperty;
        if (f) {
          var p = l.propertyName;
          if (a === null) {
            var v = l.type;
            e[p] = v === Ln ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var S = l.attributeName, _ = l.attributeNamespace;
        if (a === null)
          e.removeAttribute(S);
        else {
          var O = l.type, x;
          O === Ln || O === _r && a === !0 ? x = "" : (Yn(a, S), x = "" + a, l.sanitizeURL && Eo(x.toString())), _ ? e.setAttributeNS(_, S, x) : e.setAttribute(S, x);
        }
      }
    }
    var kr = Symbol.for("react.element"), ir = Symbol.for("react.portal"), hi = Symbol.for("react.fragment"), Ka = Symbol.for("react.strict_mode"), mi = Symbol.for("react.profiler"), yi = Symbol.for("react.provider"), b = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), me = Symbol.for("react.suspense"), Ce = Symbol.for("react.suspense_list"), at = Symbol.for("react.memo"), tt = Symbol.for("react.lazy"), yt = Symbol.for("react.scope"), ht = Symbol.for("react.debug_trace_mode"), bn = Symbol.for("react.offscreen"), on = Symbol.for("react.legacy_hidden"), cn = Symbol.for("react.cache"), or = Symbol.for("react.tracing_marker"), Xa = Symbol.iterator, Za = "@@iterator";
    function it(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Xa && e[Xa] || e[Za];
      return typeof t == "function" ? t : null;
    }
    var ut = Object.assign, Ja = 0, ul, sl, _o, eu, To, Qr, Ju;
    function Mr() {
    }
    Mr.__reactDisabledLog = !0;
    function Ec() {
      {
        if (Ja === 0) {
          ul = console.log, sl = console.info, _o = console.warn, eu = console.error, To = console.group, Qr = console.groupCollapsed, Ju = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Mr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Ja++;
      }
    }
    function Sc() {
      {
        if (Ja--, Ja === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ut({}, e, {
              value: ul
            }),
            info: ut({}, e, {
              value: sl
            }),
            warn: ut({}, e, {
              value: _o
            }),
            error: ut({}, e, {
              value: eu
            }),
            group: ut({}, e, {
              value: To
            }),
            groupCollapsed: ut({}, e, {
              value: Qr
            }),
            groupEnd: ut({}, e, {
              value: Ju
            })
          });
        }
        Ja < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var tu = E.ReactCurrentDispatcher, Ro;
    function va(e, t, a) {
      {
        if (Ro === void 0)
          try {
            throw Error();
          } catch (l) {
            var i = l.stack.trim().match(/\n( *(at )?)/);
            Ro = i && i[1] || "";
          }
        return `
` + Ro + e;
      }
    }
    var ei = !1, ti;
    {
      var nu = typeof WeakMap == "function" ? WeakMap : Map;
      ti = new nu();
    }
    function cl(e, t) {
      if (!e || ei)
        return "";
      {
        var a = ti.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      ei = !0;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = tu.current, tu.current = null, Ec();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (Y) {
              i = Y;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (Y) {
              i = Y;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Y) {
            i = Y;
          }
          e();
        }
      } catch (Y) {
        if (Y && i && typeof Y.stack == "string") {
          for (var p = Y.stack.split(`
`), v = i.stack.split(`
`), S = p.length - 1, _ = v.length - 1; S >= 1 && _ >= 0 && p[S] !== v[_]; )
            _--;
          for (; S >= 1 && _ >= 0; S--, _--)
            if (p[S] !== v[_]) {
              if (S !== 1 || _ !== 1)
                do
                  if (S--, _--, _ < 0 || p[S] !== v[_]) {
                    var O = `
` + p[S].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && ti.set(e, O), O;
                  }
                while (S >= 1 && _ >= 0);
              break;
            }
        }
      } finally {
        ei = !1, tu.current = s, Sc(), Error.prepareStackTrace = l;
      }
      var x = e ? e.displayName || e.name : "", H = x ? va(x) : "";
      return typeof e == "function" && ti.set(e, H), H;
    }
    function Co(e, t, a) {
      return cl(e, !0);
    }
    function ru(e, t, a) {
      return cl(e, !1);
    }
    function au(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function $i(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return cl(e, au(e));
      if (typeof e == "string")
        return va(e);
      switch (e) {
        case me:
          return va("Suspense");
        case Ce:
          return va("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case te:
            return ru(e.render);
          case at:
            return $i(e.type, t, a);
          case tt: {
            var i = e, l = i._payload, s = i._init;
            try {
              return $i(s(l), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function cd(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case N:
          return va(e.type);
        case wt:
          return va("Lazy");
        case Oe:
          return va("Suspense");
        case Mt:
          return va("SuspenseList");
        case P:
        case B:
        case je:
          return ru(e.type);
        case Le:
          return ru(e.type.render);
        case K:
          return Co(e.type);
        default:
          return "";
      }
    }
    function Wi(e) {
      try {
        var t = "", a = e;
        do
          t += cd(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function zt(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var l = t.displayName || t.name || "";
      return l !== "" ? a + "(" + l + ")" : a;
    }
    function iu(e) {
      return e.displayName || "Context";
    }
    function Dt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case hi:
          return "Fragment";
        case ir:
          return "Portal";
        case mi:
          return "Profiler";
        case Ka:
          return "StrictMode";
        case me:
          return "Suspense";
        case Ce:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case b:
            var t = e;
            return iu(t) + ".Consumer";
          case yi:
            var a = e;
            return iu(a._context) + ".Provider";
          case te:
            return zt(e, e.render, "ForwardRef");
          case at:
            var i = e.displayName || null;
            return i !== null ? i : Dt(e.type) || "Memo";
          case tt: {
            var l = e, s = l._payload, f = l._init;
            try {
              return Dt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function es(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function gi(e) {
      return e.displayName || "Context";
    }
    function et(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case Nt:
          return "Cache";
        case Me:
          var i = a;
          return gi(i) + ".Consumer";
        case De:
          var l = a;
          return gi(l._context) + ".Provider";
        case kt:
          return "DehydratedFragment";
        case Le:
          return es(a, a.render, "ForwardRef");
        case fe:
          return "Fragment";
        case N:
          return a;
        case W:
          return "Portal";
        case F:
          return "Root";
        case X:
          return "Text";
        case wt:
          return Dt(a);
        case he:
          return a === Ka ? "StrictMode" : "Mode";
        case Fe:
          return "Offscreen";
        case Ye:
          return "Profiler";
        case _t:
          return "Scope";
        case Oe:
          return "Suspense";
        case Mt:
          return "SuspenseList";
        case At:
          return "TracingMarker";
        case K:
        case P:
        case xt:
        case B:
        case Je:
        case je:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var ou = E.ReactDebugCurrentFrame, lr = null, Ei = !1;
    function Nr() {
      {
        if (lr === null)
          return null;
        var e = lr._debugOwner;
        if (e !== null && typeof e < "u")
          return et(e);
      }
      return null;
    }
    function Si() {
      return lr === null ? "" : Wi(lr);
    }
    function fn() {
      ou.getCurrentStack = null, lr = null, Ei = !1;
    }
    function Kt(e) {
      ou.getCurrentStack = e === null ? null : Si, lr = e, Ei = !1;
    }
    function bo() {
      return lr;
    }
    function Wn(e) {
      Ei = e;
    }
    function Lr(e) {
      return "" + e;
    }
    function xa(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Cn(e), e;
        default:
          return "";
      }
    }
    var fl = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function ts(e, t) {
      fl[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || g("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || g("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function ns(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function wo(e) {
      return e._valueTracker;
    }
    function dl(e) {
      e._valueTracker = null;
    }
    function fd(e) {
      var t = "";
      return e && (ns(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Da(e) {
      var t = ns(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Cn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var l = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return l.call(this);
          },
          set: function(p) {
            Cn(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            Cn(p), i = "" + p;
          },
          stopTracking: function() {
            dl(e), delete e[t];
          }
        };
        return f;
      }
    }
    function ni(e) {
      wo(e) || (e._valueTracker = Da(e));
    }
    function _i(e) {
      if (!e)
        return !1;
      var t = wo(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = fd(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function Oa(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var lu = !1, uu = !1, xo = !1, pl = !1;
    function su(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function cu(e, t) {
      var a = e, i = t.checked, l = ut({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return l;
    }
    function ri(e, t) {
      ts("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !uu && (g("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Nr() || "A component", t.type), uu = !0), t.value !== void 0 && t.defaultValue !== void 0 && !lu && (g("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Nr() || "A component", t.type), lu = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: xa(t.value != null ? t.value : i),
        controlled: su(t)
      };
    }
    function h(e, t) {
      var a = e, i = t.checked;
      i != null && Or(a, "checked", i, !1);
    }
    function C(e, t) {
      var a = e;
      {
        var i = su(t);
        !a._wrapperState.controlled && i && !pl && (g("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), pl = !0), a._wrapperState.controlled && !i && !xo && (g("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), xo = !0);
      }
      h(e, t);
      var l = xa(t.value), s = t.type;
      if (l != null)
        s === "number" ? (l === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != l) && (a.value = Lr(l)) : a.value !== Lr(l) && (a.value = Lr(l));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Ve(a, t.type, l) : t.hasOwnProperty("defaultValue") && Ve(a, t.type, xa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function I(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var l = t.type, s = l === "submit" || l === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = Lr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function G(e, t) {
      var a = e;
      C(a, t), ue(a, t);
    }
    function ue(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Yn(a, "name");
        for (var l = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < l.length; s++) {
          var f = l[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Jh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            _i(f), C(f, p);
          }
        }
      }
    }
    function Ve(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Oa(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Lr(e._wrapperState.initialValue) : e.defaultValue !== Lr(a) && (e.defaultValue = Lr(a)));
    }
    var ve = !1, We = !1, gt = !1;
    function Ot(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? T.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || We || (We = !0, g("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (gt || (gt = !0, g("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ve && (g("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ve = !0);
    }
    function ln(e, t) {
      t.value != null && e.setAttribute("value", Lr(xa(t.value)));
    }
    var Xt = Array.isArray;
    function dt(e) {
      return Xt(e);
    }
    var Zt;
    Zt = !1;
    function mn() {
      var e = Nr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Do = ["value", "defaultValue"];
    function rs(e) {
      {
        ts("select", e);
        for (var t = 0; t < Do.length; t++) {
          var a = Do[t];
          if (e[a] != null) {
            var i = dt(e[a]);
            e.multiple && !i ? g("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, mn()) : !e.multiple && i && g("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, mn());
          }
        }
      }
    }
    function Gi(e, t, a, i) {
      var l = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < l.length; v++) {
          var S = f.hasOwnProperty("$" + l[v].value);
          l[v].selected !== S && (l[v].selected = S), S && i && (l[v].defaultSelected = !0);
        }
      } else {
        for (var _ = Lr(xa(a)), O = null, x = 0; x < l.length; x++) {
          if (l[x].value === _) {
            l[x].selected = !0, i && (l[x].defaultSelected = !0);
            return;
          }
          O === null && !l[x].disabled && (O = l[x]);
        }
        O !== null && (O.selected = !0);
      }
    }
    function as(e, t) {
      return ut({}, t, {
        value: void 0
      });
    }
    function vl(e, t) {
      var a = e;
      rs(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Zt && (g("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Zt = !0);
    }
    function dd(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Gi(a, !!t.multiple, i, !1) : t.defaultValue != null && Gi(a, !!t.multiple, t.defaultValue, !0);
    }
    function _c(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var l = t.value;
      l != null ? Gi(a, !!t.multiple, l, !1) : i !== !!t.multiple && (t.defaultValue != null ? Gi(a, !!t.multiple, t.defaultValue, !0) : Gi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function pd(e, t) {
      var a = e, i = t.value;
      i != null && Gi(a, !!t.multiple, i, !1);
    }
    var Tv = !1;
    function vd(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = ut({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Lr(a._wrapperState.initialValue)
      });
      return i;
    }
    function hd(e, t) {
      var a = e;
      ts("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Tv && (g("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Nr() || "A component"), Tv = !0);
      var i = t.value;
      if (i == null) {
        var l = t.children, s = t.defaultValue;
        if (l != null) {
          g("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (dt(l)) {
              if (l.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              l = l[0];
            }
            s = l;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: xa(i)
      };
    }
    function Rv(e, t) {
      var a = e, i = xa(t.value), l = xa(t.defaultValue);
      if (i != null) {
        var s = Lr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      l != null && (a.defaultValue = Lr(l));
    }
    function Cv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Cy(e, t) {
      Rv(e, t);
    }
    var Qi = "http://www.w3.org/1999/xhtml", md = "http://www.w3.org/1998/Math/MathML", yd = "http://www.w3.org/2000/svg";
    function gd(e) {
      switch (e) {
        case "svg":
          return yd;
        case "math":
          return md;
        default:
          return Qi;
      }
    }
    function Ed(e, t) {
      return e == null || e === Qi ? gd(t) : e === yd && t === "foreignObject" ? Qi : e;
    }
    var bv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, l) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, l);
        });
      } : e;
    }, Tc, wv = bv(function(e, t) {
      if (e.namespaceURI === yd && !("innerHTML" in e)) {
        Tc = Tc || document.createElement("div"), Tc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = Tc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), qr = 1, qi = 3, An = 8, Ki = 9, Sd = 11, fu = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === qi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, is = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, os = {
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
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function xv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Dv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(os).forEach(function(e) {
      Dv.forEach(function(t) {
        os[xv(t, e)] = os[e];
      });
    });
    function Rc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(os.hasOwnProperty(e) && os[e]) ? t + "px" : (fa(t, e), ("" + t).trim());
    }
    var Ov = /([A-Z])/g, kv = /^ms-/;
    function du(e) {
      return e.replace(Ov, "-$1").toLowerCase().replace(kv, "-ms-");
    }
    var Mv = function() {
    };
    {
      var by = /^(?:webkit|moz|o)[A-Z]/, wy = /^-ms-/, Nv = /-(.)/g, _d = /;\s*$/, Ti = {}, hl = {}, Lv = !1, ls = !1, xy = function(e) {
        return e.replace(Nv, function(t, a) {
          return a.toUpperCase();
        });
      }, Av = function(e) {
        Ti.hasOwnProperty(e) && Ti[e] || (Ti[e] = !0, g(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          xy(e.replace(wy, "ms-"))
        ));
      }, Td = function(e) {
        Ti.hasOwnProperty(e) && Ti[e] || (Ti[e] = !0, g("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Rd = function(e, t) {
        hl.hasOwnProperty(t) && hl[t] || (hl[t] = !0, g(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(_d, "")));
      }, zv = function(e, t) {
        Lv || (Lv = !0, g("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Uv = function(e, t) {
        ls || (ls = !0, g("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Mv = function(e, t) {
        e.indexOf("-") > -1 ? Av(e) : by.test(e) ? Td(e) : _d.test(t) && Rd(e, t), typeof t == "number" && (isNaN(t) ? zv(e, t) : isFinite(t) || Uv(e, t));
      };
    }
    var Pv = Mv;
    function Dy(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var l = e[i];
            if (l != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : du(i)) + ":", t += Rc(i, l, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function jv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var l = i.indexOf("--") === 0;
          l || Pv(i, t[i]);
          var s = Rc(i, t[i], l);
          i === "float" && (i = "cssFloat"), l ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Oy(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Fv(e) {
      var t = {};
      for (var a in e)
        for (var i = is[a] || [a], l = 0; l < i.length; l++)
          t[i[l]] = a;
      return t;
    }
    function ky(e, t) {
      {
        if (!t)
          return;
        var a = Fv(e), i = Fv(t), l = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (l[v])
              continue;
            l[v] = !0, g("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Oy(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var ai = {
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
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, us = ut({
      menuitem: !0
    }, ai), Hv = "__html";
    function Cc(e, t) {
      if (t) {
        if (us[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Hv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && g("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Oo(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
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
    var ss = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, bc = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, pu = {}, My = new RegExp("^(aria)-[" + ce + "]*$"), vu = new RegExp("^(aria)[A-Z][" + ce + "]*$");
    function Cd(e, t) {
      {
        if (Dr.call(pu, t) && pu[t])
          return !0;
        if (vu.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = bc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return g("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), pu[t] = !0, !0;
          if (t !== i)
            return g("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), pu[t] = !0, !0;
        }
        if (My.test(t)) {
          var l = t.toLowerCase(), s = bc.hasOwnProperty(l) ? l : null;
          if (s == null)
            return pu[t] = !0, !1;
          if (t !== s)
            return g("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), pu[t] = !0, !0;
        }
      }
      return !0;
    }
    function cs(e, t) {
      {
        var a = [];
        for (var i in t) {
          var l = Cd(e, i);
          l || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? g("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && g("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function bd(e, t) {
      Oo(e, t) || cs(e, t);
    }
    var wd = !1;
    function wc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !wd && (wd = !0, e === "select" && t.multiple ? g("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : g("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var ml = function() {
    };
    {
      var ur = {}, xd = /^on./, xc = /^on[^A-Z]/, Iv = new RegExp("^(aria)-[" + ce + "]*$"), Vv = new RegExp("^(aria)[A-Z][" + ce + "]*$");
      ml = function(e, t, a, i) {
        if (Dr.call(ur, t) && ur[t])
          return !0;
        var l = t.toLowerCase();
        if (l === "onfocusin" || l === "onfocusout")
          return g("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), ur[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(l) ? f[l] : null;
          if (p != null)
            return g("Invalid event handler property `%s`. Did you mean `%s`?", t, p), ur[t] = !0, !0;
          if (xd.test(t))
            return g("Unknown event handler property `%s`. It will be ignored.", t), ur[t] = !0, !0;
        } else if (xd.test(t))
          return xc.test(t) && g("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), ur[t] = !0, !0;
        if (Iv.test(t) || Vv.test(t))
          return !0;
        if (l === "innerhtml")
          return g("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), ur[t] = !0, !0;
        if (l === "aria")
          return g("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), ur[t] = !0, !0;
        if (l === "is" && a !== null && a !== void 0 && typeof a != "string")
          return g("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), ur[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return g("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), ur[t] = !0, !0;
        var v = an(t), S = v !== null && v.type === $n;
        if (ss.hasOwnProperty(l)) {
          var _ = ss[l];
          if (_ !== t)
            return g("Invalid DOM property `%s`. Did you mean `%s`?", t, _), ur[t] = !0, !0;
        } else if (!S && t !== l)
          return g("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, l), ur[t] = !0, !0;
        return typeof a == "boolean" && sn(t, a, v, !1) ? (a ? g('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : g('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), ur[t] = !0, !0) : S ? !0 : sn(t, a, v, !1) ? (ur[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === Ln && (g("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), ur[t] = !0), !0);
      };
    }
    var Bv = function(e, t, a) {
      {
        var i = [];
        for (var l in t) {
          var s = ml(e, l, t[l], a);
          s || i.push(l);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? g("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && g("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Yv(e, t, a) {
      Oo(e, t) || Bv(e, t, a);
    }
    var Dd = 1, Dc = 2, ka = 4, Od = Dd | Dc | ka, yl = null;
    function Ny(e) {
      yl !== null && g("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), yl = e;
    }
    function Ly() {
      yl === null && g("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), yl = null;
    }
    function fs(e) {
      return e === yl;
    }
    function kd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === qi ? t.parentNode : t;
    }
    var Oc = null, gl = null, Yt = null;
    function kc(e) {
      var t = zu(e);
      if (t) {
        if (typeof Oc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Jh(a);
          Oc(t.stateNode, t.type, i);
        }
      }
    }
    function Mc(e) {
      Oc = e;
    }
    function hu(e) {
      gl ? Yt ? Yt.push(e) : Yt = [e] : gl = e;
    }
    function $v() {
      return gl !== null || Yt !== null;
    }
    function Nc() {
      if (gl) {
        var e = gl, t = Yt;
        if (gl = null, Yt = null, kc(e), t)
          for (var a = 0; a < t.length; a++)
            kc(t[a]);
      }
    }
    var mu = function(e, t) {
      return e(t);
    }, ds = function() {
    }, ko = !1;
    function Wv() {
      var e = $v();
      e && (ds(), Nc());
    }
    function Gv(e, t, a) {
      if (ko)
        return e(t, a);
      ko = !0;
      try {
        return mu(e, t, a);
      } finally {
        ko = !1, Wv();
      }
    }
    function Ay(e, t, a) {
      mu = e, ds = a;
    }
    function Qv(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Lc(e, t, a) {
      switch (e) {
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
          return !!(a.disabled && Qv(t));
        default:
          return !1;
      }
    }
    function Mo(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Jh(a);
      if (i === null)
        return null;
      var l = i[t];
      if (Lc(t, e.type, i))
        return null;
      if (l && typeof l != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof l + "` type.");
      return l;
    }
    var ps = !1;
    if (Nn)
      try {
        var El = {};
        Object.defineProperty(El, "passive", {
          get: function() {
            ps = !0;
          }
        }), window.addEventListener("test", El, El), window.removeEventListener("test", El, El);
      } catch {
        ps = !1;
      }
    function Ac(e, t, a, i, l, s, f, p, v) {
      var S = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, S);
      } catch (_) {
        this.onError(_);
      }
    }
    var zc = Ac;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Md = document.createElement("react");
      zc = function(t, a, i, l, s, f, p, v, S) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var _ = document.createEvent("Event"), O = !1, x = !0, H = window.event, Y = Object.getOwnPropertyDescriptor(window, "event");
        function Q() {
          Md.removeEventListener(q, Be, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = H);
        }
        var ge = Array.prototype.slice.call(arguments, 3);
        function Be() {
          O = !0, Q(), a.apply(i, ge), x = !1;
        }
        var Ue, bt = !1, Et = !1;
        function z(U) {
          if (Ue = U.error, bt = !0, Ue === null && U.colno === 0 && U.lineno === 0 && (Et = !0), U.defaultPrevented && Ue != null && typeof Ue == "object")
            try {
              Ue._suppressLogging = !0;
            } catch {
            }
        }
        var q = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", z), Md.addEventListener(q, Be, !1), _.initEvent(q, !1, !1), Md.dispatchEvent(_), Y && Object.defineProperty(window, "event", Y), O && x && (bt ? Et && (Ue = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ue = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ue)), window.removeEventListener("error", z), !O)
          return Q(), Ac.apply(this, arguments);
      };
    }
    var qv = zc, yu = !1, Uc = null, gu = !1, Ri = null, Kv = {
      onError: function(e) {
        yu = !0, Uc = e;
      }
    };
    function No(e, t, a, i, l, s, f, p, v) {
      yu = !1, Uc = null, qv.apply(Kv, arguments);
    }
    function Ci(e, t, a, i, l, s, f, p, v) {
      if (No.apply(this, arguments), yu) {
        var S = hs();
        gu || (gu = !0, Ri = S);
      }
    }
    function vs() {
      if (gu) {
        var e = Ri;
        throw gu = !1, Ri = null, e;
      }
    }
    function Xi() {
      return yu;
    }
    function hs() {
      if (yu) {
        var e = Uc;
        return yu = !1, Uc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Eu(e) {
      return e._reactInternals;
    }
    function zy(e) {
      return e._reactInternals !== void 0;
    }
    function Sl(e, t) {
      e._reactInternals = t;
    }
    var He = (
      /*                      */
      0
    ), ii = (
      /*                */
      1
    ), yn = (
      /*                    */
      2
    ), Tt = (
      /*                       */
      4
    ), Ma = (
      /*                */
      16
    ), Na = (
      /*                 */
      32
    ), un = (
      /*                     */
      64
    ), Pe = (
      /*                   */
      128
    ), Rr = (
      /*            */
      256
    ), Tn = (
      /*                          */
      512
    ), Gn = (
      /*                     */
      1024
    ), Kr = (
      /*                      */
      2048
    ), Xr = (
      /*                    */
      4096
    ), zn = (
      /*                   */
      8192
    ), Su = (
      /*             */
      16384
    ), Xv = (
      /*               */
      32767
    ), ms = (
      /*                   */
      32768
    ), Jn = (
      /*                */
      65536
    ), Pc = (
      /* */
      131072
    ), bi = (
      /*                       */
      1048576
    ), _u = (
      /*                    */
      2097152
    ), Zi = (
      /*                 */
      4194304
    ), jc = (
      /*                */
      8388608
    ), Lo = (
      /*               */
      16777216
    ), wi = (
      /*              */
      33554432
    ), Ao = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Tt | Gn | 0
    ), zo = yn | Tt | Ma | Na | Tn | Xr | zn, Uo = Tt | un | Tn | zn, Ji = Kr | Ma, Un = Zi | jc | _u, La = E.ReactCurrentOwner;
    function ha(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (yn | Xr)) !== He && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === F ? a : null;
    }
    function xi(e) {
      if (e.tag === Oe) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Di(e) {
      return e.tag === F ? e.stateNode.containerInfo : null;
    }
    function _l(e) {
      return ha(e) === e;
    }
    function Zv(e) {
      {
        var t = La.current;
        if (t !== null && t.tag === K) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || g("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", et(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var l = Eu(e);
      return l ? ha(l) === l : !1;
    }
    function Fc(e) {
      if (ha(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Hc(e) {
      var t = e.alternate;
      if (!t) {
        var a = ha(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, l = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = l = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return Fc(s), e;
            if (v === l)
              return Fc(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== l.return)
          i = s, l = f;
        else {
          for (var S = !1, _ = s.child; _; ) {
            if (_ === i) {
              S = !0, i = s, l = f;
              break;
            }
            if (_ === l) {
              S = !0, l = s, i = f;
              break;
            }
            _ = _.sibling;
          }
          if (!S) {
            for (_ = f.child; _; ) {
              if (_ === i) {
                S = !0, i = f, l = s;
                break;
              }
              if (_ === l) {
                S = !0, l = f, i = s;
                break;
              }
              _ = _.sibling;
            }
            if (!S)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== l)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== F)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Zr(e) {
      var t = Hc(e);
      return t !== null ? Jr(t) : null;
    }
    function Jr(e) {
      if (e.tag === N || e.tag === X)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Jr(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function pn(e) {
      var t = Hc(e);
      return t !== null ? Aa(t) : null;
    }
    function Aa(e) {
      if (e.tag === N || e.tag === X)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== W) {
          var a = Aa(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var Nd = m.unstable_scheduleCallback, Jv = m.unstable_cancelCallback, Ld = m.unstable_shouldYield, Ad = m.unstable_requestPaint, Qn = m.unstable_now, Ic = m.unstable_getCurrentPriorityLevel, ys = m.unstable_ImmediatePriority, Po = m.unstable_UserBlockingPriority, eo = m.unstable_NormalPriority, Uy = m.unstable_LowPriority, Tl = m.unstable_IdlePriority, Vc = m.unstable_yieldValue, eh = m.unstable_setDisableYieldValue, Rl = null, wn = null, ye = null, ma = !1, ea = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Tu(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return g("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        Ke && (e = ut({}, e, {
          getLaneLabelMap: Cl,
          injectProfilingHooks: za
        })), Rl = t.inject(e), wn = t;
      } catch (a) {
        g("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function zd(e, t) {
      if (wn && typeof wn.onScheduleFiberRoot == "function")
        try {
          wn.onScheduleFiberRoot(Rl, e, t);
        } catch (a) {
          ma || (ma = !0, g("React instrumentation encountered an error: %s", a));
        }
    }
    function Ud(e, t) {
      if (wn && typeof wn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & Pe) === Pe;
          if (Qe) {
            var i;
            switch (t) {
              case Ar:
                i = ys;
                break;
              case ki:
                i = Po;
                break;
              case Ua:
                i = eo;
                break;
              case Pa:
                i = Tl;
                break;
              default:
                i = eo;
                break;
            }
            wn.onCommitFiberRoot(Rl, e, i, a);
          }
        } catch (l) {
          ma || (ma = !0, g("React instrumentation encountered an error: %s", l));
        }
    }
    function Pd(e) {
      if (wn && typeof wn.onPostCommitFiberRoot == "function")
        try {
          wn.onPostCommitFiberRoot(Rl, e);
        } catch (t) {
          ma || (ma = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function jd(e) {
      if (wn && typeof wn.onCommitFiberUnmount == "function")
        try {
          wn.onCommitFiberUnmount(Rl, e);
        } catch (t) {
          ma || (ma = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function gn(e) {
      if (typeof Vc == "function" && (eh(e), $(e)), wn && typeof wn.setStrictMode == "function")
        try {
          wn.setStrictMode(Rl, e);
        } catch (t) {
          ma || (ma = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function za(e) {
      ye = e;
    }
    function Cl() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < xl; a++) {
          var i = ah(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Fd(e) {
      ye !== null && typeof ye.markCommitStarted == "function" && ye.markCommitStarted(e);
    }
    function Hd() {
      ye !== null && typeof ye.markCommitStopped == "function" && ye.markCommitStopped();
    }
    function ya(e) {
      ye !== null && typeof ye.markComponentRenderStarted == "function" && ye.markComponentRenderStarted(e);
    }
    function ga() {
      ye !== null && typeof ye.markComponentRenderStopped == "function" && ye.markComponentRenderStopped();
    }
    function Id(e) {
      ye !== null && typeof ye.markComponentPassiveEffectMountStarted == "function" && ye.markComponentPassiveEffectMountStarted(e);
    }
    function th() {
      ye !== null && typeof ye.markComponentPassiveEffectMountStopped == "function" && ye.markComponentPassiveEffectMountStopped();
    }
    function to(e) {
      ye !== null && typeof ye.markComponentPassiveEffectUnmountStarted == "function" && ye.markComponentPassiveEffectUnmountStarted(e);
    }
    function jo() {
      ye !== null && typeof ye.markComponentPassiveEffectUnmountStopped == "function" && ye.markComponentPassiveEffectUnmountStopped();
    }
    function Bc(e) {
      ye !== null && typeof ye.markComponentLayoutEffectMountStarted == "function" && ye.markComponentLayoutEffectMountStarted(e);
    }
    function nh() {
      ye !== null && typeof ye.markComponentLayoutEffectMountStopped == "function" && ye.markComponentLayoutEffectMountStopped();
    }
    function gs(e) {
      ye !== null && typeof ye.markComponentLayoutEffectUnmountStarted == "function" && ye.markComponentLayoutEffectUnmountStarted(e);
    }
    function Vd() {
      ye !== null && typeof ye.markComponentLayoutEffectUnmountStopped == "function" && ye.markComponentLayoutEffectUnmountStopped();
    }
    function Es(e, t, a) {
      ye !== null && typeof ye.markComponentErrored == "function" && ye.markComponentErrored(e, t, a);
    }
    function Oi(e, t, a) {
      ye !== null && typeof ye.markComponentSuspended == "function" && ye.markComponentSuspended(e, t, a);
    }
    function Ss(e) {
      ye !== null && typeof ye.markLayoutEffectsStarted == "function" && ye.markLayoutEffectsStarted(e);
    }
    function _s() {
      ye !== null && typeof ye.markLayoutEffectsStopped == "function" && ye.markLayoutEffectsStopped();
    }
    function bl(e) {
      ye !== null && typeof ye.markPassiveEffectsStarted == "function" && ye.markPassiveEffectsStarted(e);
    }
    function Bd() {
      ye !== null && typeof ye.markPassiveEffectsStopped == "function" && ye.markPassiveEffectsStopped();
    }
    function wl(e) {
      ye !== null && typeof ye.markRenderStarted == "function" && ye.markRenderStarted(e);
    }
    function rh() {
      ye !== null && typeof ye.markRenderYielded == "function" && ye.markRenderYielded();
    }
    function Yc() {
      ye !== null && typeof ye.markRenderStopped == "function" && ye.markRenderStopped();
    }
    function En(e) {
      ye !== null && typeof ye.markRenderScheduled == "function" && ye.markRenderScheduled(e);
    }
    function $c(e, t) {
      ye !== null && typeof ye.markForceUpdateScheduled == "function" && ye.markForceUpdateScheduled(e, t);
    }
    function Ts(e, t) {
      ye !== null && typeof ye.markStateUpdateScheduled == "function" && ye.markStateUpdateScheduled(e, t);
    }
    var Ie = (
      /*                         */
      0
    ), mt = (
      /*                 */
      1
    ), Ut = (
      /*                    */
      2
    ), Jt = (
      /*               */
      8
    ), Pt = (
      /*              */
      16
    ), Pn = Math.clz32 ? Math.clz32 : Rs, er = Math.log, Wc = Math.LN2;
    function Rs(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (er(t) / Wc | 0) | 0;
    }
    var xl = 31, ne = (
      /*                        */
      0
    ), Lt = (
      /*                          */
      0
    ), qe = (
      /*                        */
      1
    ), Fo = (
      /*    */
      2
    ), oi = (
      /*             */
      4
    ), Cr = (
      /*            */
      8
    ), xn = (
      /*                     */
      16
    ), no = (
      /*                */
      32
    ), Ho = (
      /*                       */
      4194240
    ), Dl = (
      /*                        */
      64
    ), Gc = (
      /*                        */
      128
    ), Qc = (
      /*                        */
      256
    ), qc = (
      /*                        */
      512
    ), Kc = (
      /*                        */
      1024
    ), Xc = (
      /*                        */
      2048
    ), Zc = (
      /*                        */
      4096
    ), Jc = (
      /*                        */
      8192
    ), ef = (
      /*                        */
      16384
    ), Ol = (
      /*                       */
      32768
    ), tf = (
      /*                       */
      65536
    ), Ru = (
      /*                       */
      131072
    ), Cu = (
      /*                       */
      262144
    ), nf = (
      /*                       */
      524288
    ), Cs = (
      /*                       */
      1048576
    ), rf = (
      /*                       */
      2097152
    ), bs = (
      /*                            */
      130023424
    ), kl = (
      /*                             */
      4194304
    ), af = (
      /*                             */
      8388608
    ), ws = (
      /*                             */
      16777216
    ), of = (
      /*                             */
      33554432
    ), lf = (
      /*                             */
      67108864
    ), Yd = kl, xs = (
      /*          */
      134217728
    ), $d = (
      /*                          */
      268435455
    ), Ds = (
      /*               */
      268435456
    ), Ml = (
      /*                        */
      536870912
    ), ta = (
      /*                   */
      1073741824
    );
    function ah(e) {
      {
        if (e & qe)
          return "Sync";
        if (e & Fo)
          return "InputContinuousHydration";
        if (e & oi)
          return "InputContinuous";
        if (e & Cr)
          return "DefaultHydration";
        if (e & xn)
          return "Default";
        if (e & no)
          return "TransitionHydration";
        if (e & Ho)
          return "Transition";
        if (e & bs)
          return "Retry";
        if (e & xs)
          return "SelectiveHydration";
        if (e & Ds)
          return "IdleHydration";
        if (e & Ml)
          return "Idle";
        if (e & ta)
          return "Offscreen";
      }
    }
    var nn = -1, Nl = Dl, uf = kl;
    function Os(e) {
      switch (Io(e)) {
        case qe:
          return qe;
        case Fo:
          return Fo;
        case oi:
          return oi;
        case Cr:
          return Cr;
        case xn:
          return xn;
        case no:
          return no;
        case Dl:
        case Gc:
        case Qc:
        case qc:
        case Kc:
        case Xc:
        case Zc:
        case Jc:
        case ef:
        case Ol:
        case tf:
        case Ru:
        case Cu:
        case nf:
        case Cs:
        case rf:
          return e & Ho;
        case kl:
        case af:
        case ws:
        case of:
        case lf:
          return e & bs;
        case xs:
          return xs;
        case Ds:
          return Ds;
        case Ml:
          return Ml;
        case ta:
          return ta;
        default:
          return g("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function sf(e, t) {
      var a = e.pendingLanes;
      if (a === ne)
        return ne;
      var i = ne, l = e.suspendedLanes, s = e.pingedLanes, f = a & $d;
      if (f !== ne) {
        var p = f & ~l;
        if (p !== ne)
          i = Os(p);
        else {
          var v = f & s;
          v !== ne && (i = Os(v));
        }
      } else {
        var S = a & ~l;
        S !== ne ? i = Os(S) : s !== ne && (i = Os(s));
      }
      if (i === ne)
        return ne;
      if (t !== ne && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & l) === ne) {
        var _ = Io(i), O = Io(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          _ >= O || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          _ === xn && (O & Ho) !== ne
        )
          return t;
      }
      (i & oi) !== ne && (i |= a & xn);
      var x = e.entangledLanes;
      if (x !== ne)
        for (var H = e.entanglements, Y = i & x; Y > 0; ) {
          var Q = jn(Y), ge = 1 << Q;
          i |= H[Q], Y &= ~ge;
        }
      return i;
    }
    function li(e, t) {
      for (var a = e.eventTimes, i = nn; t > 0; ) {
        var l = jn(t), s = 1 << l, f = a[l];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function Wd(e, t) {
      switch (e) {
        case qe:
        case Fo:
        case oi:
          return t + 250;
        case Cr:
        case xn:
        case no:
        case Dl:
        case Gc:
        case Qc:
        case qc:
        case Kc:
        case Xc:
        case Zc:
        case Jc:
        case ef:
        case Ol:
        case tf:
        case Ru:
        case Cu:
        case nf:
        case Cs:
        case rf:
          return t + 5e3;
        case kl:
        case af:
        case ws:
        case of:
        case lf:
          return nn;
        case xs:
        case Ds:
        case Ml:
        case ta:
          return nn;
        default:
          return g("Should have found matching lanes. This is a bug in React."), nn;
      }
    }
    function cf(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, l = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = jn(f), v = 1 << p, S = s[p];
        S === nn ? ((v & i) === ne || (v & l) !== ne) && (s[p] = Wd(v, t)) : S <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function ih(e) {
      return Os(e.pendingLanes);
    }
    function ff(e) {
      var t = e.pendingLanes & ~ta;
      return t !== ne ? t : t & ta ? ta : ne;
    }
    function oh(e) {
      return (e & qe) !== ne;
    }
    function ks(e) {
      return (e & $d) !== ne;
    }
    function Ll(e) {
      return (e & bs) === e;
    }
    function Gd(e) {
      var t = qe | oi | xn;
      return (e & t) === ne;
    }
    function Qd(e) {
      return (e & Ho) === e;
    }
    function df(e, t) {
      var a = Fo | oi | Cr | xn;
      return (t & a) !== ne;
    }
    function lh(e, t) {
      return (t & e.expiredLanes) !== ne;
    }
    function qd(e) {
      return (e & Ho) !== ne;
    }
    function Kd() {
      var e = Nl;
      return Nl <<= 1, (Nl & Ho) === ne && (Nl = Dl), e;
    }
    function uh() {
      var e = uf;
      return uf <<= 1, (uf & bs) === ne && (uf = kl), e;
    }
    function Io(e) {
      return e & -e;
    }
    function Ms(e) {
      return Io(e);
    }
    function jn(e) {
      return 31 - Pn(e);
    }
    function sr(e) {
      return jn(e);
    }
    function na(e, t) {
      return (e & t) !== ne;
    }
    function Al(e, t) {
      return (e & t) === t;
    }
    function ot(e, t) {
      return e | t;
    }
    function Ns(e, t) {
      return e & ~t;
    }
    function Xd(e, t) {
      return e & t;
    }
    function sh(e) {
      return e;
    }
    function ch(e, t) {
      return e !== Lt && e < t ? e : t;
    }
    function Ls(e) {
      for (var t = [], a = 0; a < xl; a++)
        t.push(e);
      return t;
    }
    function bu(e, t, a) {
      e.pendingLanes |= t, t !== Ml && (e.suspendedLanes = ne, e.pingedLanes = ne);
      var i = e.eventTimes, l = sr(t);
      i[l] = a;
    }
    function fh(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var l = jn(i), s = 1 << l;
        a[l] = nn, i &= ~s;
      }
    }
    function pf(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Zd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = ne, e.pingedLanes = ne, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, l = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = jn(f), v = 1 << p;
        i[p] = ne, l[p] = nn, s[p] = nn, f &= ~v;
      }
    }
    function vf(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, l = a; l; ) {
        var s = jn(l), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), l &= ~f;
      }
    }
    function Jd(e, t) {
      var a = Io(t), i;
      switch (a) {
        case oi:
          i = Fo;
          break;
        case xn:
          i = Cr;
          break;
        case Dl:
        case Gc:
        case Qc:
        case qc:
        case Kc:
        case Xc:
        case Zc:
        case Jc:
        case ef:
        case Ol:
        case tf:
        case Ru:
        case Cu:
        case nf:
        case Cs:
        case rf:
        case kl:
        case af:
        case ws:
        case of:
        case lf:
          i = no;
          break;
        case Ml:
          i = Ds;
          break;
        default:
          i = Lt;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Lt ? Lt : i;
    }
    function As(e, t, a) {
      if (ea)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var l = sr(a), s = 1 << l, f = i[l];
          f.add(t), a &= ~s;
        }
    }
    function dh(e, t) {
      if (ea)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var l = sr(t), s = 1 << l, f = a[l];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function ep(e, t) {
      return null;
    }
    var Ar = qe, ki = oi, Ua = xn, Pa = Ml, zs = Lt;
    function ja() {
      return zs;
    }
    function Fn(e) {
      zs = e;
    }
    function ph(e, t) {
      var a = zs;
      try {
        return zs = e, t();
      } finally {
        zs = a;
      }
    }
    function vh(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Us(e, t) {
      return e > t ? e : t;
    }
    function tr(e, t) {
      return e !== 0 && e < t;
    }
    function hh(e) {
      var t = Io(e);
      return tr(Ar, t) ? tr(ki, t) ? ks(t) ? Ua : Pa : ki : Ar;
    }
    function hf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Ps;
    function br(e) {
      Ps = e;
    }
    function Py(e) {
      Ps(e);
    }
    var Re;
    function wu(e) {
      Re = e;
    }
    var mf;
    function mh(e) {
      mf = e;
    }
    var yh;
    function js(e) {
      yh = e;
    }
    var Fs;
    function tp(e) {
      Fs = e;
    }
    var yf = !1, Hs = [], ro = null, Mi = null, Ni = null, Dn = /* @__PURE__ */ new Map(), zr = /* @__PURE__ */ new Map(), Ur = [], gh = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Eh(e) {
      return gh.indexOf(e) > -1;
    }
    function ui(e, t, a, i, l) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: l,
        targetContainers: [i]
      };
    }
    function np(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          ro = null;
          break;
        case "dragenter":
        case "dragleave":
          Mi = null;
          break;
        case "mouseover":
        case "mouseout":
          Ni = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          Dn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          zr.delete(i);
          break;
        }
      }
    }
    function ra(e, t, a, i, l, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = ui(t, a, i, l, s);
        if (t !== null) {
          var p = zu(t);
          p !== null && Re(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return l !== null && v.indexOf(l) === -1 && v.push(l), e;
    }
    function jy(e, t, a, i, l) {
      switch (t) {
        case "focusin": {
          var s = l;
          return ro = ra(ro, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = l;
          return Mi = ra(Mi, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = l;
          return Ni = ra(Ni, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = l, S = v.pointerId;
          return Dn.set(S, ra(Dn.get(S) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var _ = l, O = _.pointerId;
          return zr.set(O, ra(zr.get(O) || null, e, t, a, i, _)), !0;
        }
      }
      return !1;
    }
    function rp(e) {
      var t = Zs(e.target);
      if (t !== null) {
        var a = ha(t);
        if (a !== null) {
          var i = a.tag;
          if (i === Oe) {
            var l = xi(a);
            if (l !== null) {
              e.blockedOn = l, Fs(e.priority, function() {
                mf(a);
              });
              return;
            }
          } else if (i === F) {
            var s = a.stateNode;
            if (hf(s)) {
              e.blockedOn = Di(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Sh(e) {
      for (var t = yh(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < Ur.length && tr(t, Ur[i].priority); i++)
        ;
      Ur.splice(i, 0, a), i === 0 && rp(a);
    }
    function Is(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Du(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var l = e.nativeEvent, s = new l.constructor(l.type, l);
          Ny(s), l.target.dispatchEvent(s), Ly();
        } else {
          var f = zu(i);
          return f !== null && Re(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function ap(e, t, a) {
      Is(e) && a.delete(t);
    }
    function Fy() {
      yf = !1, ro !== null && Is(ro) && (ro = null), Mi !== null && Is(Mi) && (Mi = null), Ni !== null && Is(Ni) && (Ni = null), Dn.forEach(ap), zr.forEach(ap);
    }
    function Vo(e, t) {
      e.blockedOn === t && (e.blockedOn = null, yf || (yf = !0, m.unstable_scheduleCallback(m.unstable_NormalPriority, Fy)));
    }
    function zl(e) {
      if (Hs.length > 0) {
        Vo(Hs[0], e);
        for (var t = 1; t < Hs.length; t++) {
          var a = Hs[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      ro !== null && Vo(ro, e), Mi !== null && Vo(Mi, e), Ni !== null && Vo(Ni, e);
      var i = function(p) {
        return Vo(p, e);
      };
      Dn.forEach(i), zr.forEach(i);
      for (var l = 0; l < Ur.length; l++) {
        var s = Ur[l];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; Ur.length > 0; ) {
        var f = Ur[0];
        if (f.blockedOn !== null)
          break;
        rp(f), f.blockedOn === null && Ur.shift();
      }
    }
    var cr = E.ReactCurrentBatchConfig, Rt = !0;
    function qn(e) {
      Rt = !!e;
    }
    function Hn() {
      return Rt;
    }
    function fr(e, t, a) {
      var i = gf(t), l;
      switch (i) {
        case Ar:
          l = Ea;
          break;
        case ki:
          l = xu;
          break;
        case Ua:
        default:
          l = On;
          break;
      }
      return l.bind(null, t, a, e);
    }
    function Ea(e, t, a, i) {
      var l = ja(), s = cr.transition;
      cr.transition = null;
      try {
        Fn(Ar), On(e, t, a, i);
      } finally {
        Fn(l), cr.transition = s;
      }
    }
    function xu(e, t, a, i) {
      var l = ja(), s = cr.transition;
      cr.transition = null;
      try {
        Fn(ki), On(e, t, a, i);
      } finally {
        Fn(l), cr.transition = s;
      }
    }
    function On(e, t, a, i) {
      Rt && Vs(e, t, a, i);
    }
    function Vs(e, t, a, i) {
      var l = Du(e, t, a, i);
      if (l === null) {
        ng(e, t, i, Li, a), np(e, i);
        return;
      }
      if (jy(l, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (np(e, i), t & ka && Eh(e)) {
        for (; l !== null; ) {
          var s = zu(l);
          s !== null && Py(s);
          var f = Du(e, t, a, i);
          if (f === null && ng(e, t, i, Li, a), f === l)
            break;
          l = f;
        }
        l !== null && i.stopPropagation();
        return;
      }
      ng(e, t, i, null, a);
    }
    var Li = null;
    function Du(e, t, a, i) {
      Li = null;
      var l = kd(i), s = Zs(l);
      if (s !== null) {
        var f = ha(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === Oe) {
            var v = xi(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === F) {
            var S = f.stateNode;
            if (hf(S))
              return Di(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return Li = s, null;
    }
    function gf(e) {
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
          return Ar;
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
          return ki;
        case "message": {
          var t = Ic();
          switch (t) {
            case ys:
              return Ar;
            case Po:
              return ki;
            case eo:
            case Uy:
              return Ua;
            case Tl:
              return Pa;
            default:
              return Ua;
          }
        }
        default:
          return Ua;
      }
    }
    function Bs(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function aa(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function ip(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Ou(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var Sa = null, ku = null, Ul = null;
    function Bo(e) {
      return Sa = e, ku = Ys(), !0;
    }
    function Ef() {
      Sa = null, ku = null, Ul = null;
    }
    function ao() {
      if (Ul)
        return Ul;
      var e, t = ku, a = t.length, i, l = Ys(), s = l.length;
      for (e = 0; e < a && t[e] === l[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === l[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return Ul = l.slice(e, p), Ul;
    }
    function Ys() {
      return "value" in Sa ? Sa.value : Sa.textContent;
    }
    function Yo(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Mu() {
      return !0;
    }
    function $s() {
      return !1;
    }
    function wr(e) {
      function t(a, i, l, s, f) {
        this._reactName = a, this._targetInst = l, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var S = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return S ? this.isDefaultPrevented = Mu : this.isDefaultPrevented = $s, this.isPropagationStopped = $s, this;
      }
      return ut(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Mu);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Mu);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: Mu
      }), t;
    }
    var In = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Ai = wr(In), Pr = ut({}, In, {
      view: 0,
      detail: 0
    }), ia = wr(Pr), Sf, Ws, Pl;
    function Hy(e) {
      e !== Pl && (Pl && e.type === "mousemove" ? (Sf = e.screenX - Pl.screenX, Ws = e.screenY - Pl.screenY) : (Sf = 0, Ws = 0), Pl = e);
    }
    var si = ut({}, Pr, {
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
      getModifierState: vn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Hy(e), Sf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Ws;
      }
    }), op = wr(si), lp = ut({}, si, {
      dataTransfer: 0
    }), jl = wr(lp), up = ut({}, Pr, {
      relatedTarget: 0
    }), io = wr(up), _h = ut({}, In, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Th = wr(_h), sp = ut({}, In, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), _f = wr(sp), Iy = ut({}, In, {
      data: 0
    }), Rh = wr(Iy), Ch = Rh, bh = {
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
      MozPrintableKey: "Unidentified"
    }, Fl = {
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
      224: "Meta"
    };
    function Vy(e) {
      if (e.key) {
        var t = bh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Yo(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Fl[e.keyCode] || "Unidentified" : "";
    }
    var Nu = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function wh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Nu[e];
      return i ? !!a[i] : !1;
    }
    function vn(e) {
      return wh;
    }
    var By = ut({}, Pr, {
      key: Vy,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: vn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Yo(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Yo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), xh = wr(By), Yy = ut({}, si, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Dh = wr(Yy), Oh = ut({}, Pr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: vn
    }), kh = wr(Oh), $y = ut({}, In, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Fa = wr($y), cp = ut({}, si, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), Wy = wr(cp), $o = [9, 13, 27, 32], Gs = 229, oo = Nn && "CompositionEvent" in window, Wo = null;
    Nn && "documentMode" in document && (Wo = document.documentMode);
    var fp = Nn && "TextEvent" in window && !Wo, Tf = Nn && (!oo || Wo && Wo > 8 && Wo <= 11), Mh = 32, Rf = String.fromCharCode(Mh);
    function Gy() {
      vt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), vt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), vt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), vt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var dp = !1;
    function Nh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Cf(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function bf(e, t) {
      return e === "keydown" && t.keyCode === Gs;
    }
    function pp(e, t) {
      switch (e) {
        case "keyup":
          return $o.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Gs;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function wf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function Lh(e) {
      return e.locale === "ko";
    }
    var Hl = !1;
    function vp(e, t, a, i, l) {
      var s, f;
      if (oo ? s = Cf(t) : Hl ? pp(t, i) && (s = "onCompositionEnd") : bf(t, i) && (s = "onCompositionStart"), !s)
        return null;
      Tf && !Lh(i) && (!Hl && s === "onCompositionStart" ? Hl = Bo(l) : s === "onCompositionEnd" && Hl && (f = ao()));
      var p = Hh(a, s);
      if (p.length > 0) {
        var v = new Rh(s, t, null, i, l);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var S = wf(i);
          S !== null && (v.data = S);
        }
      }
    }
    function xf(e, t) {
      switch (e) {
        case "compositionend":
          return wf(t);
        case "keypress":
          var a = t.which;
          return a !== Mh ? null : (dp = !0, Rf);
        case "textInput":
          var i = t.data;
          return i === Rf && dp ? null : i;
        default:
          return null;
      }
    }
    function hp(e, t) {
      if (Hl) {
        if (e === "compositionend" || !oo && pp(e, t)) {
          var a = ao();
          return Ef(), Hl = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Nh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Tf && !Lh(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Df(e, t, a, i, l) {
      var s;
      if (fp ? s = xf(t, i) : s = hp(t, i), !s)
        return null;
      var f = Hh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new Ch("onBeforeInput", "beforeinput", null, i, l);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function Ah(e, t, a, i, l, s, f) {
      vp(e, t, a, i, l), Df(e, t, a, i, l);
    }
    var Qy = {
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
      week: !0
    };
    function Qs(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Qy[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function qy(e) {
      if (!Nn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function qs() {
      vt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function zh(e, t, a, i) {
      hu(i);
      var l = Hh(t, "onChange");
      if (l.length > 0) {
        var s = new Ai("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: l
        });
      }
    }
    var Go = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function o(e) {
      var t = [];
      zh(t, n, e, kd(e)), Gv(u, t);
    }
    function u(e) {
      p_(e, 0);
    }
    function c(e) {
      var t = Af(e);
      if (_i(t))
        return e;
    }
    function d(e, t) {
      if (e === "change")
        return t;
    }
    var y = !1;
    Nn && (y = qy("input") && (!document.documentMode || document.documentMode > 9));
    function R(e, t) {
      Go = e, n = t, Go.attachEvent("onpropertychange", V);
    }
    function w() {
      Go && (Go.detachEvent("onpropertychange", V), Go = null, n = null);
    }
    function V(e) {
      e.propertyName === "value" && c(n) && o(e);
    }
    function ae(e, t, a) {
      e === "focusin" ? (w(), R(t, a)) : e === "focusout" && w();
    }
    function oe(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function re(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Se(e, t) {
      if (e === "click")
        return c(t);
    }
    function be(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function ke(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Ve(e, "number", e.value);
    }
    function kn(e, t, a, i, l, s, f) {
      var p = a ? Af(a) : window, v, S;
      if (r(p) ? v = d : Qs(p) ? y ? v = be : (v = oe, S = ae) : re(p) && (v = Se), v) {
        var _ = v(t, a);
        if (_) {
          zh(e, _, i, l);
          return;
        }
      }
      S && S(t, p, a), t === "focusout" && ke(p);
    }
    function L() {
      Wt("onMouseEnter", ["mouseout", "mouseover"]), Wt("onMouseLeave", ["mouseout", "mouseover"]), Wt("onPointerEnter", ["pointerout", "pointerover"]), Wt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function D(e, t, a, i, l, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !fs(i)) {
        var S = i.relatedTarget || i.fromElement;
        if (S && (Zs(S) || Op(S)))
          return;
      }
      if (!(!v && !p)) {
        var _;
        if (l.window === l)
          _ = l;
        else {
          var O = l.ownerDocument;
          O ? _ = O.defaultView || O.parentWindow : _ = window;
        }
        var x, H;
        if (v) {
          var Y = i.relatedTarget || i.toElement;
          if (x = a, H = Y ? Zs(Y) : null, H !== null) {
            var Q = ha(H);
            (H !== Q || H.tag !== N && H.tag !== X) && (H = null);
          }
        } else
          x = null, H = a;
        if (x !== H) {
          var ge = op, Be = "onMouseLeave", Ue = "onMouseEnter", bt = "mouse";
          (t === "pointerout" || t === "pointerover") && (ge = Dh, Be = "onPointerLeave", Ue = "onPointerEnter", bt = "pointer");
          var Et = x == null ? _ : Af(x), z = H == null ? _ : Af(H), q = new ge(Be, bt + "leave", x, i, l);
          q.target = Et, q.relatedTarget = z;
          var U = null, le = Zs(l);
          if (le === a) {
            var Te = new ge(Ue, bt + "enter", H, i, l);
            Te.target = z, Te.relatedTarget = Et, U = Te;
          }
          Bb(e, q, U, x, H);
        }
      }
    }
    function j(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var ie = typeof Object.is == "function" ? Object.is : j;
    function we(e, t) {
      if (ie(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var l = 0; l < a.length; l++) {
        var s = a[l];
        if (!Dr.call(t, s) || !ie(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function $e(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Ge(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Ze(e, t) {
      for (var a = $e(e), i = 0, l = 0; a; ) {
        if (a.nodeType === qi) {
          if (l = i + a.textContent.length, i <= t && l >= t)
            return {
              node: a,
              offset: t - i
            };
          i = l;
        }
        a = $e(Ge(a));
      }
    }
    function nr(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var l = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        l.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return jt(e, l, s, f, p);
    }
    function jt(e, t, a, i, l) {
      var s = 0, f = -1, p = -1, v = 0, S = 0, _ = e, O = null;
      e: for (; ; ) {
        for (var x = null; _ === t && (a === 0 || _.nodeType === qi) && (f = s + a), _ === i && (l === 0 || _.nodeType === qi) && (p = s + l), _.nodeType === qi && (s += _.nodeValue.length), (x = _.firstChild) !== null; )
          O = _, _ = x;
        for (; ; ) {
          if (_ === e)
            break e;
          if (O === t && ++v === a && (f = s), O === i && ++S === l && (p = s), (x = _.nextSibling) !== null)
            break;
          _ = O, O = _.parentNode;
        }
        _ = x;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function Qo(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var l = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!l.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var S = Ze(e, f), _ = Ze(e, p);
        if (S && _) {
          if (l.rangeCount === 1 && l.anchorNode === S.node && l.anchorOffset === S.offset && l.focusNode === _.node && l.focusOffset === _.offset)
            return;
          var O = a.createRange();
          O.setStart(S.node, S.offset), l.removeAllRanges(), f > p ? (l.addRange(O), l.extend(_.node, _.offset)) : (O.setEnd(_.node, _.offset), l.addRange(O));
        }
      }
    }
    function Uh(e) {
      return e && e.nodeType === qi;
    }
    function n_(e, t) {
      return !e || !t ? !1 : e === t ? !0 : Uh(e) ? !1 : Uh(t) ? n_(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function bb(e) {
      return e && e.ownerDocument && n_(e.ownerDocument.documentElement, e);
    }
    function wb(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function r_() {
      for (var e = window, t = Oa(); t instanceof e.HTMLIFrameElement; ) {
        if (wb(t))
          e = t.contentWindow;
        else
          return t;
        t = Oa(e.document);
      }
      return t;
    }
    function Ky(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function xb() {
      var e = r_();
      return {
        focusedElem: e,
        selectionRange: Ky(e) ? Ob(e) : null
      };
    }
    function Db(e) {
      var t = r_(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && bb(a)) {
        i !== null && Ky(a) && kb(a, i);
        for (var l = [], s = a; s = s.parentNode; )
          s.nodeType === qr && l.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < l.length; f++) {
          var p = l[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function Ob(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = nr(e), t || {
        start: 0,
        end: 0
      };
    }
    function kb(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Qo(e, t);
    }
    var Mb = Nn && "documentMode" in document && document.documentMode <= 11;
    function Nb() {
      vt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Of = null, Xy = null, mp = null, Zy = !1;
    function Lb(e) {
      if ("selectionStart" in e && Ky(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function Ab(e) {
      return e.window === e ? e.document : e.nodeType === Ki ? e : e.ownerDocument;
    }
    function a_(e, t, a) {
      var i = Ab(a);
      if (!(Zy || Of == null || Of !== Oa(i))) {
        var l = Lb(Of);
        if (!mp || !we(mp, l)) {
          mp = l;
          var s = Hh(Xy, "onSelect");
          if (s.length > 0) {
            var f = new Ai("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = Of;
          }
        }
      }
    }
    function zb(e, t, a, i, l, s, f) {
      var p = a ? Af(a) : window;
      switch (t) {
        case "focusin":
          (Qs(p) || p.contentEditable === "true") && (Of = p, Xy = a, mp = null);
          break;
        case "focusout":
          Of = null, Xy = null, mp = null;
          break;
        case "mousedown":
          Zy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Zy = !1, a_(e, i, l);
          break;
        case "selectionchange":
          if (Mb)
            break;
        case "keydown":
        case "keyup":
          a_(e, i, l);
      }
    }
    function Ph(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var kf = {
      animationend: Ph("Animation", "AnimationEnd"),
      animationiteration: Ph("Animation", "AnimationIteration"),
      animationstart: Ph("Animation", "AnimationStart"),
      transitionend: Ph("Transition", "TransitionEnd")
    }, Jy = {}, i_ = {};
    Nn && (i_ = document.createElement("div").style, "AnimationEvent" in window || (delete kf.animationend.animation, delete kf.animationiteration.animation, delete kf.animationstart.animation), "TransitionEvent" in window || delete kf.transitionend.transition);
    function jh(e) {
      if (Jy[e])
        return Jy[e];
      if (!kf[e])
        return e;
      var t = kf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in i_)
          return Jy[e] = t[a];
      return e;
    }
    var o_ = jh("animationend"), l_ = jh("animationiteration"), u_ = jh("animationstart"), s_ = jh("transitionend"), c_ = /* @__PURE__ */ new Map(), f_ = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Lu(e, t) {
      c_.set(e, t), vt(t, [e]);
    }
    function Ub() {
      for (var e = 0; e < f_.length; e++) {
        var t = f_[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        Lu(a, "on" + i);
      }
      Lu(o_, "onAnimationEnd"), Lu(l_, "onAnimationIteration"), Lu(u_, "onAnimationStart"), Lu("dblclick", "onDoubleClick"), Lu("focusin", "onFocus"), Lu("focusout", "onBlur"), Lu(s_, "onTransitionEnd");
    }
    function Pb(e, t, a, i, l, s, f) {
      var p = c_.get(t);
      if (p !== void 0) {
        var v = Ai, S = t;
        switch (t) {
          case "keypress":
            if (Yo(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = xh;
            break;
          case "focusin":
            S = "focus", v = io;
            break;
          case "focusout":
            S = "blur", v = io;
            break;
          case "beforeblur":
          case "afterblur":
            v = io;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = op;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = jl;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = kh;
            break;
          case o_:
          case l_:
          case u_:
            v = Th;
            break;
          case s_:
            v = Fa;
            break;
          case "scroll":
            v = ia;
            break;
          case "wheel":
            v = Wy;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = _f;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Dh;
            break;
        }
        var _ = (s & ka) !== 0;
        {
          var O = !_ && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", x = Ib(a, p, i.type, _, O);
          if (x.length > 0) {
            var H = new v(p, S, null, i, l);
            e.push({
              event: H,
              listeners: x
            });
          }
        }
      }
    }
    Ub(), L(), qs(), Nb(), Gy();
    function jb(e, t, a, i, l, s, f) {
      Pb(e, t, a, i, l, s);
      var p = (s & Od) === 0;
      p && (D(e, t, a, i, l), kn(e, t, a, i, l), zb(e, t, a, i, l), Ah(e, t, a, i, l));
    }
    var yp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], eg = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(yp));
    function d_(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Ci(i, t, void 0, e), e.currentTarget = null;
    }
    function Fb(e, t, a) {
      var i;
      if (a)
        for (var l = t.length - 1; l >= 0; l--) {
          var s = t[l], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          d_(e, v, p), i = f;
        }
      else
        for (var S = 0; S < t.length; S++) {
          var _ = t[S], O = _.instance, x = _.currentTarget, H = _.listener;
          if (O !== i && e.isPropagationStopped())
            return;
          d_(e, H, x), i = O;
        }
    }
    function p_(e, t) {
      for (var a = (t & ka) !== 0, i = 0; i < e.length; i++) {
        var l = e[i], s = l.event, f = l.listeners;
        Fb(s, f, a);
      }
      vs();
    }
    function Hb(e, t, a, i, l) {
      var s = kd(a), f = [];
      jb(f, e, i, a, s, t), p_(f, t);
    }
    function Sn(e, t) {
      eg.has(e) || g('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = mw(t), l = Yb(e);
      i.has(l) || (v_(t, e, Dc, a), i.add(l));
    }
    function tg(e, t, a) {
      eg.has(e) && !t && g('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= ka), v_(a, e, i, t);
    }
    var Fh = "_reactListening" + Math.random().toString(36).slice(2);
    function gp(e) {
      if (!e[Fh]) {
        e[Fh] = !0, st.forEach(function(a) {
          a !== "selectionchange" && (eg.has(a) || tg(a, !1, e), tg(a, !0, e));
        });
        var t = e.nodeType === Ki ? e : e.ownerDocument;
        t !== null && (t[Fh] || (t[Fh] = !0, tg("selectionchange", !1, t)));
      }
    }
    function v_(e, t, a, i, l) {
      var s = fr(e, t, a), f = void 0;
      ps && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? ip(e, t, s, f) : aa(e, t, s) : f !== void 0 ? Ou(e, t, s, f) : Bs(e, t, s);
    }
    function h_(e, t) {
      return e === t || e.nodeType === An && e.parentNode === t;
    }
    function ng(e, t, a, i, l) {
      var s = i;
      if (!(t & Dd) && !(t & Dc)) {
        var f = l;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === F || v === W) {
              var S = p.stateNode.containerInfo;
              if (h_(S, f))
                break;
              if (v === W)
                for (var _ = p.return; _ !== null; ) {
                  var O = _.tag;
                  if (O === F || O === W) {
                    var x = _.stateNode.containerInfo;
                    if (h_(x, f))
                      return;
                  }
                  _ = _.return;
                }
              for (; S !== null; ) {
                var H = Zs(S);
                if (H === null)
                  return;
                var Y = H.tag;
                if (Y === N || Y === X) {
                  p = s = H;
                  continue e;
                }
                S = S.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      Gv(function() {
        return Hb(e, t, a, s);
      });
    }
    function Ep(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function Ib(e, t, a, i, l, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], S = e, _ = null; S !== null; ) {
        var O = S, x = O.stateNode, H = O.tag;
        if (H === N && x !== null && (_ = x, p !== null)) {
          var Y = Mo(S, p);
          Y != null && v.push(Ep(S, Y, _));
        }
        if (l)
          break;
        S = S.return;
      }
      return v;
    }
    function Hh(e, t) {
      for (var a = t + "Capture", i = [], l = e; l !== null; ) {
        var s = l, f = s.stateNode, p = s.tag;
        if (p === N && f !== null) {
          var v = f, S = Mo(l, a);
          S != null && i.unshift(Ep(l, S, v));
          var _ = Mo(l, t);
          _ != null && i.push(Ep(l, _, v));
        }
        l = l.return;
      }
      return i;
    }
    function Mf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== N);
      return e || null;
    }
    function Vb(e, t) {
      for (var a = e, i = t, l = 0, s = a; s; s = Mf(s))
        l++;
      for (var f = 0, p = i; p; p = Mf(p))
        f++;
      for (; l - f > 0; )
        a = Mf(a), l--;
      for (; f - l > 0; )
        i = Mf(i), f--;
      for (var v = l; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = Mf(a), i = Mf(i);
      }
      return null;
    }
    function m_(e, t, a, i, l) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, S = v.alternate, _ = v.stateNode, O = v.tag;
        if (S !== null && S === i)
          break;
        if (O === N && _ !== null) {
          var x = _;
          if (l) {
            var H = Mo(p, s);
            H != null && f.unshift(Ep(p, H, x));
          } else if (!l) {
            var Y = Mo(p, s);
            Y != null && f.push(Ep(p, Y, x));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function Bb(e, t, a, i, l) {
      var s = i && l ? Vb(i, l) : null;
      i !== null && m_(e, t, i, s, !1), l !== null && a !== null && m_(e, a, l, s, !0);
    }
    function Yb(e, t) {
      return e + "__bubble";
    }
    var Ha = !1, Sp = "dangerouslySetInnerHTML", Ih = "suppressContentEditableWarning", Au = "suppressHydrationWarning", y_ = "autoFocus", Ks = "children", Xs = "style", Vh = "__html", rg, Bh, _p, g_, Yh, E_, S_;
    rg = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Bh = function(e, t) {
      bd(e, t), wc(e, t), Yv(e, t, {
        registrationNameDependencies: lt,
        possibleRegistrationNames: ct
      });
    }, E_ = Nn && !document.documentMode, _p = function(e, t, a) {
      if (!Ha) {
        var i = $h(a), l = $h(t);
        l !== i && (Ha = !0, g("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(l), JSON.stringify(i)));
      }
    }, g_ = function(e) {
      if (!Ha) {
        Ha = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), g("Extra attributes from the server: %s", t);
      }
    }, Yh = function(e, t) {
      t === !1 ? g("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : g("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, S_ = function(e, t) {
      var a = e.namespaceURI === Qi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var $b = /\r\n?/g, Wb = /\u0000|\uFFFD/g;
    function $h(e) {
      Xn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace($b, `
`).replace(Wb, "");
    }
    function Wh(e, t, a, i) {
      var l = $h(t), s = $h(e);
      if (s !== l && (i && (Ha || (Ha = !0, g('Text content did not match. Server: "%s" Client: "%s"', s, l))), a && Ne))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function __(e) {
      return e.nodeType === Ki ? e : e.ownerDocument;
    }
    function Gb() {
    }
    function Gh(e) {
      e.onclick = Gb;
    }
    function Qb(e, t, a, i, l) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Xs)
            f && Object.freeze(f), jv(t, f);
          else if (s === Sp) {
            var p = f ? f[Vh] : void 0;
            p != null && wv(t, p);
          } else if (s === Ks)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && fu(t, f);
            } else typeof f == "number" && fu(t, "" + f);
          else s === Ih || s === Au || s === y_ || (lt.hasOwnProperty(s) ? f != null && (typeof f != "function" && Yh(s, f), s === "onScroll" && Sn("scroll", t)) : f != null && Or(t, s, f, l));
        }
    }
    function qb(e, t, a, i) {
      for (var l = 0; l < t.length; l += 2) {
        var s = t[l], f = t[l + 1];
        s === Xs ? jv(e, f) : s === Sp ? wv(e, f) : s === Ks ? fu(e, f) : Or(e, s, f, i);
      }
    }
    function Kb(e, t, a, i) {
      var l, s = __(a), f, p = i;
      if (p === Qi && (p = gd(e)), p === Qi) {
        if (l = Oo(e, t), !l && e !== e.toLowerCase() && g("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var S = v.firstChild;
          f = v.removeChild(S);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var _ = f;
          t.multiple ? _.multiple = !0 : t.size && (_.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Qi && !l && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !Dr.call(rg, e) && (rg[e] = !0, g("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function Xb(e, t) {
      return __(t).createTextNode(e);
    }
    function Zb(e, t, a, i) {
      var l = Oo(t, a);
      Bh(t, a);
      var s;
      switch (t) {
        case "dialog":
          Sn("cancel", e), Sn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          Sn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < yp.length; f++)
            Sn(yp[f], e);
          s = a;
          break;
        case "source":
          Sn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          Sn("error", e), Sn("load", e), s = a;
          break;
        case "details":
          Sn("toggle", e), s = a;
          break;
        case "input":
          ri(e, a), s = cu(e, a), Sn("invalid", e);
          break;
        case "option":
          Ot(e, a), s = a;
          break;
        case "select":
          vl(e, a), s = as(e, a), Sn("invalid", e);
          break;
        case "textarea":
          hd(e, a), s = vd(e, a), Sn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (Cc(t, s), Qb(t, e, i, s, l), t) {
        case "input":
          ni(e), I(e, a, !1);
          break;
        case "textarea":
          ni(e), Cv(e);
          break;
        case "option":
          ln(e, a);
          break;
        case "select":
          dd(e, a);
          break;
        default:
          typeof s.onClick == "function" && Gh(e);
          break;
      }
    }
    function Jb(e, t, a, i, l) {
      Bh(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = cu(e, a), p = cu(e, i), s = [];
          break;
        case "select":
          f = as(e, a), p = as(e, i), s = [];
          break;
        case "textarea":
          f = vd(e, a), p = vd(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && Gh(e);
          break;
      }
      Cc(t, p);
      var v, S, _ = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === Xs) {
            var O = f[v];
            for (S in O)
              O.hasOwnProperty(S) && (_ || (_ = {}), _[S] = "");
          } else v === Sp || v === Ks || v === Ih || v === Au || v === y_ || (lt.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var x = p[v], H = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || x === H || x == null && H == null))
          if (v === Xs)
            if (x && Object.freeze(x), H) {
              for (S in H)
                H.hasOwnProperty(S) && (!x || !x.hasOwnProperty(S)) && (_ || (_ = {}), _[S] = "");
              for (S in x)
                x.hasOwnProperty(S) && H[S] !== x[S] && (_ || (_ = {}), _[S] = x[S]);
            } else
              _ || (s || (s = []), s.push(v, _)), _ = x;
          else if (v === Sp) {
            var Y = x ? x[Vh] : void 0, Q = H ? H[Vh] : void 0;
            Y != null && Q !== Y && (s = s || []).push(v, Y);
          } else v === Ks ? (typeof x == "string" || typeof x == "number") && (s = s || []).push(v, "" + x) : v === Ih || v === Au || (lt.hasOwnProperty(v) ? (x != null && (typeof x != "function" && Yh(v, x), v === "onScroll" && Sn("scroll", e)), !s && H !== x && (s = [])) : (s = s || []).push(v, x));
      }
      return _ && (ky(_, p[Xs]), (s = s || []).push(Xs, _)), s;
    }
    function e0(e, t, a, i, l) {
      a === "input" && l.type === "radio" && l.name != null && h(e, l);
      var s = Oo(a, i), f = Oo(a, l);
      switch (qb(e, t, s, f), a) {
        case "input":
          C(e, l);
          break;
        case "textarea":
          Rv(e, l);
          break;
        case "select":
          _c(e, l);
          break;
      }
    }
    function t0(e) {
      {
        var t = e.toLowerCase();
        return ss.hasOwnProperty(t) && ss[t] || null;
      }
    }
    function n0(e, t, a, i, l, s, f) {
      var p, v;
      switch (p = Oo(t, a), Bh(t, a), t) {
        case "dialog":
          Sn("cancel", e), Sn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Sn("load", e);
          break;
        case "video":
        case "audio":
          for (var S = 0; S < yp.length; S++)
            Sn(yp[S], e);
          break;
        case "source":
          Sn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Sn("error", e), Sn("load", e);
          break;
        case "details":
          Sn("toggle", e);
          break;
        case "input":
          ri(e, a), Sn("invalid", e);
          break;
        case "option":
          Ot(e, a);
          break;
        case "select":
          vl(e, a), Sn("invalid", e);
          break;
        case "textarea":
          hd(e, a), Sn("invalid", e);
          break;
      }
      Cc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var _ = e.attributes, O = 0; O < _.length; O++) {
          var x = _[O].name.toLowerCase();
          switch (x) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(_[O].name);
          }
        }
      }
      var H = null;
      for (var Y in a)
        if (a.hasOwnProperty(Y)) {
          var Q = a[Y];
          if (Y === Ks)
            typeof Q == "string" ? e.textContent !== Q && (a[Au] !== !0 && Wh(e.textContent, Q, s, f), H = [Ks, Q]) : typeof Q == "number" && e.textContent !== "" + Q && (a[Au] !== !0 && Wh(e.textContent, Q, s, f), H = [Ks, "" + Q]);
          else if (lt.hasOwnProperty(Y))
            Q != null && (typeof Q != "function" && Yh(Y, Q), Y === "onScroll" && Sn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var ge = void 0, Be = an(Y);
            if (a[Au] !== !0) {
              if (!(Y === Ih || Y === Au || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              Y === "value" || Y === "checked" || Y === "selected")) {
                if (Y === Sp) {
                  var Ue = e.innerHTML, bt = Q ? Q[Vh] : void 0;
                  if (bt != null) {
                    var Et = S_(e, bt);
                    Et !== Ue && _p(Y, Ue, Et);
                  }
                } else if (Y === Xs) {
                  if (v.delete(Y), E_) {
                    var z = Dy(Q);
                    ge = e.getAttribute("style"), z !== ge && _p(Y, ge, z);
                  }
                } else if (p && !k)
                  v.delete(Y.toLowerCase()), ge = ll(e, Y, Q), Q !== ge && _p(Y, ge, Q);
                else if (!hn(Y, Be, p) && !Zn(Y, Q, Be, p)) {
                  var q = !1;
                  if (Be !== null)
                    v.delete(Be.attributeName), ge = So(e, Y, Q, Be);
                  else {
                    var U = i;
                    if (U === Qi && (U = gd(t)), U === Qi)
                      v.delete(Y.toLowerCase());
                    else {
                      var le = t0(Y);
                      le !== null && le !== Y && (q = !0, v.delete(le)), v.delete(Y);
                    }
                    ge = ll(e, Y, Q);
                  }
                  var Te = k;
                  !Te && Q !== ge && !q && _p(Y, ge, Q);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[Au] !== !0 && g_(v), t) {
        case "input":
          ni(e), I(e, a, !0);
          break;
        case "textarea":
          ni(e), Cv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Gh(e);
          break;
      }
      return H;
    }
    function r0(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function ag(e, t) {
      {
        if (Ha)
          return;
        Ha = !0, g("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function ig(e, t) {
      {
        if (Ha)
          return;
        Ha = !0, g('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function og(e, t, a) {
      {
        if (Ha)
          return;
        Ha = !0, g("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function lg(e, t) {
      {
        if (t === "" || Ha)
          return;
        Ha = !0, g('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function a0(e, t, a) {
      switch (t) {
        case "input":
          G(e, a);
          return;
        case "textarea":
          Cy(e, a);
          return;
        case "select":
          pd(e, a);
          return;
      }
    }
    var Tp = function() {
    }, Rp = function() {
    };
    {
      var i0 = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], T_ = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], o0 = T_.concat(["button"]), l0 = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], R_ = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      Rp = function(e, t) {
        var a = ut({}, e || R_), i = {
          tag: t
        };
        return T_.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), o0.indexOf(t) !== -1 && (a.pTagInButtonScope = null), i0.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var u0 = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return l0.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, s0 = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, C_ = {};
      Tp = function(e, t, a) {
        a = a || R_;
        var i = a.current, l = i && i.tag;
        t != null && (e != null && g("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = u0(e, l) ? null : i, f = s ? null : s0(e, a), p = s || f;
        if (p) {
          var v = p.tag, S = !!s + "|" + e + "|" + v;
          if (!C_[S]) {
            C_[S] = !0;
            var _ = e, O = "";
            if (e === "#text" ? /\S/.test(t) ? _ = "Text nodes" : (_ = "Whitespace text nodes", O = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : _ = "<" + e + ">", s) {
              var x = "";
              v === "table" && e === "tr" && (x += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), g("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", _, v, O, x);
            } else
              g("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", _, v);
          }
        }
      };
    }
    var Qh = "suppressHydrationWarning", qh = "$", Kh = "/$", Cp = "$?", bp = "$!", c0 = "style", ug = null, sg = null;
    function f0(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Ki:
        case Sd: {
          t = i === Ki ? "#document" : "#fragment";
          var l = e.documentElement;
          a = l ? l.namespaceURI : Ed(null, "");
          break;
        }
        default: {
          var s = i === An ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = Ed(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = Rp(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function d0(e, t, a) {
      {
        var i = e, l = Ed(i.namespace, t), s = Rp(i.ancestorInfo, t);
        return {
          namespace: l,
          ancestorInfo: s
        };
      }
    }
    function Ek(e) {
      return e;
    }
    function p0(e) {
      ug = Hn(), sg = xb();
      var t = null;
      return qn(!1), t;
    }
    function v0(e) {
      Db(sg), qn(ug), ug = null, sg = null;
    }
    function h0(e, t, a, i, l) {
      var s;
      {
        var f = i;
        if (Tp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = Rp(f.ancestorInfo, e);
          Tp(null, p, v);
        }
        s = f.namespace;
      }
      var S = Kb(e, t, a, s);
      return Dp(l, S), yg(S, t), S;
    }
    function m0(e, t) {
      e.appendChild(t);
    }
    function y0(e, t, a, i, l) {
      switch (Zb(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function g0(e, t, a, i, l, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = Rp(f.ancestorInfo, t);
          Tp(null, p, v);
        }
      }
      return Jb(e, t, a, i);
    }
    function cg(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function E0(e, t, a, i) {
      {
        var l = a;
        Tp(null, e, l.ancestorInfo);
      }
      var s = Xb(e, t);
      return Dp(i, s), s;
    }
    function S0() {
      var e = window.event;
      return e === void 0 ? Ua : gf(e.type);
    }
    var fg = typeof setTimeout == "function" ? setTimeout : void 0, _0 = typeof clearTimeout == "function" ? clearTimeout : void 0, dg = -1, b_ = typeof Promise == "function" ? Promise : void 0, T0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof b_ < "u" ? function(e) {
      return b_.resolve(null).then(e).catch(R0);
    } : fg;
    function R0(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function C0(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function b0(e, t, a, i, l, s) {
      e0(e, t, a, i, l), yg(e, l);
    }
    function w_(e) {
      fu(e, "");
    }
    function w0(e, t, a) {
      e.nodeValue = a;
    }
    function x0(e, t) {
      e.appendChild(t);
    }
    function D0(e, t) {
      var a;
      e.nodeType === An ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Gh(a);
    }
    function O0(e, t, a) {
      e.insertBefore(t, a);
    }
    function k0(e, t, a) {
      e.nodeType === An ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function M0(e, t) {
      e.removeChild(t);
    }
    function N0(e, t) {
      e.nodeType === An ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function pg(e, t) {
      var a = t, i = 0;
      do {
        var l = a.nextSibling;
        if (e.removeChild(a), l && l.nodeType === An) {
          var s = l.data;
          if (s === Kh)
            if (i === 0) {
              e.removeChild(l), zl(t);
              return;
            } else
              i--;
          else (s === qh || s === Cp || s === bp) && i++;
        }
        a = l;
      } while (a);
      zl(t);
    }
    function L0(e, t) {
      e.nodeType === An ? pg(e.parentNode, t) : e.nodeType === qr && pg(e, t), zl(e);
    }
    function A0(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function z0(e) {
      e.nodeValue = "";
    }
    function U0(e, t) {
      e = e;
      var a = t[c0], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Rc("display", i);
    }
    function P0(e, t) {
      e.nodeValue = t;
    }
    function j0(e) {
      e.nodeType === qr ? e.textContent = "" : e.nodeType === Ki && e.documentElement && e.removeChild(e.documentElement);
    }
    function F0(e, t, a) {
      return e.nodeType !== qr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function H0(e, t) {
      return t === "" || e.nodeType !== qi ? null : e;
    }
    function I0(e) {
      return e.nodeType !== An ? null : e;
    }
    function x_(e) {
      return e.data === Cp;
    }
    function vg(e) {
      return e.data === bp;
    }
    function V0(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, l;
      return t && (a = t.dgst, i = t.msg, l = t.stck), {
        message: i,
        digest: a,
        stack: l
      };
    }
    function B0(e, t) {
      e._reactRetry = t;
    }
    function Xh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === qr || t === qi)
          break;
        if (t === An) {
          var a = e.data;
          if (a === qh || a === bp || a === Cp)
            break;
          if (a === Kh)
            return null;
        }
      }
      return e;
    }
    function wp(e) {
      return Xh(e.nextSibling);
    }
    function Y0(e) {
      return Xh(e.firstChild);
    }
    function $0(e) {
      return Xh(e.firstChild);
    }
    function W0(e) {
      return Xh(e.nextSibling);
    }
    function G0(e, t, a, i, l, s, f) {
      Dp(s, e), yg(e, a);
      var p;
      {
        var v = l;
        p = v.namespace;
      }
      var S = (s.mode & mt) !== Ie;
      return n0(e, t, a, p, i, S, f);
    }
    function Q0(e, t, a, i) {
      return Dp(a, e), a.mode & mt, r0(e, t);
    }
    function q0(e, t) {
      Dp(t, e);
    }
    function K0(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === An) {
          var i = t.data;
          if (i === Kh) {
            if (a === 0)
              return wp(t);
            a--;
          } else (i === qh || i === bp || i === Cp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function D_(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === An) {
          var i = t.data;
          if (i === qh || i === bp || i === Cp) {
            if (a === 0)
              return t;
            a--;
          } else i === Kh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function X0(e) {
      zl(e);
    }
    function Z0(e) {
      zl(e);
    }
    function J0(e) {
      return e !== "head" && e !== "body";
    }
    function ew(e, t, a, i) {
      var l = !0;
      Wh(t.nodeValue, a, i, l);
    }
    function tw(e, t, a, i, l, s) {
      if (t[Qh] !== !0) {
        var f = !0;
        Wh(i.nodeValue, l, s, f);
      }
    }
    function nw(e, t) {
      t.nodeType === qr ? ag(e, t) : t.nodeType === An || ig(e, t);
    }
    function rw(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === qr ? ag(a, t) : t.nodeType === An || ig(a, t));
      }
    }
    function aw(e, t, a, i, l) {
      (l || t[Qh] !== !0) && (i.nodeType === qr ? ag(a, i) : i.nodeType === An || ig(a, i));
    }
    function iw(e, t, a) {
      og(e, t);
    }
    function ow(e, t) {
      lg(e, t);
    }
    function lw(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && og(i, t);
      }
    }
    function uw(e, t) {
      {
        var a = e.parentNode;
        a !== null && lg(a, t);
      }
    }
    function sw(e, t, a, i, l, s) {
      (s || t[Qh] !== !0) && og(a, i);
    }
    function cw(e, t, a, i, l) {
      (l || t[Qh] !== !0) && lg(a, i);
    }
    function fw(e) {
      g("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function dw(e) {
      gp(e);
    }
    var Nf = Math.random().toString(36).slice(2), Lf = "__reactFiber$" + Nf, hg = "__reactProps$" + Nf, xp = "__reactContainer$" + Nf, mg = "__reactEvents$" + Nf, pw = "__reactListeners$" + Nf, vw = "__reactHandles$" + Nf;
    function hw(e) {
      delete e[Lf], delete e[hg], delete e[mg], delete e[pw], delete e[vw];
    }
    function Dp(e, t) {
      t[Lf] = e;
    }
    function Zh(e, t) {
      t[xp] = e;
    }
    function O_(e) {
      e[xp] = null;
    }
    function Op(e) {
      return !!e[xp];
    }
    function Zs(e) {
      var t = e[Lf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[xp] || a[Lf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var l = D_(e); l !== null; ) {
              var s = l[Lf];
              if (s)
                return s;
              l = D_(l);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function zu(e) {
      var t = e[Lf] || e[xp];
      return t && (t.tag === N || t.tag === X || t.tag === Oe || t.tag === F) ? t : null;
    }
    function Af(e) {
      if (e.tag === N || e.tag === X)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Jh(e) {
      return e[hg] || null;
    }
    function yg(e, t) {
      e[hg] = t;
    }
    function mw(e) {
      var t = e[mg];
      return t === void 0 && (t = e[mg] = /* @__PURE__ */ new Set()), t;
    }
    var k_ = {}, M_ = E.ReactDebugCurrentFrame;
    function em(e) {
      if (e) {
        var t = e._owner, a = $i(e.type, e._source, t ? t.type : null);
        M_.setExtraStackFrame(a);
      } else
        M_.setExtraStackFrame(null);
    }
    function lo(e, t, a, i, l) {
      {
        var s = Function.call.bind(Dr);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (S) {
              p = S;
            }
            p && !(p instanceof Error) && (em(l), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), em(null)), p instanceof Error && !(p.message in k_) && (k_[p.message] = !0, em(l), g("Failed %s type: %s", a, p.message), em(null));
          }
      }
    }
    var gg = [], tm;
    tm = [];
    var Il = -1;
    function Uu(e) {
      return {
        current: e
      };
    }
    function oa(e, t) {
      if (Il < 0) {
        g("Unexpected pop.");
        return;
      }
      t !== tm[Il] && g("Unexpected Fiber popped."), e.current = gg[Il], gg[Il] = null, tm[Il] = null, Il--;
    }
    function la(e, t, a) {
      Il++, gg[Il] = e.current, tm[Il] = a, e.current = t;
    }
    var Eg;
    Eg = {};
    var ci = {};
    Object.freeze(ci);
    var Vl = Uu(ci), qo = Uu(!1), Sg = ci;
    function zf(e, t, a) {
      return a && Ko(t) ? Sg : Vl.current;
    }
    function N_(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Uf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return ci;
        var l = e.stateNode;
        if (l && l.__reactInternalMemoizedUnmaskedChildContext === t)
          return l.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = et(e) || "Unknown";
          lo(i, s, "context", p);
        }
        return l && N_(e, t, s), s;
      }
    }
    function nm() {
      return qo.current;
    }
    function Ko(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function rm(e) {
      oa(qo, e), oa(Vl, e);
    }
    function _g(e) {
      oa(qo, e), oa(Vl, e);
    }
    function L_(e, t, a) {
      {
        if (Vl.current !== ci)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        la(Vl, t, e), la(qo, a, e);
      }
    }
    function A_(e, t, a) {
      {
        var i = e.stateNode, l = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = et(e) || "Unknown";
            Eg[s] || (Eg[s] = !0, g("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in l))
            throw new Error((et(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = et(e) || "Unknown";
          lo(l, f, "child context", v);
        }
        return ut({}, a, f);
      }
    }
    function am(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || ci;
        return Sg = Vl.current, la(Vl, a, e), la(qo, qo.current, e), !0;
      }
    }
    function z_(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var l = A_(e, t, Sg);
          i.__reactInternalMemoizedMergedChildContext = l, oa(qo, e), oa(Vl, e), la(Vl, l, e), la(qo, a, e);
        } else
          oa(qo, e), la(qo, a, e);
      }
    }
    function yw(e) {
      {
        if (!_l(e) || e.tag !== K)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case F:
              return t.stateNode.context;
            case K: {
              var a = t.type;
              if (Ko(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Pu = 0, im = 1, Bl = null, Tg = !1, Rg = !1;
    function U_(e) {
      Bl === null ? Bl = [e] : Bl.push(e);
    }
    function gw(e) {
      Tg = !0, U_(e);
    }
    function P_() {
      Tg && ju();
    }
    function ju() {
      if (!Rg && Bl !== null) {
        Rg = !0;
        var e = 0, t = ja();
        try {
          var a = !0, i = Bl;
          for (Fn(Ar); e < i.length; e++) {
            var l = i[e];
            do
              l = l(a);
            while (l !== null);
          }
          Bl = null, Tg = !1;
        } catch (s) {
          throw Bl !== null && (Bl = Bl.slice(e + 1)), Nd(ys, ju), s;
        } finally {
          Fn(t), Rg = !1;
        }
      }
      return null;
    }
    var Pf = [], jf = 0, om = null, lm = 0, zi = [], Ui = 0, Js = null, Yl = 1, $l = "";
    function Ew(e) {
      return tc(), (e.flags & bi) !== He;
    }
    function Sw(e) {
      return tc(), lm;
    }
    function _w() {
      var e = $l, t = Yl, a = t & ~Tw(t);
      return a.toString(32) + e;
    }
    function ec(e, t) {
      tc(), Pf[jf++] = lm, Pf[jf++] = om, om = e, lm = t;
    }
    function j_(e, t, a) {
      tc(), zi[Ui++] = Yl, zi[Ui++] = $l, zi[Ui++] = Js, Js = e;
      var i = Yl, l = $l, s = um(i) - 1, f = i & ~(1 << s), p = a + 1, v = um(t) + s;
      if (v > 30) {
        var S = s - s % 5, _ = (1 << S) - 1, O = (f & _).toString(32), x = f >> S, H = s - S, Y = um(t) + H, Q = p << H, ge = Q | x, Be = O + l;
        Yl = 1 << Y | ge, $l = Be;
      } else {
        var Ue = p << s, bt = Ue | f, Et = l;
        Yl = 1 << v | bt, $l = Et;
      }
    }
    function Cg(e) {
      tc();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        ec(e, a), j_(e, a, i);
      }
    }
    function um(e) {
      return 32 - Pn(e);
    }
    function Tw(e) {
      return 1 << um(e) - 1;
    }
    function bg(e) {
      for (; e === om; )
        om = Pf[--jf], Pf[jf] = null, lm = Pf[--jf], Pf[jf] = null;
      for (; e === Js; )
        Js = zi[--Ui], zi[Ui] = null, $l = zi[--Ui], zi[Ui] = null, Yl = zi[--Ui], zi[Ui] = null;
    }
    function Rw() {
      return tc(), Js !== null ? {
        id: Yl,
        overflow: $l
      } : null;
    }
    function Cw(e, t) {
      tc(), zi[Ui++] = Yl, zi[Ui++] = $l, zi[Ui++] = Js, Yl = t.id, $l = t.overflow, Js = e;
    }
    function tc() {
      Fr() || g("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var jr = null, Pi = null, uo = !1, nc = !1, Fu = null;
    function bw() {
      uo && g("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function F_() {
      nc = !0;
    }
    function ww() {
      return nc;
    }
    function xw(e) {
      var t = e.stateNode.containerInfo;
      return Pi = $0(t), jr = e, uo = !0, Fu = null, nc = !1, !0;
    }
    function Dw(e, t, a) {
      return Pi = W0(t), jr = e, uo = !0, Fu = null, nc = !1, a !== null && Cw(e, a), !0;
    }
    function H_(e, t) {
      switch (e.tag) {
        case F: {
          nw(e.stateNode.containerInfo, t);
          break;
        }
        case N: {
          var a = (e.mode & mt) !== Ie;
          aw(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case Oe: {
          var i = e.memoizedState;
          i.dehydrated !== null && rw(i.dehydrated, t);
          break;
        }
      }
    }
    function I_(e, t) {
      H_(e, t);
      var a = ND();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Ma) : i.push(a);
    }
    function wg(e, t) {
      {
        if (nc)
          return;
        switch (e.tag) {
          case F: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case N:
                var i = t.type;
                t.pendingProps, iw(a, i);
                break;
              case X:
                var l = t.pendingProps;
                ow(a, l);
                break;
            }
            break;
          }
          case N: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case N: {
                var v = t.type, S = t.pendingProps, _ = (e.mode & mt) !== Ie;
                sw(
                  s,
                  f,
                  p,
                  v,
                  S,
                  // TODO: Delete this argument when we remove the legacy root API.
                  _
                );
                break;
              }
              case X: {
                var O = t.pendingProps, x = (e.mode & mt) !== Ie;
                cw(
                  s,
                  f,
                  p,
                  O,
                  // TODO: Delete this argument when we remove the legacy root API.
                  x
                );
                break;
              }
            }
            break;
          }
          case Oe: {
            var H = e.memoizedState, Y = H.dehydrated;
            if (Y !== null) switch (t.tag) {
              case N:
                var Q = t.type;
                t.pendingProps, lw(Y, Q);
                break;
              case X:
                var ge = t.pendingProps;
                uw(Y, ge);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function V_(e, t) {
      t.flags = t.flags & ~Xr | yn, wg(e, t);
    }
    function B_(e, t) {
      switch (e.tag) {
        case N: {
          var a = e.type;
          e.pendingProps;
          var i = F0(t, a);
          return i !== null ? (e.stateNode = i, jr = e, Pi = Y0(i), !0) : !1;
        }
        case X: {
          var l = e.pendingProps, s = H0(t, l);
          return s !== null ? (e.stateNode = s, jr = e, Pi = null, !0) : !1;
        }
        case Oe: {
          var f = I0(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: Rw(),
              retryLane: ta
            };
            e.memoizedState = p;
            var v = LD(f);
            return v.return = e, e.child = v, jr = e, Pi = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function xg(e) {
      return (e.mode & mt) !== Ie && (e.flags & Pe) === He;
    }
    function Dg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Og(e) {
      if (uo) {
        var t = Pi;
        if (!t) {
          xg(e) && (wg(jr, e), Dg()), V_(jr, e), uo = !1, jr = e;
          return;
        }
        var a = t;
        if (!B_(e, t)) {
          xg(e) && (wg(jr, e), Dg()), t = wp(a);
          var i = jr;
          if (!t || !B_(e, t)) {
            V_(jr, e), uo = !1, jr = e;
            return;
          }
          I_(i, a);
        }
      }
    }
    function Ow(e, t, a) {
      var i = e.stateNode, l = !nc, s = G0(i, e.type, e.memoizedProps, t, a, e, l);
      return e.updateQueue = s, s !== null;
    }
    function kw(e) {
      var t = e.stateNode, a = e.memoizedProps, i = Q0(t, a, e);
      if (i) {
        var l = jr;
        if (l !== null)
          switch (l.tag) {
            case F: {
              var s = l.stateNode.containerInfo, f = (l.mode & mt) !== Ie;
              ew(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case N: {
              var p = l.type, v = l.memoizedProps, S = l.stateNode, _ = (l.mode & mt) !== Ie;
              tw(
                p,
                v,
                S,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                _
              );
              break;
            }
          }
      }
      return i;
    }
    function Mw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      q0(a, e);
    }
    function Nw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return K0(a);
    }
    function Y_(e) {
      for (var t = e.return; t !== null && t.tag !== N && t.tag !== F && t.tag !== Oe; )
        t = t.return;
      jr = t;
    }
    function sm(e) {
      if (e !== jr)
        return !1;
      if (!uo)
        return Y_(e), uo = !0, !1;
      if (e.tag !== F && (e.tag !== N || J0(e.type) && !cg(e.type, e.memoizedProps))) {
        var t = Pi;
        if (t)
          if (xg(e))
            $_(e), Dg();
          else
            for (; t; )
              I_(e, t), t = wp(t);
      }
      return Y_(e), e.tag === Oe ? Pi = Nw(e) : Pi = jr ? wp(e.stateNode) : null, !0;
    }
    function Lw() {
      return uo && Pi !== null;
    }
    function $_(e) {
      for (var t = Pi; t; )
        H_(e, t), t = wp(t);
    }
    function Ff() {
      jr = null, Pi = null, uo = !1, nc = !1;
    }
    function W_() {
      Fu !== null && (FR(Fu), Fu = null);
    }
    function Fr() {
      return uo;
    }
    function kg(e) {
      Fu === null ? Fu = [e] : Fu.push(e);
    }
    var Aw = E.ReactCurrentBatchConfig, zw = null;
    function Uw() {
      return Aw.transition;
    }
    var so = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Pw = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Jt && (t = a), a = a.return;
        return t;
      }, rc = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, kp = [], Mp = [], Np = [], Lp = [], Ap = [], zp = [], ac = /* @__PURE__ */ new Set();
      so.recordUnsafeLifecycleWarnings = function(e, t) {
        ac.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && kp.push(e), e.mode & Jt && typeof t.UNSAFE_componentWillMount == "function" && Mp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Np.push(e), e.mode & Jt && typeof t.UNSAFE_componentWillReceiveProps == "function" && Lp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Ap.push(e), e.mode & Jt && typeof t.UNSAFE_componentWillUpdate == "function" && zp.push(e));
      }, so.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        kp.length > 0 && (kp.forEach(function(x) {
          e.add(et(x) || "Component"), ac.add(x.type);
        }), kp = []);
        var t = /* @__PURE__ */ new Set();
        Mp.length > 0 && (Mp.forEach(function(x) {
          t.add(et(x) || "Component"), ac.add(x.type);
        }), Mp = []);
        var a = /* @__PURE__ */ new Set();
        Np.length > 0 && (Np.forEach(function(x) {
          a.add(et(x) || "Component"), ac.add(x.type);
        }), Np = []);
        var i = /* @__PURE__ */ new Set();
        Lp.length > 0 && (Lp.forEach(function(x) {
          i.add(et(x) || "Component"), ac.add(x.type);
        }), Lp = []);
        var l = /* @__PURE__ */ new Set();
        Ap.length > 0 && (Ap.forEach(function(x) {
          l.add(et(x) || "Component"), ac.add(x.type);
        }), Ap = []);
        var s = /* @__PURE__ */ new Set();
        if (zp.length > 0 && (zp.forEach(function(x) {
          s.add(et(x) || "Component"), ac.add(x.type);
        }), zp = []), t.size > 0) {
          var f = rc(t);
          g(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = rc(i);
          g(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = rc(s);
          g(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var S = rc(e);
          A(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, S);
        }
        if (a.size > 0) {
          var _ = rc(a);
          A(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, _);
        }
        if (l.size > 0) {
          var O = rc(l);
          A(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, O);
        }
      };
      var cm = /* @__PURE__ */ new Map(), G_ = /* @__PURE__ */ new Set();
      so.recordLegacyContextWarning = function(e, t) {
        var a = Pw(e);
        if (a === null) {
          g("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!G_.has(e.type)) {
          var i = cm.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], cm.set(a, i)), i.push(e));
        }
      }, so.flushLegacyContextWarning = function() {
        cm.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(et(s) || "Component"), G_.add(s.type);
            });
            var l = rc(i);
            try {
              Kt(a), g(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, l);
            } finally {
              fn();
            }
          }
        });
      }, so.discardPendingWarnings = function() {
        kp = [], Mp = [], Np = [], Lp = [], Ap = [], zp = [], cm = /* @__PURE__ */ new Map();
      };
    }
    var Mg, Ng, Lg, Ag, zg, Q_ = function(e, t) {
    };
    Mg = !1, Ng = !1, Lg = {}, Ag = {}, zg = {}, Q_ = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = et(t) || "Component";
        Ag[a] || (Ag[a] = !0, g('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function jw(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Up(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Jt || Z) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== K) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !jw(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var l = et(e) || "Component";
          Lg[l] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', l, i), Lg[l] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== K)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          pi(i, "ref");
          var S = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === S)
            return t.ref;
          var _ = function(O) {
            var x = v.refs;
            O === null ? delete x[S] : x[S] = O;
          };
          return _._stringRef = S, _;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function fm(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function dm(e) {
      {
        var t = et(e) || "Component";
        if (zg[t])
          return;
        zg[t] = !0, g("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function q_(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function K_(e) {
      function t(z, q) {
        if (e) {
          var U = z.deletions;
          U === null ? (z.deletions = [q], z.flags |= Ma) : U.push(q);
        }
      }
      function a(z, q) {
        if (!e)
          return null;
        for (var U = q; U !== null; )
          t(z, U), U = U.sibling;
        return null;
      }
      function i(z, q) {
        for (var U = /* @__PURE__ */ new Map(), le = q; le !== null; )
          le.key !== null ? U.set(le.key, le) : U.set(le.index, le), le = le.sibling;
        return U;
      }
      function l(z, q) {
        var U = pc(z, q);
        return U.index = 0, U.sibling = null, U;
      }
      function s(z, q, U) {
        if (z.index = U, !e)
          return z.flags |= bi, q;
        var le = z.alternate;
        if (le !== null) {
          var Te = le.index;
          return Te < q ? (z.flags |= yn, q) : Te;
        } else
          return z.flags |= yn, q;
      }
      function f(z) {
        return e && z.alternate === null && (z.flags |= yn), z;
      }
      function p(z, q, U, le) {
        if (q === null || q.tag !== X) {
          var Te = kS(U, z.mode, le);
          return Te.return = z, Te;
        } else {
          var Ee = l(q, U);
          return Ee.return = z, Ee;
        }
      }
      function v(z, q, U, le) {
        var Te = U.type;
        if (Te === hi)
          return _(z, q, U.props.children, le, U.key);
        if (q !== null && (q.elementType === Te || // Keep this check inline so it only runs on the false path:
        tC(q, U) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Te == "object" && Te !== null && Te.$$typeof === tt && q_(Te) === q.type)) {
          var Ee = l(q, U.props);
          return Ee.ref = Up(z, q, U), Ee.return = z, Ee._debugSource = U._source, Ee._debugOwner = U._owner, Ee;
        }
        var Xe = OS(U, z.mode, le);
        return Xe.ref = Up(z, q, U), Xe.return = z, Xe;
      }
      function S(z, q, U, le) {
        if (q === null || q.tag !== W || q.stateNode.containerInfo !== U.containerInfo || q.stateNode.implementation !== U.implementation) {
          var Te = MS(U, z.mode, le);
          return Te.return = z, Te;
        } else {
          var Ee = l(q, U.children || []);
          return Ee.return = z, Ee;
        }
      }
      function _(z, q, U, le, Te) {
        if (q === null || q.tag !== fe) {
          var Ee = Ku(U, z.mode, le, Te);
          return Ee.return = z, Ee;
        } else {
          var Xe = l(q, U);
          return Xe.return = z, Xe;
        }
      }
      function O(z, q, U) {
        if (typeof q == "string" && q !== "" || typeof q == "number") {
          var le = kS("" + q, z.mode, U);
          return le.return = z, le;
        }
        if (typeof q == "object" && q !== null) {
          switch (q.$$typeof) {
            case kr: {
              var Te = OS(q, z.mode, U);
              return Te.ref = Up(z, null, q), Te.return = z, Te;
            }
            case ir: {
              var Ee = MS(q, z.mode, U);
              return Ee.return = z, Ee;
            }
            case tt: {
              var Xe = q._payload, rt = q._init;
              return O(z, rt(Xe), U);
            }
          }
          if (dt(q) || it(q)) {
            var tn = Ku(q, z.mode, U, null);
            return tn.return = z, tn;
          }
          fm(z, q);
        }
        return typeof q == "function" && dm(z), null;
      }
      function x(z, q, U, le) {
        var Te = q !== null ? q.key : null;
        if (typeof U == "string" && U !== "" || typeof U == "number")
          return Te !== null ? null : p(z, q, "" + U, le);
        if (typeof U == "object" && U !== null) {
          switch (U.$$typeof) {
            case kr:
              return U.key === Te ? v(z, q, U, le) : null;
            case ir:
              return U.key === Te ? S(z, q, U, le) : null;
            case tt: {
              var Ee = U._payload, Xe = U._init;
              return x(z, q, Xe(Ee), le);
            }
          }
          if (dt(U) || it(U))
            return Te !== null ? null : _(z, q, U, le, null);
          fm(z, U);
        }
        return typeof U == "function" && dm(z), null;
      }
      function H(z, q, U, le, Te) {
        if (typeof le == "string" && le !== "" || typeof le == "number") {
          var Ee = z.get(U) || null;
          return p(q, Ee, "" + le, Te);
        }
        if (typeof le == "object" && le !== null) {
          switch (le.$$typeof) {
            case kr: {
              var Xe = z.get(le.key === null ? U : le.key) || null;
              return v(q, Xe, le, Te);
            }
            case ir: {
              var rt = z.get(le.key === null ? U : le.key) || null;
              return S(q, rt, le, Te);
            }
            case tt:
              var tn = le._payload, Ft = le._init;
              return H(z, q, U, Ft(tn), Te);
          }
          if (dt(le) || it(le)) {
            var Kn = z.get(U) || null;
            return _(q, Kn, le, Te, null);
          }
          fm(q, le);
        }
        return typeof le == "function" && dm(q), null;
      }
      function Y(z, q, U) {
        {
          if (typeof z != "object" || z === null)
            return q;
          switch (z.$$typeof) {
            case kr:
            case ir:
              Q_(z, U);
              var le = z.key;
              if (typeof le != "string")
                break;
              if (q === null) {
                q = /* @__PURE__ */ new Set(), q.add(le);
                break;
              }
              if (!q.has(le)) {
                q.add(le);
                break;
              }
              g("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", le);
              break;
            case tt:
              var Te = z._payload, Ee = z._init;
              Y(Ee(Te), q, U);
              break;
          }
        }
        return q;
      }
      function Q(z, q, U, le) {
        for (var Te = null, Ee = 0; Ee < U.length; Ee++) {
          var Xe = U[Ee];
          Te = Y(Xe, Te, z);
        }
        for (var rt = null, tn = null, Ft = q, Kn = 0, Ht = 0, Vn = null; Ft !== null && Ht < U.length; Ht++) {
          Ft.index > Ht ? (Vn = Ft, Ft = null) : Vn = Ft.sibling;
          var sa = x(z, Ft, U[Ht], le);
          if (sa === null) {
            Ft === null && (Ft = Vn);
            break;
          }
          e && Ft && sa.alternate === null && t(z, Ft), Kn = s(sa, Kn, Ht), tn === null ? rt = sa : tn.sibling = sa, tn = sa, Ft = Vn;
        }
        if (Ht === U.length) {
          if (a(z, Ft), Fr()) {
            var Wr = Ht;
            ec(z, Wr);
          }
          return rt;
        }
        if (Ft === null) {
          for (; Ht < U.length; Ht++) {
            var di = O(z, U[Ht], le);
            di !== null && (Kn = s(di, Kn, Ht), tn === null ? rt = di : tn.sibling = di, tn = di);
          }
          if (Fr()) {
            var Ca = Ht;
            ec(z, Ca);
          }
          return rt;
        }
        for (var ba = i(z, Ft); Ht < U.length; Ht++) {
          var ca = H(ba, z, Ht, U[Ht], le);
          ca !== null && (e && ca.alternate !== null && ba.delete(ca.key === null ? Ht : ca.key), Kn = s(ca, Kn, Ht), tn === null ? rt = ca : tn.sibling = ca, tn = ca);
        }
        if (e && ba.forEach(function(ad) {
          return t(z, ad);
        }), Fr()) {
          var Zl = Ht;
          ec(z, Zl);
        }
        return rt;
      }
      function ge(z, q, U, le) {
        var Te = it(U);
        if (typeof Te != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          U[Symbol.toStringTag] === "Generator" && (Ng || g("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Ng = !0), U.entries === Te && (Mg || g("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Mg = !0);
          var Ee = Te.call(U);
          if (Ee)
            for (var Xe = null, rt = Ee.next(); !rt.done; rt = Ee.next()) {
              var tn = rt.value;
              Xe = Y(tn, Xe, z);
            }
        }
        var Ft = Te.call(U);
        if (Ft == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Kn = null, Ht = null, Vn = q, sa = 0, Wr = 0, di = null, Ca = Ft.next(); Vn !== null && !Ca.done; Wr++, Ca = Ft.next()) {
          Vn.index > Wr ? (di = Vn, Vn = null) : di = Vn.sibling;
          var ba = x(z, Vn, Ca.value, le);
          if (ba === null) {
            Vn === null && (Vn = di);
            break;
          }
          e && Vn && ba.alternate === null && t(z, Vn), sa = s(ba, sa, Wr), Ht === null ? Kn = ba : Ht.sibling = ba, Ht = ba, Vn = di;
        }
        if (Ca.done) {
          if (a(z, Vn), Fr()) {
            var ca = Wr;
            ec(z, ca);
          }
          return Kn;
        }
        if (Vn === null) {
          for (; !Ca.done; Wr++, Ca = Ft.next()) {
            var Zl = O(z, Ca.value, le);
            Zl !== null && (sa = s(Zl, sa, Wr), Ht === null ? Kn = Zl : Ht.sibling = Zl, Ht = Zl);
          }
          if (Fr()) {
            var ad = Wr;
            ec(z, ad);
          }
          return Kn;
        }
        for (var vv = i(z, Vn); !Ca.done; Wr++, Ca = Ft.next()) {
          var al = H(vv, z, Wr, Ca.value, le);
          al !== null && (e && al.alternate !== null && vv.delete(al.key === null ? Wr : al.key), sa = s(al, sa, Wr), Ht === null ? Kn = al : Ht.sibling = al, Ht = al);
        }
        if (e && vv.forEach(function(cO) {
          return t(z, cO);
        }), Fr()) {
          var sO = Wr;
          ec(z, sO);
        }
        return Kn;
      }
      function Be(z, q, U, le) {
        if (q !== null && q.tag === X) {
          a(z, q.sibling);
          var Te = l(q, U);
          return Te.return = z, Te;
        }
        a(z, q);
        var Ee = kS(U, z.mode, le);
        return Ee.return = z, Ee;
      }
      function Ue(z, q, U, le) {
        for (var Te = U.key, Ee = q; Ee !== null; ) {
          if (Ee.key === Te) {
            var Xe = U.type;
            if (Xe === hi) {
              if (Ee.tag === fe) {
                a(z, Ee.sibling);
                var rt = l(Ee, U.props.children);
                return rt.return = z, rt._debugSource = U._source, rt._debugOwner = U._owner, rt;
              }
            } else if (Ee.elementType === Xe || // Keep this check inline so it only runs on the false path:
            tC(Ee, U) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Xe == "object" && Xe !== null && Xe.$$typeof === tt && q_(Xe) === Ee.type) {
              a(z, Ee.sibling);
              var tn = l(Ee, U.props);
              return tn.ref = Up(z, Ee, U), tn.return = z, tn._debugSource = U._source, tn._debugOwner = U._owner, tn;
            }
            a(z, Ee);
            break;
          } else
            t(z, Ee);
          Ee = Ee.sibling;
        }
        if (U.type === hi) {
          var Ft = Ku(U.props.children, z.mode, le, U.key);
          return Ft.return = z, Ft;
        } else {
          var Kn = OS(U, z.mode, le);
          return Kn.ref = Up(z, q, U), Kn.return = z, Kn;
        }
      }
      function bt(z, q, U, le) {
        for (var Te = U.key, Ee = q; Ee !== null; ) {
          if (Ee.key === Te)
            if (Ee.tag === W && Ee.stateNode.containerInfo === U.containerInfo && Ee.stateNode.implementation === U.implementation) {
              a(z, Ee.sibling);
              var Xe = l(Ee, U.children || []);
              return Xe.return = z, Xe;
            } else {
              a(z, Ee);
              break;
            }
          else
            t(z, Ee);
          Ee = Ee.sibling;
        }
        var rt = MS(U, z.mode, le);
        return rt.return = z, rt;
      }
      function Et(z, q, U, le) {
        var Te = typeof U == "object" && U !== null && U.type === hi && U.key === null;
        if (Te && (U = U.props.children), typeof U == "object" && U !== null) {
          switch (U.$$typeof) {
            case kr:
              return f(Ue(z, q, U, le));
            case ir:
              return f(bt(z, q, U, le));
            case tt:
              var Ee = U._payload, Xe = U._init;
              return Et(z, q, Xe(Ee), le);
          }
          if (dt(U))
            return Q(z, q, U, le);
          if (it(U))
            return ge(z, q, U, le);
          fm(z, U);
        }
        return typeof U == "string" && U !== "" || typeof U == "number" ? f(Be(z, q, "" + U, le)) : (typeof U == "function" && dm(z), a(z, q));
      }
      return Et;
    }
    var Hf = K_(!0), X_ = K_(!1);
    function Fw(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = pc(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = pc(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function Hw(e, t) {
      for (var a = e.child; a !== null; )
        xD(a, t), a = a.sibling;
    }
    var Ug = Uu(null), Pg;
    Pg = {};
    var pm = null, If = null, jg = null, vm = !1;
    function hm() {
      pm = null, If = null, jg = null, vm = !1;
    }
    function Z_() {
      vm = !0;
    }
    function J_() {
      vm = !1;
    }
    function eT(e, t, a) {
      la(Ug, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Pg && g("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Pg;
    }
    function Fg(e, t) {
      var a = Ug.current;
      oa(Ug, t), e._currentValue = a;
    }
    function Hg(e, t, a) {
      for (var i = e; i !== null; ) {
        var l = i.alternate;
        if (Al(i.childLanes, t) ? l !== null && !Al(l.childLanes, t) && (l.childLanes = ot(l.childLanes, t)) : (i.childLanes = ot(i.childLanes, t), l !== null && (l.childLanes = ot(l.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && g("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Iw(e, t, a) {
      Vw(e, t, a);
    }
    function Vw(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var l = void 0, s = i.dependencies;
        if (s !== null) {
          l = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === K) {
                var p = Ms(a), v = Wl(nn, p);
                v.tag = ym;
                var S = i.updateQueue;
                if (S !== null) {
                  var _ = S.shared, O = _.pending;
                  O === null ? v.next = v : (v.next = O.next, O.next = v), _.pending = v;
                }
              }
              i.lanes = ot(i.lanes, a);
              var x = i.alternate;
              x !== null && (x.lanes = ot(x.lanes, a)), Hg(i.return, a, e), s.lanes = ot(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === De)
          l = i.type === e.type ? null : i.child;
        else if (i.tag === kt) {
          var H = i.return;
          if (H === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          H.lanes = ot(H.lanes, a);
          var Y = H.alternate;
          Y !== null && (Y.lanes = ot(Y.lanes, a)), Hg(H, a, e), l = i.sibling;
        } else
          l = i.child;
        if (l !== null)
          l.return = i;
        else
          for (l = i; l !== null; ) {
            if (l === e) {
              l = null;
              break;
            }
            var Q = l.sibling;
            if (Q !== null) {
              Q.return = l.return, l = Q;
              break;
            }
            l = l.return;
          }
        i = l;
      }
    }
    function Vf(e, t) {
      pm = e, If = null, jg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (na(a.lanes, t) && Xp(), a.firstContext = null);
      }
    }
    function rr(e) {
      vm && g("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (jg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (If === null) {
          if (pm === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          If = a, pm.dependencies = {
            lanes: ne,
            firstContext: a
          };
        } else
          If = If.next = a;
      }
      return t;
    }
    var ic = null;
    function Ig(e) {
      ic === null ? ic = [e] : ic.push(e);
    }
    function Bw() {
      if (ic !== null) {
        for (var e = 0; e < ic.length; e++) {
          var t = ic[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, l = t.pending;
            if (l !== null) {
              var s = l.next;
              l.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        ic = null;
      }
    }
    function tT(e, t, a, i) {
      var l = t.interleaved;
      return l === null ? (a.next = a, Ig(t)) : (a.next = l.next, l.next = a), t.interleaved = a, mm(e, i);
    }
    function Yw(e, t, a, i) {
      var l = t.interleaved;
      l === null ? (a.next = a, Ig(t)) : (a.next = l.next, l.next = a), t.interleaved = a;
    }
    function $w(e, t, a, i) {
      var l = t.interleaved;
      return l === null ? (a.next = a, Ig(t)) : (a.next = l.next, l.next = a), t.interleaved = a, mm(e, i);
    }
    function Ia(e, t) {
      return mm(e, t);
    }
    var Ww = mm;
    function mm(e, t) {
      e.lanes = ot(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = ot(a.lanes, t)), a === null && (e.flags & (yn | Xr)) !== He && XR(e);
      for (var i = e, l = e.return; l !== null; )
        l.childLanes = ot(l.childLanes, t), a = l.alternate, a !== null ? a.childLanes = ot(a.childLanes, t) : (l.flags & (yn | Xr)) !== He && XR(e), i = l, l = l.return;
      if (i.tag === F) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var nT = 0, rT = 1, ym = 2, Vg = 3, gm = !1, Bg, Em;
    Bg = !1, Em = null;
    function Yg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: ne
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function aT(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var l = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = l;
      }
    }
    function Wl(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: nT,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Hu(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var l = i.shared;
      if (Em === l && !Bg && (g("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Bg = !0), Yx()) {
        var s = l.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), l.pending = t, Ww(e, a);
      } else
        return $w(e, l, t, a);
    }
    function Sm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var l = i.shared;
        if (qd(a)) {
          var s = l.lanes;
          s = Xd(s, e.pendingLanes);
          var f = ot(s, a);
          l.lanes = f, vf(e, f);
        }
      }
    }
    function $g(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var l = i.updateQueue;
        if (a === l) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var S = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = S : (f.next = S, f = S), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: l.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: l.shared,
            effects: l.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var _ = a.lastBaseUpdate;
      _ === null ? a.firstBaseUpdate = t : _.next = t, a.lastBaseUpdate = t;
    }
    function Gw(e, t, a, i, l, s) {
      switch (a.tag) {
        case rT: {
          var f = a.payload;
          if (typeof f == "function") {
            Z_();
            var p = f.call(s, i, l);
            {
              if (e.mode & Jt) {
                gn(!0);
                try {
                  f.call(s, i, l);
                } finally {
                  gn(!1);
                }
              }
              J_();
            }
            return p;
          }
          return f;
        }
        case Vg:
          e.flags = e.flags & ~Jn | Pe;
        case nT: {
          var v = a.payload, S;
          if (typeof v == "function") {
            Z_(), S = v.call(s, i, l);
            {
              if (e.mode & Jt) {
                gn(!0);
                try {
                  v.call(s, i, l);
                } finally {
                  gn(!1);
                }
              }
              J_();
            }
          } else
            S = v;
          return S == null ? i : ut({}, i, S);
        }
        case ym:
          return gm = !0, i;
      }
      return i;
    }
    function _m(e, t, a, i) {
      var l = e.updateQueue;
      gm = !1, Em = l.shared;
      var s = l.firstBaseUpdate, f = l.lastBaseUpdate, p = l.shared.pending;
      if (p !== null) {
        l.shared.pending = null;
        var v = p, S = v.next;
        v.next = null, f === null ? s = S : f.next = S, f = v;
        var _ = e.alternate;
        if (_ !== null) {
          var O = _.updateQueue, x = O.lastBaseUpdate;
          x !== f && (x === null ? O.firstBaseUpdate = S : x.next = S, O.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var H = l.baseState, Y = ne, Q = null, ge = null, Be = null, Ue = s;
        do {
          var bt = Ue.lane, Et = Ue.eventTime;
          if (Al(i, bt)) {
            if (Be !== null) {
              var q = {
                eventTime: Et,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Lt,
                tag: Ue.tag,
                payload: Ue.payload,
                callback: Ue.callback,
                next: null
              };
              Be = Be.next = q;
            }
            H = Gw(e, l, Ue, H, t, a);
            var U = Ue.callback;
            if (U !== null && // If the update was already committed, we should not queue its
            // callback again.
            Ue.lane !== Lt) {
              e.flags |= un;
              var le = l.effects;
              le === null ? l.effects = [Ue] : le.push(Ue);
            }
          } else {
            var z = {
              eventTime: Et,
              lane: bt,
              tag: Ue.tag,
              payload: Ue.payload,
              callback: Ue.callback,
              next: null
            };
            Be === null ? (ge = Be = z, Q = H) : Be = Be.next = z, Y = ot(Y, bt);
          }
          if (Ue = Ue.next, Ue === null) {
            if (p = l.shared.pending, p === null)
              break;
            var Te = p, Ee = Te.next;
            Te.next = null, Ue = Ee, l.lastBaseUpdate = Te, l.shared.pending = null;
          }
        } while (!0);
        Be === null && (Q = H), l.baseState = Q, l.firstBaseUpdate = ge, l.lastBaseUpdate = Be;
        var Xe = l.shared.interleaved;
        if (Xe !== null) {
          var rt = Xe;
          do
            Y = ot(Y, rt.lane), rt = rt.next;
          while (rt !== Xe);
        } else s === null && (l.shared.lanes = ne);
        sv(Y), e.lanes = Y, e.memoizedState = H;
      }
      Em = null;
    }
    function Qw(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function iT() {
      gm = !1;
    }
    function Tm() {
      return gm;
    }
    function oT(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var l = 0; l < i.length; l++) {
          var s = i[l], f = s.callback;
          f !== null && (s.callback = null, Qw(f, a));
        }
    }
    var Pp = {}, Iu = Uu(Pp), jp = Uu(Pp), Rm = Uu(Pp);
    function Cm(e) {
      if (e === Pp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function lT() {
      var e = Cm(Rm.current);
      return e;
    }
    function Wg(e, t) {
      la(Rm, t, e), la(jp, e, e), la(Iu, Pp, e);
      var a = f0(t);
      oa(Iu, e), la(Iu, a, e);
    }
    function Bf(e) {
      oa(Iu, e), oa(jp, e), oa(Rm, e);
    }
    function Gg() {
      var e = Cm(Iu.current);
      return e;
    }
    function uT(e) {
      Cm(Rm.current);
      var t = Cm(Iu.current), a = d0(t, e.type);
      t !== a && (la(jp, e, e), la(Iu, a, e));
    }
    function Qg(e) {
      jp.current === e && (oa(Iu, e), oa(jp, e));
    }
    var qw = 0, sT = 1, cT = 1, Fp = 2, co = Uu(qw);
    function qg(e, t) {
      return (e & t) !== 0;
    }
    function Yf(e) {
      return e & sT;
    }
    function Kg(e, t) {
      return e & sT | t;
    }
    function Kw(e, t) {
      return e | t;
    }
    function Vu(e, t) {
      la(co, t, e);
    }
    function $f(e) {
      oa(co, e);
    }
    function Xw(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function bm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === Oe) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || x_(i) || vg(i))
              return t;
          }
        } else if (t.tag === Mt && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var l = (t.flags & Pe) !== He;
          if (l)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Va = (
      /*   */
      0
    ), dr = (
      /* */
      1
    ), Xo = (
      /*  */
      2
    ), pr = (
      /*    */
      4
    ), Hr = (
      /*   */
      8
    ), Xg = [];
    function Zg() {
      for (var e = 0; e < Xg.length; e++) {
        var t = Xg[e];
        t._workInProgressVersionPrimary = null;
      }
      Xg.length = 0;
    }
    function Zw(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var _e = E.ReactCurrentDispatcher, Hp = E.ReactCurrentBatchConfig, Jg, Wf;
    Jg = /* @__PURE__ */ new Set();
    var oc = ne, en = null, vr = null, hr = null, wm = !1, Ip = !1, Vp = 0, Jw = 0, e1 = 25, J = null, ji = null, Bu = -1, eE = !1;
    function $t() {
      {
        var e = J;
        ji === null ? ji = [e] : ji.push(e);
      }
    }
    function de() {
      {
        var e = J;
        ji !== null && (Bu++, ji[Bu] !== e && t1(e));
      }
    }
    function Gf(e) {
      e != null && !dt(e) && g("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", J, typeof e);
    }
    function t1(e) {
      {
        var t = et(en);
        if (!Jg.has(t) && (Jg.add(t), ji !== null)) {
          for (var a = "", i = 30, l = 0; l <= Bu; l++) {
            for (var s = ji[l], f = l === Bu ? e : s, p = l + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          g(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ua() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function tE(e, t) {
      if (eE)
        return !1;
      if (t === null)
        return g("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", J), !1;
      e.length !== t.length && g(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, J, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!ie(e[a], t[a]))
          return !1;
      return !0;
    }
    function Qf(e, t, a, i, l, s) {
      oc = s, en = t, ji = e !== null ? e._debugHookTypes : null, Bu = -1, eE = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = ne, e !== null && e.memoizedState !== null ? _e.current = NT : ji !== null ? _e.current = MT : _e.current = kT;
      var f = a(i, l);
      if (Ip) {
        var p = 0;
        do {
          if (Ip = !1, Vp = 0, p >= e1)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, eE = !1, vr = null, hr = null, t.updateQueue = null, Bu = -1, _e.current = LT, f = a(i, l);
        } while (Ip);
      }
      _e.current = Fm, t._debugHookTypes = ji;
      var v = vr !== null && vr.next !== null;
      if (oc = ne, en = null, vr = null, hr = null, J = null, ji = null, Bu = -1, e !== null && (e.flags & Un) !== (t.flags & Un) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & mt) !== Ie && g("Internal React error: Expected static flag was missing. Please notify the React team."), wm = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function qf() {
      var e = Vp !== 0;
      return Vp = 0, e;
    }
    function fT(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Pt) !== Ie ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ns(e.lanes, a);
    }
    function dT() {
      if (_e.current = Fm, wm) {
        for (var e = en.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        wm = !1;
      }
      oc = ne, en = null, vr = null, hr = null, ji = null, Bu = -1, J = null, bT = !1, Ip = !1, Vp = 0;
    }
    function Zo() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return hr === null ? en.memoizedState = hr = e : hr = hr.next = e, hr;
    }
    function Fi() {
      var e;
      if (vr === null) {
        var t = en.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = vr.next;
      var a;
      if (hr === null ? a = en.memoizedState : a = hr.next, a !== null)
        hr = a, a = hr.next, vr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        vr = e;
        var i = {
          memoizedState: vr.memoizedState,
          baseState: vr.baseState,
          baseQueue: vr.baseQueue,
          queue: vr.queue,
          next: null
        };
        hr === null ? en.memoizedState = hr = i : hr = hr.next = i;
      }
      return hr;
    }
    function pT() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function nE(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function rE(e, t, a) {
      var i = Zo(), l;
      a !== void 0 ? l = a(t) : l = t, i.memoizedState = i.baseState = l;
      var s = {
        pending: null,
        interleaved: null,
        lanes: ne,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: l
      };
      i.queue = s;
      var f = s.dispatch = i1.bind(null, en, s);
      return [i.memoizedState, f];
    }
    function aE(e, t, a) {
      var i = Fi(), l = i.queue;
      if (l === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      l.lastRenderedReducer = e;
      var s = vr, f = s.baseQueue, p = l.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, S = p.next;
          f.next = S, p.next = v;
        }
        s.baseQueue !== f && g("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, l.pending = null;
      }
      if (f !== null) {
        var _ = f.next, O = s.baseState, x = null, H = null, Y = null, Q = _;
        do {
          var ge = Q.lane;
          if (Al(oc, ge)) {
            if (Y !== null) {
              var Ue = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Lt,
                action: Q.action,
                hasEagerState: Q.hasEagerState,
                eagerState: Q.eagerState,
                next: null
              };
              Y = Y.next = Ue;
            }
            if (Q.hasEagerState)
              O = Q.eagerState;
            else {
              var bt = Q.action;
              O = e(O, bt);
            }
          } else {
            var Be = {
              lane: ge,
              action: Q.action,
              hasEagerState: Q.hasEagerState,
              eagerState: Q.eagerState,
              next: null
            };
            Y === null ? (H = Y = Be, x = O) : Y = Y.next = Be, en.lanes = ot(en.lanes, ge), sv(ge);
          }
          Q = Q.next;
        } while (Q !== null && Q !== _);
        Y === null ? x = O : Y.next = H, ie(O, i.memoizedState) || Xp(), i.memoizedState = O, i.baseState = x, i.baseQueue = Y, l.lastRenderedState = O;
      }
      var Et = l.interleaved;
      if (Et !== null) {
        var z = Et;
        do {
          var q = z.lane;
          en.lanes = ot(en.lanes, q), sv(q), z = z.next;
        } while (z !== Et);
      } else f === null && (l.lanes = ne);
      var U = l.dispatch;
      return [i.memoizedState, U];
    }
    function iE(e, t, a) {
      var i = Fi(), l = i.queue;
      if (l === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      l.lastRenderedReducer = e;
      var s = l.dispatch, f = l.pending, p = i.memoizedState;
      if (f !== null) {
        l.pending = null;
        var v = f.next, S = v;
        do {
          var _ = S.action;
          p = e(p, _), S = S.next;
        } while (S !== v);
        ie(p, i.memoizedState) || Xp(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), l.lastRenderedState = p;
      }
      return [p, s];
    }
    function Sk(e, t, a) {
    }
    function _k(e, t, a) {
    }
    function oE(e, t, a) {
      var i = en, l = Zo(), s, f = Fr();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Wf || s !== a() && (g("The result of getServerSnapshot should be cached to avoid an infinite loop"), Wf = !0);
      } else {
        if (s = t(), !Wf) {
          var p = t();
          ie(s, p) || (g("The result of getSnapshot should be cached to avoid an infinite loop"), Wf = !0);
        }
        var v = ay();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        df(v, oc) || vT(i, t, s);
      }
      l.memoizedState = s;
      var S = {
        value: s,
        getSnapshot: t
      };
      return l.queue = S, Mm(mT.bind(null, i, S, e), [e]), i.flags |= Kr, Bp(dr | Hr, hT.bind(null, i, S, s, t), void 0, null), s;
    }
    function xm(e, t, a) {
      var i = en, l = Fi(), s = t();
      if (!Wf) {
        var f = t();
        ie(s, f) || (g("The result of getSnapshot should be cached to avoid an infinite loop"), Wf = !0);
      }
      var p = l.memoizedState, v = !ie(p, s);
      v && (l.memoizedState = s, Xp());
      var S = l.queue;
      if ($p(mT.bind(null, i, S, e), [e]), S.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      hr !== null && hr.memoizedState.tag & dr) {
        i.flags |= Kr, Bp(dr | Hr, hT.bind(null, i, S, s, t), void 0, null);
        var _ = ay();
        if (_ === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        df(_, oc) || vT(i, t, s);
      }
      return s;
    }
    function vT(e, t, a) {
      e.flags |= Su;
      var i = {
        getSnapshot: t,
        value: a
      }, l = en.updateQueue;
      if (l === null)
        l = pT(), en.updateQueue = l, l.stores = [i];
      else {
        var s = l.stores;
        s === null ? l.stores = [i] : s.push(i);
      }
    }
    function hT(e, t, a, i) {
      t.value = a, t.getSnapshot = i, yT(t) && gT(e);
    }
    function mT(e, t, a) {
      var i = function() {
        yT(t) && gT(e);
      };
      return a(i);
    }
    function yT(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !ie(a, i);
      } catch {
        return !0;
      }
    }
    function gT(e) {
      var t = Ia(e, qe);
      t !== null && Er(t, e, qe, nn);
    }
    function Dm(e) {
      var t = Zo();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: ne,
        dispatch: null,
        lastRenderedReducer: nE,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = o1.bind(null, en, a);
      return [t.memoizedState, i];
    }
    function lE(e) {
      return aE(nE);
    }
    function uE(e) {
      return iE(nE);
    }
    function Bp(e, t, a, i) {
      var l = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = en.updateQueue;
      if (s === null)
        s = pT(), en.updateQueue = s, s.lastEffect = l.next = l;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = l.next = l;
        else {
          var p = f.next;
          f.next = l, l.next = p, s.lastEffect = l;
        }
      }
      return l;
    }
    function sE(e) {
      var t = Zo();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Om(e) {
      var t = Fi();
      return t.memoizedState;
    }
    function Yp(e, t, a, i) {
      var l = Zo(), s = i === void 0 ? null : i;
      en.flags |= e, l.memoizedState = Bp(dr | t, a, void 0, s);
    }
    function km(e, t, a, i) {
      var l = Fi(), s = i === void 0 ? null : i, f = void 0;
      if (vr !== null) {
        var p = vr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (tE(s, v)) {
            l.memoizedState = Bp(t, a, f, s);
            return;
          }
        }
      }
      en.flags |= e, l.memoizedState = Bp(dr | t, a, f, s);
    }
    function Mm(e, t) {
      return (en.mode & Pt) !== Ie ? Yp(wi | Kr | jc, Hr, e, t) : Yp(Kr | jc, Hr, e, t);
    }
    function $p(e, t) {
      return km(Kr, Hr, e, t);
    }
    function cE(e, t) {
      return Yp(Tt, Xo, e, t);
    }
    function Nm(e, t) {
      return km(Tt, Xo, e, t);
    }
    function fE(e, t) {
      var a = Tt;
      return a |= Zi, (en.mode & Pt) !== Ie && (a |= Lo), Yp(a, pr, e, t);
    }
    function Lm(e, t) {
      return km(Tt, pr, e, t);
    }
    function ET(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var l = t;
        l.hasOwnProperty("current") || g("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(l).join(", ") + "}");
        var s = e();
        return l.current = s, function() {
          l.current = null;
        };
      }
    }
    function dE(e, t, a) {
      typeof t != "function" && g("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, l = Tt;
      return l |= Zi, (en.mode & Pt) !== Ie && (l |= Lo), Yp(l, pr, ET.bind(null, t, e), i);
    }
    function Am(e, t, a) {
      typeof t != "function" && g("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return km(Tt, pr, ET.bind(null, t, e), i);
    }
    function n1(e, t) {
    }
    var zm = n1;
    function pE(e, t) {
      var a = Zo(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function Um(e, t) {
      var a = Fi(), i = t === void 0 ? null : t, l = a.memoizedState;
      if (l !== null && i !== null) {
        var s = l[1];
        if (tE(i, s))
          return l[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function vE(e, t) {
      var a = Zo(), i = t === void 0 ? null : t, l = e();
      return a.memoizedState = [l, i], l;
    }
    function Pm(e, t) {
      var a = Fi(), i = t === void 0 ? null : t, l = a.memoizedState;
      if (l !== null && i !== null) {
        var s = l[1];
        if (tE(i, s))
          return l[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function hE(e) {
      var t = Zo();
      return t.memoizedState = e, e;
    }
    function ST(e) {
      var t = Fi(), a = vr, i = a.memoizedState;
      return TT(t, i, e);
    }
    function _T(e) {
      var t = Fi();
      if (vr === null)
        return t.memoizedState = e, e;
      var a = vr.memoizedState;
      return TT(t, a, e);
    }
    function TT(e, t, a) {
      var i = !Gd(oc);
      if (i) {
        if (!ie(a, t)) {
          var l = Kd();
          en.lanes = ot(en.lanes, l), sv(l), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Xp()), e.memoizedState = a, a;
    }
    function r1(e, t, a) {
      var i = ja();
      Fn(vh(i, ki)), e(!0);
      var l = Hp.transition;
      Hp.transition = {};
      var s = Hp.transition;
      Hp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (Fn(i), Hp.transition = l, l === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && A("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function mE() {
      var e = Dm(!1), t = e[0], a = e[1], i = r1.bind(null, a), l = Zo();
      return l.memoizedState = i, [t, i];
    }
    function RT() {
      var e = lE(), t = e[0], a = Fi(), i = a.memoizedState;
      return [t, i];
    }
    function CT() {
      var e = uE(), t = e[0], a = Fi(), i = a.memoizedState;
      return [t, i];
    }
    var bT = !1;
    function a1() {
      return bT;
    }
    function yE() {
      var e = Zo(), t = ay(), a = t.identifierPrefix, i;
      if (Fr()) {
        var l = _w();
        i = ":" + a + "R" + l;
        var s = Vp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Jw++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function jm() {
      var e = Fi(), t = e.memoizedState;
      return t;
    }
    function i1(e, t, a) {
      typeof arguments[3] == "function" && g("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Qu(e), l = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (wT(e))
        xT(t, l);
      else {
        var s = tT(e, t, l, i);
        if (s !== null) {
          var f = Ra();
          Er(s, e, i, f), DT(s, t, i);
        }
      }
      OT(e, i);
    }
    function o1(e, t, a) {
      typeof arguments[3] == "function" && g("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Qu(e), l = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (wT(e))
        xT(t, l);
      else {
        var s = e.alternate;
        if (e.lanes === ne && (s === null || s.lanes === ne)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = _e.current, _e.current = fo;
            try {
              var v = t.lastRenderedState, S = f(v, a);
              if (l.hasEagerState = !0, l.eagerState = S, ie(S, v)) {
                Yw(e, t, l, i);
                return;
              }
            } catch {
            } finally {
              _e.current = p;
            }
          }
        }
        var _ = tT(e, t, l, i);
        if (_ !== null) {
          var O = Ra();
          Er(_, e, i, O), DT(_, t, i);
        }
      }
      OT(e, i);
    }
    function wT(e) {
      var t = e.alternate;
      return e === en || t !== null && t === en;
    }
    function xT(e, t) {
      Ip = wm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function DT(e, t, a) {
      if (qd(a)) {
        var i = t.lanes;
        i = Xd(i, e.pendingLanes);
        var l = ot(i, a);
        t.lanes = l, vf(e, l);
      }
    }
    function OT(e, t, a) {
      Ts(e, t);
    }
    var Fm = {
      readContext: rr,
      useCallback: ua,
      useContext: ua,
      useEffect: ua,
      useImperativeHandle: ua,
      useInsertionEffect: ua,
      useLayoutEffect: ua,
      useMemo: ua,
      useReducer: ua,
      useRef: ua,
      useState: ua,
      useDebugValue: ua,
      useDeferredValue: ua,
      useTransition: ua,
      useMutableSource: ua,
      useSyncExternalStore: ua,
      useId: ua,
      unstable_isNewReconciler: se
    }, kT = null, MT = null, NT = null, LT = null, Jo = null, fo = null, Hm = null;
    {
      var gE = function() {
        g("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, nt = function() {
        g("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      kT = {
        readContext: function(e) {
          return rr(e);
        },
        useCallback: function(e, t) {
          return J = "useCallback", $t(), Gf(t), pE(e, t);
        },
        useContext: function(e) {
          return J = "useContext", $t(), rr(e);
        },
        useEffect: function(e, t) {
          return J = "useEffect", $t(), Gf(t), Mm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return J = "useImperativeHandle", $t(), Gf(a), dE(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return J = "useInsertionEffect", $t(), Gf(t), cE(e, t);
        },
        useLayoutEffect: function(e, t) {
          return J = "useLayoutEffect", $t(), Gf(t), fE(e, t);
        },
        useMemo: function(e, t) {
          J = "useMemo", $t(), Gf(t);
          var a = _e.current;
          _e.current = Jo;
          try {
            return vE(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          J = "useReducer", $t();
          var i = _e.current;
          _e.current = Jo;
          try {
            return rE(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return J = "useRef", $t(), sE(e);
        },
        useState: function(e) {
          J = "useState", $t();
          var t = _e.current;
          _e.current = Jo;
          try {
            return Dm(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return J = "useDebugValue", $t(), void 0;
        },
        useDeferredValue: function(e) {
          return J = "useDeferredValue", $t(), hE(e);
        },
        useTransition: function() {
          return J = "useTransition", $t(), mE();
        },
        useMutableSource: function(e, t, a) {
          return J = "useMutableSource", $t(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return J = "useSyncExternalStore", $t(), oE(e, t, a);
        },
        useId: function() {
          return J = "useId", $t(), yE();
        },
        unstable_isNewReconciler: se
      }, MT = {
        readContext: function(e) {
          return rr(e);
        },
        useCallback: function(e, t) {
          return J = "useCallback", de(), pE(e, t);
        },
        useContext: function(e) {
          return J = "useContext", de(), rr(e);
        },
        useEffect: function(e, t) {
          return J = "useEffect", de(), Mm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return J = "useImperativeHandle", de(), dE(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return J = "useInsertionEffect", de(), cE(e, t);
        },
        useLayoutEffect: function(e, t) {
          return J = "useLayoutEffect", de(), fE(e, t);
        },
        useMemo: function(e, t) {
          J = "useMemo", de();
          var a = _e.current;
          _e.current = Jo;
          try {
            return vE(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          J = "useReducer", de();
          var i = _e.current;
          _e.current = Jo;
          try {
            return rE(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return J = "useRef", de(), sE(e);
        },
        useState: function(e) {
          J = "useState", de();
          var t = _e.current;
          _e.current = Jo;
          try {
            return Dm(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return J = "useDebugValue", de(), void 0;
        },
        useDeferredValue: function(e) {
          return J = "useDeferredValue", de(), hE(e);
        },
        useTransition: function() {
          return J = "useTransition", de(), mE();
        },
        useMutableSource: function(e, t, a) {
          return J = "useMutableSource", de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return J = "useSyncExternalStore", de(), oE(e, t, a);
        },
        useId: function() {
          return J = "useId", de(), yE();
        },
        unstable_isNewReconciler: se
      }, NT = {
        readContext: function(e) {
          return rr(e);
        },
        useCallback: function(e, t) {
          return J = "useCallback", de(), Um(e, t);
        },
        useContext: function(e) {
          return J = "useContext", de(), rr(e);
        },
        useEffect: function(e, t) {
          return J = "useEffect", de(), $p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return J = "useImperativeHandle", de(), Am(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return J = "useInsertionEffect", de(), Nm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return J = "useLayoutEffect", de(), Lm(e, t);
        },
        useMemo: function(e, t) {
          J = "useMemo", de();
          var a = _e.current;
          _e.current = fo;
          try {
            return Pm(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          J = "useReducer", de();
          var i = _e.current;
          _e.current = fo;
          try {
            return aE(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return J = "useRef", de(), Om();
        },
        useState: function(e) {
          J = "useState", de();
          var t = _e.current;
          _e.current = fo;
          try {
            return lE(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return J = "useDebugValue", de(), zm();
        },
        useDeferredValue: function(e) {
          return J = "useDeferredValue", de(), ST(e);
        },
        useTransition: function() {
          return J = "useTransition", de(), RT();
        },
        useMutableSource: function(e, t, a) {
          return J = "useMutableSource", de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return J = "useSyncExternalStore", de(), xm(e, t);
        },
        useId: function() {
          return J = "useId", de(), jm();
        },
        unstable_isNewReconciler: se
      }, LT = {
        readContext: function(e) {
          return rr(e);
        },
        useCallback: function(e, t) {
          return J = "useCallback", de(), Um(e, t);
        },
        useContext: function(e) {
          return J = "useContext", de(), rr(e);
        },
        useEffect: function(e, t) {
          return J = "useEffect", de(), $p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return J = "useImperativeHandle", de(), Am(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return J = "useInsertionEffect", de(), Nm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return J = "useLayoutEffect", de(), Lm(e, t);
        },
        useMemo: function(e, t) {
          J = "useMemo", de();
          var a = _e.current;
          _e.current = Hm;
          try {
            return Pm(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          J = "useReducer", de();
          var i = _e.current;
          _e.current = Hm;
          try {
            return iE(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return J = "useRef", de(), Om();
        },
        useState: function(e) {
          J = "useState", de();
          var t = _e.current;
          _e.current = Hm;
          try {
            return uE(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return J = "useDebugValue", de(), zm();
        },
        useDeferredValue: function(e) {
          return J = "useDeferredValue", de(), _T(e);
        },
        useTransition: function() {
          return J = "useTransition", de(), CT();
        },
        useMutableSource: function(e, t, a) {
          return J = "useMutableSource", de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return J = "useSyncExternalStore", de(), xm(e, t);
        },
        useId: function() {
          return J = "useId", de(), jm();
        },
        unstable_isNewReconciler: se
      }, Jo = {
        readContext: function(e) {
          return gE(), rr(e);
        },
        useCallback: function(e, t) {
          return J = "useCallback", nt(), $t(), pE(e, t);
        },
        useContext: function(e) {
          return J = "useContext", nt(), $t(), rr(e);
        },
        useEffect: function(e, t) {
          return J = "useEffect", nt(), $t(), Mm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return J = "useImperativeHandle", nt(), $t(), dE(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return J = "useInsertionEffect", nt(), $t(), cE(e, t);
        },
        useLayoutEffect: function(e, t) {
          return J = "useLayoutEffect", nt(), $t(), fE(e, t);
        },
        useMemo: function(e, t) {
          J = "useMemo", nt(), $t();
          var a = _e.current;
          _e.current = Jo;
          try {
            return vE(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          J = "useReducer", nt(), $t();
          var i = _e.current;
          _e.current = Jo;
          try {
            return rE(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return J = "useRef", nt(), $t(), sE(e);
        },
        useState: function(e) {
          J = "useState", nt(), $t();
          var t = _e.current;
          _e.current = Jo;
          try {
            return Dm(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return J = "useDebugValue", nt(), $t(), void 0;
        },
        useDeferredValue: function(e) {
          return J = "useDeferredValue", nt(), $t(), hE(e);
        },
        useTransition: function() {
          return J = "useTransition", nt(), $t(), mE();
        },
        useMutableSource: function(e, t, a) {
          return J = "useMutableSource", nt(), $t(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return J = "useSyncExternalStore", nt(), $t(), oE(e, t, a);
        },
        useId: function() {
          return J = "useId", nt(), $t(), yE();
        },
        unstable_isNewReconciler: se
      }, fo = {
        readContext: function(e) {
          return gE(), rr(e);
        },
        useCallback: function(e, t) {
          return J = "useCallback", nt(), de(), Um(e, t);
        },
        useContext: function(e) {
          return J = "useContext", nt(), de(), rr(e);
        },
        useEffect: function(e, t) {
          return J = "useEffect", nt(), de(), $p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return J = "useImperativeHandle", nt(), de(), Am(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return J = "useInsertionEffect", nt(), de(), Nm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return J = "useLayoutEffect", nt(), de(), Lm(e, t);
        },
        useMemo: function(e, t) {
          J = "useMemo", nt(), de();
          var a = _e.current;
          _e.current = fo;
          try {
            return Pm(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          J = "useReducer", nt(), de();
          var i = _e.current;
          _e.current = fo;
          try {
            return aE(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return J = "useRef", nt(), de(), Om();
        },
        useState: function(e) {
          J = "useState", nt(), de();
          var t = _e.current;
          _e.current = fo;
          try {
            return lE(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return J = "useDebugValue", nt(), de(), zm();
        },
        useDeferredValue: function(e) {
          return J = "useDeferredValue", nt(), de(), ST(e);
        },
        useTransition: function() {
          return J = "useTransition", nt(), de(), RT();
        },
        useMutableSource: function(e, t, a) {
          return J = "useMutableSource", nt(), de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return J = "useSyncExternalStore", nt(), de(), xm(e, t);
        },
        useId: function() {
          return J = "useId", nt(), de(), jm();
        },
        unstable_isNewReconciler: se
      }, Hm = {
        readContext: function(e) {
          return gE(), rr(e);
        },
        useCallback: function(e, t) {
          return J = "useCallback", nt(), de(), Um(e, t);
        },
        useContext: function(e) {
          return J = "useContext", nt(), de(), rr(e);
        },
        useEffect: function(e, t) {
          return J = "useEffect", nt(), de(), $p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return J = "useImperativeHandle", nt(), de(), Am(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return J = "useInsertionEffect", nt(), de(), Nm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return J = "useLayoutEffect", nt(), de(), Lm(e, t);
        },
        useMemo: function(e, t) {
          J = "useMemo", nt(), de();
          var a = _e.current;
          _e.current = fo;
          try {
            return Pm(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          J = "useReducer", nt(), de();
          var i = _e.current;
          _e.current = fo;
          try {
            return iE(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return J = "useRef", nt(), de(), Om();
        },
        useState: function(e) {
          J = "useState", nt(), de();
          var t = _e.current;
          _e.current = fo;
          try {
            return uE(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return J = "useDebugValue", nt(), de(), zm();
        },
        useDeferredValue: function(e) {
          return J = "useDeferredValue", nt(), de(), _T(e);
        },
        useTransition: function() {
          return J = "useTransition", nt(), de(), CT();
        },
        useMutableSource: function(e, t, a) {
          return J = "useMutableSource", nt(), de(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return J = "useSyncExternalStore", nt(), de(), xm(e, t);
        },
        useId: function() {
          return J = "useId", nt(), de(), jm();
        },
        unstable_isNewReconciler: se
      };
    }
    var Yu = m.unstable_now, AT = 0, Im = -1, Wp = -1, Vm = -1, EE = !1, Bm = !1;
    function zT() {
      return EE;
    }
    function l1() {
      Bm = !0;
    }
    function u1() {
      EE = !1, Bm = !1;
    }
    function s1() {
      EE = Bm, Bm = !1;
    }
    function UT() {
      return AT;
    }
    function PT() {
      AT = Yu();
    }
    function SE(e) {
      Wp = Yu(), e.actualStartTime < 0 && (e.actualStartTime = Yu());
    }
    function jT(e) {
      Wp = -1;
    }
    function Ym(e, t) {
      if (Wp >= 0) {
        var a = Yu() - Wp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Wp = -1;
      }
    }
    function el(e) {
      if (Im >= 0) {
        var t = Yu() - Im;
        Im = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case F:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case Ye:
              var l = a.stateNode;
              l.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function _E(e) {
      if (Vm >= 0) {
        var t = Yu() - Vm;
        Vm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case F:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case Ye:
              var l = a.stateNode;
              l !== null && (l.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function tl() {
      Im = Yu();
    }
    function TE() {
      Vm = Yu();
    }
    function RE(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function po(e, t) {
      if (e && e.defaultProps) {
        var a = ut({}, t), i = e.defaultProps;
        for (var l in i)
          a[l] === void 0 && (a[l] = i[l]);
        return a;
      }
      return t;
    }
    var CE = {}, bE, wE, xE, DE, OE, FT, $m, kE, ME, NE, Gp;
    {
      bE = /* @__PURE__ */ new Set(), wE = /* @__PURE__ */ new Set(), xE = /* @__PURE__ */ new Set(), DE = /* @__PURE__ */ new Set(), kE = /* @__PURE__ */ new Set(), OE = /* @__PURE__ */ new Set(), ME = /* @__PURE__ */ new Set(), NE = /* @__PURE__ */ new Set(), Gp = /* @__PURE__ */ new Set();
      var HT = /* @__PURE__ */ new Set();
      $m = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          HT.has(a) || (HT.add(a), g("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, FT = function(e, t) {
        if (t === void 0) {
          var a = Dt(e) || "Component";
          OE.has(a) || (OE.add(a), g("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(CE, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(CE);
    }
    function LE(e, t, a, i) {
      var l = e.memoizedState, s = a(i, l);
      {
        if (e.mode & Jt) {
          gn(!0);
          try {
            s = a(i, l);
          } finally {
            gn(!1);
          }
        }
        FT(t, s);
      }
      var f = s == null ? l : ut({}, l, s);
      if (e.memoizedState = f, e.lanes === ne) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var AE = {
      isMounted: Zv,
      enqueueSetState: function(e, t, a) {
        var i = Eu(e), l = Ra(), s = Qu(i), f = Wl(l, s);
        f.payload = t, a != null && ($m(a, "setState"), f.callback = a);
        var p = Hu(i, f, s);
        p !== null && (Er(p, i, s, l), Sm(p, i, s)), Ts(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = Eu(e), l = Ra(), s = Qu(i), f = Wl(l, s);
        f.tag = rT, f.payload = t, a != null && ($m(a, "replaceState"), f.callback = a);
        var p = Hu(i, f, s);
        p !== null && (Er(p, i, s, l), Sm(p, i, s)), Ts(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Eu(e), i = Ra(), l = Qu(a), s = Wl(i, l);
        s.tag = ym, t != null && ($m(t, "forceUpdate"), s.callback = t);
        var f = Hu(a, s, l);
        f !== null && (Er(f, a, l, i), Sm(f, a, l)), $c(a, l);
      }
    };
    function IT(e, t, a, i, l, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Jt) {
            gn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              gn(!1);
            }
          }
          v === void 0 && g("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Dt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !we(a, i) || !we(l, s) : !0;
    }
    function c1(e, t, a) {
      var i = e.stateNode;
      {
        var l = Dt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? g("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", l) : g("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", l)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && g("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", l), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && g("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", l), i.propTypes && g("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", l), i.contextType && g("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", l), t.childContextTypes && !Gp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Jt) === Ie && (Gp.add(t), g(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, l)), t.contextTypes && !Gp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Jt) === Ie && (Gp.add(t), g(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, l)), i.contextTypes && g("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", l), t.contextType && t.contextTypes && !ME.has(t) && (ME.add(t), g("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", l)), typeof i.componentShouldUpdate == "function" && g("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", l), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && g("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Dt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && g("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", l), typeof i.componentDidReceiveProps == "function" && g("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", l), typeof i.componentWillRecieveProps == "function" && g("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", l), typeof i.UNSAFE_componentWillRecieveProps == "function" && g("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", l);
        var f = i.props !== a;
        i.props !== void 0 && f && g("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", l, l), i.defaultProps && g("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", l, l), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !xE.has(t) && (xE.add(t), g("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Dt(t))), typeof i.getDerivedStateFromProps == "function" && g("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", l), typeof i.getDerivedStateFromError == "function" && g("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", l), typeof t.getSnapshotBeforeUpdate == "function" && g("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", l);
        var p = i.state;
        p && (typeof p != "object" || dt(p)) && g("%s.state: must be set to an object or null", l), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && g("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", l);
      }
    }
    function VT(e, t) {
      t.updater = AE, e.stateNode = t, Sl(t, e), t._reactInternalInstance = CE;
    }
    function BT(e, t, a) {
      var i = !1, l = ci, s = ci, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === b && f._context === void 0
        );
        if (!p && !NE.has(t)) {
          NE.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === yi ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", g("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Dt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = rr(f);
      else {
        l = zf(e, t, !0);
        var S = t.contextTypes;
        i = S != null, s = i ? Uf(e, l) : ci;
      }
      var _ = new t(a, s);
      if (e.mode & Jt) {
        gn(!0);
        try {
          _ = new t(a, s);
        } finally {
          gn(!1);
        }
      }
      var O = e.memoizedState = _.state !== null && _.state !== void 0 ? _.state : null;
      VT(e, _);
      {
        if (typeof t.getDerivedStateFromProps == "function" && O === null) {
          var x = Dt(t) || "Component";
          wE.has(x) || (wE.add(x), g("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", x, _.state === null ? "null" : "undefined", x));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof _.getSnapshotBeforeUpdate == "function") {
          var H = null, Y = null, Q = null;
          if (typeof _.componentWillMount == "function" && _.componentWillMount.__suppressDeprecationWarning !== !0 ? H = "componentWillMount" : typeof _.UNSAFE_componentWillMount == "function" && (H = "UNSAFE_componentWillMount"), typeof _.componentWillReceiveProps == "function" && _.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? Y = "componentWillReceiveProps" : typeof _.UNSAFE_componentWillReceiveProps == "function" && (Y = "UNSAFE_componentWillReceiveProps"), typeof _.componentWillUpdate == "function" && _.componentWillUpdate.__suppressDeprecationWarning !== !0 ? Q = "componentWillUpdate" : typeof _.UNSAFE_componentWillUpdate == "function" && (Q = "UNSAFE_componentWillUpdate"), H !== null || Y !== null || Q !== null) {
            var ge = Dt(t) || "Component", Be = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            DE.has(ge) || (DE.add(ge), g(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ge, Be, H !== null ? `
  ` + H : "", Y !== null ? `
  ` + Y : "", Q !== null ? `
  ` + Q : ""));
          }
        }
      }
      return i && N_(e, l, s), _;
    }
    function f1(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (g("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", et(e) || "Component"), AE.enqueueReplaceState(t, t.state, null));
    }
    function YT(e, t, a, i) {
      var l = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== l) {
        {
          var s = et(e) || "Component";
          bE.has(s) || (bE.add(s), g("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        AE.enqueueReplaceState(t, t.state, null);
      }
    }
    function zE(e, t, a, i) {
      c1(e, t, a);
      var l = e.stateNode;
      l.props = a, l.state = e.memoizedState, l.refs = {}, Yg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        l.context = rr(s);
      else {
        var f = zf(e, t, !0);
        l.context = Uf(e, f);
      }
      {
        if (l.state === a) {
          var p = Dt(t) || "Component";
          kE.has(p) || (kE.add(p), g("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Jt && so.recordLegacyContextWarning(e, l), so.recordUnsafeLifecycleWarnings(e, l);
      }
      l.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (LE(e, t, v, a), l.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof l.getSnapshotBeforeUpdate != "function" && (typeof l.UNSAFE_componentWillMount == "function" || typeof l.componentWillMount == "function") && (f1(e, l), _m(e, a, l, i), l.state = e.memoizedState), typeof l.componentDidMount == "function") {
        var S = Tt;
        S |= Zi, (e.mode & Pt) !== Ie && (S |= Lo), e.flags |= S;
      }
    }
    function d1(e, t, a, i) {
      var l = e.stateNode, s = e.memoizedProps;
      l.props = s;
      var f = l.context, p = t.contextType, v = ci;
      if (typeof p == "object" && p !== null)
        v = rr(p);
      else {
        var S = zf(e, t, !0);
        v = Uf(e, S);
      }
      var _ = t.getDerivedStateFromProps, O = typeof _ == "function" || typeof l.getSnapshotBeforeUpdate == "function";
      !O && (typeof l.UNSAFE_componentWillReceiveProps == "function" || typeof l.componentWillReceiveProps == "function") && (s !== a || f !== v) && YT(e, l, a, v), iT();
      var x = e.memoizedState, H = l.state = x;
      if (_m(e, a, l, i), H = e.memoizedState, s === a && x === H && !nm() && !Tm()) {
        if (typeof l.componentDidMount == "function") {
          var Y = Tt;
          Y |= Zi, (e.mode & Pt) !== Ie && (Y |= Lo), e.flags |= Y;
        }
        return !1;
      }
      typeof _ == "function" && (LE(e, t, _, a), H = e.memoizedState);
      var Q = Tm() || IT(e, t, s, a, x, H, v);
      if (Q) {
        if (!O && (typeof l.UNSAFE_componentWillMount == "function" || typeof l.componentWillMount == "function") && (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function") {
          var ge = Tt;
          ge |= Zi, (e.mode & Pt) !== Ie && (ge |= Lo), e.flags |= ge;
        }
      } else {
        if (typeof l.componentDidMount == "function") {
          var Be = Tt;
          Be |= Zi, (e.mode & Pt) !== Ie && (Be |= Lo), e.flags |= Be;
        }
        e.memoizedProps = a, e.memoizedState = H;
      }
      return l.props = a, l.state = H, l.context = v, Q;
    }
    function p1(e, t, a, i, l) {
      var s = t.stateNode;
      aT(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : po(t.type, f);
      s.props = p;
      var v = t.pendingProps, S = s.context, _ = a.contextType, O = ci;
      if (typeof _ == "object" && _ !== null)
        O = rr(_);
      else {
        var x = zf(t, a, !0);
        O = Uf(t, x);
      }
      var H = a.getDerivedStateFromProps, Y = typeof H == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !Y && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || S !== O) && YT(t, s, i, O), iT();
      var Q = t.memoizedState, ge = s.state = Q;
      if (_m(t, i, s, l), ge = t.memoizedState, f === v && Q === ge && !nm() && !Tm() && !Ae)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || Q !== e.memoizedState) && (t.flags |= Tt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || Q !== e.memoizedState) && (t.flags |= Gn), !1;
      typeof H == "function" && (LE(t, a, H, i), ge = t.memoizedState);
      var Be = Tm() || IT(t, a, p, i, Q, ge, O) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Ae;
      return Be ? (!Y && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, ge, O), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, ge, O)), typeof s.componentDidUpdate == "function" && (t.flags |= Tt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= Gn)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || Q !== e.memoizedState) && (t.flags |= Tt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || Q !== e.memoizedState) && (t.flags |= Gn), t.memoizedProps = i, t.memoizedState = ge), s.props = i, s.state = ge, s.context = O, Be;
    }
    function lc(e, t) {
      return {
        value: e,
        source: t,
        stack: Wi(t),
        digest: null
      };
    }
    function UE(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function v1(e, t) {
      return !0;
    }
    function PE(e, t) {
      try {
        var a = v1(e, t);
        if (a === !1)
          return;
        var i = t.value, l = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === K)
            return;
          console.error(i);
        }
        var p = l ? et(l) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", S;
        if (e.tag === F)
          S = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var _ = et(e) || "Anonymous";
          S = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + _ + ".");
        }
        var O = v + `
` + f + `

` + ("" + S);
        console.error(O);
      } catch (x) {
        setTimeout(function() {
          throw x;
        });
      }
    }
    var h1 = typeof WeakMap == "function" ? WeakMap : Map;
    function $T(e, t, a) {
      var i = Wl(nn, a);
      i.tag = Vg, i.payload = {
        element: null
      };
      var l = t.value;
      return i.callback = function() {
        lD(l), PE(e, t);
      }, i;
    }
    function jE(e, t, a) {
      var i = Wl(nn, a);
      i.tag = Vg;
      var l = e.type.getDerivedStateFromError;
      if (typeof l == "function") {
        var s = t.value;
        i.payload = function() {
          return l(s);
        }, i.callback = function() {
          nC(e), PE(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        nC(e), PE(e, t), typeof l != "function" && iD(this);
        var v = t.value, S = t.stack;
        this.componentDidCatch(v, {
          componentStack: S !== null ? S : ""
        }), typeof l != "function" && (na(e.lanes, qe) || g("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", et(e) || "Unknown"));
      }), i;
    }
    function WT(e, t, a) {
      var i = e.pingCache, l;
      if (i === null ? (i = e.pingCache = new h1(), l = /* @__PURE__ */ new Set(), i.set(t, l)) : (l = i.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), i.set(t, l))), !l.has(a)) {
        l.add(a);
        var s = uD.bind(null, e, t, a);
        ea && cv(e, a), t.then(s, s);
      }
    }
    function m1(e, t, a, i) {
      var l = e.updateQueue;
      if (l === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        l.add(a);
    }
    function y1(e, t) {
      var a = e.tag;
      if ((e.mode & mt) === Ie && (a === P || a === Le || a === je)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function GT(e) {
      var t = e;
      do {
        if (t.tag === Oe && Xw(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function QT(e, t, a, i, l) {
      if ((e.mode & mt) === Ie) {
        if (e === t)
          e.flags |= Jn;
        else {
          if (e.flags |= Pe, a.flags |= Pc, a.flags &= -52805, a.tag === K) {
            var s = a.alternate;
            if (s === null)
              a.tag = xt;
            else {
              var f = Wl(nn, qe);
              f.tag = ym, Hu(a, f, qe);
            }
          }
          a.lanes = ot(a.lanes, qe);
        }
        return e;
      }
      return e.flags |= Jn, e.lanes = l, e;
    }
    function g1(e, t, a, i, l) {
      if (a.flags |= ms, ea && cv(e, l), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        y1(a), Fr() && a.mode & mt && F_();
        var f = GT(t);
        if (f !== null) {
          f.flags &= ~Rr, QT(f, t, a, e, l), f.mode & mt && WT(e, s, l), m1(f, e, s);
          return;
        } else {
          if (!oh(l)) {
            WT(e, s, l), yS();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Fr() && a.mode & mt) {
        F_();
        var v = GT(t);
        if (v !== null) {
          (v.flags & Jn) === He && (v.flags |= Rr), QT(v, t, a, e, l), kg(lc(i, a));
          return;
        }
      }
      i = lc(i, a), Xx(i);
      var S = t;
      do {
        switch (S.tag) {
          case F: {
            var _ = i;
            S.flags |= Jn;
            var O = Ms(l);
            S.lanes = ot(S.lanes, O);
            var x = $T(S, _, O);
            $g(S, x);
            return;
          }
          case K:
            var H = i, Y = S.type, Q = S.stateNode;
            if ((S.flags & Pe) === He && (typeof Y.getDerivedStateFromError == "function" || Q !== null && typeof Q.componentDidCatch == "function" && !GR(Q))) {
              S.flags |= Jn;
              var ge = Ms(l);
              S.lanes = ot(S.lanes, ge);
              var Be = jE(S, H, ge);
              $g(S, Be);
              return;
            }
            break;
        }
        S = S.return;
      } while (S !== null);
    }
    function E1() {
      return null;
    }
    var Qp = E.ReactCurrentOwner, vo = !1, FE, qp, HE, IE, VE, uc, BE, Wm, Kp;
    FE = {}, qp = {}, HE = {}, IE = {}, VE = {}, uc = !1, BE = {}, Wm = {}, Kp = {};
    function _a(e, t, a, i) {
      e === null ? t.child = X_(t, null, a, i) : t.child = Hf(t, e.child, a, i);
    }
    function S1(e, t, a, i) {
      t.child = Hf(t, e.child, null, i), t.child = Hf(t, null, a, i);
    }
    function qT(e, t, a, i, l) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && lo(
          s,
          i,
          // Resolved props
          "prop",
          Dt(a)
        );
      }
      var f = a.render, p = t.ref, v, S;
      Vf(t, l), ya(t);
      {
        if (Qp.current = t, Wn(!0), v = Qf(e, t, f, i, p, l), S = qf(), t.mode & Jt) {
          gn(!0);
          try {
            v = Qf(e, t, f, i, p, l), S = qf();
          } finally {
            gn(!1);
          }
        }
        Wn(!1);
      }
      return ga(), e !== null && !vo ? (fT(e, t, l), Gl(e, t, l)) : (Fr() && S && Cg(t), t.flags |= ii, _a(e, t, v, l), t.child);
    }
    function KT(e, t, a, i, l) {
      if (e === null) {
        var s = a.type;
        if (bD(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = rd(s), t.tag = je, t.type = f, WE(t, s), XT(e, t, f, i, l);
        }
        {
          var p = s.propTypes;
          if (p && lo(
            p,
            i,
            // Resolved props
            "prop",
            Dt(s)
          ), a.defaultProps !== void 0) {
            var v = Dt(s) || "Unknown";
            Kp[v] || (g("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Kp[v] = !0);
          }
        }
        var S = DS(a.type, null, i, t, t.mode, l);
        return S.ref = t.ref, S.return = t, t.child = S, S;
      }
      {
        var _ = a.type, O = _.propTypes;
        O && lo(
          O,
          i,
          // Resolved props
          "prop",
          Dt(_)
        );
      }
      var x = e.child, H = ZE(e, l);
      if (!H) {
        var Y = x.memoizedProps, Q = a.compare;
        if (Q = Q !== null ? Q : we, Q(Y, i) && e.ref === t.ref)
          return Gl(e, t, l);
      }
      t.flags |= ii;
      var ge = pc(x, i);
      return ge.ref = t.ref, ge.return = t, t.child = ge, ge;
    }
    function XT(e, t, a, i, l) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === tt) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var S = s && s.propTypes;
          S && lo(
            S,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Dt(s)
          );
        }
      }
      if (e !== null) {
        var _ = e.memoizedProps;
        if (we(_, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (vo = !1, t.pendingProps = i = _, ZE(e, l))
            (e.flags & Pc) !== He && (vo = !0);
          else return t.lanes = e.lanes, Gl(e, t, l);
      }
      return YE(e, t, a, i, l);
    }
    function ZT(e, t, a) {
      var i = t.pendingProps, l = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || pe)
        if ((t.mode & mt) === Ie) {
          var f = {
            baseLanes: ne,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, iy(t, a);
        } else if (na(a, ta)) {
          var O = {
            baseLanes: ne,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = O;
          var x = s !== null ? s.baseLanes : a;
          iy(t, x);
        } else {
          var p = null, v;
          if (s !== null) {
            var S = s.baseLanes;
            v = ot(S, a);
          } else
            v = a;
          t.lanes = t.childLanes = ta;
          var _ = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = _, t.updateQueue = null, iy(t, v), null;
        }
      else {
        var H;
        s !== null ? (H = ot(s.baseLanes, a), t.memoizedState = null) : H = a, iy(t, H);
      }
      return _a(e, t, l, a), t.child;
    }
    function _1(e, t, a) {
      var i = t.pendingProps;
      return _a(e, t, i, a), t.child;
    }
    function T1(e, t, a) {
      var i = t.pendingProps.children;
      return _a(e, t, i, a), t.child;
    }
    function R1(e, t, a) {
      {
        t.flags |= Tt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var l = t.pendingProps, s = l.children;
      return _a(e, t, s, a), t.child;
    }
    function JT(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Tn, t.flags |= _u);
    }
    function YE(e, t, a, i, l) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && lo(
          s,
          i,
          // Resolved props
          "prop",
          Dt(a)
        );
      }
      var f;
      {
        var p = zf(t, a, !0);
        f = Uf(t, p);
      }
      var v, S;
      Vf(t, l), ya(t);
      {
        if (Qp.current = t, Wn(!0), v = Qf(e, t, a, i, f, l), S = qf(), t.mode & Jt) {
          gn(!0);
          try {
            v = Qf(e, t, a, i, f, l), S = qf();
          } finally {
            gn(!1);
          }
        }
        Wn(!1);
      }
      return ga(), e !== null && !vo ? (fT(e, t, l), Gl(e, t, l)) : (Fr() && S && Cg(t), t.flags |= ii, _a(e, t, v, l), t.child);
    }
    function eR(e, t, a, i, l) {
      {
        switch (HD(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= Pe, t.flags |= Jn;
            var S = new Error("Simulated error coming from DevTools"), _ = Ms(l);
            t.lanes = ot(t.lanes, _);
            var O = jE(t, lc(S, t), _);
            $g(t, O);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var x = a.propTypes;
          x && lo(
            x,
            i,
            // Resolved props
            "prop",
            Dt(a)
          );
        }
      }
      var H;
      Ko(a) ? (H = !0, am(t)) : H = !1, Vf(t, l);
      var Y = t.stateNode, Q;
      Y === null ? (Qm(e, t), BT(t, a, i), zE(t, a, i, l), Q = !0) : e === null ? Q = d1(t, a, i, l) : Q = p1(e, t, a, i, l);
      var ge = $E(e, t, a, Q, H, l);
      {
        var Be = t.stateNode;
        Q && Be.props !== i && (uc || g("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", et(t) || "a component"), uc = !0);
      }
      return ge;
    }
    function $E(e, t, a, i, l, s) {
      JT(e, t);
      var f = (t.flags & Pe) !== He;
      if (!i && !f)
        return l && z_(t, a, !1), Gl(e, t, s);
      var p = t.stateNode;
      Qp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, jT();
      else {
        ya(t);
        {
          if (Wn(!0), v = p.render(), t.mode & Jt) {
            gn(!0);
            try {
              p.render();
            } finally {
              gn(!1);
            }
          }
          Wn(!1);
        }
        ga();
      }
      return t.flags |= ii, e !== null && f ? S1(e, t, v, s) : _a(e, t, v, s), t.memoizedState = p.state, l && z_(t, a, !0), t.child;
    }
    function tR(e) {
      var t = e.stateNode;
      t.pendingContext ? L_(e, t.pendingContext, t.pendingContext !== t.context) : t.context && L_(e, t.context, !1), Wg(e, t.containerInfo);
    }
    function C1(e, t, a) {
      if (tR(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, l = t.memoizedState, s = l.element;
      aT(e, t), _m(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (l.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, S = t.updateQueue;
        if (S.baseState = v, t.memoizedState = v, t.flags & Rr) {
          var _ = lc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return nR(e, t, p, a, _);
        } else if (p !== s) {
          var O = lc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return nR(e, t, p, a, O);
        } else {
          xw(t);
          var x = X_(t, null, p, a);
          t.child = x;
          for (var H = x; H; )
            H.flags = H.flags & ~yn | Xr, H = H.sibling;
        }
      } else {
        if (Ff(), p === s)
          return Gl(e, t, a);
        _a(e, t, p, a);
      }
      return t.child;
    }
    function nR(e, t, a, i, l) {
      return Ff(), kg(l), t.flags |= Rr, _a(e, t, a, i), t.child;
    }
    function b1(e, t, a) {
      uT(t), e === null && Og(t);
      var i = t.type, l = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = l.children, p = cg(i, l);
      return p ? f = null : s !== null && cg(i, s) && (t.flags |= Na), JT(e, t), _a(e, t, f, a), t.child;
    }
    function w1(e, t) {
      return e === null && Og(t), null;
    }
    function x1(e, t, a, i) {
      Qm(e, t);
      var l = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var S = t.tag = wD(v), _ = po(v, l), O;
      switch (S) {
        case P:
          return WE(t, v), t.type = v = rd(v), O = YE(null, t, v, _, i), O;
        case K:
          return t.type = v = TS(v), O = eR(null, t, v, _, i), O;
        case Le:
          return t.type = v = RS(v), O = qT(null, t, v, _, i), O;
        case Je: {
          if (t.type !== t.elementType) {
            var x = v.propTypes;
            x && lo(
              x,
              _,
              // Resolved for outer only
              "prop",
              Dt(v)
            );
          }
          return O = KT(
            null,
            t,
            v,
            po(v.type, _),
            // The inner type can have defaults too
            i
          ), O;
        }
      }
      var H = "";
      throw v !== null && typeof v == "object" && v.$$typeof === tt && (H = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + H));
    }
    function D1(e, t, a, i, l) {
      Qm(e, t), t.tag = K;
      var s;
      return Ko(a) ? (s = !0, am(t)) : s = !1, Vf(t, l), BT(t, a, i), zE(t, a, i, l), $E(null, t, a, !0, s, l);
    }
    function O1(e, t, a, i) {
      Qm(e, t);
      var l = t.pendingProps, s;
      {
        var f = zf(t, a, !1);
        s = Uf(t, f);
      }
      Vf(t, i);
      var p, v;
      ya(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var S = Dt(a) || "Unknown";
          FE[S] || (g("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", S, S), FE[S] = !0);
        }
        t.mode & Jt && so.recordLegacyContextWarning(t, null), Wn(!0), Qp.current = t, p = Qf(null, t, a, l, s, i), v = qf(), Wn(!1);
      }
      if (ga(), t.flags |= ii, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var _ = Dt(a) || "Unknown";
        qp[_] || (g("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _, _, _), qp[_] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var O = Dt(a) || "Unknown";
          qp[O] || (g("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", O, O, O), qp[O] = !0);
        }
        t.tag = K, t.memoizedState = null, t.updateQueue = null;
        var x = !1;
        return Ko(a) ? (x = !0, am(t)) : x = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, Yg(t), VT(t, p), zE(t, a, l, i), $E(null, t, a, !0, x, i);
      } else {
        if (t.tag = P, t.mode & Jt) {
          gn(!0);
          try {
            p = Qf(null, t, a, l, s, i), v = qf();
          } finally {
            gn(!1);
          }
        }
        return Fr() && v && Cg(t), _a(null, t, p, i), WE(t, a), t.child;
      }
    }
    function WE(e, t) {
      {
        if (t && t.childContextTypes && g("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Nr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var l = i || "", s = e._debugSource;
          s && (l = s.fileName + ":" + s.lineNumber), VE[l] || (VE[l] = !0, g("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = Dt(t) || "Unknown";
          Kp[f] || (g("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Kp[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = Dt(t) || "Unknown";
          IE[p] || (g("%s: Function components do not support getDerivedStateFromProps.", p), IE[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = Dt(t) || "Unknown";
          HE[v] || (g("%s: Function components do not support contextType.", v), HE[v] = !0);
        }
      }
    }
    var GE = {
      dehydrated: null,
      treeContext: null,
      retryLane: Lt
    };
    function QE(e) {
      return {
        baseLanes: e,
        cachePool: E1(),
        transitions: null
      };
    }
    function k1(e, t) {
      var a = null;
      return {
        baseLanes: ot(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function M1(e, t, a, i) {
      if (t !== null) {
        var l = t.memoizedState;
        if (l === null)
          return !1;
      }
      return qg(e, Fp);
    }
    function N1(e, t) {
      return Ns(e.childLanes, t);
    }
    function rR(e, t, a) {
      var i = t.pendingProps;
      ID(t) && (t.flags |= Pe);
      var l = co.current, s = !1, f = (t.flags & Pe) !== He;
      if (f || M1(l, e) ? (s = !0, t.flags &= ~Pe) : (e === null || e.memoizedState !== null) && (l = Kw(l, cT)), l = Yf(l), Vu(t, l), e === null) {
        Og(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return P1(t, v);
        }
        var S = i.children, _ = i.fallback;
        if (s) {
          var O = L1(t, S, _, a), x = t.child;
          return x.memoizedState = QE(a), t.memoizedState = GE, O;
        } else
          return qE(t, S);
      } else {
        var H = e.memoizedState;
        if (H !== null) {
          var Y = H.dehydrated;
          if (Y !== null)
            return j1(e, t, f, i, Y, H, a);
        }
        if (s) {
          var Q = i.fallback, ge = i.children, Be = z1(e, t, ge, Q, a), Ue = t.child, bt = e.child.memoizedState;
          return Ue.memoizedState = bt === null ? QE(a) : k1(bt, a), Ue.childLanes = N1(e, a), t.memoizedState = GE, Be;
        } else {
          var Et = i.children, z = A1(e, t, Et, a);
          return t.memoizedState = null, z;
        }
      }
    }
    function qE(e, t, a) {
      var i = e.mode, l = {
        mode: "visible",
        children: t
      }, s = KE(l, i);
      return s.return = e, e.child = s, s;
    }
    function L1(e, t, a, i) {
      var l = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (l & mt) === Ie && s !== null ? (p = s, p.childLanes = ne, p.pendingProps = f, e.mode & Ut && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = Ku(a, l, i, null)) : (p = KE(f, l), v = Ku(a, l, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function KE(e, t, a) {
      return aC(e, t, ne, null);
    }
    function aR(e, t) {
      return pc(e, t);
    }
    function A1(e, t, a, i) {
      var l = e.child, s = l.sibling, f = aR(l, {
        mode: "visible",
        children: a
      });
      if ((t.mode & mt) === Ie && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= Ma) : p.push(s);
      }
      return t.child = f, f;
    }
    function z1(e, t, a, i, l) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, S;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & mt) === Ie && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var _ = t.child;
        S = _, S.childLanes = ne, S.pendingProps = v, t.mode & Ut && (S.actualDuration = 0, S.actualStartTime = -1, S.selfBaseDuration = f.selfBaseDuration, S.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        S = aR(f, v), S.subtreeFlags = f.subtreeFlags & Un;
      var O;
      return p !== null ? O = pc(p, i) : (O = Ku(i, s, l, null), O.flags |= yn), O.return = t, S.return = t, S.sibling = O, t.child = S, O;
    }
    function Gm(e, t, a, i) {
      i !== null && kg(i), Hf(t, e.child, null, a);
      var l = t.pendingProps, s = l.children, f = qE(t, s);
      return f.flags |= yn, t.memoizedState = null, f;
    }
    function U1(e, t, a, i, l) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = KE(f, s), v = Ku(i, s, l, null);
      return v.flags |= yn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & mt) !== Ie && Hf(t, e.child, null, l), v;
    }
    function P1(e, t, a) {
      return (e.mode & mt) === Ie ? (g("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = qe) : vg(t) ? e.lanes = Cr : e.lanes = ta, null;
    }
    function j1(e, t, a, i, l, s, f) {
      if (a)
        if (t.flags & Rr) {
          t.flags &= ~Rr;
          var z = UE(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Gm(e, t, f, z);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Pe, null;
          var q = i.children, U = i.fallback, le = U1(e, t, q, U, f), Te = t.child;
          return Te.memoizedState = QE(f), t.memoizedState = GE, le;
        }
      else {
        if (bw(), (t.mode & mt) === Ie)
          return Gm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (vg(l)) {
          var p, v, S;
          {
            var _ = V0(l);
            p = _.digest, v = _.message, S = _.stack;
          }
          var O;
          v ? O = new Error(v) : O = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var x = UE(O, p, S);
          return Gm(e, t, f, x);
        }
        var H = na(f, e.childLanes);
        if (vo || H) {
          var Y = ay();
          if (Y !== null) {
            var Q = Jd(Y, f);
            if (Q !== Lt && Q !== s.retryLane) {
              s.retryLane = Q;
              var ge = nn;
              Ia(e, Q), Er(Y, e, Q, ge);
            }
          }
          yS();
          var Be = UE(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Gm(e, t, f, Be);
        } else if (x_(l)) {
          t.flags |= Pe, t.child = e.child;
          var Ue = sD.bind(null, e);
          return B0(l, Ue), null;
        } else {
          Dw(t, l, s.treeContext);
          var bt = i.children, Et = qE(t, bt);
          return Et.flags |= Xr, Et;
        }
      }
    }
    function iR(e, t, a) {
      e.lanes = ot(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = ot(i.lanes, t)), Hg(e.return, t, a);
    }
    function F1(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === Oe) {
          var l = i.memoizedState;
          l !== null && iR(i, a, e);
        } else if (i.tag === Mt)
          iR(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function H1(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && bm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function I1(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !BE[e])
        if (BE[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              g('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              g('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              g('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          g('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function V1(e, t) {
      e !== void 0 && !Wm[e] && (e !== "collapsed" && e !== "hidden" ? (Wm[e] = !0, g('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Wm[e] = !0, g('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function oR(e, t) {
      {
        var a = dt(e), i = !a && typeof it(e) == "function";
        if (a || i) {
          var l = a ? "array" : "iterable";
          return g("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", l, t, l), !1;
        }
      }
      return !0;
    }
    function B1(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (dt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!oR(e[a], a))
              return;
        } else {
          var i = it(e);
          if (typeof i == "function") {
            var l = i.call(e);
            if (l)
              for (var s = l.next(), f = 0; !s.done; s = l.next()) {
                if (!oR(s.value, f))
                  return;
                f++;
              }
          } else
            g('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function XE(e, t, a, i, l) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: l
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = l);
    }
    function lR(e, t, a) {
      var i = t.pendingProps, l = i.revealOrder, s = i.tail, f = i.children;
      I1(l), V1(s, l), B1(f, l), _a(e, t, f, a);
      var p = co.current, v = qg(p, Fp);
      if (v)
        p = Kg(p, Fp), t.flags |= Pe;
      else {
        var S = e !== null && (e.flags & Pe) !== He;
        S && F1(t, t.child, a), p = Yf(p);
      }
      if (Vu(t, p), (t.mode & mt) === Ie)
        t.memoizedState = null;
      else
        switch (l) {
          case "forwards": {
            var _ = H1(t.child), O;
            _ === null ? (O = t.child, t.child = null) : (O = _.sibling, _.sibling = null), XE(
              t,
              !1,
              // isBackwards
              O,
              _,
              s
            );
            break;
          }
          case "backwards": {
            var x = null, H = t.child;
            for (t.child = null; H !== null; ) {
              var Y = H.alternate;
              if (Y !== null && bm(Y) === null) {
                t.child = H;
                break;
              }
              var Q = H.sibling;
              H.sibling = x, x = H, H = Q;
            }
            XE(
              t,
              !0,
              // isBackwards
              x,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            XE(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Y1(e, t, a) {
      Wg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = Hf(t, null, i, a) : _a(e, t, i, a), t.child;
    }
    var uR = !1;
    function $1(e, t, a) {
      var i = t.type, l = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || uR || (uR = !0, g("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && lo(v, s, "prop", "Context.Provider");
      }
      if (eT(t, l, p), f !== null) {
        var S = f.value;
        if (ie(S, p)) {
          if (f.children === s.children && !nm())
            return Gl(e, t, a);
        } else
          Iw(t, l, a);
      }
      var _ = s.children;
      return _a(e, t, _, a), t.child;
    }
    var sR = !1;
    function W1(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (sR || (sR = !0, g("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var l = t.pendingProps, s = l.children;
      typeof s != "function" && g("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Vf(t, a);
      var f = rr(i);
      ya(t);
      var p;
      return Qp.current = t, Wn(!0), p = s(f), Wn(!1), ga(), t.flags |= ii, _a(e, t, p, a), t.child;
    }
    function Xp() {
      vo = !0;
    }
    function Qm(e, t) {
      (t.mode & mt) === Ie && e !== null && (e.alternate = null, t.alternate = null, t.flags |= yn);
    }
    function Gl(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), jT(), sv(t.lanes), na(a, t.childLanes) ? (Fw(e, t), t.child) : null;
    }
    function G1(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var l = i.child;
          if (l === null)
            throw new Error("Expected parent to have a child.");
          for (; l.sibling !== t; )
            if (l = l.sibling, l === null)
              throw new Error("Expected to find the previous sibling.");
          l.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= Ma) : s.push(e), a.flags |= yn, a;
      }
    }
    function ZE(e, t) {
      var a = e.lanes;
      return !!na(a, t);
    }
    function Q1(e, t, a) {
      switch (t.tag) {
        case F:
          tR(t), t.stateNode, Ff();
          break;
        case N:
          uT(t);
          break;
        case K: {
          var i = t.type;
          Ko(i) && am(t);
          break;
        }
        case W:
          Wg(t, t.stateNode.containerInfo);
          break;
        case De: {
          var l = t.memoizedProps.value, s = t.type._context;
          eT(t, s, l);
          break;
        }
        case Ye:
          {
            var f = na(a, t.childLanes);
            f && (t.flags |= Tt);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case Oe: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Vu(t, Yf(co.current)), t.flags |= Pe, null;
            var S = t.child, _ = S.childLanes;
            if (na(a, _))
              return rR(e, t, a);
            Vu(t, Yf(co.current));
            var O = Gl(e, t, a);
            return O !== null ? O.sibling : null;
          } else
            Vu(t, Yf(co.current));
          break;
        }
        case Mt: {
          var x = (e.flags & Pe) !== He, H = na(a, t.childLanes);
          if (x) {
            if (H)
              return lR(e, t, a);
            t.flags |= Pe;
          }
          var Y = t.memoizedState;
          if (Y !== null && (Y.rendering = null, Y.tail = null, Y.lastEffect = null), Vu(t, co.current), H)
            break;
          return null;
        }
        case Fe:
        case Vt:
          return t.lanes = ne, ZT(e, t, a);
      }
      return Gl(e, t, a);
    }
    function cR(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return G1(e, t, DS(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, l = t.pendingProps;
        if (i !== l || nm() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          vo = !0;
        else {
          var s = ZE(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Pe) === He)
            return vo = !1, Q1(e, t, a);
          (e.flags & Pc) !== He ? vo = !0 : vo = !1;
        }
      } else if (vo = !1, Fr() && Ew(t)) {
        var f = t.index, p = Sw();
        j_(t, p, f);
      }
      switch (t.lanes = ne, t.tag) {
        case B:
          return O1(e, t, t.type, a);
        case wt: {
          var v = t.elementType;
          return x1(e, t, v, a);
        }
        case P: {
          var S = t.type, _ = t.pendingProps, O = t.elementType === S ? _ : po(S, _);
          return YE(e, t, S, O, a);
        }
        case K: {
          var x = t.type, H = t.pendingProps, Y = t.elementType === x ? H : po(x, H);
          return eR(e, t, x, Y, a);
        }
        case F:
          return C1(e, t, a);
        case N:
          return b1(e, t, a);
        case X:
          return w1(e, t);
        case Oe:
          return rR(e, t, a);
        case W:
          return Y1(e, t, a);
        case Le: {
          var Q = t.type, ge = t.pendingProps, Be = t.elementType === Q ? ge : po(Q, ge);
          return qT(e, t, Q, Be, a);
        }
        case fe:
          return _1(e, t, a);
        case he:
          return T1(e, t, a);
        case Ye:
          return R1(e, t, a);
        case De:
          return $1(e, t, a);
        case Me:
          return W1(e, t, a);
        case Je: {
          var Ue = t.type, bt = t.pendingProps, Et = po(Ue, bt);
          if (t.type !== t.elementType) {
            var z = Ue.propTypes;
            z && lo(
              z,
              Et,
              // Resolved for outer only
              "prop",
              Dt(Ue)
            );
          }
          return Et = po(Ue.type, Et), KT(e, t, Ue, Et, a);
        }
        case je:
          return XT(e, t, t.type, t.pendingProps, a);
        case xt: {
          var q = t.type, U = t.pendingProps, le = t.elementType === q ? U : po(q, U);
          return D1(e, t, q, le, a);
        }
        case Mt:
          return lR(e, t, a);
        case _t:
          break;
        case Fe:
          return ZT(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Kf(e) {
      e.flags |= Tt;
    }
    function fR(e) {
      e.flags |= Tn, e.flags |= _u;
    }
    var dR, JE, pR, vR;
    dR = function(e, t, a, i) {
      for (var l = t.child; l !== null; ) {
        if (l.tag === N || l.tag === X)
          m0(e, l.stateNode);
        else if (l.tag !== W) {
          if (l.child !== null) {
            l.child.return = l, l = l.child;
            continue;
          }
        }
        if (l === t)
          return;
        for (; l.sibling === null; ) {
          if (l.return === null || l.return === t)
            return;
          l = l.return;
        }
        l.sibling.return = l.return, l = l.sibling;
      }
    }, JE = function(e, t) {
    }, pR = function(e, t, a, i, l) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = Gg(), v = g0(f, a, s, i, l, p);
        t.updateQueue = v, v && Kf(t);
      }
    }, vR = function(e, t, a, i) {
      a !== i && Kf(t);
    };
    function Zp(e, t) {
      if (!Fr())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var l = e.tail, s = null; l !== null; )
              l.alternate !== null && (s = l), l = l.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function Ir(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = ne, i = He;
      if (t) {
        if ((e.mode & Ut) !== Ie) {
          for (var v = e.selfBaseDuration, S = e.child; S !== null; )
            a = ot(a, ot(S.lanes, S.childLanes)), i |= S.subtreeFlags & Un, i |= S.flags & Un, v += S.treeBaseDuration, S = S.sibling;
          e.treeBaseDuration = v;
        } else
          for (var _ = e.child; _ !== null; )
            a = ot(a, ot(_.lanes, _.childLanes)), i |= _.subtreeFlags & Un, i |= _.flags & Un, _.return = e, _ = _.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Ut) !== Ie) {
          for (var l = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = ot(a, ot(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, l += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = l, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = ot(a, ot(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function q1(e, t, a) {
      if (Lw() && (t.mode & mt) !== Ie && (t.flags & Pe) === He)
        return $_(t), Ff(), t.flags |= Rr | ms | Jn, !1;
      var i = sm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (Mw(t), Ir(t), (t.mode & Ut) !== Ie) {
            var l = a !== null;
            if (l) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Ff(), (t.flags & Pe) === He && (t.memoizedState = null), t.flags |= Tt, Ir(t), (t.mode & Ut) !== Ie) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return W_(), !0;
    }
    function hR(e, t, a) {
      var i = t.pendingProps;
      switch (bg(t), t.tag) {
        case B:
        case wt:
        case je:
        case P:
        case Le:
        case fe:
        case he:
        case Ye:
        case Me:
        case Je:
          return Ir(t), null;
        case K: {
          var l = t.type;
          return Ko(l) && rm(t), Ir(t), null;
        }
        case F: {
          var s = t.stateNode;
          if (Bf(t), _g(t), Zg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = sm(t);
            if (f)
              Kf(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Rr) !== He) && (t.flags |= Gn, W_());
            }
          }
          return JE(e, t), Ir(t), null;
        }
        case N: {
          Qg(t);
          var v = lT(), S = t.type;
          if (e !== null && t.stateNode != null)
            pR(e, t, S, i, v), e.ref !== t.ref && fR(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Ir(t), null;
            }
            var _ = Gg(), O = sm(t);
            if (O)
              Ow(t, v, _) && Kf(t);
            else {
              var x = h0(S, i, v, _, t);
              dR(x, t, !1, !1), t.stateNode = x, y0(x, S, i, v) && Kf(t);
            }
            t.ref !== null && fR(t);
          }
          return Ir(t), null;
        }
        case X: {
          var H = i;
          if (e && t.stateNode != null) {
            var Y = e.memoizedProps;
            vR(e, t, Y, H);
          } else {
            if (typeof H != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var Q = lT(), ge = Gg(), Be = sm(t);
            Be ? kw(t) && Kf(t) : t.stateNode = E0(H, Q, ge, t);
          }
          return Ir(t), null;
        }
        case Oe: {
          $f(t);
          var Ue = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var bt = q1(e, t, Ue);
            if (!bt)
              return t.flags & Jn ? t : null;
          }
          if ((t.flags & Pe) !== He)
            return t.lanes = a, (t.mode & Ut) !== Ie && RE(t), t;
          var Et = Ue !== null, z = e !== null && e.memoizedState !== null;
          if (Et !== z && Et) {
            var q = t.child;
            if (q.flags |= zn, (t.mode & mt) !== Ie) {
              var U = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              U || qg(co.current, cT) ? Kx() : yS();
            }
          }
          var le = t.updateQueue;
          if (le !== null && (t.flags |= Tt), Ir(t), (t.mode & Ut) !== Ie && Et) {
            var Te = t.child;
            Te !== null && (t.treeBaseDuration -= Te.treeBaseDuration);
          }
          return null;
        }
        case W:
          return Bf(t), JE(e, t), e === null && dw(t.stateNode.containerInfo), Ir(t), null;
        case De:
          var Ee = t.type._context;
          return Fg(Ee, t), Ir(t), null;
        case xt: {
          var Xe = t.type;
          return Ko(Xe) && rm(t), Ir(t), null;
        }
        case Mt: {
          $f(t);
          var rt = t.memoizedState;
          if (rt === null)
            return Ir(t), null;
          var tn = (t.flags & Pe) !== He, Ft = rt.rendering;
          if (Ft === null)
            if (tn)
              Zp(rt, !1);
            else {
              var Kn = Zx() && (e === null || (e.flags & Pe) === He);
              if (!Kn)
                for (var Ht = t.child; Ht !== null; ) {
                  var Vn = bm(Ht);
                  if (Vn !== null) {
                    tn = !0, t.flags |= Pe, Zp(rt, !1);
                    var sa = Vn.updateQueue;
                    return sa !== null && (t.updateQueue = sa, t.flags |= Tt), t.subtreeFlags = He, Hw(t, a), Vu(t, Kg(co.current, Fp)), t.child;
                  }
                  Ht = Ht.sibling;
                }
              rt.tail !== null && Qn() > UR() && (t.flags |= Pe, tn = !0, Zp(rt, !1), t.lanes = Yd);
            }
          else {
            if (!tn) {
              var Wr = bm(Ft);
              if (Wr !== null) {
                t.flags |= Pe, tn = !0;
                var di = Wr.updateQueue;
                if (di !== null && (t.updateQueue = di, t.flags |= Tt), Zp(rt, !0), rt.tail === null && rt.tailMode === "hidden" && !Ft.alternate && !Fr())
                  return Ir(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Qn() * 2 - rt.renderingStartTime > UR() && a !== ta && (t.flags |= Pe, tn = !0, Zp(rt, !1), t.lanes = Yd);
            }
            if (rt.isBackwards)
              Ft.sibling = t.child, t.child = Ft;
            else {
              var Ca = rt.last;
              Ca !== null ? Ca.sibling = Ft : t.child = Ft, rt.last = Ft;
            }
          }
          if (rt.tail !== null) {
            var ba = rt.tail;
            rt.rendering = ba, rt.tail = ba.sibling, rt.renderingStartTime = Qn(), ba.sibling = null;
            var ca = co.current;
            return tn ? ca = Kg(ca, Fp) : ca = Yf(ca), Vu(t, ca), ba;
          }
          return Ir(t), null;
        }
        case _t:
          break;
        case Fe:
        case Vt: {
          mS(t);
          var Zl = t.memoizedState, ad = Zl !== null;
          if (e !== null) {
            var vv = e.memoizedState, al = vv !== null;
            al !== ad && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !pe && (t.flags |= zn);
          }
          return !ad || (t.mode & mt) === Ie ? Ir(t) : na(rl, ta) && (Ir(t), t.subtreeFlags & (yn | Tt) && (t.flags |= zn)), null;
        }
        case Nt:
          return null;
        case At:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function K1(e, t, a) {
      switch (bg(t), t.tag) {
        case K: {
          var i = t.type;
          Ko(i) && rm(t);
          var l = t.flags;
          return l & Jn ? (t.flags = l & ~Jn | Pe, (t.mode & Ut) !== Ie && RE(t), t) : null;
        }
        case F: {
          t.stateNode, Bf(t), _g(t), Zg();
          var s = t.flags;
          return (s & Jn) !== He && (s & Pe) === He ? (t.flags = s & ~Jn | Pe, t) : null;
        }
        case N:
          return Qg(t), null;
        case Oe: {
          $f(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Ff();
          }
          var p = t.flags;
          return p & Jn ? (t.flags = p & ~Jn | Pe, (t.mode & Ut) !== Ie && RE(t), t) : null;
        }
        case Mt:
          return $f(t), null;
        case W:
          return Bf(t), null;
        case De:
          var v = t.type._context;
          return Fg(v, t), null;
        case Fe:
        case Vt:
          return mS(t), null;
        case Nt:
          return null;
        default:
          return null;
      }
    }
    function mR(e, t, a) {
      switch (bg(t), t.tag) {
        case K: {
          var i = t.type.childContextTypes;
          i != null && rm(t);
          break;
        }
        case F: {
          t.stateNode, Bf(t), _g(t), Zg();
          break;
        }
        case N: {
          Qg(t);
          break;
        }
        case W:
          Bf(t);
          break;
        case Oe:
          $f(t);
          break;
        case Mt:
          $f(t);
          break;
        case De:
          var l = t.type._context;
          Fg(l, t);
          break;
        case Fe:
        case Vt:
          mS(t);
          break;
      }
    }
    var yR = null;
    yR = /* @__PURE__ */ new Set();
    var qm = !1, Vr = !1, X1 = typeof WeakSet == "function" ? WeakSet : Set, xe = null, Xf = null, Zf = null;
    function Z1(e) {
      No(null, function() {
        throw e;
      }), hs();
    }
    var J1 = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Ut)
        try {
          tl(), t.componentWillUnmount();
        } finally {
          el(e);
        }
      else
        t.componentWillUnmount();
    };
    function gR(e, t) {
      try {
        $u(pr, e);
      } catch (a) {
        dn(e, t, a);
      }
    }
    function eS(e, t, a) {
      try {
        J1(e, a);
      } catch (i) {
        dn(e, t, i);
      }
    }
    function ex(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        dn(e, t, i);
      }
    }
    function ER(e, t) {
      try {
        _R(e);
      } catch (a) {
        dn(e, t, a);
      }
    }
    function Jf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Qe && pt && e.mode & Ut)
              try {
                tl(), i = a(null);
              } finally {
                el(e);
              }
            else
              i = a(null);
          } catch (l) {
            dn(e, t, l);
          }
          typeof i == "function" && g("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", et(e));
        } else
          a.current = null;
    }
    function Km(e, t, a) {
      try {
        a();
      } catch (i) {
        dn(e, t, i);
      }
    }
    var SR = !1;
    function tx(e, t) {
      p0(e.containerInfo), xe = t, nx();
      var a = SR;
      return SR = !1, a;
    }
    function nx() {
      for (; xe !== null; ) {
        var e = xe, t = e.child;
        (e.subtreeFlags & Ao) !== He && t !== null ? (t.return = e, xe = t) : rx();
      }
    }
    function rx() {
      for (; xe !== null; ) {
        var e = xe;
        Kt(e);
        try {
          ax(e);
        } catch (a) {
          dn(e, e.return, a);
        }
        fn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, xe = t;
          return;
        }
        xe = e.return;
      }
    }
    function ax(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Gn) !== He) {
        switch (Kt(e), e.tag) {
          case P:
          case Le:
          case je:
            break;
          case K: {
            if (t !== null) {
              var i = t.memoizedProps, l = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !uc && (s.props !== e.memoizedProps && g("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(e) || "instance"), s.state !== e.memoizedState && g("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : po(e.type, i), l);
              {
                var p = yR;
                f === void 0 && !p.has(e.type) && (p.add(e.type), g("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", et(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case F: {
            {
              var v = e.stateNode;
              j0(v.containerInfo);
            }
            break;
          }
          case N:
          case X:
          case W:
          case xt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        fn();
      }
    }
    function ho(e, t, a) {
      var i = t.updateQueue, l = i !== null ? i.lastEffect : null;
      if (l !== null) {
        var s = l.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Hr) !== Va ? to(t) : (e & pr) !== Va && gs(t), (e & Xo) !== Va && fv(!0), Km(t, a, p), (e & Xo) !== Va && fv(!1), (e & Hr) !== Va ? jo() : (e & pr) !== Va && Vd());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function $u(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var l = i.next, s = l;
        do {
          if ((s.tag & e) === e) {
            (e & Hr) !== Va ? Id(t) : (e & pr) !== Va && Bc(t);
            var f = s.create;
            (e & Xo) !== Va && fv(!0), s.destroy = f(), (e & Xo) !== Va && fv(!1), (e & Hr) !== Va ? th() : (e & pr) !== Va && nh();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & pr) !== He ? v = "useLayoutEffect" : (s.tag & Xo) !== He ? v = "useInsertionEffect" : v = "useEffect";
                var S = void 0;
                p === null ? S = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? S = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : S = " You returned: " + p, g("%s must not return anything besides a function, which is used for clean-up.%s", v, S);
              }
            }
          }
          s = s.next;
        } while (s !== l);
      }
    }
    function ix(e, t) {
      if ((t.flags & Tt) !== He)
        switch (t.tag) {
          case Ye: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, l = i.id, s = i.onPostCommit, f = UT(), p = t.alternate === null ? "mount" : "update";
            zT() && (p = "nested-update"), typeof s == "function" && s(l, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case F:
                  var S = v.stateNode;
                  S.passiveEffectDuration += a;
                  break e;
                case Ye:
                  var _ = v.stateNode;
                  _.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function ox(e, t, a, i) {
      if ((a.flags & Uo) !== He)
        switch (a.tag) {
          case P:
          case Le:
          case je: {
            if (!Vr)
              if (a.mode & Ut)
                try {
                  tl(), $u(pr | dr, a);
                } finally {
                  el(a);
                }
              else
                $u(pr | dr, a);
            break;
          }
          case K: {
            var l = a.stateNode;
            if (a.flags & Tt && !Vr)
              if (t === null)
                if (a.type === a.elementType && !uc && (l.props !== a.memoizedProps && g("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(a) || "instance"), l.state !== a.memoizedState && g("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(a) || "instance")), a.mode & Ut)
                  try {
                    tl(), l.componentDidMount();
                  } finally {
                    el(a);
                  }
                else
                  l.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : po(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !uc && (l.props !== a.memoizedProps && g("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(a) || "instance"), l.state !== a.memoizedState && g("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(a) || "instance")), a.mode & Ut)
                  try {
                    tl(), l.componentDidUpdate(s, f, l.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    el(a);
                  }
                else
                  l.componentDidUpdate(s, f, l.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !uc && (l.props !== a.memoizedProps && g("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(a) || "instance"), l.state !== a.memoizedState && g("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(a) || "instance")), oT(a, p, l));
            break;
          }
          case F: {
            var v = a.updateQueue;
            if (v !== null) {
              var S = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case N:
                    S = a.child.stateNode;
                    break;
                  case K:
                    S = a.child.stateNode;
                    break;
                }
              oT(a, v, S);
            }
            break;
          }
          case N: {
            var _ = a.stateNode;
            if (t === null && a.flags & Tt) {
              var O = a.type, x = a.memoizedProps;
              C0(_, O, x);
            }
            break;
          }
          case X:
            break;
          case W:
            break;
          case Ye: {
            {
              var H = a.memoizedProps, Y = H.onCommit, Q = H.onRender, ge = a.stateNode.effectDuration, Be = UT(), Ue = t === null ? "mount" : "update";
              zT() && (Ue = "nested-update"), typeof Q == "function" && Q(a.memoizedProps.id, Ue, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Be);
              {
                typeof Y == "function" && Y(a.memoizedProps.id, Ue, ge, Be), rD(a);
                var bt = a.return;
                e: for (; bt !== null; ) {
                  switch (bt.tag) {
                    case F:
                      var Et = bt.stateNode;
                      Et.effectDuration += ge;
                      break e;
                    case Ye:
                      var z = bt.stateNode;
                      z.effectDuration += ge;
                      break e;
                  }
                  bt = bt.return;
                }
              }
            }
            break;
          }
          case Oe: {
            vx(e, a);
            break;
          }
          case Mt:
          case xt:
          case _t:
          case Fe:
          case Vt:
          case At:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Vr || a.flags & Tn && _R(a);
    }
    function lx(e) {
      switch (e.tag) {
        case P:
        case Le:
        case je: {
          if (e.mode & Ut)
            try {
              tl(), gR(e, e.return);
            } finally {
              el(e);
            }
          else
            gR(e, e.return);
          break;
        }
        case K: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && ex(e, e.return, t), ER(e, e.return);
          break;
        }
        case N: {
          ER(e, e.return);
          break;
        }
      }
    }
    function ux(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === N) {
          if (a === null) {
            a = i;
            try {
              var l = i.stateNode;
              t ? A0(l) : U0(i.stateNode, i.memoizedProps);
            } catch (f) {
              dn(e, e.return, f);
            }
          }
        } else if (i.tag === X) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? z0(s) : P0(s, i.memoizedProps);
            } catch (f) {
              dn(e, e.return, f);
            }
        } else if (!((i.tag === Fe || i.tag === Vt) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function _R(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case N:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var l;
          if (e.mode & Ut)
            try {
              tl(), l = t(i);
            } finally {
              el(e);
            }
          else
            l = t(i);
          typeof l == "function" && g("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", et(e));
        } else
          t.hasOwnProperty("current") || g("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", et(e)), t.current = i;
      }
    }
    function sx(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function TR(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, TR(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === N) {
          var a = e.stateNode;
          a !== null && hw(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function cx(e) {
      for (var t = e.return; t !== null; ) {
        if (RR(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function RR(e) {
      return e.tag === N || e.tag === F || e.tag === W;
    }
    function CR(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || RR(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== N && t.tag !== X && t.tag !== kt; ) {
          if (t.flags & yn || t.child === null || t.tag === W)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & yn))
          return t.stateNode;
      }
    }
    function fx(e) {
      var t = cx(e);
      switch (t.tag) {
        case N: {
          var a = t.stateNode;
          t.flags & Na && (w_(a), t.flags &= ~Na);
          var i = CR(e);
          nS(e, i, a);
          break;
        }
        case F:
        case W: {
          var l = t.stateNode.containerInfo, s = CR(e);
          tS(e, s, l);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function tS(e, t, a) {
      var i = e.tag, l = i === N || i === X;
      if (l) {
        var s = e.stateNode;
        t ? k0(a, s, t) : D0(a, s);
      } else if (i !== W) {
        var f = e.child;
        if (f !== null) {
          tS(f, t, a);
          for (var p = f.sibling; p !== null; )
            tS(p, t, a), p = p.sibling;
        }
      }
    }
    function nS(e, t, a) {
      var i = e.tag, l = i === N || i === X;
      if (l) {
        var s = e.stateNode;
        t ? O0(a, s, t) : x0(a, s);
      } else if (i !== W) {
        var f = e.child;
        if (f !== null) {
          nS(f, t, a);
          for (var p = f.sibling; p !== null; )
            nS(p, t, a), p = p.sibling;
        }
      }
    }
    var Br = null, mo = !1;
    function dx(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case N: {
              Br = i.stateNode, mo = !1;
              break e;
            }
            case F: {
              Br = i.stateNode.containerInfo, mo = !0;
              break e;
            }
            case W: {
              Br = i.stateNode.containerInfo, mo = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Br === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        bR(e, t, a), Br = null, mo = !1;
      }
      sx(a);
    }
    function Wu(e, t, a) {
      for (var i = a.child; i !== null; )
        bR(e, t, i), i = i.sibling;
    }
    function bR(e, t, a) {
      switch (jd(a), a.tag) {
        case N:
          Vr || Jf(a, t);
        case X: {
          {
            var i = Br, l = mo;
            Br = null, Wu(e, t, a), Br = i, mo = l, Br !== null && (mo ? N0(Br, a.stateNode) : M0(Br, a.stateNode));
          }
          return;
        }
        case kt: {
          Br !== null && (mo ? L0(Br, a.stateNode) : pg(Br, a.stateNode));
          return;
        }
        case W: {
          {
            var s = Br, f = mo;
            Br = a.stateNode.containerInfo, mo = !0, Wu(e, t, a), Br = s, mo = f;
          }
          return;
        }
        case P:
        case Le:
        case Je:
        case je: {
          if (!Vr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var S = v.next, _ = S;
                do {
                  var O = _, x = O.destroy, H = O.tag;
                  x !== void 0 && ((H & Xo) !== Va ? Km(a, t, x) : (H & pr) !== Va && (gs(a), a.mode & Ut ? (tl(), Km(a, t, x), el(a)) : Km(a, t, x), Vd())), _ = _.next;
                } while (_ !== S);
              }
            }
          }
          Wu(e, t, a);
          return;
        }
        case K: {
          if (!Vr) {
            Jf(a, t);
            var Y = a.stateNode;
            typeof Y.componentWillUnmount == "function" && eS(a, t, Y);
          }
          Wu(e, t, a);
          return;
        }
        case _t: {
          Wu(e, t, a);
          return;
        }
        case Fe: {
          if (
            // TODO: Remove this dead flag
            a.mode & mt
          ) {
            var Q = Vr;
            Vr = Q || a.memoizedState !== null, Wu(e, t, a), Vr = Q;
          } else
            Wu(e, t, a);
          break;
        }
        default: {
          Wu(e, t, a);
          return;
        }
      }
    }
    function px(e) {
      e.memoizedState;
    }
    function vx(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var l = i.memoizedState;
          if (l !== null) {
            var s = l.dehydrated;
            s !== null && Z0(s);
          }
        }
      }
    }
    function wR(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new X1()), t.forEach(function(i) {
          var l = cD.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), ea)
              if (Xf !== null && Zf !== null)
                cv(Zf, Xf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(l, l);
          }
        });
      }
    }
    function hx(e, t, a) {
      Xf = a, Zf = e, Kt(t), xR(t, e), Kt(t), Xf = null, Zf = null;
    }
    function yo(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var l = 0; l < i.length; l++) {
          var s = i[l];
          try {
            dx(e, t, s);
          } catch (v) {
            dn(s, t, v);
          }
        }
      var f = bo();
      if (t.subtreeFlags & zo)
        for (var p = t.child; p !== null; )
          Kt(p), xR(p, e), p = p.sibling;
      Kt(f);
    }
    function xR(e, t, a) {
      var i = e.alternate, l = e.flags;
      switch (e.tag) {
        case P:
        case Le:
        case Je:
        case je: {
          if (yo(t, e), nl(e), l & Tt) {
            try {
              ho(Xo | dr, e, e.return), $u(Xo | dr, e);
            } catch (Xe) {
              dn(e, e.return, Xe);
            }
            if (e.mode & Ut) {
              try {
                tl(), ho(pr | dr, e, e.return);
              } catch (Xe) {
                dn(e, e.return, Xe);
              }
              el(e);
            } else
              try {
                ho(pr | dr, e, e.return);
              } catch (Xe) {
                dn(e, e.return, Xe);
              }
          }
          return;
        }
        case K: {
          yo(t, e), nl(e), l & Tn && i !== null && Jf(i, i.return);
          return;
        }
        case N: {
          yo(t, e), nl(e), l & Tn && i !== null && Jf(i, i.return);
          {
            if (e.flags & Na) {
              var s = e.stateNode;
              try {
                w_(s);
              } catch (Xe) {
                dn(e, e.return, Xe);
              }
            }
            if (l & Tt) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, S = e.type, _ = e.updateQueue;
                if (e.updateQueue = null, _ !== null)
                  try {
                    b0(f, _, S, v, p, e);
                  } catch (Xe) {
                    dn(e, e.return, Xe);
                  }
              }
            }
          }
          return;
        }
        case X: {
          if (yo(t, e), nl(e), l & Tt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var O = e.stateNode, x = e.memoizedProps, H = i !== null ? i.memoizedProps : x;
            try {
              w0(O, H, x);
            } catch (Xe) {
              dn(e, e.return, Xe);
            }
          }
          return;
        }
        case F: {
          if (yo(t, e), nl(e), l & Tt && i !== null) {
            var Y = i.memoizedState;
            if (Y.isDehydrated)
              try {
                X0(t.containerInfo);
              } catch (Xe) {
                dn(e, e.return, Xe);
              }
          }
          return;
        }
        case W: {
          yo(t, e), nl(e);
          return;
        }
        case Oe: {
          yo(t, e), nl(e);
          var Q = e.child;
          if (Q.flags & zn) {
            var ge = Q.stateNode, Be = Q.memoizedState, Ue = Be !== null;
            if (ge.isHidden = Ue, Ue) {
              var bt = Q.alternate !== null && Q.alternate.memoizedState !== null;
              bt || qx();
            }
          }
          if (l & Tt) {
            try {
              px(e);
            } catch (Xe) {
              dn(e, e.return, Xe);
            }
            wR(e);
          }
          return;
        }
        case Fe: {
          var Et = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & mt
          ) {
            var z = Vr;
            Vr = z || Et, yo(t, e), Vr = z;
          } else
            yo(t, e);
          if (nl(e), l & zn) {
            var q = e.stateNode, U = e.memoizedState, le = U !== null, Te = e;
            if (q.isHidden = le, le && !Et && (Te.mode & mt) !== Ie) {
              xe = Te;
              for (var Ee = Te.child; Ee !== null; )
                xe = Ee, yx(Ee), Ee = Ee.sibling;
            }
            ux(Te, le);
          }
          return;
        }
        case Mt: {
          yo(t, e), nl(e), l & Tt && wR(e);
          return;
        }
        case _t:
          return;
        default: {
          yo(t, e), nl(e);
          return;
        }
      }
    }
    function nl(e) {
      var t = e.flags;
      if (t & yn) {
        try {
          fx(e);
        } catch (a) {
          dn(e, e.return, a);
        }
        e.flags &= ~yn;
      }
      t & Xr && (e.flags &= ~Xr);
    }
    function mx(e, t, a) {
      Xf = a, Zf = t, xe = e, DR(e, t, a), Xf = null, Zf = null;
    }
    function DR(e, t, a) {
      for (var i = (e.mode & mt) !== Ie; xe !== null; ) {
        var l = xe, s = l.child;
        if (l.tag === Fe && i) {
          var f = l.memoizedState !== null, p = f || qm;
          if (p) {
            rS(e, t, a);
            continue;
          } else {
            var v = l.alternate, S = v !== null && v.memoizedState !== null, _ = S || Vr, O = qm, x = Vr;
            qm = p, Vr = _, Vr && !x && (xe = l, gx(l));
            for (var H = s; H !== null; )
              xe = H, DR(
                H,
                // New root; bubble back up to here and stop.
                t,
                a
              ), H = H.sibling;
            xe = l, qm = O, Vr = x, rS(e, t, a);
            continue;
          }
        }
        (l.subtreeFlags & Uo) !== He && s !== null ? (s.return = l, xe = s) : rS(e, t, a);
      }
    }
    function rS(e, t, a) {
      for (; xe !== null; ) {
        var i = xe;
        if ((i.flags & Uo) !== He) {
          var l = i.alternate;
          Kt(i);
          try {
            ox(t, l, i, a);
          } catch (f) {
            dn(i, i.return, f);
          }
          fn();
        }
        if (i === e) {
          xe = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, xe = s;
          return;
        }
        xe = i.return;
      }
    }
    function yx(e) {
      for (; xe !== null; ) {
        var t = xe, a = t.child;
        switch (t.tag) {
          case P:
          case Le:
          case Je:
          case je: {
            if (t.mode & Ut)
              try {
                tl(), ho(pr, t, t.return);
              } finally {
                el(t);
              }
            else
              ho(pr, t, t.return);
            break;
          }
          case K: {
            Jf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && eS(t, t.return, i);
            break;
          }
          case N: {
            Jf(t, t.return);
            break;
          }
          case Fe: {
            var l = t.memoizedState !== null;
            if (l) {
              OR(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, xe = a) : OR(e);
      }
    }
    function OR(e) {
      for (; xe !== null; ) {
        var t = xe;
        if (t === e) {
          xe = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, xe = a;
          return;
        }
        xe = t.return;
      }
    }
    function gx(e) {
      for (; xe !== null; ) {
        var t = xe, a = t.child;
        if (t.tag === Fe) {
          var i = t.memoizedState !== null;
          if (i) {
            kR(e);
            continue;
          }
        }
        a !== null ? (a.return = t, xe = a) : kR(e);
      }
    }
    function kR(e) {
      for (; xe !== null; ) {
        var t = xe;
        Kt(t);
        try {
          lx(t);
        } catch (i) {
          dn(t, t.return, i);
        }
        if (fn(), t === e) {
          xe = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, xe = a;
          return;
        }
        xe = t.return;
      }
    }
    function Ex(e, t, a, i) {
      xe = t, Sx(t, e, a, i);
    }
    function Sx(e, t, a, i) {
      for (; xe !== null; ) {
        var l = xe, s = l.child;
        (l.subtreeFlags & Ji) !== He && s !== null ? (s.return = l, xe = s) : _x(e, t, a, i);
      }
    }
    function _x(e, t, a, i) {
      for (; xe !== null; ) {
        var l = xe;
        if ((l.flags & Kr) !== He) {
          Kt(l);
          try {
            Tx(t, l, a, i);
          } catch (f) {
            dn(l, l.return, f);
          }
          fn();
        }
        if (l === e) {
          xe = null;
          return;
        }
        var s = l.sibling;
        if (s !== null) {
          s.return = l.return, xe = s;
          return;
        }
        xe = l.return;
      }
    }
    function Tx(e, t, a, i) {
      switch (t.tag) {
        case P:
        case Le:
        case je: {
          if (t.mode & Ut) {
            TE();
            try {
              $u(Hr | dr, t);
            } finally {
              _E(t);
            }
          } else
            $u(Hr | dr, t);
          break;
        }
      }
    }
    function Rx(e) {
      xe = e, Cx();
    }
    function Cx() {
      for (; xe !== null; ) {
        var e = xe, t = e.child;
        if ((xe.flags & Ma) !== He) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var l = a[i];
              xe = l, xx(l, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            xe = e;
          }
        }
        (e.subtreeFlags & Ji) !== He && t !== null ? (t.return = e, xe = t) : bx();
      }
    }
    function bx() {
      for (; xe !== null; ) {
        var e = xe;
        (e.flags & Kr) !== He && (Kt(e), wx(e), fn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, xe = t;
          return;
        }
        xe = e.return;
      }
    }
    function wx(e) {
      switch (e.tag) {
        case P:
        case Le:
        case je: {
          e.mode & Ut ? (TE(), ho(Hr | dr, e, e.return), _E(e)) : ho(Hr | dr, e, e.return);
          break;
        }
      }
    }
    function xx(e, t) {
      for (; xe !== null; ) {
        var a = xe;
        Kt(a), Ox(a, t), fn();
        var i = a.child;
        i !== null ? (i.return = a, xe = i) : Dx(e);
      }
    }
    function Dx(e) {
      for (; xe !== null; ) {
        var t = xe, a = t.sibling, i = t.return;
        if (TR(t), t === e) {
          xe = null;
          return;
        }
        if (a !== null) {
          a.return = i, xe = a;
          return;
        }
        xe = i;
      }
    }
    function Ox(e, t) {
      switch (e.tag) {
        case P:
        case Le:
        case je: {
          e.mode & Ut ? (TE(), ho(Hr, e, t), _E(e)) : ho(Hr, e, t);
          break;
        }
      }
    }
    function kx(e) {
      switch (e.tag) {
        case P:
        case Le:
        case je: {
          try {
            $u(pr | dr, e);
          } catch (a) {
            dn(e, e.return, a);
          }
          break;
        }
        case K: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            dn(e, e.return, a);
          }
          break;
        }
      }
    }
    function Mx(e) {
      switch (e.tag) {
        case P:
        case Le:
        case je: {
          try {
            $u(Hr | dr, e);
          } catch (t) {
            dn(e, e.return, t);
          }
          break;
        }
      }
    }
    function Nx(e) {
      switch (e.tag) {
        case P:
        case Le:
        case je: {
          try {
            ho(pr | dr, e, e.return);
          } catch (a) {
            dn(e, e.return, a);
          }
          break;
        }
        case K: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && eS(e, e.return, t);
          break;
        }
      }
    }
    function Lx(e) {
      switch (e.tag) {
        case P:
        case Le:
        case je:
          try {
            ho(Hr | dr, e, e.return);
          } catch (t) {
            dn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Jp = Symbol.for;
      Jp("selector.component"), Jp("selector.has_pseudo_class"), Jp("selector.role"), Jp("selector.test_id"), Jp("selector.text");
    }
    var Ax = [];
    function zx() {
      Ax.forEach(function(e) {
        return e();
      });
    }
    var Ux = E.ReactCurrentActQueue;
    function Px(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function MR() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && Ux.current !== null && g("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var jx = Math.ceil, aS = E.ReactCurrentDispatcher, iS = E.ReactCurrentOwner, Yr = E.ReactCurrentBatchConfig, go = E.ReactCurrentActQueue, mr = (
      /*             */
      0
    ), NR = (
      /*               */
      1
    ), $r = (
      /*                */
      2
    ), Hi = (
      /*                */
      4
    ), Ql = 0, ev = 1, sc = 2, Xm = 3, tv = 4, LR = 5, oS = 6, Ct = mr, Ta = null, Mn = null, yr = ne, rl = ne, lS = Uu(ne), gr = Ql, nv = null, Zm = ne, rv = ne, Jm = ne, av = null, Ba = null, uS = 0, AR = 500, zR = 1 / 0, Fx = 500, ql = null;
    function iv() {
      zR = Qn() + Fx;
    }
    function UR() {
      return zR;
    }
    var ey = !1, sS = null, ed = null, cc = !1, Gu = null, ov = ne, cS = [], fS = null, Hx = 50, lv = 0, dS = null, pS = !1, ty = !1, Ix = 50, td = 0, ny = null, uv = nn, ry = ne, PR = !1;
    function ay() {
      return Ta;
    }
    function Ra() {
      return (Ct & ($r | Hi)) !== mr ? Qn() : (uv !== nn || (uv = Qn()), uv);
    }
    function Qu(e) {
      var t = e.mode;
      if ((t & mt) === Ie)
        return qe;
      if ((Ct & $r) !== mr && yr !== ne)
        return Ms(yr);
      var a = Uw() !== zw;
      if (a) {
        if (Yr.transition !== null) {
          var i = Yr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return ry === Lt && (ry = Kd()), ry;
      }
      var l = ja();
      if (l !== Lt)
        return l;
      var s = S0();
      return s;
    }
    function Vx(e) {
      var t = e.mode;
      return (t & mt) === Ie ? qe : uh();
    }
    function Er(e, t, a, i) {
      dD(), PR && g("useInsertionEffect must not schedule updates."), pS && (ty = !0), bu(e, a, i), (Ct & $r) !== ne && e === Ta ? hD(t) : (ea && As(e, t, a), mD(t), e === Ta && ((Ct & $r) === mr && (rv = ot(rv, a)), gr === tv && qu(e, yr)), Ya(e, i), a === qe && Ct === mr && (t.mode & mt) === Ie && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !go.isBatchingLegacy && (iv(), P_()));
    }
    function Bx(e, t, a) {
      var i = e.current;
      i.lanes = t, bu(e, t, a), Ya(e, a);
    }
    function Yx(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Ct & $r) !== mr
      );
    }
    function Ya(e, t) {
      var a = e.callbackNode;
      cf(e, t);
      var i = sf(e, e === Ta ? yr : ne);
      if (i === ne) {
        a !== null && JR(a), e.callbackNode = null, e.callbackPriority = Lt;
        return;
      }
      var l = Io(i), s = e.callbackPriority;
      if (s === l && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(go.current !== null && a !== SS)) {
        a == null && s !== qe && g("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && JR(a);
      var f;
      if (l === qe)
        e.tag === Pu ? (go.isBatchingLegacy !== null && (go.didScheduleLegacyUpdate = !0), gw(HR.bind(null, e))) : U_(HR.bind(null, e)), go.current !== null ? go.current.push(ju) : T0(function() {
          (Ct & ($r | Hi)) === mr && ju();
        }), f = null;
      else {
        var p;
        switch (hh(i)) {
          case Ar:
            p = ys;
            break;
          case ki:
            p = Po;
            break;
          case Ua:
            p = eo;
            break;
          case Pa:
            p = Tl;
            break;
          default:
            p = eo;
            break;
        }
        f = _S(p, jR.bind(null, e));
      }
      e.callbackPriority = l, e.callbackNode = f;
    }
    function jR(e, t) {
      if (u1(), uv = nn, ry = ne, (Ct & ($r | Hi)) !== mr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Xl();
      if (i && e.callbackNode !== a)
        return null;
      var l = sf(e, e === Ta ? yr : ne);
      if (l === ne)
        return null;
      var s = !df(e, l) && !lh(e, l) && !t, f = s ? eD(e, l) : oy(e, l);
      if (f !== Ql) {
        if (f === sc) {
          var p = ff(e);
          p !== ne && (l = p, f = vS(e, p));
        }
        if (f === ev) {
          var v = nv;
          throw fc(e, ne), qu(e, l), Ya(e, Qn()), v;
        }
        if (f === oS)
          qu(e, l);
        else {
          var S = !df(e, l), _ = e.current.alternate;
          if (S && !Wx(_)) {
            if (f = oy(e, l), f === sc) {
              var O = ff(e);
              O !== ne && (l = O, f = vS(e, O));
            }
            if (f === ev) {
              var x = nv;
              throw fc(e, ne), qu(e, l), Ya(e, Qn()), x;
            }
          }
          e.finishedWork = _, e.finishedLanes = l, $x(e, f, l);
        }
      }
      return Ya(e, Qn()), e.callbackNode === a ? jR.bind(null, e) : null;
    }
    function vS(e, t) {
      var a = av;
      if (hf(e)) {
        var i = fc(e, t);
        i.flags |= Rr, fw(e.containerInfo);
      }
      var l = oy(e, t);
      if (l !== sc) {
        var s = Ba;
        Ba = a, s !== null && FR(s);
      }
      return l;
    }
    function FR(e) {
      Ba === null ? Ba = e : Ba.push.apply(Ba, e);
    }
    function $x(e, t, a) {
      switch (t) {
        case Ql:
        case ev:
          throw new Error("Root did not complete. This is a bug in React.");
        case sc: {
          dc(e, Ba, ql);
          break;
        }
        case Xm: {
          if (qu(e, a), Ll(a) && // do not delay if we're inside an act() scope
          !eC()) {
            var i = uS + AR - Qn();
            if (i > 10) {
              var l = sf(e, ne);
              if (l !== ne)
                break;
              var s = e.suspendedLanes;
              if (!Al(s, a)) {
                Ra(), pf(e, s);
                break;
              }
              e.timeoutHandle = fg(dc.bind(null, e, Ba, ql), i);
              break;
            }
          }
          dc(e, Ba, ql);
          break;
        }
        case tv: {
          if (qu(e, a), Qd(a))
            break;
          if (!eC()) {
            var f = li(e, a), p = f, v = Qn() - p, S = fD(v) - v;
            if (S > 10) {
              e.timeoutHandle = fg(dc.bind(null, e, Ba, ql), S);
              break;
            }
          }
          dc(e, Ba, ql);
          break;
        }
        case LR: {
          dc(e, Ba, ql);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function Wx(e) {
      for (var t = e; ; ) {
        if (t.flags & Su) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var l = 0; l < i.length; l++) {
                var s = i[l], f = s.getSnapshot, p = s.value;
                try {
                  if (!ie(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & Su && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function qu(e, t) {
      t = Ns(t, Jm), t = Ns(t, rv), fh(e, t);
    }
    function HR(e) {
      if (s1(), (Ct & ($r | Hi)) !== mr)
        throw new Error("Should not already be working.");
      Xl();
      var t = sf(e, ne);
      if (!na(t, qe))
        return Ya(e, Qn()), null;
      var a = oy(e, t);
      if (e.tag !== Pu && a === sc) {
        var i = ff(e);
        i !== ne && (t = i, a = vS(e, i));
      }
      if (a === ev) {
        var l = nv;
        throw fc(e, ne), qu(e, t), Ya(e, Qn()), l;
      }
      if (a === oS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, dc(e, Ba, ql), Ya(e, Qn()), null;
    }
    function Gx(e, t) {
      t !== ne && (vf(e, ot(t, qe)), Ya(e, Qn()), (Ct & ($r | Hi)) === mr && (iv(), ju()));
    }
    function hS(e, t) {
      var a = Ct;
      Ct |= NR;
      try {
        return e(t);
      } finally {
        Ct = a, Ct === mr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !go.isBatchingLegacy && (iv(), P_());
      }
    }
    function Qx(e, t, a, i, l) {
      var s = ja(), f = Yr.transition;
      try {
        return Yr.transition = null, Fn(Ar), e(t, a, i, l);
      } finally {
        Fn(s), Yr.transition = f, Ct === mr && iv();
      }
    }
    function Kl(e) {
      Gu !== null && Gu.tag === Pu && (Ct & ($r | Hi)) === mr && Xl();
      var t = Ct;
      Ct |= NR;
      var a = Yr.transition, i = ja();
      try {
        return Yr.transition = null, Fn(Ar), e ? e() : void 0;
      } finally {
        Fn(i), Yr.transition = a, Ct = t, (Ct & ($r | Hi)) === mr && ju();
      }
    }
    function IR() {
      return (Ct & ($r | Hi)) !== mr;
    }
    function iy(e, t) {
      la(lS, rl, e), rl = ot(rl, t);
    }
    function mS(e) {
      rl = lS.current, oa(lS, e);
    }
    function fc(e, t) {
      e.finishedWork = null, e.finishedLanes = ne;
      var a = e.timeoutHandle;
      if (a !== dg && (e.timeoutHandle = dg, _0(a)), Mn !== null)
        for (var i = Mn.return; i !== null; ) {
          var l = i.alternate;
          mR(l, i), i = i.return;
        }
      Ta = e;
      var s = pc(e.current, null);
      return Mn = s, yr = rl = t, gr = Ql, nv = null, Zm = ne, rv = ne, Jm = ne, av = null, Ba = null, Bw(), so.discardPendingWarnings(), s;
    }
    function VR(e, t) {
      do {
        var a = Mn;
        try {
          if (hm(), dT(), fn(), iS.current = null, a === null || a.return === null) {
            gr = ev, nv = t, Mn = null;
            return;
          }
          if (Qe && a.mode & Ut && Ym(a, !0), Ke)
            if (ga(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              Oi(a, i, yr);
            } else
              Es(a, t, yr);
          g1(e, a.return, a, t, yr), WR(a);
        } catch (l) {
          t = l, Mn === a && a !== null ? (a = a.return, Mn = a) : a = Mn;
          continue;
        }
        return;
      } while (!0);
    }
    function BR() {
      var e = aS.current;
      return aS.current = Fm, e === null ? Fm : e;
    }
    function YR(e) {
      aS.current = e;
    }
    function qx() {
      uS = Qn();
    }
    function sv(e) {
      Zm = ot(e, Zm);
    }
    function Kx() {
      gr === Ql && (gr = Xm);
    }
    function yS() {
      (gr === Ql || gr === Xm || gr === sc) && (gr = tv), Ta !== null && (ks(Zm) || ks(rv)) && qu(Ta, yr);
    }
    function Xx(e) {
      gr !== tv && (gr = sc), av === null ? av = [e] : av.push(e);
    }
    function Zx() {
      return gr === Ql;
    }
    function oy(e, t) {
      var a = Ct;
      Ct |= $r;
      var i = BR();
      if (Ta !== e || yr !== t) {
        if (ea) {
          var l = e.memoizedUpdaters;
          l.size > 0 && (cv(e, yr), l.clear()), dh(e, t);
        }
        ql = ep(), fc(e, t);
      }
      wl(t);
      do
        try {
          Jx();
          break;
        } catch (s) {
          VR(e, s);
        }
      while (!0);
      if (hm(), Ct = a, YR(i), Mn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Yc(), Ta = null, yr = ne, gr;
    }
    function Jx() {
      for (; Mn !== null; )
        $R(Mn);
    }
    function eD(e, t) {
      var a = Ct;
      Ct |= $r;
      var i = BR();
      if (Ta !== e || yr !== t) {
        if (ea) {
          var l = e.memoizedUpdaters;
          l.size > 0 && (cv(e, yr), l.clear()), dh(e, t);
        }
        ql = ep(), iv(), fc(e, t);
      }
      wl(t);
      do
        try {
          tD();
          break;
        } catch (s) {
          VR(e, s);
        }
      while (!0);
      return hm(), YR(i), Ct = a, Mn !== null ? (rh(), Ql) : (Yc(), Ta = null, yr = ne, gr);
    }
    function tD() {
      for (; Mn !== null && !Ld(); )
        $R(Mn);
    }
    function $R(e) {
      var t = e.alternate;
      Kt(e);
      var a;
      (e.mode & Ut) !== Ie ? (SE(e), a = gS(t, e, rl), Ym(e, !0)) : a = gS(t, e, rl), fn(), e.memoizedProps = e.pendingProps, a === null ? WR(e) : Mn = a, iS.current = null;
    }
    function WR(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & ms) === He) {
          Kt(t);
          var l = void 0;
          if ((t.mode & Ut) === Ie ? l = hR(a, t, rl) : (SE(t), l = hR(a, t, rl), Ym(t, !1)), fn(), l !== null) {
            Mn = l;
            return;
          }
        } else {
          var s = K1(a, t);
          if (s !== null) {
            s.flags &= Xv, Mn = s;
            return;
          }
          if ((t.mode & Ut) !== Ie) {
            Ym(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= ms, i.subtreeFlags = He, i.deletions = null;
          else {
            gr = oS, Mn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          Mn = v;
          return;
        }
        t = i, Mn = t;
      } while (t !== null);
      gr === Ql && (gr = LR);
    }
    function dc(e, t, a) {
      var i = ja(), l = Yr.transition;
      try {
        Yr.transition = null, Fn(Ar), nD(e, t, a, i);
      } finally {
        Yr.transition = l, Fn(i);
      }
      return null;
    }
    function nD(e, t, a, i) {
      do
        Xl();
      while (Gu !== null);
      if (pD(), (Ct & ($r | Hi)) !== mr)
        throw new Error("Should not already be working.");
      var l = e.finishedWork, s = e.finishedLanes;
      if (Fd(s), l === null)
        return Hd(), null;
      if (s === ne && g("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = ne, l === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Lt;
      var f = ot(l.lanes, l.childLanes);
      Zd(e, f), e === Ta && (Ta = null, Mn = null, yr = ne), ((l.subtreeFlags & Ji) !== He || (l.flags & Ji) !== He) && (cc || (cc = !0, fS = a, _S(eo, function() {
        return Xl(), null;
      })));
      var p = (l.subtreeFlags & (Ao | zo | Uo | Ji)) !== He, v = (l.flags & (Ao | zo | Uo | Ji)) !== He;
      if (p || v) {
        var S = Yr.transition;
        Yr.transition = null;
        var _ = ja();
        Fn(Ar);
        var O = Ct;
        Ct |= Hi, iS.current = null, tx(e, l), PT(), hx(e, l, s), v0(e.containerInfo), e.current = l, Ss(s), mx(l, e, s), _s(), Ad(), Ct = O, Fn(_), Yr.transition = S;
      } else
        e.current = l, PT();
      var x = cc;
      if (cc ? (cc = !1, Gu = e, ov = s) : (td = 0, ny = null), f = e.pendingLanes, f === ne && (ed = null), x || KR(e.current, !1), Ud(l.stateNode, i), ea && e.memoizedUpdaters.clear(), zx(), Ya(e, Qn()), t !== null)
        for (var H = e.onRecoverableError, Y = 0; Y < t.length; Y++) {
          var Q = t[Y], ge = Q.stack, Be = Q.digest;
          H(Q.value, {
            componentStack: ge,
            digest: Be
          });
        }
      if (ey) {
        ey = !1;
        var Ue = sS;
        throw sS = null, Ue;
      }
      return na(ov, qe) && e.tag !== Pu && Xl(), f = e.pendingLanes, na(f, qe) ? (l1(), e === dS ? lv++ : (lv = 0, dS = e)) : lv = 0, ju(), Hd(), null;
    }
    function Xl() {
      if (Gu !== null) {
        var e = hh(ov), t = Us(Ua, e), a = Yr.transition, i = ja();
        try {
          return Yr.transition = null, Fn(t), aD();
        } finally {
          Fn(i), Yr.transition = a;
        }
      }
      return !1;
    }
    function rD(e) {
      cS.push(e), cc || (cc = !0, _S(eo, function() {
        return Xl(), null;
      }));
    }
    function aD() {
      if (Gu === null)
        return !1;
      var e = fS;
      fS = null;
      var t = Gu, a = ov;
      if (Gu = null, ov = ne, (Ct & ($r | Hi)) !== mr)
        throw new Error("Cannot flush passive effects while already rendering.");
      pS = !0, ty = !1, bl(a);
      var i = Ct;
      Ct |= Hi, Rx(t.current), Ex(t, t.current, a, e);
      {
        var l = cS;
        cS = [];
        for (var s = 0; s < l.length; s++) {
          var f = l[s];
          ix(t, f);
        }
      }
      Bd(), KR(t.current, !0), Ct = i, ju(), ty ? t === ny ? td++ : (td = 0, ny = t) : td = 0, pS = !1, ty = !1, Pd(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function GR(e) {
      return ed !== null && ed.has(e);
    }
    function iD(e) {
      ed === null ? ed = /* @__PURE__ */ new Set([e]) : ed.add(e);
    }
    function oD(e) {
      ey || (ey = !0, sS = e);
    }
    var lD = oD;
    function QR(e, t, a) {
      var i = lc(a, t), l = $T(e, i, qe), s = Hu(e, l, qe), f = Ra();
      s !== null && (bu(s, qe, f), Ya(s, f));
    }
    function dn(e, t, a) {
      if (Z1(a), fv(!1), e.tag === F) {
        QR(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === F) {
          QR(i, e, a);
          return;
        } else if (i.tag === K) {
          var l = i.type, s = i.stateNode;
          if (typeof l.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !GR(s)) {
            var f = lc(a, e), p = jE(i, f, qe), v = Hu(i, p, qe), S = Ra();
            v !== null && (bu(v, qe, S), Ya(v, S));
            return;
          }
        }
        i = i.return;
      }
      g(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function uD(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var l = Ra();
      pf(e, a), yD(e), Ta === e && Al(yr, a) && (gr === tv || gr === Xm && Ll(yr) && Qn() - uS < AR ? fc(e, ne) : Jm = ot(Jm, a)), Ya(e, l);
    }
    function qR(e, t) {
      t === Lt && (t = Vx(e));
      var a = Ra(), i = Ia(e, t);
      i !== null && (bu(i, t, a), Ya(i, a));
    }
    function sD(e) {
      var t = e.memoizedState, a = Lt;
      t !== null && (a = t.retryLane), qR(e, a);
    }
    function cD(e, t) {
      var a = Lt, i;
      switch (e.tag) {
        case Oe:
          i = e.stateNode;
          var l = e.memoizedState;
          l !== null && (a = l.retryLane);
          break;
        case Mt:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), qR(e, a);
    }
    function fD(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : jx(e / 1960) * 1960;
    }
    function dD() {
      if (lv > Hx)
        throw lv = 0, dS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      td > Ix && (td = 0, ny = null, g("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function pD() {
      so.flushLegacyContextWarning(), so.flushPendingUnsafeLifecycleWarnings();
    }
    function KR(e, t) {
      Kt(e), ly(e, Lo, Nx), t && ly(e, wi, Lx), ly(e, Lo, kx), t && ly(e, wi, Mx), fn();
    }
    function ly(e, t, a) {
      for (var i = e, l = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== l && i.child !== null && s !== He ? i = i.child : ((i.flags & t) !== He && a(i), i.sibling !== null ? i = i.sibling : i = l = i.return);
      }
    }
    var uy = null;
    function XR(e) {
      {
        if ((Ct & $r) !== mr || !(e.mode & mt))
          return;
        var t = e.tag;
        if (t !== B && t !== F && t !== K && t !== P && t !== Le && t !== Je && t !== je)
          return;
        var a = et(e) || "ReactComponent";
        if (uy !== null) {
          if (uy.has(a))
            return;
          uy.add(a);
        } else
          uy = /* @__PURE__ */ new Set([a]);
        var i = lr;
        try {
          Kt(e), g("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? Kt(e) : fn();
        }
      }
    }
    var gS;
    {
      var vD = null;
      gS = function(e, t, a) {
        var i = iC(vD, t);
        try {
          return cR(e, t, a);
        } catch (s) {
          if (ww() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (hm(), dT(), mR(e, t), iC(t, i), t.mode & Ut && SE(t), No(null, cR, null, e, t, a), Xi()) {
            var l = hs();
            typeof l == "object" && l !== null && l._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var ZR = !1, ES;
    ES = /* @__PURE__ */ new Set();
    function hD(e) {
      if (Ei && !a1())
        switch (e.tag) {
          case P:
          case Le:
          case je: {
            var t = Mn && et(Mn) || "Unknown", a = t;
            if (!ES.has(a)) {
              ES.add(a);
              var i = et(e) || "Unknown";
              g("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case K: {
            ZR || (g("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), ZR = !0);
            break;
          }
        }
    }
    function cv(e, t) {
      if (ea) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          As(e, i, t);
        });
      }
    }
    var SS = {};
    function _S(e, t) {
      {
        var a = go.current;
        return a !== null ? (a.push(t), SS) : Nd(e, t);
      }
    }
    function JR(e) {
      if (e !== SS)
        return Jv(e);
    }
    function eC() {
      return go.current !== null;
    }
    function mD(e) {
      {
        if (e.mode & mt) {
          if (!MR())
            return;
        } else if (!Px() || Ct !== mr || e.tag !== P && e.tag !== Le && e.tag !== je)
          return;
        if (go.current === null) {
          var t = lr;
          try {
            Kt(e), g(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, et(e));
          } finally {
            t ? Kt(e) : fn();
          }
        }
      }
    }
    function yD(e) {
      e.tag !== Pu && MR() && go.current === null && g(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function fv(e) {
      PR = e;
    }
    var Ii = null, nd = null, gD = function(e) {
      Ii = e;
    };
    function rd(e) {
      {
        if (Ii === null)
          return e;
        var t = Ii(e);
        return t === void 0 ? e : t.current;
      }
    }
    function TS(e) {
      return rd(e);
    }
    function RS(e) {
      {
        if (Ii === null)
          return e;
        var t = Ii(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = rd(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: te,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function tC(e, t) {
      {
        if (Ii === null)
          return !1;
        var a = e.elementType, i = t.type, l = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case K: {
            typeof i == "function" && (l = !0);
            break;
          }
          case P: {
            (typeof i == "function" || s === tt) && (l = !0);
            break;
          }
          case Le: {
            (s === te || s === tt) && (l = !0);
            break;
          }
          case Je:
          case je: {
            (s === at || s === tt) && (l = !0);
            break;
          }
          default:
            return !1;
        }
        if (l) {
          var f = Ii(a);
          if (f !== void 0 && f === Ii(i))
            return !0;
        }
        return !1;
      }
    }
    function nC(e) {
      {
        if (Ii === null || typeof WeakSet != "function")
          return;
        nd === null && (nd = /* @__PURE__ */ new WeakSet()), nd.add(e);
      }
    }
    var ED = function(e, t) {
      {
        if (Ii === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Xl(), Kl(function() {
          CS(e.current, i, a);
        });
      }
    }, SD = function(e, t) {
      {
        if (e.context !== ci)
          return;
        Xl(), Kl(function() {
          dv(t, e, null, null);
        });
      }
    };
    function CS(e, t, a) {
      {
        var i = e.alternate, l = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case P:
          case je:
          case K:
            v = p;
            break;
          case Le:
            v = p.render;
            break;
        }
        if (Ii === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var S = !1, _ = !1;
        if (v !== null) {
          var O = Ii(v);
          O !== void 0 && (a.has(O) ? _ = !0 : t.has(O) && (f === K ? _ = !0 : S = !0));
        }
        if (nd !== null && (nd.has(e) || i !== null && nd.has(i)) && (_ = !0), _ && (e._debugNeedsRemount = !0), _ || S) {
          var x = Ia(e, qe);
          x !== null && Er(x, e, qe, nn);
        }
        l !== null && !_ && CS(l, t, a), s !== null && CS(s, t, a);
      }
    }
    var _D = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(l) {
          return l.current;
        }));
        return bS(e.current, i, a), a;
      }
    };
    function bS(e, t, a) {
      {
        var i = e.child, l = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case P:
          case je:
          case K:
            p = f;
            break;
          case Le:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? TD(e, a) : i !== null && bS(i, t, a), l !== null && bS(l, t, a);
      }
    }
    function TD(e, t) {
      {
        var a = RD(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case N:
              t.add(i.stateNode);
              return;
            case W:
              t.add(i.stateNode.containerInfo);
              return;
            case F:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function RD(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === N)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var wS;
    {
      wS = !1;
      try {
        var rC = Object.preventExtensions({});
      } catch {
        wS = !0;
      }
    }
    function CD(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = He, this.subtreeFlags = He, this.deletions = null, this.lanes = ne, this.childLanes = ne, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !wS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var fi = function(e, t, a, i) {
      return new CD(e, t, a, i);
    };
    function xS(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function bD(e) {
      return typeof e == "function" && !xS(e) && e.defaultProps === void 0;
    }
    function wD(e) {
      if (typeof e == "function")
        return xS(e) ? K : P;
      if (e != null) {
        var t = e.$$typeof;
        if (t === te)
          return Le;
        if (t === at)
          return Je;
      }
      return B;
    }
    function pc(e, t) {
      var a = e.alternate;
      a === null ? (a = fi(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = He, a.subtreeFlags = He, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Un, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case B:
        case P:
        case je:
          a.type = rd(e.type);
          break;
        case K:
          a.type = TS(e.type);
          break;
        case Le:
          a.type = RS(e.type);
          break;
      }
      return a;
    }
    function xD(e, t) {
      e.flags &= Un | yn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = ne, e.lanes = t, e.child = null, e.subtreeFlags = He, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = He, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function DD(e, t, a) {
      var i;
      return e === im ? (i = mt, t === !0 && (i |= Jt, i |= Pt)) : i = Ie, ea && (i |= Ut), fi(F, null, null, i);
    }
    function DS(e, t, a, i, l, s) {
      var f = B, p = e;
      if (typeof e == "function")
        xS(e) ? (f = K, p = TS(p)) : p = rd(p);
      else if (typeof e == "string")
        f = N;
      else
        e: switch (e) {
          case hi:
            return Ku(a.children, l, s, t);
          case Ka:
            f = he, l |= Jt, (l & mt) !== Ie && (l |= Pt);
            break;
          case mi:
            return OD(a, l, s, t);
          case me:
            return kD(a, l, s, t);
          case Ce:
            return MD(a, l, s, t);
          case bn:
            return aC(a, l, s, t);
          case on:
          case yt:
          case cn:
          case or:
          case ht:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case yi:
                  f = De;
                  break e;
                case b:
                  f = Me;
                  break e;
                case te:
                  f = Le, p = RS(p);
                  break e;
                case at:
                  f = Je;
                  break e;
                case tt:
                  f = wt, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var S = i ? et(i) : null;
              S && (v += `

Check the render method of \`` + S + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var _ = fi(f, a, t, l);
      return _.elementType = e, _.type = p, _.lanes = s, _._debugOwner = i, _;
    }
    function OS(e, t, a) {
      var i = null;
      i = e._owner;
      var l = e.type, s = e.key, f = e.props, p = DS(l, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function Ku(e, t, a, i) {
      var l = fi(fe, e, i, t);
      return l.lanes = a, l;
    }
    function OD(e, t, a, i) {
      typeof e.id != "string" && g('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var l = fi(Ye, e, i, t | Ut);
      return l.elementType = mi, l.lanes = a, l.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, l;
    }
    function kD(e, t, a, i) {
      var l = fi(Oe, e, i, t);
      return l.elementType = me, l.lanes = a, l;
    }
    function MD(e, t, a, i) {
      var l = fi(Mt, e, i, t);
      return l.elementType = Ce, l.lanes = a, l;
    }
    function aC(e, t, a, i) {
      var l = fi(Fe, e, i, t);
      l.elementType = bn, l.lanes = a;
      var s = {
        isHidden: !1
      };
      return l.stateNode = s, l;
    }
    function kS(e, t, a) {
      var i = fi(X, e, null, t);
      return i.lanes = a, i;
    }
    function ND() {
      var e = fi(N, null, null, Ie);
      return e.elementType = "DELETED", e;
    }
    function LD(e) {
      var t = fi(kt, null, null, Ie);
      return t.stateNode = e, t;
    }
    function MS(e, t, a) {
      var i = e.children !== null ? e.children : [], l = fi(W, i, e.key, t);
      return l.lanes = a, l.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, l;
    }
    function iC(e, t) {
      return e === null && (e = fi(B, null, null, Ie)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function AD(e, t, a, i, l) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = dg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Lt, this.eventTimes = Ls(ne), this.expirationTimes = Ls(nn), this.pendingLanes = ne, this.suspendedLanes = ne, this.pingedLanes = ne, this.expiredLanes = ne, this.mutableReadLanes = ne, this.finishedLanes = ne, this.entangledLanes = ne, this.entanglements = Ls(ne), this.identifierPrefix = i, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < xl; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case im:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Pu:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function oC(e, t, a, i, l, s, f, p, v, S) {
      var _ = new AD(e, t, a, p, v), O = DD(t, s);
      _.current = O, O.stateNode = _;
      {
        var x = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        O.memoizedState = x;
      }
      return Yg(O), _;
    }
    var NS = "18.3.1";
    function zD(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Gr(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: ir,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var LS, AS;
    LS = !1, AS = {};
    function lC(e) {
      if (!e)
        return ci;
      var t = Eu(e), a = yw(t);
      if (t.tag === K) {
        var i = t.type;
        if (Ko(i))
          return A_(t, i, a);
      }
      return a;
    }
    function UD(e, t) {
      {
        var a = Eu(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var l = Zr(a);
        if (l === null)
          return null;
        if (l.mode & Jt) {
          var s = et(a) || "Component";
          if (!AS[s]) {
            AS[s] = !0;
            var f = lr;
            try {
              Kt(l), a.mode & Jt ? g("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : g("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? Kt(f) : fn();
            }
          }
        }
        return l.stateNode;
      }
    }
    function uC(e, t, a, i, l, s, f, p) {
      var v = !1, S = null;
      return oC(e, t, v, S, a, i, l, s, f);
    }
    function sC(e, t, a, i, l, s, f, p, v, S) {
      var _ = !0, O = oC(a, i, _, e, l, s, f, p, v);
      O.context = lC(null);
      var x = O.current, H = Ra(), Y = Qu(x), Q = Wl(H, Y);
      return Q.callback = t ?? null, Hu(x, Q, Y), Bx(O, Y, H), O;
    }
    function dv(e, t, a, i) {
      zd(t, e);
      var l = t.current, s = Ra(), f = Qu(l);
      En(f);
      var p = lC(a);
      t.context === null ? t.context = p : t.pendingContext = p, Ei && lr !== null && !LS && (LS = !0, g(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, et(lr) || "Unknown"));
      var v = Wl(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && g("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var S = Hu(l, v, f);
      return S !== null && (Er(S, l, f, s), Sm(S, l, f)), f;
    }
    function sy(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case N:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function PD(e) {
      switch (e.tag) {
        case F: {
          var t = e.stateNode;
          if (hf(t)) {
            var a = ih(t);
            Gx(t, a);
          }
          break;
        }
        case Oe: {
          Kl(function() {
            var l = Ia(e, qe);
            if (l !== null) {
              var s = Ra();
              Er(l, e, qe, s);
            }
          });
          var i = qe;
          zS(e, i);
          break;
        }
      }
    }
    function cC(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = ch(a.retryLane, t));
    }
    function zS(e, t) {
      cC(e, t);
      var a = e.alternate;
      a && cC(a, t);
    }
    function jD(e) {
      if (e.tag === Oe) {
        var t = xs, a = Ia(e, t);
        if (a !== null) {
          var i = Ra();
          Er(a, e, t, i);
        }
        zS(e, t);
      }
    }
    function FD(e) {
      if (e.tag === Oe) {
        var t = Qu(e), a = Ia(e, t);
        if (a !== null) {
          var i = Ra();
          Er(a, e, t, i);
        }
        zS(e, t);
      }
    }
    function fC(e) {
      var t = pn(e);
      return t === null ? null : t.stateNode;
    }
    var dC = function(e) {
      return null;
    };
    function HD(e) {
      return dC(e);
    }
    var pC = function(e) {
      return !1;
    };
    function ID(e) {
      return pC(e);
    }
    var vC = null, hC = null, mC = null, yC = null, gC = null, EC = null, SC = null, _C = null, TC = null;
    {
      var RC = function(e, t, a) {
        var i = t[a], l = dt(e) ? e.slice() : ut({}, e);
        return a + 1 === t.length ? (dt(l) ? l.splice(i, 1) : delete l[i], l) : (l[i] = RC(e[i], t, a + 1), l);
      }, CC = function(e, t) {
        return RC(e, t, 0);
      }, bC = function(e, t, a, i) {
        var l = t[i], s = dt(e) ? e.slice() : ut({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[l], dt(s) ? s.splice(l, 1) : delete s[l];
        } else
          s[l] = bC(
            // $FlowFixMe number or string is fine here
            e[l],
            t,
            a,
            i + 1
          );
        return s;
      }, wC = function(e, t, a) {
        if (t.length !== a.length) {
          A("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              A("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return bC(e, t, a, 0);
      }, xC = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var l = t[a], s = dt(e) ? e.slice() : ut({}, e);
        return s[l] = xC(e[l], t, a + 1, i), s;
      }, DC = function(e, t, a) {
        return xC(e, t, 0, a);
      }, US = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      vC = function(e, t, a, i) {
        var l = US(e, t);
        if (l !== null) {
          var s = DC(l.memoizedState, a, i);
          l.memoizedState = s, l.baseState = s, e.memoizedProps = ut({}, e.memoizedProps);
          var f = Ia(e, qe);
          f !== null && Er(f, e, qe, nn);
        }
      }, hC = function(e, t, a) {
        var i = US(e, t);
        if (i !== null) {
          var l = CC(i.memoizedState, a);
          i.memoizedState = l, i.baseState = l, e.memoizedProps = ut({}, e.memoizedProps);
          var s = Ia(e, qe);
          s !== null && Er(s, e, qe, nn);
        }
      }, mC = function(e, t, a, i) {
        var l = US(e, t);
        if (l !== null) {
          var s = wC(l.memoizedState, a, i);
          l.memoizedState = s, l.baseState = s, e.memoizedProps = ut({}, e.memoizedProps);
          var f = Ia(e, qe);
          f !== null && Er(f, e, qe, nn);
        }
      }, yC = function(e, t, a) {
        e.pendingProps = DC(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ia(e, qe);
        i !== null && Er(i, e, qe, nn);
      }, gC = function(e, t) {
        e.pendingProps = CC(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Ia(e, qe);
        a !== null && Er(a, e, qe, nn);
      }, EC = function(e, t, a) {
        e.pendingProps = wC(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ia(e, qe);
        i !== null && Er(i, e, qe, nn);
      }, SC = function(e) {
        var t = Ia(e, qe);
        t !== null && Er(t, e, qe, nn);
      }, _C = function(e) {
        dC = e;
      }, TC = function(e) {
        pC = e;
      };
    }
    function VD(e) {
      var t = Zr(e);
      return t === null ? null : t.stateNode;
    }
    function BD(e) {
      return null;
    }
    function YD() {
      return lr;
    }
    function $D(e) {
      var t = e.findFiberByHostInstance, a = E.ReactCurrentDispatcher;
      return Tu({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: vC,
        overrideHookStateDeletePath: hC,
        overrideHookStateRenamePath: mC,
        overrideProps: yC,
        overridePropsDeletePath: gC,
        overridePropsRenamePath: EC,
        setErrorHandler: _C,
        setSuspenseHandler: TC,
        scheduleUpdate: SC,
        currentDispatcherRef: a,
        findHostInstanceByFiber: VD,
        findFiberByHostInstance: t || BD,
        // React Refresh
        findHostInstancesForRefresh: _D,
        scheduleRefresh: ED,
        scheduleRoot: SD,
        setRefreshHandler: gD,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: YD,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: NS
      });
    }
    var OC = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function PS(e) {
      this._internalRoot = e;
    }
    cy.prototype.render = PS.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? g("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : fy(arguments[1]) ? g("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && g("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== An) {
          var i = fC(t.current);
          i && i.parentNode !== a && g("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      dv(e, t, null, null);
    }, cy.prototype.unmount = PS.prototype.unmount = function() {
      typeof arguments[0] == "function" && g("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        IR() && g("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Kl(function() {
          dv(null, e, null, null);
        }), O_(t);
      }
    };
    function WD(e, t) {
      if (!fy(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      kC(e);
      var a = !1, i = !1, l = "", s = OC;
      t != null && (t.hydrate ? A("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === kr && g(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (l = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = uC(e, im, null, a, i, l, s);
      Zh(f.current, e);
      var p = e.nodeType === An ? e.parentNode : e;
      return gp(p), new PS(f);
    }
    function cy(e) {
      this._internalRoot = e;
    }
    function GD(e) {
      e && Sh(e);
    }
    cy.prototype.unstable_scheduleHydration = GD;
    function QD(e, t, a) {
      if (!fy(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      kC(e), t === void 0 && g("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, l = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = OC;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var S = sC(t, null, e, im, i, s, f, p, v);
      if (Zh(S.current, e), gp(e), l)
        for (var _ = 0; _ < l.length; _++) {
          var O = l[_];
          Zw(S, O);
        }
      return new cy(S);
    }
    function fy(e) {
      return !!(e && (e.nodeType === qr || e.nodeType === Ki || e.nodeType === Sd));
    }
    function pv(e) {
      return !!(e && (e.nodeType === qr || e.nodeType === Ki || e.nodeType === Sd || e.nodeType === An && e.nodeValue === " react-mount-point-unstable "));
    }
    function kC(e) {
      e.nodeType === qr && e.tagName && e.tagName.toUpperCase() === "BODY" && g("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Op(e) && (e._reactRootContainer ? g("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : g("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var qD = E.ReactCurrentOwner, MC;
    MC = function(e) {
      if (e._reactRootContainer && e.nodeType !== An) {
        var t = fC(e._reactRootContainer.current);
        t && t.parentNode !== e && g("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = jS(e), l = !!(i && zu(i));
      l && !a && g("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === qr && e.tagName && e.tagName.toUpperCase() === "BODY" && g("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function jS(e) {
      return e ? e.nodeType === Ki ? e.documentElement : e.firstChild : null;
    }
    function NC() {
    }
    function KD(e, t, a, i, l) {
      if (l) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var x = sy(f);
            s.call(x);
          };
        }
        var f = sC(
          t,
          i,
          e,
          Pu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          NC
        );
        e._reactRootContainer = f, Zh(f.current, e);
        var p = e.nodeType === An ? e.parentNode : e;
        return gp(p), Kl(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var S = i;
          i = function() {
            var x = sy(_);
            S.call(x);
          };
        }
        var _ = uC(
          e,
          Pu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          NC
        );
        e._reactRootContainer = _, Zh(_.current, e);
        var O = e.nodeType === An ? e.parentNode : e;
        return gp(O), Kl(function() {
          dv(t, _, a, i);
        }), _;
      }
    }
    function XD(e, t) {
      e !== null && typeof e != "function" && g("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function dy(e, t, a, i, l) {
      MC(a), XD(l === void 0 ? null : l, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = KD(a, t, e, l, i);
      else {
        if (f = s, typeof l == "function") {
          var p = l;
          l = function() {
            var v = sy(f);
            p.call(v);
          };
        }
        dv(t, f, e, l);
      }
      return sy(f);
    }
    var LC = !1;
    function ZD(e) {
      {
        LC || (LC = !0, g("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = qD.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || g("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Dt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === qr ? e : UD(e, "findDOMNode");
    }
    function JD(e, t, a) {
      if (g("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !pv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Op(t) && t._reactRootContainer === void 0;
        i && g("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return dy(null, e, t, !0, a);
    }
    function eO(e, t, a) {
      if (g("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !pv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Op(t) && t._reactRootContainer === void 0;
        i && g("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return dy(null, e, t, !1, a);
    }
    function tO(e, t, a, i) {
      if (g("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !pv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !zy(e))
        throw new Error("parentComponent must be a valid React Component");
      return dy(e, t, a, !1, i);
    }
    var AC = !1;
    function nO(e) {
      if (AC || (AC = !0, g("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !pv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Op(e) && e._reactRootContainer === void 0;
        t && g("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = jS(e), i = a && !zu(a);
          i && g("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Kl(function() {
          dy(null, null, e, !1, function() {
            e._reactRootContainer = null, O_(e);
          });
        }), !0;
      } else {
        {
          var l = jS(e), s = !!(l && zu(l)), f = e.nodeType === qr && pv(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && g("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    br(PD), wu(jD), mh(FD), js(ja), tp(ph), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && g("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), Mc(a0), Ay(hS, Qx, Kl);
    function rO(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!fy(t))
        throw new Error("Target container is not a DOM element.");
      return zD(e, t, null, a);
    }
    function aO(e, t, a, i) {
      return tO(e, t, a, i);
    }
    var FS = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [zu, Af, Jh, hu, Nc, hS]
    };
    function iO(e, t) {
      return FS.usingClientEntryPoint || g('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), WD(e, t);
    }
    function oO(e, t, a) {
      return FS.usingClientEntryPoint || g('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), QD(e, t, a);
    }
    function lO(e) {
      return IR() && g("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Kl(e);
    }
    var uO = $D({
      findFiberByHostInstance: Zs,
      bundleType: 1,
      version: NS,
      rendererPackageName: "react-dom"
    });
    if (!uO && Nn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var zC = window.location.protocol;
      /^(https?|file):$/.test(zC) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (zC === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Wa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = FS, Wa.createPortal = rO, Wa.createRoot = iO, Wa.findDOMNode = ZD, Wa.flushSync = lO, Wa.hydrate = JD, Wa.hydrateRoot = oO, Wa.render = eO, Wa.unmountComponentAtNode = nO, Wa.unstable_batchedUpdates = hS, Wa.unstable_renderSubtreeIntoContainer = aO, Wa.version = NS, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Wa;
}
function lb() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lb);
    } catch (T) {
      console.error(T);
    }
  }
}
process.env.NODE_ENV === "production" ? (lb(), GS.exports = SO()) : GS.exports = _O();
var TO = GS.exports, QS, hy = TO;
if (process.env.NODE_ENV === "production")
  QS = hy.createRoot, hy.hydrateRoot;
else {
  var WC = hy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  QS = function(T, m) {
    WC.usingClientEntryPoint = !0;
    try {
      return hy.createRoot(T, m);
    } finally {
      WC.usingClientEntryPoint = !1;
    }
  };
}
var RO = Object.defineProperty, CO = (T, m, E) => m in T ? RO(T, m, { enumerable: !0, configurable: !0, writable: !0, value: E }) : T[m] = E, my = (T, m, E) => CO(T, typeof m != "symbol" ? m + "" : m, E);
const bO = {
  stringify: (T) => T ? "true" : "false",
  parse: (T) => /^[ty1-9]/i.test(T)
}, wO = {
  stringify: (T) => T.name,
  parse: (T, m, E) => {
    const M = (() => {
      if (typeof window < "u" && T in window)
        return window[T];
      if (typeof global < "u" && T in global)
        return global[T];
    })();
    return typeof M == "function" ? M.bind(E) : void 0;
  }
}, xO = {
  stringify: (T) => JSON.stringify(T),
  parse: (T) => JSON.parse(T)
}, DO = {
  stringify: (T) => `${T}`,
  parse: (T) => parseFloat(T)
}, OO = {
  stringify: (T) => T,
  parse: (T) => T
}, BS = {
  string: OO,
  number: DO,
  boolean: bO,
  function: wO,
  json: xO
};
function kO(T) {
  return T.replace(
    /([a-z0-9])([A-Z])/g,
    (m, E, M) => `${E}-${M.toLowerCase()}`
  );
}
const yy = Symbol.for("r2wc.render"), gy = Symbol.for("r2wc.connected"), hc = Symbol.for("r2wc.context"), Jl = Symbol.for("r2wc.props");
function MO(T, m, E) {
  var M, $, A;
  m.props || (m.props = T.propTypes ? Object.keys(T.propTypes) : []), m.events || (m.events = []);
  const g = Array.isArray(m.props) ? m.props.slice() : Object.keys(m.props), ee = Array.isArray(m.events) ? m.events.slice() : Object.keys(m.events), P = {}, K = {}, B = {}, F = {};
  for (const N of g) {
    P[N] = Array.isArray(m.props) ? "string" : m.props[N];
    const X = kO(N);
    B[N] = X, F[X] = N;
  }
  for (const N of ee)
    K[N] = Array.isArray(m.events) ? {} : m.events[N];
  class W extends HTMLElement {
    constructor() {
      super(), my(this, A, !0), my(this, $), my(this, M, {}), my(this, "container"), m.shadow ? this.container = this.attachShadow({
        mode: m.shadow
      }) : this.container = this, this[Jl].container = this.container;
      for (const X of g) {
        const fe = B[X], he = this.getAttribute(fe), Me = P[X], De = Me ? BS[Me] : null;
        De != null && De.parse && he && (this[Jl][X] = De.parse(he, fe, this));
      }
      for (const X of ee)
        this[Jl][X] = (fe) => {
          const he = X.replace(/^on/, "").toLowerCase();
          this.dispatchEvent(
            new CustomEvent(he, { detail: fe, ...K[X] })
          );
        };
    }
    static get observedAttributes() {
      return Object.keys(F);
    }
    connectedCallback() {
      this[gy] = !0, this[yy]();
    }
    disconnectedCallback() {
      this[gy] = !1, this[hc] && E.unmount(this[hc]), delete this[hc];
    }
    attributeChangedCallback(X, fe, he) {
      const Me = F[X], De = P[Me], Le = De ? BS[De] : null;
      Me in P && Le != null && Le.parse && he && (this[Jl][Me] = Le.parse(he, X, this), this[yy]());
    }
    [(A = gy, $ = hc, M = Jl, yy)]() {
      this[gy] && (this[hc] ? E.update(this[hc], this[Jl]) : this[hc] = E.mount(
        this.container,
        T,
        this[Jl]
      ));
    }
  }
  for (const N of g) {
    const X = B[N], fe = P[N];
    Object.defineProperty(W.prototype, N, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[Jl][N];
      },
      set(he) {
        this[Jl][N] = he;
        const Me = fe ? BS[fe] : null;
        if (Me != null && Me.stringify) {
          const De = Me.stringify(he, X, this);
          this.getAttribute(X) !== De && this.setAttribute(X, De);
        } else
          this[yy]();
      }
    });
  }
  return W;
}
function NO(T, m, E) {
  const M = QS(T), $ = sd.createElement(m, E);
  return M.render($), {
    root: M,
    ReactComponent: m
  };
}
function LO({ root: T, ReactComponent: m }, E) {
  const M = sd.createElement(m, E);
  T.render(M);
}
function AO({ root: T }) {
  T.unmount();
}
function zO(T, m = {}) {
  return MO(T, m, { mount: NO, update: LO, unmount: AO });
}
const GC = {
  PREFERRED_FRAME_SIZE: "preferred-frame-size",
  INITIAL_RENDER_DATA: "initial-render-data"
}, QC = "mcpui.dev/ui-";
function UO(T) {
  let m;
  try {
    m = new URL(T);
  } catch (E) {
    return console.error("Error parsing URL:", E), !1;
  }
  return m.protocol === "http:" || m.protocol === "https:";
}
function PO(T, m) {
  if (T.mimeType !== "text/html" && T.mimeType !== "text/uri-list")
    return {
      error: "Resource must be of type text/html (for HTML content) or text/uri-list (for URL content)."
    };
  if (T.mimeType === "text/uri-list") {
    let E = "";
    if (typeof T.text == "string" && T.text.trim() !== "")
      E = T.text;
    else if (typeof T.blob == "string")
      try {
        E = new TextDecoder().decode(
          Uint8Array.from(atob(T.blob), (A) => A.charCodeAt(0))
        );
      } catch (A) {
        return console.error("Error decoding base64 blob for URL content:", A), {
          error: "Error decoding URL from blob."
        };
      }
    else
      return {
        error: "URL resource expects a non-empty text or blob field containing the URL."
      };
    if (E.trim() === "")
      return {
        error: "URL content is empty."
      };
    const M = E.split(`
`).map((A) => A.trim()).filter((A) => A && !A.startsWith("#") && UO(A));
    if (M.length === 0)
      return {
        error: "No valid URLs found in uri-list content."
      };
    M.length > 1 && console.warn(
      `Multiple URLs found in uri-list content. Using the first URL: "${M[0]}". Other URLs ignored:`,
      M.slice(1)
    );
    const $ = M[0];
    if (m && m.trim() !== "")
      try {
        const A = new URL(m);
        if (typeof window < "u" && A.host === window.location.host)
          console.error(
            "For security, the proxy origin must not be the same as the host origin. Using original URL instead."
          );
        else
          return A.searchParams.set("url", $), {
            iframeSrc: A.toString(),
            iframeRenderMode: "src"
          };
      } catch (A) {
        console.error(
          `Invalid proxy URL provided: "${m}". Falling back to direct URL.`,
          A instanceof Error ? A.message : String(A)
        );
      }
    return {
      iframeSrc: $,
      iframeRenderMode: "src"
    };
  } else if (T.mimeType === "text/html") {
    if (typeof T.text == "string")
      return {
        htmlString: T.text,
        iframeRenderMode: "srcDoc"
      };
    if (typeof T.blob == "string")
      try {
        return {
          htmlString: new TextDecoder().decode(
            Uint8Array.from(atob(T.blob), (M) => M.charCodeAt(0))
          ),
          iframeRenderMode: "srcDoc"
        };
      } catch (E) {
        return console.error("Error decoding base64 blob for HTML content:", E), {
          error: "Error decoding HTML content from blob."
        };
      }
    else
      return {
        error: "HTML resource requires text or blob content."
      };
  } else
    return {
      error: "Unsupported mimeType. Expected text/html or text/uri-list."
    };
}
function jO(T) {
  if (typeof T.text == "string" && T.text.trim() !== "")
    return {
      code: T.text
    };
  if (typeof T.blob == "string")
    try {
      return {
        code: new TextDecoder().decode(
          Uint8Array.from(atob(T.blob), (E) => E.charCodeAt(0))
        )
      };
    } catch (m) {
      return console.error("Error decoding base64 blob for remote DOM content:", m), {
        error: "Error decoding remote DOM content from blob."
      };
    }
  return {
    error: "Remote DOM resource requires non-empty text or blob content."
  };
}
function FO(T) {
  return T._meta ?? {};
}
function HO(T) {
  const m = FO(T), E = {};
  return Object.entries(m).forEach(([M, $]) => {
    M.startsWith(QC) && (E[M.slice(QC.length)] = $);
  }), E;
}
const mc = {
  UI_MESSAGE_RECEIVED: "ui-message-received",
  UI_MESSAGE_RESPONSE: "ui-message-response",
  UI_SIZE_CHANGE: "ui-size-change",
  UI_LIFECYCLE_IFRAME_READY: "ui-lifecycle-iframe-ready",
  UI_LIFECYCLE_IFRAME_RENDER_DATA: "ui-lifecycle-iframe-render-data"
}, IO = {
  WAIT_FOR_RENDER_DATA: "waitForRenderData"
}, qS = ({
  resource: T,
  onUIAction: m,
  style: E,
  proxy: M,
  iframeRenderData: $,
  autoResizeIframe: A,
  sandboxPermissions: g,
  iframeProps: ee
}) => {
  const P = Gt.useRef(null);
  Gt.useImperativeHandle(ee == null ? void 0 : ee.ref, () => P.current);
  const { error: K, iframeSrc: B, iframeRenderMode: F, htmlString: W } = Gt.useMemo(
    () => PO(T, M),
    [T, M]
  ), N = Gt.useMemo(() => HO(T), [T]), X = N[GC.PREFERRED_FRAME_SIZE] ?? ["100%", "100%"], fe = N[GC.INITIAL_RENDER_DATA] ?? void 0, he = Gt.useMemo(() => {
    if (!(!$ && !fe))
      return {
        ...fe,
        ...$
      };
  }, [$, fe]), Me = Gt.useMemo(() => {
    if (B && he) {
      const Ye = new URL(B);
      return Ye.searchParams.set(IO.WAIT_FOR_RENDER_DATA, "true"), Ye.toString();
    }
    return B;
  }, [B, he]), De = Gt.useCallback(
    (Ye) => {
      var Oe;
      if (he) {
        const Je = Ye.currentTarget.contentWindow, je = Me ? new URL(Me).origin : "*";
        yv(
          mc.UI_LIFECYCLE_IFRAME_RENDER_DATA,
          Je,
          je,
          void 0,
          {
            renderData: he
          }
        );
      }
      (Oe = ee == null ? void 0 : ee.onLoad) == null || Oe.call(ee, Ye);
    },
    [he, Me, ee == null ? void 0 : ee.onLoad]
  );
  if (Gt.useEffect(() => {
    async function Ye(Oe) {
      const { source: Je, origin: je, data: wt } = Oe;
      if (P.current && Je === P.current.contentWindow) {
        if ((wt == null ? void 0 : wt.type) === mc.UI_LIFECYCLE_IFRAME_READY && he) {
          yv(
            mc.UI_LIFECYCLE_IFRAME_RENDER_DATA,
            Je,
            je,
            void 0,
            {
              renderData: he
            }
          );
          return;
        }
        if ((wt == null ? void 0 : wt.type) === mc.UI_SIZE_CHANGE) {
          const { width: kt, height: Mt } = wt.payload;
          if (A && P.current) {
            const _t = (typeof A == "boolean" || A.height) && Mt, Fe = (typeof A == "boolean" || A.width) && kt;
            _t && (P.current.style.height = `${Mt}px`), Fe && (P.current.style.width = `${kt}px`);
          }
          return;
        }
        const xt = wt;
        if (!xt)
          return;
        if (m) {
          const kt = xt.messageId;
          yv(mc.UI_MESSAGE_RECEIVED, Je, je, kt);
          try {
            const Mt = await m(xt);
            yv(mc.UI_MESSAGE_RESPONSE, Je, je, kt, {
              response: Mt
            });
          } catch (Mt) {
            console.error("Error handling UI action result in HTMLResourceRenderer:", Mt), yv(mc.UI_MESSAGE_RESPONSE, Je, je, kt, {
              error: Mt
            });
          }
        }
      }
    }
    return window.addEventListener("message", Ye), () => window.removeEventListener("message", Ye);
  }, [m]), K) return /* @__PURE__ */ It.jsx("p", { className: "text-red-500", children: K });
  const Le = Gt.useMemo(() => F === "srcDoc" ? qC(g ?? "", "allow-scripts") : qC(g ?? "", "allow-scripts allow-same-origin"), [g, F]);
  return F === "srcDoc" ? W == null ? K ? null : /* @__PURE__ */ It.jsx("p", { className: "text-orange-500", children: "No HTML content to display." }) : /* @__PURE__ */ It.jsx(
    "iframe",
    {
      srcDoc: W,
      sandbox: Le,
      style: { width: X[0], height: X[1], ...E },
      title: "MCP HTML Resource (Embedded Content)",
      ...ee,
      ref: P,
      onLoad: De
    }
  ) : F === "src" ? Me == null ? K ? null : /* @__PURE__ */ It.jsx("p", { className: "text-orange-500", children: "No URL provided for HTML resource." }) : /* @__PURE__ */ It.jsx(
    "iframe",
    {
      src: Me,
      sandbox: Le,
      style: { width: X[0], height: X[1], ...E },
      title: "MCP HTML Resource (URL)",
      ...ee,
      ref: P,
      onLoad: De
    }
  ) : /* @__PURE__ */ It.jsx("p", { className: "text-gray-500", children: "Initializing HTML resource display..." });
};
qS.displayName = "HTMLResourceRenderer";
function yv(T, m, E, M, $) {
  const A = E && E !== "null" ? E : "*";
  m == null || m.postMessage(
    {
      type: T,
      messageId: M ?? void 0,
      payload: $
    },
    A
  );
}
function qC(T, m) {
  return [.../* @__PURE__ */ new Set([...T.split(" "), ...m.split(" ")])].filter(Boolean).map((E) => E.trim()).join(" ");
}
const ub = 1, sb = 3, cb = 8, VO = 9, BO = 0, YO = 1, $O = 2, WO = 3, Sv = 1, JS = 2, e_ = 3, Ev = "~";
function fb({
  call: T,
  insertChild: m,
  removeChild: E,
  updateText: M,
  updateProperty: $
}) {
  const A = {
    [BO]: m,
    [YO]: E,
    [$O]: M,
    [WO]: $
  };
  return {
    call: T,
    mutate(g) {
      for (const [ee, ...P] of g)
        A[ee](...P);
    }
  };
}
class GO {
  constructor({
    retain: m,
    release: E,
    methods: M
  } = {}) {
    /**
     * Represents the root node of the remote tree. This node is always defined,
     * and you will likely be most interested in its `children` property, which
     * contains the top-level elements of the remote tree.
     */
    vc(this, "root", {
      id: Ev,
      type: VO,
      children: [],
      version: 0,
      properties: {},
      attributes: {},
      eventListeners: {}
    });
    /**
     * An object that can synchronize a tree of elements between two JavaScript
     * environments. This object acts as a “thin waist”, allowing for efficient
     * communication of changes between a “remote” environment (usually, a JavaScript
     * sandbox, such as an `iframe` or Web Worker) and a “host” environment
     * (usually, a top-level browser page).
     */
    vc(this, "attached", /* @__PURE__ */ new Map([[Ev, this.root]]));
    vc(this, "subscribers", /* @__PURE__ */ new Map());
    vc(this, "parents", /* @__PURE__ */ new Map());
    vc(this, "implementations", /* @__PURE__ */ new Map());
    const {
      attached: $,
      parents: A,
      subscribers: g
    } = this;
    this.connection = fb({
      call: (B, F, ...W) => {
        const N = this.implementations.get(B), X = N == null ? void 0 : N[F];
        if (typeof X != "function")
          throw new Error(`Node ${B} does not implement the ${F}() method`);
        return X(...W);
      },
      insertChild: (B, F, W) => {
        const N = $.get(B), {
          children: X
        } = N, fe = P(F, N);
        W === X.length ? X.push(fe) : X.splice(W, 0, fe), N.version += 1, this.parents.set(F.id, N.id), ee(N);
      },
      removeChild: (B, F) => {
        const W = $.get(B), {
          children: N
        } = W, [X] = N.splice(F, 1);
        X && (W.version += 1, ee(W), K(X));
      },
      updateProperty: (B, F, W, N = Sv) => {
        const X = $.get(B);
        m == null || m(W);
        let fe;
        switch (N) {
          case Sv:
            fe = X.properties;
            break;
          case JS:
            fe = X.attributes;
            break;
          case e_:
            fe = X.eventListeners;
            break;
        }
        const he = fe[F];
        fe[F] = W, X.version += 1;
        let Me;
        if (F === "slot") {
          const De = this.parents.get(B);
          Me = De == null ? De : $.get(De), Me && (Me.version += 1);
        }
        ee(X), Me && ee(Me), E == null || E(he);
      },
      updateText: (B, F) => {
        const W = $.get(B);
        W.data = F, W.version += 1, ee(W);
      }
    }), M && this.implement(this.root, M);
    function ee(B) {
      const F = g.get(B.id);
      if (F)
        for (const W of F)
          W(B);
    }
    function P(B, F) {
      let W;
      switch (B.type) {
        case sb:
        case cb: {
          const {
            id: N,
            type: X,
            data: fe
          } = B;
          W = {
            id: N,
            type: X,
            data: fe,
            version: 0
          };
          break;
        }
        case ub: {
          const {
            id: N,
            type: X,
            element: fe,
            children: he,
            properties: Me,
            attributes: De,
            eventListeners: Le
          } = B;
          m == null || m(Me), m == null || m(Le);
          const Ye = [];
          W = {
            id: N,
            type: X,
            element: fe,
            version: 0,
            children: Ye,
            properties: {
              ...Me
            },
            attributes: {
              ...De
            },
            eventListeners: {
              ...Le
            }
          };
          for (const Oe of he)
            Ye.push(P(Oe, W));
          break;
        }
        default:
          throw new Error(`Unknown node type: ${JSON.stringify(B)}`);
      }
      return $.set(W.id, W), A.set(W.id, F.id), W;
    }
    function K(B) {
      if ($.delete(B.id), A.delete(B.id), E && ("properties" in B && E(B.properties), "eventListeners" in B && E(B.eventListeners)), "children" in B)
        for (const F of B.children)
          K(F);
    }
  }
  /**
   * Fetches the latest state of a remote element that has been
   * received from the remote environment.
   *
   * @param node The remote node to fetch.
   * @returns The current state of the remote node, or `undefined` if the node is not connected to the remote tree.
   *
   * @example
   * import {RemoteReceiver} from '@remote-dom/core/receivers';
   *
   * const receiver = new RemoteReceiver();
   *
   * receiver.get(receiver.root) === receiver.root; // true
   */
  get({
    id: m
  }) {
    return this.attached.get(m);
  }
  /**
   * Lets you define how [remote methods](https://github.com/Shopify/remote-dom/blob/main/packages/core#remotemethods)
   * are implemented for a particular element in the tree.
   *
   * @param node The remote node to subscribe for changes.
   * @param implementation A record containing the methods to expose for the passed node.
   *
   * @example
   * // In the host environment:
   * import {RemoteReceiver} from '@remote-dom/core/receivers';
   *
   * const receiver = new RemoteReceiver();
   *
   * receiver.implement(receiver.root, {
   *   alert(message) {
   *     window.alert(message);
   *   },
   * });
   *
   * // In the remote environment:
   * import {RemoteRootElement} from '@remote-dom/core/elements';
   *
   * customElements.define('remote-root', RemoteRootElement);
   *
   * const root = document.createElement('remote-root');
   * root.connect(receiver.connection);
   *
   * root.callRemoteMethod('alert', 'Hello, world!');
   */
  implement({
    id: m
  }, E) {
    E == null ? this.implementations.delete(m) : this.implementations.set(m, E);
  }
  /**
   * Allows you to subscribe to changes in a remote element. This includes
   * changes to the remote element’s properties and list of children, but
   * note that you will not receive updates for properties or children of
   * _nested_ elements.
   *
   * @param node The remote node to subscribe for changes.
   * @param subscriber A function that will be called with the updated node on each change.
   *
   * @example
   * import {RemoteReceiver} from '@remote-dom/core/receivers';
   *
   * const abort = new AbortController();
   * const receiver = new RemoteReceiver();
   *
   * // Subscribe to all changes in the top-level children, attached
   * // directly to the remote “root”.
   * receiver.subscribe(
   *   receiver.root,
   *   (root) => {
   *     console.log('Root changed!', root);
   *   },
   *   {signal: abort.signal},
   * );
   */
  subscribe({
    id: m
  }, E, {
    signal: M
  } = {}) {
    let $ = this.subscribers.get(m);
    $ == null && ($ = /* @__PURE__ */ new Set(), this.subscribers.set(m, $)), $.add(E), M == null || M.addEventListener("abort", () => {
      $.delete(E), $.size === 0 && this.subscribers.delete(m);
    });
  }
}
const KC = /* @__PURE__ */ new WeakMap(), Ey = /* @__PURE__ */ new WeakMap(), db = /* @__PURE__ */ new WeakMap();
class QO {
  constructor({
    root: m,
    retain: E,
    release: M,
    call: $,
    cache: A
  } = {}) {
    /**
     * The root element that will contain the host implementations of
     * all nodes attached to the remote tree. To connect the receiver to
     * a new element, call the `connect()` method.
     */
    /**
     * An object that can synchronize a tree of elements between two JavaScript
     * environments. This object acts as a “thin waist”, allowing for efficient
     * communication of changes between a “remote” environment (usually, a JavaScript
     * sandbox, such as an `iframe` or Web Worker) and a “host” environment
     * (usually, a top-level browser page).
     */
    vc(this, "attached", /* @__PURE__ */ new Map());
    this.root = m ?? document.createDocumentFragment();
    const {
      attached: g
    } = this, ee = /* @__PURE__ */ new Map();
    this.connection = fb({
      call: (B, F, ...W) => {
        const N = B === Ev && this.root.nodeType !== 11 ? this.root : g.get(B);
        return $ ? $(N, F, ...W) : N[F](...W);
      },
      insertChild: (B, F, W) => {
        const N = B === Ev ? this.root : g.get(B), X = ee.get(B);
        X && clearTimeout(X), N.insertBefore(P(F), N.childNodes[W] || null);
      },
      removeChild: (B, F) => {
        const N = (B === Ev ? this.root : g.get(B)).childNodes[F];
        if (N.remove(), A != null && A.maxAge) {
          const X = ee.get(B);
          X && clearTimeout(X);
          const fe = setTimeout(() => {
            K(N);
          }, A.maxAge);
          ee.set(B, fe);
        } else
          K(N);
      },
      updateProperty: (B, F, W, N = Sv) => {
        const X = g.get(B);
        E == null || E(W);
        const fe = Ey.get(X), he = fe[F];
        fe[F] = W, Sy(X, F, W, N), M == null || M(he);
      },
      updateText: (B, F) => {
        const W = g.get(B);
        W.data = F;
      }
    });
    function P(B) {
      const F = g.get(B.id);
      if (F) return F;
      let W;
      switch (B.type) {
        case ub: {
          if (W = document.createElement(B.element), B.properties) {
            Ey.set(W, B.properties);
            for (const N of Object.keys(B.properties)) {
              const X = B.properties[N];
              E == null || E(X), Sy(W, N, X, Sv);
            }
          } else
            Ey.set(W, {});
          if (B.attributes)
            for (const N of Object.keys(B.attributes)) {
              const X = B.attributes[N];
              E == null || E(X), Sy(W, N, X, JS);
            }
          if (db.set(W, {}), B.eventListeners)
            for (const N of Object.keys(B.eventListeners)) {
              const X = B.eventListeners[N];
              E == null || E(X), Sy(W, N, X, e_);
            }
          for (const N of B.children)
            W.appendChild(P(N));
          break;
        }
        case sb: {
          W = document.createTextNode(B.data);
          break;
        }
        case cb: {
          W = document.createComment(B.data);
          break;
        }
        default:
          throw new Error(`Unknown node type: ${JSON.stringify(B)}`);
      }
      return KC.set(W, B.id), g.set(B.id, W), W;
    }
    function K(B) {
      const F = KC.get(B);
      F && g.delete(F);
      const W = Ey.get(B);
      if (W && M && M(W), B instanceof Element)
        for (const N of B.childNodes)
          K(N);
    }
  }
  /**
   * Connects the receiver to a new root element. The representation of
   * any child elements of the remote root will be appended to this node
   * as children, and the `root` property will be updated to point to the
   * new element.
   */
  connect(m) {
    const E = this.root;
    this.root = m, E.childNodes.forEach((M) => {
      m.appendChild(M);
    });
  }
  /**
   * Disconnects the receiver from its current root element. Any current
   * children of the root element will be moved to a `DocumentFragment`
   * instead, so they can be re-attached to a new element later.
   */
  disconnect() {
    if (this.root.nodeType === 11) return this.root;
    const m = this.root, E = new DocumentFragment();
    return this.root = E, m.childNodes.forEach((M) => {
      E.appendChild(M);
    }), E;
  }
}
function Sy(T, m, E, M) {
  switch (M) {
    case Sv: {
      T[m] = E;
      break;
    }
    case JS: {
      E == null ? T.removeAttribute(m) : T.setAttribute(m, E);
      break;
    }
    case e_: {
      const $ = db.get(T), A = $ == null ? void 0 : $[m];
      if (A && T.removeEventListener(m, A), E != null) {
        const g = (ee) => {
          var K;
          if (ee.target !== T) return;
          const P = E(ee.detail);
          (K = ee.resolve) == null || K.call(ee, P);
        };
        $ && ($[m] = g), T.addEventListener(m, g);
      }
      break;
    }
  }
}
function t_(T, m) {
  const [E, M] = Gt.useState(() => {
    const A = m.get(T);
    return {
      id: T.id,
      version: A == null ? void 0 : A.version,
      value: A,
      receiver: m
    };
  });
  let $ = E.value;
  if (E.receiver !== m || E.id !== T.id) {
    const A = m.get(T);
    $ = A, M({
      receiver: m,
      id: T.id,
      version: A == null ? void 0 : A.version,
      value: $
    });
  }
  return Gt.useDebugValue($), Gt.useEffect(() => {
    const A = new AbortController(), g = () => {
      A.signal.aborted || M((ee) => {
        const {
          id: P,
          version: K,
          receiver: B
        } = ee, {
          id: F
        } = T;
        if (B !== m || P !== F)
          return ee;
        const W = m.get(T), N = W == null ? void 0 : W.version;
        return K === N ? ee : {
          receiver: m,
          value: W,
          id: F,
          version: N
        };
      });
    };
    return m.subscribe(T, g, {
      signal: A.signal
    }), g(), () => {
      A.abort();
    };
  }, [m, T.id]), $;
}
function qO({
  remote: T,
  receiver: m
}) {
  const E = t_(T, m);
  return E ? /* @__PURE__ */ It.jsx(It.Fragment, {
    children: E.data
  }) : null;
}
function KS(T, {
  receiver: m,
  components: E
}) {
  switch (T.type) {
    case 1: {
      const M = E.get(T.element);
      if (M == null)
        throw new Error(`No component found for remote element: ${T.element}`);
      return /* @__PURE__ */ It.jsx(M, {
        element: T,
        receiver: m,
        components: E
      }, T.id);
    }
    case 3:
      return /* @__PURE__ */ It.jsx(qO, {
        remote: T,
        receiver: m
      }, T.id);
    case 8:
      return null;
    default:
      throw new Error(`Unknown remote node type: ${String(T)}`);
  }
}
function KO(T, m) {
  if (!T) return;
  const {
    children: E,
    properties: M,
    attributes: $,
    eventListeners: A
  } = T, g = [], ee = {
    ...M,
    ...$,
    children: g
  };
  if (m.eventProps)
    for (const [P, K] of Object.entries(m.eventProps)) {
      const B = K == null ? void 0 : K.event;
      if (B == null) continue;
      const F = A[B];
      F && (ee[P] = XC(F));
    }
  else
    for (const [P, K] of Object.entries(A))
      ee[`on${P[0].toUpperCase()}${P.slice(1)}`] = XC(K);
  for (const P of E)
    if (P.type === 1 && typeof P.attributes.slot == "string") {
      const K = P.attributes.slot, B = KS(P, m);
      ee[K] = ee[K] ? /* @__PURE__ */ It.jsxs(It.Fragment, {
        children: [ee[K], B]
      }) : B;
    } else
      g.push(KS(P, m));
  return ee;
}
function XC(T) {
  return function(...E) {
    if (E.length === 1 && E[0] instanceof Event) {
      const M = E[0];
      return M.target !== M.currentTarget ? void 0 : "detail" in M ? T(M.detail) : T();
    }
    return T(...E);
  };
}
const XO = Symbol.for("remote-dom.element"), ZO = Symbol.for("remote-dom.element.attached");
function JO(T, {
  name: m,
  eventProps: E
} = {}) {
  const M = /* @__PURE__ */ Gt.memo(function({
    element: A,
    receiver: g,
    components: ee
  }) {
    const P = Gt.useRef(), K = t_(A, g), B = K ?? A, F = B.id, W = KO(B, {
      receiver: g,
      components: ee,
      eventProps: E
    });
    if (W[XO] = B, W[ZO] = K != null, P.current == null) {
      const N = {
        id: F,
        receiver: g
      };
      N.instanceRef = ek(N), P.current = N;
    }
    return P.current.id = F, P.current.receiver = g, Gt.useEffect(() => {
      var X;
      const N = {
        id: F
      };
      return g.implement(N, (X = P.current) == null ? void 0 : X.instanceRef.current), () => {
        g.implement(N, null);
      };
    }, [F, g]), /* @__PURE__ */ It.jsx(T, {
      ref: P.current.instanceRef,
      ...W
    });
  });
  return M.displayName = m ?? `RemoteComponentRenderer(${T.displayName ?? T.name ?? "Component"})`, M;
}
function ek(T) {
  let m = null;
  return {
    get current() {
      return m;
    },
    set current(E) {
      m = E, T.receiver.implement(T, E);
    }
  };
}
function tk(T) {
  const {
    receiver: m
  } = T, {
    children: E
  } = t_(m.root, m);
  return /* @__PURE__ */ It.jsx(It.Fragment, {
    children: E.map((M) => KS(M, T))
  });
}
const nk = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>
  <div id="root"></div>
  <script>
"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
  var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

  // ../../../node_modules/.pnpm/@remote-dom+core@1.8.1_@preact+signals-core@1.10.0/node_modules/@remote-dom/core/build/esm/elements/RemoteEvent.mjs
  var RemoteEvent = class extends CustomEvent {
    /**
     * The last value received from a \`respondWith()\` call.
     */
    /**
     * Provides the \`response\` value to be sent as the return value for
     * the remote property function that triggered this event.
     */
    respondWith(response) {
      this.response = response;
    }
  };

  // ../../../node_modules/.pnpm/@remote-dom+core@1.8.1_@preact+signals-core@1.10.0/node_modules/@remote-dom/core/build/esm/constants.mjs
  var MUTATION_TYPE_INSERT_CHILD = 0;
  var MUTATION_TYPE_REMOVE_CHILD = 1;
  var MUTATION_TYPE_UPDATE_TEXT = 2;
  var MUTATION_TYPE_UPDATE_PROPERTY = 3;
  var UPDATE_PROPERTY_TYPE_PROPERTY = 1;
  var UPDATE_PROPERTY_TYPE_ATTRIBUTE = 2;
  var UPDATE_PROPERTY_TYPE_EVENT_LISTENER = 3;
  var ROOT_ID = "~";

  // ../../../node_modules/.pnpm/@remote-dom+core@1.8.1_@preact+signals-core@1.10.0/node_modules/@remote-dom/core/build/esm/elements/internals.mjs
  var REMOTE_CONNECTIONS = /* @__PURE__ */ new WeakMap();
  var REMOTE_IDS = /* @__PURE__ */ new WeakMap();
  var id = 0;
  function remoteId(node) {
    let remoteID = REMOTE_IDS.get(node);
    if (remoteID == null) {
      remoteID = String(id++);
      REMOTE_IDS.set(node, remoteID);
    }
    return remoteID;
  }
  var REMOTE_PROPERTIES = /* @__PURE__ */ new WeakMap();
  function remoteProperties(node) {
    return REMOTE_PROPERTIES.get(node);
  }
  var REMOTE_ATTRIBUTES = /* @__PURE__ */ new WeakMap();
  function remoteAttributes(node) {
    let attributes = REMOTE_ATTRIBUTES.get(node);
    if (attributes != null) return attributes;
    if (!(node instanceof Element) || node.tagName.includes("-")) return void 0;
    attributes = {};
    for (const {
      name,
      value
    } of node.attributes) {
      attributes[name] = value;
    }
    return attributes;
  }
  var REMOTE_EVENT_LISTENERS = /* @__PURE__ */ new WeakMap();
  function remoteEventListeners(node) {
    return REMOTE_EVENT_LISTENERS.get(node);
  }
  function updateRemoteElementProperty(node, property, value) {
    let properties = REMOTE_PROPERTIES.get(node);
    if (properties == null) {
      properties = {};
      REMOTE_PROPERTIES.set(node, properties);
    }
    if (properties[property] === value) return;
    properties[property] = value;
    const connection = REMOTE_CONNECTIONS.get(node);
    if (connection == null) return;
    connection.mutate([[MUTATION_TYPE_UPDATE_PROPERTY, remoteId(node), property, value, UPDATE_PROPERTY_TYPE_PROPERTY]]);
  }
  function updateRemoteElementAttribute(node, attribute, value) {
    let attributes = REMOTE_ATTRIBUTES.get(node);
    if (attributes == null) {
      attributes = {};
      REMOTE_ATTRIBUTES.set(node, attributes);
    }
    if (attributes[attribute] === value) return;
    if (value == null) {
      delete attributes[attribute];
    } else {
      attributes[attribute] = String(value);
    }
    const connection = REMOTE_CONNECTIONS.get(node);
    if (connection == null) return;
    connection.mutate([[MUTATION_TYPE_UPDATE_PROPERTY, remoteId(node), attribute, value, UPDATE_PROPERTY_TYPE_ATTRIBUTE]]);
  }
  function updateRemoteElementEventListener(node, event, listener) {
    let eventListeners = REMOTE_EVENT_LISTENERS.get(node);
    if (eventListeners == null) {
      eventListeners = {};
      REMOTE_EVENT_LISTENERS.set(node, eventListeners);
    }
    if (eventListeners[event] === listener) return;
    if (listener == null) {
      delete eventListeners[event];
    } else {
      eventListeners[event] = listener;
    }
    const connection = REMOTE_CONNECTIONS.get(node);
    if (connection == null) return;
    connection.mutate([[MUTATION_TYPE_UPDATE_PROPERTY, remoteId(node), event, listener, UPDATE_PROPERTY_TYPE_EVENT_LISTENER]]);
  }
  function connectRemoteNode(node, connection) {
    const existingConnection = REMOTE_CONNECTIONS.get(node);
    if (existingConnection === connection) return;
    REMOTE_CONNECTIONS.set(node, connection);
    if (node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        connectRemoteNode(node.childNodes[i], connection);
      }
    }
  }
  function disconnectRemoteNode(node) {
    const existingConnection = REMOTE_CONNECTIONS.get(node);
    if (existingConnection == null) return;
    REMOTE_CONNECTIONS.delete(node);
    if (node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        disconnectRemoteNode(node.childNodes[i]);
      }
    }
  }
  function serializeRemoteNode(node) {
    const {
      nodeType
    } = node;
    switch (nodeType) {
      // Element
      case 1: {
        return {
          id: remoteId(node),
          type: nodeType,
          element: node.localName,
          properties: cloneMaybeObject(remoteProperties(node)),
          attributes: cloneMaybeObject(remoteAttributes(node)),
          eventListeners: cloneMaybeObject(remoteEventListeners(node)),
          children: Array.from(node.childNodes).map(serializeRemoteNode)
        };
      }
      // TextNode
      case 3:
      // Comment
      // eslint-disable-next-line no-fallthrough
      case 8: {
        return {
          id: remoteId(node),
          type: nodeType,
          data: node.data
        };
      }
      default: {
        throw new Error(\`Cannot serialize node of type \${node.nodeType} (\${typeof node.nodeType})\`);
      }
    }
  }
  function cloneMaybeObject(maybeObject) {
    return maybeObject ? {
      ...maybeObject
    } : void 0;
  }
  function callRemoteElementMethod(node, method, ...args) {
    const id2 = REMOTE_IDS.get(node);
    const connection = REMOTE_CONNECTIONS.get(node);
    if (id2 == null || connection == null) {
      throw new Error(\`Cannot call method \${method} on an unconnected node\`);
    }
    return connection.call(id2, method, ...args);
  }

  // ../../../node_modules/.pnpm/@remote-dom+core@1.8.1_@preact+signals-core@1.10.0/node_modules/@remote-dom/core/build/esm/elements/RemoteElement.mjs
  var EMPTY_DEFINITION = Object.freeze({});
  var RemoteElement = class extends HTMLElement {
    static get observedAttributes() {
      return this.finalize().__observedAttributes;
    }
    /**
     * The resolved property definitions for this remote element.
     */
    static get remotePropertyDefinitions() {
      return this.finalize().__remotePropertyDefinitions;
    }
    /**
     * The resolved attribute definitions for this remote element.
     */
    static get remoteAttributeDefinitions() {
      return this.finalize().__remoteAttributeDefinitions;
    }
    /**
     * The resolved event listener definitions for this remote element.
     */
    static get remoteEventDefinitions() {
      return this.finalize().__remoteEventDefinitions;
    }
    /**
     * The resolved slot definitions for this remote element.
     */
    static get remoteSlotDefinitions() {
      return this.finalize().__remoteSlotDefinitions;
    }
    /**
     * Creates a new definition for a property that will be synchronized between
     * this remote element and its host representation.
     */
    static createProperty(name, definition) {
      saveRemoteProperty(name, definition, this.observedAttributes, this.remotePropertyDefinitions, this.__attributeToPropertyMap, this.__eventToPropertyMap);
    }
    /**
     * Consumes all the static members defined on the class and converts them
     * into the internal representation used to handle properties, attributes,
     * and event listeners.
     */
    static finalize() {
      if (this.hasOwnProperty("__finalized")) {
        return this;
      }
      this.__finalized = true;
      const {
        slottable,
        remoteSlots,
        remoteProperties: remoteProperties2,
        remoteAttributes: remoteAttributes2,
        remoteEvents,
        remoteMethods
      } = this;
      const SuperConstructor = Object.getPrototypeOf(this);
      const observedAttributes = /* @__PURE__ */ new Set();
      if (slottable) observedAttributes.add("slot");
      const attributeToPropertyMap = /* @__PURE__ */ new Map();
      const eventToPropertyMap = /* @__PURE__ */ new Map();
      const remoteSlotDefinitions = /* @__PURE__ */ new Map();
      const remotePropertyDefinitions = /* @__PURE__ */ new Map();
      const remoteAttributeDefinitions = /* @__PURE__ */ new Map();
      const remoteEventDefinitions = /* @__PURE__ */ new Map();
      if (typeof SuperConstructor.finalize === "function") {
        SuperConstructor.finalize();
        SuperConstructor.observedAttributes.forEach((attribute) => {
          observedAttributes.add(attribute);
        });
        SuperConstructor.remotePropertyDefinitions.forEach((definition, property) => {
          remotePropertyDefinitions.set(property, definition);
        });
        SuperConstructor.remoteAttributeDefinitions.forEach((definition, event) => {
          remoteAttributeDefinitions.set(event, definition);
        });
        SuperConstructor.remoteEventDefinitions.forEach((definition, event) => {
          remoteEventDefinitions.set(event, definition);
        });
        SuperConstructor.remoteSlotDefinitions.forEach((definition, slot) => {
          remoteSlotDefinitions.set(slot, definition);
        });
      }
      if (remoteSlots != null) {
        const slotNames = Array.isArray(remoteSlots) ? remoteSlots : Object.keys(remoteSlots);
        slotNames.forEach((slotName) => {
          remoteSlotDefinitions.set(slotName, EMPTY_DEFINITION);
        });
      }
      if (remoteProperties2 != null) {
        if (Array.isArray(remoteProperties2)) {
          remoteProperties2.forEach((propertyName) => {
            saveRemoteProperty(propertyName, void 0, observedAttributes, remotePropertyDefinitions, attributeToPropertyMap, eventToPropertyMap);
          });
        } else {
          Object.keys(remoteProperties2).forEach((propertyName) => {
            saveRemoteProperty(propertyName, remoteProperties2[propertyName], observedAttributes, remotePropertyDefinitions, attributeToPropertyMap, eventToPropertyMap);
          });
        }
      }
      if (remoteAttributes2 != null) {
        remoteAttributes2.forEach((attribute) => {
          remoteAttributeDefinitions.set(attribute, EMPTY_DEFINITION);
          observedAttributes.add(attribute);
        });
      }
      if (remoteEvents != null) {
        if (Array.isArray(remoteEvents)) {
          remoteEvents.forEach((event) => {
            remoteEventDefinitions.set(event, EMPTY_DEFINITION);
          });
        } else {
          Object.keys(remoteEvents).forEach((event) => {
            remoteEventDefinitions.set(event, remoteEvents[event]);
          });
        }
      }
      if (remoteMethods != null) {
        if (Array.isArray(remoteMethods)) {
          for (const method of remoteMethods) {
            this.prototype[method] = function(...args) {
              return this.callRemoteMethod(method, ...args);
            };
          }
        } else {
          Object.assign(this, remoteMethods);
        }
      }
      Object.defineProperties(this, {
        __observedAttributes: {
          value: [...observedAttributes],
          enumerable: false
        },
        __remoteSlotDefinitions: {
          value: remoteSlotDefinitions,
          enumerable: false
        },
        __remotePropertyDefinitions: {
          value: remotePropertyDefinitions,
          enumerable: false
        },
        __remoteAttributeDefinitions: {
          value: remoteAttributeDefinitions,
          enumerable: false
        },
        __remoteEventDefinitions: {
          value: remoteEventDefinitions,
          enumerable: false
        },
        __attributeToPropertyMap: {
          value: attributeToPropertyMap,
          enumerable: false
        },
        __eventToPropertyMap: {
          value: eventToPropertyMap,
          enumerable: false
        }
      });
      return this;
    }
    // Just need to use these types so TS doesn’t lose track of them.
    /** @internal */
    /** @internal */
    /** @internal */
    /** @internal */
    constructor() {
      super();
      this.constructor.finalize();
      const propertyDescriptors = {};
      const initialPropertiesToSet = {};
      const prototype = Object.getPrototypeOf(this);
      const ThisClass = this.constructor;
      for (const [property, description] of ThisClass.remotePropertyDefinitions.entries()) {
        const aliasedName = description.name;
        if (prototype.hasOwnProperty(property)) {
          continue;
        }
        if (property === aliasedName) {
          initialPropertiesToSet[property] = description.default;
        }
        const propertyDescriptor = {
          configurable: true,
          enumerable: property === aliasedName,
          get: () => {
            return remoteProperties(this)?.[aliasedName];
          },
          set: (value) => {
            updateRemoteElementProperty(this, aliasedName, value);
          }
        };
        propertyDescriptors[property] = propertyDescriptor;
      }
      for (const [event, definition] of ThisClass.remoteEventDefinitions.entries()) {
        const propertyFromDefinition = definition.property ?? true;
        if (!propertyFromDefinition) continue;
        const property = propertyFromDefinition === true ? \`on\${event}\` : propertyFromDefinition;
        propertyDescriptors[property] = {
          configurable: true,
          enumerable: true,
          get: () => {
            return getRemoteEvents(this).properties.get(property) ?? null;
          },
          set: (value) => {
            const remoteEvents = getRemoteEvents(this);
            const currentListener = remoteEvents.properties.get(property);
            if (typeof value === "function") {
              let handler = function(...args) {
                return value.call(this, ...args);
              };
              remoteEvents.properties.set(property, handler);
              this.addEventListener(event, handler);
            } else {
              remoteEvents.properties.delete(property);
            }
            if (currentListener) {
              this.removeEventListener(event, currentListener);
            }
          }
        };
      }
      Object.defineProperties(this, propertyDescriptors);
      Object.assign(this, initialPropertiesToSet);
    }
    attributeChangedCallback(attribute, _oldValue, newValue) {
      if (attribute === "slot" && this.constructor.slottable) {
        updateRemoteElementAttribute(this, attribute, newValue ? String(newValue) : void 0);
        return;
      }
      const {
        remotePropertyDefinitions,
        remoteAttributeDefinitions,
        __attributeToPropertyMap: attributeToPropertyMap
      } = this.constructor;
      if (remoteAttributeDefinitions.has(attribute)) {
        updateRemoteElementAttribute(this, attribute, newValue);
        return;
      }
      const property = attributeToPropertyMap.get(attribute);
      const propertyDefinition = property == null ? property : remotePropertyDefinitions.get(property);
      if (propertyDefinition == null) return;
      this[property] = convertAttributeValueToProperty(newValue, propertyDefinition.type);
    }
    connectedCallback() {
      for (const [event, descriptor] of this.constructor.remoteEventDefinitions.entries()) {
        if (descriptor.bubbles) {
          this.addEventListener(event, noopBubblesEventListener);
        }
      }
    }
    disconnectedCallback() {
      for (const [event, descriptor] of this.constructor.remoteEventDefinitions.entries()) {
        if (descriptor.bubbles) {
          this.removeEventListener(event, noopBubblesEventListener);
        }
      }
    }
    addEventListener(type, listener, options) {
      const {
        remoteEventDefinitions,
        __eventToPropertyMap: eventToPropertyMap
      } = this.constructor;
      const listenerDefinition = remoteEventDefinitions.get(type);
      const property = eventToPropertyMap.get(type);
      if (listenerDefinition == null && property == null) {
        return super.addEventListener(type, listener, options);
      }
      const remoteEvents = getRemoteEvents(this);
      const remoteEvent = getRemoteEventRecord.call(this, type, {
        property,
        definition: listenerDefinition
      });
      const normalizedListener = typeof options === "object" && options?.once ? (...args) => {
        const result = typeof listener === "object" ? listener.handleEvent(...args) : listener.call(this, ...args);
        removeRemoteListener.call(this, type, listener, listenerRecord);
        return result;
      } : listener;
      const listenerRecord = [normalizedListener, remoteEvent];
      remoteEvent.listeners.add(listener);
      remoteEvents.listeners.set(listener, listenerRecord);
      super.addEventListener(type, normalizedListener, options);
      if (typeof options === "object" && options.signal) {
        options.signal.addEventListener("abort", () => {
          removeRemoteListener.call(this, type, listener, listenerRecord);
        }, {
          once: true
        });
      }
      if (listenerDefinition) {
        updateRemoteElementEventListener(this, type, remoteEvent.dispatch);
      } else {
        updateRemoteElementProperty(this, property, remoteEvent.dispatch);
      }
    }
    removeEventListener(type, listener, options) {
      const listenerRecord = REMOTE_EVENTS.get(this)?.listeners.get(listener);
      const normalizedListener = listenerRecord ? listenerRecord[0] : listener;
      super.removeEventListener(type, normalizedListener, options);
      if (listenerRecord == null) return;
      removeRemoteListener.call(this, type, listener, listenerRecord);
    }
    /**
     * Updates a single remote property on an element node. If the element is
     * connected to a remote root, this function will also make a \`mutate()\` call
     * to communicate the change to the host.
     */
    updateRemoteProperty(name, value) {
      updateRemoteElementProperty(this, name, value);
    }
    /**
     * Updates a single remote attribute on an element node. If the element is
     * connected to a remote root, this function will also make a \`mutate()\` call
     * to communicate the change to the host.
     */
    updateRemoteAttribute(name, value) {
      updateRemoteElementAttribute(this, name, value);
    }
    /**
     * Performs a method through \`RemoteConnection.call()\`, using the remote ID and
     * connection for the provided node.
     */
    callRemoteMethod(method, ...args) {
      return callRemoteElementMethod(this, method, ...args);
    }
  };
  __publicField(RemoteElement, "slottable", true);
  __publicField(RemoteElement, "__finalized", true);
  __publicField(RemoteElement, "__observedAttributes", []);
  __publicField(RemoteElement, "__attributeToPropertyMap", /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
  __publicField(RemoteElement, "__eventToPropertyMap", /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
  __publicField(RemoteElement, "__remotePropertyDefinitions", /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
  __publicField(RemoteElement, "__remoteAttributeDefinitions", /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
  __publicField(RemoteElement, "__remoteEventDefinitions", /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
  __publicField(RemoteElement, "__remoteSlotDefinitions", /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
  var REMOTE_EVENTS = /* @__PURE__ */ new WeakMap();
  function getRemoteEvents(element) {
    let events = REMOTE_EVENTS.get(element);
    if (events) return events;
    events = {
      events: /* @__PURE__ */ new Map(),
      properties: /* @__PURE__ */ new Map(),
      listeners: /* @__PURE__ */ new WeakMap()
    };
    REMOTE_EVENTS.set(element, events);
    return events;
  }
  function getRemoteEventRecord(type, {
    property,
    definition
  }) {
    const remoteEvents = getRemoteEvents(this);
    let remoteEvent = remoteEvents.events.get(type);
    if (remoteEvent == null) {
      remoteEvent = {
        name: type,
        property,
        definition,
        listeners: /* @__PURE__ */ new Set(),
        dispatch: (arg) => {
          const event = definition?.dispatchEvent?.call(this, arg) ?? new RemoteEvent(type, {
            detail: arg,
            bubbles: definition?.bubbles
          });
          this.dispatchEvent(event);
          return event.response;
        }
      };
      remoteEvents.events.set(type, remoteEvent);
    }
    return remoteEvent;
  }
  function removeRemoteListener(type, listener, listenerRecord) {
    const remoteEvents = getRemoteEvents(this);
    const remoteEvent = listenerRecord[1];
    remoteEvent.listeners.delete(listener);
    remoteEvents.listeners.delete(listener);
    if (remoteEvent.listeners.size > 0) return;
    remoteEvents.events.delete(type);
    if (remoteEvent.property) {
      if (remoteProperties(this)?.[remoteEvent.property] === remoteEvent.dispatch) {
        updateRemoteElementProperty(this, remoteEvent.property, void 0);
      }
    } else {
      if (remoteEventListeners(this)?.[type] === remoteEvent.dispatch) {
        updateRemoteElementEventListener(this, type, void 0);
      }
    }
  }
  function saveRemoteProperty(name, description, observedAttributes, remotePropertyDefinitions, attributeToPropertyMap, eventToPropertyMap) {
    if (remotePropertyDefinitions.has(name)) {
      return remotePropertyDefinitions.get(name);
    }
    const looksLikeEventCallback = name[0] === "o" && name[1] === "n";
    const resolvedDescription = description ?? {};
    let {
      alias
    } = resolvedDescription;
    const {
      type = looksLikeEventCallback ? Function : String,
      attribute = type !== Function,
      event = looksLikeEventCallback,
      default: defaultValue = type === Boolean ? false : void 0
    } = resolvedDescription;
    if (alias == null) {
      const lowercaseProperty = name.toLowerCase();
      if (lowercaseProperty !== name) {
        alias = [lowercaseProperty];
      }
      if (looksLikeEventCallback) {
        alias ?? (alias = []);
        alias.unshift(\`_\${name}\`);
      }
    }
    let attributeName;
    if (attribute === true) {
      attributeName = camelToKebabCase(name);
    } else if (typeof attribute === "string") {
      attributeName = attribute;
    }
    if (attributeName) {
      if (Array.isArray(observedAttributes)) {
        observedAttributes.push(attributeName);
      } else {
        observedAttributes.add(attributeName);
      }
      attributeToPropertyMap.set(attributeName, name);
    }
    let eventName;
    if (event === true) {
      eventName = camelToKebabCase(looksLikeEventCallback ? name.slice(2) : name);
    } else if (typeof event === "string") {
      eventName = event;
    }
    if (eventName) {
      eventToPropertyMap.set(eventName, name);
    }
    const definition = {
      name,
      type,
      alias,
      event: eventName,
      attribute: attributeName,
      default: defaultValue
    };
    remotePropertyDefinitions.set(name, definition);
    if (alias) {
      for (const propertyAlias of alias) {
        remotePropertyDefinitions.set(propertyAlias, definition);
      }
    }
    return definition;
  }
  function convertAttributeValueToProperty(value, type) {
    if (value == null) return void 0;
    switch (type) {
      case Boolean:
        return value != null && value !== "false";
      case Object:
      case Array:
        try {
          return JSON.parse(value);
        } catch {
          return void 0;
        }
      case String:
        return String(value);
      case Number:
        return Number.parseFloat(value);
      case Function:
        return void 0;
      default: {
        return type.parse?.(value);
      }
    }
  }
  function camelToKebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function noopBubblesEventListener() {
  }

  // ../../../node_modules/.pnpm/@remote-dom+core@1.8.1_@preact+signals-core@1.10.0/node_modules/@remote-dom/core/build/esm/elements/RemoteMutationObserver.mjs
  var RemoteMutationObserver = class extends MutationObserver {
    constructor(connection) {
      super((records) => {
        const addedNodes = [];
        const remoteRecords = [];
        for (const record of records) {
          const targetId = remoteId(record.target);
          if (record.type === "childList") {
            const position = record.previousSibling ? indexOf(record.previousSibling, record.target.childNodes) + 1 : 0;
            record.removedNodes.forEach((node) => {
              disconnectRemoteNode(node);
              remoteRecords.push([MUTATION_TYPE_REMOVE_CHILD, targetId, position]);
            });
            record.addedNodes.forEach((node, index) => {
              if (addedNodes.some((addedNode) => {
                return addedNode === node || addedNode.contains(node);
              })) {
                return;
              }
              addedNodes.push(node);
              connectRemoteNode(node, connection);
              remoteRecords.push([MUTATION_TYPE_INSERT_CHILD, targetId, serializeRemoteNode(node), position + index]);
            });
          } else if (record.type === "characterData") {
            remoteRecords.push([MUTATION_TYPE_UPDATE_TEXT, targetId, record.target.textContent ?? ""]);
          } else if (record.type === "attributes" && record.attributeName != null && record.target instanceof Element && !record.target.tagName.includes("-")) {
            remoteRecords.push([MUTATION_TYPE_UPDATE_PROPERTY, targetId, record.attributeName, record.target.getAttribute(record.attributeName)]);
          }
        }
        connection.mutate(remoteRecords);
      });
      this.connection = connection;
    }
    /**
     * Starts watching changes to the element, and communicates changes to the
     * host environment. By default, this method will also communicate any initial
     * children of the element to the host environment.
     */
    observe(target, options) {
      REMOTE_IDS.set(target, ROOT_ID);
      if (options?.initial !== false && target.childNodes.length > 0) {
        const records = [];
        for (let i = 0; i < target.childNodes.length; i++) {
          const node = target.childNodes[i];
          connectRemoteNode(node, this.connection);
          records.push([MUTATION_TYPE_INSERT_CHILD, ROOT_ID, serializeRemoteNode(node), i]);
        }
        this.connection.mutate(records);
      }
      super.observe(target, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true,
        ...options
      });
    }
  };
  function indexOf(node, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === node) return i;
    }
    return -1;
  }

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/constants.mjs
  var MESSAGE_CALL = 1;
  var MESSAGE_CALL_RESULT = 2;
  var MESSAGE_FUNCTION_CALL = 3;
  var MESSAGE_FUNCTION_RESULT = 4;
  var MESSAGE_FUNCTION_RELEASE = 5;
  var SERIALIZE_METHOD = Symbol.for("quilt.threads.serialize");
  var TRANSFERABLE = Symbol.for("quilt.threads.transferable");

  // ../../../node_modules/.pnpm/@quilted+events@2.1.3/node_modules/@quilted/events/build/esm/abort/NestedAbortController.mjs
  var NestedAbortController = class extends AbortController {
    constructor(...parents) {
      super();
      const abortedSignal = parents.find((signal) => signal.aborted);
      if (abortedSignal) {
        this.abort(abortedSignal.reason);
      } else {
        const abort = (event) => this.abort(event.target.reason);
        const options = {
          signal: this.signal
        };
        for (const signal of parents) {
          signal.addEventListener("abort", abort, options);
        }
      }
    }
  };

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/errors.mjs
  var ThreadClosedError = class extends Error {
    constructor() {
      super("You attempted to call a function on a closed thread.");
    }
  };

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/nanoid.mjs
  var a = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
  function nanoid(e = 21) {
    let t = "", r = crypto.getRandomValues(new Uint8Array(e));
    for (let n = 0; n < e; n++) t += a[63 & r[n]];
    return t;
  }

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/functions/ThreadFunctionsAutomatic.mjs
  var _functionsToId, _idsToFunction, _idsToProxy, _finalization, _ThreadFunctionsAutomatic_instances, finalizationRegistry_fn;
  var ThreadFunctionsAutomatic = class {
    constructor() {
      __privateAdd(this, _ThreadFunctionsAutomatic_instances);
      __privateAdd(this, _functionsToId, /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
      __privateAdd(this, _idsToFunction, /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
      __privateAdd(this, _idsToProxy, /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
      __privateAdd(this, _finalization, /* @__PURE__ */ (() => /* @__PURE__ */ new WeakMap())());
    }
    get(id2) {
      return __privateGet(this, _idsToFunction).get(id2);
    }
    release(id2) {
      const func = __privateGet(this, _idsToFunction).get(id2);
      if (func) {
        __privateGet(this, _idsToFunction).delete(id2);
        __privateGet(this, _functionsToId).delete(func);
      }
      return Boolean(func);
    }
    serialize(func) {
      let id2 = __privateGet(this, _functionsToId).get(func);
      if (id2 == null) {
        id2 = nanoid();
        __privateGet(this, _functionsToId).set(func, id2);
        __privateGet(this, _idsToFunction).set(id2, func);
      }
      return id2;
    }
    deserialize(id2, thread) {
      let proxy = __privateGet(this, _idsToProxy).get(id2)?.deref();
      if (proxy) return proxy;
      proxy = (...args) => {
        if (!__privateGet(this, _idsToProxy).has(id2)) {
          throw new Error("You attempted to call a function that was already revoked.");
        }
        return thread.call((callID, args2, transferable) => {
          thread.messages.send([MESSAGE_FUNCTION_CALL, callID, id2, args2], transferable);
        }, args);
      };
      __privateMethod(this, _ThreadFunctionsAutomatic_instances, finalizationRegistry_fn).call(this, thread)?.register(proxy, id2);
      __privateGet(this, _idsToProxy).set(id2, new WeakRef(proxy));
      return proxy;
    }
  };
  _functionsToId = new WeakMap();
  _idsToFunction = new WeakMap();
  _idsToProxy = new WeakMap();
  _finalization = new WeakMap();
  _ThreadFunctionsAutomatic_instances = new WeakSet();
  finalizationRegistry_fn = function(thread) {
    let finalization = __privateGet(this, _finalization).get(thread);
    if (typeof FinalizationRegistry === "undefined") {
      return void 0;
    }
    if (!finalization) {
      finalization = new FinalizationRegistry((id2) => {
        thread.messages.send([MESSAGE_FUNCTION_RELEASE, id2]);
      });
      __privateGet(this, _finalization).set(thread, finalization);
    }
    return finalization;
  };

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/serialization/shared.mjs
  function isIterator(value) {
    return value != null && (Symbol.asyncIterator in value || Symbol.iterator in value) && typeof value.next === "function";
  }
  function isBasicObject(value) {
    if (value == null || typeof value !== "object") return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype == null || prototype === Object.prototype;
  }

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/serialization/ThreadSerializationStructuredClone.mjs
  var FUNCTION = "_@f";
  var ASYNC_ITERATOR = "_@i";
  var _customSerializer, _customDeserializer, _ThreadSerializationStructuredClone_instances, serializeInternal_fn, deserializeInternal_fn;
  var ThreadSerializationStructuredClone = class {
    constructor(options) {
      __privateAdd(this, _ThreadSerializationStructuredClone_instances);
      __privateAdd(this, _customSerializer);
      __privateAdd(this, _customDeserializer);
      __privateSet(this, _customSerializer, options?.serialize);
      __privateSet(this, _customDeserializer, options?.deserialize);
    }
    /**
     * Serializes a value into a structured cloning-compatible format that can be transferred between threads.
     */
    serialize(value, thread, transferable) {
      return __privateMethod(this, _ThreadSerializationStructuredClone_instances, serializeInternal_fn).call(this, value, thread, transferable);
    }
    /**
     * Deserializes a structured cloning-compatible value from another thread.
     */
    deserialize(value, thread) {
      return __privateMethod(this, _ThreadSerializationStructuredClone_instances, deserializeInternal_fn).call(this, value, thread);
    }
  };
  _customSerializer = new WeakMap();
  _customDeserializer = new WeakMap();
  _ThreadSerializationStructuredClone_instances = new WeakSet();
  serializeInternal_fn = function(value, thread, transferable, seen = /* @__PURE__ */ new Map(), isApplyingDefault = false) {
    if (value == null) return value;
    if (seen.has(value)) return seen.get(value);
    seen.set(value, void 0);
    if (typeof value === "object") {
      if (__privateGet(this, _customSerializer) && !isApplyingDefault) {
        const customValue = __privateGet(this, _customSerializer).call(this, value, (value2) => __privateMethod(this, _ThreadSerializationStructuredClone_instances, serializeInternal_fn).call(this, value2, thread, transferable, seen, true), thread, transferable);
        if (customValue !== void 0) {
          seen.set(value, customValue);
          return customValue;
        }
      }
      if (value[TRANSFERABLE]) {
        transferable?.push(value);
        seen.set(value, value);
        return value;
      }
      const serializeValue = (value2) => {
        return __privateMethod(this, _ThreadSerializationStructuredClone_instances, serializeInternal_fn).call(this, value2, thread, transferable, seen);
      };
      if (typeof value[SERIALIZE_METHOD] === "function") {
        const result = value[SERIALIZE_METHOD]({
          serialize: serializeValue
        });
        seen.set(value, result);
        return result;
      }
      if (Array.isArray(value)) {
        const result = value.map((item) => serializeValue(item));
        seen.set(value, result);
        return result;
      }
      if (value instanceof Map) {
        const entries = [...value.entries()].map(([key, value2]) => {
          return [serializeValue(key), serializeValue(value2)];
        });
        const result = new Map(entries);
        seen.set(value, result);
        return result;
      }
      if (value instanceof Set) {
        const entries = [...value].map((entry) => serializeValue(entry));
        const result = new Set(entries);
        seen.set(value, result);
        return result;
      }
      const valueIsIterator = isIterator(value);
      if (isBasicObject(value) || valueIsIterator) {
        const result = {};
        for (const key of Object.keys(value)) {
          result[key] = serializeValue(value[key]);
        }
        if (valueIsIterator) {
          result.next ?? (result.next = serializeValue(value.next.bind(value)));
          result.return ?? (result.return = serializeValue(value.return.bind(value)));
          result.throw ?? (result.throw = serializeValue(value.throw.bind(value)));
          result[ASYNC_ITERATOR] = true;
        }
        seen.set(value, result);
        return result;
      }
    }
    if (typeof value === "function") {
      const serialized = thread.functions.serialize(value, thread, transferable);
      const result = {
        [FUNCTION]: serialized
      };
      seen.set(value, result);
      return result;
    }
    seen.set(value, value);
    return value;
  };
  deserializeInternal_fn = function(value, thread, isApplyingDefault = false) {
    if (value == null) return value;
    if (typeof value === "object") {
      if (__privateGet(this, _customDeserializer) && !isApplyingDefault) {
        const customValue = __privateGet(this, _customDeserializer).call(this, value, (value2) => __privateMethod(this, _ThreadSerializationStructuredClone_instances, deserializeInternal_fn).call(this, value2, thread, true), thread);
        if (customValue !== void 0) {
          return customValue;
        }
      }
      if (value == null) {
        return value;
      }
      if (Array.isArray(value)) {
        return value.map((value2) => __privateMethod(this, _ThreadSerializationStructuredClone_instances, deserializeInternal_fn).call(this, value2, thread));
      }
      if (value instanceof Map) {
        return new Map([...value].map(([key, value2]) => [__privateMethod(this, _ThreadSerializationStructuredClone_instances, deserializeInternal_fn).call(this, key, thread), __privateMethod(this, _ThreadSerializationStructuredClone_instances, deserializeInternal_fn).call(this, value2, thread)]));
      }
      if (value instanceof Set) {
        return new Set([...value].map((entry) => __privateMethod(this, _ThreadSerializationStructuredClone_instances, deserializeInternal_fn).call(this, entry, thread)));
      }
      if (FUNCTION in value) {
        const func = thread.functions.deserialize(value[FUNCTION], thread);
        return func;
      }
      if (!isBasicObject(value)) {
        return value;
      }
      const result = {};
      for (const key of Object.keys(value)) {
        if (key === ASYNC_ITERATOR) {
          result[Symbol.asyncIterator] = () => result;
        } else {
          result[key] = __privateMethod(this, _ThreadSerializationStructuredClone_instances, deserializeInternal_fn).call(this, value[key], thread);
        }
      }
      return result;
    }
    return value;
  };

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/Thread.mjs
  var _abort, _idsToResolver, _Thread_instances, callLocal_fn, handlerForCall_fn, resolveCall_fn, waitForResult_fn;
  var Thread = class {
    constructor(messages, {
      imports,
      exports,
      functions = new ThreadFunctionsAutomatic(),
      serialization = new ThreadSerializationStructuredClone(),
      signal
    } = {}) {
      __privateAdd(this, _Thread_instances);
      __privateAdd(this, _abort);
      __privateAdd(this, _idsToResolver, /* @__PURE__ */ (() => /* @__PURE__ */ new Map())());
      this.messages = messages;
      __privateSet(this, _abort, signal ? new NestedAbortController(signal) : new AbortController());
      this.exports = exports ?? {};
      this.imports = createThreadImports(__privateMethod(this, _Thread_instances, handlerForCall_fn).bind(this), imports);
      this.functions = functions;
      this.serialization = serialization;
      this.functions.start?.(this);
      this.serialization.start?.(this);
      this.signal.addEventListener("abort", () => {
        for (const id2 of __privateGet(this, _idsToResolver).keys()) {
          __privateMethod(this, _Thread_instances, resolveCall_fn).call(this, id2, void 0, new ThreadClosedError());
        }
        __privateGet(this, _idsToResolver).clear();
      }, {
        once: true
      });
      messages.listen(async (rawData) => {
        const isThreadMessageData = Array.isArray(rawData) && typeof rawData[0] === "number";
        if (!isThreadMessageData) {
          return;
        }
        const data = rawData;
        switch (data[0]) {
          case MESSAGE_CALL: {
            const [, id2, property, args] = data;
            const func = this.exports[property] ?? (() => {
              throw new Error(\`No '\${property}' method is exported from this thread\`);
            });
            await __privateMethod(this, _Thread_instances, callLocal_fn).call(this, func, args, (value, error, transferable) => {
              this.messages.send([MESSAGE_CALL_RESULT, id2, value, error], transferable);
            });
            break;
          }
          case MESSAGE_FUNCTION_CALL: {
            const [, callID, funcID, args] = data;
            const func = this.functions.get(funcID, this) ?? missingThreadFunction;
            await __privateMethod(this, _Thread_instances, callLocal_fn).call(this, func, args, (value, error, transferable) => {
              this.messages.send([MESSAGE_FUNCTION_RESULT, callID, value, error], transferable);
            });
            break;
          }
          case MESSAGE_CALL_RESULT:
          case MESSAGE_FUNCTION_RESULT: {
            __privateMethod(this, _Thread_instances, resolveCall_fn).call(this, ...data.slice(1));
            break;
          }
          case MESSAGE_FUNCTION_RELEASE: {
            const id2 = data[1];
            this.functions.release(id2, this);
            break;
          }
        }
      }, {
        signal: this.signal
      });
    }
    /**
     * An object that exposes the methods that can be called on the paired thread.
     * This object will automatically encode and decode arguments and return values
     * as necessary.
     */
    /**
     * An object that exposes the methods that can be called on this thread by the
     * paired thread. To set these methods, pass the \`exports\` option when creating
     * a new \`Thread\`.
     */
    /**
     * An object that provides the message-passing interface that allows communication
     * to flow between environments.
     */
    /**
     * An object that manages how functions are proxied between threads.
     */
    /**
     * An object that manages how values are serialized and deserialized between threads.
     */
    /**
     * An \`AbortSignal\` that indicates whether the communication channel is still open.
     */
    get signal() {
      return __privateGet(this, _abort).signal;
    }
    /**
     * A boolean indicating whether the communication channel is still open.
     */
    get closed() {
      return __privateGet(this, _abort).signal.aborted;
    }
    /**
     * Closes the communication channel between the two threads. This will prevent
     * any further communication between the threads, and will clean up any memory
     * associated with in-progress communication. It will also reject any inflight
     * function calls between threads with a \`ThreadClosedError\`.
     */
    close() {
      __privateGet(this, _abort).abort();
    }
    /**
     * Requests that the thread provide the context needed to make a function
     * call between threads. You provide this method a function to call and the
     * unserialized arguments you wish to call it with, and the thread will call
     * the function you provided with a serialized call ID, the serialized arguments,
     * and any transferable objects that need to be passed between threads.
     */
    call(func, args) {
      if (this.closed) {
        return Promise.reject(new ThreadClosedError());
      }
      const transferable = [];
      const serialized = this.serialization.serialize(args, this, transferable);
      const id2 = nanoid();
      const done = __privateMethod(this, _Thread_instances, waitForResult_fn).call(this, id2);
      func(id2, serialized, transferable);
      return done;
    }
  };
  _abort = new WeakMap();
  _idsToResolver = new WeakMap();
  _Thread_instances = new WeakSet();
  callLocal_fn = async function(func, args, withResult) {
    try {
      const result = this.functions.call ? await this.functions.call(func, args, this) : await func(...this.serialization.deserialize(args, this));
      const transferable = [];
      const serialized = this.serialization.serialize(result, this, transferable);
      withResult(serialized, void 0, transferable);
    } catch (error) {
      withResult(void 0, this.serialization.serialize(error, this));
    }
  };
  handlerForCall_fn = function(property) {
    return (...args) => {
      try {
        if (typeof property !== "string" && typeof property !== "number") {
          throw new Error(\`Can’t call a symbol method on a thread: \${property.toString()}\`);
        }
        return this.call((id2, serializedArgs, transferable) => {
          this.messages.send([MESSAGE_CALL, id2, property, serializedArgs], transferable);
        }, args);
      } catch (error) {
        return Promise.reject(error);
      }
    };
  };
  resolveCall_fn = function(...args) {
    const callID = args[0];
    const resolver = __privateGet(this, _idsToResolver).get(callID);
    if (resolver) {
      resolver(...args);
      __privateGet(this, _idsToResolver).delete(callID);
    }
  };
  waitForResult_fn = function(id2) {
    const promise = new Promise((resolve, reject) => {
      __privateGet(this, _idsToResolver).set(id2, (_, value, error) => {
        if (error == null) {
          resolve(this.serialization.deserialize(value, this));
        } else {
          reject(this.serialization.deserialize(error, this));
        }
      });
    });
    Object.defineProperty(promise, Symbol.asyncIterator, {
      async *value() {
        const result = await promise;
        Object.defineProperty(result, Symbol.asyncIterator, {
          value: () => result
        });
        yield* result;
      }
    });
    return promise;
  };
  function createThreadImports(handlerForImport, imported) {
    let call;
    if (imported == null) {
      if (typeof Proxy !== "function") {
        throw new Error(\`You must pass an array of callable methods in environments without Proxies.\`);
      }
      const cache = /* @__PURE__ */ new Map();
      call = new Proxy({}, {
        get(_target, property) {
          if (cache.has(property)) {
            return cache.get(property);
          }
          const handler = handlerForImport(property);
          cache.set(property, handler);
          return handler;
        }
      });
    } else {
      call = {};
      for (const method of imported) {
        Object.defineProperty(call, method, {
          value: handlerForImport(method),
          writable: false,
          configurable: true,
          enumerable: true
        });
      }
    }
    return call;
  }
  function missingThreadFunction() {
    throw new Error(\`You attempted to call a function that is not stored. It may have already been released.\`);
  }

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/threads/window/shared.mjs
  var CHECK_MESSAGE = "quilt.threads.ping";
  var RESPONSE_MESSAGE = "quilt.threads.pong";

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/threads/window/ThreadNestedWindow.mjs
  function nestedWindowToThreadTarget(parent, {
    targetOrigin = "*"
  } = {}) {
    const ready = () => {
      const respond = () => parent.postMessage(RESPONSE_MESSAGE, targetOrigin);
      self.addEventListener("message", ({
        data,
        source
      }) => {
        if (source !== parent) return;
        if (data === CHECK_MESSAGE) respond();
      });
      respond();
    };
    if (document.readyState === "complete") {
      ready();
    } else {
      document.addEventListener("readystatechange", () => {
        if (document.readyState === "complete") {
          ready();
        }
      });
    }
    return {
      send(message, transfer) {
        return parent.postMessage(message, targetOrigin, transfer);
      },
      listen(listen, {
        signal
      }) {
        self.addEventListener("message", (event) => {
          if (event.data === CHECK_MESSAGE) return;
          listen(event.data);
        }, {
          signal
        });
      }
    };
  }

  // ../../../node_modules/.pnpm/@quilted+threads@3.1.3_@preact+signals-core@1.10.0/node_modules/@quilted/threads/build/esm/threads/ThreadNestedIframe.mjs
  var ThreadNestedIframe = class extends Thread {
    constructor({
      parent = globalThis.parent,
      targetOrigin = "*",
      ...options
    } = {}) {
      if (typeof self === "undefined" || parent == null) {
        throw new Error("You are not inside an iframe, because there is no parent window.");
      }
      super(nestedWindowToThreadTarget(parent, {
        targetOrigin
      }), options);
      this.parent = parent;
    }
  };

  // scripts/iframe-entry.js
  new ThreadNestedIframe({
    exports: {
      async render(options, receiver, hostApi) {
        if (options.remoteElements) {
          options.remoteElements.forEach((def) => {
            if (customElements.get(def.tagName)) return;
            const remoteElement = class extends RemoteElement {
              static get remoteAttributes() {
                return def.remoteAttributes || [];
              }
              static get remoteEvents() {
                return def.remoteEvents || [];
              }
            };
            Object.defineProperty(remoteElement, "name", {
              value: \`Remote\${def.tagName.replace(
                /(^w|-w)/g,
                (c) => c.replace("-", "").toUpperCase()
              )}\`
            });
            customElements.define(def.tagName, remoteElement);
          });
        }
        const root = document.querySelector("#root");
        const observer = new RemoteMutationObserver(receiver);
        observer.observe(root);
        const { code } = options;
        if (code && root) {
          try {
            const scriptFunction = new Function("root", "console", code);
            scriptFunction(root, console);
          } catch (e) {
            console.error("Error executing remote script:", e);
          }
        }
      }
    }
  });
})();

  <\/script>
</body>
</html>`, ZC = 1, JC = 2, pb = 3, eb = 4, vb = 5, tb = Symbol.for("quilt.threads.serialize"), rk = Symbol.for("quilt.threads.transferable");
class ak extends AbortController {
  constructor(...m) {
    super();
    const E = m.find((M) => M.aborted);
    if (E)
      this.abort(E.reason);
    else {
      const M = (A) => this.abort(A.target.reason), $ = {
        signal: this.signal
      };
      for (const A of m)
        A.addEventListener("abort", M, $);
    }
  }
}
class nb extends Error {
  constructor() {
    super("You attempted to call a function on a closed thread.");
  }
}
let ik = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
function hb(T = 21) {
  let m = "", E = crypto.getRandomValues(new Uint8Array(T));
  for (let M = 0; M < T; M++) m += ik[63 & E[M]];
  return m;
}
var id, yc, od, _v, Ry, mb;
class ok {
  constructor() {
    Vi(this, Ry);
    Vi(this, id, /* @__PURE__ */ new Map());
    Vi(this, yc, /* @__PURE__ */ new Map());
    Vi(this, od, /* @__PURE__ */ new Map());
    Vi(this, _v, /* @__PURE__ */ new WeakMap());
  }
  get(m) {
    return _n(this, yc).get(m);
  }
  release(m) {
    const E = _n(this, yc).get(m);
    return E && (_n(this, yc).delete(m), _n(this, id).delete(E)), !!E;
  }
  serialize(m) {
    let E = _n(this, id).get(m);
    return E == null && (E = hb(), _n(this, id).set(m, E), _n(this, yc).set(E, m)), E;
  }
  deserialize(m, E) {
    var $, A;
    let M = ($ = _n(this, od).get(m)) == null ? void 0 : $.deref();
    return M || (M = (...g) => {
      if (!_n(this, od).has(m))
        throw new Error("You attempted to call a function that was already revoked.");
      return E.call((ee, P, K) => {
        E.messages.send([pb, ee, m, P], K);
      }, g);
    }, (A = xr(this, Ry, mb).call(this, E)) == null || A.register(M, m), _n(this, od).set(m, new WeakRef(M)), M);
  }
}
id = new WeakMap(), yc = new WeakMap(), od = new WeakMap(), _v = new WeakMap(), Ry = new WeakSet(), mb = function(m) {
  let E = _n(this, _v).get(m);
  if (!(typeof FinalizationRegistry > "u"))
    return E || (E = new FinalizationRegistry((M) => {
      m.messages.send([vb, M]);
    }), _n(this, _v).set(m, E)), E;
};
function lk(T) {
  return T != null && (Symbol.asyncIterator in T || Symbol.iterator in T) && typeof T.next == "function";
}
function rb(T) {
  if (T == null || typeof T != "object") return !1;
  const m = Object.getPrototypeOf(T);
  return m == null || m === Object.prototype;
}
const YS = "_@f", ab = "_@i";
var ld, ud, Ga, Ty, Xu;
class uk {
  constructor(m) {
    Vi(this, Ga);
    Vi(this, ld);
    Vi(this, ud);
    py(this, ld, m == null ? void 0 : m.serialize), py(this, ud, m == null ? void 0 : m.deserialize);
  }
  /**
   * Serializes a value into a structured cloning-compatible format that can be transferred between threads.
   */
  serialize(m, E, M) {
    return xr(this, Ga, Ty).call(this, m, E, M);
  }
  /**
   * Deserializes a structured cloning-compatible value from another thread.
   */
  deserialize(m, E) {
    return xr(this, Ga, Xu).call(this, m, E);
  }
}
ld = new WeakMap(), ud = new WeakMap(), Ga = new WeakSet(), Ty = function(m, E, M, $ = /* @__PURE__ */ new Map(), A = !1) {
  if (m == null) return m;
  if ($.has(m)) return $.get(m);
  if ($.set(m, void 0), typeof m == "object") {
    if (_n(this, ld) && !A) {
      const P = _n(this, ld).call(this, m, (K) => xr(this, Ga, Ty).call(this, K, E, M, $, !0), E, M);
      if (P !== void 0)
        return $.set(m, P), P;
    }
    if (m[rk])
      return M == null || M.push(m), $.set(m, m), m;
    const g = (P) => xr(this, Ga, Ty).call(this, P, E, M, $);
    if (typeof m[tb] == "function") {
      const P = m[tb]({
        serialize: g
      });
      return $.set(m, P), P;
    }
    if (Array.isArray(m)) {
      const P = m.map((K) => g(K));
      return $.set(m, P), P;
    }
    if (m instanceof Map) {
      const P = [...m.entries()].map(([B, F]) => [g(B), g(F)]), K = new Map(P);
      return $.set(m, K), K;
    }
    if (m instanceof Set) {
      const P = [...m].map((B) => g(B)), K = new Set(P);
      return $.set(m, K), K;
    }
    const ee = lk(m);
    if (rb(m) || ee) {
      const P = {};
      for (const K of Object.keys(m))
        P[K] = g(m[K]);
      return ee && (P.next ?? (P.next = g(m.next.bind(m))), P.return ?? (P.return = g(m.return.bind(m))), P.throw ?? (P.throw = g(m.throw.bind(m))), P[ab] = !0), $.set(m, P), P;
    }
  }
  if (typeof m == "function") {
    const g = E.functions.serialize(m, E, M), ee = {
      [YS]: g
    };
    return $.set(m, ee), ee;
  }
  return $.set(m, m), m;
}, Xu = function(m, E, M = !1) {
  if (m == null) return m;
  if (typeof m == "object") {
    if (_n(this, ud) && !M) {
      const A = _n(this, ud).call(this, m, (g) => xr(this, Ga, Xu).call(this, g, E, !0), E);
      if (A !== void 0)
        return A;
    }
    if (m == null)
      return m;
    if (Array.isArray(m))
      return m.map((A) => xr(this, Ga, Xu).call(this, A, E));
    if (m instanceof Map)
      return new Map([...m].map(([A, g]) => [xr(this, Ga, Xu).call(this, A, E), xr(this, Ga, Xu).call(this, g, E)]));
    if (m instanceof Set)
      return new Set([...m].map((A) => xr(this, Ga, Xu).call(this, A, E)));
    if (YS in m)
      return E.functions.deserialize(m[YS], E);
    if (!rb(m))
      return m;
    const $ = {};
    for (const A of Object.keys(m))
      A === ab ? $[Symbol.asyncIterator] = () => $ : $[A] = xr(this, Ga, Xu).call(this, m[A], E);
    return $;
  }
  return m;
};
var gc, Zu, Bi, XS, yb, ZS, gb;
class sk {
  constructor(m, {
    imports: E,
    exports: M,
    functions: $ = new ok(),
    serialization: A = new uk(),
    signal: g
  } = {}) {
    Vi(this, Bi);
    Vi(this, gc);
    Vi(this, Zu, /* @__PURE__ */ new Map());
    var ee, P, K, B;
    this.messages = m, py(this, gc, g ? new ak(g) : new AbortController()), this.exports = M ?? {}, this.imports = ck(xr(this, Bi, yb).bind(this), E), this.functions = $, this.serialization = A, (P = (ee = this.functions).start) == null || P.call(ee, this), (B = (K = this.serialization).start) == null || B.call(K, this), this.signal.addEventListener("abort", () => {
      for (const F of _n(this, Zu).keys())
        xr(this, Bi, ZS).call(this, F, void 0, new nb());
      _n(this, Zu).clear();
    }, {
      once: !0
    }), m.listen(async (F) => {
      if (!(Array.isArray(F) && typeof F[0] == "number"))
        return;
      const N = F;
      switch (N[0]) {
        case ZC: {
          const [, X, fe, he] = N, Me = this.exports[fe] ?? (() => {
            throw new Error(`No '${fe}' method is exported from this thread`);
          });
          await xr(this, Bi, XS).call(this, Me, he, (De, Le, Ye) => {
            this.messages.send([JC, X, De, Le], Ye);
          });
          break;
        }
        case pb: {
          const [, X, fe, he] = N, Me = this.functions.get(fe, this) ?? fk;
          await xr(this, Bi, XS).call(this, Me, he, (De, Le, Ye) => {
            this.messages.send([eb, X, De, Le], Ye);
          });
          break;
        }
        case JC:
        case eb: {
          xr(this, Bi, ZS).call(this, ...N.slice(1));
          break;
        }
        case vb: {
          const X = N[1];
          this.functions.release(X, this);
          break;
        }
      }
    }, {
      signal: this.signal
    });
  }
  /**
   * An object that exposes the methods that can be called on the paired thread.
   * This object will automatically encode and decode arguments and return values
   * as necessary.
   */
  /**
   * An object that exposes the methods that can be called on this thread by the
   * paired thread. To set these methods, pass the `exports` option when creating
   * a new `Thread`.
   */
  /**
   * An object that provides the message-passing interface that allows communication
   * to flow between environments.
   */
  /**
   * An object that manages how functions are proxied between threads.
   */
  /**
   * An object that manages how values are serialized and deserialized between threads.
   */
  /**
   * An `AbortSignal` that indicates whether the communication channel is still open.
   */
  get signal() {
    return _n(this, gc).signal;
  }
  /**
   * A boolean indicating whether the communication channel is still open.
   */
  get closed() {
    return _n(this, gc).signal.aborted;
  }
  /**
   * Closes the communication channel between the two threads. This will prevent
   * any further communication between the threads, and will clean up any memory
   * associated with in-progress communication. It will also reject any inflight
   * function calls between threads with a `ThreadClosedError`.
   */
  close() {
    _n(this, gc).abort();
  }
  /**
   * Requests that the thread provide the context needed to make a function
   * call between threads. You provide this method a function to call and the
   * unserialized arguments you wish to call it with, and the thread will call
   * the function you provided with a serialized call ID, the serialized arguments,
   * and any transferable objects that need to be passed between threads.
   */
  call(m, E) {
    if (this.closed)
      return Promise.reject(new nb());
    const M = [], $ = this.serialization.serialize(E, this, M), A = hb(), g = xr(this, Bi, gb).call(this, A);
    return m(A, $, M), g;
  }
}
gc = new WeakMap(), Zu = new WeakMap(), Bi = new WeakSet(), XS = async function(m, E, M) {
  try {
    const $ = this.functions.call ? await this.functions.call(m, E, this) : await m(...this.serialization.deserialize(E, this)), A = [], g = this.serialization.serialize($, this, A);
    M(g, void 0, A);
  } catch ($) {
    M(void 0, this.serialization.serialize($, this));
  }
}, yb = function(m) {
  return (...E) => {
    try {
      if (typeof m != "string" && typeof m != "number")
        throw new Error(`Can’t call a symbol method on a thread: ${m.toString()}`);
      return this.call((M, $, A) => {
        this.messages.send([ZC, M, m, $], A);
      }, E);
    } catch (M) {
      return Promise.reject(M);
    }
  };
}, ZS = function(...m) {
  const E = m[0], M = _n(this, Zu).get(E);
  M && (M(...m), _n(this, Zu).delete(E));
}, gb = function(m) {
  const E = new Promise((M, $) => {
    _n(this, Zu).set(m, (A, g, ee) => {
      ee == null ? M(this.serialization.deserialize(g, this)) : $(this.serialization.deserialize(ee, this));
    });
  });
  return Object.defineProperty(E, Symbol.asyncIterator, {
    async *value() {
      const M = await E;
      Object.defineProperty(M, Symbol.asyncIterator, {
        value: () => M
      }), yield* M;
    }
  }), E;
};
function ck(T, m) {
  let E;
  if (m == null) {
    if (typeof Proxy != "function")
      throw new Error("You must pass an array of callable methods in environments without Proxies.");
    const M = /* @__PURE__ */ new Map();
    E = new Proxy({}, {
      get($, A) {
        if (M.has(A))
          return M.get(A);
        const g = T(A);
        return M.set(A, g), g;
      }
    });
  } else {
    E = {};
    for (const M of m)
      Object.defineProperty(E, M, {
        value: T(M),
        writable: !1,
        configurable: !0,
        enumerable: !0
      });
  }
  return E;
}
function fk() {
  throw new Error("You attempted to call a function that is not stored. It may have already been released.");
}
const dk = "quilt.threads.ping", ib = "quilt.threads.pong";
function pk(T, {
  targetOrigin: m = "*"
} = {}) {
  let E = !1;
  const M = function(g, ee) {
    T.postMessage(g, m, ee);
  }, $ = new Promise((A) => {
    const g = new AbortController();
    globalThis.window.addEventListener("message", (ee) => {
      ee.source === T && ee.data === ib && (E = !0, g.abort(), A());
    }, {
      signal: g.signal
    }), g.signal.addEventListener("abort", () => A(), {
      once: !0
    }), M(dk);
  });
  return {
    send(A, g) {
      return E ? M(A, g) : $.then(() => {
        if (E) return M(A, g);
      });
    },
    listen(A, {
      signal: g
    }) {
      self.addEventListener("message", (ee) => {
        ee.source === T && ee.data !== ib && A(ee.data);
      }, {
        signal: g
      });
    }
  };
}
class vk extends sk {
  constructor(m, {
    targetOrigin: E = "*",
    ...M
  } = {}) {
    super(pk(m.contentWindow, {
      targetOrigin: E
    }), M), this.iframe = m;
  }
}
const Eb = sd.forwardRef(({ content: T, children: m, ...E }, M) => /* @__PURE__ */ It.jsx("span", { ref: M, ...E, children: T || m }));
Eb.displayName = "UIText";
const Sb = sd.forwardRef(({ label: T, onPress: m, onClick: E, children: M, ...$ }, A) => {
  const g = (ee) => {
    m && m(), E && E(ee);
  };
  return /* @__PURE__ */ It.jsx(
    "button",
    {
      ref: A,
      onClick: g,
      style: {
        padding: "8px 16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      },
      ...$,
      children: T || M
    }
  );
});
Sb.displayName = "UIButton";
const _b = sd.forwardRef(
  ({
    direction: T = "vertical",
    spacing: m = "8",
    align: E = "stretch",
    justify: M = "flex-start",
    children: $,
    ...A
  }, g) => /* @__PURE__ */ It.jsx(
    "div",
    {
      ref: g,
      style: {
        display: "flex",
        flexDirection: T === "horizontal" ? "row" : "column",
        gap: `${m}px`,
        alignItems: E,
        justifyContent: M
      },
      ...A,
      children: $
    }
  )
);
_b.displayName = "UIStack";
const Tb = sd.forwardRef(({ src: T, alt: m, width: E, height: M, children: $, ...A }, g) => /* @__PURE__ */ It.jsx(
  "img",
  {
    ref: g,
    src: T,
    alt: m,
    width: E,
    height: M,
    style: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    },
    ...A
  }
));
Tb.displayName = "UIImage";
const Rb = {
  name: "basic",
  elements: [
    {
      tagName: "ui-text",
      component: Eb,
      propMapping: {
        content: "content"
      },
      eventMapping: {}
    },
    {
      tagName: "ui-button",
      component: Sb,
      propMapping: {
        label: "label"
      },
      eventMapping: {
        press: "onPress"
      }
    },
    {
      tagName: "ui-stack",
      component: _b,
      propMapping: {
        direction: "direction",
        spacing: "spacing",
        align: "align",
        justify: "justify"
      },
      eventMapping: {}
    },
    {
      tagName: "ui-image",
      component: Tb,
      propMapping: {
        src: "src",
        alt: "alt",
        width: "width",
        height: "height"
      },
      eventMapping: {}
    }
  ]
}, hk = ({ receiver: T }) => {
  const m = Gt.useRef(null);
  return Gt.useEffect(() => {
    if (m.current)
      return T.connect(m.current), () => {
        T.disconnect();
      };
  }, [T]), /* @__PURE__ */ It.jsx("div", { ref: m, "data-testid": "standard-dom-renderer-container" });
}, mk = ({
  resource: T,
  library: m,
  remoteElements: E = [],
  onUIAction: M
}) => {
  const $ = Gt.useRef(null), A = Gt.useRef(null), [g, ee] = Gt.useState(null), P = Gt.useMemo(() => (T.mimeType || "").includes("framework=react") ? "react" : "webcomponents", [T.mimeType]), K = `${m == null ? void 0 : m.name}-${P}`, { receiver: B, components: F } = Gt.useMemo(() => {
    switch (P) {
      case "react": {
        const N = new GO(), X = m || Rb, fe = /* @__PURE__ */ new Map();
        return X && X.elements.forEach((he) => {
          const Me = JO(he.component);
          fe.set(he.tagName, Me);
        }), {
          receiver: N,
          components: fe
        };
      }
      case "webcomponents":
      default:
        return {
          receiver: new QO(),
          components: null
        };
    }
  }, [T, m, E]);
  Gt.useEffect(() => {
    function N(X) {
      var fe;
      if ($.current && X.source === $.current.contentWindow) {
        const he = X.data;
        if (!he)
          return;
        (fe = M == null ? void 0 : M(he)) == null || fe.catch((Me) => {
          console.error("Error handling UI action result in RemoteDOMResourceRenderer:", Me);
        });
      }
    }
    return window.addEventListener("message", N), () => window.removeEventListener("message", N);
  }, [M]), Gt.useEffect(() => {
    const N = A.current;
    return A.current = null, () => {
      N == null || N.close();
    };
  }, [K]);
  const W = () => {
    const N = $.current;
    if (!N || A.current)
      return;
    const X = new vk(N);
    A.current = X;
    const { code: fe, error: he } = jO(T);
    if (he) {
      ee(he);
      return;
    }
    if (fe && (B != null && B.connection)) {
      const Me = {
        code: fe,
        remoteElements: E,
        useReactRenderer: P === "react",
        componentLibrary: m == null ? void 0 : m.name
      };
      X.imports.render(Me, B.connection).catch((De) => console.error("Error calling remote render:", De));
    }
  };
  return g ? /* @__PURE__ */ It.jsx("p", { className: "text-red-500", children: g }) : /* @__PURE__ */ It.jsxs(It.Fragment, { children: [
    /* @__PURE__ */ It.jsx(
      "iframe",
      {
        ref: $,
        srcDoc: nk,
        sandbox: "allow-scripts",
        style: { display: "none" },
        title: "Remote DOM Sandbox",
        onLoad: W
      },
      K
    ),
    P === "react" && F ? /* @__PURE__ */ It.jsx(tk, { receiver: B, components: F }) : /* @__PURE__ */ It.jsx(hk, { receiver: B })
  ] });
};
function yk(T) {
  var m;
  if (T.contentType)
    return T.contentType;
  if (T.mimeType === "text/html")
    return "rawHtml";
  if (T.mimeType === "text/uri-list")
    return "externalUrl";
  if ((m = T.mimeType) != null && m.startsWith("application/vnd.mcp-ui.remote-dom"))
    return "remoteDom";
}
const Cb = (T) => {
  const { resource: m, onUIAction: E, supportedContentTypes: M, htmlProps: $, remoteDomProps: A } = T, g = yk(m);
  if (M && g && !M.includes(g))
    return /* @__PURE__ */ It.jsxs("p", { className: "text-red-500", children: [
      "Unsupported content type: ",
      g,
      "."
    ] });
  switch (g) {
    case "rawHtml": {
      const { proxy: ee, ...P } = $ || {};
      return /* @__PURE__ */ It.jsx(qS, { resource: m, onUIAction: E, ...P });
    }
    case "externalUrl":
      return /* @__PURE__ */ It.jsx(qS, { resource: m, onUIAction: E, ...$ });
    case "remoteDom":
      return /* @__PURE__ */ It.jsx(
        mk,
        {
          resource: m,
          onUIAction: E,
          library: (A == null ? void 0 : A.library) || Rb,
          ...A
        }
      );
    default:
      return /* @__PURE__ */ It.jsx("p", { className: "text-red-500", children: "Unsupported resource type." });
  }
};
Cb.displayName = "UIResourceRenderer";
function _y(T) {
  if (typeof T == "object" && T !== null)
    return T;
  if (typeof T == "string" && T.trim() !== "")
    try {
      return JSON.parse(T);
    } catch (m) {
      console.error("Failed to parse JSON prop:", { prop: T, error: m });
      return;
    }
}
const gk = (T) => {
  const {
    resource: m,
    supportedContentTypes: E,
    htmlProps: M,
    remoteDomProps: $
  } = T, A = _y(m), g = _y(E), ee = _y(M), P = _y($), K = Gt.useRef(null), B = Gt.useCallback(async (F) => {
    if (K.current) {
      const W = new CustomEvent("onUIAction", {
        detail: F,
        composed: !0,
        bubbles: !0
      });
      K.current.dispatchEvent(W);
    }
  }, []);
  return A ? /* @__PURE__ */ It.jsx("div", { ref: K, children: /* @__PURE__ */ It.jsx(
    Cb,
    {
      resource: A,
      supportedContentTypes: g,
      htmlProps: ee,
      remoteDomProps: P,
      onUIAction: B
    }
  ) }) : /* @__PURE__ */ It.jsx("p", { style: { color: "red" }, children: "Resource not provided." });
};
customElements.define("ui-resource-renderer", zO(gk, {
  props: {
    resource: "json",
    supportedContentTypes: "json",
    htmlProps: "json",
    remoteDomProps: "json"
    /* `onUIAction` is intentionally omitted as the WC implements its own event dispatching mechanism for UI actions.
     * Consumers should listen for the `onUIAction` CustomEvent on the element instead of passing an `onUIAction` prop.
     */
  }
}));
export {
  gk as UIResourceRendererWCWrapper
};
