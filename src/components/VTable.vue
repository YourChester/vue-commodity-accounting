<template>
  <div class="list">
    <div class="list__filters"></div>
    <div class="list__table">
      <table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.key">
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="header in headers" :key="`${index}${header.title}`">
              {{ viewData(item, header.key) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'VTable',
  data() {
    return {
      headers: [
        {
          key: 'numberItem',
          title: 'Номер №',
        },
        {
          key: 'name',
          title: 'Наименование товара',
        },
        {
          key: 'price',
          title: 'Цена за кг',
        },
        {
          key: 'weight',
          title: 'Вес, кг',
        },
        {
          key: 'totalBoxes',
          title: 'Количество ящиков',
        },
        {
          key: 'weightBox',
          title: 'Вес тары, кг',
        },
        {
          key: 'dataArrived',
          title: 'Дата привоза',
        },
        {
          key: 'actions',
          title: 'Действия',
        },
      ],
    };
  },
  created() {
    this.$store.dispatch('fetchItems');
  },
  computed: {
    ...mapGetters({
      items: 'getItems',
    }),
  },
  methods: {
    viewData(item, key) {
      switch (key) {
        case 'dataArrived':
          return item[key]
            .split('-')
            .reverse()
            .join('.');
        case 'price':
          return `${item[key]} р.`;
        case 'weight':
        case 'weightBox':
          return `${item[key]} кг.`;
        case 'totalBoxes':
          return `${item[key]} шт.`;
        default:
          return item[key];
      }
    },
  },
};
</script>

<style lang="scss">
.list {
  &__table {
    table {
      width: 100%;
      border-collapse: collapse;

      th {
        padding: 10px;
        font-size: 16px;
        text-align: left;
        border-bottom: 1px solid black;
      }

      td {
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}
</style>
