// フォーム管理スクリプト

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

    addProfile(profile) {
        const profiles = this.loadProfiles();
        profile.id = this.generateId();
        profile.createdAt = new Date().toISOString();
        profile.updatedAt = new Date().toISOString();
        profiles.push(profile);
        this.saveProfiles(profiles);
        return profile;
    }

    updateProfile(id, updates) {
        const profiles = this.loadProfiles();
        const index = profiles.findIndex(p => p.id === id);
        if (index !== -1) {
            profiles[index] = {
                ...profiles[index],
                ...updates,
                id: profiles[index].id,
                createdAt: profiles[index].createdAt,
                updatedAt: new Date().toISOString()
            };
            this.saveProfiles(profiles);
            return profiles[index];
        }
        return null;
    }

    generateId() {
        return 'profile_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

const manager = new ProfileManager();

// フォームの初期化
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profileForm');
    if (!form) return;

    // URLパラメータから編集対象のIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('id');

    if (editId) {
        // 編集モード
        loadProfileForEdit(editId);
    }

    // フォーム送信
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        saveProfile(editId);
    });
});

// 編集用にプロフィールを読み込み
function loadProfileForEdit(id) {
    const profile = manager.getProfileById(id);
    if (!profile) {
        alert('プロフィールが見つかりません');
        window.location.href = 'index.html';
        return;
    }

    // フォームに値を設定
    document.getElementById('employeeId').value = profile.id;
    document.getElementById('employeeNumber').value = profile.employeeNumber;
    document.getElementById('name').value = profile.name;
    document.getElementById('department').value = profile.department;
    document.getElementById('position').value = profile.position;
    document.getElementById('joinYear').value = profile.joinYear;
    document.getElementById('biography').value = profile.biography || '';
    document.getElementById('recentProjects').value = profile.recentProjects || '';
    document.getElementById('projectRoles').value = profile.projectRoles || '';
    document.getElementById('freeText').value = profile.freeText || '';

    // チェックボックス
    profile.fields.forEach(field => {
        const checkbox = document.querySelector(`input[name="fields"][value="${field}"]`);
        if (checkbox) {
            checkbox.checked = true;
        }
    });
}

// プロフィールの保存
function saveProfile(editId) {
    // フォームデータの取得
    const formData = {
        employeeNumber: document.getElementById('employeeNumber').value.trim(),
        name: document.getElementById('name').value.trim(),
        department: document.getElementById('department').value,
        position: document.getElementById('position').value,
        joinYear: parseInt(document.getElementById('joinYear').value),
        biography: document.getElementById('biography').value.trim(),
        recentProjects: document.getElementById('recentProjects').value.trim(),
        projectRoles: document.getElementById('projectRoles').value.trim(),
        freeText: document.getElementById('freeText').value.trim(),
        fields: []
    };

    // チェックボックスから担当分野を取得
    const fieldCheckboxes = document.querySelectorAll('input[name="fields"]:checked');
    fieldCheckboxes.forEach(checkbox => {
        formData.fields.push(checkbox.value);
    });

    // バリデーション
    if (!formData.employeeNumber || !formData.name || !formData.department || 
        !formData.position || !formData.joinYear) {
        alert('必須項目を入力してください');
        return;
    }

    if (formData.fields.length === 0) {
        if (!confirm('担当分野が選択されていません。このまま保存しますか？')) {
            return;
        }
    }

    try {
        if (editId) {
            // 更新
            manager.updateProfile(editId, formData);
            alert('プロフィールを更新しました');
        } else {
            // 新規作成
            manager.addProfile(formData);
            alert('プロフィールを登録しました');
        }
        window.location.href = 'index.html';
    } catch (error) {
        console.error('保存エラー:', error);
        alert('保存中にエラーが発生しました');
    }
}
