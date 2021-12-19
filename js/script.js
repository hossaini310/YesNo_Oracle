const { createApp, ref } = Vue;

const myApp = {
  data() {
    return {
      msg: 'WAITING FOR QUESTIONS...',
      input: '',
      img: '',
      questions: [],
    };
  },
  methods: {
    askMe() {
      if (this.input == '') {
        this.msg = 'YOU NEED TO ASK A QUESTION, BRO';
        this.img = '';
      } else if (this.input.charAt(this.input.length - 1) != '?') {
        this.msg = `EITHER YOU HAVE FORGOTTEN THE QUESTION MARK OR WHAT YOU WRITTEN IS NOT A QUESTION.`;
        this.img = '';
      } else {
        let a = this.questions.filter((el) => el == this.input);
        if (a == this.input) {
          this.msg = `😒 YOU ALREADY ASKED THAT QUESTION, BRO. PLEASE TRY AGAIN IN 30 SECONDS.`;
          this.img = '';
          this.askMe() = function(){};
        } else this.getAnswer();
        this.questions.push(this.input);
        console.log(this.questions);
        setTimeout(() => {
          console.log(this.input);
          console.log(this.questions);
          this.questions = this.questions.filter((el) => el != this.input);
          console.log(this.questions);
        }, 30000);
      }
    },
    async getAnswer() {
      try {
        var answer = await axios.get('https://yesno.wtf/api').then((response) => response.data);
        this.msg = '🤔 LET ME SEE...';
        this.img = '';

        setTimeout(() => {
          let asw = answer.answer.toUpperCase();
          if (asw == 'NO') {
            this.msg = '🤭' + asw;
          } else this.msg = '😎' + asw;

          this.img = answer.image;
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

createApp(myApp).mount('#app');
