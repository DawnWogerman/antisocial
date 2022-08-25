const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true
            //validate email
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: Thoughts
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: User
            },
        ],  
    },
   {
    toJson: {
        virtuals: true,
        getters: true
    },
    id: false
   }
);

UserSchema.virtual('friendCount').get(function() {
    return this.replies.length;
});

const User = model('User', UserSchema);

module.exports = User;