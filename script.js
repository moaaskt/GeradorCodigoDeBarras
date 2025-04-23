// Elementos do DOM
const barcodeText = document.getElementById('barcode-text');
const barcodeType = document.getElementById('barcode-type');
const generateBtn = document.getElementById('generate-btn');
const generateText = document.getElementById('generate-text');
const generateLoading = document.getElementById('generate-loading');
const resultContainer = document.getElementById('result-container');
const placeholderText = document.getElementById('placeholder-text');
const barcodeElement = document.getElementById('barcode');
const actions = document.getElementById('actions');
const downloadPng = document.getElementById('download-png');
const downloadSvg = document.getElementById('download-svg');
const settingsToggle = document.getElementById('settings-toggle');
const settingsContent = document.getElementById('settings-content');
const toggleIcon = document.querySelector('.toggle-settings');

// Configurações avançadas
const barcodeWidth = document.getElementById('barcode-width');
const barcodeHeight = document.getElementById('barcode-height');
const barcodeColor = document.getElementById('barcode-color');
const barcodeDisplayValue = document.getElementById('barcode-display-value');

// Toggle das configurações avançadas
settingsToggle.addEventListener('click', function() {
    settingsContent.classList.toggle('hidden');
    toggleIcon.classList.toggle('rotate');
    resultContainer.classList.toggle('active', !settingsContent.classList.contains('hidden'));
});

// Gerar código de barras
generateBtn.addEventListener('click', function() {
    const text = barcodeText.value.trim();
    
    if (!text) {
        alert('Por favor, digite um texto ou número para gerar o código de barras.');
        return;
    }
    
    // Mostrar loading
    generateText.classList.add('hidden');
    generateLoading.classList.remove('hidden');
    
    // Simular delay para efeito visual (pode remover em produção)
    setTimeout(() => {
        try {
            JsBarcode(barcodeElement, text, {
                format: barcodeType.value,
                width: parseInt(barcodeWidth.value),
                height: parseInt(barcodeHeight.value),
                displayValue: barcodeDisplayValue.value === 'true',
                lineColor: barcodeColor.value,
                fontSize: 16,
                margin: 10
            });
            
            // Mostrar resultado
            placeholderText.classList.add('hidden');
            barcodeElement.classList.remove('hidden');
            actions.classList.remove('hidden');
            resultContainer.classList.add('active');
            
        } catch (e) {
            alert('Erro ao gerar código de barras: ' + e.message);
        } finally {
            // Esconder loading
            generateText.classList.remove('hidden');
            generateLoading.classList.add('hidden');
        }
    }, 500);
});

// Download PNG
downloadPng.addEventListener('click', function() {
    const svg = barcodeElement;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'codigo_de_barras.png';
        downloadLink.href = pngFile;
        downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
});

// Download SVG
downloadSvg.addEventListener('click', function() {
    const svg = barcodeElement;
    const svgData = new XMLSerializer().serializeToString(svg);
    const downloadLink = document.createElement('a');
    downloadLink.download = 'codigo_de_barras.svg';
    downloadLink.href = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    downloadLink.click();
});