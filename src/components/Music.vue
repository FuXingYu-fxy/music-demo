<template>
  <div class="category-music-list-container">
    <table border="1">
      <tr>
        <th v-for="item of title" :key="item.id">{{ item.text }}</th>
      </tr>
      <!-- ================================================================ -->

      <tr>
        <td>
          <p></p>
        </td>

        <td>
          <p>这是音乐</p>
        </td>

        <td>
          <p>这是音乐</p>
        </td>
        <td>
          <p>这是音乐</p>
        </td>
        <td>
          <p>这是音乐</p>
        </td>
        <td>
          <p>这是音乐</p>
        </td>
        <td>
          <p>这是音乐</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      title: [
        { id: 0, text: "" },
        { id: 1, text: "操作" },
        { id: 2, text: "音乐标题" },
        { id: 3, text: "歌手" },
        { id: 4, text: "专辑" },
        { id: 5, text: "时长" },
        { id: 6, text: "热度" },
      ],
    };
  },
  components: {},
};
</script>

<style scpoed>
p {
  margin: 0 0 0.625rem 0;
}
.category-music-list-container {
  position: relative;
  top: 5rem;
  display: flex;
  justify-content: center;
}
.category-music-list-container table {
  text-align: center;
  width: 100vw;
}
</style>