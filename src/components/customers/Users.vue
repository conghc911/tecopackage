<template>
  <div>
    <mains>
      <breakcrumb-app>Quản lý tài khoản</breakcrumb-app>
      <div id="content-box">
        <b-container>
          <b-col cols="12" v-if="isNotice">
            <b-alert show variant="success">{{ notice }}</b-alert>
          </b-col>
          <div class="top-head-box margin-frm">
            <form>
              <b-row>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Vai trò" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-model="valueMod"
                        :multiple="false"
                        :options="dataMod"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        @input="handleChangeVaitro($event)"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Tên đăng nhập" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-model="valueUser"
                        :multiple="true"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :options="dataUser"
                        @input = "submit_from()"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-model="valueStatus"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        :multiple="false"
                        :options="dataStatus"
                        @input = "submit_from()"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12" md="6" lg="6">
                  <b-col cols="12" md="12" lg="12" class="frm-group-cs">
                    <b-input-group prepend="Ngày tạo" class="mb-2 mr-sm-2 mb-sm-0">
                      <div class="custom-prepend">
                        <date-picker
                          v-model="time3"
                          :lang="lang"
                          range
                          value-type="format"
                          format="YYYY-MM-DD"
                          range-separator =" đến "
                          :shortcuts="shortcuts"
                          @input = "submit_from()"
                        ></date-picker>
                      </div>
                    </b-input-group>
                  </b-col>
                </b-col>
              </b-row>
              <div class="mx-auto btn-filter" style="width:500px">
                <button v-on:click="submit_from($event)">
                  <font-awesome-icon icon="search" /> Lọc
                </button>
                <span class="addnew addUser" @click="$bvModal.show('bv-modal-create'), resetForm() ">
                  <font-awesome-icon icon="user-plus" /> Thêm mới
                </span>

                <!-- download file exel -->
                <export-excel
                  class="btn-exel"
                  :fields="fieldsData"
                  worksheet="Quản lý tài khoản"
                  name="quan_ly_tai_khoan.xls"
                  :fetch="fetchDataHistory"
                  :before-generate="startDownload"
                  :before-finish="finishDownload"
                >
                  <span class="addnew " >
                    <font-awesome-icon icon="download" /> Tải về
                  </span>
                </export-excel>

              </div>
            </form>
          </div>
          <!-- danh sach khach hang -->
          <div class="control-list-box">
            <div class="head-list">
              <div class="left-head-list">
                <span>Hiển thị</span>
                <select v-model="perPage" value="10">
                  <option value="10">10</option>
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
                  <strong>1 - {{perPage}}</strong> trên tổng số
                  <strong>{{ totalRow }}</strong> bản ghi
                </p>
              </div>
            </div>
            <div class="body-table" v-bind:class="{'activemod': myrule != 1}">
              <b-table id="my-table-customer" hover :items="items" :fields="fields" responsive>
                <template v-slot:cell(vai_trò)="vaitro">
                  <span>{{ getRules(vaitro.value) }}</span>
                </template>

                <template v-slot:cell(trạng_thái)="trangthai">
                  <span v-if="trangthai.value == true " class="aleftCao">Hoạt động</span>
                  <span v-if="trangthai.value == false " class="aleftThap">Không hoạt động</span>
                </template>

                <template v-slot:cell(thao_tác)="thaotac">
                  <span
                    class="aleftCao"
                    title="Sửa"
                    @click="handleEditUser(thaotac.item.id) "
                  >
                    <font-awesome-icon icon="edit" />
                  </span>

                  <span
                    v-if="userRoleCurrent != 'MOD'"
                    class="aleftThap"
                    title="Thu hồi"
                    @click="$bvModal.show('bv-modal-undo-resource'); themTaiNguyen(thaotac.item.tài_nguyên_khả_dụng,thaotac.item.tên_đăng_nhập,thaotac.item.id)"
                  >
                    <font-awesome-icon icon="undo" />
                  </span>
                  <span
                    v-if="userRoleCurrent == 'ADM'"
                    class="aleftThap"
                    title="Xóa"
                    @click="handleDelUser({username:thaotac.item.tên_đăng_nhập,user_id:thaotac.item.id}) "
                  >
                    <font-awesome-icon icon="trash-alt" />
                  </span>

                </template>
              </b-table>
              <!-- <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table-customer"
              ></b-pagination>-->
              <div class="no-data" v-if="items.length == 0" id="nodata-search" >
                <p>Không có dữ liệu.</p>
              </div>
              <div id="pagination" v-if="totalRow > 0">
                <ul>
                  <li v-if="currentPage == 1" class="noHover" ><a>« Trang đầu</a></li>
                  <li v-if="currentPage > 1"  class="withHover"><a @click="handlePagi(1,perPage)">« Trang đầu</a></li>
                  <li v-if="currentPage == 1" class="noHover"><a>‹ Trước</a></li>
                  <li v-if="currentPage > 1"  class="withHover"><a @click="handlePagi(currentPage - 1,perPage)" >‹ Trước</a></li>
                  <li v-for="(item) in paginations" v-bind:key="item"  class="number-text">
                    <a
                      @click="handlePagi(item,perPage)"
                      v-bind:class="{'active': isActive(item),'withHover': !isActive(item)}"
                    >{{ item }}</a>
                  </li>
                  <li v-if="items.length >= perPage && totalCurrentPage  - 1 > currentPage" class="noHover number-text">
                    <a>...</a>
                  </li>
                  <li v-if="totalCurrentPage > 1 && totalCurrentPage != currentPage " class="withHover"><a @click="handlePagi(currentPage + 1,perPage)" >Sau ›</a></li>
                  <li v-if="totalCurrentPage == 1 || totalCurrentPage == currentPage" class="noHover"><a>Sau ›</a></li>
                  <li v-if="totalCurrentPage == 1 || totalCurrentPage == currentPage" class="noHover"><a>Trang cuối »</a></li>
                  <li v-if="totalCurrentPage > 1 && totalCurrentPage != currentPage" class="withHover"><a @click="handlePagi(totalCurrentPage,perPage)">Trang cuối »</a></li>

                  <!-- <li :class="{'nopage':totalCurrentPage < 2}">
                    <input type="text" v-model="valuePage" />
                  </li>
                  <li class="gopagi" :class="{'nopage':totalCurrentPage < 2}">
                    <input type="button" value="Đi tới" @click="goPaginations(valuePage,perPage)" />
                  </li> -->
                </ul>

              </div>
            </div>
          </div>
        </b-container>
        <!-- popup create -->
        <b-modal
          @hide="resetForm()"
          id="bv-modal-create"
          hide-footer
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
        >
          <template v-slot:modal-title>
            <h3>Thêm mới tài khoản</h3>
          </template>
          <div class="d-block text-center">
            <form v-on:submit.prevent="submit">
              <b-row>
                <b-col
                  cols="12"
                  v-bind:class="{'error-groups': $v.ruleName.$error, 'success-groups': !$v.ruleName.$invalid }"
                >
                  <b-col class="frm-group-cs">
                    <b-input-group :prepend-html="vaitro_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        v-model="$v.ruleName.$model"
                        :multiple="false"
                        :options="dataMod"
                        :value="1"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                        @input="vaitroChanged($event);"
                      />
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.ruleName.required">Không bỏ trống vai trò.</span>
                </b-col>
              </b-row>

              <b-row>
                <b-col
                  cols="12"
                  md="6"
                  lg="6"
                  v-bind:class="{'error-groups': $v.fisrtName.$error, 'success-groups': !$v.fisrtName.$invalid }"
                >
                  <b-col class="frm-group-cs custom-prepend-report">
                    <b-input-group :prepend-html="ho_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input placeholder="Họ"
                        v-model="$v.fisrtName.$model"
                      ></b-input>
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.fisrtName.required">Không bỏ trống họ.</span>
                  <span
                    class="errors"
                    v-if="!$v.fisrtName.minLength"
                  >Độ dài phải lớn hơn {{ $v.fisrtName.$params.minLength.min }} ký tự.</span>
                </b-col>
                <b-col
                  cols="12"
                  md="6"
                  lg="6"
                  v-bind:class="{'error-groups': $v.lastName.$error, 'success-groups': !$v.lastName.$invalid }"
                >
                  <b-col class="frm-group-cs custom-prepend-report">
                    <b-input-group :prepend-html="ten_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input id placeholder="Tên" v-model="$v.lastName.$model"></b-input>
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.lastName.required">Không bỏ trống tên.</span>
                  <span
                    class="errors"
                    v-if="!$v.lastName.minLength"
                  >Độ dài phải lớn hơn {{ $v.lastName.$params.minLength.min }} ký tự.</span>
                </b-col>
                <b-col
                  cols="12"
                  v-bind:class="{'error-groups': $v.account.$error, 'success-groups': !$v.account.$invalid }"
                >
                  <b-col class="frm-group-cs">
                    <b-input-group :prepend-html="tendangnhap_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input id placeholder="Tên đăng nhập" v-model="$v.account.$model"></b-input>
                    </b-input-group>
                    <!-- <div class="cus-edit-field">
                      <div class="input-name-text">Tên đăng nhập <span>(*)</span></div>
                      <div class="input-name-ac">{{user.username+"_"}}</div>
                      <div class="input-name-oac">
                        <input type="text" placeholder="Tên đăng nhập" class="form-control" v-model="$v.account.$model">
                      </div>
                    </div> -->

                  </b-col>
                  <span class="errors" v-if="!$v.account.required">Không bỏ trống tên đăng nhập.</span>
                  <span
                    class="errors"
                    v-if="!$v.account.minLength"
                  >Độ dài phải lớn hơn {{ $v.account.$params.minLength.min }} ký tự.</span>
                </b-col>
                <b-col
                  cols="12"
                  v-bind:class="{'error-groups': $v.password.$error, 'success-groups': !$v.password.$invalid }"
                >
                  <b-col class="frm-group-cs">
                    <b-input-group :prepend-html="matkhau_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input
                        id
                        placeholder="Mật khẩu"
                        type="password"
                        v-model="$v.password.$model"
                      ></b-input>
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.password.required">Không bỏ trống mật khẩu.</span>
                  <span
                    class="errors"
                    v-if="!$v.password.minLength"
                  >Độ dài phải lớn hơn {{ $v.password.$params.minLength.min }} ký tự.</span>
                </b-col>
                <b-col cols="12" v-bind:class="{'error-groups': $v.rePassword.$error }">
                  <b-col class="frm-group-cs">
                    <b-input-group :prepend-html="nhaplai_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input
                        id
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        v-model="$v.rePassword.$model"
                      ></b-input>
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.rePassword.sameAsPassword">Mật khẩu không khớp.</span>
                </b-col>

                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Email" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input id placeholder="Email" v-model="email"></b-input>
                    </b-input-group>
                  </b-col>
                </b-col>
                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Số điện thoại" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input id placeholder="Số điện thoại" type="text" v-model="phoneNumber"></b-input>
                    </b-input-group>
                  </b-col>
                </b-col>


                <b-col cols="12" v-bind:class="[{'error-groups': $v.soMayNhanh.$error},ruleName=='SAL'?'inactive':'' ]">
                  <b-col class="frm-group-cs">
                    <b-input-group :prepend-html="somaynhanh_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input
                        :disabled="ruleName=='SAL'"
                        id
                        placeholder="Nhập số máy nhánh"
                        type="number"
                        v-model="$v.soMayNhanh.$model"
                      ></b-input>
                    </b-input-group>
                  </b-col>
                  <span  class="errors" v-if="!$v.soMayNhanh.required">Nhập số lượng máy nhánh.</span>
                </b-col>

                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        :multiple="false"
                        :options="dataStatus"
                        :value="1"
                        v-model="status"
                      />
                    </b-input-group>
                  </b-col>
                </b-col>
              </b-row>
              <div class="popup-footer">
                <b-col cols="12">
                  <b-button
                    class="mt-3"
                    variant="primary"
                    v-on:click="submit_create($event)"
                  >Thêm mới</b-button>
                  <b-button
                    variant="danger"
                    class="mt-3"
                    @click="$bvModal.hide('bv-modal-create')"
                  >Đóng</b-button>
                </b-col>
              </div>
            </form>
          </div>
        </b-modal>
        <!-- end popup create -->

        <!-- popup edit -->
        <b-modal id="bv-modal-edit" hide-footer :noCloseOnEsc="true" :noCloseOnBackdrop="true">
          <template v-slot:modal-title>
            <h3>Cập nhật tài khoản</h3>
          </template>
          <div class="d-block text-center">
            <form v-on:submit.prevent="submit">
              <b-row>
                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Vai trò" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect
                        :multiple="false"
                        :options="dataMod"
                        :value="ruleName"
                        :disabled="true"
                        placeholder="Lựa chọn"
                        noOptionsText="Chưa có dữ liệu"
                        noResultsText="Không có dữ liệu"
                      />
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.ruleName.required">Không bỏ trống vai trò.</span>
                </b-col>
              </b-row>

              <b-row>
                <b-col
                  cols="12"
                  md="6"
                  lg="6"
                  v-bind:class="{'error-groups': $v.fisrtName.$error, 'success-groups': !$v.fisrtName.$invalid }"
                >
                  <b-col class="frm-group-cs custom-prepend-report">
                    <b-input-group :prepend-html="ho_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input placeholder="Họ" v-model="$v.fisrtName.$model"></b-input>
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.fisrtName.required">Không bỏ trống họ.</span>
                  <span
                    class="errors"
                    v-if="!$v.fisrtName.minLength"
                  >Độ dài phải lớn hơn {{ $v.fisrtName.$params.minLength.min }} ký tự.</span>
                </b-col>
                <b-col
                  cols="12"
                  md="6"
                  lg="6"
                  v-bind:class="{'error-groups': $v.lastName.$error, 'success-groups': !$v.lastName.$invalid }"
                >
                  <b-col class="frm-group-cs custom-prepend-report">
                    <b-input-group :prepend-html="ten_pre" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input id placeholder="Tên" v-model="$v.lastName.$model"></b-input>
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.lastName.required">Không bỏ trống tên.</span>
                  <span
                    class="errors"
                    v-if="!$v.lastName.minLength"
                  >Độ dài phải lớn hơn {{ $v.lastName.$params.minLength.min }} ký tự.</span>
                </b-col>
                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Tên đăng nhập" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input
                        id
                        placeholder="Tên đăng nhập"
                        v-model="$v.account.$model"
                        disabled="disabled"
                      ></b-input>
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.account.required">Không bỏ trống họ.</span>
                  <span
                    class="errors"
                    v-if="!$v.account.minLength"
                  >Độ dài phải lớn hơn {{ $v.account.$params.minLength.min }} ký tự.</span>
                </b-col>
                <b-col
                  cols="12"
                  v-bind:class="{'error-groups': $v.password.$error, 'success-groups': !$v.password.$invalid }"
                >
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Mật khẩu mới" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input id placeholder="******" type="password" v-model="$v.password.$model"></b-input>
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.password.required">Không bỏ trống mật khẩu.</span>
                  <span
                    class="errors"
                    v-if="!$v.password.minLength"
                  >Độ dài phải lớn hơn {{ $v.password.$params.minLength.min }} ký tự.</span>
                </b-col>
                <b-col cols="12" v-bind:class="{'error-groups': $v.rePassword.$error }">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Nhập lại mật khẩu mới" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input
                        id
                        placeholder="******"
                        type="password"
                        v-model="$v.rePassword.$model"
                      ></b-input>
                    </b-input-group>
                  </b-col>
                  <span class="errors" v-if="!$v.rePassword.sameAsPassword">Mật khẩu không khớp.</span>
                </b-col>

                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Email" class="mb-2 mr-sm-2 mb-sm-0">
                      <b-input id placeholder="Email" v-model="email"></b-input>
                    </b-input-group>
                  </b-col>
                </b-col>

                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Hạn tài nguyên" class="mb-2 mr-sm-2 mb-sm-0">
                      <div class="custom-prepend">
                        <date-picker
                          v-model="hanTaiNguyen"
                          :lang="lang"
                          value-type="format"
                          format="YYYY-MM-DD"
                          :shortcuts="shortcuts"
                        ></date-picker>
                      </div>
                    </b-input-group>
                  </b-col>
                </b-col>

                <b-col cols="12">
                  <b-row>
                    <b-col cols="12" md="6" lg="6">
                      <b-col class="frm-group-cs">
                        <b-input-group prepend="Tổng số máy nhánh" class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input type="number" v-model="$v.soMayNhanh.$model" :disabled="isDisabeld()"></b-input>
                        </b-input-group>
                      </b-col>
                    </b-col>
                    <b-col cols="12" md="6" lg="6">
                      <b-col class="frm-group-cs">
                        <b-input-group prepend="Số máy nhánh còn lại" class="mb-2 mr-sm-2 mb-sm-0">
                          <b-input type="number" v-model="soMayNhanhConlai" disabled></b-input>
                        </b-input-group>
                      </b-col>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col cols="12">
                  <b-col class="frm-group-cs">
                    <b-input-group prepend="Trạng thái" class="mb-2 mr-sm-2 mb-sm-0">
                      <treeselect :multiple="false" :options="dataStatus" v-model="status" />
                    </b-input-group>
                  </b-col>
                </b-col>
              </b-row>
              <div class="popup-footer">
                <b-col cols="12">
                  <b-button
                    class="mt-3"
                    variant="primary"
                    v-on:click="submit_Update($event)"
                  >Cập nhật</b-button>
                  <b-button
                    variant="danger"
                    class="mt-3"
                    @click="$bvModal.hide('bv-modal-edit')"
                  >Đóng</b-button>
                </b-col>
              </div>
            </form>
          </div>
        </b-modal>
        <!-- end popup edit -->

        <!-- popup unde resource -->
        <b-modal
          :noCloseOnEsc="true"
          :noCloseOnBackdrop="true"
          id="bv-modal-undo-resource"
          hide-footer
        >
          <template v-slot:modal-title>
            <h3>Thu hồi tài nguyên</h3>
          </template>
          <div class="d-block text-center">
            <div class="undo-resource">
              <p>
                Tài nguyên hiện có:
                <b>{{ taiNguyenKhaDung }}</b>
              </p>
              <span>
                Bạn có muốn thu hồi tài nguyên của tài khoản
                <b>{{ taiKhoanHienTai }}</b> này không?
              </span>
            </div>
          </div>
          <div class="popup-footer btn-call">
            <b-col cols="12">
              <b-button
                class="mt-3"
                variant="primary"
                v-on:click="handleUndoResource(userID)"
              >Đồng ý</b-button>
              <b-button
                variant="danger"
                class="mt-3"
                @click="$bvModal.hide('bv-modal-undo-resource')"
              >Hủy</b-button>
            </b-col>
          </div>
        </b-modal>
        <!-- end popup undo resource -->
        <!-- popup add success -->
        <b-modal id="bv-modal-success" title="Thông báo!" hide-footer :noCloseOnEsc="true" :noCloseOnBackdrop="true" :centered="true" >
          <div class="d-block text-center">
              <span class="title_success" v-html="notiteMsg"></span>
              <div class="popup-footer">
                <b-col cols="12">
                  <b-button
                    type="button"
                    variant="danger"
                    class="mt-3"
                    @click="$bvModal.hide('bv-modal-success')"
                  >Đóng</b-button>
                </b-col>
              </div>
          </div>
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
import { ASYNC_SEARCH } from "@riophae/vue-treeselect";
import { LOAD_ROOT_OPTIONS } from "@riophae/vue-treeselect";

