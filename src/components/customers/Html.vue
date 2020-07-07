<template>
  <div>
    <mains>
      <breakcrumb-app>Danh sách khách hàng</breakcrumb-app>
      <div id="content-box">
        <b-container>
          <div class="top-head-box">
            <form>
              <b-row>
                <b-col cols="3">
                  <b-form-group>
                    <label for="city-list">Tỉnh / Thành phố</label>
                    <treeselect v-model="valueCity" :multiple="false" :options="city" />
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <b-form-group>
                    <label for="city-list">Quận / Huyện</label>
                    <treeselect v-model="valueCountry" :multiple="false" :options="country" />
                  </b-form-group>
                </b-col>

                <b-col cols="3">
                  <b-form-group>
                    <label for="city-list">Thời gian quan tâm</label>
                    <date-picker v-model="time3" :lang="lang" range :shortcuts="shortcuts"></date-picker>
                  </b-form-group>
                </b-col>
              </b-row>
              <div class="mx-auto btn-filter" style="width:200px">
                <button type="submit">
                  <font-awesome-icon icon="search" />Lọc
                </button>
              </div>
            </form>
          </div>
          <div id="result">
            <hr />
            Tỉnh/tp : {{ valueCity }} --
            Quận huyện : {{ valueCountry }} --
            Thời gian : {{ time3 }}
          </div>
          <!-- danh sach khach hang -->
          <div class="control-list-box">
            <div class="head-list">
              <div class="left-head-list">
                <span>Hiển thị</span>
                <select name id>
                  <option value="1">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>bản ghi</span>
              </div>
              <div class="right-head-list">
                <p>
                  Hiển thị bản ghi
                  <strong>1 - 10</strong> trên tổng số
                  <strong>1000</strong> bản ghi
                </p>
              </div>
            </div>

            <div class="body-table">
              <b-table
                id="my-table-customer"
                hover
                fixed
                :items="items"
                :per-page="perPage"
                :current-page="currentPage"
                :fields="fields"
              >
                <template v-slot:cell(address)="row">{{ row.value.toUpperCase() }}</template>

                <template v-slot:cell(age)="age">
                  <b-button @click="$bvModal.show('bv-modal-example')">Popup</b-button>
                  <b-button @click="age.toggleDetails">show detail</b-button>
                  <b-button>{{ age.value}}</b-button>
                </template>

                <template v-slot:row-details="row">
                  <b-table-simple :table-variant="variant" fixed>
                    <!-- <tr>
                      <th style="width:33.333%">Phone number</th>
                      <th style="width:33.333%">address</th>
                      <th style="width:33.333%">age</th>
                    </tr> -->
                    <tr v-for="(child,index) in row.item.chirldItem" v-bind:key="index">
                      <td>{{ child.phone_number }}</td>
                      <td>{{ child.address }}</td>
                      <td>{{ child.age }}</td>
                    </tr>
                  </b-table-simple>
                </template>
              </b-table>
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table-customer"
              ></b-pagination>
            </div>
          </div>
        </b-container>

        <b-modal id="bv-modal-example" hide-footer>
          <template v-slot:modal-title>
            Using
            <code>$bvModal</code> Methods
          </template>
          <div class="d-block text-center">
            <h3>Hello From This Modal!</h3>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
        </b-modal>
      </div>
    </mains>
  </div>
</template>

<script>
import Mains from "../Main.vue";
import Breakcrumb from "../layouts/Breakcrumb.vue";
import Treeselect from "@riophae/vue-treeselect";
import DatePicker from "vue2-datepicker";

export default {
  data() {
    return {
      valueCity: null,
      valueCountry: null,
      valueNetwork: null,
      city: [
        { id: "1", label: "Tỉnh An Giang" },
        { id: "2", label: "Tỉnh Bình Định" },
        { id: "3", label: "Thành phố Hà Nội" },
        { id: "4", label: "Thành phố Hồ Chí Minh" }
      ],
      country: [
        { id: "1", label: "Tỉnh An Giang" },
        { id: "2", label: "Tỉnh Bình Định" },
        { id: "3", label: "Thành phố Hà Nội" },
        { id: "4", label: "Thành phố Hồ Chí Minh" }
      ],
      time3: "",
      lang: {
        days: ["CN", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7"],
        months: [
          "T1",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7",
          "T8",
          "T9",
          "T10",
          "T11",
          "T12"
        ],
        pickers: ["Sau 7 ngày", "Sau 30 ngày", "Trước 7 ngày", "Trước 30 ngày"],
        placeholder: {
          date: "Chọn ngày",
          dateRange: "Khoảng thời gian"
        }
      },

      shortcuts: [
        {
          text: "Hôm nay",
          onClick: () => {
            this.time3 = [new Date(), new Date()];
          }
        }
      ],

      fields: [
        {
          key: "phone_number",
          sortable: true,
          thStyle: { backGround: "#f00" }
        },
        { key: "address", sortable: false, thStyle: {} },
        { key: "age", sortable: true, thStyle: {} }
      ],
      items: [
        {
          isActive: true,
          age: 40,
          address: "Ha noi",
          phone_number: "0975969616",
          chirldItem: [
            {
              isActive: false,
              age: 21,
              address: "TP. HCM",
              phone_number: "0975969616"
            },
            {
              isActive: false,
              age: 22,
              address: "TP. HCM",
              phone_number: "0975969616"
            }
          ]
        },
        {
          isActive: false,
          age: 21,
          address: "TP. HCM",
          phone_number: "0975969616",
          chirldItem: [
            {
              isActive: false,
              age: 21,
              address: "TP. HCM",
              phone_number: "0975969616"
            },
            {
              isActive: false,
              age: 22,
              address: "TP. HCM",
              phone_number: "0975969616"
            }
          ]
        },
        {
          isActive: false,
          age: 89,
          address: "Da nang",
          phone_number: "0975969616",
          chirldItem: [
            {
              isActive: false,
              age: 21,
              address: "TP. HCM",
              phone_number: "0975969616"
            },
            {
              isActive: false,
              age: 22,
              address: "TP. HCM",
              phone_number: "0975969616"
            }
          ]
        },
        {
          isActive: true,
          age: 38,
          address: "Da lat",
          phone_number: "0975969616",
          chirldItem: [
            {
              isActive: false,
              age: 21,
              address: "TP. HCM",
              phone_number: "0975969616"
            },
            {
              isActive: false,
              age: 22,
              address: "TP. HCM",
              phone_number: "0975969616"
            }
          ]
        }
      ],
      perPage: 3,
      currentPage: 1,
      variant:"light"
    };
  },
  components: {
    Treeselect,
    DatePicker,
    Mains,
    "breakcrumb-app": Breakcrumb
  },
  computed: {
    rows() {
      return this.items.length;
    },
    user2 () {
        return this.$store.state.authentication.user;
    },
    info () {
        return this.$store.state.users.info;
    }
  }
};
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
.table.b-table > tbody > tr.b-table-details > td {
    border-top: none !important;
    padding: 0;
}
.table.b-table > tbody > tr.b-table-details > td table {
    margin: 0;
}
</style>