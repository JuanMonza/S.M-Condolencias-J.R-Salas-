// Jardines del Renacer - Módulo PDF
// Funcionalidades de generación de PDF y reportes

function viewFullMessage(cedula) {
    const visitors = getCurrentVisitors();
    const visitor = visitors.find(v => v.cedula === cedula);
    
    if (!visitor) {
        showNotification('Visitante no encontrado', 'error');
        return;
    }
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    const date = new Date(visitor.timestamp);
    const modalContent = `
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-semibold text-gray-800">Mensaje Completo</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 class="font-medium text-gray-800">${visitor.nombres} ${visitor.apellidos}</h4>
                <p class="text-sm text-gray-600">📱 ${visitor.telefono} | 🆔 ${visitor.cedula}</p>
                <p class="text-sm text-gray-600">🏛️ Sala ${visitor.sala}</p>
                <p class="text-xs text-gray-500">📅 ${date.toLocaleDateString('es-CO')} a las ${date.toLocaleTimeString('es-CO')}</p>
            </div>
            
            <div class="bg-white border rounded-lg p-4">
                <h5 class="font-medium text-gray-700 mb-2">Mensaje de Condolencias:</h5>
                <p class="text-gray-800 leading-relaxed">"${visitor.mensaje}"</p>
            </div>
            
            <div class="flex justify-end mt-4 space-x-2">
                <button onclick="generateSingleVisitorPDF('${visitor.cedula}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                    📄 Generar PDF Individual
                </button>
                <button onclick="this.closest('.fixed').remove()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
}

function generateSingleVisitorPDF(cedula) {
    const visitors = getCurrentVisitors();
    const visitor = visitors.find(v => v.cedula === cedula);
    
    if (!visitor) {
        showNotification('Visitante no encontrado', 'error');
        return;
    }
    
    const salasData = getCurrentSalasData();
    const salaInfo = salasData[visitor.sala];
    const date = new Date(visitor.timestamp);
    
    let pdfContent = `JARDINES DEL RENACER - MENSAJE DE CONDOLENCIAS\n`;
    pdfContent += `${'='.repeat(60)}\n\n`;
    pdfContent += `Sede: ${ADMIN_CREDENTIALS[currentLocation]?.name || 'Desconocida'}\n`;
    pdfContent += `Fecha de generación: ${new Date().toLocaleDateString('es-CO')}\n`;
    pdfContent += `Hora de generación: ${new Date().toLocaleTimeString('es-CO')}\n\n`;
    
    if (salaInfo && !salaInfo.isEmpty) {
        pdfContent += `INFORMACIÓN DEL SERVICIO:\n`;
        pdfContent += `Sala: ${visitor.sala}\n`;
        pdfContent += `Difunto: ${salaInfo.difunto}\n`;
        pdfContent += `Fechas: ${salaInfo.fechas}\n`;
        pdfContent += `Horario: ${salaInfo.horaInicio} - ${salaInfo.horaFin}\n`;
        pdfContent += `Contacto familiar: ${salaInfo.celularFamiliar}\n\n`;
    }
    
    pdfContent += `DATOS DEL VISITANTE:\n`;
    pdfContent += `Nombre completo: ${visitor.nombres} ${visitor.apellidos}\n`;
    pdfContent += `Cédula: ${visitor.cedula}\n`;
    pdfContent += `Teléfono: ${visitor.telefono}\n`;
    pdfContent += `Fecha de visita: ${date.toLocaleDateString('es-CO')}\n`;
    pdfContent += `Hora de registro: ${date.toLocaleTimeString('es-CO')}\n\n`;
    
    pdfContent += `MENSAJE DE CONDOLENCIAS:\n`;
    pdfContent += `${'='.repeat(60)}\n`;
    pdfContent += `"${visitor.mensaje}"\n`;
    pdfContent += `${'='.repeat(60)}\n\n`;
    
    pdfContent += `Este mensaje forma parte del libro digital de condolencias\n`;
    pdfContent += `que será entregado a la familia.\n\n`;
    pdfContent += `Jardines del Renacer - Sistema Digital de Condolencias\n`;
    pdfContent += `© 2024 - Todos los derechos reservados`;
    
    // Create and download file
    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `condolencia_${visitor.nombres}_${visitor.apellidos}_${date.toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('PDF individual generado y descargado', 'success');
}

function generateSalaPDF() {
    const salaFilter = document.getElementById('salaFilter')?.value;
    
    if (!salaFilter) {
        showNotification('Por favor, seleccione una sala específica para generar el PDF', 'error');
        return;
    }
    
    const visitors = getCurrentVisitors().filter(v => v.sala == salaFilter);
    const salasData = getCurrentSalasData();
    const salaInfo = salasData[salaFilter];
    
    if (visitors.length === 0) {
        showNotification(`No hay visitantes registrados en la Sala ${salaFilter}`, 'error');
        return;
    }
    
    let pdfContent = `JARDINES DEL RENACER - LIBRO DE CONDOLENCIAS\n`;
    pdfContent += `${'='.repeat(70)}\n\n`;
    pdfContent += `Sede: ${ADMIN_CREDENTIALS[currentLocation]?.name || 'Desconocida'}\n`;
    pdfContent += `Sala: ${salaFilter}\n`;
    
    if (salaInfo && !salaInfo.isEmpty) {
        pdfContent += `Difunto: ${salaInfo.difunto}\n`;
        pdfContent += `Fechas: ${salaInfo.fechas}\n`;
        pdfContent += `Horario del servicio: ${salaInfo.horaInicio} - ${salaInfo.horaFin}\n`;
        pdfContent += `Contacto familiar: ${salaInfo.celularFamiliar}\n`;
    }
    
    pdfContent += `Fecha de generación: ${new Date().toLocaleDateString('es-CO')}\n`;
    pdfContent += `Hora de generación: ${new Date().toLocaleTimeString('es-CO')}\n`;
    pdfContent += `Total de mensajes: ${visitors.length}\n\n`;
    pdfContent += `${'='.repeat(70)}\n\n`;
    
    // Sort visitors by timestamp
    visitors.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    visitors.forEach((visitor, index) => {
        const date = new Date(visitor.timestamp);
        pdfContent += `${index + 1}. MENSAJE DE CONDOLENCIAS\n`;
        pdfContent += `${'-'.repeat(50)}\n`;
        pdfContent += `De: ${visitor.nombres} ${visitor.apellidos}\n`;
        pdfContent += `Cédula: ${visitor.cedula}\n`;
        pdfContent += `Teléfono: ${visitor.telefono}\n`;
        pdfContent += `Fecha: ${date.toLocaleDateString('es-CO')}\n`;
        pdfContent += `Hora: ${date.toLocaleTimeString('es-CO')}\n\n`;
        pdfContent += `Mensaje:\n`;
        pdfContent += `"${visitor.mensaje}"\n\n`;
        pdfContent += `${'-'.repeat(50)}\n\n`;
    });
    
    pdfContent += `Este libro digital contiene todos los mensajes de condolencias\n`;
    pdfContent += `recibidos durante el servicio funerario.\n\n`;
    pdfContent += `Con cariño y respeto,\n`;
    pdfContent += `Jardines del Renacer\n`;
    pdfContent += `Sistema Digital de Condolencias\n`;
    pdfContent += `© 2024 - Todos los derechos reservados`;
    
    // Create and download file
    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    let filename = `libro_condolencias_sala_${salaFilter}`;
    if (salaInfo && !salaInfo.isEmpty) {
        filename += `_${salaInfo.difunto.replace(/\s+/g, '_')}`;
    }
    filename += `_${new Date().toISOString().split('T')[0]}.txt`;
    
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification(`Libro de condolencias de Sala ${salaFilter} generado y descargado`, 'success');
}

function generateVisitorsPDF() {
    const visitors = getCurrentVisitors();
    if (visitors.length === 0) {
        showNotification('No hay visitantes registrados para generar PDF', 'error');
        return;
    }
    
    const salasData = getCurrentSalasData();
    
    // Create PDF content
    let pdfContent = `JARDINES DEL RENACER - REGISTRO COMPLETO DE VISITANTES\n`;
    pdfContent += `${'='.repeat(80)}\n\n`;
    pdfContent += `Sede: ${ADMIN_CREDENTIALS[currentLocation]?.name || 'Desconocida'}\n`;
    pdfContent += `Fecha de generación: ${new Date().toLocaleDateString('es-CO')}\n`;
    pdfContent += `Hora de generación: ${new Date().toLocaleTimeString('es-CO')}\n`;
    pdfContent += `TOTAL DE VISITANTES: ${visitors.length}\n\n`;
    
    // Group by sala
    const visitorsBySala = {};
    visitors.forEach(visitor => {
        if (!visitorsBySala[visitor.sala]) {
            visitorsBySala[visitor.sala] = [];
        }
        visitorsBySala[visitor.sala].push(visitor);
    });
    
    // Generate content for each sala
    Object.keys(visitorsBySala).sort().forEach(salaId => {
        const salaVisitors = visitorsBySala[salaId];
        const salaInfo = salasData[salaId];
        
        // Obtener nombre personalizado de la sala
        const salaName = getSalaName(currentLocation, salaId);
        
        pdfContent += `${'='.repeat(80)}\n`;
        pdfContent += `${salaName.toUpperCase()}`;
        if (salaInfo && !salaInfo.isEmpty) {
            pdfContent += ` - ${salaInfo.difunto}`;
        }
        pdfContent += `\n`;
        pdfContent += `${'='.repeat(80)}\n`;
        
        if (salaInfo && !salaInfo.isEmpty) {
            pdfContent += `Difunto: ${salaInfo.difunto}\n`;
            pdfContent += `Fechas: ${salaInfo.fechas}\n`;
            pdfContent += `Horario: ${salaInfo.horaInicio} - ${salaInfo.horaFin}\n`;
            pdfContent += `Contacto familiar: ${salaInfo.celularFamiliar}\n`;
        }
        
        pdfContent += `Total de visitantes: ${salaVisitors.length}\n\n`;
        
        // Sort visitors by timestamp
        salaVisitors.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        salaVisitors.forEach((visitor, index) => {
            const date = new Date(visitor.timestamp);
            pdfContent += `${index + 1}. ${visitor.nombres} ${visitor.apellidos}\n`;
            pdfContent += `   Cédula: ${visitor.cedula}\n`;
            pdfContent += `   Teléfono: ${visitor.telefono}\n`;
            pdfContent += `   Fecha: ${date.toLocaleDateString('es-CO')}\n`;
            pdfContent += `   Hora: ${date.toLocaleTimeString('es-CO')}\n`;
            pdfContent += `   Mensaje: "${visitor.mensaje}"\n\n`;
        });
        
        pdfContent += `\n`;
    });
    
    pdfContent += `${'='.repeat(80)}\n`;
    pdfContent += `RESUMEN ESTADÍSTICO\n`;
    pdfContent += `${'='.repeat(80)}\n`;
    Object.keys(visitorsBySala).sort().forEach(salaId => {
        pdfContent += `Sala ${salaId}: ${visitorsBySala[salaId].length} visitantes\n`;
    });
    pdfContent += `\nTotal general: ${visitors.length} visitantes\n\n`;
    
    pdfContent += `Jardines del Renacer - Sistema Digital de Condolencias\n`;
    pdfContent += `© 2024 - Todos los derechos reservados`;
    
    // Create and download file
    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registro_completo_visitantes_${currentLocation}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showNotification('Registro completo de visitantes generado y descargado', 'success');
}