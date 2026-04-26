# Smart Menu PWA

A premium, responsive Progressive Web App (PWA) designed for modern restaurant order management.

## 🚀 Features
- **Dynamic Menu**: Categorized menu items with image support.
- **Table Management**: Easily assign and track orders by table number.
- **Security**: Custom passcode-protected admin modal for management features.
- **PWA Ready**: Installable on Android and iOS with offline capabilities.
- **Premium Design**: Dark mode aesthetics with glassmorphism and smooth animations.

---

## 🔐 Admin Management Guide

Access to "Manage Menu" and "Manage Tables" is restricted to authorized staff via a passcode.

### How to Add/Change Admin Passcodes

All security logic is handled in `app.js` within the `confirmAdminPin` function.

#### 1. Adding a new passcode
Search for the following line in `app.js`:
```javascript
if (pin === '77375' || pin === '644056') {
```

To add another passcode (e.g., `123456`), simply add `|| pin === '123456'` inside the parentheses:
```javascript
if (pin === '77375' || pin === '644056' || pin === '123456') {
```

#### 2. Best Practice: Using an Array
If you have many staff members with different codes, you can refactor the code in `app.js` to look like this for better organization:

```javascript
function confirmAdminPin() {
  const pin = els.adminPinInput.value;
  
  // List all valid passcodes here
  const validPins = ['77375', '644056', '123456', '888999']; 

  if (validPins.includes(pin)) {
    isAdmin = true;
    localStorage.setItem('wh_is_admin', 'true');
    applyAdminState();
    closeAdminModal();
    showToast('Admin access granted');
  } else {
    showToast('Invalid passcode', 'error');
    if (typeof hapticFeedback === 'function') hapticFeedback('error');
    els.adminPinInput.value = '';
    els.adminPinInput.focus();
  }
}
```

---

## 🛠️ Technical Details
- **Core**: Vanilla JavaScript, HTML5, CSS3.
- **Storage**: `localStorage` for menu persistence and admin state.
- **Icons**: SVG-based system for crisp visuals on all resolutions.
- **Images**: AI-generated food photography located in `/images`.

---
*Maintained by Antigravity AI*
