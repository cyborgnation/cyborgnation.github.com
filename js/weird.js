(function () {
  'use strict';

  // ── Utilities ──────────────────────────────────────────────────────────────

  var CHARS = {
    glitch: '!<>-_\\/[]{}—=+*^?#@$%&|~;:.',
    hex:    '0123456789ABCDEF',
  };

  function randomChar(charSet) {
    return charSet[Math.floor(Math.random() * charSet.length)];
  }

  function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  function rafThrottle(fn) {
    var rafId = null;
    return function () {
      var args = arguments;
      var ctx  = this;
      if (rafId) return;
      rafId = requestAnimationFrame(function () {
        fn.apply(ctx, args);
        rafId = null;
      });
    };
  }

  // ── TextScramble ───────────────────────────────────────────────────────────

  function TextScramble(el, options) {
    this.el            = el;
    this.charSet       = (options && options.charSet)       || CHARS.glitch;
    this.frameInterval = (options && options.frameInterval) || 40;
    this.staggerDelay  = (options && options.staggerDelay)  || 30;
    this.rafId         = null;
    this.resolve       = null;
    this.chars         = [];
    this.startTime     = 0;
  }

  TextScramble.prototype.scramble = function (finalText) {
    var self = this;
    return new Promise(function (resolve) {
      self.resolve = resolve;
      var length = finalText.length;
      self.chars = Array.from({ length: length }, function (_, i) {
        return {
          final:      finalText[i],
          current:    randomChar(self.charSet),
          stepsLeft:  Math.floor(Math.random() * 10) + 5,
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

  TextScramble.prototype._tick = function (timestamp) {
    var self    = this;
    var elapsed = timestamp - this.startTime;
    var allResolved = true;

    var output = this.chars.map(function (ch) {
      if (ch.resolved) return ch.final;

      if (elapsed < ch.startDelay) {
        allResolved = false;
        return randomChar(self.charSet);
      }

      ch.elapsed += 16;
      if (ch.elapsed >= self.frameInterval) {
        ch.elapsed = 0;
        ch.stepsLeft--;
        ch.current = randomChar(self.charSet);
      }

      if (ch.stepsLeft <= 0) {
        ch.resolved = true;
        return ch.final;
      }

      allResolved = false;
      return ch.current;
    });

    this.el.textContent = output.join('');

    if (allResolved) {
      this.el.classList.remove('is-scrambling');
      this.el.textContent = this.chars.map(function (c) { return c.final; }).join('');
      if (this.resolve) this.resolve();
      return;
    }

    this.rafId = requestAnimationFrame(this._tick.bind(this));
  };

  TextScramble.prototype.cancel = function () {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.el.classList.remove('is-scrambling');
    var original = this.el.dataset.original;
    if (original) this.el.textContent = original;
  };

  // ── Hero Load Scramble ─────────────────────────────────────────────────────

  function initHeroScramble() {
    var heroName = document.getElementById('js-scramble-hero');
    if (!heroName) return;
    var finalText = heroName.dataset.original || heroName.textContent.trim();
    var scrambler = new TextScramble(heroName, {
      charSet:       CHARS.glitch,
      frameInterval: 35,
      staggerDelay:  20,
    });
    setTimeout(function () { scrambler.scramble(finalText); }, 300);
  }

  // ── Custom Cursor ──────────────────────────────────────────────────────────

  var CursorController = {
    el:        null,
    isVisible: false,

    init: function () {
      this.el = document.getElementById('js-cursor');
      if (!this.el) return;

      document.addEventListener('mousemove', rafThrottle(this.onMove.bind(this)));
      document.addEventListener('mouseleave', this.hide.bind(this));
      document.addEventListener('mouseenter', this.show.bind(this));
      document.addEventListener('mouseover',  this.onOver.bind(this));
      document.addEventListener('mouseout',   this.onOut.bind(this));
    },

    onMove: function (e) {
      if (!this.isVisible) this.show();
      this.el.style.left = e.clientX + 'px';
      this.el.style.top  = e.clientY + 'px';
    },

    onOver: function (e) {
      var target = e.target.closest('a, button, .project-item, [data-interactive]');
      if (target) this.el.classList.add('cursor--hover');
    },

    onOut: function (e) {
      var target = e.target.closest('a, button, .project-item, [data-interactive]');
      if (target) this.el.classList.remove('cursor--hover');
    },

    show: function () {
      this.isVisible = true;
      this.el.style.opacity = '1';
    },

    hide: function () {
      this.isVisible = false;
      this.el.style.opacity = '0';
    },
  };

  // ── Glitch on Hover ────────────────────────────────────────────────────────

  var GlitchController = {
    DURATION: 600,

    init: function () {
      var items = document.querySelectorAll('.project-item');
      if (!items.length) return;
      var duration = this.DURATION;

      items.forEach(function (item) {
        var timer = null;

        item.addEventListener('mouseenter', function () {
          clearTimeout(timer);
          item.classList.add('is-glitching');
        });

        item.addEventListener('mouseleave', function () {
          timer = setTimeout(function () {
            item.classList.remove('is-glitching');
          }, duration);
        });
      });
    },
  };

  // ── Mouse Parallax ─────────────────────────────────────────────────────────

  var ParallaxController = {
    layers:  [],
    coordEl: null,

    init: function () {
      var hero = document.getElementById('hero');
      if (!hero) return;

      this.layers  = Array.from(document.querySelectorAll('[data-parallax-depth]'));
      this.coordEl = document.querySelector('.sys-coord');
      if (!this.layers.length) return;

      hero.addEventListener('mousemove', rafThrottle(this._onMove.bind(this)));
      hero.addEventListener('mouseleave', this._onLeave.bind(this));
    },

    _onMove: function (e) {
      var hero = document.getElementById('hero');
      var rect = hero.getBoundingClientRect();
      var normX = (e.clientX - rect.left  - rect.width  / 2) / rect.width;
      var normY = (e.clientY - rect.top   - rect.height / 2) / rect.height;

      this.layers.forEach(function (layer) {
        var depth = parseFloat(layer.dataset.parallaxDepth) || 0.02;
        var moveX = clamp(normX * depth * rect.width,  -30, 30);
        var moveY = clamp(normY * depth * rect.height, -30, 30);
        layer.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
      });

      if (this.coordEl) {
        var dx = String(Math.abs(Math.round(normX * 9999))).padStart(4, '0');
        var dy = String(Math.abs(Math.round(normY * 9999))).padStart(4, '0');
        this.coordEl.textContent = 'X:' + dx + ' Y:' + dy;
      }
    },

    _onLeave: function () {
      this.layers.forEach(function (layer) {
        layer.style.transform = 'translate(0px, 0px)';
      });
      if (this.coordEl) this.coordEl.textContent = 'X:0000 Y:0000';
    },
  };

  // ── Scroll Scramble ────────────────────────────────────────────────────────

  var ScrollScrambleController = {
    scrambled: null,

    init: function () {
      var targets = document.querySelectorAll('.js-scroll-scramble');
      if (!targets.length) return;
      this.scrambled = new WeakSet();
      var self = this;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !self.scrambled.has(entry.target)) {
            self.scrambled.add(entry.target);
            observer.unobserve(entry.target);

            var el        = entry.target;
            var finalText = el.dataset.original || el.textContent.trim();
            var scrambler = new TextScramble(el, {
              charSet:       CHARS.hex,
              frameInterval: 30,
              staggerDelay:  15,
            });
            scrambler.scramble(finalText);
          }
        });
      }, { threshold: 0.2 });

      targets.forEach(function (el) { observer.observe(el); });
    },
  };

  // ── Easter Egg ─────────────────────────────────────────────────────────────

  var EasterEgg = {
    overlay:   null,
    isPlaying: false,

    init: function () {
      this.overlay = document.getElementById('js-sys-error');
      var trigger  = document.getElementById('js-scramble-hero');
      if (!this.overlay || !trigger) return;

      var self = this;
      trigger.addEventListener('click', function () { self.trigger(); });
      trigger.title = '[CLASSIFIED]';

      this.overlay.addEventListener('animationend', function () {
        self.overlay.hidden = true;
        self.isPlaying = false;
      });
    },

    trigger: function () {
      if (this.isPlaying) return;
      this.isPlaying    = true;
      this.overlay.hidden = false;
      void this.overlay.offsetWidth; // force reflow to restart animation
    },
  };

  // ── Init ───────────────────────────────────────────────────────────────────

  function init() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    CursorController.init();
    EasterEgg.init();

    if (!prefersReduced) {
      initHeroScramble();
      GlitchController.init();
      ParallaxController.init();
      ScrollScrambleController.init();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
