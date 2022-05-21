<template>
  <div class="wrapper">
    <div class="wrapper__photo">
      <img
        :src="require(`../assets/` + getCardType + '.png')"
        v-if="getCardType"
        :key="getCardType"
        class="card-item__typeImg Img"
        alt=""
        :class="{ imgDisplayNone: isActive }"
      />
      <img
        :src="require(`../assets/` + getBankType + '.png')"
        v-if="getBankType"
        class="card-item__typeImg Img2"
        alt=""
      />
      <p
        v-if="
          cardNumber.replace(/\s/g, '').length > 4 &&
          getCardType !== 'visa' &&
          getCardType !== 'mir' &&
          getCardType !== 'mastercard'
        "
        class="text_type"
      >
        Данный тип карты не поддерживается
      </p>
    </div>
    <div class="white__block">
      <div class="white__block__form">
        <label for="cardNumber">Card Number</label>
        <input
          class="form__cardNumber__length"
          type="text"
          id="cardNumber"
          name="cardNumber"
          v-model="cardNumber"
          autocomplete="off"
          oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/\s/g,'').replace(/(.{4})/g,'$1 ')"
        />
        <a class="error" v-if="error">Введите не менее 16 цифр</a>
        <a class="errorBig" v-if="errorBig">Введите не более 16 цифр</a>
      </div>
      <div>
        <label for="cardName">Card Name</label>
        <input
          class="form__cardName__length"
          type="text"
          id="cardName"
          name="cardName"
          v-model="cardName"
          autocomplete="off"
        />
      </div>
      <div class="form__card__date">
        <label class="form__card__label" for="cardDate">Expiration Date</label>
        <div class="form__card__select">
          <select
            class="card__date__month"
            id="cardDate"
            :value="cardMonth"
            name="cardMonth"
          >
            <option value="" disabled selected>Month</option>
            <option
              :value="n < 10 ? '0' + n : n"
              v-for="n in 12"
              :disabled="n < minCardMonth"
              v-bind:key="n"
            >
              {{ n < 10 ? "0" + n : n }}
            </option>
          </select>
          <select
            class="card__date__month"
            id="cardYear"
            v-model="cardYear"
            name="cardYear"
          >
            <option value="" disabled selected>Year</option>
            <option
              :value="$index + minCardYear"
              v-for="(n, $index) in 12"
              :key="n"
            >
              {{ $index + minCardYear }}
            </option>
          </select>
        </div>
        <div class="card__form__CVV">
          <label class="CVV__card" for="cardCVV">CVV</label>
          <input
            id="cardCVV"
            :maxlength="maxLengthNumber"
            name="labelCVV"
            autocomplete="off"
            class="form__cardCVV__length"
            oninput="this.value = this.value.replace(/[^0-9]/g, '')"
            type="text"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="card__bin">
    <form action="cards.php" method="POST">
      <input
        placeholder="Введите BIN карты"
        name="cardBin"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')"
        maxlength="6"
      />
      <select name="cardType">
        <option value=""></option>
        <option value="Сбербанк">Сбербанк</option>
        <option value="Тинькофф">Тинькофф</option>
      </select>
      <button name="submit" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "validatorCard",
  data() {
    return {
      cardNumber: "",
      cardName: "",
      labelCVV: "CVV",
      cardMonth: "",
      cardYear: "",
      minCardYear: new Date().getFullYear(),
      maxLengthNumber: "",
      isActive: false,
      isActiveText: true,
      err: "",
    };
  },
  methods: {},
  computed: {
    errorBig() {
      return this.cardNumber.length > 16;
    },
    error() {
      return this.cardNumber.length < 16;
    },
    getCardType() {
      let number = this.cardNumber;
      let imgClass = this.isActive;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";
      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";
      re = new RegExp("^2");
      if (number.match(re) != null) return "mir";
      return imgClass === true;
    },
    getBankType() {
      let number = this.cardNumber;
      if (
        number.replace(/\s/g, "").indexOf("547942") > -1 ||
        number.replace(/\s/g, "").indexOf("427622") > -1 ||
        number.replace(/\s/g, "").indexOf("220220") > -1
      ) {
        return "sber";
      }
      if (
        number.replace(/\s/g, "").indexOf("518901") > -1 ||
        number.replace(/\s/g, "").indexOf("437772") > -1 ||
        number.replace(/\s/g, "").indexOf("220070") > -1
      ) {
        return "tinkoff";
      }
      return false;
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    },
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    },
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.imgDisplayNone {
  display: none;
}
input,
select {
  margin-top: 5px;
}
.wrapper {
  max-width: 500px;
  margin: auto;
  width: 100%;
}
.wrapper__photo {
  text-align: center;
  height: 30px;
}
.white__block__form {
  margin: 10px 0 10px 0;
}
.card-item__typeImg {
  width: 100px;
  height: 100%;
}
.Img {
  margin-right: 15px;
}
.form__cardNumber__length {
  width: 100%;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #ced6e0;
  transition: all 0.3s ease-in-out;
  font-size: 18px;
  padding: 5px 15px;
  background: none;
  color: #1a3b5d;
  font-family: sans-serif;
  outline: none;
}
.form__cardName__length {
  width: 100%;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #ced6e0;
  transition: all 0.3s ease-in-out;
  font-size: 18px;
  padding: 5px 15px;
  background: none;
  color: #1a3b5d;
  font-family: sans-serif;
  outline: none;
}
.form__cardCVV__length {
  width: 100%;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #ced6e0;
  transition: all 0.3s ease-in-out;
  font-size: 18px;
  padding: 5px 15px;
  background: none;
  color: #1a3b5d;
  font-family: sans-serif;
  outline: none;
}
.form__cardNumber__length:hover,
.form__cardNumber__length:focus {
  border-color: #3d9cff;
}

.form__cardNumber__length:focus {
  box-shadow: 0 10px 20px -13px rgba(32, 56, 117, 0.35);
}
.form__cardName__length:hover,
.form__cardName__length:focus {
  border-color: #3d9cff;
}
.form__cardName__length:focus {
  box-shadow: 0 10px 20px -13px rgba(32, 56, 117, 0.35);
}
.form__cardCVV__length:hover,
.form__cardCVV__length:focus {
  border-color: #3d9cff;
}
.form__cardCVV__length:focus {
  box-shadow: 0 10px 20px -13px rgba(32, 56, 117, 0.35);
}
.form__card__date {
}
.card__date__month {
  width: 150px;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #ced6e0;
  transition: all 0.3s ease-in-out;
  font-size: 18px;
  padding: 5px 15px;
  background: none;
  color: #1a3b5d;
  font-family: sans-serif;
  outline: none;
}
.form__card__label {
  display: block;
  width: 200px;
}
.form__card__select {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.card__form__CVV {
  margin-top: 5px;
}
.form__card__date {
  margin-top: 5px;
}
</style>
