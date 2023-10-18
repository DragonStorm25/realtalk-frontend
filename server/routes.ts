import { ObjectId } from "mongodb";

import { Router, getExpressRouter } from "./framework/router";

import { Friend, Post, User, WebSession, Comment, Like, Trust, Karma } from "./app";
import { PostDoc, PostOptions } from "./concepts/post";
import { CommentDoc } from "./concepts/comment";
import { UserDoc } from "./concepts/user";
import { WebSessionDoc } from "./concepts/websession";
import Responses from "./responses";
import { TrustType } from "./concepts/trusts";

class Routes {
  @Router.get("/session")
  async getSessionUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.getUserById(user);
  }

  @Router.get("/users")
  async getUsers() {
    return await User.getUsers();
  }

  @Router.get("/users/:username")
  async getUser(username: string) {
    return await User.getUserByUsername(username);
  }

  @Router.get("/users/:username/karma")
  async getKarma(username: string) {
    return await Karma.getKarma((await User.getUserByUsername(username))._id);
  }

  @Router.post("/users")
  async createUser(session: WebSessionDoc, username: string, password: string) {
    WebSession.isLoggedOut(session);
    return await User.create(username, password);
  }

  @Router.patch("/users")
  async updateUser(session: WebSessionDoc, update: Partial<UserDoc>) {
    const user = WebSession.getUser(session);
    return await User.update(user, update);
  }

  @Router.delete("/users")
  async deleteUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    WebSession.end(session);
    return await User.delete(user);
  }

  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string, password: string) {
    const u = await User.authenticate(username, password);
    WebSession.start(session, u._id);
    return { msg: "Logged in!" };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    WebSession.end(session);
    return { msg: "Logged out!" };
  }

  @Router.get("/posts")
  async getPosts(author?: string) {
    let posts;
    if (author) {
      const id = (await User.getUserByUsername(author))._id;
      posts = await Post.getByAuthor(id);
    } else {
      posts = await Post.getPosts({});
    }
    return Responses.posts(posts);
  }

  @Router.post("/posts")
  async createPost(session: WebSessionDoc, content: string, options?: PostOptions) {
    const user = WebSession.getUser(session);
    const created = await Post.create(user, content, options);
    return { msg: created.msg, post: await Responses.post(created.post) };
  }

  @Router.patch("/posts/:_id")
  async updatePost(session: WebSessionDoc, _id: ObjectId, update: Partial<PostDoc>) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    return await Post.update(_id, update);
  }

  @Router.delete("/posts/:_id")
  async deletePost(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Post.isAuthor(user, _id);
    return Post.delete(_id);
  }

  @Router.get("/posts/:_id/likes")
  async getPostLikes(_id: ObjectId) {
    await Post.assertPostExists(_id);
    return Like.getLikes(_id);
  }

  @Router.patch("/posts/:_id/like")
  async addPostLike(session: WebSessionDoc, _id: ObjectId) {
    await Post.assertPostExists(_id);
    const user = WebSession.getUser(session);
    return Like.like(user, _id);
  }

  @Router.patch("/posts/:_id/dislike")
  async addPostDislike(session: WebSessionDoc, _id: ObjectId) {
    await Post.assertPostExists(_id);
    const user = WebSession.getUser(session);
    return Like.dislike(user, _id);
  }

  @Router.patch("/posts/:_id/neutral_like")
  async neutralLikePost(session: WebSessionDoc, _id: ObjectId) {
    await Post.assertPostExists(_id);
    const user = WebSession.getUser(session);
    return Like.neutralize(user, _id);
  }

  @Router.get("/posts/:_id/trusts")
  async getPostTrusts(_id: ObjectId) {
    await Post.assertPostExists(_id);
    return Trust.getTrusts(_id);
  }

  @Router.patch("/posts/:_id/trust")
  async addPostTrust(session: WebSessionDoc, _id: ObjectId) {
    await Post.assertPostExists(_id);
    const author = (await Post.posts.readOne({ _id }))?.author;
    const user = WebSession.getUser(session);
    if (author) {
      const trust = await Trust.trust(user, _id);
      const karma = await Karma.increaseKarma(author, trust.typeRemoved == TrustType.Mistrust);
      return { trustInfo: trust, karmaInfo: karma };
    }
  }

  @Router.patch("/posts/:_id/mistrust")
  async addPostMistrust(session: WebSessionDoc, _id: ObjectId) {
    await Post.assertPostExists(_id);
    const author = (await Post.posts.readOne({ _id }))?.author;
    const user = WebSession.getUser(session);
    if (author) {
      const mistrust = await Trust.mistrust(user, _id);
      const karma = await Karma.decreaseKarma(author, mistrust.typeRemoved == TrustType.Trust);
      return { trustInfo: mistrust, karmaInfo: karma };
    }
  }

  @Router.patch("/posts/:_id/neutral_trust")
  async neutralTrustPost(session: WebSessionDoc, _id: ObjectId) {
    await Post.assertPostExists(_id);
    const author = (await Post.posts.readOne({ _id }))?.author;
    const user = WebSession.getUser(session);
    const trustInfo = await Trust.neutralize(user, _id);
    if (author) {
      let karma;
      const typeRemoved = trustInfo.typeRemoved;
      if (typeRemoved == TrustType.Trust) {
        karma = await Karma.decreaseKarma(author, false);
      } else if (typeRemoved == TrustType.Mistrust) {
        karma = await Karma.increaseKarma(author, false);
      } else {
        console.log(author);
        karma = { msg: "Karma not modified!", karma: await Karma.karma.readOne({ user: author }) };
      }
      return { trustInfo: trustInfo, karmaInfo: karma };
    }
  }

  @Router.get("/comments")
  async getComments(author?: string) {
    let comments;
    if (author) {
      const id = (await User.getUserByUsername(author))._id;
      comments = await Comment.getByAuthor(id);
    } else {
      comments = await Comment.getComments({});
    }
    return Responses.comments(comments);
  }

  @Router.post("/comments")
  async createComment(session: WebSessionDoc, content: string, target: ObjectId) {
    const user = WebSession.getUser(session);
    await Post.assertPostExists(target);
    const created = await Comment.create(user, target, content);
    return { msg: created.msg, comment: await Responses.comment(created.comment) };
  }

  @Router.patch("/comments/:_id")
  async updateComment(session: WebSessionDoc, _id: ObjectId, update: Partial<CommentDoc>) {
    const user = WebSession.getUser(session);
    await Comment.isAuthor(user, _id);
    return await Comment.update(_id, update);
  }

  @Router.delete("/comments/:_id")
  async deleteComment(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Comment.isAuthor(user, _id);
    return Comment.delete(_id);
  }

  @Router.get("/comments/:_id/likes")
  async getCommentLikes(_id: ObjectId) {
    await Comment.assertCommentExists(_id);
    return Like.getLikes(_id);
  }

  @Router.patch("/comments/:_id/like")
  async addCommentLike(session: WebSessionDoc, _id: ObjectId) {
    await Comment.assertCommentExists(_id);
    const user = WebSession.getUser(session);
    return Like.like(user, _id);
  }

  @Router.patch("/comments/:_id/dislike")
  async addCommentDislike(session: WebSessionDoc, _id: ObjectId) {
    await Comment.assertCommentExists(_id);
    const user = WebSession.getUser(session);
    return Like.dislike(user, _id);
  }

  @Router.patch("/comments/:_id/neutral_like")
  async neutralLikeComment(session: WebSessionDoc, _id: ObjectId) {
    await Comment.assertCommentExists(_id);
    const user = WebSession.getUser(session);
    return Like.neutralize(user, _id);
  }

  @Router.get("/comments/:_id/trusts")
  async getCommentTrusts(_id: ObjectId) {
    await Comment.assertCommentExists(_id);
    return Trust.getTrusts(_id);
  }

  @Router.patch("/comments/:_id/trust")
  async addCommentTrust(session: WebSessionDoc, _id: ObjectId) {
    await Comment.assertCommentExists(_id);
    const author = (await Comment.comments.readOne({ _id }))?.author;
    const user = WebSession.getUser(session);
    if (author) {
      const trust = await Trust.trust(user, _id);
      const karma = await Karma.increaseKarma(author, trust.typeRemoved == TrustType.Mistrust);
      return { trustInfo: trust, karmaInfo: karma };
    }
  }

  @Router.patch("/comments/:_id/mistrust")
  async addCommentMistrusts(session: WebSessionDoc, _id: ObjectId) {
    await Comment.assertCommentExists(_id);
    const author = (await Comment.comments.readOne({ _id }))?.author;
    const user = WebSession.getUser(session);
    if (author) {
      const mistrust = await Trust.mistrust(user, _id);
      const karma = await Karma.decreaseKarma(author, mistrust.typeRemoved == TrustType.Trust);
      return { trustInfo: mistrust, karmaInfo: karma };
    }
  }

  @Router.patch("/comments/:_id/neutral_trust")
  async neutralTrustComment(session: WebSessionDoc, _id: ObjectId) {
    await Comment.assertCommentExists(_id);
    const author = (await Post.posts.readOne({ _id }))?.author;
    const user = WebSession.getUser(session);
    const trustInfo = await Trust.neutralize(user, _id);
    if (author) {
      let karma;
      const typeRemoved = trustInfo.typeRemoved;
      if (typeRemoved == TrustType.Trust) {
        karma = await Karma.decreaseKarma(author, false);
      } else if (typeRemoved == TrustType.Mistrust) {
        karma = await Karma.increaseKarma(author, false);
      } else {
        karma = { msg: "Karma not modified!", karma: await Karma.karma.readOne({ user: author }) };
      }
      return { trustInfo: trustInfo, karmaInfo: karma };
    }
  }

  @Router.get("/friends")
  async getFriends(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.idsToUsernames(await Friend.getFriends(user));
  }

  @Router.delete("/friends/:friend")
  async removeFriend(session: WebSessionDoc, friend: string) {
    const user = WebSession.getUser(session);
    const friendId = (await User.getUserByUsername(friend))._id;
    return await Friend.removeFriend(user, friendId);
  }

  @Router.get("/friend/requests")
  async getRequests(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await Responses.friendRequests(await Friend.getRequests(user));
  }

  @Router.post("/friend/requests/:to")
  async sendFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.sendRequest(user, toId);
  }

  @Router.delete("/friend/requests/:to")
  async removeFriendRequest(session: WebSessionDoc, to: string) {
    const user = WebSession.getUser(session);
    const toId = (await User.getUserByUsername(to))._id;
    return await Friend.removeRequest(user, toId);
  }

  @Router.put("/friend/accept/:from")
  async acceptFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.acceptRequest(fromId, user);
  }

  @Router.put("/friend/reject/:from")
  async rejectFriendRequest(session: WebSessionDoc, from: string) {
    const user = WebSession.getUser(session);
    const fromId = (await User.getUserByUsername(from))._id;
    return await Friend.rejectRequest(fromId, user);
  }
}

export default getExpressRouter(new Routes());
