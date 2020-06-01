const app = new Vue({
  el: '#app',
  data: {
    url: '',
    slug: '',
    error: '',
    formVisible: true,
    created: null,
  },
  methods: {
    async createUrl() {
      this.error = '';
      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug || undefined
        })
      });
      const result = await response.json();
      if (response.ok) {
        this.formVisible = false;
        this.created = `https://cdg.sh/${result.slug}`;
      } else {
        this.error = result.message;
      }
    }
  }
})