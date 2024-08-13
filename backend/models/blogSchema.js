import { Schema, model } from "mongoose";
import Joi from "joi";

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export const Articles = model("Article", articleSchema);

export const validateArticle = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    authorId: Joi.string(),
  });
  return schema.validate(data);
};
