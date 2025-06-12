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
          <div class="contact-form-container">
            <h2>Trimite-ne un mesaj</h2>
            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Nume complet</label>
                <input id="name" type="text" v-model="form.name" required />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" v-model="form.email" required />
              </div>

              <div class="form-group">
                <label for="phone">Telefon</label>
                <input id="phone" type="tel" v-model="form.phone" />
              </div>

              <div class="form-group">
                <label for="subject">Subiect</label>
                <select id="subject" v-model="form.subject" required>
                  <option value="">Selectează subiectul</option>
                  <option value="rezervare">Informații rezervare</option>
                  <option value="anulare">Anulare rezervare</option>
                  <option value="informatii">Informații generale</option>
                  <option value="feedback">Feedback</option>
                  <option value="altele">Altele</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Mesaj</label>
                <textarea id="message" v-model="form.message" rows="5" required></textarea>
              </div>

              <button type="submit" class="btn btn-full">Trimite mesaj</button>
            </form>

            <div class="form-success" v-if="formSubmitted">
              <font-awesome-icon icon="check" />
              <p>Mulțumim pentru mesaj! Te vom contacta în curând.</p>
            </div>
          </div>

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

            <div class="social-links">
              <h3>Urmărește-ne</h3>
              <div class="social-icons">
                <a href="#" aria-label="Facebook"><font-awesome-icon :icon="['fab', 'facebook-f']" /></a>
                <a href="#" aria-label="Instagram"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
                <a href="#" aria-label="Twitter"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
                <a href="#" aria-label="Youtube"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
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
import { ref, reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const formSubmitted = ref(false);

const submitForm = () => {
  console.log('Formular trimis:', form);

  form.name = '';
  form.email = '';
  form.phone = '';
  form.subject = '';
  form.message = '';

  formSubmitted.value = true;

  setTimeout(() => {
    formSubmitted.value = false;
  }, 5000);
};

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
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 4rem 0;
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  color: var(--color-white);
  margin-bottom: 1rem;
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
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
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
