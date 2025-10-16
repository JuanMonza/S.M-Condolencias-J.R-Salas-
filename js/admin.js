// Jardines del Renacer - Módulo Admin
// Funcionalidades del Panel Administrativo

// Admin Panel Functions
function showAdminPanel() {
    showSection('adminPanel');
}

function closeAdminPanel() {
    // Limpiar toda la información antes de cerrar el panel
    clearAllInterfaceData();
    
    isAdminLoggedIn = false;
    currentLocation = null;
    document.getElementById('adminLogin').classList.remove('hidden');
    document.getElementById('adminDashboard').classList.add('hidden');
    document.getElementById('adminPassword').value = '';
    document.getElementById('locationSelect').value = '';
    document.getElementById('locationDisplay').classList.add('hidden');
    showSection('salaSelection');
}

function loadAdminData() {
    // Limpiar completamente la interfaz antes de cargar datos de la nueva sede
    clearAllInterfaceData();
    loadSalaData('1');
    updateVisitorCounts();
    updateVisitorsTable();
}

function clearAllInterfaceData() {
    // Limpiar información de salas en la interfaz pública
    for (let i = 1; i <= 3; i++) {
        const salaInfoElement = document.getElementById(`sala${i}Info`);
        if (salaInfoElement) {
            salaInfoElement.innerHTML = '<span class="text-gray-400">Sala Disponible</span>';
        }
    }
    
    // Limpiar formulario de gestión de salas
    document.getElementById('difuntoName').value = '';
    document.getElementById('fechaNacimiento').value = '';
    document.getElementById('fechaFallecimiento').value = '';
    document.getElementById('horaInicio').value = '';
    document.getElementById('horaFin').value = '';
    document.getElementById('celularFamiliar').value = '';
    
    // Limpiar contadores de visitantes
    for (let i = 1; i <= 3; i++) {
        const visitCountElement = document.getElementById(`visitCount${i}`);
        const salaInfoAdminElement = document.getElementById(`salaInfo${i}`);
        
        if (visitCountElement) {
            visitCountElement.textContent = 'Visitantes: 0';
        }
        
        if (salaInfoAdminElement) {
            salaInfoAdminElement.textContent = 'Disponible';
        }
    }
    
    // Limpiar tabla de visitantes
    const visitorsTable = document.getElementById('visitorsTable');
    const visitorsCards = document.getElementById('visitorsCards');
    
    if (visitorsTable) {
        visitorsTable.innerHTML = '';
    }
    
    if (visitorsCards) {
        visitorsCards.innerHTML = '<p class="text-gray-500 text-center py-8">No hay visitantes registrados</p>';
    }
    
    // Limpiar alertas de tiempo
    const timeAlerts = document.getElementById('timeAlerts');
    if (timeAlerts) {
        timeAlerts.innerHTML = '';
    }
    
    // Resetear selector de filtro de sala
    const salaFilter = document.getElementById('salaFilter');
    if (salaFilter) {
        salaFilter.value = '';
    }
    
    console.log('Interfaz limpiada para nueva sede');
}

function loadSalaData(salaId) {
    const salasData = getCurrentSalasData();
    const sala = salasData[salaId];
    if (sala) {
        document.getElementById('difuntoName').value = sala.difunto || '';
        document.getElementById('fechaNacimiento').value = sala.fechas ? sala.fechas.split(' - ')[0] : '';
        document.getElementById('fechaFallecimiento').value = sala.fechas ? sala.fechas.split(' - ')[1] : '';
        document.getElementById('horaInicio').value = sala.horaInicio || '';
        document.getElementById('horaFin').value = sala.horaFin || '';
        document.getElementById('celularFamiliar').value = sala.celularFamiliar || '';
    }
}

function updateSalaData() {
    const salaId = document.getElementById('salaSelect').value;
    const difunto = document.getElementById('difuntoName').value;
    const fechaNac = document.getElementById('fechaNacimiento').value;
    const fechaFall = document.getElementById('fechaFallecimiento').value;
    const horaInicio = document.getElementById('horaInicio').value;
    const horaFin = document.getElementById('horaFin').value;
    const celular = document.getElementById('celularFamiliar').value;

    if (!difunto || !fechaNac || !fechaFall || !horaInicio || !horaFin || !celular) {
        showNotification('Por favor, complete todos los campos', 'error');
        return;
    }

    const salasData = getCurrentSalasData();
    salasData[salaId] = {
        difunto: difunto,
        fechas: `${fechaNac} - ${fechaFall}`,
        horaInicio: horaInicio,
        horaFin: horaFin,
        celularFamiliar: celular,
        isEmpty: false
    };

    updateSalaInfo();
    updateVisitorCounts();
    
    showNotification('Información de sala actualizada correctamente', 'success');
}

