<template>
  <h2>Order List</h2>
  <div
    class="d-flet justify-content-between flet-wrap flet-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <div class="btn-toolbar mb-2 mb-md-0">
      <a
        href="javascript:void(0)"
        class="btn btn-sm btn-outline-primary"
        @click="ExportCSV"
        >Export CSV</a
      >
    </div>
  </div>
  <div class="table-responsive">
    <Paginator :lastPage="lastPage" @page-change="loadData($event)" />
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Tel <br />Mobile</th>
          <th>Total Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(or, index) in orders"
          :key="or.id"
          :id="or.id"
          :refs="or.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ or.first_name }} {{ or.last_name }}</td>
          <td>{{ or.email }}</td>
          <td>{{ or.post_code }} {{ or.address }}</td>
          <td>
            {{ or.tel }} <br />
            {{ or.mobile }}
          </td>
          <td>
            {{ or.total_quantity }}
          </td>
          <td>
            {{ or.total }}
          </td>
          <td>
            <div class="btn-group mr-2">
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-outline-success"
                @click="viewDetail(or.id)"
                v-if="or.total_quantity > 0"
                title="Orders Detail"
                >View</a
              >
              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-outline-warning"
                v-else
                title="Orders Detail Is Empty"
                >View</a
              >
              <OrderDetailView
                v-if="showModal"
                @close="showModal = false"
                :OrderItems="orderItem"
              />

              <a
                href="javascript:void(0)"
                class="btn btn-sm btn-outline-danger"
                @click="del(or.id)"
                >Delete</a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Paginator :lastPage="lastPage" @page-change="loadData($event)" />
</template>
<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { Entity } from "@/interfaces/Entity.ts";
import Paginator from "@/components/frontend/Paginator.vue";
import OrderDetailView from "@/views/frontend/orders/OrdersDetail.vue";

import { Order } from "@/classes/order.ts";

export default {
  name: "Orders",

  setup() {
    const showModal = ref(false);
    const orders = ref(null);
    const orderItem = ref([]);
    const lastPage = ref(0);
    // load data for every page
    const loadData = async (page = 1) => {
      const response = await axios.get(`orders?page=${page}`);

      if (response.status == 200) {
        orders.value = response.data.data;

        lastPage.value = response.data.meta.last_page;
      }
    };
    // page load is finished fill data
    onMounted(loadData);

    // delete button
    const del = async (id: number) => {
      if (confirm("Are you sure you want to delete this record?")) {
        await axios.delete(`orders/${id}`);
        orders.value = orders.value.filter((e: Entity) => e.id !== id);
      }
    };

    const viewDetail = (index: number) => {
      orders.value.map((h: Order) => {
        if (index == h.id) {
          orderItem.value = h.order_detail;
          showModal.value = !showModal.value;
        }
      });
    };

    const ExportCSV = async () => {
      const response = await axios.get("exportcsv", { responseType: "blob" });
      const blob = new Blob([response.data], { type: "text/csv" });
      const downloadUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "orders.csv";
      link.click();
    };
    // ouput action you must write here
    return {
      orders,
      del,
      lastPage,
      loadData,
      viewDetail,
      showModal,
      orderItem,
      ExportCSV,
    };
  },
  components: {
    Paginator,
    OrderDetailView,
  },
};
</script>
<style>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>