'use strict';
(self.webpackChunkngx_datatable = self.webpackChunkngx_datatable || []).push([
  [179],
  {
    261: () => {
      function le(t) {
        return 'function' == typeof t;
      }
      function Oo(t) {
        const e = t(r => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (e.prototype = Object.create(Error.prototype)), (e.prototype.constructor = e), e;
      }
      const ns = Oo(
        t =>
          function (e) {
            t(this),
              (this.message = e
                ? `${e.length} errors occurred during unsubscription:\n${e
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = e);
          }
      );
      function Nr(t, n) {
        if (t) {
          const e = t.indexOf(n);
          0 <= e && t.splice(e, 1);
        }
      }
      class Dt {
        constructor(n) {
          (this.initialTeardown = n), (this.closed = !1), (this._parentage = null), (this._finalizers = null);
        }
        unsubscribe() {
          let n;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: e } = this;
            if (e)
              if (((this._parentage = null), Array.isArray(e))) for (const i of e) i.remove(this);
              else e.remove(this);
            const { initialTeardown: r } = this;
            if (le(r))
              try {
                r();
              } catch (i) {
                n = i instanceof ns ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  Ef(i);
                } catch (s) {
                  (n = null != n ? n : []), s instanceof ns ? (n = [...n, ...s.errors]) : n.push(s);
                }
            }
            if (n) throw new ns(n);
          }
        }
        add(n) {
          var e;
          if (n && n !== this)
            if (this.closed) Ef(n);
            else {
              if (n instanceof Dt) {
                if (n.closed || n._hasParent(this)) return;
                n._addParent(this);
              }
              (this._finalizers = null !== (e = this._finalizers) && void 0 !== e ? e : []).push(n);
            }
        }
        _hasParent(n) {
          const { _parentage: e } = this;
          return e === n || (Array.isArray(e) && e.includes(n));
        }
        _addParent(n) {
          const { _parentage: e } = this;
          this._parentage = Array.isArray(e) ? (e.push(n), e) : e ? [e, n] : n;
        }
        _removeParent(n) {
          const { _parentage: e } = this;
          e === n ? (this._parentage = null) : Array.isArray(e) && Nr(e, n);
        }
        remove(n) {
          const { _finalizers: e } = this;
          e && Nr(e, n), n instanceof Dt && n._removeParent(this);
        }
      }
      Dt.EMPTY = (() => {
        const t = new Dt();
        return (t.closed = !0), t;
      })();
      const xf = Dt.EMPTY;
      function If(t) {
        return t instanceof Dt || (t && 'closed' in t && le(t.remove) && le(t.add) && le(t.unsubscribe));
      }
      function Ef(t) {
        le(t) ? t() : t.unsubscribe();
      }
      const ar = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1
        },
        rs = {
          setTimeout(t, n, ...e) {
            const { delegate: r } = rs;
            return null != r && r.setTimeout ? r.setTimeout(t, n, ...e) : setTimeout(t, n, ...e);
          },
          clearTimeout(t) {
            const { delegate: n } = rs;
            return ((null == n ? void 0 : n.clearTimeout) || clearTimeout)(t);
          },
          delegate: void 0
        };
      function Mf(t) {
        rs.setTimeout(() => {
          const { onUnhandledError: n } = ar;
          if (!n) throw t;
          n(t);
        });
      }
      function os() {}
      const fv = gl('C', void 0, void 0);
      function gl(t, n, e) {
        return { kind: t, value: n, error: e };
      }
      let lr = null;
      function is(t) {
        if (ar.useDeprecatedSynchronousErrorHandling) {
          const n = !lr;
          if ((n && (lr = { errorThrown: !1, error: null }), t(), n)) {
            const { errorThrown: e, error: r } = lr;
            if (((lr = null), e)) throw r;
          }
        } else t();
      }
      class ml extends Dt {
        constructor(n) {
          super(), (this.isStopped = !1), n ? ((this.destination = n), If(n) && n.add(this)) : (this.destination = wv);
        }
        static create(n, e, r) {
          return new Ho(n, e, r);
        }
        next(n) {
          this.isStopped
            ? yl(
                (function pv(t) {
                  return gl('N', t, void 0);
                })(n),
                this
              )
            : this._next(n);
        }
        error(n) {
          this.isStopped
            ? yl(
                (function hv(t) {
                  return gl('E', void 0, t);
                })(n),
                this
              )
            : ((this.isStopped = !0), this._error(n));
        }
        complete() {
          this.isStopped ? yl(fv, this) : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
        }
        _next(n) {
          this.destination.next(n);
        }
        _error(n) {
          try {
            this.destination.error(n);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const mv = Function.prototype.bind;
      function _l(t, n) {
        return mv.call(t, n);
      }
      class _v {
        constructor(n) {
          this.partialObserver = n;
        }
        next(n) {
          const { partialObserver: e } = this;
          if (e.next)
            try {
              e.next(n);
            } catch (r) {
              ss(r);
            }
        }
        error(n) {
          const { partialObserver: e } = this;
          if (e.error)
            try {
              e.error(n);
            } catch (r) {
              ss(r);
            }
          else ss(n);
        }
        complete() {
          const { partialObserver: n } = this;
          if (n.complete)
            try {
              n.complete();
            } catch (e) {
              ss(e);
            }
        }
      }
      class Ho extends ml {
        constructor(n, e, r) {
          let o;
          if ((super(), le(n) || !n))
            o = { next: null != n ? n : void 0, error: null != e ? e : void 0, complete: null != r ? r : void 0 };
          else {
            let i;
            this && ar.useDeprecatedNextContext
              ? ((i = Object.create(n)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: n.next && _l(n.next, i),
                  error: n.error && _l(n.error, i),
                  complete: n.complete && _l(n.complete, i)
                }))
              : (o = n);
          }
          this.destination = new _v(o);
        }
      }
      function ss(t) {
        ar.useDeprecatedSynchronousErrorHandling
          ? (function gv(t) {
              ar.useDeprecatedSynchronousErrorHandling && lr && ((lr.errorThrown = !0), (lr.error = t));
            })(t)
          : Mf(t);
      }
      function yl(t, n) {
        const { onStoppedNotification: e } = ar;
        e && rs.setTimeout(() => e(t, n));
      }
      const wv = {
          closed: !0,
          next: os,
          error: function yv(t) {
            throw t;
          },
          complete: os
        },
        wl = ('function' == typeof Symbol && Symbol.observable) || '@@observable';
      function cr(t) {
        return t;
      }
      function Af(t) {
        return 0 === t.length
          ? cr
          : 1 === t.length
          ? t[0]
          : function (e) {
              return t.reduce((r, o) => o(r), e);
            };
      }
      let Ie = (() => {
        class t {
          constructor(e) {
            e && (this._subscribe = e);
          }
          lift(e) {
            const r = new t();
            return (r.source = this), (r.operator = e), r;
          }
          subscribe(e, r, o) {
            const i = (function Cv(t) {
              return (
                (t && t instanceof ml) ||
                ((function vv(t) {
                  return t && le(t.next) && le(t.error) && le(t.complete);
                })(t) &&
                  If(t))
              );
            })(e)
              ? e
              : new Ho(e, r, o);
            return (
              is(() => {
                const { operator: s, source: a } = this;
                i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i));
              }),
              i
            );
          }
          _trySubscribe(e) {
            try {
              return this._subscribe(e);
            } catch (r) {
              e.error(r);
            }
          }
          forEach(e, r) {
            return new (r = Rf(r))((o, i) => {
              const s = new Ho({
                next: a => {
                  try {
                    e(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o
              });
              this.subscribe(s);
            });
          }
          _subscribe(e) {
            var r;
            return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(e);
          }
          [wl]() {
            return this;
          }
          pipe(...e) {
            return Af(e)(this);
          }
          toPromise(e) {
            return new (e = Rf(e))((r, o) => {
              let i;
              this.subscribe(
                s => (i = s),
                s => o(s),
                () => r(i)
              );
            });
          }
        }
        return (t.create = n => new t(n)), t;
      })();
      function Rf(t) {
        var n;
        return null !== (n = null != t ? t : ar.Promise) && void 0 !== n ? n : Promise;
      }
      const Dv = Oo(
        t =>
          function () {
            t(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed');
          }
      );
      let qt = (() => {
        class t extends Ie {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(e) {
            const r = new kf(this, this);
            return (r.operator = e), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Dv();
          }
          next(e) {
            is(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(e);
              }
            });
          }
          error(e) {
            is(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = e);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(e);
              }
            });
          }
          complete() {
            is(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: e } = this;
                for (; e.length; ) e.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
          }
          get observed() {
            var e;
            return (null === (e = this.observers) || void 0 === e ? void 0 : e.length) > 0;
          }
          _trySubscribe(e) {
            return this._throwIfClosed(), super._trySubscribe(e);
          }
          _subscribe(e) {
            return this._throwIfClosed(), this._checkFinalizedStatuses(e), this._innerSubscribe(e);
          }
          _innerSubscribe(e) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? xf
              : ((this.currentObservers = null),
                i.push(e),
                new Dt(() => {
                  (this.currentObservers = null), Nr(i, e);
                }));
          }
          _checkFinalizedStatuses(e) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? e.error(o) : i && e.complete();
          }
          asObservable() {
            const e = new Ie();
            return (e.source = this), e;
          }
        }
        return (t.create = (n, e) => new kf(n, e)), t;
      })();
      class kf extends qt {
        constructor(n, e) {
          super(), (this.destination = n), (this.source = e);
        }
        next(n) {
          var e, r;
          null === (r = null === (e = this.destination) || void 0 === e ? void 0 : e.next) ||
            void 0 === r ||
            r.call(e, n);
        }
        error(n) {
          var e, r;
          null === (r = null === (e = this.destination) || void 0 === e ? void 0 : e.error) ||
            void 0 === r ||
            r.call(e, n);
        }
        complete() {
          var n, e;
          null === (e = null === (n = this.destination) || void 0 === n ? void 0 : n.complete) ||
            void 0 === e ||
            e.call(n);
        }
        _subscribe(n) {
          var e, r;
          return null !== (r = null === (e = this.source) || void 0 === e ? void 0 : e.subscribe(n)) && void 0 !== r
            ? r
            : xf;
        }
      }
      function Pf(t) {
        return le(null == t ? void 0 : t.lift);
      }
      function He(t) {
        return n => {
          if (Pf(n))
            return n.lift(function (e) {
              try {
                return t(e, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError('Unable to lift unknown Observable type');
        };
      }
      function Le(t, n, e, r, o) {
        return new Tv(t, n, e, r, o);
      }
      class Tv extends ml {
        constructor(n, e, r, o, i, s) {
          super(n),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = e
              ? function (a) {
                  try {
                    e(a);
                  } catch (l) {
                    n.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    n.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    n.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var n;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: e } = this;
            super.unsubscribe(), !e && (null === (n = this.onFinalize) || void 0 === n || n.call(this));
          }
        }
      }
      function ie(t, n) {
        return He((e, r) => {
          let o = 0;
          e.subscribe(
            Le(r, i => {
              r.next(t.call(n, i, o++));
            })
          );
        });
      }
      function ur(t) {
        return this instanceof ur ? ((this.v = t), this) : new ur(t);
      }
      function Ev(t, n, e) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var o,
          r = e.apply(t, n || []),
          i = [];
        return (
          (o = {}),
          s('next'),
          s('throw'),
          s('return'),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(h) {
          r[h] &&
            (o[h] = function (y) {
              return new Promise(function (w, C) {
                i.push([h, y, w, C]) > 1 || a(h, y);
              });
            });
        }
        function a(h, y) {
          try {
            !(function l(h) {
              h.value instanceof ur ? Promise.resolve(h.value.v).then(c, u) : d(i[0][2], h);
            })(r[h](y));
          } catch (w) {
            d(i[0][3], w);
          }
        }
        function c(h) {
          a('next', h);
        }
        function u(h) {
          a('throw', h);
        }
        function d(h, y) {
          h(y), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function Mv(t) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var e,
          n = t[Symbol.asyncIterator];
        return n
          ? n.call(t)
          : ((t = (function Of(t) {
              var n = 'function' == typeof Symbol && Symbol.iterator,
                e = n && t[n],
                r = 0;
              if (e) return e.call(t);
              if (t && 'number' == typeof t.length)
                return {
                  next: function () {
                    return t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t };
                  }
                };
              throw new TypeError(n ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
            })(t)),
            (e = {}),
            r('next'),
            r('throw'),
            r('return'),
            (e[Symbol.asyncIterator] = function () {
              return this;
            }),
            e);
        function r(i) {
          e[i] =
            t[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    i({ value: c, done: a });
                  }, s);
                })(a, l, (s = t[i](s)).done, s.value);
              });
            };
        }
      }
      const vl = t => t && 'number' == typeof t.length && 'function' != typeof t;
      function Hf(t) {
        return le(null == t ? void 0 : t.then);
      }
      function Lf(t) {
        return le(t[wl]);
      }
      function Bf(t) {
        return Symbol.asyncIterator && le(null == t ? void 0 : t[Symbol.asyncIterator]);
      }
      function jf(t) {
        return new TypeError(
          `You provided ${
            null !== t && 'object' == typeof t ? 'an invalid object' : `'${t}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Vf = (function Rv() {
        return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
      })();
      function $f(t) {
        return le(null == t ? void 0 : t[Vf]);
      }
      function Uf(t) {
        return Ev(this, arguments, function* () {
          const e = t.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield ur(e.read());
              if (o) return yield ur(void 0);
              yield yield ur(r);
            }
          } finally {
            e.releaseLock();
          }
        });
      }
      function zf(t) {
        return le(null == t ? void 0 : t.getReader);
      }
      function Nt(t) {
        if (t instanceof Ie) return t;
        if (null != t) {
          if (Lf(t))
            return (function kv(t) {
              return new Ie(n => {
                const e = t[wl]();
                if (le(e.subscribe)) return e.subscribe(n);
                throw new TypeError('Provided object does not correctly implement Symbol.observable');
              });
            })(t);
          if (vl(t))
            return (function Pv(t) {
              return new Ie(n => {
                for (let e = 0; e < t.length && !n.closed; e++) n.next(t[e]);
                n.complete();
              });
            })(t);
          if (Hf(t))
            return (function Fv(t) {
              return new Ie(n => {
                t.then(
                  e => {
                    n.closed || (n.next(e), n.complete());
                  },
                  e => n.error(e)
                ).then(null, Mf);
              });
            })(t);
          if (Bf(t)) return Gf(t);
          if ($f(t))
            return (function Nv(t) {
              return new Ie(n => {
                for (const e of t) if ((n.next(e), n.closed)) return;
                n.complete();
              });
            })(t);
          if (zf(t))
            return (function Ov(t) {
              return Gf(Uf(t));
            })(t);
        }
        throw jf(t);
      }
      function Gf(t) {
        return new Ie(n => {
          (function Hv(t, n) {
            var e, r, o, i;
            return (function xv(t, n, e, r) {
              return new (e || (e = Promise))(function (i, s) {
                function a(u) {
                  try {
                    c(r.next(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(u) {
                  try {
                    c(r.throw(u));
                  } catch (d) {
                    s(d);
                  }
                }
                function c(u) {
                  u.done
                    ? i(u.value)
                    : (function o(i) {
                        return i instanceof e
                          ? i
                          : new e(function (s) {
                              s(i);
                            });
                      })(u.value).then(a, l);
                }
                c((r = r.apply(t, n || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (e = Mv(t); !(r = yield e.next()).done; ) if ((n.next(r.value), n.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = e.return) && (yield i.call(e));
                } finally {
                  if (o) throw o.error;
                }
              }
              n.complete();
            });
          })(t, n).catch(e => n.error(e));
        });
      }
      function wn(t, n, e, r = 0, o = !1) {
        const i = n.schedule(function () {
          e(), o ? t.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((t.add(i), !o)) return i;
      }
      function Ue(t, n, e = 1 / 0) {
        return le(n)
          ? Ue((r, o) => ie((i, s) => n(r, i, o, s))(Nt(t(r, o))), e)
          : ('number' == typeof n && (e = n),
            He((r, o) =>
              (function Lv(t, n, e, r, o, i, s, a) {
                const l = [];
                let c = 0,
                  u = 0,
                  d = !1;
                const h = () => {
                    d && !l.length && !c && n.complete();
                  },
                  y = C => (c < r ? w(C) : l.push(C)),
                  w = C => {
                    i && n.next(C), c++;
                    let T = !1;
                    Nt(e(C, u++)).subscribe(
                      Le(
                        n,
                        M => {
                          null == o || o(M), i ? y(M) : n.next(M);
                        },
                        () => {
                          T = !0;
                        },
                        void 0,
                        () => {
                          if (T)
                            try {
                              for (c--; l.length && c < r; ) {
                                const M = l.shift();
                                s ? wn(n, s, () => w(M)) : w(M);
                              }
                              h();
                            } catch (M) {
                              n.error(M);
                            }
                        }
                      )
                    );
                  };
                return (
                  t.subscribe(
                    Le(n, y, () => {
                      (d = !0), h();
                    })
                  ),
                  () => {
                    null == a || a();
                  }
                );
              })(r, o, t, e)
            ));
      }
      function Or(t = 1 / 0) {
        return Ue(cr, t);
      }
      const bn = new Ie(t => t.complete());
      function Wf(t) {
        return t && le(t.schedule);
      }
      function Cl(t) {
        return t[t.length - 1];
      }
      function Lo(t) {
        return Wf(Cl(t)) ? t.pop() : void 0;
      }
      function qf(t, n = 0) {
        return He((e, r) => {
          e.subscribe(
            Le(
              r,
              o => wn(r, t, () => r.next(o), n),
              () => wn(r, t, () => r.complete(), n),
              o => wn(r, t, () => r.error(o), n)
            )
          );
        });
      }
      function Qf(t, n = 0) {
        return He((e, r) => {
          r.add(t.schedule(() => e.subscribe(r), n));
        });
      }
      function Xf(t, n) {
        if (!t) throw new Error('Iterable cannot be null');
        return new Ie(e => {
          wn(e, n, () => {
            const r = t[Symbol.asyncIterator]();
            wn(
              e,
              n,
              () => {
                r.next().then(o => {
                  o.done ? e.complete() : e.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ze(t, n) {
        return n
          ? (function qv(t, n) {
              if (null != t) {
                if (Lf(t))
                  return (function $v(t, n) {
                    return Nt(t).pipe(Qf(n), qf(n));
                  })(t, n);
                if (vl(t))
                  return (function zv(t, n) {
                    return new Ie(e => {
                      let r = 0;
                      return n.schedule(function () {
                        r === t.length ? e.complete() : (e.next(t[r++]), e.closed || this.schedule());
                      });
                    });
                  })(t, n);
                if (Hf(t))
                  return (function Uv(t, n) {
                    return Nt(t).pipe(Qf(n), qf(n));
                  })(t, n);
                if (Bf(t)) return Xf(t, n);
                if ($f(t))
                  return (function Gv(t, n) {
                    return new Ie(e => {
                      let r;
                      return (
                        wn(e, n, () => {
                          (r = t[Vf]()),
                            wn(
                              e,
                              n,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void e.error(s);
                                }
                                i ? e.complete() : e.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => le(null == r ? void 0 : r.return) && r.return()
                      );
                    });
                  })(t, n);
                if (zf(t))
                  return (function Wv(t, n) {
                    return Xf(Uf(t), n);
                  })(t, n);
              }
              throw jf(t);
            })(t, n)
          : Nt(t);
      }
      function Dl(t, n, ...e) {
        if (!0 === n) return void t();
        if (!1 === n) return;
        const r = new Ho({
          next: () => {
            r.unsubscribe(), t();
          }
        });
        return n(...e).subscribe(r);
      }
      function ge(t) {
        for (let n in t) if (t[n] === ge) return n;
        throw Error('Could not find renamed property on target object.');
      }
      function me(t) {
        if ('string' == typeof t) return t;
        if (Array.isArray(t)) return '[' + t.map(me).join(', ') + ']';
        if (null == t) return '' + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const n = t.toString();
        if (null == n) return '' + n;
        const e = n.indexOf('\n');
        return -1 === e ? n : n.substring(0, e);
      }
      function Sl(t, n) {
        return null == t || '' === t ? (null === n ? '' : n) : null == n || '' === n ? t : t + ' ' + n;
      }
      const Yv = ge({ __forward_ref__: ge });
      function xl(t) {
        return (
          (t.__forward_ref__ = xl),
          (t.toString = function () {
            return me(this());
          }),
          t
        );
      }
      function z(t) {
        return (function Il(t) {
          return 'function' == typeof t && t.hasOwnProperty(Yv) && t.__forward_ref__ === xl;
        })(t)
          ? t()
          : t;
      }
      class F extends Error {
        constructor(n, e) {
          super(
            (function as(t, n) {
              return `NG0${Math.abs(t)}${n ? ': ' + n.trim() : ''}`;
            })(n, e)
          ),
            (this.code = n);
        }
      }
      function Q(t) {
        return 'string' == typeof t ? t : null == t ? '' : String(t);
      }
      function ls(t, n) {
        throw new F(-201, !1);
      }
      function St(t, n) {
        null == t &&
          (function fe(t, n, e, r) {
            throw new Error(`ASSERTION ERROR: ${t}` + (null == r ? '' : ` [Expected=> ${e} ${r} ${n} <=Actual]`));
          })(n, t, null, '!=');
      }
      function G(t) {
        return { token: t.token, providedIn: t.providedIn || null, factory: t.factory, value: void 0 };
      }
      function Cn(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function cs(t) {
        return Yf(t, us) || Yf(t, Kf);
      }
      function Yf(t, n) {
        return t.hasOwnProperty(n) ? t[n] : null;
      }
      function Zf(t) {
        return t && (t.hasOwnProperty(El) || t.hasOwnProperty(iC)) ? t[El] : null;
      }
      const us = ge({ ɵprov: ge }),
        El = ge({ ɵinj: ge }),
        Kf = ge({ ngInjectableDef: ge }),
        iC = ge({ ngInjectorDef: ge });
      var $ = (() => (
        (($ = $ || {})[($.Default = 0)] = 'Default'),
        ($[($.Host = 1)] = 'Host'),
        ($[($.Self = 2)] = 'Self'),
        ($[($.SkipSelf = 4)] = 'SkipSelf'),
        ($[($.Optional = 8)] = 'Optional'),
        $
      ))();
      let Ml;
      function Ot(t) {
        const n = Ml;
        return (Ml = t), n;
      }
      function Jf(t, n, e) {
        const r = cs(t);
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : e & $.Optional
          ? null
          : void 0 !== n
          ? n
          : void ls(me(t));
      }
      function Bn(t) {
        return { toString: t }.toString();
      }
      var Qt = (() => (((Qt = Qt || {})[(Qt.OnPush = 0)] = 'OnPush'), (Qt[(Qt.Default = 1)] = 'Default'), Qt))(),
        an = (() => {
          return (
            ((t = an || (an = {}))[(t.Emulated = 0)] = 'Emulated'),
            (t[(t.None = 2)] = 'None'),
            (t[(t.ShadowDom = 3)] = 'ShadowDom'),
            an
          );
          var t;
        })();
      const _e = (() =>
          ('undefined' != typeof globalThis && globalThis) ||
          ('undefined' != typeof global && global) ||
          ('undefined' != typeof window && window) ||
          ('undefined' != typeof self &&
            'undefined' != typeof WorkerGlobalScope &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Hr = {},
        ue = [],
        ds = ge({ ɵcmp: ge }),
        Al = ge({ ɵdir: ge }),
        Rl = ge({ ɵpipe: ge }),
        eh = ge({ ɵmod: ge }),
        Dn = ge({ ɵfac: ge }),
        Bo = ge({ __NG_ELEMENT_ID__: ge });
      let aC = 0;
      function P(t) {
        return Bn(() => {
          const e = !0 === t.standalone,
            r = {},
            o = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Qt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: e,
              dependencies: (e && t.dependencies) || null,
              getStandaloneInjector: null,
              selectors: t.selectors || ue,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || an.Emulated,
              id: 'c' + aC++,
              styles: t.styles || ue,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null
            },
            i = t.dependencies,
            s = t.features;
          return (
            (o.inputs = rh(t.inputs, r)),
            (o.outputs = rh(t.outputs)),
            s && s.forEach(a => a(o)),
            (o.directiveDefs = i ? () => ('function' == typeof i ? i() : i).map(th).filter(nh) : null),
            (o.pipeDefs = i ? () => ('function' == typeof i ? i() : i).map(ct).filter(nh) : null),
            o
          );
        });
      }
      function th(t) {
        return he(t) || lt(t);
      }
      function nh(t) {
        return null !== t;
      }
      function jn(t) {
        return Bn(() => ({
          type: t.type,
          bootstrap: t.bootstrap || ue,
          declarations: t.declarations || ue,
          imports: t.imports || ue,
          exports: t.exports || ue,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null
        }));
      }
      function rh(t, n) {
        if (null == t) return Hr;
        const e = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let o = t[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])), (e[o] = r), n && (n[o] = i);
          }
        return e;
      }
      const de = P;
      function _t(t) {
        return {
          type: t.type,
          name: t.name,
          factory: null,
          pure: !1 !== t.pure,
          standalone: !0 === t.standalone,
          onDestroy: t.type.prototype.ngOnDestroy || null
        };
      }
      function he(t) {
        return t[ds] || null;
      }
      function lt(t) {
        return t[Al] || null;
      }
      function ct(t) {
        return t[Rl] || null;
      }
      function xt(t, n) {
        const e = t[eh] || null;
        if (!e && !0 === n) throw new Error(`Type ${me(t)} does not have '\u0275mod' property.`);
        return e;
      }
      function yt(t) {
        return Array.isArray(t) && 'object' == typeof t[1];
      }
      function Yt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Fl(t) {
        return 0 != (8 & t.flags);
      }
      function gs(t) {
        return 2 == (2 & t.flags);
      }
      function ms(t) {
        return 1 == (1 & t.flags);
      }
      function Zt(t) {
        return null !== t.template;
      }
      function hC(t) {
        return 0 != (256 & t[2]);
      }
      function gr(t, n) {
        return t.hasOwnProperty(Dn) ? t[Dn] : null;
      }
      class mC {
        constructor(n, e, r) {
          (this.previousValue = n), (this.currentValue = e), (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ln() {
        return sh;
      }
      function sh(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = yC), _C;
      }
      function _C() {
        const t = lh(this),
          n = null == t ? void 0 : t.current;
        if (n) {
          const e = t.previous;
          if (e === Hr) t.previous = n;
          else for (let r in n) e[r] = n[r];
          (t.current = null), this.ngOnChanges(n);
        }
      }
      function yC(t, n, e, r) {
        const o =
            lh(t) ||
            (function wC(t, n) {
              return (t[ah] = n);
            })(t, { previous: Hr, current: null }),
          i = o.current || (o.current = {}),
          s = o.previous,
          a = this.declaredInputs[e],
          l = s[a];
        (i[a] = new mC(l && l.currentValue, n, s === Hr)), (t[r] = n);
      }
      ln.ngInherit = !0;
      const ah = '__ngSimpleChanges__';
      function lh(t) {
        return t[ah] || null;
      }
      function Be(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function _s(t, n) {
        return Be(n[t]);
      }
      function Bt(t, n) {
        return Be(n[t.index]);
      }
      function Bl(t, n) {
        return t.data[n];
      }
      function $r(t, n) {
        return t[n];
      }
      function Et(t, n) {
        const e = n[t];
        return yt(e) ? e : e[0];
      }
      function ys(t) {
        return 64 == (64 & t[2]);
      }
      function Vn(t, n) {
        return null == n ? null : t[n];
      }
      function ch(t) {
        t[18] = 0;
      }
      function jl(t, n) {
        t[5] += n;
        let e = t,
          r = t[3];
        for (; null !== r && ((1 === n && 1 === e[5]) || (-1 === n && 0 === e[5])); ) (r[5] += n), (e = r), (r = r[3]);
      }
      const W = { lFrame: wh(null), bindingsEnabled: !0 };
      function dh() {
        return W.bindingsEnabled;
      }
      function x() {
        return W.lFrame.lView;
      }
      function ae() {
        return W.lFrame.tView;
      }
      function Y(t) {
        return (W.lFrame.contextLView = t), t[8];
      }
      function Z(t) {
        return (W.lFrame.contextLView = null), t;
      }
      function Ge() {
        let t = fh();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function fh() {
        return W.lFrame.currentTNode;
      }
      function cn(t, n) {
        const e = W.lFrame;
        (e.currentTNode = t), (e.isParent = n);
      }
      function Vl() {
        return W.lFrame.isParent;
      }
      function $l() {
        W.lFrame.isParent = !1;
      }
      function ut() {
        const t = W.lFrame;
        let n = t.bindingRootIndex;
        return -1 === n && (n = t.bindingRootIndex = t.tView.bindingStartIndex), n;
      }
      function Tn() {
        return W.lFrame.bindingIndex;
      }
      function Ur() {
        return W.lFrame.bindingIndex++;
      }
      function Sn(t) {
        const n = W.lFrame,
          e = n.bindingIndex;
        return (n.bindingIndex = n.bindingIndex + t), e;
      }
      function FC(t, n) {
        const e = W.lFrame;
        (e.bindingIndex = e.bindingRootIndex = t), Ul(n);
      }
      function Ul(t) {
        W.lFrame.currentDirectiveIndex = t;
      }
      function mh() {
        return W.lFrame.currentQueryIndex;
      }
      function Gl(t) {
        W.lFrame.currentQueryIndex = t;
      }
      function OC(t) {
        const n = t[1];
        return 2 === n.type ? n.declTNode : 1 === n.type ? t[6] : null;
      }
      function _h(t, n, e) {
        if (e & $.SkipSelf) {
          let o = n,
            i = t;
          for (
            ;
            !((o = o.parent), null !== o || e & $.Host || ((o = OC(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (n = o), (t = i);
        }
        const r = (W.lFrame = yh());
        return (r.currentTNode = n), (r.lView = t), !0;
      }
      function Wl(t) {
        const n = yh(),
          e = t[1];
        (W.lFrame = n),
          (n.currentTNode = e.firstChild),
          (n.lView = t),
          (n.tView = e),
          (n.contextLView = t),
          (n.bindingIndex = e.bindingStartIndex),
          (n.inI18n = !1);
      }
      function yh() {
        const t = W.lFrame,
          n = null === t ? null : t.child;
        return null === n ? wh(t) : n;
      }
      function wh(t) {
        const n = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1
        };
        return null !== t && (t.child = n), n;
      }
      function bh() {
        const t = W.lFrame;
        return (W.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
      }
      const vh = bh;
      function ql() {
        const t = bh();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function dt() {
        return W.lFrame.selectedIndex;
      }
      function $n(t) {
        W.lFrame.selectedIndex = t;
      }
      function Me() {
        const t = W.lFrame;
        return Bl(t.tView, t.selectedIndex);
      }
      function ws(t, n) {
        for (let e = n.directiveStart, r = n.directiveEnd; e < r; e++) {
          const i = t.data[e].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u
            } = i;
          s && (t.contentHooks || (t.contentHooks = [])).push(-e, s),
            a &&
              ((t.contentHooks || (t.contentHooks = [])).push(e, a),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(e, a)),
            l && (t.viewHooks || (t.viewHooks = [])).push(-e, l),
            c &&
              ((t.viewHooks || (t.viewHooks = [])).push(e, c),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(e, c)),
            null != u && (t.destroyHooks || (t.destroyHooks = [])).push(e, u);
        }
      }
      function bs(t, n, e) {
        Ch(t, n, 3, e);
      }
      function vs(t, n, e, r) {
        (3 & t[2]) === e && Ch(t, n, e, r);
      }
      function Ql(t, n) {
        let e = t[2];
        (3 & e) === n && ((e &= 2047), (e += 1), (t[2] = e));
      }
      function Ch(t, n, e, r) {
        const i = null != r ? r : -1,
          s = n.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & t[18] : 0; l < s; l++)
          if ('number' == typeof n[l + 1]) {
            if (((a = n[l]), null != r && a >= r)) break;
          } else
            n[l] < 0 && (t[18] += 65536),
              (a < i || -1 == i) && (GC(t, e, n, l), (t[18] = (4294901760 & t[18]) + l + 2)),
              l++;
      }
      function GC(t, n, e, r) {
        const o = e[r] < 0,
          i = e[r + 1],
          a = t[o ? -e[r] : e[r]];
        if (o) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === n) {
            t[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class Go {
        constructor(n, e, r) {
          (this.factory = n), (this.resolving = !1), (this.canSeeViewProviders = e), (this.injectImpl = r);
        }
      }
      function Cs(t, n, e) {
        let r = 0;
        for (; r < e.length; ) {
          const o = e[r];
          if ('number' == typeof o) {
            if (0 !== o) break;
            r++;
            const i = e[r++],
              s = e[r++],
              a = e[r++];
            t.setAttribute(n, s, a, i);
          } else {
            const i = o,
              s = e[++r];
            Th(i) ? t.setProperty(n, i, s) : t.setAttribute(n, i, s), r++;
          }
        }
        return r;
      }
      function Dh(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function Th(t) {
        return 64 === t.charCodeAt(0);
      }
      function Ds(t, n) {
        if (null !== n && 0 !== n.length)
          if (null === t || 0 === t.length) t = n.slice();
          else {
            let e = -1;
            for (let r = 0; r < n.length; r++) {
              const o = n[r];
              'number' == typeof o ? (e = o) : 0 === e || Sh(t, e, o, null, -1 === e || 2 === e ? n[++r] : null);
            }
          }
        return t;
      }
      function Sh(t, n, e, r, o) {
        let i = 0,
          s = t.length;
        if (-1 === n) s = -1;
        else
          for (; i < t.length; ) {
            const a = t[i++];
            if ('number' == typeof a) {
              if (a === n) {
                s = -1;
                break;
              }
              if (a > n) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const a = t[i];
          if ('number' == typeof a) break;
          if (a === e) {
            if (null === r) return void (null !== o && (t[i + 1] = o));
            if (r === t[i + 1]) return void (t[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (t.splice(s, 0, n), (i = s + 1)),
          t.splice(i++, 0, e),
          null !== r && t.splice(i++, 0, r),
          null !== o && t.splice(i++, 0, o);
      }
      function xh(t) {
        return -1 !== t;
      }
      function zr(t) {
        return 32767 & t;
      }
      function Gr(t, n) {
        let e = (function YC(t) {
            return t >> 16;
          })(t),
          r = n;
        for (; e > 0; ) (r = r[15]), e--;
        return r;
      }
      let Yl = !0;
      function Ts(t) {
        const n = Yl;
        return (Yl = t), n;
      }
      let ZC = 0;
      const un = {};
      function qo(t, n) {
        const e = Kl(t, n);
        if (-1 !== e) return e;
        const r = n[1];
        r.firstCreatePass && ((t.injectorIndex = n.length), Zl(r.data, t), Zl(n, null), Zl(r.blueprint, null));
        const o = Ss(t, n),
          i = t.injectorIndex;
        if (xh(o)) {
          const s = zr(o),
            a = Gr(o, n),
            l = a[1].data;
          for (let c = 0; c < 8; c++) n[i + c] = a[s + c] | l[s + c];
        }
        return (n[i + 8] = o), i;
      }
      function Zl(t, n) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, n);
      }
      function Kl(t, n) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === n[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Ss(t, n) {
        if (t.parent && -1 !== t.parent.injectorIndex) return t.parent.injectorIndex;
        let e = 0,
          r = null,
          o = n;
        for (; null !== o; ) {
          if (((r = Nh(o)), null === r)) return -1;
          if ((e++, (o = o[15]), -1 !== r.injectorIndex)) return r.injectorIndex | (e << 16);
        }
        return -1;
      }
      function xs(t, n, e) {
        !(function KC(t, n, e) {
          let r;
          'string' == typeof e ? (r = e.charCodeAt(0) || 0) : e.hasOwnProperty(Bo) && (r = e[Bo]),
            null == r && (r = e[Bo] = ZC++);
          const o = 255 & r;
          n.data[t + (o >> 5)] |= 1 << o;
        })(t, n, e);
      }
      function Mh(t, n, e) {
        if (e & $.Optional || void 0 !== t) return t;
        ls();
      }
      function Ah(t, n, e, r) {
        if ((e & $.Optional && void 0 === r && (r = null), 0 == (e & ($.Self | $.Host)))) {
          const o = t[9],
            i = Ot(void 0);
          try {
            return o ? o.get(n, r, e & $.Optional) : Jf(n, r, e & $.Optional);
          } finally {
            Ot(i);
          }
        }
        return Mh(r, 0, e);
      }
      function Rh(t, n, e, r = $.Default, o) {
        if (null !== t) {
          if (1024 & n[2]) {
            const s = (function o0(t, n, e, r, o) {
              let i = t,
                s = n;
              for (; null !== i && null !== s && 1024 & s[2] && !(256 & s[2]); ) {
                const a = kh(i, s, e, r | $.Self, un);
                if (a !== un) return a;
                let l = i.parent;
                if (!l) {
                  const c = s[21];
                  if (c) {
                    const u = c.get(e, un, r);
                    if (u !== un) return u;
                  }
                  (l = Nh(s)), (s = s[15]);
                }
                i = l;
              }
              return o;
            })(t, n, e, r, un);
            if (s !== un) return s;
          }
          const i = kh(t, n, e, r, un);
          if (i !== un) return i;
        }
        return Ah(n, e, r, o);
      }
      function kh(t, n, e, r, o) {
        const i = (function t0(t) {
          if ('string' == typeof t) return t.charCodeAt(0) || 0;
          const n = t.hasOwnProperty(Bo) ? t[Bo] : void 0;
          return 'number' == typeof n ? (n >= 0 ? 255 & n : n0) : n;
        })(e);
        if ('function' == typeof i) {
          if (!_h(n, t, r)) return r & $.Host ? Mh(o, 0, r) : Ah(n, e, r, o);
          try {
            const s = i(r);
            if (null != s || r & $.Optional) return s;
            ls();
          } finally {
            vh();
          }
        } else if ('number' == typeof i) {
          let s = null,
            a = Kl(t, n),
            l = -1,
            c = r & $.Host ? n[16][6] : null;
          for (
            (-1 === a || r & $.SkipSelf) &&
            ((l = -1 === a ? Ss(t, n) : n[a + 8]),
            -1 !== l && Fh(r, !1) ? ((s = n[1]), (a = zr(l)), (n = Gr(l, n))) : (a = -1));
            -1 !== a;

          ) {
            const u = n[1];
            if (Ph(i, a, u.data)) {
              const d = e0(a, n, e, s, r, c);
              if (d !== un) return d;
            }
            (l = n[a + 8]),
              -1 !== l && Fh(r, n[1].data[a + 8] === c) && Ph(i, a, n)
                ? ((s = u), (a = zr(l)), (n = Gr(l, n)))
                : (a = -1);
          }
        }
        return o;
      }
      function e0(t, n, e, r, o, i) {
        const s = n[1],
          a = s.data[t + 8],
          u = Is(a, s, e, null == r ? gs(a) && Yl : r != s && 0 != (3 & a.type), o & $.Host && i === a);
        return null !== u ? Qo(n, s, u, a) : un;
      }
      function Is(t, n, e, r, o) {
        const i = t.providerIndexes,
          s = n.data,
          a = 1048575 & i,
          l = t.directiveStart,
          u = i >> 20,
          h = o ? a + u : t.directiveEnd;
        for (let y = r ? a : a + u; y < h; y++) {
          const w = s[y];
          if ((y < l && e === w) || (y >= l && w.type === e)) return y;
        }
        if (o) {
          const y = s[l];
          if (y && Zt(y) && y.type === e) return l;
        }
        return null;
      }
      function Qo(t, n, e, r) {
        let o = t[e];
        const i = n.data;
        if (
          (function WC(t) {
            return t instanceof Go;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Zv(t, n) {
              const e = n ? `. Dependency path: ${n.join(' > ')} > ${t}` : '';
              throw new F(-200, `Circular dependency in DI detected for ${t}${e}`);
            })(
              (function ce(t) {
                return 'function' == typeof t
                  ? t.name || t.toString()
                  : 'object' == typeof t && null != t && 'function' == typeof t.type
                  ? t.type.name || t.type.toString()
                  : Q(t);
              })(i[e])
            );
          const a = Ts(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? Ot(s.injectImpl) : null;
          _h(t, r, $.Default);
          try {
            (o = t[e] = s.factory(void 0, i, t, r)),
              n.firstCreatePass &&
                e >= r.directiveStart &&
                (function zC(t, n, e) {
                  const { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = n.type.prototype;
                  if (r) {
                    const s = sh(n);
                    (e.preOrderHooks || (e.preOrderHooks = [])).push(t, s),
                      (e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(t, s);
                  }
                  o && (e.preOrderHooks || (e.preOrderHooks = [])).push(0 - t, o),
                    i &&
                      ((e.preOrderHooks || (e.preOrderHooks = [])).push(t, i),
                      (e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(t, i));
                })(e, i[e], n);
          } finally {
            null !== l && Ot(l), Ts(a), (s.resolving = !1), vh();
          }
        }
        return o;
      }
      function Ph(t, n, e) {
        return !!(e[n + (t >> 5)] & (1 << t));
      }
      function Fh(t, n) {
        return !(t & $.Self || (t & $.Host && n));
      }
      class Wr {
        constructor(n, e) {
          (this._tNode = n), (this._lView = e);
        }
        get(n, e, r) {
          return Rh(this._tNode, this._lView, n, r, e);
        }
      }
      function n0() {
        return new Wr(Ge(), x());
      }
      function Nh(t) {
        const n = t[1],
          e = n.type;
        return 2 === e ? n.declTNode : 1 === e ? t[6] : null;
      }
      const Qr = '__parameters__';
      function Yr(t, n, e) {
        return Bn(() => {
          const r = (function ec(t) {
            return function (...e) {
              if (t) {
                const r = t(...e);
                for (const o in r) this[o] = r[o];
              }
            };
          })(n);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(l, c, u) {
              const d = l.hasOwnProperty(Qr) ? l[Qr] : Object.defineProperty(l, Qr, { value: [] })[Qr];
              for (; d.length <= u; ) d.push(null);
              return (d[u] = d[u] || []).push(s), l;
            }
          }
          return (
            e && (o.prototype = Object.create(e.prototype)), (o.prototype.ngMetadataName = t), (o.annotationCls = o), o
          );
        });
      }
      class q {
        constructor(n, e) {
          (this._desc = n),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = G({ token: this, providedIn: e.providedIn || 'root', factory: e.factory }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Mt(t, n) {
        void 0 === n && (n = t);
        for (let e = 0; e < t.length; e++) {
          let r = t[e];
          Array.isArray(r) ? (n === t && (n = t.slice(0, e)), Mt(r, n)) : n !== t && n.push(r);
        }
        return n;
      }
      function xn(t, n) {
        t.forEach(e => (Array.isArray(e) ? xn(e, n) : n(e)));
      }
      function Hh(t, n, e) {
        n >= t.length ? t.push(e) : t.splice(n, 0, e);
      }
      function Es(t, n) {
        return n >= t.length - 1 ? t.pop() : t.splice(n, 1)[0];
      }
      function Ko(t, n) {
        const e = [];
        for (let r = 0; r < t; r++) e.push(n);
        return e;
      }
      function At(t, n, e) {
        let r = Zr(t, n);
        return (
          r >= 0
            ? (t[1 | r] = e)
            : ((r = ~r),
              (function c0(t, n, e, r) {
                let o = t.length;
                if (o == n) t.push(e, r);
                else if (1 === o) t.push(r, t[0]), (t[0] = e);
                else {
                  for (o--, t.push(t[o - 1], t[o]); o > n; ) (t[o] = t[o - 2]), o--;
                  (t[n] = e), (t[n + 1] = r);
                }
              })(t, r, n, e)),
          r
        );
      }
      function nc(t, n) {
        const e = Zr(t, n);
        if (e >= 0) return t[1 | e];
      }
      function Zr(t, n) {
        return (function jh(t, n, e) {
          let r = 0,
            o = t.length >> e;
          for (; o !== r; ) {
            const i = r + ((o - r) >> 1),
              s = t[i << e];
            if (n === s) return i << e;
            s > n ? (o = i) : (r = i + 1);
          }
          return ~(o << e);
        })(t, n, 1);
      }
      const Jo = {},
        oc = '__NG_DI_FLAG__',
        As = 'ngTempTokenPath',
        _0 = /\n/gm,
        Vh = '__source';
      let ei;
      function Kr(t) {
        const n = ei;
        return (ei = t), n;
      }
      function w0(t, n = $.Default) {
        if (void 0 === ei) throw new F(-203, !1);
        return null === ei ? Jf(t, void 0, n) : ei.get(t, n & $.Optional ? null : void 0, n);
      }
      function j(t, n = $.Default) {
        return (
          (function sC() {
            return Ml;
          })() || w0
        )(z(t), n);
      }
      function Re(t, n = $.Default) {
        return (
          'number' != typeof n && (n = 0 | (n.optional && 8) | (n.host && 1) | (n.self && 2) | (n.skipSelf && 4)),
          j(t, n)
        );
      }
      function ic(t) {
        const n = [];
        for (let e = 0; e < t.length; e++) {
          const r = z(t[e]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new F(900, !1);
            let o,
              i = $.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = b0(a);
              'number' == typeof l ? (-1 === l ? (o = a.token) : (i |= l)) : (o = a);
            }
            n.push(j(o, i));
          } else n.push(j(r));
        }
        return n;
      }
      function ti(t, n) {
        return (t[oc] = n), (t.prototype[oc] = n), t;
      }
      function b0(t) {
        return t[oc];
      }
      const ni = ti(Yr('Optional'), 8),
        ri = ti(Yr('SkipSelf'), 4);
      let ac, Ps, Fs;
      function eo(t) {
        var n;
        return (
          (null ===
            (n = (function lc() {
              if (void 0 === Ps && ((Ps = null), _e.trustedTypes))
                try {
                  Ps = _e.trustedTypes.createPolicy('angular', {
                    createHTML: t => t,
                    createScript: t => t,
                    createScriptURL: t => t
                  });
                } catch (t) {}
              return Ps;
            })()) || void 0 === n
            ? void 0
            : n.createHTML(t)) || t
        );
      }
      function Zh(t) {
        var n;
        return (
          (null ===
            (n = (function cc() {
              if (void 0 === Fs && ((Fs = null), _e.trustedTypes))
                try {
                  Fs = _e.trustedTypes.createPolicy('angular#unsafe-bypass', {
                    createHTML: t => t,
                    createScript: t => t,
                    createScriptURL: t => t
                  });
                } catch (t) {}
              return Fs;
            })()) || void 0 === n
            ? void 0
            : n.createHTML(t)) || t
        );
      }
      class ep {
        constructor(n) {
          this.changingThisBreaksApplicationSecurity = n;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`;
        }
      }
      function zn(t) {
        return t instanceof ep ? t.changingThisBreaksApplicationSecurity : t;
      }
      class V0 {
        constructor(n) {
          this.inertDocumentHelper = n;
        }
        getInertBodyElement(n) {
          n = '<body><remove></remove>' + n;
          try {
            const e = new window.DOMParser().parseFromString(eo(n), 'text/html').body;
            return null === e ? this.inertDocumentHelper.getInertBodyElement(n) : (e.removeChild(e.firstChild), e);
          } catch (e) {
            return null;
          }
        }
      }
      class $0 {
        constructor(n) {
          if (
            ((this.defaultDoc = n),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument('sanitization-inert')),
            null == this.inertDocument.body)
          ) {
            const e = this.inertDocument.createElement('html');
            this.inertDocument.appendChild(e);
            const r = this.inertDocument.createElement('body');
            e.appendChild(r);
          }
        }
        getInertBodyElement(n) {
          const e = this.inertDocument.createElement('template');
          if ('content' in e) return (e.innerHTML = eo(n)), e;
          const r = this.inertDocument.createElement('body');
          return (r.innerHTML = eo(n)), this.defaultDoc.documentMode && this.stripCustomNsAttrs(r), r;
        }
        stripCustomNsAttrs(n) {
          const e = n.attributes;
          for (let o = e.length - 1; 0 < o; o--) {
            const s = e.item(o).name;
            ('xmlns:ns1' === s || 0 === s.indexOf('ns1:')) && n.removeAttribute(s);
          }
          let r = n.firstChild;
          for (; r; ) r.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(r), (r = r.nextSibling);
        }
      }
      const z0 = /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      function In(t) {
        const n = {};
        for (const e of t.split(',')) n[e] = !0;
        return n;
      }
      function ai(...t) {
        const n = {};
        for (const e of t) for (const r in e) e.hasOwnProperty(r) && (n[r] = !0);
        return n;
      }
      const np = In('area,br,col,hr,img,wbr'),
        rp = In('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        op = In('rp,rt'),
        dc = ai(
          np,
          ai(
            rp,
            In(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          ai(
            op,
            In(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          ai(op, rp)
        ),
        fc = In('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        ip = ai(
          fc,
          In(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          In(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        G0 = In('script,style,template');
      class W0 {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(n) {
          let e = n.firstChild,
            r = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              r && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let o = this.checkClobberedElement(e, e.nextSibling);
                if (o) {
                  e = o;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join('');
        }
        startElement(n) {
          const e = n.nodeName.toLowerCase();
          if (!dc.hasOwnProperty(e)) return (this.sanitizedSomething = !0), !G0.hasOwnProperty(e);
          this.buf.push('<'), this.buf.push(e);
          const r = n.attributes;
          for (let o = 0; o < r.length; o++) {
            const i = r.item(o),
              s = i.name,
              a = s.toLowerCase();
            if (!ip.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = i.value;
            fc[a] && ((t = l), (l = (t = String(t)).match(z0) ? t : 'unsafe:' + t)),
              this.buf.push(' ', s, '="', sp(l), '"');
          }
          var t;
          return this.buf.push('>'), !0;
        }
        endElement(n) {
          const e = n.nodeName.toLowerCase();
          dc.hasOwnProperty(e) && !np.hasOwnProperty(e) && (this.buf.push('</'), this.buf.push(e), this.buf.push('>'));
        }
        chars(n) {
          this.buf.push(sp(n));
        }
        checkClobberedElement(n, e) {
          if (
            e &&
            (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(`Failed to sanitize html because the element is clobbered: ${n.outerHTML}`);
          return e;
        }
      }
      const q0 = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        Q0 = /([^\#-~ |!])/g;
      function sp(t) {
        return t
          .replace(/&/g, '&amp;')
          .replace(q0, function (n) {
            return '&#' + (1024 * (n.charCodeAt(0) - 55296) + (n.charCodeAt(1) - 56320) + 65536) + ';';
          })
          .replace(Q0, function (n) {
            return '&#' + n.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      let Ns;
      function hc(t) {
        return 'content' in t &&
          (function Y0(t) {
            return t.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === t.nodeName;
          })(t)
          ? t.content
          : null;
      }
      var je = (() => (
        ((je = je || {})[(je.NONE = 0)] = 'NONE'),
        (je[(je.HTML = 1)] = 'HTML'),
        (je[(je.STYLE = 2)] = 'STYLE'),
        (je[(je.SCRIPT = 3)] = 'SCRIPT'),
        (je[(je.URL = 4)] = 'URL'),
        (je[(je.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
        je
      ))();
      function mr(t) {
        const n = (function li() {
          const t = x();
          return t && t[12];
        })();
        return n
          ? Zh(n.sanitize(je.HTML, t) || '')
          : (function si(t, n) {
              const e = (function j0(t) {
                return (t instanceof ep && t.getTypeName()) || null;
              })(t);
              if (null != e && e !== n) {
                if ('ResourceURL' === e && 'URL' === n) return !0;
                throw new Error(`Required a safe ${n}, got a ${e} (see https://g.co/ng/security#xss)`);
              }
              return e === n;
            })(t, 'HTML')
          ? Zh(zn(t))
          : (function X0(t, n) {
              let e = null;
              try {
                Ns =
                  Ns ||
                  (function tp(t) {
                    const n = new $0(t);
                    return (function U0() {
                      try {
                        return !!new window.DOMParser().parseFromString(eo(''), 'text/html');
                      } catch (t) {
                        return !1;
                      }
                    })()
                      ? new V0(n)
                      : n;
                  })(t);
                let r = n ? String(n) : '';
                e = Ns.getInertBodyElement(r);
                let o = 5,
                  i = r;
                do {
                  if (0 === o) throw new Error('Failed to sanitize html because the input is unstable');
                  o--, (r = i), (i = e.innerHTML), (e = Ns.getInertBodyElement(r));
                } while (r !== i);
                return eo(new W0().sanitizeChildren(hc(e) || e));
              } finally {
                if (e) {
                  const r = hc(e) || e;
                  for (; r.firstChild; ) r.removeChild(r.firstChild);
                }
              }
            })(
              (function Yh() {
                return void 0 !== ac ? ac : 'undefined' != typeof document ? document : void 0;
              })(),
              Q(t)
            );
      }
      const gc = new q('ENVIRONMENT_INITIALIZER'),
        lp = new q('INJECTOR', -1),
        cp = new q('INJECTOR_DEF_TYPES');
      class up {
        get(n, e = Jo) {
          if (e === Jo) {
            const r = new Error(`NullInjectorError: No provider for ${me(n)}!`);
            throw ((r.name = 'NullInjectorError'), r);
          }
          return e;
        }
      }
      function rD(...t) {
        return { ɵproviders: dp(0, t) };
      }
      function dp(t, ...n) {
        const e = [],
          r = new Set();
        let o;
        return (
          xn(n, i => {
            const s = i;
            mc(s, e, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && fp(o, e),
          e
        );
      }
      function fp(t, n) {
        for (let e = 0; e < t.length; e++) {
          const { providers: o } = t[e];
          xn(o, i => {
            n.push(i);
          });
        }
      }
      function mc(t, n, e, r) {
        if (!(t = z(t))) return !1;
        let o = null,
          i = Zf(t);
        const s = !i && he(t);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = t;
        } else {
          const l = t.ngModule;
          if (((i = Zf(l)), !i)) return !1;
          o = l;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const l = 'function' == typeof s.dependencies ? s.dependencies() : s.dependencies;
            for (const c of l) mc(c, n, e, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let c;
              r.add(o);
              try {
                xn(i.imports, u => {
                  mc(u, n, e, r) && (c || (c = []), c.push(u));
                });
              } finally {
              }
              void 0 !== c && fp(c, n);
            }
            if (!a) {
              const c = gr(o) || (() => new o());
              n.push(
                { provide: o, useFactory: c, deps: ue },
                { provide: cp, useValue: o, multi: !0 },
                { provide: gc, useValue: () => j(o), multi: !0 }
              );
            }
            const l = i.providers;
            null == l ||
              a ||
              xn(l, u => {
                n.push(u);
              });
          }
        }
        return o !== t && void 0 !== t.providers;
      }
      const oD = ge({ provide: String, useValue: ge });
      function _c(t) {
        return null !== t && 'object' == typeof t && oD in t;
      }
      function _r(t) {
        return 'function' == typeof t;
      }
      const yc = new q('Set Injector scope.'),
        Os = {},
        sD = {};
      let wc;
      function Hs() {
        return void 0 === wc && (wc = new up()), wc;
      }
      class Gn {}
      class gp extends Gn {
        constructor(n, e, r, o) {
          super(),
            (this.parent = e),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            vc(n, s => this.processProvider(s)),
            this.records.set(lp, to(void 0, this)),
            o.has('environment') && this.records.set(Gn, to(void 0, this));
          const i = this.records.get(yc);
          null != i && 'string' == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(cp.multi, ue, $.Self)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            for (const n of this._onDestroyHooks) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(n) {
          this._onDestroyHooks.push(n);
        }
        runInContext(n) {
          this.assertNotDestroyed();
          const e = Kr(this),
            r = Ot(void 0);
          try {
            return n();
          } finally {
            Kr(e), Ot(r);
          }
        }
        get(n, e = Jo, r = $.Default) {
          this.assertNotDestroyed();
          const o = Kr(this),
            i = Ot(void 0);
          try {
            if (!(r & $.SkipSelf)) {
              let a = this.records.get(n);
              if (void 0 === a) {
                const l =
                  (function dD(t) {
                    return 'function' == typeof t || ('object' == typeof t && t instanceof q);
                  })(n) && cs(n);
                (a = l && this.injectableDefInScope(l) ? to(bc(n), Os) : null), this.records.set(n, a);
              }
              if (null != a) return this.hydrate(n, a);
            }
            return (r & $.Self ? Hs() : this.parent).get(n, (e = r & $.Optional && e === Jo ? null : e));
          } catch (s) {
            if ('NullInjectorError' === s.name) {
              if (((s[As] = s[As] || []).unshift(me(n)), o)) throw s;
              return (function v0(t, n, e, r) {
                const o = t[As];
                throw (
                  (n[Vh] && o.unshift(n[Vh]),
                  (t.message = (function C0(t, n, e, r = null) {
                    t = t && '\n' === t.charAt(0) && '\u0275' == t.charAt(1) ? t.slice(2) : t;
                    let o = me(n);
                    if (Array.isArray(n)) o = n.map(me).join(' -> ');
                    else if ('object' == typeof n) {
                      let i = [];
                      for (let s in n)
                        if (n.hasOwnProperty(s)) {
                          let a = n[s];
                          i.push(s + ':' + ('string' == typeof a ? JSON.stringify(a) : me(a)));
                        }
                      o = `{${i.join(', ')}}`;
                    }
                    return `${e}${r ? '(' + r + ')' : ''}[${o}]: ${t.replace(_0, '\n  ')}`;
                  })('\n' + t.message, o, e, r)),
                  (t.ngTokenPath = o),
                  (t[As] = null),
                  t)
                );
              })(s, n, 'R3InjectorError', this.source);
            }
            throw s;
          } finally {
            Ot(i), Kr(o);
          }
        }
        resolveInjectorInitializers() {
          const n = Kr(this),
            e = Ot(void 0);
          try {
            const r = this.get(gc.multi, ue, $.Self);
            for (const o of r) o();
          } finally {
            Kr(n), Ot(e);
          }
        }
        toString() {
          const n = [],
            e = this.records;
          for (const r of e.keys()) n.push(me(r));
          return `R3Injector[${n.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new F(205, !1);
        }
        processProvider(n) {
          let e = _r((n = z(n))) ? n : z(n && n.provide);
          const r = (function lD(t) {
            return _c(t) ? to(void 0, t.useValue) : to(mp(t), Os);
          })(n);
          if (_r(n) || !0 !== n.multi) this.records.get(e);
          else {
            let o = this.records.get(e);
            o || ((o = to(void 0, Os, !0)), (o.factory = () => ic(o.multi)), this.records.set(e, o)),
              (e = n),
              o.multi.push(n);
          }
          this.records.set(e, r);
        }
        hydrate(n, e) {
          return (
            e.value === Os && ((e.value = sD), (e.value = e.factory())),
            'object' == typeof e.value &&
              e.value &&
              (function uD(t) {
                return null !== t && 'object' == typeof t && 'function' == typeof t.ngOnDestroy;
              })(e.value) &&
              this._ngOnDestroyHooks.add(e.value),
            e.value
          );
        }
        injectableDefInScope(n) {
          if (!n.providedIn) return !1;
          const e = z(n.providedIn);
          return 'string' == typeof e ? 'any' === e || this.scopes.has(e) : this.injectorDefTypes.has(e);
        }
      }
      function bc(t) {
        const n = cs(t),
          e = null !== n ? n.factory : gr(t);
        if (null !== e) return e;
        if (t instanceof q) throw new F(204, !1);
        if (t instanceof Function)
          return (function aD(t) {
            const n = t.length;
            if (n > 0) throw (Ko(n, '?'), new F(204, !1));
            const e = (function rC(t) {
              const n = t && (t[us] || t[Kf]);
              if (n) {
                const e = (function oC(t) {
                  if (t.hasOwnProperty('name')) return t.name;
                  const n = ('' + t).match(/^function\s*([^\s(]+)/);
                  return null === n ? '' : n[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${e}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${e}" class.`
                  ),
                  n
                );
              }
              return null;
            })(t);
            return null !== e ? () => e.factory(t) : () => new t();
          })(t);
        throw new F(204, !1);
      }
      function mp(t, n, e) {
        let r;
        if (_r(t)) {
          const o = z(t);
          return gr(o) || bc(o);
        }
        if (_c(t)) r = () => z(t.useValue);
        else if (
          (function pp(t) {
            return !(!t || !t.useFactory);
          })(t)
        )
          r = () => t.useFactory(...ic(t.deps || []));
        else if (
          (function hp(t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          r = () => j(z(t.useExisting));
        else {
          const o = z(t && (t.useClass || t.provide));
          if (
            !(function cD(t) {
              return !!t.deps;
            })(t)
          )
            return gr(o) || bc(o);
          r = () => new o(...ic(t.deps));
        }
        return r;
      }
      function to(t, n, e = !1) {
        return { factory: t, value: n, multi: e ? [] : void 0 };
      }
      function fD(t) {
        return !!t.ɵproviders;
      }
      function vc(t, n) {
        for (const e of t) Array.isArray(e) ? vc(e, n) : fD(e) ? vc(e.ɵproviders, n) : n(e);
      }
      class _p {}
      class gD {
        resolveComponentFactory(n) {
          throw (function pD(t) {
            const n = Error(`No component factory found for ${me(t)}. Did you add it to @NgModule.entryComponents?`);
            return (n.ngComponent = t), n;
          })(n);
        }
      }
      let ci = (() => {
        class t {}
        return (t.NULL = new gD()), t;
      })();
      function mD() {
        return no(Ge(), x());
      }
      function no(t, n) {
        return new nt(Bt(t, n));
      }
      let nt = (() => {
        class t {
          constructor(e) {
            this.nativeElement = e;
          }
        }
        return (t.__NG_ELEMENT_ID__ = mD), t;
      })();
      function _D(t) {
        return t instanceof nt ? t.nativeElement : t;
      }
      class wp {}
      let ro = (() => {
          class t {}
          return (
            (t.__NG_ELEMENT_ID__ = () =>
              (function yD() {
                const t = x(),
                  e = Et(Ge().index, t);
                return (yt(e) ? e : t)[11];
              })()),
            t
          );
        })(),
        wD = (() => {
          class t {}
          return (t.ɵprov = G({ token: t, providedIn: 'root', factory: () => null })), t;
        })();
      class Ls {
        constructor(n) {
          (this.full = n),
            (this.major = n.split('.')[0]),
            (this.minor = n.split('.')[1]),
            (this.patch = n.split('.').slice(2).join('.'));
        }
      }
      const bD = new Ls('14.2.6'),
        Cc = {};
      function Ic(t) {
        return t.ngOriginalError;
      }
      class oo {
        constructor() {
          this._console = console;
        }
        handleError(n) {
          const e = this._findOriginalError(n);
          this._console.error('ERROR', n), e && this._console.error('ORIGINAL ERROR', e);
        }
        _findOriginalError(n) {
          let e = n && Ic(n);
          for (; e && Ic(e); ) e = Ic(e);
          return e || null;
        }
      }
      const Ec = new Map();
      let kD = 0;
      const Ac = '__ngContext__';
      function rt(t, n) {
        yt(n)
          ? ((t[Ac] = n[20]),
            (function FD(t) {
              Ec.set(t[20], t);
            })(n))
          : (t[Ac] = n);
      }
      function Rp(t) {
        return t.ownerDocument.defaultView;
      }
      function En(t) {
        return t instanceof Function ? t() : t;
      }
      var wt = (() => (
        ((wt = wt || {})[(wt.Important = 1)] = 'Important'), (wt[(wt.DashCase = 2)] = 'DashCase'), wt
      ))();
      function kc(t, n) {
        return undefined(t, n);
      }
      function di(t) {
        const n = t[3];
        return Yt(n) ? n[3] : n;
      }
      function Pc(t) {
        return Fp(t[13]);
      }
      function Fc(t) {
        return Fp(t[4]);
      }
      function Fp(t) {
        for (; null !== t && !Yt(t); ) t = t[4];
        return t;
      }
      function so(t, n, e, r, o) {
        if (null != r) {
          let i,
            s = !1;
          Yt(r) ? (i = r) : yt(r) && ((s = !0), (r = r[0]));
          const a = Be(r);
          0 === t && null !== e
            ? null == o
              ? jp(n, e, a)
              : yr(n, e, a, o || null, !0)
            : 1 === t && null !== e
            ? yr(n, e, a, o || null, !0)
            : 2 === t
            ? (function qp(t, n, e) {
                const r = Bs(t, n);
                r &&
                  (function s1(t, n, e, r) {
                    t.removeChild(n, e, r);
                  })(t, r, n, e);
              })(n, a, s)
            : 3 === t && n.destroyNode(a),
            null != i &&
              (function c1(t, n, e, r, o) {
                const i = e[7];
                i !== Be(e) && so(n, t, r, i, o);
                for (let a = 10; a < e.length; a++) {
                  const l = e[a];
                  fi(l[1], l, t, n, r, i);
                }
              })(n, t, i, e, o);
        }
      }
      function Oc(t, n, e) {
        return t.createElement(n, e);
      }
      function Op(t, n) {
        const e = t[9],
          r = e.indexOf(n),
          o = n[3];
        512 & n[2] && ((n[2] &= -513), jl(o, -1)), e.splice(r, 1);
      }
      function Hc(t, n) {
        if (t.length <= 10) return;
        const e = 10 + n,
          r = t[e];
        if (r) {
          const o = r[17];
          null !== o && o !== t && Op(o, r), n > 0 && (t[e - 1][4] = r[4]);
          const i = Es(t, 10 + n);
          !(function KD(t, n) {
            fi(t, n, n[11], 2, null, null), (n[0] = null), (n[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]), (r[3] = null), (r[4] = null), (r[2] &= -65);
        }
        return r;
      }
      function Hp(t, n) {
        if (!(128 & n[2])) {
          const e = n[11];
          e.destroyNode && fi(t, n, e, 3, null, null),
            (function t1(t) {
              let n = t[13];
              if (!n) return Lc(t[1], t);
              for (; n; ) {
                let e = null;
                if (yt(n)) e = n[13];
                else {
                  const r = n[10];
                  r && (e = r);
                }
                if (!e) {
                  for (; n && !n[4] && n !== t; ) yt(n) && Lc(n[1], n), (n = n[3]);
                  null === n && (n = t), yt(n) && Lc(n[1], n), (e = n && n[4]);
                }
                n = e;
              }
            })(n);
        }
      }
      function Lc(t, n) {
        if (!(128 & n[2])) {
          (n[2] &= -65),
            (n[2] |= 128),
            (function i1(t, n) {
              let e;
              if (null != t && null != (e = t.destroyHooks))
                for (let r = 0; r < e.length; r += 2) {
                  const o = n[e[r]];
                  if (!(o instanceof Go)) {
                    const i = e[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(t, n),
            (function o1(t, n) {
              const e = t.cleanup,
                r = n[7];
              let o = -1;
              if (null !== e)
                for (let i = 0; i < e.length - 1; i += 2)
                  if ('string' == typeof e[i]) {
                    const s = e[i + 1],
                      a = 'function' == typeof s ? s(n) : Be(n[s]),
                      l = r[(o = e[i + 2])],
                      c = e[i + 3];
                    'boolean' == typeof c
                      ? a.removeEventListener(e[i], l, c)
                      : c >= 0
                      ? r[(o = c)]()
                      : r[(o = -c)].unsubscribe(),
                      (i += 2);
                  } else {
                    const s = r[(o = e[i + 1])];
                    e[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                n[7] = null;
              }
            })(t, n),
            1 === n[1].type && n[11].destroy();
          const e = n[17];
          if (null !== e && Yt(n[3])) {
            e !== n[3] && Op(e, n);
            const r = n[19];
            null !== r && r.detachView(t);
          }
          !(function ND(t) {
            Ec.delete(t[20]);
          })(n);
        }
      }
      function Lp(t, n, e) {
        return (function Bp(t, n, e) {
          let r = n;
          for (; null !== r && 40 & r.type; ) r = (n = r).parent;
          if (null === r) return e[0];
          if (2 & r.flags) {
            const o = t.data[r.directiveStart].encapsulation;
            if (o === an.None || o === an.Emulated) return null;
          }
          return Bt(r, e);
        })(t, n.parent, e);
      }
      function yr(t, n, e, r, o) {
        t.insertBefore(n, e, r, o);
      }
      function jp(t, n, e) {
        t.appendChild(n, e);
      }
      function Vp(t, n, e, r, o) {
        null !== r ? yr(t, n, e, r, o) : jp(t, n, e);
      }
      function Bs(t, n) {
        return t.parentNode(n);
      }
      function $p(t, n, e) {
        return zp(t, n, e);
      }
      let zp = function Up(t, n, e) {
        return 40 & t.type ? Bt(t, e) : null;
      };
      function js(t, n, e, r) {
        const o = Lp(t, r, n),
          i = n[11],
          a = $p(r.parent || n[6], r, n);
        if (null != o)
          if (Array.isArray(e)) for (let l = 0; l < e.length; l++) Vp(i, o, e[l], a, !1);
          else Vp(i, o, e, a, !1);
      }
      function Vs(t, n) {
        if (null !== n) {
          const e = n.type;
          if (3 & e) return Bt(n, t);
          if (4 & e) return jc(-1, t[n.index]);
          if (8 & e) {
            const r = n.child;
            if (null !== r) return Vs(t, r);
            {
              const o = t[n.index];
              return Yt(o) ? jc(-1, o) : Be(o);
            }
          }
          if (32 & e) return kc(n, t)() || Be(t[n.index]);
          {
            const r = Wp(t, n);
            return null !== r ? (Array.isArray(r) ? r[0] : Vs(di(t[16]), r)) : Vs(t, n.next);
          }
        }
        return null;
      }
      function Wp(t, n) {
        return null !== n ? t[16][6].projection[n.projection] : null;
      }
      function jc(t, n) {
        const e = 10 + t + 1;
        if (e < n.length) {
          const r = n[e],
            o = r[1].firstChild;
          if (null !== o) return Vs(r, o);
        }
        return n[7];
      }
      function Vc(t, n, e, r, o, i, s) {
        for (; null != e; ) {
          const a = r[e.index],
            l = e.type;
          if ((s && 0 === n && (a && rt(Be(a), r), (e.flags |= 4)), 64 != (64 & e.flags)))
            if (8 & l) Vc(t, n, e.child, r, o, i, !1), so(n, t, o, a, i);
            else if (32 & l) {
              const c = kc(e, r);
              let u;
              for (; (u = c()); ) so(n, t, o, u, i);
              so(n, t, o, a, i);
            } else 16 & l ? Qp(t, n, r, e, o, i) : so(n, t, o, a, i);
          e = s ? e.projectionNext : e.next;
        }
      }
      function fi(t, n, e, r, o, i) {
        Vc(e, r, t.firstChild, n, o, i, !1);
      }
      function Qp(t, n, e, r, o, i) {
        const s = e[16],
          l = s[6].projection[r.projection];
        if (Array.isArray(l)) for (let c = 0; c < l.length; c++) so(n, t, o, l[c], i);
        else Vc(t, n, l, s[3], o, i, !0);
      }
      function Xp(t, n, e) {
        t.setAttribute(n, 'style', e);
      }
      function $c(t, n, e) {
        '' === e ? t.removeAttribute(n, 'class') : t.setAttribute(n, 'class', e);
      }
      function Yp(t, n, e) {
        let r = t.length;
        for (;;) {
          const o = t.indexOf(n, e);
          if (-1 === o) return o;
          if (0 === o || t.charCodeAt(o - 1) <= 32) {
            const i = n.length;
            if (o + i === r || t.charCodeAt(o + i) <= 32) return o;
          }
          e = o + 1;
        }
      }
      const Zp = 'ng-template';
      function d1(t, n, e) {
        let r = 0;
        for (; r < t.length; ) {
          let o = t[r++];
          if (e && 'class' === o) {
            if (((o = t[r]), -1 !== Yp(o.toLowerCase(), n, 0))) return !0;
          } else if (1 === o) {
            for (; r < t.length && 'string' == typeof (o = t[r++]); ) if (o.toLowerCase() === n) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Kp(t) {
        return 4 === t.type && t.value !== Zp;
      }
      function f1(t, n, e) {
        return n === (4 !== t.type || e ? t.value : Zp);
      }
      function h1(t, n, e) {
        let r = 4;
        const o = t.attrs || [],
          i = (function m1(t) {
            for (let n = 0; n < t.length; n++) if (Dh(t[n])) return n;
            return t.length;
          })(o);
        let s = !1;
        for (let a = 0; a < n.length; a++) {
          const l = n[a];
          if ('number' != typeof l) {
            if (!s)
              if (4 & r) {
                if (((r = 2 | (1 & r)), ('' !== l && !f1(t, l, e)) || ('' === l && 1 === n.length))) {
                  if (Kt(r)) return !1;
                  s = !0;
                }
              } else {
                const c = 8 & r ? l : n[++a];
                if (8 & r && null !== t.attrs) {
                  if (!d1(t.attrs, c, e)) {
                    if (Kt(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = p1(8 & r ? 'class' : l, o, Kp(t), e);
                if (-1 === d) {
                  if (Kt(r)) return !1;
                  s = !0;
                  continue;
                }
                if ('' !== c) {
                  let h;
                  h = d > i ? '' : o[d + 1].toLowerCase();
                  const y = 8 & r ? h : null;
                  if ((y && -1 !== Yp(y, c, 0)) || (2 & r && c !== h)) {
                    if (Kt(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Kt(r) && !Kt(l)) return !1;
            if (s && Kt(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return Kt(r) || s;
      }
      function Kt(t) {
        return 0 == (1 & t);
      }
      function p1(t, n, e, r) {
        if (null === n) return -1;
        let o = 0;
        if (r || !e) {
          let i = !1;
          for (; o < n.length; ) {
            const s = n[o];
            if (s === t) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = n[++o];
                for (; 'string' == typeof a; ) a = n[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function _1(t, n) {
          let e = t.indexOf(4);
          if (e > -1)
            for (e++; e < t.length; ) {
              const r = t[e];
              if ('number' == typeof r) return -1;
              if (r === n) return e;
              e++;
            }
          return -1;
        })(n, t);
      }
      function Jp(t, n, e = !1) {
        for (let r = 0; r < n.length; r++) if (h1(t, n[r], e)) return !0;
        return !1;
      }
      function y1(t, n) {
        e: for (let e = 0; e < n.length; e++) {
          const r = n[e];
          if (t.length === r.length) {
            for (let o = 0; o < t.length; o++) if (t[o] !== r[o]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function eg(t, n) {
        return t ? ':not(' + n.trim() + ')' : n;
      }
      function w1(t) {
        let n = t[0],
          e = 1,
          r = 2,
          o = '',
          i = !1;
        for (; e < t.length; ) {
          let s = t[e];
          if ('string' == typeof s)
            if (2 & r) {
              const a = t[++e];
              o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
            } else 8 & r ? (o += '.' + s) : 4 & r && (o += ' ' + s);
          else '' !== o && !Kt(s) && ((n += eg(i, o)), (o = '')), (r = s), (i = i || !Kt(r));
          e++;
        }
        return '' !== o && (n += eg(i, o)), n;
      }
      const X = {};
      function m(t) {
        tg(ae(), x(), dt() + t, !1);
      }
      function tg(t, n, e, r) {
        if (!r)
          if (3 == (3 & n[2])) {
            const i = t.preOrderCheckHooks;
            null !== i && bs(n, i, e);
          } else {
            const i = t.preOrderHooks;
            null !== i && vs(n, i, 0, e);
          }
        $n(e);
      }
      function ig(t, n = null, e = null, r) {
        const o = sg(t, n, e, r);
        return o.resolveInjectorInitializers(), o;
      }
      function sg(t, n = null, e = null, r, o = new Set()) {
        const i = [e || ue, rD(t)];
        return (r = r || ('object' == typeof t ? void 0 : me(t))), new gp(i, n || Hs(), r || null, o);
      }
      let Jt = (() => {
        class t {
          static create(e, r) {
            var o;
            if (Array.isArray(e)) return ig({ name: '' }, r, e, '');
            {
              const i = null !== (o = e.name) && void 0 !== o ? o : '';
              return ig({ name: i }, e.parent, e.providers, i);
            }
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Jo),
          (t.NULL = new up()),
          (t.ɵprov = G({ token: t, providedIn: 'any', factory: () => j(lp) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function I(t, n = $.Default) {
        const e = x();
        return null === e ? j(t, n) : Rh(Ge(), e, z(t), n);
      }
      function qc() {
        throw new Error('invalid');
      }
      function Us(t, n) {
        return (t << 17) | (n << 2);
      }
      function en(t) {
        return (t >> 17) & 32767;
      }
      function Qc(t) {
        return 2 | t;
      }
      function Mn(t) {
        return (131068 & t) >> 2;
      }
      function Xc(t, n) {
        return (-131069 & t) | (n << 2);
      }
      function Yc(t) {
        return 1 | t;
      }
      function Dg(t, n) {
        const e = t.contentQueries;
        if (null !== e)
          for (let r = 0; r < e.length; r += 2) {
            const o = e[r],
              i = e[r + 1];
            if (-1 !== i) {
              const s = t.data[i];
              Gl(o), s.contentQueries(2, n[i], i);
            }
          }
      }
      function Ws(t, n, e, r, o, i, s, a, l, c, u) {
        const d = n.blueprint.slice();
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== u || (t && 1024 & t[2])) && (d[2] |= 1024),
          ch(d),
          (d[3] = d[15] = t),
          (d[8] = e),
          (d[10] = s || (t && t[10])),
          (d[11] = a || (t && t[11])),
          (d[12] = l || (t && t[12]) || null),
          (d[9] = c || (t && t[9]) || null),
          (d[6] = i),
          (d[20] = (function PD() {
            return kD++;
          })()),
          (d[21] = u),
          (d[16] = 2 == n.type ? t[16] : d),
          d
        );
      }
      function lo(t, n, e, r, o) {
        let i = t.data[n];
        if (null === i)
          (i = (function ou(t, n, e, r, o) {
            const i = fh(),
              s = Vl(),
              l = (t.data[n] = (function tT(t, n, e, r, o, i) {
                return {
                  type: e,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: n ? n.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: n,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0
                };
              })(0, s ? i : i && i.parent, e, n, r, o));
            return (
              null === t.firstChild && (t.firstChild = l),
              null !== i &&
                (s ? null == i.child && null !== l.parent && (i.child = l) : null === i.next && (i.next = l)),
              l
            );
          })(t, n, e, r, o)),
            (function PC() {
              return W.lFrame.inI18n;
            })() && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = e), (i.value = r), (i.attrs = o);
          const s = (function zo() {
            const t = W.lFrame,
              n = t.currentTNode;
            return t.isParent ? n : n.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return cn(i, !0), i;
      }
      function co(t, n, e, r) {
        if (0 === e) return -1;
        const o = n.length;
        for (let i = 0; i < e; i++) n.push(r), t.blueprint.push(r), t.data.push(null);
        return o;
      }
      function iu(t, n, e) {
        Wl(n);
        try {
          const r = t.viewQuery;
          null !== r && hu(1, r, e);
          const o = t.template;
          null !== o && Tg(t, n, o, 1, e),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Dg(t, n),
            t.staticViewQueries && hu(2, t.viewQuery, e);
          const i = t.components;
          null !== i &&
            (function K1(t, n) {
              for (let e = 0; e < n.length; e++) _T(t, n[e]);
            })(n, i);
        } catch (r) {
          throw (t.firstCreatePass && ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)), r);
        } finally {
          (n[2] &= -5), ql();
        }
      }
      function qs(t, n, e, r) {
        const o = n[2];
        if (128 != (128 & o)) {
          Wl(n);
          try {
            ch(n),
              (function ph(t) {
                return (W.lFrame.bindingIndex = t);
              })(t.bindingStartIndex),
              null !== e && Tg(t, n, e, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const c = t.preOrderCheckHooks;
              null !== c && bs(n, c, null);
            } else {
              const c = t.preOrderHooks;
              null !== c && vs(n, c, 0, null), Ql(n, 0);
            }
            if (
              ((function gT(t) {
                for (let n = Pc(t); null !== n; n = Fc(n)) {
                  if (!n[2]) continue;
                  const e = n[9];
                  for (let r = 0; r < e.length; r++) {
                    const o = e[r],
                      i = o[3];
                    0 == (512 & o[2]) && jl(i, 1), (o[2] |= 512);
                  }
                }
              })(n),
              (function pT(t) {
                for (let n = Pc(t); null !== n; n = Fc(n))
                  for (let e = 10; e < n.length; e++) {
                    const r = n[e],
                      o = r[1];
                    ys(r) && qs(o, r, o.template, r[8]);
                  }
              })(n),
              null !== t.contentQueries && Dg(t, n),
              s)
            ) {
              const c = t.contentCheckHooks;
              null !== c && bs(n, c);
            } else {
              const c = t.contentHooks;
              null !== c && vs(n, c, 1), Ql(n, 1);
            }
            !(function Y1(t, n) {
              const e = t.hostBindingOpCodes;
              if (null !== e)
                try {
                  for (let r = 0; r < e.length; r++) {
                    const o = e[r];
                    if (o < 0) $n(~o);
                    else {
                      const i = o,
                        s = e[++r],
                        a = e[++r];
                      FC(s, i), a(2, n[i]);
                    }
                  }
                } finally {
                  $n(-1);
                }
            })(t, n);
            const a = t.components;
            null !== a &&
              (function Z1(t, n) {
                for (let e = 0; e < n.length; e++) mT(t, n[e]);
              })(n, a);
            const l = t.viewQuery;
            if ((null !== l && hu(2, l, r), s)) {
              const c = t.viewCheckHooks;
              null !== c && bs(n, c);
            } else {
              const c = t.viewHooks;
              null !== c && vs(n, c, 2), Ql(n, 2);
            }
            !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
              (n[2] &= -41),
              512 & n[2] && ((n[2] &= -513), jl(n[3], -1));
          } finally {
            ql();
          }
        }
      }
      function Tg(t, n, e, r, o) {
        const i = dt(),
          s = 2 & r;
        try {
          $n(-1), s && n.length > 22 && tg(t, n, 22, !1), e(r, o);
        } finally {
          $n(i);
        }
      }
      function Sg(t, n, e) {
        if (Fl(n)) {
          const o = n.directiveEnd;
          for (let i = n.directiveStart; i < o; i++) {
            const s = t.data[i];
            s.contentQueries && s.contentQueries(1, e[i], i);
          }
        }
      }
      function su(t, n, e) {
        !dh() ||
          ((function sT(t, n, e, r) {
            const o = e.directiveStart,
              i = e.directiveEnd;
            t.firstCreatePass || qo(e, n), rt(r, n);
            const s = e.initialInputs;
            for (let a = o; a < i; a++) {
              const l = t.data[a],
                c = Zt(l);
              c && dT(n, e, l);
              const u = Qo(n, t, a, e);
              rt(u, n), null !== s && fT(0, a - o, u, l, 0, s), c && (Et(e.index, n)[8] = u);
            }
          })(t, n, e, Bt(e, n)),
          128 == (128 & e.flags) &&
            (function aT(t, n, e) {
              const r = e.directiveStart,
                o = e.directiveEnd,
                i = e.index,
                s = (function NC() {
                  return W.lFrame.currentDirectiveIndex;
                })();
              try {
                $n(i);
                for (let a = r; a < o; a++) {
                  const l = t.data[a],
                    c = n[a];
                  Ul(a), (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && kg(l, c);
                }
              } finally {
                $n(-1), Ul(s);
              }
            })(t, n, e));
      }
      function au(t, n, e = Bt) {
        const r = n.localNames;
        if (null !== r) {
          let o = n.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? e(n, t) : t[s];
            t[o++] = a;
          }
        }
      }
      function xg(t) {
        const n = t.tView;
        return null === n || n.incompleteFirstPass
          ? (t.tView = lu(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : n;
      }
      function lu(t, n, e, r, o, i, s, a, l, c) {
        const u = 22 + r,
          d = u + o,
          h = (function J1(t, n) {
            const e = [];
            for (let r = 0; r < n; r++) e.push(r < t ? null : X);
            return e;
          })(u, d),
          y = 'function' == typeof c ? c() : c;
        return (h[1] = {
          type: t,
          blueprint: h,
          template: e,
          queries: null,
          viewQuery: a,
          declTNode: n,
          data: h.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: y,
          incompleteFirstPass: !1
        });
      }
      function Ig(t, n, e, r) {
        const o = Hg(n);
        null === e ? o.push(r) : (o.push(e), t.firstCreatePass && Lg(t).push(r, o.length - 1));
      }
      function Eg(t, n, e) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const o = t[r];
            (e = null === e ? {} : e).hasOwnProperty(r) ? e[r].push(n, o) : (e[r] = [n, o]);
          }
        return e;
      }
      function Mg(t, n) {
        const r = n.directiveEnd,
          o = t.data,
          i = n.attrs,
          s = [];
        let a = null,
          l = null;
        for (let c = n.directiveStart; c < r; c++) {
          const u = o[c],
            d = u.inputs,
            h = null === i || Kp(n) ? null : hT(d, i);
          s.push(h), (a = Eg(d, c, a)), (l = Eg(u.outputs, c, l));
        }
        null !== a && (a.hasOwnProperty('class') && (n.flags |= 16), a.hasOwnProperty('style') && (n.flags |= 32)),
          (n.initialInputs = s),
          (n.inputs = a),
          (n.outputs = l);
      }
      function Rt(t, n, e, r, o, i, s, a) {
        const l = Bt(n, e);
        let u,
          c = n.inputs;
        !a && null != c && (u = c[r])
          ? (pu(t, e, u, r, o), gs(n) && Ag(e, n.index))
          : 3 & n.type &&
            ((r = (function nT(t) {
              return 'class' === t
                ? 'className'
                : 'for' === t
                ? 'htmlFor'
                : 'formaction' === t
                ? 'formAction'
                : 'innerHtml' === t
                ? 'innerHTML'
                : 'readonly' === t
                ? 'readOnly'
                : 'tabindex' === t
                ? 'tabIndex'
                : t;
            })(r)),
            (o = null != s ? s(o, n.value || '', r) : o),
            i.setProperty(l, r, o));
      }
      function Ag(t, n) {
        const e = Et(n, t);
        16 & e[2] || (e[2] |= 32);
      }
      function cu(t, n, e, r) {
        let o = !1;
        if (dh()) {
          const i = (function lT(t, n, e) {
              const r = t.directiveRegistry;
              let o = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const s = r[i];
                  Jp(e, s.selectors, !1) &&
                    (o || (o = []), xs(qo(e, n), t, s.type), Zt(s) ? (Pg(t, e), o.unshift(s)) : o.push(s));
                }
              return o;
            })(t, n, e),
            s = null === r ? null : { '': -1 };
          if (null !== i) {
            (o = !0), Fg(e, t.data.length, i.length);
            for (let u = 0; u < i.length; u++) {
              const d = i[u];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              c = co(t, n, i.length, null);
            for (let u = 0; u < i.length; u++) {
              const d = i[u];
              (e.mergedAttrs = Ds(e.mergedAttrs, d.hostAttrs)),
                Ng(t, e, n, c, d),
                uT(c, d, s),
                null !== d.contentQueries && (e.flags |= 8),
                (null !== d.hostBindings || null !== d.hostAttrs || 0 !== d.hostVars) && (e.flags |= 128);
              const h = d.type.prototype;
              !a &&
                (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(e.index), (a = !0)),
                !l &&
                  (h.ngOnChanges || h.ngDoCheck) &&
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(e.index), (l = !0)),
                c++;
            }
            Mg(t, e);
          }
          s &&
            (function cT(t, n, e) {
              if (n) {
                const r = (t.localNames = []);
                for (let o = 0; o < n.length; o += 2) {
                  const i = e[n[o + 1]];
                  if (null == i) throw new F(-301, !1);
                  r.push(n[o], i);
                }
              }
            })(e, r, s);
        }
        return (e.mergedAttrs = Ds(e.mergedAttrs, e.attrs)), o;
      }
      function Rg(t, n, e, r, o, i) {
        const s = i.hostBindings;
        if (s) {
          let a = t.hostBindingOpCodes;
          null === a && (a = t.hostBindingOpCodes = []);
          const l = ~n.index;
          (function iT(t) {
            let n = t.length;
            for (; n > 0; ) {
              const e = t[--n];
              if ('number' == typeof e && e < 0) return e;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, o, s);
        }
      }
      function kg(t, n) {
        null !== t.hostBindings && t.hostBindings(1, n);
      }
      function Pg(t, n) {
        (n.flags |= 2), (t.components || (t.components = [])).push(n.index);
      }
      function uT(t, n, e) {
        if (e) {
          if (n.exportAs) for (let r = 0; r < n.exportAs.length; r++) e[n.exportAs[r]] = t;
          Zt(n) && (e[''] = t);
        }
      }
      function Fg(t, n, e) {
        (t.flags |= 1), (t.directiveStart = n), (t.directiveEnd = n + e), (t.providerIndexes = n);
      }
      function Ng(t, n, e, r, o) {
        t.data[r] = o;
        const i = o.factory || (o.factory = gr(o.type)),
          s = new Go(i, Zt(o), I);
        (t.blueprint[r] = s), (e[r] = s), Rg(t, n, 0, r, co(t, e, o.hostVars, X), o);
      }
      function dT(t, n, e) {
        const r = Bt(n, t),
          o = xg(e),
          i = t[10],
          s = Qs(t, Ws(t, o, null, e.onPush ? 32 : 16, r, n, i, i.createRenderer(r, e), null, null, null));
        t[n.index] = s;
      }
      function dn(t, n, e, r, o, i) {
        const s = Bt(t, n);
        !(function uu(t, n, e, r, o, i, s) {
          if (null == i) t.removeAttribute(n, o, e);
          else {
            const a = null == s ? Q(i) : s(i, r || '', o);
            t.setAttribute(n, o, a, e);
          }
        })(n[11], s, i, t.value, e, r, o);
      }
      function fT(t, n, e, r, o, i) {
        const s = i[n];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const c = s[l++],
              u = s[l++],
              d = s[l++];
            null !== a ? r.setInput(e, d, c, u) : (e[u] = d);
          }
        }
      }
      function hT(t, n) {
        let e = null,
          r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if (0 !== o)
            if (5 !== o) {
              if ('number' == typeof o) break;
              t.hasOwnProperty(o) && (null === e && (e = []), e.push(o, t[o], n[r + 1])), (r += 2);
            } else r += 2;
          else r += 4;
        }
        return e;
      }
      function Og(t, n, e, r) {
        return new Array(t, !0, !1, n, null, 0, r, e, null, null);
      }
      function mT(t, n) {
        const e = Et(n, t);
        if (ys(e)) {
          const r = e[1];
          48 & e[2] ? qs(r, e, r.template, e[8]) : e[5] > 0 && du(e);
        }
      }
      function du(t) {
        for (let r = Pc(t); null !== r; r = Fc(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (ys(i))
              if (512 & i[2]) {
                const s = i[1];
                qs(s, i, s.template, i[8]);
              } else i[5] > 0 && du(i);
          }
        const e = t[1].components;
        if (null !== e)
          for (let r = 0; r < e.length; r++) {
            const o = Et(e[r], t);
            ys(o) && o[5] > 0 && du(o);
          }
      }
      function _T(t, n) {
        const e = Et(n, t),
          r = e[1];
        (function yT(t, n) {
          for (let e = n.length; e < t.blueprint.length; e++) n.push(t.blueprint[e]);
        })(r, e),
          iu(r, e, e[8]);
      }
      function Qs(t, n) {
        return t[13] ? (t[14][4] = n) : (t[13] = n), (t[14] = n), n;
      }
      function fu(t) {
        for (; t; ) {
          t[2] |= 32;
          const n = di(t);
          if (hC(t) && !n) return t;
          t = n;
        }
        return null;
      }
      function Xs(t, n, e, r = !0) {
        const o = n[10];
        o.begin && o.begin();
        try {
          qs(t, n, t.template, e);
        } catch (s) {
          throw (r && jg(n, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function hu(t, n, e) {
        Gl(0), n(t, e);
      }
      function Hg(t) {
        return t[7] || (t[7] = []);
      }
      function Lg(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function jg(t, n) {
        const e = t[9],
          r = e ? e.get(oo, null) : null;
        r && r.handleError(n);
      }
      function pu(t, n, e, r, o) {
        for (let i = 0; i < e.length; ) {
          const s = e[i++],
            a = e[i++],
            l = n[s],
            c = t.data[s];
          null !== c.setInput ? c.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function An(t, n, e) {
        const r = _s(n, t);
        !(function Np(t, n, e) {
          t.setValue(n, e);
        })(t[11], r, e);
      }
      function Ys(t, n, e) {
        let r = e ? t.styles : null,
          o = e ? t.classes : null,
          i = 0;
        if (null !== n)
          for (let s = 0; s < n.length; s++) {
            const a = n[s];
            'number' == typeof a ? (i = a) : 1 == i ? (o = Sl(o, a)) : 2 == i && (r = Sl(r, a + ': ' + n[++s] + ';'));
          }
        e ? (t.styles = r) : (t.stylesWithoutHost = r), e ? (t.classes = o) : (t.classesWithoutHost = o);
      }
      function Zs(t, n, e, r, o = !1) {
        for (; null !== e; ) {
          const i = n[e.index];
          if ((null !== i && r.push(Be(i)), Yt(i)))
            for (let a = 10; a < i.length; a++) {
              const l = i[a],
                c = l[1].firstChild;
              null !== c && Zs(l[1], l, c, r);
            }
          const s = e.type;
          if (8 & s) Zs(t, n, e.child, r);
          else if (32 & s) {
            const a = kc(e, n);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = Wp(n, e);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = di(n[16]);
              Zs(l[1], l, a, r, !0);
            }
          }
          e = o ? e.projectionNext : e.next;
        }
        return r;
      }
      class hi {
        constructor(n, e) {
          (this._lView = n),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const n = this._lView,
            e = n[1];
          return Zs(e, n, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(n) {
          this._lView[8] = n;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const n = this._lView[3];
            if (Yt(n)) {
              const e = n[8],
                r = e ? e.indexOf(this) : -1;
              r > -1 && (Hc(n, r), Es(e, r));
            }
            this._attachedToViewContainer = !1;
          }
          Hp(this._lView[1], this._lView);
        }
        onDestroy(n) {
          Ig(this._lView[1], this._lView, null, n);
        }
        markForCheck() {
          fu(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          Xs(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new F(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function e1(t, n) {
              fi(t, n, n[11], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(n) {
          if (this._attachedToViewContainer) throw new F(902, !1);
          this._appRef = n;
        }
      }
      class wT extends hi {
        constructor(n) {
          super(n), (this._view = n);
        }
        detectChanges() {
          const n = this._view;
          Xs(n[1], n, n[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class gu extends ci {
        constructor(n) {
          super(), (this.ngModule = n);
        }
        resolveComponentFactory(n) {
          const e = he(n);
          return new pi(e, this.ngModule);
        }
      }
      function Vg(t) {
        const n = [];
        for (let e in t) t.hasOwnProperty(e) && n.push({ propName: t[e], templateName: e });
        return n;
      }
      class vT {
        constructor(n, e) {
          (this.injector = n), (this.parentInjector = e);
        }
        get(n, e, r) {
          const o = this.injector.get(n, Cc, r);
          return o !== Cc || e === Cc ? o : this.parentInjector.get(n, e, r);
        }
      }
      class pi extends _p {
        constructor(n, e) {
          super(),
            (this.componentDef = n),
            (this.ngModule = e),
            (this.componentType = n.type),
            (this.selector = (function b1(t) {
              return t.map(w1).join(',');
            })(n.selectors)),
            (this.ngContentSelectors = n.ngContentSelectors ? n.ngContentSelectors : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return Vg(this.componentDef.inputs);
        }
        get outputs() {
          return Vg(this.componentDef.outputs);
        }
        create(n, e, r, o) {
          let i = (o = o || this.ngModule) instanceof Gn ? o : null == o ? void 0 : o.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new vT(n, i) : n,
            a = s.get(wp, null);
          if (null === a) throw new F(407, !1);
          const l = s.get(wD, null),
            c = a.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || 'div',
            d = r
              ? (function eT(t, n, e) {
                  return t.selectRootElement(n, e === an.ShadowDom);
                })(c, r, this.componentDef.encapsulation)
              : Oc(
                  a.createRenderer(null, this.componentDef),
                  u,
                  (function bT(t) {
                    const n = t.toLowerCase();
                    return 'svg' === n ? 'svg' : 'math' === n ? 'math' : null;
                  })(u)
                ),
            h = this.componentDef.onPush ? 288 : 272,
            y = lu(0, null, null, 1, 0, null, null, null, null, null),
            w = Ws(null, y, null, h, null, null, a, c, l, s, null);
          let C, T;
          Wl(w);
          try {
            const M = (function TT(t, n, e, r, o, i) {
              const s = e[1];
              e[22] = t;
              const l = lo(s, 22, 2, '#host', null),
                c = (l.mergedAttrs = n.hostAttrs);
              null !== c &&
                (Ys(l, c, !0),
                null !== t &&
                  (Cs(o, t, c), null !== l.classes && $c(o, t, l.classes), null !== l.styles && Xp(o, t, l.styles)));
              const u = r.createRenderer(t, n),
                d = Ws(e, xg(n), null, n.onPush ? 32 : 16, e[22], l, r, u, i || null, null, null);
              return (
                s.firstCreatePass && (xs(qo(l, e), s, n.type), Pg(s, l), Fg(l, e.length, 1)), Qs(e, d), (e[22] = d)
              );
            })(d, this.componentDef, w, a, c);
            if (d)
              if (r) Cs(c, d, ['ng-version', bD.full]);
              else {
                const { attrs: A, classes: D } = (function v1(t) {
                  const n = [],
                    e = [];
                  let r = 1,
                    o = 2;
                  for (; r < t.length; ) {
                    let i = t[r];
                    if ('string' == typeof i) 2 === o ? '' !== i && n.push(i, t[++r]) : 8 === o && e.push(i);
                    else {
                      if (!Kt(o)) break;
                      o = i;
                    }
                    r++;
                  }
                  return { attrs: n, classes: e };
                })(this.componentDef.selectors[0]);
                A && Cs(c, d, A), D && D.length > 0 && $c(c, d, D.join(' '));
              }
            if (((T = Bl(y, 22)), void 0 !== e)) {
              const A = (T.projection = []);
              for (let D = 0; D < this.ngContentSelectors.length; D++) {
                const N = e[D];
                A.push(null != N ? Array.from(N) : null);
              }
            }
            (C = (function ST(t, n, e, r) {
              const o = e[1],
                i = (function oT(t, n, e) {
                  const r = Ge();
                  t.firstCreatePass &&
                    (e.providersResolver && e.providersResolver(e), Ng(t, r, n, co(t, n, 1, null), e), Mg(t, r));
                  const o = Qo(n, t, r.directiveStart, r);
                  rt(o, n);
                  const i = Bt(r, n);
                  return i && rt(i, n), o;
                })(o, e, n);
              if (((t[8] = e[8] = i), null !== r)) for (const a of r) a(i, n);
              if (n.contentQueries) {
                const a = Ge();
                n.contentQueries(1, i, a.directiveStart);
              }
              const s = Ge();
              return (
                !o.firstCreatePass ||
                  (null === n.hostBindings && null === n.hostAttrs) ||
                  ($n(s.index), Rg(e[1], s, 0, s.directiveStart, s.directiveEnd, n), kg(n, i)),
                i
              );
            })(M, this.componentDef, w, [xT])),
              iu(y, w, null);
          } finally {
            ql();
          }
          return new DT(this.componentType, C, no(T, w), w, T);
        }
      }
      class DT extends class hD {} {
        constructor(n, e, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new wT(o)),
            (this.componentType = n);
        }
        setInput(n, e) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[n])) {
            const i = this._rootLView;
            pu(i[1], i, o, n, e), Ag(i, this._tNode.index);
          }
        }
        get injector() {
          return new Wr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(n) {
          this.hostView.onDestroy(n);
        }
      }
      function xT() {
        const t = Ge();
        ws(x()[1], t);
      }
      let Ks = null;
      function wr() {
        if (!Ks) {
          const t = _e.Symbol;
          if (t && t.iterator) Ks = t.iterator;
          else {
            const n = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < n.length; ++e) {
              const r = n[e];
              'entries' !== r && 'size' !== r && Map.prototype[r] === Map.prototype.entries && (Ks = r);
            }
          }
        }
        return Ks;
      }
      function gi(t) {
        return !!_u(t) && (Array.isArray(t) || (!(t instanceof Map) && wr() in t));
      }
      function _u(t) {
        return null !== t && ('function' == typeof t || 'object' == typeof t);
      }
      function fn(t, n, e) {
        return (t[n] = e);
      }
      function mi(t, n) {
        return t[n];
      }
      function ot(t, n, e) {
        return !Object.is(t[n], e) && ((t[n] = e), !0);
      }
      function br(t, n, e, r) {
        const o = ot(t, n, e);
        return ot(t, n + 1, r) || o;
      }
      function jt(t, n, e, r, o, i) {
        const s = br(t, n, e, r);
        return br(t, n + 2, o, i) || s;
      }
      function uo(t, n, e, r) {
        const o = x();
        return ot(o, Ur(), n) && (ae(), dn(Me(), o, t, n, e, r)), uo;
      }
      function ho(t, n, e, r) {
        return ot(t, Ur(), e) ? n + Q(e) + r : X;
      }
      function b(t, n, e, r, o, i, s, a) {
        const l = x(),
          c = ae(),
          u = t + 22,
          d = c.firstCreatePass
            ? (function LT(t, n, e, r, o, i, s, a, l) {
                const c = n.consts,
                  u = lo(n, t, 4, s || null, Vn(c, a));
                cu(n, e, u, Vn(c, l)), ws(n, u);
                const d = (u.tViews = lu(2, u, r, o, i, n.directiveRegistry, n.pipeRegistry, null, n.schemas, c));
                return null !== n.queries && (n.queries.template(n, u), (d.queries = n.queries.embeddedTView(u))), u;
              })(u, c, l, n, e, r, o, i, s)
            : c.data[u];
        cn(d, !1);
        const h = l[11].createComment('');
        js(c, l, h, d), rt(h, l), Qs(l, (l[u] = Og(h, l, h, d))), ms(d) && su(c, l, d), null != s && au(l, d, a);
      }
      function Qn(t) {
        return $r(
          (function kC() {
            return W.lFrame.contextLView;
          })(),
          22 + t
        );
      }
      function _(t, n, e) {
        const r = x();
        return ot(r, Ur(), n) && Rt(ae(), Me(), r, t, n, r[11], e, !1), _;
      }
      function yu(t, n, e, r, o) {
        const s = o ? 'class' : 'style';
        pu(t, e, n.inputs[s], s, r);
      }
      function f(t, n, e, r) {
        const o = x(),
          i = ae(),
          s = 22 + t,
          a = o[11],
          l = (o[s] = Oc(
            a,
            n,
            (function UC() {
              return W.lFrame.currentNamespace;
            })()
          )),
          c = i.firstCreatePass
            ? (function jT(t, n, e, r, o, i, s) {
                const a = n.consts,
                  c = lo(n, t, 2, o, Vn(a, i));
                return (
                  cu(n, e, c, Vn(a, s)),
                  null !== c.attrs && Ys(c, c.attrs, !1),
                  null !== c.mergedAttrs && Ys(c, c.mergedAttrs, !0),
                  null !== n.queries && n.queries.elementStart(n, c),
                  c
                );
              })(s, i, o, 0, n, e, r)
            : i.data[s];
        cn(c, !0);
        const u = c.mergedAttrs;
        null !== u && Cs(a, l, u);
        const d = c.classes;
        null !== d && $c(a, l, d);
        const h = c.styles;
        return (
          null !== h && Xp(a, l, h),
          64 != (64 & c.flags) && js(i, o, l, c),
          0 ===
            (function IC() {
              return W.lFrame.elementDepthCount;
            })() && rt(l, o),
          (function EC() {
            W.lFrame.elementDepthCount++;
          })(),
          ms(c) && (su(i, o, c), Sg(i, c, o)),
          null !== r && au(o, c),
          f
        );
      }
      function p() {
        let t = Ge();
        Vl() ? $l() : ((t = t.parent), cn(t, !1));
        const n = t;
        !(function MC() {
          W.lFrame.elementDepthCount--;
        })();
        const e = ae();
        return (
          e.firstCreatePass && (ws(e, t), Fl(t) && e.queries.elementEnd(t)),
          null != n.classesWithoutHost &&
            (function QC(t) {
              return 0 != (16 & t.flags);
            })(n) &&
            yu(e, n, x(), n.classesWithoutHost, !0),
          null != n.stylesWithoutHost &&
            (function XC(t) {
              return 0 != (32 & t.flags);
            })(n) &&
            yu(e, n, x(), n.stylesWithoutHost, !1),
          p
        );
      }
      function S(t, n, e, r) {
        return f(t, n, e, r), p(), S;
      }
      function ea(t, n, e) {
        const r = x(),
          o = ae(),
          i = t + 22,
          s = o.firstCreatePass
            ? (function VT(t, n, e, r, o) {
                const i = n.consts,
                  s = Vn(i, r),
                  a = lo(n, t, 8, 'ng-container', s);
                return (
                  null !== s && Ys(a, s, !0),
                  cu(n, e, a, Vn(i, o)),
                  null !== n.queries && n.queries.elementStart(n, a),
                  a
                );
              })(i, o, r, n, e)
            : o.data[i];
        cn(s, !0);
        const a = (r[i] = r[11].createComment(''));
        return js(o, r, a, s), rt(a, r), ms(s) && (su(o, r, s), Sg(o, s, r)), null != e && au(r, s), ea;
      }
      function ta() {
        let t = Ge();
        const n = ae();
        return (
          Vl() ? $l() : ((t = t.parent), cn(t, !1)),
          n.firstCreatePass && (ws(n, t), Fl(t) && n.queries.elementEnd(t)),
          ta
        );
      }
      function pe() {
        return x();
      }
      function na(t) {
        return !!t && 'function' == typeof t.then;
      }
      function em(t) {
        return !!t && 'function' == typeof t.subscribe;
      }
      const tm = em;
      function v(t, n, e, r) {
        const o = x(),
          i = ae(),
          s = Ge();
        return (
          (function rm(t, n, e, r, o, i, s, a) {
            const l = ms(r),
              u = t.firstCreatePass && Lg(t),
              d = n[8],
              h = Hg(n);
            let y = !0;
            if (3 & r.type || a) {
              const T = Bt(r, n),
                M = a ? a(T) : T,
                A = h.length,
                D = a ? ne => a(Be(ne[r.index])) : r.index;
              let N = null;
              if (
                (!a &&
                  l &&
                  (N = (function $T(t, n, e, r) {
                    const o = t.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === e && o[i + 1] === r) {
                          const a = n[7],
                            l = o[i + 2];
                          return a.length > l ? a[l] : null;
                        }
                        'string' == typeof s && (i += 2);
                      }
                    return null;
                  })(t, n, o, r.index)),
                null !== N)
              )
                ((N.__ngLastListenerFn__ || N).__ngNextListenerFn__ = i), (N.__ngLastListenerFn__ = i), (y = !1);
              else {
                i = im(r, n, d, i, !1);
                const ne = e.listen(M, o, i);
                h.push(i, ne), u && u.push(o, D, A, A + 1);
              }
            } else i = im(r, n, d, i, !1);
            const w = r.outputs;
            let C;
            if (y && null !== w && (C = w[o])) {
              const T = C.length;
              if (T)
                for (let M = 0; M < T; M += 2) {
                  const Se = n[C[M]][C[M + 1]].subscribe(i),
                    Fr = h.length;
                  h.push(i, Se), u && u.push(o, r.index, Fr, -(Fr + 1));
                }
            }
          })(i, o, o[11], s, t, n, 0, r),
          v
        );
      }
      function om(t, n, e, r) {
        try {
          return !1 !== e(r);
        } catch (o) {
          return jg(t, o), !1;
        }
      }
      function im(t, n, e, r, o) {
        return function i(s) {
          if (s === Function) return r;
          fu(2 & t.flags ? Et(t.index, n) : n);
          let l = om(n, 0, r, s),
            c = i.__ngNextListenerFn__;
          for (; c; ) (l = om(n, 0, c, s) && l), (c = c.__ngNextListenerFn__);
          return o && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function E(t = 1) {
        return (function HC(t) {
          return (W.lFrame.contextLView = (function LC(t, n) {
            for (; t > 0; ) (n = n[15]), t--;
            return n;
          })(t, W.lFrame.contextLView))[8];
        })(t);
      }
      function UT(t, n) {
        let e = null;
        const r = (function g1(t) {
          const n = t.attrs;
          if (null != n) {
            const e = n.indexOf(5);
            if (0 == (1 & e)) return n[e + 1];
          }
          return null;
        })(t);
        for (let o = 0; o < n.length; o++) {
          const i = n[o];
          if ('*' !== i) {
            if (null === r ? Jp(t, i, !0) : y1(r, i)) return o;
          } else e = o;
        }
        return e;
      }
      function ra(t) {
        const n = x()[16][6];
        if (!n.projection) {
          const r = (n.projection = Ko(t ? t.length : 1, null)),
            o = r.slice();
          let i = n.child;
          for (; null !== i; ) {
            const s = t ? UT(i, t) : 0;
            null !== s && (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i)), (i = i.next);
          }
        }
      }
      function oa(t, n = 0, e) {
        const r = x(),
          o = ae(),
          i = lo(o, 22 + t, 16, null, e || null);
        null === i.projection && (i.projection = n),
          $l(),
          64 != (64 & i.flags) &&
            (function l1(t, n, e) {
              Qp(n[11], 0, n, e, Lp(t, e, n), $p(e.parent || n[6], e, n));
            })(o, r, i);
      }
      function _i(t, n, e) {
        return Rn(t, '', n, '', e), _i;
      }
      function Rn(t, n, e, r, o) {
        const i = x(),
          s = ho(i, n, e, r);
        return s !== X && Rt(ae(), Me(), i, t, s, i[11], o, !1), Rn;
      }
      function pm(t, n, e, r, o) {
        const i = t[e + 1],
          s = null === n;
        let a = r ? en(i) : Mn(i),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const u = t[a + 1];
          WT(t[a], n) && ((l = !0), (t[a + 1] = r ? Yc(u) : Qc(u))), (a = r ? en(u) : Mn(u));
        }
        l && (t[e + 1] = r ? Qc(i) : Yc(i));
      }
      function WT(t, n) {
        return (
          null === t ||
          null == n ||
          (Array.isArray(t) ? t[1] : t) === n ||
          (!(!Array.isArray(t) || 'string' != typeof n) && Zr(t, n) >= 0)
        );
      }
      const qe = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function gm(t) {
        return t.substring(qe.key, qe.keyEnd);
      }
      function mm(t, n) {
        const e = qe.textEnd;
        return e === n
          ? -1
          : ((n = qe.keyEnd =
              (function YT(t, n, e) {
                for (; n < e && t.charCodeAt(n) > 32; ) n++;
                return n;
              })(t, (qe.key = n), e)),
            vo(t, n, e));
      }
      function vo(t, n, e) {
        for (; n < e && t.charCodeAt(n) <= 32; ) n++;
        return n;
      }
      function kt(t, n, e) {
        return tn(t, n, e, !1), kt;
      }
      function ht(t, n) {
        return tn(t, n, null, !0), ht;
      }
      function pn(t) {
        nn(At, gn, t, !0);
      }
      function gn(t, n) {
        for (
          let e = (function QT(t) {
            return (
              (function ym(t) {
                (qe.key = 0), (qe.keyEnd = 0), (qe.value = 0), (qe.valueEnd = 0), (qe.textEnd = t.length);
              })(t),
              mm(t, vo(t, 0, qe.textEnd))
            );
          })(n);
          e >= 0;
          e = mm(n, e)
        )
          At(t, gm(n), !0);
      }
      function tn(t, n, e, r) {
        const o = x(),
          i = ae(),
          s = Sn(2);
        i.firstUpdatePass && Cm(i, t, s, r),
          n !== X &&
            ot(o, s, n) &&
            Tm(
              i,
              i.data[dt()],
              o,
              o[11],
              t,
              (o[s + 1] = (function sS(t, n) {
                return null == t || ('string' == typeof n ? (t += n) : 'object' == typeof t && (t = me(zn(t)))), t;
              })(n, e)),
              r,
              s
            );
      }
      function nn(t, n, e, r) {
        const o = ae(),
          i = Sn(2);
        o.firstUpdatePass && Cm(o, null, i, r);
        const s = x();
        if (e !== X && ot(s, i, e)) {
          const a = o.data[dt()];
          if (xm(a, r) && !vm(o, i)) {
            let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
            null !== l && (e = Sl(l, e || '')), yu(o, a, s, e, r);
          } else
            !(function iS(t, n, e, r, o, i, s, a) {
              o === X && (o = ue);
              let l = 0,
                c = 0,
                u = 0 < o.length ? o[0] : null,
                d = 0 < i.length ? i[0] : null;
              for (; null !== u || null !== d; ) {
                const h = l < o.length ? o[l + 1] : void 0,
                  y = c < i.length ? i[c + 1] : void 0;
                let C,
                  w = null;
                u === d
                  ? ((l += 2), (c += 2), h !== y && ((w = d), (C = y)))
                  : null === d || (null !== u && u < d)
                  ? ((l += 2), (w = u))
                  : ((c += 2), (w = d), (C = y)),
                  null !== w && Tm(t, n, e, r, w, C, s, a),
                  (u = l < o.length ? o[l] : null),
                  (d = c < i.length ? i[c] : null);
              }
            })(
              o,
              a,
              s,
              s[11],
              s[i + 1],
              (s[i + 1] = (function oS(t, n, e) {
                if (null == e || '' === e) return ue;
                const r = [],
                  o = zn(e);
                if (Array.isArray(o)) for (let i = 0; i < o.length; i++) t(r, o[i], !0);
                else if ('object' == typeof o) for (const i in o) o.hasOwnProperty(i) && t(r, i, o[i]);
                else 'string' == typeof o && n(r, o);
                return r;
              })(t, n, e)),
              r,
              i
            );
        }
      }
      function vm(t, n) {
        return n >= t.expandoStartIndex;
      }
      function Cm(t, n, e, r) {
        const o = t.data;
        if (null === o[e + 1]) {
          const i = o[dt()],
            s = vm(t, e);
          xm(i, r) && null === n && !s && (n = !1),
            (n = (function eS(t, n, e, r) {
              const o = (function zl(t) {
                const n = W.lFrame.currentDirectiveIndex;
                return -1 === n ? null : t[n];
              })(t);
              let i = r ? n.residualClasses : n.residualStyles;
              if (null === o)
                0 === (r ? n.classBindings : n.styleBindings) &&
                  ((e = yi((e = wu(null, t, n, e, r)), n.attrs, r)), (i = null));
              else {
                const s = n.directiveStylingLast;
                if (-1 === s || t[s] !== o)
                  if (((e = wu(o, t, n, e, r)), null === i)) {
                    let l = (function tS(t, n, e) {
                      const r = e ? n.classBindings : n.styleBindings;
                      if (0 !== Mn(r)) return t[en(r)];
                    })(t, n, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = wu(null, t, n, l[1], r)),
                      (l = yi(l, n.attrs, r)),
                      (function nS(t, n, e, r) {
                        t[en(e ? n.classBindings : n.styleBindings)] = r;
                      })(t, n, r, l));
                  } else
                    i = (function rS(t, n, e) {
                      let r;
                      const o = n.directiveEnd;
                      for (let i = 1 + n.directiveStylingLast; i < o; i++) r = yi(r, t[i].hostAttrs, e);
                      return yi(r, n.attrs, e);
                    })(t, n, r);
              }
              return void 0 !== i && (r ? (n.residualClasses = i) : (n.residualStyles = i)), e;
            })(o, i, n, r)),
            (function zT(t, n, e, r, o, i) {
              let s = i ? n.classBindings : n.styleBindings,
                a = en(s),
                l = Mn(s);
              t[r] = e;
              let u,
                c = !1;
              if (Array.isArray(e)) {
                const d = e;
                (u = d[1]), (null === u || Zr(d, u) > 0) && (c = !0);
              } else u = e;
              if (o)
                if (0 !== l) {
                  const h = en(t[a + 1]);
                  (t[r + 1] = Us(h, a)),
                    0 !== h && (t[h + 1] = Xc(t[h + 1], r)),
                    (t[a + 1] = (function j1(t, n) {
                      return (131071 & t) | (n << 17);
                    })(t[a + 1], r));
                } else (t[r + 1] = Us(a, 0)), 0 !== a && (t[a + 1] = Xc(t[a + 1], r)), (a = r);
              else (t[r + 1] = Us(l, 0)), 0 === a ? (a = r) : (t[l + 1] = Xc(t[l + 1], r)), (l = r);
              c && (t[r + 1] = Qc(t[r + 1])),
                pm(t, u, r, !0),
                pm(t, u, r, !1),
                (function GT(t, n, e, r, o) {
                  const i = o ? t.residualClasses : t.residualStyles;
                  null != i && 'string' == typeof n && Zr(i, n) >= 0 && (e[r + 1] = Yc(e[r + 1]));
                })(n, u, t, r, i),
                (s = Us(a, l)),
                i ? (n.classBindings = s) : (n.styleBindings = s);
            })(o, i, n, e, s, r);
        }
      }
      function wu(t, n, e, r, o) {
        let i = null;
        const s = e.directiveEnd;
        let a = e.directiveStylingLast;
        for (-1 === a ? (a = e.directiveStart) : a++; a < s && ((i = n[a]), (r = yi(r, i.hostAttrs, o)), i !== t); )
          a++;
        return null !== t && (e.directiveStylingLast = a), r;
      }
      function yi(t, n, e) {
        const r = e ? 1 : 2;
        let o = -1;
        if (null !== n)
          for (let i = 0; i < n.length; i++) {
            const s = n[i];
            'number' == typeof s
              ? (o = s)
              : o === r && (Array.isArray(t) || (t = void 0 === t ? [] : ['', t]), At(t, s, !!e || n[++i]));
          }
        return void 0 === t ? null : t;
      }
      function Tm(t, n, e, r, o, i, s, a) {
        if (!(3 & n.type)) return;
        const l = t.data,
          c = l[a + 1];
        ia(
          (function gg(t) {
            return 1 == (1 & t);
          })(c)
            ? Sm(l, n, e, o, Mn(c), s)
            : void 0
        ) ||
          (ia(i) ||
            ((function pg(t) {
              return 2 == (2 & t);
            })(c) &&
              (i = Sm(l, null, e, o, a, s))),
          (function u1(t, n, e, r, o) {
            if (n) o ? t.addClass(e, r) : t.removeClass(e, r);
            else {
              let i = -1 === r.indexOf('-') ? void 0 : wt.DashCase;
              null == o
                ? t.removeStyle(e, r, i)
                : ('string' == typeof o && o.endsWith('!important') && ((o = o.slice(0, -10)), (i |= wt.Important)),
                  t.setStyle(e, r, o, i));
            }
          })(r, s, _s(dt(), e), o, i));
      }
      function Sm(t, n, e, r, o, i) {
        const s = null === n;
        let a;
        for (; o > 0; ) {
          const l = t[o],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u;
          let h = e[o + 1];
          h === X && (h = d ? ue : void 0);
          let y = d ? nc(h, r) : u === r ? h : void 0;
          if ((c && !ia(y) && (y = nc(l, r)), ia(y) && ((a = y), s))) return a;
          const w = t[o + 1];
          o = s ? en(w) : Mn(w);
        }
        if (null !== n) {
          let l = i ? n.residualClasses : n.residualStyles;
          null != l && (a = nc(l, r));
        }
        return a;
      }
      function ia(t) {
        return void 0 !== t;
      }
      function xm(t, n) {
        return 0 != (t.flags & (n ? 16 : 32));
      }
      function g(t, n = '') {
        const e = x(),
          r = ae(),
          o = t + 22,
          i = r.firstCreatePass ? lo(r, o, 1, n, null) : r.data[o],
          s = (e[o] = (function Nc(t, n) {
            return t.createText(n);
          })(e[11], n));
        js(r, e, s, i), cn(i, !1);
      }
      function Qe(t) {
        return se('', t, ''), Qe;
      }
      function se(t, n, e) {
        const r = x(),
          o = ho(r, t, n, e);
        return o !== X && An(r, dt(), o), se;
      }
      function Xn(t, n, e, r, o) {
        const i = x(),
          s = (function po(t, n, e, r, o, i) {
            const a = br(t, Tn(), e, o);
            return Sn(2), a ? n + Q(e) + r + Q(o) + i : X;
          })(i, t, n, e, r, o);
        return s !== X && An(i, dt(), s), Xn;
      }
      function bu(t, n, e, r, o, i, s, a, l) {
        const c = x(),
          u = (function mo(t, n, e, r, o, i, s, a, l, c) {
            const d = jt(t, Tn(), e, o, s, l);
            return Sn(4), d ? n + Q(e) + r + Q(o) + i + Q(s) + a + Q(l) + c : X;
          })(c, t, n, e, r, o, i, s, a, l);
        return u !== X && An(c, dt(), u), bu;
      }
      const Do = 'en-US';
      let qm = Do;
      function Du(t, n, e, r, o) {
        if (((t = z(t)), Array.isArray(t))) for (let i = 0; i < t.length; i++) Du(t[i], n, e, r, o);
        else {
          const i = ae(),
            s = x();
          let a = _r(t) ? t : z(t.provide),
            l = mp(t);
          const c = Ge(),
            u = 1048575 & c.providerIndexes,
            d = c.directiveStart,
            h = c.providerIndexes >> 20;
          if (_r(t) || !t.multi) {
            const y = new Go(l, o, I),
              w = Su(a, n, o ? u : u + h, d);
            -1 === w
              ? (xs(qo(c, s), i, a),
                Tu(i, t, n.length),
                n.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                o && (c.providerIndexes += 1048576),
                e.push(y),
                s.push(y))
              : ((e[w] = y), (s[w] = y));
          } else {
            const y = Su(a, n, u + h, d),
              w = Su(a, n, u, u + h),
              C = y >= 0 && e[y],
              T = w >= 0 && e[w];
            if ((o && !T) || (!o && !C)) {
              xs(qo(c, s), i, a);
              const M = (function Dx(t, n, e, r, o) {
                const i = new Go(t, e, I);
                return (i.multi = []), (i.index = n), (i.componentProviders = 0), y_(i, o, r && !e), i;
              })(o ? Cx : vx, e.length, o, r, l);
              !o && T && (e[w].providerFactory = M),
                Tu(i, t, n.length, 0),
                n.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                o && (c.providerIndexes += 1048576),
                e.push(M),
                s.push(M);
            } else Tu(i, t, y > -1 ? y : w, y_(e[o ? w : y], l, !o && r));
            !o && r && T && e[w].componentProviders++;
          }
        }
      }
      function Tu(t, n, e, r) {
        const o = _r(n),
          i = (function iD(t) {
            return !!t.useClass;
          })(n);
        if (o || i) {
          const l = (i ? z(n.useClass) : n).prototype.ngOnDestroy;
          if (l) {
            const c = t.destroyHooks || (t.destroyHooks = []);
            if (!o && n.multi) {
              const u = c.indexOf(e);
              -1 === u ? c.push(e, [r, l]) : c[u + 1].push(r, l);
            } else c.push(e, l);
          }
        }
      }
      function y_(t, n, e) {
        return e && t.componentProviders++, t.multi.push(n) - 1;
      }
      function Su(t, n, e, r) {
        for (let o = e; o < r; o++) if (n[o] === t) return o;
        return -1;
      }
      function vx(t, n, e, r) {
        return xu(this.multi, []);
      }
      function Cx(t, n, e, r) {
        const o = this.multi;
        let i;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Qo(e, e[1], this.providerFactory.index, r);
          (i = a.slice(0, s)), xu(o, i);
          for (let l = s; l < a.length; l++) i.push(a[l]);
        } else (i = []), xu(o, i);
        return i;
      }
      function xu(t, n) {
        for (let e = 0; e < t.length; e++) n.push((0, t[e])());
        return n;
      }
      function Cr(t, n = []) {
        return e => {
          e.providersResolver = (r, o) =>
            (function bx(t, n, e) {
              const r = ae();
              if (r.firstCreatePass) {
                const o = Zt(t);
                Du(e, r.data, r.blueprint, o, !0), Du(n, r.data, r.blueprint, o, !1);
              }
            })(r, o ? o(t) : t, n);
        };
      }
      class Dr {}
      class w_ {}
      class b_ extends Dr {
        constructor(n, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new gu(this));
          const r = xt(n);
          (this._bootstrapComponents = En(r.bootstrap)),
            (this._r3Injector = sg(
              n,
              e,
              [
                { provide: Dr, useValue: this },
                { provide: ci, useValue: this.componentFactoryResolver }
              ],
              me(n),
              new Set(['environment'])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(n));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const n = this._r3Injector;
          !n.destroyed && n.destroy(), this.destroyCbs.forEach(e => e()), (this.destroyCbs = null);
        }
        onDestroy(n) {
          this.destroyCbs.push(n);
        }
      }
      class Iu extends w_ {
        constructor(n) {
          super(), (this.moduleType = n);
        }
        create(n) {
          return new b_(this.moduleType, n);
        }
      }
      class Sx extends Dr {
        constructor(n, e, r) {
          super(), (this.componentFactoryResolver = new gu(this)), (this.instance = null);
          const o = new gp(
            [...n, { provide: Dr, useValue: this }, { provide: ci, useValue: this.componentFactoryResolver }],
            e || Hs(),
            r,
            new Set(['environment'])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(n) {
          this.injector.onDestroy(n);
        }
      }
      function ua(t, n, e = null) {
        return new Sx(t, n, e).injector;
      }
      let xx = (() => {
        class t {
          constructor(e) {
            (this._injector = e), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(e) {
            if (!e.standalone) return null;
            if (!this.cachedInjectors.has(e.id)) {
              const r = dp(0, e.type),
                o = r.length > 0 ? ua([r], this._injector, `Standalone[${e.type.name}]`) : null;
              this.cachedInjectors.set(e.id, o);
            }
            return this.cachedInjectors.get(e.id);
          }
          ngOnDestroy() {
            try {
              for (const e of this.cachedInjectors.values()) null !== e && e.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (t.ɵprov = G({ token: t, providedIn: 'environment', factory: () => new t(j(Gn)) })), t;
      })();
      function v_(t) {
        t.getStandaloneInjector = n => n.get(xx).getOrCreateStandaloneInjector(t);
      }
      function Ze(t, n, e) {
        const r = ut() + t,
          o = x();
        return o[r] === X ? fn(o, r, e ? n.call(e) : n()) : mi(o, r);
      }
      function da(t, n, e, r) {
        return M_(x(), ut(), t, n, e, r);
      }
      function To(t, n, e, r, o, i) {
        return (function R_(t, n, e, r, o, i, s, a) {
          const l = n + e;
          return (function Js(t, n, e, r, o) {
            const i = br(t, n, e, r);
            return ot(t, n + 2, o) || i;
          })(t, l, o, i, s)
            ? fn(t, l + 3, a ? r.call(a, o, i, s) : r(o, i, s))
            : Ti(t, l + 3);
        })(x(), ut(), t, n, e, r, o, i);
      }
      function Ti(t, n) {
        const e = t[n];
        return e === X ? void 0 : e;
      }
      function M_(t, n, e, r, o, i) {
        const s = n + e;
        return ot(t, s, o) ? fn(t, s + 1, i ? r.call(i, o) : r(o)) : Ti(t, s + 1);
      }
      function fa(t, n) {
        const e = ae();
        let r;
        const o = t + 22;
        e.firstCreatePass
          ? ((r = (function Vx(t, n) {
              if (n)
                for (let e = n.length - 1; e >= 0; e--) {
                  const r = n[e];
                  if (t === r.name) return r;
                }
            })(n, e.pipeRegistry)),
            (e.data[o] = r),
            r.onDestroy && (e.destroyHooks || (e.destroyHooks = [])).push(o, r.onDestroy))
          : (r = e.data[o]);
        const i = r.factory || (r.factory = gr(r.type)),
          s = Ot(I);
        try {
          const a = Ts(!1),
            l = i();
          return (
            Ts(a),
            (function BT(t, n, e, r) {
              e >= t.data.length && ((t.data[e] = null), (t.blueprint[e] = null)), (n[e] = r);
            })(e, x(), o, l),
            l
          );
        } finally {
          Ot(s);
        }
      }
      function ha(t, n, e) {
        const r = t + 22,
          o = x(),
          i = $r(o, r);
        return (function Si(t, n) {
          return t[1].data[n].pure;
        })(o, r)
          ? M_(o, ut(), n, i.transform, e, i)
          : i.transform(e);
      }
      function Mu(t) {
        return n => {
          setTimeout(t, void 0, n);
        };
      }
      const O = class Wx extends qt {
        constructor(n = !1) {
          super(), (this.__isAsync = n);
        }
        emit(n) {
          super.next(n);
        }
        subscribe(n, e, r) {
          var o, i, s;
          let a = n,
            l = e || (() => null),
            c = r;
          if (n && 'object' == typeof n) {
            const d = n;
            (a = null === (o = d.next) || void 0 === o ? void 0 : o.bind(d)),
              (l = null === (i = d.error) || void 0 === i ? void 0 : i.bind(d)),
              (c = null === (s = d.complete) || void 0 === s ? void 0 : s.bind(d));
          }
          this.__isAsync && ((l = Mu(l)), a && (a = Mu(a)), c && (c = Mu(c)));
          const u = super.subscribe({ next: a, error: l, complete: c });
          return n instanceof Dt && n.add(u), u;
        }
      };
      function qx() {
        return this._results[wr()]();
      }
      class Au {
        constructor(n = !1) {
          (this._emitDistinctChangesOnly = n),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const e = wr(),
            r = Au.prototype;
          r[e] || (r[e] = qx);
        }
        get changes() {
          return this._changes || (this._changes = new O());
        }
        get(n) {
          return this._results[n];
        }
        map(n) {
          return this._results.map(n);
        }
        filter(n) {
          return this._results.filter(n);
        }
        find(n) {
          return this._results.find(n);
        }
        reduce(n, e) {
          return this._results.reduce(n, e);
        }
        forEach(n) {
          this._results.forEach(n);
        }
        some(n) {
          return this._results.some(n);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(n, e) {
          const r = this;
          r.dirty = !1;
          const o = Mt(n);
          (this._changesDetected = !(function a0(t, n, e) {
            if (t.length !== n.length) return !1;
            for (let r = 0; r < t.length; r++) {
              let o = t[r],
                i = n[r];
              if ((e && ((o = e(o)), (i = e(i))), i !== o)) return !1;
            }
            return !0;
          })(r._results, o, e)) &&
            ((r._results = o), (r.length = o.length), (r.last = o[this.length - 1]), (r.first = o[0]));
        }
        notifyOnChanges() {
          this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      let ke = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Yx), t;
      })();
      const Qx = ke,
        Xx = class extends Qx {
          constructor(n, e, r) {
            super(), (this._declarationLView = n), (this._declarationTContainer = e), (this.elementRef = r);
          }
          createEmbeddedView(n, e) {
            const r = this._declarationTContainer.tViews,
              o = Ws(this._declarationLView, r, n, 16, null, r.declTNode, null, null, null, null, e || null);
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return null !== s && (o[19] = s.createEmbeddedView(r)), iu(r, o, n), new hi(o);
          }
        };
      function Yx() {
        return pa(Ge(), x());
      }
      function pa(t, n) {
        return 4 & t.type ? new Xx(n, t, no(t, n)) : null;
      }
      let Vt = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Zx), t;
      })();
      function Zx() {
        return O_(Ge(), x());
      }
      const Kx = Vt,
        F_ = class extends Kx {
          constructor(n, e, r) {
            super(), (this._lContainer = n), (this._hostTNode = e), (this._hostLView = r);
          }
          get element() {
            return no(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Wr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const n = Ss(this._hostTNode, this._hostLView);
            if (xh(n)) {
              const e = Gr(n, this._hostLView),
                r = zr(n);
              return new Wr(e[1].data[r + 8], e);
            }
            return new Wr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(n) {
            const e = N_(this._lContainer);
            return (null !== e && e[n]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(n, e, r) {
            let o, i;
            'number' == typeof r ? (o = r) : null != r && ((o = r.index), (i = r.injector));
            const s = n.createEmbeddedView(e || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(n, e, r, o, i) {
            const s =
              n &&
              !(function Zo(t) {
                return 'function' == typeof t;
              })(n);
            let a;
            if (s) a = e;
            else {
              const d = e || {};
              (a = d.index), (r = d.injector), (o = d.projectableNodes), (i = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? n : new pi(he(n)),
              c = r || this.parentInjector;
            if (!i && null == l.ngModule) {
              const h = (s ? c : this.parentInjector).get(Gn, null);
              h && (i = h);
            }
            const u = l.create(c, o, void 0, i);
            return this.insert(u.hostView, a), u;
          }
          insert(n, e) {
            const r = n._lView,
              o = r[1];
            if (
              (function xC(t) {
                return Yt(t[3]);
              })(r)
            ) {
              const u = this.indexOf(n);
              if (-1 !== u) this.detach(u);
              else {
                const d = r[3],
                  h = new F_(d, d[6], d[3]);
                h.detach(h.indexOf(n));
              }
            }
            const i = this._adjustIndex(e),
              s = this._lContainer;
            !(function n1(t, n, e, r) {
              const o = 10 + r,
                i = e.length;
              r > 0 && (e[o - 1][4] = n),
                r < i - 10 ? ((n[4] = e[o]), Hh(e, 10 + r, n)) : (e.push(n), (n[4] = null)),
                (n[3] = e);
              const s = n[17];
              null !== s &&
                e !== s &&
                (function r1(t, n) {
                  const e = t[9];
                  n[16] !== n[3][3][16] && (t[2] = !0), null === e ? (t[9] = [n]) : e.push(n);
                })(s, n);
              const a = n[19];
              null !== a && a.insertView(t), (n[2] |= 64);
            })(o, r, s, i);
            const a = jc(i, s),
              l = r[11],
              c = Bs(l, s[7]);
            return (
              null !== c &&
                (function JD(t, n, e, r, o, i) {
                  (r[0] = o), (r[6] = n), fi(t, r, e, 1, o, i);
                })(o, s[6], l, r, c, a),
              n.attachToViewContainerRef(),
              Hh(Ru(s), i, n),
              n
            );
          }
          move(n, e) {
            return this.insert(n, e);
          }
          indexOf(n) {
            const e = N_(this._lContainer);
            return null !== e ? e.indexOf(n) : -1;
          }
          remove(n) {
            const e = this._adjustIndex(n, -1),
              r = Hc(this._lContainer, e);
            r && (Es(Ru(this._lContainer), e), Hp(r[1], r));
          }
          detach(n) {
            const e = this._adjustIndex(n, -1),
              r = Hc(this._lContainer, e);
            return r && null != Es(Ru(this._lContainer), e) ? new hi(r) : null;
          }
          _adjustIndex(n, e = 0) {
            return null == n ? this.length + e : n;
          }
        };
      function N_(t) {
        return t[8];
      }
      function Ru(t) {
        return t[8] || (t[8] = []);
      }
      function O_(t, n) {
        let e;
        const r = n[t.index];
        if (Yt(r)) e = r;
        else {
          let o;
          if (8 & t.type) o = Be(r);
          else {
            const i = n[11];
            o = i.createComment('');
            const s = Bt(t, n);
            yr(
              i,
              Bs(i, s),
              o,
              (function a1(t, n) {
                return t.nextSibling(n);
              })(i, s),
              !1
            );
          }
          (n[t.index] = e = Og(r, n, o, t)), Qs(n, e);
        }
        return new F_(e, t, n);
      }
      class ku {
        constructor(n) {
          (this.queryList = n), (this.matches = null);
        }
        clone() {
          return new ku(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Pu {
        constructor(n = []) {
          this.queries = n;
        }
        createEmbeddedView(n) {
          const e = n.queries;
          if (null !== e) {
            const r = null !== n.contentQueries ? n.contentQueries[0] : e.length,
              o = [];
            for (let i = 0; i < r; i++) {
              const s = e.getByIndex(i);
              o.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new Pu(o);
          }
          return null;
        }
        insertView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        detachView(n) {
          this.dirtyQueriesWithMatches(n);
        }
        dirtyQueriesWithMatches(n) {
          for (let e = 0; e < this.queries.length; e++) null !== V_(n, e).matches && this.queries[e].setDirty();
        }
      }
      class H_ {
        constructor(n, e, r = null) {
          (this.predicate = n), (this.flags = e), (this.read = r);
        }
      }
      class Fu {
        constructor(n = []) {
          this.queries = n;
        }
        elementStart(n, e) {
          for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(n, e);
        }
        elementEnd(n) {
          for (let e = 0; e < this.queries.length; e++) this.queries[e].elementEnd(n);
        }
        embeddedTView(n) {
          let e = null;
          for (let r = 0; r < this.length; r++) {
            const o = null !== e ? e.length : 0,
              i = this.getByIndex(r).embeddedTView(n, o);
            i && ((i.indexInDeclarationView = r), null !== e ? e.push(i) : (e = [i]));
          }
          return null !== e ? new Fu(e) : null;
        }
        template(n, e) {
          for (let r = 0; r < this.queries.length; r++) this.queries[r].template(n, e);
        }
        getByIndex(n) {
          return this.queries[n];
        }
        get length() {
          return this.queries.length;
        }
        track(n) {
          this.queries.push(n);
        }
      }
      class Nu {
        constructor(n, e = -1) {
          (this.metadata = n),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(n, e) {
          this.isApplyingToNode(e) && this.matchTNode(n, e);
        }
        elementEnd(n) {
          this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1);
        }
        template(n, e) {
          this.elementStart(n, e);
        }
        embeddedTView(n, e) {
          return this.isApplyingToNode(n)
            ? ((this.crossesNgTemplate = !0), this.addMatch(-n.index, e), new Nu(this.metadata))
            : null;
        }
        isApplyingToNode(n) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const e = this._declarationNodeIndex;
            let r = n.parent;
            for (; null !== r && 8 & r.type && r.index !== e; ) r = r.parent;
            return e === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(n, e) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let o = 0; o < r.length; o++) {
              const i = r[o];
              this.matchTNodeWithReadOption(n, e, tI(e, i)), this.matchTNodeWithReadOption(n, e, Is(e, n, i, !1, !1));
            }
          else
            r === ke
              ? 4 & e.type && this.matchTNodeWithReadOption(n, e, -1)
              : this.matchTNodeWithReadOption(n, e, Is(e, n, r, !1, !1));
        }
        matchTNodeWithReadOption(n, e, r) {
          if (null !== r) {
            const o = this.metadata.read;
            if (null !== o)
              if (o === nt || o === Vt || (o === ke && 4 & e.type)) this.addMatch(e.index, -2);
              else {
                const i = Is(e, n, o, !1, !1);
                null !== i && this.addMatch(e.index, i);
              }
            else this.addMatch(e.index, r);
          }
        }
        addMatch(n, e) {
          null === this.matches ? (this.matches = [n, e]) : this.matches.push(n, e);
        }
      }
      function tI(t, n) {
        const e = t.localNames;
        if (null !== e) for (let r = 0; r < e.length; r += 2) if (e[r] === n) return e[r + 1];
        return null;
      }
      function rI(t, n, e, r) {
        return -1 === e
          ? (function nI(t, n) {
              return 11 & t.type ? no(t, n) : 4 & t.type ? pa(t, n) : null;
            })(n, t)
          : -2 === e
          ? (function oI(t, n, e) {
              return e === nt ? no(n, t) : e === ke ? pa(n, t) : e === Vt ? O_(n, t) : void 0;
            })(t, n, r)
          : Qo(t, t[1], e, n);
      }
      function L_(t, n, e, r) {
        const o = n[19].queries[r];
        if (null === o.matches) {
          const i = t.data,
            s = e.matches,
            a = [];
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l];
            a.push(c < 0 ? null : rI(n, i[c], s[l + 1], e.metadata.read));
          }
          o.matches = a;
        }
        return o.matches;
      }
      function Ou(t, n, e, r) {
        const o = t.queries.getByIndex(e),
          i = o.matches;
        if (null !== i) {
          const s = L_(t, n, o, e);
          for (let a = 0; a < i.length; a += 2) {
            const l = i[a];
            if (l > 0) r.push(s[a / 2]);
            else {
              const c = i[a + 1],
                u = n[-l];
              for (let d = 10; d < u.length; d++) {
                const h = u[d];
                h[17] === h[3] && Ou(h[1], h, c, r);
              }
              if (null !== u[9]) {
                const d = u[9];
                for (let h = 0; h < d.length; h++) {
                  const y = d[h];
                  Ou(y[1], y, c, r);
                }
              }
            }
          }
        }
        return r;
      }
      function we(t) {
        const n = x(),
          e = ae(),
          r = mh();
        Gl(r + 1);
        const o = V_(e, r);
        if (
          t.dirty &&
          (function SC(t) {
            return 4 == (4 & t[2]);
          })(n) ===
            (2 == (2 & o.metadata.flags))
        ) {
          if (null === o.matches) t.reset([]);
          else {
            const i = o.crossesNgTemplate ? Ou(e, n, r, []) : L_(e, n, o, r);
            t.reset(i, _D), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function Pt(t, n, e) {
        const r = ae();
        r.firstCreatePass && (j_(r, new H_(t, n, e), -1), 2 == (2 & n) && (r.staticViewQueries = !0)), B_(r, x(), n);
      }
      function bt(t, n, e, r) {
        const o = ae();
        if (o.firstCreatePass) {
          const i = Ge();
          j_(o, new H_(n, e, r), i.index),
            (function sI(t, n) {
              const e = t.contentQueries || (t.contentQueries = []);
              n !== (e.length ? e[e.length - 1] : -1) && e.push(t.queries.length - 1, n);
            })(o, t),
            2 == (2 & e) && (o.staticContentQueries = !0);
        }
        B_(o, x(), e);
      }
      function be() {
        return (function iI(t, n) {
          return t[19].queries[n].queryList;
        })(x(), mh());
      }
      function B_(t, n, e) {
        const r = new Au(4 == (4 & e));
        Ig(t, n, r, r.destroy), null === n[19] && (n[19] = new Pu()), n[19].queries.push(new ku(r));
      }
      function j_(t, n, e) {
        null === t.queries && (t.queries = new Fu()), t.queries.track(new Nu(n, e));
      }
      function V_(t, n) {
        return t.queries.getByIndex(n);
      }
      function Yn(t, n) {
        return pa(t, n);
      }
      function ma(...t) {}
      const _a = new q('Application Initializer');
      let ya = (() => {
        class t {
          constructor(e) {
            (this.appInits = e),
              (this.resolve = ma),
              (this.reject = ma),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const e = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (na(i)) e.push(i);
                else if (tm(i)) {
                  const s = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  e.push(s);
                }
              }
            Promise.all(e)
              .then(() => {
                r();
              })
              .catch(o => {
                this.reject(o);
              }),
              0 === e.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(_a, 8));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      const Ii = new q('AppId', {
        providedIn: 'root',
        factory: function sy() {
          return `${Vu()}${Vu()}${Vu()}`;
        }
      });
      function Vu() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const ay = new q('Platform Initializer'),
        ly = new q('Platform ID', { providedIn: 'platform', factory: () => 'unknown' }),
        cy = new q('appBootstrapListener');
      let xI = (() => {
        class t {
          log(e) {
            console.log(e);
          }
          warn(e) {
            console.warn(e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'platform' })),
          t
        );
      })();
      const kn = new q('LocaleId', {
        providedIn: 'root',
        factory: () =>
          Re(kn, $.Optional | $.SkipSelf) ||
          (function II() {
            return ('undefined' != typeof $localize && $localize.locale) || Do;
          })()
      });
      class MI {
        constructor(n, e) {
          (this.ngModuleFactory = n), (this.componentFactories = e);
        }
      }
      let $u = (() => {
        class t {
          compileModuleSync(e) {
            return new Iu(e);
          }
          compileModuleAsync(e) {
            return Promise.resolve(this.compileModuleSync(e));
          }
          compileModuleAndAllComponentsSync(e) {
            const r = this.compileModuleSync(e),
              i = En(xt(e).declarations).reduce((s, a) => {
                const l = he(a);
                return l && s.push(new pi(l)), s;
              }, []);
            return new MI(r, i);
          }
          compileModuleAndAllComponentsAsync(e) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(e));
          }
          clearCache() {}
          clearCacheFor(e) {}
          getModuleId(e) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      const kI = (() => Promise.resolve(0))();
      function Uu(t) {
        'undefined' == typeof Zone
          ? kI.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', t);
      }
      class Pe {
        constructor({
          enableLongStackTrace: n = !1,
          shouldCoalesceEventChangeDetection: e = !1,
          shouldCoalesceRunChangeDetection: r = !1
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new O(!1)),
            (this.onMicrotaskEmpty = new O(!1)),
            (this.onStable = new O(!1)),
            (this.onError = new O(!1)),
            'undefined' == typeof Zone)
          )
            throw new F(908, !1);
          Zone.assertZonePatched();
          const o = this;
          if (((o._nesting = 0), (o._outer = o._inner = Zone.current), Zone.AsyncStackTaggingZoneSpec)) {
            const i = Zone.AsyncStackTaggingZoneSpec;
            o._inner = o._inner.fork(new i('Angular'));
          }
          Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            n && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && e),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function PI() {
              let t = _e.requestAnimationFrame,
                n = _e.cancelAnimationFrame;
              if ('undefined' != typeof Zone && t && n) {
                const e = t[Zone.__symbol__('OriginalDelegate')];
                e && (t = e);
                const r = n[Zone.__symbol__('OriginalDelegate')];
                r && (n = r);
              }
              return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: n };
            })().nativeRequestAnimationFrame),
            (function OI(t) {
              const n = () => {
                !(function NI(t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(_e, () => {
                      t.fakeTopEventTask ||
                        (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                          'fakeTopEventTask',
                          () => {
                            (t.lastRequestAnimationFrameId = -1),
                              Gu(t),
                              (t.isCheckStableRunning = !0),
                              zu(t),
                              (t.isCheckStableRunning = !1);
                          },
                          void 0,
                          () => {},
                          () => {}
                        )),
                        t.fakeTopEventTask.invoke();
                    })),
                    Gu(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (e, r, o, i, s, a) => {
                  try {
                    return fy(t), e.invokeTask(o, i, s, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection && 'eventTask' === i.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      n(),
                      hy(t);
                  }
                },
                onInvoke: (e, r, o, i, s, a, l) => {
                  try {
                    return fy(t), e.invoke(o, i, s, a, l);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && n(), hy(t);
                  }
                },
                onHasTask: (e, r, o, i) => {
                  e.hasTask(o, i),
                    r === o &&
                      ('microTask' == i.change
                        ? ((t._hasPendingMicrotasks = i.microTask), Gu(t), zu(t))
                        : 'macroTask' == i.change && (t.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (e, r, o, i) => (e.handleError(o, i), t.runOutsideAngular(() => t.onError.emit(i)), !1)
              });
            })(o);
        }
        static isInAngularZone() {
          return 'undefined' != typeof Zone && !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!Pe.isInAngularZone()) throw new F(909, !1);
        }
        static assertNotInAngularZone() {
          if (Pe.isInAngularZone()) throw new F(909, !1);
        }
        run(n, e, r) {
          return this._inner.run(n, e, r);
        }
        runTask(n, e, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask('NgZoneEvent: ' + o, n, FI, ma, ma);
          try {
            return i.runTask(s, e, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(n, e, r) {
          return this._inner.runGuarded(n, e, r);
        }
        runOutsideAngular(n) {
          return this._outer.run(n);
        }
      }
      const FI = {};
      function zu(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Gu(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection || t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function fy(t) {
        t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function hy(t) {
        t._nesting--, zu(t);
      }
      class HI {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new O()),
            (this.onMicrotaskEmpty = new O()),
            (this.onStable = new O()),
            (this.onError = new O());
        }
        run(n, e, r) {
          return n.apply(e, r);
        }
        runGuarded(n, e, r) {
          return n.apply(e, r);
        }
        runOutsideAngular(n) {
          return n();
        }
        runTask(n, e, r, o) {
          return n.apply(e, r);
        }
      }
      const py = new q(''),
        wa = new q('');
      let Ei,
        Wu = (() => {
          class t {
            constructor(e, r, o) {
              (this._ngZone = e),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Ei ||
                  ((function LI(t) {
                    Ei = t;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                e.run(() => {
                  this.taskTrackingZone = 'undefined' == typeof Zone ? null : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                }
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Pe.assertNotInAngularZone(),
                        Uu(() => {
                          (this._isZoneStable = !0), this._runCallbacksIfReady();
                        });
                    }
                  });
                });
            }
            increasePendingRequestCount() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Uu(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let e = this._callbacks.pop();
                    clearTimeout(e.timeoutId), e.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let e = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  r => !r.updateCb || !r.updateCb(e) || (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(e => ({
                    source: e.source,
                    creationLocation: e.creationLocation,
                    data: e.data
                  }))
                : [];
            }
            addCallback(e, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(s => s.timeoutId !== i)),
                    e(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: e, timeoutId: i, updateCb: o });
            }
            whenStable(e, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(e, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(e) {
              this.registry.registerApplication(e, this);
            }
            unregisterApplication(e) {
              this.registry.unregisterApplication(e);
            }
            findProviders(e, r, o) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(j(Pe), j(qu), j(wa));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        qu = (() => {
          class t {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(e, r) {
              this._applications.set(e, r);
            }
            unregisterApplication(e) {
              this._applications.delete(e);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(e) {
              return this._applications.get(e) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(e, r = !0) {
              var o;
              return null !== (o = null == Ei ? void 0 : Ei.findTestabilityInTree(this, e, r)) && void 0 !== o
                ? o
                : null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'platform' })),
            t
          );
        })(),
        mn = null;
      const gy = new q('AllowMultipleToken'),
        Qu = new q('PlatformDestroyListeners');
      class my {
        constructor(n, e) {
          (this.name = n), (this.token = e);
        }
      }
      function yy(t, n, e = []) {
        const r = `Platform: ${n}`,
          o = new q(r);
        return (i = []) => {
          let s = Xu();
          if (!s || s.injector.get(gy, !1)) {
            const a = [...e, ...i, { provide: o, useValue: !0 }];
            t
              ? t(a)
              : (function VI(t) {
                  if (mn && !mn.get(gy, !1)) throw new F(400, !1);
                  mn = t;
                  const n = t.get(by);
                  (function _y(t) {
                    const n = t.get(ay, null);
                    n && n.forEach(e => e());
                  })(t);
                })(
                  (function wy(t = [], n) {
                    return Jt.create({
                      name: n,
                      providers: [
                        { provide: yc, useValue: 'platform' },
                        { provide: Qu, useValue: new Set([() => (mn = null)]) },
                        ...t
                      ]
                    });
                  })(a, r)
                );
          }
          return (function UI(t) {
            const n = Xu();
            if (!n) throw new F(401, !1);
            return n;
          })();
        };
      }
      function Xu() {
        var t;
        return null !== (t = null == mn ? void 0 : mn.get(by)) && void 0 !== t ? t : null;
      }
      let by = (() => {
        class t {
          constructor(e) {
            (this._injector = e), (this._modules = []), (this._destroyListeners = []), (this._destroyed = !1);
          }
          bootstrapModuleFactory(e, r) {
            const o = (function Cy(t, n) {
                let e;
                return (e = 'noop' === t ? new HI() : ('zone.js' === t ? void 0 : t) || new Pe(n)), e;
              })(
                null == r ? void 0 : r.ngZone,
                (function vy(t) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection: !(!t || !t.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection: !(!t || !t.ngZoneRunCoalescing) || !1
                  };
                })(r)
              ),
              i = [{ provide: Pe, useValue: o }];
            return o.run(() => {
              const s = Jt.create({ providers: i, parent: this.injector, name: e.moduleType.name }),
                a = e.create(s),
                l = a.injector.get(oo, null);
              if (!l) throw new F(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const c = o.onError.subscribe({
                    next: u => {
                      l.handleError(u);
                    }
                  });
                  a.onDestroy(() => {
                    va(this._modules, a), c.unsubscribe();
                  });
                }),
                (function Dy(t, n, e) {
                  try {
                    const r = e();
                    return na(r)
                      ? r.catch(o => {
                          throw (n.runOutsideAngular(() => t.handleError(o)), o);
                        })
                      : r;
                  } catch (r) {
                    throw (n.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(l, o, () => {
                  const c = a.injector.get(ya);
                  return (
                    c.runInitializers(),
                    c.donePromise.then(
                      () => (
                        (function Qm(t) {
                          St(t, 'Expected localeId to be defined'),
                            'string' == typeof t && (qm = t.toLowerCase().replace(/_/g, '-'));
                        })(a.injector.get(kn, Do) || Do),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(e, r = []) {
            const o = Ty({}, r);
            return (function BI(t, n, e) {
              const r = new Iu(e);
              return Promise.resolve(r);
            })(0, 0, e).then(i => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(e) {
            const r = e.injector.get(ba);
            if (e._bootstrapComponents.length > 0) e._bootstrapComponents.forEach(o => r.bootstrap(o));
            else {
              if (!e.instance.ngDoBootstrap) throw new F(403, !1);
              e.instance.ngDoBootstrap(r);
            }
            this._modules.push(e);
          }
          onDestroy(e) {
            this._destroyListeners.push(e);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new F(404, !1);
            this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
            const e = this._injector.get(Qu, null);
            e && (e.forEach(r => r()), e.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(Jt));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'platform' })),
          t
        );
      })();
      function Ty(t, n) {
        return Array.isArray(n) ? n.reduce(Ty, t) : Object.assign(Object.assign({}, t), n);
      }
      let ba = (() => {
        class t {
          constructor(e, r, o) {
            (this._zone = e),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                }
              }));
            const i = new Ie(a => {
                (this._stable =
                  this._zone.isStable && !this._zone.hasPendingMacrotasks && !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Ie(a => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    Pe.assertNotInAngularZone(),
                      Uu(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const c = this._zone.onUnstable.subscribe(() => {
                  Pe.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), c.unsubscribe();
                };
              });
            this.isStable = (function Qv(...t) {
              const n = Lo(t),
                e = (function Vv(t, n) {
                  return 'number' == typeof Cl(t) ? t.pop() : n;
                })(t, 1 / 0),
                r = t;
              return r.length ? (1 === r.length ? Nt(r[0]) : Or(e)(ze(r, n))) : bn;
            })(
              i,
              s.pipe(
                (function Xv(t = {}) {
                  const {
                    connector: n = () => new qt(),
                    resetOnError: e = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0
                  } = t;
                  return i => {
                    let s,
                      a,
                      l,
                      c = 0,
                      u = !1,
                      d = !1;
                    const h = () => {
                        null == a || a.unsubscribe(), (a = void 0);
                      },
                      y = () => {
                        h(), (s = l = void 0), (u = d = !1);
                      },
                      w = () => {
                        const C = s;
                        y(), null == C || C.unsubscribe();
                      };
                    return He((C, T) => {
                      c++, !d && !u && h();
                      const M = (l = null != l ? l : n());
                      T.add(() => {
                        c--, 0 === c && !d && !u && (a = Dl(w, o));
                      }),
                        M.subscribe(T),
                        !s &&
                          c > 0 &&
                          ((s = new Ho({
                            next: A => M.next(A),
                            error: A => {
                              (d = !0), h(), (a = Dl(y, e, A)), M.error(A);
                            },
                            complete: () => {
                              (u = !0), h(), (a = Dl(y, r)), M.complete();
                            }
                          })),
                          Nt(C).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(e, r) {
            const o = e instanceof _p;
            if (!this._injector.get(ya).done)
              throw (
                (!o &&
                  (function Lr(t) {
                    const n = he(t) || lt(t) || ct(t);
                    return null !== n && n.standalone;
                  })(e),
                new F(405, false))
              );
            let s;
            (s = o ? e : this._injector.get(ci).resolveComponentFactory(e)), this.componentTypes.push(s.componentType);
            const a = (function jI(t) {
                return t.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Dr),
              c = s.create(Jt.NULL, [], r || s.selector, a),
              u = c.location.nativeElement,
              d = c.injector.get(py, null);
            return (
              null == d || d.registerApplication(u),
              c.onDestroy(() => {
                this.detachView(c.hostView), va(this.components, c), null == d || d.unregisterApplication(u);
              }),
              this._loadComponent(c),
              c
            );
          }
          tick() {
            if (this._runningTick) throw new F(101, !1);
            try {
              this._runningTick = !0;
              for (let e of this._views) e.detectChanges();
            } catch (e) {
              this._zone.runOutsideAngular(() => this._exceptionHandler.handleError(e));
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(e) {
            const r = e;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(e) {
            const r = e;
            va(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(e) {
            this.attachView(e.hostView),
              this.tick(),
              this.components.push(e),
              this._injector
                .get(cy, [])
                .concat(this._bootstrapListeners)
                .forEach(o => o(e));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach(e => e()),
                  this._views.slice().forEach(e => e.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(e) {
            return this._destroyListeners.push(e), () => va(this._destroyListeners, e);
          }
          destroy() {
            if (this._destroyed) throw new F(406, !1);
            const e = this._injector;
            e.destroy && !e.destroyed && e.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(Pe), j(Gn), j(oo));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      function va(t, n) {
        const e = t.indexOf(n);
        e > -1 && t.splice(e, 1);
      }
      let xy = !0,
        $t = (() => {
          class t {}
          return (t.__NG_ELEMENT_ID__ = WI), t;
        })();
      function WI(t) {
        return (function qI(t, n, e) {
          if (gs(t) && !e) {
            const r = Et(t.index, n);
            return new hi(r, r);
          }
          return 47 & t.type ? new hi(n[16], n) : null;
        })(Ge(), x(), 16 == (16 & t));
      }
      class Ry {
        constructor() {}
        supports(n) {
          return gi(n);
        }
        create(n) {
          return new JI(n);
        }
      }
      const KI = (t, n) => n;
      class JI {
        constructor(n) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = n || KI);
        }
        forEachItem(n) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) n(e);
        }
        forEachOperation(n) {
          let e = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; e || r; ) {
            const s = !r || (e && e.currentIndex < Py(r, o, i)) ? e : r,
              a = Py(s, o, i),
              l = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((e = e._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const c = a - o,
                u = l - o;
              if (c != u) {
                for (let h = 0; h < c; h++) {
                  const y = h < i.length ? i[h] : (i[h] = 0),
                    w = y + h;
                  u <= w && w < c && (i[h] = y + 1);
                }
                i[s.previousIndex] = u - c;
              }
            }
            a !== l && n(s, a, l);
          }
        }
        forEachPreviousItem(n) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) n(e);
        }
        forEachAddedItem(n) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) n(e);
        }
        forEachMovedItem(n) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) n(e);
        }
        forEachRemovedItem(n) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) n(e);
        }
        forEachIdentityChange(n) {
          let e;
          for (e = this._identityChangesHead; null !== e; e = e._nextIdentityChange) n(e);
        }
        diff(n) {
          if ((null == n && (n = []), !gi(n))) throw new F(900, !1);
          return this.check(n) ? this : null;
        }
        onDestroy() {}
        check(n) {
          this._reset();
          let o,
            i,
            s,
            e = this._itHead,
            r = !1;
          if (Array.isArray(n)) {
            this.length = n.length;
            for (let a = 0; a < this.length; a++)
              (i = n[a]),
                (s = this._trackByFn(a, i)),
                null !== e && Object.is(e.trackById, s)
                  ? (r && (e = this._verifyReinsertion(e, i, s, a)),
                    Object.is(e.item, i) || this._addIdentityChange(e, i))
                  : ((e = this._mismatch(e, i, s, a)), (r = !0)),
                (e = e._next);
          } else
            (o = 0),
              (function NT(t, n) {
                if (Array.isArray(t)) for (let e = 0; e < t.length; e++) n(t[e]);
                else {
                  const e = t[wr()]();
                  let r;
                  for (; !(r = e.next()).done; ) n(r.value);
                }
              })(n, a => {
                (s = this._trackByFn(o, a)),
                  null !== e && Object.is(e.trackById, s)
                    ? (r && (e = this._verifyReinsertion(e, a, s, o)),
                      Object.is(e.item, a) || this._addIdentityChange(e, a))
                    : ((e = this._mismatch(e, a, s, o)), (r = !0)),
                  (e = e._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(e), (this.collection = n), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let n;
            for (n = this._previousItHead = this._itHead; null !== n; n = n._next) n._nextPrevious = n._next;
            for (n = this._additionsHead; null !== n; n = n._nextAdded) n.previousIndex = n.currentIndex;
            for (this._additionsHead = this._additionsTail = null, n = this._movesHead; null !== n; n = n._nextMoved)
              n.previousIndex = n.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(n, e, r, o) {
          let i;
          return (
            null === n ? (i = this._itTail) : ((i = n._prev), this._remove(n)),
            null !== (n = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null))
              ? (Object.is(n.item, e) || this._addIdentityChange(n, e), this._reinsertAfter(n, i, o))
              : null !== (n = null === this._linkedRecords ? null : this._linkedRecords.get(r, o))
              ? (Object.is(n.item, e) || this._addIdentityChange(n, e), this._moveAfter(n, i, o))
              : (n = this._addAfter(new eE(e, r), i, o)),
            n
          );
        }
        _verifyReinsertion(n, e, r, o) {
          let i = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (n = this._reinsertAfter(i, n._prev, o))
              : n.currentIndex != o && ((n.currentIndex = o), this._addToMoves(n, o)),
            n
          );
        }
        _truncate(n) {
          for (; null !== n; ) {
            const e = n._next;
            this._addToRemovals(this._unlink(n)), (n = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail && (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(n, e, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(n);
          const o = n._prevRemoved,
            i = n._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(n, e, r),
            this._addToMoves(n, r),
            n
          );
        }
        _moveAfter(n, e, r) {
          return this._unlink(n), this._insertAfter(n, e, r), this._addToMoves(n, r), n;
        }
        _addAfter(n, e, r) {
          return (
            this._insertAfter(n, e, r),
            (this._additionsTail =
              null === this._additionsTail ? (this._additionsHead = n) : (this._additionsTail._nextAdded = n)),
            n
          );
        }
        _insertAfter(n, e, r) {
          const o = null === e ? this._itHead : e._next;
          return (
            (n._next = o),
            (n._prev = e),
            null === o ? (this._itTail = n) : (o._prev = n),
            null === e ? (this._itHead = n) : (e._next = n),
            null === this._linkedRecords && (this._linkedRecords = new ky()),
            this._linkedRecords.put(n),
            (n.currentIndex = r),
            n
          );
        }
        _remove(n) {
          return this._addToRemovals(this._unlink(n));
        }
        _unlink(n) {
          null !== this._linkedRecords && this._linkedRecords.remove(n);
          const e = n._prev,
            r = n._next;
          return null === e ? (this._itHead = r) : (e._next = r), null === r ? (this._itTail = e) : (r._prev = e), n;
        }
        _addToMoves(n, e) {
          return (
            n.previousIndex === e ||
              (this._movesTail = null === this._movesTail ? (this._movesHead = n) : (this._movesTail._nextMoved = n)),
            n
          );
        }
        _addToRemovals(n) {
          return (
            null === this._unlinkedRecords && (this._unlinkedRecords = new ky()),
            this._unlinkedRecords.put(n),
            (n.currentIndex = null),
            (n._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = n), (n._prevRemoved = null))
              : ((n._prevRemoved = this._removalsTail), (this._removalsTail = this._removalsTail._nextRemoved = n)),
            n
          );
        }
        _addIdentityChange(n, e) {
          return (
            (n.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = n)
                : (this._identityChangesTail._nextIdentityChange = n)),
            n
          );
        }
      }
      class eE {
        constructor(n, e) {
          (this.item = n),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class tE {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(n) {
          null === this._head
            ? ((this._head = this._tail = n), (n._nextDup = null), (n._prevDup = null))
            : ((this._tail._nextDup = n), (n._prevDup = this._tail), (n._nextDup = null), (this._tail = n));
        }
        get(n, e) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if ((null === e || e <= r.currentIndex) && Object.is(r.trackById, n)) return r;
          return null;
        }
        remove(n) {
          const e = n._prevDup,
            r = n._nextDup;
          return (
            null === e ? (this._head = r) : (e._nextDup = r),
            null === r ? (this._tail = e) : (r._prevDup = e),
            null === this._head
          );
        }
      }
      class ky {
        constructor() {
          this.map = new Map();
        }
        put(n) {
          const e = n.trackById;
          let r = this.map.get(e);
          r || ((r = new tE()), this.map.set(e, r)), r.add(n);
        }
        get(n, e) {
          const o = this.map.get(n);
          return o ? o.get(n, e) : null;
        }
        remove(n) {
          const e = n.trackById;
          return this.map.get(e).remove(n) && this.map.delete(e), n;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Py(t, n, e) {
        const r = t.previousIndex;
        if (null === r) return r;
        let o = 0;
        return e && r < e.length && (o = e[r]), r + n + o;
      }
      class Fy {
        constructor() {}
        supports(n) {
          return n instanceof Map || _u(n);
        }
        create() {
          return new nE();
        }
      }
      class nE {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
        }
        forEachItem(n) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) n(e);
        }
        forEachPreviousItem(n) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) n(e);
        }
        forEachChangedItem(n) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) n(e);
        }
        forEachAddedItem(n) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) n(e);
        }
        forEachRemovedItem(n) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) n(e);
        }
        diff(n) {
          if (n) {
            if (!(n instanceof Map || _u(n))) throw new F(900, !1);
          } else n = new Map();
          return this.check(n) ? this : null;
        }
        onDestroy() {}
        check(n) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(n, (r, o) => {
              if (e && e.key === o) this._maybeAddToChanges(e, r), (this._appendAfter = e), (e = e._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                e = this._insertBeforeOrAppend(e, i);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let r = e; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(n, e) {
          if (n) {
            const r = n._prev;
            return (
              (e._next = n),
              (e._prev = r),
              (n._prev = e),
              r && (r._next = e),
              n === this._mapHead && (this._mapHead = e),
              (this._appendAfter = n),
              n
            );
          }
          return (
            this._appendAfter ? ((this._appendAfter._next = e), (e._prev = this._appendAfter)) : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(n, e) {
          if (this._records.has(n)) {
            const o = this._records.get(n);
            this._maybeAddToChanges(o, e);
            const i = o._prev,
              s = o._next;
            return i && (i._next = s), s && (s._prev = i), (o._next = null), (o._prev = null), o;
          }
          const r = new rE(n);
          return this._records.set(n, r), (r.currentValue = e), this._addToAdditions(r), r;
        }
        _reset() {
          if (this.isDirty) {
            let n;
            for (this._previousMapHead = this._mapHead, n = this._previousMapHead; null !== n; n = n._next)
              n._nextPrevious = n._next;
            for (n = this._changesHead; null !== n; n = n._nextChanged) n.previousValue = n.currentValue;
            for (n = this._additionsHead; null != n; n = n._nextAdded) n.previousValue = n.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(n, e) {
          Object.is(e, n.currentValue) ||
            ((n.previousValue = n.currentValue), (n.currentValue = e), this._addToChanges(n));
        }
        _addToAdditions(n) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = n)
            : ((this._additionsTail._nextAdded = n), (this._additionsTail = n));
        }
        _addToChanges(n) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = n)
            : ((this._changesTail._nextChanged = n), (this._changesTail = n));
        }
        _forEach(n, e) {
          n instanceof Map ? n.forEach(e) : Object.keys(n).forEach(r => e(n[r], r));
        }
      }
      class rE {
        constructor(n) {
          (this.key = n),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Ny() {
        return new Ta([new Ry()]);
      }
      let Ta = (() => {
        class t {
          constructor(e) {
            this.factories = e;
          }
          static create(e, r) {
            if (null != r) {
              const o = r.factories.slice();
              e = e.concat(o);
            }
            return new t(e);
          }
          static extend(e) {
            return { provide: t, useFactory: r => t.create(e, r || Ny()), deps: [[t, new ri(), new ni()]] };
          }
          find(e) {
            const r = this.factories.find(o => o.supports(e));
            if (null != r) return r;
            throw new F(901, !1);
          }
        }
        return (t.ɵprov = G({ token: t, providedIn: 'root', factory: Ny })), t;
      })();
      function Oy() {
        return new Fn([new Fy()]);
      }
      let Fn = (() => {
        class t {
          constructor(e) {
            this.factories = e;
          }
          static create(e, r) {
            if (r) {
              const o = r.factories.slice();
              e = e.concat(o);
            }
            return new t(e);
          }
          static extend(e) {
            return { provide: t, useFactory: r => t.create(e, r || Oy()), deps: [[t, new ri(), new ni()]] };
          }
          find(e) {
            const r = this.factories.find(o => o.supports(e));
            if (r) return r;
            throw new F(901, !1);
          }
        }
        return (t.ɵprov = G({ token: t, providedIn: 'root', factory: Oy })), t;
      })();
      const sE = yy(null, 'core', []);
      let aE = (() => {
          class t {
            constructor(e) {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(j(ba));
            }),
            (t.ɵmod = jn({ type: t })),
            (t.ɵinj = Cn({})),
            t
          );
        })(),
        Sa = null;
      function Zn() {
        return Sa;
      }
      const it = new q('DocumentToken');
      let ed = (() => {
        class t {
          historyGo(e) {
            throw new Error('Not implemented');
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = G({
            token: t,
            factory: function () {
              return (function dE() {
                return j(Hy);
              })();
            },
            providedIn: 'platform'
          })),
          t
        );
      })();
      const fE = new q('Location Initialized');
      let Hy = (() => {
        class t extends ed {
          constructor(e) {
            super(), (this._doc = e), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Zn().getBaseHref(this._doc);
          }
          onPopState(e) {
            const r = Zn().getGlobalEventTarget(this._doc, 'window');
            return r.addEventListener('popstate', e, !1), () => r.removeEventListener('popstate', e);
          }
          onHashChange(e) {
            const r = Zn().getGlobalEventTarget(this._doc, 'window');
            return r.addEventListener('hashchange', e, !1), () => r.removeEventListener('hashchange', e);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(e) {
            this.location.pathname = e;
          }
          pushState(e, r, o) {
            Ly() ? this._history.pushState(e, r, o) : (this.location.hash = o);
          }
          replaceState(e, r, o) {
            Ly() ? this._history.replaceState(e, r, o) : (this.location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(e = 0) {
            this._history.go(e);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(it));
          }),
          (t.ɵprov = G({
            token: t,
            factory: function () {
              return (function hE() {
                return new Hy(j(it));
              })();
            },
            providedIn: 'platform'
          })),
          t
        );
      })();
      function Ly() {
        return !!window.history.pushState;
      }
      function td(t, n) {
        if (0 == t.length) return n;
        if (0 == n.length) return t;
        let e = 0;
        return (
          t.endsWith('/') && e++, n.startsWith('/') && e++, 2 == e ? t + n.substring(1) : 1 == e ? t + n : t + '/' + n
        );
      }
      function By(t) {
        const n = t.match(/#|\?|$/),
          e = (n && n.index) || t.length;
        return t.slice(0, e - ('/' === t[e - 1] ? 1 : 0)) + t.slice(e);
      }
      function Nn(t) {
        return t && '?' !== t[0] ? '?' + t : t;
      }
      let Kn = (() => {
        class t {
          historyGo(e) {
            throw new Error('Not implemented');
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = G({
            token: t,
            factory: function () {
              return Re(Vy);
            },
            providedIn: 'root'
          })),
          t
        );
      })();
      const jy = new q('appBaseHref');
      let Vy = (() => {
          class t extends Kn {
            constructor(e, r) {
              var o, i, s;
              super(),
                (this._platformLocation = e),
                (this._removeListenerFns = []),
                (this._baseHref =
                  null !==
                    (s =
                      null !== (o = null != r ? r : this._platformLocation.getBaseHrefFromDOM()) && void 0 !== o
                        ? o
                        : null === (i = Re(it).location) || void 0 === i
                        ? void 0
                        : i.origin) && void 0 !== s
                    ? s
                    : '');
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(e) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(e) {
              return td(this._baseHref, e);
            }
            path(e = !1) {
              const r = this._platformLocation.pathname + Nn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && e ? `${r}${o}` : r;
            }
            pushState(e, r, o, i) {
              const s = this.prepareExternalUrl(o + Nn(i));
              this._platformLocation.pushState(e, r, s);
            }
            replaceState(e, r, o, i) {
              const s = this.prepareExternalUrl(o + Nn(i));
              this._platformLocation.replaceState(e, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(e = 0) {
              var r, o;
              null === (o = (r = this._platformLocation).historyGo) || void 0 === o || o.call(r, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(j(ed), j(jy, 8));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'root' })),
            t
          );
        })(),
        $y = (() => {
          class t extends Kn {
            constructor(e, r) {
              super(),
                (this._platformLocation = e),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(e) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(e),
                this._platformLocation.onHashChange(e)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(e = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = '#'), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(e) {
              const r = td(this._baseHref, e);
              return r.length > 0 ? '#' + r : r;
            }
            pushState(e, r, o, i) {
              let s = this.prepareExternalUrl(o + Nn(i));
              0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(e, r, s);
            }
            replaceState(e, r, o, i) {
              let s = this.prepareExternalUrl(o + Nn(i));
              0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(e, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(e = 0) {
              var r, o;
              null === (o = (r = this._platformLocation).historyGo) || void 0 === o || o.call(r, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(j(ed), j(jy, 8));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Mi = (() => {
          class t {
            constructor(e) {
              (this._subject = new O()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = e);
              const r = this._locationStrategy.getBaseHref();
              (this._baseHref = By(Uy(r))),
                this._locationStrategy.onPopState(o => {
                  this._subject.emit({ url: this.path(!0), pop: !0, state: o.state, type: o.type });
                });
            }
            ngOnDestroy() {
              var e;
              null === (e = this._urlChangeSubscription) || void 0 === e || e.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(e = !1) {
              return this.normalize(this._locationStrategy.path(e));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(e, r = '') {
              return this.path() == this.normalize(e + Nn(r));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function gE(t, n) {
                  return t && n.startsWith(t) ? n.substring(t.length) : n;
                })(this._baseHref, Uy(e))
              );
            }
            prepareExternalUrl(e) {
              return e && '/' !== e[0] && (e = '/' + e), this._locationStrategy.prepareExternalUrl(e);
            }
            go(e, r = '', o = null) {
              this._locationStrategy.pushState(o, '', e, r),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(e + Nn(r)), o);
            }
            replaceState(e, r = '', o = null) {
              this._locationStrategy.replaceState(o, '', e, r),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(e + Nn(r)), o);
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(e = 0) {
              var r, o;
              null === (o = (r = this._locationStrategy).historyGo) || void 0 === o || o.call(r, e);
            }
            onUrlChange(e) {
              return (
                this._urlChangeListeners.push(e),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe(r => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  var r;
                  const o = this._urlChangeListeners.indexOf(e);
                  this._urlChangeListeners.splice(o, 1),
                    0 === this._urlChangeListeners.length &&
                      (null === (r = this._urlChangeSubscription) || void 0 === r || r.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(e = '', r) {
              this._urlChangeListeners.forEach(o => o(e, r));
            }
            subscribe(e, r, o) {
              return this._subject.subscribe({ next: e, error: r, complete: o });
            }
          }
          return (
            (t.normalizeQueryParams = Nn),
            (t.joinWithSlash = td),
            (t.stripTrailingSlash = By),
            (t.ɵfac = function (e) {
              return new (e || t)(j(Kn));
            }),
            (t.ɵprov = G({
              token: t,
              factory: function () {
                return (function pE() {
                  return new Mi(j(Kn));
                })();
              },
              providedIn: 'root'
            })),
            t
          );
        })();
      function Uy(t) {
        return t.replace(/\/index.html$/, '');
      }
      let dd = (() => {
        class t {
          constructor(e, r, o, i) {
            (this._iterableDiffers = e),
              (this._keyValueDiffers = r),
              (this._ngEl = o),
              (this._renderer = i),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null);
          }
          set klass(e) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses = 'string' == typeof e ? e.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass);
          }
          set ngClass(e) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = 'string' == typeof e ? e.split(/\s+/) : e),
              this._rawClass &&
                (gi(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create())
                  : (this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create()));
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const e = this._iterableDiffer.diff(this._rawClass);
              e && this._applyIterableChanges(e);
            } else if (this._keyValueDiffer) {
              const e = this._keyValueDiffer.diff(this._rawClass);
              e && this._applyKeyValueChanges(e);
            }
          }
          _applyKeyValueChanges(e) {
            e.forEachAddedItem(r => this._toggleClass(r.key, r.currentValue)),
              e.forEachChangedItem(r => this._toggleClass(r.key, r.currentValue)),
              e.forEachRemovedItem(r => {
                r.previousValue && this._toggleClass(r.key, !1);
              });
          }
          _applyIterableChanges(e) {
            e.forEachAddedItem(r => {
              if ('string' != typeof r.item)
                throw new Error(`NgClass can only toggle CSS classes expressed as strings, got ${me(r.item)}`);
              this._toggleClass(r.item, !0);
            }),
              e.forEachRemovedItem(r => this._toggleClass(r.item, !1));
          }
          _applyClasses(e) {
            e &&
              (Array.isArray(e) || e instanceof Set
                ? e.forEach(r => this._toggleClass(r, !0))
                : Object.keys(e).forEach(r => this._toggleClass(r, !!e[r])));
          }
          _removeClasses(e) {
            e &&
              (Array.isArray(e) || e instanceof Set
                ? e.forEach(r => this._toggleClass(r, !1))
                : Object.keys(e).forEach(r => this._toggleClass(r, !1)));
          }
          _toggleClass(e, r) {
            (e = e.trim()) &&
              e.split(/\s+/g).forEach(o => {
                r
                  ? this._renderer.addClass(this._ngEl.nativeElement, o)
                  : this._renderer.removeClass(this._ngEl.nativeElement, o);
              });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(Ta), I(Fn), I(nt), I(ro));
          }),
          (t.ɵdir = de({
            type: t,
            selectors: [['', 'ngClass', '']],
            inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' },
            standalone: !0
          })),
          t
        );
      })();
      class eM {
        constructor(n, e, r, o) {
          (this.$implicit = n), (this.ngForOf = e), (this.index = r), (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Ct = (() => {
        class t {
          constructor(e, r, o) {
            (this._viewContainer = e),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(e) {
            (this._ngForOf = e), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(e) {
            this._trackByFn = e;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(e) {
            e && (this._template = e);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const e = this._ngForOf;
              !this._differ && e && (this._differ = this._differs.find(e).create(this.ngForTrackBy));
            }
            if (this._differ) {
              const e = this._differ.diff(this._ngForOf);
              e && this._applyChanges(e);
            }
          }
          _applyChanges(e) {
            const r = this._viewContainer;
            e.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(this._template, new eM(o.item, this._ngForOf, -1, -1), null === s ? void 0 : s);
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), ew(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            e.forEachIdentityChange(o => {
              ew(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(e, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(Vt), I(ke), I(Ta));
          }),
          (t.ɵdir = de({
            type: t,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: { ngForOf: 'ngForOf', ngForTrackBy: 'ngForTrackBy', ngForTemplate: 'ngForTemplate' },
            standalone: !0
          })),
          t
        );
      })();
      function ew(t, n) {
        t.context.$implicit = n.item;
      }
      let Ne = (() => {
        class t {
          constructor(e, r) {
            (this._viewContainer = e),
              (this._context = new nM()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(e) {
            (this._context.$implicit = this._context.ngIf = e), this._updateView();
          }
          set ngIfThen(e) {
            tw('ngIfThen', e), (this._thenTemplateRef = e), (this._thenViewRef = null), this._updateView();
          }
          set ngIfElse(e) {
            tw('ngIfElse', e), (this._elseTemplateRef = e), (this._elseViewRef = null), this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context)))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
          }
          static ngTemplateContextGuard(e, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(Vt), I(ke));
          }),
          (t.ɵdir = de({
            type: t,
            selectors: [['', 'ngIf', '']],
            inputs: { ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse' },
            standalone: !0
          })),
          t
        );
      })();
      class nM {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function tw(t, n) {
        if (n && !n.createEmbeddedView) throw new Error(`${t} must be a TemplateRef, but received '${me(n)}'.`);
      }
      let ki = (() => {
          class t {
            constructor(e, r, o) {
              (this._ngEl = e),
                (this._differs = r),
                (this._renderer = o),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(e) {
              (this._ngStyle = e), !this._differ && e && (this._differ = this._differs.find(e).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const e = this._differ.diff(this._ngStyle);
                e && this._applyChanges(e);
              }
            }
            _setStyle(e, r) {
              const [o, i] = e.split('.'),
                s = -1 === o.indexOf('-') ? void 0 : wt.DashCase;
              null != r
                ? this._renderer.setStyle(this._ngEl.nativeElement, o, i ? `${r}${i}` : r, s)
                : this._renderer.removeStyle(this._ngEl.nativeElement, o, s);
            }
            _applyChanges(e) {
              e.forEachRemovedItem(r => this._setStyle(r.key, null)),
                e.forEachAddedItem(r => this._setStyle(r.key, r.currentValue)),
                e.forEachChangedItem(r => this._setStyle(r.key, r.currentValue));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(nt), I(Fn), I(ro));
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['', 'ngStyle', '']],
              inputs: { ngStyle: 'ngStyle' },
              standalone: !0
            })),
            t
          );
        })(),
        Pi = (() => {
          class t {
            constructor(e) {
              (this._viewContainerRef = e),
                (this._viewRef = null),
                (this.ngTemplateOutletContext = null),
                (this.ngTemplateOutlet = null),
                (this.ngTemplateOutletInjector = null);
            }
            ngOnChanges(e) {
              if (e.ngTemplateOutlet || e.ngTemplateOutletInjector) {
                const r = this._viewContainerRef;
                if ((this._viewRef && r.remove(r.indexOf(this._viewRef)), this.ngTemplateOutlet)) {
                  const { ngTemplateOutlet: o, ngTemplateOutletContext: i, ngTemplateOutletInjector: s } = this;
                  this._viewRef = r.createEmbeddedView(o, i, s ? { injector: s } : void 0);
                } else this._viewRef = null;
              } else
                this._viewRef &&
                  e.ngTemplateOutletContext &&
                  this.ngTemplateOutletContext &&
                  (this._viewRef.context = this.ngTemplateOutletContext);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(Vt));
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['', 'ngTemplateOutlet', '']],
              inputs: {
                ngTemplateOutletContext: 'ngTemplateOutletContext',
                ngTemplateOutlet: 'ngTemplateOutlet',
                ngTemplateOutletInjector: 'ngTemplateOutletInjector'
              },
              standalone: !0,
              features: [ln]
            })),
            t
          );
        })();
      class sM {
        createSubscription(n, e) {
          return n.subscribe({
            next: e,
            error: r => {
              throw r;
            }
          });
        }
        dispose(n) {
          n.unsubscribe();
        }
      }
      class aM {
        createSubscription(n, e) {
          return n.then(e, r => {
            throw r;
          });
        }
        dispose(n) {}
      }
      const lM = new aM(),
        cM = new sM();
      let pd = (() => {
          class t {
            constructor(e) {
              (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null),
                (this._ref = e);
            }
            ngOnDestroy() {
              this._subscription && this._dispose(), (this._ref = null);
            }
            transform(e) {
              return this._obj
                ? e !== this._obj
                  ? (this._dispose(), this.transform(e))
                  : this._latestValue
                : (e && this._subscribe(e), this._latestValue);
            }
            _subscribe(e) {
              (this._obj = e),
                (this._strategy = this._selectStrategy(e)),
                (this._subscription = this._strategy.createSubscription(e, r => this._updateLatestValue(e, r)));
            }
            _selectStrategy(e) {
              if (na(e)) return lM;
              if (em(e)) return cM;
              throw (function sn(t, n) {
                return new F(2100, !1);
              })();
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(e, r) {
              e === this._obj && ((this._latestValue = r), this._ref.markForCheck());
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I($t, 16));
            }),
            (t.ɵpipe = _t({ name: 'async', type: t, pure: !1, standalone: !0 })),
            t
          );
        })(),
        _d = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = jn({ type: t })),
            (t.ɵinj = Cn({})),
            t
          );
        })();
      let MM = (() => {
        class t {}
        return (t.ɵprov = G({ token: t, providedIn: 'root', factory: () => new AM(j(it), window) })), t;
      })();
      class AM {
        constructor(n, e) {
          (this.document = n), (this.window = e), (this.offset = () => [0, 0]);
        }
        setOffset(n) {
          this.offset = Array.isArray(n) ? () => n : n;
        }
        getScrollPosition() {
          return this.supportsScrolling() ? [this.window.pageXOffset, this.window.pageYOffset] : [0, 0];
        }
        scrollToPosition(n) {
          this.supportsScrolling() && this.window.scrollTo(n[0], n[1]);
        }
        scrollToAnchor(n) {
          if (!this.supportsScrolling()) return;
          const e = (function RM(t, n) {
            const e = t.getElementById(n) || t.getElementsByName(n)[0];
            if (e) return e;
            if ('function' == typeof t.createTreeWalker && t.body && (t.body.createShadowRoot || t.body.attachShadow)) {
              const r = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s = i.getElementById(n) || i.querySelector(`[name="${n}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, n);
          e && (this.scrollToElement(e), e.focus());
        }
        setHistoryScrollRestoration(n) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = n);
          }
        }
        scrollToElement(n) {
          const e = n.getBoundingClientRect(),
            r = e.left + this.window.pageXOffset,
            o = e.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const n = iw(this.window.history) || iw(Object.getPrototypeOf(this.window.history));
            return !(!n || (!n.writable && !n.set));
          } catch (n) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return !!this.window && !!this.window.scrollTo && 'pageXOffset' in this.window;
          } catch (n) {
            return !1;
          }
        }
      }
      function iw(t) {
        return Object.getOwnPropertyDescriptor(t, 'scrollRestoration');
      }
      class bd extends class YM extends class uE {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function cE(t) {
            Sa || (Sa = t);
          })(new bd());
        }
        onAndCancel(n, e, r) {
          return (
            n.addEventListener(e, r, !1),
            () => {
              n.removeEventListener(e, r, !1);
            }
          );
        }
        dispatchEvent(n, e) {
          n.dispatchEvent(e);
        }
        remove(n) {
          n.parentNode && n.parentNode.removeChild(n);
        }
        createElement(n, e) {
          return (e = e || this.getDefaultDocument()).createElement(n);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(n) {
          return n.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(n) {
          return n instanceof DocumentFragment;
        }
        getGlobalEventTarget(n, e) {
          return 'window' === e ? window : 'document' === e ? n : 'body' === e ? n.body : null;
        }
        getBaseHref(n) {
          const e = (function ZM() {
            return (Ni = Ni || document.querySelector('base')), Ni ? Ni.getAttribute('href') : null;
          })();
          return null == e
            ? null
            : (function KM(t) {
                (Oa = Oa || document.createElement('a')), Oa.setAttribute('href', t);
                const n = Oa.pathname;
                return '/' === n.charAt(0) ? n : `/${n}`;
              })(e);
        }
        resetBaseElement() {
          Ni = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(n) {
          return (function KE(t, n) {
            n = encodeURIComponent(n);
            for (const e of t.split(';')) {
              const r = e.indexOf('='),
                [o, i] = -1 == r ? [e, ''] : [e.slice(0, r), e.slice(r + 1)];
              if (o.trim() === n) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, n);
        }
      }
      let Oa,
        Ni = null;
      const cw = new q('TRANSITION_ID'),
        eA = [
          {
            provide: _a,
            useFactory: function JM(t, n, e) {
              return () => {
                e.get(ya).donePromise.then(() => {
                  const r = Zn(),
                    o = n.querySelectorAll(`style[ng-transition="${t}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [cw, it, Jt],
            multi: !0
          }
        ];
      let nA = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Ha = new q('EventManagerPlugins');
      let La = (() => {
        class t {
          constructor(e, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              e.forEach(o => (o.manager = this)),
              (this._plugins = e.slice().reverse());
          }
          addEventListener(e, r, o) {
            return this._findPluginFor(r).addEventListener(e, r, o);
          }
          addGlobalEventListener(e, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(e, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(e) {
            const r = this._eventNameToPlugin.get(e);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(e)) return this._eventNameToPlugin.set(e, s), s;
            }
            throw new Error(`No event manager plugin found for event ${e}`);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(Ha), j(Pe));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class uw {
        constructor(n) {
          this._doc = n;
        }
        addGlobalEventListener(n, e, r) {
          const o = Zn().getGlobalEventTarget(this._doc, n);
          if (!o) throw new Error(`Unsupported event target ${o} for event ${e}`);
          return this.addEventListener(o, e, r);
        }
      }
      let dw = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(e) {
              const r = new Set();
              e.forEach(o => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(e) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Oi = (() => {
          class t extends dw {
            constructor(e) {
              super(), (this._doc = e), (this._hostNodes = new Map()), this._hostNodes.set(e.head, []);
            }
            _addStylesToHost(e, r, o) {
              e.forEach(i => {
                const s = this._doc.createElement('style');
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(e) {
              const r = [];
              this._addStylesToHost(this._stylesSet, e, r), this._hostNodes.set(e, r);
            }
            removeHost(e) {
              const r = this._hostNodes.get(e);
              r && r.forEach(fw), this._hostNodes.delete(e);
            }
            onStylesAdded(e) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(e, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach(e => e.forEach(fw));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(j(it));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      function fw(t) {
        Zn().remove(t);
      }
      const vd = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/'
        },
        Cd = /%COMP%/g;
      function Ba(t, n, e) {
        for (let r = 0; r < n.length; r++) {
          let o = n[r];
          Array.isArray(o) ? Ba(t, o, e) : ((o = o.replace(Cd, t)), e.push(o));
        }
        return e;
      }
      function gw(t) {
        return n => {
          if ('__ngUnwrap__' === n) return t;
          !1 === t(n) && (n.preventDefault(), (n.returnValue = !1));
        };
      }
      let Dd = (() => {
        class t {
          constructor(e, r, o) {
            (this.eventManager = e),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Td(e));
          }
          createRenderer(e, r) {
            if (!e || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case an.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new lA(this.eventManager, this.sharedStylesHost, r, this.appId)),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(e),
                  o
                );
              }
              case 1:
              case an.ShadowDom:
                return new cA(this.eventManager, this.sharedStylesHost, e, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = Ba(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(o), this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(La), j(Oi), j(Ii));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Td {
        constructor(n) {
          (this.eventManager = n), (this.data = Object.create(null)), (this.destroyNode = null);
        }
        destroy() {}
        createElement(n, e) {
          return e ? document.createElementNS(vd[e] || e, n) : document.createElement(n);
        }
        createComment(n) {
          return document.createComment(n);
        }
        createText(n) {
          return document.createTextNode(n);
        }
        appendChild(n, e) {
          (_w(n) ? n.content : n).appendChild(e);
        }
        insertBefore(n, e, r) {
          n && (_w(n) ? n.content : n).insertBefore(e, r);
        }
        removeChild(n, e) {
          n && n.removeChild(e);
        }
        selectRootElement(n, e) {
          let r = 'string' == typeof n ? document.querySelector(n) : n;
          if (!r) throw new Error(`The selector "${n}" did not match any elements`);
          return e || (r.textContent = ''), r;
        }
        parentNode(n) {
          return n.parentNode;
        }
        nextSibling(n) {
          return n.nextSibling;
        }
        setAttribute(n, e, r, o) {
          if (o) {
            e = o + ':' + e;
            const i = vd[o];
            i ? n.setAttributeNS(i, e, r) : n.setAttribute(e, r);
          } else n.setAttribute(e, r);
        }
        removeAttribute(n, e, r) {
          if (r) {
            const o = vd[r];
            o ? n.removeAttributeNS(o, e) : n.removeAttribute(`${r}:${e}`);
          } else n.removeAttribute(e);
        }
        addClass(n, e) {
          n.classList.add(e);
        }
        removeClass(n, e) {
          n.classList.remove(e);
        }
        setStyle(n, e, r, o) {
          o & (wt.DashCase | wt.Important)
            ? n.style.setProperty(e, r, o & wt.Important ? 'important' : '')
            : (n.style[e] = r);
        }
        removeStyle(n, e, r) {
          r & wt.DashCase ? n.style.removeProperty(e) : (n.style[e] = '');
        }
        setProperty(n, e, r) {
          n[e] = r;
        }
        setValue(n, e) {
          n.nodeValue = e;
        }
        listen(n, e, r) {
          return 'string' == typeof n
            ? this.eventManager.addGlobalEventListener(n, e, gw(r))
            : this.eventManager.addEventListener(n, e, gw(r));
        }
      }
      function _w(t) {
        return 'TEMPLATE' === t.tagName && void 0 !== t.content;
      }
      class lA extends Td {
        constructor(n, e, r, o) {
          super(n), (this.component = r);
          const i = Ba(o + '-' + r.id, r.styles, []);
          e.addStyles(i),
            (this.contentAttr = (function iA(t) {
              return '_ngcontent-%COMP%'.replace(Cd, t);
            })(o + '-' + r.id)),
            (this.hostAttr = (function sA(t) {
              return '_nghost-%COMP%'.replace(Cd, t);
            })(o + '-' + r.id));
        }
        applyToHost(n) {
          super.setAttribute(n, this.hostAttr, '');
        }
        createElement(n, e) {
          const r = super.createElement(n, e);
          return super.setAttribute(r, this.contentAttr, ''), r;
        }
      }
      class cA extends Td {
        constructor(n, e, r, o) {
          super(n),
            (this.sharedStylesHost = e),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Ba(o.id, o.styles, []);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement('style');
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(n) {
          return n === this.hostEl ? this.shadowRoot : n;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(n, e) {
          return super.appendChild(this.nodeOrShadowRoot(n), e);
        }
        insertBefore(n, e, r) {
          return super.insertBefore(this.nodeOrShadowRoot(n), e, r);
        }
        removeChild(n, e) {
          return super.removeChild(this.nodeOrShadowRoot(n), e);
        }
        parentNode(n) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)));
        }
      }
      let uA = (() => {
        class t extends uw {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return !0;
          }
          addEventListener(e, r, o) {
            return e.addEventListener(r, o, !1), () => this.removeEventListener(e, r, o);
          }
          removeEventListener(e, r, o) {
            return e.removeEventListener(r, o);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(it));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const yw = ['alt', 'control', 'meta', 'shift'],
        dA = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS'
        },
        fA = { alt: t => t.altKey, control: t => t.ctrlKey, meta: t => t.metaKey, shift: t => t.shiftKey };
      let hA = (() => {
        class t extends uw {
          constructor(e) {
            super(e);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, r, o) {
            const i = t.parseEventName(r),
              s = t.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager.getZone().runOutsideAngular(() => Zn().onAndCancel(e, i.domEventName, s));
          }
          static parseEventName(e) {
            const r = e.toLowerCase().split('.'),
              o = r.shift();
            if (0 === r.length || ('keydown' !== o && 'keyup' !== o)) return null;
            const i = t._normalizeKey(r.pop());
            let s = '',
              a = r.indexOf('code');
            if (
              (a > -1 && (r.splice(a, 1), (s = 'code.')),
              yw.forEach(c => {
                const u = r.indexOf(c);
                u > -1 && (r.splice(u, 1), (s += c + '.'));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const l = {};
            return (l.domEventName = o), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(e, r) {
            let o = dA[e.key] || e.key,
              i = '';
            return (
              r.indexOf('code.') > -1 && ((o = e.code), (i = 'code.')),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                ' ' === o ? (o = 'space') : '.' === o && (o = 'dot'),
                yw.forEach(s => {
                  s !== o && (0, fA[s])(e) && (i += s + '.');
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(e, r, o) {
            return i => {
              t.matchEventFullKeyCode(i, e) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(e) {
            return 'esc' === e ? 'escape' : e;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(it));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const _A = yy(sE, 'browser', [
          { provide: ly, useValue: 'browser' },
          {
            provide: ay,
            useValue: function pA() {
              bd.makeCurrent();
            },
            multi: !0
          },
          {
            provide: it,
            useFactory: function mA() {
              return (
                (function k0(t) {
                  ac = t;
                })(document),
                document
              );
            },
            deps: []
          }
        ]),
        vw = new q(''),
        Cw = [
          {
            provide: wa,
            useClass: class tA {
              addToWindow(n) {
                (_e.getAngularTestability = (r, o = !0) => {
                  const i = n.findTestabilityInTree(r, o);
                  if (null == i) throw new Error('Could not find testability for element.');
                  return i;
                }),
                  (_e.getAllAngularTestabilities = () => n.getAllTestabilities()),
                  (_e.getAllAngularRootElements = () => n.getAllRootElements()),
                  _e.frameworkStabilizers || (_e.frameworkStabilizers = []),
                  _e.frameworkStabilizers.push(r => {
                    const o = _e.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), i--, 0 == i && r(s);
                    };
                    o.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(n, e, r) {
                if (null == e) return null;
                const o = n.getTestability(e);
                return null != o
                  ? o
                  : r
                  ? Zn().isShadowRoot(e)
                    ? this.findTestabilityInTree(n, e.host, !0)
                    : this.findTestabilityInTree(n, e.parentElement, !0)
                  : null;
              }
            },
            deps: []
          },
          { provide: py, useClass: Wu, deps: [Pe, qu, wa] },
          { provide: Wu, useClass: Wu, deps: [Pe, qu, wa] }
        ],
        Dw = [
          { provide: yc, useValue: 'root' },
          {
            provide: oo,
            useFactory: function gA() {
              return new oo();
            },
            deps: []
          },
          { provide: Ha, useClass: uA, multi: !0, deps: [it, Pe, ly] },
          { provide: Ha, useClass: hA, multi: !0, deps: [it] },
          { provide: Dd, useClass: Dd, deps: [La, Oi, Ii] },
          { provide: wp, useExisting: Dd },
          { provide: dw, useExisting: Oi },
          { provide: Oi, useClass: Oi, deps: [it] },
          { provide: La, useClass: La, deps: [Ha, Pe] },
          { provide: class kM {}, useClass: nA, deps: [] },
          []
        ];
      let yA = (() => {
          class t {
            constructor(e) {}
            static withServerTransition(e) {
              return {
                ngModule: t,
                providers: [{ provide: Ii, useValue: e.appId }, { provide: cw, useExisting: Ii }, eA]
              };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(j(vw, 12));
            }),
            (t.ɵmod = jn({ type: t })),
            (t.ɵinj = Cn({ providers: [...Dw, ...Cw], imports: [_d, aE] })),
            t
          );
        })(),
        Tw = (() => {
          class t {
            constructor(e) {
              this._doc = e;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(e) {
              this._doc.title = e || '';
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(j(it));
            }),
            (t.ɵprov = G({
              token: t,
              factory: function (e) {
                let r = null;
                return (
                  (r = e
                    ? new e()
                    : (function bA() {
                        return new Tw(j(it));
                      })()),
                  r
                );
              },
              providedIn: 'root'
            })),
            t
          );
        })();
      'undefined' != typeof window && window;
      let Id = (() => {
          class t {
            constructor(e) {
              (this.document = e), (this.width = this.getWidth());
            }
            getWidth() {
              const e = this.document.createElement('div');
              (e.style.visibility = 'hidden'),
                (e.style.width = '100px'),
                (e.style.msOverflowStyle = 'scrollbar'),
                this.document.body.appendChild(e);
              const r = e.offsetWidth;
              e.style.overflow = 'scroll';
              const o = this.document.createElement('div');
              (o.style.width = '100%'), e.appendChild(o);
              const i = o.offsetWidth;
              return e.parentNode.removeChild(e), r - i;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(j(it));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Iw = (() => {
          class t {
            getDimensions(e) {
              return e.getBoundingClientRect();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ed = (() => {
          class t {
            constructor() {
              this.columnInputChanges = new qt();
            }
            get columnInputChanges$() {
              return this.columnInputChanges.asObservable();
            }
            onInputChange() {
              this.columnInputChanges.next();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        EA = (() => {
          class t {
            static forRoot(e) {
              return { ngModule: t, providers: [{ provide: 'configuration', useValue: e }] };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = jn({ type: t })),
            (t.ɵinj = Cn({ providers: [Id, Iw, Ed], imports: [_d] })),
            t
          );
        })(),
        Ew = (() => {
          class t {
            constructor(e) {
              this.template = e;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(ke));
            }),
            (t.ɵdir = de({ type: t, selectors: [['', 'ngx-datatable-group-header-template', '']] })),
            t
          );
        })(),
        Mw = (() => {
          class t {
            constructor() {
              (this.rowHeight = 0), (this.toggle = new O());
            }
            get template() {
              return this._templateInput || this._templateQuery;
            }
            toggleExpandGroup(e) {
              this.toggle.emit({ type: 'group', value: e });
            }
            expandAllGroups() {
              this.toggle.emit({ type: 'all', value: !0 });
            }
            collapseAllGroups() {
              this.toggle.emit({ type: 'all', value: !1 });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['ngx-datatable-group-header']],
              contentQueries: function (e, r, o) {
                if ((1 & e && bt(o, Ew, 7, ke), 2 & e)) {
                  let i;
                  we((i = be())) && (r._templateQuery = i.first);
                }
              },
              inputs: { rowHeight: 'rowHeight', _templateInput: ['template', '_templateInput'] },
              outputs: { toggle: 'toggle' }
            })),
            t
          );
        })();
      class Gt extends qt {
        constructor(n) {
          super(), (this._value = n);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(n) {
          const e = super._subscribe(n);
          return !e.closed && n.next(this._value), e;
        }
        getValue() {
          const { hasError: n, thrownError: e, _value: r } = this;
          if (n) throw e;
          return this._throwIfClosed(), r;
        }
        next(n) {
          super.next((this._value = n));
        }
      }
      function MA() {
        return '';
      }
      function Md(t) {
        return null == t ? MA : 'number' == typeof t ? AA : -1 !== t.indexOf('.') ? kA : RA;
      }
      function AA(t, n) {
        if (null == t) return '';
        if (!t || null == n) return t;
        const e = t[n];
        return null == e ? '' : e;
      }
      function RA(t, n) {
        if (null == t) return '';
        if (!t || !n) return t;
        const e = t[n];
        return null == e ? '' : e;
      }
      function kA(t, n) {
        if (null == t) return '';
        if (!t || !n) return t;
        let e = t[n];
        if (void 0 !== e) return e;
        e = t;
        const r = n.split('.');
        if (r.length) for (let o = 0; o < r.length; o++) if (((e = e[r[o]]), null == e)) return '';
        return e;
      }
      function Eo(t) {
        return t && (n => Md(t)(n, t));
      }
      function Ad(t, n, e) {
        if (n && e) {
          const r = {},
            o = t.length;
          let i = null;
          r[0] = new Aw();
          const s = t.reduce((l, c) => {
            const u = e(c);
            return -1 === l.indexOf(u) && l.push(u), l;
          }, []);
          for (let l = 0; l < o; l++) r[e(t[l])] = new Aw(t[l]);
          for (let l = 0; l < o; l++) {
            i = r[e(t[l])];
            let c = 0;
            const u = n(i.row);
            !!u && s.indexOf(u) > -1 && (c = u),
              (i.parent = r[c]),
              (i.row.level = i.parent.row.level + 1),
              i.parent.children.push(i);
          }
          let a = [];
          return (
            r[0].flatten(function () {
              a = [...a, this.row];
            }, !0),
            a
          );
        }
        return t;
      }
      class Aw {
        constructor(n = null) {
          n || (n = { level: -1, treeStatus: 'expanded' }), (this.row = n), (this.parent = null), (this.children = []);
        }
        flatten(n, e) {
          if ('expanded' === this.row.treeStatus)
            for (let r = 0, o = this.children.length; r < o; r++) {
              const i = this.children[r];
              n.apply(i, Array.prototype.slice.call(arguments, 2)), e && i.flatten.apply(i, arguments);
            }
        }
      }
      function Rd(t) {
        return (t = (t = (t = t.replace(/[^a-zA-Z0-9 ]/g, ' ')).replace(/([a-z](?=[A-Z]))/g, '$1 '))
          .replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '')
          .trim()
          .toLowerCase()).replace(/([ 0-9]+)([a-zA-Z])/g, function (n, e, r) {
          return e.trim() + r.toUpperCase();
        });
      }
      function PA(t) {
        return t.replace(/([A-Z])/g, n => ` ${n}`).replace(/^./, n => n.toUpperCase());
      }
      function Rw(t) {
        if (!t) return;
        let n = !1;
        for (const e of t)
          e.$$id || (e.$$id = ('0000' + ((Math.random() * Math.pow(36, 4)) << 0).toString(36)).slice(-4)),
            Hi(e.prop) && e.name && (e.prop = Rd(e.name)),
            e.$$valueGetter || (e.$$valueGetter = Md(e.prop)),
            !Hi(e.prop) && Hi(e.name) && (e.name = PA(String(e.prop))),
            Hi(e.prop) && Hi(e.name) && (e.name = ''),
            e.hasOwnProperty('resizeable') || (e.resizeable = !0),
            e.hasOwnProperty('sortable') || (e.sortable = !0),
            e.hasOwnProperty('draggable') || (e.draggable = !0),
            e.hasOwnProperty('canAutoResize') || (e.canAutoResize = !0),
            e.hasOwnProperty('width') || (e.width = 150),
            e.hasOwnProperty('isTreeColumn') && e.isTreeColumn && !n ? (n = !0) : (e.isTreeColumn = !1);
      }
      function Hi(t) {
        return null == t;
      }
      var L = (() => {
          return ((t = L || (L = {})).standard = 'standard'), (t.flex = 'flex'), (t.force = 'force'), L;
          var t;
        })(),
        Oe = (() => {
          return (
            ((t = Oe || (Oe = {})).single = 'single'),
            (t.multi = 'multi'),
            (t.multiClick = 'multiClick'),
            (t.cell = 'cell'),
            (t.checkbox = 'checkbox'),
            Oe
          );
          var t;
        })(),
        Sr = (() => {
          return ((t = Sr || (Sr = {})).single = 'single'), (t.multi = 'multi'), Sr;
          var t;
        })(),
        Li = (() => {
          return ((t = Li || (Li = {})).header = 'header'), (t.body = 'body'), Li;
          var t;
        })();
      let ja = (() => {
          class t {
            constructor(e) {
              this.template = e;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(ke));
            }),
            (t.ɵdir = de({ type: t, selectors: [['', 'ngx-datatable-header-template', '']] })),
            t
          );
        })(),
        Ft = (() => {
          class t {
            constructor(e) {
              this.template = e;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(ke));
            }),
            (t.ɵdir = de({ type: t, selectors: [['', 'ngx-datatable-cell-template', '']] })),
            t
          );
        })(),
        kw = (() => {
          class t {
            constructor(e) {
              this.template = e;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(ke));
            }),
            (t.ɵdir = de({ type: t, selectors: [['', 'ngx-datatable-tree-toggle', '']] })),
            t
          );
        })(),
        De = (() => {
          class t {
            constructor(e) {
              (this.columnChangesService = e), (this.isFirstChange = !0);
            }
            get cellTemplate() {
              return this._cellTemplateInput || this._cellTemplateQuery;
            }
            get headerTemplate() {
              return this._headerTemplateInput || this._headerTemplateQuery;
            }
            get treeToggleTemplate() {
              return this._treeToggleTemplateInput || this._treeToggleTemplateQuery;
            }
            ngOnChanges() {
              this.isFirstChange ? (this.isFirstChange = !1) : this.columnChangesService.onInputChange();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(Ed));
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['ngx-datatable-column']],
              contentQueries: function (e, r, o) {
                if ((1 & e && (bt(o, Ft, 7, ke), bt(o, ja, 7, ke), bt(o, kw, 7, ke)), 2 & e)) {
                  let i;
                  we((i = be())) && (r._cellTemplateQuery = i.first),
                    we((i = be())) && (r._headerTemplateQuery = i.first),
                    we((i = be())) && (r._treeToggleTemplateQuery = i.first);
                }
              },
              inputs: {
                name: 'name',
                prop: 'prop',
                frozenLeft: 'frozenLeft',
                frozenRight: 'frozenRight',
                flexGrow: 'flexGrow',
                resizeable: 'resizeable',
                comparator: 'comparator',
                pipe: 'pipe',
                sortable: 'sortable',
                draggable: 'draggable',
                canAutoResize: 'canAutoResize',
                minWidth: 'minWidth',
                width: 'width',
                maxWidth: 'maxWidth',
                checkboxable: 'checkboxable',
                headerCheckboxable: 'headerCheckboxable',
                headerClass: 'headerClass',
                cellClass: 'cellClass',
                isTreeColumn: 'isTreeColumn',
                treeLevelIndent: 'treeLevelIndent',
                summaryFunc: 'summaryFunc',
                summaryTemplate: 'summaryTemplate',
                _cellTemplateInput: ['cellTemplate', '_cellTemplateInput'],
                _headerTemplateInput: ['headerTemplate', '_headerTemplateInput'],
                _treeToggleTemplateInput: ['treeToggleTemplate', '_treeToggleTemplateInput']
              },
              features: [ln]
            })),
            t
          );
        })(),
        kd = (() => {
          class t {
            constructor(e) {
              this.template = e;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(ke));
            }),
            (t.ɵdir = de({ type: t, selectors: [['', 'ngx-datatable-row-detail-template', '']] })),
            t
          );
        })(),
        Pd = (() => {
          class t {
            constructor() {
              (this.rowHeight = 0), (this.toggle = new O());
            }
            get template() {
              return this._templateInput || this._templateQuery;
            }
            toggleExpandRow(e) {
              this.toggle.emit({ type: 'row', value: e });
            }
            expandAllRows() {
              this.toggle.emit({ type: 'all', value: !0 });
            }
            collapseAllRows() {
              this.toggle.emit({ type: 'all', value: !1 });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['ngx-datatable-row-detail']],
              contentQueries: function (e, r, o) {
                if ((1 & e && bt(o, kd, 7, ke), 2 & e)) {
                  let i;
                  we((i = be())) && (r._templateQuery = i.first);
                }
              },
              inputs: { rowHeight: 'rowHeight', _templateInput: ['template', '_templateInput'] },
              outputs: { toggle: 'toggle' }
            })),
            t
          );
        })(),
        Pw = (() => {
          class t {
            constructor(e) {
              this.template = e;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(ke));
            }),
            (t.ɵdir = de({ type: t, selectors: [['', 'ngx-datatable-footer-template', '']] })),
            t
          );
        })(),
        Fw = (() => {
          class t {
            get template() {
              return this._templateInput || this._templateQuery;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['ngx-datatable-footer']],
              contentQueries: function (e, r, o) {
                if ((1 & e && bt(o, Pw, 5, ke), 2 & e)) {
                  let i;
                  we((i = be())) && (r._templateQuery = i.first);
                }
              },
              inputs: {
                footerHeight: 'footerHeight',
                totalMessage: 'totalMessage',
                selectedMessage: 'selectedMessage',
                pagerLeftArrowIcon: 'pagerLeftArrowIcon',
                pagerRightArrowIcon: 'pagerRightArrowIcon',
                pagerPreviousIcon: 'pagerPreviousIcon',
                pagerNextIcon: 'pagerNextIcon',
                _templateInput: ['template', '_templateInput']
              }
            })),
            t
          );
        })();
      const OA = ['*'];
      let Nw = (() => {
        class t {
          constructor(e, r, o) {
            (this.ngZone = e),
              (this.renderer = o),
              (this.scrollbarV = !1),
              (this.scrollbarH = !1),
              (this.scroll = new O()),
              (this.scrollYPos = 0),
              (this.scrollXPos = 0),
              (this.prevScrollYPos = 0),
              (this.prevScrollXPos = 0),
              (this._scrollEventListener = null),
              (this.element = r.nativeElement);
          }
          ngOnInit() {
            if (this.scrollbarV || this.scrollbarH) {
              const e = this.renderer;
              (this.parentElement = e.parentNode(e.parentNode(this.element))),
                (this._scrollEventListener = this.onScrolled.bind(this)),
                this.parentElement.addEventListener('scroll', this._scrollEventListener);
            }
          }
          ngOnDestroy() {
            this._scrollEventListener &&
              (this.parentElement.removeEventListener('scroll', this._scrollEventListener),
              (this._scrollEventListener = null));
          }
          setOffset(e) {
            this.parentElement && (this.parentElement.scrollTop = e);
          }
          onScrolled(e) {
            const r = e.currentTarget;
            requestAnimationFrame(() => {
              (this.scrollYPos = r.scrollTop), (this.scrollXPos = r.scrollLeft), this.updateOffset();
            });
          }
          updateOffset() {
            let e;
            this.scrollYPos < this.prevScrollYPos ? (e = 'down') : this.scrollYPos > this.prevScrollYPos && (e = 'up'),
              this.scroll.emit({ direction: e, scrollYPos: this.scrollYPos, scrollXPos: this.scrollXPos }),
              (this.prevScrollYPos = this.scrollYPos),
              (this.prevScrollXPos = this.scrollXPos);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(Pe), I(nt), I(ro));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-scroller']],
            hostAttrs: [1, 'datatable-scroll'],
            hostVars: 4,
            hostBindings: function (e, r) {
              2 & e && kt('height', r.scrollHeight, 'px')('width', r.scrollWidth, 'px');
            },
            inputs: {
              scrollbarV: 'scrollbarV',
              scrollbarH: 'scrollbarH',
              scrollHeight: 'scrollHeight',
              scrollWidth: 'scrollWidth'
            },
            outputs: { scroll: 'scroll' },
            ngContentSelectors: OA,
            decls: 1,
            vars: 0,
            template: function (e, r) {
              1 & e && (ra(), oa(0));
            },
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      function xr(t) {
        const n = { left: [], center: [], right: [] };
        if (t) for (const e of t) e.frozenLeft ? n.left.push(e) : e.frozenRight ? n.right.push(e) : n.center.push(e);
        return n;
      }
      function Bi(t, n) {
        return { left: Va(t.left), center: Va(t.center), right: Va(t.right), total: Math.floor(Va(n)) };
      }
      function Va(t, n) {
        let e = 0;
        if (t) for (const r of t) e += parseFloat(n && r[n] ? r[n] : r.width);
        return e;
      }
      function Ow(t) {
        const n = [],
          e = xr(t);
        return (
          n.push({ type: 'left', columns: e.left }),
          n.push({ type: 'center', columns: e.center }),
          n.push({ type: 'right', columns: e.right }),
          n
        );
      }
      class LA {
        constructor() {
          this.treeArray = [];
        }
        clearCache() {
          this.treeArray = [];
        }
        initCache(n) {
          const {
              rows: e,
              rowHeight: r,
              detailRowHeight: o,
              externalVirtual: i,
              rowCount: s,
              rowIndexes: a,
              rowExpansions: l
            } = n,
            c = 'function' == typeof r,
            u = 'function' == typeof o;
          if (!c && isNaN(r))
            throw new Error(
              `Row Height cache initialization failed. Please ensure that 'rowHeight' is a\n        valid number or function value: (${r}) when 'scrollbarV' is enabled.`
            );
          if (!u && isNaN(o))
            throw new Error(
              `Row Height cache initialization failed. Please ensure that 'detailRowHeight' is a\n        valid number or function value: (${o}) when 'scrollbarV' is enabled.`
            );
          const d = i ? s : e.length;
          this.treeArray = new Array(d);
          for (let h = 0; h < d; ++h) this.treeArray[h] = 0;
          for (let h = 0; h < d; ++h) {
            const y = e[h];
            let w = r;
            c && (w = r(y));
            const C = l.has(y);
            y && C && (w += u ? o(y, a.get(y)) : o), this.update(h, w);
          }
        }
        getRowIndex(n) {
          return 0 === n ? 0 : this.calcRowIndex(n);
        }
        update(n, e) {
          if (!this.treeArray.length)
            throw new Error(`Update at index ${n} with value ${e} failed:\n        Row Height cache not initialized.`);
          const r = this.treeArray.length;
          for (n |= 0; n < r; ) (this.treeArray[n] += e), (n |= n + 1);
        }
        query(n) {
          if (!this.treeArray.length)
            throw new Error(`query at index ${n} failed: Fenwick tree array not initialized.`);
          let e = 0;
          for (n |= 0; n >= 0; ) (e += this.treeArray[n]), (n = (n & (n + 1)) - 1);
          return e;
        }
        queryBetween(n, e) {
          return this.query(e) - this.query(n - 1);
        }
        calcRowIndex(n) {
          if (!this.treeArray.length) return 0;
          let e = -1;
          const r = this.treeArray.length;
          for (let i = Math.pow(2, r.toString(2).length - 1); 0 !== i; i >>= 1) {
            const s = e + i;
            s < r && n >= this.treeArray[s] && ((n -= this.treeArray[s]), (e = s));
          }
          return e + 1;
        }
      }
      const $a = {},
        Hw = 'undefined' != typeof document ? document.createElement('div').style : void 0,
        Fd = (function () {
          const t = 'undefined' != typeof window ? window.getComputedStyle(document.documentElement, '') : void 0,
            n =
              void 0 !== t
                ? Array.prototype.slice
                    .call(t)
                    .join('')
                    .match(/-(moz|webkit|ms)-/)
                : null,
            e = null !== n ? n[1] : void 0,
            r = void 0 !== e ? 'WebKit|Moz|MS|O'.match(new RegExp('(' + e + ')', 'i'))[1] : void 0;
          return r ? { dom: r, lowercase: e, css: `-${e}-`, js: e[0].toUpperCase() + e.substr(1) } : void 0;
        })();
      function Ua(t) {
        const n = Rd(t);
        return (
          $a[n] ||
            (void 0 !== Fd && void 0 !== Hw[Fd.css + t] ? ($a[n] = Fd.css + t) : void 0 !== Hw[t] && ($a[n] = t)),
          $a[n]
        );
      }
      const Nd = 'undefined' != typeof window ? Ua('transform') : void 0,
        BA = 'undefined' != typeof window ? Ua('backfaceVisibility') : void 0,
        jA = 'undefined' != typeof window ? !!Ua('transform') : void 0,
        VA = 'undefined' != typeof window ? !!Ua('perspective') : void 0,
        Lw = 'undefined' != typeof window ? window.navigator.userAgent : 'Chrome',
        $A = /Safari\//.test(Lw) && !/Chrome\//.test(Lw);
      function er(t, n, e) {
        void 0 !== Nd && jA
          ? !$A && VA
            ? ((t[Nd] = `translate3d(${n}px, ${e}px, 0)`), (t[BA] = 'hidden'))
            : (t[Rd(Nd)] = `translate(${n}px, ${e}px)`)
          : ((t.top = `${e}px`), (t.left = `${n}px`));
      }
      let UA = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-progress']],
            decls: 3,
            vars: 0,
            consts: [
              ['role', 'progressbar', 1, 'progress-linear'],
              [1, 'container'],
              [1, 'bar']
            ],
            template: function (e, r) {
              1 & e && (f(0, 'div', 0)(1, 'div', 1), S(2, 'div', 2), p()());
            },
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      var Te = (() => {
          return (
            ((t = Te || (Te = {}))[(t.up = 38)] = 'up'),
            (t[(t.down = 40)] = 'down'),
            (t[(t.return = 13)] = 'return'),
            (t[(t.escape = 27)] = 'escape'),
            (t[(t.left = 37)] = 'left'),
            (t[(t.right = 39)] = 'right'),
            Te
          );
          var t;
        })(),
        mt = (() => {
          return ((t = mt || (mt = {})).asc = 'asc'), (t.desc = 'desc'), mt;
          var t;
        })();
      const zA = ['cellTemplate'];
      function GA(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'label', 4)(1, 'input', 5),
            v('click', function (o) {
              return Y(e), Z(E().onCheckboxChange(o));
            }),
            p()();
        }
        if (2 & t) {
          const e = E();
          m(1), _('checked', e.isSelected);
        }
      }
      function WA(t, n) {
        1 & t && S(0, 'i', 11);
      }
      function qA(t, n) {
        1 & t && S(0, 'i', 12);
      }
      function QA(t, n) {
        1 & t && S(0, 'i', 13);
      }
      function XA(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'button', 7),
            v('click', function () {
              return Y(e), Z(E(2).onTreeAction());
            }),
            f(1, 'span'),
            b(2, WA, 1, 0, 'i', 8),
            b(3, qA, 1, 0, 'i', 9),
            b(4, QA, 1, 0, 'i', 10),
            p()();
        }
        if (2 & t) {
          const e = E(2);
          _('disabled', 'disabled' === e.treeStatus),
            m(2),
            _('ngIf', 'loading' === e.treeStatus),
            m(1),
            _('ngIf', 'collapsed' === e.treeStatus),
            m(1),
            _('ngIf', 'expanded' === e.treeStatus || 'disabled' === e.treeStatus);
        }
      }
      function YA(t, n) {}
      const ZA = function (t) {
        return { cellContext: t };
      };
      function KA(t, n) {
        if ((1 & t && b(0, YA, 0, 0, 'ng-template', 14), 2 & t)) {
          const e = E(2);
          _('ngTemplateOutlet', e.column.treeToggleTemplate)('ngTemplateOutletContext', da(2, ZA, e.cellContext));
        }
      }
      function JA(t, n) {
        if ((1 & t && (ea(0), b(1, XA, 5, 4, 'button', 6), b(2, KA, 1, 4, null, 2), ta()), 2 & t)) {
          const e = E();
          m(1), _('ngIf', !e.column.treeToggleTemplate), m(1), _('ngIf', e.column.treeToggleTemplate);
        }
      }
      function eR(t, n) {
        if ((1 & t && S(0, 'span', 15), 2 & t)) {
          const e = E();
          _('title', e.sanitizedValue)('innerHTML', e.value, mr);
        }
      }
      function tR(t, n) {}
      function nR(t, n) {
        if ((1 & t && b(0, tR, 0, 0, 'ng-template', 14, 16, Yn), 2 & t)) {
          const e = E();
          _('ngTemplateOutlet', e.column.cellTemplate)('ngTemplateOutletContext', e.cellContext);
        }
      }
      let rR = (() => {
        class t {
          constructor(e, r) {
            (this.cd = r),
              (this.activate = new O()),
              (this.treeAction = new O()),
              (this.isFocused = !1),
              (this.onCheckboxChangeFn = this.onCheckboxChange.bind(this)),
              (this.activateFn = this.activate.emit.bind(this.activate)),
              (this.cellContext = {
                onCheckboxChangeFn: this.onCheckboxChangeFn,
                activateFn: this.activateFn,
                row: this.row,
                group: this.group,
                value: this.value,
                column: this.column,
                rowHeight: this.rowHeight,
                isSelected: this.isSelected,
                rowIndex: this.rowIndex,
                treeStatus: this.treeStatus,
                onTreeAction: this.onTreeAction.bind(this)
              }),
              (this._element = e.nativeElement);
          }
          set group(e) {
            (this._group = e), (this.cellContext.group = e), this.checkValueUpdates(), this.cd.markForCheck();
          }
          get group() {
            return this._group;
          }
          set rowHeight(e) {
            (this._rowHeight = e), (this.cellContext.rowHeight = e), this.checkValueUpdates(), this.cd.markForCheck();
          }
          get rowHeight() {
            return this._rowHeight;
          }
          set isSelected(e) {
            (this._isSelected = e), (this.cellContext.isSelected = e), this.cd.markForCheck();
          }
          get isSelected() {
            return this._isSelected;
          }
          set expanded(e) {
            (this._expanded = e), (this.cellContext.expanded = e), this.cd.markForCheck();
          }
          get expanded() {
            return this._expanded;
          }
          set rowIndex(e) {
            (this._rowIndex = e), (this.cellContext.rowIndex = e), this.checkValueUpdates(), this.cd.markForCheck();
          }
          get rowIndex() {
            return this._rowIndex;
          }
          set column(e) {
            (this._column = e), (this.cellContext.column = e), this.checkValueUpdates(), this.cd.markForCheck();
          }
          get column() {
            return this._column;
          }
          set row(e) {
            (this._row = e), (this.cellContext.row = e), this.checkValueUpdates(), this.cd.markForCheck();
          }
          get row() {
            return this._row;
          }
          set sorts(e) {
            (this._sorts = e), (this.calcSortDir = this.calcSortDir(e));
          }
          get sorts() {
            return this._sorts;
          }
          set treeStatus(e) {
            (this._treeStatus =
              'collapsed' !== e && 'expanded' !== e && 'loading' !== e && 'disabled' !== e ? 'collapsed' : e),
              (this.cellContext.treeStatus = this._treeStatus),
              this.checkValueUpdates(),
              this.cd.markForCheck();
          }
          get treeStatus() {
            return this._treeStatus;
          }
          get columnCssClasses() {
            let e = 'datatable-body-cell';
            if (this.column.cellClass)
              if ('string' == typeof this.column.cellClass) e += ' ' + this.column.cellClass;
              else if ('function' == typeof this.column.cellClass) {
                const r = this.column.cellClass({
                  row: this.row,
                  group: this.group,
                  column: this.column,
                  value: this.value,
                  rowHeight: this.rowHeight
                });
                if ('string' == typeof r) e += ' ' + r;
                else if ('object' == typeof r) {
                  const o = Object.keys(r);
                  for (const i of o) !0 === r[i] && (e += ` ${i}`);
                }
              }
            return (
              this.sortDir || (e += ' sort-active'),
              this.isFocused && (e += ' active'),
              this.sortDir === mt.asc && (e += ' sort-asc'),
              this.sortDir === mt.desc && (e += ' sort-desc'),
              e
            );
          }
          get width() {
            return this.column.width;
          }
          get minWidth() {
            return this.column.minWidth;
          }
          get maxWidth() {
            return this.column.maxWidth;
          }
          get height() {
            const e = this.rowHeight;
            return isNaN(e) ? e : e + 'px';
          }
          ngDoCheck() {
            this.checkValueUpdates();
          }
          ngOnDestroy() {
            this.cellTemplate && this.cellTemplate.clear();
          }
          checkValueUpdates() {
            let e = '';
            if (this.row && this.column) {
              const r = this.column.$$valueGetter(this.row, this.column.prop),
                o = this.column.pipe;
              o ? (e = o.transform(r)) : void 0 !== e && (e = r);
            } else e = '';
            this.value !== e &&
              ((this.value = e),
              (this.cellContext.value = e),
              (this.sanitizedValue = null != e ? this.stripHtml(e) : e),
              this.cd.markForCheck());
          }
          onFocus() {
            this.isFocused = !0;
          }
          onBlur() {
            this.isFocused = !1;
          }
          onClick(e) {
            this.activate.emit({
              type: 'click',
              event: e,
              row: this.row,
              group: this.group,
              rowHeight: this.rowHeight,
              column: this.column,
              value: this.value,
              cellElement: this._element
            });
          }
          onDblClick(e) {
            this.activate.emit({
              type: 'dblclick',
              event: e,
              row: this.row,
              group: this.group,
              rowHeight: this.rowHeight,
              column: this.column,
              value: this.value,
              cellElement: this._element
            });
          }
          onKeyDown(e) {
            const r = e.keyCode;
            (r === Te.return || r === Te.down || r === Te.up || r === Te.left || r === Te.right) &&
              e.target === this._element &&
              (e.preventDefault(),
              e.stopPropagation(),
              this.activate.emit({
                type: 'keydown',
                event: e,
                row: this.row,
                group: this.group,
                rowHeight: this.rowHeight,
                column: this.column,
                value: this.value,
                cellElement: this._element
              }));
          }
          onCheckboxChange(e) {
            this.activate.emit({
              type: 'checkbox',
              event: e,
              row: this.row,
              group: this.group,
              rowHeight: this.rowHeight,
              column: this.column,
              value: this.value,
              cellElement: this._element,
              treeStatus: 'collapsed'
            });
          }
          calcSortDir(e) {
            if (!e) return;
            const r = e.find(o => o.prop === this.column.prop);
            return r ? r.dir : void 0;
          }
          stripHtml(e) {
            return e.replace ? e.replace(/<\/?[^>]+(>|$)/g, '') : e;
          }
          onTreeAction() {
            this.treeAction.emit(this.row);
          }
          calcLeftMargin(e, r) {
            return e.isTreeColumn ? r.level * (null != e.treeLevelIndent ? e.treeLevelIndent : 50) : 0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(nt), I($t));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-body-cell']],
            viewQuery: function (e, r) {
              if ((1 & e && Pt(zA, 7, Vt), 2 & e)) {
                let o;
                we((o = be())) && (r.cellTemplate = o.first);
              }
            },
            hostVars: 10,
            hostBindings: function (e, r) {
              1 & e &&
                v('focus', function () {
                  return r.onFocus();
                })('blur', function () {
                  return r.onBlur();
                })('click', function (i) {
                  return r.onClick(i);
                })('dblclick', function (i) {
                  return r.onDblClick(i);
                })('keydown', function (i) {
                  return r.onKeyDown(i);
                }),
                2 & e &&
                  (pn(r.columnCssClasses),
                  kt('width', r.width, 'px')('min-width', r.minWidth, 'px')('max-width', r.maxWidth, 'px')(
                    'height',
                    r.height
                  ));
            },
            inputs: {
              displayCheck: 'displayCheck',
              group: 'group',
              rowHeight: 'rowHeight',
              isSelected: 'isSelected',
              expanded: 'expanded',
              rowIndex: 'rowIndex',
              column: 'column',
              row: 'row',
              sorts: 'sorts',
              treeStatus: 'treeStatus'
            },
            outputs: { activate: 'activate', treeAction: 'treeAction' },
            decls: 5,
            vars: 6,
            consts: [
              [1, 'datatable-body-cell-label'],
              ['class', 'datatable-checkbox', 4, 'ngIf'],
              [4, 'ngIf'],
              [3, 'title', 'innerHTML', 4, 'ngIf'],
              [1, 'datatable-checkbox'],
              ['type', 'checkbox', 3, 'checked', 'click'],
              ['class', 'datatable-tree-button', 3, 'disabled', 'click', 4, 'ngIf'],
              [1, 'datatable-tree-button', 3, 'disabled', 'click'],
              ['class', 'icon datatable-icon-collapse', 4, 'ngIf'],
              ['class', 'icon datatable-icon-up', 4, 'ngIf'],
              ['class', 'icon datatable-icon-down', 4, 'ngIf'],
              [1, 'icon', 'datatable-icon-collapse'],
              [1, 'icon', 'datatable-icon-up'],
              [1, 'icon', 'datatable-icon-down'],
              [3, 'ngTemplateOutlet', 'ngTemplateOutletContext'],
              [3, 'title', 'innerHTML'],
              ['cellTemplate', '']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div', 0),
                b(1, GA, 2, 1, 'label', 1),
                b(2, JA, 3, 2, 'ng-container', 2),
                b(3, eR, 1, 2, 'span', 3),
                b(4, nR, 2, 2, null, 2),
                p()),
                2 & e &&
                  (kt('margin-left', r.calcLeftMargin(r.column, r.row), 'px'),
                  m(1),
                  _('ngIf', r.column.checkboxable && (!r.displayCheck || r.displayCheck(r.row, r.column, r.value))),
                  m(1),
                  _('ngIf', r.column.isTreeColumn),
                  m(1),
                  _('ngIf', !r.column.cellTemplate),
                  m(1),
                  _('ngIf', r.column.cellTemplate));
            },
            dependencies: [Ne, Pi],
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      function oR(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'datatable-body-cell', 3),
            v('activate', function (o) {
              const s = Y(e).index;
              return Z(E(2).onActivate(o, s));
            })('treeAction', function () {
              return Y(e), Z(E(2).onTreeAction());
            }),
            p();
        }
        if (2 & t) {
          const e = n.$implicit,
            r = E(2);
          _('row', r.row)('group', r.group)('expanded', r.expanded)('isSelected', r.isSelected)('rowIndex', r.rowIndex)(
            'column',
            e
          )('rowHeight', r.rowHeight)('displayCheck', r.displayCheck)('treeStatus', r.treeStatus);
        }
      }
      function iR(t, n) {
        if ((1 & t && (f(0, 'div', 1), b(1, oR, 1, 9, 'datatable-body-cell', 2), p()), 2 & t)) {
          const e = n.$implicit,
            r = E();
          (function Pm(t, n, e) {
            nn(At, gn, ho(x(), t, n, e), !0);
          })('datatable-row-', e.type, ' datatable-row-group'),
            _('ngStyle', r._groupStyles[e.type]),
            m(1),
            _('ngForOf', e.columns)('ngForTrackBy', r.columnTrackingFn);
        }
      }
      let Bw = (() => {
        class t {
          constructor(e, r, o, i) {
            (this.differs = e),
              (this.scrollbarHelper = r),
              (this.cd = o),
              (this.treeStatus = 'collapsed'),
              (this.activate = new O()),
              (this.treeAction = new O()),
              (this._groupStyles = { left: {}, center: {}, right: {} }),
              (this._element = i.nativeElement),
              (this._rowDiffer = e.find({}).create());
          }
          set columns(e) {
            (this._columns = e), this.recalculateColumns(e), this.buildStylesByGroup();
          }
          get columns() {
            return this._columns;
          }
          set innerWidth(e) {
            if (this._columns) {
              const r = xr(this._columns);
              this._columnGroupWidths = Bi(r, this._columns);
            }
            (this._innerWidth = e), this.recalculateColumns(), this.buildStylesByGroup();
          }
          get innerWidth() {
            return this._innerWidth;
          }
          set offsetX(e) {
            (this._offsetX = e), this.buildStylesByGroup();
          }
          get offsetX() {
            return this._offsetX;
          }
          get cssClass() {
            let e = 'datatable-body-row';
            if (
              (this.isSelected && (e += ' active'),
              this.rowIndex % 2 != 0 && (e += ' datatable-row-odd'),
              this.rowIndex % 2 == 0 && (e += ' datatable-row-even'),
              this.rowClass)
            ) {
              const r = this.rowClass(this.row);
              if ('string' == typeof r) e += ` ${r}`;
              else if ('object' == typeof r) {
                const o = Object.keys(r);
                for (const i of o) !0 === r[i] && (e += ` ${i}`);
              }
            }
            return e;
          }
          get columnsTotalWidths() {
            return this._columnGroupWidths.total;
          }
          ngDoCheck() {
            this._rowDiffer.diff(this.row) && this.cd.markForCheck();
          }
          trackByGroups(e, r) {
            return r.type;
          }
          columnTrackingFn(e, r) {
            return r.$$id;
          }
          buildStylesByGroup() {
            (this._groupStyles.left = this.calcStylesByGroup('left')),
              (this._groupStyles.center = this.calcStylesByGroup('center')),
              (this._groupStyles.right = this.calcStylesByGroup('right')),
              this.cd.markForCheck();
          }
          calcStylesByGroup(e) {
            const r = this._columnGroupWidths,
              o = this.offsetX,
              i = { width: `${r[e]}px` };
            if ('left' === e) er(i, o, 0);
            else if ('right' === e) {
              const s = parseInt(this.innerWidth + '', 0);
              er(i, -1 * (r.total - s - o + this.scrollbarHelper.width), 0);
            }
            return i;
          }
          onActivate(e, r) {
            (e.cellIndex = r), (e.rowElement = this._element), this.activate.emit(e);
          }
          onKeyDown(e) {
            const r = e.keyCode;
            (r === Te.return || r === Te.down || r === Te.up || r === Te.left || r === Te.right) &&
              e.target === this._element &&
              (e.preventDefault(),
              e.stopPropagation(),
              this.activate.emit({ type: 'keydown', event: e, row: this.row, rowElement: this._element }));
          }
          onMouseenter(e) {
            this.activate.emit({ type: 'mouseenter', event: e, row: this.row, rowElement: this._element });
          }
          recalculateColumns(e = this.columns) {
            this._columns = e;
            const r = xr(this._columns);
            (this._columnsByPin = Ow(this._columns)), (this._columnGroupWidths = Bi(r, this._columns));
          }
          onTreeAction() {
            this.treeAction.emit();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(Fn), I(Id, 4), I($t), I(nt));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-body-row']],
            hostVars: 6,
            hostBindings: function (e, r) {
              1 & e &&
                v('keydown', function (i) {
                  return r.onKeyDown(i);
                })('mouseenter', function (i) {
                  return r.onMouseenter(i);
                }),
                2 & e && (pn(r.cssClass), kt('height', r.rowHeight, 'px')('width', r.columnsTotalWidths, 'px'));
            },
            inputs: {
              columns: 'columns',
              innerWidth: 'innerWidth',
              expanded: 'expanded',
              rowClass: 'rowClass',
              row: 'row',
              group: 'group',
              isSelected: 'isSelected',
              rowIndex: 'rowIndex',
              displayCheck: 'displayCheck',
              treeStatus: 'treeStatus',
              offsetX: 'offsetX',
              rowHeight: 'rowHeight'
            },
            outputs: { activate: 'activate', treeAction: 'treeAction' },
            decls: 1,
            vars: 2,
            consts: [
              [3, 'class', 'ngStyle', 4, 'ngFor', 'ngForOf', 'ngForTrackBy'],
              [3, 'ngStyle'],
              [
                'role',
                'cell',
                'tabindex',
                '-1',
                3,
                'row',
                'group',
                'expanded',
                'isSelected',
                'rowIndex',
                'column',
                'rowHeight',
                'displayCheck',
                'treeStatus',
                'activate',
                'treeAction',
                4,
                'ngFor',
                'ngForOf',
                'ngForTrackBy'
              ],
              [
                'role',
                'cell',
                'tabindex',
                '-1',
                3,
                'row',
                'group',
                'expanded',
                'isSelected',
                'rowIndex',
                'column',
                'rowHeight',
                'displayCheck',
                'treeStatus',
                'activate',
                'treeAction'
              ]
            ],
            template: function (e, r) {
              1 & e && b(0, iR, 2, 6, 'div', 0),
                2 & e && _('ngForOf', r._columnsByPin)('ngForTrackBy', r.trackByGroups);
            },
            dependencies: [Ct, ki, rR],
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      function sR(t, n) {}
      function aR(t, n) {
        if ((1 & t && b(0, sR, 0, 0, 'ng-template', 4), 2 & t)) {
          const e = E(2);
          _('ngTemplateOutlet', e.groupHeader.template)('ngTemplateOutletContext', e.groupContext);
        }
      }
      function lR(t, n) {
        if ((1 & t && (f(0, 'div', 3), b(1, aR, 1, 2, null, 1), p()), 2 & t)) {
          const e = E();
          _('ngStyle', e.getGroupHeaderStyle()), m(1), _('ngIf', e.groupHeader && e.groupHeader.template);
        }
      }
      function cR(t, n) {
        1 & t &&
          oa(0, 0, [
            '*ngIf',
            '(groupHeader && groupHeader.template && expanded) || !groupHeader || !groupHeader.template'
          ]);
      }
      function uR(t, n) {}
      function dR(t, n) {
        if ((1 & t && b(0, uR, 0, 0, 'ng-template', 4), 2 & t)) {
          const e = E(2);
          _('ngTemplateOutlet', e.rowDetail.template)('ngTemplateOutletContext', e.rowContext);
        }
      }
      function fR(t, n) {
        if ((1 & t && (f(0, 'div', 5), b(1, dR, 1, 2, null, 1), p()), 2 & t)) {
          const e = E();
          kt('height', e.detailRowHeight, 'px'), m(1), _('ngIf', e.rowDetail && e.rowDetail.template);
        }
      }
      const hR = ['*'];
      let pR = (() => {
        class t {
          constructor(e, r) {
            (this.cd = e),
              (this.differs = r),
              (this.rowContextmenu = new O(!1)),
              (this._expanded = !1),
              (this.groupContext = { group: this.row, expanded: this.expanded, rowIndex: this.rowIndex }),
              (this.rowContext = { row: this.row, expanded: this.expanded, rowIndex: this.rowIndex }),
              (this.rowDiffer = r.find({}).create());
          }
          set rowIndex(e) {
            (this._rowIndex = e),
              (this.rowContext.rowIndex = e),
              (this.groupContext.rowIndex = e),
              this.cd.markForCheck();
          }
          get rowIndex() {
            return this._rowIndex;
          }
          set expanded(e) {
            (this._expanded = e),
              (this.groupContext.expanded = e),
              (this.rowContext.expanded = e),
              this.cd.markForCheck();
          }
          get expanded() {
            return this._expanded;
          }
          ngDoCheck() {
            this.rowDiffer.diff(this.row) &&
              ((this.rowContext.row = this.row), (this.groupContext.group = this.row), this.cd.markForCheck());
          }
          onContextmenu(e) {
            this.rowContextmenu.emit({ event: e, row: this.row });
          }
          getGroupHeaderStyle() {
            const e = {};
            return (
              (e.transform = 'translate3d(' + this.offsetX + 'px, 0px, 0px)'),
              (e['backface-visibility'] = 'hidden'),
              (e.width = this.innerWidth),
              e
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I($t), I(Fn));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-row-wrapper']],
            hostAttrs: [1, 'datatable-row-wrapper'],
            hostBindings: function (e, r) {
              1 & e &&
                v('contextmenu', function (i) {
                  return r.onContextmenu(i);
                });
            },
            inputs: {
              innerWidth: 'innerWidth',
              rowDetail: 'rowDetail',
              groupHeader: 'groupHeader',
              offsetX: 'offsetX',
              detailRowHeight: 'detailRowHeight',
              row: 'row',
              groupedRows: 'groupedRows',
              rowIndex: 'rowIndex',
              expanded: 'expanded'
            },
            outputs: { rowContextmenu: 'rowContextmenu' },
            ngContentSelectors: hR,
            decls: 3,
            vars: 3,
            consts: [
              ['class', 'datatable-group-header', 3, 'ngStyle', 4, 'ngIf'],
              [4, 'ngIf'],
              ['class', 'datatable-row-detail', 3, 'height', 4, 'ngIf'],
              [1, 'datatable-group-header', 3, 'ngStyle'],
              [3, 'ngTemplateOutlet', 'ngTemplateOutletContext'],
              [1, 'datatable-row-detail']
            ],
            template: function (e, r) {
              1 & e && (ra(), b(0, lR, 2, 2, 'div', 0), b(1, cR, 1, 0, 'ng-content', 1), b(2, fR, 2, 3, 'div', 2)),
                2 & e &&
                  (_('ngIf', r.groupHeader && r.groupHeader.template),
                  m(1),
                  _(
                    'ngIf',
                    (r.groupHeader && r.groupHeader.template && r.expanded) || !r.groupHeader || !r.groupHeader.template
                  ),
                  m(1),
                  _('ngIf', r.rowDetail && r.rowDetail.template && r.expanded));
            },
            dependencies: [Ne, Pi, ki],
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      function Od(t, n, e) {
        const r = e(n, t);
        return r > -1 ? t.splice(r, 1) : t.push(n), t;
      }
      const mR = ['*'];
      let _R = (() => {
        class t {
          constructor() {
            (this.activate = new O()), (this.select = new O());
          }
          selectRow(e, r, o) {
            if (!this.selectEnabled) return;
            const i = this.selectionType === Oe.checkbox,
              a = this.selectionType === Oe.multiClick;
            let l = [];
            (l =
              this.selectionType === Oe.multi || i || a
                ? e.shiftKey
                  ? (function gR(t, n, e, r, o) {
                      const i = e < r;
                      for (let s = 0; s < n.length; s++) {
                        const a = n[s],
                          l = s >= r && s <= e,
                          c = s <= r && s >= e;
                        let u = { start: 0, end: 0 };
                        (u = i ? { start: e, end: r } : { start: r, end: e + 1 }),
                          ((i && c) || (!i && l)) && s >= u.start && s <= u.end && t.push(a);
                      }
                      return t;
                    })([], this.rows, r, this.prevIndex, this.getRowSelectedIdx.bind(this))
                  : Od(e.ctrlKey || e.metaKey || a || i ? [...this.selected] : [], o, this.getRowSelectedIdx.bind(this))
                : Od([], o, this.getRowSelectedIdx.bind(this))),
              'function' == typeof this.selectCheck && (l = l.filter(this.selectCheck.bind(this))),
              this.selected.splice(0, this.selected.length),
              this.selected.push(...l),
              (this.prevIndex = r),
              this.select.emit({ selected: l });
          }
          onActivate(e, r) {
            const { type: o, event: i, row: s } = e,
              a = this.selectionType === Oe.checkbox;
            (!a && ('click' === o || 'dblclick' === o)) || (a && 'checkbox' === o)
              ? this.selectRow(i, r, s)
              : 'keydown' === o && (i.keyCode === Te.return ? this.selectRow(i, r, s) : this.onKeyboardFocus(e)),
              this.activate.emit(e);
          }
          onKeyboardFocus(e) {
            const { keyCode: r } = e.event;
            if (r === Te.up || r === Te.down || r === Te.right || r === Te.left) {
              const i = this.selectionType === Oe.cell;
              e.cellElement && i
                ? i && this.focusCell(e.cellElement, e.rowElement, r, e.cellIndex)
                : this.focusRow(e.rowElement, r);
            }
          }
          focusRow(e, r) {
            const o = this.getPrevNextRow(e, r);
            o && o.focus();
          }
          getPrevNextRow(e, r) {
            const o = e.parentElement;
            if (o) {
              let i;
              if (
                (r === Te.up ? (i = o.previousElementSibling) : r === Te.down && (i = o.nextElementSibling),
                i && i.children.length)
              )
                return i.children[0];
            }
          }
          focusCell(e, r, o, i) {
            let s;
            if (o === Te.left) s = e.previousElementSibling;
            else if (o === Te.right) s = e.nextElementSibling;
            else if (o === Te.up || o === Te.down) {
              const a = this.getPrevNextRow(r, o);
              if (a) {
                const l = a.getElementsByClassName('datatable-body-cell');
                l.length && (s = l[i]);
              }
            }
            s && s.focus();
          }
          getRowSelected(e) {
            return this.getRowSelectedIdx(e, this.selected) > -1;
          }
          getRowSelectedIdx(e, r) {
            if (!r || !r.length) return -1;
            const o = this.rowIdentity(e);
            return r.findIndex(i => this.rowIdentity(i) === o);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-selection']],
            inputs: {
              rows: 'rows',
              selected: 'selected',
              selectEnabled: 'selectEnabled',
              selectionType: 'selectionType',
              rowIdentity: 'rowIdentity',
              selectCheck: 'selectCheck'
            },
            outputs: { activate: 'activate', select: 'select' },
            ngContentSelectors: mR,
            decls: 1,
            vars: 0,
            template: function (e, r) {
              1 & e && (ra(), oa(0));
            },
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      function yR(t, n) {
        if ((1 & t && S(0, 'datatable-body-row', 1), 2 & t)) {
          const e = E();
          _('innerWidth', e.innerWidth)('offsetX', e.offsetX)('columns', e._internalColumns)('rowHeight', e.rowHeight)(
            'row',
            e.summaryRow
          )('rowIndex', -1);
        }
      }
      function wR(t) {
        const n = t.filter(e => !!e);
        return !n.length || n.some(e => 'number' != typeof e) ? null : n.reduce((e, r) => e + r);
      }
      function bR(t) {
        return null;
      }
      let vR = (() => {
        class t {
          constructor() {
            this.summaryRow = {};
          }
          ngOnChanges() {
            !this.columns || !this.rows || (this.updateInternalColumns(), this.updateValues());
          }
          updateInternalColumns() {
            this._internalColumns = this.columns.map(e =>
              Object.assign(Object.assign({}, e), { cellTemplate: e.summaryTemplate })
            );
          }
          updateValues() {
            (this.summaryRow = {}),
              this.columns
                .filter(e => !e.summaryTemplate)
                .forEach(e => {
                  const r = this.rows.map(i => i[e.prop]),
                    o = this.getSummaryFunction(e);
                  this.summaryRow[e.prop] = e.pipe ? e.pipe.transform(o(r)) : o(r);
                });
          }
          getSummaryFunction(e) {
            return void 0 === e.summaryFunc ? wR : null === e.summaryFunc ? bR : e.summaryFunc;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-summary-row']],
            hostAttrs: [1, 'datatable-summary-row'],
            inputs: {
              rows: 'rows',
              columns: 'columns',
              rowHeight: 'rowHeight',
              offsetX: 'offsetX',
              innerWidth: 'innerWidth'
            },
            features: [ln],
            decls: 1,
            vars: 1,
            consts: [
              ['tabindex', '-1', 3, 'innerWidth', 'offsetX', 'columns', 'rowHeight', 'row', 'rowIndex', 4, 'ngIf'],
              ['tabindex', '-1', 3, 'innerWidth', 'offsetX', 'columns', 'rowHeight', 'row', 'rowIndex']
            ],
            template: function (e, r) {
              1 & e && b(0, yR, 1, 6, 'datatable-body-row', 0), 2 & e && _('ngIf', r.summaryRow && r._internalColumns);
            },
            dependencies: [Ne, Bw],
            encapsulation: 2
          })),
          t
        );
      })();
      function CR(t, n) {
        1 & t && S(0, 'datatable-progress');
      }
      function DR(t, n) {
        if ((1 & t && S(0, 'datatable-summary-row', 9), 2 & t)) {
          const e = E(2);
          _('rowHeight', e.summaryHeight)('offsetX', e.offsetX)('innerWidth', e.innerWidth)('rows', e.rows)(
            'columns',
            e.columns
          );
        }
      }
      function TR(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'datatable-body-row', 13),
            v('treeAction', function () {
              Y(e);
              const o = E().$implicit;
              return Z(E(2).onTreeAction(o));
            })('activate', function (o) {
              Y(e);
              const i = E().index,
                s = E(2);
              return Z(Qn(2).onActivate(o, s.indexes.first + i));
            }),
            p();
        }
        if (2 & t) {
          const e = E().$implicit,
            r = E(2);
          _('isSelected', Qn(2).getRowSelected(e))('innerWidth', r.innerWidth)('offsetX', r.offsetX)(
            'columns',
            r.columns
          )('rowHeight', r.getRowHeight(e))('row', e)('rowIndex', r.getRowIndex(e))('expanded', r.getRowExpanded(e))(
            'rowClass',
            r.rowClass
          )('displayCheck', r.displayCheck)('treeStatus', e && e.treeStatus);
        }
      }
      function SR(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'datatable-body-row', 15),
            v('activate', function (o) {
              const s = Y(e).index;
              return E(4), Z(Qn(2).onActivate(o, s));
            }),
            p();
        }
        if (2 & t) {
          const e = n.$implicit,
            r = E(2).$implicit,
            o = E(2);
          _('isSelected', Qn(2).getRowSelected(e))('innerWidth', o.innerWidth)('offsetX', o.offsetX)(
            'columns',
            o.columns
          )('rowHeight', o.getRowHeight(e))('row', e)('group', r.value)('rowIndex', o.getRowIndex(e))(
            'expanded',
            o.getRowExpanded(e)
          )('rowClass', o.rowClass);
        }
      }
      function xR(t, n) {
        if ((1 & t && b(0, SR, 1, 10, 'datatable-body-row', 14), 2 & t)) {
          const e = E().$implicit,
            r = E(2);
          _('ngForOf', e.value)('ngForTrackBy', r.rowTrackingFn);
        }
      }
      function IR(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'datatable-row-wrapper', 10),
            v('rowContextmenu', function (o) {
              return Y(e), Z(E(2).rowContextmenu.emit(o));
            }),
            b(1, TR, 1, 11, 'datatable-body-row', 11),
            b(2, xR, 1, 2, 'ng-template', null, 12, Yn),
            p();
        }
        if (2 & t) {
          const e = n.$implicit,
            r = n.index,
            o = Qn(3),
            i = E(2);
          _('groupedRows', i.groupedRows)('innerWidth', i.innerWidth)('ngStyle', i.getRowsStyles(e))(
            'rowDetail',
            i.rowDetail
          )('groupHeader', i.groupHeader)('offsetX', i.offsetX)('detailRowHeight', i.getDetailRowHeight(e && e[r], r))(
            'row',
            e
          )('expanded', i.getRowExpanded(e))('rowIndex', i.getRowIndex(e && e[r])),
            m(1),
            _('ngIf', !i.groupedRows)('ngIfElse', o);
        }
      }
      function ER(t, n) {
        if ((1 & t && S(0, 'datatable-summary-row', 16), 2 & t)) {
          const e = E(2);
          _('ngStyle', e.getBottomSummaryRowStyles())('rowHeight', e.summaryHeight)('offsetX', e.offsetX)(
            'innerWidth',
            e.innerWidth
          )('rows', e.rows)('columns', e.columns);
        }
      }
      function MR(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'datatable-scroller', 5),
            v('scroll', function (o) {
              return Y(e), Z(E().onBodyScroll(o));
            }),
            b(1, DR, 1, 5, 'datatable-summary-row', 6),
            b(2, IR, 4, 12, 'datatable-row-wrapper', 7),
            b(3, ER, 1, 6, 'datatable-summary-row', 8),
            p();
        }
        if (2 & t) {
          const e = E();
          _('scrollbarV', e.scrollbarV)('scrollbarH', e.scrollbarH)('scrollHeight', e.scrollHeight)(
            'scrollWidth',
            null == e.columnGroupWidths ? null : e.columnGroupWidths.total
          ),
            m(1),
            _('ngIf', e.summaryRow && 'top' === e.summaryPosition),
            m(1),
            _('ngForOf', e.temp)('ngForTrackBy', e.rowTrackingFn),
            m(1),
            _('ngIf', e.summaryRow && 'bottom' === e.summaryPosition);
        }
      }
      function AR(t, n) {
        1 & t && S(0, 'div', 17), 2 & t && _('innerHTML', E().emptyMessage, mr);
      }
      let jw = (() => {
        class t {
          constructor(e) {
            (this.cd = e),
              (this.selected = []),
              (this.scroll = new O()),
              (this.page = new O()),
              (this.activate = new O()),
              (this.select = new O()),
              (this.detailToggle = new O()),
              (this.rowContextmenu = new O(!1)),
              (this.treeAction = new O()),
              (this.rowHeightsCache = new LA()),
              (this.temp = []),
              (this.offsetY = 0),
              (this.indexes = {}),
              (this.rowIndexes = new WeakMap()),
              (this.rowExpansions = []),
              (this.getDetailRowHeight = (r, o) => {
                if (!this.rowDetail) return 0;
                const i = this.rowDetail.rowHeight;
                return 'function' == typeof i ? i(r, o) : i;
              }),
              (this.rowTrackingFn = (r, o) => {
                const i = this.getRowIndex(o);
                return this.trackByProp ? o[this.trackByProp] : i;
              });
          }
          set pageSize(e) {
            (this._pageSize = e), this.recalcLayout();
          }
          get pageSize() {
            return this._pageSize;
          }
          set rows(e) {
            (this._rows = e), this.recalcLayout();
          }
          get rows() {
            return this._rows;
          }
          set columns(e) {
            this._columns = e;
            const r = xr(e);
            this.columnGroupWidths = Bi(r, e);
          }
          get columns() {
            return this._columns;
          }
          set offset(e) {
            (this._offset = e), (!this.scrollbarV || (this.scrollbarV && !this.virtualization)) && this.recalcLayout();
          }
          get offset() {
            return this._offset;
          }
          set rowCount(e) {
            (this._rowCount = e), this.recalcLayout();
          }
          get rowCount() {
            return this._rowCount;
          }
          get bodyWidth() {
            return this.scrollbarH ? this.innerWidth + 'px' : '100%';
          }
          set bodyHeight(e) {
            (this._bodyHeight = this.scrollbarV ? e + 'px' : 'auto'), this.recalcLayout();
          }
          get bodyHeight() {
            return this._bodyHeight;
          }
          get selectEnabled() {
            return !!this.selectionType;
          }
          get scrollHeight() {
            if (this.scrollbarV && this.virtualization && this.rowCount)
              return this.rowHeightsCache.query(this.rowCount - 1);
          }
          ngOnInit() {
            this.rowDetail &&
              (this.listener = this.rowDetail.toggle.subscribe(({ type: e, value: r }) => {
                'row' === e && this.toggleRowExpansion(r),
                  'all' === e && this.toggleAllRows(r),
                  this.updateIndexes(),
                  this.updateRows(),
                  this.cd.markForCheck();
              })),
              this.groupHeader &&
                (this.listener = this.groupHeader.toggle.subscribe(({ type: e, value: r }) => {
                  'group' === e && this.toggleRowExpansion(r),
                    'all' === e && this.toggleAllRows(r),
                    this.updateIndexes(),
                    this.updateRows(),
                    this.cd.markForCheck();
                }));
          }
          ngOnDestroy() {
            (this.rowDetail || this.groupHeader) && this.listener.unsubscribe();
          }
          updateOffsetY(e) {
            this.scroller &&
              (this.scrollbarV && this.virtualization && e
                ? (e = this.rowHeightsCache.query(this.pageSize * e - 1))
                : this.scrollbarV && !this.virtualization && (e = 0),
              this.scroller.setOffset(e || 0));
          }
          onBodyScroll(e) {
            const r = e.scrollYPos,
              o = e.scrollXPos;
            (this.offsetY !== r || this.offsetX !== o) && this.scroll.emit({ offsetY: r, offsetX: o }),
              (this.offsetY = r),
              (this.offsetX = o),
              this.updateIndexes(),
              this.updatePage(e.direction),
              this.updateRows();
          }
          updatePage(e) {
            let r = this.indexes.first / this.pageSize;
            'up' === e ? (r = Math.ceil(r)) : 'down' === e && (r = Math.floor(r)),
              void 0 !== e && !isNaN(r) && this.page.emit({ offset: r });
          }
          updateRows() {
            const { first: e, last: r } = this.indexes;
            let o = e,
              i = 0;
            const s = [];
            if (this.groupedRows) {
              let a = 3;
              for (
                1 === this.groupedRows.length && (a = this.groupedRows[0].value.length);
                o < r && o < this.groupedRows.length;

              ) {
                const l = this.groupedRows[o];
                this.rowIndexes.set(l, o),
                  l.value &&
                    l.value.forEach((c, u) => {
                      this.rowIndexes.set(c, `${o}-${u}`);
                    }),
                  (s[i] = l),
                  i++,
                  o++;
              }
            } else
              for (; o < r && o < this.rowCount; ) {
                const a = this.rows[o];
                a && (this.rowIndexes.set(a, o), (s[i] = a)), i++, o++;
              }
            this.temp = s;
          }
          getRowHeight(e) {
            return 'function' == typeof this.rowHeight ? this.rowHeight(e) : this.rowHeight;
          }
          getGroupHeight(e) {
            let r = 0;
            if (e.value) for (let o = 0; o < e.value.length; o++) r += this.getRowAndDetailHeight(e.value[o]);
            return r;
          }
          getRowAndDetailHeight(e) {
            let r = this.getRowHeight(e);
            return this.getRowExpanded(e) && (r += this.getDetailRowHeight(e)), r;
          }
          getRowsStyles(e) {
            const r = {};
            if (
              (this.groupedRows && (r.width = this.columnGroupWidths.total), this.scrollbarV && this.virtualization)
            ) {
              let o = 0;
              if (this.groupedRows) {
                const s = e[e.length - 1];
                o = s ? this.getRowIndex(s) : 0;
              } else o = this.getRowIndex(e);
              er(r, 0, this.rowHeightsCache.query(o - 1));
            }
            return r;
          }
          getBottomSummaryRowStyles() {
            if (!this.scrollbarV || !this.rows || !this.rows.length) return null;
            const e = { position: 'absolute' };
            return er(e, 0, this.rowHeightsCache.query(this.rows.length - 1)), e;
          }
          hideIndicator() {
            setTimeout(() => (this.loadingIndicator = !1), 500);
          }
          updateIndexes() {
            let e = 0,
              r = 0;
            if (this.scrollbarV)
              if (this.virtualization) {
                const o = parseInt(this.bodyHeight, 0);
                (e = this.rowHeightsCache.getRowIndex(this.offsetY)),
                  (r = this.rowHeightsCache.getRowIndex(o + this.offsetY) + 1);
              } else (e = 0), (r = this.rowCount);
            else
              this.externalPaging || (e = Math.max(this.offset * this.pageSize, 0)),
                (r = Math.min(e + this.pageSize, this.rowCount));
            this.indexes = { first: e, last: r };
          }
          refreshRowHeightCache() {
            if (
              this.scrollbarV &&
              (!this.scrollbarV || this.virtualization) &&
              (this.rowHeightsCache.clearCache(), this.rows && this.rows.length)
            ) {
              const e = new Set();
              for (const r of this.rows) this.getRowExpanded(r) && e.add(r);
              this.rowHeightsCache.initCache({
                rows: this.rows,
                rowHeight: this.rowHeight,
                detailRowHeight: this.getDetailRowHeight,
                externalVirtual: this.scrollbarV && this.externalPaging,
                rowCount: this.rowCount,
                rowIndexes: this.rowIndexes,
                rowExpansions: e
              });
            }
          }
          getAdjustedViewPortIndex() {
            const e = this.indexes.first;
            return this.scrollbarV && this.virtualization && this.rowHeightsCache.query(e - 1) <= this.offsetY
              ? e - 1
              : e;
          }
          toggleRowExpansion(e) {
            const r = this.getAdjustedViewPortIndex(),
              o = this.getRowExpandedIdx(e, this.rowExpansions),
              i = o > -1;
            if (this.scrollbarV && this.virtualization) {
              const s = this.getDetailRowHeight(e) * (i ? -1 : 1),
                a = this.getRowIndex(e);
              this.rowHeightsCache.update(a, s);
            }
            i ? this.rowExpansions.splice(o, 1) : this.rowExpansions.push(e),
              this.detailToggle.emit({ rows: [e], currentIndex: r });
          }
          toggleAllRows(e) {
            this.rowExpansions = [];
            const r = this.getAdjustedViewPortIndex();
            if (e) for (const o of this.rows) this.rowExpansions.push(o);
            this.scrollbarV && this.recalcLayout(), this.detailToggle.emit({ rows: this.rows, currentIndex: r });
          }
          recalcLayout() {
            this.refreshRowHeightCache(), this.updateIndexes(), this.updateRows();
          }
          columnTrackingFn(e, r) {
            return r.$$id;
          }
          stylesByGroup(e) {
            const r = this.columnGroupWidths,
              o = this.offsetX,
              i = { width: `${r[e]}px` };
            if ('left' === e) er(i, o, 0);
            else if ('right' === e) {
              const s = parseInt(this.innerWidth + '', 0);
              er(i, -1 * (r.total - s - o), 0);
            }
            return i;
          }
          getRowExpanded(e) {
            if (0 === this.rowExpansions.length && this.groupExpansionDefault)
              for (const r of this.groupedRows) this.rowExpansions.push(r);
            return this.getRowExpandedIdx(e, this.rowExpansions) > -1;
          }
          getRowExpandedIdx(e, r) {
            if (!r || !r.length) return -1;
            const o = this.rowIdentity(e);
            return r.findIndex(i => this.rowIdentity(i) === o);
          }
          getRowIndex(e) {
            return this.rowIndexes.get(e) || 0;
          }
          onTreeAction(e) {
            this.treeAction.emit({ row: e });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I($t));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-body']],
            viewQuery: function (e, r) {
              if ((1 & e && Pt(Nw, 5), 2 & e)) {
                let o;
                we((o = be())) && (r.scroller = o.first);
              }
            },
            hostAttrs: [1, 'datatable-body'],
            hostVars: 4,
            hostBindings: function (e, r) {
              2 & e && kt('width', r.bodyWidth)('height', r.bodyHeight);
            },
            inputs: {
              scrollbarV: 'scrollbarV',
              scrollbarH: 'scrollbarH',
              loadingIndicator: 'loadingIndicator',
              externalPaging: 'externalPaging',
              rowHeight: 'rowHeight',
              offsetX: 'offsetX',
              emptyMessage: 'emptyMessage',
              selectionType: 'selectionType',
              selected: 'selected',
              rowIdentity: 'rowIdentity',
              rowDetail: 'rowDetail',
              groupHeader: 'groupHeader',
              selectCheck: 'selectCheck',
              displayCheck: 'displayCheck',
              trackByProp: 'trackByProp',
              rowClass: 'rowClass',
              groupedRows: 'groupedRows',
              groupExpansionDefault: 'groupExpansionDefault',
              innerWidth: 'innerWidth',
              groupRowsBy: 'groupRowsBy',
              virtualization: 'virtualization',
              summaryRow: 'summaryRow',
              summaryPosition: 'summaryPosition',
              summaryHeight: 'summaryHeight',
              pageSize: 'pageSize',
              rows: 'rows',
              columns: 'columns',
              offset: 'offset',
              rowCount: 'rowCount',
              bodyHeight: 'bodyHeight'
            },
            outputs: {
              scroll: 'scroll',
              page: 'page',
              activate: 'activate',
              select: 'select',
              detailToggle: 'detailToggle',
              rowContextmenu: 'rowContextmenu',
              treeAction: 'treeAction'
            },
            decls: 5,
            vars: 9,
            consts: [
              [4, 'ngIf'],
              [
                3,
                'selected',
                'rows',
                'selectCheck',
                'selectEnabled',
                'selectionType',
                'rowIdentity',
                'select',
                'activate'
              ],
              ['selector', ''],
              [3, 'scrollbarV', 'scrollbarH', 'scrollHeight', 'scrollWidth', 'scroll', 4, 'ngIf'],
              ['class', 'empty-row', 3, 'innerHTML', 4, 'ngIf'],
              [3, 'scrollbarV', 'scrollbarH', 'scrollHeight', 'scrollWidth', 'scroll'],
              [3, 'rowHeight', 'offsetX', 'innerWidth', 'rows', 'columns', 4, 'ngIf'],
              [
                3,
                'groupedRows',
                'innerWidth',
                'ngStyle',
                'rowDetail',
                'groupHeader',
                'offsetX',
                'detailRowHeight',
                'row',
                'expanded',
                'rowIndex',
                'rowContextmenu',
                4,
                'ngFor',
                'ngForOf',
                'ngForTrackBy'
              ],
              ['role', 'row', 3, 'ngStyle', 'rowHeight', 'offsetX', 'innerWidth', 'rows', 'columns', 4, 'ngIf'],
              [3, 'rowHeight', 'offsetX', 'innerWidth', 'rows', 'columns'],
              [
                3,
                'groupedRows',
                'innerWidth',
                'ngStyle',
                'rowDetail',
                'groupHeader',
                'offsetX',
                'detailRowHeight',
                'row',
                'expanded',
                'rowIndex',
                'rowContextmenu'
              ],
              [
                'role',
                'row',
                'tabindex',
                '-1',
                3,
                'isSelected',
                'innerWidth',
                'offsetX',
                'columns',
                'rowHeight',
                'row',
                'rowIndex',
                'expanded',
                'rowClass',
                'displayCheck',
                'treeStatus',
                'treeAction',
                'activate',
                4,
                'ngIf',
                'ngIfElse'
              ],
              ['groupedRowsTemplate', ''],
              [
                'role',
                'row',
                'tabindex',
                '-1',
                3,
                'isSelected',
                'innerWidth',
                'offsetX',
                'columns',
                'rowHeight',
                'row',
                'rowIndex',
                'expanded',
                'rowClass',
                'displayCheck',
                'treeStatus',
                'treeAction',
                'activate'
              ],
              [
                'role',
                'row',
                'tabindex',
                '-1',
                3,
                'isSelected',
                'innerWidth',
                'offsetX',
                'columns',
                'rowHeight',
                'row',
                'group',
                'rowIndex',
                'expanded',
                'rowClass',
                'activate',
                4,
                'ngFor',
                'ngForOf',
                'ngForTrackBy'
              ],
              [
                'role',
                'row',
                'tabindex',
                '-1',
                3,
                'isSelected',
                'innerWidth',
                'offsetX',
                'columns',
                'rowHeight',
                'row',
                'group',
                'rowIndex',
                'expanded',
                'rowClass',
                'activate'
              ],
              ['role', 'row', 3, 'ngStyle', 'rowHeight', 'offsetX', 'innerWidth', 'rows', 'columns'],
              [1, 'empty-row', 3, 'innerHTML']
            ],
            template: function (e, r) {
              1 & e &&
                (b(0, CR, 1, 0, 'datatable-progress', 0),
                f(1, 'datatable-selection', 1, 2),
                v('select', function (i) {
                  return r.select.emit(i);
                })('activate', function (i) {
                  return r.activate.emit(i);
                }),
                b(3, MR, 4, 8, 'datatable-scroller', 3),
                b(4, AR, 1, 1, 'div', 4),
                p()),
                2 & e &&
                  (_('ngIf', r.loadingIndicator),
                  m(1),
                  _('selected', r.selected)('rows', r.rows)('selectCheck', r.selectCheck)(
                    'selectEnabled',
                    r.selectEnabled
                  )('selectionType', r.selectionType)('rowIdentity', r.rowIdentity),
                  m(2),
                  _('ngIf', null == r.rows ? null : r.rows.length),
                  m(1),
                  _('ngIf', !((null != r.rows && r.rows.length) || r.loadingIndicator)));
            },
            dependencies: [Ct, Ne, ki, Nw, UA, Bw, pR, _R, vR],
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      const { isArray: RR } = Array;
      function Vw(t) {
        return ie(n =>
          (function kR(t, n) {
            return RR(n) ? t(...n) : t(n);
          })(t, n)
        );
      }
      const PR = ['addListener', 'removeListener'],
        FR = ['addEventListener', 'removeEventListener'],
        NR = ['on', 'off'];
      function tr(t, n, e, r) {
        if ((le(e) && ((r = e), (e = void 0)), r)) return tr(t, n, e).pipe(Vw(r));
        const [o, i] = (function LR(t) {
          return le(t.addEventListener) && le(t.removeEventListener);
        })(t)
          ? FR.map(s => a => t[s](n, a, e))
          : (function OR(t) {
              return le(t.addListener) && le(t.removeListener);
            })(t)
          ? PR.map($w(t, n))
          : (function HR(t) {
              return le(t.on) && le(t.off);
            })(t)
          ? NR.map($w(t, n))
          : [];
        if (!o && vl(t)) return Ue(s => tr(s, n, e))(Nt(t));
        if (!o) throw new TypeError('Invalid event target');
        return new Ie(s => {
          const a = (...l) => s.next(1 < l.length ? l : l[0]);
          return o(a), () => i(a);
        });
      }
      function $w(t, n) {
        return e => r => t[e](n, r);
      }
      function Hd(t) {
        return He((n, e) => {
          Nt(t).subscribe(Le(e, () => e.complete(), os)), !e.closed && n.subscribe(e);
        });
      }
      let Uw = (() => {
          class t {
            constructor(e) {
              (this.dragX = !0),
                (this.dragY = !0),
                (this.dragStart = new O()),
                (this.dragging = new O()),
                (this.dragEnd = new O()),
                (this.isDragging = !1),
                (this.element = e.nativeElement);
            }
            ngOnChanges(e) {
              e.dragEventTarget &&
                e.dragEventTarget.currentValue &&
                this.dragModel.dragging &&
                this.onMousedown(e.dragEventTarget.currentValue);
            }
            ngOnDestroy() {
              this._destroySubscription();
            }
            onMouseup(e) {
              !this.isDragging ||
                ((this.isDragging = !1),
                this.element.classList.remove('dragging'),
                this.subscription &&
                  (this._destroySubscription(),
                  this.dragEnd.emit({ event: e, element: this.element, model: this.dragModel })));
            }
            onMousedown(e) {
              if (e.target.classList.contains('draggable') && (this.dragX || this.dragY)) {
                e.preventDefault(), (this.isDragging = !0);
                const o = { x: e.clientX, y: e.clientY },
                  i = tr(document, 'mouseup');
                this.subscription = i.subscribe(a => this.onMouseup(a));
                const s = tr(document, 'mousemove')
                  .pipe(Hd(i))
                  .subscribe(a => this.move(a, o));
                this.subscription.add(s),
                  this.dragStart.emit({ event: e, element: this.element, model: this.dragModel });
              }
            }
            move(e, r) {
              if (!this.isDragging) return;
              const i = e.clientY - r.y;
              this.dragX && (this.element.style.left = e.clientX - r.x + 'px'),
                this.dragY && (this.element.style.top = `${i}px`),
                this.element.classList.add('dragging'),
                this.dragging.emit({ event: e, element: this.element, model: this.dragModel });
            }
            _destroySubscription() {
              this.subscription && (this.subscription.unsubscribe(), (this.subscription = void 0));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(nt));
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['', 'draggable', '']],
              inputs: { dragEventTarget: 'dragEventTarget', dragModel: 'dragModel', dragX: 'dragX', dragY: 'dragY' },
              outputs: { dragStart: 'dragStart', dragging: 'dragging', dragEnd: 'dragEnd' },
              features: [ln]
            })),
            t
          );
        })(),
        BR = (() => {
          class t {
            constructor(e, r) {
              (this.renderer = r),
                (this.resizeEnabled = !0),
                (this.resize = new O()),
                (this.resizing = !1),
                (this.element = e.nativeElement);
            }
            ngAfterViewInit() {
              const e = this.renderer;
              (this.resizeHandle = e.createElement('span')),
                e.addClass(this.resizeHandle, this.resizeEnabled ? 'resize-handle' : 'resize-handle--not-resizable'),
                e.appendChild(this.element, this.resizeHandle);
            }
            ngOnDestroy() {
              this._destroySubscription(),
                this.renderer.destroyNode
                  ? this.renderer.destroyNode(this.resizeHandle)
                  : this.resizeHandle &&
                    this.renderer.removeChild(this.renderer.parentNode(this.resizeHandle), this.resizeHandle);
            }
            onMouseup() {
              (this.resizing = !1),
                this.subscription &&
                  !this.subscription.closed &&
                  (this._destroySubscription(), this.resize.emit(this.element.clientWidth));
            }
            onMousedown(e) {
              const r = e.target.classList.contains('resize-handle'),
                o = this.element.clientWidth,
                i = e.screenX;
              if (r) {
                e.stopPropagation(), (this.resizing = !0);
                const s = tr(document, 'mouseup');
                this.subscription = s.subscribe(l => this.onMouseup());
                const a = tr(document, 'mousemove')
                  .pipe(Hd(s))
                  .subscribe(l => this.move(l, o, i));
                this.subscription.add(a);
              }
            }
            move(e, r, o) {
              const s = r + (e.screenX - o);
              (!this.minWidth || s >= this.minWidth) &&
                (!this.maxWidth || s <= this.maxWidth) &&
                (this.element.style.width = `${s}px`);
            }
            _destroySubscription() {
              this.subscription && (this.subscription.unsubscribe(), (this.subscription = void 0));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(nt), I(ro));
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['', 'resizeable', '']],
              hostVars: 2,
              hostBindings: function (e, r) {
                1 & e &&
                  v('mousedown', function (i) {
                    return r.onMousedown(i);
                  }),
                  2 & e && ht('resizeable', r.resizeEnabled);
              },
              inputs: { resizeEnabled: 'resizeEnabled', minWidth: 'minWidth', maxWidth: 'maxWidth' },
              outputs: { resize: 'resize' }
            })),
            t
          );
        })(),
        jR = (() => {
          class t {
            constructor(e, r) {
              (this.document = r),
                (this.reorder = new O()),
                (this.targetChanged = new O()),
                (this.differ = e.find({}).create());
            }
            ngAfterContentInit() {
              this.updateSubscriptions(), this.draggables.changes.subscribe(this.updateSubscriptions.bind(this));
            }
            ngOnDestroy() {
              this.draggables.forEach(e => {
                e.dragStart.unsubscribe(), e.dragging.unsubscribe(), e.dragEnd.unsubscribe();
              });
            }
            updateSubscriptions() {
              const e = this.differ.diff(this.createMapDiffs());
              if (e) {
                const r = ({ currentValue: i, previousValue: s }) => {
                    o({ previousValue: s }),
                      i &&
                        (i.dragStart.subscribe(this.onDragStart.bind(this)),
                        i.dragging.subscribe(this.onDragging.bind(this)),
                        i.dragEnd.subscribe(this.onDragEnd.bind(this)));
                  },
                  o = ({ previousValue: i }) => {
                    i && (i.dragStart.unsubscribe(), i.dragging.unsubscribe(), i.dragEnd.unsubscribe());
                  };
                e.forEachAddedItem(r), e.forEachRemovedItem(o);
              }
            }
            onDragStart() {
              this.positions = {};
              let e = 0;
              for (const r of this.draggables.toArray()) {
                const o = r.element,
                  i = parseInt(o.offsetLeft.toString(), 0);
                this.positions[r.dragModel.prop] = {
                  left: i,
                  right: i + parseInt(o.offsetWidth.toString(), 0),
                  index: e++,
                  element: o
                };
              }
            }
            onDragging({ model: r, event: o }) {
              const i = this.positions[r.prop],
                s = this.isTarget(r, o);
              s
                ? this.lastDraggingIndex !== s.i &&
                  (this.targetChanged.emit({ prevIndex: this.lastDraggingIndex, newIndex: s.i, initialIndex: i.index }),
                  (this.lastDraggingIndex = s.i))
                : this.lastDraggingIndex !== i.index &&
                  (this.targetChanged.emit({ prevIndex: this.lastDraggingIndex, initialIndex: i.index }),
                  (this.lastDraggingIndex = i.index));
            }
            onDragEnd({ element: e, model: r, event: o }) {
              const i = this.positions[r.prop],
                s = this.isTarget(r, o);
              s && this.reorder.emit({ prevIndex: i.index, newIndex: s.i, model: r }),
                (this.lastDraggingIndex = void 0),
                (e.style.left = 'auto');
            }
            isTarget(e, r) {
              let o = 0;
              const a = this.document.elementsFromPoint(r.x || r.clientX, r.y || r.clientY);
              for (const l in this.positions) {
                const c = this.positions[l];
                if (e.prop !== l && a.find(u => u === c.element)) return { pos: c, i: o };
                o++;
              }
            }
            createMapDiffs() {
              return this.draggables.toArray().reduce((e, r) => ((e[r.dragModel.$$id] = r), e), {});
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(Fn), I(it));
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['', 'orderable', '']],
              contentQueries: function (e, r, o) {
                if ((1 & e && bt(o, Uw, 5), 2 & e)) {
                  let i;
                  we((i = be())) && (r.draggables = i);
                }
              },
              outputs: { reorder: 'reorder', targetChanged: 'targetChanged' }
            })),
            t
          );
        })(),
        VR = (() => {
          class t {
            constructor() {
              (this.pressEnabled = !0),
                (this.duration = 500),
                (this.longPressStart = new O()),
                (this.longPressing = new O()),
                (this.longPressEnd = new O()),
                (this.mouseX = 0),
                (this.mouseY = 0);
            }
            get press() {
              return this.pressing;
            }
            get isLongPress() {
              return this.isLongPressing;
            }
            onMouseDown(e) {
              if (1 !== e.which || !this.pressEnabled || e.target.classList.contains('resize-handle')) return;
              (this.mouseX = e.clientX), (this.mouseY = e.clientY), (this.pressing = !0), (this.isLongPressing = !1);
              const o = tr(document, 'mouseup');
              (this.subscription = o.subscribe(i => this.onMouseup())),
                (this.timeout = setTimeout(() => {
                  (this.isLongPressing = !0),
                    this.longPressStart.emit({ event: e, model: this.pressModel }),
                    this.subscription.add(
                      tr(document, 'mousemove')
                        .pipe(Hd(o))
                        .subscribe(i => this.onMouseMove(i))
                    ),
                    this.loop(e);
                }, this.duration)),
                this.loop(e);
            }
            onMouseMove(e) {
              if (this.pressing && !this.isLongPressing) {
                const r = Math.abs(e.clientX - this.mouseX) > 10,
                  o = Math.abs(e.clientY - this.mouseY) > 10;
                (r || o) && this.endPress();
              }
            }
            loop(e) {
              this.isLongPressing &&
                (this.timeout = setTimeout(() => {
                  this.longPressing.emit({ event: e, model: this.pressModel }), this.loop(e);
                }, 50));
            }
            endPress() {
              clearTimeout(this.timeout),
                (this.isLongPressing = !1),
                (this.pressing = !1),
                this._destroySubscription(),
                this.longPressEnd.emit({ model: this.pressModel });
            }
            onMouseup() {
              this.endPress();
            }
            ngOnDestroy() {
              this._destroySubscription();
            }
            _destroySubscription() {
              this.subscription && (this.subscription.unsubscribe(), (this.subscription = void 0));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = de({
              type: t,
              selectors: [['', 'long-press', '']],
              hostVars: 4,
              hostBindings: function (e, r) {
                1 & e &&
                  v('mousedown', function (i) {
                    return r.onMouseDown(i);
                  }),
                  2 & e && ht('press', r.press)('longpress', r.isLongPress);
              },
              inputs: { pressEnabled: 'pressEnabled', pressModel: 'pressModel', duration: 'duration' },
              outputs: { longPressStart: 'longPressStart', longPressing: 'longPressing', longPressEnd: 'longPressEnd' }
            })),
            t
          );
        })();
      function UR(t, n) {
        if ((null == t && (t = 0), null == n && (n = 0), t instanceof Date && n instanceof Date)) {
          if (t < n) return -1;
          if (t > n) return 1;
        } else if (isNaN(parseFloat(t)) || !isFinite(t) || isNaN(parseFloat(n)) || !isFinite(n)) {
          if (((t = String(t)), (n = String(n)), t.toLowerCase() < n.toLowerCase())) return -1;
          if (t.toLowerCase() > n.toLowerCase()) return 1;
        } else {
          if (parseFloat(t) < parseFloat(n)) return -1;
          if (parseFloat(t) > parseFloat(n)) return 1;
        }
        return 0;
      }
      function GR(t, n) {}
      function WR(t, n) {
        if ((1 & t && b(0, GR, 0, 0, 'ng-template', 5), 2 & t)) {
          const e = E();
          _('ngTemplateOutlet', e.targetMarkerTemplate)('ngTemplateOutletContext', e.targetMarkerContext);
        }
      }
      function qR(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'label', 6)(1, 'input', 7),
            v('change', function () {
              Y(e);
              const o = E();
              return Z(o.select.emit(!o.allRowsSelected));
            }),
            p()();
        }
        if (2 & t) {
          const e = E();
          m(1), _('checked', e.allRowsSelected);
        }
      }
      function QR(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'span', 8)(1, 'span', 9),
            v('click', function () {
              return Y(e), Z(E().onSort());
            }),
            p()();
        }
        if (2 & t) {
          const e = E();
          m(1), _('innerHTML', e.name, mr);
        }
      }
      function XR(t, n) {}
      function YR(t, n) {
        if ((1 & t && b(0, XR, 0, 0, 'ng-template', 5), 2 & t)) {
          const e = E();
          _('ngTemplateOutlet', e.column.headerTemplate)('ngTemplateOutletContext', e.cellContext);
        }
      }
      let ZR = (() => {
        class t {
          constructor(e) {
            (this.cd = e),
              (this.sort = new O()),
              (this.select = new O()),
              (this.columnContextmenu = new O(!1)),
              (this.sortFn = this.onSort.bind(this)),
              (this.selectFn = this.select.emit.bind(this.select)),
              (this.cellContext = {
                column: this.column,
                sortDir: this.sortDir,
                sortFn: this.sortFn,
                allRowsSelected: this.allRowsSelected,
                selectFn: this.selectFn
              });
          }
          set allRowsSelected(e) {
            (this._allRowsSelected = e), (this.cellContext.allRowsSelected = e);
          }
          get allRowsSelected() {
            return this._allRowsSelected;
          }
          set column(e) {
            (this._column = e), (this.cellContext.column = e), this.cd.markForCheck();
          }
          get column() {
            return this._column;
          }
          set sorts(e) {
            (this._sorts = e),
              (this.sortDir = this.calcSortDir(e)),
              (this.cellContext.sortDir = this.sortDir),
              (this.sortClass = this.calcSortClass(this.sortDir)),
              this.cd.markForCheck();
          }
          get sorts() {
            return this._sorts;
          }
          get columnCssClasses() {
            let e = 'datatable-header-cell';
            if (
              (this.column.sortable && (e += ' sortable'),
              this.column.resizeable && (e += ' resizeable'),
              this.column.headerClass)
            )
              if ('string' == typeof this.column.headerClass) e += ' ' + this.column.headerClass;
              else if ('function' == typeof this.column.headerClass) {
                const o = this.column.headerClass({ column: this.column });
                if ('string' == typeof o) e += o;
                else if ('object' == typeof o) {
                  const i = Object.keys(o);
                  for (const s of i) !0 === o[s] && (e += ` ${s}`);
                }
              }
            const r = this.sortDir;
            return r && (e += ` sort-active sort-${r}`), e;
          }
          get name() {
            return void 0 === this.column.headerTemplate ? this.column.name : void 0;
          }
          get minWidth() {
            return this.column.minWidth;
          }
          get maxWidth() {
            return this.column.maxWidth;
          }
          get width() {
            return this.column.width;
          }
          get isCheckboxable() {
            return this.column.checkboxable && this.column.headerCheckboxable && this.selectionType === Oe.checkbox;
          }
          onContextmenu(e) {
            this.columnContextmenu.emit({ event: e, column: this.column });
          }
          ngOnInit() {
            this.sortClass = this.calcSortClass(this.sortDir);
          }
          calcSortDir(e) {
            if (e && this.column) {
              const r = e.find(o => o.prop === this.column.prop);
              if (r) return r.dir;
            }
          }
          onSort() {
            if (!this.column.sortable) return;
            const e = (function $R(t, n) {
              return t === Sr.single
                ? n === mt.asc
                  ? mt.desc
                  : mt.asc
                : n
                ? n === mt.asc
                  ? mt.desc
                  : void 0
                : mt.asc;
            })(this.sortType, this.sortDir);
            this.sort.emit({ column: this.column, prevValue: this.sortDir, newValue: e });
          }
          calcSortClass(e) {
            if (this.cellContext.column.sortable)
              return e === mt.asc
                ? `sort-btn sort-asc ${this.sortAscendingIcon}`
                : e === mt.desc
                ? `sort-btn sort-desc ${this.sortDescendingIcon}`
                : `sort-btn ${this.sortUnsetIcon}`;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I($t));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-header-cell']],
            hostAttrs: [1, 'datatable-header-cell'],
            hostVars: 11,
            hostBindings: function (e, r) {
              1 & e &&
                v('contextmenu', function (i) {
                  return r.onContextmenu(i);
                }),
                2 & e &&
                  (uo('title', r.name),
                  pn(r.columnCssClasses),
                  kt('height', r.headerHeight, 'px')('min-width', r.minWidth, 'px')('max-width', r.maxWidth, 'px')(
                    'width',
                    r.width,
                    'px'
                  ));
            },
            inputs: {
              sortType: 'sortType',
              sortAscendingIcon: 'sortAscendingIcon',
              sortDescendingIcon: 'sortDescendingIcon',
              sortUnsetIcon: 'sortUnsetIcon',
              isTarget: 'isTarget',
              targetMarkerTemplate: 'targetMarkerTemplate',
              targetMarkerContext: 'targetMarkerContext',
              allRowsSelected: 'allRowsSelected',
              selectionType: 'selectionType',
              column: 'column',
              headerHeight: 'headerHeight',
              sorts: 'sorts'
            },
            outputs: { sort: 'sort', select: 'select', columnContextmenu: 'columnContextmenu' },
            decls: 6,
            vars: 6,
            consts: [
              [1, 'datatable-header-cell-template-wrap'],
              [4, 'ngIf'],
              ['class', 'datatable-checkbox', 4, 'ngIf'],
              ['class', 'datatable-header-cell-wrapper', 4, 'ngIf'],
              [3, 'click'],
              [3, 'ngTemplateOutlet', 'ngTemplateOutletContext'],
              [1, 'datatable-checkbox'],
              ['type', 'checkbox', 3, 'checked', 'change'],
              [1, 'datatable-header-cell-wrapper'],
              [1, 'datatable-header-cell-label', 'draggable', 3, 'innerHTML', 'click']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div', 0),
                b(1, WR, 1, 2, null, 1),
                b(2, qR, 2, 1, 'label', 2),
                b(3, QR, 2, 1, 'span', 3),
                b(4, YR, 1, 2, null, 1),
                f(5, 'span', 4),
                v('click', function () {
                  return r.onSort();
                }),
                p()()),
                2 & e &&
                  (m(1),
                  _('ngIf', r.isTarget),
                  m(1),
                  _('ngIf', r.isCheckboxable),
                  m(1),
                  _('ngIf', !r.column.headerTemplate),
                  m(1),
                  _('ngIf', r.column.headerTemplate),
                  m(1),
                  pn(r.sortClass));
            },
            dependencies: [Ne, Pi],
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      function KR(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'datatable-header-cell', 4),
            v('resize', function (o) {
              const s = Y(e).$implicit;
              return Z(E(2).onColumnResized(o, s));
            })('longPressStart', function (o) {
              return Y(e), Z(E(2).onLongPressStart(o));
            })('longPressEnd', function (o) {
              return Y(e), Z(E(2).onLongPressEnd(o));
            })('sort', function (o) {
              return Y(e), Z(E(2).onSort(o));
            })('select', function (o) {
              return Y(e), Z(E(2).select.emit(o));
            })('columnContextmenu', function (o) {
              return Y(e), Z(E(2).columnContextmenu.emit(o));
            }),
            p();
        }
        if (2 & t) {
          const e = n.$implicit,
            r = E(2);
          _('resizeEnabled', e.resizeable)('pressModel', e)('pressEnabled', r.reorderable && e.draggable)(
            'dragX',
            r.reorderable && e.draggable && e.dragging
          )('dragY', !1)('dragModel', e)('dragEventTarget', r.dragEventTarget)('headerHeight', r.headerHeight)(
            'isTarget',
            e.isTarget
          )('targetMarkerTemplate', r.targetMarkerTemplate)('targetMarkerContext', e.targetMarkerContext)('column', e)(
            'sortType',
            r.sortType
          )('sorts', r.sorts)('selectionType', r.selectionType)('sortAscendingIcon', r.sortAscendingIcon)(
            'sortDescendingIcon',
            r.sortDescendingIcon
          )('sortUnsetIcon', r.sortUnsetIcon)('allRowsSelected', r.allRowsSelected);
        }
      }
      function JR(t, n) {
        if ((1 & t && (f(0, 'div', 2), b(1, KR, 1, 19, 'datatable-header-cell', 3), p()), 2 & t)) {
          const e = n.$implicit,
            r = E();
          pn('datatable-row-' + e.type),
            _('ngStyle', r._styleByGroup[e.type]),
            m(1),
            _('ngForOf', e.columns)('ngForTrackBy', r.columnTrackingFn);
        }
      }
      let zw = (() => {
        class t {
          constructor(e) {
            (this.cd = e),
              (this.sort = new O()),
              (this.reorder = new O()),
              (this.resize = new O()),
              (this.select = new O()),
              (this.columnContextmenu = new O(!1)),
              (this._columnGroupWidths = { total: 100 }),
              (this._styleByGroup = { left: {}, center: {}, right: {} }),
              (this.destroyed = !1);
          }
          set innerWidth(e) {
            (this._innerWidth = e),
              setTimeout(() => {
                if (this._columns) {
                  const r = xr(this._columns);
                  (this._columnGroupWidths = Bi(r, this._columns)), this.setStylesByGroup();
                }
              });
          }
          get innerWidth() {
            return this._innerWidth;
          }
          set headerHeight(e) {
            this._headerHeight = 'auto' !== e ? `${e}px` : e;
          }
          get headerHeight() {
            return this._headerHeight;
          }
          set columns(e) {
            this._columns = e;
            const r = xr(e);
            (this._columnsByPin = Ow(e)),
              setTimeout(() => {
                (this._columnGroupWidths = Bi(r, e)), this.setStylesByGroup();
              });
          }
          get columns() {
            return this._columns;
          }
          set offsetX(e) {
            (this._offsetX = e), this.setStylesByGroup();
          }
          get offsetX() {
            return this._offsetX;
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
          onLongPressStart({ event: e, model: r }) {
            (r.dragging = !0), (this.dragEventTarget = e);
          }
          onLongPressEnd({ event: e, model: r }) {
            (this.dragEventTarget = e),
              setTimeout(() => {
                const o = this._columns.find(i => i.$$id === r.$$id);
                o && (o.dragging = !1);
              }, 5);
          }
          get headerWidth() {
            return this.scrollbarH ? this.innerWidth + 'px' : '100%';
          }
          trackByGroups(e, r) {
            return r.type;
          }
          columnTrackingFn(e, r) {
            return r.$$id;
          }
          onColumnResized(e, r) {
            e <= r.minWidth ? (e = r.minWidth) : e >= r.maxWidth && (e = r.maxWidth),
              this.resize.emit({ column: r, prevValue: r.width, newValue: e });
          }
          onColumnReordered({ prevIndex: e, newIndex: r, model: o }) {
            const i = this.getColumn(r);
            (i.isTarget = !1),
              (i.targetMarkerContext = void 0),
              this.reorder.emit({ column: o, prevValue: e, newValue: r });
          }
          onTargetChanged({ prevIndex: e, newIndex: r, initialIndex: o }) {
            if (e || 0 === e) {
              const i = this.getColumn(e);
              (i.isTarget = !1), (i.targetMarkerContext = void 0);
            }
            if (r || 0 === r) {
              const i = this.getColumn(r);
              (i.isTarget = !0),
                o !== r &&
                  (i.targetMarkerContext = { class: 'targetMarker '.concat(o > r ? 'dragFromRight' : 'dragFromLeft') });
            }
          }
          getColumn(e) {
            const r = this._columnsByPin[0].columns.length;
            if (e < r) return this._columnsByPin[0].columns[e];
            const o = this._columnsByPin[1].columns.length;
            return e < r + o ? this._columnsByPin[1].columns[e - r] : this._columnsByPin[2].columns[e - r - o];
          }
          onSort({ column: e, prevValue: r, newValue: o }) {
            if (e.dragging) return;
            const i = this.calcNewSorts(e, r, o);
            this.sort.emit({ sorts: i, column: e, prevValue: r, newValue: o });
          }
          calcNewSorts(e, r, o) {
            let i = 0;
            this.sorts || (this.sorts = []);
            const s = this.sorts.map((a, l) => ((a = Object.assign({}, a)).prop === e.prop && (i = l), a));
            return (
              void 0 === o
                ? s.splice(i, 1)
                : r
                ? (s[i].dir = o)
                : (this.sortType === Sr.single && s.splice(0, this.sorts.length), s.push({ dir: o, prop: e.prop })),
              s
            );
          }
          setStylesByGroup() {
            (this._styleByGroup.left = this.calcStylesByGroup('left')),
              (this._styleByGroup.center = this.calcStylesByGroup('center')),
              (this._styleByGroup.right = this.calcStylesByGroup('right')),
              this.destroyed || this.cd.detectChanges();
          }
          calcStylesByGroup(e) {
            const r = this._columnGroupWidths,
              i = { width: `${r[e]}px` };
            return (
              'center' === e
                ? er(i, -1 * this.offsetX, 0)
                : 'right' === e && er(i, -1 * (r.total - this.innerWidth), 0),
              i
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I($t));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-header']],
            hostAttrs: [1, 'datatable-header'],
            hostVars: 4,
            hostBindings: function (e, r) {
              2 & e && kt('height', r.headerHeight)('width', r.headerWidth);
            },
            inputs: {
              sortAscendingIcon: 'sortAscendingIcon',
              sortDescendingIcon: 'sortDescendingIcon',
              sortUnsetIcon: 'sortUnsetIcon',
              scrollbarH: 'scrollbarH',
              dealsWithGroup: 'dealsWithGroup',
              targetMarkerTemplate: 'targetMarkerTemplate',
              innerWidth: 'innerWidth',
              sorts: 'sorts',
              sortType: 'sortType',
              allRowsSelected: 'allRowsSelected',
              selectionType: 'selectionType',
              reorderable: 'reorderable',
              headerHeight: 'headerHeight',
              columns: 'columns',
              offsetX: 'offsetX'
            },
            outputs: {
              sort: 'sort',
              reorder: 'reorder',
              resize: 'resize',
              select: 'select',
              columnContextmenu: 'columnContextmenu'
            },
            decls: 2,
            vars: 4,
            consts: [
              ['role', 'row', 'orderable', '', 1, 'datatable-header-inner', 3, 'reorder', 'targetChanged'],
              [3, 'class', 'ngStyle', 4, 'ngFor', 'ngForOf', 'ngForTrackBy'],
              [3, 'ngStyle'],
              [
                'role',
                'columnheader',
                'resizeable',
                '',
                'long-press',
                '',
                'draggable',
                '',
                3,
                'resizeEnabled',
                'pressModel',
                'pressEnabled',
                'dragX',
                'dragY',
                'dragModel',
                'dragEventTarget',
                'headerHeight',
                'isTarget',
                'targetMarkerTemplate',
                'targetMarkerContext',
                'column',
                'sortType',
                'sorts',
                'selectionType',
                'sortAscendingIcon',
                'sortDescendingIcon',
                'sortUnsetIcon',
                'allRowsSelected',
                'resize',
                'longPressStart',
                'longPressEnd',
                'sort',
                'select',
                'columnContextmenu',
                4,
                'ngFor',
                'ngForOf',
                'ngForTrackBy'
              ],
              [
                'role',
                'columnheader',
                'resizeable',
                '',
                'long-press',
                '',
                'draggable',
                '',
                3,
                'resizeEnabled',
                'pressModel',
                'pressEnabled',
                'dragX',
                'dragY',
                'dragModel',
                'dragEventTarget',
                'headerHeight',
                'isTarget',
                'targetMarkerTemplate',
                'targetMarkerContext',
                'column',
                'sortType',
                'sorts',
                'selectionType',
                'sortAscendingIcon',
                'sortDescendingIcon',
                'sortUnsetIcon',
                'allRowsSelected',
                'resize',
                'longPressStart',
                'longPressEnd',
                'sort',
                'select',
                'columnContextmenu'
              ]
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div', 0),
                v('reorder', function (i) {
                  return r.onColumnReordered(i);
                })('targetChanged', function (i) {
                  return r.onTargetChanged(i);
                }),
                b(1, JR, 2, 5, 'div', 1),
                p()),
                2 & e &&
                  (kt('width', r._columnGroupWidths.total, 'px'),
                  m(1),
                  _('ngForOf', r._columnsByPin)('ngForTrackBy', r.trackByGroups));
            },
            dependencies: [Ct, ki, Uw, BR, jR, VR, ZR],
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      function ek(t, n, e) {
        e = e || {};
        let r,
          o,
          i,
          s = null,
          a = 0;
        function l() {
          (a = !1 === e.leading ? 0 : +new Date()), (s = null), (i = t.apply(r, o));
        }
        return function () {
          const c = +new Date();
          !a && !1 === e.leading && (a = c);
          const u = n - (c - a);
          return (
            (r = this),
            (o = arguments),
            u <= 0
              ? (clearTimeout(s), (s = null), (a = c), (i = t.apply(r, o)))
              : !s && !1 !== e.trailing && (s = setTimeout(l, u)),
            i
          );
        };
      }
      function sk(t, n) {
        for (const e of n) {
          const r = t.indexOf(e);
          t.splice(r, 1);
        }
      }
      function Gw(t, n = 300) {
        let e = 0;
        for (const r of t) e += r.width || n;
        return e;
      }
      let ak = (() => {
        class t {
          constructor(e, r) {
            (this.element = e), (this.zone = r), (this.isVisible = !1), (this.visible = new O());
          }
          ngOnInit() {
            this.runCheck();
          }
          ngOnDestroy() {
            clearTimeout(this.timeout);
          }
          onVisibilityChange() {
            this.zone.run(() => {
              (this.isVisible = !0), this.visible.emit(!0);
            });
          }
          runCheck() {
            const e = () => {
              const { offsetHeight: r, offsetWidth: o } = this.element.nativeElement;
              r && o
                ? (clearTimeout(this.timeout), this.onVisibilityChange())
                : (clearTimeout(this.timeout),
                  this.zone.runOutsideAngular(() => {
                    this.timeout = setTimeout(() => e(), 50);
                  }));
            };
            this.timeout = setTimeout(() => e());
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(nt), I(Pe));
          }),
          (t.ɵdir = de({
            type: t,
            selectors: [['', 'visibilityObserver', '']],
            hostVars: 2,
            hostBindings: function (e, r) {
              2 & e && ht('visible', r.isVisible);
            },
            outputs: { visible: 'visible' }
          })),
          t
        );
      })();
      function lk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'li', 6)(1, 'a', 7),
            v('click', function () {
              const i = Y(e).$implicit;
              return Z(E().selectPage(i.number));
            }),
            g(2),
            p()();
        }
        if (2 & t) {
          const e = n.$implicit,
            r = E();
          ht('active', e.number === r.page), uo('aria-label', 'page ' + e.number), m(2), se(' ', e.text, ' ');
        }
      }
      let ck = (() => {
        class t {
          constructor() {
            (this.change = new O()), (this._count = 0), (this._page = 1), (this._size = 0);
          }
          set size(e) {
            (this._size = e), (this.pages = this.calcPages());
          }
          get size() {
            return this._size;
          }
          set count(e) {
            (this._count = e), (this.pages = this.calcPages());
          }
          get count() {
            return this._count;
          }
          set page(e) {
            (this._page = e), (this.pages = this.calcPages());
          }
          get page() {
            return this._page;
          }
          get totalPages() {
            const e = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
            return Math.max(e || 0, 1);
          }
          canPrevious() {
            return this.page > 1;
          }
          canNext() {
            return this.page < this.totalPages;
          }
          prevPage() {
            this.selectPage(this.page - 1);
          }
          nextPage() {
            this.selectPage(this.page + 1);
          }
          selectPage(e) {
            e > 0 && e <= this.totalPages && e !== this.page && ((this.page = e), this.change.emit({ page: e }));
          }
          calcPages(e) {
            const r = [];
            let o = 1,
              i = this.totalPages;
            (e = e || this.page),
              5 < this.totalPages &&
                ((o = e - Math.floor(2.5)),
                (i = e + Math.floor(2.5)),
                o < 1
                  ? ((o = 1), (i = Math.min(o + 5 - 1, this.totalPages)))
                  : i > this.totalPages && ((o = Math.max(this.totalPages - 5 + 1, 1)), (i = this.totalPages)));
            for (let l = o; l <= i; l++) r.push({ number: l, text: l });
            return r;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-pager']],
            hostAttrs: [1, 'datatable-pager'],
            inputs: {
              pagerLeftArrowIcon: 'pagerLeftArrowIcon',
              pagerRightArrowIcon: 'pagerRightArrowIcon',
              pagerPreviousIcon: 'pagerPreviousIcon',
              pagerNextIcon: 'pagerNextIcon',
              size: 'size',
              count: 'count',
              page: 'page'
            },
            outputs: { change: 'change' },
            decls: 14,
            vars: 21,
            consts: [
              [1, 'pager'],
              ['role', 'button', 'aria-label', 'go to first page', 'href', 'javascript:void(0)', 3, 'click'],
              ['role', 'button', 'aria-label', 'go to previous page', 'href', 'javascript:void(0)', 3, 'click'],
              ['role', 'button', 'class', 'pages', 3, 'active', 4, 'ngFor', 'ngForOf'],
              ['role', 'button', 'aria-label', 'go to next page', 'href', 'javascript:void(0)', 3, 'click'],
              ['role', 'button', 'aria-label', 'go to last page', 'href', 'javascript:void(0)', 3, 'click'],
              ['role', 'button', 1, 'pages'],
              ['href', 'javascript:void(0)', 3, 'click']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'ul', 0)(1, 'li')(2, 'a', 1),
                v('click', function () {
                  return r.selectPage(1);
                }),
                S(3, 'i'),
                p()(),
                f(4, 'li')(5, 'a', 2),
                v('click', function () {
                  return r.prevPage();
                }),
                S(6, 'i'),
                p()(),
                b(7, lk, 3, 4, 'li', 3),
                f(8, 'li')(9, 'a', 4),
                v('click', function () {
                  return r.nextPage();
                }),
                S(10, 'i'),
                p()(),
                f(11, 'li')(12, 'a', 5),
                v('click', function () {
                  return r.selectPage(r.totalPages);
                }),
                S(13, 'i'),
                p()()()),
                2 & e &&
                  (m(1),
                  ht('disabled', !r.canPrevious()),
                  m(2),
                  pn(r.pagerPreviousIcon),
                  m(1),
                  ht('disabled', !r.canPrevious()),
                  m(2),
                  pn(r.pagerLeftArrowIcon),
                  m(1),
                  _('ngForOf', r.pages),
                  m(1),
                  ht('disabled', !r.canNext()),
                  m(2),
                  pn(r.pagerRightArrowIcon),
                  m(1),
                  ht('disabled', !r.canNext()),
                  m(2),
                  pn(r.pagerNextIcon));
            },
            dependencies: [Ct],
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      function uk(t, n) {}
      const dk = function (t, n, e, r, o) {
        return { rowCount: t, pageSize: n, selectedCount: e, curPage: r, offset: o };
      };
      function fk(t, n) {
        if ((1 & t && b(0, uk, 0, 0, 'ng-template', 4), 2 & t)) {
          const e = E();
          _('ngTemplateOutlet', e.footerTemplate.template)(
            'ngTemplateOutletContext',
            (function E_(t, n, e, r, o, i, s, a) {
              const l = ut() + t,
                c = x(),
                u = jt(c, l, e, r, o, i);
              return ot(c, l + 4, s) || u
                ? fn(c, l + 5, a ? n.call(a, e, r, o, i, s) : n(e, r, o, i, s))
                : mi(c, l + 5);
            })(2, dk, e.rowCount, e.pageSize, e.selectedCount, e.curPage, e.offset)
          );
        }
      }
      function hk(t, n) {
        if ((1 & t && (f(0, 'span'), g(1), p()), 2 & t)) {
          const e = E(2);
          m(1),
            Xn(' ', null == e.selectedCount ? null : e.selectedCount.toLocaleString(), ' ', e.selectedMessage, ' / ');
        }
      }
      function pk(t, n) {
        if ((1 & t && (f(0, 'div', 5), b(1, hk, 2, 2, 'span', 1), g(2), p()), 2 & t)) {
          const e = E();
          m(1),
            _('ngIf', e.selectedMessage),
            m(1),
            Xn(' ', null == e.rowCount ? null : e.rowCount.toLocaleString(), ' ', e.totalMessage, ' ');
        }
      }
      function gk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'datatable-pager', 6),
            v('change', function (o) {
              return Y(e), Z(E().page.emit(o));
            }),
            p();
        }
        if (2 & t) {
          const e = E();
          _('pagerLeftArrowIcon', e.pagerLeftArrowIcon)('pagerRightArrowIcon', e.pagerRightArrowIcon)(
            'pagerPreviousIcon',
            e.pagerPreviousIcon
          )('pagerNextIcon', e.pagerNextIcon)('page', e.curPage)('size', e.pageSize)('count', e.rowCount)(
            'hidden',
            !e.isVisible
          );
        }
      }
      const mk = function (t) {
        return { 'selected-count': t };
      };
      let _k = (() => {
        class t {
          constructor() {
            (this.selectedCount = 0), (this.page = new O());
          }
          get isVisible() {
            return this.rowCount / this.pageSize > 1;
          }
          get curPage() {
            return this.offset + 1;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['datatable-footer']],
            hostAttrs: [1, 'datatable-footer'],
            inputs: {
              footerHeight: 'footerHeight',
              rowCount: 'rowCount',
              pageSize: 'pageSize',
              offset: 'offset',
              pagerLeftArrowIcon: 'pagerLeftArrowIcon',
              pagerRightArrowIcon: 'pagerRightArrowIcon',
              pagerPreviousIcon: 'pagerPreviousIcon',
              pagerNextIcon: 'pagerNextIcon',
              totalMessage: 'totalMessage',
              footerTemplate: 'footerTemplate',
              selectedCount: 'selectedCount',
              selectedMessage: 'selectedMessage'
            },
            outputs: { page: 'page' },
            decls: 4,
            vars: 8,
            consts: [
              [1, 'datatable-footer-inner', 3, 'ngClass'],
              [4, 'ngIf'],
              ['class', 'page-count', 4, 'ngIf'],
              [
                3,
                'pagerLeftArrowIcon',
                'pagerRightArrowIcon',
                'pagerPreviousIcon',
                'pagerNextIcon',
                'page',
                'size',
                'count',
                'hidden',
                'change',
                4,
                'ngIf'
              ],
              [3, 'ngTemplateOutlet', 'ngTemplateOutletContext'],
              [1, 'page-count'],
              [
                3,
                'pagerLeftArrowIcon',
                'pagerRightArrowIcon',
                'pagerPreviousIcon',
                'pagerNextIcon',
                'page',
                'size',
                'count',
                'hidden',
                'change'
              ]
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div', 0),
                b(1, fk, 1, 8, null, 1),
                b(2, pk, 3, 3, 'div', 2),
                b(3, gk, 1, 8, 'datatable-pager', 3),
                p()),
                2 & e &&
                  (kt('height', r.footerHeight, 'px'),
                  _('ngClass', da(6, mk, r.selectedMessage)),
                  m(1),
                  _('ngIf', r.footerTemplate),
                  m(1),
                  _('ngIf', !r.footerTemplate),
                  m(1),
                  _('ngIf', !r.footerTemplate));
            },
            dependencies: [dd, Ne, Pi, ck],
            encapsulation: 2,
            changeDetection: 0
          })),
          t
        );
      })();
      function yk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'datatable-header', 4),
            v('sort', function (o) {
              return Y(e), Z(E().onColumnSort(o));
            })('resize', function (o) {
              return Y(e), Z(E().onColumnResize(o));
            })('reorder', function (o) {
              return Y(e), Z(E().onColumnReorder(o));
            })('select', function (o) {
              return Y(e), Z(E().onHeaderSelect(o));
            })('columnContextmenu', function (o) {
              return Y(e), Z(E().onColumnContextmenu(o));
            }),
            fa(1, 'async'),
            p();
        }
        if (2 & t) {
          const e = E();
          _('sorts', e.sorts)('sortType', e.sortType)('scrollbarH', e.scrollbarH)('innerWidth', e._innerWidth)(
            'offsetX',
            ha(1, 15, e._offsetX)
          )('dealsWithGroup', void 0 !== e.groupedRows)('columns', e._internalColumns)('headerHeight', e.headerHeight)(
            'reorderable',
            e.reorderable
          )('targetMarkerTemplate', e.targetMarkerTemplate)('sortAscendingIcon', e.cssClasses.sortAscending)(
            'sortDescendingIcon',
            e.cssClasses.sortDescending
          )('sortUnsetIcon', e.cssClasses.sortUnset)('allRowsSelected', e.allRowsSelected)(
            'selectionType',
            e.selectionType
          );
        }
      }
      function wk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'datatable-footer', 5),
            v('page', function (o) {
              return Y(e), Z(E().onFooterPage(o));
            }),
            p();
        }
        if (2 & t) {
          const e = E();
          _('rowCount', e.rowCount)('pageSize', e.pageSize)('offset', e.offset)('footerHeight', e.footerHeight)(
            'footerTemplate',
            e.footer
          )('totalMessage', e.messages.totalMessage)('pagerLeftArrowIcon', e.cssClasses.pagerLeftArrow)(
            'pagerRightArrowIcon',
            e.cssClasses.pagerRightArrow
          )('pagerPreviousIcon', e.cssClasses.pagerPrevious)('selectedCount', e.selected.length)(
            'selectedMessage',
            !!e.selectionType && e.messages.selectedMessage
          )('pagerNextIcon', e.cssClasses.pagerNext);
        }
      }
      class H {
        constructor(n, e, r, o, i, s, a) {
          (this.scrollbarHelper = n),
            (this.dimensionsHelper = e),
            (this.cd = r),
            (this.columnChangesService = s),
            (this.configuration = a),
            (this.selected = []),
            (this.scrollbarV = !1),
            (this.scrollbarH = !1),
            (this.rowHeight = 30),
            (this.columnMode = L.standard),
            (this.headerHeight = 30),
            (this.footerHeight = 0),
            (this.externalPaging = !1),
            (this.externalSorting = !1),
            (this.loadingIndicator = !1),
            (this.reorderable = !0),
            (this.swapColumns = !0),
            (this.sortType = Sr.single),
            (this.sorts = []),
            (this.cssClasses = {
              sortAscending: 'datatable-icon-up',
              sortDescending: 'datatable-icon-down',
              sortUnset: 'datatable-icon-sort-unset',
              pagerLeftArrow: 'datatable-icon-left',
              pagerRightArrow: 'datatable-icon-right',
              pagerPrevious: 'datatable-icon-prev',
              pagerNext: 'datatable-icon-skip'
            }),
            (this.messages = {
              emptyMessage: 'No data to display',
              totalMessage: 'total',
              selectedMessage: 'selected'
            }),
            (this.groupExpansionDefault = !1),
            (this.selectAllRowsOnPage = !1),
            (this.virtualization = !0),
            (this.summaryRow = !1),
            (this.summaryHeight = 30),
            (this.summaryPosition = 'top'),
            (this.scroll = new O()),
            (this.activate = new O()),
            (this.select = new O()),
            (this.sort = new O()),
            (this.page = new O()),
            (this.reorder = new O()),
            (this.resize = new O()),
            (this.tableContextmenu = new O(!1)),
            (this.treeAction = new O()),
            (this.rowCount = 0),
            (this._offsetX = new Gt(0)),
            (this._count = 0),
            (this._offset = 0),
            (this._subscriptions = []),
            (this.rowIdentity = l => (this._groupRowsBy ? l.key : l)),
            (this.element = o.nativeElement),
            (this.rowDiffer = i.find({}).create()),
            this.configuration &&
              this.configuration.messages &&
              (this.messages = Object.assign({}, this.configuration.messages));
        }
        set rows(n) {
          (this._rows = n),
            n && (this._internalRows = [...n]),
            this.externalSorting || this.sortInternalRows(),
            (this._internalRows = Ad(this._internalRows, Eo(this.treeFromRelation), Eo(this.treeToRelation))),
            this.recalculate(),
            this._rows && this._groupRowsBy && (this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy)),
            this.cd.markForCheck();
        }
        get rows() {
          return this._rows;
        }
        set groupRowsBy(n) {
          n &&
            ((this._groupRowsBy = n),
            this._rows && this._groupRowsBy && (this.groupedRows = this.groupArrayBy(this._rows, this._groupRowsBy)));
        }
        get groupRowsBy() {
          return this._groupRowsBy;
        }
        set columns(n) {
          n && ((this._internalColumns = [...n]), Rw(this._internalColumns), this.recalculateColumns()),
            (this._columns = n);
        }
        get columns() {
          return this._columns;
        }
        set limit(n) {
          (this._limit = n), this.recalculate();
        }
        get limit() {
          return this._limit;
        }
        set count(n) {
          (this._count = n), this.recalculate();
        }
        get count() {
          return this._count;
        }
        set offset(n) {
          this._offset = n;
        }
        get offset() {
          return Math.max(Math.min(this._offset, Math.ceil(this.rowCount / this.pageSize) - 1), 0);
        }
        get isFixedHeader() {
          const n = this.headerHeight;
          return 'string' != typeof n || 'auto' !== n;
        }
        get isFixedRow() {
          return 'auto' !== this.rowHeight;
        }
        get isVertScroll() {
          return this.scrollbarV;
        }
        get isVirtualized() {
          return this.virtualization;
        }
        get isHorScroll() {
          return this.scrollbarH;
        }
        get isSelectable() {
          return void 0 !== this.selectionType;
        }
        get isCheckboxSelection() {
          return this.selectionType === Oe.checkbox;
        }
        get isCellSelection() {
          return this.selectionType === Oe.cell;
        }
        get isSingleSelection() {
          return this.selectionType === Oe.single;
        }
        get isMultiSelection() {
          return this.selectionType === Oe.multi;
        }
        get isMultiClickSelection() {
          return this.selectionType === Oe.multiClick;
        }
        set columnTemplates(n) {
          (this._columnTemplates = n), this.translateColumns(n);
        }
        get columnTemplates() {
          return this._columnTemplates;
        }
        get allRowsSelected() {
          let n = this.rows && this.selected && this.selected.length === this.rows.length;
          if (this.bodyComponent && this.selectAllRowsOnPage) {
            const e = this.bodyComponent.indexes;
            n = this.selected.length === e.last - e.first;
          }
          return this.selected && this.rows && 0 !== this.rows.length && n;
        }
        ngOnInit() {
          this.recalculate();
        }
        ngAfterViewInit() {
          this.externalSorting || this.sortInternalRows(),
            'undefined' != typeof requestAnimationFrame &&
              requestAnimationFrame(() => {
                this.recalculate(),
                  this.externalPaging &&
                    this.scrollbarV &&
                    this.page.emit({ count: this.count, pageSize: this.pageSize, limit: this.limit, offset: 0 });
              });
        }
        ngAfterContentInit() {
          this.columnTemplates.changes.subscribe(n => this.translateColumns(n)), this.listenForColumnInputChanges();
        }
        translateColumns(n) {
          if (n) {
            const e = n.toArray();
            e.length &&
              ((this._internalColumns = (function NA(t) {
                const n = [];
                for (const e of t) {
                  const r = {},
                    o = Object.getOwnPropertyNames(e);
                  for (const i of o) r[i] = e[i];
                  e.headerTemplate && (r.headerTemplate = e.headerTemplate),
                    e.cellTemplate && (r.cellTemplate = e.cellTemplate),
                    e.summaryFunc && (r.summaryFunc = e.summaryFunc),
                    e.summaryTemplate && (r.summaryTemplate = e.summaryTemplate),
                    n.push(r);
                }
                return n;
              })(e)),
              Rw(this._internalColumns),
              this.recalculateColumns(),
              this.sortInternalRows(),
              this.cd.markForCheck());
          }
        }
        groupArrayBy(n, e) {
          const r = new Map();
          return (
            n.forEach(s => {
              const a = s[e];
              r.has(a) ? r.get(a).push(s) : r.set(a, [s]);
            }),
            Array.from(r, s => ((s, a) => ({ key: s, value: a }))(s[0], s[1]))
          );
        }
        ngDoCheck() {
          this.rowDiffer.diff(this.rows) &&
            (this.externalSorting ? (this._internalRows = [...this.rows]) : this.sortInternalRows(),
            (this._internalRows = Ad(this._internalRows, Eo(this.treeFromRelation), Eo(this.treeToRelation))),
            this.recalculatePages(),
            this.cd.markForCheck());
        }
        recalculate() {
          this.recalculateDims(), this.recalculateColumns(), this.cd.markForCheck();
        }
        onWindowResize() {
          this.recalculate();
        }
        recalculateColumns(n = this._internalColumns, e = -1, r = this.scrollbarH) {
          if (!n) return;
          let o = this._innerWidth;
          return (
            this.scrollbarV && (o -= this.scrollbarHelper.width),
            this.columnMode === L.force
              ? (function ik(t, n, e, r, o = 300) {
                  const i = t.slice(e + 1, t.length).filter(h => !1 !== h.canAutoResize);
                  for (const h of i) h.$$oldWidth || (h.$$oldWidth = h.width);
                  let s = 0,
                    a = !1,
                    l = Gw(t, o),
                    c = n - l;
                  const u = [];
                  do {
                    (s = c / i.length), (a = l >= n);
                    for (const h of i) {
                      if (a && r) h.width = h.$$oldWidth || h.width || o;
                      else {
                        const y = (h.width || o) + s;
                        h.minWidth && y < h.minWidth
                          ? ((h.width = h.minWidth), u.push(h))
                          : h.maxWidth && y > h.maxWidth
                          ? ((h.width = h.maxWidth), u.push(h))
                          : (h.width = y);
                      }
                      h.width = Math.max(0, h.width);
                    }
                    (l = Gw(t)), (c = n - l), sk(i, u);
                  } while (c > 1 && 0 !== i.length);
                })(n, o, e, r)
              : this.columnMode === L.flex &&
                (function rk(t, n) {
                  const e = (function HA(t, n) {
                      let e = 0;
                      for (const r of t) e += n && r[n] ? r[n] : r.width;
                      return e;
                    })(t),
                    r = (function nk(t) {
                      let n = 0;
                      for (const e of t) n += e.flexGrow || 0;
                      return n;
                    })(t),
                    o = xr(t);
                  e !== n &&
                    (function ok(t, n, e) {
                      for (const i in t)
                        for (const s of t[i])
                          s.canAutoResize ? (s.width = 0) : ((n -= s.width), (e -= s.flexGrow ? s.flexGrow : 0));
                      const r = {};
                      let o = n;
                      do {
                        const i = o / e;
                        o = 0;
                        for (const s in t)
                          for (const a of t[s])
                            if (a.canAutoResize && !r[a.prop]) {
                              const l = a.width + a.flexGrow * i;
                              void 0 !== a.minWidth && l < a.minWidth
                                ? ((o += l - a.minWidth), (a.width = a.minWidth), (r[a.prop] = !0))
                                : (a.width = l);
                            }
                      } while (0 !== o);
                    })(o, n, r);
                })(n, o),
            n
          );
        }
        recalculateDims() {
          const n = this.dimensionsHelper.getDimensions(this.element);
          if (((this._innerWidth = Math.floor(n.width)), this.scrollbarV)) {
            let e = n.height;
            this.headerHeight && (e -= this.headerHeight),
              this.footerHeight && (e -= this.footerHeight),
              (this.bodyHeight = e);
          }
          this.recalculatePages();
        }
        recalculatePages() {
          (this.pageSize = this.calcPageSize()), (this.rowCount = this.calcRowCount());
        }
        onBodyPage({ offset: n }) {
          (this.externalPaging && !this.virtualization) ||
            ((this.offset = n),
            this.page.emit({ count: this.count, pageSize: this.pageSize, limit: this.limit, offset: this.offset }));
        }
        onBodyScroll(n) {
          this._offsetX.next(n.offsetX), this.scroll.emit(n), this.cd.detectChanges();
        }
        onFooterPage(n) {
          (this.offset = n.page - 1),
            this.bodyComponent.updateOffsetY(this.offset),
            this.page.emit({ count: this.count, pageSize: this.pageSize, limit: this.limit, offset: this.offset }),
            this.selectAllRowsOnPage && ((this.selected = []), this.select.emit({ selected: this.selected }));
        }
        calcPageSize(n = this.rows) {
          if (this.scrollbarV && this.virtualization) {
            const e = Math.ceil(this.bodyHeight / this.rowHeight);
            return Math.max(e, 0);
          }
          return void 0 !== this.limit ? this.limit : n ? n.length : 0;
        }
        calcRowCount(n = this.rows) {
          return this.externalPaging
            ? this.count
            : n
            ? this.groupedRows
              ? this.groupedRows.length
              : null != this.treeFromRelation && null != this.treeToRelation
              ? this._internalRows.length
              : n.length
            : 0;
        }
        onColumnContextmenu({ event: n, column: e }) {
          this.tableContextmenu.emit({ event: n, type: Li.header, content: e });
        }
        onRowContextmenu({ event: n, row: e }) {
          this.tableContextmenu.emit({ event: n, type: Li.body, content: e });
        }
        onColumnResize({ column: n, newValue: e }) {
          if (void 0 === n) return;
          let r;
          const o = this._internalColumns.map(
            (i, s) => ((i = Object.assign({}, i)).$$id === n.$$id && ((r = s), (i.width = e), (i.$$oldWidth = e)), i)
          );
          this.recalculateColumns(o, r), (this._internalColumns = o), this.resize.emit({ column: n, newValue: e });
        }
        onColumnReorder({ column: n, newValue: e, prevValue: r }) {
          const o = this._internalColumns.map(i => Object.assign({}, i));
          if (this.swapColumns) {
            const i = o[e];
            (o[e] = n), (o[r] = i);
          } else if (e > r) {
            const i = o[r];
            for (let s = r; s < e; s++) o[s] = o[s + 1];
            o[e] = i;
          } else {
            const i = o[r];
            for (let s = r; s > e; s--) o[s] = o[s - 1];
            o[e] = i;
          }
          (this._internalColumns = o), this.reorder.emit({ column: n, newValue: e, prevValue: r });
        }
        onColumnSort(n) {
          this.selectAllRowsOnPage && ((this.selected = []), this.select.emit({ selected: this.selected })),
            (this.sorts = n.sorts),
            !1 === this.externalSorting && this.sortInternalRows(),
            (this._internalRows = Ad(this._internalRows, Eo(this.treeFromRelation), Eo(this.treeToRelation))),
            (this.offset = 0),
            this.bodyComponent.updateOffsetY(this.offset),
            this.sort.emit(n);
        }
        onHeaderSelect(n) {
          if (this.bodyComponent && this.selectAllRowsOnPage) {
            const e = this.bodyComponent.indexes.first,
              r = this.bodyComponent.indexes.last,
              o = this.selected.length === r - e;
            (this.selected = []), o || this.selected.push(...this._internalRows.slice(e, r));
          } else {
            const e = this.selected.length === this.rows.length;
            (this.selected = []), e || this.selected.push(...this.rows);
          }
          this.select.emit({ selected: this.selected });
        }
        onBodySelect(n) {
          this.select.emit(n);
        }
        onTreeAction(n) {
          const e = n.row,
            r = this._rows.findIndex(o => o[this.treeToRelation] === n.row[this.treeToRelation]);
          this.treeAction.emit({ row: e, rowIndex: r });
        }
        ngOnDestroy() {
          this._subscriptions.forEach(n => n.unsubscribe());
        }
        listenForColumnInputChanges() {
          this._subscriptions.push(
            this.columnChangesService.columnInputChanges$.subscribe(() => {
              this.columnTemplates && this.columnTemplates.notifyOnChanges();
            })
          );
        }
        sortInternalRows() {
          this._internalRows = (function zR(t, n, e) {
            if (!t) return [];
            if (!e || !e.length || !n) return [...t];
            const r = new Map();
            t.forEach((a, l) => r.set(a, l));
            const o = [...t],
              i = n.reduce(
                (a, l) => (l.comparator && 'function' == typeof l.comparator && (a[l.prop] = l.comparator), a),
                {}
              ),
              s = e.map(a => {
                const l = a.prop;
                return { prop: l, dir: a.dir, valueGetter: Md(l), compareFn: i[l] || UR };
              });
            return o.sort(function (a, l) {
              for (const c of s) {
                const { prop: u, valueGetter: d } = c,
                  h = d(a, u),
                  y = d(l, u),
                  w = c.dir !== mt.desc ? c.compareFn(h, y, a, l, c.dir) : -c.compareFn(h, y, a, l, c.dir);
                if (0 !== w) return w;
              }
              return r.has(a) && r.has(l) ? (r.get(a) < r.get(l) ? -1 : 1) : 0;
            });
          })(this._internalRows, this._internalColumns, this.sorts);
        }
      }
      (H.ɵfac = function (n) {
        return new (n || H)(I(Id, 4), I(Iw, 4), I($t), I(nt), I(Fn), I(Ed), I('configuration', 8));
      }),
        (H.ɵcmp = P({
          type: H,
          selectors: [['ngx-datatable']],
          contentQueries: function (n, e, r) {
            if ((1 & n && (bt(r, Pd, 5), bt(r, Mw, 5), bt(r, Fw, 5), bt(r, De, 4)), 2 & n)) {
              let o;
              we((o = be())) && (e.rowDetail = o.first),
                we((o = be())) && (e.groupHeader = o.first),
                we((o = be())) && (e.footer = o.first),
                we((o = be())) && (e.columnTemplates = o);
            }
          },
          viewQuery: function (n, e) {
            if ((1 & n && (Pt(jw, 5), Pt(zw, 5)), 2 & n)) {
              let r;
              we((r = be())) && (e.bodyComponent = r.first), we((r = be())) && (e.headerComponent = r.first);
            }
          },
          hostAttrs: [1, 'ngx-datatable'],
          hostVars: 22,
          hostBindings: function (n, e) {
            1 & n &&
              v(
                'resize',
                function () {
                  return e.onWindowResize();
                },
                0,
                Rp
              ),
              2 & n &&
                ht('fixed-header', e.isFixedHeader)('fixed-row', e.isFixedRow)('scroll-vertical', e.isVertScroll)(
                  'virtualized',
                  e.isVirtualized
                )('scroll-horz', e.isHorScroll)('selectable', e.isSelectable)(
                  'checkbox-selection',
                  e.isCheckboxSelection
                )('cell-selection', e.isCellSelection)('single-selection', e.isSingleSelection)(
                  'multi-selection',
                  e.isMultiSelection
                )('multi-click-selection', e.isMultiClickSelection);
          },
          inputs: {
            targetMarkerTemplate: 'targetMarkerTemplate',
            rows: 'rows',
            groupRowsBy: 'groupRowsBy',
            groupedRows: 'groupedRows',
            columns: 'columns',
            selected: 'selected',
            scrollbarV: 'scrollbarV',
            scrollbarH: 'scrollbarH',
            rowHeight: 'rowHeight',
            columnMode: 'columnMode',
            headerHeight: 'headerHeight',
            footerHeight: 'footerHeight',
            externalPaging: 'externalPaging',
            externalSorting: 'externalSorting',
            limit: 'limit',
            count: 'count',
            offset: 'offset',
            loadingIndicator: 'loadingIndicator',
            selectionType: 'selectionType',
            reorderable: 'reorderable',
            swapColumns: 'swapColumns',
            sortType: 'sortType',
            sorts: 'sorts',
            cssClasses: 'cssClasses',
            messages: 'messages',
            rowClass: 'rowClass',
            selectCheck: 'selectCheck',
            displayCheck: 'displayCheck',
            groupExpansionDefault: 'groupExpansionDefault',
            trackByProp: 'trackByProp',
            selectAllRowsOnPage: 'selectAllRowsOnPage',
            virtualization: 'virtualization',
            treeFromRelation: 'treeFromRelation',
            treeToRelation: 'treeToRelation',
            summaryRow: 'summaryRow',
            summaryHeight: 'summaryHeight',
            summaryPosition: 'summaryPosition',
            rowIdentity: 'rowIdentity'
          },
          outputs: {
            scroll: 'scroll',
            activate: 'activate',
            select: 'select',
            sort: 'sort',
            page: 'page',
            reorder: 'reorder',
            resize: 'resize',
            tableContextmenu: 'tableContextmenu',
            treeAction: 'treeAction'
          },
          decls: 5,
          vars: 34,
          consts: [
            ['role', 'table', 'visibilityObserver', '', 3, 'visible'],
            [
              'role',
              'rowgroup',
              3,
              'sorts',
              'sortType',
              'scrollbarH',
              'innerWidth',
              'offsetX',
              'dealsWithGroup',
              'columns',
              'headerHeight',
              'reorderable',
              'targetMarkerTemplate',
              'sortAscendingIcon',
              'sortDescendingIcon',
              'sortUnsetIcon',
              'allRowsSelected',
              'selectionType',
              'sort',
              'resize',
              'reorder',
              'select',
              'columnContextmenu',
              4,
              'ngIf'
            ],
            [
              'role',
              'rowgroup',
              3,
              'groupRowsBy',
              'groupedRows',
              'rows',
              'groupExpansionDefault',
              'scrollbarV',
              'scrollbarH',
              'virtualization',
              'loadingIndicator',
              'externalPaging',
              'rowHeight',
              'rowCount',
              'offset',
              'trackByProp',
              'columns',
              'pageSize',
              'offsetX',
              'rowDetail',
              'groupHeader',
              'selected',
              'innerWidth',
              'bodyHeight',
              'selectionType',
              'emptyMessage',
              'rowIdentity',
              'rowClass',
              'selectCheck',
              'displayCheck',
              'summaryRow',
              'summaryHeight',
              'summaryPosition',
              'page',
              'activate',
              'rowContextmenu',
              'select',
              'scroll',
              'treeAction'
            ],
            [
              3,
              'rowCount',
              'pageSize',
              'offset',
              'footerHeight',
              'footerTemplate',
              'totalMessage',
              'pagerLeftArrowIcon',
              'pagerRightArrowIcon',
              'pagerPreviousIcon',
              'selectedCount',
              'selectedMessage',
              'pagerNextIcon',
              'page',
              4,
              'ngIf'
            ],
            [
              'role',
              'rowgroup',
              3,
              'sorts',
              'sortType',
              'scrollbarH',
              'innerWidth',
              'offsetX',
              'dealsWithGroup',
              'columns',
              'headerHeight',
              'reorderable',
              'targetMarkerTemplate',
              'sortAscendingIcon',
              'sortDescendingIcon',
              'sortUnsetIcon',
              'allRowsSelected',
              'selectionType',
              'sort',
              'resize',
              'reorder',
              'select',
              'columnContextmenu'
            ],
            [
              3,
              'rowCount',
              'pageSize',
              'offset',
              'footerHeight',
              'footerTemplate',
              'totalMessage',
              'pagerLeftArrowIcon',
              'pagerRightArrowIcon',
              'pagerPreviousIcon',
              'selectedCount',
              'selectedMessage',
              'pagerNextIcon',
              'page'
            ]
          ],
          template: function (n, e) {
            1 & n &&
              (f(0, 'div', 0),
              v('visible', function () {
                return e.recalculate();
              }),
              b(1, yk, 2, 17, 'datatable-header', 1),
              f(2, 'datatable-body', 2),
              v('page', function (o) {
                return e.onBodyPage(o);
              })('activate', function (o) {
                return e.activate.emit(o);
              })('rowContextmenu', function (o) {
                return e.onRowContextmenu(o);
              })('select', function (o) {
                return e.onBodySelect(o);
              })('scroll', function (o) {
                return e.onBodyScroll(o);
              })('treeAction', function (o) {
                return e.onTreeAction(o);
              }),
              fa(3, 'async'),
              p(),
              b(4, wk, 1, 12, 'datatable-footer', 3),
              p()),
              2 & n &&
                (m(1),
                _('ngIf', e.headerHeight),
                m(1),
                _('groupRowsBy', e.groupRowsBy)('groupedRows', e.groupedRows)('rows', e._internalRows)(
                  'groupExpansionDefault',
                  e.groupExpansionDefault
                )('scrollbarV', e.scrollbarV)('scrollbarH', e.scrollbarH)('virtualization', e.virtualization)(
                  'loadingIndicator',
                  e.loadingIndicator
                )('externalPaging', e.externalPaging)('rowHeight', e.rowHeight)('rowCount', e.rowCount)(
                  'offset',
                  e.offset
                )('trackByProp', e.trackByProp)('columns', e._internalColumns)('pageSize', e.pageSize)(
                  'offsetX',
                  ha(3, 32, e._offsetX)
                )('rowDetail', e.rowDetail)('groupHeader', e.groupHeader)('selected', e.selected)(
                  'innerWidth',
                  e._innerWidth
                )('bodyHeight', e.bodyHeight)('selectionType', e.selectionType)(
                  'emptyMessage',
                  e.messages.emptyMessage
                )('rowIdentity', e.rowIdentity)('rowClass', e.rowClass)('selectCheck', e.selectCheck)(
                  'displayCheck',
                  e.displayCheck
                )('summaryRow', e.summaryRow)('summaryHeight', e.summaryHeight)('summaryPosition', e.summaryPosition),
                m(2),
                _('ngIf', e.footerHeight));
          },
          dependencies: [Ne, ak, zw, jw, _k, pd],
          styles: [
            '.ngx-datatable{display:block;overflow:hidden;justify-content:center;position:relative;transform:translateZ(0)}.ngx-datatable [hidden]{display:none!important}.ngx-datatable *,.ngx-datatable *:before,.ngx-datatable *:after{box-sizing:border-box}.ngx-datatable.scroll-vertical .datatable-body{overflow-y:auto}.ngx-datatable.scroll-vertical.virtualized .datatable-body .datatable-row-wrapper{position:absolute}.ngx-datatable.scroll-horz .datatable-body{overflow-x:auto;-webkit-overflow-scrolling:touch}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner{white-space:nowrap}.ngx-datatable.fixed-header .datatable-header .datatable-header-inner .datatable-header-cell{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ngx-datatable.fixed-row .datatable-scroll,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row{white-space:nowrap}.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-cell,.ngx-datatable.fixed-row .datatable-scroll .datatable-body-row .datatable-body-group-cell{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ngx-datatable .datatable-body-row,.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-header-inner{display:flex;flex-direction:row;-o-flex-flow:row;flex-flow:row}.ngx-datatable .datatable-body-cell,.ngx-datatable .datatable-header-cell{overflow-x:hidden;vertical-align:top;display:inline-block;line-height:1.625}.ngx-datatable .datatable-body-cell:focus,.ngx-datatable .datatable-header-cell:focus{outline:none}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-right{z-index:9}.ngx-datatable .datatable-row-left,.ngx-datatable .datatable-row-center,.ngx-datatable .datatable-row-group,.ngx-datatable .datatable-row-right{position:relative}.ngx-datatable .datatable-header{display:block;overflow:hidden}.ngx-datatable .datatable-header .datatable-header-inner{align-items:stretch;-webkit-align-items:stretch}.ngx-datatable .datatable-header .datatable-header-cell{position:relative;display:inline-block}.ngx-datatable .datatable-header .datatable-header-cell.sortable .datatable-header-cell-wrapper{cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell.longpress .datatable-header-cell-wrapper{cursor:move}.ngx-datatable .datatable-header .datatable-header-cell .sort-btn{line-height:100%;vertical-align:middle;display:inline-block;cursor:pointer}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell .resize-handle--not-resizable{display:inline-block;position:absolute;right:0;top:0;bottom:0;width:5px;padding:0 4px;visibility:hidden}.ngx-datatable .datatable-header .datatable-header-cell .resize-handle{cursor:ew-resize}.ngx-datatable .datatable-header .datatable-header-cell.resizeable:hover .resize-handle,.ngx-datatable .datatable-header .datatable-header-cell:hover .resize-handle--not-resizable{visibility:visible}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker{position:absolute;top:0;bottom:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromLeft{right:0}.ngx-datatable .datatable-header .datatable-header-cell .targetMarker.dragFromRight{left:0}.ngx-datatable .datatable-header .datatable-header-cell .datatable-header-cell-template-wrap{height:inherit}.ngx-datatable .datatable-body{position:relative;z-index:10;display:block}.ngx-datatable .datatable-body .datatable-scroll{display:inline-block}.ngx-datatable .datatable-body .datatable-row-detail{overflow-y:hidden}.ngx-datatable .datatable-body .datatable-row-wrapper{display:flex;flex-direction:column}.ngx-datatable .datatable-body .datatable-body-row{outline:none}.ngx-datatable .datatable-body .datatable-body-row>div{display:flex}.ngx-datatable .datatable-footer{display:block;width:100%;overflow:auto}.ngx-datatable .datatable-footer .datatable-footer-inner{display:flex;align-items:center;width:100%}.ngx-datatable .datatable-footer .selected-count .page-count{flex:1 1 40%}.ngx-datatable .datatable-footer .selected-count .datatable-pager{flex:1 1 60%}.ngx-datatable .datatable-footer .page-count{flex:1 1 20%}.ngx-datatable .datatable-footer .datatable-pager{flex:1 1 80%;text-align:right}.ngx-datatable .datatable-footer .datatable-pager .pager,.ngx-datatable .datatable-footer .datatable-pager .pager li{padding:0;margin:0;display:inline-block;list-style:none}.ngx-datatable .datatable-footer .datatable-pager .pager li,.ngx-datatable .datatable-footer .datatable-pager .pager li a{outline:none}.ngx-datatable .datatable-footer .datatable-pager .pager li a{cursor:pointer;display:inline-block}.ngx-datatable .datatable-footer .datatable-pager .pager li.disabled a{cursor:not-allowed}\n'
          ],
          encapsulation: 2,
          changeDetection: 0
        })),
        (function Sv(t, n, e, r) {
          var s,
            o = arguments.length,
            i = o < 3 ? n : null === r ? (r = Object.getOwnPropertyDescriptor(n, e)) : r;
          if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) i = Reflect.decorate(t, n, e, r);
          else
            for (var a = t.length - 1; a >= 0; a--)
              (s = t[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(n, e, i) : s(n, e)) || i);
          o > 3 && i && Object.defineProperty(n, e, i);
        })(
          [
            (function tk(t, n) {
              return function (r, o, i) {
                return {
                  configurable: !0,
                  enumerable: i.enumerable,
                  get: function () {
                    return (
                      Object.defineProperty(this, o, {
                        configurable: !0,
                        enumerable: i.enumerable,
                        value: ek(i.value, t, n)
                      }),
                      this[o]
                    );
                  }
                };
              };
            })(5)
          ],
          H.prototype,
          'onWindowResize',
          null
        ),
        'undefined' != typeof document &&
          !document.elementsFromPoint &&
          (document.elementsFromPoint = function bk(t, n) {
            const e = [],
              r = [];
            let o, i, s;
            for (; (o = document.elementFromPoint(t, n)) && -1 === e.indexOf(o) && null != o; )
              e.push(o),
                r.push({
                  value: o.style.getPropertyValue('pointer-events'),
                  priority: o.style.getPropertyPriority('pointer-events')
                }),
                o.style.setProperty('pointer-events', 'none', 'important');
            for (i = r.length; (s = r[--i]); )
              e[i].style.setProperty('pointer-events', s.value ? s.value : '', s.priority);
            return e;
          });
      let Ck = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.loadingIndicator = !0),
                (this.reorderable = !0),
                (this.columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company', sortable: !1 }]),
                (this.ColumnMode = L),
                this.fetch(e => {
                  (this.rows = e),
                    setTimeout(() => {
                      this.loadingIndicator = !1;
                    }, 1500);
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['basic-auto-demo']],
              decls: 7,
              vars: 7,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/basic-auto.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'material',
                  3,
                  'rows',
                  'loadingIndicator',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'reorderable'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Fluid Row Heights '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  S(6, 'ngx-datatable', 1),
                  p()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('loadingIndicator', r.loadingIndicator)('columns', r.columns)(
                      'columnMode',
                      r.ColumnMode.force
                    )('headerHeight', 50)('footerHeight', 50)('reorderable', r.reorderable));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })(),
        Dk = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }]),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['basic-fixed-demo']],
              decls: 7,
              vars: 6,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/basic-fixed.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  'striped',
                  3,
                  'rows',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Fix Row Height '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  S(6, 'ngx-datatable', 1),
                  p()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columns', r.columns)('columnMode', r.ColumnMode.force)('headerHeight', 50)(
                      'footerHeight',
                      50
                    )('rowHeight', 50));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })(),
        Tk = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/100k.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['full-screen-demo']],
              decls: 13,
              vars: 11,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/fullscreen.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  'fullscreen',
                  2,
                  'top',
                  '52px',
                  3,
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight',
                  'scrollbarV',
                  'scrollbarH',
                  'rows'
                ],
                ['name', 'Id', 3, 'width'],
                ['name', 'Name', 3, 'width'],
                ['name', 'Gender'],
                ['name', 'Age'],
                ['name', 'City', 'prop', 'address.city', 3, 'width'],
                ['name', 'State', 'prop', 'address.state', 3, 'width']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Full Screen '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  S(7, 'ngx-datatable-column', 2)(8, 'ngx-datatable-column', 3)(9, 'ngx-datatable-column', 4)(
                    10,
                    'ngx-datatable-column',
                    5
                  )(11, 'ngx-datatable-column', 6)(12, 'ngx-datatable-column', 7),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 0)('rowHeight', 50)(
                      'scrollbarV',
                      !0
                    )('scrollbarH', !0)('rows', r.rows),
                    m(1),
                    _('width', 80),
                    m(1),
                    _('width', 300),
                    m(3),
                    _('width', 300),
                    m(1),
                    _('width', 300));
              },
              dependencies: [H, De],
              encapsulation: 2
            })),
            t
          );
        })();
      function Sk(t, n) {
        1 & t && (f(0, 'span'), g(1, ' ... '), p());
      }
      function xk(t, n) {
        1 & t && (f(0, 'span'), g(1, ' \u2191 '), p());
      }
      function Ik(t, n) {
        1 & t && (f(0, 'span'), g(1, ' \u2193 '), p());
      }
      function Ek(t, n) {
        1 & t && (f(0, 'span'), g(1, ' \u20e0 '), p());
      }
      function Mk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'button', 9),
            v('click', function () {
              return Z(Y(e).cellContext.onTreeAction());
            }),
            b(1, Sk, 2, 0, 'span', 10),
            b(2, xk, 2, 0, 'span', 10),
            b(3, Ik, 2, 0, 'span', 10),
            b(4, Ek, 2, 0, 'span', 10),
            p();
        }
        if (2 & t) {
          const e = n.cellContext;
          _('disabled', 'disabled' === e.treeStatus),
            m(1),
            _('ngIf', 'loading' === e.treeStatus),
            m(1),
            _('ngIf', 'collapsed' === e.treeStatus),
            m(1),
            _('ngIf', 'expanded' === e.treeStatus),
            m(1),
            _('ngIf', 'disabled' === e.treeStatus);
        }
      }
      let Ak = (() => {
        class t {
          constructor(e) {
            (this.cd = e),
              (this.rows = []),
              (this.lastIndex = 15),
              (this.ColumnMode = L),
              this.fetch(r => {
                (r = r.slice(1, this.lastIndex)),
                  (this.rows = r.map(o => ((o.treeStatus = 'collapsed'), (o.parentId = null), o)));
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/100k.json'),
              (r.onload = () => {
                setTimeout(() => {
                  e(JSON.parse(r.response));
                }, 500);
              }),
              r.send();
          }
          onTreeAction(e) {
            const o = e.row;
            'collapsed' === o.treeStatus
              ? ((o.treeStatus = 'loading'),
                this.fetch(i => {
                  (i = i
                    .slice(this.lastIndex, this.lastIndex + 3)
                    .map(s => ((s.treeStatus = 'collapsed'), (s.parentId = o.id), s))),
                    (this.lastIndex = this.lastIndex + 3),
                    (o.treeStatus = 'expanded'),
                    (this.rows = [...this.rows, ...i]),
                    this.cd.detectChanges();
                }))
              : ((o.treeStatus = 'collapsed'), (this.rows = [...this.rows]), this.cd.detectChanges());
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I($t));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['full-screen-tree-demo']],
            decls: 14,
            vars: 15,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/tree/fullscreen.component.ts',
                'target',
                '_blank'
              ],
              [
                1,
                'material',
                'fullscreen',
                2,
                'top',
                '52px',
                3,
                'columnMode',
                'headerHeight',
                'footerHeight',
                'rowHeight',
                'scrollbarV',
                'scrollbarH',
                'rows',
                'treeFromRelation',
                'treeToRelation',
                'treeAction'
              ],
              ['name', 'Id', 3, 'width'],
              ['name', 'Name', 3, 'isTreeColumn', 'width', 'treeLevelIndent'],
              ['ngx-datatable-tree-toggle', ''],
              ['name', 'Gender'],
              ['name', 'Age'],
              ['name', 'City', 'prop', 'address.city', 3, 'width'],
              ['name', 'State', 'prop', 'address.state', 3, 'width'],
              [3, 'disabled', 'click'],
              [4, 'ngIf']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Full Screen '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'ngx-datatable', 1),
                v('treeAction', function (i) {
                  return r.onTreeAction(i);
                }),
                S(7, 'ngx-datatable-column', 2),
                f(8, 'ngx-datatable-column', 3),
                b(9, Mk, 5, 5, 'ng-template', 4),
                p(),
                S(10, 'ngx-datatable-column', 5)(11, 'ngx-datatable-column', 6)(12, 'ngx-datatable-column', 7)(
                  13,
                  'ngx-datatable-column',
                  8
                ),
                p()()),
                2 & e &&
                  (m(6),
                  _('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 0)('rowHeight', 50)(
                    'scrollbarV',
                    !0
                  )('scrollbarH', !0)('rows', r.rows)('treeFromRelation', 'parentId')('treeToRelation', 'id'),
                  m(1),
                  _('width', 80),
                  m(1),
                  _('isTreeColumn', !0)('width', 300)('treeLevelIndent', 20),
                  m(4),
                  _('width', 300),
                  m(1),
                  _('width', 300));
            },
            dependencies: [Ne, H, De, kw],
            styles: ['.icon[_ngcontent-%COMP%]{height:10px;width:10px}', '.disabled[_ngcontent-%COMP%]{opacity:.5}']
          })),
          t
        );
      })();
      function Rk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'span', 9),
            v('dblclick', function () {
              Y(e);
              const o = E().rowIndex;
              return Z((E().editing[o + '-name'] = !0));
            }),
            g(1),
            p();
        }
        if (2 & t) {
          const e = E().value;
          m(1), se(' ', e, ' ');
        }
      }
      function kk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'input', 10),
            v('blur', function (o) {
              Y(e);
              const i = E().rowIndex;
              return Z(E().updateValue(o, 'name', i));
            }),
            p();
        }
        2 & t && _('value', E().value);
      }
      function Pk(t, n) {
        if ((1 & t && (b(0, Rk, 2, 1, 'span', 7), b(1, kk, 1, 1, 'input', 8)), 2 & t)) {
          const e = n.rowIndex,
            r = E();
          _('ngIf', !r.editing[e + '-name']), m(1), _('ngIf', r.editing[e + '-name']);
        }
      }
      function Fk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'span', 9),
            v('dblclick', function () {
              Y(e);
              const o = E().rowIndex;
              return Z((E().editing[o + '-gender'] = !0));
            }),
            g(1),
            p();
        }
        if (2 & t) {
          const e = E().value;
          m(1), se(' ', e, ' ');
        }
      }
      function Nk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'select', 12),
            v('blur', function () {
              Y(e);
              const o = E().rowIndex;
              return Z((E().editing[o + '-gender'] = !1));
            })('change', function (o) {
              Y(e);
              const i = E().rowIndex;
              return Z(E().updateValue(o, 'gender', i));
            }),
            f(1, 'option', 13),
            g(2, 'Male'),
            p(),
            f(3, 'option', 14),
            g(4, 'Female'),
            p()();
        }
        2 & t && _('value', E().value);
      }
      function Ok(t, n) {
        if ((1 & t && (b(0, Fk, 2, 1, 'span', 7), b(1, Nk, 5, 1, 'select', 11)), 2 & t)) {
          const e = n.rowIndex,
            r = E();
          _('ngIf', !r.editing[e + '-gender']), m(1), _('ngIf', r.editing[e + '-gender']);
        }
      }
      function Hk(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      let Lk = (() => {
        class t {
          constructor() {
            (this.editing = {}),
              (this.rows = []),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e;
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
          updateValue(e, r, o) {
            console.log('inline editing rowIndex', o),
              (this.editing[o + '-' + r] = !1),
              (this.rows[o][r] = e.target.value),
              (this.rows = [...this.rows]),
              console.log('UPDATED!', this.rows[o][r]);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['inline-edit-demo']],
            decls: 14,
            vars: 5,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/inline.component.ts',
                'target',
                '_blank'
              ],
              ['rowHeight', 'auto', 1, 'material', 3, 'headerHeight', 'limit', 'columnMode', 'footerHeight', 'rows'],
              ['mydatatable', ''],
              ['name', 'Name'],
              ['ngx-datatable-cell-template', ''],
              ['name', 'Gender'],
              ['name', 'Age'],
              ['title', 'Double click to edit', 3, 'dblclick', 4, 'ngIf'],
              ['autofocus', '', 'type', 'text', 3, 'value', 'blur', 4, 'ngIf'],
              ['title', 'Double click to edit', 3, 'dblclick'],
              ['autofocus', '', 'type', 'text', 3, 'value', 'blur'],
              [3, 'value', 'blur', 'change', 4, 'ngIf'],
              [3, 'value', 'blur', 'change'],
              ['value', 'male'],
              ['value', 'female']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Inline Editing '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'ngx-datatable', 1, 2)(8, 'ngx-datatable-column', 3),
                b(9, Pk, 2, 2, 'ng-template', 4),
                p(),
                f(10, 'ngx-datatable-column', 5),
                b(11, Ok, 2, 2, 'ng-template', 4),
                p(),
                f(12, 'ngx-datatable-column', 6),
                b(13, Hk, 1, 1, 'ng-template', 4),
                p()()()),
                2 & e &&
                  (m(6),
                  _('headerHeight', 50)('limit', 5)('columnMode', r.ColumnMode.force)('footerHeight', 50)(
                    'rows',
                    r.rows
                  ));
            },
            dependencies: [Ne, H, De, Ft],
            encapsulation: 2
          })),
          t
        );
      })();
      function Bk(t, n) {
        if ((1 & t && (f(0, 'strong'), g(1), p()), 2 & t)) {
          const e = n.value;
          m(1), Qe(e);
        }
      }
      function jk(t, n) {
        if ((1 & t && (S(0, 'i', 6), g(1, ' and '), f(2, 'i'), g(3), p()), 2 & t)) {
          const r = n.value;
          _('innerHTML', n.row.name, mr), m(3), Qe(r);
        }
      }
      let Vk = (() => {
          class t {
            constructor() {
              (this.expanded = {}),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            onPage(e) {
              clearTimeout(this.timeout),
                (this.timeout = setTimeout(() => {
                  console.log('paged!', e);
                }, 100));
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/100k.json'),
                (r.onload = () => {
                  const o = JSON.parse(r.response);
                  for (const i of o) i.height = Math.floor(80 * Math.random()) + 50;
                  e(o);
                }),
                r.send();
            }
            getRowHeight(e) {
              return e.height;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['virtual-scroll-demo']],
              decls: 12,
              vars: 9,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/virtual.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  3,
                  'rows',
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight',
                  'scrollbarV',
                  'page'
                ],
                ['name', 'Name', 3, 'width'],
                ['ngx-datatable-cell-template', ''],
                ['name', 'Gender', 3, 'width'],
                ['name', 'Row Height', 'prop', 'height', 3, 'width'],
                [3, 'innerHTML']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Virtual Scrolling with 10k Rows '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  v('page', function (i) {
                    return r.onPage(i);
                  }),
                  f(7, 'ngx-datatable-column', 2),
                  b(8, Bk, 2, 1, 'ng-template', 3),
                  p(),
                  f(9, 'ngx-datatable-column', 4),
                  b(10, jk, 4, 2, 'ng-template', 3),
                  p(),
                  S(11, 'ngx-datatable-column', 5),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)(
                      'rowHeight',
                      r.getRowHeight
                    )('scrollbarV', !0),
                    m(1),
                    _('width', 300),
                    m(2),
                    _('width', 300),
                    m(2),
                    _('width', 80));
              },
              dependencies: [H, De, Ft],
              encapsulation: 2
            })),
            t
          );
        })(),
        $k = (() => {
          class t {
            constructor() {
              (this.rows = []),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/100k.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['horz-vert-scrolling-demo']],
              decls: 12,
              vars: 9,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/scrolling.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  'columnMode',
                  'force',
                  1,
                  'material',
                  3,
                  'rows',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight',
                  'scrollbarV',
                  'scrollbarH'
                ],
                ['name', 'Name', 3, 'width'],
                ['name', 'Gender'],
                ['name', 'Age'],
                ['name', 'City', 'prop', 'address.city', 3, 'width'],
                ['name', 'State', 'prop', 'address.state', 3, 'width']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Horizontal and Vertical Scrolling '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  S(7, 'ngx-datatable-column', 2)(8, 'ngx-datatable-column', 3)(9, 'ngx-datatable-column', 4)(
                    10,
                    'ngx-datatable-column',
                    5
                  )(11, 'ngx-datatable-column', 6),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('headerHeight', 50)('footerHeight', 0)('rowHeight', 50)('scrollbarV', !0)(
                      'scrollbarH',
                      !0
                    ),
                    m(1),
                    _('width', 300),
                    m(3),
                    _('width', 300),
                    m(1),
                    _('width', 300));
              },
              dependencies: [H, De],
              encapsulation: 2
            })),
            t
          );
        })(),
        Uk = (() => {
          class t {
            constructor() {
              (this.columns1 = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }]),
                (this.columns2 = [{ prop: 'name', name: 'Name' }, { name: 'Gender' }]),
                (this.rows1 = [
                  { name: 'Larry', gender: 'Male', company: 'Cisco' },
                  { name: 'Lauren', gender: 'Female', company: 'HP' }
                ]),
                (this.rows2 = [
                  { name: 'Callie', gender: 'Female' },
                  { name: 'Maggie', gender: 'Female' }
                ]),
                (this.ColumnMode = L);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['multiple-tables-demo']],
              decls: 9,
              vars: 10,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/multiple.component.ts',
                  'target',
                  '_blank'
                ],
                [1, 'material', 3, 'rows', 'columns', 'columnMode', 'headerHeight', 'footerHeight', 'rowHeight'],
                ['rowHeight', 'auto', 1, 'material', 3, 'rows', 'columns', 'headerHeight', 'footerHeight']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Multiple Tables '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  S(6, 'ngx-datatable', 1)(7, 'br')(8, 'ngx-datatable', 2),
                  p()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows1)('columns', r.columns1)('columnMode', r.ColumnMode.force)('headerHeight', 50)(
                      'footerHeight',
                      0
                    )('rowHeight', 100),
                    m(2),
                    _('rows', r.rows2)('columns', r.columns2)('headerHeight', 50)('footerHeight', 50));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })();
      const zk = ['myTable'];
      function Gk(t, n) {
        if (
          (1 & t && (f(0, 'div', 14)(1, 'div')(2, 'strong'), g(3, 'Address'), p()(), f(4, 'div'), g(5), p()()), 2 & t)
        ) {
          const e = n.row;
          m(5), Xn('', e.address.city, ', ', e.address.state, '');
        }
      }
      function Wk(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'a', 15),
            v('click', function () {
              const i = Y(e).row;
              return Z(E().toggleExpandRow(i));
            }),
            p();
        }
        if (2 & t) {
          const e = n.expanded;
          ht('datatable-icon-right', !e)('datatable-icon-down', e);
        }
      }
      function qk(t, n) {
        if ((1 & t && (f(0, 'strong'), g(1), p()), 2 & t)) {
          const e = n.rowIndex;
          m(1), Qe(e);
        }
      }
      function Qk(t, n) {
        if ((1 & t && (f(0, 'strong'), g(1), p()), 2 & t)) {
          const e = n.expanded;
          m(1), Qe(1 === e);
        }
      }
      function Xk(t, n) {
        if ((1 & t && (f(0, 'strong'), g(1), p()), 2 & t)) {
          const e = n.value;
          m(1), Qe(e);
        }
      }
      function Yk(t, n) {
        if ((1 & t && (S(0, 'i', 16), g(1, ' and '), f(2, 'i'), g(3), p()), 2 & t)) {
          const r = n.value;
          _('innerHTML', n.row.name, mr), m(3), Qe(r);
        }
      }
      let Zk = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.expanded = {}),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e;
              });
          }
          onPage(e) {
            clearTimeout(this.timeout),
              (this.timeout = setTimeout(() => {
                console.log('paged!', e);
              }, 100));
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/100k.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
          toggleExpandRow(e) {
            console.log('Toggled Expand Row!', e), this.table.rowDetail.toggleExpandRow(e);
          }
          onDetailToggle(e) {
            console.log('Detail Toggled', e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['row-details-demo']],
            viewQuery: function (e, r) {
              if ((1 & e && Pt(zk, 5), 2 & e)) {
                let o;
                we((o = be())) && (r.table = o.first);
              }
            },
            decls: 28,
            vars: 16,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/row-detail.component.ts',
                'target',
                '_blank'
              ],
              ['href', 'javascript:void(0)', 3, 'click'],
              [
                1,
                'material',
                'expandable',
                3,
                'columnMode',
                'headerHeight',
                'footerHeight',
                'rowHeight',
                'scrollbarV',
                'rows',
                'page'
              ],
              ['myTable', ''],
              [3, 'rowHeight', 'toggle'],
              ['myDetailRow', ''],
              ['ngx-datatable-row-detail-template', ''],
              [3, 'width', 'resizeable', 'sortable', 'draggable', 'canAutoResize'],
              ['ngx-datatable-cell-template', ''],
              ['name', 'Index', 3, 'width'],
              ['name', 'Expanded', 3, 'width'],
              ['name', 'Name', 3, 'width'],
              ['name', 'Gender', 3, 'width'],
              ['name', 'Age'],
              [2, 'padding-left', '35px'],
              ['href', 'javascript:void(0)', 'title', 'Expand/Collapse Row', 3, 'click'],
              [3, 'innerHTML']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Row Detail Demo '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()(),
                f(6, 'small')(7, 'a', 1),
                v('click', function () {
                  return r.table.rowDetail.expandAllRows();
                }),
                g(8, 'Expand All'),
                p(),
                g(9, ' | '),
                f(10, 'a', 1),
                v('click', function () {
                  return r.table.rowDetail.collapseAllRows();
                }),
                g(11, 'Collapse All'),
                p()()(),
                f(12, 'ngx-datatable', 2, 3),
                v('page', function (i) {
                  return r.onPage(i);
                }),
                f(14, 'ngx-datatable-row-detail', 4, 5),
                v('toggle', function (i) {
                  return r.onDetailToggle(i);
                }),
                b(16, Gk, 6, 2, 'ng-template', 6),
                p(),
                f(17, 'ngx-datatable-column', 7),
                b(18, Wk, 1, 4, 'ng-template', 8),
                p(),
                f(19, 'ngx-datatable-column', 9),
                b(20, qk, 2, 1, 'ng-template', 8),
                p(),
                f(21, 'ngx-datatable-column', 10),
                b(22, Qk, 2, 1, 'ng-template', 8),
                p(),
                f(23, 'ngx-datatable-column', 11),
                b(24, Xk, 2, 1, 'ng-template', 8),
                p(),
                f(25, 'ngx-datatable-column', 12),
                b(26, Yk, 4, 2, 'ng-template', 8),
                p(),
                S(27, 'ngx-datatable-column', 13),
                p()()),
                2 & e &&
                  (m(12),
                  _('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)('rowHeight', 50)(
                    'scrollbarV',
                    !0
                  )('rows', r.rows),
                  m(2),
                  _('rowHeight', 100),
                  m(3),
                  _('width', 50)('resizeable', !1)('sortable', !1)('draggable', !1)('canAutoResize', !1),
                  m(2),
                  _('width', 80),
                  m(2),
                  _('width', 80),
                  m(2),
                  _('width', 200),
                  m(2),
                  _('width', 300));
            },
            dependencies: [H, Pd, kd, De, Ft],
            encapsulation: 2
          })),
          t
        );
      })();
      const Kk = ['myTable'];
      function Jk(t, n) {
        if ((1 & t && (f(0, 'div', 13)(1, 'div'), g(2), p()()), 2 & t)) {
          const e = n.row;
          m(2), Xn('', e.gender, ', ', e.age, '');
        }
      }
      function e2(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'a', 14),
            v('click', function () {
              const i = Y(e).row;
              return Z(E().toggleExpandRow(i));
            }),
            p();
        }
        if (2 & t) {
          const e = n.expanded;
          ht('datatable-icon-right', !e)('datatable-icon-down', e);
        }
      }
      function t2(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      function n2(t, n) {
        if ((1 & t && (f(0, 'span', 15), g(1), p()), 2 & t)) {
          const e = n.column;
          m(1), Qe(e.name);
        }
      }
      function r2(t, n) {
        if ((1 & t && (f(0, 'span', 15), g(1), p()), 2 & t)) {
          const e = n.value;
          m(1), Qe(e);
        }
      }
      function o2(t, n) {
        if ((1 & t && (f(0, 'span', 15), g(1), p()), 2 & t)) {
          const e = n.column;
          m(1), Qe(e.name);
        }
      }
      function i2(t, n) {
        if ((1 & t && (f(0, 'span', 15), g(1), p()), 2 & t)) {
          const e = n.value;
          m(1), Qe(e);
        }
      }
      let s2 = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.expanded = {}),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e;
              });
          }
          onPage(e) {
            clearTimeout(this.timeout),
              (this.timeout = setTimeout(() => {
                console.log('paged!', e);
              }, 100));
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/100k.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
          toggleExpandRow(e) {
            console.log('Toggled Expand Row!', e), this.table.rowDetail.toggleExpandRow(e);
          }
          onDetailToggle(e) {
            console.log('Detail Toggled', e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['responsive-demo']],
            viewQuery: function (e, r) {
              if ((1 & e && Pt(Kk, 5), 2 & e)) {
                let o;
                we((o = be())) && (r.table = o.first);
              }
            },
            decls: 32,
            vars: 16,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/responsive.component.ts',
                'target',
                '_blank'
              ],
              [
                1,
                'material',
                'expandable',
                3,
                'columnMode',
                'headerHeight',
                'footerHeight',
                'rowHeight',
                'scrollbarV',
                'rows',
                'page'
              ],
              ['myTable', ''],
              [3, 'rowHeight', 'toggle'],
              ['myDetailRow', ''],
              ['ngx-datatable-row-detail-template', ''],
              [3, 'width', 'resizeable', 'sortable', 'draggable', 'canAutoResize'],
              ['ngx-datatable-cell-template', ''],
              ['name', 'Name', 3, 'flexGrow', 'minWidth'],
              ['name', 'Gender', 3, 'flexGrow'],
              ['ngx-datatable-header-template', ''],
              ['name', 'Age', 3, 'flexGrow'],
              [2, 'margin', '50px'],
              [2, 'padding-left', '60px', 'font-size', '14px'],
              ['href', '#', 'title', 'Expand/Collapse Row', 1, 'desktop-hidden', 3, 'click'],
              [1, 'mobile-hidden']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Responsive Demo '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'ngx-datatable', 1, 2),
                v('page', function (i) {
                  return r.onPage(i);
                }),
                f(8, 'ngx-datatable-row-detail', 3, 4),
                v('toggle', function (i) {
                  return r.onDetailToggle(i);
                }),
                b(10, Jk, 3, 2, 'ng-template', 5),
                p(),
                f(11, 'ngx-datatable-column', 6),
                b(12, e2, 1, 4, 'ng-template', 7),
                p(),
                f(13, 'ngx-datatable-column', 8),
                b(14, t2, 1, 1, 'ng-template', 7),
                p(),
                f(15, 'ngx-datatable-column', 9),
                b(16, n2, 2, 1, 'ng-template', 10),
                b(17, r2, 2, 1, 'ng-template', 7),
                p(),
                f(18, 'ngx-datatable-column', 11),
                b(19, o2, 2, 1, 'ng-template', 10),
                b(20, i2, 2, 1, 'ng-template', 7),
                p()()(),
                f(21, 'div', 12),
                g(22, ' This demo combines the features used in the '),
                f(23, 'i'),
                g(24, 'Row Detail'),
                p(),
                g(25, ' Rows demo, '),
                f(26, 'i'),
                g(27, 'Flex'),
                p(),
                g(28, ' Column demo, and the '),
                f(29, 'i'),
                g(30, 'Inline'),
                p(),
                g(
                  31,
                  ' Templates demo. When your browser is at 800px, the gender and age columns will be hidden and will appear in the row detail view. '
                ),
                p()),
                2 & e &&
                  (m(6),
                  _('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)('rowHeight', 50)(
                    'scrollbarV',
                    !0
                  )('rows', r.rows),
                  m(2),
                  _('rowHeight', 50),
                  m(3),
                  _('width', 50)('resizeable', !1)('sortable', !1)('draggable', !1)('canAutoResize', !1),
                  m(2),
                  _('flexGrow', 3)('minWidth', 200),
                  m(2),
                  _('flexGrow', 1),
                  m(3),
                  _('flexGrow', 1));
            },
            dependencies: [H, Pd, kd, De, ja, Ft],
            styles: [
              '@media screen and (max-width: 800px){.desktop-hidden{display:inline;display:initial}.mobile-hidden{display:none}}@media screen and (min-width: 800px){.desktop-hidden{display:none}.mobile-hidden{display:inline;display:initial}}\n'
            ],
            encapsulation: 2
          })),
          t
        );
      })();
      const a2 = function () {
          return { name: 'Name' };
        },
        l2 = function () {
          return { name: 'Gender' };
        },
        c2 = function () {
          return { name: 'Company' };
        },
        u2 = function (t, n, e) {
          return [t, n, e];
        };
      let d2 = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e;
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['client-paging-demo']],
            decls: 7,
            vars: 13,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/paging-client.component.ts',
                'target',
                '_blank'
              ],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                3,
                'rows',
                'columns',
                'columnMode',
                'headerHeight',
                'footerHeight',
                'limit'
              ]
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Client-side Paging '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                S(6, 'ngx-datatable', 1),
                p()),
                2 & e &&
                  (m(6),
                  _('rows', r.rows)('columns', To(9, u2, Ze(6, a2), Ze(7, l2), Ze(8, c2)))(
                    'columnMode',
                    r.ColumnMode.force
                  )('headerHeight', 50)('footerHeight', 50)('limit', 10));
            },
            dependencies: [H],
            encapsulation: 2
          })),
          t
        );
      })();
      function B(...t) {
        return ze(t, Lo(t));
      }
      class f2 extends Dt {
        constructor(n, e) {
          super();
        }
        schedule(n, e = 0) {
          return this;
        }
      }
      const za = {
          setInterval(t, n, ...e) {
            const { delegate: r } = za;
            return null != r && r.setInterval ? r.setInterval(t, n, ...e) : setInterval(t, n, ...e);
          },
          clearInterval(t) {
            const { delegate: n } = za;
            return ((null == n ? void 0 : n.clearInterval) || clearInterval)(t);
          },
          delegate: void 0
        },
        Ww = { now: () => (Ww.delegate || Date).now(), delegate: void 0 };
      class ji {
        constructor(n, e = ji.now) {
          (this.schedulerActionCtor = n), (this.now = e);
        }
        schedule(n, e = 0, r) {
          return new this.schedulerActionCtor(this, n).schedule(r, e);
        }
      }
      ji.now = Ww.now;
      const qw = new (class p2 extends ji {
          constructor(n, e = ji.now) {
            super(n, e), (this.actions = []), (this._active = !1);
          }
          flush(n) {
            const { actions: e } = this;
            if (this._active) return void e.push(n);
            let r;
            this._active = !0;
            do {
              if ((r = n.execute(n.state, n.delay))) break;
            } while ((n = e.shift()));
            if (((this._active = !1), r)) {
              for (; (n = e.shift()); ) n.unsubscribe();
              throw r;
            }
          }
        })(
          class h2 extends f2 {
            constructor(n, e) {
              super(n, e), (this.scheduler = n), (this.work = e), (this.pending = !1);
            }
            schedule(n, e = 0) {
              var r;
              if (this.closed) return this;
              this.state = n;
              const o = this.id,
                i = this.scheduler;
              return (
                null != o && (this.id = this.recycleAsyncId(i, o, e)),
                (this.pending = !0),
                (this.delay = e),
                (this.id = null !== (r = this.id) && void 0 !== r ? r : this.requestAsyncId(i, this.id, e)),
                this
              );
            }
            requestAsyncId(n, e, r = 0) {
              return za.setInterval(n.flush.bind(n, this), r);
            }
            recycleAsyncId(n, e, r = 0) {
              if (null != r && this.delay === r && !1 === this.pending) return e;
              null != e && za.clearInterval(e);
            }
            execute(n, e) {
              if (this.closed) return new Error('executing a cancelled action');
              this.pending = !1;
              const r = this._execute(n, e);
              if (r) return r;
              !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
            }
            _execute(n, e) {
              let o,
                r = !1;
              try {
                this.work(n);
              } catch (i) {
                (r = !0), (o = i || new Error('Scheduled action threw falsy error'));
              }
              if (r) return this.unsubscribe(), o;
            }
            unsubscribe() {
              if (!this.closed) {
                const { id: n, scheduler: e } = this,
                  { actions: r } = e;
                (this.work = this.state = this.scheduler = null),
                  (this.pending = !1),
                  Nr(r, this),
                  null != n && (this.id = this.recycleAsyncId(e, n, null)),
                  (this.delay = null),
                  super.unsubscribe();
              }
            }
          }
        ),
        g2 = qw;
      function Ga(...t) {
        return (function m2() {
          return Or(1);
        })()(ze(t, Lo(t)));
      }
      function Ir(t) {
        return t <= 0
          ? () => bn
          : He((n, e) => {
              let r = 0;
              n.subscribe(
                Le(e, o => {
                  ++r <= t && (e.next(o), t <= r && e.complete());
                })
              );
            });
      }
      function Qw(t) {
        return ie(() => t);
      }
      function Xw(t, n) {
        return n
          ? e =>
              Ga(
                n.pipe(
                  Ir(1),
                  (function _2() {
                    return He((t, n) => {
                      t.subscribe(Le(n, os));
                    });
                  })()
                ),
                e.pipe(Xw(t))
              )
          : Ue((e, r) => t(e, r).pipe(Ir(1), Qw(e)));
      }
      function Yw(t, n = qw) {
        const e = (function w2(t = 0, n, e = g2) {
          let r = -1;
          return (
            null != n && (Wf(n) ? (e = n) : (r = n)),
            new Ie(o => {
              let i = (function y2(t) {
                return t instanceof Date && !isNaN(t);
              })(t)
                ? +t - e.now()
                : t;
              i < 0 && (i = 0);
              let s = 0;
              return e.schedule(function () {
                o.closed || (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete());
              }, i);
            })
          );
        })(t, n);
        return Xw(() => e);
      }
      class Vi {
        constructor() {
          (this.size = 0), (this.totalElements = 0), (this.totalPages = 0), (this.pageNumber = 0);
        }
      }
      class b2 {
        constructor() {
          (this.data = new Array()), (this.page = new Vi());
        }
      }
      class v2 {
        constructor(n, e, r, o) {
          (this.name = n), (this.gender = e), (this.company = r), (this.age = o);
        }
      }
      const Wa = JSON.parse(
        '[{"name":"Ethel Price","gender":"female","company":"Johnson, Johnson and Partners, LLC CMP DDC","age":22},{"name":"Claudine Neal","gender":"female","company":"Sealoud","age":55},{"name":"Beryl Rice","gender":"female","company":"Velity","age":67},{"name":"Wilder Gonzales","gender":"male","company":"Geekko"},{"name":"Georgina Schultz","gender":"female","company":"Suretech"},{"name":"Carroll Buchanan","gender":"male","company":"Ecosys"},{"name":"Valarie Atkinson","gender":"female","company":"Hopeli"},{"name":"Schroeder Mathews","gender":"male","company":"Polarium"},{"name":"Lynda Mendoza","gender":"female","company":"Dogspa"},{"name":"Sarah Massey","gender":"female","company":"Bisba"},{"name":"Robles Boyle","gender":"male","company":"Comtract"},{"name":"Evans Hickman","gender":"male","company":"Parleynet"},{"name":"Dawson Barber","gender":"male","company":"Dymi"},{"name":"Bruce Strong","gender":"male","company":"Xyqag"},{"name":"Nellie Whitfield","gender":"female","company":"Exospace"},{"name":"Jackson Macias","gender":"male","company":"Aquamate"},{"name":"Pena Pena","gender":"male","company":"Quarx"},{"name":"Lelia Gates","gender":"female","company":"Proxsoft"},{"name":"Letitia Vasquez","gender":"female","company":"Slumberia"},{"name":"Trevino Moreno","gender":"male","company":"Conjurica"},{"name":"Barr Page","gender":"male","company":"Apex"},{"name":"Kirkland Merrill","gender":"male","company":"Utara"},{"name":"Blanche Conley","gender":"female","company":"Imkan"},{"name":"Atkins Dunlap","gender":"male","company":"Comveyor"},{"name":"Everett Foreman","gender":"male","company":"Maineland"},{"name":"Gould Randolph","gender":"male","company":"Intergeek"},{"name":"Kelli Leon","gender":"female","company":"Verbus"},{"name":"Freda Mason","gender":"female","company":"Accidency"},{"name":"Tucker Maxwell","gender":"male","company":"Lumbrex"},{"name":"Yvonne Parsons","gender":"female","company":"Zolar"},{"name":"Woods Key","gender":"male","company":"Bedder"},{"name":"Stephens Reilly","gender":"male","company":"Acusage"},{"name":"Mcfarland Sparks","gender":"male","company":"Comvey"},{"name":"Jocelyn Sawyer","gender":"female","company":"Fortean"},{"name":"Renee Barr","gender":"female","company":"Kiggle"},{"name":"Gaines Beck","gender":"male","company":"Sequitur"},{"name":"Luisa Farrell","gender":"female","company":"Cinesanct"},{"name":"Robyn Strickland","gender":"female","company":"Obones"},{"name":"Roseann Jarvis","gender":"female","company":"Aquazure"},{"name":"Johnston Park","gender":"male","company":"Netur"},{"name":"Wong Craft","gender":"male","company":"Opticall"},{"name":"Merritt Cole","gender":"male","company":"Techtrix"},{"name":"Dale Byrd","gender":"female","company":"Kneedles"},{"name":"Sara Delgado","gender":"female","company":"Netagy"},{"name":"Alisha Myers","gender":"female","company":"Intradisk"},{"name":"Felecia Smith","gender":"female","company":"Futurity"},{"name":"Neal Harvey","gender":"male","company":"Pyramax"},{"name":"Nola Miles","gender":"female","company":"Sonique"},{"name":"Herring Pierce","gender":"male","company":"Geeketron"},{"name":"Shelley Rodriquez","gender":"female","company":"Bostonic"},{"name":"Cora Chase","gender":"female","company":"Isonus"},{"name":"Mckay Santos","gender":"male","company":"Amtas"},{"name":"Hilda Crane","gender":"female","company":"Jumpstack"},{"name":"Jeanne Lindsay","gender":"female","company":"Genesynk"},{"name":"Frye Sharpe","gender":"male","company":"Eplode"},{"name":"Velma Fry","gender":"female","company":"Ronelon"},{"name":"Reyna Espinoza","gender":"female","company":"Prismatic"},{"name":"Spencer Sloan","gender":"male","company":"Comverges"},{"name":"Graham Marsh","gender":"male","company":"Medifax"},{"name":"Hale Boone","gender":"male","company":"Digial"},{"name":"Wiley Hubbard","gender":"male","company":"Zensus"},{"name":"Blackburn Drake","gender":"male","company":"Frenex"},{"name":"Franco Hunter","gender":"male","company":"Rockabye"},{"name":"Barnett Case","gender":"male","company":"Norali"},{"name":"Alexander Foley","gender":"male","company":"Geekosis"},{"name":"Lynette Stein","gender":"female","company":"Macronaut"},{"name":"Anthony Joyner","gender":"male","company":"Senmei"},{"name":"Garrett Brennan","gender":"male","company":"Bluegrain"},{"name":"Betsy Horton","gender":"female","company":"Zilla"},{"name":"Patton Small","gender":"male","company":"Genmex"},{"name":"Lakisha Huber","gender":"female","company":"Insource"},{"name":"Lindsay Avery","gender":"female","company":"Unq"},{"name":"Ayers Hood","gender":"male","company":"Accuprint"},{"name":"Torres Durham","gender":"male","company":"Uplinx"},{"name":"Vincent Hernandez","gender":"male","company":"Talendula"},{"name":"Baird Ryan","gender":"male","company":"Aquasseur"},{"name":"Georgia Mercer","gender":"female","company":"Skyplex"},{"name":"Francesca Elliott","gender":"female","company":"Nspire"},{"name":"Lyons Peters","gender":"male","company":"Quinex"},{"name":"Kristi Brewer","gender":"female","company":"Oronoko"},{"name":"Tonya Bray","gender":"female","company":"Insuron"},{"name":"Valenzuela Huff","gender":"male","company":"Applideck"},{"name":"Tiffany Anderson","gender":"female","company":"Zanymax"},{"name":"Jerri King","gender":"female","company":"Eventex"},{"name":"Rocha Meadows","gender":"male","company":"Goko"},{"name":"Marcy Green","gender":"female","company":"Pharmex"},{"name":"Kirk Cross","gender":"male","company":"Portico"},{"name":"Hattie Mullen","gender":"female","company":"Zilencio"},{"name":"Deann Bridges","gender":"female","company":"Equitox"},{"name":"Chaney Roach","gender":"male","company":"Qualitern"},{"name":"Consuelo Dickson","gender":"female","company":"Poshome"},{"name":"Billie Rowe","gender":"female","company":"Cemention"},{"name":"Bean Donovan","gender":"male","company":"Mantro"},{"name":"Lancaster Patel","gender":"male","company":"Krog"},{"name":"Rosa Dyer","gender":"female","company":"Netility"},{"name":"Christine Compton","gender":"female","company":"Bleeko"},{"name":"Milagros Finch","gender":"female","company":"Handshake"},{"name":"Ericka Alvarado","gender":"female","company":"Lyrichord"},{"name":"Sylvia Sosa","gender":"female","company":"Circum"},{"name":"Humphrey Curtis","gender":"male","company":"Corepan"}]'
      );
      let nr = (() => {
        class t {
          getResults(e) {
            return B(Wa)
              .pipe(ie(r => this.getPagedData(e)))
              .pipe(Yw(1e3 * Math.random()));
          }
          getPagedData(e) {
            const r = new b2();
            (e.totalElements = Wa.length), (e.totalPages = e.totalElements / e.size);
            const o = e.pageNumber * e.size,
              i = Math.min(o + e.size, e.totalElements);
            for (let s = o; s < i; s++) {
              const a = Wa[s],
                l = new v2(a.name, a.gender, a.company, a.age);
              r.data.push(l);
            }
            return (r.page = e), r;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const C2 = function () {
          return { name: 'Name' };
        },
        D2 = function () {
          return { name: 'Gender' };
        },
        T2 = function () {
          return { name: 'Company' };
        },
        S2 = function (t, n, e) {
          return [t, n, e];
        };
      let x2 = (() => {
        class t {
          constructor(e) {
            (this.serverResultsService = e),
              (this.page = new Vi()),
              (this.rows = new Array()),
              (this.ColumnMode = L),
              (this.page.pageNumber = 0),
              (this.page.size = 20);
          }
          ngOnInit() {
            this.setPage({ offset: 0 });
          }
          setPage(e) {
            (this.page.pageNumber = e.offset),
              this.serverResultsService.getResults(this.page).subscribe(r => {
                (this.page = r.page), (this.rows = r.data);
              });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(nr));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['server-paging-demo']],
            features: [Cr([nr])],
            decls: 7,
            vars: 16,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/paging-server.component.ts',
                'target',
                '_blank'
              ],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                3,
                'rows',
                'columns',
                'columnMode',
                'headerHeight',
                'footerHeight',
                'externalPaging',
                'count',
                'offset',
                'limit',
                'page'
              ]
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Server-side Paging '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'ngx-datatable', 1),
                v('page', function (i) {
                  return r.setPage(i);
                }),
                p()()),
                2 & e &&
                  (m(6),
                  _('rows', r.rows)('columns', To(12, S2, Ze(9, C2), Ze(10, D2), Ze(11, T2)))(
                    'columnMode',
                    r.ColumnMode.force
                  )('headerHeight', 50)('footerHeight', 50)('externalPaging', !0)('count', r.page.totalElements)(
                    'offset',
                    r.page.pageNumber
                  )('limit', r.page.size));
            },
            dependencies: [H],
            encapsulation: 2
          })),
          t
        );
      })();
      const I2 = function () {
          return { name: 'Name' };
        },
        E2 = function () {
          return { name: 'Gender' };
        },
        M2 = function () {
          return { name: 'Company' };
        },
        A2 = function (t, n, e) {
          return [t, n, e];
        };
      let R2 = (() => {
        class t {
          constructor(e) {
            (this.serverResultsService = e),
              (this.page = new Vi()),
              (this.rows = new Array()),
              (this.ColumnMode = L),
              (this.page.pageNumber = 0),
              (this.page.size = 20);
          }
          ngOnInit() {
            this.setPage({ offset: 0 });
          }
          setPage(e) {
            (this.page.pageNumber = e.offset),
              this.serverResultsService.getResults(this.page).subscribe(r => {
                (this.page = r.page), (this.rows = r.data);
              });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(nr));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['paging-scrolling-novirtualization-demo']],
            features: [Cr([nr])],
            decls: 7,
            vars: 18,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/paging-scrolling-novirtualization.component.ts',
                'target',
                '_blank'
              ],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                3,
                'rows',
                'columns',
                'columnMode',
                'headerHeight',
                'footerHeight',
                'scrollbarV',
                'virtualization',
                'externalPaging',
                'count',
                'offset',
                'limit',
                'page'
              ]
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Server-side Paging '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'ngx-datatable', 1),
                v('page', function (i) {
                  return r.setPage(i);
                }),
                p()()),
                2 & e &&
                  (m(6),
                  _('rows', r.rows)('columns', To(14, A2, Ze(11, I2), Ze(12, E2), Ze(13, M2)))(
                    'columnMode',
                    r.ColumnMode.force
                  )('headerHeight', 50)('footerHeight', 50)('scrollbarV', !0)('virtualization', !1)(
                    'externalPaging',
                    !0
                  )('count', r.page.totalElements)('offset', r.page.pageNumber)('limit', r.page.size));
            },
            dependencies: [H],
            encapsulation: 2
          })),
          t
        );
      })();
      const k2 = function () {
          return { name: 'Name' };
        },
        P2 = function () {
          return { name: 'Gender' };
        },
        F2 = function () {
          return { name: 'Company' };
        },
        N2 = function (t, n, e) {
          return [t, n, e];
        },
        O2 = Wa;
      let Zw = (() => {
          class t {
            getResults(e, r) {
              return B(O2.slice(e, e + r)).pipe(
                Yw(new Date(Date.now() + 500)),
                ie(o => ({ data: o }))
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        H2 = (() => {
          class t {
            constructor(e, r) {
              (this.serverResultsService = e),
                (this.el = r),
                (this.headerHeight = 50),
                (this.rowHeight = 50),
                (this.pageLimit = 10),
                (this.rows = []),
                (this.ColumnMode = L);
            }
            ngOnInit() {
              this.onScroll(0);
            }
            onScroll(e) {
              const r = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;
              if (!this.isLoading && e + r >= this.rows.length * this.rowHeight) {
                let o = this.pageLimit;
                if (0 === this.rows.length) {
                  const i = Math.ceil(r / this.rowHeight);
                  o = Math.max(i, this.pageLimit);
                }
                this.loadPage(o);
              }
            }
            loadPage(e) {
              (this.isLoading = !0),
                this.serverResultsService.getResults(this.rows.length, e).subscribe(r => {
                  const o = [...this.rows, ...r.data];
                  (this.rows = o), (this.isLoading = !1);
                });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(Zw), I(nt));
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['server-scrolling-demo']],
              features: [Cr([Zw])],
              decls: 7,
              vars: 14,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/scrolling-server.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  'server-scrolling-demo',
                  3,
                  'rows',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'rowHeight',
                  'loadingIndicator',
                  'scrollbarV',
                  'scroll'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Server-side Scrolling '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  v('scroll', function (i) {
                    return r.onScroll(i.offsetY);
                  }),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columns', To(10, N2, Ze(7, k2), Ze(8, P2), Ze(9, F2)))(
                      'columnMode',
                      r.ColumnMode.force
                    )('headerHeight', r.headerHeight)('rowHeight', r.rowHeight)('loadingIndicator', r.isLoading)(
                      'scrollbarV',
                      !0
                    ));
              },
              dependencies: [H],
              styles: [
                '.server-scrolling-demo[_ngcontent-%COMP%]{height:calc(100vh - 110px)}  .progress-linear{position:fixed!important;bottom:0}'
              ]
            })),
            t
          );
        })(),
        L2 = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.columns = [{ name: 'Company' }, { name: 'Name' }, { name: 'Gender' }]),
                (this.ColumnMode = L),
                (this.SortType = Sr),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  const o = JSON.parse(r.response);
                  e(o);
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['client-sorting-demo']],
              decls: 7,
              vars: 8,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/sorting-client.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  3,
                  'rows',
                  'columns',
                  'sortType',
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight',
                  'scrollbarV'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Client-side Sorting '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  S(6, 'ngx-datatable', 1),
                  p()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columns', r.columns)('sortType', r.SortType.multi)(
                      'columnMode',
                      r.ColumnMode.force
                    )('headerHeight', 50)('footerHeight', 50)('rowHeight', 50)('scrollbarV', !0));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })();
      function B2(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.row.company, ' ');
      }
      function j2(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.row.name, ' ');
      }
      const V2 = function () {
          return { prop: 'name', dir: 'desc' };
        },
        $2 = function (t) {
          return [t];
        };
      let U2 = (() => {
          class t {
            constructor() {
              (this.rows = []), (this.ColumnMode = L);
            }
            ngOnInit() {
              this.fetch(e => {
                this.rows = e;
              });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  const o = JSON.parse(r.response);
                  e(o);
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['default-sorting-demo']],
              decls: 12,
              vars: 10,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/sorting-default.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  3,
                  'rows',
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight',
                  'scrollbarV',
                  'sorts'
                ],
                ['name', 'Company'],
                ['ngx-datatable-cell-template', ''],
                ['name', 'Name'],
                ['name', 'Gender']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Client-side Sorting '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1)(7, 'ngx-datatable-column', 2),
                  b(8, B2, 1, 1, 'ng-template', 3),
                  p(),
                  f(9, 'ngx-datatable-column', 4),
                  b(10, j2, 1, 1, 'ng-template', 3),
                  p(),
                  S(11, 'ngx-datatable-column', 5),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)(
                      'rowHeight',
                      50
                    )('scrollbarV', !0)('sorts', da(8, $2, Ze(7, V2))));
              },
              dependencies: [H, De, Ft],
              encapsulation: 2
            })),
            t
          );
        })(),
        z2 = (() => {
          class t {
            constructor() {
              (this.loading = !1),
                (this.rows = []),
                (this.columns = [
                  { name: 'Company', sortable: !0 },
                  { name: 'Name', sortable: !0 },
                  { name: 'Gender', sortable: !0 }
                ]),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  const o = JSON.parse(r.response);
                  e(o.splice(0, 20));
                }),
                r.send();
            }
            onSort(e) {
              console.log('Sort Event', e),
                (this.loading = !0),
                setTimeout(() => {
                  const r = [...this.rows],
                    o = e.sorts[0];
                  r.sort((i, s) => i[o.prop].localeCompare(s[o.prop]) * ('desc' === o.dir ? -1 : 1)),
                    (this.rows = r),
                    (this.loading = !1);
                }, 1e3);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['server-sorting-demo']],
              decls: 7,
              vars: 7,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/sorting-server.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'material',
                  3,
                  'rows',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'externalSorting',
                  'loadingIndicator',
                  'sort'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Server-side Sorting '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  v('sort', function (i) {
                    return r.onSort(i);
                  }),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columns', r.columns)('columnMode', r.ColumnMode.force)('headerHeight', 50)(
                      'footerHeight',
                      50
                    )('externalSorting', !0)('loadingIndicator', r.loading));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })(),
        G2 = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.columns = [
                  { name: 'Company', comparator: this.companyComparator.bind(this) },
                  { name: 'Name', sortable: !1 },
                  { name: 'Gender', sortable: !1 }
                ]),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  const o = JSON.parse(r.response);
                  e(o.splice(0, 20));
                }),
                r.send();
            }
            companyComparator(e, r) {
              return (
                console.log('Sorting Comparator', e, r),
                e.toLowerCase() < r.toLowerCase() ? -1 : e.toLowerCase() > r.toLowerCase() ? 1 : void 0
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['comparator-sorting-demo']],
              decls: 7,
              vars: 5,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/sorting-comparator.component.ts',
                  'target',
                  '_blank'
                ],
                ['rowHeight', 'auto', 1, 'material', 3, 'rows', 'columns', 'columnMode', 'headerHeight', 'footerHeight']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Custom Sorting Comparator '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  S(6, 'ngx-datatable', 1),
                  p()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columns', r.columns)('columnMode', r.ColumnMode.force)('headerHeight', 50)(
                      'footerHeight',
                      50
                    ));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })(),
        W2 = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.selected = []),
                (this.columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }]),
                (this.ColumnMode = L),
                (this.SelectionType = Oe),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            onSelect(e) {
              console.log('Event: select', e, this.selected);
            }
            onActivate(e) {
              console.log('Event: activate', e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['cell-selection-demo']],
              decls: 7,
              vars: 8,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-cell.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  'selection-cell',
                  3,
                  'rows',
                  'columnMode',
                  'columns',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight',
                  'selected',
                  'selectionType',
                  'select',
                  'activate'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Cell Selection '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  v('select', function (i) {
                    return r.onSelect(i);
                  })('activate', function (i) {
                    return r.onActivate(i);
                  }),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columnMode', r.ColumnMode.force)('columns', r.columns)('headerHeight', 50)(
                      'footerHeight',
                      50
                    )('rowHeight', 50)('selected', r.selected)('selectionType', r.SelectionType.cell));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })();
      function q2(t, n) {
        if ((1 & t && (f(0, 'li'), g(1), p()), 2 & t)) {
          const e = n.$implicit;
          m(1), se(' ', e.name, ' ');
        }
      }
      function Q2(t, n) {
        1 & t && (f(0, 'li'), g(1, 'No Selections'), p());
      }
      let X2 = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.selected = []),
              (this.columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }]),
              (this.ColumnMode = L),
              (this.SelectionType = Oe),
              this.fetch(e => {
                this.rows = e;
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
          onSelect({ selected: e }) {
            console.log('Select Event', e, this.selected),
              this.selected.splice(0, this.selected.length),
              this.selected.push(...e);
          }
          onActivate(e) {
            console.log('Activate Event', e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['multi-selection-demo']],
            decls: 17,
            vars: 10,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-multi.component.ts',
                'target',
                '_blank'
              ],
              [2, 'float', 'left', 'width', '75%'],
              [1, 'info'],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                3,
                'rows',
                'columnMode',
                'columns',
                'headerHeight',
                'footerHeight',
                'limit',
                'selected',
                'selectionType',
                'activate',
                'select'
              ],
              [1, 'selected-column'],
              [4, 'ngFor', 'ngForOf'],
              [4, 'ngIf']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Multi Select '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'div', 1)(7, 'div', 2)(8, 'p'),
                g(9, 'This demonstrates multi selection table, use CTRL or SHIFT click to select multiple items.'),
                p()(),
                f(10, 'ngx-datatable', 3),
                v('activate', function (i) {
                  return r.onActivate(i);
                })('select', function (i) {
                  return r.onSelect(i);
                }),
                p()(),
                f(11, 'div', 4)(12, 'h4'),
                g(13, 'Selections'),
                p(),
                f(14, 'ul'),
                b(15, q2, 2, 1, 'li', 5),
                b(16, Q2, 2, 0, 'li', 6),
                p()()()),
                2 & e &&
                  (m(10),
                  _('rows', r.rows)('columnMode', r.ColumnMode.force)('columns', r.columns)('headerHeight', 50)(
                    'footerHeight',
                    50
                  )('limit', 5)('selected', r.selected)('selectionType', r.SelectionType.multi),
                  m(5),
                  _('ngForOf', r.selected),
                  m(1),
                  _('ngIf', !r.selected.length));
            },
            dependencies: [Ct, Ne, H],
            encapsulation: 2
          })),
          t
        );
      })();
      function Y2(t, n) {
        1 & t && g(0), 2 & t && se(' Holla! ', n.column.name, ' ');
      }
      function Z2(t, n) {
        if ((1 & t && (g(0, ' Hi: '), f(1, 'strong'), g(2), p()), 2 & t)) {
          const e = n.value;
          m(2), Qe(e);
        }
      }
      function K2(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'span', 7),
            v('click', function () {
              return Z((0, Y(e).sortFn)());
            }),
            g(1),
            p();
        }
        if (2 & t) {
          const e = n.column;
          m(1), Qe(e.name);
        }
      }
      function J2(t, n) {
        if (
          (1 & t && (g(0, ' My name is: '), S(1, 'i', 8), g(2, ' and '), f(3, 'i'), g(4), p(), f(5, 'div'), g(6), p()),
          2 & t)
        ) {
          const e = n.row,
            r = n.value,
            o = E();
          m(1), _('innerHTML', e.name, mr), m(3), Qe(r), m(2), Qe(o.joke);
        }
      }
      function eP(t, n) {
        if ((1 & t && (f(0, 'div', 9), S(1, 'div', 10), p()), 2 & t)) {
          const e = n.value;
          m(1), kt('width', e + '%');
        }
      }
      let tP = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.joke = 'knock knock'),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e.splice(0, 5);
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['inline-templates-demo']],
            decls: 15,
            vars: 4,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/templates/template-dom.component.ts',
                'target',
                '_blank'
              ],
              ['rowHeight', 'auto', 1, 'material', 3, 'rows', 'columnMode', 'headerHeight', 'footerHeight'],
              ['name', 'Name'],
              ['ngx-datatable-header-template', ''],
              ['ngx-datatable-cell-template', ''],
              ['name', 'Gender'],
              ['name', 'Age'],
              [3, 'click'],
              [3, 'innerHTML'],
              [2, 'border', 'solid 1px #ddd', 'margin', '5px', 'padding', '3px'],
              [2, 'background', '#999', 'height', '10px']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Expressive Templates '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'ngx-datatable', 1)(7, 'ngx-datatable-column', 2),
                b(8, Y2, 1, 1, 'ng-template', 3),
                b(9, Z2, 3, 1, 'ng-template', 4),
                p(),
                f(10, 'ngx-datatable-column', 5),
                b(11, K2, 2, 1, 'ng-template', 3),
                b(12, J2, 7, 3, 'ng-template', 4),
                p(),
                f(13, 'ngx-datatable-column', 6),
                b(14, eP, 2, 2, 'ng-template', 4),
                p()()()),
                2 & e &&
                  (m(6), _('rows', r.rows)('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50));
            },
            dependencies: [H, De, ja, Ft],
            encapsulation: 2
          })),
          t
        );
      })();
      const nP = ['editTmpl'],
        rP = ['hdrTpl'];
      function oP(t, n) {
        if ((1 & t && (f(0, 'strong'), g(1, 'Fancy'), p(), g(2)), 2 & t)) {
          const e = n.column;
          m(2), se(': ', e.name, ' !! ');
        }
      }
      function iP(t, n) {
        1 & t && S(0, 'img', 6);
      }
      function sP(t, n) {
        1 & t && S(0, 'img', 7);
      }
      function aP(t, n) {
        if ((1 & t && (b(0, iP, 1, 0, 'img', 4), b(1, sP, 1, 0, 'img', 5)), 2 & t)) {
          const e = n.value;
          _('ngIf', 'male' === e), m(1), _('ngIf', 'female' === e);
        }
      }
      let lP = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.columns = []),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e.splice(0, 5);
              });
          }
          ngOnInit() {
            this.columns = [{ cellTemplate: this.editTmpl, headerTemplate: this.hdrTpl, name: 'Gender' }];
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['template-ref-demo']],
            viewQuery: function (e, r) {
              if ((1 & e && (Pt(nP, 7), Pt(rP, 7)), 2 & e)) {
                let o;
                we((o = be())) && (r.editTmpl = o.first), we((o = be())) && (r.hdrTpl = o.first);
              }
            },
            decls: 11,
            vars: 5,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/templates/template-obj.component.ts',
                'target',
                '_blank'
              ],
              ['rowHeight', 'auto', 1, 'material', 3, 'rows', 'columns', 'columnMode', 'headerHeight', 'footerHeight'],
              ['hdrTpl', ''],
              ['editTmpl', ''],
              ['width', '150', 'src', 'https://media.giphy.com/media/I8nepxWwlEuqI/giphy.gif', 4, 'ngIf'],
              ['width', '150', 'src', 'https://media.giphy.com/media/sxSVG3XHf7yww/giphy.gif', 4, 'ngIf'],
              ['width', '150', 'src', 'https://media.giphy.com/media/I8nepxWwlEuqI/giphy.gif'],
              ['width', '150', 'src', 'https://media.giphy.com/media/sxSVG3XHf7yww/giphy.gif']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' TemplateRef via Column Property '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                S(6, 'ngx-datatable', 1),
                b(7, oP, 3, 1, 'ng-template', null, 2, Yn),
                b(9, aP, 2, 2, 'ng-template', null, 3, Yn),
                p()),
                2 & e &&
                  (m(6),
                  _('rows', r.rows)('columns', r.columns)('columnMode', r.ColumnMode.force)('headerHeight', 50)(
                    'footerHeight',
                    50
                  ));
            },
            dependencies: [Ne, H],
            encapsulation: 2
          })),
          t
        );
      })();
      function cP(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      function uP(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      function dP(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      let fP = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e.splice(0, 5);
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['column-flex-demo']],
            decls: 13,
            vars: 7,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/columns/column-flex.component.ts',
                'target',
                '_blank'
              ],
              ['rowHeight', 'auto', 1, 'material', 3, 'columnMode', 'headerHeight', 'footerHeight', 'rows'],
              ['name', 'Name', 3, 'flexGrow'],
              ['ngx-datatable-cell-template', ''],
              ['name', 'Gender', 3, 'flexGrow'],
              ['name', 'Age', 3, 'flexGrow']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Flex Column Width Distribution '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'ngx-datatable', 1)(7, 'ngx-datatable-column', 2),
                b(8, cP, 1, 1, 'ng-template', 3),
                p(),
                f(9, 'ngx-datatable-column', 4),
                b(10, uP, 1, 1, 'ng-template', 3),
                p(),
                f(11, 'ngx-datatable-column', 5),
                b(12, dP, 1, 1, 'ng-template', 3),
                p()()()),
                2 & e &&
                  (m(6),
                  _('columnMode', r.ColumnMode.flex)('headerHeight', 50)('footerHeight', 50)('rows', r.rows),
                  m(1),
                  _('flexGrow', 3),
                  m(2),
                  _('flexGrow', 1),
                  m(2),
                  _('flexGrow', 1));
            },
            dependencies: [H, De, Ft],
            encapsulation: 2
          })),
          t
        );
      })();
      function hP(t, n) {
        1 & t && S(0, 'ngx-datatable-column', 6), 2 & t && _('name', n.$implicit.name);
      }
      function pP(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'li')(1, 'input', 7),
            v('click', function () {
              const i = Y(e).$implicit;
              return Z(E().toggle(i));
            }),
            p(),
            f(2, 'label'),
            g(3),
            p()();
        }
        if (2 & t) {
          const e = n.$implicit,
            r = E();
          m(1), _('id', e.name)('checked', r.isChecked(e)), m(1), uo('for', e.name), m(1), Qe(e.name);
        }
      }
      let gP = (() => {
        class t {
          constructor() {
            (this.rows = [
              { name: 'Claudine Neal', gender: 'female', company: 'Sealoud' },
              { name: 'Beryl Rice', gender: 'female', company: 'Velity' }
            ]),
              (this.columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }]),
              (this.allColumns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }]),
              (this.ColumnMode = L);
          }
          toggle(e) {
            this.columns = this.isChecked(e) ? this.columns.filter(o => o.name !== e.name) : [...this.columns, e];
          }
          isChecked(e) {
            return void 0 !== this.columns.find(r => r.name === e.name);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['column-toggle-demo']],
            decls: 14,
            vars: 6,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/columns/column-toggle.component.ts',
                'target',
                '_blank'
              ],
              [2, 'float', 'left', 'width', '75%'],
              ['rowHeight', 'auto', 1, 'material', 3, 'rows', 'columnMode', 'headerHeight', 'footerHeight'],
              [3, 'name', 4, 'ngFor', 'ngForOf'],
              [1, 'selected-column'],
              [4, 'ngFor', 'ngForOf'],
              [3, 'name'],
              ['type', 'checkbox', 3, 'id', 'checked', 'click']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Column Toggling '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'div', 1)(7, 'ngx-datatable', 2),
                b(8, hP, 1, 1, 'ngx-datatable-column', 3),
                p()(),
                f(9, 'div', 4)(10, 'h4'),
                g(11, 'Available Columns'),
                p(),
                f(12, 'ul'),
                b(13, pP, 4, 4, 'li', 5),
                p()()()),
                2 & e &&
                  (m(7),
                  _('rows', r.rows)('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50),
                  m(1),
                  _('ngForOf', r.columns),
                  m(5),
                  _('ngForOf', r.allColumns));
            },
            dependencies: [Ct, H, De],
            encapsulation: 2
          })),
          t
        );
      })();
      function mP(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      function _P(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      function yP(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      let wP = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e.splice(0, 5);
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['column-standard-demo']],
            decls: 13,
            vars: 7,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/columns/column-standard.component.ts',
                'target',
                '_blank'
              ],
              ['rowHeight', 'auto', 1, 'material', 3, 'rows', 'columnMode', 'headerHeight', 'footerHeight'],
              ['name', 'Name', 3, 'width'],
              ['ngx-datatable-cell-template', ''],
              ['name', 'Gender', 3, 'width'],
              ['name', 'Age', 3, 'width']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Fixed Column Widths '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'ngx-datatable', 1)(7, 'ngx-datatable-column', 2),
                b(8, mP, 1, 1, 'ng-template', 3),
                p(),
                f(9, 'ngx-datatable-column', 4),
                b(10, _P, 1, 1, 'ng-template', 3),
                p(),
                f(11, 'ngx-datatable-column', 5),
                b(12, yP, 1, 1, 'ng-template', 3),
                p()()()),
                2 & e &&
                  (m(6),
                  _('rows', r.rows)('columnMode', r.ColumnMode.standard)('headerHeight', 50)('footerHeight', 50),
                  m(1),
                  _('width', 300),
                  m(2),
                  _('width', 300),
                  m(2),
                  _('width', 300));
            },
            dependencies: [H, De, Ft],
            encapsulation: 2
          })),
          t
        );
      })();
      function bP(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      function vP(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      function CP(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      let DP = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e.splice(0, 5);
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['column-force-demo']],
              decls: 13,
              vars: 7,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/columns/column-force.component.ts',
                  'target',
                  '_blank'
                ],
                ['rowHeight', 'auto', 1, 'material', 3, 'columnMode', 'headerHeight', 'footerHeight', 'rows'],
                ['name', 'Name', 3, 'width'],
                ['ngx-datatable-cell-template', ''],
                ['name', 'Gender', 3, 'width'],
                ['name', 'Age', 3, 'width']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Force Fill Column Width Distribution '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1)(7, 'ngx-datatable-column', 2),
                  b(8, bP, 1, 1, 'ng-template', 3),
                  p(),
                  f(9, 'ngx-datatable-column', 4),
                  b(10, vP, 1, 1, 'ng-template', 3),
                  p(),
                  f(11, 'ngx-datatable-column', 5),
                  b(12, CP, 1, 1, 'ng-template', 3),
                  p()()()),
                  2 & e &&
                    (m(6),
                    _('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)('rows', r.rows),
                    m(1),
                    _('width', 100),
                    m(2),
                    _('width', 100),
                    m(2),
                    _('width', 300));
              },
              dependencies: [H, De, Ft],
              encapsulation: 2
            })),
            t
          );
        })(),
        TP = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/100k.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['column-pinning-demo']],
              decls: 12,
              vars: 12,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/columns/pinning.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  3,
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight',
                  'scrollbarV',
                  'scrollbarH',
                  'rows'
                ],
                ['name', 'Name', 3, 'width', 'frozenLeft'],
                ['name', 'Gender'],
                ['name', 'Age'],
                ['name', 'City', 'prop', 'address.city', 3, 'width'],
                ['name', 'State', 'prop', 'address.state', 3, 'width', 'frozenRight']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Column Pinning '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  S(7, 'ngx-datatable-column', 2)(8, 'ngx-datatable-column', 3)(9, 'ngx-datatable-column', 4)(
                    10,
                    'ngx-datatable-column',
                    5
                  )(11, 'ngx-datatable-column', 6),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)('rowHeight', 50)(
                      'scrollbarV',
                      !0
                    )('scrollbarH', !0)('rows', r.rows),
                    m(1),
                    _('width', 300)('frozenLeft', !0),
                    m(3),
                    _('width', 150),
                    m(1),
                    _('width', 300)('frozenRight', !0));
              },
              dependencies: [H, De],
              encapsulation: 2
            })),
            t
          );
        })();
      function SP(t, n) {
        1 & t && (f(0, 'div', 3), S(1, 'div', 4)(2, 'div', 5), p()), 2 & t && _('ngClass', n.class);
      }
      let xP = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.loadingIndicator = !0),
                (this.reorderable = !0),
                (this.swapColumns = !1),
                (this.columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company', sortable: !1 }]),
                (this.ColumnMode = L),
                this.fetch(e => {
                  (this.rows = e),
                    setTimeout(() => {
                      this.loadingIndicator = !1;
                    }, 1500);
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['column-reorder-demo']],
              decls: 9,
              vars: 9,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/columns/column-reorder.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'material',
                  3,
                  'rows',
                  'loadingIndicator',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'reorderable',
                  'swapColumns',
                  'targetMarkerTemplate'
                ],
                ['targetMarkerTemplate', ''],
                [3, 'ngClass'],
                [1, 'icon', 'datatable-icon-down'],
                [1, 'icon', 'datatable-icon-up']
              ],
              template: function (e, r) {
                if (
                  (1 & e &&
                    (f(0, 'div')(1, 'h3'),
                    g(2, ' Reorder Column '),
                    f(3, 'small')(4, 'a', 0),
                    g(5, ' Source '),
                    p()()(),
                    S(6, 'ngx-datatable', 1),
                    b(7, SP, 3, 1, 'ng-template', null, 2, Yn),
                    p()),
                  2 & e)
                ) {
                  const o = Qn(8);
                  m(6),
                    _('rows', r.rows)('loadingIndicator', r.loadingIndicator)('columns', r.columns)(
                      'columnMode',
                      r.ColumnMode.force
                    )('headerHeight', 50)('footerHeight', 50)('reorderable', r.reorderable)(
                      'swapColumns',
                      r.swapColumns
                    )('targetMarkerTemplate', o);
                }
              },
              dependencies: [dd, H],
              styles: [
                '.icon[_ngcontent-%COMP%]{position:absolute}.datatable-icon-down[_ngcontent-%COMP%]{top:0}.datatable-icon-up[_ngcontent-%COMP%]{top:40px}.dragFromLeft[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%]{left:-13px}'
              ]
            })),
            t
          );
        })(),
        IP = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.temp = []),
                (this.columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }]),
                (this.ColumnMode = L),
                this.fetch(e => {
                  (this.temp = [...e]), (this.rows = e);
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            updateFilter(e) {
              const r = e.target.value.toLowerCase(),
                o = this.temp.filter(function (i) {
                  return -1 !== i.name.toLowerCase().indexOf(r) || !r;
                });
              (this.rows = o), (this.table.offset = 0);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['filter-demo']],
              viewQuery: function (e, r) {
                if ((1 & e && Pt(H, 5), 2 & e)) {
                  let o;
                  we((o = be())) && (r.table = o.first);
                }
              },
              decls: 9,
              vars: 6,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/filter.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  'type',
                  'text',
                  'placeholder',
                  'Type to filter the name column...',
                  2,
                  'padding',
                  '8px',
                  'margin',
                  '15px auto',
                  'width',
                  '30%',
                  3,
                  'keyup'
                ],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'material',
                  3,
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'limit',
                  'rows'
                ],
                ['table', '']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Client-side Search and Filtering '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'input', 1),
                  v('keyup', function (i) {
                    return r.updateFilter(i);
                  }),
                  p(),
                  S(7, 'ngx-datatable', 2, 3),
                  p()),
                  2 & e &&
                    (m(7),
                    _('columns', r.columns)('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)(
                      'limit',
                      10
                    )('rows', r.rows));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })();
      const EP = function () {
          return { name: 'Name', sortable: !1 };
        },
        MP = function () {
          return { name: 'Gender', sortable: !1 };
        },
        AP = function () {
          return { name: 'Company', sortable: !1 };
        },
        RP = function (t, n, e) {
          return [t, n, e];
        };
      let kP = (() => {
          class t {
            constructor(e) {
              (this.serverResultsService = e),
                (this.cache = {}),
                (this.ColumnMode = L),
                (this.isLoading = 0),
                (this.pageNumber = 0);
            }
            setPage(e) {
              this.pageNumber = e.offset;
              const r = e.offset * e.pageSize,
                o = new Vi();
              (o.size = 20),
                (o.pageNumber = Math.floor(r / o.size)),
                !this.cache[o.pageNumber] &&
                  ((this.cache[o.pageNumber] = !0),
                  this.isLoading++,
                  this.serverResultsService.getResults(o).subscribe(i => {
                    (this.totalElements = i.page.totalElements),
                      this.rows || (this.rows = new Array(this.totalElements || 0));
                    const a = [...this.rows];
                    a.splice(i.page.pageNumber * i.page.size, i.page.size, ...i.data),
                      (this.rows = a),
                      this.isLoading--;
                  }));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(nr));
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['virtual-paging-demo']],
              features: [Cr([nr])],
              decls: 7,
              vars: 19,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/paging-virtual.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  3,
                  'rows',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'loadingIndicator',
                  'scrollbarV',
                  'footerHeight',
                  'rowHeight',
                  'externalPaging',
                  'externalSorting',
                  'count',
                  'offset',
                  'page'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Virtual Server-side Paging '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  v('page', function (i) {
                    return r.setPage(i);
                  }),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columns', To(15, RP, Ze(12, EP), Ze(13, MP), Ze(14, AP)))(
                      'columnMode',
                      r.ColumnMode.force
                    )('headerHeight', 50)('loadingIndicator', r.isLoading > 0)('scrollbarV', !0)('footerHeight', 50)(
                      'rowHeight',
                      50
                    )('externalPaging', !0)('externalSorting', !0)('count', r.totalElements)('offset', r.pageNumber));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })(),
        PP = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.loadingIndicator = !0),
                (this.reorderable = !0),
                (this.columns = [
                  { prop: 'name', summaryFunc: () => null },
                  { name: 'Gender', summaryFunc: e => this.summaryForGender(e) },
                  { name: 'Company', summaryFunc: () => null }
                ]),
                (this.ColumnMode = L),
                this.fetch(e => {
                  (this.rows = e),
                    setTimeout(() => {
                      this.loadingIndicator = !1;
                    }, 1500);
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            summaryForGender(e) {
              return `males: ${e.filter(i => 'male' === i).length}, females: ${e.filter(i => 'female' === i).length}`;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['basic-dark-theme-demo']],
              decls: 7,
              vars: 9,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/dark-theme.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'dark',
                  3,
                  'rows',
                  'loadingIndicator',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'summaryRow',
                  'footerHeight',
                  'limit',
                  'reorderable'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Dark Theme '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  S(6, 'ngx-datatable', 1),
                  p()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('loadingIndicator', r.loadingIndicator)('columns', r.columns)(
                      'columnMode',
                      r.ColumnMode.force
                    )('headerHeight', 40)('summaryRow', !0)('footerHeight', 40)('limit', 10)(
                      'reorderable',
                      r.reorderable
                    ));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })();
      function FP(t, n) {
        if (
          (1 & t &&
            (f(0, 'div')(1, 'h4'),
            g(2, 'ngIf Table'),
            p(),
            f(3, 'ngx-datatable', 4),
            S(4, 'ngx-datatable-column', 5)(5, 'ngx-datatable-column', 6)(6, 'ngx-datatable-column', 7),
            p()()),
          2 & t)
        ) {
          const e = E();
          m(3),
            _('rows', e.rows)('columnMode', e.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)(
              'rowHeight',
              50
            )('scrollbarV', !0),
            m(1),
            _('width', 200),
            m(1),
            _('width', 300),
            m(1),
            _('width', 80);
        }
      }
      let NP = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.tab1 = !0),
              (this.tab2 = !1),
              (this.tab3 = !1),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e;
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/100k.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['tabs-demo']],
            decls: 25,
            vars: 12,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/tabs.component.ts',
                'target',
                '_blank'
              ],
              [2, 'width', '75%', 'margin', '0 auto'],
              ['type', 'button', 3, 'click'],
              [3, 'hidden'],
              [1, 'material', 3, 'rows', 'columnMode', 'headerHeight', 'footerHeight', 'rowHeight', 'scrollbarV'],
              ['name', 'Name', 3, 'width'],
              ['name', 'Gender', 3, 'width'],
              ['name', 'Age', 3, 'width'],
              [4, 'ngIf']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Hidden By Default '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'div', 1)(7, 'div')(8, 'button', 2),
                v('click', function () {
                  return (r.tab1 = !0), (r.tab2 = !1), (r.tab3 = !1);
                }),
                g(9, 'Nothing'),
                p(),
                f(10, 'button', 2),
                v('click', function () {
                  return (r.tab2 = !0), (r.tab1 = !1), (r.tab3 = !1);
                }),
                g(11, 'Hidden'),
                p(),
                f(12, 'button', 2),
                v('click', function () {
                  return (r.tab3 = !0), (r.tab1 = !1), (r.tab2 = !1);
                }),
                g(13, 'NgIf'),
                p()(),
                f(14, 'div', 3)(15, 'p'),
                g(16, 'Click a button to toggle table visibilities'),
                p()(),
                f(17, 'div', 3)(18, 'h4'),
                g(19, 'hidden Table'),
                p(),
                f(20, 'ngx-datatable', 4),
                S(21, 'ngx-datatable-column', 5)(22, 'ngx-datatable-column', 6)(23, 'ngx-datatable-column', 7),
                p()(),
                b(24, FP, 7, 9, 'div', 8),
                p()()),
                2 & e &&
                  (m(14),
                  _('hidden', !r.tab1),
                  m(3),
                  _('hidden', !r.tab2),
                  m(3),
                  _('rows', r.rows)('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)(
                    'rowHeight',
                    50
                  )('scrollbarV', !0),
                  m(1),
                  _('width', 200),
                  m(1),
                  _('width', 300),
                  m(1),
                  _('width', 80),
                  m(1),
                  _('ngIf', r.tab3));
            },
            dependencies: [Ne, H, De],
            encapsulation: 2
          })),
          t
        );
      })();
      function OP(t, n) {
        if ((1 & t && (f(0, 'li'), g(1), p()), 2 & t)) {
          const e = n.$implicit;
          m(1), se(' ', e.name, ' ');
        }
      }
      function HP(t, n) {
        1 & t && (f(0, 'li'), g(1, 'No Selections'), p());
      }
      let LP = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.selected = []),
              (this.columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }]),
              (this.ColumnMode = L),
              (this.SelectionType = Oe),
              this.fetch(e => {
                (this.selected = [e[2]]), (this.rows = e);
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
          onSelect({ selected: e }) {
            console.log('Select Event', e, this.selected);
          }
          onActivate(e) {
            console.log('Activate Event', e);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['single-selection-demo']],
            decls: 17,
            vars: 10,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-single.component.ts',
                'target',
                '_blank'
              ],
              [2, 'float', 'left', 'width', '75%'],
              [1, 'info'],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                3,
                'rows',
                'columnMode',
                'columns',
                'headerHeight',
                'footerHeight',
                'limit',
                'selected',
                'selectionType',
                'activate',
                'select'
              ],
              [1, 'selected-column'],
              [4, 'ngFor', 'ngForOf'],
              [4, 'ngIf']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Single Row Selection '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'div', 1)(7, 'div', 2)(8, 'p'),
                g(9, 'This demonstrates a simple single selection table with the 3rd row selected by default.'),
                p()(),
                f(10, 'ngx-datatable', 3),
                v('activate', function (i) {
                  return r.onActivate(i);
                })('select', function (i) {
                  return r.onSelect(i);
                }),
                p()(),
                f(11, 'div', 4)(12, 'h4'),
                g(13, 'Selections'),
                p(),
                f(14, 'ul'),
                b(15, OP, 2, 1, 'li', 5),
                b(16, HP, 2, 0, 'li', 6),
                p()()()),
                2 & e &&
                  (m(10),
                  _('rows', r.rows)('columnMode', r.ColumnMode.force)('columns', r.columns)('headerHeight', 50)(
                    'footerHeight',
                    50
                  )('limit', 5)('selected', r.selected)('selectionType', r.SelectionType.single),
                  m(5),
                  _('ngForOf', r.selected),
                  m(1),
                  _('ngIf', !r.selected.length));
            },
            dependencies: [Ct, Ne, H],
            encapsulation: 2
          })),
          t
        );
      })();
      const BP = ['mydatatable'];
      let jP = (() => {
        class t {
          constructor(e) {
            (this.cd = e),
              (this.count = 50),
              (this.rows = []),
              (this.active = !0),
              (this.temp = []),
              (this.cols = ['name', 'gender', 'company']),
              (this.ColumnMode = L),
              this.fetch(r => {
                (this.rows = r.map(o => ((o.updated = Date.now().toString()), o))), (this.temp = [...this.rows]);
              }),
              this.start();
          }
          randomNum(e, r) {
            return Math.floor(Math.random() * r) + e;
          }
          start() {
            !this.active || setTimeout(this.updateRandom.bind(this), 50);
          }
          stop() {
            this.active = !1;
          }
          add() {
            this.rows.splice(0, 0, this.temp[this.count++]);
          }
          remove() {
            this.rows.splice(0, this.rows.length);
          }
          updateRandom() {
            const e = this.randomNum(0, 5),
              r = this.randomNum(0, 3),
              o = this.randomNum(0, 100),
              i = this.cols[r],
              s = this.rows;
            if (s.length) {
              const a = s[e];
              (a[i] = s[o][i]), (a.updated = Date.now().toString());
            }
            (this.rows = [...this.rows]), this.start();
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I($t));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['live-data-demo']],
            viewQuery: function (e, r) {
              if ((1 & e && Pt(BP, 5), 2 & e)) {
                let o;
                we((o = be())) && (r.mydatatable = o.first);
              }
            },
            decls: 23,
            vars: 6,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/live.component.ts',
                'target',
                '_blank'
              ],
              ['href', 'javascript:void(0)', 3, 'click'],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                3,
                'headerHeight',
                'limit',
                'columnMode',
                'footerHeight',
                'trackByProp',
                'rows'
              ],
              ['mydatatable', ''],
              ['name', 'Name'],
              ['name', 'Gender'],
              ['name', 'Company']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Live Data Demo '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()(),
                f(6, 'small')(7, 'a', 1),
                v('click', function () {
                  return r.start();
                }),
                g(8, 'Start'),
                p(),
                g(9, ' | '),
                f(10, 'a', 1),
                v('click', function () {
                  return r.stop();
                }),
                g(11, 'Stop'),
                p(),
                g(12, ' | '),
                f(13, 'a', 1),
                v('click', function () {
                  return r.add();
                }),
                g(14, 'Add'),
                p(),
                g(15, ' | '),
                f(16, 'a', 1),
                v('click', function () {
                  return r.remove();
                }),
                g(17, 'Remove'),
                p()()(),
                f(18, 'ngx-datatable', 2, 3),
                S(20, 'ngx-datatable-column', 4)(21, 'ngx-datatable-column', 5)(22, 'ngx-datatable-column', 6),
                p()()),
                2 & e &&
                  (m(18),
                  _('headerHeight', 50)('limit', 5)('columnMode', r.ColumnMode.force)('footerHeight', 50)(
                    'trackByProp',
                    'updated'
                  )('rows', r.rows));
            },
            dependencies: [H, De],
            encapsulation: 2
          })),
          t
        );
      })();
      function VP(t, n) {
        if ((1 & t && (f(0, 'li'), g(1), p()), 2 & t)) {
          const e = n.$implicit;
          m(1), se(' ', e.name, ' ');
        }
      }
      function $P(t, n) {
        1 & t && (f(0, 'li'), g(1, 'No Selections'), p());
      }
      let UP = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.selected = []),
                (this.columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }]),
                (this.ColumnMode = L),
                (this.SelectionType = Oe),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            onSelect({ selected: e }) {
              console.log('Select Event', e, this.selected),
                this.selected.splice(0, this.selected.length),
                this.selected.push(...e);
            }
            onActivate(e) {
              console.log('Activate Event', e);
            }
            checkSelectable(e) {
              return console.log('Checking if selectable', e), 'Ethel Price' !== e.name;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['multidisable-selection-demo']],
              decls: 14,
              vars: 11,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-disabled.component.ts',
                  'target',
                  '_blank'
                ],
                [2, 'float', 'left', 'width', '75%'],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'material',
                  3,
                  'rows',
                  'columnMode',
                  'columns',
                  'headerHeight',
                  'footerHeight',
                  'limit',
                  'selectCheck',
                  'selected',
                  'selectionType',
                  'activate',
                  'select'
                ],
                [1, 'selected-column'],
                [4, 'ngFor', 'ngForOf'],
                [4, 'ngIf']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Selection Callback to Disable Selections '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'div', 1)(7, 'ngx-datatable', 2),
                  v('activate', function (i) {
                    return r.onActivate(i);
                  })('select', function (i) {
                    return r.onSelect(i);
                  }),
                  p()(),
                  f(8, 'div', 3)(9, 'h4'),
                  g(10, 'Selections'),
                  p(),
                  f(11, 'ul'),
                  b(12, VP, 2, 1, 'li', 4),
                  b(13, $P, 2, 0, 'li', 5),
                  p()()()),
                  2 & e &&
                    (m(7),
                    _('rows', r.rows)('columnMode', r.ColumnMode.force)('columns', r.columns)('headerHeight', 50)(
                      'footerHeight',
                      50
                    )('limit', 5)('selectCheck', r.checkSelectable)('selected', r.selected)(
                      'selectionType',
                      r.SelectionType.multi
                    ),
                    m(5),
                    _('ngForOf', r.selected),
                    m(1),
                    _('ngIf', !r.selected.length));
              },
              dependencies: [Ct, Ne, H],
              encapsulation: 2
            })),
            t
          );
        })(),
        zP = (() => {
          class t {
            constructor() {
              (this.columns = [{ name: 'Name' }, { name: 'Gender' }, { name: 'Company' }]),
                (this.ColumnMode = L),
                (this.rows = Ie.create(e => {
                  this.fetch(r => {
                    e.next(r.splice(0, 15)), e.next(r.splice(15, 30)), e.complete();
                  });
                }));
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['rx-demo']],
              decls: 8,
              vars: 8,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/rx.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  'striped',
                  3,
                  'rows',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' RXjs Data '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  S(6, 'ngx-datatable', 1),
                  fa(7, 'async'),
                  p()),
                  2 & e &&
                    (m(6),
                    _('rows', ha(7, 6, r.rows))('columns', r.columns)('columnMode', r.ColumnMode.force)(
                      'headerHeight',
                      50
                    )('footerHeight', 50)('rowHeight', 50));
              },
              dependencies: [H, pd],
              encapsulation: 2
            })),
            t
          );
        })();
      function GP(t, n) {
        if ((1 & t && (f(0, 'p')(1, 'strong'), g(2, 'Mouse position:'), p(), f(3, 'code'), g(4), p()()), 2 & t)) {
          const e = E();
          m(4),
            Xn(
              '(x: ',
              null == e.rawEvent ? null : e.rawEvent.x,
              ', y: ',
              null == e.rawEvent ? null : e.rawEvent.y,
              ')'
            );
        }
      }
      function WP(t, n) {
        if ((1 & t && (f(0, 'p')(1, 'strong'), g(2, 'Row:'), p(), g(3), p()), 2 & t)) {
          const e = E();
          m(3), se(' ', null == e.contextmenuRow ? null : e.contextmenuRow.name, '');
        }
      }
      function qP(t, n) {
        if ((1 & t && (f(0, 'p')(1, 'strong'), g(2, 'Header:'), p(), g(3), p()), 2 & t)) {
          const e = E();
          m(3),
            Xn(
              ' name: ',
              null == e.contextmenuColumn ? null : e.contextmenuColumn.name,
              ' prop: ',
              null == e.contextmenuColumn ? null : e.contextmenuColumn.prop,
              ' '
            );
        }
      }
      let QP = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }]),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e;
              });
          }
          onTableContextMenu(e) {
            console.log(e),
              (this.rawEvent = e.event),
              'body' === e.type
                ? ((this.contextmenuRow = e.content), (this.contextmenuColumn = void 0))
                : ((this.contextmenuColumn = e.content), (this.contextmenuRow = void 0)),
              e.event.preventDefault(),
              e.event.stopPropagation();
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['contextmenu-demo']],
            decls: 18,
            vars: 8,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/contextmenu.component.ts',
                'target',
                '_blank'
              ],
              [1, 'info'],
              [4, 'ngIf'],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                3,
                'rows',
                'columns',
                'columnMode',
                'headerHeight',
                'footerHeight',
                'tableContextmenu'
              ]
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Context Menu Event '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'div', 1)(7, 'p')(8, 'strong'),
                g(9, 'Note:'),
                p(),
                g(
                  10,
                  ' ngx-datatable does not provide a context menu feature. This demonstrates how you would access the '
                ),
                f(11, 'code'),
                g(12, 'contextmenu'),
                p(),
                g(13, ' event to display your own custom context menu. '),
                p(),
                b(14, GP, 5, 2, 'p', 2),
                b(15, WP, 4, 1, 'p', 2),
                b(16, qP, 4, 2, 'p', 2),
                p(),
                f(17, 'ngx-datatable', 3),
                v('tableContextmenu', function (i) {
                  return r.onTableContextMenu(i);
                }),
                p()()),
                2 & e &&
                  (m(14),
                  _('ngIf', r.rawEvent),
                  m(1),
                  _('ngIf', r.contextmenuRow),
                  m(1),
                  _('ngIf', r.contextmenuColumn),
                  m(1),
                  _('rows', r.rows)('columns', r.columns)('columnMode', r.ColumnMode.force)('headerHeight', 50)(
                    'footerHeight',
                    50
                  ));
            },
            dependencies: [Ne, H],
            encapsulation: 2
          })),
          t
        );
      })();
      function XP(t, n) {
        if ((1 & t && (f(0, 'li'), g(1), p()), 2 & t)) {
          const e = n.$implicit;
          m(1), se(' ', e.name, ' ');
        }
      }
      function YP(t, n) {
        1 & t && (f(0, 'li'), g(1, 'No Selections'), p());
      }
      let ZP = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.selected = []),
              (this.ColumnMode = L),
              (this.SelectionType = Oe),
              this.fetch(e => {
                this.rows = e;
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
          onSelect({ selected: e }) {
            console.log('Select Event', e, this.selected),
              this.selected.splice(0, this.selected.length),
              this.selected.push(...e);
          }
          onActivate(e) {
            console.log('Activate Event', e);
          }
          add() {
            this.selected.push(this.rows[1], this.rows[3]);
          }
          update() {
            this.selected = [this.rows[1], this.rows[3]];
          }
          remove() {
            this.selected = [];
          }
          displayCheck(e) {
            return 'Ethel Price' !== e.name;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['chkbox-selection-demo']],
            decls: 29,
            vars: 19,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-chkbox.component.ts',
                'target',
                '_blank'
              ],
              ['href', 'javascript:void(0)', 3, 'click'],
              [2, 'float', 'left', 'width', '75%'],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                2,
                'width',
                '90%',
                3,
                'rows',
                'columnMode',
                'headerHeight',
                'footerHeight',
                'limit',
                'selected',
                'selectionType',
                'selectAllRowsOnPage',
                'displayCheck',
                'activate',
                'select'
              ],
              [
                3,
                'width',
                'sortable',
                'canAutoResize',
                'draggable',
                'resizeable',
                'headerCheckboxable',
                'checkboxable'
              ],
              ['name', 'Name'],
              ['name', 'Gender'],
              ['name', 'Company'],
              [1, 'selected-column'],
              [4, 'ngFor', 'ngForOf'],
              [4, 'ngIf']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Checkbox Selection '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()(),
                f(6, 'small')(7, 'a', 1),
                v('click', function () {
                  return r.add();
                }),
                g(8, 'Add'),
                p(),
                g(9, ' | '),
                f(10, 'a', 1),
                v('click', function () {
                  return r.update();
                }),
                g(11, 'Update'),
                p(),
                g(12, ' | '),
                f(13, 'a', 1),
                v('click', function () {
                  return r.remove();
                }),
                g(14, 'Remove'),
                p()()(),
                f(15, 'div', 2)(16, 'ngx-datatable', 3),
                v('activate', function (i) {
                  return r.onActivate(i);
                })('select', function (i) {
                  return r.onSelect(i);
                }),
                S(17, 'ngx-datatable-column', 4)(18, 'ngx-datatable-column', 5)(19, 'ngx-datatable-column', 6)(
                  20,
                  'ngx-datatable-column',
                  7
                ),
                p()(),
                f(21, 'div', 8)(22, 'h4'),
                g(23, ' Selections '),
                f(24, 'small'),
                g(25),
                p()(),
                f(26, 'ul'),
                b(27, XP, 2, 1, 'li', 9),
                b(28, YP, 2, 0, 'li', 10),
                p()()()),
                2 & e &&
                  (m(16),
                  _('rows', r.rows)('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)(
                    'limit',
                    5
                  )('selected', r.selected)('selectionType', r.SelectionType.checkbox)('selectAllRowsOnPage', !1)(
                    'displayCheck',
                    r.displayCheck
                  ),
                  m(1),
                  _('width', 30)('sortable', !1)('canAutoResize', !1)('draggable', !1)('resizeable', !1)(
                    'headerCheckboxable',
                    !0
                  )('checkboxable', !0),
                  m(8),
                  se('(', null == r.selected ? null : r.selected.length, ')'),
                  m(2),
                  _('ngForOf', r.selected),
                  m(1),
                  _('ngIf', !(null != r.selected && r.selected.length)));
            },
            dependencies: [Ct, Ne, H, De],
            encapsulation: 2
          })),
          t
        );
      })();
      function KP(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'input', 13),
            v('change', function () {
              const o = Y(e);
              return Z((0, o.selectFn)(!o.allRowsSelected));
            }),
            p();
        }
        2 & t && _('checked', n.allRowsSelected);
      }
      function JP(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'input', 13),
            v('change', function (o) {
              return Z((0, Y(e).onCheckboxChangeFn)(o));
            }),
            p();
        }
        2 & t && _('checked', n.isSelected);
      }
      function eF(t, n) {
        if ((1 & t && (f(0, 'li'), g(1), p()), 2 & t)) {
          const e = n.$implicit;
          m(1), se(' ', e.name, ' ');
        }
      }
      function tF(t, n) {
        1 & t && (f(0, 'li'), g(1, 'No Selections'), p());
      }
      let nF = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.selected = []),
              (this.ColumnMode = L),
              (this.SelectionType = Oe),
              this.fetch(e => {
                this.rows = e;
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
          onSelect({ selected: e }) {
            console.log('Select Event', e, this.selected),
              this.selected.splice(0, this.selected.length),
              this.selected.push(...e);
          }
          onActivate(e) {
            console.log('Activate Event', e);
          }
          add() {
            this.selected.push(this.rows[1], this.rows[3]);
          }
          update() {
            this.selected = [this.rows[1], this.rows[3]];
          }
          remove() {
            this.selected = [];
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['chkbox-selection-template-demo']],
            decls: 31,
            vars: 15,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-chkbox-template.component.ts',
                'target',
                '_blank'
              ],
              ['href', 'javascript:void(0)', 3, 'click'],
              [2, 'float', 'left', 'width', '75%'],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                2,
                'width',
                '90%',
                3,
                'rows',
                'columnMode',
                'headerHeight',
                'footerHeight',
                'limit',
                'selected',
                'selectionType',
                'activate',
                'select'
              ],
              [3, 'width', 'sortable', 'canAutoResize', 'draggable', 'resizeable'],
              ['ngx-datatable-header-template', ''],
              ['ngx-datatable-cell-template', ''],
              ['name', 'Name'],
              ['name', 'Gender'],
              ['name', 'Company'],
              [1, 'selected-column'],
              [4, 'ngFor', 'ngForOf'],
              [4, 'ngIf'],
              ['type', 'checkbox', 3, 'checked', 'change']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Custom Checkbox Selection '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()(),
                f(6, 'small')(7, 'a', 1),
                v('click', function () {
                  return r.add();
                }),
                g(8, 'Add'),
                p(),
                g(9, ' | '),
                f(10, 'a', 1),
                v('click', function () {
                  return r.update();
                }),
                g(11, 'Update'),
                p(),
                g(12, ' | '),
                f(13, 'a', 1),
                v('click', function () {
                  return r.remove();
                }),
                g(14, 'Remove'),
                p()()(),
                f(15, 'div', 2)(16, 'ngx-datatable', 3),
                v('activate', function (i) {
                  return r.onActivate(i);
                })('select', function (i) {
                  return r.onSelect(i);
                }),
                f(17, 'ngx-datatable-column', 4),
                b(18, KP, 1, 1, 'ng-template', 5),
                b(19, JP, 1, 1, 'ng-template', 6),
                p(),
                S(20, 'ngx-datatable-column', 7)(21, 'ngx-datatable-column', 8)(22, 'ngx-datatable-column', 9),
                p()(),
                f(23, 'div', 10)(24, 'h4'),
                g(25, ' Selections '),
                f(26, 'small'),
                g(27),
                p()(),
                f(28, 'ul'),
                b(29, eF, 2, 1, 'li', 11),
                b(30, tF, 2, 0, 'li', 12),
                p()()()),
                2 & e &&
                  (m(16),
                  _('rows', r.rows)('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)(
                    'limit',
                    5
                  )('selected', r.selected)('selectionType', r.SelectionType.checkbox),
                  m(1),
                  _('width', 30)('sortable', !1)('canAutoResize', !1)('draggable', !1)('resizeable', !1),
                  m(10),
                  se('(', null == r.selected ? null : r.selected.length, ')'),
                  m(2),
                  _('ngForOf', r.selected),
                  m(1),
                  _('ngIf', !(null != r.selected && r.selected.length)));
            },
            dependencies: [Ct, Ne, H, De, ja, Ft],
            encapsulation: 2
          })),
          t
        );
      })();
      function rF(t, n) {
        if ((1 & t && (f(0, 'li'), g(1), p()), 2 & t)) {
          const e = n.$implicit;
          m(1), se(' ', e.name, ' ');
        }
      }
      function oF(t, n) {
        1 & t && (f(0, 'li'), g(1, 'No Selections'), p());
      }
      let iF = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.selected = []),
                (this.columns = [{ prop: 'name' }, { name: 'Company' }, { name: 'Gender' }]),
                (this.ColumnMode = L),
                (this.SelectionType = Oe),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            onSelect({ selected: e }) {
              console.log('Select Event', e, this.selected),
                this.selected.splice(0, this.selected.length),
                this.selected.push(...e);
            }
            onActivate(e) {
              console.log('Activate Event', e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['multi-click-selection-demo']],
              decls: 17,
              vars: 10,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/selection/selection-multi-click.component.ts',
                  'target',
                  '_blank'
                ],
                [2, 'float', 'left', 'width', '75%'],
                [1, 'info'],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'material',
                  3,
                  'rows',
                  'columnMode',
                  'columns',
                  'headerHeight',
                  'footerHeight',
                  'limit',
                  'selected',
                  'selectionType',
                  'activate',
                  'select'
                ],
                [1, 'selected-column'],
                [4, 'ngFor', 'ngForOf'],
                [4, 'ngIf']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Multi Click Selection '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'div', 1)(7, 'div', 2)(8, 'p'),
                  g(9, 'This demonstrates multi selection table, where any click event causes a selection.'),
                  p()(),
                  f(10, 'ngx-datatable', 3),
                  v('activate', function (i) {
                    return r.onActivate(i);
                  })('select', function (i) {
                    return r.onSelect(i);
                  }),
                  p()(),
                  f(11, 'div', 4)(12, 'h4'),
                  g(13, 'Selections'),
                  p(),
                  f(14, 'ul'),
                  b(15, rF, 2, 1, 'li', 5),
                  b(16, oF, 2, 0, 'li', 6),
                  p()()()),
                  2 & e &&
                    (m(10),
                    _('rows', r.rows)('columnMode', r.ColumnMode.force)('columns', r.columns)('headerHeight', 50)(
                      'footerHeight',
                      50
                    )('limit', 5)('selected', r.selected)('selectionType', r.SelectionType.multiClick),
                    m(5),
                    _('ngForOf', r.selected),
                    m(1),
                    _('ngIf', !r.selected.length));
              },
              dependencies: [Ct, Ne, H],
              encapsulation: 2
            })),
            t
          );
        })(),
        sF = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.expanded = {}),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/100k.json'),
                (r.onload = () => {
                  const o = JSON.parse(r.response);
                  e(o.splice(0, 50));
                }),
                r.send();
            }
            getRowClass(e) {
              return { 'age-is-ten': e.age % 10 == 0 };
            }
            getCellClass({ value: o }) {
              return { 'is-female': 'female' === o };
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['row-css-demo']],
              decls: 10,
              vars: 7,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/css.component.ts',
                  'target',
                  '_blank'
                ],
                [1, 'material', 3, 'rows', 'columnMode', 'headerHeight', 'rowHeight', 'rowClass', 'scrollbarV'],
                ['name', 'Name'],
                ['name', 'Gender', 'headerClass', 'is-gender', 3, 'cellClass'],
                ['name', 'Age']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Row/Header/Cell CSS Class Demo '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  S(7, 'ngx-datatable-column', 2)(8, 'ngx-datatable-column', 3)(9, 'ngx-datatable-column', 4),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columnMode', r.ColumnMode.force)('headerHeight', 50)('rowHeight', 50)(
                      'rowClass',
                      r.getRowClass
                    )('scrollbarV', !0),
                    m(2),
                    _('cellClass', r.getCellClass));
              },
              dependencies: [H, De],
              encapsulation: 2
            })),
            t
          );
        })(),
        aF = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.expanded = {}),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/100k.json'),
                (r.onload = () => {
                  const o = JSON.parse(r.response).splice(0, 100);
                  for (const i of o) i.height = Math.floor(80 * Math.random()) + 50;
                  e(o);
                }),
                r.send();
            }
            getRowHeight(e) {
              return console.log('ROW', e), e && void 0 !== e.height ? e.height : 50;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['dynamic-height-demo']],
              decls: 10,
              vars: 6,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/dynamic-height.component.ts',
                  'target',
                  '_blank'
                ],
                [1, 'material', 3, 'rows', 'columnMode', 'headerHeight', 'footerHeight', 'rowHeight', 'scrollbarV'],
                ['name', 'Name'],
                ['name', 'Gender'],
                ['name', 'Row Height', 'prop', 'height']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Dynamic Height w/ Virtual Scrolling '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  S(7, 'ngx-datatable-column', 2)(8, 'ngx-datatable-column', 3)(9, 'ngx-datatable-column', 4),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columnMode', r.ColumnMode.force)('headerHeight', 50)('footerHeight', 50)(
                      'rowHeight',
                      r.getRowHeight
                    )('scrollbarV', !0));
              },
              dependencies: [H, De],
              encapsulation: 2
            })),
            t
          );
        })();
      function lF(t, n) {
        if (
          (1 & t &&
            (f(0, 'div', 4)(1, 'div')(2, 'strong'),
            g(3, 'Summary'),
            p(),
            g(4, ': Gender: Female'),
            p(),
            S(5, 'hr', 5),
            f(6, 'div'),
            g(7),
            p()()),
          2 & t)
        ) {
          const e = n.rowCount,
            r = n.pageSize,
            o = n.curPage,
            i = n.offset;
          m(7), bu('Rows: ', e, ' | Size: ', r, ' | Current: ', o, ' | Offset: ', i, '');
        }
      }
      function cF(t, n) {
        1 & t && (f(0, 'ngx-datatable-footer'), b(1, lF, 8, 4, 'ng-template', 3), p());
      }
      let uF = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }]),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e.splice(0, 5);
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['footer-demo']],
            decls: 8,
            vars: 6,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/footer.component.ts',
                'target',
                '_blank'
              ],
              ['rowHeight', 'auto', 1, 'material', 3, 'rows', 'columns', 'columnMode', 'footerHeight', 'headerHeight'],
              [4, 'ngIf'],
              ['ngx-datatable-footer-template', ''],
              [2, 'padding', '5px 10px'],
              [2, 'width', '100%']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'h3'),
                g(2, ' Custom Footer '),
                f(3, 'small')(4, 'a', 0),
                g(5, ' Source '),
                p()()(),
                f(6, 'ngx-datatable', 1),
                b(7, cF, 2, 0, 'ngx-datatable-footer', 2),
                p()()),
                2 & e &&
                  (m(6),
                  _('rows', r.rows)('columns', r.columns)('columnMode', r.ColumnMode.force)('footerHeight', 100)(
                    'headerHeight',
                    50
                  ),
                  m(1),
                  _('ngIf', !0));
            },
            dependencies: [Ne, H, Pw, Fw],
            encapsulation: 2
          })),
          t
        );
      })();
      const dF = ['myTable'];
      function fF(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'div', 13)(1, 'a', 14),
            v('click', function () {
              const i = Y(e).group;
              return Z(E().toggleExpandGroup(i));
            }),
            f(2, 'b'),
            g(3),
            p()()();
        }
        if (2 & t) {
          const e = n.group,
            r = n.expanded;
          m(1), ht('datatable-icon-right', !r)('datatable-icon-down', r), m(2), se('Age: ', e.value[0].age, '');
        }
      }
      function hF(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'label', 15)(1, 'input', 16),
            v('change', function (o) {
              const i = Y(e),
                s = i.row,
                a = i.rowIndex,
                l = i.group;
              return Z(E().checkGroup(o, s, a, l));
            }),
            p()(),
            f(2, 'label', 15)(3, 'input', 17),
            v('change', function (o) {
              const i = Y(e),
                s = i.row,
                a = i.rowIndex,
                l = i.group;
              return Z(E().checkGroup(o, s, a, l));
            }),
            p()(),
            f(4, 'label', 15)(5, 'input', 18),
            v('change', function (o) {
              const i = Y(e),
                s = i.row,
                a = i.rowIndex,
                l = i.group;
              return Z(E().checkGroup(o, s, a, l));
            }),
            p()();
        }
        if (2 & t) {
          const e = n.rowIndex,
            r = n.row;
          Rn('for', 'ep1', e, ''),
            m(1),
            Rn('id', 'ep1', e, ''),
            _i('name', e),
            _('checked', 1 === r.exppayyes),
            m(1),
            Rn('for', 'ep2', e, ''),
            m(1),
            Rn('id', 'ep2', e, ''),
            _i('name', e),
            _('checked', 1 === r.exppayno),
            m(1),
            Rn('for', 'ep3', e, ''),
            m(1),
            Rn('id', 'ep3', e, ''),
            _i('name', e),
            _('checked', 1 === r.exppaypending);
        }
      }
      function pF(t, n) {
        if (1 & t) {
          const e = pe();
          f(0, 'input', 19),
            v('blur', function (o) {
              const s = Y(e).rowIndex;
              return Z(E().updateValue(o, 'comment', s));
            }),
            p();
        }
        2 & t && _('value', n.value);
      }
      let gF = (() => {
          class t {
            constructor() {
              (this.funder = []),
                (this.calculated = []),
                (this.pending = []),
                (this.groups = []),
                (this.editing = {}),
                (this.rows = []),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/forRowGrouping.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            getGroupRowHeight(e, r) {
              let o = {};
              return (o = { height: 40 * e.length + 'px', width: '100%' }), o;
            }
            checkGroup(e, r, o, i) {
              let s = 'Pending',
                a = !0;
              if (
                ((r.exppayyes = 0),
                (r.exppayno = 0),
                (r.exppaypending = 0),
                e.target.checked &&
                  ('0' === e.target.value
                    ? (r.exppayyes = 1)
                    : '1' === e.target.value
                    ? (r.exppayno = 1)
                    : '2' === e.target.value && (r.exppaypending = 1)),
                2 === i.length)
              ) {
                if (
                  ['Calculated', 'Funder'].indexOf(i[0].source) > -1 &&
                  ['Calculated', 'Funder'].indexOf(i[1].source) > -1 &&
                  i[0].startdate === i[1].startdate &&
                  i[0].enddate === i[1].enddate
                )
                  for (let l = 0; l < i.length; l++)
                    i[l].source !== r.source &&
                      '0' === e.target.value &&
                      ((i[l].exppayyes = 0), (i[l].exppaypending = 0), (i[l].exppayno = 1)),
                      0 === i[l].exppayyes && 0 === i[l].exppayno && 0 === i[l].exppaypending && (a = !1),
                      console.log('expectedPaymentDealtWith', a);
              } else
                for (let l = 0; l < i.length; l++)
                  0 === i[l].exppayyes && 0 === i[l].exppayno && 0 === i[l].exppaypending && (a = !1),
                    console.log('expectedPaymentDealtWith', a);
              if (
                0 === i.filter(l => 1 === l.exppaypending).length &&
                0 === i.filter(l => 0 === l.exppaypending && 0 === l.exppayyes && 0 === l.exppayno).length
              ) {
                console.log('expected payment dealt with');
                const l = i.filter(h => 1 === h.exppayyes).length,
                  c = i.filter(h => 1 === h.exppayyes && 'Funder' === h.source).length,
                  u = i.filter(h => 1 === h.exppayyes && 'Calculated' === h.source).length,
                  d = i.filter(h => 1 === h.exppayyes && 'Manual' === h.source).length;
                console.log('numberOfExpPayYes', l),
                  console.log('numberOfSourceFunder', c),
                  console.log('numberOfSourceCalculated', u),
                  console.log('numberOfSourceManual', d),
                  l > 0 &&
                    (s =
                      l === c
                        ? 'Funder Selected'
                        : l === u
                        ? 'Calculated Selected'
                        : l === d
                        ? 'Manual Selected'
                        : 'Hybrid Selected');
              }
              i[0].groupstatus = s;
            }
            updateValue(e, r, o) {
              (this.editing[o + '-' + r] = !1), (this.rows[o][r] = e.target.value), (this.rows = [...this.rows]);
            }
            toggleExpandGroup(e) {
              console.log('Toggled Expand Group!', e), this.table.groupHeader.toggleExpandGroup(e);
            }
            onDetailToggle(e) {
              console.log('Detail Toggled', e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['row-grouping-demo']],
              viewQuery: function (e, r) {
                if ((1 & e && Pt(dF, 5), 2 & e)) {
                  let o;
                  we((o = be())) && (r.table = o.first);
                }
              },
              decls: 19,
              vars: 10,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/row-grouping.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  1,
                  'material',
                  'expandable',
                  3,
                  'rows',
                  'groupRowsBy',
                  'columnMode',
                  'scrollbarH',
                  'headerHeight',
                  'footerHeight',
                  'rowHeight',
                  'limit',
                  'groupExpansionDefault'
                ],
                ['myTable', ''],
                [3, 'rowHeight', 'toggle'],
                ['myGroupHeader', ''],
                ['ngx-datatable-group-header-template', ''],
                ['name', 'Exp. Pay.', 'prop', '', 'editable', 'true', 'frozenLeft', 'True'],
                ['ngx-datatable-cell-template', ''],
                ['name', 'Source', 'prop', 'source', 'editable', 'false', 'frozenLeft', 'True'],
                ['name', 'Name', 'prop', 'name', 'editable', 'true'],
                ['name', 'Gender', 'prop', 'gender'],
                ['name', 'Age', 'prop', 'age'],
                ['name', 'Comment', 'prop', 'comment'],
                [2, 'padding-left', '5px'],
                ['href', '#', 'title', 'Expand/Collapse Group', 3, 'click'],
                [1, 'datatable-checkbox', 3, 'for'],
                ['type', 'checkbox', 'value', '0', 1, 'expectedpayment', 3, 'id', 'name', 'checked', 'change'],
                ['type', 'checkbox', 'value', '1', 1, 'expectedpayment2', 3, 'id', 'name', 'checked', 'change'],
                ['type', 'checkbox', 'value', '2', 1, 'expectedpayment3', 3, 'id', 'name', 'checked', 'change'],
                ['autofocus', '', 'type', 'text', 'name', 'comment', 3, 'value', 'blur']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Row Grouping '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1, 2)(8, 'ngx-datatable-group-header', 3, 4),
                  v('toggle', function (i) {
                    return r.onDetailToggle(i);
                  }),
                  b(10, fF, 4, 5, 'ng-template', 5),
                  p(),
                  f(11, 'ngx-datatable-column', 6),
                  b(12, hF, 6, 12, 'ng-template', 7),
                  p(),
                  S(13, 'ngx-datatable-column', 8)(14, 'ngx-datatable-column', 9)(15, 'ngx-datatable-column', 10)(
                    16,
                    'ngx-datatable-column',
                    11
                  ),
                  f(17, 'ngx-datatable-column', 12),
                  b(18, pF, 1, 1, 'ng-template', 7),
                  p()()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('groupRowsBy', 'age')('columnMode', r.ColumnMode.force)('scrollbarH', !0)(
                      'headerHeight',
                      50
                    )('footerHeight', 50)('rowHeight', 40)('limit', 4)('groupExpansionDefault', !0),
                    m(2),
                    _('rowHeight', 50));
              },
              dependencies: [H, Mw, De, Ft, Ew],
              encapsulation: 2
            })),
            t
          );
        })(),
        mF = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.loadingIndicator = !0),
                (this.reorderable = !0),
                (this.columns = [
                  { prop: 'name', summaryFunc: () => null },
                  { name: 'Gender', summaryFunc: e => this.summaryForGender(e) },
                  { name: 'Company', summaryFunc: () => null }
                ]),
                (this.ColumnMode = L),
                this.fetch(e => {
                  (this.rows = e),
                    setTimeout(() => {
                      this.loadingIndicator = !1;
                    }, 1500);
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            summaryForGender(e) {
              return `males: ${e.filter(i => 'male' === i).length}, females: ${e.filter(i => 'female' === i).length}`;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['basic-bootstrap-theme-demo']],
              decls: 7,
              vars: 10,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/basic/bootstrap.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'bootstrap',
                  3,
                  'rows',
                  'loadingIndicator',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'summaryRow',
                  'summaryPosition',
                  'footerHeight',
                  'limit',
                  'reorderable'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Bootstrap Theme '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  S(6, 'ngx-datatable', 1),
                  p()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('loadingIndicator', r.loadingIndicator)('columns', r.columns)(
                      'columnMode',
                      r.ColumnMode.force
                    )('headerHeight', 40)('summaryRow', !0)('summaryPosition', 'bottom')('footerHeight', 40)(
                      'limit',
                      10
                    )('reorderable', r.reorderable));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })();
      function _F(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      function yF(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      function wF(t, n) {
        1 & t && g(0), 2 & t && se(' ', n.value, ' ');
      }
      let bF = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e;
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company_tree.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            onTreeAction(e) {
              const o = e.row;
              (o.treeStatus = 'collapsed' === o.treeStatus ? 'expanded' : 'collapsed'), (this.rows = [...this.rows]);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['client-side-tree-demo']],
              decls: 13,
              vars: 10,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/tree/client-tree.component.ts',
                  'target',
                  '_blank'
                ],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'material',
                  3,
                  'columnMode',
                  'headerHeight',
                  'footerHeight',
                  'treeFromRelation',
                  'treeToRelation',
                  'rows',
                  'treeAction'
                ],
                ['name', 'Name', 3, 'flexGrow', 'isTreeColumn'],
                ['ngx-datatable-cell-template', ''],
                ['name', 'Gender', 3, 'flexGrow'],
                ['name', 'Age', 3, 'flexGrow']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Flex Column Width Distribution '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  v('treeAction', function (i) {
                    return r.onTreeAction(i);
                  }),
                  f(7, 'ngx-datatable-column', 2),
                  b(8, _F, 1, 1, 'ng-template', 3),
                  p(),
                  f(9, 'ngx-datatable-column', 4),
                  b(10, yF, 1, 1, 'ng-template', 3),
                  p(),
                  f(11, 'ngx-datatable-column', 5),
                  b(12, wF, 1, 1, 'ng-template', 3),
                  p()()()),
                  2 & e &&
                    (m(6),
                    _('columnMode', r.ColumnMode.flex)('headerHeight', 50)('footerHeight', 50)(
                      'treeFromRelation',
                      'manager'
                    )('treeToRelation', 'name')('rows', r.rows),
                    m(1),
                    _('flexGrow', 3)('isTreeColumn', !0),
                    m(2),
                    _('flexGrow', 1),
                    m(2),
                    _('flexGrow', 1));
              },
              dependencies: [H, De, Ft],
              styles: ['.icon[_ngcontent-%COMP%]{height:10px;width:10px}', '.disabled[_ngcontent-%COMP%]{opacity:.5}']
            })),
            t
          );
        })(),
        vF = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.columns = [
                  { prop: 'name', summaryFunc: null },
                  { name: 'Gender', summaryFunc: e => this.summaryForGender(e) },
                  { prop: 'age', summaryFunc: e => this.avgAge(e) }
                ]),
                (this.enableSummary = !0),
                (this.summaryPosition = 'top'),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e.splice(0, 5);
                });
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            onPositionSelectChange(e) {
              this.summaryPosition = e.target.value;
            }
            summaryForGender(e) {
              return `males: ${e.filter(i => 'male' === i).length}, females: ${e.filter(i => 'female' === i).length}`;
            }
            avgAge(e) {
              const r = e.filter(o => !!o);
              return r.reduce((o, i) => o + i, 0) / r.length;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['summary-row-simple-demo']],
              decls: 20,
              vars: 10,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/summary/summary-row-simple.component.ts'
                ],
                [1, 'controls'],
                ['id', 'enable-summary', 'type', 'checkbox', 3, 'checked', 'change'],
                ['for', 'enable-summary'],
                ['for', 'position-select'],
                ['id', 'position-select', 3, 'change'],
                [3, 'value'],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'material',
                  3,
                  'summaryRow',
                  'summaryPosition',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'summaryHeight',
                  'rows'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Simple Summary Row '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'div', 1)(7, 'div')(8, 'input', 2),
                  v('change', function () {
                    return (r.enableSummary = !r.enableSummary);
                  }),
                  p(),
                  f(9, 'label', 3),
                  g(10, 'Enable Summary Row'),
                  p()(),
                  f(11, 'div')(12, 'label', 4),
                  g(13, 'Position'),
                  p(),
                  f(14, 'select', 5),
                  v('change', function (i) {
                    return r.onPositionSelectChange(i);
                  }),
                  f(15, 'option', 6),
                  g(16, 'Top'),
                  p(),
                  f(17, 'option', 6),
                  g(18, 'Bottom'),
                  p()()()(),
                  S(19, 'ngx-datatable', 7),
                  p()),
                  2 & e &&
                    (m(8),
                    _('checked', r.enableSummary),
                    m(7),
                    _('value', 'top'),
                    m(2),
                    _('value', 'bottom'),
                    m(2),
                    _('summaryRow', r.enableSummary)('summaryPosition', r.summaryPosition)('columns', r.columns)(
                      'columnMode',
                      r.ColumnMode.force
                    )('headerHeight', 50)('summaryHeight', 55)('rows', r.rows));
              },
              dependencies: [H],
              styles: [
                '.controls[_ngcontent-%COMP%]{display:flex;justify-content:space-around;align-items:center;margin-bottom:30px}'
              ]
            })),
            t
          );
        })();
      const CF = ['nameSummaryCell'];
      function DF(t, n) {
        if ((1 & t && (f(0, 'div', 5)(1, 'span', 6), g(2), p()()), 2 & t)) {
          const e = n.$implicit;
          m(2), Qe(e);
        }
      }
      function TF(t, n) {
        if ((1 & t && (f(0, 'div', 3), b(1, DF, 3, 1, 'div', 4), p()), 2 & t)) {
          const e = E();
          m(1), _('ngForOf', e.getNames());
        }
      }
      let SF = (() => {
          class t {
            constructor() {
              (this.rows = []),
                (this.columns = []),
                (this.ColumnMode = L),
                this.fetch(e => {
                  this.rows = e.splice(0, 5);
                });
            }
            ngOnInit() {
              this.columns = [
                { prop: 'name', summaryFunc: () => null, summaryTemplate: this.nameSummaryCell },
                { name: 'Gender', summaryFunc: e => this.summaryForGender(e) },
                { prop: 'age', summaryFunc: e => this.avgAge(e) }
              ];
            }
            fetch(e) {
              const r = new XMLHttpRequest();
              r.open('GET', 'assets/data/company.json'),
                (r.onload = () => {
                  e(JSON.parse(r.response));
                }),
                r.send();
            }
            getNames() {
              return this.rows.map(e => e.name).map(e => e.split(' ')[1]);
            }
            summaryForGender(e) {
              return `males: ${e.filter(i => 'male' === i).length}, females: ${e.filter(i => 'female' === i).length}`;
            }
            avgAge(e) {
              const r = e.filter(o => !!o);
              return r.reduce((o, i) => o + i, 0) / r.length;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['summary-row-custom-template-demo']],
              viewQuery: function (e, r) {
                if ((1 & e && Pt(CF, 5), 2 & e)) {
                  let o;
                  we((o = be())) && (r.nameSummaryCell = o.first);
                }
              },
              decls: 9,
              vars: 7,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/summary/summary-row-custom-template.component.ts'
                ],
                [
                  1,
                  'material',
                  3,
                  'summaryRow',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'rowHeight',
                  'summaryHeight',
                  'rows'
                ],
                ['nameSummaryCell', ''],
                [1, 'name-container'],
                ['class', 'chip', 4, 'ngFor', 'ngForOf'],
                [1, 'chip'],
                [1, 'chip-content']
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Summary Row with Custom Template '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  S(6, 'ngx-datatable', 1),
                  b(7, TF, 2, 1, 'ng-template', null, 2, Yn),
                  p()),
                  2 & e &&
                    (m(6),
                    _('summaryRow', !0)('columns', r.columns)('columnMode', r.ColumnMode.force)('headerHeight', 50)(
                      'rowHeight',
                      'auto'
                    )('summaryHeight', 55)('rows', r.rows));
              },
              dependencies: [Ct, H],
              styles: [
                '.name-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center}.name-container[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]{background-color:#555;border-radius:20px;text-align:center;margin:3px 1px;width:100px;padding:2px 0}.name-container[_ngcontent-%COMP%]   .chip[_ngcontent-%COMP%]   .chip-content[_ngcontent-%COMP%]{color:#fff}'
              ]
            })),
            t
          );
        })(),
        xF = (() => {
          class t {
            constructor(e) {
              (this.serverResultsService = e),
                (this.page = new Vi()),
                (this.rows = new Array()),
                (this.columns = [
                  { name: 'Name', summaryFunc: r => `${r.length} total` },
                  { name: 'Gender', summaryFunc: () => this.getGenderSummary() },
                  { name: 'Company', summaryFunc: () => null }
                ]),
                (this.ColumnMode = L),
                (this.page.pageNumber = 0),
                (this.page.size = 20);
            }
            ngOnInit() {
              this.setPage({ offset: 0 });
            }
            setPage(e) {
              (this.page.pageNumber = e.offset),
                this.serverResultsService.getResults(this.page).subscribe(r => {
                  (this.page = r.page), (this.rows = r.data);
                });
            }
            getGenderSummary() {
              return '10 males, 10 females';
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(I(nr));
            }),
            (t.ɵcmp = P({
              type: t,
              selectors: [['summary-row-server-paging-demo']],
              features: [Cr([nr])],
              decls: 7,
              vars: 11,
              consts: [
                [
                  'href',
                  'https://github.com/swimlane/ngx-datatable/blob/master/src/app/summary/summary-row-server-paging.component.ts'
                ],
                [
                  'rowHeight',
                  'auto',
                  1,
                  'material',
                  3,
                  'rows',
                  'columns',
                  'columnMode',
                  'headerHeight',
                  'summaryRow',
                  'summaryHeight',
                  'footerHeight',
                  'externalPaging',
                  'count',
                  'offset',
                  'limit',
                  'page'
                ]
              ],
              template: function (e, r) {
                1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Server-side paging '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  v('page', function (i) {
                    return r.setPage(i);
                  }),
                  p()()),
                  2 & e &&
                    (m(6),
                    _('rows', r.rows)('columns', r.columns)('columnMode', r.ColumnMode.force)('headerHeight', 50)(
                      'summaryRow',
                      !0
                    )('summaryHeight', 55)('footerHeight', 50)('externalPaging', !0)('count', r.page.totalElements)(
                      'offset',
                      r.page.pageNumber
                    )('limit', r.page.size));
              },
              dependencies: [H],
              encapsulation: 2
            })),
            t
          );
        })();
      function IF(t, n) {
        if ((1 & t && (f(0, 'div', 8)(1, 'span', 9), g(2), p()()), 2 & t)) {
          const e = n.$implicit;
          m(2), Qe(e);
        }
      }
      function EF(t, n) {
        if ((1 & t && (f(0, 'div', 6), b(1, IF, 3, 1, 'div', 7), p()), 2 & t)) {
          const e = E();
          m(1), _('ngForOf', e.getNames());
        }
      }
      let MF = (() => {
        class t {
          constructor() {
            (this.rows = []),
              (this.enableSummary = !0),
              (this.summaryPosition = 'top'),
              (this.ColumnMode = L),
              this.fetch(e => {
                this.rows = e.splice(0, 5);
              });
          }
          fetch(e) {
            const r = new XMLHttpRequest();
            r.open('GET', 'assets/data/company.json'),
              (r.onload = () => {
                e(JSON.parse(r.response));
              }),
              r.send();
          }
          getNames() {
            return this.rows.map(e => e.name).map(e => e.split(' ')[1]);
          }
          summaryForGender(e) {
            return `males: ${e.filter(i => 'male' === i).length}, females: ${e.filter(i => 'female' === i).length}`;
          }
          avgAge(e) {
            const r = e.filter(o => !!o);
            return r.reduce((o, i) => o + i, 0) / r.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['summary-row-inline-html']],
            decls: 12,
            vars: 9,
            consts: [
              [
                'href',
                'https://github.com/swimlane/ngx-datatable/blob/master/src/app/summary/summary-row-inline-html.component.ts'
              ],
              [
                'rowHeight',
                'auto',
                1,
                'material',
                3,
                'summaryRow',
                'summaryPosition',
                'summaryHeight',
                'columnMode',
                'headerHeight',
                'rows'
              ],
              ['prop', 'name', 3, 'summaryTemplate'],
              ['name', 'Gender', 3, 'summaryFunc'],
              ['prop', 'age', 3, 'summaryFunc'],
              ['nameSummaryCell', ''],
              [1, 'name-container'],
              ['class', 'chip', 4, 'ngFor', 'ngForOf'],
              [1, 'chip'],
              [1, 'chip-content']
            ],
            template: function (e, r) {
              if (
                (1 & e &&
                  (f(0, 'div')(1, 'h3'),
                  g(2, ' Inline HTML template '),
                  f(3, 'small')(4, 'a', 0),
                  g(5, ' Source '),
                  p()()(),
                  f(6, 'ngx-datatable', 1),
                  S(7, 'ngx-datatable-column', 2)(8, 'ngx-datatable-column', 3)(9, 'ngx-datatable-column', 4),
                  p(),
                  b(10, EF, 2, 1, 'ng-template', null, 5, Yn),
                  p()),
                2 & e)
              ) {
                const o = Qn(11);
                m(6),
                  _('summaryRow', r.enableSummary)('summaryPosition', r.summaryPosition)('summaryHeight', 100)(
                    'columnMode',
                    r.ColumnMode.force
                  )('headerHeight', 50)('rows', r.rows),
                  m(1),
                  _('summaryTemplate', o),
                  m(1),
                  _('summaryFunc', r.summaryForGender),
                  m(1),
                  _('summaryFunc', r.avgAge);
              }
            },
            dependencies: [Ct, H, De],
            encapsulation: 2
          })),
          t
        );
      })();
      function AF(t, n) {
        1 & t && S(0, 'basic-auto-demo');
      }
      function RF(t, n) {
        1 & t && S(0, 'basic-fixed-demo');
      }
      function kF(t, n) {
        1 & t && S(0, 'full-screen-demo');
      }
      function PF(t, n) {
        1 & t && S(0, 'inline-edit-demo');
      }
      function FF(t, n) {
        1 & t && S(0, 'virtual-scroll-demo');
      }
      function NF(t, n) {
        1 & t && S(0, 'horz-vert-scrolling-demo');
      }
      function OF(t, n) {
        1 & t && S(0, 'multiple-tables-demo');
      }
      function HF(t, n) {
        1 & t && S(0, 'row-details-demo');
      }
      function LF(t, n) {
        1 & t && S(0, 'responsive-demo');
      }
      function BF(t, n) {
        1 & t && S(0, 'filter-demo');
      }
      function jF(t, n) {
        1 & t && S(0, 'tabs-demo');
      }
      function VF(t, n) {
        1 & t && S(0, 'live-data-demo');
      }
      function $F(t, n) {
        1 & t && S(0, 'rx-demo');
      }
      function UF(t, n) {
        1 & t && S(0, 'contextmenu-demo');
      }
      function zF(t, n) {
        1 & t && S(0, 'row-css-demo');
      }
      function GF(t, n) {
        1 & t && S(0, 'dynamic-height-demo');
      }
      function WF(t, n) {
        1 & t && S(0, 'footer-demo');
      }
      function qF(t, n) {
        1 & t && S(0, 'basic-dark-theme-demo');
      }
      function QF(t, n) {
        1 & t && S(0, 'basic-bootstrap-theme-demo');
      }
      function XF(t, n) {
        1 & t && S(0, 'full-screen-tree-demo');
      }
      function YF(t, n) {
        1 & t && S(0, 'client-side-tree-demo');
      }
      function ZF(t, n) {
        1 & t && S(0, 'row-grouping-demo');
      }
      function KF(t, n) {
        1 & t && S(0, 'client-paging-demo');
      }
      function JF(t, n) {
        1 & t && S(0, 'server-paging-demo');
      }
      function eN(t, n) {
        1 & t && S(0, 'paging-scrolling-novirtualization-demo');
      }
      function tN(t, n) {
        1 & t && S(0, 'server-scrolling-demo');
      }
      function nN(t, n) {
        1 & t && S(0, 'virtual-paging-demo');
      }
      function rN(t, n) {
        1 & t && S(0, 'client-sorting-demo');
      }
      function oN(t, n) {
        1 & t && S(0, 'default-sorting-demo');
      }
      function iN(t, n) {
        1 & t && S(0, 'server-sorting-demo');
      }
      function sN(t, n) {
        1 & t && S(0, 'comparator-sorting-demo');
      }
      function aN(t, n) {
        1 & t && S(0, 'cell-selection-demo');
      }
      function lN(t, n) {
        1 & t && S(0, 'single-selection-demo');
      }
      function cN(t, n) {
        1 & t && S(0, 'multi-selection-demo');
      }
      function uN(t, n) {
        1 & t && S(0, 'multidisable-selection-demo');
      }
      function dN(t, n) {
        1 & t && S(0, 'chkbox-selection-demo');
      }
      function fN(t, n) {
        1 & t && S(0, 'chkbox-selection-template-demo');
      }
      function hN(t, n) {
        1 & t && S(0, 'multi-click-selection-demo');
      }
      function pN(t, n) {
        1 & t && S(0, 'template-ref-demo');
      }
      function gN(t, n) {
        1 & t && S(0, 'inline-templates-demo');
      }
      function mN(t, n) {
        1 & t && S(0, 'column-flex-demo');
      }
      function _N(t, n) {
        1 & t && S(0, 'column-toggle-demo');
      }
      function yN(t, n) {
        1 & t && S(0, 'column-standard-demo');
      }
      function wN(t, n) {
        1 & t && S(0, 'column-force-demo');
      }
      function bN(t, n) {
        1 & t && S(0, 'column-pinning-demo');
      }
      function vN(t, n) {
        1 & t && S(0, 'column-reorder-demo');
      }
      function CN(t, n) {
        1 & t && S(0, 'summary-row-simple-demo');
      }
      function DN(t, n) {
        1 & t && S(0, 'summary-row-custom-template-demo');
      }
      function TN(t, n) {
        1 & t && S(0, 'summary-row-server-paging-demo');
      }
      function SN(t, n) {
        1 & t && S(0, 'summary-row-inline-html');
      }
      let xN = (() => {
        class t {
          constructor(e) {
            (this.version = '20.0.1'), (this.state = e.path(!0));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(I(Mi));
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['app-root']],
            features: [Cr([Mi, { provide: Kn, useClass: $y }])],
            decls: 258,
            vars: 53,
            consts: [
              [1, 'main-ul'],
              ['href', 'https://swimlane.gitbooks.io/ngx-datatable/content/', 'target', '_black'],
              ['href', 'https://www.gitbook.com/download/pdf/book/swimlane/ngx-datatable', 'target', '_black'],
              ['href', '#virtual-scroll', 3, 'click'],
              ['href', '#full-screen', 3, 'click'],
              ['href', '#inline-edit', 3, 'click'],
              ['href', '#horz-vert-scrolling', 3, 'click'],
              ['href', '#multiple-tables', 3, 'click'],
              ['href', '#filter', 3, 'click'],
              ['href', '#hidden', 3, 'click'],
              ['href', '#live', 3, 'click'],
              ['href', '#rx', 3, 'click'],
              ['href', '#contextmenu', 3, 'click'],
              ['href', '#css', 3, 'click'],
              ['href', '#footer', 3, 'click'],
              ['href', '#dark', 3, 'click'],
              ['href', '#bootstrap', 3, 'click'],
              ['href', '#fullscreen-tree', 3, 'click'],
              ['href', '#client-tree', 3, 'click'],
              ['href', '#row-grouping', 3, 'click'],
              ['href', '#', 3, 'click'],
              ['href', '#basic-fixed', 3, 'click'],
              ['href', '#dynamic', 3, 'click'],
              ['href', '#row-details', 3, 'click'],
              ['href', '#responsive', 3, 'click'],
              ['href', '#client-paging', 3, 'click'],
              ['href', '#server-paging', 3, 'click'],
              ['href', '#paging-scrolling-novirtualization', 3, 'click'],
              ['href', '#server-scrolling', 3, 'click'],
              ['href', '#virtual-paging', 3, 'click'],
              ['href', '#client-sorting', 3, 'click'],
              ['href', '#default-sorting', 3, 'click'],
              ['href', '#server-sorting', 3, 'click'],
              ['href', '#comparator-sorting', 3, 'click'],
              ['href', '#cell-selection', 3, 'click'],
              ['href', '#single-selection', 3, 'click'],
              ['href', '#multi-selection', 3, 'click'],
              ['href', '#multi-click-selection', 3, 'click'],
              ['href', '#multidisable-selection', 3, 'click'],
              ['href', '#chkbox-selection', 3, 'click'],
              ['href', '#chkbox-selection-template', 3, 'click'],
              ['href', '#inline', 3, 'click'],
              ['href', '#templateref', 3, 'click'],
              ['href', '#flex', 3, 'click'],
              ['href', '#toggle', 3, 'click'],
              ['href', '#fixed', 3, 'click'],
              ['href', '#force', 3, 'click'],
              ['href', '#pinning', 3, 'click'],
              ['href', '#reorder', 3, 'click'],
              ['href', '#simple-summary', 3, 'click'],
              ['href', '#custom-template-summary', 3, 'click'],
              ['href', '#paging-summary', 3, 'click'],
              ['href', '#inline-html-summary', 3, 'click'],
              [4, 'ngIf']
            ],
            template: function (e, r) {
              1 & e &&
                (f(0, 'div')(1, 'nav')(2, 'h3'),
                g(3, ' ngx-datatable '),
                f(4, 'small'),
                g(5),
                p()(),
                f(6, 'ul', 0)(7, 'li')(8, 'h4'),
                g(9, 'Documentation'),
                p(),
                f(10, 'ul')(11, 'li')(12, 'a', 1),
                g(13, 'Online'),
                p()(),
                f(14, 'li')(15, 'a', 2),
                g(16, 'PDF'),
                p()()()(),
                f(17, 'li')(18, 'h4'),
                g(19, 'Basic'),
                p(),
                f(20, 'ul')(21, 'li')(22, 'a', 3),
                v('click', function () {
                  return (r.state = 'virtual-scroll');
                }),
                g(23, '10k Rows'),
                p()(),
                f(24, 'li')(25, 'a', 4),
                v('click', function () {
                  return (r.state = 'full-screen');
                }),
                g(26, 'Full Screen'),
                p()(),
                f(27, 'li')(28, 'a', 5),
                v('click', function () {
                  return (r.state = 'inline-edit');
                }),
                g(29, 'Inline Editing'),
                p()(),
                f(30, 'li')(31, 'a', 6),
                v('click', function () {
                  return (r.state = 'horz-vert-scrolling');
                }),
                g(32, 'Horz/Vert Scrolling'),
                p()(),
                f(33, 'li')(34, 'a', 7),
                v('click', function () {
                  return (r.state = 'multiple-tables');
                }),
                g(35, 'Multiple Tables'),
                p()(),
                f(36, 'li')(37, 'a', 8),
                v('click', function () {
                  return (r.state = 'filter');
                }),
                g(38, 'Filtering'),
                p()(),
                f(39, 'li')(40, 'a', 9),
                v('click', function () {
                  return (r.state = 'hidden');
                }),
                g(41, 'Hidden On Load'),
                p()(),
                f(42, 'li')(43, 'a', 10),
                v('click', function () {
                  return (r.state = 'live');
                }),
                g(44, 'Live Data'),
                p()(),
                f(45, 'li')(46, 'a', 11),
                v('click', function () {
                  return (r.state = 'rx');
                }),
                g(47, 'RxJS'),
                p()(),
                f(48, 'li')(49, 'a', 12),
                v('click', function () {
                  return (r.state = 'contextmenu');
                }),
                g(50, 'Context Menu'),
                p()(),
                f(51, 'li')(52, 'a', 13),
                v('click', function () {
                  return (r.state = 'css');
                }),
                g(53, 'CSS Classes'),
                p()(),
                f(54, 'li')(55, 'a', 14),
                v('click', function () {
                  return (r.state = 'footer');
                }),
                g(56, 'Footer Template'),
                p()()()(),
                f(57, 'li')(58, 'h4'),
                g(59, 'Themes'),
                p(),
                f(60, 'ul')(61, 'li')(62, 'a', 15),
                v('click', function () {
                  return (r.state = 'dark');
                }),
                g(63, 'Dark theme'),
                p()(),
                f(64, 'li')(65, 'a', 16),
                v('click', function () {
                  return (r.state = 'bootstrap');
                }),
                g(66, 'Bootstrap theme'),
                p()()()(),
                f(67, 'li')(68, 'h4'),
                g(69, 'Tree'),
                p(),
                f(70, 'ul')(71, 'li')(72, 'a', 17),
                v('click', function () {
                  return (r.state = 'fullscreen-tree');
                }),
                g(73, 'Full screen Tree'),
                p()(),
                f(74, 'li')(75, 'a', 18),
                v('click', function () {
                  return (r.state = 'client-tree');
                }),
                g(76, 'Client Side Tree'),
                p()()()(),
                f(77, 'li')(78, 'h4'),
                g(79, 'Rows'),
                p(),
                f(80, 'ul')(81, 'li')(82, 'a', 19),
                v('click', function () {
                  return (r.state = 'row-grouping');
                }),
                g(83, 'Row Grouping'),
                p()(),
                f(84, 'li')(85, 'a', 20),
                v('click', function () {
                  return (r.state = '');
                }),
                g(86, 'Fluid Row Height'),
                p()(),
                f(87, 'li')(88, 'a', 21),
                v('click', function () {
                  return (r.state = 'basic-fixed');
                }),
                g(89, 'Fixed Row Height'),
                p()(),
                f(90, 'li')(91, 'a', 22),
                v('click', function () {
                  return (r.state = 'dynamic');
                }),
                g(92, 'Dynamic Row Height'),
                p()(),
                f(93, 'li')(94, 'a', 23),
                v('click', function () {
                  return (r.state = 'row-details');
                }),
                g(95, 'Row Detail'),
                p()(),
                f(96, 'li')(97, 'a', 24),
                v('click', function () {
                  return (r.state = 'responsive');
                }),
                g(98, 'Responsive'),
                p()()()(),
                f(99, 'li')(100, 'h4'),
                g(101, 'Paging'),
                p(),
                f(102, 'ul')(103, 'li')(104, 'a', 25),
                v('click', function () {
                  return (r.state = 'client-paging');
                }),
                g(105, 'Client-side'),
                p()(),
                f(106, 'li')(107, 'a', 26),
                v('click', function () {
                  return (r.state = 'server-paging');
                }),
                g(108, 'Server-side'),
                p()(),
                f(109, 'li')(110, 'a', 27),
                v('click', function () {
                  return (r.state = 'paging-scrolling-novirtualization');
                }),
                g(111, 'Scrolling no virtual'),
                p()(),
                f(112, 'li')(113, 'a', 28),
                v('click', function () {
                  return (r.state = 'server-scrolling');
                }),
                g(114, 'Scrolling server-side'),
                p()(),
                f(115, 'li')(116, 'a', 29),
                v('click', function () {
                  return (r.state = 'virtual-paging');
                }),
                g(117, 'Virtual server-side'),
                p()()()(),
                f(118, 'li')(119, 'h4'),
                g(120, 'Sorting'),
                p(),
                f(121, 'ul')(122, 'li')(123, 'a', 30),
                v('click', function () {
                  return (r.state = 'client-sorting');
                }),
                g(124, 'Client-side'),
                p()(),
                f(125, 'li')(126, 'a', 31),
                v('click', function () {
                  return (r.state = 'default-sorting');
                }),
                g(127, 'Default sort'),
                p()(),
                f(128, 'li')(129, 'a', 32),
                v('click', function () {
                  return (r.state = 'server-sorting');
                }),
                g(130, 'Server-side'),
                p()(),
                f(131, 'li')(132, 'a', 33),
                v('click', function () {
                  return (r.state = 'comparator-sorting');
                }),
                g(133, 'Comparator'),
                p()()()(),
                f(134, 'li')(135, 'h4'),
                g(136, 'Selection'),
                p(),
                f(137, 'ul')(138, 'li')(139, 'a', 34),
                v('click', function () {
                  return (r.state = 'cell-selection');
                }),
                g(140, 'Cell'),
                p()(),
                f(141, 'li')(142, 'a', 35),
                v('click', function () {
                  return (r.state = 'single-selection');
                }),
                g(143, 'Single Row'),
                p()(),
                f(144, 'li')(145, 'a', 36),
                v('click', function () {
                  return (r.state = 'multi-selection');
                }),
                g(146, 'Multi Row'),
                p()(),
                f(147, 'li')(148, 'a', 37),
                v('click', function () {
                  return (r.state = 'multi-click-selection');
                }),
                g(149, 'Multi Click Row'),
                p()(),
                f(150, 'li')(151, 'a', 38),
                v('click', function () {
                  return (r.state = 'multidisable-selection');
                }),
                g(152, 'Disable Callback'),
                p()(),
                f(153, 'li')(154, 'a', 39),
                v('click', function () {
                  return (r.state = 'chkbox-selection');
                }),
                g(155, 'Checkbox'),
                p()(),
                f(156, 'li')(157, 'a', 40),
                v('click', function () {
                  return (r.state = 'chkbox-selection-template');
                }),
                g(158, 'Custom Checkbox'),
                p()()()(),
                f(159, 'li')(160, 'h4'),
                g(161, 'Templates'),
                p(),
                f(162, 'ul')(163, 'li')(164, 'a', 41),
                v('click', function () {
                  return (r.state = 'inline');
                }),
                g(165, 'Inline'),
                p()(),
                f(166, 'li')(167, 'a', 42),
                v('click', function () {
                  return (r.state = 'templateref');
                }),
                g(168, 'TemplateRef'),
                p()()()(),
                f(169, 'li')(170, 'h4'),
                g(171, 'Column'),
                p(),
                f(172, 'ul')(173, 'li')(174, 'a', 43),
                v('click', function () {
                  return (r.state = 'flex');
                }),
                g(175, 'Flex'),
                p()(),
                f(176, 'li')(177, 'a', 44),
                v('click', function () {
                  return (r.state = 'toggle');
                }),
                g(178, 'Toggling'),
                p()(),
                f(179, 'li')(180, 'a', 45),
                v('click', function () {
                  return (r.state = 'fixed');
                }),
                g(181, 'Fixed'),
                p()(),
                f(182, 'li')(183, 'a', 46),
                v('click', function () {
                  return (r.state = 'force');
                }),
                g(184, 'Force'),
                p()(),
                f(185, 'li')(186, 'a', 47),
                v('click', function () {
                  return (r.state = 'pinning');
                }),
                g(187, 'Pinning'),
                p()(),
                f(188, 'li')(189, 'a', 48),
                v('click', function () {
                  return (r.state = 'reorder');
                }),
                g(190, 'Reorder'),
                p()()()(),
                f(191, 'li')(192, 'h4'),
                g(193, 'Summary Row'),
                p(),
                f(194, 'ul')(195, 'li')(196, 'a', 49),
                v('click', function () {
                  return (r.state = 'simple-summary');
                }),
                g(197, 'Simple'),
                p()(),
                f(198, 'li')(199, 'a', 50),
                v('click', function () {
                  return (r.state = 'custom-template-summary');
                }),
                g(200, 'Custom Template'),
                p()(),
                f(201, 'li')(202, 'a', 51),
                v('click', function () {
                  return (r.state = 'paging-summary');
                }),
                g(203, 'Server-side paging'),
                p()(),
                f(204, 'li')(205, 'a', 52),
                v('click', function () {
                  return (r.state = 'inline-html-summary');
                }),
                g(206, 'Inline HTML'),
                p()()()()()(),
                f(207, 'content'),
                b(208, AF, 1, 0, 'basic-auto-demo', 53),
                b(209, RF, 1, 0, 'basic-fixed-demo', 53),
                b(210, kF, 1, 0, 'full-screen-demo', 53),
                b(211, PF, 1, 0, 'inline-edit-demo', 53),
                b(212, FF, 1, 0, 'virtual-scroll-demo', 53),
                b(213, NF, 1, 0, 'horz-vert-scrolling-demo', 53),
                b(214, OF, 1, 0, 'multiple-tables-demo', 53),
                b(215, HF, 1, 0, 'row-details-demo', 53),
                b(216, LF, 1, 0, 'responsive-demo', 53),
                b(217, BF, 1, 0, 'filter-demo', 53),
                b(218, jF, 1, 0, 'tabs-demo', 53),
                b(219, VF, 1, 0, 'live-data-demo', 53),
                b(220, $F, 1, 0, 'rx-demo', 53),
                b(221, UF, 1, 0, 'contextmenu-demo', 53),
                b(222, zF, 1, 0, 'row-css-demo', 53),
                b(223, GF, 1, 0, 'dynamic-height-demo', 53),
                b(224, WF, 1, 0, 'footer-demo', 53),
                b(225, qF, 1, 0, 'basic-dark-theme-demo', 53),
                b(226, QF, 1, 0, 'basic-bootstrap-theme-demo', 53),
                b(227, XF, 1, 0, 'full-screen-tree-demo', 53),
                b(228, YF, 1, 0, 'client-side-tree-demo', 53),
                b(229, ZF, 1, 0, 'row-grouping-demo', 53),
                b(230, KF, 1, 0, 'client-paging-demo', 53),
                b(231, JF, 1, 0, 'server-paging-demo', 53),
                b(232, eN, 1, 0, 'paging-scrolling-novirtualization-demo', 53),
                b(233, tN, 1, 0, 'server-scrolling-demo', 53),
                b(234, nN, 1, 0, 'virtual-paging-demo', 53),
                b(235, rN, 1, 0, 'client-sorting-demo', 53),
                b(236, oN, 1, 0, 'default-sorting-demo', 53),
                b(237, iN, 1, 0, 'server-sorting-demo', 53),
                b(238, sN, 1, 0, 'comparator-sorting-demo', 53),
                b(239, aN, 1, 0, 'cell-selection-demo', 53),
                b(240, lN, 1, 0, 'single-selection-demo', 53),
                b(241, cN, 1, 0, 'multi-selection-demo', 53),
                b(242, uN, 1, 0, 'multidisable-selection-demo', 53),
                b(243, dN, 1, 0, 'chkbox-selection-demo', 53),
                b(244, fN, 1, 0, 'chkbox-selection-template-demo', 53),
                b(245, hN, 1, 0, 'multi-click-selection-demo', 53),
                b(246, pN, 1, 0, 'template-ref-demo', 53),
                b(247, gN, 1, 0, 'inline-templates-demo', 53),
                b(248, mN, 1, 0, 'column-flex-demo', 53),
                b(249, _N, 1, 0, 'column-toggle-demo', 53),
                b(250, yN, 1, 0, 'column-standard-demo', 53),
                b(251, wN, 1, 0, 'column-force-demo', 53),
                b(252, bN, 1, 0, 'column-pinning-demo', 53),
                b(253, vN, 1, 0, 'column-reorder-demo', 53),
                b(254, CN, 1, 0, 'summary-row-simple-demo', 53),
                b(255, DN, 1, 0, 'summary-row-custom-template-demo', 53),
                b(256, TN, 1, 0, 'summary-row-server-paging-demo', 53),
                b(257, SN, 1, 0, 'summary-row-inline-html', 53),
                p()()),
                2 & e &&
                  (ht('dark', 'dark' === r.state),
                  m(5),
                  se('(', r.version, ')'),
                  m(203),
                  _('ngIf', !r.state),
                  m(1),
                  _('ngIf', 'basic-fixed' === r.state),
                  m(1),
                  _('ngIf', 'full-screen' === r.state),
                  m(1),
                  _('ngIf', 'inline-edit' === r.state),
                  m(1),
                  _('ngIf', 'virtual-scroll' === r.state),
                  m(1),
                  _('ngIf', 'horz-vert-scrolling' === r.state),
                  m(1),
                  _('ngIf', 'multiple-tables' === r.state),
                  m(1),
                  _('ngIf', 'row-details' === r.state),
                  m(1),
                  _('ngIf', 'responsive' === r.state),
                  m(1),
                  _('ngIf', 'filter' === r.state),
                  m(1),
                  _('ngIf', 'hidden' === r.state),
                  m(1),
                  _('ngIf', 'live' === r.state),
                  m(1),
                  _('ngIf', 'rx' === r.state),
                  m(1),
                  _('ngIf', 'contextmenu' === r.state),
                  m(1),
                  _('ngIf', 'css' === r.state),
                  m(1),
                  _('ngIf', 'dynamic' === r.state),
                  m(1),
                  _('ngIf', 'footer' === r.state),
                  m(1),
                  _('ngIf', 'dark' === r.state),
                  m(1),
                  _('ngIf', 'bootstrap' === r.state),
                  m(1),
                  _('ngIf', 'fullscreen-tree' === r.state),
                  m(1),
                  _('ngIf', 'client-tree' === r.state),
                  m(1),
                  _('ngIf', 'row-grouping' === r.state),
                  m(1),
                  _('ngIf', 'client-paging' === r.state),
                  m(1),
                  _('ngIf', 'server-paging' === r.state),
                  m(1),
                  _('ngIf', 'paging-scrolling-novirtualization' === r.state),
                  m(1),
                  _('ngIf', 'server-scrolling' === r.state),
                  m(1),
                  _('ngIf', 'virtual-paging' === r.state),
                  m(1),
                  _('ngIf', 'client-sorting' === r.state),
                  m(1),
                  _('ngIf', 'default-sorting' === r.state),
                  m(1),
                  _('ngIf', 'server-sorting' === r.state),
                  m(1),
                  _('ngIf', 'comparator-sorting' === r.state),
                  m(1),
                  _('ngIf', 'cell-selection' === r.state),
                  m(1),
                  _('ngIf', 'single-selection' === r.state),
                  m(1),
                  _('ngIf', 'multi-selection' === r.state),
                  m(1),
                  _('ngIf', 'multidisable-selection' === r.state),
                  m(1),
                  _('ngIf', 'chkbox-selection' === r.state),
                  m(1),
                  _('ngIf', 'chkbox-selection-template' === r.state),
                  m(1),
                  _('ngIf', 'multi-click-selection' === r.state),
                  m(1),
                  _('ngIf', 'templateref' === r.state),
                  m(1),
                  _('ngIf', 'inline' === r.state),
                  m(1),
                  _('ngIf', 'flex' === r.state),
                  m(1),
                  _('ngIf', 'toggle' === r.state),
                  m(1),
                  _('ngIf', 'fixed' === r.state),
                  m(1),
                  _('ngIf', 'force' === r.state),
                  m(1),
                  _('ngIf', 'pinning' === r.state),
                  m(1),
                  _('ngIf', 'reorder' === r.state),
                  m(1),
                  _('ngIf', 'simple-summary' === r.state),
                  m(1),
                  _('ngIf', 'custom-template-summary' === r.state),
                  m(1),
                  _('ngIf', 'paging-summary' === r.state),
                  m(1),
                  _('ngIf', 'inline-html-summary' === r.state));
            },
            dependencies: [
              Ne,
              Ck,
              Dk,
              Tk,
              Ak,
              Lk,
              Vk,
              $k,
              Uk,
              Zk,
              s2,
              d2,
              x2,
              R2,
              H2,
              L2,
              U2,
              z2,
              G2,
              W2,
              X2,
              tP,
              lP,
              fP,
              gP,
              wP,
              DP,
              TP,
              xP,
              IP,
              kP,
              PP,
              NP,
              LP,
              jP,
              UP,
              zP,
              QP,
              ZP,
              nF,
              iF,
              sF,
              aF,
              uF,
              gF,
              mF,
              bF,
              vF,
              SF,
              xF,
              MF
            ],
            styles: [
              '.ngx-datatable.material{background:#fff;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.ngx-datatable.material.striped .datatable-row-odd{background:#eee}.ngx-datatable.material.single-selection .datatable-body-row.active,.ngx-datatable.material.single-selection .datatable-body-row.active .datatable-row-group,.ngx-datatable.material.multi-selection .datatable-body-row.active,.ngx-datatable.material.multi-selection .datatable-body-row.active .datatable-row-group,.ngx-datatable.material.multi-click-selection .datatable-body-row.active,.ngx-datatable.material.multi-click-selection .datatable-body-row.active .datatable-row-group{background-color:#304ffe;color:#fff}.ngx-datatable.material.single-selection .datatable-body-row.active:hover,.ngx-datatable.material.single-selection .datatable-body-row.active:hover .datatable-row-group,.ngx-datatable.material.multi-selection .datatable-body-row.active:hover,.ngx-datatable.material.multi-selection .datatable-body-row.active:hover .datatable-row-group,.ngx-datatable.material.multi-click-selection .datatable-body-row.active:hover,.ngx-datatable.material.multi-click-selection .datatable-body-row.active:hover .datatable-row-group{background-color:#193ae4;color:#fff}.ngx-datatable.material.single-selection .datatable-body-row.active:focus,.ngx-datatable.material.single-selection .datatable-body-row.active:focus .datatable-row-group,.ngx-datatable.material.multi-selection .datatable-body-row.active:focus,.ngx-datatable.material.multi-selection .datatable-body-row.active:focus .datatable-row-group,.ngx-datatable.material.multi-click-selection .datatable-body-row.active:focus,.ngx-datatable.material.multi-click-selection .datatable-body-row.active:focus .datatable-row-group{background-color:#2041ef;color:#fff}.ngx-datatable.material:not(.cell-selection) .datatable-body-row:hover,.ngx-datatable.material:not(.cell-selection) .datatable-body-row:hover .datatable-row-group{background-color:#eee;transition-property:background;transition-duration:.3s;transition-timing-function:linear}.ngx-datatable.material:not(.cell-selection) .datatable-body-row:focus,.ngx-datatable.material:not(.cell-selection) .datatable-body-row:focus .datatable-row-group{background-color:#ddd}.ngx-datatable.material.cell-selection .datatable-body-cell:hover,.ngx-datatable.material.cell-selection .datatable-body-cell:hover .datatable-row-group{background-color:#eee;transition-property:background;transition-duration:.3s;transition-timing-function:linear}.ngx-datatable.material.cell-selection .datatable-body-cell:focus,.ngx-datatable.material.cell-selection .datatable-body-cell:focus .datatable-row-group{background-color:#ddd}.ngx-datatable.material.cell-selection .datatable-body-cell.active,.ngx-datatable.material.cell-selection .datatable-body-cell.active .datatable-row-group{background-color:#304ffe;color:#fff}.ngx-datatable.material.cell-selection .datatable-body-cell.active:hover,.ngx-datatable.material.cell-selection .datatable-body-cell.active:hover .datatable-row-group{background-color:#193ae4;color:#fff}.ngx-datatable.material.cell-selection .datatable-body-cell.active:focus,.ngx-datatable.material.cell-selection .datatable-body-cell.active:focus .datatable-row-group{background-color:#2041ef;color:#fff}.ngx-datatable.material .empty-row{height:50px;text-align:left;padding:.5rem 1.2rem;vertical-align:top;border-top:0}.ngx-datatable.material .loading-row{text-align:left;padding:.5rem 1.2rem;vertical-align:top;border-top:0}.ngx-datatable.material .datatable-header .datatable-row-left,.ngx-datatable.material .datatable-body .datatable-row-left{background-color:#fff;background-position:100% 0;background-repeat:repeat-y;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAAFklEQVQIHWPSkNeSBmJhTQVtbiDNCgASagIIuJX8OgAAAABJRU5ErkJggg==)}.ngx-datatable.material .datatable-header .datatable-row-right,.ngx-datatable.material .datatable-body .datatable-row-right{background-position:0 0;background-color:#fff;background-repeat:repeat-y;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABCAYAAAD5PA/NAAAAFklEQVQI12PQkNdi1VTQ5gbSwkAsDQARLAIGtOSFUAAAAABJRU5ErkJggg==)}.ngx-datatable.material .datatable-header{border-bottom:1px solid rgba(0,0,0,.12)}.ngx-datatable.material .datatable-header .datatable-header-cell{text-align:left;padding:.9rem 1.2rem;font-weight:400;background-color:#fff;color:#0000008a;vertical-align:bottom;font-size:12px;font-weight:500}.ngx-datatable.material .datatable-header .datatable-header-cell .datatable-header-cell-wrapper{position:relative}.ngx-datatable.material .datatable-header .datatable-header-cell.longpress .draggable:after{transition:transform .4s ease,opacity .4s ease;opacity:.5;transform:scale(1)}.ngx-datatable.material .datatable-header .datatable-header-cell .draggable:after{content:" ";position:absolute;top:50%;left:50%;margin:-30px 0 0 -30px;height:60px;width:60px;background:#eee;border-radius:100%;opacity:1;filter:none;transform:scale(0);z-index:9999;pointer-events:none}.ngx-datatable.material .datatable-header .datatable-header-cell.dragging .resize-handle{border-right:none}.ngx-datatable.material .datatable-header .resize-handle{border-right:solid 1px #eee}.ngx-datatable.material .datatable-body{position:relative}.ngx-datatable.material .datatable-body .datatable-row-detail{background:#f5f5f5;padding:10px}.ngx-datatable.material .datatable-body .datatable-group-header{background:#f5f5f5;border-bottom:solid 1px #d9d8d9;border-top:solid 1px #d9d8d9}.ngx-datatable.material .datatable-body .datatable-body-row .datatable-body-cell,.ngx-datatable.material .datatable-body .datatable-body-row .datatable-body-group-cell{text-align:left;padding:.9rem 1.2rem;vertical-align:top;border-top:0;color:#000000de;transition:width .3s ease;font-size:14px;font-weight:400}.ngx-datatable.material .datatable-body .progress-linear{display:block;position:sticky;width:100%;height:5px;padding:0;margin:0;top:0}.ngx-datatable.material .datatable-body .progress-linear .container{display:block;position:relative;overflow:hidden;width:100%;height:5px;transform:translate(0) scale(1);background-color:#aad1f9}.ngx-datatable.material .datatable-body .progress-linear .container .bar{transition:all .2s linear;animation:query .8s infinite cubic-bezier(.39,.575,.565,1);transition:transform .2s linear;background-color:#106cc8;position:absolute;left:0;top:0;bottom:0;width:100%;height:5px}.ngx-datatable.material .datatable-footer{border-top:1px solid rgba(0,0,0,.12);font-size:12px;font-weight:400;color:#0000008a}.ngx-datatable.material .datatable-footer .page-count{line-height:50px;height:50px;padding:0 1.2rem}.ngx-datatable.material .datatable-footer .datatable-pager{margin:0 10px}.ngx-datatable.material .datatable-footer .datatable-pager li{vertical-align:middle}.ngx-datatable.material .datatable-footer .datatable-pager li.disabled a{color:#00000042!important;background-color:transparent!important}.ngx-datatable.material .datatable-footer .datatable-pager li.active a{background-color:#9e9e9e33;font-weight:700}.ngx-datatable.material .datatable-footer .datatable-pager a{height:22px;min-width:24px;line-height:22px;padding:0 6px;border-radius:3px;margin:6px 3px;text-align:center;vertical-align:top;color:#0000008a;text-decoration:none;vertical-align:bottom}.ngx-datatable.material .datatable-footer .datatable-pager a:hover{color:#000000bf;background-color:#9e9e9e33}.ngx-datatable.material .datatable-footer .datatable-pager .datatable-icon-left,.ngx-datatable.material .datatable-footer .datatable-pager .datatable-icon-skip,.ngx-datatable.material .datatable-footer .datatable-pager .datatable-icon-right,.ngx-datatable.material .datatable-footer .datatable-pager .datatable-icon-prev{font-size:20px;line-height:20px;padding:0 3px}.ngx-datatable.material .datatable-summary-row .datatable-body-row,.ngx-datatable.material .datatable-summary-row .datatable-body-row:hover{background-color:#ddd}.ngx-datatable.material .datatable-summary-row .datatable-body-row .datatable-body-cell{font-weight:700}.datatable-checkbox{position:relative;margin:0;cursor:pointer;vertical-align:middle;display:inline-block;box-sizing:border-box;padding:0}.datatable-checkbox input[type=checkbox]{position:relative;margin:0 1rem 0 0;cursor:pointer;outline:none}.datatable-checkbox input[type=checkbox]:before{transition:all .3s ease-in-out;content:"";position:absolute;left:0;z-index:1;width:1rem;height:1rem;border:2px solid #f2f2f2}.datatable-checkbox input[type=checkbox]:checked:before{transform:rotate(-45deg);height:.5rem;border-color:#009688;border-top-style:none;border-right-style:none}.datatable-checkbox input[type=checkbox]:after{content:"";position:absolute;top:0;left:0;width:1rem;height:1rem;background:#fff;cursor:pointer}@keyframes query{0%{opacity:1;transform:translate(35%) scaleX(.3)}to{opacity:0;transform:translate(-50%) scaleX(0)}}\n',
              '.ngx-datatable.dark{box-shadow:none;background:#1b1e27;border:1px solid #2f3646;color:#fff;font-size:13px}.ngx-datatable.dark .datatable-header{background:#181b24;color:#72809b}.ngx-datatable.dark .datatable-header .datatable-header-cell{text-align:left;padding:.5rem 1.2rem;font-weight:700}.ngx-datatable.dark .datatable-header .datatable-header-cell .datatable-header-cell-label{line-height:24px}.ngx-datatable.dark .datatable-body{background:#1a1e28}.ngx-datatable.dark .datatable-body .datatable-body-row{border-top:1px solid #2f3646}.ngx-datatable.dark .datatable-body .datatable-body-row .datatable-body-cell{text-align:left;padding:.5rem 1.2rem;vertical-align:top}.ngx-datatable.dark .datatable-body .datatable-body-row:hover{background:#171b24;transition-property:background;transition-duration:.3s;transition-timing-function:linear}.ngx-datatable.dark .datatable-body .datatable-body-row:focus{background-color:#232837}.ngx-datatable.dark .datatable-body .datatable-body-row.active{background-color:#1483ff;color:#fff}.ngx-datatable.dark .datatable-footer{background:#232837;color:#72809b;margin-top:-1px}.ngx-datatable.dark .datatable-footer .page-count{line-height:50px;height:50px;padding:0 1.2rem}.ngx-datatable.dark .datatable-footer .datatable-pager{margin:0 10px;vertical-align:top}.ngx-datatable.dark .datatable-footer .datatable-pager ul li{margin:10px 0}.ngx-datatable.dark .datatable-footer .datatable-pager ul li:not(.disabled).active a,.ngx-datatable.dark .datatable-footer .datatable-pager ul li:not(.disabled):hover a{background-color:#455066;font-weight:700}.ngx-datatable.dark .datatable-footer .datatable-pager a{height:22px;min-width:24px;line-height:22px;padding:0;border-radius:3px;margin:0 3px;text-align:center;vertical-align:top;text-decoration:none;vertical-align:bottom;color:#72809b}.ngx-datatable.dark .datatable-footer .datatable-pager .datatable-icon-left,.ngx-datatable.dark .datatable-footer .datatable-pager .datatable-icon-skip,.ngx-datatable.dark .datatable-footer .datatable-pager .datatable-icon-right,.ngx-datatable.dark .datatable-footer .datatable-pager .datatable-icon-prev{font-size:18px;line-height:27px;padding:0 3px}.ngx-datatable.dark .datatable-summary-row .datatable-body-row,.ngx-datatable.dark .datatable-summary-row .datatable-body-row:hover{background-color:#14171f}.ngx-datatable.dark .datatable-summary-row .datatable-body-row .datatable-body-cell{font-weight:700}\n',
              '.ngx-datatable.bootstrap{box-shadow:none;font-size:13px}.ngx-datatable.bootstrap .datatable-header{height:auto!important;height:initial!important}.ngx-datatable.bootstrap .datatable-header .datatable-header-cell{vertical-align:bottom;padding:.75rem;border-bottom:1px solid #d1d4d7}.ngx-datatable.bootstrap .datatable-header .datatable-header-cell .datatable-header-cell-label{line-height:24px}.ngx-datatable.bootstrap .datatable-body .datatable-body-row{vertical-align:top;border-top:1px solid #d1d4d7}.ngx-datatable.bootstrap .datatable-body .datatable-body-row.datatable-row-even{background-color:#0000000d}.ngx-datatable.bootstrap .datatable-body .datatable-body-row.active{background-color:#1483ff;color:#fff}.ngx-datatable.bootstrap .datatable-body .datatable-body-row .datatable-body-cell{padding:.75rem;text-align:left;vertical-align:top}.ngx-datatable.bootstrap .datatable-body .empty-row{position:relative;padding:.75rem 1.25rem;margin-bottom:0}.ngx-datatable.bootstrap .datatable-footer{background:#424242;color:#ededed;margin-top:-1px}.ngx-datatable.bootstrap .datatable-footer .page-count{line-height:50px;height:50px;padding:0 1.2rem}.ngx-datatable.bootstrap .datatable-footer .datatable-pager{margin:0 10px;vertical-align:top}.ngx-datatable.bootstrap .datatable-footer .datatable-pager ul li{margin:10px 0}.ngx-datatable.bootstrap .datatable-footer .datatable-pager ul li:not(.disabled).active a,.ngx-datatable.bootstrap .datatable-footer .datatable-pager ul li:not(.disabled):hover a{background-color:#545454;font-weight:700}.ngx-datatable.bootstrap .datatable-footer .datatable-pager a{height:22px;min-width:24px;line-height:22px;padding:0;border-radius:3px;margin:0 3px;text-align:center;vertical-align:top;text-decoration:none;vertical-align:bottom;color:#ededed}.ngx-datatable.bootstrap .datatable-footer .datatable-pager .datatable-icon-left,.ngx-datatable.bootstrap .datatable-footer .datatable-pager .datatable-icon-skip,.ngx-datatable.bootstrap .datatable-footer .datatable-pager .datatable-icon-right,.ngx-datatable.bootstrap .datatable-footer .datatable-pager .datatable-icon-prev{font-size:18px;line-height:27px;padding:0 3px}.ngx-datatable.bootstrap .datatable-summary-row .datatable-body-row .datatable-body-cell{font-weight:700}\n'
            ],
            encapsulation: 2
          })),
          t
        );
      })();
      const qa = Oo(
          t =>
            function () {
              t(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence');
            }
        ),
        { isArray: IN } = Array,
        { getPrototypeOf: EN, prototype: MN, keys: AN } = Object;
      function Kw(...t) {
        const n = Lo(t),
          e = (function jv(t) {
            return le(Cl(t)) ? t.pop() : void 0;
          })(t),
          { args: r, keys: o } = (function RN(t) {
            if (1 === t.length) {
              const n = t[0];
              if (IN(n)) return { args: n, keys: null };
              if (
                (function kN(t) {
                  return t && 'object' == typeof t && EN(t) === MN;
                })(n)
              ) {
                const e = AN(n);
                return { args: e.map(r => n[r]), keys: e };
              }
            }
            return { args: t, keys: null };
          })(t);
        if (0 === r.length) return ze([], n);
        const i = new Ie(
          (function FN(t, n, e = cr) {
            return r => {
              Jw(
                n,
                () => {
                  const { length: o } = t,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let l = 0; l < o; l++)
                    Jw(
                      n,
                      () => {
                        const c = ze(t[l], n);
                        let u = !1;
                        c.subscribe(
                          Le(
                            r,
                            d => {
                              (i[l] = d), u || ((u = !0), a--), a || r.next(e(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            n,
            o
              ? s =>
                  (function PN(t, n) {
                    return t.reduce((e, r, o) => ((e[r] = n[o]), e), {});
                  })(o, s)
              : cr
          )
        );
        return e ? i.pipe(Vw(e)) : i;
      }
      function Jw(t, n, e) {
        t ? wn(e, t, n) : n();
      }
      function eb(t) {
        return new Ie(n => {
          Nt(t()).subscribe(n);
        });
      }
      function $i(t, n) {
        const e = le(t) ? t : () => t,
          r = o => o.error(e());
        return new Ie(n ? o => n.schedule(r, 0, o) : r);
      }
      function Ld() {
        return He((t, n) => {
          let e = null;
          t._refCount++;
          const r = Le(n, void 0, void 0, void 0, () => {
            if (!t || t._refCount <= 0 || 0 < --t._refCount) return void (e = null);
            const o = t._connection,
              i = e;
            (e = null), o && (!i || o === i) && o.unsubscribe(), n.unsubscribe();
          });
          t.subscribe(r), r.closed || (e = t.connect());
        });
      }
      class tb extends Ie {
        constructor(n, e) {
          super(),
            (this.source = n),
            (this.subjectFactory = e),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            Pf(n) && (this.lift = n.lift);
        }
        _subscribe(n) {
          return this.getSubject().subscribe(n);
        }
        getSubject() {
          const n = this._subject;
          return (!n || n.isStopped) && (this._subject = this.subjectFactory()), this._subject;
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: n } = this;
          (this._subject = this._connection = null), null == n || n.unsubscribe();
        }
        connect() {
          let n = this._connection;
          if (!n) {
            n = this._connection = new Dt();
            const e = this.getSubject();
            n.add(
              this.source.subscribe(
                Le(
                  e,
                  void 0,
                  () => {
                    this._teardown(), e.complete();
                  },
                  r => {
                    this._teardown(), e.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              n.closed && ((this._connection = null), (n = Dt.EMPTY));
          }
          return n;
        }
        refCount() {
          return Ld()(this);
        }
      }
      function _n(t, n) {
        return He((e, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          e.subscribe(
            Le(
              r,
              l => {
                null == o || o.unsubscribe();
                let c = 0;
                const u = i++;
                Nt(t(l, u)).subscribe(
                  (o = Le(
                    r,
                    d => r.next(n ? n(l, d, u, c++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function rr(t, n) {
        return He((e, r) => {
          let o = 0;
          e.subscribe(Le(r, i => t.call(n, i, o++) && r.next(i)));
        });
      }
      function Qa(t) {
        return He((n, e) => {
          let r = !1;
          n.subscribe(
            Le(
              e,
              o => {
                (r = !0), e.next(o);
              },
              () => {
                r || e.next(t), e.complete();
              }
            )
          );
        });
      }
      function nb(t = ON) {
        return He((n, e) => {
          let r = !1;
          n.subscribe(
            Le(
              e,
              o => {
                (r = !0), e.next(o);
              },
              () => (r ? e.complete() : e.error(t()))
            )
          );
        });
      }
      function ON() {
        return new qa();
      }
      function or(t, n) {
        const e = arguments.length >= 2;
        return r => r.pipe(t ? rr((o, i) => t(o, i, r)) : cr, Ir(1), e ? Qa(n) : nb(() => new qa()));
      }
      function Er(t, n) {
        return le(n) ? Ue(t, n, 1) : Ue(t, 1);
      }
      function at(t, n, e) {
        const r = le(t) || n || e ? { next: t, error: n, complete: e } : t;
        return r
          ? He((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                Le(
                  i,
                  l => {
                    var c;
                    null === (c = r.next) || void 0 === c || c.call(r, l), i.next(l);
                  },
                  () => {
                    var l;
                    (a = !1), null === (l = r.complete) || void 0 === l || l.call(r), i.complete();
                  },
                  l => {
                    var c;
                    (a = !1), null === (c = r.error) || void 0 === c || c.call(r, l), i.error(l);
                  },
                  () => {
                    var l, c;
                    a && (null === (l = r.unsubscribe) || void 0 === l || l.call(r)),
                      null === (c = r.finalize) || void 0 === c || c.call(r);
                  }
                )
              );
            })
          : cr;
      }
      function ir(t) {
        return He((n, e) => {
          let i,
            r = null,
            o = !1;
          (r = n.subscribe(
            Le(e, void 0, void 0, s => {
              (i = Nt(t(s, ir(t)(n)))), r ? (r.unsubscribe(), (r = null), i.subscribe(e)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(e));
        });
      }
      function HN(t, n, e, r, o) {
        return (i, s) => {
          let a = e,
            l = n,
            c = 0;
          i.subscribe(
            Le(
              s,
              u => {
                const d = c++;
                (l = a ? t(l, u, d) : ((a = !0), u)), r && s.next(l);
              },
              o &&
                (() => {
                  a && s.next(l), s.complete();
                })
            )
          );
        };
      }
      function rb(t, n) {
        return He(HN(t, n, arguments.length >= 2, !0));
      }
      function Bd(t) {
        return t <= 0
          ? () => bn
          : He((n, e) => {
              let r = [];
              n.subscribe(
                Le(
                  e,
                  o => {
                    r.push(o), t < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) e.next(o);
                    e.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function ob(t, n) {
        const e = arguments.length >= 2;
        return r => r.pipe(t ? rr((o, i) => t(o, i, r)) : cr, Bd(1), e ? Qa(n) : nb(() => new qa()));
      }
      function jd(t) {
        return He((n, e) => {
          try {
            n.subscribe(e);
          } finally {
            e.add(t);
          }
        });
      }
      const te = 'primary',
        Ui = Symbol('RouteTitle');
      class BN {
        constructor(n) {
          this.params = n || {};
        }
        has(n) {
          return Object.prototype.hasOwnProperty.call(this.params, n);
        }
        get(n) {
          if (this.has(n)) {
            const e = this.params[n];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(n) {
          if (this.has(n)) {
            const e = this.params[n];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Mo(t) {
        return new BN(t);
      }
      function jN(t, n, e) {
        const r = e.path.split('/');
        if (r.length > t.length || ('full' === e.pathMatch && (n.hasChildren() || r.length < t.length))) return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = t[i];
          if (s.startsWith(':')) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: o };
      }
      function yn(t, n) {
        const e = t ? Object.keys(t) : void 0,
          r = n ? Object.keys(n) : void 0;
        if (!e || !r || e.length != r.length) return !1;
        let o;
        for (let i = 0; i < e.length; i++) if (((o = e[i]), !ib(t[o], n[o]))) return !1;
        return !0;
      }
      function ib(t, n) {
        if (Array.isArray(t) && Array.isArray(n)) {
          if (t.length !== n.length) return !1;
          const e = [...t].sort(),
            r = [...n].sort();
          return e.every((o, i) => r[i] === o);
        }
        return t === n;
      }
      function sb(t) {
        return Array.prototype.concat.apply([], t);
      }
      function ab(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Ke(t, n) {
        for (const e in t) t.hasOwnProperty(e) && n(t[e], e);
      }
      function sr(t) {
        return tm(t) ? t : na(t) ? ze(Promise.resolve(t)) : B(t);
      }
      const UN = {
          exact: function ub(t, n, e) {
            if (
              !Ar(t.segments, n.segments) ||
              !Xa(t.segments, n.segments, e) ||
              t.numberOfChildren !== n.numberOfChildren
            )
              return !1;
            for (const r in n.children) if (!t.children[r] || !ub(t.children[r], n.children[r], e)) return !1;
            return !0;
          },
          subset: db
        },
        lb = {
          exact: function zN(t, n) {
            return yn(t, n);
          },
          subset: function GN(t, n) {
            return Object.keys(n).length <= Object.keys(t).length && Object.keys(n).every(e => ib(t[e], n[e]));
          },
          ignored: () => !0
        };
      function cb(t, n, e) {
        return (
          UN[e.paths](t.root, n.root, e.matrixParams) &&
          lb[e.queryParams](t.queryParams, n.queryParams) &&
          !('exact' === e.fragment && t.fragment !== n.fragment)
        );
      }
      function db(t, n, e) {
        return fb(t, n, n.segments, e);
      }
      function fb(t, n, e, r) {
        if (t.segments.length > e.length) {
          const o = t.segments.slice(0, e.length);
          return !(!Ar(o, e) || n.hasChildren() || !Xa(o, e, r));
        }
        if (t.segments.length === e.length) {
          if (!Ar(t.segments, e) || !Xa(t.segments, e, r)) return !1;
          for (const o in n.children) if (!t.children[o] || !db(t.children[o], n.children[o], r)) return !1;
          return !0;
        }
        {
          const o = e.slice(0, t.segments.length),
            i = e.slice(t.segments.length);
          return !!(Ar(t.segments, o) && Xa(t.segments, o, r) && t.children[te]) && fb(t.children[te], n, i, r);
        }
      }
      function Xa(t, n, e) {
        return n.every((r, o) => lb[e](t[o].parameters, r.parameters));
      }
      class Mr {
        constructor(n, e, r) {
          (this.root = n), (this.queryParams = e), (this.fragment = r);
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = Mo(this.queryParams)), this._queryParamMap;
        }
        toString() {
          return QN.serialize(this);
        }
      }
      class re {
        constructor(n, e) {
          (this.segments = n), (this.children = e), (this.parent = null), Ke(e, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Ya(this);
        }
      }
      class zi {
        constructor(n, e) {
          (this.path = n), (this.parameters = e);
        }
        get parameterMap() {
          return this._parameterMap || (this._parameterMap = Mo(this.parameters)), this._parameterMap;
        }
        toString() {
          return mb(this);
        }
      }
      function Ar(t, n) {
        return t.length === n.length && t.every((e, r) => e.path === n[r].path);
      }
      let hb = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = G({
            token: t,
            factory: function () {
              return new $d();
            },
            providedIn: 'root'
          })),
          t
        );
      })();
      class $d {
        parse(n) {
          const e = new rO(n);
          return new Mr(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment());
        }
        serialize(n) {
          const e = `/${Gi(n.root, !0)}`,
            r = (function ZN(t) {
              const n = Object.keys(t)
                .map(e => {
                  const r = t[e];
                  return Array.isArray(r) ? r.map(o => `${Za(e)}=${Za(o)}`).join('&') : `${Za(e)}=${Za(r)}`;
                })
                .filter(e => !!e);
              return n.length ? `?${n.join('&')}` : '';
            })(n.queryParams);
          return `${e}${r}${
            'string' == typeof n.fragment
              ? `#${(function XN(t) {
                  return encodeURI(t);
                })(n.fragment)}`
              : ''
          }`;
        }
      }
      const QN = new $d();
      function Ya(t) {
        return t.segments.map(n => mb(n)).join('/');
      }
      function Gi(t, n) {
        if (!t.hasChildren()) return Ya(t);
        if (n) {
          const e = t.children[te] ? Gi(t.children[te], !1) : '',
            r = [];
          return (
            Ke(t.children, (o, i) => {
              i !== te && r.push(`${i}:${Gi(o, !1)}`);
            }),
            r.length > 0 ? `${e}(${r.join('//')})` : e
          );
        }
        {
          const e = (function qN(t, n) {
            let e = [];
            return (
              Ke(t.children, (r, o) => {
                o === te && (e = e.concat(n(r, o)));
              }),
              Ke(t.children, (r, o) => {
                o !== te && (e = e.concat(n(r, o)));
              }),
              e
            );
          })(t, (r, o) => (o === te ? [Gi(t.children[te], !1)] : [`${o}:${Gi(r, !1)}`]));
          return 1 === Object.keys(t.children).length && null != t.children[te]
            ? `${Ya(t)}/${e[0]}`
            : `${Ya(t)}/(${e.join('//')})`;
        }
      }
      function pb(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',');
      }
      function Za(t) {
        return pb(t).replace(/%3B/gi, ';');
      }
      function Ud(t) {
        return pb(t).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
      }
      function Ka(t) {
        return decodeURIComponent(t);
      }
      function gb(t) {
        return Ka(t.replace(/\+/g, '%20'));
      }
      function mb(t) {
        return `${Ud(t.path)}${(function YN(t) {
          return Object.keys(t)
            .map(n => `;${Ud(n)}=${Ud(t[n])}`)
            .join('');
        })(t.parameters)}`;
      }
      const KN = /^[^\/()?;=#]+/;
      function Ja(t) {
        const n = t.match(KN);
        return n ? n[0] : '';
      }
      const JN = /^[^=?&#]+/,
        tO = /^[^&#]+/;
      class rO {
        constructor(n) {
          (this.url = n), (this.remaining = n);
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining || this.peekStartsWith('?') || this.peekStartsWith('#')
              ? new re([], {})
              : new re([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const n = {};
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(n);
            } while (this.consumeOptional('&'));
          return n;
        }
        parseFragment() {
          return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
        }
        parseChildren() {
          if ('' === this.remaining) return {};
          this.consumeOptional('/');
          const n = [];
          for (
            this.peekStartsWith('(') || n.push(this.parseSegment());
            this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

          )
            this.capture('/'), n.push(this.parseSegment());
          let e = {};
          this.peekStartsWith('/(') && (this.capture('/'), (e = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith('(') && (r = this.parseParens(!1)),
            (n.length > 0 || Object.keys(e).length > 0) && (r[te] = new re(n, e)),
            r
          );
        }
        parseSegment() {
          const n = Ja(this.remaining);
          if ('' === n && this.peekStartsWith(';')) throw new F(4009, !1);
          return this.capture(n), new zi(Ka(n), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const n = {};
          for (; this.consumeOptional(';'); ) this.parseParam(n);
          return n;
        }
        parseParam(n) {
          const e = Ja(this.remaining);
          if (!e) return;
          this.capture(e);
          let r = '';
          if (this.consumeOptional('=')) {
            const o = Ja(this.remaining);
            o && ((r = o), this.capture(r));
          }
          n[Ka(e)] = Ka(r);
        }
        parseQueryParam(n) {
          const e = (function eO(t) {
            const n = t.match(JN);
            return n ? n[0] : '';
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let r = '';
          if (this.consumeOptional('=')) {
            const s = (function nO(t) {
              const n = t.match(tO);
              return n ? n[0] : '';
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = gb(e),
            i = gb(r);
          if (n.hasOwnProperty(o)) {
            let s = n[o];
            Array.isArray(s) || ((s = [s]), (n[o] = s)), s.push(i);
          } else n[o] = i;
        }
        parseParens(n) {
          const e = {};
          for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
            const r = Ja(this.remaining),
              o = this.remaining[r.length];
            if ('/' !== o && ')' !== o && ';' !== o) throw new F(4010, !1);
            let i;
            r.indexOf(':') > -1
              ? ((i = r.slice(0, r.indexOf(':'))), this.capture(i), this.capture(':'))
              : n && (i = te);
            const s = this.parseChildren();
            (e[i] = 1 === Object.keys(s).length ? s[te] : new re([], s)), this.consumeOptional('//');
          }
          return e;
        }
        peekStartsWith(n) {
          return this.remaining.startsWith(n);
        }
        consumeOptional(n) {
          return !!this.peekStartsWith(n) && ((this.remaining = this.remaining.substring(n.length)), !0);
        }
        capture(n) {
          if (!this.consumeOptional(n)) throw new F(4011, !1);
        }
      }
      function zd(t) {
        return t.segments.length > 0 ? new re([], { [te]: t }) : t;
      }
      function el(t) {
        const n = {};
        for (const r of Object.keys(t.children)) {
          const i = el(t.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (n[r] = i);
        }
        return (function oO(t) {
          if (1 === t.numberOfChildren && t.children[te]) {
            const n = t.children[te];
            return new re(t.segments.concat(n.segments), n.children);
          }
          return t;
        })(new re(t.segments, n));
      }
      function Rr(t) {
        return t instanceof Mr;
      }
      function aO(t, n, e, r, o) {
        var i;
        if (0 === e.length) return Ao(n.root, n.root, n.root, r, o);
        const a = (function wb(t) {
          if ('string' == typeof t[0] && 1 === t.length && '/' === t[0]) return new yb(!0, 0, t);
          let n = 0,
            e = !1;
          const r = t.reduce((o, i, s) => {
            if ('object' == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  Ke(i.outlets, (l, c) => {
                    a[c] = 'string' == typeof l ? l.split('/') : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return 'string' != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split('/').forEach((a, l) => {
                  (0 == l && '.' === a) || (0 == l && '' === a ? (e = !0) : '..' === a ? n++ : '' != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new yb(e, n, r);
        })(e);
        return a.toRoot()
          ? Ao(n.root, n.root, new re([], {}), r, o)
          : (function l(u) {
              var d;
              const h = (function cO(t, n, e, r) {
                  if (t.isAbsolute) return new Ro(n.root, !0, 0);
                  if (-1 === r) return new Ro(e, e === n.root, 0);
                  return (function bb(t, n, e) {
                    let r = t,
                      o = n,
                      i = e;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r)) throw new F(4005, !1);
                      o = r.segments.length;
                    }
                    return new Ro(r, !1, o - i);
                  })(e, r + (Wi(t.commands[0]) ? 0 : 1), t.numberOfDoubleDots);
                })(a, n, null === (d = t.snapshot) || void 0 === d ? void 0 : d._urlSegment, u),
                y = h.processChildren
                  ? Qi(h.segmentGroup, h.index, a.commands)
                  : Wd(h.segmentGroup, h.index, a.commands);
              return Ao(n.root, h.segmentGroup, y, r, o);
            })(null === (i = t.snapshot) || void 0 === i ? void 0 : i._lastPathIndex);
      }
      function Wi(t) {
        return 'object' == typeof t && null != t && !t.outlets && !t.segmentPath;
      }
      function qi(t) {
        return 'object' == typeof t && null != t && t.outlets;
      }
      function Ao(t, n, e, r, o) {
        let s,
          i = {};
        r &&
          Ke(r, (l, c) => {
            i[c] = Array.isArray(l) ? l.map(u => `${u}`) : `${l}`;
          }),
          (s = t === n ? e : _b(t, n, e));
        const a = zd(el(s));
        return new Mr(a, i, o);
      }
      function _b(t, n, e) {
        const r = {};
        return (
          Ke(t.children, (o, i) => {
            r[i] = o === n ? e : _b(o, n, e);
          }),
          new re(t.segments, r)
        );
      }
      class yb {
        constructor(n, e, r) {
          if (
            ((this.isAbsolute = n), (this.numberOfDoubleDots = e), (this.commands = r), n && r.length > 0 && Wi(r[0]))
          )
            throw new F(4003, !1);
          const o = r.find(qi);
          if (o && o !== ab(r)) throw new F(4004, !1);
        }
        toRoot() {
          return this.isAbsolute && 1 === this.commands.length && '/' == this.commands[0];
        }
      }
      class Ro {
        constructor(n, e, r) {
          (this.segmentGroup = n), (this.processChildren = e), (this.index = r);
        }
      }
      function Wd(t, n, e) {
        if ((t || (t = new re([], {})), 0 === t.segments.length && t.hasChildren())) return Qi(t, n, e);
        const r = (function dO(t, n, e) {
            let r = 0,
              o = n;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < t.segments.length; ) {
              if (r >= e.length) return i;
              const s = t.segments[o],
                a = e[r];
              if (qi(a)) break;
              const l = `${a}`,
                c = r < e.length - 1 ? e[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && c && 'object' == typeof c && void 0 === c.outlets) {
                if (!Cb(l, c, s)) return i;
                r += 2;
              } else {
                if (!Cb(l, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(t, n, e),
          o = e.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const i = new re(t.segments.slice(0, r.pathIndex), {});
          return (i.children[te] = new re(t.segments.slice(r.pathIndex), t.children)), Qi(i, 0, o);
        }
        return r.match && 0 === o.length
          ? new re(t.segments, {})
          : r.match && !t.hasChildren()
          ? qd(t, n, e)
          : r.match
          ? Qi(t, 0, o)
          : qd(t, n, e);
      }
      function Qi(t, n, e) {
        if (0 === e.length) return new re(t.segments, {});
        {
          const r = (function uO(t) {
              return qi(t[0]) ? t[0].outlets : { [te]: t };
            })(e),
            o = {};
          return (
            Ke(r, (i, s) => {
              'string' == typeof i && (i = [i]), null !== i && (o[s] = Wd(t.children[s], n, i));
            }),
            Ke(t.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new re(t.segments, o)
          );
        }
      }
      function qd(t, n, e) {
        const r = t.segments.slice(0, n);
        let o = 0;
        for (; o < e.length; ) {
          const i = e[o];
          if (qi(i)) {
            const l = fO(i.outlets);
            return new re(r, l);
          }
          if (0 === o && Wi(e[0])) {
            r.push(new zi(t.segments[n].path, vb(e[0]))), o++;
            continue;
          }
          const s = qi(i) ? i.outlets[te] : `${i}`,
            a = o < e.length - 1 ? e[o + 1] : null;
          s && a && Wi(a) ? (r.push(new zi(s, vb(a))), (o += 2)) : (r.push(new zi(s, {})), o++);
        }
        return new re(r, {});
      }
      function fO(t) {
        const n = {};
        return (
          Ke(t, (e, r) => {
            'string' == typeof e && (e = [e]), null !== e && (n[r] = qd(new re([], {}), 0, e));
          }),
          n
        );
      }
      function vb(t) {
        const n = {};
        return Ke(t, (e, r) => (n[r] = `${e}`)), n;
      }
      function Cb(t, n, e) {
        return t == e.path && yn(n, e.parameters);
      }
      class Hn {
        constructor(n, e) {
          (this.id = n), (this.url = e);
        }
      }
      class Qd extends Hn {
        constructor(n, e, r = 'imperative', o = null) {
          super(n, e), (this.type = 0), (this.navigationTrigger = r), (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class kr extends Hn {
        constructor(n, e, r) {
          super(n, e), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class tl extends Hn {
        constructor(n, e, r, o) {
          super(n, e), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Db extends Hn {
        constructor(n, e, r, o) {
          super(n, e), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class hO extends Hn {
        constructor(n, e, r, o) {
          super(n, e), (this.urlAfterRedirects = r), (this.state = o), (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class pO extends Hn {
        constructor(n, e, r, o) {
          super(n, e), (this.urlAfterRedirects = r), (this.state = o), (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class gO extends Hn {
        constructor(n, e, r, o, i) {
          super(n, e), (this.urlAfterRedirects = r), (this.state = o), (this.shouldActivate = i), (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class mO extends Hn {
        constructor(n, e, r, o) {
          super(n, e), (this.urlAfterRedirects = r), (this.state = o), (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class _O extends Hn {
        constructor(n, e, r, o) {
          super(n, e), (this.urlAfterRedirects = r), (this.state = o), (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class yO {
        constructor(n) {
          (this.route = n), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class wO {
        constructor(n) {
          (this.route = n), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class bO {
        constructor(n) {
          (this.snapshot = n), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class vO {
        constructor(n) {
          (this.snapshot = n), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class CO {
        constructor(n) {
          (this.snapshot = n), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class DO {
        constructor(n) {
          (this.snapshot = n), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class Tb {
        constructor(n, e, r) {
          (this.routerEvent = n), (this.position = e), (this.anchor = r), (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class Sb {
        constructor(n) {
          this._root = n;
        }
        get root() {
          return this._root.value;
        }
        parent(n) {
          const e = this.pathFromRoot(n);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(n) {
          const e = Xd(n, this._root);
          return e ? e.children.map(r => r.value) : [];
        }
        firstChild(n) {
          const e = Xd(n, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(n) {
          const e = Yd(n, this._root);
          return e.length < 2 ? [] : e[e.length - 2].children.map(o => o.value).filter(o => o !== n);
        }
        pathFromRoot(n) {
          return Yd(n, this._root).map(e => e.value);
        }
      }
      function Xd(t, n) {
        if (t === n.value) return n;
        for (const e of n.children) {
          const r = Xd(t, e);
          if (r) return r;
        }
        return null;
      }
      function Yd(t, n) {
        if (t === n.value) return [n];
        for (const e of n.children) {
          const r = Yd(t, e);
          if (r.length) return r.unshift(n), r;
        }
        return [];
      }
      class Ln {
        constructor(n, e) {
          (this.value = n), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function ko(t) {
        const n = {};
        return t && t.children.forEach(e => (n[e.value.outlet] = e)), n;
      }
      class xb extends Sb {
        constructor(n, e) {
          super(n), (this.snapshot = e), Zd(this, n);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Ib(t, n) {
        const e = (function SO(t, n) {
            const s = new nl([], {}, {}, '', {}, te, n, null, t.root, -1, {});
            return new Mb('', new Ln(s, []));
          })(t, n),
          r = new Gt([new zi('', {})]),
          o = new Gt({}),
          i = new Gt({}),
          s = new Gt({}),
          a = new Gt(''),
          l = new Pr(r, o, s, a, i, te, n, e.root);
        return (l.snapshot = e.root), new xb(new Ln(l, []), e);
      }
      class Pr {
        constructor(n, e, r, o, i, s, a, l) {
          var c, u;
          (this.url = n),
            (this.params = e),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title =
              null !== (u = null === (c = this.data) || void 0 === c ? void 0 : c.pipe(ie(d => d[Ui]))) && void 0 !== u
                ? u
                : B(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = this.params.pipe(ie(n => Mo(n)))), this._paramMap;
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = this.queryParams.pipe(ie(n => Mo(n)))), this._queryParamMap
          );
        }
        toString() {
          return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
        }
      }
      function Eb(t, n = 'emptyOnly') {
        const e = t.pathFromRoot;
        let r = 0;
        if ('always' !== n)
          for (r = e.length - 1; r >= 1; ) {
            const o = e[r],
              i = e[r - 1];
            if (o.routeConfig && '' === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function xO(t) {
          return t.reduce(
            (n, e) => {
              var r;
              return {
                params: Object.assign(Object.assign({}, n.params), e.params),
                data: Object.assign(Object.assign({}, n.data), e.data),
                resolve: Object.assign(
                  Object.assign(
                    Object.assign(Object.assign({}, e.data), n.resolve),
                    null === (r = e.routeConfig) || void 0 === r ? void 0 : r.data
                  ),
                  e._resolvedData
                )
              };
            },
            { params: {}, data: {}, resolve: {} }
          );
        })(e.slice(r));
      }
      class nl {
        constructor(n, e, r, o, i, s, a, l, c, u, d, h) {
          var y;
          (this.url = n),
            (this.params = e),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = null === (y = this.data) || void 0 === y ? void 0 : y[Ui]),
            (this.routeConfig = l),
            (this._urlSegment = c),
            (this._lastPathIndex = u),
            (this._correctedLastPathIndex = null != h ? h : u),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = Mo(this.params)), this._paramMap;
        }
        get queryParamMap() {
          return this._queryParamMap || (this._queryParamMap = Mo(this.queryParams)), this._queryParamMap;
        }
        toString() {
          return `Route(url:'${this.url.map(r => r.toString()).join('/')}', path:'${
            this.routeConfig ? this.routeConfig.path : ''
          }')`;
        }
      }
      class Mb extends Sb {
        constructor(n, e) {
          super(e), (this.url = n), Zd(this, e);
        }
        toString() {
          return Ab(this._root);
        }
      }
      function Zd(t, n) {
        (n.value._routerState = t), n.children.forEach(e => Zd(t, e));
      }
      function Ab(t) {
        const n = t.children.length > 0 ? ` { ${t.children.map(Ab).join(', ')} } ` : '';
        return `${t.value}${n}`;
      }
      function Kd(t) {
        if (t.snapshot) {
          const n = t.snapshot,
            e = t._futureSnapshot;
          (t.snapshot = e),
            yn(n.queryParams, e.queryParams) || t.queryParams.next(e.queryParams),
            n.fragment !== e.fragment && t.fragment.next(e.fragment),
            yn(n.params, e.params) || t.params.next(e.params),
            (function VN(t, n) {
              if (t.length !== n.length) return !1;
              for (let e = 0; e < t.length; ++e) if (!yn(t[e], n[e])) return !1;
              return !0;
            })(n.url, e.url) || t.url.next(e.url),
            yn(n.data, e.data) || t.data.next(e.data);
        } else (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function Jd(t, n) {
        const e =
          yn(t.params, n.params) &&
          (function WN(t, n) {
            return Ar(t, n) && t.every((e, r) => yn(e.parameters, n[r].parameters));
          })(t.url, n.url);
        return e && !(!t.parent != !n.parent) && (!t.parent || Jd(t.parent, n.parent));
      }
      function Xi(t, n, e) {
        if (e && t.shouldReuseRoute(n.value, e.value.snapshot)) {
          const r = e.value;
          r._futureSnapshot = n.value;
          const o = (function EO(t, n, e) {
            return n.children.map(r => {
              for (const o of e.children) if (t.shouldReuseRoute(r.value, o.value.snapshot)) return Xi(t, r, o);
              return Xi(t, r);
            });
          })(t, n, e);
          return new Ln(r, o);
        }
        {
          if (t.shouldAttach(n.value)) {
            const i = t.retrieve(n.value);
            if (null !== i) {
              const s = i.route;
              return (s.value._futureSnapshot = n.value), (s.children = n.children.map(a => Xi(t, a))), s;
            }
          }
          const r = (function MO(t) {
              return new Pr(
                new Gt(t.url),
                new Gt(t.params),
                new Gt(t.queryParams),
                new Gt(t.fragment),
                new Gt(t.data),
                t.outlet,
                t.component,
                t
              );
            })(n.value),
            o = n.children.map(i => Xi(t, i));
          return new Ln(r, o);
        }
      }
      const ef = 'ngNavigationCancelingError';
      function Rb(t, n) {
        const { redirectTo: e, navigationBehaviorOptions: r } = Rr(n)
            ? { redirectTo: n, navigationBehaviorOptions: void 0 }
            : n,
          o = kb(!1, 0, n);
        return (o.url = e), (o.navigationBehaviorOptions = r), o;
      }
      function kb(t, n, e) {
        const r = new Error('NavigationCancelingError: ' + (t || ''));
        return (r[ef] = !0), (r.cancellationCode = n), e && (r.url = e), r;
      }
      function Pb(t) {
        return Fb(t) && Rr(t.url);
      }
      function Fb(t) {
        return t && t[ef];
      }
      class AO {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Yi()),
            (this.attachRef = null);
        }
      }
      let Yi = (() => {
        class t {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(e, r) {
            const o = this.getOrCreateContext(e);
            (o.outlet = r), this.contexts.set(e, o);
          }
          onChildOutletDestroyed(e) {
            const r = this.getContext(e);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const e = this.contexts;
            return (this.contexts = new Map()), e;
          }
          onOutletReAttached(e) {
            this.contexts = e;
          }
          getOrCreateContext(e) {
            let r = this.getContext(e);
            return r || ((r = new AO()), this.contexts.set(e, r)), r;
          }
          getContext(e) {
            return this.contexts.get(e) || null;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      const rl = !1;
      let Nb = (() => {
        class t {
          constructor(e, r, o, i, s) {
            (this.parentContexts = e),
              (this.location = r),
              (this.changeDetector = i),
              (this.environmentInjector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new O()),
              (this.deactivateEvents = new O()),
              (this.attachEvents = new O()),
              (this.detachEvents = new O()),
              (this.name = o || te),
              e.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            var e;
            (null === (e = this.parentContexts.getContext(this.name)) || void 0 === e ? void 0 : e.outlet) === this &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const e = this.parentContexts.getContext(this.name);
              e &&
                e.route &&
                (e.attachRef ? this.attach(e.attachRef, e.route) : this.activateWith(e.route, e.injector));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new F(4012, rl);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new F(4012, rl);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
          }
          detach() {
            if (!this.activated) throw new F(4012, rl);
            this.location.detach();
            const e = this.activated;
            return (this.activated = null), (this._activatedRoute = null), this.detachEvents.emit(e.instance), e;
          }
          attach(e, r) {
            (this.activated = e),
              (this._activatedRoute = r),
              this.location.insert(e.hostView),
              this.attachEvents.emit(e.instance);
          }
          deactivate() {
            if (this.activated) {
              const e = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(e);
            }
          }
          activateWith(e, r) {
            if (this.isActivated) throw new F(4013, rl);
            this._activatedRoute = e;
            const o = this.location,
              s = e._futureSnapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new RO(e, a, o.injector);
            if (
              r &&
              (function kO(t) {
                return !!t.resolveComponentFactory;
              })(r)
            ) {
              const c = r.resolveComponentFactory(s);
              this.activated = o.createComponent(c, o.length, l);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: l,
                environmentInjector: null != r ? r : this.environmentInjector
              });
            this.changeDetector.markForCheck(), this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(
              I(Yi),
              I(Vt),
              (function Xo(t) {
                return (function JC(t, n) {
                  if ('class' === n) return t.classes;
                  if ('style' === n) return t.styles;
                  const e = t.attrs;
                  if (e) {
                    const r = e.length;
                    let o = 0;
                    for (; o < r; ) {
                      const i = e[o];
                      if (Dh(i)) break;
                      if (0 === i) o += 2;
                      else if ('number' == typeof i) for (o++; o < r && 'string' == typeof e[o]; ) o++;
                      else {
                        if (i === n) return e[o + 1];
                        o += 2;
                      }
                    }
                  }
                  return null;
                })(Ge(), t);
              })('name'),
              I($t),
              I(Gn)
            );
          }),
          (t.ɵdir = de({
            type: t,
            selectors: [['router-outlet']],
            outputs: {
              activateEvents: 'activate',
              deactivateEvents: 'deactivate',
              attachEvents: 'attach',
              detachEvents: 'detach'
            },
            exportAs: ['outlet'],
            standalone: !0
          })),
          t
        );
      })();
      class RO {
        constructor(n, e, r) {
          (this.route = n), (this.childContexts = e), (this.parent = r);
        }
        get(n, e) {
          return n === Pr ? this.route : n === Yi ? this.childContexts : this.parent.get(n, e);
        }
      }
      let tf = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = P({
            type: t,
            selectors: [['ng-component']],
            standalone: !0,
            features: [v_],
            decls: 1,
            vars: 0,
            template: function (e, r) {
              1 & e && S(0, 'router-outlet');
            },
            dependencies: [Nb],
            encapsulation: 2
          })),
          t
        );
      })();
      function Ob(t, n) {
        var e;
        return (
          t.providers && !t._injector && (t._injector = ua(t.providers, n, `Route: ${t.path}`)),
          null !== (e = t._injector) && void 0 !== e ? e : n
        );
      }
      function rf(t) {
        const n = t.children && t.children.map(rf),
          e = n ? Object.assign(Object.assign({}, t), { children: n }) : Object.assign({}, t);
        return (
          !e.component &&
            !e.loadComponent &&
            (n || e.loadChildren) &&
            e.outlet &&
            e.outlet !== te &&
            (e.component = tf),
          e
        );
      }
      function Wt(t) {
        return t.outlet || te;
      }
      function Hb(t, n) {
        const e = t.filter(r => Wt(r) === n);
        return e.push(...t.filter(r => Wt(r) !== n)), e;
      }
      function Zi(t) {
        var n;
        if (!t) return null;
        if (null !== (n = t.routeConfig) && void 0 !== n && n._injector) return t.routeConfig._injector;
        for (let e = t.parent; e; e = e.parent) {
          const r = e.routeConfig;
          if (null != r && r._loadedInjector) return r._loadedInjector;
          if (null != r && r._injector) return r._injector;
        }
        return null;
      }
      class HO {
        constructor(n, e, r, o) {
          (this.routeReuseStrategy = n), (this.futureState = e), (this.currState = r), (this.forwardEvent = o);
        }
        activate(n) {
          const e = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, r, n), Kd(this.futureState.root), this.activateChildRoutes(e, r, n);
        }
        deactivateChildRoutes(n, e, r) {
          const o = ko(e);
          n.children.forEach(i => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            Ke(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(n, e, r) {
          const o = n.value,
            i = e ? e.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(n, e, s.children);
            } else this.deactivateChildRoutes(n, e, r);
          else i && this.deactivateRouteAndItsChildren(e, r);
        }
        deactivateRouteAndItsChildren(n, e) {
          n.value.component && this.routeReuseStrategy.shouldDetach(n.value.snapshot)
            ? this.detachAndStoreRouteSubtree(n, e)
            : this.deactivateRouteAndOutlet(n, e);
        }
        detachAndStoreRouteSubtree(n, e) {
          const r = e.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : e,
            i = ko(n);
          for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(n.value.snapshot, { componentRef: s, route: n, contexts: a });
          }
        }
        deactivateRouteAndOutlet(n, e) {
          const r = e.getContext(n.value.outlet),
            o = r && n.value.component ? r.children : e,
            i = ko(n);
          for (const s of Object.keys(i)) this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(n, e, r) {
          const o = ko(e);
          n.children.forEach(i => {
            this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new DO(i.value.snapshot));
          }),
            n.children.length && this.forwardEvent(new vO(n.value.snapshot));
        }
        activateRoutes(n, e, r) {
          var o;
          const i = n.value,
            s = e ? e.value : null;
          if ((Kd(i), i === s))
            if (i.component) {
              const a = r.getOrCreateContext(i.outlet);
              this.activateChildRoutes(n, e, a.children);
            } else this.activateChildRoutes(n, e, r);
          else if (i.component) {
            const a = r.getOrCreateContext(i.outlet);
            if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
              const l = this.routeReuseStrategy.retrieve(i.snapshot);
              this.routeReuseStrategy.store(i.snapshot, null),
                a.children.onOutletReAttached(l.contexts),
                (a.attachRef = l.componentRef),
                (a.route = l.route.value),
                a.outlet && a.outlet.attach(l.componentRef, l.route.value),
                Kd(l.route.value),
                this.activateChildRoutes(n, null, a.children);
            } else {
              const l = Zi(i.snapshot),
                c = null !== (o = null == l ? void 0 : l.get(ci)) && void 0 !== o ? o : null;
              (a.attachRef = null),
                (a.route = i),
                (a.resolver = c),
                (a.injector = l),
                a.outlet && a.outlet.activateWith(i, a.injector),
                this.activateChildRoutes(n, null, a.children);
            }
          } else this.activateChildRoutes(n, null, r);
        }
      }
      class Lb {
        constructor(n) {
          (this.path = n), (this.route = this.path[this.path.length - 1]);
        }
      }
      class ol {
        constructor(n, e) {
          (this.component = n), (this.route = e);
        }
      }
      function LO(t, n, e) {
        const r = t._root;
        return Ki(r, n ? n._root : null, e, [r.value]);
      }
      function Po(t, n) {
        const e = Symbol(),
          r = n.get(t, e);
        return r === e
          ? 'function' != typeof t ||
            (function nC(t) {
              return null !== cs(t);
            })(t)
            ? n.get(t)
            : t
          : r;
      }
      function Ki(t, n, e, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
        const i = ko(n);
        return (
          t.children.forEach(s => {
            (function jO(t, n, e, r, o = { canDeactivateChecks: [], canActivateChecks: [] }) {
              const i = t.value,
                s = n ? n.value : null,
                a = e ? e.getContext(t.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const l = (function VO(t, n, e) {
                  if ('function' == typeof e) return e(t, n);
                  switch (e) {
                    case 'pathParamsChange':
                      return !Ar(t.url, n.url);
                    case 'pathParamsOrQueryParamsChange':
                      return !Ar(t.url, n.url) || !yn(t.queryParams, n.queryParams);
                    case 'always':
                      return !0;
                    case 'paramsOrQueryParamsChange':
                      return !Jd(t, n) || !yn(t.queryParams, n.queryParams);
                    default:
                      return !Jd(t, n);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                l ? o.canActivateChecks.push(new Lb(r)) : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Ki(t, n, i.component ? (a ? a.children : null) : e, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new ol(a.outlet.component, s));
              } else
                s && Ji(n, a, o),
                  o.canActivateChecks.push(new Lb(r)),
                  Ki(t, null, i.component ? (a ? a.children : null) : e, r, o);
            })(s, i[s.value.outlet], e, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          Ke(i, (s, a) => Ji(s, e.getContext(a), o)),
          o
        );
      }
      function Ji(t, n, e) {
        const r = ko(t),
          o = t.value;
        Ke(r, (i, s) => {
          Ji(i, o.component ? (n ? n.children.getContext(s) : null) : n, e);
        }),
          e.canDeactivateChecks.push(
            new ol(o.component && n && n.outlet && n.outlet.isActivated ? n.outlet.component : null, o)
          );
      }
      function es(t) {
        return 'function' == typeof t;
      }
      function sf(t) {
        return t instanceof qa || 'EmptyError' === (null == t ? void 0 : t.name);
      }
      const il = Symbol('INITIAL_VALUE');
      function Fo() {
        return _n(t =>
          Kw(
            t.map(n =>
              n.pipe(
                Ir(1),
                (function NN(...t) {
                  const n = Lo(t);
                  return He((e, r) => {
                    (n ? Ga(t, e, n) : Ga(t, e)).subscribe(r);
                  });
                })(il)
              )
            )
          ).pipe(
            ie(n => {
              for (const e of n)
                if (!0 !== e) {
                  if (e === il) return il;
                  if (!1 === e || e instanceof Mr) return e;
                }
              return !0;
            }),
            rr(n => n !== il),
            Ir(1)
          )
        );
      }
      function Bb(t) {
        return (function bv(...t) {
          return Af(t);
        })(
          at(n => {
            if (Rr(n)) throw Rb(0, n);
          }),
          ie(n => !0 === n)
        );
      }
      const af = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {}
      };
      function jb(t, n, e, r, o) {
        const i = lf(t, n, e);
        return i.matched
          ? (function oH(t, n, e, r) {
              const o = n.canMatch;
              return o && 0 !== o.length
                ? B(
                    o.map(s => {
                      const a = Po(s, t);
                      return sr(
                        (function qO(t) {
                          return t && es(t.canMatch);
                        })(a)
                          ? a.canMatch(n, e)
                          : t.runInContext(() => a(n, e))
                      );
                    })
                  ).pipe(Fo(), Bb())
                : B(!0);
            })((r = Ob(n, r)), n, e).pipe(ie(s => (!0 === s ? i : Object.assign({}, af))))
          : B(i);
      }
      function lf(t, n, e) {
        var r;
        if ('' === n.path)
          return 'full' === n.pathMatch && (t.hasChildren() || e.length > 0)
            ? Object.assign({}, af)
            : { matched: !0, consumedSegments: [], remainingSegments: e, parameters: {}, positionalParamSegments: {} };
        const i = (n.matcher || jN)(e, t, n);
        if (!i) return Object.assign({}, af);
        const s = {};
        Ke(i.posParams, (l, c) => {
          s[c] = l.path;
        });
        const a =
          i.consumed.length > 0 ? Object.assign(Object.assign({}, s), i.consumed[i.consumed.length - 1].parameters) : s;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          remainingSegments: e.slice(i.consumed.length),
          parameters: a,
          positionalParamSegments: null !== (r = i.posParams) && void 0 !== r ? r : {}
        };
      }
      function sl(t, n, e, r, o = 'corrected') {
        if (
          e.length > 0 &&
          (function aH(t, n, e) {
            return e.some(r => al(t, n, r) && Wt(r) !== te);
          })(t, e, r)
        ) {
          const s = new re(
            n,
            (function sH(t, n, e, r) {
              const o = {};
              (o[te] = r), (r._sourceSegment = t), (r._segmentIndexShift = n.length);
              for (const i of e)
                if ('' === i.path && Wt(i) !== te) {
                  const s = new re([], {});
                  (s._sourceSegment = t), (s._segmentIndexShift = n.length), (o[Wt(i)] = s);
                }
              return o;
            })(t, n, r, new re(e, t.children))
          );
          return (s._sourceSegment = t), (s._segmentIndexShift = n.length), { segmentGroup: s, slicedSegments: [] };
        }
        if (
          0 === e.length &&
          (function lH(t, n, e) {
            return e.some(r => al(t, n, r));
          })(t, e, r)
        ) {
          const s = new re(
            t.segments,
            (function iH(t, n, e, r, o, i) {
              const s = {};
              for (const a of r)
                if (al(t, e, a) && !o[Wt(a)]) {
                  const l = new re([], {});
                  (l._sourceSegment = t),
                    (l._segmentIndexShift = 'legacy' === i ? t.segments.length : n.length),
                    (s[Wt(a)] = l);
                }
              return Object.assign(Object.assign({}, o), s);
            })(t, n, e, r, t.children, o)
          );
          return (s._sourceSegment = t), (s._segmentIndexShift = n.length), { segmentGroup: s, slicedSegments: e };
        }
        const i = new re(t.segments, t.children);
        return (i._sourceSegment = t), (i._segmentIndexShift = n.length), { segmentGroup: i, slicedSegments: e };
      }
      function al(t, n, e) {
        return (!(t.hasChildren() || n.length > 0) || 'full' !== e.pathMatch) && '' === e.path;
      }
      function Vb(t, n, e, r) {
        return !!(Wt(t) === r || (r !== te && al(n, e, t))) && ('**' === t.path || lf(n, t, e).matched);
      }
      function $b(t, n, e) {
        return 0 === n.length && !t.children[e];
      }
      const ll = !1;
      class cl {
        constructor(n) {
          this.segmentGroup = n || null;
        }
      }
      class Ub {
        constructor(n) {
          this.urlTree = n;
        }
      }
      function ts(t) {
        return $i(new cl(t));
      }
      function zb(t) {
        return $i(new Ub(t));
      }
      class fH {
        constructor(n, e, r, o, i) {
          (this.injector = n),
            (this.configLoader = e),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const n = sl(this.urlTree.root, [], [], this.config).segmentGroup,
            e = new re(n.segments, n.children);
          return this.expandSegmentGroup(this.injector, this.config, e, te)
            .pipe(ie(i => this.createUrlTree(el(i), this.urlTree.queryParams, this.urlTree.fragment)))
            .pipe(
              ir(i => {
                if (i instanceof Ub) return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof cl ? this.noMatchError(i) : i;
              })
            );
        }
        match(n) {
          return this.expandSegmentGroup(this.injector, this.config, n.root, te)
            .pipe(ie(o => this.createUrlTree(el(o), n.queryParams, n.fragment)))
            .pipe(
              ir(o => {
                throw o instanceof cl ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(n) {
          return new F(4002, ll);
        }
        createUrlTree(n, e, r) {
          const o = zd(n);
          return new Mr(o, e, r);
        }
        expandSegmentGroup(n, e, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(n, e, r).pipe(ie(i => new re([], i)))
            : this.expandSegment(n, r, e, r.segments, o, !0);
        }
        expandChildren(n, e, r) {
          const o = [];
          for (const i of Object.keys(r.children)) 'primary' === i ? o.unshift(i) : o.push(i);
          return ze(o).pipe(
            Er(i => {
              const s = r.children[i],
                a = Hb(e, i);
              return this.expandSegmentGroup(n, a, s, i).pipe(ie(l => ({ segment: l, outlet: i })));
            }),
            rb((i, s) => ((i[s.outlet] = s.segment), i), {}),
            ob()
          );
        }
        expandSegment(n, e, r, o, i, s) {
          return ze(r).pipe(
            Er(a =>
              this.expandSegmentAgainstRoute(n, e, r, a, o, i, s).pipe(
                ir(c => {
                  if (c instanceof cl) return B(null);
                  throw c;
                })
              )
            ),
            or(a => !!a),
            ir((a, l) => {
              if (sf(a)) return $b(e, o, i) ? B(new re([], {})) : ts(e);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(n, e, r, o, i, s, a) {
          return Vb(o, e, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(n, e, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(n, e, r, o, i, s)
              : ts(e)
            : ts(e);
        }
        expandSegmentAgainstRouteUsingRedirect(n, e, r, o, i, s) {
          return '**' === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(n, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(n, e, r, o, i, s);
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(n, e, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith('/')
            ? zb(i)
            : this.lineralizeSegments(r, i).pipe(
                Ue(s => {
                  const a = new re(s, {});
                  return this.expandSegment(n, a, e, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(n, e, r, o, i, s) {
          const { matched: a, consumedSegments: l, remainingSegments: c, positionalParamSegments: u } = lf(e, o, i);
          if (!a) return ts(e);
          const d = this.applyRedirectCommands(l, o.redirectTo, u);
          return o.redirectTo.startsWith('/')
            ? zb(d)
            : this.lineralizeSegments(o, d).pipe(Ue(h => this.expandSegment(n, e, r, h.concat(c), s, !1)));
        }
        matchSegmentAgainstRoute(n, e, r, o, i) {
          return '**' === r.path
            ? ((n = Ob(r, n)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? B({ routes: r._loadedRoutes, injector: r._loadedInjector })
                    : this.configLoader.loadChildren(n, r)
                  ).pipe(ie(a => ((r._loadedRoutes = a.routes), (r._loadedInjector = a.injector), new re(o, {}))))
                : B(new re(o, {})))
            : jb(e, r, o, n).pipe(
                _n(({ matched: s, consumedSegments: a, remainingSegments: l }) => {
                  var c;
                  return s
                    ? ((n = null !== (c = r._injector) && void 0 !== c ? c : n),
                      this.getChildConfig(n, r, o).pipe(
                        Ue(d => {
                          var h;
                          const y = null !== (h = d.injector) && void 0 !== h ? h : n,
                            w = d.routes,
                            { segmentGroup: C, slicedSegments: T } = sl(e, a, l, w),
                            M = new re(C.segments, C.children);
                          if (0 === T.length && M.hasChildren())
                            return this.expandChildren(y, w, M).pipe(ie(ne => new re(a, ne)));
                          if (0 === w.length && 0 === T.length) return B(new re(a, {}));
                          const A = Wt(r) === i;
                          return this.expandSegment(y, M, w, T, A ? te : i, !0).pipe(
                            ie(N => new re(a.concat(N.segments), N.children))
                          );
                        })
                      ))
                    : ts(e);
                })
              );
        }
        getChildConfig(n, e, r) {
          return e.children
            ? B({ routes: e.children, injector: n })
            : e.loadChildren
            ? void 0 !== e._loadedRoutes
              ? B({ routes: e._loadedRoutes, injector: e._loadedInjector })
              : (function rH(t, n, e, r) {
                  const o = n.canLoad;
                  return void 0 === o || 0 === o.length
                    ? B(!0)
                    : B(
                        o.map(s => {
                          const a = Po(s, t);
                          return sr(
                            (function UO(t) {
                              return t && es(t.canLoad);
                            })(a)
                              ? a.canLoad(n, e)
                              : t.runInContext(() => a(n, e))
                          );
                        })
                      ).pipe(Fo(), Bb());
                })(n, e, r).pipe(
                  Ue(o =>
                    o
                      ? this.configLoader.loadChildren(n, e).pipe(
                          at(i => {
                            (e._loadedRoutes = i.routes), (e._loadedInjector = i.injector);
                          })
                        )
                      : (function uH(t) {
                          return $i(kb(ll, 3));
                        })()
                  )
                )
            : B({ routes: [], injector: n });
        }
        lineralizeSegments(n, e) {
          let r = [],
            o = e.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren)) return B(r);
            if (o.numberOfChildren > 1 || !o.children[te]) return $i(new F(4e3, ll));
            o = o.children[te];
          }
        }
        applyRedirectCommands(n, e, r) {
          return this.applyRedirectCreateUrlTree(e, this.urlSerializer.parse(e), n, r);
        }
        applyRedirectCreateUrlTree(n, e, r, o) {
          const i = this.createSegmentGroup(n, e.root, r, o);
          return new Mr(i, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment);
        }
        createQueryParams(n, e) {
          const r = {};
          return (
            Ke(n, (o, i) => {
              if ('string' == typeof o && o.startsWith(':')) {
                const a = o.substring(1);
                r[i] = e[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(n, e, r, o) {
          const i = this.createSegments(n, e.segments, r, o);
          let s = {};
          return (
            Ke(e.children, (a, l) => {
              s[l] = this.createSegmentGroup(n, a, r, o);
            }),
            new re(i, s)
          );
        }
        createSegments(n, e, r, o) {
          return e.map(i => (i.path.startsWith(':') ? this.findPosParam(n, i, o) : this.findOrReturn(i, r)));
        }
        findPosParam(n, e, r) {
          const o = r[e.path.substring(1)];
          if (!o) throw new F(4001, ll);
          return o;
        }
        findOrReturn(n, e) {
          let r = 0;
          for (const o of e) {
            if (o.path === n.path) return e.splice(r), o;
            r++;
          }
          return n;
        }
      }
      class pH {}
      class _H {
        constructor(n, e, r, o, i, s, a, l) {
          (this.injector = n),
            (this.rootComponentType = e),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = a),
            (this.urlSerializer = l);
        }
        recognize() {
          const n = sl(
            this.urlTree.root,
            [],
            [],
            this.config.filter(e => void 0 === e.redirectTo),
            this.relativeLinkResolution
          ).segmentGroup;
          return this.processSegmentGroup(this.injector, this.config, n, te).pipe(
            ie(e => {
              if (null === e) return null;
              const r = new nl(
                  [],
                  Object.freeze({}),
                  Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                  this.urlTree.fragment,
                  {},
                  te,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new Ln(r, e),
                i = new Mb(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(n) {
          const e = n.value,
            r = Eb(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(r.params)),
            (e.data = Object.freeze(r.data)),
            n.children.forEach(o => this.inheritParamsAndData(o));
        }
        processSegmentGroup(n, e, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(n, e, r)
            : this.processSegment(n, e, r, r.segments, o);
        }
        processChildren(n, e, r) {
          return ze(Object.keys(r.children)).pipe(
            Er(o => {
              const i = r.children[o],
                s = Hb(e, o);
              return this.processSegmentGroup(n, s, i, o);
            }),
            rb((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function LN(t, n = !1) {
              return He((e, r) => {
                let o = 0;
                e.subscribe(
                  Le(r, i => {
                    const s = t(i, o++);
                    (s || n) && r.next(i), !s && r.complete();
                  })
                );
              });
            })(o => null !== o),
            Qa(null),
            ob(),
            ie(o => {
              if (null === o) return null;
              const i = Gb(o);
              return (
                (function yH(t) {
                  t.sort((n, e) =>
                    n.value.outlet === te
                      ? -1
                      : e.value.outlet === te
                      ? 1
                      : n.value.outlet.localeCompare(e.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(n, e, r, o, i) {
          return ze(e).pipe(
            Er(s => {
              var a;
              return this.processSegmentAgainstRoute(null !== (a = s._injector) && void 0 !== a ? a : n, s, r, o, i);
            }),
            or(s => !!s),
            ir(s => {
              if (sf(s)) return $b(r, o, i) ? B([]) : B(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(n, e, r, o, i) {
          var s, a;
          if (e.redirectTo || !Vb(e, r, o, i)) return B(null);
          let l;
          if ('**' === e.path) {
            const c = o.length > 0 ? ab(o).parameters : {},
              u = qb(r) + o.length;
            l = B({
              snapshot: new nl(
                o,
                c,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Xb(e),
                Wt(e),
                null !== (a = null !== (s = e.component) && void 0 !== s ? s : e._loadedComponent) && void 0 !== a
                  ? a
                  : null,
                e,
                Wb(r),
                u,
                Yb(e),
                u
              ),
              consumedSegments: [],
              remainingSegments: []
            });
          } else
            l = jb(r, e, o, n).pipe(
              ie(({ matched: c, consumedSegments: u, remainingSegments: d, parameters: h }) => {
                var y, w;
                if (!c) return null;
                const C = qb(r) + u.length;
                return {
                  snapshot: new nl(
                    u,
                    h,
                    Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                    this.urlTree.fragment,
                    Xb(e),
                    Wt(e),
                    null !== (w = null !== (y = e.component) && void 0 !== y ? y : e._loadedComponent) && void 0 !== w
                      ? w
                      : null,
                    e,
                    Wb(r),
                    C,
                    Yb(e),
                    C
                  ),
                  consumedSegments: u,
                  remainingSegments: d
                };
              })
            );
          return l.pipe(
            _n(c => {
              var u, d;
              if (null === c) return B(null);
              const { snapshot: h, consumedSegments: y, remainingSegments: w } = c;
              n = null !== (u = e._injector) && void 0 !== u ? u : n;
              const C = null !== (d = e._loadedInjector) && void 0 !== d ? d : n,
                T = (function wH(t) {
                  return t.children ? t.children : t.loadChildren ? t._loadedRoutes : [];
                })(e),
                { segmentGroup: M, slicedSegments: A } = sl(
                  r,
                  y,
                  w,
                  T.filter(N => void 0 === N.redirectTo),
                  this.relativeLinkResolution
                );
              if (0 === A.length && M.hasChildren())
                return this.processChildren(C, T, M).pipe(ie(N => (null === N ? null : [new Ln(h, N)])));
              if (0 === T.length && 0 === A.length) return B([new Ln(h, [])]);
              const D = Wt(e) === i;
              return this.processSegment(C, T, M, A, D ? te : i).pipe(ie(N => (null === N ? null : [new Ln(h, N)])));
            })
          );
        }
      }
      function bH(t) {
        const n = t.value.routeConfig;
        return n && '' === n.path && void 0 === n.redirectTo;
      }
      function Gb(t) {
        const n = [],
          e = new Set();
        for (const r of t) {
          if (!bH(r)) {
            n.push(r);
            continue;
          }
          const o = n.find(i => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), e.add(o)) : n.push(r);
        }
        for (const r of e) {
          const o = Gb(r.children);
          n.push(new Ln(r.value, o));
        }
        return n.filter(r => !e.has(r));
      }
      function Wb(t) {
        let n = t;
        for (; n._sourceSegment; ) n = n._sourceSegment;
        return n;
      }
      function qb(t) {
        var n, e;
        let r = t,
          o = null !== (n = r._segmentIndexShift) && void 0 !== n ? n : 0;
        for (; r._sourceSegment; )
          (r = r._sourceSegment), (o += null !== (e = r._segmentIndexShift) && void 0 !== e ? e : 0);
        return o - 1;
      }
      function Xb(t) {
        return t.data || {};
      }
      function Yb(t) {
        return t.resolve || {};
      }
      function Zb(t) {
        return 'string' == typeof t.title || null === t.title;
      }
      function cf(t) {
        return _n(n => {
          const e = t(n);
          return e ? ze(e).pipe(ie(() => n)) : B(n);
        });
      }
      let Kb = (() => {
          class t {
            buildTitle(e) {
              var r;
              let o,
                i = e.root;
              for (; void 0 !== i; )
                (o = null !== (r = this.getResolvedTitleForRoute(i)) && void 0 !== r ? r : o),
                  (i = i.children.find(s => s.outlet === te));
              return o;
            }
            getResolvedTitleForRoute(e) {
              return e.data[Ui];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = G({
              token: t,
              factory: function () {
                return Re(Jb);
              },
              providedIn: 'root'
            })),
            t
          );
        })(),
        Jb = (() => {
          class t extends Kb {
            constructor(e) {
              super(), (this.title = e);
            }
            updateTitle(e) {
              const r = this.buildTitle(e);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(j(Tw));
            }),
            (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'root' })),
            t
          );
        })();
      class EH {}
      class AH extends class MH {
        shouldDetach(n) {
          return !1;
        }
        store(n, e) {}
        shouldAttach(n) {
          return !1;
        }
        retrieve(n) {
          return null;
        }
        shouldReuseRoute(n, e) {
          return n.routeConfig === e.routeConfig;
        }
      } {}
      const dl = new q('', { providedIn: 'root', factory: () => ({}) }),
        uf = new q('ROUTES');
      let df = (() => {
        class t {
          constructor(e, r) {
            (this.injector = e),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(e) {
            if (this.componentLoaders.get(e)) return this.componentLoaders.get(e);
            if (e._loadedComponent) return B(e._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(e);
            const r = sr(e.loadComponent()).pipe(
                at(i => {
                  this.onLoadEndListener && this.onLoadEndListener(e), (e._loadedComponent = i);
                }),
                jd(() => {
                  this.componentLoaders.delete(e);
                })
              ),
              o = new tb(r, () => new qt()).pipe(Ld());
            return this.componentLoaders.set(e, o), o;
          }
          loadChildren(e, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes) return B({ routes: r._loadedRoutes, injector: r._loadedInjector });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                ie(a => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    c,
                    u = !1;
                  Array.isArray(a)
                    ? (c = a)
                    : ((l = a.create(e).injector), (c = sb(l.get(uf, [], $.Self | $.Optional))));
                  return { routes: c.map(rf), injector: l };
                }),
                jd(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new tb(i, () => new qt()).pipe(Ld());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(e) {
            return sr(e()).pipe(
              Ue(r => (r instanceof w_ || Array.isArray(r) ? B(r) : ze(this.compiler.compileModuleAsync(r))))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(Jt), j($u));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      class kH {}
      class PH {
        shouldProcessUrl(n) {
          return !0;
        }
        extract(n) {
          return n;
        }
        merge(n, e) {
          return n;
        }
      }
      function FH(t) {
        throw t;
      }
      function NH(t, n, e) {
        return n.parse('/');
      }
      const OH = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
        HH = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' };
      function tv() {
        var t, n;
        const e = Re(hb),
          r = Re(Yi),
          o = Re(Mi),
          i = Re(Jt),
          s = Re($u),
          a = null !== (t = Re(uf, { optional: !0 })) && void 0 !== t ? t : [],
          l = null !== (n = Re(dl, { optional: !0 })) && void 0 !== n ? n : {},
          c = Re(Jb),
          u = Re(Kb, { optional: !0 }),
          d = Re(kH, { optional: !0 }),
          h = Re(EH, { optional: !0 }),
          y = new Je(null, e, r, o, i, s, sb(a));
        return (
          d && (y.urlHandlingStrategy = d),
          h && (y.routeReuseStrategy = h),
          (y.titleStrategy = null != u ? u : c),
          (function LH(t, n) {
            t.errorHandler && (n.errorHandler = t.errorHandler),
              t.malformedUriErrorHandler && (n.malformedUriErrorHandler = t.malformedUriErrorHandler),
              t.onSameUrlNavigation && (n.onSameUrlNavigation = t.onSameUrlNavigation),
              t.paramsInheritanceStrategy && (n.paramsInheritanceStrategy = t.paramsInheritanceStrategy),
              t.relativeLinkResolution && (n.relativeLinkResolution = t.relativeLinkResolution),
              t.urlUpdateStrategy && (n.urlUpdateStrategy = t.urlUpdateStrategy),
              t.canceledNavigationResolution && (n.canceledNavigationResolution = t.canceledNavigationResolution);
          })(l, y),
          y
        );
      }
      let Je = (() => {
        class t {
          constructor(e, r, o, i, s, a, l) {
            (this.rootComponentType = e),
              (this.urlSerializer = r),
              (this.rootContexts = o),
              (this.location = i),
              (this.config = l),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new qt()),
              (this.errorHandler = FH),
              (this.malformedUriErrorHandler = NH),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.afterPreactivation = () => B(void 0)),
              (this.urlHandlingStrategy = new PH()),
              (this.routeReuseStrategy = new AH()),
              (this.onSameUrlNavigation = 'ignore'),
              (this.paramsInheritanceStrategy = 'emptyOnly'),
              (this.urlUpdateStrategy = 'deferred'),
              (this.relativeLinkResolution = 'corrected'),
              (this.canceledNavigationResolution = 'replace'),
              (this.configLoader = s.get(df)),
              (this.configLoader.onLoadEndListener = h => this.triggerEvent(new wO(h))),
              (this.configLoader.onLoadStartListener = h => this.triggerEvent(new yO(h))),
              (this.ngModule = s.get(Dr)),
              (this.console = s.get(xI));
            const d = s.get(Pe);
            (this.isNgZoneEnabled = d instanceof Pe && Pe.isInAngularZone()),
              this.resetConfig(l),
              (this.currentUrlTree = (function $N() {
                return new Mr(new re([], {}), {}, null);
              })()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = Ib(this.currentUrlTree, this.rootComponentType)),
              (this.transitions = new Gt({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(this.currentUrlTree),
                urlAfterRedirects: this.urlHandlingStrategy.extract(this.currentUrlTree),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: 'imperative',
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var e;
            return null === (e = this.location.getState()) || void 0 === e ? void 0 : e.ɵrouterPageId;
          }
          setupNavigations(e) {
            const r = this.events;
            return e.pipe(
              rr(o => 0 !== o.id),
              ie(o =>
                Object.assign(Object.assign({}, o), { extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl) })
              ),
              _n(o => {
                let i = !1,
                  s = !1;
                return B(o).pipe(
                  at(a => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(Object.assign({}, this.lastSuccessfulNavigation), { previousNavigation: null })
                        : null
                    };
                  }),
                  _n(a => {
                    const l = this.browserUrlTree.toString(),
                      c = !this.navigated || a.extractedUrl.toString() !== l || l !== this.currentUrlTree.toString();
                    if (
                      ('reload' === this.onSameUrlNavigation || c) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        nv(a.source) && (this.browserUrlTree = a.extractedUrl),
                        B(a).pipe(
                          _n(d => {
                            const h = this.transitions.getValue();
                            return (
                              r.next(new Qd(d.id, this.serializeUrl(d.extractedUrl), d.source, d.restoredState)),
                              h !== this.transitions.getValue() ? bn : Promise.resolve(d)
                            );
                          }),
                          (function hH(t, n, e, r) {
                            return _n(o =>
                              (function dH(t, n, e, r, o) {
                                return new fH(t, n, e, r, o).apply();
                              })(t, n, e, o.extractedUrl, r).pipe(
                                ie(i => Object.assign(Object.assign({}, o), { urlAfterRedirects: i }))
                              )
                            );
                          })(this.ngModule.injector, this.configLoader, this.urlSerializer, this.config),
                          at(d => {
                            (this.currentNavigation = Object.assign(Object.assign({}, this.currentNavigation), {
                              finalUrl: d.urlAfterRedirects
                            })),
                              (o.urlAfterRedirects = d.urlAfterRedirects);
                          }),
                          (function CH(t, n, e, r, o, i) {
                            return Ue(s =>
                              (function mH(t, n, e, r, o, i, s = 'emptyOnly', a = 'legacy') {
                                return new _H(t, n, e, r, o, s, a, i).recognize().pipe(
                                  _n(l =>
                                    null === l
                                      ? (function gH(t) {
                                          return new Ie(n => n.error(t));
                                        })(new pH())
                                      : B(l)
                                  )
                                );
                              })(t, n, e, s.urlAfterRedirects, r.serialize(s.urlAfterRedirects), r, o, i).pipe(
                                ie(a => Object.assign(Object.assign({}, s), { targetSnapshot: a }))
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.rootComponentType,
                            this.config,
                            this.urlSerializer,
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          at(d => {
                            if (((o.targetSnapshot = d.targetSnapshot), 'eager' === this.urlUpdateStrategy)) {
                              if (!d.extras.skipLocationChange) {
                                const y = this.urlHandlingStrategy.merge(d.urlAfterRedirects, d.rawUrl);
                                this.setBrowserUrl(y, d);
                              }
                              this.browserUrlTree = d.urlAfterRedirects;
                            }
                            const h = new hO(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(h);
                          })
                        )
                      );
                    if (c && this.rawUrlTree && this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
                      const { id: h, extractedUrl: y, source: w, restoredState: C, extras: T } = a,
                        M = new Qd(h, this.serializeUrl(y), w, C);
                      r.next(M);
                      const A = Ib(y, this.rootComponentType).snapshot;
                      return B(
                        (o = Object.assign(Object.assign({}, a), {
                          targetSnapshot: A,
                          urlAfterRedirects: y,
                          extras: Object.assign(Object.assign({}, T), { skipLocationChange: !1, replaceUrl: !1 })
                        }))
                      );
                    }
                    return (this.rawUrlTree = a.rawUrl), a.resolve(null), bn;
                  }),
                  at(a => {
                    const l = new pO(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  ie(
                    a =>
                      (o = Object.assign(Object.assign({}, a), {
                        guards: LO(a.targetSnapshot, a.currentSnapshot, this.rootContexts)
                      }))
                  ),
                  (function XO(t, n) {
                    return Ue(e => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: o,
                        guards: { canActivateChecks: i, canDeactivateChecks: s }
                      } = e;
                      return 0 === s.length && 0 === i.length
                        ? B(Object.assign(Object.assign({}, e), { guardsResult: !0 }))
                        : (function YO(t, n, e, r) {
                            return ze(t).pipe(
                              Ue(o =>
                                (function nH(t, n, e, r, o) {
                                  const i = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
                                  return i && 0 !== i.length
                                    ? B(
                                        i.map(a => {
                                          var l;
                                          const c = null !== (l = Zi(n)) && void 0 !== l ? l : o,
                                            u = Po(a, c);
                                          return sr(
                                            (function WO(t) {
                                              return t && es(t.canDeactivate);
                                            })(u)
                                              ? u.canDeactivate(t, n, e, r)
                                              : c.runInContext(() => u(t, n, e, r))
                                          ).pipe(or());
                                        })
                                      ).pipe(Fo())
                                    : B(!0);
                                })(o.component, o.route, e, n, r)
                              ),
                              or(o => !0 !== o, !0)
                            );
                          })(s, r, o, t).pipe(
                            Ue(a =>
                              a &&
                              (function $O(t) {
                                return 'boolean' == typeof t;
                              })(a)
                                ? (function ZO(t, n, e, r) {
                                    return ze(n).pipe(
                                      Er(o =>
                                        Ga(
                                          (function JO(t, n) {
                                            return null !== t && n && n(new bO(t)), B(!0);
                                          })(o.route.parent, r),
                                          (function KO(t, n) {
                                            return null !== t && n && n(new CO(t)), B(!0);
                                          })(o.route, r),
                                          (function tH(t, n, e) {
                                            const r = n[n.length - 1],
                                              i = n
                                                .slice(0, n.length - 1)
                                                .reverse()
                                                .map(s =>
                                                  (function BO(t) {
                                                    const n = t.routeConfig ? t.routeConfig.canActivateChild : null;
                                                    return n && 0 !== n.length ? { node: t, guards: n } : null;
                                                  })(s)
                                                )
                                                .filter(s => null !== s)
                                                .map(s =>
                                                  eb(() =>
                                                    B(
                                                      s.guards.map(l => {
                                                        var c;
                                                        const u = null !== (c = Zi(s.node)) && void 0 !== c ? c : e,
                                                          d = Po(l, u);
                                                        return sr(
                                                          (function GO(t) {
                                                            return t && es(t.canActivateChild);
                                                          })(d)
                                                            ? d.canActivateChild(r, t)
                                                            : u.runInContext(() => d(r, t))
                                                        ).pipe(or());
                                                      })
                                                    ).pipe(Fo())
                                                  )
                                                );
                                            return B(i).pipe(Fo());
                                          })(t, o.path, e),
                                          (function eH(t, n, e) {
                                            const r = n.routeConfig ? n.routeConfig.canActivate : null;
                                            if (!r || 0 === r.length) return B(!0);
                                            const o = r.map(i =>
                                              eb(() => {
                                                var s;
                                                const a = null !== (s = Zi(n)) && void 0 !== s ? s : e,
                                                  l = Po(i, a);
                                                return sr(
                                                  (function zO(t) {
                                                    return t && es(t.canActivate);
                                                  })(l)
                                                    ? l.canActivate(n, t)
                                                    : a.runInContext(() => l(n, t))
                                                ).pipe(or());
                                              })
                                            );
                                            return B(o).pipe(Fo());
                                          })(t, o.route, e)
                                        )
                                      ),
                                      or(o => !0 !== o, !0)
                                    );
                                  })(r, i, t, n)
                                : B(a)
                            ),
                            ie(a => Object.assign(Object.assign({}, e), { guardsResult: a }))
                          );
                    });
                  })(this.ngModule.injector, a => this.triggerEvent(a)),
                  at(a => {
                    if (((o.guardsResult = a.guardsResult), Rr(a.guardsResult))) throw Rb(0, a.guardsResult);
                    const l = new gO(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  rr(a => !!a.guardsResult || (this.restoreHistory(a), this.cancelNavigationTransition(a, '', 3), !1)),
                  cf(a => {
                    if (a.guards.canActivateChecks.length)
                      return B(a).pipe(
                        at(l => {
                          const c = new mO(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(c);
                        }),
                        _n(l => {
                          let c = !1;
                          return B(l).pipe(
                            (function DH(t, n) {
                              return Ue(e => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: o }
                                } = e;
                                if (!o.length) return B(e);
                                let i = 0;
                                return ze(o).pipe(
                                  Er(s =>
                                    (function TH(t, n, e, r) {
                                      const o = t.routeConfig,
                                        i = t._resolve;
                                      return (
                                        void 0 !== (null == o ? void 0 : o.title) && !Zb(o) && (i[Ui] = o.title),
                                        (function SH(t, n, e, r) {
                                          const o = (function xH(t) {
                                            return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
                                          })(t);
                                          if (0 === o.length) return B({});
                                          const i = {};
                                          return ze(o).pipe(
                                            Ue(s =>
                                              (function IH(t, n, e, r) {
                                                var o;
                                                const i = null !== (o = Zi(n)) && void 0 !== o ? o : r,
                                                  s = Po(t, i);
                                                return sr(s.resolve ? s.resolve(n, e) : i.runInContext(() => s(n, e)));
                                              })(t[s], n, e, r).pipe(
                                                or(),
                                                at(a => {
                                                  i[s] = a;
                                                })
                                              )
                                            ),
                                            Bd(1),
                                            Qw(i),
                                            ir(s => (sf(s) ? bn : $i(s)))
                                          );
                                        })(i, t, n, r).pipe(
                                          ie(
                                            s => (
                                              (t._resolvedData = s),
                                              (t.data = Eb(t, e).resolve),
                                              o && Zb(o) && (t.data[Ui] = o.title),
                                              null
                                            )
                                          )
                                        )
                                      );
                                    })(s.route, r, t, n)
                                  ),
                                  at(() => i++),
                                  Bd(1),
                                  Ue(s => (i === o.length ? B(e) : bn))
                                );
                              });
                            })(this.paramsInheritanceStrategy, this.ngModule.injector),
                            at({
                              next: () => (c = !0),
                              complete: () => {
                                c || (this.restoreHistory(l), this.cancelNavigationTransition(l, '', 2));
                              }
                            })
                          );
                        }),
                        at(l => {
                          const c = new _O(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(c);
                        })
                      );
                  }),
                  cf(a => {
                    const l = c => {
                      var u;
                      const d = [];
                      (null === (u = c.routeConfig) || void 0 === u ? void 0 : u.loadComponent) &&
                        !c.routeConfig._loadedComponent &&
                        d.push(
                          this.configLoader.loadComponent(c.routeConfig).pipe(
                            at(h => {
                              c.component = h;
                            }),
                            ie(() => {})
                          )
                        );
                      for (const h of c.children) d.push(...l(h));
                      return d;
                    };
                    return Kw(l(a.targetSnapshot.root)).pipe(Qa(), Ir(1));
                  }),
                  cf(() => this.afterPreactivation()),
                  ie(a => {
                    const l = (function IO(t, n, e) {
                      const r = Xi(t, n._root, e ? e._root : void 0);
                      return new xb(r, n);
                    })(this.routeReuseStrategy, a.targetSnapshot, a.currentRouterState);
                    return (o = Object.assign(Object.assign({}, a), { targetRouterState: l }));
                  }),
                  at(a => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(a.urlAfterRedirects, a.rawUrl)),
                      (this.routerState = a.targetRouterState),
                      'deferred' === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((t, n, e) => ie(r => (new HO(n, r.targetRouterState, r.currentRouterState, e).activate(t), r)))(
                    this.rootContexts,
                    this.routeReuseStrategy,
                    a => this.triggerEvent(a)
                  ),
                  at({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    }
                  }),
                  jd(() => {
                    var a;
                    i || s || this.cancelNavigationTransition(o, '', 1),
                      (null === (a = this.currentNavigation) || void 0 === a ? void 0 : a.id) === o.id &&
                        (this.currentNavigation = null);
                  }),
                  ir(a => {
                    var l;
                    if (((s = !0), Fb(a))) {
                      Pb(a) || ((this.navigated = !0), this.restoreHistory(o, !0));
                      const c = new tl(o.id, this.serializeUrl(o.extractedUrl), a.message, a.cancellationCode);
                      if ((r.next(c), Pb(a))) {
                        const u = this.urlHandlingStrategy.merge(a.url, this.rawUrlTree),
                          d = {
                            skipLocationChange: o.extras.skipLocationChange,
                            replaceUrl: 'eager' === this.urlUpdateStrategy || nv(o.source)
                          };
                        this.scheduleNavigation(u, 'imperative', null, d, {
                          resolve: o.resolve,
                          reject: o.reject,
                          promise: o.promise
                        });
                      } else o.resolve(!1);
                    } else {
                      this.restoreHistory(o, !0);
                      const c = new Db(
                        o.id,
                        this.serializeUrl(o.extractedUrl),
                        a,
                        null !== (l = o.targetSnapshot) && void 0 !== l ? l : void 0
                      );
                      r.next(c);
                      try {
                        o.resolve(this.errorHandler(a));
                      } catch (u) {
                        o.reject(u);
                      }
                    }
                    return bn;
                  })
                );
              })
            );
          }
          resetRootComponentType(e) {
            (this.rootComponentType = e), (this.routerState.root.component = this.rootComponentType);
          }
          setTransition(e) {
            this.transitions.next(Object.assign(Object.assign({}, this.transitions.value), e));
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId && this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe(e => {
                const r = 'popstate' === e.type ? 'popstate' : 'hashchange';
                'popstate' === r &&
                  setTimeout(() => {
                    var o;
                    const i = { replaceUrl: !0 },
                      s = null !== (o = e.state) && void 0 !== o && o.navigationId ? e.state : null;
                    if (s) {
                      const l = Object.assign({}, s);
                      delete l.navigationId, delete l.ɵrouterPageId, 0 !== Object.keys(l).length && (i.state = l);
                    }
                    const a = this.parseUrl(e.url);
                    this.scheduleNavigation(a, r, s, i);
                  }, 0);
              }));
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(e) {
            this.events.next(e);
          }
          resetConfig(e) {
            (this.config = e.map(rf)), (this.navigated = !1), (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(), (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(e, r = {}) {
            const { relativeTo: o, queryParams: i, fragment: s, queryParamsHandling: a, preserveFragment: l } = r,
              c = o || this.routerState.root,
              u = l ? this.currentUrlTree.fragment : s;
            let d = null;
            switch (a) {
              case 'merge':
                d = Object.assign(Object.assign({}, this.currentUrlTree.queryParams), i);
                break;
              case 'preserve':
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = i || null;
            }
            return null !== d && (d = this.removeEmptyProps(d)), aO(c, this.currentUrlTree, e, d, null != u ? u : null);
          }
          navigateByUrl(e, r = { skipLocationChange: !1 }) {
            const o = Rr(e) ? e : this.parseUrl(e),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, 'imperative', null, r);
          }
          navigate(e, r = { skipLocationChange: !1 }) {
            return (
              (function BH(t) {
                for (let n = 0; n < t.length; n++) {
                  if (null == t[n]) throw new F(4008, false);
                }
              })(e),
              this.navigateByUrl(this.createUrlTree(e, r), r)
            );
          }
          serializeUrl(e) {
            return this.urlSerializer.serialize(e);
          }
          parseUrl(e) {
            let r;
            try {
              r = this.urlSerializer.parse(e);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, e);
            }
            return r;
          }
          isActive(e, r) {
            let o;
            if (((o = !0 === r ? Object.assign({}, OH) : !1 === r ? Object.assign({}, HH) : r), Rr(e)))
              return cb(this.currentUrlTree, e, o);
            const i = this.parseUrl(e);
            return cb(this.currentUrlTree, i, o);
          }
          removeEmptyProps(e) {
            return Object.keys(e).reduce((r, o) => {
              const i = e[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              e => {
                var r;
                (this.navigated = !0),
                  (this.lastSuccessfulId = e.id),
                  (this.currentPageId = e.targetPageId),
                  this.events.next(
                    new kr(e.id, this.serializeUrl(e.extractedUrl), this.serializeUrl(this.currentUrlTree))
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  null === (r = this.titleStrategy) || void 0 === r || r.updateTitle(this.routerState.snapshot),
                  e.resolve(!0);
              },
              e => {
                this.console.warn(`Unhandled Navigation Error: ${e}`);
              }
            );
          }
          scheduleNavigation(e, r, o, i, s) {
            var a, l;
            if (this.disposed) return Promise.resolve(!1);
            let c, u, d;
            s
              ? ((c = s.resolve), (u = s.reject), (d = s.promise))
              : (d = new Promise((w, C) => {
                  (c = w), (u = C);
                }));
            const h = ++this.navigationId;
            let y;
            return (
              'computed' === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (o = this.location.getState()),
                  (y =
                    o && o.ɵrouterPageId
                      ? o.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? null !== (a = this.browserPageId) && void 0 !== a
                        ? a
                        : 0
                      : (null !== (l = this.browserPageId) && void 0 !== l ? l : 0) + 1))
                : (y = 0),
              this.setTransition({
                id: h,
                targetPageId: y,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: e,
                extras: i,
                resolve: c,
                reject: u,
                promise: d,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState
              }),
              d.catch(w => Promise.reject(w))
            );
          }
          setBrowserUrl(e, r) {
            const o = this.urlSerializer.serialize(e),
              i = Object.assign(Object.assign({}, r.extras.state), this.generateNgRouterState(r.id, r.targetPageId));
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, '', i)
              : this.location.go(o, '', i);
          }
          restoreHistory(e, r = !1) {
            var o, i;
            if ('computed' === this.canceledNavigationResolution) {
              const s = this.currentPageId - e.targetPageId;
              ('popstate' !== e.source &&
                'eager' !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (o = this.currentNavigation) || void 0 === o ? void 0 : o.finalUrl)) ||
              0 === s
                ? this.currentUrlTree ===
                    (null === (i = this.currentNavigation) || void 0 === i ? void 0 : i.finalUrl) &&
                  0 === s &&
                  (this.resetState(e), (this.browserUrlTree = e.currentUrlTree), this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(s);
            } else
              'replace' === this.canceledNavigationResolution &&
                (r && this.resetState(e), this.resetUrlToCurrentUrlTree());
          }
          resetState(e) {
            (this.routerState = e.currentRouterState),
              (this.currentUrlTree = e.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, e.rawUrl));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              '',
              this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
            );
          }
          cancelNavigationTransition(e, r, o) {
            const i = new tl(e.id, this.serializeUrl(e.extractedUrl), r, o);
            this.triggerEvent(i), e.resolve(!1);
          }
          generateNgRouterState(e, r) {
            return 'computed' === this.canceledNavigationResolution
              ? { navigationId: e, ɵrouterPageId: r }
              : { navigationId: e };
          }
        }
        return (
          (t.ɵfac = function (e) {
            qc();
          }),
          (t.ɵprov = G({
            token: t,
            factory: function () {
              return tv();
            },
            providedIn: 'root'
          })),
          t
        );
      })();
      function nv(t) {
        return 'imperative' !== t;
      }
      class rv {}
      let $H = (() => {
        class t {
          constructor(e, r, o, i, s) {
            (this.router = e), (this.injector = o), (this.preloadingStrategy = i), (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                rr(e => e instanceof kr),
                Er(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(e, r) {
            var o, i, s;
            const a = [];
            for (const l of r) {
              l.providers && !l._injector && (l._injector = ua(l.providers, e, `Route: ${l.path}`));
              const c = null !== (o = l._injector) && void 0 !== o ? o : e,
                u = null !== (i = l._loadedInjector) && void 0 !== i ? i : c;
              (l.loadChildren && !l._loadedRoutes && void 0 === l.canLoad) || (l.loadComponent && !l._loadedComponent)
                ? a.push(this.preloadConfig(c, l))
                : (l.children || l._loadedRoutes) &&
                  a.push(this.processRoutes(u, null !== (s = l.children) && void 0 !== s ? s : l._loadedRoutes));
            }
            return ze(a).pipe(Or());
          }
          preloadConfig(e, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(e, r) : B(null);
              const i = o.pipe(
                Ue(s => {
                  var a;
                  return null === s
                    ? B(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(null !== (a = s.injector) && void 0 !== a ? a : e, s.routes));
                })
              );
              return r.loadComponent && !r._loadedComponent ? ze([i, this.loader.loadComponent(r)]).pipe(Or()) : i;
            });
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(Je), j($u), j(Gn), j(rv), j(df));
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: 'root' })),
          t
        );
      })();
      const pf = new q('');
      let ov = (() => {
        class t {
          constructor(e, r, o = {}) {
            (this.router = e),
              (this.viewportScroller = r),
              (this.options = o),
              (this.lastId = 0),
              (this.lastSource = 'imperative'),
              (this.restoredId = 0),
              (this.store = {}),
              (o.scrollPositionRestoration = o.scrollPositionRestoration || 'disabled'),
              (o.anchorScrolling = o.anchorScrolling || 'disabled');
          }
          init() {
            'disabled' !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration('manual'),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.router.events.subscribe(e => {
              e instanceof Qd
                ? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
                  (this.lastSource = e.navigationTrigger),
                  (this.restoredId = e.restoredState ? e.restoredState.navigationId : 0))
                : e instanceof kr &&
                  ((this.lastId = e.id),
                  this.scheduleScrollEvent(e, this.router.parseUrl(e.urlAfterRedirects).fragment));
            });
          }
          consumeScrollEvents() {
            return this.router.events.subscribe(e => {
              e instanceof Tb &&
                (e.position
                  ? 'top' === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : 'enabled' === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(e.position)
                  : e.anchor && 'enabled' === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(e.anchor)
                  : 'disabled' !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(e, r) {
            this.router.triggerEvent(new Tb(e, 'popstate' === this.lastSource ? this.store[this.restoredId] : null, r));
          }
          ngOnDestroy() {
            this.routerEventsSubscription && this.routerEventsSubscription.unsubscribe(),
              this.scrollEventsSubscription && this.scrollEventsSubscription.unsubscribe();
          }
        }
        return (
          (t.ɵfac = function (e) {
            qc();
          }),
          (t.ɵprov = G({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function No(t, n) {
        return { ɵkind: t, ɵproviders: n };
      }
      function gf(t) {
        return [{ provide: uf, multi: !0, useValue: t }];
      }
      function sv() {
        const t = Re(Jt);
        return n => {
          var e, r;
          const o = t.get(ba);
          if (n !== o.components[0]) return;
          const i = t.get(Je),
            s = t.get(av);
          1 === t.get(mf) && i.initialNavigation(),
            null === (e = t.get(lv, null, $.Optional)) || void 0 === e || e.setUpPreloading(),
            null === (r = t.get(pf, null, $.Optional)) || void 0 === r || r.init(),
            i.resetRootComponentType(o.componentTypes[0]),
            s.next(),
            s.complete();
        };
      }
      const av = new q('', { factory: () => new qt() }),
        mf = new q('', { providedIn: 'root', factory: () => 1 });
      const lv = new q('');
      function WH(t) {
        return No(0, [
          { provide: lv, useExisting: $H },
          { provide: rv, useExisting: t }
        ]);
      }
      const cv = new q('ROUTER_FORROOT_GUARD'),
        qH = [
          Mi,
          { provide: hb, useClass: $d },
          { provide: Je, useFactory: tv },
          Yi,
          {
            provide: Pr,
            useFactory: function iv(t) {
              return t.routerState.root;
            },
            deps: [Je]
          },
          df
        ];
      function QH() {
        return new my('Router', Je);
      }
      let uv = (() => {
        class t {
          constructor(e) {}
          static forRoot(e, r) {
            return {
              ngModule: t,
              providers: [
                qH,
                [],
                gf(e),
                { provide: cv, useFactory: KH, deps: [[Je, new ni(), new ri()]] },
                { provide: dl, useValue: r || {} },
                null != r && r.useHash ? { provide: Kn, useClass: $y } : { provide: Kn, useClass: Vy },
                {
                  provide: pf,
                  useFactory: () => {
                    const t = Re(Je),
                      n = Re(MM),
                      e = Re(dl);
                    return e.scrollOffset && n.setOffset(e.scrollOffset), new ov(t, n, e);
                  }
                },
                null != r && r.preloadingStrategy ? WH(r.preloadingStrategy).ɵproviders : [],
                { provide: my, multi: !0, useFactory: QH },
                null != r && r.initialNavigation ? JH(r) : [],
                [
                  { provide: dv, useFactory: sv },
                  { provide: cy, multi: !0, useExisting: dv }
                ]
              ]
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [gf(e)] };
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(j(cv, 8));
          }),
          (t.ɵmod = jn({ type: t })),
          (t.ɵinj = Cn({ imports: [tf] })),
          t
        );
      })();
      function KH(t) {
        return 'guarded';
      }
      function JH(t) {
        return [
          'disabled' === t.initialNavigation
            ? No(3, [
                {
                  provide: _a,
                  multi: !0,
                  useFactory: () => {
                    const n = Re(Je);
                    return () => {
                      n.setUpLocationChangeListener();
                    };
                  }
                },
                { provide: mf, useValue: 2 }
              ]).ɵproviders
            : [],
          'enabledBlocking' === t.initialNavigation
            ? No(2, [
                { provide: mf, useValue: 0 },
                {
                  provide: _a,
                  multi: !0,
                  deps: [Jt],
                  useFactory: n => {
                    const e = n.get(fE, Promise.resolve());
                    let r = !1;
                    return () =>
                      e.then(
                        () =>
                          new Promise(i => {
                            const s = n.get(Je),
                              a = n.get(av);
                            (function o(i) {
                              n.get(Je)
                                .events.pipe(
                                  rr(a => a instanceof kr || a instanceof tl || a instanceof Db),
                                  ie(
                                    a => a instanceof kr || (a instanceof tl && (0 === a.code || 1 === a.code) && null)
                                  ),
                                  rr(a => null !== a),
                                  Ir(1)
                                )
                                .subscribe(() => {
                                  i();
                                });
                            })(() => {
                              i(!0), (r = !0);
                            }),
                              (s.afterPreactivation = () => (i(!0), r || a.closed ? B(void 0) : a)),
                              s.initialNavigation();
                          })
                      );
                  }
                }
              ]).ɵproviders
            : []
        ];
      }
      const dv = new q(''),
        tL = [];
      let nL = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = jn({ type: t })),
            (t.ɵinj = Cn({ imports: [uv.forRoot(tL, { relativeLinkResolution: 'legacy' }), uv] })),
            t
          );
        })(),
        rL = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵmod = jn({ type: t, bootstrap: [xN] })),
            (t.ɵinj = Cn({
              imports: [
                _d,
                yA,
                nL,
                EA.forRoot({
                  messages: { emptyMessage: 'No data to display', totalMessage: 'total', selectedMessage: 'selected' }
                })
              ]
            })),
            t
          );
        })();
      (function GI() {
        xy = !1;
      })(),
        _A()
          .bootstrapModule(rL)
          .catch(t => console.error(t));
    }
  },
  le => {
    le((le.s = 261));
  }
]);
