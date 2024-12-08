const Chat = require('../../models/chats');
const Classes = require('../../models/class');
const User = require('../../models/user');

async function getClass(req,res){
    try{
        console.log(req.params.id);
        classId= req.params.id;
        if(!classId){
            const classesdetails = await Classes.find({});
            return res
                .status(200).json(classesdetails);
        }
        const classdata = await Classes.findById(classId);
        if(!classdata) 
            return res
                .status(404)
                .json({msg:"Class data not found"});
        res.status(200).json(classdata);
    } catch (e) {
        res.status(501).json({err:e.message});
    }
}

async function addClass(req,res){
    try{
        console.log(req.body);
        const {
            name,
            description,
            admincode,
            membercode
        } = req.body;
        
        let classData = new Classes({
            name,
            description,
            admincode,
            membercode
        })
        classData = await classData.save();
        
        res.status(200).json({msg:"Class created succesfully"});
    } catch (e) {
        res.status(501).json({err:e.message});
    }
}

async function modifyClass(req,res){
    const updateData = req.body;
    const classId = req.params.id;
    if(classId)
        return res
            .status(401).json({msg:"Id not provided"});
    try{
       
        const updatedClass = await User.findByIdAndUpdate(classId, updateData, {
            new: true, 
            runValidators: true, 
          });
      
          if (!updatedClass) {
            return res
                .status(404).send('class not found');
          }
      
          res.send(updatedClass); 
       
    } catch (e) {
        res.status(501).json({msg:e.message});
    }
}

//-------------------------------------------

async function addMembersInClass(req,res){
    const classin = req.body.classin;
    const user = req.body.user;
    const code = req.body.code;
    try{
        const updateduser = await User.findByIdAndUpdate(
            user.id,
            {classes:[...user.classes,classin.id]},
            {
                new: true, 
                runValidators: true, 
            }
        );
        if(classin.membercode == code){
            const updatedClass = await Classes.findByIdAndUpdate(
                classin.id,
                {members:[...classin.members,user.id]},
                {
                    new: true, 
                    runValidators: true, 
                }
            );
            
        } else {
            const updatedClass = await Classes.findByIdAndUpdate(
                classin.id,
                {admin:[...classin.admin,user.id]},
                {
                    new: true, 
                    runValidators: true, 
                }
                
            );
            
        }

        

        res.status(200).json(updateduser);
    } catch {
        res.status(501).json({msg:e.message});
    }
}

//-------------------------------------chat-----

async function addChatMessage(req,res){
    const {
        room,
        name,
        message,
        id
    } =req.body;
    try{
        if(!(room && name && message)){
            return res.
                status(401).json({msg:"sutable values are not send"})
        }
        let Msg = new Chat({
            room,
            name,
            message,
            id
        })

        chat=await Msg.save();
        console.log(chat);

        res.status(200).json(chat);

    } catch (e) {
        res.status(501).json({error:e.message});
    }
}

async function retriveChatMessage(req,res){
    const room = req.params.id;
    try{
        console.log(room);
        if(!room) return res
                        .status(401).json({msg:"Room id not get"});
        
        const messages = await Chat.find({ room }).sort({ timestamp: 1 });
        res.status(200).json(messages);
    } catch (e) {
        res.status(501).json({error:e.message});
    }
}



//---------------------fileupload and download--


async function uploadfunc(req,res) {
   try{
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded!' });
    }
    res.status(200).send({
        message: 'File uploaded successfully!',
        filename: req.file.filename,
    });
   } catch (e) {
        res.status(501).json({err:e.message});
   }
}

async function downloadfunc(res,req){
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    try{
        if (fs.existsSync(filePath)) {
            res.download(filePath, filename, (err) => {
                if (err) {
                    res.status(501).send({ msg: 'Error downloading file!' });
                }
            });
        } else {
            res.status(401).send({ msg: 'File not found!' });
        }
    } catch (e) {
        res.status(501).json({err:e.message});
    }
}

module.exports = {
    getClass,
    addClass,
    modifyClass,
    addMembersInClass,
    addChatMessage,
    retriveChatMessage,
}