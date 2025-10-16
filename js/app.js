// Jardines del Renacer - Sistema de Condolencias
// Archivo principal de JavaScript

// Variables globales
let selectedSala = null;
let personalData = {};
let isAdminLoggedIn = false;
let currentLocation = null;

// Configuración de nombres de salas por sede
const salaNames = {
    "bogota": {
        1: "Bogotá Principal",
        2: "Bogotá Norte", 
        3: "Bogotá Sur"
    },
    "pereira": {
        1: "Risaralda",
        2: "Pereira Centro",
        3: "Pereira Norte"
    },
    "medellin": {
        1: "Medellín Principal",
        2: "Antioquia",
        3: "Medellín Oriente"
    },
    "cali": {
        1: "Cali Principal",
        2: "Valle del Cauca",
        3: "Cali Norte"
    },
    "barranquilla": {
        1: "Barranquilla Principal",
        2: "Atlántico",
        3: "Barranquilla Norte"
    },
    "cartagena": {
        1: "Cartagena Principal",
        2: "Bolívar",
        3: "Cartagena Histórica"
    },
    "bucaramanga": {
        1: "Bucaramanga Principal",
        2: "Santander",
        3: "Bucaramanga Norte"
    },
    "manizales": {
        1: "Manizales Principal",
        2: "Caldas",
        3: "Manizales Norte"
    },
    "ibague": {
        1: "Ibagué Principal",
        2: "Tolima",
        3: "Ibagué Norte"
    },
    "pasto": {
        1: "Pasto Principal",
        2: "Nariño",
        3: "Pasto Norte"
    }
};

// Data storage by location - each location has completely isolated data
const locationData = {
    "bogota": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    },
    "medellin": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    },
    "cali": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    },
    "barranquilla": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    },
    "cartagena": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    },
    "bucaramanga": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    },
    "pereira": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    },
    "manizales": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    },
    "ibague": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    },
    "cucuta": {
        registeredVisitors: [],
        serviceTimeChecks: {},
        salasData: {
            1: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            2: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true },
            3: { difunto: "", fechas: "", horaInicio: "", horaFin: "", celularFamiliar: "", isEmpty: true }
        }
    }
};

// Admin credentials by location (in production, this should be handled securely)
const ADMIN_CREDENTIALS = {
    "bogota": { password: "bog2024", name: "Bogotá - Sede Principal" },
    "medellin": { password: "med2024", name: "Medellín - Sede Norte" },
    "cali": { password: "cal2024", name: "Cali - Sede Valle" },
    "barranquilla": { password: "baq2024", name: "Barranquilla - Sede Costa" },
    "cartagena": { password: "ctg2024", name: "Cartagena - Sede Bolivar" },
    "bucaramanga": { password: "bga2024", name: "Bucaramanga - Sede Santander" },
    "pereira": { password: "per2024", name: "Pereira - Sede Risaralda" },
    "manizales": { password: "man2024", name: "Manizales - Sede Caldas" },
    "ibague": { password: "iba2024", name: "Ibagué - Sede Tolima" },
    "cucuta": { password: "cuc2024", name: "Cúcuta - Sede Norte Santander" }
};

// Helper functions to get current location data
function getCurrentSalasData() {
    return currentLocation ? locationData[currentLocation].salasData : {};
}

function getCurrentVisitors() {
    return currentLocation ? locationData[currentLocation].registeredVisitors : [];
}

function getCurrentServiceTimeChecks() {
    return currentLocation ? locationData[currentLocation].serviceTimeChecks : {};
}

// Función para obtener el nombre de una sala
function getSalaName(sede, salaNumber) {
    if (salaNames[sede] && salaNames[sede][salaNumber]) {
        return salaNames[sede][salaNumber];
    }
    return `Sala ${salaNumber}`;
}

