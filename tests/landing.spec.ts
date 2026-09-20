import { test, expect, Page } from '@playwright/test';
import { LandingPage } from './pages/landing.page';

const EXPECTED_EXTERNAL_URL = 'https://www.wangbaoai.com';

/**
 * Wangbao AI 落地页 E2E 测试
 *
 * 覆盖 Spec 中的 REQ-001 ~ REQ-008：
 *   - REQ-001 导航栏（Logo、链接、新标签页跳转）
 *   - REQ-002 Hero 区（产品名、定位语、CTA、资源降级）
 *   - REQ-003 核心功能区（4 卡片、图标、标题、描述）
 *   - REQ-004 价值主张区（4 卖点）
 *   - REQ-005 CTA 区（次级转化入口）
 *   - REQ-006 Footer（版权信息、联系方式、链接）
 *   - REQ-007 响应式（桌面 4 列 / 平板 2 列 / 移动单列）
 *   - REQ-008 资源降级与静态可访问
 */

test.describe('Wangbao AI 落地页', () => {
  let landing: LandingPage;

  test.beforeEach(async ({ page }) => {
    landing = new LandingPage(page);
    await landing.goto();
  });

  // ============ REQ-001: 导航栏 ============
  test.describe('REQ-001 导航栏', () => {
    test('展示文字 Logo「Wangbao AI」与「文档」「联系我们」链接', async () => {
      await expect(landing.brand).toHaveText('Wangbao AI');
      await expect(landing.navLinks).toHaveCount(2);
      await expect(landing.navLinks.nth(0)).toHaveText('文档');
      await expect(landing.navLinks.nth(1)).toHaveText('联系我们');
    });

    test('导航链接指向 https://www.wangbaoai.com 并在新标签页打开', async () => {
      for (const link of await landing.navLinks.all()) {
        await expect(link).toHaveAttribute('href', EXPECTED_EXTERNAL_URL);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });

  // ============ REQ-002: Hero 区 ============
  test.describe('REQ-002 Hero 区', () => {
    test('展示产品名、定位语与 CTA 按钮', async () => {
      await expect(landing.hero).toBeVisible();
      await expect(landing.heroTitle).toHaveText('Wangbao AI');
      await expect(landing.heroSubtitle).toHaveText(
        '您的智能 AI 对话助手，随时解答、高效协作',
      );
      const buttons = landing.heroActions.locator('.btn');
      await expect(buttons).toHaveCount(2);
      await expect(buttons.nth(0)).toHaveText('查看文档');
      await expect(buttons.nth(1)).toHaveText('联系我们');
    });

    test('Hero CTA 链接指向 https://www.wangbaoai.com 并在新标签页打开', async () => {
      const buttons = landing.heroActions.locator('.btn');
      for (const btn of await buttons.all()) {
        await expect(btn).toHaveAttribute('href', EXPECTED_EXTERNAL_URL);
        await expect(btn).toHaveAttribute('target', '_blank');
      }
    });
  });

  // ============ REQ-003: 核心功能区 ============
  test.describe('REQ-003 核心功能区', () => {
    test('展示 4 张功能卡片，每张含图标、标题、描述', async () => {
      await expect(landing.featureCards).toHaveCount(4);

      const expectedTitles = ['智能对话', '知识问答', '多场景支持', '高效协作'];
      const expectedDescs = [
        '自然语言理解，流畅多轮对话，精准领会你的意图。',
        '基于知识库即时检索与回答，让信息触手可及。',
        '覆盖客服、办公、学习等场景，一套能力灵活适配。',
        '接入工作流，自动化任务处理，让人与 AI 协同提效。',
      ];

      for (let i = 0; i < 4; i++) {
        const card = landing.featureCards.nth(i);
        await expect(card.locator('.card__icon')).toBeVisible();
        await expect(card.locator('.card__icon svg')).toBeVisible();
        await expect(card.locator('.card__title')).toHaveText(expectedTitles[i]);
        await expect(card.locator('.card__desc')).toHaveText(expectedDescs[i]);
      }
    });
  });

  // ============ REQ-004: 价值主张区 ============
  test.describe('REQ-004 价值主张区', () => {
    test('展示 4 条价值卖点，含编号、标题与说明', async () => {
      await expect(landing.valueItems).toHaveCount(4);

      const expectedIndices = ['01', '02', '03', '04'];
      const expectedTitles = [
        '精准理解，快速响应',
        '安全可靠，企业级保障',
        '灵活接入，开箱即用',
        '持续进化，越用越聪明',
      ];

      for (let i = 0; i < 4; i++) {
        const item = landing.valueItems.nth(i);
        await expect(item.locator('.value-item__index')).toHaveText(expectedIndices[i]);
        await expect(item.locator('.value-item__title')).toHaveText(expectedTitles[i]);
        await expect(item.locator('.value-item__desc')).not.toBeEmpty();
      }
    });
  });

  // ============ REQ-005: CTA 区 ============
  test.describe('REQ-005 CTA 区', () => {
    test('提供「查看文档」与「联系我们」入口', async () => {
      await expect(landing.ctaSection).toBeVisible();
      const buttons = landing.ctaActions.locator('.btn');
      await expect(buttons).toHaveCount(2);
      await expect(buttons.nth(0)).toHaveText('查看文档');
      await expect(buttons.nth(1)).toHaveText('联系我们');
    });

    test('CTA 按钮指向 https://www.wangbaoai.com 并在新标签页打开', async () => {
      const buttons = landing.ctaActions.locator('.btn');
      for (const btn of await buttons.all()) {
        await expect(btn).toHaveAttribute('href', EXPECTED_EXTERNAL_URL);
        await expect(btn).toHaveAttribute('target', '_blank');
      }
    });
  });

  // ============ REQ-006: Footer ============
  test.describe('REQ-006 Footer', () => {
    test('展示版权信息「© 2026 Wangbao AI」', async () => {
      await expect(landing.footer).toBeVisible();
      await expect(landing.footer).toContainText('© 2026 Wangbao AI');
    });

    test('Footer 含联系方式与次要链接', async () => {
      await expect(landing.footer).toContainText('联系方式');
      const footerLinks = landing.footer.locator('.site-footer__link');
      const linkCount = await footerLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      for (const link of await footerLinks.all()) {
        await expect(link).toHaveAttribute('href', EXPECTED_EXTERNAL_URL);
        await expect(link).toHaveAttribute('target', '_blank');
      }
    });
  });

  // ============ REQ-007: 响应式布局 ============

  /**
   * 获取 .card-grid 的计算后 grid-template-columns 列数。
   * 浏览器会将 repeat(4, minmax(0, 1fr)) 解析为具体像素值，如 "255px 255px 255px 255px"。
   */
  async function getGridColumnCount(page: Page): Promise<number> {
    return page.evaluate(() => {
      const grid = document.querySelector('.card-grid') as HTMLElement;
      const computed = window.getComputedStyle(grid).gridTemplateColumns;
      return computed.trim().split(/\s+/).filter(Boolean).length;
    });
  }

  test.describe('REQ-007 响应式布局', () => {
    test('桌面端（1440px）功能卡片 4 列网格', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      const colCount = await getGridColumnCount(page);
      expect(colCount).toBe(4);
    });

    test('平板端（900px）功能卡片 2 列网格', async ({ page }) => {
      await page.setViewportSize({ width: 900, height: 1024 });
      const colCount = await getGridColumnCount(page);
      expect(colCount).toBe(2);
    });

    test('移动端（390px）功能卡片单列布局', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      const colCount = await getGridColumnCount(page);
      expect(colCount).toBe(1);
    });

    test('移动端（390px）无横向溢出', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });

    test('桌面端（1440px）无横向溢出', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });

    test('移动端导航链接触控目标 >= 44px', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      const link = landing.navLinks.nth(0);
      const box = await link.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.height).toBeGreaterThanOrEqual(44);
    });
  });

  // ============ REQ-008: 资源降级与静态可访问 ============
  test.describe('REQ-008 资源降级与静态可访问', () => {
    test('图片加载失败时隐藏破图并保留文字内容', async ({ page }) => {
      // 注入一张会 404 的 img 元素到功能卡片中，验证降级逻辑
      await page.evaluate(() => {
        const card = document.querySelector('.card-grid .card');
        if (card) {
          const img = document.createElement('img');
          img.src = '/nonexistent/broken-image-' + Date.now() + '.png';
          img.alt = '测试破图';
          card.appendChild(img);
        }
      });
      // 等待 error 事件触发降级处理
      await page.waitForTimeout(500);
      const brokenImg = page.locator('img[alt="测试破图"]');
      await expect(brokenImg).toHaveAttribute('data-load-failed', 'true');
      await expect(brokenImg).toBeHidden();
      // 卡片文字仍可见
      await expect(landing.featureCards.nth(0).locator('.card__title')).toBeVisible();
    });

    test('所有对外入口统一指向 https://www.wangbaoai.com', async () => {
      const externalLinks = landing.externalLinks();
      const count = await externalLinks.count();
      expect(count).toBeGreaterThanOrEqual(9);
      for (const link of await externalLinks.all()) {
        await expect(link).toHaveAttribute('href', EXPECTED_EXTERNAL_URL);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
    });
  });
});
