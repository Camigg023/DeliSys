/**
 * authService.js
 * Mock de autenticación — reemplazar por llamadas reales al backend / Firebase Auth cuando esté listo.
 */

const MOCK_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: 'Admin General',
    email: 'admin@delisys.com',
  },
  {
    id: 2,
    username: 'cajero',
    password: 'cajero123',
    role: 'cashier',
    name: 'Cajero Principal',
    email: 'cajero@delisys.com',
  },
]

/**
 * Simula un login con delay de red.
 * @param {string} username
 * @param {string} password
 * @returns {Promise<{id, username, role, name, email}>}
 */
export const loginService = async (username, password) => {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 900))

  const found = MOCK_USERS.find(
    (u) => u.username === username && u.password === password
  )

  if (!found) {
    throw new Error('Usuario o contraseña incorrectos')
  }

  // No retornar la contraseña
  const safeUser = { ...found }
  delete safeUser.password
  return safeUser
}

/**
 * Simula cierre de sesión.
 */
export const logoutService = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200))
}
