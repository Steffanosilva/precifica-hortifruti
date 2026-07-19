document.addEventListener('DOMContentLoaded', () => {

    // ---------- DADOS INICIAIS (COM UNIDADES) ----------
    const defaultProducts = [
        // Legumes e frutas (kg)
        { name: 'Tomate', weight: 16, unit: 'kg' },
        { name: 'Batata', weight: 25, unit: 'kg' },
        { name: 'Batata doce', weight: 25, unit: 'kg' },
        { name: 'Cebola', weight: 20, unit: 'kg' },
        { name: 'Cenoura', weight: 18, unit: 'kg' },
        { name: 'Limão', weight: 18, unit: 'kg' },
        { name: 'Banana', weight: 20, unit: 'kg' },
        { name: 'Beterraba', weight: 18, unit: 'kg' },
        { name: 'Laranja', weight: 18, unit: 'kg' },
        { name: 'Manga', weight: 16, unit: 'kg' },
        { name: 'Pepino', weight: 17, unit: 'kg' },
        { name: 'Abobrinha', weight: 17, unit: 'kg' },
        { name: 'Maracujá', weight: 10, unit: 'kg' },
        { name: 'Alho', weight: 9, unit: 'kg' },
        { name: 'Inhame', weight: 18, unit: 'kg' },
        { name: 'Chuchu', weight: 18, unit: 'kg' },
        { name: 'Maçã', weight: 18, unit: 'kg' },
        { name: 'Repolho', weight: 18, unit: 'kg' },
        { name: 'Pimentão', weight: 8, unit: 'kg' },
        { name: 'Pera', weight: 18, unit: 'kg' },
        // Abacaxi e ovos (un)
        { name: 'Abacaxi', weight: 10, unit: 'un' },
        { name: 'Ovo (unidade)', weight: 1, unit: 'un' },
        { name: 'Ovo (meia dúzia)', weight: 6, unit: 'un' },
        { name: 'Ovo (dúzia)', weight: 12, unit: 'un' },
        { name: 'Ovo (cartela 30)', weight: 30, unit: 'un' },
        // Mamão (un)
        { name: 'Mamão', weight: 1, unit: 'un' }
    ];

    // Mapeamento de emojis
    const emojiMap = {
        'tomate': '🍅',
        'batata': '🥔',
        'batata doce': '🍠',
        'cebola': '🧅',
        'cenoura': '🥕',
        'limão': '🍋',
        'banana': '🍌',
        'beterraba': '🫘',
        'laranja': '🍊',
        'manga': '🥭',
        'pepino': '🥒',
        'abobrinha': '🥒',
        'maracujá': '🍈',
        'alho': '🧄',
        'inhame': '🍠',
        'chuchu': '🥒',
        'maçã': '🍎',
        'repolho': '🥬',
        'pimentão': '🫑',
        'pera': '🍐',
        'abacaxi': '🍍',
        'ovo': '🥚',
        'mamão': '🥭'
    };

    function getEmoji(name) {
        const lower = name.toLowerCase().trim();
        for (const [key, emoji] of Object.entries(emojiMap)) {
            if (lower.includes(key)) return emoji;
        }
        return '🥬';
    }

    // ---------- ESTADO ----------
    let products = [];

    // ---------- DOM REFS ----------
    const grid = document.getElementById('productGrid');
    const marginInput = document.getElementById('marginMaster');
    const showAddBtn = document.getElementById('showAddFormBtn');
    const addForm = document.getElementById('addProductForm');
    const newName = document.getElementById('newProductName');
    const newWeight = document.getElementById('newProductWeight');
    const newUnit = document.getElementById('newProductUnit');
    const confirmAdd = document.getElementById('confirmAddBtn');
    const cancelAdd = document.getElementById('cancelAddBtn');

    // ---------- HELPERS ----------
    function roundToNine(value) {
        const centavos = Math.round(value * 100);
        const ultimo = centavos % 10;
        if (ultimo === 9) return centavos / 100;
        const base = Math.floor(centavos / 10) * 10;
        const baixo = base + 9;
        const cima = base + 19;
        const distBaixo = Math.abs(centavos - baixo);
        const distCima = Math.abs(centavos - cima);
        const escolhido = distBaixo <= distCima ? baixo : cima;
        return escolhido / 100;
    }

    function calcularPrecoFinal(precoRemessa, peso, margemPercent) {
        if (!precoRemessa || precoRemessa <= 0 || !peso || peso <= 0) return null;
        const bruto = (precoRemessa / peso) * (1 + margemPercent / 100);
        return roundToNine(bruto);
    }

    // ---------- RENDER ----------
    function render() {
        const margem = parseFloat(marginInput.value) || 70;

        // Preserva o cabeçalho
        const header = grid.querySelector('.grid-header');
        grid.innerHTML = '';
        if (header) grid.appendChild(header);
        else {
            const newHeader = document.createElement('div');
            newHeader.className = 'grid-header';
            newHeader.innerHTML = `
                <span>Produto</span>
                <span>Peso padrão</span>
                <span>Preço da remessa (R$)</span>
                <span>Preço final (R$)</span>
                <span style="text-align:center;">Ações</span>
            `;
            grid.appendChild(newHeader);
        }

        const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));

        sorted.forEach(prod => {
            const div = document.createElement('div');
            div.className = 'product-item';
            div.dataset.id = prod.id;

            const emoji = getEmoji(prod.name);

            // Nome
            const nameDiv = document.createElement('div');
            nameDiv.className = 'name';
            nameDiv.innerHTML = `<span class="emoji-icon">${emoji}</span> ${prod.name}`;

            // Peso com unidade
            const weightDiv = document.createElement('div');
            const weightInput = document.createElement('input');
            weightInput.type = 'number';
            weightInput.className = 'weight-input';
            weightInput.value = prod.weight;
            weightInput.step = '0.1';
            weightInput.min = '0.1';
            weightInput.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && val > 0) {
                    prod.weight = val;
                    render();
                }
            });
            weightDiv.appendChild(weightInput);
            const unitSpan = document.createElement('span');
            unitSpan.className = 'weight-unit';
            unitSpan.textContent = prod.unit || 'kg';
            weightDiv.appendChild(unitSpan);

            // Preço da remessa
            const priceDiv = document.createElement('div');
            const priceInput = document.createElement('input');
            priceInput.type = 'number';
            priceInput.className = 'price-input';
            priceInput.placeholder = '0,00';
            priceInput.step = '0.01';
            priceInput.min = '0';
            if (prod.price !== undefined && prod.price !== null) {
                priceInput.value = prod.price.toFixed(2);
            }
            priceInput.addEventListener('input', (e) => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && val >= 0) {
                    prod.price = val;
                } else {
                    prod.price = undefined;
                }
                updateFinalPrice(div, prod, margem);
            });
            priceDiv.appendChild(priceInput);

            // Preço final
            const finalDiv = document.createElement('div');
            const finalSpan = document.createElement('span');
            finalSpan.className = 'final-price';
            finalDiv.appendChild(finalSpan);

            // Botão deletar
            const deleteDiv = document.createElement('div');
            const delBtn = document.createElement('button');
            delBtn.className = 'delete-btn';
            delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            delBtn.addEventListener('click', () => {
                products = products.filter(p => p.id !== prod.id);
                render();
            });
            deleteDiv.appendChild(delBtn);

            div.appendChild(nameDiv);
            div.appendChild(weightDiv);
            div.appendChild(priceDiv);
            div.appendChild(finalDiv);
            div.appendChild(deleteDiv);

            grid.appendChild(div);

            updateFinalPrice(div, prod, margem);
        });
    }

    function updateFinalPrice(itemDiv, prod, margem) {
        const finalSpan = itemDiv.querySelector('.final-price');
        if (!finalSpan) return;
        const price = prod.price;
        const weight = prod.weight;
        if (price && weight && price > 0 && weight > 0) {
            const final = calcularPrecoFinal(price, weight, margem);
            if (final !== null) {
                finalSpan.textContent = final.toFixed(2);
                finalSpan.classList.remove('empty');
            } else {
                finalSpan.textContent = '—';
                finalSpan.classList.add('empty');
            }
        } else {
            finalSpan.textContent = '—';
            finalSpan.classList.add('empty');
        }
    }

    function updateAllPrices() {
        const margem = parseFloat(marginInput.value) || 70;
        const items = grid.querySelectorAll('.product-item');
        items.forEach(itemDiv => {
            const id = parseInt(itemDiv.dataset.id);
            const prod = products.find(p => p.id === id);
            if (prod) {
                updateFinalPrice(itemDiv, prod, margem);
            }
        });
    }

    // ---------- CRUD ----------
    function addProduct(name, weight, unit) {
        const trimmed = name.trim();
        if (!trimmed || !weight || weight <= 0) return false;
        if (products.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
            alert('Este produto já está cadastrado.');
            return false;
        }
        const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({
            id: newId,
            name: trimmed,
            weight: weight,
            unit: unit || 'kg',
            price: undefined
        });
        render();
        return true;
    }

    // ---------- EVENTOS ----------
    marginInput.addEventListener('input', updateAllPrices);

    showAddBtn.addEventListener('click', () => {
        addForm.classList.remove('hidden');
        showAddBtn.style.display = 'none';
        newName.value = '';
        newWeight.value = '';
        newUnit.value = 'kg';
        newName.focus();
    });

    cancelAdd.addEventListener('click', () => {
        addForm.classList.add('hidden');
        showAddBtn.style.display = 'flex';
    });

    confirmAdd.addEventListener('click', () => {
        const name = newName.value.trim();
        const weight = parseFloat(newWeight.value);
        const unit = newUnit.value;
        if (!name) {
            alert('Informe o nome do produto.');
            return;
        }
        if (isNaN(weight) || weight <= 0) {
            alert('Informe um peso válido (maior que zero).');
            return;
        }
        const success = addProduct(name, weight, unit);
        if (success) {
            addForm.classList.add('hidden');
            showAddBtn.style.display = 'flex';
        }
    });

    newName.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirmAdd.click(); });
    newWeight.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirmAdd.click(); });
    newUnit.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirmAdd.click(); });

    // ---------- INICIALIZAÇÃO ----------
    products = defaultProducts.map((p, index) => ({
        id: index + 1,
        name: p.name,
        weight: p.weight,
        unit: p.unit || 'kg',
        price: undefined
    }));

    render();
});