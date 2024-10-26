const Blog = require("../model/blog.model")


exports.store = async(req, res, next) => {
    try {
req.body.image=req.file.filename;
const blog=await Blog.create(req.body);
return res.json({status:200,success:true,message:"Blog Created Successfully",blog})
    }
    catch (err) {
        console.log(err)
    }
}

exports.index = async(req, res, next) => {
    try {
        const {userId}=req.query;
        const query={};
        console.log("🚀 ~ exports.index=async ~ query:", query)
        if(userId){
            query.userId=userId;
        }
        const blogs=await Blog.find(query);
        return res.json({status:200,success:true,message:"Blogs Fetched Successfully",blogs})
    }
    catch (err) {
        console.log(err)
    }
}

exports.get = async(req, res, next) => {
    try {
        const {id}=req.params;
        const blog=await Blog.findOne({_id:id});
        return res.json({status:200,success:true,message:"Blog Fetched Successfully",blog})
    }
    catch (err) {
        console.log(err)
    }
}


exports.destroy = async(req, res, next) => {
    try {
        const {id}=req.params;
        const blog=await Blog.findOneAndDelete({_id:id});
        return res.json({status:200,success:true,message:"Blog Deleted Successfully"})
    }
    catch (err) {
        console.log(err)
    }
}

exports.update = async(req, res, next) => {
    try {
        const {id}=req.params;
        const blog=await Blog.findOneAndUpdate({_id:id},req.body,{new:true});
        return res.json({status:200,success:true,message:"Blog Updated Successfully",blog})
    }
    catch (err) {
        console.log(err)
    }
}