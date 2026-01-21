// 社員プロフィール データベース - メインスクリプト

// LocalStorageのキー
const STORAGE_KEY = 'seedplanning_profiles';

// データ管理クラス
class ProfileManager {
    constructor() {
        this.profiles = this.loadProfiles();
    }

    loadProfiles() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : this.getDefaultProfiles();
    }

    saveProfiles() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profiles));
    }

    getAllProfiles() {
        return this.profiles;
    }

    getProfileById(id) {
        return this.profiles.find(p => p.id === id);
    }

    addProfile(profile) {
        profile.id = this.generateId();
        profile.createdAt = new Date().toISOString();
        profile.updatedAt = new Date().toISOString();
        this.profiles.push(profile);
        this.saveProfiles();
        return profile;
    }

    updateProfile(id, updates) {
        const index = this.profiles.findIndex(p => p.id === id);
        if (index !== -1) {
            this.profiles[index] = {
                ...this.profiles[index],
                ...updates,
                id: this.profiles[index].id,
                createdAt: this.profiles[index].createdAt,
                updatedAt: new Date().toISOString()
            };
            this.saveProfiles();
            return this.profiles[index];
        }
        return null;
    }

    deleteProfile(id) {
        const index = this.profiles.findIndex(p => p.id === id);
        if (index !== -1) {
            this.profiles.splice(index, 1);
            this.saveProfiles();
            return true;
        }
        return false;
    }

    generateId() {
        return 'profile_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getDefaultProfiles() {
        // デフォルトのサンプルデータ
        return [
            {
                id: 'profile_001',
                employeeNumber: '001',
                name: '山田 太郎',
                department: '第1研究部',
                position: '部長',
                fields: ['ヘルスケア', 'メディカル・バイオ'],
                joinYear: 2010,
                biography: '東京大学大学院修了。大手製薬企業での研究職を経て、2010年にシード・プランニング入社。',
                recentProjects: '日本の医療機器市場調査、再生医療市場の動向分析',
                projectRoles: 'プロジェクトマネージャー、主任研究員',
                freeText: '専門: 医療機器、再生医療、バイオテクノロジー\n資格: 技術士（生物工学部門）',
                createdAt: '2024-01-01T00:00:00.000Z',
                updatedAt: '2024-01-01T00:00:00.000Z'
            },
            {
                id: 'profile_002',
                employeeNumber: '002',
                name: '佐藤 花子',
                department: '第2研究部',
                position: '主任研究員',
                fields: ['エレクトロニクス・IT', '医療IT'],
                joinYear: 2015,
                biography: '慶應義塾大学大学院修了。IT企業での勤務を経て、2015年入社。',
                recentProjects: 'デジタルヘルス市場調査、医療DX動向分析',
                projectRoles: 'リサーチャー、データアナリスト',
                freeText: '専門: 医療IT、ヘルスケアテクノロジー、データ分析\nスキル: Python, R, SQL',
                createdAt: '2024-01-02T00:00:00.000Z',
                updatedAt: '2024-01-02T00:00:00.000Z'
            },
            {
                id: 'profile_003',
                employeeNumber: '003',
                name: '鈴木 一郎',
                department: '第3研究部',
                position: '研究員',
                fields: ['エネルギー・環境'],
                joinYear: 2020,
                biography: '京都大学大学院修了。環境コンサルタント会社を経て、2020年入社。',
                recentProjects: '再生可能エネルギー市場調査、カーボンニュートラル技術動向',
                projectRoles: 'リサーチャー',
                freeText: '専門: 再生可能エネルギー、環境技術、サステナビリティ\n資格: エネルギー管理士',
                createdAt: '2024-01-03T00:00:00.000Z',
                updatedAt: '2024-01-03T00:00:00.000Z'
            }
        ];
    }

    searchProfiles(query, filters = {}) {
        let results = [...this.profiles];

        // テキスト検索
        if (query && query.trim()) {
            const searchTerm = query.toLowerCase().trim();
            results = results.filter(profile => {
                return (
                    profile.name.toLowerCase().includes(searchTerm) ||
                    profile.department.toLowerCase().includes(searchTerm) ||
                    profile.position.toLowerCase().includes(searchTerm) ||
                    profile.fields.some(f => f.toLowerCase().includes(searchTerm)) ||
                    (profile.biography && profile.biography.toLowerCase().includes(searchTerm)) ||
                    (profile.recentProjects && profile.recentProjects.toLowerCase().includes(searchTerm)) ||
                    (profile.projectRoles && profile.projectRoles.toLowerCase().includes(searchTerm)) ||
                    (profile.freeText && profile.freeText.toLowerCase().includes(searchTerm))
                );
            });
        }

        // フィルター適用
        if (filters.field) {
            results = results.filter(p => p.fields.includes(filters.field));
        }

        if (filters.position) {
            results = results.filter(p => p.position === filters.position);
        }

        if (filters.department) {
            results = results.filter(p => p.department === filters.department);
        }

        return results;
    }
}

// グローバルインスタンス
const profileManager = new ProfileManager();

// 一覧ページの初期化
function initIndexPage() {
    displayProfiles(profileManager.getAllProfiles());
}

// プロフィールの表示
function displayProfiles(profiles) {
    const grid = document.getElementById('profilesGrid');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    if (!grid) return;

    grid.innerHTML = '';

    if (profiles.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        resultsCount.textContent = '0';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';
    resultsCount.textContent = profiles.length;

    profiles.forEach(profile => {
        const card = createProfileCard(profile);
        grid.appendChild(card);
    });
}

// プロフィールカードの作成
function createProfileCard(profile) {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.onclick = () => {
        window.location.href = `profile.html?id=${profile.id}`;
    };

    card.innerHTML = `
        <div class="profile-card-header">
            <div class="profile-name">${escapeHtml(profile.name)}</div>
            <div class="profile-number">社員番号: ${escapeHtml(profile.employeeNumber)}</div>
        </div>
        <div class="profile-info">
            <div class="info-row">
                <span class="info-label">所属:</span>
                <span class="info-value">${escapeHtml(profile.department)}</span>
            </div>
            <div class="info-row">
                <span class="info-label">役職:</span>
                <span class="info-value">${escapeHtml(profile.position)}</span>
            </div>
            <div class="info-row">
                <span class="info-label">入社年:</span>
                <span class="info-value">${profile.joinYear}年</span>
            </div>
        </div>
        <div class="profile-fields">
            <div class="field-tags">
                ${profile.fields.map(field => `<span class="field-tag">${escapeHtml(field)}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

// 検索機能
function searchProfiles() {
    const query = document.getElementById('searchInput').value;
    const filters = getActiveFilters();
    const results = profileManager.searchProfiles(query, filters);
    displayProfiles(results);
}

// 検索クリア
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('fieldFilter').value = '';
    document.getElementById('positionFilter').value = '';
    document.getElementById('deptFilter').value = '';
    displayProfiles(profileManager.getAllProfiles());
}

// フィルター適用
function applyFilters() {
    const query = document.getElementById('searchInput').value;
    const filters = getActiveFilters();
    const results = profileManager.searchProfiles(query, filters);
    displayProfiles(results);
}

// アクティブなフィルターを取得
function getActiveFilters() {
    return {
        field: document.getElementById('fieldFilter')?.value || '',
        position: document.getElementById('positionFilter')?.value || '',
        department: document.getElementById('deptFilter')?.value || ''
    };
}

// HTMLエスケープ
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Enterキーで検索
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchProfiles();
            }
        });
        
        // ページ読み込み時に表示
        initIndexPage();
    }
});
