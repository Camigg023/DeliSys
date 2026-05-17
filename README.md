# 🍽 DeliSys

Sistema web administrativo para restaurantes familiares.

DeliSys centraliza la gestión de ventas, inventario, empleados y pedidos en una plataforma moderna construida con React, Express y Firebase.

---

## 🚀 Tecnologías

### Frontend
- React + Vite
- Tailwind CSS
- React Router DOM
- Lucide React

### Backend
- Node.js
- Express

### Base de datos y servicios
- Firebase Firestore
- Firebase Authentication

---

## 🏗 Arquitectura

El proyecto implementa una arquitectura modular basada en features y principios de Clean Architecture.

```text
src/
├── config/
├── features/
├── services/
├── shared/
└── App.jsx
```

### Clean Architecture por módulo

```text
DOMAIN
├── entities/
├── repositories/
└── usecases/

DATA
├── datasources/
└── repositories/

PRESENTATION
├── components/
├── hooks/
└── pages/
```

---

## 📁 Estructura del Proyecto

```text
DeliSys/
├── server/                # Backend Express
├── src/                   # Frontend React
├── public/
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## 👥 Roles del Sistema

### 👨‍💼 Administrador
- Gestión de productos
- Gestión de empleados
- Gestión de inventario
- Reportes
- Alertas de vencimiento
- Gestión de horarios

### 💳 Cajero
- Registro de ventas
- Gestión de clientes
- Facturación
- Historial de ventas

---

## ✨ Funcionalidades

- Autenticación
- Dashboard administrativo
- Gestión de productos
- Gestión de ventas
- Gestión de clientes
- Gestión de empleados
- Inventario
- Facturación
- Alertas automáticas

---

## ⚙ Variables de Entorno

Copia `.env.example` como `.env`.

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

---

## 📦 Instalación

```bash
npm install
```

---

## ▶ Desarrollo

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:4000
```

---

## 🚀 Producción

```bash
npm run build
npm start
```

Aplicación completa:

```text
http://localhost:4000
```

---

## 🌿 Flujo Git

| Rama | Uso |
|---|---|
| main | Producción |
| develop | Desarrollo |

---

## 👨‍💻 Desarrolladores

- Martin Montoya
- Camila Gómez

---

## 🍽 DeliSys

Administración inteligente para restaurantes.