🍽 DeliSys

Sistema web administrativo para restaurante familiar.

DeliSys es una plataforma de gestión integral para restaurantes que centraliza ventas, inventario, empleados y pedidos en un único sistema web moderno, rápido y escalable.

📋 Tabla de Contenidos
Stack Tecnológico
Arquitectura
Estructura del Proyecto
Roles del Sistema
Features
Sistema de Diseño
Requisitos Previos
Instalación y Ejecución
Variables de Entorno
Scripts Disponibles
Flujo de Trabajo Git
Licencia
🛠 Stack Tecnológico
Tecnología	Uso
React + Vite	Frontend SPA
Tailwind CSS	UI y estilos
React Router DOM	Navegación
Node.js + Express	Backend/API
Firebase Firestore	Base de datos
Firebase Auth	Autenticación
Lucide React	Iconografía
Concurrently	Ejecución simultánea
Nodemon	Desarrollo backend
🏗 Arquitectura

El proyecto implementa arquitectura modular basada en features y Clean Architecture.

src/
├── config/
├── features/
├── services/
├── shared/
└── App.jsx
Clean Architecture
┌─────────────────────────────────────────┐
│ DOMAIN                                  │
│ ├── entities/                           │
│ ├── repositories/                       │
│ └── usecases/                           │
├─────────────────────────────────────────┤
│ DATA                                    │
│ ├── datasources/                        │
│ └── repositories/                       │
├─────────────────────────────────────────┤
│ PRESENTATION                            │
│ ├── components/                         │
│ ├── hooks/                              │
│ └── pages/                              │
└─────────────────────────────────────────┘
📁 Estructura del Proyecto
DeliSys/
├── server/                 ← Backend Express
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── config/
│
├── src/                    ← Frontend React
│   ├── config/
│   ├── features/
│   ├── services/
│   ├── shared/
│   └── App.jsx
│
├── public/
├── .env
├── .env.example
├── package.json
└── README.md
👥 Roles del Sistema
Rol	Descripción
Admin	Gestión completa del sistema
Cajero	Gestión de ventas y clientes
Funcionalidades por Rol
👨‍💼 Admin
Gestión de empleados
Gestión de productos
Gestión de inventario
Alertas de vencimiento
Gestión de horarios
Reportes
💳 Cajero
Registro de ventas
Gestión de clientes
Facturación
Historial de ventas
✨ Features
Feature	Estado
Login	✅
Dashboard	✅
Gestión de productos	✅
Inventario	✅
Ventas	✅
Clientes	✅
Empleados	✅
Facturación	✅
Alertas	✅
🎨 Sistema de Diseño
Paleta de colores
Variable	Uso
Primary	Color principal DeliSys
Secondary	Acciones secundarias
Success	Confirmaciones
Error	Validaciones
Surface	Fondos
Outline	Bordes
📋 Requisitos Previos
Node.js >= 18
npm >= 10
Git
🚀 Instalación y Ejecución
1. Clonar repositorio
git clone URL_REPOSITORIO
cd DeliSys
2. Instalar dependencias
npm install
3. Configurar variables de entorno

Copiar:

.env.example

como:

.env
4. Variables de entorno
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
▶ Ejecutar en desarrollo
npm run dev

Frontend:

http://localhost:3000

Backend:

http://localhost:4000
🚀 Ejecutar en producción unificada
npm run build
npm start

Aplicación completa:

http://localhost:4000
📦 Scripts Disponibles
Script	Descripción
npm run dev	Desarrollo frontend + backend
npm run build	Build producción
npm start	Servidor Express
npm run lint	ESLint
🌿 Flujo de Trabajo Git
Rama	Propósito
main	Producción
develop	Desarrollo
stage	Staging
Convención de commits
feat:
fix:
refactor:
docs:
style:
chore:
🔐 Variables de Entorno
Variable	Requerida
VITE_FIREBASE_API_KEY	✅
VITE_FIREBASE_AUTH_DOMAIN	✅
VITE_FIREBASE_PROJECT_ID	✅
VITE_FIREBASE_STORAGE_BUCKET	✅
VITE_FIREBASE_MESSAGING_SENDER_ID	✅
VITE_FIREBASE_APP_ID	✅
📄 Licencia

MIT License.

👨‍💻 Desarrolladores
Martin Montoya
Camila Gómez


Administración inteligente para restaurantes.