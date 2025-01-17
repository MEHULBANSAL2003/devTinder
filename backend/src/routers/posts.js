const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Post = require("../models/post");
const postRouter = express.Router();

postRouter.post("/post/createpost", userAuth, async (req, res) => {
  const currUser = req.user;
  const { imageUrl, content } = req.body;

  try {
    if (!imageUrl) {
      throw { status: 400, message: "Image is required" };
    }
    const data = {
      imageUrl: imageUrl,
      postedBy: currUser._id,
    };
    if (content) data.content = content;

    const post = new Post(data);
    await post.save();

    res.status(200).json({
      result: "success",
      message: "posted successfully",
      data: post,
    });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({
      result: "error",
      message: err.message || "Internal server error",
    });
  }
});

postRouter.post("/post/deletepost/:postId", userAuth, async (req, res) => {
  try {
    const currUser = req.user;
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) throw { status: 400, message: "no post exists" };
    if (post.postedBy.toString() !== currUser._id.toString())
      throw { status: 400, message: "you are not owner of this post" };

    const response = await Post.findByIdAndDelete(postId);

    res.status(200).json({
      result: "success",
      message: "post deleted successfully",
      data: response,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      result: "error",
      message: err.message || "Internal server error",
    });
  }
});

postRouter.get("/posts", userAuth, async (req, res) => {
  try {
    const currUser = req.user;
    const pipeline = [
      {
        $match: { postedBy: { $ne: currUser._id } },
      },
      {
        $sort: { createdAt: -1 },
      },
    ];

    const posts = await Post.aggregate(pipeline);

    res.status(200).json({
      result: "success",
      message: "all posts fetched successfully",
      data: posts,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      result: "error",
      message: err.message || "Internal server error",
    });
  }
});



module.exports = { postRouter };
