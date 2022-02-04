<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand class="fab-background-color p-5" to="/">
      My Movies Store</b-navbar-brand
    >

    <b-collapse id="nav-collapse" is-nav class="left-class">
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/movie">Movies</b-nav-item>
        <b-nav-item to="/shows">Tv Shows</b-nav-item>
        <b-nav-item to="/peoples">People</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <em>Salma Kona Gugly</em>
          </template>
          <b-dropdown-item href="#">Setting</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<style>
.left-class {
  margin-left: 0;
}
</style>
