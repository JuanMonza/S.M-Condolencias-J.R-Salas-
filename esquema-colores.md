# 🎨 Esquema de Colores - Jardines del Renacer

## 📋 Paleta Principal: Azul y Gris Profesional

### 🔵 **Colores Azules**
- **Azul Principal**: `#1e3a8a` (blue-800) - Navegación principal, títulos importantes
- **Azul Secundario**: `#3b82f6` (blue-600) - Botones primarios, acciones principales  
- **Azul Claro**: `#dbeafe` (blue-100) - Fondos de estado positivo, notificaciones
- **Azul Hover**: `#1e40af` (blue-700) - Estados hover de botones azules

### ⚫ **Colores Grises** 
- **Gris Oscuro**: `#1f2937` (gray-800) - Textos principales, elementos de contraste
- **Gris Medio**: `#374151` (gray-700) - Textos secundarios, bordes
- **Gris Claro**: `#6b7280` (gray-500) - Textos auxiliares, placeholders
- **Gris Muy Claro**: `#f9fafb` (gray-50) - Fondos de tarjetas, áreas de contenido

---

## 🎯 **Aplicación por Componentes**

### **🏛️ Selección de Salas**
- **Fondo**: Gris claro `bg-gray-50`
- **Hover**: Azul claro `hover:bg-blue-50`
- **Borde**: Gris `border-gray-300` → Azul `hover:border-blue-500`
- **Texto**: Gris oscuro `text-gray-700`

### **🔘 Botones Principales**
- **Primarios**: Azul `bg-blue-600 hover:bg-blue-700`
- **Secundarios**: Gris `bg-gray-600 hover:bg-gray-700`
- **Texto**: Blanco `text-white`

### **📊 Estados y Notificaciones**
- **Activo**: Azul claro `bg-blue-100 text-blue-800`
- **Disponible**: Gris claro `text-gray-400`
- **Información**: Azul `bg-blue-50 border-blue-200 text-blue-800`

### **🎭 Gradientes**
- **Fondo Principal**: `linear-gradient(135deg, #1e3a8a 0%, #1f2937 100%)`
  - De azul oscuro a gris oscuro
- **Mensaje QR**: `bg-gradient-to-br from-blue-900 to-gray-900`
  - Para pantalla de bienvenida QR

---

## 🔧 **Clases CSS Personalizadas**

### **En styles.css:**
```css
.bg-blue-primary { background-color: #1e3a8a; }
.bg-blue-secondary { background-color: #3b82f6; }
.bg-gray-primary { background-color: #374151; }
.text-blue-primary { color: #1e3a8a; }
.border-blue-primary { border-color: #1e3a8a; }
.hover-blue-effect:hover {
    background-color: #1e40af;
    transform: translateY(-2px);
    transition: all 0.3s ease;
}
```

---

## 📱 **Componentes Actualizados**

### ✅ **Ya Implementado:**
- [x] Botones de selección de sala (gris → azul hover)
- [x] Botones principales (verde → azul)
- [x] Estados de sala (verde → azul)
- [x] Botones administrativos (rojo → gris)
- [x] Notificaciones (verde → azul)
- [x] Gradiente de fondo (púrpura → azul-gris)
- [x] Mensaje de bienvenida QR (amarillo → azul)
- [x] Sombras con tinte azul

### 🎨 **Esquema Visual:**
```
🔵 Acciones Principales → Azul (#3b82f6)
⚫ Acciones Secundarias → Gris (#6b7280)
🔵 Estados Positivos → Azul Claro (#dbeafe)
⚫ Textos y Contenido → Grises (#374151, #6b7280)
🔵 Fondos Interactivos → Azul Suave (#f0f9ff)
```

---

## 💡 **Beneficios del Esquema Azul-Gris**

### **🏢 Profesionalismo**
- Colores corporativos serios y confiables
- Apropiado para servicios funerarios
- Transmite respeto y solemnidad

### **👁️ Usabilidad**
- Alto contraste para legibilidad
- Jerarquía visual clara
- Accesibilidad mejorada

### **🎯 Consistencia**
- Paleta limitada y cohesiva  
- Fácil mantenimiento
- Experiencia uniforme

### **📱 Responsividad**
- Funciona bien en dispositivos móviles
- Colores neutros universales
- Compatibilidad con modo oscuro futuro

---

*Esquema aplicado en todo el sistema: HTML, CSS, JavaScript y componentes dinámicos* ✨