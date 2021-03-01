<template>
  <div class="list">
    <div class="list__filters">
      <div class="search_field">
        <input v-model="searchText" type="text" placeholder="Поиск" />
      </div>
    </div>
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
          <tr v-for="(item, index) in getFiltredItems" :key="index">
            <template v-for="header in headers">
              <td
                v-if="header.key !== 'actions'"
                :key="`${index}${header.title}`"
              >
                {{ viewData(item, header.key) }}
              </td>
              <td v-else :key="`${index}${header.title}`">
                <div class="actions">
                  <button class="action_btn edit_btn" @click="editItem(item)">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button
                    class="action_btn delete_btn"
                    @click="deleteItem(item)"
                  >
                    <i class="fas fa-trash"></i>
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
          key: 'weight',
          title: 'Вес, кг',
        },
        {
          key: 'price',
          title: 'Цена за кг',
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
      searchText: '',
    };
  },
  created() {
    this.$store.dispatch('fetchItems');
  },
  computed: {
    ...mapGetters({
      items: 'getItems',
    }),
    getFiltredItems() {
      return this.searchText
        ? this.items.filter((item) => {
            if (
              item.name.includes(this.searchText) ||
              item.numberItem.includes(this.searchText)
            ) {
              return item;
            }
          })
        : this.items;
    },
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
    deleteItem(item) {
      this.$store.dispatch('deleteItem', item);
    },
  },
};
</script>

<style lang="scss">
.list {
  &__filters {
    padding: 20px;

    .search_field {
      position: relative;
      width: 30%;

      input {
        width: 100%;
        padding: 10px 20px;
        padding-left: 40px;
        border: 1px solid black;
        border-radius: 14px;
        font-size: 16px;
        font-weight: 400;
        outline: none;

        &:focus,
        &:active {
          border-color: $light-green;
        }
      }

      &:before {
        content: ' ';
        position: absolute;
        display: block;
        top: 12px;
        left: 16px;
        width: 16px;
        height: 16px;
        background-image: url('../assets/svg/search.svg');
        opacity: 0.4;
        z-index: 100;
      }
    }
  }

  &__table {
    table {
      width: 100%;
      border-collapse: collapse;

      th {
        padding: 10px;
        font-size: 16px;
        text-align: left;
        border-bottom: 1px solid black;
        font-weight: 500;
      }

      tr {
        transition: 0.2s;
        &:hover {
          background-color: rgba($color: black, $alpha: 0.1);
          transition: 0.2s;
        }
      }

      td {
        padding: 10px;
        font-size: 14px;
        font-weight: 400;

        .actions {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }

      .action_btn {
        border: none;
        background: none;

        i {
          color: $dark-gray;
          font-size: 16px;
          transition: 0.3s;

          &:hover {
            color: $light-green;
            transition: 0.3s;
          }
        }
      }

      .delete_btn {
        margin-left: 10px;
      }
    }
  }
}
</style>
