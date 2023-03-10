const router = require("express").Router() ;
const Conversation = require("../models/Conversation") ;


// new conv
router.post("/", async (req,res)=>{
    const newConversation = new Conversation({
        members : [req.body.senderId, req.body.receiverId],
    }) ;

    try {
        const savedConversation = await newConversation.save() ;
        res.status(200).json(savedConversation) ;
    } catch (error) {
        res.status(500).json(error) ;
    }
})


//get conv of a user
router.get("/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
    });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
});


//get conv of a particular user with a particular receiver
router.get("/find/:senderId/:receiverId", async (req,res)=>{
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.senderId, req.params.receiverId] }
    })
    res.status(200).json(conversation) ;
  } catch (error) {
     res.status(500).json(err);
  }
}) ;


module.exports = router ;