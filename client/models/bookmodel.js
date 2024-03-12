import mongoose from "mongoose";

const bookschema=mongoose.Schema({
    title:{
       type:String,
       required:true
    },
    author:{
        type:String,
    },
    publishYear:{
       type: Number,
    }
},
{
    timestamps:true
}
)

export const book=mongoose.model('Book',bookschema);