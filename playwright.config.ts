import { defineConfig, devices } from '@playwright/test';

/**
 * Wangbao AI 落地页 E2E 测试配置。
 *
 * 浏览器选择优先级：
 *   1. 环境变量 BROWSER_PATH 指定的可执行文件；
 *   2. 依次探测系统 Chrome / Chromium（google-chrome-stable / google-chrome / chromium-browser / chromium）；
 *   3. 未找到时 Playwright 使用自带 Chromium（需另行安装，本仓库不默认安装）。
 *
 * 运行阶段可通过 PLAYWRIGHT_BROWSERS_PATH / npx playwright install 按需准备。
 */
function resolveBrowserPath(): string | undefined {
  if (process.env.BROWSER_PATH) {
    return process.env.BROWSER_PATH;
  }
  const { execSync } = require('child_process');
  const candidates = [
    'google-chrome-stable',
    'google-chrome',
    'chromium-browser',
    'chromium',
  ];
  for (const cmd of candidates) {
    try {
      const path = execSync(`command -v ${cmd}`, { encoding: 'utf-8' }).trim();
    if (path) {
      return path;
    }
    } catch {
      // continue to next candidate
    }
  }
  return undefined;
}

const executablePath = resolveBrowserPath();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'tests/report', open: 'never' }],
  ],
  use: {
    baseURL: 'http://localhost:8199',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...(executablePath ? { launchOptions: { executablePath } } : {}),
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'python3 -m http.server 8199',
    port: 8199,
    reuseExistingServer: !process.env.CI,
    timeout: 15000,
  },
});
