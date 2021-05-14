<template>
  <v-form
    v-model="valid"
    @submit.prevent="submit"
  >
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="employee.name"
          :rules="nameRules"
          :counter="10"
          label="Name"
          required
        />
      </v-col>
  
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="employee.department"
          :counter="10"
          label="Department"
          required
        />
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          v-model="employee.gender"
          item-text="employee.gender"
          item-value="employee.gender"
          :items="items"
          label="Gender"
          return-object
        />
      </v-col>
  
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="employee.birth"
          label="Birth"
          type="date"
          required
        />
      </v-col>
  
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="employee.joined_date"
          label="Joined Date"
          type="date"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="employee.payment"
          label="Payment"
          type="number"
          min="0"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="employee.note"
          label="Note"
          type="text"
        />
      </v-col>
      <v-btn
        class="mr-4"
        type="submit"
      >
        commit
      </v-btn>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    employee: {},
    errors: ''
  },
  data: () => ({
      valid: false,
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      items: ['other', 'male', 'female'],
    }),
    methods:{
      submit () {
        this.$emit('submit')
        console.log("test")
      },
    }
}
</script>

<style>
</style>