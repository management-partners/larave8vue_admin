<template>
  <transition>
    <div class="modal-mask" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header justify-content-center">
            <h5 class="modal-title">Orders Detail</h5>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Images</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(or, index) in OrderItems"
                    :key="or.id"
                    :id="or.id"
                    :refs="or.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ or.product_name }}</td>
                    <td>{{ or.product_description }}</td>
                    <td>
                      <img
                        :src="or.product_image"
                        alt=""
                        style="width: 100px"
                      />
                    </td>
                    <td>{{ or.quantity }}</td>
                    <td>{{ or.price }}</td>
                  </tr>
                  <tr class="total-row">
                    <td colspan="4">Total</td>
                    <td>{{ totalQuantity }}</td>
                    <td>{{ total }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-info col-sm-12"
              data-dismiss="modal"
              @click="$emit('close')"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { ref, onMounted } from "vue";
export default {
  name: "OrdersDetail",
  props: ["OrderItems"],
  setup(props: any) {
    const totalQuantity = ref(0);
    const total = ref(0);
    onMounted(() => {
      props.OrderItems.forEach((el: any) => {
        totalQuantity.value += el.quantity;
        total.value += el.quantity * el.price;
      });
    });
    return {
      totalQuantity,
      total,
    };
  },
};
</script>
<style>
.modal-dialog {
  max-width: 90% !important;
}
.total-row {
  font-size: 1.5rem !important;
  font-weight: bold !important;
  color: red !important;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>