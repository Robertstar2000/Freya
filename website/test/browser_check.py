import asyncio
from playwright.async_api import async_playwright

async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--no-proxy-server'])
  page=await browser.new_page(viewport={'width':1600,'height':1000},device_scale_factor=1)
  errors=[];page.on('pageerror',lambda err:errors.append(str(err)))
  from pathlib import Path
  html=Path('/mnt/data/freya-site/freya_standalone.html').read_text()
  await page.set_content(html,wait_until='load')
  await page.wait_for_timeout(250)
  await page.screenshot(path='/mnt/data/Freya_Sites_preview_desktop.png',full_page=True)
  print('TITLE',await page.title());print('HEADER',await page.locator('h1').inner_text());print('KPI',await page.locator('#kpis').inner_text());print('TABLE_ROWS',await page.locator('#probeRows tr').count()); print('EVENTS',await page.locator('#events button').count());print('ERRORS',errors)
  await page.locator('#events button').nth(1).click()
  print('MODAL',await page.locator('#modalTitle').inner_text(), 'visible',await page.locator('#eventModal').evaluate('(x) => x.open'))
  await page.locator('#closeModal').click()
  await page.locator('#materialSelect').select_option('dry')
  print('SANDSTONE',await page.locator('#requiredSpeed').inner_text())
  await page.locator('#resetBtn').click()
  await page.locator('#optimizeBtn').click()
  print('OPTIMUM DIAMETER',await page.locator('#o_shieldD').inner_text())
  await page.locator('#playBtn').click()
  await page.wait_for_timeout(700)
  print('CURRENT TIME',await page.locator('#clockText').inner_text())
  await page.locator('#playBtn').click()
  mobile=await browser.new_page(viewport={'width':390,'height':844},device_scale_factor=1)
  mobile_errors=[];mobile.on('pageerror',lambda err:mobile_errors.append(str(err)))
  await mobile.set_content(html,wait_until='load')
  await mobile.wait_for_timeout(250)
  await mobile.screenshot(path='/mnt/data/Freya_Sites_preview_mobile.png',full_page=True)
  print('MOBILE rows',await mobile.locator('#probeRows tr').count(),'scroll x',await mobile.evaluate('document.documentElement.scrollWidth - window.innerWidth'),'errors',mobile_errors)
  await browser.close()

asyncio.run(main())
