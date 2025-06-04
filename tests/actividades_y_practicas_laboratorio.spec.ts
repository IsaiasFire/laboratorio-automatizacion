import { test, expect } from '@playwright/test';


test("banner login", async ({ page }) => {
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
  const scheduleHeader = popupPage.locator('text=Consulta de Horario de Clase');
  await expect(scheduleHeader).toBeVisible({ timeout: 10000 });

});