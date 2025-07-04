<template>
  <div class="contact-page">
    <div class="container">
      <section class="section contact-content">
        <div class="contact-grid grid grid-2">
          <div class="contact-form-container">
            <h2>Introduceți detaliile dumneavoastră</h2>
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
                <label for="checkIn">Check-in</label>
                <Datepicker v-model="form.checkIn" :format="'yyyy-MM-dd'" :disabled-date="isDateDisabled" required
                  ref="checkInPicker" />
              </div>

              <div class="form-group">
                <label for="checkOut">Check-out</label>
                <Datepicker v-model="form.checkOut" :format="'yyyy-MM-dd'" :disabled-date="isCheckOutDisabled" required
                  ref="checkOutPicker" />
              </div>


              <div v-if="isOverlapping" class="reservation-warning">
                Cabana este deja rezervată în perioada selectată. Te rugăm să alegi alte date.
              </div>
              <div v-if="isInvalidDateRange" class="reservation-warning">
                Data de check-in este ulterioară datei de check-out. Te rugăm să alegi un interval valid.
              </div>


              <div class="form-group total-amount" v-if="totalPrice">
                <strong>Total de plată:</strong> {{ totalPrice }} lei
              </div>

              <div class="form-group">
                <label for="message">Vă rugăm să scrieţi solicitările dvs.</label>
                <textarea id="message" v-model="form.message" rows="5" required></textarea>
              </div>

              <button type="submit" class="btn btn-full" :disabled="isOverlapping">Rezervă</button>

            </form>

          </div>

          <div class="cabin-info-card" v-if="cabin">
            <img :src="cabin.image" :alt="cabin.name" class="cabin-image" />

            <div class="cabin-details">
              <h2 class="cabin-name">{{ cabin.name }}</h2>

              <p class="location">
                <font-awesome-icon icon="map-marker-alt" />
                {{ cabin.location }}
              </p>

              <div class="info-grid">
                <div><font-awesome-icon icon="users" /> {{ cabin.capacity }} persoane</div>
                <div><font-awesome-icon icon="bed" /> {{ cabin.bedrooms }} dormitoare</div>
                <div><font-awesome-icon :icon="['fas', 'money-bill-wave']" /> {{ cabin.price }} lei / noapte</div>
              </div>



              <div v-if="cabin.amenities" class="section amenities-box">
                <h3>Facilități</h3>
                <ul class="amenities-list">
                  <li v-for="(item, index) in cabin.amenities.split(',')" :key="index">
                    <font-awesome-icon :icon="amenityIcons[item.trim()] || ['fas', 'check-circle']"
                      class="amenity-icon" />
                    {{ item.trim() }}
                  </li>
                </ul>


              </div>
              <div class="section">
                <h3>Descriere</h3>
                <p class="description">
                  {{ cabin.description || 'Descriere indisponibilă momentan.' }}
                </p>
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
  <div v-if="errorMessage" class="toast-error">
    {{ errorMessage }}
  </div>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { computed } from 'vue'
import Datepicker from 'vue3-datepicker'
import { watch } from 'vue';

const errorMessage = ref('');

const totalPrice = computed(() => {
  if (!form.checkIn || !form.checkOut || !cabin.value) return 0;

  const inDate = new Date(form.checkIn)
  const outDate = new Date(form.checkOut)

  const diffTime = outDate.getTime() - inDate.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays > 0 ? diffDays * cabin.value.price : 0
})

const router = useRouter();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  checkIn: undefined as Date | undefined,
  checkOut: undefined as Date | undefined,
  message: ''
})

watch(() => form.checkIn, (newCheckIn) => {
  if (form.checkOut && newCheckIn && form.checkOut <= newCheckIn) {
    form.checkOut = undefined;
  }
});


const formSubmitted = ref(false);

const submitForm = async () => {
  if (!cabin.value) {
    console.error('Cabana nu este încărcată.');
    return;
  }

  if (!form.checkIn || !form.checkOut) {
    errorMessage.value = 'Te rugăm să selectezi o perioadă validă.';
    return;
  }

  if (isOverlapping.value) {
    errorMessage.value = 'Perioada selectată este deja rezervată.';
    return;
  }

  const payload = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    message: form.message,
    checkIn: form.checkIn.toISOString(),
    checkOut: form.checkOut.toISOString(),
    cabinId: cabin.value.id,
    cabinName: cabin.value.name,
    cabinLocation: cabin.value.location,
    cabinCapacity: cabin.value.capacity,
    cabinBedrooms: cabin.value.bedrooms,
    cabinPrice: cabin.value.price,
    totalPrice: totalPrice.value

  };

  try {
    const response = await axios.post('http://172.20.10.3:5046/api/reservationrequest', payload);

    localStorage.setItem('reservation', JSON.stringify(response.data));

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    fetch('http://172.20.10.2:236/send', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: response.data.accessPin,
      signal: controller.signal
    })
      .then(async espResponse => {
        if (!espResponse.ok) {
          console.warn('ESP32 a răspuns cu eroare:', await espResponse.text());
        }
      })
      .catch(err => {
        console.warn('ESP32 nu a răspuns:', err.message);
      })
      .finally(() => {
        clearTimeout(timeout);
      });


    router.push('/ConfirmReservation');

    formSubmitted.value = true;
    setTimeout(() => {
      formSubmitted.value = false;
    }, 5000);

    form.name = '';
    form.email = '';
    form.phone = '';
    form.message = '';
    form.checkIn = undefined;
    form.checkOut = undefined;

  } catch (error: any) {
    if (error.response?.status === 409) {
      errorMessage.value = error.response.data.message;
      setTimeout(() => errorMessage.value = '', 4000);
    } else {
      console.error('Eroare generală la rezervare:', error);
      errorMessage.value = 'Eroare la salvarea rezervării.';
    }
  }
};


