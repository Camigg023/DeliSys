# DeliSys
Sistema web administrativo para restaurante familiar

## Descripción

DeliSys es una plataforma de gestión integral para restaurantes que centraliza en un solo sistema el control de ventas, inventario, empleados y pedidos. Está diseñada para ser rápida, simple y confiable, permitiendo optimizar la operación diaria del negocio y mejorar la toma de decisiones en tiempo real.

---

## Tecnologías utilizadas

### Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Lucide React

### Backend
- Node.js + Express

### Base de datos / servicios
- Firebase Firestore

---

## Arquitectura

El proyecto está estructurado bajo una arquitectura modular basada en componentes y separación de responsabilidades:

* Presentación: componentes UI en React
* Lógica de negocio: hooks y servicios
* Capa de datos: integración con Firebase / APIs externas
* Configuración: variables de entorno y configuración global

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Node.js (>= 18)
* npm
* Git

---

## Instalación y ejecución local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar el proyecto en desarrollo

```bash
npm run dev
```

### 3. Abrir en el navegador

```
http://localhost:3000
```

---

## Ramas del proyecto

El flujo de trabajo se maneja con 3 ramas principales:

* main → producción
* develop → desarrollo activo
* stage → pruebas / staging

---


