import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'electron' && browser.isHeadless) {
          launchOptions.preferences.width = 1920
          launchOptions.preferences.height = 1080
        }

        return launchOptions
      })
    },
  },
})
