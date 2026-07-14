const selected = [];
const UPI_ID = 'killerboisonu-3@okicici';
const MERCHANT_NAME = 'WTF Momos';
const returningCustomer = document.querySelector('.returning-customer');
const modal = document.querySelector('.order-modal');
const orderMessage = document.querySelector('.order-message');
const selectedItems = document.querySelector('.selected-items');

document.querySelector('#year').textContent = new Date().getFullYear();

function showOrder() {
  selectedItems.innerHTML = selected.length
    ? selected.map(item => `<span>${item}</span>`).join('')
    : '';
  orderMessage.textContent = selected.length
    ? 'Your delicious choices are ready to go.'
    : 'Choose an item from the menu, then come back here.';
  modal.showModal();
}

document.querySelectorAll('.add-order').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.dataset.item;
    if (!selected.includes(item)) selected.push(item);
    showOrder();
  });
});

document.querySelectorAll('.order-trigger, a[href="#order"]').forEach(trigger => {
  trigger.addEventListener('click', event => { event.preventDefault(); showOrder(); });
});

document.querySelector('.modal-close').addEventListener('click', () => modal.close());
document.querySelectorAll('.payment-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.payment-option').forEach(item => item.classList.remove('selected'));
    option.classList.add('selected');
    document.querySelector('.upi-preview').style.display = option.dataset.payment === 'UPI' ? 'flex' : 'none';
  });
});

document.querySelector('.checkout-button').addEventListener('click', () => {
  const payment = document.querySelector('.payment-option.selected').dataset.payment;
  const order = selected.length ? selected.join(', ') : 'an order';
  if (payment === 'UPI') {
    const note = encodeURIComponent(`WTF Momos: ${order}`);
    window.location.href = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(MERCHANT_NAME)}&tn=${note}`;
    return;
  }
  document.querySelector('.checkout-button').innerHTML = 'Add payment details to activate <span>→</span>';
});

document.querySelector('.paid-button').addEventListener('click', () => {
  returningCustomer.classList.add('active');
});

document.querySelector('.returning-check').addEventListener('change', event => {
  returningCustomer.classList.toggle('unlocked', event.target.checked);
});

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
