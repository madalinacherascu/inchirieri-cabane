<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h3 class="logo-text">CabaneMontane</h3>
            <p>Experiențe de neuitat în inima naturii.</p>
            <div class="social-icons">
              <a href="#" aria-label="Facebook"><font-awesome-icon :icon="['fab', 'facebook-f']" /></a>
              <a href="#" aria-label="Instagram"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
              <a href="#" aria-label="Twitter"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
              <a href="#" aria-label="Youtube"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
            </div>
          </div>

          <div class="footer-nav">
            <h4>Navigare</h4>
            <ul>
              <li><router-link to="/">Acasă</router-link></li>
              <li><router-link to="/cabane">Cabane</router-link></li>
              <li><router-link to="/locatii">Locații</router-link></li>
              <li><router-link to="/despre">Despre noi</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
            </ul>
          </div>

          <div class="footer-services">
            <h4>Servicii</h4>
            <ul>
              <li><a href="/cabane">Închirieri cabane</a></li>
              <li><a href="/activitatiAerLiber">Activități în aer liber</a></li>
              <li><a href="/traseeMontane">Trasee montane</a></li>
              <li><a href="/evenimenteSpeciale">Evenimente speciale</a></li>
              <li><a href="/oferteSezoniere">Oferte sezoniere</a></li>
            </ul>
          </div>

          <div class="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li>
                <font-awesome-icon icon="map-marker-alt" />
                <span>Str. Muntelui, Nr. 123, Brașov</span>
              </li>
              <li>
                <font-awesome-icon icon="phone" />
                <a href="tel:+40741583639">+40 741 583 639</a>
              </li>
              <li>
                <font-awesome-icon icon="envelope" />
                <a href="mailto:cabanemontane@yahoo.com">contact@cabanemontane.ro</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} CabaneMontane. Toate drepturile rezervate.</p>
        <div class="footer-links">
          <a href="/termeniConditii">Termeni și condiții</a>
          <a href="/politicaCondifentialitate">Politica de confidențialitate</a>
          <a href="/cookies">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>


<style scoped>
.footer {
  background-color: var(--color-primary);
  color: var(--color-light);
}

.footer-main {
  padding: 4rem 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.logo-text {
  font-family: var(--font-family-heading);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--color-accent);
}

.footer-logo p {
  margin-bottom: 1.5rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons a {
  color: var(--color-light);
  font-size: 1rem;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: var(--color-accent);
}

.footer h4 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--color-accent);
}

.footer ul {
  list-style: none;
  padding: 0;
}

.footer ul li {
  margin-bottom: 0.75rem;
}

.footer ul li a {
  color: var(--color-light);
  transition: color 0.3s ease;
}

.footer ul li a:hover {
  color: var(--color-accent);
}

.footer-contact ul li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.footer-contact ul li svg {
  margin-top: 4px;
  color: var(--color-accent);
}

.footer-bottom {
  padding: 1.5rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: var(--color-light);
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .footer-bottom .container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
