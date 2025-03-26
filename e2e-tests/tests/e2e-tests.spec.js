const { test, expect, describe, beforeEach } = require('@playwright/test')
require('dotenv').config()

describe('LiftMeApp', () => {
    
    beforeEach(async ({ page }) => {
        //loginn
        await page.goto('http://localhost:3000')
        await page.getByRole('textbox').first().fill('eskolaine@liftmeapp.com')
        await page.getByRole('textbox').last().fill(process.env.PASSWORD)
        await page.getByRole('button', { name: 'SIGN IN' }).click();
        try {
            await page.waitForSelector('text=Esko Laine', { timeout: 60000 });
        } catch (error) {
            console.log(await page.content())
            throw error;
        }
        await expect(page.getByText('Esko Laine', { timeout: 60000 })).toBeVisible()
    })
    
    test('drivers and passengers available & profile page accessible', async ({ page }) => {
        await expect(page.getByText('Linda Lorén')).toBeVisible()
        await page.getByRole('button', { name: 'passengers' }).click(),
        await expect(page.getByText('Masa Aaltonen')).toBeVisible()
        await page.getByRole('button', { name: 'Account Menu' }).click()
        await expect(page.getByText('My profile')).toBeVisible()
        await page.getByTestId('account-menu-button').click()
        await page.waitForURL('**/profile')
    })
})




    
    


