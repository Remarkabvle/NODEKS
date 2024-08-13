import { Schema, model } from "mongoose";
import Joi from "joi";

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    previousCost: {
        type: Number,
        required: false,
    },
    details: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: false,
    },
    quantity: {
        type: Number,
        required: true,
    },
    images: {
        type: Array,
        required: false,
        default: [],
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

export const Items = model("Item", itemSchema);

export const validateItem = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        cost: Joi.number().required(),
        previousCost: Joi.number(),
        details: Joi.string(),
        category: Joi.string().required(),
        rating: Joi.number().required(),
        isAvailable: Joi.boolean(),
        quantity: Joi.number().required(),
        creatorId: Joi.string(),
        images: Joi.array(),
    });
    return schema.validate(data);
};