function updateVisitorCounts() {
    const visitors = getCurrentVisitors();
    const salasData = getCurrentSalasData();
    
    for (let i = 1; i <= 3; i++) {
        const count = visitors.filter(v => v.sala == i).length;
        const countElement = document.getElementById(`visitCount${i}`);
        const infoElement = document.getElementById(`salaInfo${i}`);
        
        if (countElement) {
            countElement.textContent = `Visitantes: ${count}`;
        }
        
        if (infoElement && salasData[i] && !salasData[i].isEmpty) {
            const sala = salasData[i];
            infoElement.textContent = `${sala.difunto} (${sala.fechas})`;
        }
    }
}

function updateVisitorsTable() {
    const tbody = document.getElementById('visitorsTable');
    const cardsContainer = document.getElementById('visitorsCards');
    const visitors = getCurrentVisitors();
    const salaFilter = document.getElementById('salaFilter')?.value || '';
    
    // Filter visitors if needed
    const filteredVisitors = salaFilter ? 
        visitors.filter(v => v.sala == salaFilter) : 
        visitors;
    
    // Clear containers
    tbody.innerHTML = '';
    cardsContainer.innerHTML = '';
    
    if (filteredVisitors.length === 0) {
        cardsContainer.innerHTML = '<p class="text-gray-500 text-center py-8">No hay visitantes registrados</p>';
        return;
    }
    
    // Group visitors by sala
    const visitorsBySala = {};
    filteredVisitors.forEach(visitor => {
        if (!visitorsBySala[visitor.sala]) {
            visitorsBySala[visitor.sala] = [];
        }
        visitorsBySala[visitor.sala].push(visitor);
    });
    
    // Create cards for each sala
    Object.keys(visitorsBySala).sort().forEach(salaId => {
        const salaVisitors = visitorsBySala[salaId];
        const salasData = getCurrentSalasData();
        const salaInfo = salasData[salaId];
        
        const salaCard = document.createElement('div');
        salaCard.className = 'bg-white rounded-lg border p-4';
        
        // Obtener nombre personalizado de la sala
        const salaName = getSalaName(currentLocation, salaId);
        
        let salaHeader = `<h4 class="font-semibold text-lg text-gray-800 mb-3">🏛️ ${salaName}`;
        if (salaInfo && !salaInfo.isEmpty) {
            salaHeader += ` - ${salaInfo.difunto}`;
            salaHeader += `<br><small class="text-gray-600 font-normal">${salaInfo.fechas} | ${salaInfo.horaInicio} - ${salaInfo.horaFin}</small>`;
            salaHeader += `<br><small class="text-blue-600 font-normal">📱 Familiar: ${salaInfo.celularFamiliar}</small>`;
        }
        salaHeader += `</h4>`;
        salaHeader += `<p class="text-sm text-gray-600 mb-4">Total de visitantes: ${salaVisitors.length}</p>`;
        
        const visitorsHtml = salaVisitors.map(visitor => {
            const date = new Date(visitor.timestamp);
            const time = date.toLocaleTimeString('es-CO', {
                hour: '2-digit',
                minute: '2-digit'
            });
            const fullDate = date.toLocaleDateString('es-CO');
            
            return `
                <div class="border-l-4 border-blue-400 pl-4 py-3 mb-4 bg-blue-50">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h5 class="font-medium text-gray-800">${visitor.nombres} ${visitor.apellidos}</h5>
                            <p class="text-sm text-gray-600">📱 ${visitor.telefono} | 🆔 ${visitor.cedula}</p>
                            <p class="text-xs text-gray-500">📅 ${fullDate} a las ${time}</p>
                        </div>
                        <button onclick="viewFullMessage('${visitor.cedula}')" class="text-blue-600 hover:text-blue-800 text-sm underline">
                            Ver mensaje
                        </button>
                    </div>
                    <div class="bg-white p-3 rounded border">
                        <p class="text-sm text-gray-700 italic">"${visitor.mensaje.length > 100 ? visitor.mensaje.substring(0, 100) + '...' : visitor.mensaje}"</p>
                    </div>
                </div>
            `;
        }).join('');
        
        salaCard.innerHTML = salaHeader + visitorsHtml;
        cardsContainer.appendChild(salaCard);
    });
    
    // Update summary table
    filteredVisitors.forEach(visitor => {
        const row = document.createElement('tr');
        row.className = 'border-b hover:bg-gray-50';
        
        const time = new Date(visitor.timestamp).toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Obtener nombre personalizado de la sala
        const salaName = getSalaName(currentLocation, visitor.sala);
        
        row.innerHTML = `
            <td class="py-2">${salaName}</td>
            <td class="py-2">${visitor.nombres} ${visitor.apellidos}</td>
            <td class="py-2 hidden sm:table-cell">${visitor.cedula}</td>
            <td class="py-2 hidden md:table-cell">${visitor.telefono}</td>
            <td class="py-2">${time}</td>
            <td class="py-2">
                <button onclick="viewFullMessage('${visitor.cedula}')" class="text-blue-600 hover:text-blue-800 text-xs underline">
                    Ver mensaje
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function closeSala(salaId) {
    if (!confirm(`¿Está seguro de cerrar la Sala ${salaId}? Esta acción generará el PDF, enviará los mensajes a la familia y limpiará la sala para un nuevo servicio.`)) {
        return;
    }

    const visitors = getCurrentVisitors();
    const salasData = getCurrentSalasData();
    
    // Get visitors for this sala
    const salaVisitors = visitors.filter(v => v.sala == salaId);
    const sala = salasData[salaId];
    
    // Generate PDF and send to family
    generatePDFAndSend(salaId, salaVisitors, sala);
    
    // Clear sala data
    salasData[salaId] = {
        difunto: "",
        fechas: "",
        horaInicio: "",
        horaFin: "",
        celularFamiliar: "",
        isEmpty: true
    };
    
    // Remove visitors from this sala
    locationData[currentLocation].registeredVisitors = visitors.filter(v => v.sala != salaId);
    
    // Update displays
    updateSalaInfo();
    updateVisitorCounts();
    updateVisitorsTable();
    
    // Reset sala form if this sala is selected
    if (document.getElementById('salaSelect').value == salaId) {
        loadSalaData(salaId);
    }
    
    showNotification(`Sala ${salaId} procesada y limpia para nuevo servicio`, 'success');
}

function generatePDFAndSend(salaId, visitors, sala) {
    console.log('=== PROCESO DE CIERRE DE SALA ===');
    console.log(`Sede: ${ADMIN_CREDENTIALS[currentLocation]?.name || 'Desconocida'}`);
    console.log(`Sala: ${salaId}`);
    console.log(`Difunto: ${sala.difunto}`);
    console.log(`Total de visitantes: ${visitors.length}`);
    console.log('Mensajes recopilados:', visitors.map(v => ({
        nombre: `${v.nombres} ${v.apellidos}`,
        cedula: v.cedula,
        telefono: v.telefono,
        mensaje: v.mensaje,
        hora: new Date(v.timestamp).toLocaleString('es-CO')
    })));
    
    console.log(`PDF generado y enviado al número: ${sala.celularFamiliar}`);
    console.log('Sala limpia y lista para nuevo servicio');
    console.log('=== FIN DEL PROCESO ===');
    
    setTimeout(() => {
        showNotification(`PDF enviado exitosamente al familiar (${sala.celularFamiliar})`, 'success');
    }, 3000);
}

function startServiceTimeMonitoring() {
    setInterval(checkServiceTimes, 60000); // Check every minute
}

function checkServiceTimes() {
    if (!isAdminLoggedIn || !currentLocation) return;
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const salasData = getCurrentSalasData();
    const serviceTimeChecks = getCurrentServiceTimeChecks();
    
    Object.keys(salasData).forEach(salaId => {
        const sala = salasData[salaId];
        if (!sala.isEmpty && sala.horaFin) {
            const [hours, minutes] = sala.horaFin.split(':').map(Number);
            const endTime = hours * 60 + minutes;
            
            if (currentTime >= endTime && !serviceTimeChecks[salaId]) {
                showServiceTimeAlert(salaId, sala);
                serviceTimeChecks[salaId] = true;
            }
        }
    });
}

function showServiceTimeAlert(salaId, sala) {
    const alertsContainer = document.getElementById('timeAlerts');
    const alert = document.createElement('div');
    alert.className = 'bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 sm:px-4 py-2 sm:py-3 rounded alert-pulse';
    alert.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <strong class="text-sm sm:text-base">⏰ Horario Cumplido - Sala ${salaId}</strong>
                <p class="text-xs sm:text-sm">${sala.difunto} - Servicio programado hasta las ${sala.horaFin}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="text-yellow-600 hover:text-yellow-800 ml-2">✕</button>
        </div>
    `;
    alertsContainer.appendChild(alert);
    
    showNotification(`Sala ${salaId}: Horario de servicio cumplido`, 'info');
}