# Genova Payment Modal  

**Version:** 1.0.0  

This script provides a simple, self-contained modal solution for integrating Genova payments into your website.  

## Features  
- **Self-contained**: Creates all necessary HTML elements and styles dynamically.  
- **Zero dependencies**: No need for external libraries.  
- **Easy to use**: Just include the script and add your payment buttons.  
- **Exposed API**: Provides global methods for custom integrations.  

---

## 🔧 Installation  

### 1️⃣ Include the script in your HTML file:  

```html
<script src="https://cdn.jsdelivr.net/gh/Genova-Official/popup/popup3.js"></script>
```

---

## 🛠 How to Use  

### 2️⃣ Add a payment button:  

Use a button or link with the `data-payment-id` attribute:  

```html
<button class="genova-pay-button" data-payment-id="2">Pay Now</button>

<!-- OR -->

<a href="#" data-genova-pay data-payment-id="2">Make Payment</a>
```

When clicked, the modal will automatically open with the corresponding payment page.

---

## 📌 JavaScript API  

You can control the modal programmatically using the exposed **GenovaPay** object:  

### ➤ Open the modal manually:  
```javascript
GenovaPay.openModal('2'); // Replace '2' with the actual payment ID
```

### ➤ Close the modal manually:  
```javascript
GenovaPay.closeModal();
```

### ➤ Initialize the script manually (for dynamically added buttons):  
```javascript
GenovaPay.init();
```

---

## 🎨 Customization  

The modal appearance can be customized by modifying the CSS styles inside the `addModalStyles()` function in the script.  

---

## 🛑 Troubleshooting  

**Issue:** The payment modal is not opening.  
✅ **Solution:** Ensure the button has a `data-payment-id` attribute.  

**Issue:** The close button is not working.  
✅ **Solution:** Ensure the script is correctly included in your HTML before usage.  

---

## 🚀 License  

This script is open-source and available for public use. Feel free to modify it to fit your needs.  

---

Need help? Contact **Genova Support**. 🚀
