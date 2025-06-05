import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test("banner login", async ({ page }) => {
  await page.goto('https://landing.unapec.edu.do/banner/', { waitUntil: 'domcontentloaded' });

  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Acceso para estudiantes y egresados' }).click()
  ]);

  await newPage.waitForLoadState('load');

  const emailInput = newPage.locator('input[type="email"]');
  await emailInput.waitFor({ state: 'visible'});
  await emailInput.fill('i.deleon14@unapec.edu.do');

  await Promise.all([
    newPage.waitForSelector('input[type="password"]', { timeout: 15000 }),
    newPage.getByRole('button', { name: 'Next' }).click()
  ]);
 
  const passwordInput = newPage.locator('input[type="password"]');
  await passwordInput.waitFor({ state: 'visible' });
  await passwordInput.fill('Disturbed/13.');

  await Promise.all([
    newPage.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
    newPage.getByRole('button', { name: 'Sign in' }).click()
  ]);

  const yesButton = newPage.getByRole('button', { name: 'Yes' });
  await yesButton.waitFor({ state: 'visible' });

  await Promise.all([
    newPage.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
    yesButton.click()
  ]);

  await newPage.waitForURL('**/StudentSelfService/ssb/studentCommonDashboard', { timeout: 20000 });

  const dashboardHeader = newPage.locator('text=Esta es la página principal del autoservicio del estudiante');
  await dashboardHeader.waitFor({ state: 'visible' });
  console.log('✅ Login exitoso y dashboard cargado.');
});



test("Consulta de Horario de Clase", async ({ page }) => {
  await page.goto('https://landing.unapec.edu.do/banner/', { waitUntil: 'domcontentloaded' });

  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Acceso para estudiantes y egresados' }).click()
  ]);

  await newPage.waitForLoadState('load');

  const emailInput = newPage.locator('input[type="email"]');
  await expect(emailInput).toBeVisible({ timeout: 15000 });
  await emailInput.fill('i.deleon14@unapec.edu.do');

  await Promise.all([
    newPage.waitForSelector('input[type="password"]', { timeout: 15000 }),
    newPage.getByRole('button', { name: 'Next' }).click()
  ]);
 
  const passwordInput = newPage.locator('input[type="password"]');
  await expect(passwordInput).toBeVisible({ timeout: 10000 });
  await passwordInput.fill('Disturbed/13.');

  await Promise.all([
    newPage.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
    newPage.getByRole('button', { name: 'Sign in' }).click()
  ]);

  const yesButton = newPage.getByRole('button', { name: 'Yes' });
  await expect(yesButton).toBeVisible({ timeout: 10000 });

  await Promise.all([
    newPage.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
    yesButton.click()
  ]);

  await newPage.waitForURL('**/StudentSelfService/ssb/studentCommonDashboard', { timeout: 20000 });

  const dashboardHeader = newPage.locator('text=Esta es la página principal del autoservicio del estudiante');
  await expect(dashboardHeader).toBeVisible({ timeout: 135000 });

  const [popupPage] = await Promise.all([
    newPage.waitForEvent('popup'),
    newPage.getByRole('link', { name: 'Inscripción, horario y planificación' }).click()
  ]);

  await popupPage.waitForLoadState('domcontentloaded');
 
    await Promise.all([
    popupPage.waitForNavigation({ url: '**/StudentRegistrationSsb/ssb/registrationHistory/registrationHistory', timeout: 20000 }),
    popupPage.getByRole('link', { name: 'View Registration Information' }).click()
  ]);

  await expect(popupPage).toHaveURL('https://registro.unapec.edu.do/StudentRegistrationSsb/ssb/registrationHistory/registrationHistory');
  await popupPage.waitForLoadState('domcontentloaded');

  const element = popupPage.locator('#select2-chosen-1');
  await expect(element).toBeVisible({ timeout: 10000 });
  await element.click();

  await popupPage.evaluate(() => {const select = document.querySelector('select#lookupFilter');if (select) {select.value = '202520'; const event = new Event('change', { bubbles: true }); select.dispatchEvent(event); }});

  const scheduleTab = popupPage.locator('#scheduleDetailsViewLink');
  await expect(scheduleTab).toBeVisible({ timeout: 10000 });
  await scheduleTab.click();

  const fullName = await popupPage.locator('meta[name="fullName"]').getAttribute('content');
  console.log(fullName); 

await popupPage.waitForTimeout(5000);

const countTwo = await popupPage.locator('.listViewMeetingInformation').count();
console.log(countTwo); 

const logFilePath = 'log.txt';
const screenshotFileName = `horario_${fullName?.replace(/\s+/g, '_')}.png`;
const screenshotPath = path.resolve(screenshotFileName);


await popupPage.screenshot({ path: screenshotPath, fullPage: true });

const logContent = `Usuario: ${fullName}
Cantidad de asignaturas: ${countTwo}
Ruta de la captura: ${screenshotPath}`;

fs.appendFileSync(logFilePath, logContent, 'utf8');
});


test("banner logout", async ({ page }) => {
  await page.goto('https://landing.unapec.edu.do/banner/', { waitUntil: 'domcontentloaded' });

  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Acceso para estudiantes y egresados' }).click()
  ]);

  await newPage.waitForLoadState('load');

  const emailInput = newPage.locator('input[type="email"]');
  await emailInput.waitFor({ state: 'visible'});
  await emailInput.fill('i.deleon14@unapec.edu.do');

  await Promise.all([
    newPage.waitForSelector('input[type="password"]', { timeout: 15000 }),
    newPage.getByRole('button', { name: 'Next' }).click()
  ]);
 
  const passwordInput = newPage.locator('input[type="password"]');
  await passwordInput.waitFor({ state: 'visible' });
  await passwordInput.fill('Disturbed/13.');

  await Promise.all([
    newPage.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
    newPage.getByRole('button', { name: 'Sign in' }).click()
  ]);

  const yesButton = newPage.getByRole('button', { name: 'Yes' });
  await yesButton.waitFor({ state: 'visible' });

  await Promise.all([
    newPage.waitForNavigation({ waitUntil: 'load', timeout: 20000 }),
    yesButton.click()
  ]);

  await newPage.waitForURL('**/StudentSelfService/ssb/studentCommonDashboard', { timeout: 20000 });

  const dashboardHeader = newPage.locator('text=Esta es la página principal del autoservicio del estudiante');
  await dashboardHeader.waitFor({ state: 'visible' });
  console.log('✅ Login exitoso y dashboard cargado.');

  const userMenu = newPage.locator('#user');
  await expect(userMenu).toBeVisible({ timeout: 10000 });
  await userMenu.click();

const signOutBtn = newPage.locator('div#signOut');
await expect(signOutBtn).toBeVisible({ timeout: 10000 });
await signOutBtn.click();
  
});