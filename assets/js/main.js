/*!
 * Wangbao AI 落地页脚本
 * 渐进增强：脚本不可用时页面核心内容与入口链接仍完整可用（无 JS 也可正常浏览与跳转）。
 */
(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reduceMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * 滚动出现动画：仅作为视觉增强，元素最终一定可见。
   */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) {
      return;
    }

    if (reduceMotion || typeof window.IntersectionObserver !== 'function') {
      for (var i = 0; i < items.length; i++) {
        items[i].classList.add('is-visible');
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    for (var j = 0; j < items.length; j++) {
      observer.observe(items[j]);
    }

    // 兜底：确保在观察器未触发时（例如页面不可见）内容依然展示
    window.setTimeout(function () {
      for (var k = 0; k < items.length; k++) {
        items[k].classList.add('is-visible');
      }
    }, 2500);
  }

  /**
   * 图片资源降级：图片加载失败时隐藏破图并保留可读文字，避免整块空白。
   */
  function initImageFallback() {
    document.addEventListener(
      'error',
      function (event) {
        var target = event.target;
        if (!target || target.tagName !== 'IMG') {
          return;
        }
        target.classList.add('is-broken');
        target.setAttribute('data-load-failed', 'true');
        target.setAttribute('aria-hidden', 'true');
        target.style.display = 'none';
      },
      true
    );
  }

  function init() {
    initReveal();
    initImageFallback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
