<template>
  <div class="about-page">
    <div class="page-header">
      <div class="container">
        <h1>Despre CabaneMontane</h1>
        <p>Experiențe autentice în mijlocul naturii</p>
      </div>
    </div>

    <div class="container">
      <section class="section about-content">
        <div class="about-grid grid grid-2">
          <div class="about-text">
            <h2>Povestea noastră</h2>
            <p>CabaneMontane a luat naștere din pasiunea noastră pentru natură și dorința de a oferi experiențe autentice în inima munților României. Cu peste 10 ani de experiență în domeniul turismului montan, am creat o rețea de cabane atent selectate în cele mai pitorești locații.</p>
            <p>Ne-am început activitatea în 2013 cu doar trei cabane în zona Brașov, iar astăzi suntem mândri să oferim peste 50 de opțiuni de cazare în diverse regiuni montane din țară.</p>
            <p>Filosofia noastră este simplă: să conectăm oamenii cu natura, oferindu-le în același timp confortul și facilitățile necesare pentru o experiență de neuitat.</p>
            <h2>Misiunea noastră</h2>
            <p>Ne propunem să devenim prima alegere pentru cei care caută o evadare din agitația urbană și doresc să descopere frumusețea naturii românești, într-un cadru autentic și confortabil.</p>
          </div>
          <div class="about-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKcyq4ukzBIdatrentbxJ1e21Of7H3d7J1Hw&s" alt="Cabană montană" />
          </div>
        </div>
      </section>

      <section class="section values">
        <h2 class="section-title">Valorile noastre</h2>

        <div class="values-grid grid grid-3">
          <div class="value-card">
            <div class="value-icon">
              <font-awesome-icon icon="mountain" />
            </div>
            <h3>Respect pentru natură</h3>
            <p>Promovăm turismul responsabil și sustenabil, cu un impact minim asupra mediului înconjurător.</p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <font-awesome-icon icon="check" />
            </div>
            <h3>Calitate și confort</h3>
            <p>Toate cabanele noastre sunt atent verificate și întreținute pentru a oferi o experiență plăcută și confortabilă.</p>
          </div>

          <div class="value-card">
            <div class="value-icon">
              <font-awesome-icon icon="users" />
            </div>
            <h3>Experiențe autentice</h3>
            <p>Încurajăm descoperirea tradițiilor locale și conectarea cu natura într-un cadru autentic montan.</p>
          </div>
        </div>
      </section>

      <section class="section team">
        <h2 class="section-title">Echipa noastră</h2>

        <div class="team-grid grid grid-4">
          <div class="team-member" v-for="member in teamMembers" :key="member.id">
            <div class="member-image">
              <img :src="member.image" :alt="member.name" />
            </div>
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <p class="member-position">{{ member.position }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section stats">
        <div class="stats-grid grid grid-4">
          <div class="stat-card">
            <div class="stat-number">50+</div>
            <div class="stat-label">Cabane disponibile</div>
          </div>

          <div class="stat-card">
            <div class="stat-number">10+</div>
            <div class="stat-label">Ani de experiență</div>
          </div>

          <div class="stat-card">
            <div class="stat-number">15k+</div>
            <div class="stat-label">Clienți mulțumiți</div>
          </div>

          <div class="stat-card">
            <div class="stat-number">4</div>
            <div class="stat-label">Regiuni montane</div>
          </div>
        </div>
      </section>

      <section class="section cta">
        <div class="cta-content">
          <h2>Pregătit să descoperi experiența CabaneMontane?</h2>
          <p>Rezervă acum și bucură-te de momente de neuitat în inima naturii!</p>
          <router-link to="/cabane" class="btn btn-lg">Explorează cabane</router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const teamMembers = ref([
  {
    id: 1,
    name: "Tudor Enescu",
    position: "Fondator & CEO",
    image: "https://cdn.discordapp.com/attachments/1187360644144574536/1354429623487696966/image.png?ex=67e54262&is=67e3f0e2&hm=49cf73da9a588392d9efcb022dfd165d681528259b46be86b2156de2f9d5e8c7&"
  },
  {
    id: 2,
    name: "Madalina Cherascu",
    position: "Director Marketing",
    image: "https://ext.same-assets.com/0/23449360.png"
  },
  {
    id: 3,
    name: "Violeta Bodnarescu",
    position: "Manager Operațiuni",
    image: "https://ext.same-assets.com/0/1015342165.png"
  },
  {
    id: 4,
    name: "Sinisa Firulovic",
    position: "Specialist Relații Clienți",
    image: "https://ext.same-assets.com/0/2583908852.png"
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

.about-content {
  margin-bottom: 3rem;
}

.about-text h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.about-text h2:first-child {
  margin-top: 0;
}

.about-text p {
  margin-bottom: 1.25rem;
  line-height: 1.7;
}

.about-image {
  height: 100%;
  min-height: 400px;
}

.about-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.value-card {
  background-color: var(--color-white);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
}

.team-member {
  text-align: center;
}

.member-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1.5rem;
  border: 3px solid var(--color-accent);
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-info h3 {
  margin-bottom: 0.5rem;
}

.member-position {
  color: var(--color-secondary);
  font-weight: 500;
}

.stats {
  background-color: var(--color-primary);
  padding: 4rem 0;
  margin: 4rem 0;
  color: var(--color-white);
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.125rem;
}

.cta {
  text-align: center;
  padding: 3rem 0;
}

.cta h2 {
  margin-bottom: 1rem;
}

.cta p {
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.btn-lg {
  font-size: 1.125rem;
  padding: 1rem 2rem;
}

@media (max-width: 992px) {
  .about-grid {
    display: flex;
    flex-direction: column-reverse;
  }

  .about-image {
    margin-bottom: 2rem;
    min-height: 300px;
  }

  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
