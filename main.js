!(function () {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
      for (const e of document.querySelectorAll('link[rel="modulepreload"]')) t(e);
      new MutationObserver((e) => {
          for (const s of e) if ("childList" === s.type) for (const e of s.addedNodes) "LINK" === e.tagName && "modulepreload" === e.rel && t(e);
      }).observe(document, { childList: !0, subtree: !0 });
  }
  function t(e) {
      if (e.ep) return;
      e.ep = !0;
      const t = (function (e) {
          const t = {};
          return (
              e.integrity && (t.integrity = e.integrity),
              e.referrerpolicy && (t.referrerPolicy = e.referrerpolicy),
              "use-credentials" === e.crossorigin ? (t.credentials = "include") : "anonymous" === e.crossorigin ? (t.credentials = "omit") : (t.credentials = "same-origin"),
              t
          );
      })(e);
      fetch(e.href, t);
  }
})();
class e {
  constructor(e, t, s, i, n, a, r, h) {
      (this.x = e), (this.y = t), (this.height = i), (this.width = s), (this.img = n), (this.dx = a), (this.dy = r), (this.canvasWidth = h);
  }
  draw(e) {
      e.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  move() {
      (this.x += this.dx), (this.y += this.dy), this.x < 0 ? (this.x = 0) : this.x + this.width > this.canvasWidth && (this.x = this.canvasWidth - this.width);
  }
  intersects(e) {
      let t = this.width,
          s = this.height,
          i = e.width,
          n = e.height;
      if (i <= 0 || n <= 0 || t <= 0 || s <= 0) return !1;
      let a = this.x,
          r = this.y,
          h = e.x,
          d = e.y;
      return (i += h), (n += d), (t += a), (s += r), (i < h || i > a) && (n < d || n > r) && (t < a || t > h) && (s < r || s > d);
  }
}
const invader = new Image(40, 40);
function s(e, invader) {
  return (e = Math.ceil(e)), (t = Math.floor(t)), Math.floor(Math.random() * (t - e + 1)) + e;
}
invader.src = "./assets/invader.png";
class i extends e {
  constructor(e, i) {
      super(s(10, e - 10), 0, 40, 40, invader, 0, 0.1 * s(1, 9) + 1, e), (this.JIGGLE_FACTOR = 1), (this.canvasHeight = i);
  }
  move() {
      (this.dx = Math.floor(Math.random() * (2 * this.JIGGLE_FACTOR + 1)) - this.JIGGLE_FACTOR), super.move(this.dx, this.dy);
  }
  checkGameOver() {
      return this.y > this.canvasHeight - 100;
  }
}
const missile = new Image(10, 20);
missile.src = "./assets/missile.png";
class a extends e {
  constructor(e, t) {
      super(e + 15, t, 10, 20, missle, 0, -3), (this.destroyedInvader = null);
  }
  checkOutOfBounds() {
      return this.y < 0;
  }
}
const tank = new Image(50, 50);
tank.src = "./assets/tank.png";
class h extends e {
  constructor(e, t, s) {
      super(e, t, 50, 50, tank, 0, 0, s), (this.displacement = 4), document.addEventListener("keydown", this.keyDownHandler.bind(this)), document.addEventListener("keyup", this.keyUpHandler.bind(this));
  }
  fireMissile() {
      return new a(this.x, this.y);
  }
  keyDownHandler(e) {
      "Right" === e.key || "ArrowRight" === e.key ? (this.dx = this.displacement) : ("Left" !== e.key && "ArrowLeft" !== e.key) || (this.dx = -this.displacement);
  }
  keyUpHandler(e) {
      "Right" === e.key || "ArrowRight" === e.key ? (this.dx = 0) : ("Left" !== e.key && "ArrowLeft" !== e.key) || (this.dx = 0);
  }
}
class d {
  constructor() {
      this.data = [];
  }
  add(e) {
      this.data.push(e);
  }
  clear() {
      this.data.length = 0;
  }
  getData() {
      return this.data;
  }
  contains(e) {
      return this.data.includes(e);
  }
  removeAll(e) {
      this.data = this.data.filter((t) => !e.contains(t));
  }
}
const bgm= new Audio("./assets/music.mpeg");
bgm.loop = !0;
const explosion = new Audio("./assets/explosion.wav"),
  shoot = new Audio("./assets/shoot.wav"),
  m = new (class {
      getRandomInt(e, t) {
          return (e = Math.ceil(e)), (t = Math.floor(t)), Math.floor(Math.random() * (t - e + 1)) + e;
      }
  })();
const gameOver = document.getElementById("myCanvas"),
  fillStyle = gameOver.getContext("2d");
(Fill.font = "16px Arial"), (Fill.fillStyle = "#0095DD");
const v = new (class {
  constructor(e, t) {
      (this.isGameOver = !1),
          (this.gameStart = !1),
          (this.numMissilesInPlay = 0),
          document.addEventListener("keydown", this.keyDownHandler.bind(this)),
          (this.tank = new h(e / 2 - 25, t - 60, e)),
          (this.dummyTank = new h(e / 2 - 25, t - 60, e)),
          (this.canvasWidth = e),
          (this.canvasHeight = t),
          (this.sprites = new d()),
          (this.numInvadersDestroyed = 0),
          (this.numInvaders = 0),
          (this.nextInvaderTime = this.generateNextInvaderTime());
  }
  generateNextInvaderTime() {
      return new Date().getTime() + m.getRandomInt(1e3, 5e3);
  }
  generateNewInvader() {
      this.sprites.add(new i(this.canvasWidth, this.canvasHeight)), this.numInvaders++, (this.nextInvaderTime = this.generateNextInvaderTime());
  }
  checkNextInvader() {
      return new Date().getTime() > this.nextInvaderTime && this.numInvaders < 5;
  }
  draw(e, t) {
      this.isGameOver ? e.fillText("Game Over!", 8, 40) : e.fillText("Missiles remaining: " + (10 - this.numMissilesInPlay), 8, 40),
          e.fillText("Invaders shot down: " + this.numInvadersDestroyed, 8, 20),
          !this.isGameOver && this.gameStart
              ? (o.play(), this.tank.draw(e), this.tank.move(t), this.checkNextInvader() && this.generateNewInvader(), this.sprites.getData().forEach((t) => (t instanceof i ? this.handleInvader(t, e) : this.handleMissile(t, e))))
              : (o.pause(), this.dummyTank.draw(e), this.sprites.clear());
  }
  handleInvader(e, t) {
      e.draw(t), e.move(), !0 !== this.isGameOver && (this.isGameOver = e.checkGameOver());
  }
  handleMissile(e, t) {
      e.move();
      let s = new d();
      this.sprites.getData().forEach((t) => {
          t instanceof i && e.intersects(t) && (c.play(), s.add(t), s.add(e), this.numInvadersDestroyed++, this.numInvaders--);
      }),
          e.checkOutOfBounds() ? s.add(e) : e.draw(t),
          s.contains(e) && this.numMissilesInPlay--,
          this.sprites.removeAll(s);
  }
  keyDownHandler(e) {
      "Right" === e.key || "ArrowRight" === e.key || "Left" === e.key || "ArrowLeft" === e.key
          ? (this.gameStart = !0)
          : " " === e.key && this.gameStart && !this.isGameOver && this.numMissilesInPlay < 10 && (l.play(), this.sprites.add(this.tank.fireMissile()), this.numMissilesInPlay++);
  }
})(u.width, u.height);
!(function e() {
  y.clearRect(0, 0, u.width, u.height), v.draw(y, u.width), window.requestAnimationFrame(e);
})();
