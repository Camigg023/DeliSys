const admin = require('firebase-admin')

let app

function getFirebaseAdminApp() {
  if (app) return app

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    app = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    })
    return app
  }

  app = admin.initializeApp()
  return app
}

function getFirestore() {
  return getFirebaseAdminApp().firestore()
}

module.exports = { admin, getFirebaseAdminApp, getFirestore }
