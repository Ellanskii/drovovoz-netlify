<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="~assets/buefy.png" alt="Buefy" height="28" />
          </a>
          <div class="navbar-burger">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div class="navbar-menu">
          <div class="navbar-item"><LangSwitcher /></div>
        </div>
      </div>
    </nav>

    <!-- <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li>
            <nuxt-link :to="localePath('index')">locale home</nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <BreadcrumbList />
        <nuxt />
      </div>
    </section> -->
    <nuxt />
  </div>
</template>

<script>
import LangSwitcher from '~/components/LangSwitcher'

export default {
  components: {
    LangSwitcher
  },
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
