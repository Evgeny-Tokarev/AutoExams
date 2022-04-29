<template>
  <footer class="footer">
    <h4>Автор Евгений Токарев</h4>
    <div class="footer__text">
      <p>Со мной можно связаться:</p>
      <ul class="footer__communications">
        <li class="footer__com-item">
          <a href="https://t.me/ghenyaT" target="_blank">Telegram: @ghenyaT</a>
        </li>
        <li class="footer__com-item">
          <a href="mailto: ghenya.t@gmail.com" target="_blank">Email: ghenya.t@gmail.com</a>
        </li>
        <li class="footer__com-item">
          <a href="https://github.com/Evgeny-Tokarev" target="_blank">Github</a>
        </li>
        <li class="footer__com-item">
          <a href="https://github.com/Evgeny-Tokarev/AutoExams" target="_blank"
            >Репозиторий программы</a
          >
        </li>
      </ul>
    </div>
  </footer>
</template>

<script></script>

<style lang="scss" scoped>
.footer {
  background-color: rgb(172, 169, 169);
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  h4 {
    font-size: 2.5rem;
    margin: 0 auto;
    padding: 0;
    margin: 1rem auto;
  }
  &__text {
    font-size: 1.8rem;
  }
  &__com-item {
    list-style: none;
    a {
      color: black;
      text-decoration: none;
    }
  }
}
</style>
