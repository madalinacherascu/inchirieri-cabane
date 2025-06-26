<template>
  <div class="contact-page">
    <div class="page-header">
      <div class="container">
        <h1>Contactează-ne</h1>
        <p>Suntem aici pentru a răspunde întrebărilor tale și a te ajuta cu rezervările</p>
      </div>
    </div>

    <div class="container">
      <section class="section contact-content">
        <div class="contact-grid grid grid-2">


          <div class="contact-info">
            <h2>Informații de contact</h2>

            <div class="info-card">
              <div class="info-item">
                <div class="info-icon">
                  <font-awesome-icon icon="map-marker-alt" />
                </div>
                <div class="info-content">
                  <h3>Adresă</h3>
                  <p>Strada Muntelui, Nr. 123</p>
                  <p>Brașov, România</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <font-awesome-icon icon="phone" />
                </div>
                <div class="info-content">
                  <h3>Telefon</h3>
                  <p><a href="tel:+40722123456">+40 722 123 456</a></p>
                  <p><a href="tel:+40368123456">+40 368 123 456</a></p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <font-awesome-icon icon="envelope" />
                </div>
                <div class="info-content">
                  <h3>Email</h3>
                  <p><a href="mailto:contact@cabanemontane.ro">contact@cabanemontane.ro</a></p>
                  <p><a href="mailto:rezervari@cabanemontane.ro">rezervari@cabanemontane.ro</a></p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <font-awesome-icon icon="clock" />
                </div>
                <div class="info-content">
                  <h3>Program</h3>
                  <p>Luni - Vineri: 9:00 - 18:00</p>
                  <p>Sâmbătă: 10:00 - 15:00</p>
                  <p>Duminică: Închis</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section class="section faq">
        <h2 class="section-title">Întrebări frecvente</h2>

        <div class="faq-items">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ faq.question }}</h3>
              <font-awesome-icon :icon="activeFaq === index ? 'chevron-up' : 'chevron-down'" />
            </div>
            <div class="faq-answer" :class="{ active: activeFaq === index }">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const faqs = ref([
  {
    question: "Cum pot face o rezervare?",
    answer: "Poți face o rezervare direct pe site-ul nostru, prin telefon la numărul +40 722 123 456 sau prin email la rezervari@cabanemontane.ro. Recomandăm rezervarea din timp, mai ales în sezonul de vârf."
  },
  {
    question: "Care este politica de anulare?",
    answer: "Pentru anulările făcute cu cel puțin 7 zile înainte de data check-in-ului, se returnează integral suma plătită. Pentru anulările făcute între 3-7 zile înainte, se returnează 50% din sumă. Pentru anulările făcute cu mai puțin de 3 zile înainte, suma nu se returnează."
  },
  {
    question: "Se acceptă animale de companie?",
    answer: "Unele dintre cabanele noastre acceptă animale de companie, dar este necesar să verifici această informație în descrierea fiecărei cabane. Pentru cabanele care acceptă animale de companie, se percepe o taxă suplimentară."
  },
  {
    question: "Care este ora de check-in și check-out?",
    answer: "Ora standard de check-in este 15:00, iar cea de check-out este 11:00. În anumite situații, cu acordul prealabil, aceste ore pot fi flexibile."
  },
  {
    question: "Cabanele sunt dotate cu bucătărie complet utilată?",
    answer: "Da, toate cabanele noastre sunt dotate cu bucătărie complet utilată, inclusiv aragaz, frigider, cuptor cu microunde, veselă și tacâmuri, ceainic electric și cafetieră."
  }
]);

const activeFaq = ref(-1);

const toggleFaq = (index: number) => {
  if (activeFaq.value === index) {
    activeFaq.value = -1;
  } else {
    activeFaq.value = index;
  }
};
</script>

<style scoped>

.page-header {
  height: 40vh;
  min-height: 300px;
  background-image: linear-gradient(rgba(10, 68, 68, 0.5), rgba(255, 255, 255, 0.5)), url('https://ext.same-assets.com/0/2960537118.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-white);
  position: relative;
  z-index: 0; /* pentru referință */
  
}

.page-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 50px;
  background: #f4f6f4; /* sau #f8fafc dacă ai alta culoare mai deschisă jos */
  border-top-left-radius: 100% 100px;
  border-top-right-radius: 100% 100px;
  z-index: -1; /* 🟢 esențial: trimite curbura sub conținut */
}


.page-header-content {
  max-width: 800px;
  padding: 0 1rem;
}

.page-header h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: var(--color-white);
}

.page-header p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.contact-form-container {
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 2rem;
}

.contact-form-container h2 {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  font-family: var(--font-family-body);
}

.form-group textarea {
  resize: vertical;
}

.btn-full {
  width: 100%;
}

.form-success {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #e6f7e6;
  color: #2e7d32;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.form-success svg {
  font-size: 1.5rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-info h2 {
  margin-bottom: 1.5rem;
}

.info-card {
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item {
  display: flex;
  gap: 1rem;
}

.info-icon {
  font-size: 1.5rem;
  color: var(--color-accent);
  margin-top: 0.25rem;
}

.info-content h3 {
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
}

.social-links h3 {
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  color: var(--color-white);
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.social-icons a:hover {
  background-color: var(--color-accent);
}

.faq {
  margin-top: 4rem;
}

.faq-items {
  margin-top: 2rem;
}

.faq-item {
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--color-white);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #f9f9f9;
}

.faq-question h3 {
  margin: 0;
  font-size: 1.125rem;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  padding: 0 1.5rem;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-answer.active {
  max-height: 500px;
  padding: 0 1.5rem 1.5rem;
}

@media (max-width: 992px) {
  .contact-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
