/*! For license information please see bundle.js.LICENSE.txt */
(() => {
  "use strict";
  !(function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })();
  const e = function (e) {
      const t = [];
      let r = 0;
      for (let n = 0; n < e.length; n++) {
        let i = e.charCodeAt(n);
        i < 128
          ? (t[r++] = i)
          : i < 2048
          ? ((t[r++] = (i >> 6) | 192), (t[r++] = (63 & i) | 128))
          : 55296 == (64512 & i) &&
            n + 1 < e.length &&
            56320 == (64512 & e.charCodeAt(n + 1))
          ? ((i = 65536 + ((1023 & i) << 10) + (1023 & e.charCodeAt(++n))),
            (t[r++] = (i >> 18) | 240),
            (t[r++] = ((i >> 12) & 63) | 128),
            (t[r++] = ((i >> 6) & 63) | 128),
            (t[r++] = (63 & i) | 128))
          : ((t[r++] = (i >> 12) | 224),
            (t[r++] = ((i >> 6) & 63) | 128),
            (t[r++] = (63 & i) | 128));
      }
      return t;
    },
    t = {
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
      HAS_NATIVE_SUPPORT: "function" == typeof atob,
      encodeByteArray(e, t) {
        if (!Array.isArray(e))
          throw Error("encodeByteArray takes an array as a parameter");
        this.init_();
        const r = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
          n = [];
        for (let t = 0; t < e.length; t += 3) {
          const i = e[t],
            s = t + 1 < e.length,
            o = s ? e[t + 1] : 0,
            a = t + 2 < e.length,
            c = a ? e[t + 2] : 0,
            h = i >> 2,
            l = ((3 & i) << 4) | (o >> 4);
          let u = ((15 & o) << 2) | (c >> 6),
            d = 63 & c;
          a || ((d = 64), s || (u = 64)), n.push(r[h], r[l], r[u], r[d]);
        }
        return n.join("");
      },
      encodeString(t, r) {
        return this.HAS_NATIVE_SUPPORT && !r
          ? btoa(t)
          : this.encodeByteArray(e(t), r);
      },
      decodeString(e, t) {
        return this.HAS_NATIVE_SUPPORT && !t
          ? atob(e)
          : (function (e) {
              const t = [];
              let r = 0,
                n = 0;
              for (; r < e.length; ) {
                const i = e[r++];
                if (i < 128) t[n++] = String.fromCharCode(i);
                else if (i > 191 && i < 224) {
                  const s = e[r++];
                  t[n++] = String.fromCharCode(((31 & i) << 6) | (63 & s));
                } else if (i > 239 && i < 365) {
                  const s =
                    (((7 & i) << 18) |
                      ((63 & e[r++]) << 12) |
                      ((63 & e[r++]) << 6) |
                      (63 & e[r++])) -
                    65536;
                  (t[n++] = String.fromCharCode(55296 + (s >> 10))),
                    (t[n++] = String.fromCharCode(56320 + (1023 & s)));
                } else {
                  const s = e[r++],
                    o = e[r++];
                  t[n++] = String.fromCharCode(
                    ((15 & i) << 12) | ((63 & s) << 6) | (63 & o)
                  );
                }
              }
              return t.join("");
            })(this.decodeStringToByteArray(e, t));
      },
      decodeStringToByteArray(e, t) {
        this.init_();
        const r = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
          n = [];
        for (let t = 0; t < e.length; ) {
          const i = r[e.charAt(t++)],
            s = t < e.length ? r[e.charAt(t)] : 0;
          ++t;
          const o = t < e.length ? r[e.charAt(t)] : 64;
          ++t;
          const a = t < e.length ? r[e.charAt(t)] : 64;
          if ((++t, null == i || null == s || null == o || null == a))
            throw Error();
          const c = (i << 2) | (s >> 4);
          if ((n.push(c), 64 !== o)) {
            const e = ((s << 4) & 240) | (o >> 2);
            if ((n.push(e), 64 !== a)) {
              const e = ((o << 6) & 192) | a;
              n.push(e);
            }
          }
        }
        return n;
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
    },
    r = function (r) {
      return (function (r) {
        const n = e(r);
        return t.encodeByteArray(n, !0);
      })(r).replace(/\./g, "");
    };
  class n {
    constructor() {
      (this.reject = () => {}),
        (this.resolve = () => {}),
        (this.promise = new Promise((e, t) => {
          (this.resolve = e), (this.reject = t);
        }));
    }
    wrapCallback(e) {
      return (t, r) => {
        t ? this.reject(t) : this.resolve(r),
          "function" == typeof e &&
            (this.promise.catch(() => {}), 1 === e.length ? e(t) : e(t, r));
      };
    }
  }
  function i() {
    return "undefined" != typeof navigator &&
      "string" == typeof navigator.userAgent
      ? navigator.userAgent
      : "";
  }
  class s extends Error {
    constructor(e, t, r) {
      super(t),
        (this.code = e),
        (this.customData = r),
        (this.name = "FirebaseError"),
        Object.setPrototypeOf(this, s.prototype),
        Error.captureStackTrace &&
          Error.captureStackTrace(this, o.prototype.create);
    }
  }
  class o {
    constructor(e, t, r) {
      (this.service = e), (this.serviceName = t), (this.errors = r);
    }
    create(e, ...t) {
      const r = t[0] || {},
        n = `${this.service}/${e}`,
        i = this.errors[e],
        o = i
          ? (function (e, t) {
              return e.replace(a, (e, r) => {
                const n = t[r];
                return null != n ? String(n) : `<${r}?>`;
              });
            })(i, r)
          : "Error",
        c = `${this.serviceName}: ${o} (${n}).`;
      return new s(n, c, r);
    }
  }
  const a = /\{\$([^}]+)}/g;
  function c(e, t) {
    if (e === t) return !0;
    const r = Object.keys(e),
      n = Object.keys(t);
    for (const i of r) {
      if (!n.includes(i)) return !1;
      const r = e[i],
        s = t[i];
      if (h(r) && h(s)) {
        if (!c(r, s)) return !1;
      } else if (r !== s) return !1;
    }
    for (const e of n) if (!r.includes(e)) return !1;
    return !0;
  }
  function h(e) {
    return null !== e && "object" == typeof e;
  }
  function l(e) {
    const t = [];
    for (const [r, n] of Object.entries(e))
      Array.isArray(n)
        ? n.forEach((e) => {
            t.push(encodeURIComponent(r) + "=" + encodeURIComponent(e));
          })
        : t.push(encodeURIComponent(r) + "=" + encodeURIComponent(n));
    return t.length ? "&" + t.join("&") : "";
  }
  function u(e) {
    const t = {};
    return (
      e
        .replace(/^\?/, "")
        .split("&")
        .forEach((e) => {
          if (e) {
            const [r, n] = e.split("=");
            t[decodeURIComponent(r)] = decodeURIComponent(n);
          }
        }),
      t
    );
  }
  function d(e) {
    const t = e.indexOf("?");
    if (!t) return "";
    const r = e.indexOf("#", t);
    return e.substring(t, r > 0 ? r : void 0);
  }
  class p {
    constructor(e, t) {
      (this.observers = []),
        (this.unsubscribes = []),
        (this.observerCount = 0),
        (this.task = Promise.resolve()),
        (this.finalized = !1),
        (this.onNoObservers = t),
        this.task
          .then(() => {
            e(this);
          })
          .catch((e) => {
            this.error(e);
          });
    }
    next(e) {
      this.forEachObserver((t) => {
        t.next(e);
      });
    }
    error(e) {
      this.forEachObserver((t) => {
        t.error(e);
      }),
        this.close(e);
    }
    complete() {
      this.forEachObserver((e) => {
        e.complete();
      }),
        this.close();
    }
    subscribe(e, t, r) {
      let n;
      if (void 0 === e && void 0 === t && void 0 === r)
        throw new Error("Missing Observer.");
      (n = (function (e, t) {
        if ("object" != typeof e || null === e) return !1;
        for (const t of ["next", "error", "complete"])
          if (t in e && "function" == typeof e[t]) return !0;
        return !1;
      })(e)
        ? e
        : { next: e, error: t, complete: r }),
        void 0 === n.next && (n.next = f),
        void 0 === n.error && (n.error = f),
        void 0 === n.complete && (n.complete = f);
      const i = this.unsubscribeOne.bind(this, this.observers.length);
      return (
        this.finalized &&
          this.task.then(() => {
            try {
              this.finalError ? n.error(this.finalError) : n.complete();
            } catch (e) {}
          }),
        this.observers.push(n),
        i
      );
    }
    unsubscribeOne(e) {
      void 0 !== this.observers &&
        void 0 !== this.observers[e] &&
        (delete this.observers[e],
        (this.observerCount -= 1),
        0 === this.observerCount &&
          void 0 !== this.onNoObservers &&
          this.onNoObservers(this));
    }
    forEachObserver(e) {
      if (!this.finalized)
        for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
    }
    sendOne(e, t) {
      this.task.then(() => {
        if (void 0 !== this.observers && void 0 !== this.observers[e])
          try {
            t(this.observers[e]);
          } catch (e) {
            "undefined" != typeof console && console.error && console.error(e);
          }
      });
    }
    close(e) {
      this.finalized ||
        ((this.finalized = !0),
        void 0 !== e && (this.finalError = e),
        this.task.then(() => {
          (this.observers = void 0), (this.onNoObservers = void 0);
        }));
    }
  }
  function f() {}
  function m(e) {
    return e && e._delegate ? e._delegate : e;
  }
  class g {
    constructor(e, t, r) {
      (this.name = e),
        (this.instanceFactory = t),
        (this.type = r),
        (this.multipleInstances = !1),
        (this.serviceProps = {}),
        (this.instantiationMode = "LAZY"),
        (this.onInstanceCreated = null);
    }
    setInstantiationMode(e) {
      return (this.instantiationMode = e), this;
    }
    setMultipleInstances(e) {
      return (this.multipleInstances = e), this;
    }
    setServiceProps(e) {
      return (this.serviceProps = e), this;
    }
    setInstanceCreatedCallback(e) {
      return (this.onInstanceCreated = e), this;
    }
  }
  const v = "[DEFAULT]";
  class y {
    constructor(e, t) {
      (this.name = e),
        (this.container = t),
        (this.component = null),
        (this.instances = new Map()),
        (this.instancesDeferred = new Map()),
        (this.instancesOptions = new Map()),
        (this.onInitCallbacks = new Map());
    }
    get(e) {
      const t = this.normalizeInstanceIdentifier(e);
      if (!this.instancesDeferred.has(t)) {
        const e = new n();
        if (
          (this.instancesDeferred.set(t, e),
          this.isInitialized(t) || this.shouldAutoInitialize())
        )
          try {
            const r = this.getOrInitializeService({ instanceIdentifier: t });
            r && e.resolve(r);
          } catch (e) {}
      }
      return this.instancesDeferred.get(t).promise;
    }
    getImmediate(e) {
      var t;
      const r = this.normalizeInstanceIdentifier(
          null == e ? void 0 : e.identifier
        ),
        n = null !== (t = null == e ? void 0 : e.optional) && void 0 !== t && t;
      if (!this.isInitialized(r) && !this.shouldAutoInitialize()) {
        if (n) return null;
        throw Error(`Service ${this.name} is not available`);
      }
      try {
        return this.getOrInitializeService({ instanceIdentifier: r });
      } catch (e) {
        if (n) return null;
        throw e;
      }
    }
    getComponent() {
      return this.component;
    }
    setComponent(e) {
      if (e.name !== this.name)
        throw Error(
          `Mismatching Component ${e.name} for Provider ${this.name}.`
        );
      if (this.component)
        throw Error(`Component for ${this.name} has already been provided`);
      if (((this.component = e), this.shouldAutoInitialize())) {
        if (
          (function (e) {
            return "EAGER" === e.instantiationMode;
          })(e)
        )
          try {
            this.getOrInitializeService({ instanceIdentifier: v });
          } catch (e) {}
        for (const [e, t] of this.instancesDeferred.entries()) {
          const r = this.normalizeInstanceIdentifier(e);
          try {
            const e = this.getOrInitializeService({ instanceIdentifier: r });
            t.resolve(e);
          } catch (e) {}
        }
      }
    }
    clearInstance(e = "[DEFAULT]") {
      this.instancesDeferred.delete(e),
        this.instancesOptions.delete(e),
        this.instances.delete(e);
    }
    async delete() {
      const e = Array.from(this.instances.values());
      await Promise.all([
        ...e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()),
        ...e.filter((e) => "_delete" in e).map((e) => e._delete()),
      ]);
    }
    isComponentSet() {
      return null != this.component;
    }
    isInitialized(e = "[DEFAULT]") {
      return this.instances.has(e);
    }
    getOptions(e = "[DEFAULT]") {
      return this.instancesOptions.get(e) || {};
    }
    initialize(e = {}) {
      const { options: t = {} } = e,
        r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
      if (this.isInitialized(r))
        throw Error(`${this.name}(${r}) has already been initialized`);
      if (!this.isComponentSet())
        throw Error(`Component ${this.name} has not been registered yet`);
      const n = this.getOrInitializeService({
        instanceIdentifier: r,
        options: t,
      });
      for (const [e, t] of this.instancesDeferred.entries())
        r === this.normalizeInstanceIdentifier(e) && t.resolve(n);
      return n;
    }
    onInit(e, t) {
      var r;
      const n = this.normalizeInstanceIdentifier(t),
        i =
          null !== (r = this.onInitCallbacks.get(n)) && void 0 !== r
            ? r
            : new Set();
      i.add(e), this.onInitCallbacks.set(n, i);
      const s = this.instances.get(n);
      return (
        s && e(s, n),
        () => {
          i.delete(e);
        }
      );
    }
    invokeOnInitCallbacks(e, t) {
      const r = this.onInitCallbacks.get(t);
      if (r)
        for (const n of r)
          try {
            n(e, t);
          } catch (e) {}
    }
    getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
      let r = this.instances.get(e);
      if (
        !r &&
        this.component &&
        ((r = this.component.instanceFactory(this.container, {
          instanceIdentifier: ((n = e), n === v ? void 0 : n),
          options: t,
        })),
        this.instances.set(e, r),
        this.instancesOptions.set(e, t),
        this.invokeOnInitCallbacks(r, e),
        this.component.onInstanceCreated)
      )
        try {
          this.component.onInstanceCreated(this.container, e, r);
        } catch (e) {}
      var n;
      return r || null;
    }
    normalizeInstanceIdentifier(e = "[DEFAULT]") {
      return this.component ? (this.component.multipleInstances ? e : v) : e;
    }
    shouldAutoInitialize() {
      return (
        !!this.component && "EXPLICIT" !== this.component.instantiationMode
      );
    }
  }
  class _ {
    constructor(e) {
      (this.name = e), (this.providers = new Map());
    }
    addComponent(e) {
      const t = this.getProvider(e.name);
      if (t.isComponentSet())
        throw new Error(
          `Component ${e.name} has already been registered with ${this.name}`
        );
      t.setComponent(e);
    }
    addOrOverwriteComponent(e) {
      this.getProvider(e.name).isComponentSet() &&
        this.providers.delete(e.name),
        this.addComponent(e);
    }
    getProvider(e) {
      if (this.providers.has(e)) return this.providers.get(e);
      const t = new y(e, this);
      return this.providers.set(e, t), t;
    }
    getProviders() {
      return Array.from(this.providers.values());
    }
  }
  const I = [];
  var w;
  !(function (e) {
    (e[(e.DEBUG = 0)] = "DEBUG"),
      (e[(e.VERBOSE = 1)] = "VERBOSE"),
      (e[(e.INFO = 2)] = "INFO"),
      (e[(e.WARN = 3)] = "WARN"),
      (e[(e.ERROR = 4)] = "ERROR"),
      (e[(e.SILENT = 5)] = "SILENT");
  })(w || (w = {}));
  const b = {
      debug: w.DEBUG,
      verbose: w.VERBOSE,
      info: w.INFO,
      warn: w.WARN,
      error: w.ERROR,
      silent: w.SILENT,
    },
    k = w.INFO,
    T = {
      [w.DEBUG]: "log",
      [w.VERBOSE]: "log",
      [w.INFO]: "info",
      [w.WARN]: "warn",
      [w.ERROR]: "error",
    },
    E = (e, t, ...r) => {
      if (t < e.logLevel) return;
      const n = new Date().toISOString(),
        i = T[t];
      if (!i)
        throw new Error(
          `Attempted to log a message with an invalid logType (value: ${t})`
        );
      console[i](`[${n}]  ${e.name}:`, ...r);
    };
  class S {
    constructor(e) {
      (this.name = e),
        (this._logLevel = k),
        (this._logHandler = E),
        (this._userLogHandler = null),
        I.push(this);
    }
    get logLevel() {
      return this._logLevel;
    }
    set logLevel(e) {
      if (!(e in w))
        throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
      this._logLevel = e;
    }
    setLogLevel(e) {
      this._logLevel = "string" == typeof e ? b[e] : e;
    }
    get logHandler() {
      return this._logHandler;
    }
    set logHandler(e) {
      if ("function" != typeof e)
        throw new TypeError(
          "Value assigned to `logHandler` must be a function"
        );
      this._logHandler = e;
    }
    get userLogHandler() {
      return this._userLogHandler;
    }
    set userLogHandler(e) {
      this._userLogHandler = e;
    }
    debug(...e) {
      this._userLogHandler && this._userLogHandler(this, w.DEBUG, ...e),
        this._logHandler(this, w.DEBUG, ...e);
    }
    log(...e) {
      this._userLogHandler && this._userLogHandler(this, w.VERBOSE, ...e),
        this._logHandler(this, w.VERBOSE, ...e);
    }
    info(...e) {
      this._userLogHandler && this._userLogHandler(this, w.INFO, ...e),
        this._logHandler(this, w.INFO, ...e);
    }
    warn(...e) {
      this._userLogHandler && this._userLogHandler(this, w.WARN, ...e),
        this._logHandler(this, w.WARN, ...e);
    }
    error(...e) {
      this._userLogHandler && this._userLogHandler(this, w.ERROR, ...e),
        this._logHandler(this, w.ERROR, ...e);
    }
  }
  let R, O;
  const C = new WeakMap(),
    A = new WeakMap(),
    N = new WeakMap(),
    P = new WeakMap(),
    D = new WeakMap();
  let L = {
    get(e, t, r) {
      if (e instanceof IDBTransaction) {
        if ("done" === t) return A.get(e);
        if ("objectStoreNames" === t) return e.objectStoreNames || N.get(e);
        if ("store" === t)
          return r.objectStoreNames[1]
            ? void 0
            : r.objectStore(r.objectStoreNames[0]);
      }
      return U(e[t]);
    },
    set: (e, t, r) => ((e[t] = r), !0),
    has: (e, t) =>
      (e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
      t in e,
  };
  function M(e) {
    return "function" == typeof e
      ? (t = e) !== IDBDatabase.prototype.transaction ||
        "objectStoreNames" in IDBTransaction.prototype
        ? (
            O ||
            (O = [
              IDBCursor.prototype.advance,
              IDBCursor.prototype.continue,
              IDBCursor.prototype.continuePrimaryKey,
            ])
          ).includes(t)
          ? function (...e) {
              return t.apply(x(this), e), U(C.get(this));
            }
          : function (...e) {
              return U(t.apply(x(this), e));
            }
        : function (e, ...r) {
            const n = t.call(x(this), e, ...r);
            return N.set(n, e.sort ? e.sort() : [e]), U(n);
          }
      : (e instanceof IDBTransaction &&
          (function (e) {
            if (A.has(e)) return;
            const t = new Promise((t, r) => {
              const n = () => {
                  e.removeEventListener("complete", i),
                    e.removeEventListener("error", s),
                    e.removeEventListener("abort", s);
                },
                i = () => {
                  t(), n();
                },
                s = () => {
                  r(e.error || new DOMException("AbortError", "AbortError")),
                    n();
                };
              e.addEventListener("complete", i),
                e.addEventListener("error", s),
                e.addEventListener("abort", s);
            });
            A.set(e, t);
          })(e),
        (r = e),
        (
          R ||
          (R = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
          ])
        ).some((e) => r instanceof e)
          ? new Proxy(e, L)
          : e);
    var t, r;
  }
  function U(e) {
    if (e instanceof IDBRequest)
      return (function (e) {
        const t = new Promise((t, r) => {
          const n = () => {
              e.removeEventListener("success", i),
                e.removeEventListener("error", s);
            },
            i = () => {
              t(U(e.result)), n();
            },
            s = () => {
              r(e.error), n();
            };
          e.addEventListener("success", i), e.addEventListener("error", s);
        });
        return (
          t
            .then((t) => {
              t instanceof IDBCursor && C.set(t, e);
            })
            .catch(() => {}),
          D.set(t, e),
          t
        );
      })(e);
    if (P.has(e)) return P.get(e);
    const t = M(e);
    return t !== e && (P.set(e, t), D.set(t, e)), t;
  }
  const x = (e) => D.get(e),
    j = ["get", "getKey", "getAll", "getAllKeys", "count"],
    F = ["put", "add", "delete", "clear"],
    V = new Map();
  function H(e, t) {
    if (!(e instanceof IDBDatabase) || t in e || "string" != typeof t) return;
    if (V.get(t)) return V.get(t);
    const r = t.replace(/FromIndex$/, ""),
      n = t !== r,
      i = F.includes(r);
    if (
      !(r in (n ? IDBIndex : IDBObjectStore).prototype) ||
      (!i && !j.includes(r))
    )
      return;
    const s = async function (e, ...t) {
      const s = this.transaction(e, i ? "readwrite" : "readonly");
      let o = s.store;
      return (
        n && (o = o.index(t.shift())),
        (await Promise.all([o[r](...t), i && s.done]))[0]
      );
    };
    return V.set(t, s), s;
  }
  var B;
  (B = L),
    (L = {
      ...B,
      get: (e, t, r) => H(e, t) || B.get(e, t, r),
      has: (e, t) => !!H(e, t) || B.has(e, t),
    });
  class z {
    constructor(e) {
      this.container = e;
    }
    getPlatformInfoString() {
      return this.container
        .getProviders()
        .map((e) => {
          if (
            (function (e) {
              const t = e.getComponent();
              return "VERSION" === (null == t ? void 0 : t.type);
            })(e)
          ) {
            const t = e.getImmediate();
            return `${t.library}/${t.version}`;
          }
          return null;
        })
        .filter((e) => e)
        .join(" ");
    }
  }
  const W = "@firebase/app",
    $ = "0.7.30",
    q = new S("@firebase/app"),
    K = {
      [W]: "fire-core",
      "@firebase/app-compat": "fire-core-compat",
      "@firebase/analytics": "fire-analytics",
      "@firebase/analytics-compat": "fire-analytics-compat",
      "@firebase/app-check": "fire-app-check",
      "@firebase/app-check-compat": "fire-app-check-compat",
      "@firebase/auth": "fire-auth",
      "@firebase/auth-compat": "fire-auth-compat",
      "@firebase/database": "fire-rtdb",
      "@firebase/database-compat": "fire-rtdb-compat",
      "@firebase/functions": "fire-fn",
      "@firebase/functions-compat": "fire-fn-compat",
      "@firebase/installations": "fire-iid",
      "@firebase/installations-compat": "fire-iid-compat",
      "@firebase/messaging": "fire-fcm",
      "@firebase/messaging-compat": "fire-fcm-compat",
      "@firebase/performance": "fire-perf",
      "@firebase/performance-compat": "fire-perf-compat",
      "@firebase/remote-config": "fire-rc",
      "@firebase/remote-config-compat": "fire-rc-compat",
      "@firebase/storage": "fire-gcs",
      "@firebase/storage-compat": "fire-gcs-compat",
      "@firebase/firestore": "fire-fst",
      "@firebase/firestore-compat": "fire-fst-compat",
      "fire-js": "fire-js",
      firebase: "fire-js-all",
    },
    G = new Map(),
    J = new Map();
  function X(e, t) {
    try {
      e.container.addComponent(t);
    } catch (r) {
      q.debug(
        `Component ${t.name} failed to register with FirebaseApp ${e.name}`,
        r
      );
    }
  }
  function Y(e) {
    const t = e.name;
    if (J.has(t))
      return (
        q.debug(`There were multiple attempts to register component ${t}.`), !1
      );
    J.set(t, e);
    for (const t of G.values()) X(t, e);
    return !0;
  }
  function Q(e, t) {
    const r = e.container
      .getProvider("heartbeat")
      .getImmediate({ optional: !0 });
    return r && r.triggerHeartbeat(), e.container.getProvider(t);
  }
  const Z = new o("app", "Firebase", {
    "no-app":
      "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
    "bad-app-name": "Illegal App name: '{$appName}",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
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
  });
  class ee {
    constructor(e, t, r) {
      (this._isDeleted = !1),
        (this._options = Object.assign({}, e)),
        (this._config = Object.assign({}, t)),
        (this._name = t.name),
        (this._automaticDataCollectionEnabled =
          t.automaticDataCollectionEnabled),
        (this._container = r),
        this.container.addComponent(new g("app", () => this, "PUBLIC"));
    }
    get automaticDataCollectionEnabled() {
      return this.checkDestroyed(), this._automaticDataCollectionEnabled;
    }
    set automaticDataCollectionEnabled(e) {
      this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
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
    set isDeleted(e) {
      this._isDeleted = e;
    }
    checkDestroyed() {
      if (this.isDeleted)
        throw Z.create("app-deleted", { appName: this._name });
    }
  }
  const te = "9.9.2";
  function re(e, t, r) {
    var n;
    let i = null !== (n = K[e]) && void 0 !== n ? n : e;
    r && (i += `-${r}`);
    const s = i.match(/\s|\//),
      o = t.match(/\s|\//);
    if (s || o) {
      const e = [`Unable to register library "${i}" with version "${t}":`];
      return (
        s &&
          e.push(
            `library name "${i}" contains illegal characters (whitespace or "/")`
          ),
        s && o && e.push("and"),
        o &&
          e.push(
            `version name "${t}" contains illegal characters (whitespace or "/")`
          ),
        void q.warn(e.join(" "))
      );
    }
    Y(new g(`${i}-version`, () => ({ library: i, version: t }), "VERSION"));
  }
  const ne = "firebase-heartbeat-store";
  let ie = null;
  function se() {
    return (
      ie ||
        (ie = (function (
          e,
          t,
          { blocked: r, upgrade: n, blocking: i, terminated: s } = {}
        ) {
          const o = indexedDB.open(e, t),
            a = U(o);
          return (
            n &&
              o.addEventListener("upgradeneeded", (e) => {
                n(U(o.result), e.oldVersion, e.newVersion, U(o.transaction));
              }),
            r && o.addEventListener("blocked", () => r()),
            a
              .then((e) => {
                s && e.addEventListener("close", () => s()),
                  i && e.addEventListener("versionchange", () => i());
              })
              .catch(() => {}),
            a
          );
        })("firebase-heartbeat-database", 1, {
          upgrade: (e, t) => {
            0 === t && e.createObjectStore(ne);
          },
        }).catch((e) => {
          throw Z.create("idb-open", { originalErrorMessage: e.message });
        })),
      ie
    );
  }
  async function oe(e, t) {
    var r;
    try {
      const r = (await se()).transaction(ne, "readwrite"),
        n = r.objectStore(ne);
      return await n.put(t, ae(e)), r.done;
    } catch (e) {
      if (e instanceof s) q.warn(e.message);
      else {
        const t = Z.create("idb-set", {
          originalErrorMessage:
            null === (r = e) || void 0 === r ? void 0 : r.message,
        });
        q.warn(t.message);
      }
    }
  }
  function ae(e) {
    return `${e.name}!${e.options.appId}`;
  }
  class ce {
    constructor(e) {
      (this.container = e), (this._heartbeatsCache = null);
      const t = this.container.getProvider("app").getImmediate();
      (this._storage = new le(t)),
        (this._heartbeatsCachePromise = this._storage
          .read()
          .then((e) => ((this._heartbeatsCache = e), e)));
    }
    async triggerHeartbeat() {
      const e = this.container
          .getProvider("platform-logger")
          .getImmediate()
          .getPlatformInfoString(),
        t = he();
      if (
        (null === this._heartbeatsCache &&
          (this._heartbeatsCache = await this._heartbeatsCachePromise),
        this._heartbeatsCache.lastSentHeartbeatDate !== t &&
          !this._heartbeatsCache.heartbeats.some((e) => e.date === t))
      )
        return (
          this._heartbeatsCache.heartbeats.push({ date: t, agent: e }),
          (this._heartbeatsCache.heartbeats =
            this._heartbeatsCache.heartbeats.filter((e) => {
              const t = new Date(e.date).valueOf();
              return Date.now() - t <= 2592e6;
            })),
          this._storage.overwrite(this._heartbeatsCache)
        );
    }
    async getHeartbeatsHeader() {
      if (
        (null === this._heartbeatsCache && (await this._heartbeatsCachePromise),
        null === this._heartbeatsCache ||
          0 === this._heartbeatsCache.heartbeats.length)
      )
        return "";
      const e = he(),
        { heartbeatsToSend: t, unsentEntries: n } = (function (e, t = 1024) {
          const r = [];
          let n = e.slice();
          for (const i of e) {
            const e = r.find((e) => e.agent === i.agent);
            if (e) {
              if ((e.dates.push(i.date), ue(r) > t)) {
                e.dates.pop();
                break;
              }
            } else if (
              (r.push({ agent: i.agent, dates: [i.date] }), ue(r) > t)
            ) {
              r.pop();
              break;
            }
            n = n.slice(1);
          }
          return { heartbeatsToSend: r, unsentEntries: n };
        })(this._heartbeatsCache.heartbeats),
        i = r(JSON.stringify({ version: 2, heartbeats: t }));
      return (
        (this._heartbeatsCache.lastSentHeartbeatDate = e),
        n.length > 0
          ? ((this._heartbeatsCache.heartbeats = n),
            await this._storage.overwrite(this._heartbeatsCache))
          : ((this._heartbeatsCache.heartbeats = []),
            this._storage.overwrite(this._heartbeatsCache)),
        i
      );
    }
  }
  function he() {
    return new Date().toISOString().substring(0, 10);
  }
  class le {
    constructor(e) {
      (this.app = e),
        (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
    }
    async runIndexedDBEnvironmentCheck() {
      return (
        "object" == typeof indexedDB &&
        new Promise((e, t) => {
          try {
            let r = !0;
            const n = "validate-browser-context-for-indexeddb-analytics-module",
              i = self.indexedDB.open(n);
            (i.onsuccess = () => {
              i.result.close(), r || self.indexedDB.deleteDatabase(n), e(!0);
            }),
              (i.onupgradeneeded = () => {
                r = !1;
              }),
              (i.onerror = () => {
                var e;
                t(
                  (null === (e = i.error) || void 0 === e
                    ? void 0
                    : e.message) || ""
                );
              });
          } catch (e) {
            t(e);
          }
        })
          .then(() => !0)
          .catch(() => !1)
      );
    }
    async read() {
      if (await this._canUseIndexedDBPromise) {
        return (
          (await (async function (e) {
            var t;
            try {
              return (await se()).transaction(ne).objectStore(ne).get(ae(e));
            } catch (e) {
              if (e instanceof s) q.warn(e.message);
              else {
                const r = Z.create("idb-get", {
                  originalErrorMessage:
                    null === (t = e) || void 0 === t ? void 0 : t.message,
                });
                q.warn(r.message);
              }
            }
          })(this.app)) || { heartbeats: [] }
        );
      }
      return { heartbeats: [] };
    }
    async overwrite(e) {
      var t;
      if (await this._canUseIndexedDBPromise) {
        const r = await this.read();
        return oe(this.app, {
          lastSentHeartbeatDate:
            null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
              ? t
              : r.lastSentHeartbeatDate,
          heartbeats: e.heartbeats,
        });
      }
    }
    async add(e) {
      var t;
      if (await this._canUseIndexedDBPromise) {
        const r = await this.read();
        return oe(this.app, {
          lastSentHeartbeatDate:
            null !== (t = e.lastSentHeartbeatDate) && void 0 !== t
              ? t
              : r.lastSentHeartbeatDate,
          heartbeats: [...r.heartbeats, ...e.heartbeats],
        });
      }
    }
  }
  function ue(e) {
    return r(JSON.stringify({ version: 2, heartbeats: e })).length;
  }
  function de(e, t) {
    var r = {};
    for (var n in e)
      Object.prototype.hasOwnProperty.call(e, n) &&
        t.indexOf(n) < 0 &&
        (r[n] = e[n]);
    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
      var i = 0;
      for (n = Object.getOwnPropertySymbols(e); i < n.length; i++)
        t.indexOf(n[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
          (r[n[i]] = e[n[i]]);
    }
    return r;
  }
  Y(new g("platform-logger", (e) => new z(e), "PRIVATE")),
    Y(new g("heartbeat", (e) => new ce(e), "PRIVATE")),
    re(W, $, ""),
    re(W, $, "esm2017"),
    re("fire-js", ""),
    re("firebase", "9.9.2", "app"),
    Object.create,
    Object.create;
  const pe = function () {
      return {
        "dependent-sdk-initialized-before-auth":
          "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
      };
    },
    fe = new o("auth", "Firebase", {
      "dependent-sdk-initialized-before-auth":
        "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
    }),
    me = new S("@firebase/auth");
  function ge(e, ...t) {
    me.logLevel <= w.ERROR && me.error(`Auth (9.9.2): ${e}`, ...t);
  }
  function ve(e, ...t) {
    throw _e(e, ...t);
  }
  function ye(e, ...t) {
    return _e(e, ...t);
  }
  function _e(e, ...t) {
    if ("string" != typeof e) {
      const r = t[0],
        n = [...t.slice(1)];
      return n[0] && (n[0].appName = e.name), e._errorFactory.create(r, ...n);
    }
    return fe.create(e, ...t);
  }
  function Ie(e, t, ...r) {
    if (!e) throw _e(t, ...r);
  }
  function we(e) {
    const t = "INTERNAL ASSERTION FAILED: " + e;
    throw (ge(t), new Error(t));
  }
  function be(e, t) {
    e || we(t);
  }
  const ke = new Map();
  function Te(e) {
    be(e instanceof Function, "Expected a class definition");
    let t = ke.get(e);
    return t
      ? (be(t instanceof e, "Instance stored in cache mismatched with class"),
        t)
      : ((t = new e()), ke.set(e, t), t);
  }
  function Ee() {
    var e;
    return (
      ("undefined" != typeof self &&
        (null === (e = self.location) || void 0 === e ? void 0 : e.href)) ||
      ""
    );
  }
  function Se() {
    return "http:" === Re() || "https:" === Re();
  }
  function Re() {
    var e;
    return (
      ("undefined" != typeof self &&
        (null === (e = self.location) || void 0 === e ? void 0 : e.protocol)) ||
      null
    );
  }
  class Oe {
    constructor(e, t) {
      (this.shortDelay = e),
        (this.longDelay = t),
        be(t > e, "Short delay should be less than long delay!"),
        (this.isMobile =
          ("undefined" != typeof window &&
            !!(window.cordova || window.phonegap || window.PhoneGap) &&
            /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(i())) ||
          ("object" == typeof navigator &&
            "ReactNative" === navigator.product));
    }
    get() {
      return "undefined" != typeof navigator &&
        navigator &&
        "onLine" in navigator &&
        "boolean" == typeof navigator.onLine &&
        (Se() ||
          (function () {
            const e =
              "object" == typeof chrome
                ? chrome.runtime
                : "object" == typeof browser
                ? browser.runtime
                : void 0;
            return "object" == typeof e && void 0 !== e.id;
          })() ||
          "connection" in navigator) &&
        !navigator.onLine
        ? Math.min(5e3, this.shortDelay)
        : this.isMobile
        ? this.longDelay
        : this.shortDelay;
    }
  }
  function Ce(e, t) {
    be(e.emulator, "Emulator should always be set here");
    const { url: r } = e.emulator;
    return t ? `${r}${t.startsWith("/") ? t.slice(1) : t}` : r;
  }
  class Ae {
    static initialize(e, t, r) {
      (this.fetchImpl = e),
        t && (this.headersImpl = t),
        r && (this.responseImpl = r);
    }
    static fetch() {
      return this.fetchImpl
        ? this.fetchImpl
        : "undefined" != typeof self && "fetch" in self
        ? self.fetch
        : void we(
            "Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
          );
    }
    static headers() {
      return this.headersImpl
        ? this.headersImpl
        : "undefined" != typeof self && "Headers" in self
        ? self.Headers
        : void we(
            "Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
          );
    }
    static response() {
      return this.responseImpl
        ? this.responseImpl
        : "undefined" != typeof self && "Response" in self
        ? self.Response
        : void we(
            "Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill"
          );
    }
  }
  const Ne = {
      CREDENTIAL_MISMATCH: "custom-token-mismatch",
      MISSING_CUSTOM_TOKEN: "internal-error",
      INVALID_IDENTIFIER: "invalid-email",
      MISSING_CONTINUE_URI: "internal-error",
      INVALID_PASSWORD: "wrong-password",
      MISSING_PASSWORD: "internal-error",
      EMAIL_EXISTS: "email-already-in-use",
      PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
      INVALID_IDP_RESPONSE: "invalid-credential",
      INVALID_PENDING_TOKEN: "invalid-credential",
      FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
      MISSING_REQ_TYPE: "internal-error",
      EMAIL_NOT_FOUND: "user-not-found",
      RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
      EXPIRED_OOB_CODE: "expired-action-code",
      INVALID_OOB_CODE: "invalid-action-code",
      MISSING_OOB_CODE: "internal-error",
      CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
      INVALID_ID_TOKEN: "invalid-user-token",
      TOKEN_EXPIRED: "user-token-expired",
      USER_NOT_FOUND: "user-token-expired",
      TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
      INVALID_CODE: "invalid-verification-code",
      INVALID_SESSION_INFO: "invalid-verification-id",
      INVALID_TEMPORARY_PROOF: "invalid-credential",
      MISSING_SESSION_INFO: "missing-verification-id",
      SESSION_EXPIRED: "code-expired",
      MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
      UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
      INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
      ADMIN_ONLY_OPERATION: "admin-restricted-operation",
      INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
      MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
      MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
      MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
      SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
      SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
      BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
    },
    Pe = new Oe(3e4, 6e4);
  function De(e, t) {
    return e.tenantId && !t.tenantId
      ? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
      : t;
  }
  async function Le(e, t, r, n, i = {}) {
    return Me(e, i, async () => {
      let i = {},
        s = {};
      n && ("GET" === t ? (s = n) : (i = { body: JSON.stringify(n) }));
      const o = l(Object.assign({ key: e.config.apiKey }, s)).slice(1),
        a = await e._getAdditionalHeaders();
      return (
        (a["Content-Type"] = "application/json"),
        e.languageCode && (a["X-Firebase-Locale"] = e.languageCode),
        Ae.fetch()(
          xe(e, e.config.apiHost, r, o),
          Object.assign(
            { method: t, headers: a, referrerPolicy: "no-referrer" },
            i
          )
        )
      );
    });
  }
  async function Me(e, t, r) {
    e._canInitEmulator = !1;
    const n = Object.assign(Object.assign({}, Ne), t);
    try {
      const t = new je(e),
        i = await Promise.race([r(), t.promise]);
      t.clearNetworkTimeout();
      const s = await i.json();
      if ("needConfirmation" in s)
        throw Fe(e, "account-exists-with-different-credential", s);
      if (i.ok && !("errorMessage" in s)) return s;
      {
        const t = i.ok ? s.errorMessage : s.error.message,
          [r, a] = t.split(" : ");
        if ("FEDERATED_USER_ID_ALREADY_LINKED" === r)
          throw Fe(e, "credential-already-in-use", s);
        if ("EMAIL_EXISTS" === r) throw Fe(e, "email-already-in-use", s);
        if ("USER_DISABLED" === r) throw Fe(e, "user-disabled", s);
        const c = n[r] || r.toLowerCase().replace(/[_\s]+/g, "-");
        if (a)
          throw (function (e, t, r) {
            const n = Object.assign(Object.assign({}, pe()), { [t]: r });
            return new o("auth", "Firebase", n).create(t, { appName: e.name });
          })(e, c, a);
        ve(e, c);
      }
    } catch (t) {
      if (t instanceof s) throw t;
      ve(e, "network-request-failed");
    }
  }
  async function Ue(e, t, r, n, i = {}) {
    const s = await Le(e, t, r, n, i);
    return (
      "mfaPendingCredential" in s &&
        ve(e, "multi-factor-auth-required", { _serverResponse: s }),
      s
    );
  }
  function xe(e, t, r, n) {
    const i = `${t}${r}?${n}`;
    return e.config.emulator ? Ce(e.config, i) : `${e.config.apiScheme}://${i}`;
  }
  class je {
    constructor(e) {
      (this.auth = e),
        (this.timer = null),
        (this.promise = new Promise((e, t) => {
          this.timer = setTimeout(
            () => t(ye(this.auth, "network-request-failed")),
            Pe.get()
          );
        }));
    }
    clearNetworkTimeout() {
      clearTimeout(this.timer);
    }
  }
  function Fe(e, t, r) {
    const n = { appName: e.name };
    r.email && (n.email = r.email),
      r.phoneNumber && (n.phoneNumber = r.phoneNumber);
    const i = ye(e, t, n);
    return (i.customData._tokenResponse = r), i;
  }
  function Ve(e) {
    if (e)
      try {
        const t = new Date(Number(e));
        if (!isNaN(t.getTime())) return t.toUTCString();
      } catch (e) {}
  }
  function He(e) {
    return 1e3 * Number(e);
  }
  function Be(e) {
    var r;
    const [n, i, s] = e.split(".");
    if (void 0 === n || void 0 === i || void 0 === s)
      return ge("JWT malformed, contained fewer than 3 sections"), null;
    try {
      const e = (function (e) {
        try {
          return t.decodeString(e, !0);
        } catch (e) {
          console.error("base64Decode failed: ", e);
        }
        return null;
      })(i);
      return e
        ? JSON.parse(e)
        : (ge("Failed to decode base64 JWT payload"), null);
    } catch (e) {
      return (
        ge(
          "Caught error parsing JWT payload as JSON",
          null === (r = e) || void 0 === r ? void 0 : r.toString()
        ),
        null
      );
    }
  }
  async function ze(e, t, r = !1) {
    if (r) return t;
    try {
      return await t;
    } catch (t) {
      throw (
        (t instanceof s &&
          (function ({ code: e }) {
            return (
              "auth/user-disabled" === e || "auth/user-token-expired" === e
            );
          })(t) &&
          e.auth.currentUser === e &&
          (await e.auth.signOut()),
        t)
      );
    }
  }
  class We {
    constructor(e) {
      (this.user = e),
        (this.isRunning = !1),
        (this.timerId = null),
        (this.errorBackoff = 3e4);
    }
    _start() {
      this.isRunning || ((this.isRunning = !0), this.schedule());
    }
    _stop() {
      this.isRunning &&
        ((this.isRunning = !1),
        null !== this.timerId && clearTimeout(this.timerId));
    }
    getInterval(e) {
      var t;
      if (e) {
        const e = this.errorBackoff;
        return (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), e;
      }
      {
        this.errorBackoff = 3e4;
        const e =
          (null !== (t = this.user.stsTokenManager.expirationTime) &&
          void 0 !== t
            ? t
            : 0) -
          Date.now() -
          3e5;
        return Math.max(0, e);
      }
    }
    schedule(e = !1) {
      if (!this.isRunning) return;
      const t = this.getInterval(e);
      this.timerId = setTimeout(async () => {
        await this.iteration();
      }, t);
    }
    async iteration() {
      var e;
      try {
        await this.user.getIdToken(!0);
      } catch (t) {
        return void (
          "auth/network-request-failed" ===
            (null === (e = t) || void 0 === e ? void 0 : e.code) &&
          this.schedule(!0)
        );
      }
      this.schedule();
    }
  }
  class $e {
    constructor(e, t) {
      (this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
    }
    _initializeTime() {
      (this.lastSignInTime = Ve(this.lastLoginAt)),
        (this.creationTime = Ve(this.createdAt));
    }
    _copy(e) {
      (this.createdAt = e.createdAt),
        (this.lastLoginAt = e.lastLoginAt),
        this._initializeTime();
    }
    toJSON() {
      return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
    }
  }
  async function qe(e) {
    var t;
    const r = e.auth,
      n = await e.getIdToken(),
      i = await ze(
        e,
        (async function (e, t) {
          return Le(e, "POST", "/v1/accounts:lookup", t);
        })(r, { idToken: n })
      );
    Ie(null == i ? void 0 : i.users.length, r, "internal-error");
    const s = i.users[0];
    e._notifyReloadListener(s);
    const o = (
        null === (t = s.providerUserInfo) || void 0 === t ? void 0 : t.length
      )
        ? s.providerUserInfo.map((e) => {
            var { providerId: t } = e,
              r = de(e, ["providerId"]);
            return {
              providerId: t,
              uid: r.rawId || "",
              displayName: r.displayName || null,
              email: r.email || null,
              phoneNumber: r.phoneNumber || null,
              photoURL: r.photoUrl || null,
            };
          })
        : [],
      a =
        ((c = e.providerData),
        (h = o),
        [
          ...c.filter((e) => !h.some((t) => t.providerId === e.providerId)),
          ...h,
        ]);
    var c, h;
    const l = e.isAnonymous,
      u = !((e.email && s.passwordHash) || (null == a ? void 0 : a.length)),
      d = !!l && u,
      p = {
        uid: s.localId,
        displayName: s.displayName || null,
        photoURL: s.photoUrl || null,
        email: s.email || null,
        emailVerified: s.emailVerified || !1,
        phoneNumber: s.phoneNumber || null,
        tenantId: s.tenantId || null,
        providerData: a,
        metadata: new $e(s.createdAt, s.lastLoginAt),
        isAnonymous: d,
      };
    Object.assign(e, p);
  }
  class Ke {
    constructor() {
      (this.refreshToken = null),
        (this.accessToken = null),
        (this.expirationTime = null);
    }
    get isExpired() {
      return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
    }
    updateFromServerResponse(e) {
      Ie(e.idToken, "internal-error"),
        Ie(void 0 !== e.idToken, "internal-error"),
        Ie(void 0 !== e.refreshToken, "internal-error");
      const t =
        "expiresIn" in e && void 0 !== e.expiresIn
          ? Number(e.expiresIn)
          : (function (e) {
              const t = Be(e);
              return (
                Ie(t, "internal-error"),
                Ie(void 0 !== t.exp, "internal-error"),
                Ie(void 0 !== t.iat, "internal-error"),
                Number(t.exp) - Number(t.iat)
              );
            })(e.idToken);
      this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
    }
    async getToken(e, t = !1) {
      return (
        Ie(!this.accessToken || this.refreshToken, e, "user-token-expired"),
        t || !this.accessToken || this.isExpired
          ? this.refreshToken
            ? (await this.refresh(e, this.refreshToken), this.accessToken)
            : null
          : this.accessToken
      );
    }
    clearRefreshToken() {
      this.refreshToken = null;
    }
    async refresh(e, t) {
      const {
        accessToken: r,
        refreshToken: n,
        expiresIn: i,
      } = await (async function (e, t) {
        const r = await Me(e, {}, async () => {
          const r = l({ grant_type: "refresh_token", refresh_token: t }).slice(
              1
            ),
            { tokenApiHost: n, apiKey: i } = e.config,
            s = xe(e, n, "/v1/token", `key=${i}`),
            o = await e._getAdditionalHeaders();
          return (
            (o["Content-Type"] = "application/x-www-form-urlencoded"),
            Ae.fetch()(s, { method: "POST", headers: o, body: r })
          );
        });
        return {
          accessToken: r.access_token,
          expiresIn: r.expires_in,
          refreshToken: r.refresh_token,
        };
      })(e, t);
      this.updateTokensAndExpiration(r, n, Number(i));
    }
    updateTokensAndExpiration(e, t, r) {
      (this.refreshToken = t || null),
        (this.accessToken = e || null),
        (this.expirationTime = Date.now() + 1e3 * r);
    }
    static fromJSON(e, t) {
      const { refreshToken: r, accessToken: n, expirationTime: i } = t,
        s = new Ke();
      return (
        r &&
          (Ie("string" == typeof r, "internal-error", { appName: e }),
          (s.refreshToken = r)),
        n &&
          (Ie("string" == typeof n, "internal-error", { appName: e }),
          (s.accessToken = n)),
        i &&
          (Ie("number" == typeof i, "internal-error", { appName: e }),
          (s.expirationTime = i)),
        s
      );
    }
    toJSON() {
      return {
        refreshToken: this.refreshToken,
        accessToken: this.accessToken,
        expirationTime: this.expirationTime,
      };
    }
    _assign(e) {
      (this.accessToken = e.accessToken),
        (this.refreshToken = e.refreshToken),
        (this.expirationTime = e.expirationTime);
    }
    _clone() {
      return Object.assign(new Ke(), this.toJSON());
    }
    _performRefresh() {
      return we("not implemented");
    }
  }
  function Ge(e, t) {
    Ie("string" == typeof e || void 0 === e, "internal-error", { appName: t });
  }
  class Je {
    constructor(e) {
      var { uid: t, auth: r, stsTokenManager: n } = e,
        i = de(e, ["uid", "auth", "stsTokenManager"]);
      (this.providerId = "firebase"),
        (this.proactiveRefresh = new We(this)),
        (this.reloadUserInfo = null),
        (this.reloadListener = null),
        (this.uid = t),
        (this.auth = r),
        (this.stsTokenManager = n),
        (this.accessToken = n.accessToken),
        (this.displayName = i.displayName || null),
        (this.email = i.email || null),
        (this.emailVerified = i.emailVerified || !1),
        (this.phoneNumber = i.phoneNumber || null),
        (this.photoURL = i.photoURL || null),
        (this.isAnonymous = i.isAnonymous || !1),
        (this.tenantId = i.tenantId || null),
        (this.providerData = i.providerData ? [...i.providerData] : []),
        (this.metadata = new $e(
          i.createdAt || void 0,
          i.lastLoginAt || void 0
        ));
    }
    async getIdToken(e) {
      const t = await ze(this, this.stsTokenManager.getToken(this.auth, e));
      return (
        Ie(t, this.auth, "internal-error"),
        this.accessToken !== t &&
          ((this.accessToken = t),
          await this.auth._persistUserIfCurrent(this),
          this.auth._notifyListenersIfCurrent(this)),
        t
      );
    }
    getIdTokenResult(e) {
      return (async function (e, t = !1) {
        const r = m(e),
          n = await r.getIdToken(t),
          i = Be(n);
        Ie(i && i.exp && i.auth_time && i.iat, r.auth, "internal-error");
        const s = "object" == typeof i.firebase ? i.firebase : void 0,
          o = null == s ? void 0 : s.sign_in_provider;
        return {
          claims: i,
          token: n,
          authTime: Ve(He(i.auth_time)),
          issuedAtTime: Ve(He(i.iat)),
          expirationTime: Ve(He(i.exp)),
          signInProvider: o || null,
          signInSecondFactor:
            (null == s ? void 0 : s.sign_in_second_factor) || null,
        };
      })(this, e);
    }
    reload() {
      return (async function (e) {
        const t = m(e);
        await qe(t),
          await t.auth._persistUserIfCurrent(t),
          t.auth._notifyListenersIfCurrent(t);
      })(this);
    }
    _assign(e) {
      this !== e &&
        (Ie(this.uid === e.uid, this.auth, "internal-error"),
        (this.displayName = e.displayName),
        (this.photoURL = e.photoURL),
        (this.email = e.email),
        (this.emailVerified = e.emailVerified),
        (this.phoneNumber = e.phoneNumber),
        (this.isAnonymous = e.isAnonymous),
        (this.tenantId = e.tenantId),
        (this.providerData = e.providerData.map((e) => Object.assign({}, e))),
        this.metadata._copy(e.metadata),
        this.stsTokenManager._assign(e.stsTokenManager));
    }
    _clone(e) {
      return new Je(
        Object.assign(Object.assign({}, this), {
          auth: e,
          stsTokenManager: this.stsTokenManager._clone(),
        })
      );
    }
    _onReload(e) {
      Ie(!this.reloadListener, this.auth, "internal-error"),
        (this.reloadListener = e),
        this.reloadUserInfo &&
          (this._notifyReloadListener(this.reloadUserInfo),
          (this.reloadUserInfo = null));
    }
    _notifyReloadListener(e) {
      this.reloadListener ? this.reloadListener(e) : (this.reloadUserInfo = e);
    }
    _startProactiveRefresh() {
      this.proactiveRefresh._start();
    }
    _stopProactiveRefresh() {
      this.proactiveRefresh._stop();
    }
    async _updateTokensIfNecessary(e, t = !1) {
      let r = !1;
      e.idToken &&
        e.idToken !== this.stsTokenManager.accessToken &&
        (this.stsTokenManager.updateFromServerResponse(e), (r = !0)),
        t && (await qe(this)),
        await this.auth._persistUserIfCurrent(this),
        r && this.auth._notifyListenersIfCurrent(this);
    }
    async delete() {
      const e = await this.getIdToken();
      return (
        await ze(
          this,
          (async function (e, t) {
            return Le(e, "POST", "/v1/accounts:delete", t);
          })(this.auth, { idToken: e })
        ),
        this.stsTokenManager.clearRefreshToken(),
        this.auth.signOut()
      );
    }
    toJSON() {
      return Object.assign(
        Object.assign(
          {
            uid: this.uid,
            email: this.email || void 0,
            emailVerified: this.emailVerified,
            displayName: this.displayName || void 0,
            isAnonymous: this.isAnonymous,
            photoURL: this.photoURL || void 0,
            phoneNumber: this.phoneNumber || void 0,
            tenantId: this.tenantId || void 0,
            providerData: this.providerData.map((e) => Object.assign({}, e)),
            stsTokenManager: this.stsTokenManager.toJSON(),
            _redirectEventId: this._redirectEventId,
          },
          this.metadata.toJSON()
        ),
        { apiKey: this.auth.config.apiKey, appName: this.auth.name }
      );
    }
    get refreshToken() {
      return this.stsTokenManager.refreshToken || "";
    }
    static _fromJSON(e, t) {
      var r, n, i, s, o, a, c, h;
      const l = null !== (r = t.displayName) && void 0 !== r ? r : void 0,
        u = null !== (n = t.email) && void 0 !== n ? n : void 0,
        d = null !== (i = t.phoneNumber) && void 0 !== i ? i : void 0,
        p = null !== (s = t.photoURL) && void 0 !== s ? s : void 0,
        f = null !== (o = t.tenantId) && void 0 !== o ? o : void 0,
        m = null !== (a = t._redirectEventId) && void 0 !== a ? a : void 0,
        g = null !== (c = t.createdAt) && void 0 !== c ? c : void 0,
        v = null !== (h = t.lastLoginAt) && void 0 !== h ? h : void 0,
        {
          uid: y,
          emailVerified: _,
          isAnonymous: I,
          providerData: w,
          stsTokenManager: b,
        } = t;
      Ie(y && b, e, "internal-error");
      const k = Ke.fromJSON(this.name, b);
      Ie("string" == typeof y, e, "internal-error"),
        Ge(l, e.name),
        Ge(u, e.name),
        Ie("boolean" == typeof _, e, "internal-error"),
        Ie("boolean" == typeof I, e, "internal-error"),
        Ge(d, e.name),
        Ge(p, e.name),
        Ge(f, e.name),
        Ge(m, e.name),
        Ge(g, e.name),
        Ge(v, e.name);
      const T = new Je({
        uid: y,
        auth: e,
        email: u,
        emailVerified: _,
        displayName: l,
        isAnonymous: I,
        photoURL: p,
        phoneNumber: d,
        tenantId: f,
        stsTokenManager: k,
        createdAt: g,
        lastLoginAt: v,
      });
      return (
        w &&
          Array.isArray(w) &&
          (T.providerData = w.map((e) => Object.assign({}, e))),
        m && (T._redirectEventId = m),
        T
      );
    }
    static async _fromIdTokenResponse(e, t, r = !1) {
      const n = new Ke();
      n.updateFromServerResponse(t);
      const i = new Je({
        uid: t.localId,
        auth: e,
        stsTokenManager: n,
        isAnonymous: r,
      });
      return await qe(i), i;
    }
  }
  class Xe {
    constructor() {
      (this.type = "NONE"), (this.storage = {});
    }
    async _isAvailable() {
      return !0;
    }
    async _set(e, t) {
      this.storage[e] = t;
    }
    async _get(e) {
      const t = this.storage[e];
      return void 0 === t ? null : t;
    }
    async _remove(e) {
      delete this.storage[e];
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
  }
  Xe.type = "NONE";
  const Ye = Xe;
  function Qe(e, t, r) {
    return `firebase:${e}:${t}:${r}`;
  }
  class Ze {
    constructor(e, t, r) {
      (this.persistence = e), (this.auth = t), (this.userKey = r);
      const { config: n, name: i } = this.auth;
      (this.fullUserKey = Qe(this.userKey, n.apiKey, i)),
        (this.fullPersistenceKey = Qe("persistence", n.apiKey, i)),
        (this.boundEventHandler = t._onStorageEvent.bind(t)),
        this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
    }
    setCurrentUser(e) {
      return this.persistence._set(this.fullUserKey, e.toJSON());
    }
    async getCurrentUser() {
      const e = await this.persistence._get(this.fullUserKey);
      return e ? Je._fromJSON(this.auth, e) : null;
    }
    removeCurrentUser() {
      return this.persistence._remove(this.fullUserKey);
    }
    savePersistenceForRedirect() {
      return this.persistence._set(
        this.fullPersistenceKey,
        this.persistence.type
      );
    }
    async setPersistence(e) {
      if (this.persistence === e) return;
      const t = await this.getCurrentUser();
      return (
        await this.removeCurrentUser(),
        (this.persistence = e),
        t ? this.setCurrentUser(t) : void 0
      );
    }
    delete() {
      this.persistence._removeListener(
        this.fullUserKey,
        this.boundEventHandler
      );
    }
    static async create(e, t, r = "authUser") {
      if (!t.length) return new Ze(Te(Ye), e, r);
      const n = (
        await Promise.all(
          t.map(async (e) => {
            if (await e._isAvailable()) return e;
          })
        )
      ).filter((e) => e);
      let i = n[0] || Te(Ye);
      const s = Qe(r, e.config.apiKey, e.name);
      let o = null;
      for (const r of t)
        try {
          const t = await r._get(s);
          if (t) {
            const n = Je._fromJSON(e, t);
            r !== i && (o = n), (i = r);
            break;
          }
        } catch (e) {}
      const a = n.filter((e) => e._shouldAllowMigration);
      return i._shouldAllowMigration && a.length
        ? ((i = a[0]),
          o && (await i._set(s, o.toJSON())),
          await Promise.all(
            t.map(async (e) => {
              if (e !== i)
                try {
                  await e._remove(s);
                } catch (e) {}
            })
          ),
          new Ze(i, e, r))
        : new Ze(i, e, r);
    }
  }
  function et(e) {
    const t = e.toLowerCase();
    if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/"))
      return "Opera";
    if (it(t)) return "IEMobile";
    if (t.includes("msie") || t.includes("trident/")) return "IE";
    if (t.includes("edge/")) return "Edge";
    if (tt(t)) return "Firefox";
    if (t.includes("silk/")) return "Silk";
    if (ot(t)) return "Blackberry";
    if (at(t)) return "Webos";
    if (rt(t)) return "Safari";
    if ((t.includes("chrome/") || nt(t)) && !t.includes("edge/"))
      return "Chrome";
    if (st(t)) return "Android";
    {
      const t = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,
        r = e.match(t);
      if (2 === (null == r ? void 0 : r.length)) return r[1];
    }
    return "Other";
  }
  function tt(e = i()) {
    return /firefox\//i.test(e);
  }
  function rt(e = i()) {
    const t = e.toLowerCase();
    return (
      t.includes("safari/") &&
      !t.includes("chrome/") &&
      !t.includes("crios/") &&
      !t.includes("android")
    );
  }
  function nt(e = i()) {
    return /crios\//i.test(e);
  }
  function it(e = i()) {
    return /iemobile/i.test(e);
  }
  function st(e = i()) {
    return /android/i.test(e);
  }
  function ot(e = i()) {
    return /blackberry/i.test(e);
  }
  function at(e = i()) {
    return /webos/i.test(e);
  }
  function ct(e = i()) {
    return (
      /iphone|ipad|ipod/i.test(e) || (/macintosh/i.test(e) && /mobile/i.test(e))
    );
  }
  function ht(e = i()) {
    return (
      ct(e) || st(e) || at(e) || ot(e) || /windows phone/i.test(e) || it(e)
    );
  }
  function lt(e, t = []) {
    let r;
    switch (e) {
      case "Browser":
        r = et(i());
        break;
      case "Worker":
        r = `${et(i())}-${e}`;
        break;
      default:
        r = e;
    }
    return `${r}/JsCore/9.9.2/${t.length ? t.join(",") : "FirebaseCore-web"}`;
  }
  class ut {
    constructor(e) {
      (this.auth = e), (this.queue = []);
    }
    pushCallback(e, t) {
      const r = (t) =>
        new Promise((r, n) => {
          try {
            r(e(t));
          } catch (e) {
            n(e);
          }
        });
      (r.onAbort = t), this.queue.push(r);
      const n = this.queue.length - 1;
      return () => {
        this.queue[n] = () => Promise.resolve();
      };
    }
    async runMiddleware(e) {
      var t;
      if (this.auth.currentUser === e) return;
      const r = [];
      try {
        for (const t of this.queue) await t(e), t.onAbort && r.push(t.onAbort);
      } catch (e) {
        r.reverse();
        for (const e of r)
          try {
            e();
          } catch (e) {}
        throw this.auth._errorFactory.create("login-blocked", {
          originalMessage:
            null === (t = e) || void 0 === t ? void 0 : t.message,
        });
      }
    }
  }
  class dt {
    constructor(e, t, r) {
      (this.app = e),
        (this.heartbeatServiceProvider = t),
        (this.config = r),
        (this.currentUser = null),
        (this.emulatorConfig = null),
        (this.operations = Promise.resolve()),
        (this.authStateSubscription = new ft(this)),
        (this.idTokenSubscription = new ft(this)),
        (this.beforeStateQueue = new ut(this)),
        (this.redirectUser = null),
        (this.isProactiveRefreshEnabled = !1),
        (this._canInitEmulator = !0),
        (this._isInitialized = !1),
        (this._deleted = !1),
        (this._initializationPromise = null),
        (this._popupRedirectResolver = null),
        (this._errorFactory = fe),
        (this.lastNotifiedUid = void 0),
        (this.languageCode = null),
        (this.tenantId = null),
        (this.settings = { appVerificationDisabledForTesting: !1 }),
        (this.frameworks = []),
        (this.name = e.name),
        (this.clientVersion = r.sdkClientVersion);
    }
    _initializeWithPersistence(e, t) {
      return (
        t && (this._popupRedirectResolver = Te(t)),
        (this._initializationPromise = this.queue(async () => {
          var r, n;
          if (
            !this._deleted &&
            ((this.persistenceManager = await Ze.create(this, e)),
            !this._deleted)
          ) {
            if (
              null === (r = this._popupRedirectResolver) || void 0 === r
                ? void 0
                : r._shouldInitProactively
            )
              try {
                await this._popupRedirectResolver._initialize(this);
              } catch (e) {}
            await this.initializeCurrentUser(t),
              (this.lastNotifiedUid =
                (null === (n = this.currentUser) || void 0 === n
                  ? void 0
                  : n.uid) || null),
              this._deleted || (this._isInitialized = !0);
          }
        })),
        this._initializationPromise
      );
    }
    async _onStorageEvent() {
      if (this._deleted) return;
      const e = await this.assertedPersistence.getCurrentUser();
      return this.currentUser || e
        ? this.currentUser && e && this.currentUser.uid === e.uid
          ? (this._currentUser._assign(e),
            void (await this.currentUser.getIdToken()))
          : void (await this._updateCurrentUser(e, !0))
        : void 0;
    }
    async initializeCurrentUser(e) {
      var t;
      const r = await this.assertedPersistence.getCurrentUser();
      let n = r,
        i = !1;
      if (e && this.config.authDomain) {
        await this.getOrInitRedirectPersistenceManager();
        const r =
            null === (t = this.redirectUser) || void 0 === t
              ? void 0
              : t._redirectEventId,
          s = null == n ? void 0 : n._redirectEventId,
          o = await this.tryRedirectSignIn(e);
        (r && r !== s) ||
          !(null == o ? void 0 : o.user) ||
          ((n = o.user), (i = !0));
      }
      if (!n) return this.directlySetCurrentUser(null);
      if (!n._redirectEventId) {
        if (i)
          try {
            await this.beforeStateQueue.runMiddleware(n);
          } catch (e) {
            (n = r),
              this._popupRedirectResolver._overrideRedirectResult(this, () =>
                Promise.reject(e)
              );
          }
        return n
          ? this.reloadAndSetCurrentUserOrClear(n)
          : this.directlySetCurrentUser(null);
      }
      return (
        Ie(this._popupRedirectResolver, this, "argument-error"),
        await this.getOrInitRedirectPersistenceManager(),
        this.redirectUser &&
        this.redirectUser._redirectEventId === n._redirectEventId
          ? this.directlySetCurrentUser(n)
          : this.reloadAndSetCurrentUserOrClear(n)
      );
    }
    async tryRedirectSignIn(e) {
      let t = null;
      try {
        t = await this._popupRedirectResolver._completeRedirectFn(this, e, !0);
      } catch (e) {
        await this._setRedirectUser(null);
      }
      return t;
    }
    async reloadAndSetCurrentUserOrClear(e) {
      var t;
      try {
        await qe(e);
      } catch (e) {
        if (
          "auth/network-request-failed" !==
          (null === (t = e) || void 0 === t ? void 0 : t.code)
        )
          return this.directlySetCurrentUser(null);
      }
      return this.directlySetCurrentUser(e);
    }
    useDeviceLanguage() {
      this.languageCode = (function () {
        if ("undefined" == typeof navigator) return null;
        const e = navigator;
        return (e.languages && e.languages[0]) || e.language || null;
      })();
    }
    async _delete() {
      this._deleted = !0;
    }
    async updateCurrentUser(e) {
      const t = e ? m(e) : null;
      return (
        t &&
          Ie(
            t.auth.config.apiKey === this.config.apiKey,
            this,
            "invalid-user-token"
          ),
        this._updateCurrentUser(t && t._clone(this))
      );
    }
    async _updateCurrentUser(e, t = !1) {
      if (!this._deleted)
        return (
          e && Ie(this.tenantId === e.tenantId, this, "tenant-id-mismatch"),
          t || (await this.beforeStateQueue.runMiddleware(e)),
          this.queue(async () => {
            await this.directlySetCurrentUser(e), this.notifyAuthListeners();
          })
        );
    }
    async signOut() {
      return (
        await this.beforeStateQueue.runMiddleware(null),
        (this.redirectPersistenceManager || this._popupRedirectResolver) &&
          (await this._setRedirectUser(null)),
        this._updateCurrentUser(null, !0)
      );
    }
    setPersistence(e) {
      return this.queue(async () => {
        await this.assertedPersistence.setPersistence(Te(e));
      });
    }
    _getPersistence() {
      return this.assertedPersistence.persistence.type;
    }
    _updateErrorMap(e) {
      this._errorFactory = new o("auth", "Firebase", e());
    }
    onAuthStateChanged(e, t, r) {
      return this.registerStateListener(this.authStateSubscription, e, t, r);
    }
    beforeAuthStateChanged(e, t) {
      return this.beforeStateQueue.pushCallback(e, t);
    }
    onIdTokenChanged(e, t, r) {
      return this.registerStateListener(this.idTokenSubscription, e, t, r);
    }
    toJSON() {
      var e;
      return {
        apiKey: this.config.apiKey,
        authDomain: this.config.authDomain,
        appName: this.name,
        currentUser:
          null === (e = this._currentUser) || void 0 === e
            ? void 0
            : e.toJSON(),
      };
    }
    async _setRedirectUser(e, t) {
      const r = await this.getOrInitRedirectPersistenceManager(t);
      return null === e ? r.removeCurrentUser() : r.setCurrentUser(e);
    }
    async getOrInitRedirectPersistenceManager(e) {
      if (!this.redirectPersistenceManager) {
        const t = (e && Te(e)) || this._popupRedirectResolver;
        Ie(t, this, "argument-error"),
          (this.redirectPersistenceManager = await Ze.create(
            this,
            [Te(t._redirectPersistence)],
            "redirectUser"
          )),
          (this.redirectUser =
            await this.redirectPersistenceManager.getCurrentUser());
      }
      return this.redirectPersistenceManager;
    }
    async _redirectUserForId(e) {
      var t, r;
      return (
        this._isInitialized && (await this.queue(async () => {})),
        (null === (t = this._currentUser) || void 0 === t
          ? void 0
          : t._redirectEventId) === e
          ? this._currentUser
          : (null === (r = this.redirectUser) || void 0 === r
              ? void 0
              : r._redirectEventId) === e
          ? this.redirectUser
          : null
      );
    }
    async _persistUserIfCurrent(e) {
      if (e === this.currentUser)
        return this.queue(async () => this.directlySetCurrentUser(e));
    }
    _notifyListenersIfCurrent(e) {
      e === this.currentUser && this.notifyAuthListeners();
    }
    _key() {
      return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
    }
    _startProactiveRefresh() {
      (this.isProactiveRefreshEnabled = !0),
        this.currentUser && this._currentUser._startProactiveRefresh();
    }
    _stopProactiveRefresh() {
      (this.isProactiveRefreshEnabled = !1),
        this.currentUser && this._currentUser._stopProactiveRefresh();
    }
    get _currentUser() {
      return this.currentUser;
    }
    notifyAuthListeners() {
      var e, t;
      if (!this._isInitialized) return;
      this.idTokenSubscription.next(this.currentUser);
      const r =
        null !==
          (t =
            null === (e = this.currentUser) || void 0 === e ? void 0 : e.uid) &&
        void 0 !== t
          ? t
          : null;
      this.lastNotifiedUid !== r &&
        ((this.lastNotifiedUid = r),
        this.authStateSubscription.next(this.currentUser));
    }
    registerStateListener(e, t, r, n) {
      if (this._deleted) return () => {};
      const i = "function" == typeof t ? t : t.next.bind(t),
        s = this._isInitialized
          ? Promise.resolve()
          : this._initializationPromise;
      return (
        Ie(s, this, "internal-error"),
        s.then(() => i(this.currentUser)),
        "function" == typeof t ? e.addObserver(t, r, n) : e.addObserver(t)
      );
    }
    async directlySetCurrentUser(e) {
      this.currentUser &&
        this.currentUser !== e &&
        (this._currentUser._stopProactiveRefresh(),
        e && this.isProactiveRefreshEnabled && e._startProactiveRefresh()),
        (this.currentUser = e),
        e
          ? await this.assertedPersistence.setCurrentUser(e)
          : await this.assertedPersistence.removeCurrentUser();
    }
    queue(e) {
      return (this.operations = this.operations.then(e, e)), this.operations;
    }
    get assertedPersistence() {
      return (
        Ie(this.persistenceManager, this, "internal-error"),
        this.persistenceManager
      );
    }
    _logFramework(e) {
      e &&
        !this.frameworks.includes(e) &&
        (this.frameworks.push(e),
        this.frameworks.sort(),
        (this.clientVersion = lt(
          this.config.clientPlatform,
          this._getFrameworks()
        )));
    }
    _getFrameworks() {
      return this.frameworks;
    }
    async _getAdditionalHeaders() {
      var e;
      const t = { "X-Client-Version": this.clientVersion };
      this.app.options.appId &&
        (t["X-Firebase-gmpid"] = this.app.options.appId);
      const r = await (null ===
        (e = this.heartbeatServiceProvider.getImmediate({ optional: !0 })) ||
      void 0 === e
        ? void 0
        : e.getHeartbeatsHeader());
      return r && (t["X-Firebase-Client"] = r), t;
    }
  }
  function pt(e) {
    return m(e);
  }
  class ft {
    constructor(e) {
      (this.auth = e),
        (this.observer = null),
        (this.addObserver = (function (e, t) {
          const r = new p(e, void 0);
          return r.subscribe.bind(r);
        })((e) => (this.observer = e)));
    }
    get next() {
      return (
        Ie(this.observer, this.auth, "internal-error"),
        this.observer.next.bind(this.observer)
      );
    }
  }
  class mt {
    constructor(e, t) {
      (this.providerId = e), (this.signInMethod = t);
    }
    toJSON() {
      return we("not implemented");
    }
    _getIdTokenResponse(e) {
      return we("not implemented");
    }
    _linkToIdToken(e, t) {
      return we("not implemented");
    }
    _getReauthenticationResolver(e) {
      return we("not implemented");
    }
  }
  class gt extends mt {
    constructor(e, t, r, n = null) {
      super("password", r),
        (this._email = e),
        (this._password = t),
        (this._tenantId = n);
    }
    static _fromEmailAndPassword(e, t) {
      return new gt(e, t, "password");
    }
    static _fromEmailAndCode(e, t, r = null) {
      return new gt(e, t, "emailLink", r);
    }
    toJSON() {
      return {
        email: this._email,
        password: this._password,
        signInMethod: this.signInMethod,
        tenantId: this._tenantId,
      };
    }
    static fromJSON(e) {
      const t = "string" == typeof e ? JSON.parse(e) : e;
      if ((null == t ? void 0 : t.email) && (null == t ? void 0 : t.password)) {
        if ("password" === t.signInMethod)
          return this._fromEmailAndPassword(t.email, t.password);
        if ("emailLink" === t.signInMethod)
          return this._fromEmailAndCode(t.email, t.password, t.tenantId);
      }
      return null;
    }
    async _getIdTokenResponse(e) {
      switch (this.signInMethod) {
        case "password":
          return (async function (e, t) {
            return Ue(e, "POST", "/v1/accounts:signInWithPassword", De(e, t));
          })(e, {
            returnSecureToken: !0,
            email: this._email,
            password: this._password,
          });
        case "emailLink":
          return (async function (e, t) {
            return Ue(e, "POST", "/v1/accounts:signInWithEmailLink", De(e, t));
          })(e, { email: this._email, oobCode: this._password });
        default:
          ve(e, "internal-error");
      }
    }
    async _linkToIdToken(e, t) {
      switch (this.signInMethod) {
        case "password":
          return (async function (e, t) {
            return Le(e, "POST", "/v1/accounts:update", t);
          })(e, {
            idToken: t,
            returnSecureToken: !0,
            email: this._email,
            password: this._password,
          });
        case "emailLink":
          return (async function (e, t) {
            return Ue(e, "POST", "/v1/accounts:signInWithEmailLink", De(e, t));
          })(e, { idToken: t, email: this._email, oobCode: this._password });
        default:
          ve(e, "internal-error");
      }
    }
    _getReauthenticationResolver(e) {
      return this._getIdTokenResponse(e);
    }
  }
  async function vt(e, t) {
    return Ue(e, "POST", "/v1/accounts:signInWithIdp", De(e, t));
  }
  class yt extends mt {
    constructor() {
      super(...arguments), (this.pendingToken = null);
    }
    static _fromParams(e) {
      const t = new yt(e.providerId, e.signInMethod);
      return (
        e.idToken || e.accessToken
          ? (e.idToken && (t.idToken = e.idToken),
            e.accessToken && (t.accessToken = e.accessToken),
            e.nonce && !e.pendingToken && (t.nonce = e.nonce),
            e.pendingToken && (t.pendingToken = e.pendingToken))
          : e.oauthToken && e.oauthTokenSecret
          ? ((t.accessToken = e.oauthToken), (t.secret = e.oauthTokenSecret))
          : ve("argument-error"),
        t
      );
    }
    toJSON() {
      return {
        idToken: this.idToken,
        accessToken: this.accessToken,
        secret: this.secret,
        nonce: this.nonce,
        pendingToken: this.pendingToken,
        providerId: this.providerId,
        signInMethod: this.signInMethod,
      };
    }
    static fromJSON(e) {
      const t = "string" == typeof e ? JSON.parse(e) : e,
        { providerId: r, signInMethod: n } = t,
        i = de(t, ["providerId", "signInMethod"]);
      if (!r || !n) return null;
      const s = new yt(r, n);
      return (
        (s.idToken = i.idToken || void 0),
        (s.accessToken = i.accessToken || void 0),
        (s.secret = i.secret),
        (s.nonce = i.nonce),
        (s.pendingToken = i.pendingToken || null),
        s
      );
    }
    _getIdTokenResponse(e) {
      return vt(e, this.buildRequest());
    }
    _linkToIdToken(e, t) {
      const r = this.buildRequest();
      return (r.idToken = t), vt(e, r);
    }
    _getReauthenticationResolver(e) {
      const t = this.buildRequest();
      return (t.autoCreate = !1), vt(e, t);
    }
    buildRequest() {
      const e = { requestUri: "http://localhost", returnSecureToken: !0 };
      if (this.pendingToken) e.pendingToken = this.pendingToken;
      else {
        const t = {};
        this.idToken && (t.id_token = this.idToken),
          this.accessToken && (t.access_token = this.accessToken),
          this.secret && (t.oauth_token_secret = this.secret),
          (t.providerId = this.providerId),
          this.nonce && !this.pendingToken && (t.nonce = this.nonce),
          (e.postBody = l(t));
      }
      return e;
    }
  }
  const _t = { USER_NOT_FOUND: "user-not-found" };
  class It extends mt {
    constructor(e) {
      super("phone", "phone"), (this.params = e);
    }
    static _fromVerification(e, t) {
      return new It({ verificationId: e, verificationCode: t });
    }
    static _fromTokenResponse(e, t) {
      return new It({ phoneNumber: e, temporaryProof: t });
    }
    _getIdTokenResponse(e) {
      return (async function (e, t) {
        return Ue(e, "POST", "/v1/accounts:signInWithPhoneNumber", De(e, t));
      })(e, this._makeVerificationRequest());
    }
    _linkToIdToken(e, t) {
      return (async function (e, t) {
        const r = await Ue(
          e,
          "POST",
          "/v1/accounts:signInWithPhoneNumber",
          De(e, t)
        );
        if (r.temporaryProof)
          throw Fe(e, "account-exists-with-different-credential", r);
        return r;
      })(e, Object.assign({ idToken: t }, this._makeVerificationRequest()));
    }
    _getReauthenticationResolver(e) {
      return (async function (e, t) {
        return Ue(
          e,
          "POST",
          "/v1/accounts:signInWithPhoneNumber",
          De(e, Object.assign(Object.assign({}, t), { operation: "REAUTH" })),
          _t
        );
      })(e, this._makeVerificationRequest());
    }
    _makeVerificationRequest() {
      const {
        temporaryProof: e,
        phoneNumber: t,
        verificationId: r,
        verificationCode: n,
      } = this.params;
      return e && t
        ? { temporaryProof: e, phoneNumber: t }
        : { sessionInfo: r, code: n };
    }
    toJSON() {
      const e = { providerId: this.providerId };
      return (
        this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber),
        this.params.temporaryProof &&
          (e.temporaryProof = this.params.temporaryProof),
        this.params.verificationCode &&
          (e.verificationCode = this.params.verificationCode),
        this.params.verificationId &&
          (e.verificationId = this.params.verificationId),
        e
      );
    }
    static fromJSON(e) {
      "string" == typeof e && (e = JSON.parse(e));
      const {
        verificationId: t,
        verificationCode: r,
        phoneNumber: n,
        temporaryProof: i,
      } = e;
      return r || t || n || i
        ? new It({
            verificationId: t,
            verificationCode: r,
            phoneNumber: n,
            temporaryProof: i,
          })
        : null;
    }
  }
  class wt {
    constructor(e) {
      var t, r, n, i, s, o;
      const a = u(d(e)),
        c = null !== (t = a.apiKey) && void 0 !== t ? t : null,
        h = null !== (r = a.oobCode) && void 0 !== r ? r : null,
        l = (function (e) {
          switch (e) {
            case "recoverEmail":
              return "RECOVER_EMAIL";
            case "resetPassword":
              return "PASSWORD_RESET";
            case "signIn":
              return "EMAIL_SIGNIN";
            case "verifyEmail":
              return "VERIFY_EMAIL";
            case "verifyAndChangeEmail":
              return "VERIFY_AND_CHANGE_EMAIL";
            case "revertSecondFactorAddition":
              return "REVERT_SECOND_FACTOR_ADDITION";
            default:
              return null;
          }
        })(null !== (n = a.mode) && void 0 !== n ? n : null);
      Ie(c && h && l, "argument-error"),
        (this.apiKey = c),
        (this.operation = l),
        (this.code = h),
        (this.continueUrl =
          null !== (i = a.continueUrl) && void 0 !== i ? i : null),
        (this.languageCode =
          null !== (s = a.languageCode) && void 0 !== s ? s : null),
        (this.tenantId = null !== (o = a.tenantId) && void 0 !== o ? o : null);
    }
    static parseLink(e) {
      const t = (function (e) {
        const t = u(d(e)).link,
          r = t ? u(d(t)).deep_link_id : null,
          n = u(d(e)).deep_link_id;
        return (n ? u(d(n)).link : null) || n || r || t || e;
      })(e);
      try {
        return new wt(t);
      } catch (e) {
        return null;
      }
    }
  }
  class bt {
    constructor() {
      this.providerId = bt.PROVIDER_ID;
    }
    static credential(e, t) {
      return gt._fromEmailAndPassword(e, t);
    }
    static credentialWithLink(e, t) {
      const r = wt.parseLink(t);
      return (
        Ie(r, "argument-error"), gt._fromEmailAndCode(e, r.code, r.tenantId)
      );
    }
  }
  (bt.PROVIDER_ID = "password"),
    (bt.EMAIL_PASSWORD_SIGN_IN_METHOD = "password"),
    (bt.EMAIL_LINK_SIGN_IN_METHOD = "emailLink");
  class kt {
    constructor(e) {
      (this.providerId = e),
        (this.defaultLanguageCode = null),
        (this.customParameters = {});
    }
    setDefaultLanguage(e) {
      this.defaultLanguageCode = e;
    }
    setCustomParameters(e) {
      return (this.customParameters = e), this;
    }
    getCustomParameters() {
      return this.customParameters;
    }
  }
  class Tt extends kt {
    constructor() {
      super(...arguments), (this.scopes = []);
    }
    addScope(e) {
      return this.scopes.includes(e) || this.scopes.push(e), this;
    }
    getScopes() {
      return [...this.scopes];
    }
  }
  class Et extends Tt {
    constructor() {
      super("facebook.com");
    }
    static credential(e) {
      return yt._fromParams({
        providerId: Et.PROVIDER_ID,
        signInMethod: Et.FACEBOOK_SIGN_IN_METHOD,
        accessToken: e,
      });
    }
    static credentialFromResult(e) {
      return Et.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
      return Et.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e || !("oauthAccessToken" in e)) return null;
      if (!e.oauthAccessToken) return null;
      try {
        return Et.credential(e.oauthAccessToken);
      } catch (e) {
        return null;
      }
    }
  }
  (Et.FACEBOOK_SIGN_IN_METHOD = "facebook.com"),
    (Et.PROVIDER_ID = "facebook.com");
  class St extends Tt {
    constructor() {
      super("google.com"), this.addScope("profile");
    }
    static credential(e, t) {
      return yt._fromParams({
        providerId: St.PROVIDER_ID,
        signInMethod: St.GOOGLE_SIGN_IN_METHOD,
        idToken: e,
        accessToken: t,
      });
    }
    static credentialFromResult(e) {
      return St.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
      return St.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e) return null;
      const { oauthIdToken: t, oauthAccessToken: r } = e;
      if (!t && !r) return null;
      try {
        return St.credential(t, r);
      } catch (e) {
        return null;
      }
    }
  }
  (St.GOOGLE_SIGN_IN_METHOD = "google.com"), (St.PROVIDER_ID = "google.com");
  class Rt extends Tt {
    constructor() {
      super("github.com");
    }
    static credential(e) {
      return yt._fromParams({
        providerId: Rt.PROVIDER_ID,
        signInMethod: Rt.GITHUB_SIGN_IN_METHOD,
        accessToken: e,
      });
    }
    static credentialFromResult(e) {
      return Rt.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
      return Rt.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e || !("oauthAccessToken" in e)) return null;
      if (!e.oauthAccessToken) return null;
      try {
        return Rt.credential(e.oauthAccessToken);
      } catch (e) {
        return null;
      }
    }
  }
  (Rt.GITHUB_SIGN_IN_METHOD = "github.com"), (Rt.PROVIDER_ID = "github.com");
  class Ot extends Tt {
    constructor() {
      super("twitter.com");
    }
    static credential(e, t) {
      return yt._fromParams({
        providerId: Ot.PROVIDER_ID,
        signInMethod: Ot.TWITTER_SIGN_IN_METHOD,
        oauthToken: e,
        oauthTokenSecret: t,
      });
    }
    static credentialFromResult(e) {
      return Ot.credentialFromTaggedObject(e);
    }
    static credentialFromError(e) {
      return Ot.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e) return null;
      const { oauthAccessToken: t, oauthTokenSecret: r } = e;
      if (!t || !r) return null;
      try {
        return Ot.credential(t, r);
      } catch (e) {
        return null;
      }
    }
  }
  (Ot.TWITTER_SIGN_IN_METHOD = "twitter.com"), (Ot.PROVIDER_ID = "twitter.com");
  class Ct {
    constructor(e) {
      (this.user = e.user),
        (this.providerId = e.providerId),
        (this._tokenResponse = e._tokenResponse),
        (this.operationType = e.operationType);
    }
    static async _fromIdTokenResponse(e, t, r, n = !1) {
      const i = await Je._fromIdTokenResponse(e, r, n),
        s = At(r);
      return new Ct({
        user: i,
        providerId: s,
        _tokenResponse: r,
        operationType: t,
      });
    }
    static async _forOperation(e, t, r) {
      await e._updateTokensIfNecessary(r, !0);
      const n = At(r);
      return new Ct({
        user: e,
        providerId: n,
        _tokenResponse: r,
        operationType: t,
      });
    }
  }
  function At(e) {
    return e.providerId ? e.providerId : "phoneNumber" in e ? "phone" : null;
  }
  class Nt extends s {
    constructor(e, t, r, n) {
      var i;
      super(t.code, t.message),
        (this.operationType = r),
        (this.user = n),
        Object.setPrototypeOf(this, Nt.prototype),
        (this.customData = {
          appName: e.name,
          tenantId: null !== (i = e.tenantId) && void 0 !== i ? i : void 0,
          _serverResponse: t.customData._serverResponse,
          operationType: r,
        });
    }
    static _fromErrorAndOperation(e, t, r, n) {
      return new Nt(e, t, r, n);
    }
  }
  function Pt(e, t, r, n) {
    return (
      "reauthenticate" === t
        ? r._getReauthenticationResolver(e)
        : r._getIdTokenResponse(e)
    ).catch((r) => {
      if ("auth/multi-factor-auth-required" === r.code)
        throw Nt._fromErrorAndOperation(e, r, t, n);
      throw r;
    });
  }
  async function Dt(e, t, r = !1) {
    const n = "signIn",
      i = await Pt(e, n, t),
      s = await Ct._fromIdTokenResponse(e, n, i);
    return r || (await e._updateCurrentUser(s.user)), s;
  }
  new WeakMap();
  const Lt = "__sak";
  class Mt {
    constructor(e, t) {
      (this.storageRetriever = e), (this.type = t);
    }
    _isAvailable() {
      try {
        return this.storage
          ? (this.storage.setItem(Lt, "1"),
            this.storage.removeItem(Lt),
            Promise.resolve(!0))
          : Promise.resolve(!1);
      } catch (e) {
        return Promise.resolve(!1);
      }
    }
    _set(e, t) {
      return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
    }
    _get(e) {
      const t = this.storage.getItem(e);
      return Promise.resolve(t ? JSON.parse(t) : null);
    }
    _remove(e) {
      return this.storage.removeItem(e), Promise.resolve();
    }
    get storage() {
      return this.storageRetriever();
    }
  }
  class Ut extends Mt {
    constructor() {
      super(() => window.localStorage, "LOCAL"),
        (this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
        (this.listeners = {}),
        (this.localCache = {}),
        (this.pollTimer = null),
        (this.safariLocalStorageNotSynced =
          (function () {
            const e = i();
            return rt(e) || ct(e);
          })() &&
          (function () {
            try {
              return !(!window || window === window.top);
            } catch (e) {
              return !1;
            }
          })()),
        (this.fallbackToPolling = ht()),
        (this._shouldAllowMigration = !0);
    }
    forAllChangedKeys(e) {
      for (const t of Object.keys(this.listeners)) {
        const r = this.storage.getItem(t),
          n = this.localCache[t];
        r !== n && e(t, n, r);
      }
    }
    onStorageEvent(e, t = !1) {
      if (!e.key)
        return void this.forAllChangedKeys((e, t, r) => {
          this.notifyListeners(e, r);
        });
      const r = e.key;
      if (
        (t ? this.detachListener() : this.stopPolling(),
        this.safariLocalStorageNotSynced)
      ) {
        const n = this.storage.getItem(r);
        if (e.newValue !== n)
          null !== e.newValue
            ? this.storage.setItem(r, e.newValue)
            : this.storage.removeItem(r);
        else if (this.localCache[r] === e.newValue && !t) return;
      }
      const n = () => {
          const e = this.storage.getItem(r);
          (t || this.localCache[r] !== e) && this.notifyListeners(r, e);
        },
        s = this.storage.getItem(r);
      !(function () {
        const e = i();
        return e.indexOf("MSIE ") >= 0 || e.indexOf("Trident/") >= 0;
      })() ||
      10 !== document.documentMode ||
      s === e.newValue ||
      e.newValue === e.oldValue
        ? n()
        : setTimeout(n, 10);
    }
    notifyListeners(e, t) {
      this.localCache[e] = t;
      const r = this.listeners[e];
      if (r) for (const e of Array.from(r)) e(t ? JSON.parse(t) : t);
    }
    startPolling() {
      this.stopPolling(),
        (this.pollTimer = setInterval(() => {
          this.forAllChangedKeys((e, t, r) => {
            this.onStorageEvent(
              new StorageEvent("storage", { key: e, oldValue: t, newValue: r }),
              !0
            );
          });
        }, 1e3));
    }
    stopPolling() {
      this.pollTimer &&
        (clearInterval(this.pollTimer), (this.pollTimer = null));
    }
    attachListener() {
      window.addEventListener("storage", this.boundEventHandler);
    }
    detachListener() {
      window.removeEventListener("storage", this.boundEventHandler);
    }
    _addListener(e, t) {
      0 === Object.keys(this.listeners).length &&
        (this.fallbackToPolling ? this.startPolling() : this.attachListener()),
        this.listeners[e] ||
          ((this.listeners[e] = new Set()),
          (this.localCache[e] = this.storage.getItem(e))),
        this.listeners[e].add(t);
    }
    _removeListener(e, t) {
      this.listeners[e] &&
        (this.listeners[e].delete(t),
        0 === this.listeners[e].size && delete this.listeners[e]),
        0 === Object.keys(this.listeners).length &&
          (this.detachListener(), this.stopPolling());
    }
    async _set(e, t) {
      await super._set(e, t), (this.localCache[e] = JSON.stringify(t));
    }
    async _get(e) {
      const t = await super._get(e);
      return (this.localCache[e] = JSON.stringify(t)), t;
    }
    async _remove(e) {
      await super._remove(e), delete this.localCache[e];
    }
  }
  Ut.type = "LOCAL";
  const xt = Ut;
  class jt extends Mt {
    constructor() {
      super(() => window.sessionStorage, "SESSION");
    }
    _addListener(e, t) {}
    _removeListener(e, t) {}
  }
  jt.type = "SESSION";
  const Ft = jt;
  class Vt {
    constructor(e) {
      (this.eventTarget = e),
        (this.handlersMap = {}),
        (this.boundEventHandler = this.handleEvent.bind(this));
    }
    static _getInstance(e) {
      const t = this.receivers.find((t) => t.isListeningto(e));
      if (t) return t;
      const r = new Vt(e);
      return this.receivers.push(r), r;
    }
    isListeningto(e) {
      return this.eventTarget === e;
    }
    async handleEvent(e) {
      const t = e,
        { eventId: r, eventType: n, data: i } = t.data,
        s = this.handlersMap[n];
      if (!(null == s ? void 0 : s.size)) return;
      t.ports[0].postMessage({ status: "ack", eventId: r, eventType: n });
      const o = Array.from(s).map(async (e) => e(t.origin, i)),
        a = await (function (e) {
          return Promise.all(
            e.map(async (e) => {
              try {
                return { fulfilled: !0, value: await e };
              } catch (e) {
                return { fulfilled: !1, reason: e };
              }
            })
          );
        })(o);
      t.ports[0].postMessage({
        status: "done",
        eventId: r,
        eventType: n,
        response: a,
      });
    }
    _subscribe(e, t) {
      0 === Object.keys(this.handlersMap).length &&
        this.eventTarget.addEventListener("message", this.boundEventHandler),
        this.handlersMap[e] || (this.handlersMap[e] = new Set()),
        this.handlersMap[e].add(t);
    }
    _unsubscribe(e, t) {
      this.handlersMap[e] && t && this.handlersMap[e].delete(t),
        (t && 0 !== this.handlersMap[e].size) || delete this.handlersMap[e],
        0 === Object.keys(this.handlersMap).length &&
          this.eventTarget.removeEventListener(
            "message",
            this.boundEventHandler
          );
    }
  }
  function Ht(e = "", t = 10) {
    let r = "";
    for (let e = 0; e < t; e++) r += Math.floor(10 * Math.random());
    return e + r;
  }
  Vt.receivers = [];
  class Bt {
    constructor(e) {
      (this.target = e), (this.handlers = new Set());
    }
    removeMessageHandler(e) {
      e.messageChannel &&
        (e.messageChannel.port1.removeEventListener("message", e.onMessage),
        e.messageChannel.port1.close()),
        this.handlers.delete(e);
    }
    async _send(e, t, r = 50) {
      const n =
        "undefined" != typeof MessageChannel ? new MessageChannel() : null;
      if (!n) throw new Error("connection_unavailable");
      let i, s;
      return new Promise((o, a) => {
        const c = Ht("", 20);
        n.port1.start();
        const h = setTimeout(() => {
          a(new Error("unsupported_event"));
        }, r);
        (s = {
          messageChannel: n,
          onMessage(e) {
            const t = e;
            if (t.data.eventId === c)
              switch (t.data.status) {
                case "ack":
                  clearTimeout(h),
                    (i = setTimeout(() => {
                      a(new Error("timeout"));
                    }, 3e3));
                  break;
                case "done":
                  clearTimeout(i), o(t.data.response);
                  break;
                default:
                  clearTimeout(h),
                    clearTimeout(i),
                    a(new Error("invalid_response"));
              }
          },
        }),
          this.handlers.add(s),
          n.port1.addEventListener("message", s.onMessage),
          this.target.postMessage({ eventType: e, eventId: c, data: t }, [
            n.port2,
          ]);
      }).finally(() => {
        s && this.removeMessageHandler(s);
      });
    }
  }
  function zt() {
    return window;
  }
  function Wt() {
    return (
      void 0 !== zt().WorkerGlobalScope &&
      "function" == typeof zt().importScripts
    );
  }
  const $t = "firebaseLocalStorageDb",
    qt = "firebaseLocalStorage",
    Kt = "fbase_key";
  class Gt {
    constructor(e) {
      this.request = e;
    }
    toPromise() {
      return new Promise((e, t) => {
        this.request.addEventListener("success", () => {
          e(this.request.result);
        }),
          this.request.addEventListener("error", () => {
            t(this.request.error);
          });
      });
    }
  }
  function Jt(e, t) {
    return e.transaction([qt], t ? "readwrite" : "readonly").objectStore(qt);
  }
  function Xt() {
    const e = indexedDB.open($t, 1);
    return new Promise((t, r) => {
      e.addEventListener("error", () => {
        r(e.error);
      }),
        e.addEventListener("upgradeneeded", () => {
          const t = e.result;
          try {
            t.createObjectStore(qt, { keyPath: Kt });
          } catch (e) {
            r(e);
          }
        }),
        e.addEventListener("success", async () => {
          const r = e.result;
          r.objectStoreNames.contains(qt)
            ? t(r)
            : (r.close(),
              await (function () {
                const e = indexedDB.deleteDatabase($t);
                return new Gt(e).toPromise();
              })(),
              t(await Xt()));
        });
    });
  }
  async function Yt(e, t, r) {
    const n = Jt(e, !0).put({ [Kt]: t, value: r });
    return new Gt(n).toPromise();
  }
  function Qt(e, t) {
    const r = Jt(e, !0).delete(t);
    return new Gt(r).toPromise();
  }
  class Zt {
    constructor() {
      (this.type = "LOCAL"),
        (this._shouldAllowMigration = !0),
        (this.listeners = {}),
        (this.localCache = {}),
        (this.pollTimer = null),
        (this.pendingWrites = 0),
        (this.receiver = null),
        (this.sender = null),
        (this.serviceWorkerReceiverAvailable = !1),
        (this.activeServiceWorker = null),
        (this._workerInitializationPromise =
          this.initializeServiceWorkerMessaging().then(
            () => {},
            () => {}
          ));
    }
    async _openDb() {
      return this.db || (this.db = await Xt()), this.db;
    }
    async _withRetries(e) {
      let t = 0;
      for (;;)
        try {
          const t = await this._openDb();
          return await e(t);
        } catch (e) {
          if (t++ > 3) throw e;
          this.db && (this.db.close(), (this.db = void 0));
        }
    }
    async initializeServiceWorkerMessaging() {
      return Wt() ? this.initializeReceiver() : this.initializeSender();
    }
    async initializeReceiver() {
      (this.receiver = Vt._getInstance(Wt() ? self : null)),
        this.receiver._subscribe("keyChanged", async (e, t) => ({
          keyProcessed: (await this._poll()).includes(t.key),
        })),
        this.receiver._subscribe("ping", async (e, t) => ["keyChanged"]);
    }
    async initializeSender() {
      var e, t;
      if (
        ((this.activeServiceWorker = await (async function () {
          if (
            !(null === navigator || void 0 === navigator
              ? void 0
              : navigator.serviceWorker)
          )
            return null;
          try {
            return (await navigator.serviceWorker.ready).active;
          } catch (e) {
            return null;
          }
        })()),
        !this.activeServiceWorker)
      )
        return;
      this.sender = new Bt(this.activeServiceWorker);
      const r = await this.sender._send("ping", {}, 800);
      r &&
        (null === (e = r[0]) || void 0 === e ? void 0 : e.fulfilled) &&
        (null === (t = r[0]) || void 0 === t
          ? void 0
          : t.value.includes("keyChanged")) &&
        (this.serviceWorkerReceiverAvailable = !0);
    }
    async notifyServiceWorker(e) {
      var t;
      if (
        this.sender &&
        this.activeServiceWorker &&
        ((null ===
          (t =
            null === navigator || void 0 === navigator
              ? void 0
              : navigator.serviceWorker) || void 0 === t
          ? void 0
          : t.controller) || null) === this.activeServiceWorker
      )
        try {
          await this.sender._send(
            "keyChanged",
            { key: e },
            this.serviceWorkerReceiverAvailable ? 800 : 50
          );
        } catch (t) {}
    }
    async _isAvailable() {
      try {
        if (!indexedDB) return !1;
        const e = await Xt();
        return await Yt(e, Lt, "1"), await Qt(e, Lt), !0;
      } catch (e) {}
      return !1;
    }
    async _withPendingWrite(e) {
      this.pendingWrites++;
      try {
        await e();
      } finally {
        this.pendingWrites--;
      }
    }
    async _set(e, t) {
      return this._withPendingWrite(
        async () => (
          await this._withRetries((r) => Yt(r, e, t)),
          (this.localCache[e] = t),
          this.notifyServiceWorker(e)
        )
      );
    }
    async _get(e) {
      const t = await this._withRetries((t) =>
        (async function (e, t) {
          const r = Jt(e, !1).get(t),
            n = await new Gt(r).toPromise();
          return void 0 === n ? null : n.value;
        })(t, e)
      );
      return (this.localCache[e] = t), t;
    }
    async _remove(e) {
      return this._withPendingWrite(
        async () => (
          await this._withRetries((t) => Qt(t, e)),
          delete this.localCache[e],
          this.notifyServiceWorker(e)
        )
      );
    }
    async _poll() {
      const e = await this._withRetries((e) => {
        const t = Jt(e, !1).getAll();
        return new Gt(t).toPromise();
      });
      if (!e) return [];
      if (0 !== this.pendingWrites) return [];
      const t = [],
        r = new Set();
      for (const { fbase_key: n, value: i } of e)
        r.add(n),
          JSON.stringify(this.localCache[n]) !== JSON.stringify(i) &&
            (this.notifyListeners(n, i), t.push(n));
      for (const e of Object.keys(this.localCache))
        this.localCache[e] &&
          !r.has(e) &&
          (this.notifyListeners(e, null), t.push(e));
      return t;
    }
    notifyListeners(e, t) {
      this.localCache[e] = t;
      const r = this.listeners[e];
      if (r) for (const e of Array.from(r)) e(t);
    }
    startPolling() {
      this.stopPolling(),
        (this.pollTimer = setInterval(async () => this._poll(), 800));
    }
    stopPolling() {
      this.pollTimer &&
        (clearInterval(this.pollTimer), (this.pollTimer = null));
    }
    _addListener(e, t) {
      0 === Object.keys(this.listeners).length && this.startPolling(),
        this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
        this.listeners[e].add(t);
    }
    _removeListener(e, t) {
      this.listeners[e] &&
        (this.listeners[e].delete(t),
        0 === this.listeners[e].size && delete this.listeners[e]),
        0 === Object.keys(this.listeners).length && this.stopPolling();
    }
  }
  Zt.type = "LOCAL";
  const er = Zt;
  function tr(e) {
    return new Promise((t, r) => {
      const n = document.createElement("script");
      var i, s;
      n.setAttribute("src", e),
        (n.onload = t),
        (n.onerror = (e) => {
          const t = ye("internal-error");
          (t.customData = e), r(t);
        }),
        (n.type = "text/javascript"),
        (n.charset = "UTF-8"),
        (null !==
          (s =
            null === (i = document.getElementsByTagName("head")) || void 0 === i
              ? void 0
              : i[0]) && void 0 !== s
          ? s
          : document
        ).appendChild(n);
    });
  }
  function rr(e) {
    return `__${e}${Math.floor(1e6 * Math.random())}`;
  }
  const nr = 1e12;
  class ir {
    constructor(e) {
      (this.auth = e), (this.counter = nr), (this._widgets = new Map());
    }
    render(e, t) {
      const r = this.counter;
      return (
        this._widgets.set(r, new sr(e, this.auth.name, t || {})),
        this.counter++,
        r
      );
    }
    reset(e) {
      var t;
      const r = e || nr;
      null === (t = this._widgets.get(r)) || void 0 === t || t.delete(),
        this._widgets.delete(r);
    }
    getResponse(e) {
      var t;
      const r = e || nr;
      return (
        (null === (t = this._widgets.get(r)) || void 0 === t
          ? void 0
          : t.getResponse()) || ""
      );
    }
    async execute(e) {
      var t;
      const r = e || nr;
      return (
        null === (t = this._widgets.get(r)) || void 0 === t || t.execute(), ""
      );
    }
  }
  class sr {
    constructor(e, t, r) {
      (this.params = r),
        (this.timerId = null),
        (this.deleted = !1),
        (this.responseToken = null),
        (this.clickHandler = () => {
          this.execute();
        });
      const n = "string" == typeof e ? document.getElementById(e) : e;
      Ie(n, "argument-error", { appName: t }),
        (this.container = n),
        (this.isVisible = "invisible" !== this.params.size),
        this.isVisible
          ? this.execute()
          : this.container.addEventListener("click", this.clickHandler);
    }
    getResponse() {
      return this.checkIfDeleted(), this.responseToken;
    }
    delete() {
      this.checkIfDeleted(),
        (this.deleted = !0),
        this.timerId && (clearTimeout(this.timerId), (this.timerId = null)),
        this.container.removeEventListener("click", this.clickHandler);
    }
    execute() {
      this.checkIfDeleted(),
        this.timerId ||
          (this.timerId = window.setTimeout(() => {
            this.responseToken = (function (e) {
              const t = [],
                r =
                  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
              for (let e = 0; e < 50; e++)
                t.push(r.charAt(Math.floor(Math.random() * r.length)));
              return t.join("");
            })();
            const { callback: e, "expired-callback": t } = this.params;
            if (e)
              try {
                e(this.responseToken);
              } catch (e) {}
            this.timerId = window.setTimeout(() => {
              if (((this.timerId = null), (this.responseToken = null), t))
                try {
                  t();
                } catch (e) {}
              this.isVisible && this.execute();
            }, 6e4);
          }, 500));
    }
    checkIfDeleted() {
      if (this.deleted) throw new Error("reCAPTCHA mock was already deleted!");
    }
  }
  const or = rr("rcb"),
    ar = new Oe(3e4, 6e4);
  class cr {
    constructor() {
      var e;
      (this.hostLanguage = ""),
        (this.counter = 0),
        (this.librarySeparatelyLoaded = !!(null === (e = zt().grecaptcha) ||
        void 0 === e
          ? void 0
          : e.render));
    }
    load(e, t = "") {
      return (
        Ie(
          (function (e) {
            return e.length <= 6 && /^\s*[a-zA-Z0-9\-]*\s*$/.test(e);
          })(t),
          e,
          "argument-error"
        ),
        this.shouldResolveImmediately(t)
          ? Promise.resolve(zt().grecaptcha)
          : new Promise((r, n) => {
              const i = zt().setTimeout(() => {
                n(ye(e, "network-request-failed"));
              }, ar.get());
              (zt()[or] = () => {
                zt().clearTimeout(i), delete zt()[or];
                const s = zt().grecaptcha;
                if (!s) return void n(ye(e, "internal-error"));
                const o = s.render;
                (s.render = (e, t) => {
                  const r = o(e, t);
                  return this.counter++, r;
                }),
                  (this.hostLanguage = t),
                  r(s);
              }),
                tr(
                  `https://www.google.com/recaptcha/api.js??${l({
                    onload: or,
                    render: "explicit",
                    hl: t,
                  })}`
                ).catch(() => {
                  clearTimeout(i), n(ye(e, "internal-error"));
                });
            })
      );
    }
    clearedOneInstance() {
      this.counter--;
    }
    shouldResolveImmediately(e) {
      var t;
      return (
        !!(null === (t = zt().grecaptcha) || void 0 === t
          ? void 0
          : t.render) &&
        (e === this.hostLanguage ||
          this.counter > 0 ||
          this.librarySeparatelyLoaded)
      );
    }
  }
  class hr {
    async load(e) {
      return new ir(e);
    }
    clearedOneInstance() {}
  }
  const lr = "recaptcha",
    ur = { theme: "light", type: "image" };
  class dr {
    constructor(e, t) {
      (this.verificationId = e), (this.onConfirmation = t);
    }
    confirm(e) {
      const t = It._fromVerification(this.verificationId, e);
      return this.onConfirmation(t);
    }
  }
  async function pr(e, t, r) {
    var n;
    const i = await r.verify();
    try {
      let s;
      if (
        (Ie("string" == typeof i, e, "argument-error"),
        Ie(r.type === lr, e, "argument-error"),
        (s = "string" == typeof t ? { phoneNumber: t } : t),
        "session" in s)
      ) {
        const t = s.session;
        if ("phoneNumber" in s) {
          Ie("enroll" === t.type, e, "internal-error");
          const r = await (function (e, t) {
            return Le(e, "POST", "/v2/accounts/mfaEnrollment:start", De(e, t));
          })(e, {
            idToken: t.credential,
            phoneEnrollmentInfo: {
              phoneNumber: s.phoneNumber,
              recaptchaToken: i,
            },
          });
          return r.phoneSessionInfo.sessionInfo;
        }
        {
          Ie("signin" === t.type, e, "internal-error");
          const r =
            (null === (n = s.multiFactorHint) || void 0 === n
              ? void 0
              : n.uid) || s.multiFactorUid;
          Ie(r, e, "missing-multi-factor-info");
          const o = await (function (e, t) {
            return Le(e, "POST", "/v2/accounts/mfaSignIn:start", De(e, t));
          })(e, {
            mfaPendingCredential: t.credential,
            mfaEnrollmentId: r,
            phoneSignInInfo: { recaptchaToken: i },
          });
          return o.phoneResponseInfo.sessionInfo;
        }
      }
      {
        const { sessionInfo: t } = await (async function (e, t) {
          return Le(e, "POST", "/v1/accounts:sendVerificationCode", De(e, t));
        })(e, { phoneNumber: s.phoneNumber, recaptchaToken: i });
        return t;
      }
    } finally {
      r._reset();
    }
  }
  class fr {
    constructor(e) {
      (this.providerId = fr.PROVIDER_ID), (this.auth = pt(e));
    }
    verifyPhoneNumber(e, t) {
      return pr(this.auth, e, m(t));
    }
    static credential(e, t) {
      return It._fromVerification(e, t);
    }
    static credentialFromResult(e) {
      const t = e;
      return fr.credentialFromTaggedObject(t);
    }
    static credentialFromError(e) {
      return fr.credentialFromTaggedObject(e.customData || {});
    }
    static credentialFromTaggedObject({ _tokenResponse: e }) {
      if (!e) return null;
      const { phoneNumber: t, temporaryProof: r } = e;
      return t && r ? It._fromTokenResponse(t, r) : null;
    }
  }
  (fr.PROVIDER_ID = "phone"), (fr.PHONE_SIGN_IN_METHOD = "phone");
  class mr extends mt {
    constructor(e) {
      super("custom", "custom"), (this.params = e);
    }
    _getIdTokenResponse(e) {
      return vt(e, this._buildIdpRequest());
    }
    _linkToIdToken(e, t) {
      return vt(e, this._buildIdpRequest(t));
    }
    _getReauthenticationResolver(e) {
      return vt(e, this._buildIdpRequest());
    }
    _buildIdpRequest(e) {
      const t = {
        requestUri: this.params.requestUri,
        sessionId: this.params.sessionId,
        postBody: this.params.postBody,
        tenantId: this.params.tenantId,
        pendingToken: this.params.pendingToken,
        returnSecureToken: !0,
        returnIdpCredential: !0,
      };
      return e && (t.idToken = e), t;
    }
  }
  function gr(e) {
    return Dt(e.auth, new mr(e), e.bypassAuthState);
  }
  function vr(e) {
    const { auth: t, user: r } = e;
    return (
      Ie(r, t, "internal-error"),
      (async function (e, t, r = !1) {
        var n;
        const { auth: i } = e,
          s = "reauthenticate";
        try {
          const n = await ze(e, Pt(i, s, t, e), r);
          Ie(n.idToken, i, "internal-error");
          const o = Be(n.idToken);
          Ie(o, i, "internal-error");
          const { sub: a } = o;
          return Ie(e.uid === a, i, "user-mismatch"), Ct._forOperation(e, s, n);
        } catch (e) {
          throw (
            ("auth/user-not-found" ===
              (null === (n = e) || void 0 === n ? void 0 : n.code) &&
              ve(i, "user-mismatch"),
            e)
          );
        }
      })(r, new mr(e), e.bypassAuthState)
    );
  }
  async function yr(e) {
    const { auth: t, user: r } = e;
    return (
      Ie(r, t, "internal-error"),
      (async function (e, t, r = !1) {
        const n = await ze(
          e,
          t._linkToIdToken(e.auth, await e.getIdToken()),
          r
        );
        return Ct._forOperation(e, "link", n);
      })(r, new mr(e), e.bypassAuthState)
    );
  }
  class _r {
    constructor(e, t, r, n, i = !1) {
      (this.auth = e),
        (this.resolver = r),
        (this.user = n),
        (this.bypassAuthState = i),
        (this.pendingPromise = null),
        (this.eventManager = null),
        (this.filter = Array.isArray(t) ? t : [t]);
    }
    execute() {
      return new Promise(async (e, t) => {
        this.pendingPromise = { resolve: e, reject: t };
        try {
          (this.eventManager = await this.resolver._initialize(this.auth)),
            await this.onExecution(),
            this.eventManager.registerConsumer(this);
        } catch (e) {
          this.reject(e);
        }
      });
    }
    async onAuthEvent(e) {
      const {
        urlResponse: t,
        sessionId: r,
        postBody: n,
        tenantId: i,
        error: s,
        type: o,
      } = e;
      if (s) return void this.reject(s);
      const a = {
        auth: this.auth,
        requestUri: t,
        sessionId: r,
        tenantId: i || void 0,
        postBody: n || void 0,
        user: this.user,
        bypassAuthState: this.bypassAuthState,
      };
      try {
        this.resolve(await this.getIdpTask(o)(a));
      } catch (e) {
        this.reject(e);
      }
    }
    onError(e) {
      this.reject(e);
    }
    getIdpTask(e) {
      switch (e) {
        case "signInViaPopup":
        case "signInViaRedirect":
          return gr;
        case "linkViaPopup":
        case "linkViaRedirect":
          return yr;
        case "reauthViaPopup":
        case "reauthViaRedirect":
          return vr;
        default:
          ve(this.auth, "internal-error");
      }
    }
    resolve(e) {
      be(this.pendingPromise, "Pending promise was never set"),
        this.pendingPromise.resolve(e),
        this.unregisterAndCleanUp();
    }
    reject(e) {
      be(this.pendingPromise, "Pending promise was never set"),
        this.pendingPromise.reject(e),
        this.unregisterAndCleanUp();
    }
    unregisterAndCleanUp() {
      this.eventManager && this.eventManager.unregisterConsumer(this),
        (this.pendingPromise = null),
        this.cleanUp();
    }
  }
  const Ir = new Oe(2e3, 1e4);
  class wr extends _r {
    constructor(e, t, r, n, i) {
      super(e, t, n, i),
        (this.provider = r),
        (this.authWindow = null),
        (this.pollId = null),
        wr.currentPopupAction && wr.currentPopupAction.cancel(),
        (wr.currentPopupAction = this);
    }
    async executeNotNull() {
      const e = await this.execute();
      return Ie(e, this.auth, "internal-error"), e;
    }
    async onExecution() {
      be(1 === this.filter.length, "Popup operations only handle one event");
      const e = Ht();
      (this.authWindow = await this.resolver._openPopup(
        this.auth,
        this.provider,
        this.filter[0],
        e
      )),
        (this.authWindow.associatedEvent = e),
        this.resolver._originValidation(this.auth).catch((e) => {
          this.reject(e);
        }),
        this.resolver._isIframeWebStorageSupported(this.auth, (e) => {
          e || this.reject(ye(this.auth, "web-storage-unsupported"));
        }),
        this.pollUserCancellation();
    }
    get eventId() {
      var e;
      return (
        (null === (e = this.authWindow) || void 0 === e
          ? void 0
          : e.associatedEvent) || null
      );
    }
    cancel() {
      this.reject(ye(this.auth, "cancelled-popup-request"));
    }
    cleanUp() {
      this.authWindow && this.authWindow.close(),
        this.pollId && window.clearTimeout(this.pollId),
        (this.authWindow = null),
        (this.pollId = null),
        (wr.currentPopupAction = null);
    }
    pollUserCancellation() {
      const e = () => {
        var t, r;
        (
          null ===
            (r =
              null === (t = this.authWindow) || void 0 === t
                ? void 0
                : t.window) || void 0 === r
            ? void 0
            : r.closed
        )
          ? (this.pollId = window.setTimeout(() => {
              (this.pollId = null),
                this.reject(ye(this.auth, "popup-closed-by-user"));
            }, 2e3))
          : (this.pollId = window.setTimeout(e, Ir.get()));
      };
      e();
    }
  }
  wr.currentPopupAction = null;
  const br = new Map();
  class kr extends _r {
    constructor(e, t, r = !1) {
      super(
        e,
        [
          "signInViaRedirect",
          "linkViaRedirect",
          "reauthViaRedirect",
          "unknown",
        ],
        t,
        void 0,
        r
      ),
        (this.eventId = null);
    }
    async execute() {
      let e = br.get(this.auth._key());
      if (!e) {
        try {
          const t = await (async function (e, t) {
              const r = (function (e) {
                  return Qe("pendingRedirect", e.config.apiKey, e.name);
                })(t),
                n = (function (e) {
                  return Te(e._redirectPersistence);
                })(e);
              if (!(await n._isAvailable())) return !1;
              const i = "true" === (await n._get(r));
              return await n._remove(r), i;
            })(this.resolver, this.auth),
            r = t ? await super.execute() : null;
          e = () => Promise.resolve(r);
        } catch (t) {
          e = () => Promise.reject(t);
        }
        br.set(this.auth._key(), e);
      }
      return (
        this.bypassAuthState ||
          br.set(this.auth._key(), () => Promise.resolve(null)),
        e()
      );
    }
    async onAuthEvent(e) {
      if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
      if ("unknown" !== e.type) {
        if (e.eventId) {
          const t = await this.auth._redirectUserForId(e.eventId);
          if (t) return (this.user = t), super.onAuthEvent(e);
          this.resolve(null);
        }
      } else this.resolve(null);
    }
    async onExecution() {}
    cleanUp() {}
  }
  function Tr(e, t) {
    br.set(e._key(), t);
  }
  async function Er(e, t, r = !1) {
    const n = pt(e),
      i = (function (e, t) {
        return t
          ? Te(t)
          : (Ie(e._popupRedirectResolver, e, "argument-error"),
            e._popupRedirectResolver);
      })(n, t),
      s = new kr(n, i, r),
      o = await s.execute();
    return (
      o &&
        !r &&
        (delete o.user._redirectEventId,
        await n._persistUserIfCurrent(o.user),
        await n._setRedirectUser(null, t)),
      o
    );
  }
  class Sr {
    constructor(e) {
      (this.auth = e),
        (this.cachedEventUids = new Set()),
        (this.consumers = new Set()),
        (this.queuedRedirectEvent = null),
        (this.hasHandledPotentialRedirect = !1),
        (this.lastProcessedEventTime = Date.now());
    }
    registerConsumer(e) {
      this.consumers.add(e),
        this.queuedRedirectEvent &&
          this.isEventForConsumer(this.queuedRedirectEvent, e) &&
          (this.sendToConsumer(this.queuedRedirectEvent, e),
          this.saveEventToCache(this.queuedRedirectEvent),
          (this.queuedRedirectEvent = null));
    }
    unregisterConsumer(e) {
      this.consumers.delete(e);
    }
    onEvent(e) {
      if (this.hasEventBeenHandled(e)) return !1;
      let t = !1;
      return (
        this.consumers.forEach((r) => {
          this.isEventForConsumer(e, r) &&
            ((t = !0), this.sendToConsumer(e, r), this.saveEventToCache(e));
        }),
        this.hasHandledPotentialRedirect ||
          !(function (e) {
            switch (e.type) {
              case "signInViaRedirect":
              case "linkViaRedirect":
              case "reauthViaRedirect":
                return !0;
              case "unknown":
                return Or(e);
              default:
                return !1;
            }
          })(e) ||
          ((this.hasHandledPotentialRedirect = !0),
          t || ((this.queuedRedirectEvent = e), (t = !0))),
        t
      );
    }
    sendToConsumer(e, t) {
      var r;
      if (e.error && !Or(e)) {
        const n =
          (null === (r = e.error.code) || void 0 === r
            ? void 0
            : r.split("auth/")[1]) || "internal-error";
        t.onError(ye(this.auth, n));
      } else t.onAuthEvent(e);
    }
    isEventForConsumer(e, t) {
      const r = null === t.eventId || (!!e.eventId && e.eventId === t.eventId);
      return t.filter.includes(e.type) && r;
    }
    hasEventBeenHandled(e) {
      return (
        Date.now() - this.lastProcessedEventTime >= 6e5 &&
          this.cachedEventUids.clear(),
        this.cachedEventUids.has(Rr(e))
      );
    }
    saveEventToCache(e) {
      this.cachedEventUids.add(Rr(e)),
        (this.lastProcessedEventTime = Date.now());
    }
  }
  function Rr(e) {
    return [e.type, e.eventId, e.sessionId, e.tenantId]
      .filter((e) => e)
      .join("-");
  }
  function Or({ type: e, error: t }) {
    return (
      "unknown" === e && "auth/no-auth-event" === (null == t ? void 0 : t.code)
    );
  }
  const Cr = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
    Ar = /^https?/;
  function Nr(e) {
    const t = Ee(),
      { protocol: r, hostname: n } = new URL(t);
    if (e.startsWith("chrome-extension://")) {
      const i = new URL(e);
      return "" === i.hostname && "" === n
        ? "chrome-extension:" === r &&
            e.replace("chrome-extension://", "") ===
              t.replace("chrome-extension://", "")
        : "chrome-extension:" === r && i.hostname === n;
    }
    if (!Ar.test(r)) return !1;
    if (Cr.test(e)) return n === e;
    const i = e.replace(/\./g, "\\.");
    return new RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(n);
  }
  const Pr = new Oe(3e4, 6e4);
  function Dr() {
    const e = zt().___jsl;
    if (null == e ? void 0 : e.H)
      for (const t of Object.keys(e.H))
        if (
          ((e.H[t].r = e.H[t].r || []),
          (e.H[t].L = e.H[t].L || []),
          (e.H[t].r = [...e.H[t].L]),
          e.CP)
        )
          for (let t = 0; t < e.CP.length; t++) e.CP[t] = null;
  }
  let Lr = null;
  function Mr(e) {
    return (
      (Lr =
        Lr ||
        (function (e) {
          return new Promise((t, r) => {
            var n, i, s;
            function o() {
              Dr(),
                gapi.load("gapi.iframes", {
                  callback: () => {
                    t(gapi.iframes.getContext());
                  },
                  ontimeout: () => {
                    Dr(), r(ye(e, "network-request-failed"));
                  },
                  timeout: Pr.get(),
                });
            }
            if (
              null ===
                (i =
                  null === (n = zt().gapi) || void 0 === n
                    ? void 0
                    : n.iframes) || void 0 === i
                ? void 0
                : i.Iframe
            )
              t(gapi.iframes.getContext());
            else {
              if (
                !(null === (s = zt().gapi) || void 0 === s ? void 0 : s.load)
              ) {
                const t = rr("iframefcb");
                return (
                  (zt()[t] = () => {
                    gapi.load ? o() : r(ye(e, "network-request-failed"));
                  }),
                  tr(`https://apis.google.com/js/api.js?onload=${t}`).catch(
                    (e) => r(e)
                  )
                );
              }
              o();
            }
          }).catch((e) => {
            throw ((Lr = null), e);
          });
        })(e)),
      Lr
    );
  }
  const Ur = new Oe(5e3, 15e3),
    xr = {
      style: {
        position: "absolute",
        top: "-100px",
        width: "1px",
        height: "1px",
      },
      "aria-hidden": "true",
      tabindex: "-1",
    },
    jr = new Map([
      ["identitytoolkit.googleapis.com", "p"],
      ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
      ["test-identitytoolkit.sandbox.googleapis.com", "t"],
    ]);
  function Fr(e) {
    const t = e.config;
    Ie(t.authDomain, e, "auth-domain-config-required");
    const r = t.emulator
        ? Ce(t, "emulator/auth/iframe")
        : `https://${e.config.authDomain}/__/auth/iframe`,
      n = { apiKey: t.apiKey, appName: e.name, v: te },
      i = jr.get(e.config.apiHost);
    i && (n.eid = i);
    const s = e._getFrameworks();
    return s.length && (n.fw = s.join(",")), `${r}?${l(n).slice(1)}`;
  }
  const Vr = {
    location: "yes",
    resizable: "yes",
    statusbar: "yes",
    toolbar: "no",
  };
  class Hr {
    constructor(e) {
      (this.window = e), (this.associatedEvent = null);
    }
    close() {
      if (this.window)
        try {
          this.window.close();
        } catch (e) {}
    }
  }
  function Br(e, t, r, n, i, s) {
    Ie(e.config.authDomain, e, "auth-domain-config-required"),
      Ie(e.config.apiKey, e, "invalid-api-key");
    const o = {
      apiKey: e.config.apiKey,
      appName: e.name,
      authType: r,
      redirectUrl: n,
      v: te,
      eventId: i,
    };
    if (t instanceof kt) {
      t.setDefaultLanguage(e.languageCode),
        (o.providerId = t.providerId || ""),
        (function (e) {
          for (const t in e)
            if (Object.prototype.hasOwnProperty.call(e, t)) return !1;
          return !0;
        })(t.getCustomParameters()) ||
          (o.customParameters = JSON.stringify(t.getCustomParameters()));
      for (const [e, t] of Object.entries(s || {})) o[e] = t;
    }
    if (t instanceof Tt) {
      const e = t.getScopes().filter((e) => "" !== e);
      e.length > 0 && (o.scopes = e.join(","));
    }
    e.tenantId && (o.tid = e.tenantId);
    const a = o;
    for (const e of Object.keys(a)) void 0 === a[e] && delete a[e];
    return `${(function ({ config: e }) {
      return e.emulator
        ? Ce(e, "emulator/auth/handler")
        : `https://${e.authDomain}/__/auth/handler`;
    })(e)}?${l(a).slice(1)}`;
  }
  const zr = "webStorageSupport",
    Wr = class {
      constructor() {
        (this.eventManagers = {}),
          (this.iframes = {}),
          (this.originValidationPromises = {}),
          (this._redirectPersistence = Ft),
          (this._completeRedirectFn = Er),
          (this._overrideRedirectResult = Tr);
      }
      async _openPopup(e, t, r, n) {
        var s;
        return (
          be(
            null === (s = this.eventManagers[e._key()]) || void 0 === s
              ? void 0
              : s.manager,
            "_initialize() not called before _openPopup()"
          ),
          (function (e, t, r, n = 500, s = 600) {
            const o = Math.max(
                (window.screen.availHeight - s) / 2,
                0
              ).toString(),
              a = Math.max((window.screen.availWidth - n) / 2, 0).toString();
            let c = "";
            const h = Object.assign(Object.assign({}, Vr), {
                width: n.toString(),
                height: s.toString(),
                top: o,
                left: a,
              }),
              l = i().toLowerCase();
            r && (c = nt(l) ? "_blank" : r),
              tt(l) && ((t = t || "http://localhost"), (h.scrollbars = "yes"));
            const u = Object.entries(h).reduce(
              (e, [t, r]) => `${e}${t}=${r},`,
              ""
            );
            if (
              (function (e = i()) {
                var t;
                return (
                  ct(e) &&
                  !!(null === (t = window.navigator) || void 0 === t
                    ? void 0
                    : t.standalone)
                );
              })(l) &&
              "_self" !== c
            )
              return (
                (function (e, t) {
                  const r = document.createElement("a");
                  (r.href = e), (r.target = t);
                  const n = document.createEvent("MouseEvent");
                  n.initMouseEvent(
                    "click",
                    !0,
                    !0,
                    window,
                    1,
                    0,
                    0,
                    0,
                    0,
                    !1,
                    !1,
                    !1,
                    !1,
                    1,
                    null
                  ),
                    r.dispatchEvent(n);
                })(t || "", c),
                new Hr(null)
              );
            const d = window.open(t || "", c, u);
            Ie(d, e, "popup-blocked");
            try {
              d.focus();
            } catch (e) {}
            return new Hr(d);
          })(e, Br(e, t, r, Ee(), n), Ht())
        );
      }
      async _openRedirect(e, t, r, n) {
        var i;
        return (
          await this._originValidation(e),
          (i = Br(e, t, r, Ee(), n)),
          (zt().location.href = i),
          new Promise(() => {})
        );
      }
      _initialize(e) {
        const t = e._key();
        if (this.eventManagers[t]) {
          const { manager: e, promise: r } = this.eventManagers[t];
          return e
            ? Promise.resolve(e)
            : (be(r, "If manager is not set, promise should be"), r);
        }
        const r = this.initAndGetManager(e);
        return (
          (this.eventManagers[t] = { promise: r }),
          r.catch(() => {
            delete this.eventManagers[t];
          }),
          r
        );
      }
      async initAndGetManager(e) {
        const t = await (async function (e) {
            const t = await Mr(e),
              r = zt().gapi;
            return (
              Ie(r, e, "internal-error"),
              t.open(
                {
                  where: document.body,
                  url: Fr(e),
                  messageHandlersFilter: r.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
                  attributes: xr,
                  dontclear: !0,
                },
                (t) =>
                  new Promise(async (r, n) => {
                    await t.restyle({ setHideOnLeave: !1 });
                    const i = ye(e, "network-request-failed"),
                      s = zt().setTimeout(() => {
                        n(i);
                      }, Ur.get());
                    function o() {
                      zt().clearTimeout(s), r(t);
                    }
                    t.ping(o).then(o, () => {
                      n(i);
                    });
                  })
              )
            );
          })(e),
          r = new Sr(e);
        return (
          t.register(
            "authEvent",
            (t) => (
              Ie(null == t ? void 0 : t.authEvent, e, "invalid-auth-event"),
              { status: r.onEvent(t.authEvent) ? "ACK" : "ERROR" }
            ),
            gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
          ),
          (this.eventManagers[e._key()] = { manager: r }),
          (this.iframes[e._key()] = t),
          r
        );
      }
      _isIframeWebStorageSupported(e, t) {
        this.iframes[e._key()].send(
          zr,
          { type: zr },
          (r) => {
            var n;
            const i =
              null === (n = null == r ? void 0 : r[0]) || void 0 === n
                ? void 0
                : n.webStorageSupport;
            void 0 !== i && t(!!i), ve(e, "internal-error");
          },
          gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
        );
      }
      _originValidation(e) {
        const t = e._key();
        return (
          this.originValidationPromises[t] ||
            (this.originValidationPromises[t] = (async function (e) {
              if (e.config.emulator) return;
              const { authorizedDomains: t } = await (async function (
                e,
                t = {}
              ) {
                return Le(e, "GET", "/v1/projects", t);
              })(e);
              for (const e of t)
                try {
                  if (Nr(e)) return;
                } catch (e) {}
              ve(e, "unauthorized-domain");
            })(e)),
          this.originValidationPromises[t]
        );
      }
      get _shouldInitProactively() {
        return ht() || rt() || ct();
      }
    };
  var $r,
    qr = "@firebase/auth",
    Kr = "0.20.5";
  class Gr {
    constructor(e) {
      (this.auth = e), (this.internalListeners = new Map());
    }
    getUid() {
      var e;
      return (
        this.assertAuthConfigured(),
        (null === (e = this.auth.currentUser) || void 0 === e
          ? void 0
          : e.uid) || null
      );
    }
    async getToken(e) {
      return (
        this.assertAuthConfigured(),
        await this.auth._initializationPromise,
        this.auth.currentUser
          ? { accessToken: await this.auth.currentUser.getIdToken(e) }
          : null
      );
    }
    addAuthTokenListener(e) {
      if ((this.assertAuthConfigured(), this.internalListeners.has(e))) return;
      const t = this.auth.onIdTokenChanged((t) => {
        var r;
        e(
          (null === (r = t) || void 0 === r
            ? void 0
            : r.stsTokenManager.accessToken) || null
        );
      });
      this.internalListeners.set(e, t), this.updateProactiveRefresh();
    }
    removeAuthTokenListener(e) {
      this.assertAuthConfigured();
      const t = this.internalListeners.get(e);
      t &&
        (this.internalListeners.delete(e), t(), this.updateProactiveRefresh());
    }
    assertAuthConfigured() {
      Ie(
        this.auth._initializationPromise,
        "dependent-sdk-initialized-before-auth"
      );
    }
    updateProactiveRefresh() {
      this.internalListeners.size > 0
        ? this.auth._startProactiveRefresh()
        : this.auth._stopProactiveRefresh();
    }
  }
  ($r = "Browser"),
    Y(
      new g(
        "auth",
        (e, { options: t }) => {
          const r = e.getProvider("app").getImmediate(),
            n = e.getProvider("heartbeat"),
            { apiKey: i, authDomain: s } = r.options;
          return ((e, r) => {
            Ie(i && !i.includes(":"), "invalid-api-key", { appName: e.name }),
              Ie(!(null == s ? void 0 : s.includes(":")), "argument-error", {
                appName: e.name,
              });
            const n = {
                apiKey: i,
                authDomain: s,
                clientPlatform: $r,
                apiHost: "identitytoolkit.googleapis.com",
                tokenApiHost: "securetoken.googleapis.com",
                apiScheme: "https",
                sdkClientVersion: lt($r),
              },
              o = new dt(e, r, n);
            return (
              (function (e, t) {
                const r = (null == t ? void 0 : t.persistence) || [],
                  n = (Array.isArray(r) ? r : [r]).map(Te);
                (null == t ? void 0 : t.errorMap) &&
                  e._updateErrorMap(t.errorMap),
                  e._initializeWithPersistence(
                    n,
                    null == t ? void 0 : t.popupRedirectResolver
                  );
              })(o, t),
              o
            );
          })(r, n);
        },
        "PUBLIC"
      )
        .setInstantiationMode("EXPLICIT")
        .setInstanceCreatedCallback((e, t, r) => {
          e.getProvider("auth-internal").initialize();
        })
    ),
    Y(
      new g(
        "auth-internal",
        (e) => ((e) => new Gr(e))(pt(e.getProvider("auth").getImmediate())),
        "PRIVATE"
      ).setInstantiationMode("EXPLICIT")
    ),
    re(qr, Kr, void 0),
    re(qr, Kr, "esm2017"),
    (function (e, t = {}) {
      "object" != typeof t && (t = { name: t });
      const r = Object.assign(
          { name: "[DEFAULT]", automaticDataCollectionEnabled: !1 },
          t
        ),
        n = r.name;
      if ("string" != typeof n || !n)
        throw Z.create("bad-app-name", { appName: String(n) });
      const i = G.get(n);
      if (i) {
        if (c(e, i.options) && c(r, i.config)) return i;
        throw Z.create("duplicate-app", { appName: n });
      }
      const s = new _(n);
      for (const e of J.values()) s.addComponent(e);
      const o = new ee(e, r, s);
      G.set(n, o);
    })({
      apiKey: "AIzaSyCbi_HOG3zfMBHU0Jk3huT4aIafliN69Fs",
      authDomain: "magiclife-b626c.firebaseapp.com",
      projectId: "magiclife-b626c",
      storageBucket: "magiclife-b626c.appspot.com",
      messagingSenderId: "218854478267",
      appId: "1:218854478267:web:b66ac65c192fe4e7baf49e",
      measurementId: "G-0Q62FTKV51",
    });
  const Jr = (function (
    e = (function (e = "[DEFAULT]") {
      const t = G.get(e);
      if (!t) throw Z.create("no-app", { appName: e });
      return t;
    })()
  ) {
    const t = Q(e, "auth");
    return t.isInitialized()
      ? t.getImmediate()
      : (function (e, t) {
          const r = Q(e, "auth");
          if (r.isInitialized()) {
            const e = r.getImmediate();
            if (c(r.getOptions(), null != t ? t : {})) return e;
            ve(e, "already-initialized");
          }
          return r.initialize({ options: t });
        })(e, { popupRedirectResolver: Wr, persistence: [er, xt, Ft] });
  })();
  (Jr.languageCode = "en"),
    (window.recaptchaVerifier = new (class {
      constructor(e, t = Object.assign({}, ur), r) {
        (this.parameters = t),
          (this.type = lr),
          (this.destroyed = !1),
          (this.widgetId = null),
          (this.tokenChangeListeners = new Set()),
          (this.renderPromise = null),
          (this.recaptcha = null),
          (this.auth = pt(r)),
          (this.isInvisible = "invisible" === this.parameters.size),
          Ie(
            "undefined" != typeof document,
            this.auth,
            "operation-not-supported-in-this-environment"
          );
        const n = "string" == typeof e ? document.getElementById(e) : e;
        Ie(n, this.auth, "argument-error"),
          (this.container = n),
          (this.parameters.callback = this.makeTokenCallback(
            this.parameters.callback
          )),
          (this._recaptchaLoader = this.auth.settings
            .appVerificationDisabledForTesting
            ? new hr()
            : new cr()),
          this.validateStartingState();
      }
      async verify() {
        this.assertNotDestroyed();
        const e = await this.render(),
          t = this.getAssertedRecaptcha();
        return (
          t.getResponse(e) ||
          new Promise((r) => {
            const n = (e) => {
              e && (this.tokenChangeListeners.delete(n), r(e));
            };
            this.tokenChangeListeners.add(n), this.isInvisible && t.execute(e);
          })
        );
      }
      render() {
        try {
          this.assertNotDestroyed();
        } catch (e) {
          return Promise.reject(e);
        }
        return (
          this.renderPromise ||
            (this.renderPromise = this.makeRenderPromise().catch((e) => {
              throw ((this.renderPromise = null), e);
            })),
          this.renderPromise
        );
      }
      _reset() {
        this.assertNotDestroyed(),
          null !== this.widgetId &&
            this.getAssertedRecaptcha().reset(this.widgetId);
      }
      clear() {
        this.assertNotDestroyed(),
          (this.destroyed = !0),
          this._recaptchaLoader.clearedOneInstance(),
          this.isInvisible ||
            this.container.childNodes.forEach((e) => {
              this.container.removeChild(e);
            });
      }
      validateStartingState() {
        Ie(!this.parameters.sitekey, this.auth, "argument-error"),
          Ie(
            this.isInvisible || !this.container.hasChildNodes(),
            this.auth,
            "argument-error"
          ),
          Ie(
            "undefined" != typeof document,
            this.auth,
            "operation-not-supported-in-this-environment"
          );
      }
      makeTokenCallback(e) {
        return (t) => {
          if (
            (this.tokenChangeListeners.forEach((e) => e(t)),
            "function" == typeof e)
          )
            e(t);
          else if ("string" == typeof e) {
            const r = zt()[e];
            "function" == typeof r && r(t);
          }
        };
      }
      assertNotDestroyed() {
        Ie(!this.destroyed, this.auth, "internal-error");
      }
      async makeRenderPromise() {
        if ((await this.init(), !this.widgetId)) {
          let e = this.container;
          if (!this.isInvisible) {
            const t = document.createElement("div");
            e.appendChild(t), (e = t);
          }
          this.widgetId = this.getAssertedRecaptcha().render(
            e,
            this.parameters
          );
        }
        return this.widgetId;
      }
      async init() {
        Ie(Se() && !Wt(), this.auth, "internal-error"),
          await (function () {
            let e = null;
            return new Promise((t) => {
              "complete" !== document.readyState
                ? ((e = () => t()), window.addEventListener("load", e))
                : t();
            }).catch((t) => {
              throw (e && window.removeEventListener("load", e), t);
            });
          })(),
          (this.recaptcha = await this._recaptchaLoader.load(
            this.auth,
            this.auth.languageCode || void 0
          ));
        const e = await (async function (e) {
          return (
            (await Le(e, "GET", "/v1/recaptchaParams")).recaptchaSiteKey || ""
          );
        })(this.auth);
        Ie(e, this.auth, "internal-error"), (this.parameters.sitekey = e);
      }
      getAssertedRecaptcha() {
        return Ie(this.recaptcha, this.auth, "internal-error"), this.recaptcha;
      }
    })("send", { size: "invisible", callback: (e) => {} }, Jr)),
    document.querySelector("#send").addEventListener("click", () => {
      const e = document.querySelector("#phoneNumber").value,
        t = window.recaptchaVerifier;
      console.log(e),
        (async function (e, t, r) {
          const n = pt(e),
            i = await pr(n, t, m(r));
          return new dr(i, (e) =>
            (async function (e, t) {
              return Dt(pt(e), t);
            })(n, e)
          );
        })(Jr, e, t)
          .then((e) => {
            (window.confirmationResult = e), console.log("kod kettu");
          })
          .catch((e) => {
            console.log(e);
          });
    }),
    document.querySelector("#verifying").addEventListener("click", () => {
      const e = document.querySelector("#verify").value;
      window.confirmationResult
        .confirm(e)
        .then((e) => {
          alert("Siz tizimga kirdingiz");
        })
        .catch((e) => {
          alert("xato parol kiritdingiz");
        });
    });
})();
