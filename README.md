# Jardines del Renacer - Sistema de Condolencias

## 📁 Estructura del Proyecto

El proyecto ha sido reorganizado para tener una estructura más mantenible y escalable:

```
QR Piloto 2025/
├── index.html              # Archivo principal HTML (limpio, sin CSS/JS embebido)
├── index_original.html     # Backup del archivo original
├── css/
│   └── styles.css          # Estilos personalizados y responsive
├── js/
│   ├── app.js              # Funcionalidad principal de la aplicación
│   ├── admin.js            # Panel administrativo y gestión de salas
│   └── pdf-generator.js    # Generación de reportes PDF
└── assets/                 # Carpeta para imágenes y otros recursos
```

## 🚀 Funcionalidades

### Para Visitantes:
- ✅ Selección de sala
- ✅ Registro de información personal
- ✅ Envío de mensajes de condolencias
- ✅ Interfaz responsive para móviles

### Para Administradores:
- ✅ Panel de administración por sede
- ✅ Gestión de salas y servicios funerarios
- ✅ Monitoreo de visitantes en tiempo real
- ✅ Generación de reportes PDF
- ✅ Alertas de horarios de servicio

## 🔧 Archivos Principales

### `index.html`
- Estructura HTML limpia
- Enlaces a archivos CSS y JS externos
- Mantiene toda la funcionalidad visual

### `css/styles.css`
- Estilos personalizados
- Animaciones y efectos
- Media queries para diseño responsive

### `js/app.js`
- Funcionalidad principal
- Manejo de formularios
- Validaciones
- Variables globales y datos de ubicaciones

### `js/admin.js`
- Panel administrativo
- Gestión de salas
- Monitoreo de visitantes
- Control de horarios

### `js/pdf-generator.js`
- Generación de PDFs individuales
- Libros de condolencias por sala
- Reportes completos de visitantes

## 🏢 Sedes Configuradas

El sistema soporta múltiples sedes con credenciales específicas:

- **Bogotá** - Sede Principal
- **Medellín** - Sede Norte
- **Cali** - Sede Valle
- **Barranquilla** - Sede Costa
- **Cartagena** - Sede Bolívar
- **Bucaramanga** - Sede Santander
- **Pereira** - Sede Risaralda
- **Manizales** - Sede Caldas
- **Ibagué** - Sede Tolima
- **Cúcuta** - Sede Norte Santander

## 📱 Características Técnicas

- **Framework CSS**: Tailwind CSS (CDN)
- **Responsive Design**: Optimizado para móviles y escritorio
- **Almacenamiento**: LocalStorage del navegador
- **Formato de archivos**: TXT (compatibles como PDF)
- **Compatibilidad**: Navegadores modernos

## 🛠️ Instalación y Uso

1. **Abrir el archivo**: Simplemente abra `index.html` en un navegador web
2. **Acceso público**: Los visitantes pueden usar directamente la interfaz
3. **Acceso administrativo**: Clic en "Acceso Administrativo" en el pie de página

### Credenciales de Administrador (por sede):
- Bogotá: `bog2024`
- Medellín: `med2024`
- Cali: `cal2024`
- (etc., siguiendo el patrón `[códigoCiudad]2024`)

## 🔒 Seguridad

- Las credenciales están hardcodeadas para el prototipo
- En producción, implementar autenticación segura
- Los datos se almacenan localmente en el navegador

## 📈 Beneficios de la Nueva Estructura

✅ **Mantenibilidad**: Código separado por responsabilidades
✅ **Escalabilidad**: Fácil agregar nuevas funcionalidades
✅ **Reutilización**: Módulos independientes
✅ **Depuración**: Más fácil encontrar y corregir errores
✅ **Colaboración**: Múltiples desarrolladores pueden trabajar simultáneamente
✅ **Performance**: Carga más rápida y cache eficiente

## 🔄 Próximos Pasos Recomendados

1. **Backend Integration**: Conectar con una base de datos real
2. **Autenticación**: Sistema de usuarios más robusto
3. **PDF Real**: Integrar una librería como jsPDF o PDFKit
4. **Notificaciones**: Envío real de WhatsApp/SMS
5. **Reportes**: Dashboard avanzado con gráficos
6. **Backup**: Sistema de respaldo automático

---

*Sistema desarrollado para Jardines del Renacer © 2024*# 🏛️ Sistema de Condolencias - Jardines del Renacer

## 📋 Descripción
Sistema digital completo de condolencias para Jardines del Renacer, diseñado para gestionar múltiples sedes y salas de manera elegante y profesional.

## ✨ Características Principales

