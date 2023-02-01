<script setup lang="ts">
import ghPopover from './components/gh-popover.vue'
</script>

<template>
  <div class="test">
    <!-- <gh-popover trigger="click" placement="top">
      <template #popover>
        <h1>SSSS</h1>
        <div class="content">
          2342534
          <p class="popover">this is popover....</p>
        </div>
      </template>
      <template #reference>
        <button>button</button>
      </template>
    </gh-popover> -->
  </div>
</template>

<style scoped>
.test {
  margin-top: 300px;
  /* margin-left: 100%; */
}

.popover {
  width: 100px;
  height: 200px;
}
</style>
