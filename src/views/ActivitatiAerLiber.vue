<template>
  <div class="activities-page">
    <div class="container">
      <h1>Activități în aer liber</h1>
      <p class="intro">
        Profită de aerul curat și de peisajele spectaculoase ale munților printr-o varietate de activități recreative
        disponibile în apropierea cabanelor noastre.
      </p>

      <div class="activities-list">
        <div class="activity-card" v-for="activity in activities" :key="activity.id">
          <img :src="activity.image" :alt="activity.title" class="activity-image" />
          <div class="activity-content">
            <h2>{{ activity.title }}</h2>
            <p>{{ activity.description }}</p>
            <p><strong>Durată recomandată:</strong> {{ activity.duration }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Activity {
  id: number
  title: string
  description: string
  duration: string
  image: string
}

const activities: Activity[] = [
  {
    id: 1,
    title: 'Drumeții montane',
    description: 'Explorează trasee spectaculoase prin păduri și pe creste montane. Ghiduri disponibile la cerere.',
    duration: '2-6 ore',
    image: 'https://res.cloudinary.com/aerdevacanta-ro/image/upload/w_550,c_scale/v1621499595/Top%2010%20cele%20mai%20frumoase%20trasee%20montane%20din%20Rom%C3%A2nia/Trasee_montane_%C3%AEn_Mun%C8%9Bii_Bucegi_y1f39t.jpg'
  },
  {
    id: 2,
    title: 'Plimbări cu bicicleta',
    description: 'Trasee marcate pentru cicloturism montan. Biciclete disponibile pentru închiriere.',
    duration: '1-4 ore',
    image: 'https://media.istockphoto.com/id/1402134774/ro/fotografie/ciclist-rutier-profesionist-pe-o-plimbare-de-formare.jpg?s=2048x2048&w=is&k=20&c=8dc4UOxVDxBRQ_Jj96gMUe_iZaccTpuyV-vrZL_-ZOQ='
    },
  {
    id: 3,
    title: 'Foc de tabără & grătar',
    description: 'Bucură-te de o seară relaxantă cu prietenii, muzică și preparate tradiționale.',
    duration: 'după-amiază/seară',
    image: 'https://media.istockphoto.com/id/1324579691/ro/fotografie/redarea-3d-a-focului-mare-de-tabara-cu-scantei-si-particule-in-fata-molizilor-si-a.jpg?s=612x612&w=0&k=20&c=pIqgeGyNih74nNTaWs74YvrptKawPoCACao8WMtR324='
  },
  {
    id: 4,
    title: 'Tir cu arcul',
    description: 'Activitate distractivă și sigură pentru toate vârstele. Instructor inclus.',
    duration: '1 oră',
    image: 'https://media.istockphoto.com/id/1164128278/ro/fotografie/femeia-cu-scopul-de-tir-cu-arcul.jpg?s=2048x2048&w=is&k=20&c=urBFFbA88nhdmN6cHbIrwy8-Jwp3Q1XUjC-q5N0Iy6k='
  }
]
</script>

<style scoped>
.activities-page {
  padding: 2rem 0;
  background-color: #f9f9f9;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 2.2rem;
  color: #004502;
  margin-bottom: 1rem;
}

.intro {
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.6;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.activity-card {
  display: flex;
  flex-direction: column;
  background: #f6fef6;
  border: 1px solid #d8eeda;
  border-radius: 10px;
  overflow: hidden;
}

.activity-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.activity-content {
  padding: 1.5rem;
}

h2 {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
}
</style>
