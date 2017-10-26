Vue.component('post', {

  props: ['postCaption', 'postImageUrl', 'postVotes'],
  template: `

  <div class="col-xs-12 post">

    <div class="thumbnail">
      <h3>{{ postCaption }}</h3>
      <img v-bind:src="postImageUrl" v-bind:alt="postCaption">
      <a href="#" class="btn btn-primary"><span class="fa fa-thumbs-o-up"></span> {{ postVotes }}</a>
    </div>

  </div> <!-- /.col-xs-12.post -->

  `

});

Vue.component('posts-section', {

  template: `
  <div class="row">

    <post v-for="post in posts" :key="post.id" :postCaption="post.caption" :postImageUrl="post.imageUrl" :postVotes="post.votes">

    </post>

  </div> <!-- /.row -->
  `,

  data: function () {
    return {
      posts: []
    }
  },

  methods: {

    fetchposts () {

      let URI = 'http://localhost:3000/posts';

      axios
        .get(URI)
        .then((response) => {

          this.posts = response.data;

        })
        .catch((err) => {

          console.error(err);

        });

    }

  },

  created () {

    this.fetchposts();

  }

});

Vue.component('search-form', {

  template: `
    <form class="navbar-form navbar-right">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" v-model="keyword">
        <span class="input-group-btn">
          <button v-on:click.prevent="search" role="button" class="btn btn-primary"><span class="fa fa-search"></span></button>
        </span>
      </div>
    </form>
  `,

  data: function () {
    return {
      keyword: ''
    }
  },

  methods: {

    search () {

      let URI = `http://localhost:3000/posts/search?q=${this.keyword}`;

      axios
        .get(URI)
        .then((response) => {

          this.posts = response.data;

        })
        .catch((err) => {

          console.error(err);

        });

    }

  }

});

new Vue ({
  el: '#app'
});
