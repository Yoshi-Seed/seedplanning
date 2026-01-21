// プロフィール詳細ページスクリプト

// LocalStorageのキー
const STORAGE_KEY = 'seedplanning_profiles';

// データ管理クラス（簡易版）
class ProfileManager {
    loadProfiles() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    saveProfiles(profiles) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    }

    getProfileById(id) {
        const profiles = this.loadProfiles();
        return profiles.find(p => p.id === id);
    }

    deleteProfile(id) {
        const profiles = this.loadProfiles();
        const filtered = profiles.filter(p => p.id !== id);
        this.saveProfiles(filtered);
        return true;
    }
}

const manager = new ProfileManager();
let currentProfileId = null;

// ページ初期化
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    currentProfileId = urlParams.get('id');

    if (!currentProfileId) {
        alert('プロフィールIDが指定されていません');
        window.location.href = 'index.html';
        return;
    }

    displayProfile(currentProfileId);
});

// プロフィールの表示
function displayProfile(id) {
    const profile = manager.getProfileById(id);
    const container = document.getElementById('profileDetail');

    if (!profile) {
        container.innerHTML = '<p style="color: red;">プロフィールが見つかりません</p>';
        return;
    }

    container.innerHTML = `
        <div class="detail-section">
            <h2>基本情報</h2>
            <div class="detail-grid">
                <div class="detail-label">社員番号:</div>
                <div class="detail-value">${escapeHtml(profile.employeeNumber)}</div>
                
                <div class="detail-label">氏名:</div>
                <div class="detail-value" style="font-size: 1.3rem; font-weight: 700; color: var(--primary-brown);">
                    ${escapeHtml(profile.name)}
                </div>
                
                <div class="detail-label">所属:</div>
                <div class="detail-value">${escapeHtml(profile.department)}</div>
                
                <div class="detail-label">役職:</div>
                <div class="detail-value">${escapeHtml(profile.position)}</div>
                
                <div class="detail-label">入社年:</div>
                <div class="detail-value">${profile.joinYear}年 (勤続${new Date().getFullYear() - profile.joinYear}年)</div>
            </div>
        </div>

        <div class="detail-section">
            <h2>担当分野</h2>
            <div class="field-tags">
                ${profile.fields.map(field => 
                    `<span class="field-tag">${escapeHtml(field)}</span>`
                ).join('')}
            </div>
            ${profile.fields.length === 0 ? '<p style="color: var(--text-gray);">担当分野が登録されていません</p>' : ''}
        </div>

        ${profile.biography ? `
        <div class="detail-section">
            <h2>略歴</h2>
            <div class="detail-text">${escapeHtml(profile.biography)}</div>
        </div>
        ` : ''}

        ${profile.recentProjects ? `
        <div class="detail-section">
            <h2>最近のプロジェクト</h2>
            <div class="detail-text">${escapeHtml(profile.recentProjects)}</div>
        </div>
        ` : ''}

        ${profile.projectRoles ? `
        <div class="detail-section">
            <h2>プロジェクトでの役割</h2>
            <div class="detail-text">${escapeHtml(profile.projectRoles)}</div>
        </div>
        ` : ''}

        ${profile.freeText ? `
        <div class="detail-section">
            <h2>その他</h2>
            <div class="detail-text">${escapeHtml(profile.freeText)}</div>
        </div>
        ` : ''}

        <div class="detail-section" style="border-top: 2px solid var(--light-beige); padding-top: 1rem;">
            <p style="color: var(--text-gray); font-size: 0.9rem;">
                最終更新: ${formatDate(profile.updatedAt || profile.createdAt)}
            </p>
        </div>
    `;
}

// 編集ページへ移動
function editProfile() {
    if (currentProfileId) {
        window.location.href = `form.html?id=${currentProfileId}`;
    }
}

// プロフィール削除
function deleteProfile() {
    if (!currentProfileId) return;

    const profile = manager.getProfileById(currentProfileId);
    if (!profile) {
        alert('プロフィールが見つかりません');
        return;
    }

    const confirmMessage = `「${profile.name}」のプロフィールを削除してもよろしいですか？\n\nこの操作は取り消せません。`;
    
    if (confirm(confirmMessage)) {
        try {
            manager.deleteProfile(currentProfileId);
            alert('プロフィールを削除しました');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('削除エラー:', error);
            alert('削除中にエラーが発生しました');
        }
    }
}

// HTMLエスケープ
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 日付フォーマット
function formatDate(isoString) {
    if (!isoString) return '不明';
    const date = new Date(isoString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
