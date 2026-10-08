const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const translations = {
  en: {
    nav_about: "About", nav_programs: "Programs", nav_model: "Our model", nav_impact: "Impact", nav_transparency: "Transparency", nav_donate: "Donate",
    hero_eyebrow: "Love that serves. Training that lasts.", hero_title: "We arrive, we stay, and we leave a legacy.", hero_text: "We work alongside communities to sow hope, develop talent and create lasting opportunities through training, service and accompaniment.", hero_donate: "Make a donation", hero_learn: "Explore our work",
    trust_1: "learning spaces", trust_2: "talent and purpose", trust_3: "skills and opportunities",
    card_kicker: "An international vision", card_title: "We do more than deliver aid. We leave tools to move forward.", card_note: "Academies · workshops · outreach · accompaniment",
    about_eyebrow: "Who we are", about_title: "A response designed to transform, not only assist.", about_p1: "Sembrando con Amor a las Naciones was born as a response to a reality that crosses borders: many communities receive temporary assistance, yet still need access to training, accompaniment and opportunities that endure.", about_p2: "Our mission is to serve with love and dignity, strengthen families and equip people to transform their surroundings. Our work is inspired by Christian principles of compassion, service, integrity and responsible stewardship.",
    programs_eyebrow: "Programs", programs_title: "Practical training that opens real possibilities.", programs_intro: "We create free or accessible spaces where children, young people and families can learn, discover skills and build a path of growth.",
    p1_title: "Music and arts", p1_text: "Music, visual arts, creative expression and literature workshops that develop talent, discipline and confidence.", p2_title: "Trades and skills", p2_text: "Cooking, entrepreneurship and other practical workshops that can become tools for self-sufficiency.", p3_title: "Mothers and families", p3_text: "Training and accompaniment for mothers, especially single mothers, strengthening skills and opportunities.", p4_title: "Inclusion", p4_text: "Spaces sensitive to children and young people with special needs, promoting dignity, participation and development.",
    model_eyebrow: "Our model", model_title: "From immediate assistance to impact that lasts.", s1_title: "We arrive", s1_text: "We listen, serve and respond to concrete needs through outreach, partnerships and community action.", s2_title: "We stay", s2_text: "We establish workshops, academies and in-person and online training processes.", s3_title: "We equip", s3_text: "We develop skills, character, leadership, values, entrepreneurship and purpose.", s4_title: "We leave a legacy", s4_text: "We seek to ensure that local capabilities continue creating opportunities from within the community itself.",
    impact_eyebrow: "Long-term vision", impact_title: "An International Network of Sembrando con Amor Academies.", impact_text: "Our vision is to establish in-person spaces and online platforms that bring training, accompaniment and opportunities to more communities and nations.", impact_a_title: "In person", impact_a_text: "Academies, workshops and community training centers.", impact_b_title: "Online", impact_b_text: "Content and training that expand reach beyond borders.", impact_c_title: "Partnerships", impact_c_text: "Joint work with volunteers, organizations, businesses and institutions.",
    trans_eyebrow: "Transparency", trans_title: "Every donation should have purpose, traceability and accountability.", trans_text: "Trust is built by clearly showing how resources are managed and what results they produce. This section is designed to publish reports, funded projects and institutional documents as they become available.", trans_1: "Periodic project and impact reports", trans_2: "Use of funds by program", trans_3: "Institutional and governance documents", trans_4: "Privacy and responsible data-use policies", tax_note: "Note: the tax deductibility of a donation depends on the organization's current legal and tax status. The website should not promise deductions until the corresponding determination is in place.",
    cta_eyebrow: "Be part of the sowing", cta_title: "Your contribution can become a class, a workshop, a tool or a new opportunity.", cta_btn: "Donate now", footer_desc: "We serve to train, accompany and leave capabilities that endure.", footer_links: "Links", footer_contact: "Contact", footer_rights: "All rights reserved.", email_placeholder: "Replace this email with the official address before publishing.",
    donate_eyebrow: "Make a contribution", donate_title: "Help us sow opportunities.", donate_intro: "Choose the amount and where you would like your donation directed. You will be redirected to Stripe to complete payment securely.", once: "One time", monthly: "Monthly", custom_amount: "Other amount (USD)", designation_label: "Direct to", des_general: "Where most needed", des_academies: "Academies and workshops", des_brigades: "Outreach and community aid", des_mothers: "Mothers and families", des_inclusion: "Inclusion programs", continue_securely: "Continue securely", secure_note: "🔒 Card information does not pass through this website; payment is completed in Stripe Checkout.", processing: "Opening secure checkout…", error: "We could not open the payment page. Please try again."
  }
};

let currentLang = "es";
const originalText = new Map();
$$('[data-i18n]').forEach(el => originalText.set(el, el.textContent));

function setLanguage(lang){
  currentLang = lang;
  document.documentElement.lang = lang;
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = lang === 'en' ? (translations.en[key] || originalText.get(el)) : originalText.get(el);
  });
  $('#langBtn').textContent = lang === 'es' ? 'EN' : 'ES';
}

$('#langBtn').addEventListener('click', () => setLanguage(currentLang === 'es' ? 'en' : 'es'));

const nav = $('#nav');
const navToggle = $('#navToggle');
navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
$$('#nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const modal = $('#donateModal');
function openDonate(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); setTimeout(() => $('#customAmount').focus(), 80); }
function closeDonate(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
$$('[data-open-donate]').forEach(btn => btn.addEventListener('click', openDonate));
$$('[data-close-donate]').forEach(btn => btn.addEventListener('click', closeDonate));
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeDonate(); });

$$('.frequency-btn').forEach(btn => btn.addEventListener('click', () => {
  $$('.frequency-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  $('#frequencyInput').value = btn.dataset.frequency;
}));

$$('.amount-btn').forEach(btn => btn.addEventListener('click', () => {
  $$('.amount-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  $('#customAmount').value = btn.dataset.amount;
}));
$('#customAmount').addEventListener('input', () => $$('.amount-btn').forEach(b => b.classList.toggle('active', b.dataset.amount === $('#customAmount').value)));

$('#donationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const amount = Number($('#customAmount').value);
  const frequency = $('#frequencyInput').value;
  const designation = $('#designation').value;
  const submit = $('#donateSubmit');
  const status = $('#formStatus');
  if (!Number.isFinite(amount) || amount < 5) {
    status.textContent = currentLang === 'en' ? 'Minimum donation: US$5.' : 'Donación mínima: US$5.';
    return;
  }
  submit.disabled = true;
  status.textContent = currentLang === 'en' ? translations.en.processing : 'Abriendo pago seguro…';
  try {
    const response = await fetch('/api/create-donation-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, frequency, designation, locale: currentLang })
    });
    const data = await response.json();
    if (!response.ok || !data.url) throw new Error(data.error || 'Checkout error');
    window.location.href = data.url;
  } catch (err) {
    console.error(err);
    status.textContent = currentLang === 'en' ? translations.en.error : 'No pudimos abrir la página de pago. Intenta de nuevo.';
    submit.disabled = false;
  }
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
$$('.reveal').forEach(el => observer.observe(el));
$('#year').textContent = new Date().getFullYear();
