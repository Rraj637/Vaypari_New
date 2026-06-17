/* =======================================================================================
  🟢 [VYAPARI ENGINE LAYER] LOGIC CONTROLLER
  SYSTEM ANALYSIS: Vyapari platform ki core computational logic handle karta hai,
  jisme live invoice billing, GST tax derivation, aur digital agency service fee integration shamil hai.
  =======================================================================================
*/

// ----------------=====================================================
// 1. BURGER MENU LOGIC (Mobile Navigation Controller)
// LOGIC: Mobile screens par menu ko toggle karne ke liye burger button se class 'active' manage karta hai.
// ----------------=====================================================
const burger = document.getElementById("burger");
const navMenu = document.getElementById("nav-menu");

burger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// ----------------=====================================================
// 2. DOM SELECTORS (HTML Elements ko Vyapari System se connect karna)
// LOGIC: document.getElementById() hamare HTML tags ke 'id' attribute ko read karke
// unhe Vyapari JS engine ke liye access points mein convert karta hai.
// ----------------=====================================================
const itemPriceInput = document.getElementById("itemPrice"); // Vyapari Invoice base amount input
const gstRateSelect = document.getElementById("gstRate"); // Vyapari GST tax slab controller
const includeWebCheckbox = document.getElementById("includeWebsite"); // Vyapari Digital Agency service toggle

const taxResultDisplay = document.getElementById("taxResult"); // Calculated GST tax display element
const webResultDisplay = document.getElementById("webResult"); // Website agency fee display element
const grandTotalDisplay = document.getElementById("grandTotalResult"); // Vyapari Final Invoice Total

// ----------------=====================================================
// 3. MAIN CORE CALCULATION LOGIC (Vyapari Billing Engine)
// LOGIC: Yeh function real-time mein user inputs ko process karta hai aur instant financial figures generate karta hai.
// ----------------=====================================================
function calculateVaypariInvoiceMetrics() {
  // (A) Inputs se values nikalna aur string text ko numbers (parseFloat) mein cast karna
  const basePrice = parseFloat(itemPriceInput.value) || 0;
  const gstPercentage = parseFloat(gstRateSelect.value) || 0;

  // (B) GST Tax calculate karna: Formula = (Base Price * GST Rate) / 100
  const calculatedTax = (basePrice * gstPercentage) / 100;

  // (C) Conditional Logic: Agar Vaypari digital service check hai to ₹5,000 extra load, warna ₹0
  let websiteServiceFee = 0;
  if (includeWebCheckbox.checked) {
    websiteServiceFee = 5000;
  }

  // (D) Vaypari Grand Total ki final calculation
  const grandTotal = basePrice + calculatedTax + websiteServiceFee;

  // (E) RESULTS DOM UPDATION (Calculated values ko Vaypari UI dashboard par paint karna)
  // .toLocaleString('en-IN') currency format ko Indian numbering systems (₹) mein standardise karta hai.
  taxResultDisplay.textContent =
    "₹" +
    calculatedTax.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  webResultDisplay.textContent =
    "₹" +
    websiteServiceFee.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  grandTotalDisplay.textContent =
    "₹" +
    grandTotal.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}

// ----------------=====================================================
// 4. EVENT LISTENERS (Vyapari System Triggers)
// LOGIC: Yeh browser ke events (input/change) ko monitor karte hain taaki user ke badlav
// par Vaypari engine automatic recalculate kare.
// ----------------=====================================================

// Jab user amount field mein input karega
itemPriceInput.addEventListener("input", calculateVaypariInvoiceMetrics);

// Jab user GST slab dropdown menu change karega
gstRateSelect.addEventListener("change", calculateVaypariInvoiceMetrics);

// Jab user website agency service checkbox ko toggle karega
includeWebCheckbox.addEventListener("change", calculateVaypariInvoiceMetrics);

// System initialize: Page load hote hi default values par calculation run karna
calculateVaypariInvoiceMetrics();