### 🎨 Diseño Visual
- **Efectos Cristal Premium**: Interfaz con efectos glass morphism de alta calidad
- **Diseño Responsivo**: Adaptable a móviles, tablets y desktop
- **Tema Azul-Gris**: Colores apropiados para el ambiente solemne
- **Animaciones Suaves**: Transiciones elegantes y profesionales

### 🏢 Multi-Sede
Sistema que soporta múltiples ubicaciones:
- **Bogotá**: 3 salas (Bogotá Principal, Bogotá Norte, Bogotá Sur)
- **Pereira**: 3 salas (Risaralda, Pereira Centro, Pereira Norte)  
- **Medellín**: 3 salas (Medellín Principal, Antioquia, Medellín Oriente)
- **Cali**: 3 salas (Cali Principal, Valle del Cauca, Cali Norte)
- **Barranquilla**: 3 salas (Barranquilla Principal, Atlántico, Barranquilla Norte)
- **Cartagena**: 3 salas (Cartagena Principal, Bolívar, Cartagena Histórica)
- **Bucaramanga**: 3 salas (Bucaramanga Principal, Santander, Bucaramanga Norte)
- **Manizales**: 3 salas (Manizales Principal, Caldas, Manizales Norte)
- **Ibagué**: 3 salas (Ibagué Principal, Tolima, Ibagué Norte)
- **Pasto**: 3 salas (Pasto Principal, Nariño, Pasto Centro)

### 🔗 Acceso por QR
- URLs personalizadas para cada sede
- Ejemplo: `index.html?sede=bogota&sala=1`
- Detección automática de parámetros QR
- Mensaje de bienvenida personalizado

### 📝 Funcionalidades
- **Registro de Visitantes**: Formulario completo de información personal
- **Mensajes de Condolencias**: Sistema de mensajes emotivos
- **Panel Administrativo**: Gestión completa del sistema
- **Generación de PDFs**: Reportes por sala y completos
- **Gestión de Salas**: Control de horarios y estado

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Efectos cristal, gradientes y animaciones
- **JavaScript**: Funcionalidad interactiva y gestión de datos  
- **Tailwind CSS**: Framework de utilidades CSS
- **PDF Generation**: Generación de reportes en PDF

## 📁 Estructura del Proyecto

```
/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos principales con efectos cristal
├── js/
│   ├── app.js            # Lógica principal de la aplicación
│   ├── admin.js          # Panel administrativo
│   └── pdf-generator.js  # Generación de PDFs
├── README.md             # Documentación
├── efectos-cristal-demo.html    # Demo de efectos
├── ejemplos-qr.html      # Ejemplos de URLs QR
└── esquema-colores.md    # Guía de colores
```

## 🚀 Cómo Usar

### Acceso Normal
1. Abrir `index.html` en el navegador
2. Seleccionar la sede y sala deseada
3. Completar información personal
4. Escribir mensaje de condolencias

### Acceso por QR
1. Generar QR con URL: `index.html?sede=NOMBRE_SEDE&sala=NUMERO`
2. Escanear QR desde móvil
3. El sistema detecta automáticamente la sede y sala
4. Continuar con el proceso normal

### Panel Administrativo
1. Hacer clic en "Acceso Administrativo" en el footer
2. Usar contraseña: `jardines2024`
3. Gestionar salas, visitantes y generar reportes

## 🎯 URLs de Ejemplo

```
# Bogotá - Sala 1
index.html?sede=bogota&sala=1

# Pereira - Sala 2  
index.html?sede=pereira&sala=2

# Medellín - Sala 3
index.html?sede=medellin&sala=3
```

## 🔧 Instalación y Desarrollo

1. **Clonar el repositorio**
```bash
git clone https://github.com/JuanMonza/S.M-Condolencias-J.R-Salas-.git
```

2. **Abrir en navegador**
```bash
# Servir localmente con servidor HTTP
python -m http.server 8000
# o usar Live Server en VS Code
```

3. **Acceder al sistema**
```
http://localhost:8000
```

## 📱 Compatibilidad

- ✅ Chrome/Edge (Recomendado)
- ✅ Firefox  
- ✅ Safari
- ✅ Móviles Android/iOS
- ✅ Tablets

## 🎨 Características de Diseño

- **Glass Morphism**: Efectos cristal con blur y transparencias
- **Gradientes**: Colores azul-gris elegantes
- **Micro-interacciones**: Botones con efectos hover
- **Tipografía**: Fuentes legibles y jerárquicas
- **Espaciado**: Diseño con respiración visual

## 📄 Licencia

© 2025 Jardines del Renacer - Sistema Digital de Condolencias

## 👥 Desarrollado por

**JuanMonza** - Sistema completo de condolencias digitales

---

*Para soporte técnico o consultas, contactar al administrador del sistema.*
