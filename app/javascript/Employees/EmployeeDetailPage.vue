<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Department
          </th>
          <th class="text-left">
            Gender
          </th>
          <th class="text-left">
            Birth
          </th>
          <th class="text-left">
            Joined Date
          </th>
          <th class="text-left">
            Payment
          </th>
          <th class="text-left">
            Note
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ employee.birth }}</td>
          <td>{{ employee.joined_date }}</td>
          <td>{{ employee.payment }}</td>
          <td>{{ employee.note }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      employee: {}
    }
  },
  mounted () {
    axios
      .get(`/api/v1/employees/${this.$route.params.id}.json`)
      .then(response => (this.employee = response.data))
  }
}
</script>

<style scoped>
</style>