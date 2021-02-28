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
              {{ item[header.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

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
      items: [],
    };
  },
  created() {
    this.getItem();
  },
  methods: {
    async getItem() {
      try {
        await firebase
          .firestore()
          .collection('items')
          .get()
          .then((items) => {
            items.forEach((item) => {
              this.items.push(item.data());
            });
          });
      } catch (e) {
        console.log(e);
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
