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
                    <th>Price</th>
                    <th>Qunatity</th>
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
                    <td>{{ or.price }}</td>
                    <td>{{ or.quantity }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-info col-sm-10"
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
export default {
  name: "OrdersDetail",
  props: ["OrderItems"],
};
</script>
<style>
.modal-dialog {
  max-width: 90% !important;
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