import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { helper } from "../../_helpers/helper";

let stringImport = require("../../_helpers/string");
let dateImport = require("../../_helpers/date");

export default {
  created(){
    // this.$root.checkUserLogin(this);
    this.checkRuleUser();
  },
  mounted() {


    this.getListUserLogin();
    this.getListUser();
    this.setTitlePage();
  },
  data() {
    return {
      checkSyntax:false,
      notiteMsg:null,
      useridCurentEdit:null,
      isEditUser :false,
      dataChudeEdit: [],
      isClickRole: false,
      //define exel export
      titleExcel:'Xuất',
      exelData: [],
      fieldsData: {
        Stt: "stt",
        "Tên đăng nhập": "tên_đăng_nhập",
        "Ngày khởi tạo": "ngày_khởi_tạo",
        "Tài nguyên khả dụng": "tài_nguyên_khả_dụng",
        "Ngày hết hạn": "ngày_hết_hạn",
        "Trạng thái": "trạng_tháii",
        "Vai trò": "vai_trò"
      },
      //end define exel export
      // userRoleCurrent: {},
      valuePage: null,
      totalCurrentPage: 0,
      paginations: [],
      isAction: true, //state true add & false edit
      // user: {},
      taiNguyenKhaDung: 0,
      taiKhoanHienTai: "",
      //
      ruleName: null,
      fisrtName: null,
      lastName: null,
      account: null,
      password: null,
      rePassword: null,
      email: null,
      phoneNumber: null,
      chude: null,
      status: 1,
      userID: null,
      soMayNhanh: null,
      soMayNhanhConlai: null,
      //
      notice: [],
      isNotice: false,
      rule: this.$store.state.stores.rules,
      valueStatus: null,
      valueMod: null,
      valueUser: [],
      valueChude: [-1],
      valueChudeAll:null,
      // dataMod: [],
      dataUser: [],
      dataChude: [],
      dataStatus: [
        { id: "1", label: "Hoạt động" },
        { id: "2", label: "Không hoạt đông" }
      ],
      time3: "",
      hanTaiNguyen: "",
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
            this.hanTaiNguyen = [new Date(), new Date()];
          }
        }
      ],

      fields: [
        { key: "stt", label:'#', sortable: true, thClass: "classStt" },
        { key: "tên_đăng_nhập", label:'Tên đăng nhập', sortable: false },
        { key: "ngày_khởi_tạo", label:'Ngày khởi tạo', sortable: false },
        { key: "tài_nguyên_khả_dụng", label:'Tài nguyên khả dụng', sortable: false, thClass: "classDQT" },
        { key: "ngày_hết_hạn", label:'Ngày hết hạn', sortable: false },
        { key: "trạng_thái", label:'Trạng thái', sortable: true },
        { key: "vai_trò", label:'Vai trò', sortable: false, thClass: "classVaitro" },
        { key: "thao_tác", label:'Thao tác', sortable: false }
      ],
      items: [],
      itemsEdit: [],
      lengthRow: 10,
      perPage: 10,
      currentPage: 1,
      totalRow: 0,
      variant: "light"
    };
  },
  components: {
    Treeselect,
    DatePicker,
    Mains,
    "breakcrumb-app": Breakcrumb
  },

  validations: {
    ruleName: { required },
    fisrtName: { required, minLength: minLength(2) },
    lastName: { required, minLength: minLength(2) },
    account: { required, minLength: minLength(3) },
    password: { required, minLength: minLength(3) },
    rePassword: { sameAsPassword: sameAs("password") },
    soMayNhanh: { required }
  },
  methods: {
    vaitroChanged(e){
      if(e){
        if(e=="MOD"){
          this.chude=this.valueChudeAll;
        }else{
          this.chude=[];
        }
      }
    },
    resetForm() {
      this.ruleName = null;
      this.fisrtName = null;
      this.lastName = null;
      this.account = null;
      this.password = null;
      this.rePassword = null;
      this.email = null;
      this.phoneNumber = null;
      this.chude = null;
      this.status = 1;
      this.soMayNhanh = null;

      // this.$v.$reset;
      this.$nextTick(() => {
        this.$v.$reset();
      });
      // console.log( 1111 );
    },
    hidePopup() {
      this.$bvModal.hide("bv-modal-create");
    },
    getRules(rulename) {
      return helper.getRule(rulename);
    },
    submit_from(e) {
      this.titleExcel = 'Xuất';
      this.currentPage = 1;
      let date = this.time3;
      let date_from = null;
      let date_to = null;
      if (typeof date == "object") {
        date_from = date[0];
        date_to = date[1];
      }

      let obj = {
        created_date_from: date_from,
        created_date_to: date_to,
        role_code: this.valueMod != null ? this.valueMod : null,
        status: this.valueStatus != null ? parseInt(this.valueStatus) : null,
        username_list: this.valueUser
      };
      let query = {
        page: 0,
        size: this.perPage
      };
      // console.log( obj );
      this.$http
        .post(
          "v1/api/account-managers/search?page=" +
            query.page +
            "&properties=userId&size=" +
            query.size +
            "&sortBy=ASC",
          obj
        )
        .then(res => {
          if (res.status == 200 && res.body != "") {
            // console.log(res);
            let data = res.body.body.content;
            let itemsNew = [];
            if (data.length > 0) {
              this.totalRow = res.body.body.totalElements;
              //paginations
              // this.totalRow = res.body.second.first;
              let totalPage = res.body.body.totalPages;
              this.totalCurrentPage = totalPage;
              this.paginations = stringImport.pagination(
                this.currentPage,
                totalPage
              );
              //
              for (let i = 0; i < data.length; i++) {
                // let created = dateImport.dateConverter(data[i].created_date);
                // let dateEnd = dateImport.dateConverter(
                //   data[i].expired_resources_date
                // );
                let created = data[i].created_date;
                let dateEnd = data[i].expired_resources_date;
                let dataUser = {
                  isActive: true,
                  id: data[i].user_id,
                  stt: (this.currentPage - 1) * this.perPage + i + 1,
                  tên_đăng_nhập: data[i].username,
                  ngày_khởi_tạo: created,
                  tài_nguyên_khả_dụng:
                    data[i].voice_resources_avaiable + " phút",
                  ngày_hết_hạn: dateEnd,
                  trạng_thái: data[i].status == 1 ? true : false,
                  vai_trò: data[i].role_code,
                  //exel
                  trạng_tháii:
                    data[i].status == 1 ? "Hoạt động" : "Không hoạt động"
                };
                itemsNew.push(dataUser);
              }
            }else{
              this.paginations = [];
              this.totalRow = 0;
            }
            this.items = itemsNew;
            // this.exelData = itemsNew;
          }
        });
        if(e){
          e.preventDefault();
        }
    },
    submit_create(e) {
      let chudeID = null;
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("errors");
      } else {
        // console.log( 'okeee' );
        let obj = {
          email: this.email ? this.email : null,
          first_name: this.$v.fisrtName.$model,
          last_name: this.$v.lastName.$model,
          password: this.$v.password.$model,
          phone_number: this.phoneNumber ? this.phoneNumber : null,
          role_code: this.$v.ruleName.$model,
          status: this.status,

          // username: this.user.username +'_'+this.$v.account.$model,
          username: this.$v.account.$model,
          total_branches_machine_number: this.$v.soMayNhanh.$model
        };

        if(this.$v.ruleName.$model == 'MOD'){
          chudeID =this.valueChudeAll.map(item => {
            return parseInt(item);
          });
        }
        //
        if(this.$v.ruleName.$model == 'SAL'){
          obj.total_branches_machine_number = 1;
        }
        // check syntax
        if(stringImport.checkInputUser(this.$v.fisrtName.$model) || stringImport.checkInputUser(this.$v.lastName.$model) ){
          alert('Trường họ và tên không được chứa các ký tự số và ký tự đặc biệt!');
          return false;
        }
        // check phonenumber
        // let checkPhone = /(0[1-9]|84)+([0-9]{7,9})\b/;
        if(this.phoneNumber != ""){
          if(stringImport.checPhoneNumber(this.phoneNumber) == false){
            alert('Số điện thoại không đúng định dạng.');
            return false;
          }
        }
        // console.log( obj );
        // return;
        this.$http.post("v1/api/account-managers", obj).then(
          res => {
            if (res.status == 200) {
              this.notiteMsg = "Thêm mới tài khoản <span>"+this.account+"</span> thành công!";
              this.$bvModal.hide('bv-modal-create');
              this.$bvModal.show('bv-modal-success');
              this.currentPage = 1;
              this.getListUserLogin();
              this.getListUser();
            }
          },
          err => {
            // console.log( err );
            alert("Có lỗi trong khi tạo tài khoản \n" + err.body.message);
          }
        );
      }
      return e.preventDefault();
    },
    // xoa tai khoan
    handleDelUser(obj){
      let isDel = confirm("Bạn có muốn xóa tài khoản này không?");
      if(isDel){
        this.$store.dispatch("users/delUser",obj);
        this.currentPage =  1;
        this.getListUser();
      }
    },
    // lay du lieu vaitro
    getVaitro() {
      return this.dataMod;
      // let role = this.user.role_code;
      // if(role == 'ADM'){
      //   this.dataMod = [{id:'MOD',label:'Moderator'},{id:'CON',label:'Contract Owner'},{id:'SAL',label:'Sale'}]
      // }else if(role == 'MOD'){
      //   this.dataMod = [{id:'CON',label:'Contract Owner'}]
      // }else if(role == 'CON'){
      //   this.dataMod = [{id:'SAL',label:'Sale'}]
      // }else{

      // }
      // this.$http.get("v1/api/account-managers/role").then(res => {
      //   if (res.status == 200) {
      //     let data = res.body.body;
      //     if (data.length > 0) {

      //       for (let key in data) {
      //         this.dataMod.push({
      //           id: data[key].role_code,
      //           label: data[key].role_name
      //         });
      //       }
      //     }
      //   }
      // });
    },
    getListUserLogin() {
      this.$http.get("v1/api/account-managers/suggest-name").then(res => {
        if (res.status == 200 && res.body.body.length != 0) {
          let dataNew = [];
          let data = res.body.body;
          if (data.length > 0) {
            for (let i in data) {
              dataNew.push({ id: data[i].username, label: data[i].username });
            }
          }
          this.dataUser = dataNew;
        } else {
          this.dataUser = [];
        }
      });
    },
    async getListUser(pageCur = null) {
      // console.log( pageCur );
      let page = 0;
      if(pageCur != null) page = pageCur -1;
      else page = 0;
      let query = {
        page: page,
        size: this.perPage
      };

      let date = this.time3;
      let date_from = null;
      let date_to = null;
      if (typeof date == "object") {
        date_from = date[0];
        date_to = date[1];
      }else{
        // this.time3 = [stringImport.getLastWeek(), stringImport.getToday()];
      }

      let obj = {
        created_date_from: date_from,
        created_date_to: date_to,
        role_code: this.valueMod != null ? this.valueMod : null,
        status: this.valueStatus != null ? parseInt(this.valueStatus) : null,
        username_list: this.valueUser
      };
      //get user login current

      // let result = this.$service.dataUserLogin();
      // await result.then(resp => {
      //   this.user = resp.body;
      // });

      //chay load vaitro
      this.getVaitro();
      this.$http
        .post(
          "v1/api/account-managers/search?page=" +
            query.page +
            "&properties=userId&size=" +
            query.size +
            "&sortBy=ASC",
          obj
        )
        .then(res => {
          if (res.status == 200) {
            let data = res.body.body.content;
            let dataNew = [];
            // this.totalRow = res.body.totalElements;
            if (data.length > 0) {
              this.totalRow = res.body.body.totalElements;
              //paginations
              // this.totalRow = res.body.second.first;
              let totalPage = res.body.body.totalPages;
              this.totalCurrentPage = totalPage;
              this.paginations = stringImport.pagination(
                this.currentPage,
                totalPage
              );

              for (let i = 0; i < data.length; i++) {
                // let created = dateImport.timeConverter(data[i].created_date);
                // let dateEnd = dateImport.timeConverter(
                //   data[i].expired_resources_date
                // );

                let created = data[i].created_date;
                let dateEnd = data[i].expired_resources_date;

                let dataUser = {
                  isActive: true,
                  id: data[i].user_id,
                  stt: (this.currentPage - 1) * this.perPage + i + 1,
                  tên_đăng_nhập: data[i].username,
                  ngày_khởi_tạo: created,
                  tài_nguyên_khả_dụng:
                    data[i].voice_resources_avaiable + " phút",
                  ngày_hết_hạn: dateEnd,
                  trạng_thái: data[i].status == 1 ? true : false,
                  vai_trò: data[i].role_code,
                  //exel
                  trạng_tháii:
                    data[i].status == 1 ? "Hoạt động" : "Không hoạt động"
                };
                dataNew.push(dataUser);
              }
              this.items = dataNew;
              // this.exelData = dataNew;
            }
          }
        });
    },

    async handleEditUser(id) {
      this.resetForm();
      this.isEditUser = true;
      this.userID = id;
      let objNew = [];
      let mangdata = [];
      for(let i in this.valueChudeAll ){
        mangdata.push(this.valueChudeAll[i])
      }
      await this.$http.get("v1/api/account-managers/" + id).then(res => {
        if (res.status == 200) {
          let a = JSON.stringify(res.body.body.topic_list)  ;
          let b = JSON.stringify(mangdata.reverse())  ;

          this.useridCurentEdit = res.body.body.user_id;
          this.ruleName = res.body.body.role_code;
          this.fisrtName = res.body.body.first_name;
          this.lastName = res.body.body.last_name;
          this.account = res.body.body.username;
          this.password = res.body.body.password;
          this.rePassword = res.body.body.password;
          this.email = res.body.body.email;
          this.phoneNumber = res.body.body.phone_number;

          this.status = res.body.body.status;
          this.hanTaiNguyen = res.body.body.expired_resources_date;
          this.soMayNhanh = res.body.body.total_branches_machine_number;
          this.soMayNhanhConlai = res.body.body.avaiable_branches_machine_number;
        }
      });
      this.$bvModal.show('bv-modal-edit');
      // console.log( this.dataChudeEdit );
    },
    async submit_Update(e) {
      let checkUpdate = false;
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("errors");
      } else {
        let obj = {
          email: this.email ? this.email : null,
          first_name: this.$v.fisrtName.$model,
          last_name: this.$v.lastName.$model,
          password: this.$v.password.$model,
          phone_number: this.phoneNumber ? this.phoneNumber : null,
          role_code: this.$v.ruleName.$model,
          status: this.status,
          username: this.$v.account.$model,
          user_id: this.userID,
          expired_resources_date: this.hanTaiNguyen,
          total_branches_machine_number: parseInt(this.soMayNhanh),
          avaiable_branches_machine_number: parseInt(this.soMayNhanhConlai)
        };
        //
        console.log(obj);
        // check syntax
        if(stringImport.checkInputUser(this.$v.fisrtName.$model) || stringImport.checkInputUser(this.$v.lastName.$model) ){
          alert('Trường họ và tên không được chứa các ký tự số và ký tự đặc biệt!')
          return false;
        }

        if(this.phoneNumber){
          if(stringImport.checPhoneNumber(this.phoneNumber) == false){
            alert('Số điện thoại không đúng định dạng.');
            return false;
          }
        }

        this.$http.put("v1/api/account-managers", obj).then(
          res => {
            if (res.status == 200) {
              this.isEditUser = false;
              this.notiteMsg = "Sửa tài khoản <span>"+this.account+"</span> thành công!";
              this.$bvModal.hide('bv-modal-edit');
              this.$bvModal.show('bv-modal-success');
              // this.currentPage = 1;
              this.getListUserLogin();
              this.getListUser(this.currentPage);
            }
          },
          err => {
            alert("Có lỗi trong khi cập nhật tài khoản \n" + err.body.message);
          }
        );
      }
      return e.preventDefault();
    },
    handleChangeVaitro(e) {
      this.isClickRole = true;
      // console.log( e );
      if (e != undefined) {
        {
          this.valueUser = null;
          let dataNew = [];
          this.$http
            .get("v1/api/account-managers/suggest-name/?roleCodeSelected=" + e)
            .then(res => {
              let data = res.body.body;
              if (data.length) {
                for (let i in data) {
                  // dataNew.push({ id: data[key].trim(), label: data[key] });
                  dataNew.push({
                    id: data[i].username,
                    label: data[i].username
                  });
                }
                this.dataUser = dataNew;
              } else {
                this.dataUser = [];
              }
              this.submit_from();
            });
        }
      } else if (e == undefined) {
        this.valueUser = null;
        this.dataUser = this.getListUserLogin();
        // this.dataUser = [];
        // this.valueChude = null;
        this.isClickRole = false;
        this.submit_from();
      }
    },
    handlePagi(value, perPage) {
      this.titleExcel = 'Xuất';
      this.currentPage = value;
      this.perPage = perPage;

      // input
      let date = this.time3;
      let date_from = null;
      let date_to = null;
      if (typeof date == "object") {
        date_from = date[0];
        date_to = date[1];
      }

      let obj = {
        created_date_from: date_from,
        created_date_to: date_to,
        role_code: this.valueMod != null ? this.valueMod : null,
        status: this.valueStatus != null ? parseInt(this.valueStatus) : null,
        username_list: this.valueUser
      };
      let query = {
        page: value - 1,
        size: this.perPage
      };
      //
      // console.log( obj );
      this.$http
        .post(
          "v1/api/account-managers/search?page=" +
            query.page +
            "&properties=userId&size=" +
            query.size +
            "&sortBy=ASC",
          obj
        )
        .then(res => {
          if (res.status == 200 && res.body != "") {
            console.log(res);
            let data = res.body.body.content;
            let itemsNew = [];
            if (data.length > 0) {
              //
              let totalPage = res.body.body.totalPages;
              this.paginations = stringImport.pagination(
                this.currentPage,
                totalPage
              );
              this.totalCurrentPage = totalPage;
              for (let i = 0; i < data.length; i++) {
                let created = dateImport.dateConverter(data[i].created_date);
                let dateEnd = dateImport.dateConverter(
                  data[i].expired_resources_date
                );
                let dataUser = {
                  isActive: true,
                  id: data[i].user_id,
                  stt: (this.currentPage - 1) * perPage + i + 1,
                  tên_đăng_nhập: data[i].username,
                  ngày_khởi_tạo: created,
                  tài_nguyên_khả_dụng:
                    data[i].voice_resources_avaiable + " phút",
                  ngày_hết_hạn: dateEnd,
                  trạng_thái: data[i].status == 1 ? true : false,
                  vai_trò: data[i].role_code,
                  //exel
                  trạng_tháii:
                    data[i].status == 1 ? "Hoạt động" : "Không hoạt động"
                };
                itemsNew.push(dataUser);
              }
            }
            this.items = itemsNew;
            // this.exelData = itemsNew;
          }
        });
    },
    searchHobby({ action, searchQuery, callback }) {
      console.log(action);
      if (action === ASYNC_SEARCH) {
        let options = null;
        setTimeout(() => {
          this.$http
            .get("v1/api/account-managers/topic?topic_name=" + searchQuery)
            .then(res => {
              if (res.body != "") {
                let data = res.body.body;
                let dataNew = [];
                let dataObjAll = [];
                if (data.length > 0) {
                  for (let i = 0; i < data.length; i++) {
                    if (i >= 500) break;
                    dataNew.push({
                      id: parseInt(data[i].topic_id),
                      label: ( data[i].topic_name )
                    });
                  }
                }
                dataObjAll = dataNew;
                callback(null, dataObjAll);
                // this.dataChude = dataObjAll;
              }
            });
        }, 2000);
      }
    },
    async onSearch(searchQuery) {
      // if(searchQuery.length > 2)
      {
        let options = null;
        let dataNew = [];
        let ObjCurrent = [];
        let ObjResult = null;
        if (searchQuery != "") {
          await this.$http
            .get("v1/api/account-managers/topic?topic_name=" + searchQuery)
            .then(res => {
              if (res.body != "") {
                let data = res.body.body;
                if (data.length > 0) {
                  for (let i = 0; i < data.length; i++) {
                    if (i >= 500) break;
                    dataNew.push({
                      id: parseInt(data[i].topic_id),
                      label: ( data[i].topic_name )
                    });
                  }
                }

                for (let i in this.dataChudeEdit) {
                  ObjCurrent.push({
                    id: this.dataChudeEdit[i].id,
                    label: this.dataChudeEdit[i].label
                  });
                }
                ObjResult = stringImport.getUnique(ObjCurrent.concat(dataNew));
                // console.log( ObjResult );
              }
            });
        }

        // console.log( dataNew );
        this.dataChudeEdit = ObjResult;
      }
    },
    themTaiNguyen(value, user, userid) {
      this.taiNguyenKhaDung = value;
      this.taiKhoanHienTai = user;
      this.userID = userid;
      // console.log( userid );
    },

    handleUndoResource(userid) {
      console.log("thuhoi");
      this.$http.get("v1/api/transfer-resources/evict?ui=" + userid).then(
        res => {
          if (res.status == 200 && res.body != "") {
            setTimeout(() => {
              alert(res.body.message);
              // this.notice.push("Thu hồi thành công!");
              this.isNotice = false;
              this.getListUser();
              this.$bvModal.hide("bv-modal-undo-resource");
            }, 500);
          }
        },
        err => {
          alert(err.body.message);
        }
      );
    },
    async fetchDataHistory() {
      const resd = await this.exportAdm(true);
      return resd;
    },
    startDownload() {
    },
    finishDownload() {
    },
    // export exel dung cho admin
    async exportAdm(excel){
      const res = await this.$http.get("v1/api/account-managers/export-data-account");
        if (res.status == 200 && res.body != "") {
            // console.log(res);
            let data = res.body;
            let itemsNew = [];
            // console.log( data );
            if (data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let dataUser = {
                  isActive: true,
                  id: data[i].user_id,
                  stt: data[i].stt,
                  tên_đăng_nhập: data[i].username,
                  ngày_khởi_tạo: data[i].created_date,
                  tài_nguyên_khả_dụng:
                    data[i].voice_resources_avaiable + " phút",
                  ngày_hết_hạn: data[i].expired_resources_date,
                  trạng_thái: data[i].status == 1 ? true : false,
                  vai_trò: data[i].role_code,
                  //exel
                  trạng_tháii:
                    data[i].status == 1 ? "Hoạt động" : "Không hoạt động"
                };
                itemsNew.push(dataUser);
              }
            }
            if(excel){
              return itemsNew;
            }else{
              return [];
            }
          }
    },
    isActive(value) {
      if (value == this.currentPage) {
        return true;
      } else {
        return false;
      }
    },
    goPaginations(value, perPage) {
      let page = parseInt(value);
      if (page > 0 && page <= this.totalCurrentPage) {
        // page = page - 1;
        this.handlePagi(page, perPage);
      }
    },
    setTitlePage() {
      this.$store.state.stores.titlePage = "Quản lý tài khoản";
    },
    checkRuleUser() {
      // let result = this.$service.dataUserLogin();
      // result.then(res => {
      //   this.userRoleCurrent = res.body.role_code;
      //     if (res.body.role_code == "SAL") {
      //       this.$router.push("/customers");
      //     }
      // });
      // this.getVaitro();
      if (this.user.role_code == "SAL") {
        this.$router.push("/");
      }
    },
    changeValueChude(value){
      if(this.isEditUser == true){
        if(value){
          if(value.length > 0){
            let obj = {
              topicIds  : value,
              ui        : this.useridCurentEdit
            }
          }
        }
      }
    },
    isDisabeld(){
      if(this.ruleName && this.ruleName=="SAL"){
        return true;
      }
    },
  },
  computed: {
    rows() {
      return this.items.length;
    },
     vaitro_pre(){
      return 'Vai trò <span>(*)</span>';
    },
    ho_pre(){
      return 'Họ <span>(*)</span>';
    },
    ten_pre(){
      return 'Tên <span>(*)</span>';
    },
    tendangnhap_pre(){
      return 'Tên đăng nhập <span>(*)</span>';
    },
    matkhau_pre(){
      return 'Mật khẩu <span>(*)</span>';
    },
    nhaplai_pre(){
      return 'Nhập lại mật khẩu <span>(*)</span>';
    },
    chude_pre(){
      return 'Chủ đề <span>(*)</span>';
    },
    somaynhanh_pre(){
      return 'Số máy nhánh <span>(*)</span>';
    },
    credential () {
        return this.$store.state.authentication.user;
    },
    user () {
        let d =  this.$store.state.users.info;
        if(d && d.role_code){
          return d;
        }else{
          return this.$service.getUserLogin();
        }
    },
    myrule(){
      return this.$store.state.stores.rules;
    },
    userRoleCurrent() {
      return this.$store.state.users.info.role_code;
    },
    dataMod(){
      let role = this.user.role_code;
      if(role == 'ADM'){
        return [{id:'MOD',label:'Moderator'},{id:'CON',label:'Contract Owner'},{id:'SAL',label:'Sale'}]
      }else if(role == 'MOD'){
        return [{id:'CON',label:'Contract Owner'}]
      }else if(role == 'CON'){
        return [{id:'SAL',label:'Sale'}]
      }else{
        return [];
      }
    }


  },
  watch: {
    lengthRow(value) {
      this.perPage = this.lengthRow;
    },
    perPage(value) {
      // this.$router.go();
      // if (value <= this.totalRow)
      {
        this.handlePagi(1, value);
      }
    },
    ruleName(value){
      if(value =='SAL'){
        this.soMayNhanh = 1;
      }
    },
    soMayNhanh(value){
      if(value < 0){
        alert('Máy nhánh phải là số nguyên dương.');
        this.soMayNhanh = 0;
      }
    },
    // phoneNumber(value){
    //   let check = /(0[1-9]|84)+([0-9]{7,9})\b/;
    //   console.log(check.test(value));
    // }
  }
};
</script>


<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style>
<style scoped>
.input-name-text span {
    color: #f00;
    padding-left: 5px;
}
.input-name-text {
    background-color: #f7f7f7;
    width: 180px;
    font-size: 14px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #ced4da;
    border-radius: 0.25rem 0 0 0.25rem;
}
.cus-edit-field {
    display: flex;
}
.input-name-ac {
    background-color: #f7f7f7;
    font-size: 14px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding: 0.375rem 0.75rem;
    margin-bottom: 0;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    text-align: right;
    white-space: nowrap;
    border: 1px solid #ced4da;
    border-left: 0;
    border-right: 0;
}
.input-name-oac input {
    border-radius: 0 3px 3px 0;
    width: 100%;
    float: left;
}
.input-name-oac {
    flex-grow: 1;
}
</style>