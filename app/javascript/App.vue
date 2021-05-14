<template>
  <div>
    <v-app>
      <v-main>
        <v-container>
          <div>
            <v-toolbar
              prominent
              src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
              <v-app-bar-nav-icon />
              <v-toolbar-title>Vuetify</v-toolbar-title>
              <v-spacer>
                <v-btn value="recent">
                  <router-link :to="{ name: 'EmployeeIndexPage'}">
                    {{ "index" }}
                  </router-link>
                  <v-icon>mdi-history</v-icon>
                </v-btn>

                <v-btn value="favorites">
                  <router-link :to="{ name: 'EmployeeNewPage'}">
                    {{ "new" }}
                  </router-link>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                
                <v-btn value="map">
                  <router-link :to="{ name: 'Map'}">
                    {{ "Map" }}
                  </router-link>
                  <v-icon>mdi-map-marker</v-icon>
                </v-btn>
              </v-spacer>
              <v-btn icon>
                <v-icon>mdi-export</v-icon>
              </v-btn>
            </v-toolbar>
          </div>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
  export default {
    data: () => ({ value: 1,
     collapseOnScroll: true,
     }),
    
  }
</script>