// Función para detectar parámetros de URL del QR
function detectQRParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const sedeParam = urlParams.get('sede');
    const salaParam = urlParams.get('sala');
    
    if (sedeParam && salaParam && locationData[sedeParam]) {
        // Configurar automáticamente la sede y sala desde el QR
        currentLocation = sedeParam;
        selectedSala = salaParam;
        
        // Mostrar mensaje de bienvenida personalizado
        const salaName = getSalaName(sedeParam, salaParam);
        const sedeFullName = ADMIN_CREDENTIALS[sedeParam]?.name || sedeParam.toUpperCase();
        
        // Crear elemento de bienvenida
        showQRWelcomeMessage(sedeFullName, salaName);
        
        // Ir directamente al formulario personal
        setTimeout(() => {
            showSection('personalForm');
        }, 2000);
        
        return true;
    }
    
    return false;
}

// Mostrar mensaje de bienvenida cuando se accede desde QR
function showQRWelcomeMessage(sedeName, salaName) {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center z-50';
    
    welcomeDiv.innerHTML = `
        <div class="text-center text-white p-8 relative z-10">
            <div class="mb-6">
                <h1 class="text-4xl font-bold mb-4 glass-shimmer">🏛️ Jardines del Renacer</h1>
                <div class="glass-effect rounded-xl p-8 border border-white border-opacity-20 glass-shimmer">
                    <div class="mb-4">
                        <div class="text-6xl mb-4">🕊️</div>
                        <h2 class="text-2xl font-semibold mb-2">Bienvenido a:</h2>
                        <h3 class="text-4xl font-bold text-blue-300 mb-3 drop-shadow-lg">${salaName}</h3>
                        <p class="text-xl opacity-90 text-gray-200">${sedeName}</p>
                    </div>
                    <div class="flex justify-center items-center space-x-4 mt-6">
                        <span class="text-2xl">✨</span>
                        <span class="text-lg">Con respeto y cariño</span>
                        <span class="text-2xl">✨</span>
                    </div>
                </div>
            </div>
            <div class="animate-pulse glass-card rounded-lg p-4">
                <p class="text-lg text-gray-200">🌸 Preparando espacio para sus condolencias...</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(welcomeDiv);
    
    // Remover el mensaje después de 2 segundos
    setTimeout(() => {
        welcomeDiv.remove();
    }, 2000);
}

// Prevenir scroll automático y optimizar rendimiento
function preventAutoScroll() {
    // Estabilizar scroll completamente
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Eliminar cualquier elemento que pueda interferir con el scroll
    const body = document.body;
    body.style.contain = 'layout style paint';
    body.style.isolation = 'isolate';
    
    // Asegurar que el scroll no se mueva automáticamente
    let isUserScrolling = false;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        isUserScrolling = true;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isUserScrolling = false;
        }, 100);
    }, { passive: true });
    
    // Prevenir scroll programático no deseado
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(x, y) {
        if (isUserScrolling || arguments.length === 0) {
            originalScrollTo.apply(this, arguments);
        }
    };
}

// Initialize the application
function initializeApp() {
    // Prevenir problemas de scroll primero
    preventAutoScroll();
    
    // Primero detectar si viene desde QR
    if (!detectQRParameters()) {
        // Si no viene desde QR, mostrar selección normal
        updateSalaInfo();
    }
    setupEventListeners();
    startServiceTimeMonitoring();
    
    // Inicializar efectos visuales de manera optimizada
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            initializeVisualEffects();
        });
    } else {
        setTimeout(initializeVisualEffects, 200);
    }
}

// Limpiar elementos de plumas existentes
function cleanupFeathers() {
    // Eliminar cualquier contenedor de plumas existente
    const feathersContainers = document.querySelectorAll('.feathers-container');
    feathersContainers.forEach(container => container.remove());
    
    // Eliminar plumas individuales
    const feathers = document.querySelectorAll('.feather');
    feathers.forEach(feather => feather.remove());
}

// Inicializar efectos visuales únicos (cristal y partículas)
function initializeVisualEffects() {
    cleanupFeathers(); // Limpiar elementos de plumas
    createCrystalParticles();
    applyAdvancedGlassEffects();
    initializeInteractiveElements();
}

// Crear sistema de partículas cristalinas únicas
function createCrystalParticles() {
    const container = document.getElementById('crystalParticles');
    if (!container) return;
    
    function createParticle() {
        if (particleCount >= maxParticles) return; // Prevenir exceso de partículas
        
        const particle = document.createElement('div');
        particle.className = 'crystal-particle';
        
        // Propiedades aleatorias para cada partícula
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.willChange = 'transform'; // Optimización de rendimiento
        
        // Tamaño variable
        const size = Math.random() * 3 + 2; // Partículas más pequeñas
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Colores cristalinos variables
        const colors = [
            'rgba(255, 255, 255, 0.7)',
            'rgba(59, 130, 246, 0.5)',
            'rgba(147, 197, 253, 0.6)',
            'rgba(219, 234, 254, 0.4)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
        
        container.appendChild(particle);
        particleCount++;
        
        // Remover partícula después de la animación
        setTimeout(() => {
            if (particle && particle.parentNode) {
                particle.parentNode.removeChild(particle);
                particleCount--;
            }
        }, 15000); // Tiempo de vida reducido
    }
    
    // Crear partículas de manera controlada
    let particleCount = 0;
    const maxParticles = 8; // Reducir número máximo de partículas
    
    const particleInterval = setInterval(() => {
        if (particleCount < maxParticles) {
            createParticle();
        }
    }, 1200); // Menos frecuente para evitar problemas de rendimiento
    
    // Crear partículas iniciales de manera controlada
    for (let i = 0; i < 6; i++) {
        setTimeout(createParticle, i * 800);
    }
}

// Sistema avanzado de efectos de cristal
function applyAdvancedGlassEffects() {
    const body = document.body;
    if (!body.classList.contains('crystal-enhanced')) {
        body.classList.add('crystal-enhanced');
        body.style.position = 'relative';
    }
    
    setTimeout(() => {
        // Aplicar cristal ultra a elementos principales
        const mainCards = document.querySelectorAll('.card-shadow');
        mainCards.forEach(card => {
            card.classList.add('ultra-glass', 'depth-glass');
        });
        
        // Botones con cristal premium
        const buttons = document.querySelectorAll('.sala-btn');
        buttons.forEach((button, index) => {
            button.classList.add('premium-glass', 'glass-shimmer');
            button.style.animationDelay = (index * 0.2) + 's';
        });
        
        // Formularios con cristal avanzado
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.classList.add('glass-card', 'floating-glass');
        });
        
        // Inputs con efectos cristalinos
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.style.background = 'rgba(255, 255, 255, 0.1)';
            input.style.backdropFilter = 'blur(10px)';
            input.style.border = '1px solid rgba(255, 255, 255, 0.3)';
            input.style.color = '#1f2937';
            
            input.addEventListener('focus', function() {
                this.style.background = 'rgba(255, 255, 255, 0.2)';
                this.style.borderColor = 'rgba(59, 130, 246, 0.6)';
                this.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
            });
            
            input.addEventListener('blur', function() {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                this.style.boxShadow = 'none';
            });
        });
    }, 100);
}

// Elementos interactivos mejorados
function initializeInteractiveElements() {
    // Efecto de ondas al hacer clic
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('glass-button') || e.target.closest('.glass-button')) {
            createRippleEffect(e);
        }
    });
    
    // Efectos de hover mejorados
    const interactiveElements = document.querySelectorAll('.glass-button, .premium-glass');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
            this.style.filter = 'brightness(1.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.filter = 'brightness(1)';
        });
    });
}

// Crear efecto de ondas cristalinas
function createRippleEffect(e) {
    const ripple = document.createElement('div');
    const target = e.target.closest('.glass-button') || e.target;
    const rect = target.getBoundingClientRect();
    
    ripple.style.position = 'absolute';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'crystal-ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    
    target.style.position = 'relative';
    target.style.overflow = 'hidden';
    target.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple && ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Agregar animación CSS para las ondas
const style = document.createElement('style');
style.textContent = `
    @keyframes crystal-ripple {
        to {
            transform: scale(4);
            opacity: 0;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        }
    }
`;
document.head.appendChild(style);

// Mostrar mensaje de éxito con efectos especiales
function showSuccessWithEffects() {
    // Crear explosión de plumas especiales
    createSuccessFeathers();
    
    // Mostrar la sección de éxito
    showSection('successMessage');
    
    // Añadir efecto cristal al mensaje de éxito
    setTimeout(() => {
        const successSection = document.getElementById('successMessage');
        if (successSection) {
            successSection.classList.add('glass-card', 'glass-shimmer');
        }
    }, 100);
}

// Crear plumas especiales para el éxito
function createSuccessFeathers() {
    const feathersContainer = document.querySelector('.feathers-container') || document.body;
    const successSymbols = ['🌟', '✨', '💫', '🌸', '🕊️', '🤍', '💙'];
    
    // Crear 20 símbolos especiales
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const feather = document.createElement('div');
            feather.className = 'feather';
            feather.textContent = successSymbols[Math.floor(Math.random() * successSymbols.length)];
            
            feather.style.left = Math.random() * 100 + '%';
            feather.style.fontSize = (Math.random() * 20 + 20) + 'px';
            feather.style.animationDuration = (Math.random() * 3 + 4) + 's';
            feather.style.opacity = Math.random() * 0.4 + 0.6;
            feather.style.color = `hsl(${Math.random() * 60 + 200}, 70%, 80%)`;
            
            feathersContainer.appendChild(feather);
            
            setTimeout(() => {
                if (feather && feather.parentNode) {
                    feather.parentNode.removeChild(feather);
                }
            }, 8000);
        }, i * 100);
    }
}

// Update sala information display
function updateSalaInfo() {
    const salasData = getCurrentSalasData();
    Object.keys(salasData).forEach(salaId => {
        const info = salasData[salaId];
        const element = document.getElementById(`sala${salaId}Info`);
        const titleElement = document.getElementById(`sala${salaId}Title`);
        const buttonTitleElement = document.getElementById(`sala${salaId}ButtonTitle`);
        
        // Actualizar títulos de la sala con nombres personalizados
        if (currentLocation) {
            const salaName = getSalaName(currentLocation, salaId);
            
            // Actualizar título en el panel admin
            if (titleElement) {
                titleElement.textContent = salaName;
            }
            
            // Actualizar título en los botones de selección
            if (buttonTitleElement) {
                buttonTitleElement.textContent = salaName;
            }
        }
        
        if (element) {
            if (info.isEmpty) {
                element.innerHTML = '<span class="text-gray-400">Sala Disponible</span>';
            } else {
                element.innerHTML = `<strong>${info.difunto}</strong><br><small>${info.fechas}</small><br><small>${info.horaInicio} - ${info.horaFin}</small>`;
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Character counter for message
    const messageTextarea = document.getElementById('mensaje');
    const charCount = document.getElementById('charCount');
    
    messageTextarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        if (count > 500) {
            this.value = this.value.substring(0, 500);
            charCount.textContent = 500;
        }
        
        if (count > 450) {
            charCount.style.color = '#ef4444';
        } else {
            charCount.style.color = '#6b7280';
        }
    });

    // Personal data form submission
    document.getElementById('personalDataForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        personalData = {
            nombres: formData.get('nombres'),
            apellidos: formData.get('apellidos'),
            telefono: formData.get('telefono'),
            cedula: formData.get('cedula'),
            sala: selectedSala
        };
        
        if (validatePersonalData(personalData)) {
            if (checkDuplicateVisitor(personalData.cedula)) {
                showNotification('Esta cédula ya está registrada en el sistema. No puede registrarse nuevamente.', 'error');
                return;
            }
            showSection('messageForm');
        }
    });

    // Message form submission
    document.getElementById('condolenceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (mensaje.length < 10) {
            showNotification('Por favor, escriba un mensaje más detallado (mínimo 10 caracteres)', 'error');
            return;
        }
        
        submitCondolence(mensaje);
    });

    // Admin login form
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const location = document.getElementById('locationSelect').value;
        const password = document.getElementById('adminPassword').value;
        
        if (!location) {
            showNotification('Por favor, seleccione una sede', 'error');
            return;
        }
        
        if (ADMIN_CREDENTIALS[location] && ADMIN_CREDENTIALS[location].password === password) {
            isAdminLoggedIn = true;
            currentLocation = location;
            document.getElementById('adminLogin').classList.add('hidden');
            document.getElementById('adminDashboard').classList.remove('hidden');
            document.getElementById('currentLocationName').textContent = ADMIN_CREDENTIALS[location].name;
            document.getElementById('locationDisplay').textContent = ADMIN_CREDENTIALS[location].name;
            document.getElementById('locationDisplay').classList.remove('hidden');
            loadAdminData();
            showNotification('Acceso administrativo concedido', 'success');
        } else {
            showNotification('Credenciales incorrectas', 'error');
        }
    });

    // Sala management form
    document.getElementById('salaManagementForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateSalaData();
    });

    // Sala selector change
    document.getElementById('salaSelect').addEventListener('change', function() {
        loadSalaData(this.value);
    });
}

// Select sala - now allows selection of any room
function selectSala(salaNumber) {
    selectedSala = salaNumber;
    
    // Visual feedback
    document.querySelectorAll('.sala-btn').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-blue-300');
    });
    
    event.target.closest('.sala-btn').classList.add('ring-4', 'ring-blue-300');
    
    setTimeout(() => {
        showSection('personalForm');
    }, 300);
}

// Show specific section
function showSection(sectionId) {
    const sections = ['salaSelection', 'personalForm', 'messageForm', 'successMessage', 'adminPanel'];
    
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (id === sectionId) {
            element.classList.remove('hidden');
            element.classList.add('fade-in');
        } else {
            element.classList.add('hidden');
            element.classList.remove('fade-in');
        }
    });
}

// Go back to previous section
function goBack(sectionId) {
    showSection(sectionId);
}

// Validate personal data
function validatePersonalData(data) {
    if (!data.nombres || data.nombres.length < 2) {
        showNotification('Por favor, ingrese un nombre válido', 'error');
        return false;
    }
    
    if (!data.apellidos || data.apellidos.length < 2) {
        showNotification('Por favor, ingrese apellidos válidos', 'error');
        return false;
    }
    
    if (!data.telefono || !/^\d{10}$/.test(data.telefono.replace(/\D/g, ''))) {
        showNotification('Por favor, ingrese un número de teléfono válido (10 dígitos)', 'error');
        return false;
    }
    
    if (!data.cedula || data.cedula.length < 6) {
        showNotification('Por favor, ingrese un número de cédula válido', 'error');
        return false;
    }
    
    return true;
}

// Check for duplicate visitor by cedula
function checkDuplicateVisitor(cedula) {
    const visitors = getCurrentVisitors();
    return visitors.some(visitor => visitor.cedula === cedula);
}

// Submit condolence message
async function submitCondolence(mensaje) {
    try {
        const submitBtn = document.querySelector('#condolenceForm button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Enviando... ⏳';
        submitBtn.disabled = true;
        
        const visitorData = {
            ...personalData,
            mensaje: mensaje,
            timestamp: new Date().toISOString(),
            id_sala_servicio: selectedSala,
            location: currentLocation || 'unknown'
        };
        
        // Add to current location's visitors
        if (currentLocation && locationData[currentLocation]) {
            locationData[currentLocation].registeredVisitors.push(visitorData);
        }
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Condolence submitted:', visitorData);
        
        updateVisitorCounts();
        updateVisitorsTable();
        
        showSuccessWithEffects();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    } catch (error) {
        console.error('Error submitting condolence:', error);
        showNotification('Error al enviar el mensaje. Por favor, intente nuevamente.', 'error');
        
        const submitBtn = document.querySelector('#condolenceForm button[type="submit"]');
        submitBtn.innerHTML = 'Enviar Condolencias 💐';
        submitBtn.disabled = false;
    }
}

// Reset form to start over
function resetForm() {
    selectedSala = null;
    personalData = {};
    
    document.getElementById('personalDataForm').reset();
    document.getElementById('condolenceForm').reset();
    document.getElementById('charCount').textContent = '0';
    
    document.querySelectorAll('.sala-btn').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-blue-300');
    });
    
    showSection('salaSelection');
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-3 sm:p-4 rounded-lg text-white z-50 max-w-sm text-sm sm:text-base ${
        type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', initializeApp);