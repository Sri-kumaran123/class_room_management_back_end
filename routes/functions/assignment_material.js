const Assignments = require('../../models/assignment');
const Material = require('../../models/material');
const fileStorage = require('../../models/file(ud)');
const Classes = require('../../models/class');
const Submition = require('../../models/submit');
const fs = require('fs');
const {
    findUsernamewithID,
} = require('./helperfunction');

async function addAssignment(req,res){
    const {
        title,
        description,
        lastdate,
        classid
    } = req.body;
    try{
        let assignment = new Assignments({
            title,
            description,
            lastdate
        });

        assignment= await assignment.save();
        const updatedClass = await Classes.findByIdAndUpdate(
            classid,
            {
              $push: { assignments: assignment._id }, // Use $push to add to array
            },
            { new: true } // Return the updated document
          );
        res.status(200).json(assignment);
    } catch (e) {

    }
}

async function retriveAssignment(req,res){
    const id = req.params.id;
    try{
        if(!id) return res.status(401)
                            .json({msg:"No id parameter detected"});
        const assignmentdetail = await Assignments.findById(id);

        if(!res)
            return res.status(401)
                .json({msg:'No data found'});
        res.status(200).json(assignmentdetail);
    } catch (e) {

    }
}
//---------material-----

async function addMaterial(req,res){
    const {
        name,
        classid
    } = req.body;

    try{
        console.log(req.filesdetail)
        console.log('next',classid);
        let mat = new Material({
            name,
            fileid:req.filesdetail._id
        });
        savedMaterial = await mat.save();
        
        const updatedClass = await Classes.findByIdAndUpdate(
            classid,
            {
              $push: { material: savedMaterial._id }, // Use $push to add to array
            },
            { new: true } // Return the updated document
          );

        if(!savedMaterial) return res
                    .status(401).json({msg:"Some error"});
        res.status(200).json(mat);

    } catch (e) {
        console.log(e.message);
    }
}

async function retriveMaterial(req,res){
    console.log(req.filesdetail);
    const filepath= req.filesdetail.path;
    try{
        fs.access(filepath,fs.constants.F_OK,async (err) => {
            if(err){
                return res.status(501).json({err:"Some error"});
            }
            res.download(filepath, 'doc', (err) => {
                if (err) {
                  console.error('File download error:', err);
                  return res.status(500).send('Could not download the file.');
                }
            }
            );
        });
    } catch (e) {
        res.status(501).json({err:e.message});
    }
}

async function retriveMaterialdata(req,res){
    const id= req.params.id;
    console.log(id)
    try{
        const matdetail = await Material.findById(id);
        res.status(200).json(matdetail);
    } catch (e) {
        res.status(500).json({err:e.message})
    }
}

async function addSubmition(req,res){
    const {
        userid,
        assid
    } = req.body;

    try{
        console.log(req.filesdetail)
        console.log('hi');
        let submit = new Submition({
            submitedby:userid,
            fileid:req.filesdetail._id
        });
        savedsubmit = await submit.save();
        console.log("hello")
        const submition = await Assignments.findByIdAndUpdate(
            assid,
            {
              $push: { submition: savedsubmit._id }, // Use $push to add to array
            },
            { new: true } // Return the updated document
          );

        if(!savedsubmit) return res
                    .status(401).json({msg:"Some error"});
        res.status(200).json(savedsubmit);

    } catch (e) {
        res.status(501).json({err:e.mesage});
    }
}

async function retrieveSubmission(req, res) {
    const id = req.params.id;

    try {
        if (!id) return res.status(400).json({ msg: "ID is required" });

        const submission = await Submition.findById(id);
        if (!submission) return res.status(404).json({ msg: "Submission not found" });

        const user = await findUsernamewithID(submission.submitedby);
       
        submission.name=user;
        res.status(200).json({
            ...submission._doc,name:user
        });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
}



module.exports = {
    retriveAssignment,
    addAssignment,
    addMaterial,
    retriveMaterial,
    addSubmition,
    retrieveSubmission,
    retriveMaterialdata,
};