Vue.component('authentication-buttons', {
  template: `
    <button v-if="!facebookId" onclick="facebookLogin()" class="btn btn-primary">Login with Facebook</button>
    <button v-else id="logout-button" onclick="logout()" class="btn btn-danger">Logout</button>
  `,

  data: function () {
    return { facebookId: '' };
  },

  created () {
    if (localStorage.getItem('facebookId'))
      this.facebookId = localStorage.getItem('facebookId');
  }
});

Vue.component('upload-button', {
  template: `
    <a v-if="facebookId" href="#" class="btn btn-primary"><span class="fa fa-plus"></span> Upload</a>
  `,

  data: function () {
    return { facebookId: '' };
  },

  created () {
    if (localStorage.getItem('facebookId'))
      this.facebookId = localStorage.getItem('facebookId');
  }
});

Vue.component('post', {

  props: ['postId', 'postCaption', 'postImageUrl', 'postVotes', 'postVoted'],
  template: `

  <div class="col-xs-12 post">

    <div class="thumbnail">
      <h3>{{ postCaption }}</h3>
      <img v-bind:src="postImageUrl" v-bind:alt="postCaption">
      <a v-on:click="vote(postId)" v-if="facebookId && !postVoted" href="#" class="btn btn-primary"><span class="fa fa-thumbs-o-up"></span> {{ postVotes }}</a>
      <a v-on:click="downvote(postId)" v-if="facebookId && postVoted" href="#" class="btn btn-danger"><span class="fa fa-thumbs-o-down"></span> {{ postVotes }}</a>
    </div>

  </div> <!-- /.col-xs-12.post -->

  `,

  data: function () {
    return { facebookId: '' };
  },

  methods: {
    vote (postId) {

      alert('Vote post with _id of ' + postId);

    },

    downvote (postId) {

      alert('Downvote post with _id of' + postId);

    }
  },

  created () {
    if (localStorage.getItem('facebookId'))
      this.facebookId = localStorage.getItem('facebookId');
  }

});

Vue.component('posts-section', {

  template: `
  <div class="row">

    <post v-for="post in posts" :key="post._id" :postId="post._id" :postCaption="post.caption" :postImageUrl="post.imageUrl" :postVotes="post.votes" :postVoted="post.voted">

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

      let URI = 'http://localhost:3001/posts';

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

      let URI = `http://localhost:3001/posts/search?q=${this.keyword}`;

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
