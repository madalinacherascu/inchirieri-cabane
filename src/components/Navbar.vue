<template>
  <header class="header">
    <div class="top-bar">
      <div class="container">
        <div class="top-bar-content">
          <div class="contact-info">
            <a href="tel:+40741583639"><font-awesome-icon icon="phone" /> +40 741 583 639</a>
            <a href="mailto:cabanemontane@yahoo.com"><font-awesome-icon icon="envelope" /> contact@cabanemontane.ro</a>
          </div>
          <div class="social-icons">
            <a href="#" aria-label="Facebook"><font-awesome-icon :icon="['fab', 'facebook-f']" /></a>
            <a href="#" aria-label="Instagram"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
            <a href="#" aria-label="Twitter"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
            <a href="#" aria-label="Youtube"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
          </div>
        </div>
      </div>
    </div>

    <nav class="navbar">
      <div class="container">
        <div class="navbar-content">
          <router-link to="/" class="logo">
            <span class="logo-text">CabaneMontane</span>
          </router-link>

          <div class="menu-toggle" @click="toggleMenu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>

          <ul class="nav-menu" :class="{ 'active': menuOpen }">
            <li><router-link to="/">Acasă</router-link></li>
            <li><router-link to="/cabane">Cabane</router-link></li>
            <li><router-link to="/locatii">Locații</router-link></li>
            <li><router-link to="/despre">Despre noi</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>

          <div class="nav-actions-wrapper">
            <template v-if="user">
              <div class="user-dropdown">
                <div class="user-trigger" @click.stop="toggleDropdown">

                  <div v-if="user">
                    👤 Bună, {{ user.Name }}
                    <span class="caret">▾</span>
                  </div>

                </div>
                <div v-if="showDropdown" class="dropdown-menu">
                  <router-link to="/contul-meu">Contul meu</router-link>
                  <router-link to="/rezervarile-mele">Rezervările mele</router-link>
                  <button @click="logout">Logout</button>
                </div>
              </div>
            </template>

            <template v-else>
              <router-link to="/registration" class="btn">Înregistrare</router-link>
              <router-link to="/authentification" class="btn">Autentificare</router-link>
            </template>

          </div>

        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const menuOpen = ref(false);
const user = ref<{ Name: string; email: string; id: string } | null>(null);

const showDropdown = ref(false);

onMounted(() => {
  const stored = localStorage.getItem('user');
  if (stored) {
    try {
      user.value = JSON.parse(stored); 
      console.log("User din localStorage:", user.value);
    } catch (e) {
      console.warn('Eroare la citirea user din localStorage:', e);
    }
  }

  document.addEventListener('click', handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleOutsideClick);
});
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = '/logout';
};



const handleOutsideClick = (event: MouseEvent) => {
  const dropdown = document.querySelector('.user-dropdown');
  if (dropdown && !dropdown.contains(event.target as Node)) {
    showDropdown.value = false;
  }
};




</script>

<style scoped>
.user-dropdown {
  position: relative;
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
}

.caret {
  font-size: 0.75rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: var(--color-white);
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  min-width: 160px;
  z-index: 999;
}

.dropdown-menu a,
.dropdown-menu button {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.95rem;
  color: var(--color-dark);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  background-color: #f3f3f3;
}

.user-greeting {
  font-weight: 500;
  padding: 0.5rem 0.75rem;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-outline:hover {
  background-color: var(--color-primary);
  color: white;
}

.nav-actions-wrapper {
  display: flex;
  gap: 0.5rem;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.top-bar {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 0.5rem 0;
  font-size: 0.875rem;
}

.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-info {
  display: flex;
  gap: 1.5rem;
}

.contact-info a {
  color: var(--color-white);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons a {
  color: var(--color-white);
  font-size: 1rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: var(--color-accent);
}

.navbar {
  background-color: var(--color-white);
  box-shadow: var(--shadow);
  padding: 1rem 0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-family: var(--font-family-heading);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-primary);
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu li a {
  color: var(--color-dark);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
}

.nav-menu li a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-accent);
  transition: width 0.3s ease;
}

.nav-menu li a:hover::after,
.nav-menu li a.router-link-active::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: var(--color-primary);
  transition: transform 0.3s ease;
}

@media (max-width: 992px) {
  .nav-actions {
    display: none;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
    z-index: 2;
  }

  .menuOpen .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .menuOpen .bar:nth-child(2) {
    opacity: 0;
  }

  .menuOpen .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background-color: var(--color-white);
    flex-direction: column;
    padding: 6rem 2rem 2rem;
    transition: right 0.3s ease;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  }

  .nav-menu.active {
    right: 0;
  }

  .contact-info {
    display: none;
  }
}
</style>
