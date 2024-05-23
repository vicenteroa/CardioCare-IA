import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'enqqy3',
  e2e: {
    supportFile: false,
    baseUrl: 'http://localhost:4321',
    screenshotsFolder: false
  }
})
