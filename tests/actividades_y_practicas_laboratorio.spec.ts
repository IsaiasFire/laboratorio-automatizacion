import { test, expect } from '@playwright/test';

test.describe('Test login banner', () => {

  let nuevaPagina;

  test.beforeEach(async ({ page, context }) => {
    
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
      newPage.waitForNavigation({ waitUntil: 'load' }),
      newPage.getByRole('button', { name: 'Sign in' }).click()
    ]);

    const yesButton = newPage.getByRole('button', { name: 'Yes' });
    await yesButton.waitFor({ state: 'visible' });

    await newPage.waitForTimeout(2000); // Espera un segundo para asegurarse de que el botón esté listo
     [nuevaPagina] = await Promise.all([
      newPage.waitForNavigation({ waitUntil: 'load'}),
      yesButton.click()
    ]);
  });


  test("banner login", async () => {

    // const dashboardHeader = nuevaPagina.locator('text=Esta es la página principal del autoservicio del estudiante');
    // await dashboardHeader.waitFor({ state: 'visible' });


  await nuevaPagina.waitForURL('https://alumnos.unapec.edu.do/StudentSelfService/ssb/studentCommonDashboard'); // espera activamente a que se cargue esa URL
  await expect(nuevaPagina).toHaveURL('https://alumnos.unapec.edu.do/StudentSelfService/ssb/studentCommonDashboard'); // valida que efectivamente esté allí

    console.log('✅ Login exitoso y dashboard cargado.');
  }); 

  test("Consulta de Horario de Clase", async ({ page, context }) => {
    await page.goto('https://alumnos.unapec.edu.do/StudentSelfService/ssb/studentCommonDashboard', { waitUntil: 'domcontentloaded' });

  
    const [popupPage] = await Promise.all([
     context.waitForEvent('page'),
      page.getByRole('link', { name: 'Inscripción, horario y planificación' }).click()
    ]);


    await popupPage.waitForLoadState('domcontentloaded');
  
      await Promise.all([
      popupPage.waitForNavigation({ url: '**/StudentRegistrationSsb/ssb/registrationHistory/registrationHistory', timeout: 20000 }),
      popupPage.getByRole('link', { name: 'View Registration Information' }).click()
    ]);


    await expect(popupPage).toHaveURL('https://registro.unapec.edu.do/StudentRegistrationSsb/ssb/registrationHistory/registrationHistory');

    await popupPage.waitForLoadState('domcontentloaded');
    const scheduleHeader = popupPage.locator('text=Consulta de Horario de Clase');
    await scheduleHeader.waitFor({ state: 'visible' });
  

  });

});