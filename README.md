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

*Sistema desarrollado para Jardines del Renacer © 2024*# S.M-Condolencias-J.R-Salas-