const amenityIcons: Record<string, [string, string]> = {
  WiFi: ['fas', 'wifi'],
  Parcare: ['fas', 'car'],
  Piscină: ['fas', 'swimming-pool'],
  TV: ['fas', 'tv'],
  'Aer condiționat': ['fas', 'snowflake'],
  Grătar: ['fas', 'fire'],
  Terasă: ['fas', 'umbrella-beach'],
  Saună: ['fas', 'hot-tub'],
  'Animale acceptate': ['fas', 'paw'],
  Bucătărie: ['fas', 'utensils'],
  Șemineu: ['fas', 'fire'],
  Jacuzzi: ['fas', 'bath'],
  'Mic dejun inclus': ['fas', 'coffee']
}

interface Cabin {
  id: number;
  name: string;
  location: string;
  image: string;
  capacity: number;
  bedrooms: number;
  price: number;
  totalPrice: number;
  description?: string;
  amenities?: string;
}

const cabin = ref<Cabin | null>(null);
const route = useRoute();
const reservedRanges = ref<{ checkIn: string; checkOut: string }[]>([]);

onMounted(async () => {
  try {
    const { data } = await axios.get(`http://172.20.10.3:5046/api/cabins/${route.params.id}`);
    cabin.value = {
      id: data.Id,
      name: data.Name,
      location: data.Location,
      image: data.Image,
      capacity: data.Capacity,
      bedrooms: data.Bedrooms,
      price: data.Price,
      totalPrice:data.TotalPrice,
      description: data.Description,
      amenities: data.Amenities
    
    };
  } catch (error) {
    console.error('Eroare la încărcarea cabanei:', error);
  }
  const { data } = await axios.get(`http://172.20.10.3:5046/api/cabins/reserved-dates/${route.params.id}`);
  reservedRanges.value = data;
});

const isDateDisabled = (date: Date) => {
  return reservedRanges.value.some(range => {
    const rStart = new Date(range.checkIn);
    const rEnd = new Date(range.checkOut);
    return date >= rStart && date <= rEnd;
  });
};
const isInvalidDateRange = computed(() => {
  return form.checkIn && form.checkOut && new Date(form.checkIn) > new Date(form.checkOut);
});
const isOverlapping = computed(() => {
  if (!form.checkIn || !form.checkOut) return false;

  const checkIn = form.checkIn;
  const checkOut = form.checkOut;

  return reservedRanges.value.some(range => {
    const rStart = new Date(range.checkIn);
    const rEnd = new Date(range.checkOut);

    return (
      (checkIn >= rStart && checkIn < rEnd) ||
      (checkOut > rStart && checkOut <= rEnd) ||
      (checkIn <= rStart && checkOut >= rEnd)
    );
  });
});


const isCheckOutDisabled = (date: Date) => {
  if (!form.checkIn) return isDateDisabled(date);

  return date <= form.checkIn ||        
    isDateDisabled(date)            

};


setTimeout(() => {
  formSubmitted.value = false;
}, 5000);


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
.toast-error {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f44336;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform: translateY(0%);
    opacity: 1;
  }
}

.reservation-warning {
  margin-top: 1rem;
  background-color: #ffe3e3;
  color: #c62828;
  border: 1px solid #f5c6cb;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
}

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

.cabin-info-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.cabin-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.cabin-details {
  padding: 2rem;
}

.cabin-name {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #002d1e;
}

.location {
  color: #666;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.info-grid {
  display: flex;
  gap: 1.5rem;
  font-size: 1rem;
  color: #444;
  margin-bottom: 1.5rem;
}

.description {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.section h3 {
  margin-bottom: 0.5rem;
  color: #004502;
  font-size: 1.2rem;
}

.amenities-box {
  background-color: #f1f6f4;
  padding: 1.5rem;
}

.amenities-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.5rem 1rem;
}

.amenity-icon {
  color: #2a7f4f;
  margin-right: 0.5rem;
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

/* Aplica stilul de input normal */
.form-group :deep(input),
.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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

.total-amount {
  font-size: 1.2rem;
  margin-top: 1rem;
  color: #004502;
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
