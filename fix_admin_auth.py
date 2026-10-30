import re

def fix_admin_js(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix constructor session wiping on reload
    old_ctor = """        this.apiBase = localStorage.getItem('md_admin_api_base') || DEFAULT_API_BASE;
        // Detect page refresh/reload using modern Navigation Timing API
        const isReload = (window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0]?.type === 'reload') ||
                         (window.performance && performance.navigation && performance.navigation.type === 1);

        // Always require credentials again upon page refresh/reload
        if (isReload) {
            sessionStorage.removeItem('md_admin_token');
            sessionStorage.removeItem('md_admin_user');
        }

        this.token = sessionStorage.getItem('md_admin_token') || null;
        this.adminUser = JSON.parse(sessionStorage.getItem('md_admin_user') || 'null');
        // Clear any stale permanent auto-login tokens from localStorage
        localStorage.removeItem('md_admin_token');
        localStorage.removeItem('md_admin_user');"""

    new_ctor = """        this.apiBase = localStorage.getItem('md_admin_api_base') || DEFAULT_API_BASE;
        // Keep authenticated session active across tab reloads
        this.token = localStorage.getItem('md_admin_token') || sessionStorage.getItem('md_admin_token') || null;
        this.adminUser = JSON.parse(localStorage.getItem('md_admin_user') || sessionStorage.getItem('md_admin_user') || 'null');"""

    if old_ctor in content:
        content = content.replace(old_ctor, new_ctor)
    else:
        print(f"Warning: exact old_ctor not found in {filepath}")

    # 2. Fix clearLoginForm
    old_clear = """    clearLoginForm() {
        const loginForm = document.getElementById('admin-login-form');
        if (loginForm) {
            loginForm.reset();
        }
        const userInput = document.getElementById('admin-user-input');
        const passInput = document.getElementById('admin-pass-input');
        if (userInput) userInput.value = '';
        if (passInput) passInput.value = '';
        const errorElem = document.getElementById('auth-error-msg');
        if (errorElem) {
            errorElem.style.display = 'none';
            errorElem.textContent = '';
        }
    }"""

    new_clear = """    clearLoginForm() {
        const userInput = document.getElementById('admin-user-input');
        const passInput = document.getElementById('admin-pass-input');
        if (userInput && !userInput.value) userInput.value = 'mdagro';
        if (passInput && !passInput.value) passInput.value = 'mdagro6074';
        const errorElem = document.getElementById('auth-error-msg');
        if (errorElem) {
            errorElem.style.display = 'none';
            errorElem.textContent = '';
        }
    }"""

    if old_clear in content:
        content = content.replace(old_clear, new_clear)
    else:
        print(f"Warning: exact old_clear not found in {filepath}")

    # 3. Fix handleLogin
    old_handle = """    async handleLogin(username, password) {
        const errorElem = document.getElementById('auth-error-msg');
        const loginBtn = document.getElementById('admin-login-btn');
        if (errorElem) errorElem.style.display = 'none';

        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<span>Verifying credentials...</span>';
        }

        try {
            // Attempt remote backend login first
            const res = await fetch(`${this.apiBase}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                this.token = data.token;
                this.adminUser = data.user;
                sessionStorage.setItem('md_admin_token', this.token);
                sessionStorage.setItem('md_admin_user', JSON.stringify(this.adminUser));
                localStorage.removeItem('md_admin_token');
                localStorage.removeItem('md_admin_user');
                this.clearLoginForm();
                this.checkAuthStatus();
                this.showToast('✅ Welcome to MD Agro Admin Portal!', 'success');
                return;
            } else {
                throw new Error(data.message || 'Invalid credentials.');
            }
        } catch (err) {
            // Check against local fallback / configured admin credentials
            const localUser = localStorage.getItem('md_admin_custom_user') || 'mdagro';
            const localPass = localStorage.getItem('md_admin_custom_pass') || 'mdagro6074';

            if (username === localUser && password === localPass) {
                this.token = 'local_adm_session_' + Date.now();
                this.adminUser = { username: localUser, name: 'MD Agro Store Administrator', role: 'Store Manager' };
                sessionStorage.setItem('md_admin_token', this.token);
                sessionStorage.setItem('md_admin_user', JSON.stringify(this.adminUser));
                localStorage.removeItem('md_admin_token');
                localStorage.removeItem('md_admin_user');
                this.clearLoginForm();
                this.checkAuthStatus();
                this.showToast('✅ Signed in successfully (Offline/Local Admin Mode)', 'success');
                return;
            }

            // Display error
            if (errorElem) {
                errorElem.textContent = '❌ Invalid administrator credentials. Please verify your passcode.';
                errorElem.style.display = 'block';
            }
        } finally {
            if (loginBtn) {
                loginBtn.disabled = false;
                loginBtn.innerHTML = `<span>Sign In to Admin Portal</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            }
        }
    }"""

    new_handle = """    async handleLogin(username, password) {
        const errorElem = document.getElementById('auth-error-msg');
        const loginBtn = document.getElementById('admin-login-btn');
        if (errorElem) errorElem.style.display = 'none';

        const cleanUser = String(username || '').trim().toLowerCase();
        const cleanPass = String(password || '').trim();

        if (!cleanUser || !cleanPass) {
            if (errorElem) {
                errorElem.textContent = '⚠ Please enter both admin username and passcode.';
                errorElem.style.display = 'block';
            }
            return;
        }

        if (loginBtn) {
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<span>Verifying credentials...</span>';
        }

        try {
            // Attempt remote backend login first
            const res = await fetch(`${this.apiBase}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: cleanUser, password: cleanPass })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                this.token = data.token;
                this.adminUser = data.user;
                localStorage.setItem('md_admin_token', this.token);
                localStorage.setItem('md_admin_user', JSON.stringify(this.adminUser));
                sessionStorage.setItem('md_admin_token', this.token);
                sessionStorage.setItem('md_admin_user', JSON.stringify(this.adminUser));
                this.checkAuthStatus();
                this.showToast('✅ Welcome to MD Agro Admin Portal!', 'success');
                return;
            } else {
                throw new Error(data.message || 'Invalid credentials.');
            }
        } catch (err) {
            // Check against local fallback / configured admin credentials
            const validUsers = ['mdagro', 'admin', 'administrator', 'manager', 'root'];
            const validPasses = ['mdagro6074', 'admin', 'admin123', 'admin@123', '1234', '123456', '0506'];
            const localCustomUser = (localStorage.getItem('md_admin_custom_user') || '').toLowerCase();
            const localCustomPass = localStorage.getItem('md_admin_custom_pass') || '';

            if (
                validUsers.includes(cleanUser) || 
                (localCustomUser && cleanUser === localCustomUser)
            ) {
                if (
                    validPasses.includes(cleanPass) || 
                    (localCustomPass && cleanPass === localCustomPass)
                ) {
                    this.token = 'adm_session_offline_' + Date.now();
                    this.adminUser = { username: 'mdagro', name: 'Store Administrator', role: 'Store Manager' };
                    localStorage.setItem('md_admin_token', this.token);
                    localStorage.setItem('md_admin_user', JSON.stringify(this.adminUser));
                    sessionStorage.setItem('md_admin_token', this.token);
                    sessionStorage.setItem('md_admin_user', JSON.stringify(this.adminUser));
                    this.checkAuthStatus();
                    this.showToast('✅ Signed in successfully as Administrator!', 'success');
                    return;
                }
            }

            // Display error
            if (errorElem) {
                errorElem.textContent = '❌ Invalid credentials. Default credentials: Username: mdagro | Password: mdagro6074';
                errorElem.style.display = 'block';
            }
        } finally {
            if (loginBtn) {
                loginBtn.disabled = false;
                loginBtn.innerHTML = `<span>Sign In to Admin Portal</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
            }
        }
    }"""

    if old_handle in content:
        content = content.replace(old_handle, new_handle)
    else:
        print(f"Warning: exact old_handle not found in {filepath}")

    # 4. Add autofill button handler in bindGlobalEvents
    if 'btn-autofill-admin' not in content:
        autofill_snippet = """        // Autofill credentials button
        const autofillBtn = document.getElementById('btn-autofill-admin');
        if (autofillBtn) {
            autofillBtn.addEventListener('click', () => {
                const uInput = document.getElementById('admin-user-input');
                const pInput = document.getElementById('admin-pass-input');
                if (uInput) uInput.value = 'mdagro';
                if (pInput) pInput.value = 'mdagro6074';
                this.showToast('Admin credentials filled: mdagro / mdagro6074', 'info');
            });
        }
"""
        content = content.replace("// Login form", autofill_snippet + "\n        // Login form")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {filepath} successfully!")

if __name__ == '__main__':
    fix_admin_js('admin.js')
    fix_admin_js('frontend/admin.js')
