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
            <template v-for="header in headers">
              <td
                v-if="header.key !== 'actions'"
                :key="`${index}${header.title}`"
              >
                {{ viewData(item, header.key) }}
              </td>
              <td v-else :key="`${index}${header.title}`">
                <div class="actions">
                  <button class="edit_button" @click="editItem(item)">
                    <i class="fas fa-pen"></i>
                  </button>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <v-form-item v-if="isViewForm" :item="selectItem" @close="closeForm" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import VFormItem from '@/components/VFormItem.vue';

export default {
  name: 'VTable',
  components: {
    VFormItem,
  },
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
      isViewForm: false,
      selectItem: null,
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
    editItem(item) {
      this.selectItem = item;
      this.isViewForm = true;
    },
    closeForm() {
      this.isViewForm = false;
      this.selectItem = null;
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

        .actions {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }

      .edit_button {
        border: none;
        background: none;

        i {
          color: $dark-gray;
          font-size: 16px;

          &:hover {
            color: $light-green;
          }
        }
      }
    }
  }
}
</style>
