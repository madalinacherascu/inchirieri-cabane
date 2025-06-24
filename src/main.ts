import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome, faSearch, faMapMarkerAlt, faBed, faCalendarAlt,
  faUsers, faPhone, faEnvelope, faInfoCircle, faChevronRight,
  faChevronDown, faCheck, faMountain, faTree, faChevronUp, faClock,faUser,faMoneyBillWave,
  faWifi,faCar,
  faSwimmingPool,
  faTv,
  faSnowflake,
  faFire,
  faUmbrellaBeach,
  faHotTub,
  faPaw,
  faUtensils,
  faBath,
  faCoffee,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF, faTwitter, faInstagram, faYoutube
} from '@fortawesome/free-brands-svg-icons'

import App from './App.vue'
import './style.css'

import Home from './views/Home.vue'
import Cabane from './views/Cabane.vue'
import Locatii from './views/Locatii.vue'
import Despre from './views/Despre.vue'
import Contact from './views/Contact.vue'
import CabinDetails from './views/CabinDetails.vue'
import Authentification from './views/Authentification.vue'
import Registration from './views/Registration.vue'
import LogoutSucces from './views/LogoutSucces.vue'
import ResetareParola from './views/ResetareParola.vue'
import RezervareCabana from './views/RezervareCabana.vue'
import ConfirmReservation from './views/ConfirmReservation.vue'
import SearchResult from './views/SearchResult.vue'
import TermeniConditii from './views/TermeniConditii.vue'
import PoliticaConfidentialitate from './views/PoliticaConfidentialitate.vue'
import Cookies from './views/Cookies.vue'
import TraseeMontane from './views/TraseeMontane.vue'
import ActivitatiAerLiber from './views/ActivitatiAerLiber.vue'
import EvenimenteSpeciale from './views/EvenimenteSpeciale.vue'
import OferteSezoniere from './views/OferteSezoniere.vue'
import ContulMeu from './views/ContulMeu.vue'



library.add(
  faHome, faSearch, faMapMarkerAlt, faBed, faCalendarAlt,
  faUsers, faPhone, faEnvelope, faInfoCircle, faChevronRight,
  faChevronDown, faChevronUp, faCheck, faMountain, faTree, faClock,
  faFacebookF, faTwitter, faInstagram, faYoutube,faUser,faMoneyBillWave,
  faWifi,
  faCar,
  faSwimmingPool,
  faTv,
  faSnowflake,
  faFire,
  faUmbrellaBeach,
  faHotTub,
  faPaw,
  faUtensils,
  faBath,
  faCoffee,
  faCheckCircle
)

const routes = [
  { path: '/', component: Home },
  { path: '/cabane', component: Cabane },
  { path: '/locatii/:id', component: Locatii },
    { path: '/locatii', component: Locatii },
  { path: '/despre', component: Despre },
  { path: '/contact', component: Contact },
  { path: '/cabaneDetails/:id', component: CabinDetails },
  { path:'/authentification', component: Authentification},
  { path:'/registration', component : Registration},
  { path: '/logout', component: LogoutSucces},
  { path:'/ResetareParola', component: ResetareParola},
  {path:'/rezervareCabane/:id', component: RezervareCabana},
  {path: '/ConfirmReservation',component:ConfirmReservation},
  { path: '/search', name: 'SearchResults', component: SearchResult },
  { path: '/contul-meu', component: ContulMeu },
  { path: '/termeniConditii', component: TermeniConditii },
  { path: '/politicaCondifentialitate', component: PoliticaConfidentialitate },
  { path: '/cookies', component: Cookies },
  { path: '/traseeMontane', component: TraseeMontane },
  { path: '/activitatiAerLiber', component: ActivitatiAerLiber },
  { path: '/evenimenteSpeciale', component: EvenimenteSpeciale },
  { path: '/oferteSezoniere', component: OferteSezoniere },
   { path: '/contulMeu', component: ContulMeu },


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
