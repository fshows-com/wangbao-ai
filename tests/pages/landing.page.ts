import { Page, Locator, expect } from '@playwright/test';

/**
 * Wangbao AI 落地页 Page Object
 * 封装页面主要区块的定位与交互，供测试用例复用。
 */
export class LandingPage {
  readonly page: Page;

  // 导航栏
  readonly brand: Locator;
  readonly navLinks: Locator;

  // Hero 区
  readonly hero: Locator;
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly heroActions: Locator;

  // 核心功能区
  readonly featuresSection: Locator;
  readonly featureCards: Locator;

  // 价值主张区
  readonly valuesSection: Locator;
  readonly valueItems: Locator;

  // CTA 区
  readonly ctaSection: Locator;
  readonly ctaActions: Locator;

  // Footer
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brand = page.locator('.brand');
    this.navLinks = page.locator('.site-nav__link');
    this.hero = page.locator('#hero');
    this.heroTitle = page.locator('#hero-title');
    this.heroSubtitle = page.locator('.hero__subtitle');
    this.heroActions = page.locator('.hero__actions');
    this.featuresSection = page.locator('#features');
    this.featureCards = page.locator('.card-grid .card');
    this.valuesSection = page.locator('#values');
    this.valueItems = page.locator('.value-grid .value-item');
    this.ctaSection = page.locator('#cta');
    this.ctaActions = page.locator('.cta__actions');
    this.footer = page.locator('.site-footer');
  }

  async goto() {
    await this.page.goto('/');
  }

  /** 获取所有指向 https://www.wangbaoai.com 的外链 */
  externalLinks(): Locator {
    return this.page.locator('a[href="https://www.wangbaoai.com"]');
  }
}
