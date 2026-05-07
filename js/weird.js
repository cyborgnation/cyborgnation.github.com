(function () {
  'use strict';

  // ── Utilities ──────────────────────────────────────────────────────────────

  var CHARS = {
    glitch: '!&^?#@$%~|.',
    code:   '0123456789ABCDEF/.-',
  };

  function randomChar(set) {
    return set[Math.floor(Math.random() * set.length)];
  }

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  function rafThrottle(fn) {
    var rafId = null;
    return function () {
      var args = arguments, ctx = this;
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        fn.apply(ctx, args);
        rafId = null;
      });
    };
  }

  // ── TextScramble ───────────────────────────────────────────────────────────

  function TextScramble(el, opts) {
    opts = opts || {};
    this.el            = el;
    this.charSet       = opts.charSet || CHARS.glitch;
    this.frameInterval = opts.frameInterval || 35;
    this.staggerDelay  = opts.staggerDelay  || 22;
    this.rafId         = null;
    this.startTime     = 0;
    this.chars         = [];
    this.resolve       = null;
  }

  TextScramble.prototype.scramble = function (finalText) {
    var self = this;
    return new Promise(function (resolve) {
      self.resolve = resolve;
      var len = finalText.length;
      self.chars = Array.from({ length: len }, function (_, i) {
        return {
          final:      finalText[i],
          stepsLeft:  Math.floor(Math.random() * 8) + 4,
          startDelay: i * self.staggerDelay,
          elapsed:    0,
          resolved:   false,
        };
      });
      self.el.classList.add('is-scrambling');
      self.startTime = performance.now();
      self.rafId = requestAnimationFrame(self._tick.bind(self));
    });
  };

  TextScramble.prototype._tick = function (ts) {
    var self = this;
    var elapsed = ts - this.startTime;
    var done = true;

    var output = this.chars.map(function (ch) {
      if (ch.resolved) return ch.final;

      // preserve whitespace
      if (/\s/.test(ch.final)) { ch.resolved = true; return ch.final; }

      if (elapsed < ch.startDelay) {
        done = false;
        return randomChar(self.charSet);
      }

      ch.elapsed += 16;
      if (ch.elapsed >= self.frameInterval) {
        ch.elapsed = 0;
        ch.stepsLeft--;
      }

      if (ch.stepsLeft <= 0) {
        ch.resolved = true;
        return ch.final;
      }

      done = false;
      return randomChar(self.charSet);
    });

    this.el.textContent = output.join('');

    if (done) {
      this.el.classList.remove('is-scrambling');
      this.el.textContent = this.chars.map(function (c) { return c.final; }).join('');
      if (this.resolve) this.resolve();
      return;
    }

    this.rafId = requestAnimationFrame(this._tick.bind(this));
  };

  // ── Hero Load Scramble ─────────────────────────────────────────────────────

  function initHeroScramble() {
    var el = document.getElementById('js-scramble-hero');
    if (!el) return;
    var finalText = el.dataset.original || el.textContent.trim();
    var scrambler = new TextScramble(el, {
      charSet:       CHARS.glitch,
      frameInterval: 30,
      staggerDelay:  18,
    });
    setTimeout(function () { scrambler.scramble(finalText); }, 250);
  }

  // ── Custom Cursor ──────────────────────────────────────────────────────────

  var CursorController = {
    el: null,
    visible: false,

    init: function () {
      this.el = document.getElementById('js-cursor');
      if (!this.el) return;

      document.addEventListener('mousemove', rafThrottle(this._onMove.bind(this)));
      document.addEventListener('mouseleave', this._hide.bind(this));
      document.addEventListener('mouseenter', this._show.bind(this));
      document.addEventListener('mouseover',  this._onOver.bind(this));
      document.addEventListener('mouseout',   this._onOut.bind(this));
    },

    _onMove: function (e) {
      if (!this.visible) this._show();
      this.el.style.left = e.clientX + 'px';
      this.el.style.top  = e.clientY + 'px';
    },

    _onOver: function (e) {
      var t = e.target.closest('a, button, .project-item, [data-interactive]');
      if (t) this.el.classList.add('cursor--hover');
    },

    _onOut: function (e) {
      var t = e.target.closest('a, button, .project-item, [data-interactive]');
      if (t) this.el.classList.remove('cursor--hover');
    },

    _show: function () { this.visible = true;  this.el.style.opacity = '1'; },
    _hide: function () { this.visible = false; this.el.style.opacity = '0'; },
  };

  // ── Magnetic Hover ─────────────────────────────────────────────────────────

  var MagneticHover = {
    RANGE: 90,
    PULL:  0.32,

    init: function () {
      this.elements = Array.from(document.querySelectorAll('.magnetic'));
      if (!this.elements.length) return;
      document.addEventListener('mousemove', rafThrottle(this._onMove.bind(this)));
    },

    _onMove: function (e) {
      var range = this.RANGE, pull = this.PULL;

      this.elements.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var cx = r.left + r.width  / 2;
        var cy = r.top  + r.height / 2;
        var dx = e.clientX - cx;
        var dy = e.clientY - cy;
        var d  = Math.hypot(dx, dy);

        if (d < range) {
          var force = 1 - (d / range);
          var tx = dx * pull * force;
          var ty = dy * pull * force;
          el.classList.add('is-magnetized');
          el.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
        } else if (el.classList.contains('is-magnetized')) {
          el.classList.remove('is-magnetized');
          el.style.transform = 'translate(0, 0)';
        }
      });
    },
  };

  // ── Glitch on Hover ────────────────────────────────────────────────────────

  var GlitchController = {
    DURATION: 500,

    init: function () {
      var items = document.querySelectorAll('.project-item');
      if (!items.length) return;
      var duration = this.DURATION;

      items.forEach(function (item) {
        var t = null;
        item.addEventListener('mouseenter', function () {
          clearTimeout(t);
          item.classList.add('is-glitching');
        });
        item.addEventListener('mouseleave', function () {
          t = setTimeout(function () {
            item.classList.remove('is-glitching');
          }, duration);
        });
      });
    },
  };

  // ── Hero Parallax (subtle drift on the name) ───────────────────────────────

  var HeroParallax = {
    DEPTH: 0.012,

    init: function () {
      var hero = document.getElementById('hero');
      var name = document.getElementById('js-scramble-hero');
      if (!hero || !name) return;
      this.hero = hero;
      this.name = name;

      hero.addEventListener('mousemove', rafThrottle(this._onMove.bind(this)));
      hero.addEventListener('mouseleave', this._reset.bind(this));
    },

    _onMove: function (e) {
      var r = this.hero.getBoundingClientRect();
      var nx = (e.clientX - r.left - r.width  / 2) / r.width;
      var ny = (e.clientY - r.top  - r.height / 2) / r.height;
      var mx = clamp(nx * this.DEPTH * r.width,  -14, 14);
      var my = clamp(ny * this.DEPTH * r.height, -10, 10);
      this.name.style.transform = 'translate(' + mx + 'px, ' + my + 'px)';
    },

    _reset: function () {
      this.name.style.transform = 'translate(0, 0)';
    },
  };

  // ── Scroll Scramble ────────────────────────────────────────────────────────

  var ScrollScramble = {
    init: function () {
      var targets = document.querySelectorAll('.js-scroll-scramble');
      if (!targets.length || !('IntersectionObserver' in window)) return;
      var done = new WeakSet();

      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !done.has(entry.target)) {
            done.add(entry.target);
            obs.unobserve(entry.target);
            var el = entry.target;
            var finalText = el.dataset.original || el.textContent.trim();
            var s = new TextScramble(el, {
              charSet:       CHARS.code,
              frameInterval: 28,
              staggerDelay:  14,
            });
            s.scramble(finalText);
          }
        });
      }, { threshold: 0.25 });

      targets.forEach(function (el) { obs.observe(el); });
    },
  };

  // ── Easter Egg: Page Invert ────────────────────────────────────────────────

  var InvertEgg = {
    DURATION: 140,
    locked:   false,

    init: function () {
      var trigger = document.getElementById('js-scramble-hero');
      if (!trigger) return;
      var self = this;
      trigger.addEventListener('click', function () { self._fire(); });
    },

    _fire: function () {
      if (this.locked) return;
      this.locked = true;
      var d = this.DURATION;
      document.body.classList.add('is-inverted');
      setTimeout(function () {
        document.body.classList.remove('is-inverted');
      }, d);
      setTimeout(function () { InvertEgg.locked = false; }, d + 200);
    },
  };

  // ── Init ───────────────────────────────────────────────────────────────────

  function init() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isTouch        = window.matchMedia('(pointer: coarse)').matches;

    if (!isTouch) CursorController.init();
    InvertEgg.init();

    if (!prefersReduced) {
      initHeroScramble();
      ScrollScramble.init();
      GlitchController.init();
      if (!isTouch) {
        MagneticHover.init();
        HeroParallax.init();
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
