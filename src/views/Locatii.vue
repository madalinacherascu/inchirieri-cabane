<template>
  <div class="locations-page">
    <div class="page-header">
      <div class="container">
        <h1>Locații disponibile</h1>
        <p>Descoperă zonele noastre montane cu cele mai frumoase peisaje din România</p>
      </div>
    </div>

    <div class="container">
      <section class="section">
        <div class="locations-grid grid grid-2">
          <div class="location-card-large" v-for="location in locations" :key="location.id">
            <div class="location-image">
              <img :src="location.image" :alt="location.name" />
            </div>
            <div class="location-content">
              <h2>{{ location.name }}</h2>
              <p>{{ location.description }}</p>
              <div class="location-info">
                <div class="info-item">
                  <font-awesome-icon icon="mountain" />
                  <span>{{ location.altitude }} m altitudine</span>
                </div>
                <div class="info-item">
                  <font-awesome-icon icon="home" />
                  <span>{{ location.cabinCount }} cabane disponibile</span>
                </div>
              </div>
              <router-link :to="`/cabane`" class="btn">Explorează cabane</router-link>
            </div>
          </div>
        </div>
      </section>

      <section class="section attractions">
        <h2 class="section-title">Atracții turistice populare</h2>

        <div class="attractions-grid grid grid-3">
          <div class="attraction-card" v-for="attraction in attractions" :key="attraction.id">
            <div class="attraction-image">
              <img :src="attraction.image" :alt="attraction.name" />
            </div>
            <div class="attraction-content">
              <h3>{{ attraction.name }}</h3>
              <p>{{ attraction.description }}</p>
              <div class="attraction-location">
                <font-awesome-icon icon="map-marker-alt" />
                <span>{{ attraction.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Date pentru locații
const locations = ref([
  {
    id: 1,
    name: "Brașov și împrejurimi",
    image: "https://iturist.ro/wp-content/uploads/2022/08/obiective-turistice-Brasov.jpg",
    description: "Descoperă frumusețea orașului Brașov și a împrejurimilor sale. De la pârtiile din Poiana Brașov până la peisajele spectaculoase din Cheile Râșnoavei, această zonă oferă oportunități variate de cazare și activități în aer liber.",
    altitude: 800,
    cabinCount: 15
  },
  {
    id: 2,
    name: "Valea Prahovei",
    image: "https://blog.hotelguru.ro/wp-content/uploads/2015/07/Castelul-Peles-Valea-Prahovei.jpg",
    description: "Valea Prahovei, cu stațiunile sale renumite precum Sinaia, Bușteni și Predeal, este una dintre cele mai populare destinații montane din România, oferind peisaje impresionante și numeroase atracții turistice.",
    altitude: 950,
    cabinCount: 24
  },
  {
    id: 3,
    name: "Rucăr-Bran",
    image: "https://transylvanianinn.ro/wp-content/uploads/2024/05/8db119118b3f0871c6ec-3000x1686.jpg",
    description: "Zona Rucăr-Bran, cunoscută pentru peisajele pitorești și pentru celebrul Castel Bran, oferă un cadru natural deosebit pentru o evadare în natură și descoperirea tradițiilor locale autentice.",
    altitude: 1100,
    cabinCount: 10
  },
  {
    id: 4,
    name: "Zona Bucegi",
    image: "https://wel.ro/wp-content/uploads/2023/05/muntiibucegi3.webp",
    description: "Munții Bucegi, cu vârfurile lor impresionante și formațiunile stâncoase unice precum Babele și Sfinxul, reprezintă o destinație perfectă pentru iubitorii de drumeții și peisaje spectaculoase.",
    altitude: 1400,
    cabinCount: 8
  }
]);

const attractions = ref([
  {
    id: 1,
    name: "Castelul Bran",
    image: "https://transylvania.de-weekend.ro/wp-content/uploads/2023/10/castelul-bran2.jpg",
    description: "Cunoscut și ca \"Castelul lui Dracula\", această construcție medievală este una dintre cele mai vizitate atracții din România.",
    location: "Bran, Brașov"
  },
  {
    id: 2,
    name: "Castelul Peleș",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Castelul_Peles%2C_Sinaia_-_Vedere_panoramica.jpg",
    description: "Un impresionant castel regal construit în stil neo-renascentist german, considerat una dintre cele mai frumoase castele din Europa.",
    location: "Sinaia, Prahova"
  },
  {
    id: 3,
    name: "Cetatea Râșnov",
    image: "https://brasovtrip.ro/wp-content/uploads/2023/10/Cetatea-Rasnov.webp",
    description: "O impunătoare fortăreață medievală construită în secolul al XIV-lea pentru a proteja satele transilvănene de invazii.",
    location: "Râșnov, Brașov"
  },
  {
    id: 4,
    name: "Biserica Neagră",
    image: "https://coltisorderomania.ro/wp-content/uploads/2020/02/bn000.jpg",
    description: "Un monument gotic impresionant și cea mai mare biserică în stil gotic din sud-estul Europei.",
    location: "Brașov"
  },
  {
    id: 5,
    name: "Canionul Șapte Scări",
    image: "https://suspemunte.com/uploads/images/thumbs/1136--0/traseu-canionul-7-scari-cabana-piatra-mare.webp",
    description: "Un defileu spectaculos format din șapte cascade, amenajat cu scări și poduri metalice pentru vizitatori.",
    location: "Săcele, Brașov"
  },
  {
    id: 6,
    name: "Platoul Bucegi",
    image: "https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img/https://letswandertogether.com/wp-content/uploads/2018/05/IMG_20170729_143035.jpg",
    description: "Un loc unic cu formațiuni stâncoase precum Babele și Sfinxul, cu panorame spectaculoase asupra munților.",
    location: "Munții Bucegi"
  },
  {
    id: 7,
    name: "Strada Sforii",
    image: "https://www.alohotels.ro/uploads/images/Screenshot_2_5.jpg",
    description: "Strada Sforii, aflată între străzile străzile Cerbului și Poarta Șchei, este cea de a treia cea mai îngustă stradă a Europei, având o lungime de 80 m și o lătime de aprox 1.3 m. ",
    location: "Brașov"
  },
  {
    id: 7,
    name: "Poarta Ecaterinei",
    image: "https://www.alohotels.ro/uploads/images/resize.jpg",
    description: "Poarta Ecaterinei este o construcție grandioasă reprezentând imaginea arhitecturală a Transilvaniei.  ",
    location: "Brașov"
  }
]);
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

.location-card-large {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
}

.location-image {
  height: 300px;
}

.location-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.location-content {
  padding: 2rem;
}

.location-content h2 {
  margin-bottom: 1rem;
}

.location-info {
  display: flex;
  gap: 2rem;
  margin: 1.5rem 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-secondary);
}

.location-content .btn {
  margin-top: 1rem;
}

.attractions {
  margin-top: 2rem;
}

.attraction-card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.attraction-card:hover {
  transform: translateY(-5px);
}

.attraction-image {
  height: 200px;
}

.attraction-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.attraction-content {
  padding: 1.5rem;
}

.attraction-content h3 {
  margin-bottom: 0.75rem;
}

.attraction-content p {
  margin-bottom: 1rem;
  color: var(--color-dark);
}

.attraction-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-gray);
}

@media (max-width: 992px) {
  .location-card-large {
    flex-direction: column;
  }

  .location-image {
    height: 250px;
  }

  .location-info {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
