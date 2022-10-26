<template>
  <div class="wrapper">
  <el-container>
    <el-header>
      <Header> </Header>
    </el-header>
    <el-main>
      <Convert></Convert>
    </el-main>
  </el-container>
  </div>
</template>

<script setup>
import Header from '../components/UnLoginHeader.vue';
import Convert from '../views/TouristConvert.vue';

</script>

<style>

</style>
