

// Updates a blog by changing the its title, body, 
//adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
// Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
//completed ----Check if the blogId exists (must have isDeleted false). If it doesn't, 
//completed----//return an HTTP status 404 with a response body like this
//completed--// Return an HTTP status 200 if updated successfully with a body like this
// Also make sure in the response you return the updated blog document.


const UpdateBlog = async function (req, res) {
    // Updates a blog by changing the its title, body, 
    //adding tags, adding a subcategory. (Assuming tag and subcategory received in body is need to be added)
    try {
        let data = req.body
        let Blog_Id = req.params.BlogId

        //(Assuming tag and subcategory received in body is need to be added)

        if (!Blogdata(data.title))
            return res.status(400).send({
                status: false,
                msg: "tags is Required are to update the data"
            })

        if (!Blogdata(data.body))
            return res.status(400).send({
                status: false,
                msg: "body is  Required to update the data"
            })

        //as mentioned if there is no subcategory data it will give an error of 400 
        if (!Blogdata(data.subcategory))
            return res.status(400).send({
                status: false,
                msg: "SubCategory is also   Required"
            })

        let update = await blogModel.findByIdAndUpdate(blog_Id)
        
        return
         res.status(404).send("No such user exists");
    }
}
let checkBlog = await blogModel.findById(blog_Id)

if (!checkBlog)
    return res.status(404).send({
        status: false,
        msg: "Blog Not Found"
    })

if (checkBlog.isDeleted == true)
    return res.status(400).send({
        status: false,
        msg: "This blog is Deleted"
    })

res.status(200).send({
    status: true,
    data: update
})

  

catch(err) {

    res.status(500).send({ error: err.message })

}
module.exports.UpdateBlog = UpdateBlog;
