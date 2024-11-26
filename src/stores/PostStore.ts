import axios, { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { api } from "../api/PostApi";
import { Post, User } from "../types/types";

class PostStore {
  posts: Post[] = [];
  users: User[] = [];
  postsPerPage: number = 10;
  currentPage: number = 1;
  loading: boolean = false;
  selectedPost: Post | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  controller: AbortController | null = null;

  async getPostsPage() {
    this.loading = true;
    this.posts = [];

    // cancel prev request
    if (this.controller) {
      this.controller.abort();
    }

    // new controller for request
    this.controller = new AbortController();
    const { signal } = this.controller;

    try {
      // get posts
      const simplePosts = await axios
        .get(
          `${api.posts}_limit=${this.postsPerPage}&_page=${this.currentPage}`,
          {
            signal,
          }
        )
        .then((res: AxiosResponse<Post[]>) => res.data);

      console.warn("Simple Posts:", simplePosts);

      // get author for every post
      const postsWithAuthors = await Promise.all(
        simplePosts.map(async (item) => {
          const userObject: User = await axios
            .get(`${api.user}${item.userId}`, { signal })
            .then((res: AxiosResponse<User>) => res.data);

          return { ...item, authorName: userObject.name };
        })
      );

      console.warn("Posts with authors:", postsWithAuthors);

      // update state if request not cancel
      this.posts = postsWithAuthors;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Previous request canceled:", error.message);
      } else {
        console.error("Error fetching posts:", error);
      }
    } finally {
      if (
        this.controller === null ||
        this.controller.signal.aborted === false
      ) {
        this.loading = false;
      }
    }
  }

  async setPost(postId: number) {
    if (this.selectedPost && this.selectedPost.id === postId) {
      return null;
    } else {
      this.selectedPost = null
      this.loading = true
      try {
        // get Post
        const postResponse = await axios.get<Post>(`${api.post}${postId}`);
        const postData = postResponse.data;

        // get post author
        const userResponse = await axios.get<User>(
          `${api.user}${postData.userId}`
        );
        const userData = userResponse.data;

        // object Post with authorName
        const postWithAuthor: Post = {
          ...postData,
          authorName: userData.name,
        };

        console.warn("POST: ", postWithAuthor);

        this.selectedPost = postWithAuthor; // add to store
        this.loading = false
      } catch (error) {
        console.error("Error fetching post or user: ", error);
      }
    }
  }

  setPostsPerPage(count: number) {
    this.postsPerPage = count;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setSelectedPost(data: Post) {
    this.selectedPost = data;
  }
  /*
  addPost(post: string) {
    this.posts.push(post);
  }

  removePost(index: number) {
    this.posts.splice(index, 1);
  }*/
}

const postStore = new PostStore();
export default postStore;
