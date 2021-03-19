<template>
  <div class="list">
    <div class="list__filters">
      <div class="search_field">
        <span></span>
        <input v-model="searchText" type="text" placeholder="Поиск" />
      </div>
      <div class="actions">
        <button class="button" @click="isViewForm = true">
          Добавить товар
        </button>
      </div>
    </div>
    <div class="list__table">
      <table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.key" :class="header.class">
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
                :class="header.class"
              >
                {{ viewData(item, header.key) }}
              </td>
              <td v-else :key="`${index}${header.title}`" :class="header.class">
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
          key: 'count',
          title: 'Количество',
        },
        {
          key: 'price',
          title: 'Цена за кг',
        },
        // {
        //   key: 'totalBoxes',
        //   title: 'Количество ящиков',
        // },
        // {
        //   key: 'weightBox',
        //   title: 'Вес тары, кг',
        // },
        {
          key: 'totalPrice',
          title: 'Стоимость всего',
        },
        {
          key: 'dataArrived',
          title: 'Дата привоза',
        },
        {
          key: 'actions',
          title: 'Действия',
          class: 'text-right'
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
        case 'count':
        // case 'weightBox':
          return `${item[key]} кг.`;
        // case 'totalBoxes':
        //  return `${item[key]} шт.`;
        case 'totalPrice':
          return `${item.count * item.price} р.`
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
      document.body.classList.remove('active__modal')
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
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search_field {
      width: 20%;

      input {
        width: 100%;
        padding: 10px 20px;
        padding-left: 40px;
        border: 2px solid gray;
        border-radius: 14px;
        font-size: 14px;
        font-weight: 400;
        outline: none;

        &:focus,
        &:active {
          border-color: $light-green;
        }
      }

      span {
        position: relative;

        &:before {
          content: ' ';
          position: absolute;
          display: block;
          top: 1px;
          left: 16px;
          width: 16px;
          height: 16px;
          background-image: url('../assets/svg/search.svg');
          opacity: 0.4;
        }
      }
    }
  }

  .actions {
    .button {
      padding: 10px 20px;
      border: none;
      border-radius: 14px;
      background: $dark-green;
      font-size: 16px;
      font-weight: 500;
      color: white;
      transition: 0.3s ease-in-out;

      &:hover {
        background: $light-green;
        color: white;
        transition: 0.3s ease-in-out;
      }
    }
  }

  &__table {
    table {
      width: 100%;
      border-collapse: collapse;

      th {
        padding: 8px;
        font-size: 14px;
        text-align: left;
        border-bottom: 1px solid black;
        font-weight: 600;
      }

      tbody > tr {
        transition: 0.2s;
        &:hover {
          background-color: rgba($color: black, $alpha: 0.1);
          transition: 0.2s;
        }
      }

      td {
        padding: 8px;
        font-size: 14px;
        font-weight: 400;

        .actions {
          display: flex;
          justify-content: flex-end;
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
