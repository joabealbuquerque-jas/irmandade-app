// API Configuration
const API_URL = 'http://localhost:3000/api';

// Auth Token (em produção, viria do login)
let authToken = localStorage.getItem('admin_token') || '';

// API Helper
async function api(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        },
        ...options,
    };

    if (options.body && typeof options.body === 'object') {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, config);
    return response.json();
}

// Dashboard
async function loadDashboard() {
    try {
        // Carregar estatísticas
        const users = await api('/users?limit=100');
        const posts = await api('/posts?limit=100');
        const groups = await api('/groups');
        const events = await api('/events');

        document.getElementById('users-count').textContent = users.length || 0;
        document.getElementById('posts-count').textContent = posts.length || 0;
        document.getElementById('groups-count').textContent = groups.length || 0;
        document.getElementById('events-count').textContent = events.length || 0;

        // Carregar tabela de usuários
        const usersTable = document.getElementById('users-table');
        if (users.length > 0) {
            usersTable.innerHTML = users.slice(0, 5).map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.congregation || '-'}</td>
                    <td><span class="badge badge-${user.status === 'approved' ? 'success' : 'warning'}">${user.status}</span></td>
                    <td class="actions">
                        <button class="btn btn-primary" onclick="viewUser(${user.id})">Ver</button>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Deletar</button>
                    </td>
                </tr>
            `).join('');
        } else {
            usersTable.innerHTML = '<tr><td colspan="5">Nenhum usuário encontrado</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}

// Users
async function loadUsers() {
    try {
        const users = await api('/users?limit=100');
        const table = document.getElementById('users-table');
        
        if (users.length > 0) {
            table.innerHTML = users.map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.cpf}</td>
                    <td>${user.congregation || '-'}</td>
                    <td><span class="badge badge-${user.status === 'approved' ? 'success' : 'warning'}">${user.status}</span></td>
                    <td class="actions">
                        <button class="btn btn-primary" onclick="viewUser(${user.id})">Ver</button>
                        <button class="btn btn-success" onclick="approveUser(${user.id})">Aprovar</button>
                        <button class="btn btn-warning" onclick="blockUser(${user.id})">Bloquear</button>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Deletar</button>
                    </td>
                </tr>
            `).join('');
        } else {
            table.innerHTML = '<tr><td colspan="6">Nenhum usuário encontrado</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

// Posts
async function loadPosts() {
    try {
        const posts = await api('/posts?limit=100');
        const table = document.getElementById('posts-table');
        
        if (posts.length > 0) {
            table.innerHTML = posts.map(post => `
                <tr>
                    <td>${post.id}</td>
                    <td>${post.content.substring(0, 50)}...</td>
                    <td>${post.user?.name || '-'}</td>
                    <td>${post.type}</td>
                    <td><span class="badge badge-success">${post.status || 'active'}</span></td>
                    <td class="actions">
                        <button class="btn btn-primary" onclick="viewPost(${post.id})">Ver</button>
                        <button class="btn btn-danger" onclick="deletePost(${post.id})">Deletar</button>
                    </td>
                </tr>
            `).join('');
        } else {
            table.innerHTML = '<tr><td colspan="6">Nenhum post encontrado</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
    }
}

// Groups
async function loadGroups() {
    try {
        const groups = await api('/groups');
        const table = document.getElementById('groups-table');
        
        if (groups.length > 0) {
            table.innerHTML = groups.map(group => `
                <tr>
                    <td>${group.name}</td>
                    <td>${group.description || '-'}</td>
                    <td>${group.members_count || 0}</td>
                    <td><span class="badge badge-success">${group.status || 'active'}</span></td>
                    <td class="actions">
                        <button class="btn btn-primary" onclick="viewGroup(${group.id})">Ver</button>
                        <button class="btn btn-danger" onclick="deleteGroup(${group.id})">Deletar</button>
                    </td>
                </tr>
            `).join('');
        } else {
            table.innerHTML = '<tr><td colspan="5">Nenhum grupo encontrado</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar grupos:', error);
    }
}

// Events
async function loadEvents() {
    try {
        const events = await api('/events');
        const table = document.getElementById('events-table');
        
        if (events.length > 0) {
            table.innerHTML = events.map(event => `
                <tr>
                    <td>${event.title}</td>
                    <td>${event.description || '-'}</td>
                    <td>${event.start_date}</td>
                    <td>${event.attendees_count || 0}</td>
                    <td><span class="badge badge-success">${event.status || 'active'}</span></td>
                    <td class="actions">
                        <button class="btn btn-primary" onclick="viewEvent(${event.id})">Ver</button>
                        <button class="btn btn-danger" onclick="deleteEvent(${event.id})">Deletar</button>
                    </td>
                </tr>
            `).join('');
        } else {
            table.innerHTML = '<tr><td colspan="6">Nenhum evento encontrado</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
    }
}

// Products
async function loadProducts() {
    try {
        const products = await api('/products');
        const table = document.getElementById('products-table');
        
        if (products.length > 0) {
            table.innerHTML = products.map(product => `
                <tr>
                    <td>${product.title}</td>
                    <td>${product.description || '-'}</td>
                    <td>R$ ${product.price.toFixed(2)}</td>
                    <td>${product.category}</td>
                    <td><span class="badge badge-success">${product.status || 'active'}</span></td>
                    <td class="actions">
                        <button class="btn btn-primary" onclick="viewProduct(${product.id})">Ver</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Deletar</button>
                    </td>
                </tr>
            `).join('');
        } else {
            table.innerHTML = '<tr><td colspan="6">Nenhum produto encontrado</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Ads
async function loadAds() {
    try {
        const ads = await api('/ads');
        const table = document.getElementById('ads-table');
        
        if (ads.length > 0) {
            table.innerHTML = ads.map(ad => `
                <tr>
                    <td>${ad.title}</td>
                    <td>${ad.description || '-'}</td>
                    <td>${ad.format}</td>
                    <td>R$ ${ad.budget.toFixed(2)}</td>
                    <td><span class="badge badge-${ad.status === 'active' ? 'success' : 'warning'}">${ad.status}</span></td>
                    <td class="actions">
                        <button class="btn btn-primary" onclick="viewAd(${ad.id})">Ver</button>
                        <button class="btn btn-warning" onclick="pauseAd(${ad.id})">Pausar</button>
                        <button class="btn btn-danger" onclick="deleteAd(${ad.id})">Deletar</button>
                    </td>
                </tr>
            `).join('');
        } else {
            table.innerHTML = '<tr><td colspan="6">Nenhum anúncio encontrado</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar anúncios:', error);
    }
}

// Reports
async function loadReports() {
    try {
        const reports = await api('/reports');
        const table = document.getElementById('reports-table');
        
        if (reports.length > 0) {
            table.innerHTML = reports.map(report => `
                <tr>
                    <td>${report.id}</td>
                    <td>${report.reason}</td>
                    <td>${report.description || '-'}</td>
                    <td><span class="badge badge-${report.status === 'pending' ? 'warning' : 'success'}">${report.status}</span></td>
                    <td class="actions">
                        <button class="btn btn-primary" onclick="viewReport(${report.id})">Ver</button>
                        <button class="btn btn-success" onclick="resolveReport(${report.id})">Resolver</button>
                        <button class="btn btn-danger" onclick="dismissReport(${report.id})">Dispensar</button>
                    </td>
                </tr>
            `).join('');
        } else {
            table.innerHTML = '<tr><td colspan="5">Nenhuma denúncia encontrada</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao carregar denúncias:', error);
    }
}

// Actions
function viewUser(id) { window.location.href = `pages/user-detail.html?id=${id}`; }
function approveUser(id) { alert('Usuário aprovado!'); }
function blockUser(id) { alert('Usuário bloqueado!'); }
function deleteUser(id) { if (confirm('Deletar usuário?')) alert('Usuário deletado!'); }

function viewPost(id) { window.location.href = `pages/post-detail.html?id=${id}`; }
function deletePost(id) { if (confirm('Deletar post?')) alert('Post deletado!'); }

function viewGroup(id) { window.location.href = `pages/group-detail.html?id=${id}`; }
function deleteGroup(id) { if (confirm('Deletar grupo?')) alert('Grupo deletado!'); }

function viewEvent(id) { window.location.href = `pages/event-detail.html?id=${id}`; }
function deleteEvent(id) { if (confirm('Deletar evento?')) alert('Evento deletado!'); }

function viewProduct(id) { window.location.href = `pages/product-detail.html?id=${id}`; }
function deleteProduct(id) { if (confirm('Deletar produto?')) alert('Produto deletado!'); }

function viewAd(id) { window.location.href = `pages/ad-detail.html?id=${id}`; }
function pauseAd(id) { alert('Anúncio pausado!'); }
function deleteAd(id) { if (confirm('Deletar anúncio?')) alert('Anúncio deletado!'); }

function viewReport(id) { window.location.href = `pages/report-detail.html?id=${id}`; }
function resolveReport(id) { alert('Denúncia resolvida!'); }
function dismissReport(id) { alert('Denúncia dispensada!'); }

// Init
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/') {
        loadDashboard();
    } else if (path.includes('users.html')) {
        loadUsers();
    } else if (path.includes('posts.html')) {
        loadPosts();
    } else if (path.includes('groups.html')) {
        loadGroups();
    } else if (path.includes('events.html')) {
        loadEvents();
    } else if (path.includes('products.html')) {
        loadProducts();
    } else if (path.includes('ads.html')) {
        loadAds();
    } else if (path.includes('reports.html')) {
        loadReports();
    }
});
