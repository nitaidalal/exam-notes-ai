import {Schema,model} from 'mongoose';

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    profilePic:{
        type: String,
        default: null
    },
    credits:{
        type: Number,
        default: 50,
        min: 0
    },
    isCreditAvailable:{
        type: Boolean,
        default: true
    },
    notes:[{
        type: Schema.Types.ObjectId,
        ref: 'Note',
        default: []
    }]


},{timestamps: true});
const User = model('User',userSchema);
export default User;