/*!
 * @crashmax-dev/fireworks-js 1.2.3 by Vitalij Ryndin (https://crashmax.ru)
 * https://fireworks.js.org
 * License MIT
 */
!(function (t, i) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = i();
    else if ("function" == typeof define && define.amd) define([], i);
    else {
        var s = i();
        for (var e in s) ("object" == typeof exports ? exports : t)[e] = s[e];
    }
})(this, function () {
    return (() => {
        "use strict";
        var t = {
                594: (t, i, s) => {
                    Object.defineProperty(i, "__esModule", { value: !0 }), (i.Explosion = void 0);
                    var e = s(485);
                    i.Explosion = class {
                        constructor(t) {
                            var { x: i, y: s, ctx: n, hue: h, friction: o, gravity: a, explosionLength: r, brightness: c } = t;
                            for (
                                this._coordinates = [], this._alpha = 1, this._x = i, this._y = s, this._ctx = n, this._friction = o, this._gravity = a, this._explosionLength = r;
                                this._explosionLength--;

                            )
                                this._coordinates.push([i, s]);
                            (this._angle = (0, e.randomFloat)(0, 2 * Math.PI)),
                                (this._speed = (0, e.randomInteger)(1, 10)),
                                (this._hue = (0, e.randomInteger)(h - 20, h + 20)),
                                (this._brightness = (0, e.randomInteger)(c.min, c.max)),
                                (this._decay = (0, e.randomFloat)(c.decay.min, c.decay.max));
                        }
                        update(t) {
                            this._coordinates.pop(),
                                this._coordinates.unshift([this._x, this._y]),
                                (this._speed *= this._friction),
                                (this._x += Math.cos(this._angle) * this._speed),
                                (this._y += Math.sin(this._angle) * this._speed + this._gravity),
                                (this._alpha -= this._decay),
                                this._alpha <= this._decay && t();
                        }
                        draw() {
                            var t = this._coordinates.length - 1;
                            this._ctx.beginPath(),
                                this._ctx.moveTo(this._coordinates[t][0], this._coordinates[t][1]),
                                this._ctx.lineTo(this._x, this._y),
                                (this._ctx.strokeStyle = "hsla(".concat(this._hue, ", 100%, ").concat(this._brightness, "%, ").concat(this._alpha, ")")),
                                this._ctx.stroke();
                        }
                    };
                },
                716: function (t, i, s) {
                    var e =
                        (this && this.__awaiter) ||
                        function (t, i, s, e) {
                            return new (s || (s = Promise))(function (n, h) {
                                function o(t) {
                                    try {
                                        r(e.next(t));
                                    } catch (t) {
                                        h(t);
                                    }
                                }
                                function a(t) {
                                    try {
                                        r(e.throw(t));
                                    } catch (t) {
                                        h(t);
                                    }
                                }
                                function r(t) {
                                    var i;
                                    t.done
                                        ? n(t.value)
                                        : ((i = t.value),
                                          i instanceof s
                                              ? i
                                              : new s(function (t) {
                                                    t(i);
                                                })).then(o, a);
                                }
                                r((e = e.apply(t, i || [])).next());
                            });
                        };
                    Object.defineProperty(i, "__esModule", { value: !0 }), (i.Sound = void 0);
                    var n = s(485);
                    i.Sound = class {
                        constructor(t) {
                            this._buffer = [];
                            var i = window.AudioContext || window.webkitAudioContext;
                            (this._audioContext = new i()),
                                (this.options = Object.assign({ enable: !1, files: ["explosion0.mp3", "explosion1.mp3", "explosion2.mp3"], volume: { min: 4, max: 8 } }, t)),
                                this.options.enable && this.load();
                        }
                        load() {
                            return e(this, void 0, void 0, function* () {
                                for (var t of this.options.files) {
                                    var i = yield (yield fetch(t)).arrayBuffer();
                                    this._audioContext.decodeAudioData(i, (t) => {
                                        this._buffer.push(t);
                                    });
                                }
                            });
                        }
                        play() {
                            return e(this, void 0, void 0, function* () {
                                if (this.options.enable)
                                    if (this._buffer.length) {
                                        var t = this._audioContext.createBufferSource(),
                                            i = this._buffer[(0, n.randomInteger)(0, this._buffer.length - 1)],
                                            s = this._audioContext.createGain();
                                        (t.buffer = i),
                                            (s.gain.value = (0, n.randomFloat)(this.options.volume.min / 100, this.options.volume.max / 100)),
                                            s.connect(this._audioContext.destination),
                                            t.connect(s),
                                            t.start(0);
                                    } else yield this.load();
                            });
                        }
                    };
                },
                377: (t, i, s) => {
                    Object.defineProperty(i, "__esModule", { value: !0 }), (i.Trace = void 0);
                    var e = s(485);
                    i.Trace = class {
                        constructor(t) {
                            var { x: i, y: s, dx: n, dy: h, ctx: o, hue: a, speed: r, acceleration: c, traceLength: _ } = t;
                            for (
                                this._coordinates = [],
                                    this._currentDistance = 0,
                                    this._x = i,
                                    this._y = s,
                                    this._sx = i,
                                    this._sy = s,
                                    this._dx = n,
                                    this._dy = h,
                                    this._ctx = o,
                                    this._hue = a,
                                    this._speed = r,
                                    this._acceleration = c,
                                    this._traceLength = _,
                                    this._totalDistance = this.getDistance(i, s, n, h);
                                this._traceLength--;

                            )
                                this._coordinates.push([i, s]);
                            (this._angle = Math.atan2(h - s, n - i)), (this._brightness = (0, e.randomInteger)(50, 70));
                        }
                        update(t) {
                            this._coordinates.pop(), this._coordinates.unshift([this._x, this._y]), (this._speed *= this._acceleration);
                            var i = Math.cos(this._angle) * this._speed,
                                s = Math.sin(this._angle) * this._speed;
                            (this._currentDistance = this.getDistance(this._sx, this._sy, this._x + i, this._y + s)),
                                this._currentDistance >= this._totalDistance ? t(this._dx, this._dy, this._hue) : ((this._x += i), (this._y += s));
                        }
                        draw() {
                            var t = this._coordinates.length - 1;
                            this._ctx.beginPath(),
                                this._ctx.moveTo(this._coordinates[t][0], this._coordinates[t][1]),
                                this._ctx.lineTo(this._x, this._y),
                                (this._ctx.strokeStyle = "hsl(".concat(this._hue, ", 100%, ").concat(this._brightness, "%)")),
                                this._ctx.stroke();
                        }
                        getDistance(t, i, s, e) {
                            var n = Math.pow;
                            return Math.sqrt(n(t - s, 2) + n(i - e, 2));
                        }
                    };
                },
                485: (t, i, s) => {
                    Object.defineProperty(i, "__esModule", { value: !0 }), (i.randomInteger = i.randomFloat = void 0);
                    var e = s(461);
                    Object.defineProperty(i, "randomFloat", {
                        enumerable: !0,
                        get: function () {
                            return e.randomFloat;
                        },
                    });
                    var n = s(732);
                    Object.defineProperty(i, "randomInteger", {
                        enumerable: !0,
                        get: function () {
                            return n.randomInteger;
                        },
                    });
                },
                461: (t, i) => {
                    Object.defineProperty(i, "__esModule", { value: !0 }),
                        (i.randomFloat = void 0),
                        (i.randomFloat = function (t, i) {
                            return Math.random() * (i - t) + t;
                        });
                },
                732: (t, i) => {
                    Object.defineProperty(i, "__esModule", { value: !0 }),
                        (i.randomInteger = void 0),
                        (i.randomInteger = function (t, i) {
                            return Math.floor(t + Math.random() * (i + 1 - t));
                        });
                },
            },
            i = {};
        function s(e) {
            var n = i[e];
            if (void 0 !== n) return n.exports;
            var h = (i[e] = { exports: {} });
            return t[e].call(h.exports, h, h.exports, s), h.exports;
        }
        var e = {};
        return (
            (() => {
                var t = e;
                Object.defineProperty(t, "__esModule", { value: !0 }), (t.Fireworks = void 0);
                var i = s(377),
                    n = s(716),
                    h = s(594),
                    o = s(485);
                t.Fireworks = class {
                    constructor(t) {
                        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        (this.hue = { min: 0, max: 360 }),
                            (this.rocketsPoint = 50),
                            (this.speed = 2),
                            (this.acceleration = 0.05),
                            (this.friction = 0.95),
                            (this.gravity = 1.5),
                            (this.particles = 50),
                            (this.trace = 3),
                            (this.explosion = 5),
                            (this.autoresize = !0),
                            (this.boundaries = { visible: !1, x: 50, y: 50, width: 0, height: 0 }),
                            (this.mouse = { click: !1, move: !1, max: 3 }),
                            (this.delay = { min: 15, max: 30 }),
                            (this.brightness = { min: 50, max: 80, decay: { min: 0.015, max: 0.03 } }),
                            (this._tick = 0),
                            (this._version = "1.2.3"),
                            (this._running = !1),
                            (this._randomRocketsPoint = !1),
                            (this._m = !1),
                            (this._container = t),
                            (this._canvas = document.createElement("canvas")),
                            (this._ctx = this._canvas.getContext("2d")),
                            this._container.appendChild(this._canvas),
                            (this._sound = new n.Sound(i.sound)),
                            this.setOptions(i),
                            this.setSize(),
                            this.autoresize && window.addEventListener("resize", () => this.setSize()),
                            this._canvas.addEventListener("mousedown", (t) => this.useMouse(t, this.mouse.click)),
                            this._canvas.addEventListener("mouseup", (t) => this.useMouse(t, !1)),
                            this._canvas.addEventListener("mousemove", (t) => this.useMouse(t, this._m));
                    }
                    get isRunning() {
                        return this._running;
                    }
                    get version() {
                        return this._version;
                    }
                    start() {
                        this._running || ((this._running = !0), this.clear(), this.render());
                    }
                    stop() {
                        (this._running = !1), this.clear();
                    }
                    pause() {
                        (this._running = !this._running), this._running && this.render();
                    }
                    clear() {
                        this._ctx && ((this._traces = []), (this._explosions = []), this._ctx.clearRect(0, 0, this._width, this._height));
                    }
                    setOptions(t) {
                        Object.assign(this, t), t.sound && Object.assign(this._sound.options, t.sound);
                    }
                    setSize() {
                        var { width: t = this._container.clientWidth, height: i = this._container.clientHeight } = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        (this._width = t), (this._height = i), (this._canvas.width = t), (this._canvas.height = i), this.setBoundaries({ width: t, height: i });
                    }
                    setBoundaries(t) {
                        this.boundaries = Object.assign(Object.assign({}, this.boundaries), t);
                    }
                    useMouse(t, i) {
                        (this.mouse.click || this.mouse.move) && ((this._mx = t.pageX - this._canvas.offsetLeft), (this._my = t.pageY - this._canvas.offsetTop), (this._m = i));
                    }
                    render() {
                        this._ctx &&
                            this._running &&
                            (requestAnimationFrame(() => this.render()),
                            this.boundaries.visible &&
                                (this._ctx.beginPath(),
                                (this._ctx.strokeStyle = "red"),
                                this._ctx.rect(this.boundaries.x, this.boundaries.y, this.boundaries.width - 2 * this.boundaries.x, 0.5 * this.boundaries.height),
                                this._ctx.stroke()),
                            (this._ctx.globalCompositeOperation = "destination-out"),
                            (this._ctx.fillStyle = "rgba(0, 0, 0, 0.5)"),
                            this._ctx.fillRect(0, 0, this._width, this._height),
                            (this._ctx.globalCompositeOperation = "lighter"),
                            this.initTrace(),
                            this.drawTrace(),
                            this.drawExplosion(),
                            this._tick++);
                    }
                    initTrace() {
                        (this._ds = (0, o.randomInteger)(this.delay.min, this.delay.max)),
                            (2 * this._ds < this._tick || (this._m && this.mouse.max > this._traces.length)) &&
                                (this._traces.push(
                                    new i.Trace({
                                        x: (this._width * (this._randomRocketsPoint ? (0, o.randomInteger)(0, 100) : this.rocketsPoint)) / 100,
                                        y: this._height,
                                        dx: this._m || this.mouse.move ? this._mx : (0, o.randomInteger)(this.boundaries.x, this.boundaries.width - 2 * this.boundaries.x),
                                        dy: this._m || this.mouse.move ? this._my : (0, o.randomInteger)(this.boundaries.y, 0.5 * this.boundaries.height),
                                        ctx: this._ctx,
                                        hue: (0, o.randomInteger)(this.hue.min, this.hue.max),
                                        speed: this.speed,
                                        acceleration: this.acceleration,
                                        traceLength: this.trace,
                                    }),
                                ),
                                (this._tick = 0));
                    }
                    drawTrace() {
                        for (var t = this._traces.length; t--; )
                            this._traces[t].draw(),
                                this._traces[t].update((i, s, e) => {
                                    this.initExplosion(i, s, e), this._sound.play(), this._traces.splice(t, 1);
                                });
                    }
                    initExplosion(t, i, s) {
                        for (var e = this.particles; e--; )
                            this._explosions.push(
                                new h.Explosion({ x: t, y: i, ctx: this._ctx, hue: s, friction: this.friction, gravity: this.gravity, explosionLength: this.explosion, brightness: this.brightness }),
                            );
                    }
                    drawExplosion() {
                        for (var t = this._explosions.length; t--; )
                            this._explosions[t].draw(),
                                this._explosions[t].update(() => {
                                    this._explosions.splice(t, 1);
                                });
                    }
                };
            })(),
            e
        );
    })();
});
