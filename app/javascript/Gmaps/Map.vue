<template>
  <v-app>
    <v-main>
      <v-container>
        <div>
          <v-row>
            <v-col
              cols="8"
              md="8"
            >
              <v-text-field
                v-model="address"
                label="住所入力"
                required
              />
            </v-col>
            <v-col
              cols="4"
              md="4"
            >
              <v-btn
                color="primary"
                depressed
                elevation="2"
                outlined
                rounded
                @click="mapSearch"
              >
                位置検索
              </v-btn>
              <v-btn
                color="secondary"
                depressed
                elevation="2"
                outlined
                rounded
                @click="getList"
              >
                リスト読み込み
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <div
              class="map"
              ref="googleMap"
            />
          </v-row>
          <v-row>
            <v-col
              cols="12" 
              md="12"
            >
              <v-simple-table
                dense
                fixed-header
              >
                <template v-slot:default>
                  <thead>
                    <th>id</th>
                    <th>address</th>
                    <th>lat</th>
                    <th>lng</th>
                  </thead>
                  <tbody>
                    <tr
                      v-for="address in addressList"
                      :key="address.id"
                    >
                      <template v-if="address.location">
                        <td>{{ address.id }}</td>
                        <td>{{ address.address }}</td>
                        <td>{{ address.location.lat() }}</td>
                        <td>{{ address.location.lng() }}</td>
                      </template>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import axios from 'axios';
export default {
  data () {
    return {
      address: '',
      marker: null,
      google: null,
      geocoder: {},
      addressList: {},
      mapConfig: {
        center: {
          lat: 35.68944,
          lng: 139.69167
        },
        zoom: 17
      },
      location: {},
      markerLayer: []
    }
  },
  async mounted () {
    this.google = await GoogleMapsApiLoader({
      libraries: ['places'],
      apiKey: 'AIzaSyAGWhzbT56YwFb852arM2D4RpBMMRrV6QI'
    })
    this.initializeMap()
  },
  methods: {
    initializeMap () {
      this.map = new this.google.maps.Map(this.$refs.googleMap, this.mapConfig)
      this.geocoder = new this.google.maps.Geocoder()
    },
    mapSearch () {
      this.geocoder.geocode({
        address: this.address
      }, (results, status) => {
        if (status === this.google.maps.GeocoderStatus.OK) {
          this.map.setCenter(results[0].geometry.location)
          // 緯度経度の取得
          this.marker = new this.google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location
          })
        }
      })
    },
    async getList () {
      const response = await axios.get('/api/v1/locations')
      if (response) {
        this.addressList = response.data
        this.geoCoding(this.createMarker)
      }
    },
    geoCoding (callback) {
      let cRef = this.addressList.length
      const _this = this // 関数内でthisが参照できないので変数へ保持
      for (var i = 0; i < this.addressList.length; i++) {
        // 即時関数
        (function (i) {
          _this.geocoder.geocode ({
            address: _this.addressList[i].address
          }, (results, status) => {
            if (status === _this.google.maps.GeocoderStatus.OK) {
              // 緯度経度の取得
              // console.log(results[0].geometry.location.lat())
              // console.log(results[0].geometry.location.lng())
              _this.$set(_this.addressList[i], 'location', results[0].geometry.location)
            }
            if (--cRef <= 0) {
               callback()
            }
          })
        })(i)
      }
    },
    createMarker () {
      this.deleteMarker()
      this.addressList.forEach(el => {
        const marker = new this.google.maps.Marker({
          map: this.map,
          position: el.location
        })
        this.markerLayer.push(marker)
        this.markerFitBounds()
      })
    },
    markerFitBounds () {
      let minX = this.markerLayer[0].getPosition().lng()
      let minY = this.markerLayer[0].getPosition().lat()
      let maxX = this.markerLayer[0].getPosition().lng()
      let maxY = this.markerLayer[0].getPosition().lat()
      this.markerLayer.forEach(el => {
        const lt = el.getPosition().lat()
        const lg = el.getPosition().lng()
        if (lg <= minX) { minX = lg }
        if (lg > maxX) { maxX = lg }
        if (lt <= minY) { minY = lt }
        if (lt > maxY) { maxY = lt }
      })
      const sw = new this.google.maps.LatLng(maxY, minX)
      const ne = new this.google.maps.LatLng(minY, maxX)
      const bounds = new this.google.maps.LatLngBounds(sw, ne)
      this.map.fitBounds(bounds)
    },
    deleteMarker () {
      if (this.markerLayer.length > 0) {
        this.markerLayer.forEach(el => {
          el.setMap(null)
          console.log('deleteMarker')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.map {
  width: 80vw;
  height: 80vh;
}
</style>
