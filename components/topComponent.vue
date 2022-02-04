<template>
  <div class="top-div container-fluid">
    <img src="~static/header-img.jpg" alt="" />
    <div class="text-container">
      <div class="text">
        <h1><span>Popular</span> Movies</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hero",
};
</script>

<style lang="scss" scoped>
.top-div {
  height: 200px;
  position: relative;
  @media (min-width: 750px) {
    height: 200px;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .text-container {
    z-index: 99;
    position: absolute;
    top: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: grid;
    flex-direction: column;
    justify-content: center;
    .text {
      padding: 0 16px;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }
    h1 {
      color: #fff;
      font-size: 64px;
      font-weight: 200;
      margin-bottom: 8px;
      @media (min-width: 750px) {
        font-size: 84px;
      }
    }
  }
}
</style>
