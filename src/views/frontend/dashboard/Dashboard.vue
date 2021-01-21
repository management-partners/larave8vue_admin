<template>
  <h2>Dashboard</h2>
  <h3>Daily Sales</h3>
  <div class="container">
    <div class="row col-sm-3">
      <select
        id="year"
        name="year"
        class="form-control"
        v-model="year"
        @change="filterChart"
        autofocus
      >
        <option v-for="(y, index) in lstYear" :key="index" :value="y">
          {{ y }}
        </option>
      </select>
    </div>
    <br />
    <div class="row">
      <div id="chart"></div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import * as c3 from "c3";

export default {
  name: "Home",
  setup() {
    const year = ref(new Date().getFullYear());
    const lstYear = ref([]);

    const loadAllYear = async () => {
      const response = await axios.get("chartallyear");
      response.data.forEach((el) => {
        lstYear.value.push(el.date);
      });
    };

    const drawChart = async () => {
      const chart = c3.generate({
        bindto: "#chart",
        data: {
          x: "x",
          columns: [["x"], ["Sales"]],
          types: {
            Sales: "bar",
          },
        },
        axis: {
          x: {
            type: "timeseries",
            tick: {
              format: "%Y/%m/%d",
            },
          },
        },
      });
      const response = await axios.get(`chartyear/${year.value}`);
      const records = response.data.data;
      if (records != null) {
        chart.load({
          columns: [
            ["x", ...records.map((d) => d.date)],
            ["Sales", ...records.map((s) => s.total)],
          ],
        });
      } else {
        chart.load({
          columns: [
            ["x", 0],
            ["Sales", 0],
          ],
        });
      }
    };

    const filterChart = () => {
      drawChart();
    };

    onMounted(() => {
      loadAllYear();
      drawChart();
    });
    return {
      lstYear,
      year,
      loadAllYear,
      filterChart,
      drawChart,
    };
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